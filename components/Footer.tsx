"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { footerLinks, nav } from "@/lib/content";
import { Logotipo } from "./Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(`.${styles.big} a`, {
          yPercent: 60,
          stagger: 0.08,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });
        // el logotipo gigante sube a medida que se termina la página
        gsap.fromTo(
          `.${styles.giant}`,
          { yPercent: 35 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: true } }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <footer ref={ref} className={styles.footer} id="contacto">
      <div className="container">
        <ul className={styles.big}>
          {footerLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href}>
                <span>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.row}>
          <nav aria-label="Pie de página" className={styles.nav}>
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <p className={styles.legal}>© {new Date().getFullYear()} PURA · Protección solar natural</p>
        </div>

        <div className={styles.giantWrap} aria-hidden="true">
          <Logotipo className={styles.giant} />
        </div>
      </div>
    </footer>
  );
}
