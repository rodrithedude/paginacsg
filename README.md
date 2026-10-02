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

No hace falta tocar código para las fotos: basta con copiar los archivos en estas carpetas.
Mientras no haya fotos, se muestra un marcador gris con curvas de nivel y la etiqueta “Foto de obra”.

| Qué | Dónde | Notas |
|---|---|---|
| Fotos de obras | `src/assets/obras/` | `.jpg`, `.png` o `.webp`. Se ordenan por nombre: use `01-…`, `02-…`. |
| Portada | primera foto de `src/assets/obras/`, o `src/assets/portada.jpg` si existe | Horizontal, de al menos 2000 px de ancho. |
| Foto de “Cómo trabajamos” | siguiente foto de `src/assets/obras/` | Se muestra cuadrada. |
| Fondo del llamado a la acción | la foto que sigue | Se oscurece automáticamente. |
| Foto de un proyecto destacado | `src/assets/obras/` + `"photo": "archivo.jpg"` en ese proyecto de `src/data/projects.json` | Proporción ~3:2. |
| Pies de foto (opcional) | `src/data/photos.json` | Por nombre de archivo: `{ "01-avenida-reforma.jpg": { "es": "…", "en": "…" } }` |
| Logo | ya incluido (vectorizado) | El sitio usa el logotipo oficial CSG en vector. Copias para otros usos: `public/img/csg-logo.svg` (marca) y `public/img/csg-logo-completo.svg` (con la razón social en gris). |

Las fotos se optimizan solas al compilar (WebP en varios tamaños) y se muestran en blanco y negro, como en el diseño.
Para verlas a color, quite el `filter` de `.media img` en `src/styles/global.css`.

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

## 5. Publicar en Cloudflare (gratis)

### Opción A: arrastrar y soltar (sin programar)

1. Ejecute `npm run build`.
2. En Cloudflare → **Workers & Pages** → **Create application** → **Get started** → **Drag and drop your files**.
3. Ponga nombre al proyecto (por ejemplo `csg`), arrastre la carpeta `dist/` y haga clic en **Deploy site**.

> Un proyecto creado con arrastrar y soltar **no se puede cambiar después** a publicación automática desde GitHub.

### Opción B: desde GitHub (se publica solo con cada cambio)

1. En Cloudflare → **Workers & Pages** → **Create application** → conecte este repositorio.
2. Comando de compilación: `npm run build` · Carpeta de salida: `dist`.

## 6. Dominio

El dominio está configurado en `astro.config.mjs` (`SITE`) y en `public/robots.txt`. Hoy apunta a `www.padico.com`;
si CSG usará otro dominio, cámbielo en ambos archivos.

Si se mantiene `padico.com`: su DNS está en **Azure** y el correo funciona con **Microsoft 365**.
Para `www.padico.com`, en el proyecto de Cloudflare → **Custom domains** → agregue `www.padico.com`; Cloudflare indicará
un registro **CNAME** que quien administra el DNS en Azure debe agregar. **No toque** los registros MX, TXT ni los CNAME
de `autodiscover` o `selector1/selector2._domainkey`, para no afectar el correo.

## Créditos

Tipografías Chakra Petch y Geist Mono, con licencia SIL Open Font License (ver `public/fonts/`).
