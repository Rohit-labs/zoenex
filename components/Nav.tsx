"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@/lib/gsap";
import { initMagnetic } from "@/lib/magnetic";
import { ArrowRight } from "./icons";
import { trackEvent } from "@/lib/analytics";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services/websites", label: "Websites" },
  { href: "/services/ai-automation", label: "AI Automation" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useGSAP(() => initMagnetic(ref.current!), { scope: ref });

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} ref={ref}>
      <div className="wrap nav-inner">
        <Link className="logo" href="/">
          <span className="logo-mark" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/zoenex-mark.png" alt="Zoenex Studios logo" draggable={false} />
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
          {LINKS.map((l) => {
            const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} aria-current={isActive ? "page" : undefined}>
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/audit"
            className="btn btn-fill"
            data-magnetic
            onClick={() => trackEvent("audit_cta_click", { location: "nav" })}
          >
            Book an Audit
            <ArrowRight />
          </Link>
        </nav>
      </div>
    </header>
  );
}
