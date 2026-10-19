import { describe, it, expect } from 'vitest';
import { rosterVerification } from '@/lib/organiser/roster';
import { makeSnapshot } from '../fixtures/snapshot';

describe('roster verification', () => {
  const snap = makeSnapshot();
  const r = rosterVerification(snap.members, { teamSize: 5, domainCounts: snap.settings.statedDomainCounts });
  const codes = r.findings.map((f) => f.code);

  it('reports the stated size against the roster', () => {
    expect(r).toMatchObject({ total: 3, named: 2, blank: 1 });
    expect(codes).toContain('TEAM_SIZE');
  });
  it('flags domain totals that do not add up to the stated size', () => {
    expect(codes).toContain('DOMAIN_TOTAL');
    expect(codes).toContain('DOMAIN_COUNT');
  });
  it('flags blank entries, serial gaps and unverified entries', () => {
    expect(codes).toContain('BLANK_ENTRY');
    expect(r.findings.find((f) => f.code === 'SERIAL_GAP').message).toMatch(/3/);
    expect(codes).toContain('UNVERIFIED');
  });
  it('is clean when everything matches', () => {
    const members = [{ serialNo: 1, name: 'A', domain: 'TECH', position: 'Lead', verified: true }];
    expect(rosterVerification(members, { teamSize: 1, domainCounts: { TECH: 1 } }).findings).toEqual([]);
  });
});
