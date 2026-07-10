"use client";

import Link from "next/link";
import { useRef } from "react";
import { useViewAnimations } from "@/lib/useViewAnimations";
import BigCta from "../BigCta";
import Clock from "../Clock";
import HeroArt from "../HeroArt";
import { ArrowRight, ArrowUpRight } from "../icons";

const SERVICES = [
  {
    code: "ZNX/AUT",
    title: "AI Automation",
    body: "Custom AI agents and workflow systems that take repetitive work off your team — lead handling, support, reporting, internal operations.",
    tags: ["AI agents", "Chatbots", "CRM workflows", "API integrations", "RAG systems"],
    aria: "Enquire about AI Automation",
    sig: (
      <div className="svc-sig sig-aut" aria-hidden="true">
        <span className="n on" />
        <span className="lnk" />
        <span className="n" />
        <span className="lnk" />
        <span className="n on" />
      </div>
    ),
  },
  {
    code: "ZNX/WEB",
    title: "Websites & Product",
    body: "Fast, conversion-focused marketing sites and web apps — designed end to end, built on modern stacks, measured against real business goals.",
    tags: ["Marketing sites", "Web apps", "E-commerce", "Design systems", "SEO & performance"],
    aria: "Enquire about Websites and Product",
    sig: (
      <div className="svc-sig sig-web" aria-hidden="true">
        <div className="bar">
          <i />
          <i />
          <i />
        </div>
        <div className="scan" />
      </div>
    ),
  },
  {
    code: "ZNX/MTN",
    title: "Motion Design",
    body: "Brand films, product explainers, UI motion and social-first video that give your product the launch it deserves — and keep it moving after.",
    tags: ["Brand films", "Explainers", "UI motion", "3D & WebGL", "Social video"],
    aria: "Enquire about Motion Design",
    sig: (
      <div className="svc-sig sig-mtn" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    ),
  },
];

const SELECTED_WORK = [
  { span: "s7", art: "art-orbit", num: "01", cat: "AI Automation · 2026", title: "Nordwind Ops Copilot", res: "62% faster response time" },
  { span: "s5", art: "art-eclipse", num: "02", cat: "E-commerce · 2026", title: "Solstice Skincare", res: "+38% conversion" },
  { span: "s5", art: "art-halftone", num: "03", cat: "Brand Motion · 2025", title: "Pulseloop Launch Film", res: "2.1M organic views" },
  { span: "s7", art: "art-grid3d", num: "04", cat: "Web App + AI · 2025", title: "Meridian Realty Portal", res: "3× qualified leads / month" },
];

const STEPS = [
  {
    side: "left",
    num: "Step 01",
    title: "Discover & Agree",
    body: "A working session to map goals, bottlenecks and audience. You leave with a scoped plan, a fixed quote and a signed agreement to kick things off.",
  },
  {
    side: "right",
    num: "Step 02",
    title: "Design",
    body: "Interface, motion and system design in tight loops — you review real prototypes, not static decks.",
  },
  {
    side: "left",
    num: "Step 03",
    title: "Build",
    body: "Development and production with weekly demos. Everything tested, documented and performance-budgeted.",
  },
  {
    side: "right",
    num: "Step 04",
    title: "Automate",
    body: "We wire in the AI layer, train your team, and stay on for optimisation once it's live.",
  },
];

const TICKER = ["AI Agents", "Workflow Automation", "Websites", "Web Apps", "Brand Motion", "3D & WebGL", "Product Films", "Chatbots"];

export default function HomeView() {
  const ref = useRef<HTMLDivElement>(null);
  useViewAnimations(ref, { hero: true });

  return (
    <div className="view active" ref={ref}>
      <section className="hero">
        <HeroArt />
        <div className="wrap" style={{ width: "100%" }}>
          <div className="hero-top rv">
            <span className="eyebrow">Zoenex Studios — est. 2026</span>
            <span className="mono-tag">AI Automation / Web / Motion</span>
          </div>
          <h1 className="h-mega" id="heroTitle" aria-label="Machines that work. Design that moves.">
            <span className="line">
              <span className="line-inner">Machines</span>
            </span>
            <span className="line">
              <span className="line-inner">
                that work<em>.</em>
              </span>
            </span>
            <span className="line">
              <span className="line-inner">Design that</span>
            </span>
            <span className="line">
              <span className="line-inner">
                <em>moves.</em>
              </span>
            </span>
          </h1>
          <div className="hero-under">
            <p className="lede rv">
              We&rsquo;re a Mumbai studio building AI automation, high-performance websites and motion design for brands that refuse to
              look ordinary — or work slowly.
            </p>
            <div className="hero-cta rv">
              <Link href="/contact" className="btn btn-fill" data-magnetic>
                Start a project
                <ArrowRight />
              </Link>
              <Link href="/work" className="btn btn-line" data-magnetic>
                View work
              </Link>
            </div>
          </div>
          <div className="hero-meta rv">
            <span className="mono-tag">
              Mumbai — <Clock /> IST
            </span>
            <span className="mono-tag">Booking Q3 2026</span>
            <span className="mono-tag">Scroll ↓</span>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {TICKER.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
          {TICKER.map((t, i) => (
            <span key={`b-${i}`}>{t}</span>
          ))}
        </div>
      </div>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">Capabilities</span>
            <div className="row">
              <h2 className="h-xl rv">
                Three crafts,
                <br />
                one studio.
              </h2>
              <p className="lede rv" style={{ maxWidth: "40ch" }}>
                Automation clears the busywork. The web work carries your brand. Motion makes people stop. Most clients end up using all
                three.
              </p>
            </div>
          </div>

          {SERVICES.map((s) => (
            <article className="svc" key={s.code}>
              <span className="svc-code">
                <span className="live" />
                {s.code}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p className="svc-body">{s.body}</p>
                <ul className="svc-tags">
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              {s.sig}
              <Link className="svc-go" href="/contact" aria-label={s.aria} data-cursor>
                <ArrowUpRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="sec on-night">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">Selected work</span>
            <div className="row">
              <h2 className="h-xl rv">
                Proof,
                <br />
                not promises.
              </h2>
              <Link href="/work" className="btn btn-line rv" data-magnetic>
                All projects
                <ArrowRight />
              </Link>
            </div>
          </div>

          <div className="scwork">
            {SELECTED_WORK.map((w) => (
              <Link className={`scard ${w.span} rv`} href="/work" key={w.num}>
                <div className={`art ${w.art}`} />
                <span className="scard-frame" />
                <span className="scard-num">{w.num}</span>
                <div className="scard-meta">
                  <span className="scard-cat">{w.cat}</span>
                  <h3>{w.title}</h3>
                  <span className="scard-res">{w.res}</span>
                </div>
                <span className="scard-go">
                  <ArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">Process</span>
            <h2 className="h-xl rv">
              Brief to shipped,
              <br />
              four moves.
            </h2>
          </div>
          <div className="timeline" id="timeline">
            <div className="tl-spine">
              <span className="tl-fill" id="tlFill" />
            </div>
            {STEPS.map((s) => (
              <div className={`tl-step ${s.side}`} key={s.num}>
                <span className="tl-node" />
                <div className="tl-card">
                  <span className="tl-num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="metrics" style={{ marginTop: "clamp(70px,9vw,120px)" }}>
            <div className="metric rv">
              <b data-count="40">0</b>
              <span>Projects shipped across web, AI and motion</span>
            </div>
            <div className="metric rv">
              <b data-count="12000" data-suffix="+">
                0
              </b>
              <span>Hours of manual work automated</span>
            </div>
            <div className="metric rv">
              <b data-count="98" data-suffix="%">
                0
              </b>
              <span>Average Lighthouse performance score</span>
            </div>
            <div className="metric rv">
              <b data-count="6">0</b>
              <span>Countries our work ships to</span>
            </div>
          </div>
        </div>
      </section>

      <BigCta
        ghost="ZNX"
        badge="Booking Q3 2026 — 2 slots open"
        titleTop="Let's build"
        titleSwipe="something rare."
        lede="Tell us what you're building. We reply within one business day with honest next steps — no sales script."
        cta="Start the conversation"
      />
    </div>
  );
}
