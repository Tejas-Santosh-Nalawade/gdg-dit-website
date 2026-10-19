import { describe, it, expect } from 'vitest';
import { reconcileHistorical, budgetTotals, fundingAllocationIssues, fundingPosition, lineEstimate, lineCurrentAmount } from '@/lib/organiser/budget';
import { makeSnapshot } from '../fixtures/snapshot';

describe('historical reconciliation', () => {
  const snap = makeSnapshot();
  it('passes when every line and total recomputes', () => {
    const r = reconcileHistorical(snap.historical, snap.settings.historicalStated);
    expect(r.consistent).toBe(true);
    expect(r).toMatchObject({ expenseTotal: 1500, incomeTotal: 400, net: 1100 });
  });
  it('flags a wrong line, section and total', () => {
    const items = [...snap.historical];
    items[0] = { ...items[0], amount: 1100 };
    const r = reconcileHistorical(items, snap.settings.historicalStated);
    expect(r.consistent).toBe(false);
    const types = r.issues.map((i) => i.type);
    expect(types).toContain('LINE_MISMATCH');
    expect(types).toContain('SECTION_MISMATCH');
    expect(types).toContain('TOTAL_MISMATCH');
  });
});

describe('INCURSION budget totals', () => {
  const snap = makeSnapshot();
  const t = budgetTotals(snap.lines);
  it('uses quantity × unit cost over a stale estimate', () => {
    expect(lineEstimate(snap.lines[0])).toBe(1000);
  });
  it('keeps in-kind lines out of the cash requirement', () => {
    expect(t.proposed).toBe(29000);
    expect(t.inKindCovered).toBe(8000);
    expect(t.proposedCash).toBe(21000);
  });
  it('counts only lines with an approval as approved', () => {
    expect(t.approved).toBe(20000);
    expect(t.approvedLineCount).toBe(1);
  });
  it('prefers actual, then approved, then quote, then estimate', () => {
    expect(lineCurrentAmount({ estimatedTotal: 1, quotationAmount: 2, approvedAmount: 3, actualAmount: 4 })).toBe(4);
    expect(lineCurrentAmount({ estimatedTotal: 1, quotationAmount: 2, approvedAmount: 3 })).toBe(3);
    expect(lineCurrentAmount({ estimatedTotal: 1, quotationAmount: 2 })).toBe(2);
  });
});

describe('funding', () => {
  const snap = makeSnapshot();
  it('accepts allocations within written commitments', () => {
    expect(fundingAllocationIssues(snap.lines, snap.sponsors)).toEqual([]);
  });
  it('flags sponsor money allocated beyond what was committed', () => {
    const lines = [...snap.lines, { ...snap.lines[1], id: 'l4', approvedAmount: 15000 }];
    expect(fundingAllocationIssues(lines, snap.sponsors)[0]).toMatch(/Alpha Systems/);
  });
  it('flags sponsor-funded lines with no sponsor', () => {
    expect(fundingAllocationIssues([{ ...snap.lines[1], fundingSponsorId: null }], snap.sponsors)[0]).toMatch(/no sponsor/);
  });
  it('measures the gap against the proposed budget until approved', () => {
    const totals = budgetTotals(snap.lines);
    const f = fundingPosition({ totals, budgetApproved: false, confirmedSponsorCash: 30000, institutionalApproved: 0, otherConfirmedIncome: 0 });
    expect(f.basis).toBe('PROPOSED');
    expect(f.gap).toBe(0);
    expect(f.surplus).toBe(9000);
    const g = fundingPosition({ totals, budgetApproved: true, confirmedSponsorCash: 5000, institutionalApproved: 0, otherConfirmedIncome: 0 });
    expect(g).toMatchObject({ basis: 'APPROVED', base: 20000, gap: 15000 });
  });
});
