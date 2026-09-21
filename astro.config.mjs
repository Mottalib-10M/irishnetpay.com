import { defineConfig } from 'astro/config';
import trustKit from './src/integrations/trust-kit.mjs';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  trailingSlash: 'always',  site: 'https://takehomepay.ie',
  integrations: [
    trustKit({ lang: 'en', siteUrl: 'https://takehomepay.ie', siteName: 'TakeHomePay.ie', founded: '2026-06-27', about: '/about/', method: '/methodology/' }), react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
