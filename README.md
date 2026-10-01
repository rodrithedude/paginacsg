# CSG — Construcciones y Soluciones Globales

Sitio web de una sola página para CSG. Es HTML, CSS y JavaScript sin dependencias ni paso de compilación: se abre `index.html` en el navegador o se sube la carpeta tal cual a cualquier hosting (GitHub Pages, Netlify, Vercel, cPanel, etc.).

## Estructura

```
index.html              Contenido y estructura de la página
assets/css/styles.css   Estilos (paleta, retícula, responsive)
assets/js/main.js       Menú, barra superior, acordeón, carrusel, contadores y formulario
assets/img/             Imágenes (las actuales son provisionales)
assets/fonts/           Tipografías Chakra Petch y Geist Mono (licencia OFL)
```

## Secciones

1. **Inicio**: logotipo, menú, foto principal y titular.
2. **Nosotros**: cifras (proyectos, años, satisfacción, profesionales) y texto de experiencia.
3. **Servicios**: construcción comercial, proyectos industriales, infraestructura y obra civil, gerencia de proyectos.
4. **Principios**: acordeón con seguridad, calidad, entregas puntuales y relaciones a largo plazo.
5. **Proyectos**: carrusel con fotos de obras.
6. **Llamado a la acción** y **Contacto**: datos de contacto y formulario de cotización.
7. **Pie de página**: navegación, redes sociales y avisos legales.

## Pendiente: reemplazar contenido provisional

En `index.html` cada punto a reemplazar está marcado con un comentario en MAYÚSCULAS (`FOTO:`, `CIFRAS:`, `DATOS DE CONTACTO:`, etc.).

| Qué | Dónde |
| --- | --- |
| Ciudad/país y año de fundación (“Ciudad, País”, “Desde 20XX”) | Hero |
| Cifras (250+, 15+, 98 %, 500+) | Sección Nosotros (`data-count` y el número visible) |
| Teléfono, correo, dirección y horario | Menú y sección Contacto |
| Correo que recibe el formulario | `data-email` del `<form>` |
| Enlaces de redes sociales (`href="#"`) | Pie de página |
| Avisos de privacidad y términos | Pie de página |
| Nombres y categorías de proyectos | Sección Proyectos |

### Fotos

Las imágenes en `assets/img/` son ilustraciones provisionales. Para cambiarlas, copia la foto a `assets/img/` y actualiza el `src` correspondiente:

| Archivo provisional | Uso | Proporción sugerida |
| --- | --- | --- |
| `hero.svg` | Foto principal | Horizontal, ~2:1 (mín. 2000 px de ancho) |
| `seguridad.svg` | Principio “Seguridad ante todo” | Cuadrada |
| `proyecto-*.svg` | Tarjetas del carrusel | ~3:2 |
| `cta.svg` | Fondo del llamado a la acción | Horizontal, ~2.3:1 |

Las fotos se muestran en blanco y negro automáticamente, como en el diseño de referencia. Si se prefieren a color, basta con quitar el `filter` de `.media img` en `styles.css`.

### Logotipo

El logotipo “CSG” está dibujado en SVG dentro de `index.html` (símbolo `#logo-csg`) y se reutiliza en el encabezado, el menú y el pie. Si hay un logotipo oficial, se reemplaza ese símbolo y todas las apariciones se actualizan solas. El favicon está en `assets/img/favicon.svg`.

## Formulario de contacto

Sin servidor, el formulario valida los campos y abre el cliente de correo del visitante con el mensaje ya redactado y dirigido a la dirección de `data-email`. Si se quiere recibir los mensajes directamente (Formspree, Netlify Forms, etc.), se cambia el bloque “Formulario de contacto” en `assets/js/main.js`.

## Publicar con GitHub Pages

En el repositorio: **Settings → Pages → Deploy from a branch**, elegir la rama y la carpeta raíz (`/`). El sitio queda en `https://<usuario>.github.io/<repositorio>/`.
