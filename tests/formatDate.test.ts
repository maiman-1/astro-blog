import { describe, it, expect } from 'vitest';
import { formatDate } from '../src/js/utils';

describe('formatDate', () => {
  it('should format a valid date string', () => {
    expect(formatDate('2025-03-15')).toBe('15/03/2025'); // Adjust based on your locale
  });

  it('should handle invalid dates gracefully', () => {
    expect(() => formatDate('invalid-date')).toThrow();
  });

  it('should format a Date object', () => {
    expect(formatDate(new Date('2025-03-15'))).toBe('15/03/2025'); // Adjust format as needed
  });
});
