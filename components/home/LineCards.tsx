"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { lines } from "@/lib/content";
import { SectionHead } from "@/components/ui";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import styles from "./LineCards.module.css";

/**
 * "Elegí tu línea" (home): tres cards en bloque, una por línea.
 * - Entrada: las cards suben escalonadas y el producto asoma desde abajo con el scroll.
 * - Hover: la tapa se separa y gira, el cuerpo sube, el producto sigue al mouse y aparece la trama.
 * - "Conocé más" lleva a la línea en /nuestras-lineas.
 */
export default function LineCards() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);

      mm.add(MQ.motion, () => {
        gsap.from(cards, {
          y: 70,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: `.${styles.grid}`, start: "top 85%" },
        });
        cards.forEach((card) => {
          gsap.from(card.querySelector(`.${styles.product}`), {
            yPercent: 22,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom 60%", scrub: true },
          });
        });
      });

      mm.add(`${MQ.motion} and ${MQ.fine}`, () => {
        const cleanups = cards.map((card) => {
          const float = card.querySelector<HTMLElement>(`.${styles.float}`)!;
          const cap = card.querySelector<HTMLElement>(`.${styles.cap}`)!;
          const body = card.querySelector<HTMLElement>(`.${styles.body}`)!;
          const trama = card.querySelector<HTMLElement>(`.${styles.trama}`)!;
          const fx = gsap.quickTo(float, "x", { duration: 0.9, ease: "power3" });
          const fy = gsap.quickTo(float, "y", { duration: 0.9, ease: "power3" });

          const hover = gsap
            .timeline({ paused: true, defaults: { duration: 0.8, ease: "expo.out" } })
            .to(cap, { y: -34, x: -10, rotate: -12 }, 0)
            .to(body, { y: -18, rotate: -5 }, 0)
            .to(trama, { autoAlpha: 1, scale: 1, duration: 1 }, 0);

          const enter = () => hover.play();
          const leave = () => {
            hover.reverse();
            fx(0);
            fy(0);
          };
          const move = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            fx(((e.clientX - r.left) / r.width - 0.5) * 28);
            fy(((e.clientY - r.top) / r.height - 0.5) * 22);
          };
          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointerleave", leave);
          card.addEventListener("pointermove", move);
          return () => {
            card.removeEventListener("pointerenter", enter);
            card.removeEventListener("pointerleave", leave);
            card.removeEventListener("pointermove", move);
          };
        });
        return () => cleanups.forEach((c) => c());
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  // Pastilla → lleva a su card y la hace "saltar"
  const goTo = (id: string) => {
    const card = document.getElementById(`card-${id}`);
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    if (!window.matchMedia(MQ.reduce).matches)
      gsap.fromTo(card, { y: 0 }, { y: -14, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" });
  };

  return (
    <section ref={ref} className={`container ${styles.section}`} id="lineas">
      <SectionHead
        eyebrow="Tres opciones para tu rostro"
        title="Elegí tu línea"
        aside={lines.map((l) => (
          <button
            key={l.id}
            className={`pill ${styles.pill}`}
            style={{ "--bg": l.color, "--fg": l.ink } as React.CSSProperties}
            onClick={() => goTo(l.id)}
          >
            {l.short}
          </button>
        ))}
      />

      <div className={styles.grid}>
        {lines.map((line) => (
          <article
            key={line.id}
            id={`card-${line.id}`}
            className={styles.card}
            style={{ "--line": line.color, "--ink": line.ink } as React.CSSProperties}
            aria-labelledby={`card-t-${line.id}`}
          >
            <span className={`${styles.trama} ${tramaClass(line.id)}`} aria-hidden="true" />

            <div className={styles.copy}>
              <h3 id={`card-t-${line.id}`} className={styles.title}>
                {line.short}
              </h3>
              <p className={styles.text}>{line.card}</p>
              <Link href={`/nuestras-lineas#${line.id}`} className={styles.cta} data-cursor="Ver">
                <span>Conocé más</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <div className={styles.product} aria-hidden="true">
              <div className={styles.float}>
                <Image className={styles.cap} src={line.render.cap} alt="" width={560} height={544} sizes="(max-width: 900px) 45vw, 260px" loading="eager" />
                <Image className={styles.body} src={line.render.body} alt="" width={560} height={930} sizes="(max-width: 900px) 45vw, 260px" loading="eager" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function tramaClass(id: string) {
  return id === "clasica" ? "trama-amarilla" : id === "pieles-sensibles" ? "trama-celeste" : "trama-naranja";
}
