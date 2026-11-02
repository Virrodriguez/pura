// Contenido del sitio. Todo el texto editable vive acá.

export type LineId = "clasica" | "pieles-sensibles" | "con-color";

export type Feature = { icon: string; label: string };

export type Line = {
  id: LineId;
  number: string;
  name: string;
  short: string;
  /** color de fondo del panel */
  color: string;
  /** color del texto sobre el panel */
  ink: string;
  intro: string;
  /** texto corto de la card del home */
  card: string;
  /** render del producto en dos partes (tapa y cuerpo) para animarlas por separado */
  render: { cap: string; body: string };
  detail: string;
  features: Feature[];
  /** imágenes de la galería vertical en /nuestras-lineas (null = render pendiente) */
  gallery: (string | null)[];
};

export const features: Feature[] = [
  { icon: "/icons/fps.svg", label: "FPS 50+\nUVA/UVB" },
  { icon: "/icons/contenido-neto.svg", label: "Cont. neto\n20 gr" },
  { icon: "/icons/facil-de-llevar.svg", label: "Fácil de\nllevar" },
  { icon: "/icons/hipoalergenico.svg", label: "Hipoalergénico\ncruelty free" },
  { icon: "/icons/rostro.svg", label: "Para el rostro\nen barra" },
];

export const lines: Line[] = [
  {
    id: "clasica",
    number: "01",
    name: "Línea Clásica",
    short: "Clásica",
    color: "var(--amarillo)",
    ink: "var(--topo)",
    intro:
      "Protección diaria para todo tipo de piel. Se desliza sin arrastre, no deja residuo blanco y aporta luminosidad.",
    detail:
      "Nuestra barra original: filtros minerales de amplio espectro en una base de ceras y emolientes de origen natural. Pensada para llevar todos los días y reaplicar sin pensarlo.",
    features,
    card: "Filtros minerales en una barra que se desliza sin arrastre. Sin residuo blanco, para usar todos los días.",
    render: { cap: "/img/lineas/clasica-tapa-hd.png", body: "/img/lineas/clasica-cuerpo-hd.png" },
    gallery: ["/img/renders/clasica.png", "/img/renders/caja-clasica.png", "/img/renders/clasica-chica-2.jpg"],
  },
  {
    id: "pieles-sensibles",
    number: "02",
    name: "Línea para Pieles sensibles",
    short: "Pieles sensibles",
    color: "var(--celeste)",
    ink: "var(--topo)",
    intro:
      "Fórmula suave, sin fragancia, para pieles reactivas. Calma mientras protege, incluso en el contorno de ojos.",
    detail:
      "Menos ingredientes, elegidos uno por uno. Una barra hipoalergénica que cuida las zonas más delicadas del rostro: contorno de ojos, nariz y orejas.",
    features,
    card: "Fórmula suave y sin fragancia para pieles reactivas. Calma mientras protege, incluso en el contorno de ojos.",
    render: { cap: "/img/lineas/pieles-sensibles-tapa-hd.png", body: "/img/lineas/pieles-sensibles-cuerpo-hd.png" },
    gallery: ["/img/renders/pieles-sensibles.png", "/img/renders/caja-pieles-sensibles.png", "/img/renders/pieles-sensibles-chica-2.jpg"],
  },
  {
    id: "con-color",
    number: "03",
    name: "Línea Con color",
    short: "Con color",
    color: "var(--naranja)",
    ink: "var(--blanco)",
    intro:
      "Protección con un toque de color que unifica el tono y deja un acabado natural y saludable.",
    detail:
      "Pigmentos minerales que se funden con la piel. Protege, empareja el tono y reemplaza la base en los días de sol.",
    features,
    card: "Pigmentos minerales que se funden con la piel. Protege, empareja el tono y reemplaza la base en los días de sol.",
    render: { cap: "/img/lineas/con-color-tapa-hd.png", body: "/img/lineas/con-color-cuerpo-hd.png" },
    gallery: ["/img/renders/con-color.png", "/img/renders/caja-con-color.png", "/img/renders/con-color-chica.jpg"],
  },
];

export const tags = ["Filtros minerales", "UVA + UVB", "Portable", "Reaplicable", "Para el rostro"];

export const about = [
  {
    title: "La marca",
    body:
      "PURA combina ingredientes de origen natural, conocimiento científico y diseño para crear fotoprotectores eficaces, seguros y agradables sobre la piel.",
  },
  {
    title: "El formato",
    body:
      "Una barra sólida que no se derrama ni ensucia las manos. Se lleva en el bolsillo y llega con precisión a nariz, orejas y contorno de ojos.",
  },
  {
    title: "Cómo se usa",
    body:
      "Hacé cuatro pasadas de ida y vuelta sobre cada zona, superponiéndolas, y distribuí. Reaplicá cada 2 horas al aire libre y después de nadar o transpirar.",
  },
  {
    title: "Nuestras líneas",
    body:
      "Clásica para todo tipo de piel, Pieles sensibles para pieles reactivas y Con color para un acabado natural. Las tres con FPS 50+ y amplio espectro.",
  },
];

export type Experience = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  body: string;
  /** URL del video (se completa más adelante) */
  video: string | null;
  /** portada del video principal y color de fondo para los costados (video vertical) */
  poster?: string;
  backdrop?: string;
  /** varios videos en cards una al lado de la otra (reemplazan al video principal) */
  videos?: { title: string; body: string; src: string; poster: string }[];
  /** URL para incrustar (iframe), p. ej. un recorrido 360° de Kuula; reemplaza al video principal */
  embed?: string;
  /** escena de Spline publicada (…/scene.splinecode); reemplaza al video principal */
  spline?: string;
  /** etiqueta sobre la imagen de la card */
  badge?: string;
  /** imagen de la card (null = trama del color) */
  image?: string;
  /** fragmento corto que se reproduce en la card al hacer click */
  clip?: string;
  accent: string;
};

export const experiences: Experience[] = [
  {
    slug: "turnaround",
    image: "/img/experiencias/turnaround.png",
    clip: "/video/turnaround-fragmento.mp4",
    badge: "Giro 360°",
    title: "Turnaround",
    subtitle: "El stick, desde todos los ángulos",
    summary: "Girá el producto 360° y descubrí cada detalle de la barra, la tapa y el mecanismo twist-up.",
    body:
      "Un recorrido completo alrededor del SUNBAR: la forma ovalada de la barra, la textura del envase y cómo sube y baja con un giro de la base.",
    video: "/video/turnaround.mp4",
    poster: "/img/experiencias/turnaround-poster.jpg",
    backdrop: "linear-gradient(#C2C1BC, #CDCDC8)",
    accent: "var(--amarillo)",
  },
  {
    slug: "3d-interactivo",
    image: "/img/experiencias/3d-interactivo.jpg",
    clip: "/video/3d-interactivo-fragmento.mp4",
    badge: "Modelo 3D",
    // pegar acá la URL de "Code export" de Spline cuando la escena esté publicada
    spline: "https://prod.spline.design/NRX403xtFaSFNlAJ/scene.splinecode",
    title: "3D interactivo",
    subtitle: "Abrilo, giralo, usalo",
    summary: "Manipulá el stick en 3D: sacale la tapa, girá la base y mirá cómo aparece la barra.",
    body:
      "Una experiencia interactiva para entender el producto con las manos: cada parte del envase, su función y el gesto de aplicación.",
    video: null,
    accent: "var(--celeste)",
  },
  {
    slug: "vr-360",
    title: "VR-360",
    subtitle: "Recorré el estudio PURA",
    summary: "Mirá a tu alrededor en una escena 360°: las tres líneas, sus cajas y cada detalle del SUNBAR.",
    body:
      "Hacé click y arrastrá para mirar en todas las direcciones. Cambiá de escena desde las miniaturas o abrilo en pantalla completa.",
    video: null,
    embed: "https://kuula.co/share/collection/7dqcF?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
    accent: "var(--naranja)",
  },
  {
    slug: "realidad-aumentada",
    image: "/img/experiencias/realidad-aumentada.jpg",
    clip: "/video/ra-superficie-fragmento.mp4",
    badge: "Realidad aumentada",
    videos: [
      {
        title: "RA — Filtro facial",
        body: "Filtro de realidad aumentada que proyecta el packaging octogonal sobre el rostro del usuario.",
        src: "/video/ra-filtro-facial.mp4",
        poster: "/img/experiencias/ra-filtro-facial-poster-final.jpg",
      },
      {
        title: "RA — Superficie real",
        body: "Realidad aumentada de superficie: el estuche aparece a escala real sobre cualquier mesa.",
        src: "/video/ra-superficie-real.mp4",
        poster: "/img/experiencias/ra-superficie-poster.jpg",
      },
    ],
    title: "Realidad aumentada",
    subtitle: "PURA en tu espacio",
    summary: "Probá el filtro facial y ubicá el estuche a escala real sobre cualquier superficie con la cámara del celular.",
    body:
      "Dos experiencias de realidad aumentada para ver el producto en tu propio entorno antes de elegir tu línea.",
    video: null,
    accent: "var(--amarillo)",
  },
];

export const nav = [
  { href: "/sobre-la-marca", label: "Sobre la marca" },
  { href: "/nuestras-lineas", label: "Nuestras líneas" },
  { href: "/experiencias", label: "Viví la experiencia" },
];

export const footerLinks = [
  { href: "mailto:hola@pura.com.ar", label: "Escribinos" },
  { href: "#newsletter", label: "Suscribite" },
  { href: "#donde-comprar", label: "Dónde comprar" },
];
