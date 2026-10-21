"use client";

import { useRef, useState } from "react";
import { lines } from "@/lib/content";
import { SectionHead } from "@/components/ui";
import LinePanel from "@/components/LinePanel";
import { gsap, useGSAP, ScrollTrigger, MQ } from "@/lib/gsap";
import styles from "./LinesStack.module.css";

/**
 * "Elegí tu línea": la sección queda fija y, con el scroll del mouse,
 * la línea 2 sube y se apoya sobre la 1; después la 3 sube sobre la 2.
 * En pantallas chicas o con motion reducido, las tres líneas se muestran una debajo de la otra.
 */
export default function LinesStack() {
  const ref = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const pinST = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Apilado con pin: escritorio con altura suficiente y motion habilitado
      mm.add(`${MQ.motion} and (min-width: 861px) and (min-height: 701px)`, () => {
        const stack = stackRef.current!;
        const slots = gsap.utils.toArray<HTMLElement>(`.${styles.slot}`, stack);
        const steps = slots.length - 1;
        stack.dataset.stacked = "true";
        gsap.set(slots.slice(1), { yPercent: 108 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            // la sección se fija justo debajo del header
            start: "top top+=72",
            end: () => `+=${window.innerHeight * steps}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / steps, duration: { min: 0.25, max: 0.6 }, ease: "power2.inOut", delay: 0.05 },
            onUpdate: (self) => setActive(Math.round(self.progress * steps)),
          },
        });
        slots.slice(1).forEach((slot) => tl.to(slot, { yPercent: 0, duration: 1 }));
        pinST.current = tl.scrollTrigger ?? null;

        return () => {
          delete stack.dataset.stacked;
          pinST.current = null;
        };
      });

      // Sin apilado: la pastilla activa sigue a la línea visible
      mm.add(`not all and ${MQ.motion}, (max-width: 860px), (max-height: 700px)`, () => {
        gsap.utils.toArray<HTMLElement>(`.${styles.slot}`).forEach((slot, i) =>
          ScrollTrigger.create({
            trigger: slot,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (s) => s.isActive && setActive(i),
          })
        );
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  const goTo = (i: number) => {
    const st = pinST.current;
    const lenis = window.__lenis;
    if (st) {
      const y = st.start + ((st.end - st.start) * i) / (lines.length - 1);
      if (lenis) lenis.scrollTo(y, { duration: 1.2 });
      else window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(`slot-${i}`);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -100, duration: 1.2 });
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
            aria-pressed={active === i}
            onClick={() => goTo(i)}
          >
            {l.short}
          </button>
        ))}
      />
      <div ref={stackRef} className={styles.stack}>
        {lines.map((line, i) => (
          <div key={line.id} id={`slot-${i}`} className={styles.slot} style={{ zIndex: i + 1 }}>
            <LinePanel line={line} flip={i % 2 === 1} />
          </div>
        ))}
      </div>
    </section>
  );
}
