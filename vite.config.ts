/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    globals: true, // Enables global test functions like `describe` and `it`
    environment: 'jsdom', // Simulates a browser-like environment
    include: ['**/*.test.ts', '**/*.test.js'], // Test file patterns
  },
});
