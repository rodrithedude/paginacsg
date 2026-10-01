// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio final del sitio. Si CSG usa otro dominio, cámbielo aquí y en public/robots.txt.
const SITE = 'https://www.padico.com';

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
