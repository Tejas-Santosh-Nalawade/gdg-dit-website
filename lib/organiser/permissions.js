// Role-based capabilities for the organiser area. Every server action and
// document route checks one of these before touching data.
export const ROLES = ['ADMIN', 'FINANCE', 'SPONSORSHIP', 'VIEWER'];

export const ROLE_LABELS = {
  ADMIN: 'Admin (Event Director)',
  FINANCE: 'Finance',
  SPONSORSHIP: 'Marketing & Sponsorship',
  VIEWER: 'Organiser (read-only)',
};

const MATRIX = {
  'dashboard:view': ['ADMIN', 'FINANCE', 'SPONSORSHIP', 'VIEWER'],
  'finance:viewTotals': ['ADMIN', 'FINANCE', 'SPONSORSHIP'],
  'sponsor:view': ['ADMIN', 'FINANCE', 'SPONSORSHIP', 'VIEWER'],
  'sponsor:viewContacts': ['ADMIN', 'FINANCE', 'SPONSORSHIP'],
  'sponsor:edit': ['ADMIN', 'SPONSORSHIP'],
  'sponsor:confirm': ['ADMIN', 'FINANCE'],
  'sponsor:approveAgreement': ['ADMIN'],
  'payment:record': ['ADMIN', 'FINANCE'],
  'package:edit': ['ADMIN', 'FINANCE'],
  'budget:view': ['ADMIN', 'FINANCE', 'SPONSORSHIP'],
  'budget:edit': ['ADMIN', 'FINANCE'],
  'budget:approve': ['ADMIN'],
  'outreach:draft': ['ADMIN', 'SPONSORSHIP'],
  'outreach:approve': ['ADMIN'],
  'institution:view': ['ADMIN', 'FINANCE', 'SPONSORSHIP'],
  'institution:edit': ['ADMIN', 'FINANCE', 'SPONSORSHIP'],
  'institution:recordApproval': ['ADMIN', 'FINANCE'],
  'task:edit': ['ADMIN', 'SPONSORSHIP'],
  'roster:view': ['ADMIN', 'FINANCE', 'SPONSORSHIP', 'VIEWER'],
  'roster:edit': ['ADMIN'],
  'milestone:record': ['ADMIN'],
  'organiser:manage': ['ADMIN'],
  'settings:edit': ['ADMIN', 'FINANCE'],
  'documents:generate': ['ADMIN', 'FINANCE', 'SPONSORSHIP'],
  'audit:view': ['ADMIN', 'FINANCE'],
};

export const CAPABILITIES = Object.keys(MATRIX);

export function can(role, capability) {
  const allowed = MATRIX[capability];
  if (!allowed) throw new Error(`Unknown capability: ${capability}`);
  return allowed.includes(role);
}

export class ForbiddenError extends Error {
  constructor(capability) {
    super(`You do not have permission for this action (${capability}).`);
    this.name = 'ForbiddenError';
    this.capability = capability;
  }
}

export function assertCan(actor, capability) {
  if (!actor || !actor.active || !can(actor.role, capability)) {
    throw new ForbiddenError(capability);
  }
}
