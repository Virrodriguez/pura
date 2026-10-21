"use client";

import { useRef, useState } from "react";
import { about, tags } from "@/lib/content";
import { useReveal } from "@/components/ui";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import styles from "./Intro.module.css";

/** Bloque "Sobre la marca": titular + etiquetas a la izquierda, acordeón a la derecha. */
export default function Intro({
  eyebrow = "Sobre la marca",
  titleLines = ["Protección solar que", "entra en tu bolsillo"],
}: {
  eyebrow?: string;
  titleLines?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(`.${styles.tags} li`, {
          scale: 0.6,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: "back.out(2)",
          scrollTrigger: { trigger: `.${styles.tags}`, start: "top 90%" },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`container ${styles.intro}`}>
      <div className={styles.left}>
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
        <h2 className={styles.title}>
          {/* cada línea sube desde su propia máscara */}
          {titleLines.map((line) => (
            <span key={line} className={styles.mask}>
              <span data-reveal-line>{line}</span>
            </span>
          ))}
        </h2>
        <ul className={styles.tags}>
          {tags.map((t) => (
            <li key={t} className="pill">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.right}>
        {about.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.title} className={styles.item} data-open={isOpen || undefined} data-reveal>
              <h3>
                <button
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={`acc-${i}`}
                  id={`acc-btn-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {item.title}
                  <span className={styles.icon} aria-hidden="true" />
                </button>
              </h3>
              <div id={`acc-${i}`} role="region" aria-labelledby={`acc-btn-${i}`} className={styles.panel}>
                <div>
                  <p>{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
