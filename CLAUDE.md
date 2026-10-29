# PURA Web

Sitio de PURA – Protección Solar Natural (protector solar facial en barra). Next.js 15 (App Router) + TypeScript + CSS Modules, GSAP (ScrollTrigger, `@gsap/react`) y Lenis.

## Comandos
- `npm run dev` — servidor local (http://localhost:3000)
- `npm run build` — build de producción (correr antes de cada commit)

## Estructura
- `lib/content.ts` — TODO el texto, las líneas, las experiencias y la navegación. Editar contenido acá, no en los componentes.
- `app/` — rutas: `/`, `/sobre-la-marca`, `/nuestras-lineas`, `/experiencias`, `/experiencias/[slug]`.
- `components/` — layout (Header + menú, Footer, Cursor, SmoothScroll), `home/` (secciones del home), piezas compartidas (`LineStory`, `ExperienceCard`, `ui.tsx`). "Elegí tu línea" del home = `home/LineCards` (renders en `public/img/lineas`, tapa y cuerpo separados).
- `public/` — video del hero, foto, íconos, logotipo e isologotipo, trama SVG.
- `figma-assets/` — originales que entregó la diseñadora (no se sirven).
- `docs/referencias/` — bocetos y contexto de marca previos.

## Sistema de diseño
- Tokens en `app/globals.css` (`:root`): amarillo `#FFE88B`, celeste `#C2E1F3`, naranja `#F7702D`, blanco `#FEFEFE`, negro topo `#251E18`.
- Tipografía: Gilroy (local, `app/fonts`), fallback Plus Jakarta Sans.
- Color por línea: Clásica = amarillo, Pieles sensibles = celeste, Con color = naranja (texto blanco).
- El logo del header es el **logotipo** (palabra "pura"). El isotipo de la media luna solo NO se usa como logo; la trama de medias lunas sí.
- Renders pendientes: usar `RenderPlaceholder` (fondo cuadrillé).

## Motion — reglas
- Todo el motion va dentro de `gsap.matchMedia()` con `MQ.motion` (respeta prefers-reduced-motion). Efectos de mouse además con `MQ.fine`.
- Usar `useGSAP` con `scope` para limpieza automática.
- No dejar `transform` en ancestros de elementos con `position: sticky` o pin (usar `clearProps`).
- Lenis está en `window.__lenis` (pararlo al abrir overlays).

## Videos
- FFmpeg está instalado. Los .avi/.mov de render se convierten a MP4 H.264 liviano, p. ej.:
  `ffmpeg -i entrada.avi -t 4.5 -an -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart public/video/salida.mp4`
- Fragmentos de las cards de experiencias: campo `clip` en `experiences` (se reproducen al hover; en táctil, al entrar en pantalla).

## Contenido pendiente de la marca
- Videos de las 4 experiencias (`experiences[].video` en `lib/content.ts`).
- Renders del producto y fotos por línea (`lines[].gallery`).
- Email real de contacto y links de newsletter / dónde comprar (`footerLinks`).
