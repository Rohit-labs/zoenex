"use client";

import Link from "next/link";
import { useRef } from "react";
import { useViewAnimations } from "@/lib/useViewAnimations";
import BigCta from "../BigCta";
import { ArrowRight } from "../icons";

const OFFERS = [
  {
    art: "art-bars",
    label: "01 — Marketing sites",
    title: "Marketing sites",
    cat: "Brand-first",
    body: "Sub-second loads and scroll storytelling that turns visitors into enquiries.",
  },
  {
    art: "art-grid3d",
    label: "02 — Apps & commerce",
    title: "Web apps & e-commerce",
    cat: "Product-grade",
    body: "Portals, dashboards and storefronts with the UX of a product and the polish of a campaign.",
  },
  {
    art: "art-eclipse",
    label: "03 — Systems & SEO",
    title: "Design systems & SEO",
    cat: "Built to last",
    body: "Tokens, components and technical SEO that keep every future page fast, consistent and findable.",
  },
];

const PHASES = [
  {
    n: "01",
    tag: "Phase 01",
    title: "Discovery & strategy",
    body: "Goals, audience and content mapped in a working session. You leave with a sitemap, KPIs, a fixed quote and a launch date.",
  },
  {
    n: "02",
    tag: "Phase 02",
    title: "Design in the browser",
    body: "Wireframes become hi-fi designs and motion prototypes you can click — you review the real thing, never a static deck.",
  },
  {
    n: "03",
    tag: "Phase 03",
    title: "Performance-budget build",
    body: "Modern stack, CMS wired in, every page held to a strict performance budget. If it can't load fast, it doesn't ship.",
  },
  {
    n: "04",
    tag: "Phase 04",
    title: "QA & launch",
    body: "Device-lab testing, accessibility passes, SEO and analytics wired before cutover. Launch day is boring — by design.",
  },
  {
    n: "05",
    tag: "Phase 05",
    title: "Grow & iterate",
    body: "Post-launch we watch the numbers, run CRO experiments and iterate quarterly against the KPI we agreed on day one.",
  },
];

const METRICS = [
  { count: 98, suffix: "%", label: "Average Lighthouse performance score" },
  { count: 38, suffix: "%", label: "Conversion lift on the Solstice rebuild" },
  { count: 3, suffix: "×", label: "Qualified-lead multiple on the Meridian portal" },
  { count: 0, label: "Templates used — every build is custom" },
];

export default function WebsitesServiceView() {
  const ref = useRef<HTMLDivElement>(null);
  useViewAnimations(ref);

  return (
    <div className="view active" ref={ref}>
      <section className="page-hero">
        <div className="wrap shero-grid">
          <div>
            <span className="eyebrow rv">Websites & Product</span>
            <h1 className="h-mega rv">
              Sites built
              <br />
              to convert
              <em className="accent">.</em>
            </h1>
            <p className="lede rv">
              Fast, conversion-focused marketing sites and web apps — designed end to end, built on modern stacks and measured
              against real business goals.
            </p>
            <div className="hero-cta rv" style={{ justifyContent: "flex-start", marginTop: "38px" }}>
              <Link href="/contact" className="btn btn-fill" data-magnetic>
                Start a web project
                <ArrowRight />
              </Link>
              <Link href="/#services" className="btn btn-line" data-magnetic>
                View services
              </Link>
            </div>
          </div>
          <div className="webframe rv" aria-hidden="true">
            <div className="wf-bar">
              <i />
              <i />
              <i />
              <span className="wf-url">yourbrand.com — 0.8s LCP</span>
            </div>
            <div className="wf-page">
              <span className="wf-hl" />
              <span className="wf-tx" />
              <span className="wf-tx short" />
              <span className="wf-cta" />
              <div className="wf-grid">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">What we build</span>
            <div className="row">
              <h2 className="h-xl rv">
                Every pixel
                <br />
                earns its keep.
              </h2>
              <p className="lede rv" style={{ maxWidth: "40ch" }}>
                Design that carries your brand, engineering that carries your numbers — the same team owns both from day one.
              </p>
            </div>
          </div>
          <div className="wgrid">
            {OFFERS.map((o) => (
              <article className="wcard s4 rv" key={o.title}>
                <div className="wthumb">
                  <span className="art-label">{o.label}</span>
                  <div className={`art ${o.art}`} />
                </div>
                <div className="wmeta">
                  <div className="top">
                    <h3>{o.title}</h3>
                    <span className="cat">{o.cat}</span>
                  </div>
                  <p>{o.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">The WEB workflow</span>
            <h2 className="h-xl rv">
              Brief to
              <br />
              launch day.
            </h2>
          </div>
          {PHASES.map((p) => (
            <div className="edstep rv" key={p.n}>
              <span className="n" aria-hidden="true">
                {p.n}
              </span>
              <div>
                <span className="tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </div>
          ))}

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
            <Link href="/services/motion-design" className="btn btn-line" data-magnetic>
              Motion Design
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <BigCta
        ghost="WEBSITE"
        badge="Open for new projects"
        titleTop="Your site should"
        titleSwipe="work harder."
        lede="Bring the brief — or just the problem. We'll scope it honestly and give you a fixed quote within days, not weeks."
        cta="Let's talk"
      />
    </div>
  );
}
