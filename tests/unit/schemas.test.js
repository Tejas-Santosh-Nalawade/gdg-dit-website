import { describe, it, expect } from 'vitest';
import { parseForm, sponsorCreateSchema, paymentSchema, contactSchema, packageSchema } from '@/lib/organiser/schemas';

describe('input validation', () => {
  it('requires a company name and research source', () => {
    const r = parseForm(sponsorCreateSchema, { category: 'TECHNOLOGY' });
    expect(r.ok).toBe(false);
    expect(Object.keys(r.fieldErrors)).toEqual(expect.arrayContaining(['companyName', 'researchSource']));
  });
  it('accepts rupee amounts with commas and the rupee sign', () => {
    const r = parseForm(sponsorCreateSchema, { companyName: 'A', category: 'TECHNOLOGY', researchSource: 'site', requestedAmount: '₹1,00,000' });
    expect(r.ok).toBe(true);
    expect(r.data.requestedAmount).toBe(100000);
  });
  it('rejects negative, fractional and non-numeric amounts', () => {
    for (const amount of ['-5', '10.5', 'abc']) {
      expect(parseForm(paymentSchema, { amount, receivedOn: '2026-12-01', reference: 'R' }).ok).toBe(false);
    }
  });
  it('rejects non-http websites and bad emails', () => {
    expect(parseForm(sponsorCreateSchema, { companyName: 'A', category: 'TECHNOLOGY', researchSource: 's', website: 'javascript:alert(1)' }).ok).toBe(false);
    expect(parseForm(contactSchema, { name: 'A', source: 's', email: 'nope' }).ok).toBe(false);
  });
  it('splits package benefits by line', () => {
    const r = parseForm(packageSchema, { name: 'Gold', benefits: 'Logo\n\nWorkshop ', active: 'on' });
    expect(r.data.benefits).toEqual(['Logo', 'Workshop']);
    expect(r.data.active).toBe(true);
  });
});
