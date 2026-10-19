// Milestone status is computed at request time from the real date and the
// progress the team has recorded. Nothing is assumed complete.
export const MILESTONE_STATUS_LABELS = {
  UPCOMING: 'Upcoming',
  ACTIVE: 'In progress window',
  COMPLETED: 'Completed',
  OVERDUE: 'Overdue',
  PENDING_VERIFICATION: 'Pending verification',
};

function dayStart(d) {
  const x = new Date(d);
  return new Date(Date.UTC(x.getUTCFullYear(), x.getUTCMonth(), x.getUTCDate()));
}

// Calendar day in India, so a milestone flips at IST midnight rather than UTC.
export function istToday(now = new Date()) {
  const ist = new Date(now.getTime() + 330 * 60 * 1000);
  return new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()));
}

export function milestoneStatus(milestone, now = new Date()) {
  const today = istToday(now);
  const start = dayStart(milestone.startDate);
  const end = dayStart(milestone.endDate);
  const progress = milestone.progress ?? null;

  if (progress === 'DONE') return 'COMPLETED';
  if (today < start) return 'UPCOMING';
  if (today <= end) return 'ACTIVE';
  // Past the end date and not recorded as done.
  if (progress === null) return 'PENDING_VERIFICATION';
  return 'OVERDUE';
}

export function daysUntil(date, now = new Date()) {
  return Math.round((dayStart(date) - istToday(now)) / 86400000);
}
