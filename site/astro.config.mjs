import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://acaiflow.my',
  integrations: [sitemap()],
  redirects: {
    '/story': '/#story',
    '/order': '/menu',
  },
});
