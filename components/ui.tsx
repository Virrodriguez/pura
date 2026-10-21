"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, MQ } from "@/lib/gsap";
import styles from "./ui.module.css";

/** Encabezado de sección: eyebrow + título + acción opcional a la derecha. Revela el título al entrar. */
export function SectionHead({
  eyebrow,
  title,
  aside,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  aside?: React.ReactNode;
  as?: "h1" | "h2";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  return (
    <div ref={ref} className={styles.head}>
      <div>
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
        <Tag className={styles.headTitle}>
          <span className={styles.mask}>
            <span data-reveal-line>{title}</span>
          </span>
        </Tag>
      </div>
      {aside ? <div className={styles.headAside}>{aside}</div> : null}
    </div>
  );
}

/** Cabecera de página interna: eyebrow, título grande en líneas enmascaradas y bajada. */
export function PageHead({
  eyebrow,
  lines,
  lead,
  crumbs = [],
}: {
  eyebrow: string;
  lines: string[];
  lead?: string;
  /** pasos intermedios de la ruta (Inicio se agrega solo) */
  crumbs?: { href: string; label: string }[];
}) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <header ref={ref} className={`container ${styles.pageHead}`}>
      <nav aria-label="Ruta de navegación" className={styles.crumbs}>
        <Link href="/">← Inicio</Link>
        {crumbs.map((c) => (
          <span key={c.href}>
            <span aria-hidden="true">/</span> <Link href={c.href}>{c.label}</Link>
          </span>
        ))}
      </nav>
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h1 className={styles.pageTitle}>
        {lines.map((l) => (
          <span key={l} className={styles.mask}>
            <span data-reveal-line>{l}</span>
          </span>
        ))}
      </h1>
      {lead ? (
        <p className={styles.lead} data-reveal>
          {lead}
        </p>
      ) : null}
    </header>
  );
}

/**
 * Revela al entrar en pantalla:
 * - [data-reveal-line]: sube desde una máscara (títulos)
 * - [data-reveal]: sube y aparece (bloques)
 */
export function useReveal(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const lines = gsap.utils.toArray<HTMLElement>("[data-reveal-line]");
        lines.forEach((el) =>
          gsap.from(el, {
            yPercent: 105,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          })
        );
        ScrollBatch(gsap.utils.toArray<HTMLElement>("[data-reveal]"));
      });
      return () => mm.revert();
    },
    { scope }
  );
}

function ScrollBatch(items: HTMLElement[]) {
  if (!items.length) return;
  gsap.set(items, { y: 28, autoAlpha: 0 });
  ScrollTrigger.batch(items, {
    start: "top 92%",
    once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.9, ease: "expo.out", overwrite: true }),
  });
}

/** Placeholder "cuadrillé" para renders que todavía no existen. */
export function RenderPlaceholder({ label = "Render próximamente", className }: { label?: string; className?: string }) {
  return (
    <div className={`${styles.checker} ${className ?? ""}`} role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  );
}

/** Flecha en círculo (botón de las cards) */
export function ArrowBadge({ className }: { className?: string }) {
  return (
    <span className={`${styles.arrow} ${className ?? ""}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}
