import { prisma } from '../db';
import { assertCan, can } from '../permissions';
import { writeAudit, diff } from '../audit';
import { ValidationError, RuleError, NotFoundError } from '../errors';
import { validateSponsorState, sponsorPaymentsTotal } from '../pipeline';
import {
  parseForm,
  sponsorCreateSchema,
  sponsorUpdateSchema,
  sponsorConfirmationSchema,
  agreementApprovalSchema,
  contactSchema,
  interactionSchema,
  paymentSchema,
  relatedDocumentSchema,
} from '../schemas';
import { sum } from '../money';

function parseOrThrow(schema, input) {
  const parsed = parseForm(schema, input);
  if (!parsed.ok) throw new ValidationError(parsed.fieldErrors);
  return parsed.data;
}

const nullify = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v === undefined ? null : v]));

export async function createSponsor(actor, input, db = prisma) {
  assertCan(actor, 'sponsor:edit');
  const data = parseOrThrow(sponsorCreateSchema, input);
  return db.$transaction(async (tx) => {
    const sponsor = await tx.sponsor.create({
      data: { ...nullify(data), researchDate: data.researchDate ?? new Date(), status: 'PROSPECT' },
    });
    await writeAudit(tx, actor, { action: 'sponsor.create', entityType: 'Sponsor', entityId: sponsor.id, after: sponsor });
    return sponsor;
  });
}

async function loadSponsor(tx, id) {
  const sponsor = await tx.sponsor.findUnique({ where: { id }, include: { payments: true } });
  if (!sponsor) throw new NotFoundError('Sponsor');
  return sponsor;
}

export async function updateSponsor(actor, id, input, db = prisma) {
  assertCan(actor, 'sponsor:edit');
  const data = nullify(parseOrThrow(sponsorUpdateSchema, input));
  return db.$transaction(async (tx) => {
    const current = await loadSponsor(tx, id);
    const problems = validateSponsorState({ ...current, ...data }, { paymentsTotal: sponsorPaymentsTotal(current) });
    if (problems.length) throw new RuleError(problems);
    const { payments, ...plain } = current;
    const change = diff(plain, data);
    const updated = await tx.sponsor.update({ where: { id }, data });
    if (change.changed) {
      await writeAudit(tx, actor, {
        action: change.after.status ? 'sponsor.status' : 'sponsor.update',
        entityType: 'Sponsor',
        entityId: id,
        before: change.before,
        after: change.after,
      });
    }
    return updated;
  });
}

/** Records written confirmation details and committed amounts (finance-controlled). */
export async function recordConfirmation(actor, id, input, db = prisma) {
  assertCan(actor, 'sponsor:confirm');
  const data = parseOrThrow(sponsorConfirmationSchema, input);
  const values = {
    cashCommitted: data.cashCommitted ?? 0,
    inKindValue: data.inKindValue ?? 0,
    inKindDescription: data.inKindDescription ?? null,
    confirmationReference: data.confirmationReference ?? null,
    confirmationDate: data.confirmationDate ?? null,
  };
  return db.$transaction(async (tx) => {
    const current = await loadSponsor(tx, id);
    // Recording a commitment moves an earlier-stage sponsor to written confirmation.
    const status =
      (values.cashCommitted > 0 || values.inKindValue > 0) &&
      !['WRITTEN_CONFIRMATION', 'AGREEMENT_PENDING', 'CONFIRMED', 'PAYMENT_PENDING', 'PAID', 'IN_KIND_CONFIRMED'].includes(current.status)
        ? 'WRITTEN_CONFIRMATION'
        : current.status;
    const next = { ...current, ...values, status };
    const problems = validateSponsorState(next, { paymentsTotal: sponsorPaymentsTotal(current) });
    if (problems.length) throw new RuleError(problems);
    const { payments, ...plain } = current;
    const change = diff(plain, { ...values, status });
    const updated = await tx.sponsor.update({ where: { id }, data: { ...values, status } });
    await writeAudit(tx, actor, {
      action: 'sponsor.confirmation',
      entityType: 'Sponsor',
      entityId: id,
      before: change.before,
      after: change.after,
    });
    return updated;
  });
}

export async function approveAgreement(actor, id, input, db = prisma) {
  assertCan(actor, 'sponsor:approveAgreement');
  const data = parseOrThrow(agreementApprovalSchema, input);
  return db.$transaction(async (tx) => {
    const current = await loadSponsor(tx, id);
    if (!current.confirmationReference) {
      throw new RuleError('Record the written confirmation before approving the agreement.');
    }
    const updated = await tx.sponsor.update({
      where: { id },
      data: { agreementApprovalRef: data.agreementApprovalRef, agreementApprovedAt: new Date() },
    });
    await writeAudit(tx, actor, {
      action: 'sponsor.agreementApproved',
      entityType: 'Sponsor',
      entityId: id,
      before: { agreementApprovalRef: current.agreementApprovalRef },
      after: { agreementApprovalRef: data.agreementApprovalRef },
    });
    return updated;
  });
}

export async function addContact(actor, sponsorId, input, db = prisma) {
  assertCan(actor, 'sponsor:edit');
  const data = nullify(parseOrThrow(contactSchema, input));
  return db.$transaction(async (tx) => {
    await loadSponsor(tx, sponsorId);
    const contact = await tx.sponsorContact.create({
      data: { ...data, sponsorId, verifiedAt: new Date(), verifiedBy: actor.email },
    });
    await writeAudit(tx, actor, { action: 'contact.create', entityType: 'SponsorContact', entityId: contact.id, after: { sponsorId, name: data.name, source: data.source } });
    return contact;
  });
}

export async function deleteContact(actor, contactId, db = prisma) {
  assertCan(actor, 'sponsor:edit');
  return db.$transaction(async (tx) => {
    const contact = await tx.sponsorContact.delete({ where: { id: contactId } });
    await writeAudit(tx, actor, { action: 'contact.delete', entityType: 'SponsorContact', entityId: contactId, before: { sponsorId: contact.sponsorId, name: contact.name } });
    return contact;
  });
}

export async function addInteraction(actor, target, input, db = prisma) {
  const capability = target.sponsorId ? 'sponsor:edit' : 'institution:edit';
  assertCan(actor, capability);
  const data = nullify(parseOrThrow(interactionSchema, input));
  return db.$transaction(async (tx) => {
    const interaction = await tx.interaction.create({
      data: { ...data, sponsorId: target.sponsorId ?? null, requestId: target.requestId ?? null, recordedBy: actor.email },
    });
    if (target.sponsorId) {
      const sponsor = await loadSponsor(tx, target.sponsorId);
      if (!sponsor.lastContactAt || sponsor.lastContactAt < data.occurredAt) {
        if (data.type !== 'NOTE' && data.occurredAt <= new Date()) {
          await tx.sponsor.update({ where: { id: sponsor.id }, data: { lastContactAt: data.occurredAt } });
        }
      }
    }
    await writeAudit(tx, actor, { action: 'interaction.create', entityType: 'Interaction', entityId: interaction.id, after: { ...target, type: data.type, occurredAt: data.occurredAt } });
    return interaction;
  });
}

export async function recordPayment(actor, target, input, db = prisma) {
  assertCan(actor, 'payment:record');
  const data = nullify(parseOrThrow(paymentSchema, input));
  return db.$transaction(async (tx) => {
    if (target.sponsorId) {
      const sponsor = await loadSponsor(tx, target.sponsorId);
      if (!(sponsor.cashCommitted > 0) || !sponsor.confirmationReference) {
        throw new RuleError('Payments can only be recorded against a written cash commitment.');
      }
      const received = sponsorPaymentsTotal(sponsor);
      if (received + data.amount > sponsor.cashCommitted) {
        throw new RuleError(`This payment would take receipts to ${received + data.amount}, above the committed ${sponsor.cashCommitted}.`);
      }
    } else if (target.requestId) {
      const request = await tx.institutionalRequest.findUnique({ where: { id: target.requestId }, include: { payments: true } });
      if (!request) throw new NotFoundError('Request');
      if (!(request.approvedAmount > 0)) throw new RuleError('Record the formal approval before recording receipts.');
      const received = sum(request.payments, (p) => p.amount);
      if (received + data.amount > request.approvedAmount) {
        throw new RuleError(`This receipt would exceed the approved amount of ${request.approvedAmount}.`);
      }
    } else {
      throw new RuleError('A payment must belong to a sponsor or an institutional request.');
    }
    const payment = await tx.payment.create({
      data: { ...data, sponsorId: target.sponsorId ?? null, requestId: target.requestId ?? null, recordedBy: actor.email },
    });
    await writeAudit(tx, actor, { action: 'payment.record', entityType: 'Payment', entityId: payment.id, after: payment });
    return payment;
  });
}

export async function addRelatedDocument(actor, target, input, db = prisma) {
  assertCan(actor, target.sponsorId ? 'sponsor:edit' : 'institution:edit');
  const data = parseOrThrow(relatedDocumentSchema, input);
  return db.$transaction(async (tx) => {
    const doc = await tx.relatedDocument.create({
      data: { ...data, sponsorId: target.sponsorId ?? null, requestId: target.requestId ?? null, createdBy: actor.email },
    });
    await writeAudit(tx, actor, { action: 'document.link', entityType: 'RelatedDocument', entityId: doc.id, after: doc });
    return doc;
  });
}

/** Strips fields the actor is not allowed to see before data reaches a page. */
export function redactSponsor(actor, sponsor) {
  const out = { ...sponsor };
  if (!can(actor.role, 'sponsor:viewContacts')) {
    delete out.contacts;
  }
  if (!can(actor.role, 'finance:viewTotals')) {
    for (const key of ['requestedAmount', 'cashCommitted', 'inKindValue', 'payments', 'confirmationReference', 'agreementApprovalRef']) {
      delete out[key];
    }
  }
  return out;
}

export async function listSponsors(actor, db = prisma) {
  assertCan(actor, 'sponsor:view');
  const sponsors = await db.sponsor.findMany({
    include: { payments: true, assignedTo: true, package: true },
    orderBy: [{ updatedAt: 'desc' }],
  });
  return sponsors.map((s) => redactSponsor(actor, s));
}

export async function getSponsor(actor, id, db = prisma) {
  assertCan(actor, 'sponsor:view');
  const sponsor = await db.sponsor.findUnique({
    where: { id },
    include: {
      contacts: { orderBy: { createdAt: 'asc' } },
      interactions: { orderBy: { occurredAt: 'desc' } },
      payments: { orderBy: { receivedOn: 'desc' } },
      documents: { orderBy: { createdAt: 'desc' } },
      drafts: { orderBy: { updatedAt: 'desc' } },
      tasks: { include: { assignee: true }, orderBy: { createdAt: 'desc' } },
      assignedTo: true,
      package: true,
      introducedVia: true,
    },
  });
  if (!sponsor) throw new NotFoundError('Sponsor');
  return redactSponsor(actor, sponsor);
}
