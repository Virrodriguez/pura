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
  /** frase grande del home que se enciende palabra por palabra con el scroll */
  statement: string;
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
    statement:
      "Protección diaria para todo tipo de piel. Una barra que se desliza sin arrastre, no deja residuo blanco y entra en tu bolsillo para reaplicar en cualquier momento del día.",
    detail:
      "Nuestra barra original: filtros minerales de amplio espectro en una base de ceras y emolientes de origen natural. Pensada para llevar todos los días y reaplicar sin pensarlo.",
    features,
    gallery: [null, "/img/chica.png", null],
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
    statement:
      "Una fórmula suave y sin fragancia para pieles reactivas. Calma mientras protege, incluso en las zonas más delicadas: contorno de ojos, nariz y orejas.",
    detail:
      "Menos ingredientes, elegidos uno por uno. Una barra hipoalergénica que cuida las zonas más delicadas del rostro: contorno de ojos, nariz y orejas.",
    features,
    gallery: [null, null, null],
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
    statement:
      "Protección con un toque de color mineral que unifica el tono y deja un acabado natural y luminoso, como una segunda piel bajo el sol.",
    detail:
      "Pigmentos minerales que se funden con la piel. Protege, empareja el tono y reemplaza la base en los días de sol.",
    features,
    gallery: [null, null, null],
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
  accent: string;
};

export const experiences: Experience[] = [
  {
    slug: "turnaround",
    title: "Turnaround",
    subtitle: "El stick, desde todos los ángulos",
    summary: "Girá el producto 360° y descubrí cada detalle de la barra, la tapa y el mecanismo twist-up.",
    body:
      "Un recorrido completo alrededor del SUNSTICK: la forma ovalada de la barra, la textura del envase y cómo sube y baja con un giro de la base.",
    video: null,
    accent: "var(--amarillo)",
  },
  {
    slug: "3d-interactivo",
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
    subtitle: "Un día al sol con PURA",
    summary: "Entrá en una escena inmersiva y acompañá un día completo de protección y reaplicación.",
    body:
      "De la ciudad a la playa: una experiencia en 360° que muestra cuándo y dónde reaplicar a lo largo del día.",
    video: null,
    accent: "var(--naranja)",
  },
  {
    slug: "realidad-aumentada",
    title: "Realidad aumentada",
    subtitle: "PURA en tu mano",
    summary: "Llevá el stick a tu espacio con la cámara del celular y mirá su tamaño real.",
    body:
      "Proyectá el producto en tu mano o sobre la mesa para ver su escala real y elegir tu línea antes de comprarla.",
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
