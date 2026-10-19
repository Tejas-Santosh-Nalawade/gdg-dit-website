import { prisma } from '../db';
import { assertCan, can } from '../permissions';
import { getSettings } from '../settings';
import { pipelineMetrics } from '../pipeline';
import { budgetTotals, fundingPosition, fundingAllocationIssues, reconcileHistorical } from '../budget';
import { milestoneStatus } from '../milestones';
import { rosterVerification } from '../roster';
import { sum } from '../money';

/** Loads everything the dashboard and the document generator need, once. */
export async function loadSnapshot(db = prisma) {
  const [settings, sponsors, interactions, tasks, lines, income, historical, requests, milestones, members, packages] =
    await Promise.all([
      getSettings(db),
      db.sponsor.findMany({ include: { payments: true, contacts: true, package: true, assignedTo: true, interactions: true }, orderBy: { companyName: 'asc' } }),
      db.interaction.findMany(),
      db.task.findMany({ include: { assignee: true, sponsor: true }, orderBy: { dueDate: 'asc' } }),
      db.budgetLine.findMany({ include: { responsible: true, fundingSponsor: true }, orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }] }),
      db.incomeLine.findMany(),
      db.historicalBudgetItem.findMany({ orderBy: { sortOrder: 'asc' } }),
      db.institutionalRequest.findMany({ include: { fundingOptions: true, payments: true, interactions: true, introducedSponsors: true } }),
      db.milestone.findMany({ orderBy: { sortOrder: 'asc' } }),
      db.committeeMember.findMany({ orderBy: [{ serialNo: 'asc' }, { name: 'asc' }] }),
      db.sponsorshipPackage.findMany({ orderBy: [{ amount: 'desc' }, { name: 'asc' }] }),
    ]);
  return { settings, sponsors, interactions, tasks, lines, income, historical, requests, milestones, members, packages };
}

export function computeOverview(snapshot, now = new Date()) {
  const { settings, sponsors, interactions, tasks, lines, income, historical, requests, milestones, members } = snapshot;
  const budgetApproved = settings.budgetApproval?.status === 'APPROVED';
  const totals = budgetTotals(lines);
  const pipeline = pipelineMetrics(sponsors, { interactions, tasks, now });
  const institutionalApproved = sum(
    requests.filter((r) => ['APPROVED', 'PARTIALLY_APPROVED'].includes(r.stage)),
    (r) => r.approvedAmount,
  );
  const institutionalReceived = sum(requests, (r) => sum(r.payments, (p) => p.amount));
  const otherConfirmedIncome = sum(income.filter((i) => i.status !== 'ESTIMATE'), (i) => i.amount);
  const funding = fundingPosition({
    totals,
    budgetApproved,
    confirmedSponsorCash: pipeline.confirmedCash,
    institutionalApproved,
    otherConfirmedIncome,
  });
  const now0 = now;
  return {
    generatedAt: now0,
    budgetApproved,
    budgetApproval: settings.budgetApproval,
    totals,
    pipeline,
    funding,
    sponsorTarget: settings.sponsorTarget,
    institutionalApproved,
    institutionalReceived,
    otherConfirmedIncome,
    estimatedIncome: sum(income.filter((i) => i.status === 'ESTIMATE'), (i) => i.amount),
    allocationIssues: fundingAllocationIssues(lines, sponsors),
    historical: reconcileHistorical(historical, settings.historicalStated),
    milestones: milestones.map((m) => ({ ...m, status: milestoneStatus(m, now) })),
    roster: rosterVerification(members, { teamSize: settings.statedTeamSize, domainCounts: settings.statedDomainCounts }),
  };
}

/** Dashboard data, with money removed for organisers who may not see it. */
export async function getOverview(actor, now = new Date(), db = prisma) {
  assertCan(actor, 'dashboard:view');
  const snapshot = await loadSnapshot(db);
  const overview = computeOverview(snapshot, now);
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);
  const followUps = snapshot.sponsors
    .filter((s) => s.nextFollowUpAt && new Date(s.nextFollowUpAt) <= endOfToday && !['DECLINED', 'POSTPONED'].includes(s.status))
    .map((s) => ({ id: s.id, companyName: s.companyName, nextFollowUpAt: s.nextFollowUpAt, assignee: s.assignedTo?.name }));
  const openTasks = snapshot.tasks.filter((t) => t.status === 'OPEN').slice(0, 10);

  if (!can(actor.role, 'finance:viewTotals')) {
    return {
      restricted: true,
      generatedAt: overview.generatedAt,
      budgetApproved: overview.budgetApproved,
      pipeline: { prospects: overview.pipeline.prospects, proposalsSubmitted: overview.pipeline.proposalsSubmitted, meetingsCompleted: overview.pipeline.meetingsCompleted, followUpsDue: overview.pipeline.followUpsDue, awaitingAgreement: overview.pipeline.awaitingAgreement, byStatus: overview.pipeline.byStatus },
      milestones: overview.milestones,
      roster: overview.roster,
      followUps,
      openTasks,
    };
  }
  return { ...overview, restricted: false, followUps, openTasks };
}
