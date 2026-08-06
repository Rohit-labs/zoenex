"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useViewAnimations } from "@/lib/useViewAnimations";
import BigCta from "../BigCta";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "automation", label: "AI Automation" },
  { key: "web", label: "Web" },
  { key: "motion", label: "Motion" },
];

type Project = {
  span: string;
  cats: string[];
  label: string;
  title: string;
  cat: string;
  body: string;
  res: string;
  art?: string;
  img?: string;
  video?: string;
  poster?: string;
  alt?: string;
  demo?: string;
};

const PROJECTS: Project[] = [
  {
    span: "s12",
    cats: ["web"],
    label: "Web Design",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    alt: "AERUM — panoramic modular real-estate website",
    demo: "/demos/aerum/index.html",
    title: "AERUM — Modular Real Estate",
    cat: "Web Design · 2026",
    body: "A turnkey site for a panoramic modular-home builder — cinematic hero carousel, a filterable model catalog, materials and build-process sections, an FAQ and a scheduling flow. Fully responsive and accessible.",
    res: "Live design — click to explore",
  },
  {
    span: "s6",
    cats: ["web"],
    label: "Web Design",
    img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1600&q=80",
    alt: "DINERLY — dark, appetite-driven restaurant website",
    demo: "/demos/dinerly/index.html",
    title: "DINERLY — Fine-Casual Dining",
    cat: "Restaurant · 2026",
    body: "A warm, appetite-driven restaurant site with a silent video hero, full-bleed food photography, a custom order cart, a validated reservation flow and a gallery lightbox — fully responsive.",
    res: "Live design — click to explore",
  },
  {
    span: "s6",
    cats: ["web", "motion"],
    label: "Web + Motion",
    img: "/demos/astronomia/astronomia_sky.png",
    alt: "ASTRONOMIA — luxury horology watch website",
    demo: "https://astronomia-navy.vercel.app",
    title: "ASTRONOMIA — Luxury Horology",
    cat: "Web / Scroll · 2026",
    body: "A cinematic single-page site for a gravitational-tourbillon timepiece — scroll-driven chapters, sculpted material stories, full technical spec tables and limited-edition collector storytelling.",
    res: "Live site — click to explore",
  },
  {
    span: "s7",
    cats: ["automation"],
    label: "AI Automation",
    art: "art-orbit",
    title: "Nordwind — Ops Copilot",
    cat: "AI Agent · 2026",
    body: "An internal agent that reads shipment queries, drafts replies in the company's tone, updates the CRM and escalates only the edge cases.",
    res: "62% faster response · 30 staff hours saved weekly",
  },
  {
    span: "s5",
    cats: ["web"],
    label: "Web Design",
    img: "/demos/dental/hero.jpg",
    alt: "DENTAL — modern dentistry with gentle care website",
    demo: "/demos/dental/index.html",
    title: "Dental — Modern Dentistry",
    cat: "Web Design · 2026",
    body: "A clean, modern dental clinic landing page featuring service pills, doctor cards, patient testimonials, a latest articles grid, and an appointment booking form.",
    res: "Live design — click to explore",
  },
  {
    span: "s5",
    cats: ["motion"],
    label: "Motion",
    art: "art-halftone",
    title: "Pulseloop — Launch Film",
    cat: "Brand Motion · 2025",
    body: "A 60-second launch film, 14 social cutdowns and an in-app motion kit for a fintech's public debut. Zero stock footage.",
    res: "2.1M organic views in launch week",
  },
  {
    span: "s7",
    cats: ["web", "automation"],
    label: "Web + AI",
    art: "art-grid3d",
    title: "Meridian Realty — Portal & Lead Bot",
    cat: "Web App · 2025",
    body: "A property portal with map search and an AI concierge that qualifies enquiries and books site visits into agents' calendars — around the clock.",
    res: "3× qualified leads · 41% of visits booked after hours",
  },
  {
    span: "s6",
    cats: ["motion"],
    label: "Motion",
    video: "/motion/aura-preview.mp4",
    poster: "/motion/aura-poster.jpg",
    alt: "AURA — cinematic running-shoe product film",
    demo: "/motion/aura.mp4",
    title: "AURA — Product Film",
    cat: "Product Motion · 2026",
    body: "A cinematic product reel for the AURA running shoe — dynamic reveals, particle and debris simulation and hero beauty shots, cut for vertical social.",
    res: "Live sample — click to watch",
  },
  {
    span: "s6",
    cats: ["automation"],
    label: "AI Automation",
    art: "art-contour",
    title: "Kalpa Finance — Report Engine",
    cat: "Workflow · 2025",
    body: "Month-end client reporting that took a team of four a full week — now generated, checked and delivered automatically from live data.",
    res: "Reporting cycle cut from 5 days to 4 hours",
  },
  {
    span: "s12",
    cats: ["motion", "web"],
    label: "Motion + Web",
    art: "art-bars",
    title: "Orbit Athletics — Season Campaign",
    cat: "3D / WebGL · 2025",
    body: "An interactive WebGL campaign site with 3D product spins, plus a broadcast package for stadium screens and social.",
    res: "4.2 min avg session · 96 Lighthouse with full 3D",
  },
];

export default function WorkView() {
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");
  const firstRender = useRef(true);
  useViewAnimations(ref);

  /* re-stagger visible cards whenever the filter changes */
  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      const root = ref.current;
      if (!root) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const vis = Array.from(root.querySelectorAll(".wcard:not(.hide)"));
      if (!reduce && vis.length) {
        gsap.fromTo(vis, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.06, ease: "power2.out", clearProps: "transform" });
      }
      ScrollTrigger.refresh();
    },
    { dependencies: [filter], scope: ref }
  );

  return (
    <div className="view active" ref={ref}>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow rv">Work index</span>
          <h1 className="h-mega rv" style={{ marginTop: "22px" }}>
            Selected
            <br />
            projects<em className="accent">.</em>
          </h1>
          <p className="lede rv">
            Automation systems, websites and films — each one measured against the number that mattered to the client.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="filter-bar rv" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`fbtn${filter === f.key ? " active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="wgrid">
            {PROJECTS.map((p) => {
              const show = filter === "all" || p.cats.includes(filter);
              const cls = `wcard ${p.span} rv${p.video ? " vcard" : ""}${show ? "" : " hide"}`;
              const inner = (
                <>
                  <div className="wthumb">
                    <span className="art-label">{p.label}</span>
                    {p.video ? (
                      <video
                        className="wshot"
                        poster={p.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={p.alt || p.title}
                      >
                        <source src={p.video} type="video/mp4" />
                      </video>
                    ) : p.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="wshot" src={p.img} alt={p.alt || p.title} loading="lazy" />
                    ) : (
                      <div className={`art ${p.art}`} />
                    )}
                  </div>
                  <div className="wmeta">
                    <div className="top">
                      <h3>{p.title}</h3>
                      <span className="cat">{p.cat}</span>
                    </div>
                    <p>{p.body}</p>
                    <span className="wres">{p.res}</span>
                  </div>
                </>
              );
              /* real client work links out to the live build; the rest invite a brief */
              return p.demo ? (
                <a className={cls} href={p.demo} target="_blank" rel="noopener noreferrer" key={p.title}>
                  {inner}
                </a>
              ) : (
                <Link className={cls} href="/contact" key={p.title}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <BigCta
        ghost="WORK"
        badge="Now taking new projects"
        titleTop="Your name"
        titleSwipe="goes here next."
        lede="Bring us the problem — we'll tell you honestly whether automation, a rebuild or motion moves it most."
        cta="Book a 20-min call"
        reassure={["Async-friendly across time zones", "Fixed quotes, no surprises", "NDA on request", "Reply within 1 business day"]}
      />
    </div>
  );
}
