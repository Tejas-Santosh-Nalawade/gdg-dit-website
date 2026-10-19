import { describe, it, expect } from 'vitest';
import { milestoneStatus, daysUntil } from '@/lib/organiser/milestones';

const m = (start, end, progress = null) => ({ startDate: new Date(`${start}T00:00:00Z`), endDate: new Date(`${end}T00:00:00Z`), progress });
const now = new Date('2026-12-08T06:00:00Z'); // 8 Dec 2026, 11:30 IST

describe('milestone status', () => {
  it('is upcoming before the start date', () => expect(milestoneStatus(m('2026-12-13', '2026-12-19'), now)).toBe('UPCOMING'));
  it('is active inside the window', () => expect(milestoneStatus(m('2026-12-06', '2026-12-12'), now)).toBe('ACTIVE'));
  it('needs verification when past and nothing is recorded', () => expect(milestoneStatus(m('2026-11-05', '2026-12-05'), now)).toBe('PENDING_VERIFICATION'));
  it('is overdue when past and recorded as not done', () => expect(milestoneStatus(m('2026-11-05', '2026-12-05', 'IN_PROGRESS'), now)).toBe('OVERDUE'));
  it('is completed only when recorded as done', () => expect(milestoneStatus(m('2026-11-01', '2026-11-01', 'DONE'), now)).toBe('COMPLETED'));
  it('uses the India calendar day', () => {
    // 19:00 UTC on 12 Dec is already 13 Dec in India.
    expect(milestoneStatus(m('2026-12-06', '2026-12-12'), new Date('2026-12-12T19:00:00Z'))).toBe('PENDING_VERIFICATION');
  });
  it('counts days until a date', () => expect(daysUntil(new Date('2026-11-01T00:00:00Z'), new Date('2026-10-19T10:00:00Z'))).toBe(13));
});
