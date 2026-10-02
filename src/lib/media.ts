import type { ImageMetadata } from 'astro';
import captions from '../data/photos.json';
import site from '../data/site.json';

/**
 * Fotos de obras: se copian a src/assets/obras/ (.jpg, .png o .webp).
 * - Las fotos de cada proyecto se indican en src/data/projects.json ("photos": [...]).
 * - La portada, la foto de "Cómo trabajamos" y el fondo del llamado a la acción se eligen
 *   en src/data/site.json ("photos": { "hero", "team", "cta" }).
 * Pies de foto opcionales en src/data/photos.json (por nombre de archivo).
 */
const obras = import.meta.glob<{ default: ImageMetadata }>('../assets/obras/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}', {
  eager: true,
});

/** Foto principal opcional: src/assets/portada.(jpg|png|webp) */
const portada = import.meta.glob<{ default: ImageMetadata }>('../assets/portada.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

/** Logo opcional: src/assets/logo.(svg|png|webp) — si no existe se usa el logotipo dibujado "CSG". */
const logos = import.meta.glob<{ default: ImageMetadata }>('../assets/logo.{svg,png,webp}', { eager: true });

type Caption = { es?: string; en?: string };
const captionMap = captions as Record<string, Caption>;

export type Photo = { file: string; src: ImageMetadata; caption: Caption };

export const photos: Photo[] = Object.entries(obras)
  .sort(([a], [b]) => a.localeCompare(b, 'es', { numeric: true }))
  .map(([path, mod]) => {
    const file = path.split('/').pop() as string;
    return { file, src: mod.default, caption: captionMap[file] ?? {} };
  });

const portadaImage = Object.values(portada)[0]?.default;
const picks = (site as { photos?: Record<string, string> }).photos ?? {};

export const logo: ImageMetadata | undefined = Object.values(logos)[0]?.default;

/** Foto por nombre de archivo. */
export function photoByFile(file?: string): Photo | undefined {
  return file ? photos.find((p) => p.file === file) : undefined;
}

export const heroImage: ImageMetadata | undefined = portadaImage ?? photoByFile(picks.hero)?.src ?? photos[0]?.src;
export const teamPhoto: Photo | undefined = photoByFile(picks.team);
export const ctaPhoto: Photo | undefined = photoByFile(picks.cta);
