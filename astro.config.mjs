// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Keep in sync with site.url in src/config/site.ts
const SITE_URL = 'https://www.fdschoonmaakbedrijf.nl';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/bedankt/') && !page.includes('/404'),
      i18n: undefined,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
