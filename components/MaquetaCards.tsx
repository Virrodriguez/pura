"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./MaquetaCards.module.css";

export type Maqueta = { src: string; group: string; side: string; alt: string; trama: string };

/** Bloques limpios que revelan la foto de la maqueta al pasar el mouse (o al tocarlos en el celular). */
export default function MaquetaCards({ items }: { items: Maqueta[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className={styles.grid}>
      {items.map((m, i) => {
        const isOpen = open === m.src;
        return (
          <li key={m.src}>
            <button
              type="button"
              className={`${styles.card} ${m.trama}`}
              data-open={isOpen || undefined}
              aria-pressed={isOpen}
              aria-label={`${m.group} · ${m.side}: ver maqueta`}
              data-cursor="Ver"
              onClick={() => setOpen(isOpen ? null : m.src)}
            >
              <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.label}>
                <span>{m.group}</span>
                <strong>{m.side}</strong>
              </span>
              <span className={styles.photo}>
                <Image src={m.src} alt={m.alt} fill sizes="(max-width: 860px) 50vw, 25vw" />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
