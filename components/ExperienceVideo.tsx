"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/** Marco de video de una experiencia. Sin src muestra un estado "próximamente" con la trama de su color. */
export default function ExperienceVideo({ src, title, accent }: { src: string | null; title: string; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const trama =
    accent === "var(--celeste)" ? "trama-celeste" : accent === "var(--naranja)" ? "trama-naranja" : "trama-amarilla";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(ref.current, { clipPath: "inset(14% 10% 14% 10% round 28px)", duration: 1.6, delay: 0.4, ease: "expo.out" });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={src ? undefined : trama}
      style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "var(--radius-lg)", overflow: "hidden", display: "grid", placeItems: "center" }}
    >
      {src ? (
        <video src={src} controls playsInline preload="metadata" aria-label={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div style={{ display: "grid", justifyItems: "center", gap: 14 }}>
          <span
            aria-hidden="true"
            style={{ width: 84, height: 84, borderRadius: "50%", background: "var(--blanco)", display: "grid", placeItems: "center" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--topo)">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="pill" style={{ background: "var(--blanco)" }}>
            Video próximamente
          </span>
        </div>
      )}
    </div>
  );
}
