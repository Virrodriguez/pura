"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { RenderPlaceholder } from "./ui";

/** Imagen redondeada con revelado y parallax interno. Sin src muestra el placeholder cuadrillé. */
export default function ParallaxImage({
  src,
  alt = "",
  ratio = "4 / 5",
  speed = 10,
  placeholder = "Render próximamente",
}: {
  src: string | null;
  alt?: string;
  ratio?: string;
  speed?: number;
  placeholder?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(ref.current, {
          clipPath: "inset(10% 5% 0% 5% round 24px)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%" },
        });
        const inner = ref.current!.firstElementChild;
        if (inner)
          gsap.fromTo(
            inner,
            { yPercent: -speed },
            { yPercent: speed, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } }
          );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      style={{ position: "relative", aspectRatio: ratio, maxWidth: "100%", overflow: "hidden", borderRadius: "var(--radius)" }}
    >
      <div style={{ position: "absolute", inset: `-${speed + 2}% 0`, willChange: "transform" }}>
        {src ? (
          <Image src={src} alt={alt} fill sizes="(max-width: 860px) 100vw, 60vw" style={{ objectFit: "cover" }} />
        ) : (
          <RenderPlaceholder label={placeholder} />
        )}
      </div>
    </div>
  );
}
