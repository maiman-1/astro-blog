import { defineConfig } from 'astro/config';
//install imagetools
import { astroImageTools } from "astro-imagetools";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://maiman-1.github.io',
  base: '/astro-blog',
  integrations: [astroImageTools, tailwind()]
});