import type { ImageMetadata } from 'astro';
import captions from '../data/photos.json';

/**
 * Fotos de obras: basta con copiar archivos .jpg/.png/.webp a src/assets/obras/
 * y aparecen solas en el sitio, en orden alfabético (01-…, 02-…, etc.).
 * - La primera es la portada (salvo que exista src/assets/portada.jpg).
 * - Las siguientes se usan en "Cómo trabajamos" y en el fondo del llamado a la acción.
 * - Para mostrar una foto en la tarjeta de un proyecto, agregue "photo": "nombre.jpg"
 *   a ese proyecto en src/data/projects.json.
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

export const heroImage: ImageMetadata | undefined = portadaImage ?? photos[0]?.src ?? undefined;

export const logo: ImageMetadata | undefined = Object.values(logos)[0]?.default;

/** Fotos que no son la portada, para las secciones secundarias. */
const secondary = portadaImage ? photos : photos.slice(1);

/** Foto secundaria n.º i (o undefined si no hay suficientes). */
export function secondaryPhoto(i: number): Photo | undefined {
  return secondary[i];
}

/** Foto por nombre de archivo (para los proyectos con "photo"). */
export function photoByFile(file?: string): Photo | undefined {
  return file ? photos.find((p) => p.file === file) : undefined;
}
