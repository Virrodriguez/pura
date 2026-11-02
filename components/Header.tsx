"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { nav } from "@/lib/content";

// el menú suma "Inicio" a las secciones del sitio
const menuItems = [{ href: "/", label: "Inicio" }, ...nav];
import { Logotipo } from "./Logo";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Barra translúcida al scrollear; se esconde al bajar y vuelve al subir
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 240 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Timeline del menú
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
        const motion = ctx.conditions?.motion;
        tl.current = gsap
          .timeline({ paused: true })
          .fromTo(menuRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: motion ? 0.45 : 0.01, ease: "power2.out" })
          .fromTo(
            `.${styles.link}`,
            { yPercent: motion ? 110 : 0, rotate: motion ? 4 : 0 },
            { yPercent: 0, rotate: 0, duration: motion ? 0.8 : 0.01, stagger: 0.07, ease: "expo.out" },
            "-=0.25"
          )
          .fromTo(`.${styles.meta}`, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.5");
      });
      return () => mm.revert();
    },
    { scope: menuRef }
  );

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const t = tl.current;
    if (open) {
      window.__lenis?.stop();
      t?.timeScale(1).play();
      // preventScroll: sin esto el navegador desplaza el <li> (overflow hidden) y el link queda fuera de su máscara
      requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true }));
    } else {
      window.__lenis?.start();
      t?.timeScale(1.6).reverse();
    }
  }, [open]);

  // Cerrar al navegar y con Escape
  useEffect(() => close(), [pathname, close]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <header
        className={styles.header}
        data-scrolled={scrolled || undefined}
        data-hidden={(hidden && !open) || undefined}
        data-open={open || undefined}
      >
        <div className={`container ${styles.bar}`}>
          <Link href="/" className={styles.logo} aria-label="PURA, ir al inicio">
            <Logotipo />
          </Link>
          <button
            ref={toggleRef}
            className={styles.toggle}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="menu" ref={menuRef} className={styles.menu} aria-hidden={!open} inert={!open}>
        <nav aria-label="Principal" className={styles.nav}>
          <ul>
            {menuItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href} className={styles.item}>
                  <Link
                    href={item.href}
                    className={styles.link}
                    data-active={active || undefined}
                    aria-current={active ? "page" : undefined}
                    onClick={close}
                  >
                    {item.label}
                    <i className={styles.dot} aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <p className={styles.meta}>
          <span>Protección solar natural</span>
          <span>FPS 50+ · UVA/UVB</span>
        </p>
      </div>
    </>
  );
}
