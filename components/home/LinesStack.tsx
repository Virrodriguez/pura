"use client";

import { useRef, useState } from "react";
import { lines } from "@/lib/content";
import { SectionHead } from "@/components/ui";
import LinePanel from "@/components/LinePanel";
import { gsap, useGSAP, ScrollTrigger, MQ } from "@/lib/gsap";
import styles from "./LinesStack.module.css";

/**
 * "Elegí tu línea": los tres banners quedan fijos y se apilan con el scroll.
 * Primer scroll → línea 1; la 2 sube y la tapa; luego la 3.
 * La línea tapada se achica y oscurece levemente para dar profundidad.
 */
export default function LinesStack() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(`.${styles.slot}`);
      panels.forEach((slot, i) =>
        ScrollTrigger.create({
          trigger: slot,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (s) => s.isActive && setActive(i),
        })
      );

      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        panels.forEach((slot, i) => {
          const next = panels[i + 1];
          if (!next) return;
          const panel = slot.firstElementChild as HTMLElement;
          gsap.to(panel, {
            scale: 0.92,
            filter: "brightness(0.9)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top+=120", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const goTo = (i: number) => {
    const el = document.getElementById(`slot-${i}`);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -100, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className={`container ${styles.section}`} id="lineas">
      <SectionHead
        eyebrow="Tres opciones para tu rostro"
        title="Elegí tu línea"
        aside={lines.map((l, i) => (
          <button
            key={l.id}
            className={`pill ${styles.pill}`}
            style={{ "--bg": l.color, "--fg": l.ink } as React.CSSProperties}
            data-active={active === i || undefined}
            onClick={() => goTo(i)}
          >
            {l.short}
          </button>
        ))}
      />
      <div className={styles.stack}>
        {lines.map((line, i) => (
          <div key={line.id} id={`slot-${i}`} className={styles.slot} style={{ zIndex: i + 1 }}>
            <LinePanel line={line} flip={i % 2 === 1} />
          </div>
        ))}
      </div>
    </section>
  );
}
