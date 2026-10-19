// Runs the services against a real PostgreSQL database.
// Set TEST_DATABASE_URL to a development database. Each run migrates a fresh,
// uniquely named schema and drops only that schema afterwards, so existing data is never touched.
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';
import { seed } from '../../prisma/seed.mjs';
import * as sponsors from '@/lib/organiser/services/sponsors';
import * as finance from '@/lib/organiser/services/finance';
import * as workflows from '@/lib/organiser/services/workflows';
import { getOverview } from '@/lib/organiser/services/overview';
import { ForbiddenError } from '@/lib/organiser/permissions';
import { RuleError, ValidationError } from '@/lib/organiser/errors';

const baseUrl = process.env.TEST_DATABASE_URL;
const suite = baseUrl ? describe : describe.skip;
const schema = `test_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const url = baseUrl ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}schema=${schema}` : undefined;

suite('organiser services (PostgreSQL)', () => {
  let db;
  const admin = { email: 'director@example.test', name: 'Director', role: 'ADMIN', active: true };
  const admin2 = { email: 'second-admin@example.test', name: 'Second', role: 'ADMIN', active: true };
  const financeUser = { email: 'finance@example.test', name: 'Finance', role: 'FINANCE', active: true };
  const sponsorship = { email: 'sponsorship@example.test', name: 'Sponsorship', role: 'SPONSORSHIP', active: true };
  const viewer = { email: 'viewer@example.test', name: 'Viewer', role: 'VIEWER', active: true };

  beforeAll(async () => {
    execSync('npx prisma migrate deploy', { env: { ...process.env, DATABASE_URL: url }, stdio: 'pipe' });
    db = new PrismaClient({ datasources: { db: { url } } });
    const data = JSON.parse(readFileSync('prisma/seed-data/incursion.example.json', 'utf8'));
    await seed(db, data, { bootstrapAdmins: [admin.email] });
  }, 120000);

  afterAll(async () => {
    if (db) {
      await db.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
      await db.$disconnect();
    }
  });

  it('seeds idempotently without overwriting edits', async () => {
    const before = await db.committeeMember.count();
    const data = JSON.parse(readFileSync('prisma/seed-data/incursion.example.json', 'utf8'));
    const log = await seed(db, data);
    expect(log).toEqual([]);
    expect(await db.committeeMember.count()).toBe(before);
    expect((await db.setting.findUnique({ where: { key: 'budget.approval' } })).value.status).toBe('PENDING_VERIFICATION');
  });

  let sponsorId;
  it('lets the sponsorship team add a prospect and audits it', async () => {
    const s = await sponsors.createSponsor(sponsorship, { companyName: 'Acme Cloud', category: 'CLOUD_AI', researchSource: 'Company website', requestedAmount: '50,000' }, db);
    sponsorId = s.id;
    expect(s.status).toBe('PROSPECT');
    expect(s.cashCommitted).toBe(0);
    const log = await db.auditLog.findFirst({ where: { entityId: s.id, action: 'sponsor.create' } });
    expect(log.actorEmail).toBe(sponsorship.email);
  });

  it('blocks read-only organisers from editing and leaves no trace', async () => {
    const count = await db.auditLog.count();
    await expect(sponsors.createSponsor(viewer, { companyName: 'X', category: 'OTHER', researchSource: 's' }, db)).rejects.toBeInstanceOf(ForbiddenError);
    expect(await db.auditLog.count()).toBe(count);
  });

  it('validates input on the server', async () => {
    await expect(sponsors.createSponsor(sponsorship, { companyName: '', category: 'NOPE' }, db)).rejects.toBeInstanceOf(ValidationError);
  });

  it('refuses to mark verbal interest as confirmed', async () => {
    const s = await db.sponsor.findUnique({ where: { id: sponsorId } });
    await expect(sponsors.updateSponsor(sponsorship, sponsorId, { ...s, status: 'CONFIRMED', website: undefined }, db)).rejects.toBeInstanceOf(RuleError);
  });

  it('runs written confirmation → agreement approval → confirmed → payment', async () => {
    await expect(sponsors.recordConfirmation(sponsorship, sponsorId, { cashCommitted: '40000', confirmationReference: 'Email 2 Dec' }, db)).rejects.toBeInstanceOf(ForbiddenError);
    const confirmed = await sponsors.recordConfirmation(financeUser, sponsorId, { cashCommitted: '40000', confirmationReference: 'Email 2 Dec', confirmationDate: '2026-12-02' }, db);
    expect(confirmed.status).toBe('WRITTEN_CONFIRMATION');

    await expect(sponsors.approveAgreement(financeUser, sponsorId, { agreementApprovalRef: 'X' }, db)).rejects.toBeInstanceOf(ForbiddenError);
    await sponsors.approveAgreement(admin, sponsorId, { agreementApprovalRef: 'Principal approval 2026/44' }, db);

    const s = await db.sponsor.findUnique({ where: { id: sponsorId } });
    const updated = await sponsors.updateSponsor(sponsorship, sponsorId, { companyName: s.companyName, category: s.category, status: 'CONFIRMED', requestedAmount: s.requestedAmount, researchSource: s.researchSource }, db);
    expect(updated.status).toBe('CONFIRMED');

    await expect(sponsors.recordPayment(financeUser, { sponsorId }, { amount: '50000', receivedOn: '2026-12-10', reference: 'UTR9' }, db)).rejects.toBeInstanceOf(RuleError);
    await sponsors.recordPayment(financeUser, { sponsorId }, { amount: '15000', receivedOn: '2026-12-10', reference: 'UTR1' }, db);

    const statusLogs = await db.auditLog.findMany({ where: { entityId: sponsorId }, orderBy: { createdAt: 'asc' } });
    expect(statusLogs.map((l) => l.action)).toEqual(['sponsor.create', 'sponsor.confirmation', 'sponsor.agreementApproved', 'sponsor.status']);
  });

  it('reports the money on the overview, and hides it from read-only organisers', async () => {
    const o = await getOverview(financeUser, new Date('2026-12-15T06:00:00Z'), db);
    expect(o.budgetApproved).toBe(false);
    expect(o.pipeline.confirmedCash).toBe(40000);
    expect(o.pipeline.cashReceived).toBe(15000);
    expect(o.pipeline.pendingPayments).toBe(25000);
    expect(o.milestones.find((m) => m.key === 'registration').status).toBe('PENDING_VERIFICATION');
    const v = await getOverview(viewer, new Date('2026-12-15T06:00:00Z'), db);
    expect(v.restricted).toBe(true);
    expect(v.pipeline.confirmedCash).toBeUndefined();
    expect(v.totals).toBeUndefined();
  });

  it('needs internal approval by someone else before an email can be marked sent', async () => {
    const draft = await workflows.createDraft(sponsorship, { templateKey: 'meetingRequest', sponsorId }, db);
    await expect(workflows.submitDraft(sponsorship, draft.id, db)).rejects.toThrow(/placeholder/);
    await workflows.editDraft(sponsorship, draft.id, { subject: draft.subject, body: 'Dear Ms. Rao,\n\nCould we meet on 3 Dec at 11:00?\n\nRegards' }, db);
    await workflows.submitDraft(sponsorship, draft.id, db);
    await expect(workflows.markDraftSent(sponsorship, draft.id, db)).rejects.toBeInstanceOf(RuleError);
    await expect(workflows.reviewDraft(sponsorship, draft.id, { decision: 'APPROVED' }, db)).rejects.toBeInstanceOf(ForbiddenError);
    await workflows.reviewDraft(admin, draft.id, { decision: 'APPROVED' }, db);
    const sent = await workflows.markDraftSent(sponsorship, draft.id, db);
    expect(sent.status).toBe('SENT_MANUALLY');
    expect(await db.interaction.count({ where: { sponsorId, summary: { startsWith: 'Sent:' } } })).toBe(1);

    const own = await workflows.createDraft(admin, { templateKey: 'proposalFollowUp', sponsorId }, db);
    await workflows.editDraft(admin, own.id, { subject: 'Follow-up', body: 'Plain text with no placeholders.' }, db);
    await workflows.submitDraft(admin, own.id, db);
    await expect(workflows.reviewDraft(admin, own.id, { decision: 'APPROVED' }, db)).rejects.toThrow(/someone other/);
    await workflows.reviewDraft(admin2, own.id, { decision: 'REJECTED', reviewNote: 'Tone' }, db);
  });

  it('keeps budget stages honest and approval explicit', async () => {
    const line = await db.budgetLine.findFirst();
    const base = { category: line.category, description: line.description, quotationStatus: 'NOT_REQUESTED', stage: 'ESTIMATE', fundingSource: 'UNASSIGNED', paymentStatus: 'UNPAID', estimatedTotal: String(line.estimatedTotal) };
    await expect(finance.saveBudgetLine(financeUser, line.id, { ...base, stage: 'APPROVED' }, db)).rejects.toThrow(/approval/);
    await expect(finance.saveBudgetLine(sponsorship, line.id, base, db)).rejects.toBeInstanceOf(ForbiddenError);
    await expect(finance.setBudgetApproval(admin, { status: 'APPROVED', approvedBy: 'Principal', approvalReference: 'R1', approvedOn: '2026-11-01' }, db)).rejects.toThrow(/Every budget line/);

    for (const l of await db.budgetLine.findMany()) {
      await finance.approveBudgetLine(admin, l.id, { approvedAmount: String(l.estimatedTotal), approvalRecord: 'Sanction R1' }, db);
    }
    await finance.setBudgetApproval(admin, { status: 'APPROVED', approvedBy: 'Principal', approvalReference: 'R1', approvedOn: '2026-11-01' }, db);
    const o = await getOverview(admin, new Date('2026-12-15T06:00:00Z'), db);
    expect(o.budgetApproved).toBe(true);
    expect(o.funding.basis).toBe('APPROVED');
    await expect(finance.deleteBudgetLine(admin, line.id, db)).rejects.toBeInstanceOf(RuleError);
  });

  it('records a partial Foundation approval only with a reference', async () => {
    const req = await db.institutionalRequest.findFirst({ where: { type: 'FOUNDATION' } });
    await workflows.updateRequest(sponsorship, req.id, { title: req.title, stage: 'SUBMITTED', requestedAmount: '100000' }, db);
    await expect(workflows.updateRequest(sponsorship, req.id, { title: req.title, stage: 'APPROVED' }, db)).rejects.toBeInstanceOf(RuleError);
    await expect(sponsors.recordPayment(financeUser, { requestId: req.id }, { amount: '1000', receivedOn: '2026-12-01', reference: 'X' }, db)).rejects.toThrow(/approval/);
    const approved = await workflows.recordRequestApproval(financeUser, req.id, { approvedAmount: '60000', approvalReference: 'DUF/12', approvedOn: '2026-12-20' }, db);
    expect(approved.stage).toBe('PARTIALLY_APPROVED');
    await workflows.addFundingOption(sponsorship, req.id, { mode: 'PROTOTYPE_GRANT', amount: '20000', description: 'Five grants' }, db);
    const tpo = await db.institutionalRequest.findFirst({ where: { type: 'TPO' } });
    await expect(workflows.addFundingOption(sponsorship, tpo.id, { mode: 'PRIZE_MONEY', amount: '1', description: 'x' }, db)).rejects.toBeInstanceOf(RuleError);
  });

  it('lets admins verify the roster and manage access, but not lock themselves out', async () => {
    const blank = await db.committeeMember.findFirst({ where: { name: null } });
    await expect(workflows.saveCommitteeMember(sponsorship, blank.id, { domain: blank.domain, position: blank.position, name: 'X' }, db)).rejects.toBeInstanceOf(ForbiddenError);
    const fixed = await workflows.saveCommitteeMember(admin, blank.id, { domain: blank.domain, position: blank.position, name: 'Verified Name', verified: 'on', serialNo: String(blank.serialNo) }, db);
    expect(fixed).toMatchObject({ name: 'Verified Name', verified: true });

    const me = await db.organizer.findUnique({ where: { email: admin.email } });
    await expect(workflows.saveOrganiser(admin, me.id, { email: me.email, name: me.name, role: 'VIEWER', active: 'on' }, db)).rejects.toThrow(/own admin/);
    const added = await workflows.saveOrganiser(admin, undefined, { email: 'New.Member@Example.test', name: 'New', role: 'SPONSORSHIP', active: 'on' }, db);
    expect(added.email).toBe('new.member@example.test');
  });
});
