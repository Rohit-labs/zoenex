"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";
import { initMagnetic } from "./magnetic";

type Options = {
  /** the view contains the home hero (headline line reveal) */
  hero?: boolean;
};

/**
 * Per-view motion — direct port of the original site's initView():
 * .rv reveals, counters, capability rows, process timeline, CTA parallax
 * and work-thumb clip reveals, all scoped to the view root.
 *
 * On the first (hard) load everything waits for the loader to finish,
 * exactly like the original.
 */
export function useViewAnimations(rootRef: RefObject<HTMLElement | null>, opts: Options = {}) {
  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      if (!root) return;

      const cleanups: Array<() => void> = [];
      cleanups.push(initMagnetic(root));

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) {
        const run = contextSafe!((afterLoader: boolean) => runViewMotion(root, opts, afterLoader));
        if (document.body.classList.contains("loading")) {
          // hard load: animations start once the loader has swept away
          const onLoaded = () => run(true);
          window.addEventListener("zoenex:loaded", onLoaded, { once: true });
          cleanups.push(() => window.removeEventListener("zoenex:loaded", onLoaded));
        } else {
          run(false);
        }
      }

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: rootRef }
  );
}

function runViewMotion(root: HTMLElement, opts: Options, afterLoader: boolean) {
  /* hero headline line reveal (home only) */
  if (opts.hero) {
    const lines = root.querySelectorAll("#heroTitle .line-inner");
    if (lines.length) {
      gsap.fromTo(
        lines,
        { yPercent: 112 },
        { yPercent: 0, duration: 1.15, stagger: 0.09, ease: "power4.out", delay: afterLoader ? 0.05 : 0.1 }
      );
    }
  }

  /* .rv reveals: elements already in view animate now, the rest on scroll */
  const rvs = Array.from(root.querySelectorAll<HTMLElement>(".rv"));
  const above: HTMLElement[] = [];
  const below: HTMLElement[] = [];
  rvs.forEach((el) => {
    (el.getBoundingClientRect().top < window.innerHeight * 0.92 ? above : below).push(el);
  });
  if (above.length) {
    gsap.from(above, {
      y: 36,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.08,
      clearProps: "transform,opacity,visibility",
      delay: afterLoader ? 0.15 : 0,
    });
  }
  if (below.length) {
    gsap.set(below, { y: 44, autoAlpha: 0 });
    ScrollTrigger.batch(below, {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.95, stagger: 0.09, overwrite: true, clearProps: "transform" });
      },
    });
  }

  /* counters */
  root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const target = parseInt(el.getAttribute("data-count") || "0", 10);
    const suf = el.getAttribute("data-suffix") || "";
    const o = { v: 0 };
    gsap.to(o, {
      v: target,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate() {
        el.textContent = Math.round(o.v).toLocaleString("en-IN") + suf;
      },
    });
  });

  // Keep hero art stationary; no scroll-linked drift/fade.

  /* choreographed entrance for each capability row */
  root.querySelectorAll(".svc").forEach((row) => {
    const h = row.querySelector("h3");
    const code = row.querySelector(".svc-code");
    const body = row.querySelector(".svc-body");
    const tags = row.querySelectorAll(".svc-tags li");
    const sig = row.querySelector(".svc-sig");
    const go = row.querySelector(".svc-go");
    if (!h) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 82%", once: true } });
    tl.from(h, { yPercent: 60, autoAlpha: 0, duration: 0.8, ease: "power4.out" })
      .from(code, { x: -14, autoAlpha: 0, duration: 0.5 }, "-=.55")
      .from(body, { y: 16, autoAlpha: 0, duration: 0.6 }, "-=.45");
    if (tags.length) tl.from(tags, { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.05 }, "-=.4");
    const extras = [sig, go].filter(Boolean);
    if (extras.length) tl.from(extras, { autoAlpha: 0, scale: 0.8, duration: 0.5, stagger: 0.08, ease: "back.out(1.7)" }, "-=.5");
  });

  /* process: spine fills on scroll, steps slide in and light their node */
  const timeline = root.querySelector("#timeline");
  if (timeline) {
    const fill = timeline.querySelector("#tlFill");
    if (fill) {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: timeline, start: "top 62%", end: "bottom 72%", scrub: 0.4 } }
      );
    }
    timeline.querySelectorAll(".tl-step").forEach((st) => {
      const card = st.querySelector(".tl-card");
      if (!card) return;
      const fromX = st.classList.contains("left") ? 40 : -40;
      gsap.set(card, { autoAlpha: 0, x: fromX });
      ScrollTrigger.create({
        trigger: st,
        start: "top 74%",
        once: true,
        onEnter() {
          st.classList.add("lit");
          gsap.to(card, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out" });
        },
      });
    });
  }

  /* CTA glow: gentle scroll parallax for ambient depth */
  root.querySelectorAll(".bigcta").forEach((cta) => {
    const glow = cta.querySelector(".bigcta-glow");
    if (glow) {
      gsap.to(glow, { yPercent: -14, ease: "none", scrollTrigger: { trigger: cta, start: "top bottom", end: "bottom top", scrub: 0.8 } });
    }
    const ghost = cta.querySelector(".bigcta-ghost");
    if (ghost) {
      gsap.to(ghost, { yPercent: 8, ease: "none", scrollTrigger: { trigger: cta, start: "top bottom", end: "bottom top", scrub: 1 } });
    }
  });

  /* clip-path reveal for work-card thumbnails */
  root.querySelectorAll(".wthumb .art").forEach((el) => {
    gsap.set(el, { clipPath: "inset(0 0 100% 0)" });
    gsap.to(el, {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });

  ScrollTrigger.refresh();
}
