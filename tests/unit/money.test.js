import { describe, it, expect } from 'vitest';
import { formatINR, groupIndian, sum } from '@/lib/organiser/money';

describe('money', () => {
  it('groups digits the Indian way', () => {
    expect(groupIndian(1234567)).toBe('12,34,567');
    expect(groupIndian(100000)).toBe('1,00,000');
    expect(groupIndian(999)).toBe('999');
    expect(groupIndian(12345678)).toBe('1,23,45,678');
  });
  it('formats with the rupee sign or a PDF-safe prefix', () => {
    expect(formatINR(250000)).toBe('₹2,50,000');
    expect(formatINR(250000, { symbol: 'Rs.' })).toBe('Rs. 2,50,000');
    expect(formatINR(null)).toBe('—');
    expect(formatINR(-500)).toBe('-₹500');
  });
  it('sums with a picker and ignores missing values', () => {
    expect(sum([{ a: 1 }, { a: null }, { a: 2 }], (x) => x.a)).toBe(3);
  });
});
