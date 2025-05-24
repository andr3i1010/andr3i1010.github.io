// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://andrei1010.me',
  base: '/',

  server: {
    host: true,
    port: 4321
  },

  integrations: [
      react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});