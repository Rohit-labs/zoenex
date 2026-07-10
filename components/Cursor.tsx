"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* custom cursor — difference-blend dot that grows over interactive elements */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cursor = ref.current;
    if (!cursor) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (!finePointer || reduce) return;

    const cx = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3" });
    const cy = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3" });
    const onMove = (e: MouseEvent) => {
      cx(e.clientX);
      cy(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("a,button,[data-cursor]")) cursor.classList.add("hovering");
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("a,button,[data-cursor]")) cursor.classList.remove("hovering");
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  });

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <div className="dot" />
    </div>
  );
}
