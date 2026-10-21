"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import styles from "./Cursor.module.css";

/**
 * Cursor de marca: un punto naranja que sigue al mouse con un leve retardo.
 * - Sobre links y botones se agranda.
 * - Sobre elementos con data-cursor="Texto" se convierte en un círculo con ese texto.
 * Sólo en dispositivos con puntero fino (en táctiles el CSS lo oculta); respeta prefers-reduced-motion.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState<"dot" | "hover" | "label">("dot");
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 0 : 0.35;
    const xTo = gsap.quickTo(el, "x", { duration: dur, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: dur, ease: "power3" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.dataset.visible = "true";
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const withLabel = t.closest<HTMLElement>("[data-cursor]");
      if (withLabel) {
        setLabel(withLabel.dataset.cursor || "");
        setMode("label");
      } else if (t.closest("a, button, summary, [role='button'], input, label")) {
        setMode("hover");
      } else {
        setMode("dot");
      }
    };
    const leave = () => {
      delete el.dataset.visible;
      shown = false;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    // se oculta el cursor del sistema sólo cuando el de marca ya está funcionando
    document.documentElement.classList.add("has-cursor");
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  // vuelve al estado base al navegar
  useEffect(() => setMode("dot"), [pathname]);

  return (
    <div ref={ref} className={styles.cursor} data-mode={mode} aria-hidden="true">
      <span className={styles.label}>{label}</span>
    </div>
  );
}
