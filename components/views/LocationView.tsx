"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useViewAnimations } from "@/lib/useViewAnimations";
import BigCta from "../BigCta";
import { ArrowRight } from "../icons";
import { trackEvent } from "@/lib/analytics";
import type { LocationData } from "@/lib/locations-data";
import { LOCATIONS } from "@/lib/locations-data";

interface Props {
  location: LocationData;
}

const FEATURED_BUILDS = [
  {
    span: "s12",
    label: "Web Design & Development",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80",
    alt: "Licosash - Influencer Marketing Agency website",
    demo: "https://licosash.com",
    title: "LICOSASH — Influencer Desk",
    cat: "Influencer Marketing · 2026",
    body: "A conversion-focused, high-performance website built for Licosash, streamlining campaign inquiries and talent onboarding.",
    res: "Live site — click to explore",
  },
  {
    span: "s6",
    label: "Web Design & Development",
    img: "/demos/astronomia/astronomia_sky.png",
    alt: "Astronomia - Luxury single-page watch website",
    demo: "/demos/astronomia/index.html",
    title: "ASTRONOMIA — Luxury Horology",
    cat: "Web / Scroll · 2026",
    body: "An immersive digital exhibition for a high-end watchmaker with dynamic tourbillon motion design and interactive technical specs.",
    res: "Live design — click to explore",
  },
  {
    span: "s6",
    label: "Web Design & Development",
    img: "/demos/aerum/assets/hero-bg.jpg",
    alt: "Aerum - Luxury modular architecture website",
    demo: "/demos/aerum/index.html",
    title: "AERUM — Modular Real Estate",
    cat: "Web Design · 2026",
    body: "An interactive, scroll-driven showcase for a modular housing manufacturer with smooth transitions and clean typographic details.",
    res: "Live design — click to explore",
  },
];

const WORKFLOW = [
  {
    n: "01",
    tag: "Step 01",
    title: "Discovery & Strategy",
    body: "We map your commercial goals, target audience, technical needs, and operational bottlenecks. You receive a fixed-scope roadmap and quote.",
  },
  {
    n: "02",
    tag: "Step 02",
    title: "Design in the Browser",
    body: "Interactive motion prototypes and responsive designs you can test live on your phone and laptop — no static mockup decks.",
  },
  {
    n: "03",
    tag: "Step 03",
    title: "Performance-Budget Build",
    body: "Engineered in Next.js 15, TypeScript, and modern CSS. Every page is held to sub-second load times and 95+ Core Web Vitals.",
  },
  {
    n: "04",
    tag: "Step 04",
    title: "AI Automation & Launch",
    body: "We wire CRM sync, lead notifications, analytics, and custom AI helpers before cutover so your website immediately generates results.",
  },
];

export default function LocationView({ location }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useViewAnimations(ref);

  const otherLocations = LOCATIONS.filter((l) => l.slug !== location.slug);

  return (
    <div className="view active" ref={ref}>
      {/* Location Hero */}
      <section className="page-hero">
        <div className="wrap shero-grid">
          <div>
            <span className="eyebrow rv">{location.heroTag}</span>
            <h1
              className="h-mega rv"
              style={{ marginTop: "22px" }}
              aria-label={`${location.heroHeadline} ${location.heroHighlight}`}
            >
              {location.heroHeadline}
              <br />
              <span className="accent">{location.heroHighlight}</span>
              <em className="accent">.</em>
            </h1>
            <p className="lede rv">{location.heroDescription}</p>

            <div
              className="hero-cta rv"
              style={{ justifyContent: "flex-start", marginTop: "38px" }}
            >
              <Link
                href="/audit"
                className="btn btn-fill"
                data-magnetic
                onClick={() =>
                  trackEvent("audit_cta_click", { location: `location_hero_${location.slug}` })
                }
              >
                Book an Audit for {location.name}
                <ArrowRight />
              </Link>
              <Link href="/services/websites" className="btn btn-line" data-magnetic>
                Explore all work
              </Link>
            </div>

            <div className="hero-meta rv" style={{ marginTop: "28px" }}>
              <span className="mono-tag">{location.timezone}</span>
              <span className="mono-tag">{location.deliveryGuarantee}</span>
            </div>
          </div>

          {/* Terminal / Browser Visual */}
          <div className="webframe rv" aria-hidden="true">
            <div className="wf-bar">
              <i />
              <i />
              <i />
              <span className="wf-url">zoenex.studio/{location.slug} — 0.7s LCP</span>
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

      {/* Proof Strip */}
      <section className="proofstrip">
        <div className="wrap proofstrip-inner">
          <span className="proof-label rv">
            Serving clients in <b>{location.name} · US · UK · UAE · India</b>
          </span>
          <ul className="proof-tools rv" aria-label="Technology stack">
            <li>Next.js 15</li>
            <li>React</li>
            <li>TypeScript</li>
            <li>n8n / AI</li>
            <li>Core Web Vitals 98+</li>
          </ul>
        </div>
      </section>

      {/* Why Choose Us for Location */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">Local Advantage · {location.name}</span>
            <div className="row">
              <h2
                className="h-xl rv"
                aria-label={`Why businesses in ${location.name} choose Zoenex Studios`}
              >
                Engineered for<br />
                {location.name} brands.
              </h2>
              <p className="lede rv" style={{ maxWidth: "42ch" }}>
                {location.marketContext}
              </p>
            </div>
          </div>

          <div className="stake-grid">
            {location.whyChooseUs.map((item, idx) => (
              <article key={idx} className="stake rv">
                <span className="stake-ix">0{idx + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Live Projects */}
      <section className="sec on-night" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">Selected Builds</span>
            <div className="row">
              <h2 className="h-xl rv" aria-label="Web Development Portfolio & Live Client Builds">
                Proof,<br />
                not promises.
              </h2>
              <Link href="/services/websites" className="btn btn-line rv" data-magnetic>
                View full portfolio
                <ArrowRight />
              </Link>
            </div>
          </div>

          <div className="wgrid">
            {FEATURED_BUILDS.map((proj, idx) => (
              <a
                key={idx}
                className={`wcard ${proj.span} rv`}
                href={proj.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="wthumb">
                  <span className="art-label">{proj.label}</span>
                  <Image
                    src={proj.img}
                    alt={proj.alt}
                    fill
                    sizes="(max-width: 820px) 100vw, 50vw"
                    className="wshot"
                  />
                </div>
                <div className="wmeta">
                  <div className="top">
                    <h3>{proj.title}</h3>
                    <span className="cat">{proj.cat}</span>
                  </div>
                  <p>{proj.body}</p>
                  <span className="wres">{proj.res}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">Execution Process</span>
            <h2 className="h-xl rv">
              From brief<br />
              to launch day.
            </h2>
          </div>

          {WORKFLOW.map((step) => (
            <div key={step.n} className="edstep rv">
              <span className="n" aria-hidden="true">
                {step.n}
              </span>
              <div>
                <span className="tag">{step.tag}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}

          <div className="metrics" style={{ marginTop: "clamp(60px, 8vw, 100px)" }}>
            <div className="metric rv">
              <b data-count="98" data-suffix="%">
                0
              </b>
              <span>Average Lighthouse performance score</span>
            </div>
            <div className="metric rv">
              <b data-count="12000" data-suffix="+">
                0
              </b>
              <span>Hours of manual ops automated</span>
            </div>
            <div className="metric rv">
              <b data-count="40">0</b>
              <span>Projects shipped worldwide</span>
            </div>
            <div className="metric rv">
              <b data-count="1" data-suffix=" day">
                0
              </b>
              <span>Average response and turnaround time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Other Target Locations Strip */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">Global & Regional Coverage</span>
            <h2 className="h-xl rv">
              Other regions<br />
              we serve.
            </h2>
            <p className="lede rv" style={{ maxWidth: "45ch" }}>
              Explore our dedicated engineering and delivery hubs across India and international commercial capitals.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "32px" }}>
            {otherLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="btn btn-line rv"
                style={{ fontSize: "0.88rem", padding: "10px 18px" }}
              >
                Web Developers in {loc.name}
                <span style={{ opacity: 0.6, fontSize: "0.8rem", marginLeft: "6px" }}>
                  ({loc.country})
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <BigCta
        ghost={location.slug.toUpperCase().slice(0, 3)}
        badge={`Open for ${location.name} Projects — Q4 2026`}
        titleTop="Ready to scale in"
        titleSwipe={`${location.name}?`}
        lede="Tell us what you're building. We'll audit your current digital bottlenecks and deliver a fixed quote within one business day."
        cta="Book an Audit"
        href="/audit"
        reassure={[
          "Sub-second speed review",
          "Fixed milestone quote",
          "NDA on request",
          "Reply within 1 business day",
        ]}
      />
    </div>
  );
}
