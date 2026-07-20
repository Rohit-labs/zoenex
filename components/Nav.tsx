"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@/lib/gsap";
import { initMagnetic } from "@/lib/magnetic";
import { ArrowRight } from "./icons";

const SERVICE_LINKS = [
  { href: "/services/ai-automation", label: "AI Automation" },
  { href: "/services/websites", label: "Websites & Product" },
  { href: "/services/motion-design", label: "Motion Design" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close the mobile menu on navigation */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* flip the nav to its on-dark treatment whenever a dark section is
     behind the bar. Hard-coded fallback for the dedicated motion page. */
  useEffect(() => {
    if (pathname === "/services/motion-design") {
      setOnDark(true);
      return;
    }
    const dark = document.querySelectorAll<HTMLElement>(".on-night");
    if (!dark.length) {
      setOnDark(false);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        /* the darkest section nearest the nav wins */
        let nearest: { top: number; entry: IntersectionObserverEntry } | null = null;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const t = e.boundingClientRect.top;
          if (t < 80 && (nearest == null || t > nearest.top)) nearest = { top: t, entry: e };
        });
        setOnDark(!!nearest);
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: [0, 0.01, 0.5] }
    );
    dark.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useGSAP(() => initMagnetic(ref.current!), { scope: ref });

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}${onDark ? " on-dark" : ""}`} ref={ref}>
      <div className="wrap nav-inner">
        <Link className="logo" href="/">
          <span className="logo-mark" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/zoenex-mark.png" alt="" draggable={false} />
          </span>
          <span className="logo-word">
            ZOENEX
            <em>STUDIOS</em>
          </span>
        </Link>
        <button
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path d="M1 1h16M1 6h16M1 11h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <nav className={`nav-links${open ? " open" : ""}`} id="navLinks" aria-label="Primary">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
            <span className="nav-link-text">Home</span>
          </Link>
          <div className={`nav-group${SERVICE_LINKS.some((link) => pathname === link.href) ? " active" : ""}`}>
            <span className="nav-group-label">
              <span className="nav-link-text">Services</span>
            </span>
            <div className="nav-submenu">
              {SERVICE_LINKS.map((l) => (
                <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/contact" className="btn btn-fill" data-magnetic>
            Let&apos;s talk
            <ArrowRight />
          </Link>
        </nav>
      </div>
    </header>
  );
}
