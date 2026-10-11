"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Intro loader — shows once per hard load (the body starts with .loading).
 * The Zoenex mark floats on a white 3D stage (the artwork's own background,
 * so the image reads as free-floating) among faceted shards that echo the
 * butterfly's geometry. When done it dispatches "zoenex:loaded" so page
 * animations can begin, mirroring the original finishLoad() flow.
 */

/* facet shards drifting behind/around the mark — kept clear of the centre */
const SHARDS: {
  left: string;
  top: string;
  size: number;
  z: number;
  clip: string;
  color: string;
  opacity: number;
  rotate: number;
}[] = [
  { left: "12%", top: "18%", size: 84, z: -260, clip: "polygon(50% 0,100% 100%,0 100%)", color: "#1F3BEA", opacity: 0.09, rotate: -14 },
  { left: "83%", top: "14%", size: 56, z: -140, clip: "polygon(0 0,100% 30%,22% 100%)", color: "#141311", opacity: 0.08, rotate: 18 },
  { left: "7%", top: "68%", size: 44, z: -80, clip: "polygon(50% 0,100% 50%,50% 100%,0 50%)", color: "#1226A8", opacity: 0.12, rotate: 8 },
  { left: "88%", top: "66%", size: 96, z: -320, clip: "polygon(50% 0,100% 100%,0 100%)", color: "#1F3BEA", opacity: 0.07, rotate: 32 },
  { left: "22%", top: "86%", size: 34, z: 60, clip: "polygon(0 0,100% 30%,22% 100%)", color: "#1F3BEA", opacity: 0.14, rotate: -26 },
  { left: "72%", top: "88%", size: 48, z: -40, clip: "polygon(50% 0,100% 50%,50% 100%,0 50%)", color: "#141311", opacity: 0.06, rotate: 12 },
  { left: "30%", top: "8%", size: 30, z: 100, clip: "polygon(50% 0,100% 50%,50% 100%,0 50%)", color: "#1226A8", opacity: 0.13, rotate: 40 },
  { left: "66%", top: "5%", size: 40, z: -180, clip: "polygon(50% 0,100% 100%,0 100%)", color: "#141311", opacity: 0.07, rotate: -8 },
];

export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const finished = useRef(false);

  useGSAP(
    () => {
      const loader = ref.current;
      if (!loader) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const hide = () => {
        loader.style.display = "none";
        document.body.classList.remove("loading");
        window.dispatchEvent(new Event("zoenex:loaded"));
      };

      if (reduce) {
        hide();
        return;
      }

      /* Single-run check: bypass loader on repeat page visits within same session */
      if (typeof window !== "undefined" && window.sessionStorage?.getItem("zoenex_loader_shown")) {
        hide();
        return;
      }
      if (typeof window !== "undefined") {
        window.sessionStorage?.setItem("zoenex_loader_shown", "1");
      }

      const logo = loader.querySelector<HTMLElement>(".loader-logo");
      const shadow = loader.querySelector<HTMLElement>(".loader-shadow");
      const tilt = loader.querySelector<HTMLElement>(".loader-tilt");
      const shards = gsap.utils.toArray<HTMLElement>(".loader-shard", loader);
      const cEl = loader.querySelector(".loader-count");

      /* idle float — started once the entrance lands, killed on exit */
      const idle = gsap.timeline({ paused: true, repeat: -1, yoyo: true, defaults: { duration: 1.6, ease: "sine.inOut" } });
      idle
        .to(logo, { rotationY: 8, rotationX: -5, y: -12 }, 0)
        .to(shadow, { scaleX: 0.86, opacity: 0.55 }, 0);

      const finish = () => {
        if (finished.current) return;
        finished.current = true;
        idle.kill();
        /* the intro may still be mid-flight (e.g. throttled background tab) —
           the exit must own these properties outright */
        gsap.killTweensOf([logo, shadow, ...shards, count, ".loader-bar i"]);
        document.body.classList.remove("loading");
        gsap
          .timeline({
            onComplete: () => {
              loader.style.display = "none";
              window.dispatchEvent(new Event("zoenex:loaded"));
            },
          })
          .to(shards, { autoAlpha: 0, z: "-=180", duration: 0.25, ease: "power2.in", stagger: 0.01 }, 0)
          .to(shadow, { opacity: 0, duration: 0.2 }, 0)
          /* the mark flies past the camera */
          .to(logo, { z: 500, rotationY: -12, duration: 0.35, ease: "power3.in" }, 0)
          .to(logo, { autoAlpha: 0, duration: 0.2, ease: "power1.in" }, 0.2)
          .to(loader, { autoAlpha: 0, duration: 0.3, ease: "power2.inOut" }, 0.2);
      };

      /* entrance */
      gsap.set(logo, { z: -400, rotationY: -45, rotationX: 12, autoAlpha: 0, transformPerspective: 1200 });
      gsap.set(shadow, { opacity: 0, scaleX: 1.2 });
      shards.forEach((s) => gsap.set(s, { z: Number(s.dataset.z), rotation: Number(s.dataset.r), autoAlpha: 0 }));

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(logo, { z: 0, rotationY: 0, rotationX: 0, autoAlpha: 1, duration: 0.35, delay: 0.05 })
        .to(shadow, { opacity: 0.85, scaleX: 1, duration: 0.3, ease: "power2.out" }, "<0.15")
        .to(shards, { autoAlpha: 1, duration: 0.3, stagger: 0.02, ease: "power2.out" }, "<-0.1")
        .add(() => idle.play(), ">-0.1");

      /* slow ambient drift per shard */
      shards.forEach((s, i) => {
        gsap.to(s, {
          y: i % 2 ? "+=16" : "-=12",
          rotation: `+=${i % 2 ? 8 : -6}`,
          duration: 2.5 + (i % 3),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });

      /* pointer parallax on the whole 3D group */
      const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3.out" });
      const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.8, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        ry(nx * 10);
        rx(ny * -8);
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      /* fast progress counter drives completion for optimal Core Web Vitals */
      const count = { v: 0 };
      gsap.to(".loader-bar i", { scaleX: 1, duration: 0.38, ease: "power2.out" });
      gsap.to(count, {
        v: 100,
        duration: 0.38,
        ease: "power2.out",
        onUpdate() {
          if (cEl) cEl.textContent = String(Math.round(count.v)).padStart(2, "0");
        },
        onComplete: finish,
      });

      const hardFallback = setTimeout(finish, 850); // fast fallback
      return () => {
        clearTimeout(hardFallback);
        window.removeEventListener("pointermove", onMove);
      };
    },
    { scope: ref }
  );

  return (
    <div className="loader" ref={ref} aria-hidden="true">
      <div className="loader-stage">
        <div className="loader-tilt">
          {SHARDS.map((s, i) => (
            <i
              key={i}
              className="loader-shard"
              data-z={s.z}
              data-r={s.rotate}
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                background: s.color,
                opacity: s.opacity,
                clipPath: s.clip,
              }}
            />
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="loader-logo" src="/zoenex-logo.jpg" alt="Zoenex Studios logo" width={1024} height={1024} fetchPriority="high" draggable={false} />
          <span className="loader-shadow" />
        </div>
      </div>
      <div className="loader-meta">
        <div className="loader-bar">
          <i />
        </div>
        <div className="loader-count">00</div>
      </div>
    </div>
  );
}
