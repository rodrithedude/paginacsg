import type { ImageMetadata } from 'astro';
import captions from '../data/photos.json';
import site from '../data/site.json';

/**
 * Fotos de obras: se copian a src/assets/obras/ (.jpg, .png o .webp).
 * - Las fotos de cada proyecto se indican en src/data/projects.json ("photos": [...]).
 * - La portada (varias fotos que se van alternando), la foto de "Cómo trabajamos" y el fondo
 *   del llamado a la acción se eligen en src/data/site.json ("photos": { "hero", "team", "cta" }).
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
type HeroPick = { file: string; focus?: string; es?: string; en?: string };
const picks = (site as { photos?: { hero?: HeroPick[]; team?: string; cta?: string } }).photos ?? {};

export const logo: ImageMetadata | undefined = Object.values(logos)[0]?.default;

/** Foto por nombre de archivo. */
export function photoByFile(file?: string): Photo | undefined {
  return file ? photos.find((p) => p.file === file) : undefined;
}

export type HeroSlide = { src: ImageMetadata; focus: string; caption: { es?: string; en?: string } };

/** Fotos de la portada, en orden. Si existe src/assets/portada.*, se usa sola. */
export const heroSlides: HeroSlide[] = portadaImage
  ? [{ src: portadaImage, focus: '50% 50%', caption: {} }]
  : (picks.hero ?? [])
      .map((h) => ({ photo: photoByFile(h.file), h }))
      .filter((x): x is { photo: Photo; h: HeroPick } => Boolean(x.photo))
      .map(({ photo, h }) => ({ src: photo.src, focus: h.focus ?? '50% 50%', caption: { es: h.es, en: h.en } }));
export const teamPhoto: Photo | undefined = photoByFile(picks.team);
export const ctaPhoto: Photo | undefined = photoByFile(picks.cta);
