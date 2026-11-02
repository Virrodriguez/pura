import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHead, SectionHead } from "@/components/ui";
import Intro from "@/components/home/Intro";
import ParallaxImage from "@/components/ParallaxImage";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sobre la marca",
  description: "Misión, visión y valores de PURA: ingredientes naturales, ciencia y diseño en un protector solar en barra.",
};

const values = [
  { title: "Natural", body: "Ingredientes de origen natural y filtros minerales elegidos por su eficacia y su amabilidad con la piel.", trama: "trama-amarilla" },
  { title: "Científica", body: "Fórmulas con FPS 50+ y amplio espectro UVA/UVB. Sin promesas imposibles: protección real y medible.", trama: "trama-celeste" },
  { title: "Diseñada", body: "Un objeto compacto y lindo de llevar, pensado para que reaplicar sea un gesto simple y cotidiano.", trama: "trama-naranja" },
];

const renders = [
  { src: "/img/renders/tres-tapas-vuelan.png", label: "Frente", alt: "Los tres SUNBAR abiertos con las tapas flotando", sizes: "(max-width: 860px) 100vw, 50vw" },
  { src: "/img/renders/clasica.png", label: "Abierto", alt: "SUNBAR Clásica sobre un pedestal", sizes: "(max-width: 860px) 100vw, 25vw" },
  { src: "/img/renders/caja-clasica-detalle.jpg", label: "Detalle", alt: "Detalle de la caja del SUNBAR Clásica", sizes: "(max-width: 860px) 100vw, 25vw" },
];

export default function SobreLaMarca() {
  return (
    <>
      <PageHead
        eyebrow="Sobre la marca"
        lines={["Ciencia, naturaleza", "y diseño en una barra."]}
        lead="PURA nace de una pregunta simple: ¿por qué protegerse del sol sigue siendo incómodo? Creamos un fotoprotector facial que se lleva encima y se usa sin pensarlo."
      />

      <div className="container">
        <ParallaxImage src="/img/chica.png" alt="Mujer sonriendo con la piel protegida" ratio="16 / 8" />
      </div>

      <section className={`container ${styles.mv}`}>
        <div>
          <p className="eyebrow">Misión</p>
          <p className={styles.statement}>
            Hacer que la protección solar diaria sea fácil, limpia y agradable, para que reaplicar se vuelva un hábito.
          </p>
        </div>
        <div>
          <p className="eyebrow">Visión</p>
          <p className={styles.statement}>
            Ser la marca de fotoprotección natural de referencia para quienes viven al aire libre, en la ciudad y en movimiento.
          </p>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <SectionHead eyebrow="Lo que nos guía" title="Nuestros valores" />
        <ul className={styles.values}>
          {values.map((v) => (
            <li key={v.title} className={`${styles.value} ${v.trama}`}>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <Intro eyebrow="El producto" titleLines={["Un formato pensado", "para reaplicar"]} />

      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <SectionHead eyebrow="SUNBAR en detalle" title="Renders del producto" />
        <div className={styles.renders}>
          {renders.map((r) => (
            <figure key={r.src} className={styles.render}>
              <Image src={r.src} alt={r.alt} fill sizes={r.sizes} />
              <figcaption>{r.label}</figcaption>
            </figure>
          ))}
        </div>
        <Link href="/nuestras-lineas" className={styles.cta} data-cursor="Ir">
          Conocé nuestras líneas <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
