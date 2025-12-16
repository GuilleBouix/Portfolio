// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  server: {
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://guillebouix.vercel.app',
  integrations: [sitemap()],
  output: 'static'
});