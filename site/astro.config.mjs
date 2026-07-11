import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://acaiflow.my',
  redirects: {
    '/story': '/#story',
    '/order': '/menu',
  },
});
