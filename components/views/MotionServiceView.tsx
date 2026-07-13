"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useViewAnimations } from "@/lib/useViewAnimations";
import BigCta from "../BigCta";
import { ArrowRight } from "../icons";

const POSTERS = [
  {
    art: "art-halftone",
    num: "R–01",
    cat: "Reel 01 — Hero films",
    title: "Brand & launch films",
    body: "Cinematic hero films that make a product feel inevitable — zero stock footage, ever.",
  },
  {
    art: "art-orbit",
    num: "R–02",
    cat: "Reel 02 — Explainers",
    title: "Product explainers",
    body: "Sixty seconds that do what a thousand-word landing page can't: make people get it instantly.",
  },
  {
    art: "art-eclipse",
    num: "R–03",
    cat: "Reel 03 — Motion systems",
    title: "UI motion, 3D & social",
    body: "Interface animation, WebGL moments and cutdown kits sized for every feed your audience lives in.",
  },
];

const SCENES = [
  {
    scene: "Scene 01",
    title: "Script & concept",
    body: "Message, tone and references locked before a single frame moves. You sign off the script, so there are no surprises at the end.",
  },
  {
    scene: "Scene 02",
    title: "Styleframes & boards",
    body: "We design still frames of the key beats first. You approve exactly how the film will look before animation begins.",
  },
  {
    scene: "Scene 03",
    title: "Animation & production",
    body: "Design, animation, 3D — produced in weekly cuts you can react to while direction is still cheap to change.",
  },
  {
    scene: "Scene 04",
    title: "Sound & polish",
    body: "Music, sound design, mix and grade. The last 10% is where a good film becomes the one people send to each other.",
  },
  {
    scene: "Scene 05",
    title: "Delivery & cutdowns",
    body: "Masters in every format, social cutdowns for each platform, and a motion kit your team can reuse long after launch.",
  },
];

const METRICS = [
  { count: 60, suffix: "+", label: "Films and explainers delivered" },
  { count: 14, label: "Social cutdowns shipped per launch film" },
  { count: 78, suffix: "%", label: "Average watch-through on client films" },
  { count: 0, label: "Frames of stock footage in any film we've shipped" },
];

export default function MotionServiceView() {
  const ref = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  useViewAnimations(ref);

  /* filmstrip: pin the strip and let vertical scroll play the reel.
     Touch widths keep native swipe; reduced-motion keeps plain overflow. */
  useGSAP(
    () => {
      const strip = stripRef.current;
      const frames = strip?.querySelector<HTMLElement>(".frames");
      if (!strip || !frames) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
        const dist = () => Math.max(0, frames.scrollWidth - strip.clientWidth);
        if (!dist()) return;
        strip.classList.add("pinned");
        gsap.to(frames, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: strip,
            pin: true,
            start: "center center",
            end: () => "+=" + dist(),
            scrub: 0.5,
            snap: { snapTo: 1 / (SCENES.length - 1), duration: { min: 0.2, max: 0.5 }, ease: "power1.inOut" },
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        return () => {
          strip.classList.remove("pinned");
          gsap.set(frames, { clearProps: "transform" });
        };
      });
    },
    { scope: ref }
  );

  return (
    <div className="view active" ref={ref}>
      <section className="page-hero on-night mtn-hero">
        <div className="wrap">
          <span className="eyebrow rv">Service 03 — ZNX/MTN</span>
          <h1 className="h-mega rv" style={{ marginTop: "22px" }}>
            Motion that
            <br />
            <span className="stroke-night">stops the scroll</span>
            <em className="accent">.</em>
          </h1>
          <p className="lede rv">
            Brand films, product explainers, UI motion and social-first video that give your product the launch it deserves — and
            keep it moving after.
          </p>
          <ul className="svc-tags rv" style={{ marginTop: "30px" }}>
            {["Brand films", "Explainers", "UI motion", "3D & WebGL", "Social video"].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="hero-cta rv" style={{ marginTop: "38px" }}>
            <Link href="/contact" className="btn btn-fill" data-magnetic>
              Start a motion project
              <ArrowRight />
            </Link>
            <Link href="/work" className="btn btn-line" data-magnetic>
              View work
            </Link>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">What we make</span>
            <div className="row">
              <h2 className="h-xl rv">
                Frames people
                <br />
                send each other.
              </h2>
              <p className="lede rv" style={{ maxWidth: "40ch" }}>
                Every film is built from scratch for the brand it carries — no stock footage, no template packs, no shortcuts.
              </p>
            </div>
          </div>
          <div className="pgrid">
            {POSTERS.map((p) => (
              <article className="scard rv" key={p.num}>
                <div className={`art ${p.art}`} />
                <span className="scard-frame" />
                <span className="scard-num">{p.num}</span>
                <div className="scard-meta">
                  <span className="scard-cat">{p.cat}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">The MTN workflow</span>
            <div className="row">
              <h2 className="h-xl rv">
                Script to
                <br />
                screen.
              </h2>
              <p className="lede rv" style={{ maxWidth: "40ch" }}>
                Five scenes, in order. You approve the look before we animate, so the final cut is never a surprise.
              </p>
            </div>
          </div>
          <div className="filmstrip rv" ref={stripRef}>
            <div className="frames">
              {SCENES.map((s) => (
                <div className="frame" key={s.scene}>
                  <span className="scene">{s.scene}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="strip-hint rv">
            <span className="mono-tag hint-pin">Keep scrolling — the reel plays itself</span>
            <span className="mono-tag hint-swipe">Swipe through the process →</span>
          </div>

          <div className="metrics" style={{ marginTop: "clamp(70px,9vw,120px)" }}>
            {METRICS.map((m) => (
              <div className="metric rv" key={m.label}>
                <b data-count={m.count} data-suffix={m.suffix}>
                  0
                </b>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
          <div className="pairs rv">
            <span className="mono-tag">Pairs well with —</span>
            <Link href="/services/ai-automation" className="btn btn-line" data-magnetic>
              AI Automation
              <ArrowRight />
            </Link>
            <Link href="/services/websites" className="btn btn-line" data-magnetic>
              Websites &amp; Product
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <BigCta
        ghost="MTN"
        badge="Production slots open — Q3 2026"
        titleTop="Make them"
        titleSwipe="hit replay."
        lede="Tell us what you're launching. We'll pitch a concept and a fixed production quote within a week."
        cta="Start a motion project"
      />
    </div>
  );
}
