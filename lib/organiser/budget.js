// Budget calculations: historical reconciliation and the INCURSION budget.
import { sum } from './money';

export const BUDGET_CATEGORY_LABELS = {
  FOOD: 'Food & refreshments',
  PRIZES: 'Prize money',
  BRANDING: 'Branding & publicity',
  GUESTS_JUDGES: 'Guest & judge expenses',
  LOGISTICS: 'Logistics & miscellaneous',
  INAUGURATION: 'Inauguration function',
  VALEDICTORY: 'Valedictory function',
  NIGHT_TIME: 'Night-time requirements',
  TECH_INFRASTRUCTURE: 'Technical infrastructure',
  PARTICIPANT_MATERIALS: 'Participant materials',
  SAFETY: 'Safety & medical',
  HOSPITALITY: 'Hospitality',
  CONTINGENCY: 'Contingency',
  OTHER: 'Operation, tech & other',
};

export const STAGE_LABELS = {
  ESTIMATE: 'Estimate',
  QUOTED: 'Quotation received',
  APPROVED: 'Approved',
  COMMITTED: 'Committed (PO / order placed)',
  INVOICED: 'Invoiced',
  PAID: 'Paid',
};

export const FUNDING_SOURCE_LABELS = {
  UNASSIGNED: 'Not yet assigned',
  INSTITUTE: 'Institute',
  SPONSOR_CASH: 'Sponsor (cash)',
  IN_KIND: 'Sponsor (in-kind)',
  ENTRY_FEES: 'Entry fees',
  FOUNDATION: 'DPU Unitech Foundation',
};

/**
 * Recomputes every line and section of the historical budget and compares it
 * with the totals stated in the source document.
 * items: [{ kind, section, particulars, quantity, rate, amount }]
 * stated: { sections: { [section]: number }, expenseTotal, incomeTotal, net }
 */
export function reconcileHistorical(items, stated = {}) {
  const issues = [];
  for (const item of items) {
    if (item.quantity != null && item.rate != null && item.quantity * item.rate !== item.amount) {
      issues.push({
        type: 'LINE_MISMATCH',
        message: `${item.section} – ${item.particulars}: ${item.quantity} × ${item.rate} = ${item.quantity * item.rate}, stated ${item.amount}`,
      });
    }
  }
  const expenses = items.filter((i) => i.kind === 'EXPENSE');
  const income = items.filter((i) => i.kind === 'INCOME');
  const sections = {};
  for (const e of expenses) sections[e.section] = (sections[e.section] ?? 0) + e.amount;

  for (const [section, statedTotal] of Object.entries(stated.sections ?? {})) {
    if (sections[section] !== statedTotal) {
      issues.push({
        type: 'SECTION_MISMATCH',
        message: `${section}: lines add to ${sections[section] ?? 0}, stated ${statedTotal}`,
      });
    }
  }
  const expenseTotal = sum(expenses, (e) => e.amount);
  const incomeTotal = sum(income, (i) => i.amount);
  const net = expenseTotal - incomeTotal;
  const check = (label, computed, statedValue) => {
    if (statedValue != null && computed !== statedValue) {
      issues.push({ type: 'TOTAL_MISMATCH', message: `${label}: computed ${computed}, stated ${statedValue}` });
    }
  };
  check('Expense total', expenseTotal, stated.expenseTotal);
  check('Income total', incomeTotal, stated.incomeTotal);
  check('Net requirement', net, stated.net);

  return { sections, expenseTotal, incomeTotal, net, issues, consistent: issues.length === 0 };
}

export function lineEstimate(line) {
  if (line.quantity != null && line.unitCost != null) return line.quantity * line.unitCost;
  return line.estimatedTotal ?? 0;
}

/** The figure a line currently stands at, from the most certain record available. */
export function lineCurrentAmount(line) {
  if (line.actualAmount != null) return line.actualAmount;
  if (line.approvedAmount != null) return line.approvedAmount;
  if (line.quotationAmount != null) return line.quotationAmount;
  return lineEstimate(line);
}

/**
 * Totals for the INCURSION budget. Lines funded in kind are kept out of the
 * cash requirement so sponsor goods are never counted as both income and expense.
 */
export function budgetTotals(lines) {
  const cashLines = lines.filter((l) => l.fundingSource !== 'IN_KIND');
  const inKindLines = lines.filter((l) => l.fundingSource === 'IN_KIND');
  const approvedLines = lines.filter((l) => l.approvedAmount != null);
  return {
    proposed: sum(lines, lineEstimate),
    proposedCash: sum(cashLines, lineEstimate),
    inKindCovered: sum(inKindLines, lineEstimate),
    quoted: sum(lines.filter((l) => l.quotationAmount != null), (l) => l.quotationAmount),
    approved: sum(approvedLines, (l) => l.approvedAmount),
    approvedCash: sum(approvedLines.filter((l) => l.fundingSource !== 'IN_KIND'), (l) => l.approvedAmount),
    approvedLineCount: approvedLines.length,
    actual: sum(lines.filter((l) => l.actualAmount != null), (l) => l.actualAmount),
    paid: sum(lines.filter((l) => l.paymentStatus === 'PAID'), lineCurrentAmount),
    byCategory: lines.reduce((acc, l) => {
      acc[l.category] = (acc[l.category] ?? 0) + lineEstimate(l);
      return acc;
    }, {}),
    lineCount: lines.length,
  };
}

/**
 * Checks that money attributed to sponsors in the budget does not exceed what
 * each sponsor has actually committed in writing.
 */
export function fundingAllocationIssues(lines, sponsors) {
  const committed = Object.fromEntries(sponsors.map((s) => [s.id, s]));
  const allocated = {};
  const issues = [];
  for (const l of lines) {
    if (l.fundingSource === 'SPONSOR_CASH' || l.fundingSource === 'IN_KIND') {
      if (!l.fundingSponsorId) {
        issues.push(`"${l.description}" is marked sponsor-funded but no sponsor is linked.`);
        continue;
      }
      const key = `${l.fundingSponsorId}:${l.fundingSource}`;
      allocated[key] = (allocated[key] ?? 0) + lineCurrentAmount(l);
    }
  }
  for (const [key, amount] of Object.entries(allocated)) {
    const [id, source] = key.split(':');
    const s = committed[id];
    const available = !s ? 0 : source === 'IN_KIND' ? s.inKindValue : s.cashCommitted;
    if (amount > available) {
      issues.push(
        `${s?.companyName ?? 'Unknown sponsor'}: ${amount} allocated as ${source === 'IN_KIND' ? 'in-kind' : 'cash'} but only ${available} is confirmed in writing.`,
      );
    }
  }
  return issues;
}

/**
 * Funding position. The base is the approved budget when one is recorded,
 * otherwise the proposed cash budget (and the result is flagged as such).
 */
export function fundingPosition({ totals, budgetApproved, confirmedSponsorCash, institutionalApproved, otherConfirmedIncome }) {
  const base = budgetApproved ? totals.approvedCash : totals.proposedCash;
  const secured = confirmedSponsorCash + institutionalApproved + otherConfirmedIncome;
  return {
    base,
    basis: budgetApproved ? 'APPROVED' : 'PROPOSED',
    secured,
    gap: Math.max(0, base - secured),
    surplus: Math.max(0, secured - base),
  };
}
