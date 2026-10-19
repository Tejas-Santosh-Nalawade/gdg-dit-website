// Seeds the organiser database from a JSON file. Safe to re-run: each table is
// only seeded while it is empty, so later edits by organisers are never overwritten.
//
//   SEED_FILE=path/to/incursion.local.json npx prisma db seed
//
// The real file holds internal names and figures and must not be committed;
// prisma/seed-data/*.local.json is git-ignored.
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function seedPath() {
  const candidates = [process.env.SEED_FILE, 'prisma/seed-data/incursion.local.json', 'prisma/seed-data/incursion.example.json'].filter(Boolean);
  const found = candidates.find((p) => existsSync(resolve(p)));
  if (!found) throw new Error('No seed file found. Set SEED_FILE.');
  return resolve(found);
}

export async function seed(db, data, { bootstrapAdmins = [] } = {}) {
  const log = [];
  const s = data.settings ?? {};
  const settings = {
    'event.statedTeamSize': s.statedTeamSize,
    'roster.statedDomainCounts': s.statedDomainCounts,
    'historical.statedTotals': s.historicalStated,
    'historical.meta': s.historicalMeta,
    'budget.approval': { status: 'PENDING_VERIFICATION' },
  };
  for (const [key, value] of Object.entries(settings)) {
    if (value === undefined) continue;
    const exists = await db.setting.findUnique({ where: { key } });
    if (!exists) {
      await db.setting.create({ data: { key, value, updatedBy: 'seed' } });
      log.push(`setting ${key}`);
    }
  }

  if ((await db.milestone.count()) === 0) {
    await db.milestone.createMany({
      data: data.milestones.map((m, i) => ({ ...m, startDate: new Date(m.startDate), endDate: new Date(m.endDate), sortOrder: i })),
    });
    log.push(`${data.milestones.length} milestones`);
  }

  if ((await db.committeeMember.count()) === 0) {
    await db.committeeMember.createMany({ data: data.committee.map((m) => ({ ...m, verified: false })) });
    log.push(`${data.committee.length} committee entries`);
  }

  if ((await db.historicalBudgetItem.count()) === 0) {
    await db.historicalBudgetItem.createMany({
      data: data.historicalBudget.map(({ incursionCategory, ...item }, i) => ({ ...item, sortOrder: i })),
    });
    log.push(`${data.historicalBudget.length} historical budget items`);
  }

  if (data.seedIncursionBudgetFromHistorical && (await db.budgetLine.count()) === 0) {
    const lines = data.historicalBudget
      .filter((i) => i.kind === 'EXPENSE')
      .map((i, idx) => ({
        category: i.incursionCategory ?? i.category ?? 'OTHER',
        description: i.particulars,
        quantity: i.quantity,
        unitCost: i.rate,
        estimatedTotal: i.amount,
        notes: 'Planning estimate carried over from the historical budget. Not approved.',
        sortOrder: idx,
      }));
    await db.budgetLine.createMany({ data: lines });
    log.push(`${lines.length} INCURSION budget lines (estimates)`);
  }

  if ((await db.incomeLine.count()) === 0 && data.incomeEstimates?.length) {
    await db.incomeLine.createMany({ data: data.incomeEstimates });
    log.push(`${data.incomeEstimates.length} income estimates`);
  }

  if ((await db.sponsor.count()) === 0 && data.sponsorProspects?.length) {
    await db.sponsor.createMany({
      data: data.sponsorProspects.map((p) => ({ ...p, status: 'PROSPECT', researchDate: new Date() })),
    });
    log.push(`${data.sponsorProspects.length} sponsor prospects`);
  }

  if ((await db.sponsorshipPackage.count()) === 0 && data.packages?.length) {
    await db.sponsorshipPackage.createMany({ data: data.packages });
    log.push(`${data.packages.length} packages`);
  }

  if ((await db.institutionalRequest.count()) === 0) {
    await db.institutionalRequest.createMany({ data: data.institutionalRequests });
    log.push(`${data.institutionalRequests.length} institutional requests`);
  }

  for (const email of bootstrapAdmins) {
    await db.organizer.upsert({
      where: { email },
      create: { email, name: email.split('@')[0], role: 'ADMIN', active: true },
      update: {},
    });
    log.push(`admin ${email}`);
  }
  return log;
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const path = seedPath();
  const data = JSON.parse(readFileSync(path, 'utf8'));
  const admins = (process.env.ORGANISER_BOOTSTRAP_ADMINS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  seed(prisma, data, { bootstrapAdmins: admins })
    .then((log) => {
      console.log(`Seeded from ${path}:`);
      console.log(log.length ? log.map((l) => `  - ${l}`).join('\n') : '  nothing new (tables already populated)');
    })
    .catch((e) => {
      console.error(e);
      process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
}
