"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import styles from "./Gallery.module.css";

/**
 * Galería: foto + bloque de trama (fila doble) y un bloque naranja a todo el ancho.
 * Motion: revelado con clip-path, parallax de la foto, trama que sigue al mouse
 * y una frase que corre sobre el bloque naranja.
 */
export default function Gallery() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>(`.${styles.tile}`).forEach((tile, i) => {
          gsap.from(tile, {
            clipPath: "inset(12% 6% 0% 6% round 24px)",
            duration: 1.4,
            delay: (i % 2) * 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: tile, start: "top 88%" },
          });
        });
        gsap.fromTo(
          `.${styles.photo}`,
          { yPercent: -8 },
          { yPercent: 8, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } }
        );
        gsap.to(`.${styles.marquee}`, {
          xPercent: -50,
          ease: "none",
          scrollTrigger: { trigger: `.${styles.wide}`, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });

      // el render de los tres protectores sigue levemente al mouse
      mm.add(`${MQ.motion} and ${MQ.fine}`, () => {
        const tile = ref.current!.querySelector<HTMLElement>(`.${styles.productTile}`)!;
        const img = tile.querySelector<HTMLElement>(`.${styles.product}`)!;
        const x = gsap.quickTo(img, "x", { duration: 1.2, ease: "power3" });
        const y = gsap.quickTo(img, "y", { duration: 1.2, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = tile.getBoundingClientRect();
          x(((e.clientX - r.left) / r.width - 0.5) * -24);
          y(((e.clientY - r.top) / r.height - 0.5) * -18);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        tile.addEventListener("pointermove", move);
        tile.addEventListener("pointerleave", leave);
        return () => {
          tile.removeEventListener("pointermove", move);
          tile.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`container ${styles.gallery}`} aria-label="Galería">
      <div className={styles.row}>
        <figure className={`${styles.tile} ${styles.photoTile}`}>
          <Image
            src="/img/chica.png"
            alt="Mujer sonriendo con la piel luminosa"
            fill
            sizes="(max-width: 860px) 100vw, 50vw"
            className={styles.photo}
          />
        </figure>
        <figure className={`${styles.tile} ${styles.productTile}`}>
          <Image
            src="/img/renders/tres-lineas.png"
            alt="Los tres SUNBAR de PURA: Pieles sensibles, Clásica y Con color"
            fill
            sizes="(max-width: 860px) 100vw, 50vw"
            className={styles.product}
          />
        </figure>
      </div>
      <div className={`${styles.tile} ${styles.wide} trama-naranja`}>
        <p className={styles.marquee} aria-label="Reaplicá cada 2 horas">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} aria-hidden="true">
              Reaplicá cada 2 horas ·{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
