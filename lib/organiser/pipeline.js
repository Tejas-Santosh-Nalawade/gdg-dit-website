// Sponsorship pipeline rules. The central rule: only written, approved
// commitments count as confirmed money. Verbal interest never does.
import { sum } from './money';

export const SPONSOR_STATUSES = [
  'PROSPECT',
  'RESEARCH',
  'OUTREACH_READY',
  'CONTACTED',
  'RESPONSE_RECEIVED',
  'MEETING_SCHEDULED',
  'PROPOSAL_SUBMITTED',
  'NEGOTIATION',
  'WRITTEN_CONFIRMATION',
  'AGREEMENT_PENDING',
  'CONFIRMED',
  'PAYMENT_PENDING',
  'PAID',
  'IN_KIND_CONFIRMED',
  'POSTPONED',
  'DECLINED',
];

export const STATUS_LABELS = {
  PROSPECT: 'Prospect',
  RESEARCH: 'Research',
  OUTREACH_READY: 'Outreach ready',
  CONTACTED: 'Contacted',
  RESPONSE_RECEIVED: 'Response received',
  MEETING_SCHEDULED: 'Meeting scheduled',
  PROPOSAL_SUBMITTED: 'Proposal submitted',
  NEGOTIATION: 'Negotiation',
  WRITTEN_CONFIRMATION: 'Written confirmation',
  AGREEMENT_PENDING: 'Agreement pending',
  CONFIRMED: 'Confirmed',
  PAYMENT_PENDING: 'Payment pending',
  PAID: 'Paid',
  IN_KIND_CONFIRMED: 'In-kind confirmed',
  POSTPONED: 'Postponed',
  DECLINED: 'Declined',
};

export const CATEGORY_LABELS = {
  TECHNOLOGY: 'Technology company',
  SOFTWARE_PRODUCT: 'Software product company',
  CLOUD_AI: 'Cloud / AI company',
  CYBERSECURITY: 'Cybersecurity company',
  ENGINEERING_AUTOMOTIVE: 'Engineering / automotive',
  FOOD_HOSPITALITY: 'Food / hospitality',
  TRAINING_CONSULTANCY: 'Training institute / consultancy',
  LOCAL_BUSINESS: 'Local business',
  OTHER: 'Other',
};

// Statuses that require written evidence (a confirmation reference).
export const WRITTEN_STATUSES = [
  'WRITTEN_CONFIRMATION',
  'AGREEMENT_PENDING',
  'CONFIRMED',
  'PAYMENT_PENDING',
  'PAID',
  'IN_KIND_CONFIRMED',
];

// Cash in these statuses counts as a confirmed commitment.
export const CONFIRMED_CASH_STATUSES = ['CONFIRMED', 'PAYMENT_PENDING', 'PAID'];

// Statuses that need the institutional agreement approval on record.
export const AGREEMENT_APPROVED_STATUSES = ['CONFIRMED', 'PAYMENT_PENDING', 'PAID', 'IN_KIND_CONFIRMED'];

export const AWAITING_AGREEMENT_STATUSES = ['WRITTEN_CONFIRMATION', 'AGREEMENT_PENDING'];

export const CLOSED_STATUSES = ['DECLINED', 'POSTPONED'];

const ORDER = Object.fromEntries(SPONSOR_STATUSES.map((s, i) => [s, i]));

export function statusRank(status) {
  return ORDER[status] ?? -1;
}

/**
 * Validates a proposed sponsor state (after an edit) and returns a list of
 * human-readable problems. An empty list means the state is allowed.
 */
export function validateSponsorState(next, { paymentsTotal = 0 } = {}) {
  const problems = [];
  const status = next.status;
  const hasWritten = Boolean(next.confirmationReference && String(next.confirmationReference).trim());

  if (WRITTEN_STATUSES.includes(status) && !hasWritten) {
    problems.push('This status needs a written confirmation reference (letter, signed email or PO number).');
  }
  if ((next.cashCommitted ?? 0) > 0 && !WRITTEN_STATUSES.includes(status)) {
    problems.push('A cash commitment can only be recorded once written confirmation has been received.');
  }
  if ((next.inKindValue ?? 0) > 0) {
    if (!next.inKindDescription || !String(next.inKindDescription).trim()) {
      problems.push('In-kind support needs a description of what is being provided.');
    }
    if (!hasWritten) {
      problems.push('In-kind support needs a written confirmation reference before its value is recorded.');
    }
  }
  if (AGREEMENT_APPROVED_STATUSES.includes(status) && !next.agreementApprovalRef) {
    problems.push('This status needs the institutional approval of the sponsorship agreement to be recorded first.');
  }
  if (CONFIRMED_CASH_STATUSES.includes(status) && !((next.cashCommitted ?? 0) > 0)) {
    problems.push('Confirmed cash statuses need the committed cash amount.');
  }
  if (status === 'IN_KIND_CONFIRMED' && !((next.inKindValue ?? 0) > 0)) {
    problems.push('In-kind confirmed needs the documented in-kind value.');
  }
  if (status === 'PAID' && paymentsTotal < (next.cashCommitted ?? 0)) {
    problems.push('Paid requires recorded payments covering the full committed amount.');
  }
  if (paymentsTotal > 0 && paymentsTotal > (next.cashCommitted ?? 0)) {
    problems.push('Recorded payments exceed the committed amount; update the commitment first.');
  }
  return problems;
}

export function sponsorPaymentsTotal(sponsor) {
  return sum(sponsor.payments ?? [], (p) => p.amount);
}

/** Pipeline money and activity metrics for the executive overview. */
export function pipelineMetrics(sponsors, { interactions = [], tasks = [], now = new Date() } = {}) {
  const confirmed = sponsors.filter((s) => CONFIRMED_CASH_STATUSES.includes(s.status));
  const confirmedCash = sum(confirmed, (s) => s.cashCommitted);
  const cashReceived = sum(sponsors, sponsorPaymentsTotal);
  const inKind = sum(
    sponsors.filter((s) => s.inKindValue > 0 && s.confirmationReference && WRITTEN_STATUSES.includes(s.status)),
    (s) => s.inKindValue,
  );
  const requested = sum(
    sponsors.filter((s) => !CLOSED_STATUSES.includes(s.status)),
    (s) => s.requestedAmount,
  );
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);

  return {
    prospects: sponsors.filter((s) => !CLOSED_STATUSES.includes(s.status)).length,
    declined: sponsors.filter((s) => s.status === 'DECLINED').length,
    postponed: sponsors.filter((s) => s.status === 'POSTPONED').length,
    requested,
    confirmedCash,
    cashReceived,
    pendingPayments: Math.max(0, confirmedCash - sum(confirmed, sponsorPaymentsTotal)),
    inKind,
    proposalsSubmitted: new Set(interactions.filter((i) => i.type === 'PROPOSAL' && i.sponsorId).map((i) => i.sponsorId)).size,
    meetingsCompleted: interactions.filter((i) => i.type === 'MEETING' && new Date(i.occurredAt) <= now).length,
    followUpsDue:
      sponsors.filter(
        (s) => s.nextFollowUpAt && new Date(s.nextFollowUpAt) <= endOfToday && !CLOSED_STATUSES.includes(s.status),
      ).length + tasks.filter((t) => t.status === 'OPEN' && t.dueDate && new Date(t.dueDate) <= endOfToday).length,
    awaitingAgreement: sponsors.filter((s) => AWAITING_AGREEMENT_STATUSES.includes(s.status)).length,
    byStatus: Object.fromEntries(SPONSOR_STATUSES.map((st) => [st, sponsors.filter((s) => s.status === st).length])),
  };
}
