"use client";

import { useEffect, useRef } from "react";

/* scroll-progress hairline + cursor spotlight on dark sections */
export default function GlobalEffects() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sbar = barRef.current;

    const updateBar = () => {
      if (!sbar) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      sbar.style.transform = "scaleX(" + p + ")";
    };
    window.addEventListener("scroll", updateBar, { passive: true });
    window.addEventListener("resize", updateBar);
    updateBar();

    /* cursor spotlight on .on-night sections */
    let onSpot: ((e: MouseEvent) => void) | null = null;
    if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
      onSpot = (e: MouseEvent) => {
        const sec = (e.target as Element).closest?.<HTMLElement>(".on-night");
        if (!sec) return;
        const r = sec.getBoundingClientRect();
        sec.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        sec.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      };
      document.addEventListener("mousemove", onSpot, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", updateBar);
      window.removeEventListener("resize", updateBar);
      if (onSpot) document.removeEventListener("mousemove", onSpot);
    };
  }, []);

  return <div className="scrollbar" ref={barRef} aria-hidden="true" />;
}
