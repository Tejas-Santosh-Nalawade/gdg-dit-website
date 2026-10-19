// Administrative verification of the committee roster against the stated team size.
export const DOMAIN_LABELS = {
  EVENT_DIRECTOR_FINANCE: 'Event Director & Finance',
  OPERATIONS_PARTICIPANT_HOSPITALITY: 'Operations, Participant & Hospitality',
  MARKETING_SPONSORSHIP: 'Marketing & Sponsorship',
  COMMUNITY: 'Community',
  DESIGN: 'Design',
  TECH: 'Tech',
  MEDIA: 'Media',
};

export const DOMAINS = Object.keys(DOMAIN_LABELS);

/**
 * members: [{ serialNo, name, domain, position, verified }]
 * stated: { teamSize, domainCounts: { [domain]: n } }
 */
export function rosterVerification(members, stated = {}) {
  const findings = [];
  const named = members.filter((m) => m.name && m.name.trim());
  const blank = members.filter((m) => !m.name || !m.name.trim());
  const byDomain = Object.fromEntries(DOMAINS.map((d) => [d, members.filter((m) => m.domain === d)]));
  const statedDomainTotal = Object.values(stated.domainCounts ?? {}).reduce((a, b) => a + b, 0);

  if (stated.teamSize != null && stated.teamSize !== members.length) {
    findings.push({
      severity: 'HIGH',
      code: 'TEAM_SIZE',
      message: `Stated team size is ${stated.teamSize}, but the roster has ${members.length} entries (${named.length} named). ${stated.teamSize - named.length} seats have no named member.`,
    });
  }
  if (stated.teamSize != null && statedDomainTotal && statedDomainTotal !== stated.teamSize) {
    findings.push({
      severity: 'HIGH',
      code: 'DOMAIN_TOTAL',
      message: `Domain counts in the roster add to ${statedDomainTotal}, not the stated ${stated.teamSize}.`,
    });
  }
  for (const [domain, count] of Object.entries(stated.domainCounts ?? {})) {
    const actual = byDomain[domain]?.length ?? 0;
    if (actual !== count) {
      findings.push({
        severity: 'MEDIUM',
        code: 'DOMAIN_COUNT',
        message: `${DOMAIN_LABELS[domain]}: stated ${count}, roster has ${actual}.`,
      });
    }
  }
  for (const m of blank) {
    findings.push({
      severity: 'MEDIUM',
      code: 'BLANK_ENTRY',
      message: `${DOMAIN_LABELS[m.domain]} entry${m.serialNo ? ` Sr. No. ${m.serialNo}` : ''} (${m.position}) has no name.`,
    });
  }
  const serials = members.map((m) => m.serialNo).filter((n) => Number.isInteger(n)).sort((a, b) => a - b);
  for (let i = 1; i < serials.length; i++) {
    for (let gap = serials[i - 1] + 1; gap < serials[i]; gap++) {
      findings.push({ severity: 'LOW', code: 'SERIAL_GAP', message: `Serial number ${gap} is missing from the roster.` });
    }
  }
  const unverified = members.filter((m) => !m.verified).length;
  if (unverified) {
    findings.push({
      severity: 'LOW',
      code: 'UNVERIFIED',
      message: `${unverified} roster entries have not been verified against the official committee record.`,
    });
  }
  return {
    total: members.length,
    named: named.length,
    blank: blank.length,
    statedTeamSize: stated.teamSize ?? null,
    byDomain: Object.fromEntries(DOMAINS.map((d) => [d, byDomain[d].length])),
    findings,
  };
}
