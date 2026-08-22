"use client";

import Link from "next/link";
import { useRef } from "react";
import { useViewAnimations } from "@/lib/useViewAnimations";
import { FAQs } from "@/lib/faqs";
import BigCta from "../BigCta";
import Clock from "../Clock";
import HeroArt from "../HeroArt";
import { ArrowRight, ArrowUpRight } from "../icons";

const SERVICES = [
  {
    code: "ZNX/AUT",
    title: "AI & Business Automation",
    body: "We connect AI and automation to the processes your business already uses. From AI assistants and lead management to automated emails, CRM workflows, data processing, customer support and internal business workflows, we build systems that reduce repetitive work and help teams operate faster.",
    tags: ["AI assistants", "Lead management", "CRM automation", "Workflow automation", "Data processing"],
    href: "/services/ai-automation",
    aria: "Explore our AI automation solutions",
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
    title: "Web Development",
    body: "Custom websites and web applications designed around your business goals — from high-performance company websites and landing pages to e-commerce experiences and custom web platforms. We focus on responsive design, accessibility, Core Web Vitals, performance optimization, SEO-ready structure, conversion-focused layouts and scalable development.",
    tags: ["Custom websites", "Web apps", "E-commerce", "Local SEO", "Core Web Vitals"],
    href: "/services/websites",
    aria: "Explore our web development services",
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
];

interface SelectedWorkItem {
  span: string;
  num: string;
  cat: string;
  title: string;
  res: string;
  demo?: string;
  img?: string;
  art?: string;
  href?: string;
}

const SELECTED_WORK: SelectedWorkItem[] = [
  {
    span: "s7",
    num: "01",
    cat: "Influencer Marketing · 2026",
    title: "LICOSASH — Influencer Desk",
    res: "Live site — click to explore",
    demo: "https://licosash.com",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80",
  },
  {
    span: "s5",
    num: "02",
    cat: "Web Design · 2026",
    title: "AERUM — Modular Real Estate",
    res: "Live design — click to explore",
    demo: "/demos/aerum/index.html",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
  },
  {
    span: "s5",
    num: "03",
    cat: "Web / Scroll · 2026",
    title: "ASTRONOMIA — Luxury Horology",
    res: "Live site — click to explore",
    demo: "https://astronomia-navy.vercel.app",
    img: "/demos/astronomia/astronomia_sky.png",
  },
  {
    span: "s7",
    num: "04",
    cat: "Restaurant · 2026",
    title: "DINERLY — Fine-Casual Dining",
    res: "Live design — click to explore",
    demo: "/demos/dinerly/index.html",
    img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1600&q=80",
  },
];

const STEPS = [
  {
    side: "left",
    num: "Step 01",
    title: "Discover",
    body: "We map your business goals, audience, technical requirements and operational bottlenecks. You receive a clear scope, project plan and quote before development begins.",
  },
  {
    side: "right",
    num: "Step 02",
    title: "Design",
    body: "We create the interface, user experience, visual system and motion direction through iterative prototypes rather than static design decks.",
  },
  {
    side: "left",
    num: "Step 03",
    title: "Build",
    body: "Development happens in focused iterations with regular demos. Projects are tested for responsiveness, accessibility, performance, security and maintainability.",
  },
  {
    side: "right",
    num: "Step 04",
    title: "Automate & Launch",
    body: "Where automation or AI can improve the business, we integrate the required systems, test the workflows and help your team adopt the new tools.",
  },
];

const STAKES = [
  {
    ix: "01",
    title: "Your website gets traffic but not customers.",
    body: "Visitors arrive, browse your pages, and leave without contacting you. We build conversion-focused websites with clear messaging, intuitive navigation, responsive layouts, strong calls to action, and performance in mind.",
  },
  {
    ix: "02",
    title: "Your team is drowning in repetitive work.",
    body: "Copy-paste tasks, lead follow-ups, data entry, reporting, emails and other repetitive processes consume valuable hours. We design custom automations and AI-powered workflows that connect your tools and reduce manual work.",
  },
  {
    ix: "03",
    title: "Your brand looks like everyone else's.",
    body: "Modern businesses compete for attention across websites, social media and digital advertising. We use motion design, UI animation, 3D assets and cinematic visuals to create digital experiences people remember.",
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

const TOOLS = ["Next.js", "React", "TypeScript", "Node.js", "n8n / Make"];

const TICKER = ["AI Agents", "Workflow Automation", "Websites", "Web Apps", "Chatbots", "Lead Management", "CRM Integrations"];

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
            <span className="mono-tag">AI Automation / Web Development</span>
          </div>
          <h1 className="h-mega" id="heroTitle" aria-label="Websites that convert. AI that works.">
            <span className="line">
              <span className="line-inner">Websites</span>
            </span>
            <span className="line">
              <span className="line-inner">
                that convert<em>.</em>
              </span>
            </span>
            <span className="line">
              <span className="line-inner">AI that</span>
            </span>
            <span className="line">
              <span className="line-inner">
                <em>works.</em>
              </span>
            </span>
          </h1>
          <div className="hero-under">
            <p className="lede rv">
              Zoenex Studios is a web development and AI automation studio based in Mumbai, India. We build high-performance business websites, custom web applications, AI-powered solutions, and workflow automations for modern businesses.
            </p>
            <div className="hero-cta rv">
              <Link href="/contact" className="btn btn-fill" data-magnetic>
                Book a 20-min call
                <ArrowRight />
              </Link>
              <Link href="/work" className="btn btn-line" data-magnetic>
                See our portfolio
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
                two levers.
              </h2>
              <p className="lede rv" style={{ maxWidth: "40ch" }}>
                We build websites that convert — then put them on autopilot. Web carries the brand, automation removes the busywork. Most clients use both.
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
                Explore all projects
                <ArrowRight />
              </Link>
            </div>
          </div>

          <div className="scwork">
            {SELECTED_WORK.map((w) => {
              const inner = (
                <>
                  {w.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="art" src={w.img} alt={w.title} style={{ objectFit: "cover" }} />
                  ) : (
                    <div className={`art ${w.art}`} />
                  )}
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
                </>
              );

              return w.demo ? (
                <a className={`scard ${w.span} rv`} href={w.demo} target="_blank" rel="noopener noreferrer" key={w.num}>
                  {inner}
                </a>
              ) : (
                <Link className={`scard ${w.span} rv`} href={w.href || "/work"} key={w.num}>
                  {inner}
                </Link>
              );
            })}
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
              <span>Projects shipped across web development and AI automation</span>
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

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">Questions</span>
            <h2 className="h-xl rv">
              Frequently
              <br />
              asked questions.
            </h2>
          </div>
          <div className="faq rv" style={{ marginTop: "40px" }}>
            {FAQs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": FAQs.map((f) => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": f.a
                }
              }))
            })
          }}
        />
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
