import { prisma } from './db';

export const SETTING_KEYS = {
  statedTeamSize: 'event.statedTeamSize',
  statedDomainCounts: 'roster.statedDomainCounts',
  budgetApproval: 'budget.approval',
  historicalStated: 'historical.statedTotals',
  historicalMeta: 'historical.meta',
  sponsorTarget: 'sponsor.target',
};

export const DEFAULT_BUDGET_APPROVAL = { status: 'PENDING_VERIFICATION' };

export async function getSettings(db = prisma) {
  const rows = await db.setting.findMany();
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return {
    statedTeamSize: map[SETTING_KEYS.statedTeamSize] ?? null,
    statedDomainCounts: map[SETTING_KEYS.statedDomainCounts] ?? {},
    budgetApproval: map[SETTING_KEYS.budgetApproval] ?? DEFAULT_BUDGET_APPROVAL,
    historicalStated: map[SETTING_KEYS.historicalStated] ?? {},
    historicalMeta: map[SETTING_KEYS.historicalMeta] ?? {},
    sponsorTarget: map[SETTING_KEYS.sponsorTarget] ?? null,
  };
}

export async function putSetting(tx, key, value, actor) {
  return tx.setting.upsert({
    where: { key },
    create: { key, value, updatedBy: actor?.email },
    update: { value, updatedBy: actor?.email },
  });
}
