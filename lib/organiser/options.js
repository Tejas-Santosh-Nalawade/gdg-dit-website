import { STATUS_LABELS, CATEGORY_LABELS } from './pipeline';
import { BUDGET_CATEGORY_LABELS, STAGE_LABELS, FUNDING_SOURCE_LABELS } from './budget';
import { DOMAIN_LABELS } from './roster';
import { ROLE_LABELS } from './permissions';

const toOptions = (labels) => Object.entries(labels).map(([value, label]) => ({ value, label }));

export const statusOptions = toOptions(STATUS_LABELS);
export const categoryOptions = toOptions(CATEGORY_LABELS);
export const budgetCategoryOptions = toOptions(BUDGET_CATEGORY_LABELS);
export const stageOptions = toOptions(STAGE_LABELS);
export const fundingSourceOptions = toOptions(FUNDING_SOURCE_LABELS);
export const domainOptions = toOptions(DOMAIN_LABELS);
export const roleOptions = toOptions(ROLE_LABELS);
export const quotationOptions = toOptions({ NOT_REQUESTED: 'Not requested', REQUESTED: 'Requested', RECEIVED: 'Received' });
export const paymentStatusOptions = toOptions({ UNPAID: 'Unpaid', PARTIAL: 'Partly paid', PAID: 'Paid' });
export const interactionOptions = toOptions({ EMAIL: 'Email', CALL: 'Call', MEETING: 'Meeting', PROPOSAL: 'Proposal sent', NOTE: 'Internal note' });
export const requestStageOptions = toOptions({
  NOT_REQUESTED: 'Not requested',
  DRAFTING: 'Drafting',
  INTERNAL_REVIEW: 'Internal review',
  SUBMITTED: 'Submitted',
  UNDER_DISCUSSION: 'Under discussion',
  APPROVED: 'Approved',
  PARTIALLY_APPROVED: 'Partially approved',
  DECLINED: 'Declined',
  ON_HOLD: 'On hold',
});
export const fundingModeOptions = toOptions({
  PRIZE_MONEY: 'Prize money',
  PROTOTYPE_GRANT: 'Prototype grant',
  MILESTONE_FUNDING: 'Milestone-based funding',
  GENERAL_SUPPORT: 'General support',
});
export const incomeSourceOptions = toOptions({ ENTRY_FEES: 'Entry fees', INSTITUTE: 'Institute', OTHER: 'Other' });
export const incomeStatusOptions = toOptions({ ESTIMATE: 'Estimate', CONFIRMED: 'Confirmed', RECEIVED: 'Received' });

export function memberOptions(members) {
  return members.filter((m) => m.name).map((m) => ({ value: m.id, label: `${m.name} (${DOMAIN_LABELS[m.domain]})` }));
}

export function statusTone(status) {
  if (['CONFIRMED', 'PAID', 'IN_KIND_CONFIRMED'].includes(status)) return 'green';
  if (['WRITTEN_CONFIRMATION', 'AGREEMENT_PENDING', 'PAYMENT_PENDING'].includes(status)) return 'yellow';
  if (status === 'DECLINED') return 'red';
  if (['PROSPECT', 'RESEARCH', 'POSTPONED'].includes(status)) return 'neutral';
  return 'blue';
}
