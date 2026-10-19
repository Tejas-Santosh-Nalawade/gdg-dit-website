import { describe, it, expect } from 'vitest';
import { validateSponsorState, pipelineMetrics } from '@/lib/organiser/pipeline';
import { makeSnapshot } from '../fixtures/snapshot';

describe('sponsor state rules', () => {
  const base = { status: 'NEGOTIATION', cashCommitted: 0, inKindValue: 0 };

  it('allows early pipeline stages with no money', () => {
    expect(validateSponsorState(base)).toEqual([]);
  });
  it('rejects a cash commitment without written confirmation (verbal interest)', () => {
    const p = validateSponsorState({ ...base, cashCommitted: 50000 });
    expect(p.join(' ')).toMatch(/written confirmation/);
  });
  it('requires a confirmation reference for written statuses', () => {
    expect(validateSponsorState({ ...base, status: 'WRITTEN_CONFIRMATION' }).length).toBeGreaterThan(0);
    expect(validateSponsorState({ ...base, status: 'WRITTEN_CONFIRMATION', confirmationReference: 'Letter 1' })).toEqual([]);
  });
  it('requires agreement approval before Confirmed', () => {
    const s = { ...base, status: 'CONFIRMED', cashCommitted: 1000, confirmationReference: 'L1' };
    expect(validateSponsorState(s).join(' ')).toMatch(/institutional approval/);
    expect(validateSponsorState({ ...s, agreementApprovalRef: 'A1' })).toEqual([]);
  });
  it('requires full payment before Paid', () => {
    const s = { ...base, status: 'PAID', cashCommitted: 1000, confirmationReference: 'L1', agreementApprovalRef: 'A1' };
    expect(validateSponsorState(s, { paymentsTotal: 500 }).join(' ')).toMatch(/Paid requires/);
    expect(validateSponsorState(s, { paymentsTotal: 1000 })).toEqual([]);
  });
  it('requires a description and evidence for in-kind value', () => {
    const p = validateSponsorState({ ...base, status: 'WRITTEN_CONFIRMATION', confirmationReference: 'L', inKindValue: 500 });
    expect(p.join(' ')).toMatch(/description/);
  });
});

describe('pipeline metrics', () => {
  const snap = makeSnapshot();
  const m = pipelineMetrics(snap.sponsors, { interactions: snap.interactions, tasks: snap.tasks, now: new Date('2026-10-19T12:00:00Z') });

  it('counts only confirmed statuses as confirmed cash', () => {
    expect(m.confirmedCash).toBe(30000);
  });
  it('keeps received, pending and in-kind separate', () => {
    expect(m.cashReceived).toBe(10000);
    expect(m.pendingPayments).toBe(20000);
    expect(m.inKind).toBe(8000);
  });
  it('excludes declined sponsors from prospects and requests', () => {
    expect(m.prospects).toBe(3);
    expect(m.requested).toBe(65000);
  });
  it('counts proposals per sponsor, past meetings and due follow-ups', () => {
    expect(m.proposalsSubmitted).toBe(1);
    expect(m.meetingsCompleted).toBe(1);
    expect(m.followUpsDue).toBe(2); // Gamma follow-up + open task; declined Delta ignored
  });
});
