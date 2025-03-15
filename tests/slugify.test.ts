import { describe, it, expect } from 'vitest';
import { slugify } from '../src/js/utils';

describe('slugify', () => {
  it('should convert text to a URL-friendly slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should handle special characters', () => {
    expect(slugify('Hello@World!')).toBe('helloworld');
  });

  it('should handle empty strings', () => {
    expect(slugify('')).toBe('');
  });

  it('should handle international characters', () => {
    expect(slugify('Café du Monde')).toBe('cafe-du-monde');
  });
});
