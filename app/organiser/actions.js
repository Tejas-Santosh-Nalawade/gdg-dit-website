'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireActor } from '@/lib/organiser/session';
import { ValidationError, RuleError, NotFoundError } from '@/lib/organiser/errors';
import { ForbiddenError } from '@/lib/organiser/permissions';
import { formDataToObject } from '@/lib/organiser/schemas';
import * as sponsors from '@/lib/organiser/services/sponsors';
import * as finance from '@/lib/organiser/services/finance';
import * as workflows from '@/lib/organiser/services/workflows';
import { signOut } from '@/auth';

// Every action: authenticate, run the service (which checks the role and
// validates input), then refresh the affected pages. Errors become form state.
async function run(paths, fn) {
  const actor = await requireActor();
  try {
    const result = await fn(actor);
    for (const p of [].concat(paths)) revalidatePath(p);
    return { ok: true, message: 'Saved.', id: result?.id };
  } catch (e) {
    if (e instanceof ValidationError) return { ok: false, error: e.message, fieldErrors: e.fieldErrors };
    if (e instanceof RuleError || e instanceof ForbiddenError || e instanceof NotFoundError) return { ok: false, error: e.message };
    console.error(e);
    return { ok: false, error: 'Something went wrong while saving. Nothing was changed.' };
  }
}

const field = (fd, name) => {
  const v = fd.get(name);
  return typeof v === 'string' && v ? v : undefined;
};
const input = (fd, omit = ['id']) => {
  const obj = formDataToObject(fd);
  for (const k of omit) delete obj[k];
  return obj;
};

// ---- Sponsors -------------------------------------------------------------

export async function createSponsorAction(_prev, fd) {
  let createdId;
  const state = await run('/organiser/sponsors', async (actor) => {
    const s = await sponsors.createSponsor(actor, input(fd));
    createdId = s.id;
    return s;
  });
  if (state.ok && createdId) redirect(`/organiser/sponsors/${createdId}`);
  return state;
}

export async function updateSponsorAction(_prev, fd) {
  const id = field(fd, 'id');
  return run([`/organiser/sponsors/${id}`, '/organiser/sponsors', '/organiser'], (actor) => sponsors.updateSponsor(actor, id, input(fd)));
}

export async function recordConfirmationAction(_prev, fd) {
  const id = field(fd, 'id');
  return run([`/organiser/sponsors/${id}`, '/organiser'], (actor) => sponsors.recordConfirmation(actor, id, input(fd)));
}

export async function approveAgreementAction(_prev, fd) {
  const id = field(fd, 'id');
  return run([`/organiser/sponsors/${id}`, '/organiser'], (actor) => sponsors.approveAgreement(actor, id, input(fd)));
}

export async function addContactAction(_prev, fd) {
  const id = field(fd, 'id');
  return run(`/organiser/sponsors/${id}`, (actor) => sponsors.addContact(actor, id, input(fd)));
}

export async function deleteContactAction(_prev, fd) {
  const sponsorId = field(fd, 'sponsorId');
  return run(`/organiser/sponsors/${sponsorId}`, (actor) => sponsors.deleteContact(actor, field(fd, 'id')));
}

export async function addInteractionAction(_prev, fd) {
  const sponsorId = field(fd, 'sponsorId');
  const requestId = field(fd, 'requestId');
  const paths = sponsorId ? [`/organiser/sponsors/${sponsorId}`, '/organiser'] : ['/organiser/institutions'];
  return run(paths, (actor) => sponsors.addInteraction(actor, { sponsorId, requestId }, input(fd, ['sponsorId', 'requestId'])));
}

export async function recordPaymentAction(_prev, fd) {
  const sponsorId = field(fd, 'sponsorId');
  const requestId = field(fd, 'requestId');
  const paths = sponsorId ? [`/organiser/sponsors/${sponsorId}`, '/organiser'] : ['/organiser/institutions', '/organiser'];
  return run(paths, (actor) => sponsors.recordPayment(actor, { sponsorId, requestId }, input(fd, ['sponsorId', 'requestId'])));
}

export async function addRelatedDocumentAction(_prev, fd) {
  const sponsorId = field(fd, 'sponsorId');
  const requestId = field(fd, 'requestId');
  const paths = sponsorId ? `/organiser/sponsors/${sponsorId}` : '/organiser/institutions';
  return run(paths, (actor) => sponsors.addRelatedDocument(actor, { sponsorId, requestId }, input(fd, ['sponsorId', 'requestId'])));
}

// ---- Packages and budget --------------------------------------------------

export async function savePackageAction(_prev, fd) {
  return run('/organiser/packages', (actor) => finance.savePackage(actor, field(fd, 'id'), input(fd)));
}

export async function saveBudgetLineAction(_prev, fd) {
  return run(['/organiser/budget', '/organiser'], (actor) => finance.saveBudgetLine(actor, field(fd, 'id'), input(fd)));
}

export async function approveBudgetLineAction(_prev, fd) {
  return run(['/organiser/budget', '/organiser'], (actor) => finance.approveBudgetLine(actor, field(fd, 'id'), input(fd)));
}

export async function deleteBudgetLineAction(_prev, fd) {
  return run(['/organiser/budget', '/organiser'], (actor) => finance.deleteBudgetLine(actor, field(fd, 'id')));
}

export async function setBudgetApprovalAction(_prev, fd) {
  return run(['/organiser/budget', '/organiser'], (actor) => finance.setBudgetApproval(actor, input(fd)));
}

export async function saveIncomeLineAction(_prev, fd) {
  return run(['/organiser/budget', '/organiser'], (actor) => finance.saveIncomeLine(actor, field(fd, 'id'), input(fd)));
}

export async function setSponsorTargetAction(_prev, fd) {
  return run('/organiser', (actor) => finance.setSponsorTarget(actor, input(fd)));
}

// ---- Outreach -------------------------------------------------------------

export async function createDraftAction(_prev, fd) {
  return run('/organiser/outreach', (actor) => workflows.createDraft(actor, input(fd)));
}

export async function editDraftAction(_prev, fd) {
  return run('/organiser/outreach', (actor) => workflows.editDraft(actor, field(fd, 'id'), input(fd)));
}

export async function submitDraftAction(_prev, fd) {
  return run('/organiser/outreach', (actor) => workflows.submitDraft(actor, field(fd, 'id')));
}

export async function reviewDraftAction(_prev, fd) {
  return run('/organiser/outreach', (actor) => workflows.reviewDraft(actor, field(fd, 'id'), input(fd)));
}

export async function markDraftSentAction(_prev, fd) {
  return run(['/organiser/outreach', '/organiser'], (actor) => workflows.markDraftSent(actor, field(fd, 'id')));
}

// ---- TPO and Foundation ---------------------------------------------------

export async function updateRequestAction(_prev, fd) {
  return run(['/organiser/institutions', '/organiser'], (actor) => workflows.updateRequest(actor, field(fd, 'id'), input(fd)));
}

export async function recordRequestApprovalAction(_prev, fd) {
  return run(['/organiser/institutions', '/organiser'], (actor) => workflows.recordRequestApproval(actor, field(fd, 'id'), input(fd)));
}

export async function addFundingOptionAction(_prev, fd) {
  return run('/organiser/institutions', (actor) => workflows.addFundingOption(actor, field(fd, 'id'), input(fd)));
}

export async function linkIntroducedSponsorAction(_prev, fd) {
  return run(['/organiser/institutions', '/organiser/sponsors'], (actor) =>
    workflows.linkIntroducedSponsor(actor, field(fd, 'id'), field(fd, 'sponsorId')),
  );
}

// ---- Committee, tasks, milestones, organisers -----------------------------

export async function saveCommitteeMemberAction(_prev, fd) {
  return run('/organiser/committee', (actor) => workflows.saveCommitteeMember(actor, field(fd, 'id'), input(fd)));
}

export async function setStatedTeamSizeAction(_prev, fd) {
  return run('/organiser/committee', (actor) => workflows.setStatedTeamSize(actor, field(fd, 'statedTeamSize')));
}

export async function createTaskAction(_prev, fd) {
  return run(['/organiser/committee', '/organiser'], (actor) => workflows.createTask(actor, input(fd)));
}

export async function setTaskStatusAction(_prev, fd) {
  return run(['/organiser/committee', '/organiser'], (actor) => workflows.setTaskStatus(actor, field(fd, 'id'), field(fd, 'status')));
}

export async function recordMilestoneProgressAction(_prev, fd) {
  return run('/organiser', (actor) => workflows.recordMilestoneProgress(actor, field(fd, 'id'), input(fd)));
}

export async function saveOrganiserAction(_prev, fd) {
  return run('/organiser/committee', (actor) => workflows.saveOrganiser(actor, field(fd, 'id'), input(fd)));
}

export async function signOutAction() {
  await signOut({ redirectTo: '/organiser/sign-in' });
}
