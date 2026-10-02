// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio del sitio (canónico, sin www). Si cambia, actualícelo también en public/robots.txt.
const SITE = 'https://csgconstructora.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Astro 7 usa 'jsx' por defecto, que borra espacios entre etiquetas en línea.
  compressHTML: true,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-GT', en: 'en' },
      },
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
