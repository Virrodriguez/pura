"use client";

import { useRef } from "react";
import { experiences } from "@/lib/content";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import ExperienceCard from "./ExperienceCard";

/** Grilla 2×2 de experiencias, con una entrada escalonada liviana. */
export default function ExperienceGrid() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(ref.current!.children, {
          y: 50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="exp-grid">
      {experiences.map((exp, i) => (
        <ExperienceCard key={exp.slug} exp={exp} index={i} />
      ))}
    </div>
  );
}
