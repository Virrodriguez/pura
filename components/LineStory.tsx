"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Line } from "@/lib/content";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { RenderPlaceholder } from "./ui";
import styles from "./LineStory.module.css";

/**
 * Detalle de una línea: el texto queda fijo a un lado mientras las fotos
 * suben en una columna vertical a distinta velocidad (scroll vertical de imágenes).
 */
export default function LineStory({ line, index }: { line: Line; index: number }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
        const shots = gsap.utils.toArray<HTMLElement>(`.${styles.shot}`);
        shots.forEach((shot, i) => {
          gsap.fromTo(
            shot,
            { y: 80 + i * 40 },
            { y: -(40 + i * 30), ease: "none", scrollTrigger: { trigger: shot, start: "top bottom", end: "bottom top", scrub: true } }
          );
          gsap.from(shot, {
            clipPath: "inset(14% 8% 14% 8% round 24px)",
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: { trigger: shot, start: "top 92%" },
          });
        });
        gsap.from(`.${styles.copy} > *`, {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id={line.id}
      className={styles.story}
      style={{ "--line": line.color, "--ink": line.ink } as React.CSSProperties}
      aria-labelledby={`h-${line.id}`}
    >
      <div className={`container ${styles.grid}`} data-flip={index % 2 === 1 || undefined}>
        <div className={styles.copyCol}>
          <div className={styles.copy}>
            <p className="eyebrow">Línea {line.number}</p>
            <h2 id={`h-${line.id}`} className={styles.title}>
              {line.short}
            </h2>
            <p className={styles.detail}>{line.detail}</p>
            <p className={styles.intro}>{line.intro}</p>
            <ul className={styles.features}>
              {line.features.map((f) => (
                <li key={f.label}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.icon} alt="" width={24} height={24} />
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.shots}>
          {line.gallery.map((src, i) => (
            <div key={i} className={styles.shot}>
              {src ? (
                <Image src={src} alt={`${line.name}, foto ${i + 1}`} fill sizes="(max-width: 900px) 100vw, 45vw" style={{ objectFit: "cover" }} />
              ) : (
                <RenderPlaceholder label={`Foto ${line.short} ${i + 1}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
