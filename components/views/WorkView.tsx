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

const PROJECTS = [
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
    label: "Web",
    art: "art-eclipse",
    title: "Solstice Skincare",
    cat: "E-commerce · 2026",
    body: "Storefront rebuild with scroll-driven product storytelling, a custom bundle builder and a sub-second first load.",
    res: "+38% conversion · 0.8s LCP",
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
    cats: ["automation"],
    label: "AI Automation",
    art: "art-contour",
    title: "Kalpa Finance — Report Engine",
    cat: "Workflow · 2025",
    body: "Month-end client reporting that took a team of four a full week — now generated, checked and delivered automatically from live data.",
    res: "Reporting cycle cut from 5 days to 4 hours",
  },
  {
    span: "s6",
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
              return (
                <Link className={`wcard ${p.span} rv${show ? "" : " hide"}`} href="/contact" key={p.title}>
                  <div className="wthumb">
                    <span className="art-label">{p.label}</span>
                    <div className={`art ${p.art}`} />
                  </div>
                  <div className="wmeta">
                    <div className="top">
                      <h3>{p.title}</h3>
                      <span className="cat">{p.cat}</span>
                    </div>
                    <p>{p.body}</p>
                    <span className="wres">{p.res}</span>
                  </div>
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
        cta="Start a project"
      />
    </div>
  );
}
