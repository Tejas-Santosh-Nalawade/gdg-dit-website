import { describe, it, expect } from 'vitest';
import { buildDocument, DOCUMENTS, PENDING_LABEL, BUDGET_PENDING_LABEL } from '@/lib/organiser/documents/builders';
import { complianceProblems, assertCompliant } from '@/lib/organiser/documents/compliance';
import { renderPdf } from '@/lib/organiser/documents/render-pdf';
import { renderDocx } from '@/lib/organiser/documents/render-docx';
import { renderTemplate, buildTemplateContext, TEMPLATE_KEYS } from '@/lib/organiser/outreach/templates';
import { formatINR } from '@/lib/organiser/money';
import { makeSnapshot } from '../fixtures/snapshot';

const now = new Date('2026-10-19T10:00:00Z');
const text = (doc) => JSON.stringify(doc);

describe('document builders', () => {
  const snap = makeSnapshot();

  it.each(Object.keys(DOCUMENTS))('%s builds, names GDG DIT and passes compliance', (slug) => {
    const doc = buildDocument(slug, snap, { now });
    expect(doc.title).toBeTruthy();
    expect(doc.eventLine).toMatch(/THE INCURSION 2027/);
    expect(doc.eventLine).toMatch(/GDG DIT/);
    expect(() => assertCompliant(doc)).not.toThrow();
  });

  it('labels documents with proposed amounts while the budget is pending', () => {
    expect(buildDocument('corporate-proposal', snap, { now }).statusLabel).toBe(PENDING_LABEL);
    expect(buildDocument('budget-timeline', snap, { now }).statusLabel).toBe(BUDGET_PENDING_LABEL);
  });

  it('drops the budget label once an approval is recorded', () => {
    const approved = makeSnapshot({
      settings: { ...snap.settings, budgetApproval: { status: 'APPROVED', approvedBy: 'Principal', approvalReference: 'REF', approvedOn: '2026-11-01' } },
    });
    expect(buildDocument('budget-timeline', approved, { now }).statusLabel).toBeNull();
  });

  it('never prints invented signatures or approvals', () => {
    const doc = buildDocument('tpo-request', snap, { now });
    const approval = doc.sections.find((s) => s.heading === 'Approval record');
    expect(approval.fields.every((f) => /^_+$/.test(f.value))).toBe(true);
  });

  it('shows the Foundation as approved only with its recorded reference', () => {
    expect(text(buildDocument('foundation-proposal', snap, { now }))).toMatch(/DUF\/2026\/9/);
  });

  it('builds a checklist for one sponsor', () => {
    const doc = buildDocument('confirmation-checklist', snap, { now, sponsorId: 's1' });
    expect(doc.subtitle).toBe('Alpha Systems');
    expect(doc.sections).toHaveLength(1);
  });

  it('blocks old titles and unauthorised co-organisers', () => {
    expect(complianceProblems({ title: 'UDGAM 2026' })).not.toEqual([]);
    expect(complianceProblems({ x: ['with ACES and AWS SBG DIT'] })).toHaveLength(2);
    expect(complianceProblems({ x: 'Marvel Avengers' })).toHaveLength(2);
    expect(complianceProblems({ x: 'Doomsday Avenger, aces of design' })).toEqual([]);
  });
});

describe('renderers', () => {
  const snap = makeSnapshot();
  it('renders a multi-page PDF with page numbers and no rupee glyph', async () => {
    const doc = buildDocument('budget-timeline', snap, { now, money: (v) => formatINR(v, { symbol: 'Rs.' }) });
    const buf = await renderPdf(doc);
    expect(buf.subarray(0, 5).toString()).toBe('%PDF-');
    expect(buf.length).toBeGreaterThan(2000);
  });
  it('renders every document as PDF and DOCX', async () => {
    for (const slug of Object.keys(DOCUMENTS)) {
      const doc = buildDocument(slug, snap, { now });
      const pdf = await renderPdf(doc);
      const docx = await renderDocx(doc);
      expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
      expect(docx.subarray(0, 2).toString()).toBe('PK'); // DOCX is a zip archive
    }
  });
});

describe('outreach templates', () => {
  it.each(TEMPLATE_KEYS)('%s leaves unknown facts as placeholders', (key) => {
    const r = renderTemplate(key, buildTemplateContext({}));
    expect(r.body).toMatch(/\[[^\]]+\]/);
    expect(complianceProblems(r)).toEqual([]);
  });
  it('fills only verified CRM fields', () => {
    const r = renderTemplate('initial', buildTemplateContext({ sponsor: { companyName: 'Alpha', contacts: [{ name: 'Ms. Rao' }], package: { name: 'Gold', amount: 30000 } } }));
    expect(r.body).toMatch(/Dear Ms\. Rao/);
    expect(r.body).toMatch(/Gold package \(₹30,000\)/);
    expect(r.body).not.toMatch(/guarantee/i);
  });
});
