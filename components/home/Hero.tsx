"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import styles from "./Hero.module.css";

/** Hero: el video de marca en una tarjeta redondeada que se abre al cargar y se asienta al scrollear. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const card = `.${styles.card}`;
        gsap.from(card, {
          clipPath: "inset(18% 12% 18% 12% round 24px)",
          duration: 1.6,
          delay: 0.35,
          ease: "expo.out",
        });
        gsap.from(`.${styles.video}`, { scale: 1.25, duration: 2, delay: 0.35, ease: "expo.out" });

        // al bajar, la tarjeta se achica un poco y el video hace parallax
        gsap.to(card, {
          scale: 0.94,
          borderRadius: 24,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(`.${styles.video}`, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={styles.hero} aria-label="PURA, protección solar natural">
      <div className="container">
        <div className={styles.card}>
          <video
            className={styles.video}
            src="/video/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Video de presentación de PURA"
          />
        </div>
      </div>
    </section>
  );
}
