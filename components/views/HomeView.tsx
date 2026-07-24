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
    href: "/services/ai-automation",
    aria: "Explore AI Automation",
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
    href: "/services/websites",
    aria: "Explore Websites and Product",
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
    href: "/services/motion-design",
    aria: "Explore Motion Design",
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

const STAKES = [
  {
    ix: "01",
    title: "Looks fine. Converts nothing.",
    body: "Visitors land, read, nod — and leave without booking. A pretty site that doesn't turn traffic into calls is a cost, not an asset.",
  },
  {
    ix: "02",
    title: "Your team drowns in busywork.",
    body: "20+ hours a week vanish into copy-paste, follow-ups and reporting that software should be doing while your people sleep.",
  },
  {
    ix: "03",
    title: "Forgettable in a scroll.",
    body: "Static pages blur together. Without motion that earns attention, the brands with movement are the ones buyers remember — and email.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Support went from our biggest bottleneck to a non-issue. Replies are 62% faster and the agent handles the noise so the team handles the edge cases.",
    name: "Lena Brandt",
    role: "Head of Ops · Nordwind",
    initials: "LB",
  },
  {
    quote: "The rebuild paid for itself in six weeks. Conversion is up 38%, the store finally feels like our brand, and it loads before you can blink.",
    name: "Marco Silveira",
    role: "Founder · Solstice Skincare",
    initials: "MS",
  },
  {
    quote: "Their AI concierge books site visits while we sleep. We're closing three times the qualified leads and nobody's chasing forms anymore.",
    name: "Priya Nair",
    role: "Director · Meridian Realty",
    initials: "PN",
  },
];

const TOOLS = ["Webflow", "Framer", "Next.js", "n8n / Make", "After Effects"];

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
              We help ambitious B2B teams turn their website into a 24/7 growth engine — designed, animated and automated end to end.
              One studio, three levers: web, motion, AI.
            </p>
            <div className="hero-cta rv">
              <Link href="/contact" className="btn btn-fill" data-magnetic>
                Book a 20-min call
                <ArrowRight />
              </Link>
              <Link href="/work" className="btn btn-line" data-magnetic>
                See the proof
              </Link>
            </div>
          </div>
          <div className="hero-meta rv">
            <span className="mono-tag">
              Mumbai — <Clock /> IST
            </span>
            <span className="mono-tag">Replies within 1 business day</span>
            <span className="mono-tag">Scroll ↓</span>
          </div>
        </div>
      </section>

      <section className="proofstrip">
        <div className="wrap proofstrip-inner">
          <span className="proof-label rv">
            Trusted by teams in <b>US · UK · UAE · India</b>
          </span>
          <ul className="proof-tools rv" aria-label="Tools we build with">
            {TOOLS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
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
            <span className="eyebrow rv">The real problem</span>
            <div className="row">
              <h2 className="h-xl rv">
                Looking good
                <br />
                isn&rsquo;t converting.
              </h2>
              <p className="lede rv" style={{ maxWidth: "42ch" }}>
                Before the pixels: most sites fail for the same three reasons. If any of these sound like you, the fix isn&rsquo;t
                prettier — it&rsquo;s sharper.
              </p>
            </div>
          </div>
          <div className="stake-grid">
            {STAKES.map((s) => (
              <article className="stake rv" key={s.ix}>
                <span className="stake-ix">{s.ix}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">What we do</span>
            <div className="row">
              <h2 className="h-xl rv">
                One outcome,
                <br />
                three levers.
              </h2>
              <p className="lede rv" style={{ maxWidth: "40ch" }}>
                We build websites that convert — then make them move and put them on autopilot. Web carries the brand, motion earns
                attention, automation removes the busywork. Most clients use all three.
              </p>
            </div>
          </div>

          {SERVICES.map((s) => (
            <Link className="svc" key={s.code} href={s.href} aria-label={s.aria} data-cursor>
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
              <span className="svc-go" aria-hidden="true">
                <ArrowUpRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sec on-night scwork-band">
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
            <span className="eyebrow rv">In their words</span>
            <div className="row">
              <h2 className="h-xl rv">
                Don&rsquo;t take
                <br />
                our word.
              </h2>
              <p className="lede rv" style={{ maxWidth: "40ch" }}>
                Every project is measured against the one number that mattered to the client. Here&rsquo;s what happened next.
              </p>
            </div>
          </div>
          <div className="tgrid">
            {TESTIMONIALS.map((t) => (
              <figure className="tcard rv" key={t.name}>
                <blockquote className="quote">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="twho">
                  <span className="tavatar" aria-hidden="true">
                    {t.initials}
                  </span>
                  <span>
                    <span className="tname">{t.name}</span>
                    <span className="trole">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
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
        cta="Book a 20-min call"
        reassure={["Async-friendly across time zones", "Fixed quotes, no surprises", "NDA on request", "Reply within 1 business day"]}
      />
    </div>
  );
}
