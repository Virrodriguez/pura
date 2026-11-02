"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Marco de video de una experiencia.
 * - Con `src`: muestra la portada con un botón de play; el video arranca al hacer click
 *   y desde ahí se controla con los controles nativos. `backdrop` pinta los costados
 *   cuando el video es vertical (se muestra entero, sin recortar).
 * - Sin `src`: estado "Video próximamente" con la trama del color de la experiencia.
 */
export default function ExperienceVideo({
  src,
  title,
  accent,
  poster,
  backdrop,
  ratio = "16 / 9",
}: {
  src: string | null;
  title: string;
  accent: string;
  poster?: string;
  backdrop?: string;
  /** proporción del marco (los videos verticales de RA usan "9 / 16") */
  ratio?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
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

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    // intenta con sonido; si el navegador lo bloquea, arranca en silencio (se activa desde los controles)
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => setStarted(false));
    });
  };

  const playButton = (
    <span
      aria-hidden="true"
      style={{ width: 84, height: 84, borderRadius: "50%", background: "var(--blanco)", display: "grid", placeItems: "center" }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--topo)">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );

  return (
    <div
      ref={ref}
      className={src ? undefined : trama}
      style={{
        position: "relative",
        aspectRatio: ratio,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        background: src ? backdrop ?? "var(--checker)" : undefined,
      }}
    >
      {src ? (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls={started}
            playsInline
            preload="metadata"
            aria-label={title}
            onEnded={() => setStarted(false)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: backdrop ? "contain" : "cover" }}
          />
          {!started ? (
            <button
              type="button"
              onClick={play}
              aria-label={`Reproducir el video de ${title}`}
              data-cursor="Play"
              style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", alignContent: "center", gap: 14 }}
            >
              {playButton}
              <span className="pill" style={{ background: "var(--blanco)" }}>
                Ver video
              </span>
            </button>
          ) : null}
        </>
      ) : (
        <div style={{ display: "grid", justifyItems: "center", gap: 14 }}>
          {playButton}
          <span className="pill" style={{ background: "var(--blanco)" }}>
            Video próximamente
          </span>
        </div>
      )}
    </div>
  );
}
