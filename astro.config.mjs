import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite'; // Import the Vite plugin

// https://astro.build/config
export default defineConfig({
  site: 'https://maiman-1.github.io',
  base: '/astro-blog',
  integrations: [ react()],
  vite: {
    plugins: [tailwindcss()], // Add the Tailwind CSS plugin to Vite
  },
});