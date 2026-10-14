"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useViewAnimations } from "@/lib/useViewAnimations";
import BigCta from "../BigCta";
import { ArrowRight } from "../icons";
import { trackEvent } from "@/lib/analytics";

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
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
    alt: "Vibrant Academy - Premier coaching and academic institute website",
    demo: "https://vibrant-academy.in",
    title: "VIBRANT ACADEMY — Education & Admissions",
    cat: "Education · 2026",
    body: "A modern, high-conversion educational platform and student onboarding portal for Vibrant Academy, featuring structured academic programs, admission workflows, and rapid page load speeds.",
    res: "Live site — click to explore",
  },
  {
    span: "s5",
    cats: ["web"],
    label: "Web Design & Development",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    alt: "Dr Jha Physio - Healthcare and physiotherapy clinic website",
    demo: "https://drjhaphysio.in",
    title: "DR. JHA PHYSIO — Healthcare & Clinic",
    cat: "Healthcare · 2026",
    body: "A clean, patient-centric clinic website and consultation appointment system for Dr. Jha Physiotherapy Clinic, optimized for local search visibility and streamlined patient inquiries.",
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
    demo: "/demos/astronomia/index.html",
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
            <span className="eyebrow rv">Service 02 — ZNX/WEB</span>
            <h1 className="h-mega rv" style={{ marginTop: "22px" }} aria-label="Custom Web Development & High-Performance Web Applications in Mumbai">
              Sites built
              <br />
              to convert
              <em className="accent">.</em>
            </h1>
            <p className="lede rv">
              We deliver professional web development services, building fast, custom web applications and conversion-focused marketing websites. From design systems to custom front-end development, we build digital solutions measured against real business goals.
            </p>
            <div className="hero-cta rv" style={{ justifyContent: "flex-start", marginTop: "38px" }}>
              <Link
                href="/audit"
                className="btn btn-fill"
                data-magnetic
                onClick={() => trackEvent("audit_cta_click", { location: "websites_hero" })}
              >
                Book an Audit
                <ArrowRight />
              </Link>
              <a href="#projects" className="btn btn-line" data-magnetic>
                View our web projects
              </a>
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
              <h2 className="h-xl rv" aria-label="Modern Next.js & React Web Engineering: Every pixel earns its keep">
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

      <section className="sec" id="projects" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">Selected builds</span>
            <div className="row">
              <h2 className="h-xl rv" aria-label="Selected Projects & Web Development Portfolio | Zoenex Studios">
                Selected
                <br />
                projects<em className="accent">.</em>
              </h2>
              <p className="lede rv" style={{ maxWidth: "40ch" }}>
                Live client websites and interactive builds designed and built end to end — click through the real thing, live.
              </p>
            </div>
          </div>
          <div className="wgrid">
            {PROJECTS.map((p) => {
              const cls = `wcard ${p.span} rv`;
              return (
                <a className={cls} href={p.demo} target="_blank" rel="noopener noreferrer" key={p.title}>
                  <div className="wthumb">
                    <span className="art-label">{p.label}</span>
                    <Image
                      className="wshot"
                      src={p.img}
                      alt={p.alt || p.title}
                      fill
                      sizes="(max-width: 820px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
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

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">SEO Foundations</span>
            <div className="row">
              <h2 className="h-xl rv" aria-label="Technical SEO & Core Web Vitals: Digital Growth & SEO Foundations">
                Digital Growth &
                <br />
                SEO Foundations.
              </h2>
              <p className="lede rv" style={{ maxWidth: "42ch" }}>
                Your website should be built to be discoverable. Our development process incorporates technical SEO fundamentals and local SEO alignment from day one.
              </p>
            </div>
          </div>
          <div className="wgrid" style={{ marginTop: "40px" }}>
            <article className="wcard s6 rv">
              <div className="wthumb">
                <span className="art-label">Technical SEO</span>
                <div className="art art-bars" />
              </div>
              <div className="wmeta">
                <div className="top">
                  <h3>Built for Discoverability</h3>
                  <span className="cat">Core Web Vitals</span>
                </div>
                <p>
                  Our websites are engineered using semantic HTML, structured data, responsive mobile-first design, Core Web Vitals optimization, metadata configuration, and accessibility standards to maximize search crawlability and load performance.
                </p>
              </div>
            </article>
            <article className="wcard s6 rv">
              <div className="wthumb">
                <span className="art-label">Local SEO</span>
                <div className="art art-eclipse" />
              </div>
              <div className="wmeta">
                <div className="top">
                  <h3>Location-Ready Architecture</h3>
                  <span className="cat">Mumbai & Beyond</span>
                </div>
                <p>
                  For businesses targeting specific locations like Mumbai, we structure sites around location pages, Google Business Profile alignment, LocalBusiness structured JSON-LD schema, and consistent NAP (Name, Address, Phone) citations.
                </p>
              </div>
            </article>
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
              AI Automation Solutions
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <BigCta
        ghost="AUDIT"
        badge="Website audits open — Q3 2026"
        titleTop="Your site should"
        titleSwipe="work harder."
        lede="Get a practical review of your website, conversion experience, and opportunities for improvement. Submit your site for an audit."
        cta="Book an Audit"
        reassure={["Core Web Vitals teardown", "Conversion & UX analysis", "NDA on request", "Reply within 1 business day"]}
      />
    </div>
  );
}
