"use client";

import Link from "next/link";
import { useRef } from "react";
import { useViewAnimations } from "@/lib/useViewAnimations";
import BigCta from "../BigCta";

type Project = {
  span: string;
  cats: string[];
  label: string;
  title: string;
  cat: string;
  body: string;
  res: string;
  img: string;
  alt: string;
  demo: string;
};

const PROJECTS: Project[] = [
  {
    span: "s12",
    cats: ["web"],
    label: "Web Design & Development",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80",
    alt: "Licosash - Influencer Marketing Agency and Influencer Desk website",
    demo: "https://licosash.com",
    title: "LICOSASH — Influencer Desk",
    cat: "Influencer Marketing · 2026",
    body: "A conversion-focused, high-performance website built for Licosash, a premium celebrity and influencer marketing agency, streamlining campaign inquiries and talent onboarding.",
    res: "Live site — click to explore",
  },
  {
    span: "s7",
    cats: ["web"],
    label: "Web Design & Development",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    alt: "Aerum - Luxury modular housing and architecture website",
    demo: "/demos/aerum/index.html",
    title: "AERUM — Modular Real Estate",
    cat: "Web Design · 2026",
    body: "An interactive, scroll-driven showcase for a modular housing manufacturer. Smooth transitions, responsive grids, and clean typographic details.",
    res: "Live design — click to explore",
  },
  {
    span: "s5",
    cats: ["web"],
    label: "Web Design & Development",
    img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1600&q=80",
    alt: "Dinerly - Fine-casual restaurant website with interactive menu",
    demo: "/demos/dinerly/index.html",
    title: "DINERLY — Fine-Casual Dining",
    cat: "Web Design · 2026",
    body: "A sophisticated restaurant website featuring menu categorization, clean dark-mode visuals, responsive grid layouts, and reservation forms.",
    res: "Live design — click to explore",
  },
  {
    span: "s6",
    cats: ["web"],
    label: "Web Design & Development",
    img: "/demos/astronomia/astronomia_sky.png",
    alt: "Astronomia - Luxury single-page watch website showcasing interactive gravity-tourbillon motion design",
    demo: "https://astronomia-navy.vercel.app",
    title: "ASTRONOMIA — Luxury Horology",
    cat: "Web / Scroll · 2026",
    body: "An immersive digital exhibition for a high-end watchmaker. Includes dynamic tourbillon rotations, interactive technical specs, and a premium catalog.",
    res: "Live site — click to explore",
  },
  {
    span: "s6",
    cats: ["web"],
    label: "Web Design & Development",
    img: "/demos/dental/hero.jpg",
    alt: "Dental - Clean modern dental clinic landing page with online appointment booking form",
    demo: "/demos/dental/index.html",
    title: "Dental — Modern Dentistry",
    cat: "Web Design · 2026",
    body: "A clean, modern dental clinic landing page featuring service pills, doctor cards, patient testimonials, a latest articles grid, and an appointment booking form.",
    res: "Live design — click to explore",
  },
];

export default function WorkView() {
  const ref = useRef<HTMLDivElement>(null);
  useViewAnimations(ref);

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
            Selected website design and custom development projects by Zoenex Studios, each measured against real conversion and performance results.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="wgrid">
            {PROJECTS.map((p) => {
              const cls = `wcard ${p.span} rv`;
              return (
                <a className={cls} href={p.demo} target="_blank" rel="noopener noreferrer" key={p.title}>
                  <div className="wthumb">
                    <span className="art-label">{p.label}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="wshot" src={p.img} alt={p.alt || p.title} loading="lazy" />
                  </div>
                  <div className="wmeta">
                    <div className="top">
                      <h3>{p.title}</h3>
                      <span className="cat">{p.cat}</span>
                    </div>
                    <p>{p.body}</p>
                    <span className="wres">{p.res}</span>
                  </div>
                </a>
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
        lede="Bring us the problem — we'll tell you honestly whether automation or a rebuild moves it most."
        cta="Book a 20-min call"
        reassure={["Async-friendly across time zones", "Fixed quotes, no surprises", "NDA on request", "Reply within 1 business day"]}
      />
    </div>
  );
}
