"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/** Transición de entrada entre páginas: una cortina amarilla que se retira hacia arriba. */
export default function Template({ children }: { children: React.ReactNode }) {
  const curtain = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap
        .timeline()
        .set(curtain.current, { display: "block" })
        .fromTo(curtain.current, { yPercent: 0 }, { yPercent: -100, duration: 0.9, ease: "expo.inOut" })
        // clearProps: un transform en este wrapper rompería los pin de ScrollTrigger
        .from(page.current, { y: 40, duration: 0.9, ease: "expo.out", clearProps: "transform" }, "-=0.55")
        .set(curtain.current, { display: "none" });
    });
    return () => mm.revert();
  });

  return (
    <>
      <div
        ref={curtain}
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 95, background: "var(--amarillo)", display: "none", pointerEvents: "none" }}
      />
      <div ref={page}>{children}</div>
    </>
  );
}
