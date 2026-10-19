import { describe, it, expect } from 'vitest';
import { can, assertCan, ForbiddenError, CAPABILITIES } from '@/lib/organiser/permissions';
import { redactSponsor } from '@/lib/organiser/services/sponsors';

describe('role permissions', () => {
  it('lets only admins approve agreements, budgets and drafts', () => {
    for (const cap of ['sponsor:approveAgreement', 'budget:approve', 'outreach:approve', 'organiser:manage']) {
      expect(can('ADMIN', cap)).toBe(true);
      expect(can('FINANCE', cap)).toBe(false);
      expect(can('SPONSORSHIP', cap)).toBe(false);
      expect(can('VIEWER', cap)).toBe(false);
    }
  });
  it('keeps contacts and money away from read-only organisers', () => {
    expect(can('VIEWER', 'sponsor:viewContacts')).toBe(false);
    expect(can('VIEWER', 'finance:viewTotals')).toBe(false);
    expect(can('VIEWER', 'documents:generate')).toBe(false);
  });
  it('lets the sponsorship team run the CRM but not record payments', () => {
    expect(can('SPONSORSHIP', 'sponsor:edit')).toBe(true);
    expect(can('SPONSORSHIP', 'payment:record')).toBe(false);
    expect(can('FINANCE', 'payment:record')).toBe(true);
  });
  it('rejects inactive organisers and unknown capabilities', () => {
    expect(() => assertCan({ role: 'ADMIN', active: false }, 'dashboard:view')).toThrow(ForbiddenError);
    expect(() => can('ADMIN', 'nope')).toThrow();
    expect(CAPABILITIES.every((c) => can('ADMIN', c))).toBe(true);
  });
  it('redacts contacts and amounts for read-only organisers', () => {
    const s = { companyName: 'X', contacts: [{ email: 'a@b.c' }], cashCommitted: 5, requestedAmount: 9, payments: [], confirmationReference: 'L' };
    const out = redactSponsor({ role: 'VIEWER' }, s);
    expect(out.contacts).toBeUndefined();
    expect(out.cashCommitted).toBeUndefined();
    expect(out.companyName).toBe('X');
    expect(redactSponsor({ role: 'SPONSORSHIP' }, s).contacts).toHaveLength(1);
  });
});
