"use client";

import { useRef, useState } from "react";
import { lines } from "@/lib/content";
import { SectionHead } from "@/components/ui";
import LinePanel from "@/components/LinePanel";
import { gsap, useGSAP, ScrollTrigger, MQ } from "@/lib/gsap";
import styles from "./LinesStack.module.css";

/**
 * "Elegí tu línea" — referencia: portfolio de Roshan Sahu.
 * 1. Al llegar, la frase de la línea 1 sube palabra por palabra desde su máscara.
 * 2. La sección queda fija; con el scroll la línea 2 sube y tapa a la 1
 *    (que se desplaza apenas hacia arriba, sin oscurecerse) y su frase aparece igual.
 * 3. Lo mismo con la línea 3 sobre la 2.
 * En pantallas chicas o con motion reducido las líneas se muestran una debajo de la otra.
 */
export default function LinesStack() {
  const ref = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const pinST = useRef<ScrollTrigger | null>(null);
  const stops = useRef<number[]>([]);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const wordsOf = (el: Element) => el.querySelectorAll<HTMLElement>("[data-word]");
      const reveal = { yPercent: 0, stagger: 0.018, ease: "expo.out" };

      // Apilado con pin: escritorio con altura suficiente y motion habilitado
      mm.add(`${MQ.motion} and (min-width: 861px) and (min-height: 701px)`, () => {
        const stack = stackRef.current!;
        const slots = gsap.utils.toArray<HTMLElement>(`.${styles.slot}`, stack);
        stack.dataset.stacked = "true";

        gsap.set(slots.slice(1), { yPercent: 105 });
        slots.forEach((s) => gsap.set(wordsOf(s), { yPercent: 115 }));

        // frase de la línea 1 al entrar la sección
        gsap.to(wordsOf(slots[0]), {
          ...reveal,
          duration: 1.1,
          scrollTrigger: { trigger: stack, start: "top 70%" },
        });

        const tl = gsap.timeline({ defaults: { ease: "none" } }).addLabel("l0");
        slots.slice(1).forEach((slot, k) => {
          const prev = slots[k];
          tl.to(slot, { yPercent: 0, duration: 1, ease: "power2.inOut" })
            .to(prev, { yPercent: -8, duration: 1, ease: "power2.inOut" }, "<")
            .to(wordsOf(slot), { ...reveal, duration: 0.7 }, "-=0.35")
            .addLabel(`l${k + 1}`);
        });
        stops.current = slots.map((_, i) => tl.labels[`l${i}`] / tl.duration());

        pinST.current = ScrollTrigger.create({
          animation: tl,
          trigger: ref.current,
          start: "top top+=72", // justo debajo del header
          end: () => `+=${window.innerHeight * 1.3 * (slots.length - 1)}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: { snapTo: "labels", duration: { min: 0.3, max: 0.8 }, ease: "power2.inOut", delay: 0.08 },
          onUpdate: (self) => {
            const p = self.progress;
            const i = stops.current.reduce((best, s, idx) => (p >= s - 0.12 ? idx : best), 0);
            setActive(i);
          },
        });

        return () => {
          delete stack.dataset.stacked;
          pinST.current = null;
        };
      });

      // Sin apilado: cada frase aparece al entrar y la pastilla sigue a la línea visible
      mm.add(`not all and ${MQ.motion}, (max-width: 860px), (max-height: 700px)`, () => {
        const motion = window.matchMedia(MQ.motion).matches;
        gsap.utils.toArray<HTMLElement>(`.${styles.slot}`).forEach((slot, i) => {
          ScrollTrigger.create({
            trigger: slot,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (s) => s.isActive && setActive(i),
          });
          if (motion)
            gsap.from(wordsOf(slot), {
              yPercent: 115,
              stagger: 0.015,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: { trigger: slot, start: "top 80%" },
            });
        });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  const goTo = (i: number) => {
    const st = pinST.current;
    const lenis = window.__lenis;
    if (st) {
      const y = st.start + (st.end - st.start) * (stops.current[i] ?? 0);
      if (lenis) lenis.scrollTo(y, { duration: 1.4 });
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
