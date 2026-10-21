"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Scroll suave con Lenis, sincronizado con el ticker de GSAP y ScrollTrigger. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Al cambiar de página: arriba de todo (o al #ancla si la URL trae una) y recalcular triggers
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    let timer = 0;
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const target = hash ? document.getElementById(hash) : null;
      if (!target) return;
      // esperar a que termine la cortina de entrada y bajar suave hasta la sección
      timer = window.setTimeout(() => {
        const lenis = window.__lenis;
        if (lenis) lenis.scrollTo(target, { offset: -24, duration: 1.4 });
        else target.scrollIntoView({ behavior: "smooth" });
      }, 700);
    });
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
