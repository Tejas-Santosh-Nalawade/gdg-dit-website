import { prisma } from '../db';
import { assertCan, ROLE_LABELS } from '../permissions';
import { writeAudit, diff } from '../audit';
import { ValidationError, RuleError, NotFoundError } from '../errors';
import { buildTemplateContext, renderTemplate, TEMPLATES } from '../outreach/templates';
import { putSetting, SETTING_KEYS } from '../settings';
import {
  parseForm,
  draftCreateSchema,
  draftEditSchema,
  draftReviewSchema,
  institutionalRequestSchema,
  institutionalApprovalSchema,
  fundingOptionSchema,
  taskSchema,
  committeeMemberSchema,
  organiserSchema,
  milestoneProgressSchema,
} from '../schemas';

function parseOrThrow(schema, input) {
  const parsed = parseForm(schema, input);
  if (!parsed.ok) throw new ValidationError(parsed.fieldErrors);
  return parsed.data;
}
const nullify = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v === undefined ? null : v]));

// ---- Outreach drafts: draft → internal approval → sent manually ------------

export async function createDraft(actor, input, db = prisma) {
  assertCan(actor, 'outreach:draft');
  const data = parseOrThrow(draftCreateSchema, input);
  const template = TEMPLATES[data.templateKey];
  if (!template) throw new ValidationError({ templateKey: 'Unknown template' });
  if (template.audience === 'sponsor' && !data.sponsorId) throw new ValidationError({ sponsorId: 'Choose a sponsor' });
  return db.$transaction(async (tx) => {
    const sponsor = data.sponsorId
      ? await tx.sponsor.findUnique({ where: { id: data.sponsorId }, include: { contacts: true, package: true, payments: true } })
      : null;
    const request = data.requestId ? await tx.institutionalRequest.findUnique({ where: { id: data.requestId } }) : null;
    if (data.sponsorId && !sponsor) throw new NotFoundError('Sponsor');
    const rendered = renderTemplate(
      data.templateKey,
      buildTemplateContext({ sponsor, request, sender: { name: actor.name, roleLabel: ROLE_LABELS[actor.role] } }),
    );
    const draft = await tx.outreachDraft.create({
      data: { ...rendered, templateKey: data.templateKey, sponsorId: sponsor?.id ?? null, requestId: request?.id ?? null, createdBy: actor.email },
    });
    await writeAudit(tx, actor, { action: 'draft.create', entityType: 'OutreachDraft', entityId: draft.id, after: { templateKey: data.templateKey, sponsorId: draft.sponsorId, requestId: draft.requestId } });
    return draft;
  });
}

async function loadDraft(tx, id) {
  const draft = await tx.outreachDraft.findUnique({ where: { id } });
  if (!draft) throw new NotFoundError('Draft');
  return draft;
}

export async function editDraft(actor, id, input, db = prisma) {
  assertCan(actor, 'outreach:draft');
  const data = parseOrThrow(draftEditSchema, input);
  return db.$transaction(async (tx) => {
    const draft = await loadDraft(tx, id);
    if (!['DRAFT', 'REJECTED'].includes(draft.status)) throw new RuleError('Only drafts or rejected drafts can be edited.');
    const saved = await tx.outreachDraft.update({ where: { id }, data: { ...data, status: 'DRAFT' } });
    await writeAudit(tx, actor, { action: 'draft.edit', entityType: 'OutreachDraft', entityId: id });
    return saved;
  });
}

export async function submitDraft(actor, id, db = prisma) {
  assertCan(actor, 'outreach:draft');
  return db.$transaction(async (tx) => {
    const draft = await loadDraft(tx, id);
    if (draft.status !== 'DRAFT') throw new RuleError('Only drafts can be submitted for approval.');
    if (/\[[^\]\n]+\]/.test(draft.subject + draft.body)) {
      throw new RuleError('Fill in every [bracketed placeholder] before submitting for approval.');
    }
    const saved = await tx.outreachDraft.update({ where: { id }, data: { status: 'PENDING_APPROVAL' } });
    await writeAudit(tx, actor, { action: 'draft.submit', entityType: 'OutreachDraft', entityId: id, before: { status: draft.status }, after: { status: saved.status } });
    return saved;
  });
}

export async function reviewDraft(actor, id, input, db = prisma) {
  assertCan(actor, 'outreach:approve');
  const data = parseOrThrow(draftReviewSchema, input);
  return db.$transaction(async (tx) => {
    const draft = await loadDraft(tx, id);
    if (draft.status !== 'PENDING_APPROVAL') throw new RuleError('This draft is not awaiting approval.');
    if (draft.createdBy === actor.email) throw new RuleError('A draft must be approved by someone other than its author.');
    const saved = await tx.outreachDraft.update({
      where: { id },
      data: { status: data.decision, reviewedBy: actor.email, reviewedAt: new Date(), reviewNote: data.reviewNote ?? null },
    });
    await writeAudit(tx, actor, { action: 'draft.review', entityType: 'OutreachDraft', entityId: id, before: { status: draft.status }, after: { status: saved.status, reviewNote: saved.reviewNote } });
    return saved;
  });
}

/** Records that an approved draft was sent by a person outside this system. */
export async function markDraftSent(actor, id, db = prisma) {
  assertCan(actor, 'outreach:draft');
  return db.$transaction(async (tx) => {
    const draft = await loadDraft(tx, id);
    if (draft.status !== 'APPROVED') throw new RuleError('Only approved drafts can be marked as sent.');
    const now = new Date();
    const saved = await tx.outreachDraft.update({ where: { id }, data: { status: 'SENT_MANUALLY', sentRecordedAt: now } });
    await tx.interaction.create({
      data: {
        sponsorId: draft.sponsorId,
        requestId: draft.requestId,
        type: draft.templateKey === 'initial' || draft.templateKey === 'tpoIntroduction' || draft.templateKey === 'foundationProposal' ? 'PROPOSAL' : 'EMAIL',
        occurredAt: now,
        summary: `Sent: ${draft.subject}`,
        recordedBy: actor.email,
      },
    });
    if (draft.sponsorId) await tx.sponsor.update({ where: { id: draft.sponsorId }, data: { lastContactAt: now } });
    await writeAudit(tx, actor, { action: 'draft.sent', entityType: 'OutreachDraft', entityId: id, before: { status: draft.status }, after: { status: saved.status } });
    return saved;
  });
}

// ---- TPO and DPU Unitech Foundation ---------------------------------------

export async function updateRequest(actor, id, input, db = prisma) {
  assertCan(actor, 'institution:edit');
  const data = nullify(parseOrThrow(institutionalRequestSchema, input));
  return db.$transaction(async (tx) => {
    const before = await tx.institutionalRequest.findUnique({ where: { id } });
    if (!before) throw new NotFoundError('Request');
    if (['APPROVED', 'PARTIALLY_APPROVED'].includes(data.stage) && before.approvalReference == null) {
      throw new RuleError('Use "Record formal approval" to move a request to approved.');
    }
    if (before.type === 'TPO') data.incubationNotes = before.incubationNotes;
    if (before.type === 'FOUNDATION') data.recruitmentRequests = before.recruitmentRequests;
    const saved = await tx.institutionalRequest.update({ where: { id }, data });
    const change = diff(before, data);
    if (change.changed) {
      await writeAudit(tx, actor, { action: 'request.update', entityType: 'InstitutionalRequest', entityId: id, before: change.before, after: change.after });
    }
    return saved;
  });
}

export async function recordRequestApproval(actor, id, input, db = prisma) {
  assertCan(actor, 'institution:recordApproval');
  const data = parseOrThrow(institutionalApprovalSchema, input);
  return db.$transaction(async (tx) => {
    const before = await tx.institutionalRequest.findUnique({ where: { id } });
    if (!before) throw new NotFoundError('Request');
    const stage =
      data.approvedAmount === 0
        ? 'DECLINED'
        : before.requestedAmount != null && data.approvedAmount < before.requestedAmount
          ? 'PARTIALLY_APPROVED'
          : 'APPROVED';
    const saved = await tx.institutionalRequest.update({ where: { id }, data: { ...data, stage } });
    await writeAudit(tx, actor, {
      action: 'request.approval',
      entityType: 'InstitutionalRequest',
      entityId: id,
      before: { stage: before.stage, approvedAmount: before.approvedAmount, approvalReference: before.approvalReference },
      after: { stage, approvedAmount: data.approvedAmount, approvalReference: data.approvalReference },
    });
    return saved;
  });
}

export async function addFundingOption(actor, requestId, input, db = prisma) {
  assertCan(actor, 'institution:edit');
  const data = nullify(parseOrThrow(fundingOptionSchema, input));
  return db.$transaction(async (tx) => {
    const request = await tx.institutionalRequest.findUnique({ where: { id: requestId } });
    if (!request) throw new NotFoundError('Request');
    if (request.type !== 'FOUNDATION') throw new RuleError('Funding options apply to the Foundation proposal.');
    const option = await tx.fundingOption.create({ data: { ...data, requestId } });
    await writeAudit(tx, actor, { action: 'request.fundingOption', entityType: 'FundingOption', entityId: option.id, after: option });
    return option;
  });
}

export async function linkIntroducedSponsor(actor, requestId, sponsorId, db = prisma) {
  assertCan(actor, 'sponsor:edit');
  return db.$transaction(async (tx) => {
    const sponsor = await tx.sponsor.update({ where: { id: sponsorId }, data: { introducedViaId: requestId } });
    await writeAudit(tx, actor, { action: 'request.introduction', entityType: 'Sponsor', entityId: sponsorId, after: { introducedViaId: requestId } });
    return sponsor;
  });
}

export async function getRequests(actor, db = prisma) {
  assertCan(actor, 'institution:view');
  return db.institutionalRequest.findMany({
    include: {
      fundingOptions: { orderBy: { createdAt: 'asc' } },
      interactions: { orderBy: { occurredAt: 'desc' } },
      payments: true,
      documents: true,
      introducedSponsors: { include: { payments: true } },
      drafts: true,
    },
    orderBy: { type: 'desc' },
  });
}

// ---- Committee, tasks, milestones, organisers -----------------------------

export async function saveCommitteeMember(actor, id, input, db = prisma) {
  assertCan(actor, 'roster:edit');
  const data = nullify(parseOrThrow(committeeMemberSchema, input));
  return db.$transaction(async (tx) => {
    const before = id ? await tx.committeeMember.findUnique({ where: { id } }) : null;
    if (id && !before) throw new NotFoundError('Committee member');
    const saved = id
      ? await tx.committeeMember.update({ where: { id }, data })
      : await tx.committeeMember.create({ data: { ...data, source: `Added by ${actor.email}` } });
    const change = diff(before ?? {}, data);
    await writeAudit(tx, actor, { action: id ? 'roster.update' : 'roster.create', entityType: 'CommitteeMember', entityId: saved.id, before: change.before, after: change.after });
    return saved;
  });
}

export async function createTask(actor, input, db = prisma) {
  assertCan(actor, 'task:edit');
  const data = nullify(parseOrThrow(taskSchema, input));
  return db.$transaction(async (tx) => {
    const assignee = await tx.committeeMember.findUnique({ where: { id: data.assigneeId } });
    if (!assignee || !assignee.name) throw new ValidationError({ assigneeId: 'Choose a named committee member' });
    const task = await tx.task.create({ data: { ...data, createdBy: actor.email } });
    await writeAudit(tx, actor, { action: 'task.create', entityType: 'Task', entityId: task.id, after: task });
    return task;
  });
}

export async function setTaskStatus(actor, id, status, db = prisma) {
  assertCan(actor, 'task:edit');
  if (!['OPEN', 'DONE'].includes(status)) throw new ValidationError({ status: 'Invalid status' });
  return db.$transaction(async (tx) => {
    const before = await tx.task.findUnique({ where: { id } });
    if (!before) throw new NotFoundError('Task');
    const task = await tx.task.update({ where: { id }, data: { status } });
    await writeAudit(tx, actor, { action: 'task.status', entityType: 'Task', entityId: id, before: { status: before.status }, after: { status } });
    return task;
  });
}

export async function recordMilestoneProgress(actor, id, input, db = prisma) {
  assertCan(actor, 'milestone:record');
  const data = parseOrThrow(milestoneProgressSchema, input);
  return db.$transaction(async (tx) => {
    const before = await tx.milestone.findUnique({ where: { id } });
    if (!before) throw new NotFoundError('Milestone');
    const saved = await tx.milestone.update({
      where: { id },
      data: { progress: data.progress, progressNote: data.progressNote ?? null, progressRecordedAt: new Date(), progressRecordedBy: actor.email },
    });
    await writeAudit(tx, actor, { action: 'milestone.progress', entityType: 'Milestone', entityId: id, before: { progress: before.progress }, after: { progress: data.progress, note: data.progressNote } });
    return saved;
  });
}

export async function saveOrganiser(actor, id, input, db = prisma) {
  assertCan(actor, 'organiser:manage');
  const data = nullify(parseOrThrow(organiserSchema, input));
  return db.$transaction(async (tx) => {
    const before = id ? await tx.organizer.findUnique({ where: { id } }) : null;
    if (id && !before) throw new NotFoundError('Organiser');
    if (before && before.email === actor.email && (data.role !== 'ADMIN' || !data.active)) {
      throw new RuleError('You cannot remove your own admin access.');
    }
    const saved = id ? await tx.organizer.update({ where: { id }, data }) : await tx.organizer.create({ data });
    const change = diff(before ?? {}, data);
    await writeAudit(tx, actor, { action: id ? 'organiser.update' : 'organiser.create', entityType: 'Organizer', entityId: saved.id, before: change.before, after: change.after });
    return saved;
  });
}

export async function setStatedTeamSize(actor, size, db = prisma) {
  assertCan(actor, 'roster:edit');
  const n = Number(size);
  if (!Number.isInteger(n) || n < 1 || n > 1000) throw new ValidationError({ statedTeamSize: 'Enter a whole number' });
  return db.$transaction(async (tx) => {
    await putSetting(tx, SETTING_KEYS.statedTeamSize, n, actor);
    await writeAudit(tx, actor, { action: 'settings.teamSize', entityType: 'Setting', entityId: SETTING_KEYS.statedTeamSize, after: { value: n } });
    return n;
  });
}
