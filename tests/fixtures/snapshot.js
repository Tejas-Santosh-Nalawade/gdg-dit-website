// Synthetic data only. Real roster and budget figures stay out of the repository.
export function makeSnapshot(overrides = {}) {
  const d = (s) => new Date(`${s}T00:00:00.000Z`);
  return {
    settings: {
      statedTeamSize: 5,
      statedDomainCounts: { EVENT_DIRECTOR_FINANCE: 1, MARKETING_SPONSORSHIP: 3 },
      budgetApproval: { status: 'PENDING_VERIFICATION' },
      historicalStated: { sections: { A: 1500 }, expenseTotal: 1500, incomeTotal: 400, net: 1100 },
      historicalMeta: {},
      sponsorTarget: 50000,
    },
    sponsors: [
      { id: 's1', companyName: 'Alpha Systems', category: 'TECHNOLOGY', status: 'CONFIRMED', requestedAmount: 40000, cashCommitted: 30000, inKindValue: 0, confirmationReference: 'Letter A/1', agreementApprovalRef: 'Principal approval 12', payments: [{ amount: 10000, reference: 'UTR1' }], contacts: [], interactions: [], nextFollowUpAt: null, package: { name: 'Gold', amount: 30000 } },
      { id: 's2', companyName: 'Beta Foods', category: 'FOOD_HOSPITALITY', status: 'IN_KIND_CONFIRMED', requestedAmount: null, cashCommitted: 0, inKindValue: 8000, inKindDescription: 'Snacks for 300', confirmationReference: 'Email 3 Dec', agreementApprovalRef: 'Approval 13', payments: [], contacts: [], interactions: [], nextFollowUpAt: null },
      { id: 's3', companyName: 'Gamma Labs', category: 'CLOUD_AI', status: 'NEGOTIATION', requestedAmount: 25000, cashCommitted: 0, inKindValue: 0, payments: [], contacts: [], interactions: [], nextFollowUpAt: d('2026-10-01') },
      { id: 's4', companyName: 'Delta Co', category: 'OTHER', status: 'DECLINED', requestedAmount: 99999, cashCommitted: 0, inKindValue: 0, payments: [], contacts: [], interactions: [], nextFollowUpAt: d('2026-10-01') },
    ],
    interactions: [
      { type: 'MEETING', sponsorId: 's1', occurredAt: d('2026-10-10'), summary: 'Intro meeting', attendees: 'A, B', outcome: 'Send proposal' },
      { type: 'PROPOSAL', sponsorId: 's1', occurredAt: d('2026-10-11'), summary: 'Proposal sent' },
      { type: 'PROPOSAL', sponsorId: 's1', occurredAt: d('2026-10-12'), summary: 'Revised proposal' },
      { type: 'MEETING', sponsorId: 's3', occurredAt: d('2027-01-10'), summary: 'Future meeting' },
    ],
    tasks: [{ status: 'OPEN', dueDate: d('2026-10-15'), title: 'Call Gamma' }],
    lines: [
      { id: 'l1', category: 'FOOD', description: 'Lunch', quantity: 10, unitCost: 100, estimatedTotal: 999, approvedAmount: null, quotationAmount: null, actualAmount: null, stage: 'ESTIMATE', fundingSource: 'UNASSIGNED', paymentStatus: 'UNPAID' },
      { id: 'l2', category: 'PRIZES', description: 'Winner', quantity: null, unitCost: null, estimatedTotal: 20000, approvedAmount: 20000, quotationAmount: null, actualAmount: null, stage: 'APPROVED', fundingSource: 'SPONSOR_CASH', fundingSponsorId: 's1', fundingSponsor: { companyName: 'Alpha Systems' }, paymentStatus: 'UNPAID' },
      { id: 'l3', category: 'FOOD', description: 'Snacks', quantity: null, unitCost: null, estimatedTotal: 8000, approvedAmount: null, quotationAmount: null, actualAmount: null, stage: 'ESTIMATE', fundingSource: 'IN_KIND', fundingSponsorId: 's2', paymentStatus: 'UNPAID' },
    ],
    income: [
      { source: 'ENTRY_FEES', amount: 5000, status: 'ESTIMATE' },
      { source: 'INSTITUTE', amount: 2000, status: 'CONFIRMED', reference: 'Office order 5' },
    ],
    historical: [
      { kind: 'EXPENSE', section: 'A', particulars: 'Meal', quantity: 10, rate: 100, amount: 1000 },
      { kind: 'EXPENSE', section: 'A', particulars: 'Kit', quantity: null, rate: null, amount: 500 },
      { kind: 'INCOME', section: 'Income', particulars: 'Fees', quantity: 4, rate: 100, amount: 400 },
    ],
    requests: [
      { id: 'r1', type: 'TPO', title: 'TPO support', stage: 'SUBMITTED', requestedAmount: null, approvedAmount: null, payments: [], fundingOptions: [], interactions: [], introducedSponsors: [] },
      { id: 'r2', type: 'FOUNDATION', title: 'Foundation fund', stage: 'APPROVED', requestedAmount: 50000, approvedAmount: 40000, approvalReference: 'DUF/2026/9', approvedOn: d('2026-12-01'), payments: [{ amount: 10000 }], fundingOptions: [{ mode: 'PRIZE_MONEY', amount: 40000, description: 'Prizes', milestones: null }], interactions: [], introducedSponsors: [] },
    ],
    milestones: [
      { key: 'a', name: 'Past done', startDate: d('2026-10-01'), endDate: d('2026-10-02'), progress: 'DONE' },
      { key: 'b', name: 'Past unrecorded', startDate: d('2026-10-01'), endDate: d('2026-10-02'), progress: null },
      { key: 'c', name: 'Future', startDate: d('2027-01-30'), endDate: d('2027-01-31'), progress: null },
    ],
    members: [
      { serialNo: 1, name: 'Director', domain: 'EVENT_DIRECTOR_FINANCE', position: 'Event Director & Finance', verified: true },
      { serialNo: 2, name: 'Lead', domain: 'MARKETING_SPONSORSHIP', position: 'Lead', verified: false },
      { serialNo: 4, name: null, domain: 'MARKETING_SPONSORSHIP', position: 'Member', verified: false },
    ],
    packages: [{ name: 'Gold', amount: 30000, slots: 2, benefits: ['Logo on website'], active: true }],
    ...overrides,
  };
}
