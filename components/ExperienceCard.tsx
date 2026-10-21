"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import type { Experience } from "@/lib/content";
import { ArrowBadge } from "./ui";
import styles from "./ExperienceCard.module.css";

/**
 * Card de experiencia. Motion centrado en el hover (no en el scroll):
 * la imagen se inclina siguiendo al mouse, la trama se desplaza,
 * la flecha gira y el cursor muestra "Ver".
 */
export default function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const trama = ["trama-amarilla", "trama-celeste", "trama-naranja", "trama-amarilla"][index % 4];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MQ.motion} and ${MQ.fine}`, () => {
        const card = ref.current!;
        const media = card.querySelector<HTMLElement>(`.${styles.media}`)!;
        const rx = gsap.quickTo(media, "rotationX", { duration: 0.6, ease: "power3" });
        const ry = gsap.quickTo(media, "rotationY", { duration: 0.6, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = media.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 10);
          rx(py * -10);
          media.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
          media.style.setProperty("--my", `${(py + 0.5) * 100}%`);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        return () => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Link ref={ref} href={`/experiencias/${exp.slug}`} className={styles.card} data-cursor="Ver">
      <div className={styles.frame}>
        <div className={`${styles.media} ${trama}`}>
          <span className={styles.glow} aria-hidden="true" />
          <span className={styles.badge}>Video próximamente</span>
          <span className={styles.index} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className={styles.row}>
        <h3 className={styles.title}>{exp.title}</h3>
        <ArrowBadge className={styles.arrow} />
      </div>
      <p className={styles.summary}>{exp.summary}</p>
    </Link>
  );
}
