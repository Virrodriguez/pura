"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import type { Experience } from "@/lib/content";
import { ArrowBadge } from "./ui";
import styles from "./ExperienceCard.module.css";

/**
 * Card de experiencia. Motion centrado en el hover (no en el scroll):
 * la imagen se inclina siguiendo al mouse, la trama se desplaza,
 * la flecha gira y el cursor muestra "Ver".
 * Si la experiencia tiene `clip`, al pasar el mouse se reproduce un fragmento
 * corto sobre la imagen y al salir vuelve a la imagen (en pantallas táctiles se
 * reproduce cuando la card entra en pantalla). El click lleva a la experiencia.
 */
export default function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const trama = ["trama-amarilla", "trama-celeste", "trama-naranja", "trama-amarilla"][index % 4];
  const href = `/experiencias/${exp.slug}`;

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

  const playClip = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };
  const stopClip = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  // Táctil (sin hover): el fragmento se reproduce cuando la card entra en pantalla
  useEffect(() => {
    const el = ref.current;
    if (!exp.clip || !el || window.matchMedia(MQ.fine).matches || window.matchMedia(MQ.reduce).matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? playClip() : stopClip()), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exp.clip]);

  const media = (
    <div className={styles.frame}>
      <div className={`${styles.media} ${exp.image ? "" : trama}`} data-playing={playing || undefined}>
        {exp.image ? (
          <Image className={styles.img} src={exp.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
        ) : null}
        {exp.clip ? (
          <video
            ref={videoRef}
            className={styles.clip}
            src={exp.clip}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : null}
        <span className={styles.glow} aria-hidden="true" />
        {exp.badge ? (
          <span className={styles.badge} aria-hidden="true">
            {exp.badge}
          </span>
        ) : exp.image ? null : (
          <span className={styles.badge}>Video próximamente</span>
        )}
        <span className={styles.index} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );

  const text = (
    <>
      <div className={styles.row}>
        <h3 className={styles.title}>{exp.title}</h3>
        <ArrowBadge className={styles.arrow} />
      </div>
      <p className={styles.summary}>{exp.summary}</p>
    </>
  );

  return (
    <Link
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      className={styles.card}
      data-cursor="Ver"
      onPointerEnter={exp.clip ? (e) => e.pointerType !== "touch" && playClip() : undefined}
      onPointerLeave={exp.clip ? (e) => e.pointerType !== "touch" && stopClip() : undefined}
    >
      {media}
      {text}
    </Link>
  );
}
