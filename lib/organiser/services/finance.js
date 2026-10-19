import { prisma } from '../db';
import { assertCan } from '../permissions';
import { writeAudit, diff } from '../audit';
import { ValidationError, RuleError, NotFoundError } from '../errors';
import { putSetting, SETTING_KEYS } from '../settings';
import { lineEstimate } from '../budget';
import {
  parseForm,
  packageSchema,
  budgetLineSchema,
  budgetLineApprovalSchema,
  budgetApprovalSchema,
  incomeLineSchema,
  sponsorTargetSchema,
} from '../schemas';

function parseOrThrow(schema, input) {
  const parsed = parseForm(schema, input);
  if (!parsed.ok) throw new ValidationError(parsed.fieldErrors);
  return parsed.data;
}
const nullify = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v === undefined ? null : v]));

// ---- Sponsorship packages -------------------------------------------------

export async function savePackage(actor, id, input, db = prisma) {
  assertCan(actor, 'package:edit');
  const data = nullify(parseOrThrow(packageSchema, input));
  return db.$transaction(async (tx) => {
    const before = id ? await tx.sponsorshipPackage.findUnique({ where: { id } }) : null;
    if (id && !before) throw new NotFoundError('Package');
    const pkg = id
      ? await tx.sponsorshipPackage.update({ where: { id }, data })
      : await tx.sponsorshipPackage.create({ data });
    const change = diff(before ?? {}, data);
    await writeAudit(tx, actor, {
      action: id ? 'package.update' : 'package.create',
      entityType: 'SponsorshipPackage',
      entityId: pkg.id,
      before: change.before,
      after: change.after,
    });
    return pkg;
  });
}

// ---- INCURSION budget lines ----------------------------------------------

function normaliseLine(data) {
  const line = nullify(data);
  // Quantity × unit cost is authoritative when both are given.
  line.estimatedTotal = lineEstimate({ ...line, estimatedTotal: line.estimatedTotal ?? 0 });
  if (line.fundingSource !== 'SPONSOR_CASH' && line.fundingSource !== 'IN_KIND') line.fundingSponsorId = null;
  if (line.quotationAmount != null && line.quotationStatus !== 'RECEIVED') {
    throw new RuleError('A quotation amount can only be entered once the quotation has been received.');
  }
  if (['APPROVED', 'COMMITTED', 'INVOICED', 'PAID'].includes(line.stage) && line.approvedAmount == null) {
    throw new RuleError('Record the approval (amount and approval record) before moving a line past "Quotation received".');
  }
  if ((line.stage === 'INVOICED' || line.stage === 'PAID') && line.actualAmount == null) {
    throw new RuleError('Invoiced and paid lines need the actual amount.');
  }
  if (line.paymentStatus === 'PAID' && line.stage !== 'PAID') {
    throw new RuleError('Set the stage to "Paid" when the payment status is paid.');
  }
  return line;
}

export async function saveBudgetLine(actor, id, input, db = prisma) {
  assertCan(actor, 'budget:edit');
  const data = parseOrThrow(budgetLineSchema, input);
  return db.$transaction(async (tx) => {
    const before = id ? await tx.budgetLine.findUnique({ where: { id } }) : null;
    if (id && !before) throw new NotFoundError('Budget line');
    const line = normaliseLine({ ...data, approvedAmount: before?.approvedAmount });
    delete line.approvedAmount;
    const saved = id ? await tx.budgetLine.update({ where: { id }, data: line }) : await tx.budgetLine.create({ data: line });
    const change = diff(before ?? {}, line);
    if (change.changed) {
      await writeAudit(tx, actor, {
        action: id ? 'budget.update' : 'budget.create',
        entityType: 'BudgetLine',
        entityId: saved.id,
        before: change.before,
        after: change.after,
      });
    }
    return saved;
  });
}

export async function approveBudgetLine(actor, id, input, db = prisma) {
  assertCan(actor, 'budget:approve');
  const data = parseOrThrow(budgetLineApprovalSchema, input);
  return db.$transaction(async (tx) => {
    const before = await tx.budgetLine.findUnique({ where: { id } });
    if (!before) throw new NotFoundError('Budget line');
    const saved = await tx.budgetLine.update({
      where: { id },
      data: {
        approvedAmount: data.approvedAmount,
        approvalRecord: data.approvalRecord,
        stage: ['ESTIMATE', 'QUOTED'].includes(before.stage) ? 'APPROVED' : before.stage,
      },
    });
    await writeAudit(tx, actor, {
      action: 'budget.approveLine',
      entityType: 'BudgetLine',
      entityId: id,
      before: { approvedAmount: before.approvedAmount, approvalRecord: before.approvalRecord, stage: before.stage },
      after: { approvedAmount: saved.approvedAmount, approvalRecord: saved.approvalRecord, stage: saved.stage },
    });
    return saved;
  });
}

export async function deleteBudgetLine(actor, id, db = prisma) {
  assertCan(actor, 'budget:edit');
  return db.$transaction(async (tx) => {
    const before = await tx.budgetLine.findUnique({ where: { id } });
    if (!before) throw new NotFoundError('Budget line');
    if (before.approvedAmount != null) throw new RuleError('Approved lines cannot be deleted. Set the amount to 0 with an approval record instead.');
    await tx.budgetLine.delete({ where: { id } });
    await writeAudit(tx, actor, { action: 'budget.delete', entityType: 'BudgetLine', entityId: id, before });
  });
}

/** Marks the INCURSION budget approved or pending, with the approval evidence. */
export async function setBudgetApproval(actor, input, db = prisma) {
  assertCan(actor, 'budget:approve');
  const data = parseOrThrow(budgetApprovalSchema, input);
  if (data.status === 'APPROVED' && (!data.approvedBy || !data.approvalReference || !data.approvedOn)) {
    throw new RuleError('An approved budget needs who approved it, the approval reference and the date.');
  }
  return db.$transaction(async (tx) => {
    const lines = await tx.budgetLine.findMany();
    if (data.status === 'APPROVED' && lines.some((l) => l.approvedAmount == null)) {
      throw new RuleError('Every budget line needs an approved amount before the budget can be marked approved.');
    }
    const previous = await tx.setting.findUnique({ where: { key: SETTING_KEYS.budgetApproval } });
    const value = data.status === 'APPROVED' ? { ...data, approvedOn: data.approvedOn.toISOString() } : { status: 'PENDING_VERIFICATION' };
    await putSetting(tx, SETTING_KEYS.budgetApproval, value, actor);
    await writeAudit(tx, actor, { action: 'budget.approval', entityType: 'Setting', entityId: SETTING_KEYS.budgetApproval, before: previous?.value, after: value });
    return value;
  });
}

export async function saveIncomeLine(actor, id, input, db = prisma) {
  assertCan(actor, 'budget:edit');
  const data = nullify(parseOrThrow(incomeLineSchema, input));
  if (data.quantity != null && data.rate != null) data.amount = data.quantity * data.rate;
  if (data.amount == null) throw new ValidationError({ amount: 'Enter the amount, or quantity and rate' });
  if (data.status !== 'ESTIMATE' && !data.reference) {
    throw new RuleError('Confirmed or received income needs a reference.');
  }
  return db.$transaction(async (tx) => {
    const before = id ? await tx.incomeLine.findUnique({ where: { id } }) : null;
    const saved = id ? await tx.incomeLine.update({ where: { id }, data }) : await tx.incomeLine.create({ data });
    const change = diff(before ?? {}, data);
    await writeAudit(tx, actor, { action: id ? 'income.update' : 'income.create', entityType: 'IncomeLine', entityId: saved.id, before: change.before, after: change.after });
    return saved;
  });
}

export async function setSponsorTarget(actor, input, db = prisma) {
  assertCan(actor, 'settings:edit');
  const data = parseOrThrow(sponsorTargetSchema, input);
  return db.$transaction(async (tx) => {
    const previous = await tx.setting.findUnique({ where: { key: SETTING_KEYS.sponsorTarget } });
    const value = data.sponsorTarget ?? null;
    await putSetting(tx, SETTING_KEYS.sponsorTarget, value, actor);
    await writeAudit(tx, actor, { action: 'settings.sponsorTarget', entityType: 'Setting', entityId: SETTING_KEYS.sponsorTarget, before: { value: previous?.value ?? null }, after: { value } });
    return value;
  });
}

export async function getBudget(actor, db = prisma) {
  assertCan(actor, 'budget:view');
  const [lines, historical, income] = await Promise.all([
    db.budgetLine.findMany({ include: { responsible: true, fundingSponsor: true }, orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }] }),
    db.historicalBudgetItem.findMany({ orderBy: { sortOrder: 'asc' } }),
    db.incomeLine.findMany({ orderBy: { createdAt: 'asc' } }),
  ]);
  return { lines, historical, income };
}
