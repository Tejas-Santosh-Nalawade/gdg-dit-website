// Amounts are whole rupees. Indian digit grouping: 12,34,567.
export function groupIndian(value) {
  const n = Math.round(Math.abs(Number(value) || 0));
  const s = String(n);
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return `${rest},${last3}`;
}

export function formatINR(value, { symbol = '₹' } = {}) {
  if (value === null || value === undefined) return '—';
  const sign = Number(value) < 0 ? '-' : '';
  return `${sign}${symbol}${symbol === '₹' ? '' : ' '}${groupIndian(value)}`;
}

export function sum(items, pick = (x) => x) {
  return items.reduce((acc, item) => acc + (Number(pick(item)) || 0), 0);
}
