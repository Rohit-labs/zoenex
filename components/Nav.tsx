"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@/lib/gsap";
import { initMagnetic } from "@/lib/magnetic";
import { ArrowRight } from "./icons";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
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

  /* pages that open on a dark hero need the light-on-dark nav treatment */
  const onDark = pathname === "/services/motion-design";

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
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-fill" data-magnetic>
            Book a call
            <ArrowRight />
          </Link>
        </nav>
      </div>
    </header>
  );
}
