"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// misma versión que el embed exportado desde Spline; build WebGPU si el navegador lo soporta, si no la estándar (WebGL)
const VIEWER_BASE = "https://cdn.spline.design/@splinetool/viewer@2.0.127/build/";
const viewerSrc = () =>
  VIEWER_BASE + (typeof navigator !== "undefined" && "gpu" in navigator ? "spline-viewer.webgpu.js" : "spline-viewer.js");

/** URL de escena publicada en Spline (prod.spline.design/.../scene.splinecode) */
const isPublished = (url?: string) => !!url && /^https:\/\/.+\.splinecode$/.test(url);

/**
 * Escena 3D interactiva de Spline.
 * Muestra la portada; al hacer click carga el visor de Spline (script del CDN, una sola vez)
 * y monta <spline-viewer>. Mientras la escena no esté publicada queda la portada con "3D próximamente".
 */
export default function SplineEmbed({ url, poster, title }: { url?: string; poster: string; title: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const published = isPublished(url);

  useEffect(() => {
    if (!active || !published || !mountRef.current) return;
    const mount = mountRef.current;

    const src = viewerSrc();
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement("script");
      s.type = "module";
      s.src = src;
      document.head.appendChild(s);
    }
    const viewer = document.createElement("spline-viewer");
    viewer.setAttribute("url", url!);
    viewer.setAttribute("loading-anim-type", "spinner-small-light");
    viewer.style.width = "100%";
    viewer.style.height = "100%";
    viewer.addEventListener("load-complete", () => setReady(true));
    mount.appendChild(viewer);
    // por si el evento no llega, se saca la portada igual
    const t = window.setTimeout(() => setReady(true), 4000);
    return () => {
      window.clearTimeout(t);
      viewer.remove();
    };
  }, [active, published, url]);

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "16 / 10",
        minHeight: 420,
        maxHeight: "80svh",
        width: "100%",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "#E2E2E2",
      }}
    >
      <div ref={mountRef} data-lenis-prevent style={{ position: "absolute", inset: 0 }} />

      {!ready ? (
        <div style={{ position: "absolute", inset: 0, transition: "opacity .5s", opacity: active ? 0.6 : 1 }}>
          <Image src={poster} alt={`${title}: vista previa`} fill sizes="(max-width: 900px) 100vw, 1200px" style={{ objectFit: "cover" }} />
        </div>
      ) : null}

      {!active ? (
        published ? (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Abrir ${title}`}
            data-cursor="3D"
            style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", alignContent: "center", gap: 14 }}
          >
            <span
              aria-hidden="true"
              style={{ width: 84, height: 84, borderRadius: "50%", background: "var(--blanco)", display: "grid", placeItems: "center", fontWeight: 800 }}
            >
              3D
            </span>
            <span className="pill" style={{ background: "var(--blanco)" }}>
              Explorar en 3D
            </span>
          </button>
        ) : (
          <span className="pill" style={{ position: "absolute", left: 18, bottom: 18, background: "var(--blanco)" }}>
            3D interactivo próximamente
          </span>
        )
      ) : null}
    </div>
  );
}
