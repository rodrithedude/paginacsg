# Sitio web de CSG

Sitio de **CSG — Construcciones y Servicios Globales**, en español e inglés.
Está hecho con [Astro](https://astro.build): genera páginas HTML estáticas, sin base de datos ni servidor,
así que se puede publicar **gratis** en Cloudflare, Netlify o GitHub Pages.

| Página    | Español        | Inglés          |
|-----------|----------------|-----------------|
| Inicio    | `/`            | `/en/`          |
| Proyectos | `/proyectos/`  | `/en/projects/` |
| Clientes  | `/clientes/`   | `/en/clients/`  |

La página de inicio tiene: portada, cifras y reseña, servicios, “Cómo trabajamos” (misión, visión, equipo e
instalaciones), carrusel de proyectos destacados, clientes por sector, contacto con empleos y formulario de cotización.
La página de proyectos permite filtrar por tipo de obra, sector, cliente y búsqueda (los enlaces con filtros se pueden compartir).

---

## 1. Fotos y logo

Las fotos están en `src/assets/obras/` (`.jpg`, `.png` o `.webp`). Se optimizan solas al compilar (WebP en varios
tamaños) y se muestran en blanco y negro, como en el diseño; al pasar el cursor o al abrirlas en el visor se ven a color.

| Qué | Dónde se indica |
|---|---|
| Fotos de cada proyecto | `"photos": ["archivo-1.jpg", "archivo-2.jpg"]` en ese proyecto de `src/data/projects.json`. La primera es la portada de la tarjeta; todas se ven en el visor. |
| Orden de los proyectos con fotos | `"featured": 1, 2, 3…` en `src/data/projects.json` (carrusel de inicio y página de proyectos). |
| Portada, foto de “Cómo trabajamos” y fondo del llamado a la acción | `"photos": { "hero", "team", "cta" }` en `src/data/site.json`. `"heroFocus"` indica qué parte de la portada se mantiene visible al recortarla (`"50% 18%"` = centrada y cerca de arriba). |
| Etiqueta de la tarjeta (p. ej. “Pavimento hidráulico”) y nombre corto | `"tag"` y `"short"` (en español e inglés) en el proyecto. |
| Logo | Ya incluido (vectorizado). Copias para otros usos: `public/img/csg-logo.svg` (marca) y `public/img/csg-logo-completo.svg` (con la razón social en gris). |

Para agregar un proyecto nuevo con fotos: copie las fotos a `src/assets/obras/` y agregue el proyecto al final de
`src/data/projects.json` con su `id`, `cats` (tipos de obra de `src/data/services.json`), textos `es`/`en` y `photos`.
Si se conoce el cliente, use `"client"` (de `src/data/clients.json`) y la duración en `"months"`.

### Colores

Tomados del logotipo: naranja `#FF8311`, grafito `#282828`, papel `#F8F7F3` y grises. Sobre el naranja el texto va en
gris oscuro, porque el blanco no se lee bien; para texto naranja sobre fondo claro se usa `#B35300`.
Están definidos al inicio de `src/styles/global.css`.

## 2. Textos y datos

| Qué | Archivo |
|---|---|
| Nombre, teléfono, correo, dirección, fecha de fundación, cifras | `src/data/site.json` |
| Proyectos (cliente, descripción ES/EN, duración en meses, tipo de obra) | `src/data/projects.json` |
| Proyectos del carrusel de inicio | `"featured": 1, 2, 3…` en `src/data/projects.json` (el número es el orden) |
| Clientes y sector | `src/data/clients.json` |
| Servicios | `src/data/services.json` |
| Todos los demás textos (ES/EN) | `src/i18n/ui.ts` |

Los **años de experiencia** y el **año del pie de página** se calculan solos a partir de la fecha de fundación.

## 3. Formulario de cotización

Sin servidor, el formulario valida los campos y abre el programa de correo del visitante con el mensaje ya redactado,
dirigido al correo de `src/data/site.json`. Para recibir los mensajes directamente (Formspree, Cloudflare, etc.)
se cambia el bloque “Formulario de contacto” en `src/scripts/main.ts`.

## 4. Verlo en su computadora (opcional)

Requiere [Node.js](https://nodejs.org) 22.12 o más reciente.

```bash
npm install
npm run dev      # abre http://localhost:4321
npm run build    # genera la carpeta dist/ lista para publicar
```

## 5. Publicar en Cloudflare Workers

El sitio se publica como un Worker con archivos estáticos (`wrangler.jsonc`: carpeta `dist/`, página 404 propia).
El Worker `paginacsg` está conectado a este repositorio: cada cambio que se sube a la rama se compila
(`npm run build`) y se publica (`npx wrangler deploy`) automáticamente.

Si se crea de nuevo: Cloudflare → **Workers & Pages** → **Create** → **Import a repository** → elegir este
repositorio, con comando de compilación `npm run build` y de publicación `npx wrangler deploy`.
El nombre del Worker debe coincidir con `"name"` en `wrangler.jsonc`.

## 6. Dominio csgconstructora.com

El dominio está registrado en Hostinger con los *nameservers* de Cloudflare. Para que el sitio responda en él:

1. **Dominio principal:** Workers & Pages → `paginacsg` → **Settings** → **Domains & Routes** → **Add** →
   **Custom domain** → `csgconstructora.com`. Cloudflare crea solo el registro DNS y el certificado SSL.
2. **www:** Rules → **Redirect Rules** → **Create rule** → plantilla **“Redirect from WWW to root”**, para que
   `www.csgconstructora.com` lleve a `csgconstructora.com`. El registro `CNAME www` (con la nube naranja) se mantiene.
3. **Correo:** los registros MX, SPF y DMARC de Titan no se tocan.

El dominio también está en `astro.config.mjs` (`SITE`) y en `public/robots.txt`.

## Créditos

Tipografías Chakra Petch y Geist Mono, con licencia SIL Open Font License (ver `public/fonts/`).
