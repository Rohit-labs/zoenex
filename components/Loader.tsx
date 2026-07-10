"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Intro loader — shows once per hard load (the body starts with .loading).
 * When done it dispatches "zoenex:loaded" so page animations can begin,
 * mirroring the original finishLoad() flow.
 */
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const finished = useRef(false);

  useGSAP(
    () => {
      const loader = ref.current;
      if (!loader) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const finish = () => {
        if (finished.current) return;
        finished.current = true;
        loader.classList.add("done");
        document.body.classList.remove("loading");
        setTimeout(() => {
          loader.style.display = "none";
          window.dispatchEvent(new Event("zoenex:loaded"));
        }, 900);
      };

      if (reduce) {
        loader.style.display = "none";
        document.body.classList.remove("loading");
        window.dispatchEvent(new Event("zoenex:loaded"));
        return;
      }

      const count = { v: 0 };
      const cEl = loader.querySelector(".loader-count");
      gsap.set(".loader-word span", { yPercent: 110 });
      gsap.to(".loader-word span", { yPercent: 0, duration: 0.7, stagger: 0.06, ease: "power3.out", delay: 0.1 });
      gsap.to(".loader-bar i", { scaleX: 1, duration: 1.5, ease: "power2.inOut", delay: 0.2 });
      gsap.to(count, {
        v: 100,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0.2,
        onUpdate() {
          if (cEl) cEl.textContent = String(Math.round(count.v)).padStart(2, "0");
        },
        onComplete: finish,
      });
      const hardFallback = setTimeout(finish, 3200); // hard fallback
      return () => clearTimeout(hardFallback);
    },
    { scope: ref }
  );

  return (
    <div className="loader" ref={ref} aria-hidden="true">
      <div className="loader-word">
        <span>Z</span>
        <span>O</span>
        <span>E</span>
        <span>N</span>
        <span>E</span>
        <span>X</span>
      </div>
      <div className="loader-bar">
        <i />
      </div>
      <div className="loader-count">00</div>
    </div>
  );
}
