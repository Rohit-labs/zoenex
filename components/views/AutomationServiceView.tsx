"use client";

import Link from "next/link";
import { useRef } from "react";
import { useViewAnimations } from "@/lib/useViewAnimations";
import BigCta from "../BigCta";
import { ArrowRight } from "../icons";

const SYSTEMS = [
  {
    code: "SYS/01",
    title: "AI agents & copilots",
    body: "Internal agents that read, draft, update and escalate — trained on your tone, your tools and your rules.",
  },
  {
    code: "SYS/02",
    title: "Chat & support automation",
    body: "Customer-facing bots that resolve the routine 80% and hand the rest to a human with full context attached.",
  },
  {
    code: "SYS/03",
    title: "Workflows & integrations",
    body: "CRM pipelines, reporting engines and API glue that move data between your tools without anyone touching a spreadsheet.",
  },
];

const RUNS = [
  {
    code: "RUN 01",
    title: "Process audit",
    body: "We map your repetitive work end to end and put an hours-per-week number on every task. Only the highest-ROI candidates make the build list.",
  },
  {
    code: "RUN 02",
    title: "Data & guardrails",
    body: "We connect the tools the work lives in — CRM, inbox, docs — and agree exactly what the system may do on its own and when it must hand off to a human.",
  },
  {
    code: "RUN 03",
    title: "Build in shadow mode",
    body: "The agent runs silently against live data first. You compare its output to your team's, side by side, before it's allowed to act.",
  },
  {
    code: "RUN 04",
    title: "Supervised launch",
    body: "It goes live with a human in the loop. We tune prompts, rules and escalations on real edge cases until the error rate flatlines.",
  },
  {
    code: "RUN 05",
    title: "Monitor & improve",
    body: "Dashboards track every run. We review monthly, retrain on new patterns and keep expanding what the system can safely own.",
  },
];

const METRICS = [
  { count: 12000, suffix: "+", label: "Hours of manual work automated for clients" },
  { count: 62, suffix: "%", label: "Faster response times after the Nordwind rollout" },
  { count: 30, label: "Staff hours handed back weekly, per client average" },
  { count: 5, suffix: "×", label: "Average payback multiple in year one" },
];

export default function AutomationServiceView() {
  const ref = useRef<HTMLDivElement>(null);
  useViewAnimations(ref);

  return (
    <div className="view active" ref={ref}>
      <section className="page-hero page-hero-wide">
        <div className="wrap wide-hero-grid">
          <div className="wide-hero-copy">
            <span className="eyebrow rv">AI Automation</span>
            <h1 className="h-mega rv">
              Work that
              <br />
              runs itself
              <em className="accent">.</em>
            </h1>
            <p className="lede rv">
              Custom AI agents and workflow systems that take repetitive operations off your team — lead handling, support,
              reporting, internal ops — and run them around the clock.
            </p>
            <div className="hero-cta rv" style={{ justifyContent: "flex-start", marginTop: "38px" }}>
              <Link href="/contact" className="btn btn-fill" data-magnetic>
                Book an automation audit
                <ArrowRight />
              </Link>
              <Link href="/#services" className="btn btn-line" data-magnetic>
                View services
              </Link>
            </div>
          </div>
          <div className="term rv" aria-hidden="true">
            <div className="term-bar">
              <i />
              <i />
              <i />
              <span className="term-title">zoenex-agent — live run</span>
            </div>
            <div className="term-body">
              <span className="ln">
                &gt; lead received — <b>priya@northstar.in</b>
              </span>
              <span className="ln">
                &gt; intent: pricing enquiry <em>▸ score 87</em>
              </span>
              <span className="ln">
                &gt; drafted reply in brand voice … <em>done (1.8s)</em>
              </span>
              <span className="ln">
                &gt; CRM updated <em>▸ owner notified</em>
              </span>
              <span className="ln cur">&gt; awaiting next event</span>
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
                Systems, not
                <br />
                science projects.
              </h2>
              <p className="lede rv" style={{ maxWidth: "40ch" }}>
                Every build starts from a task your team already does by hand — and ends with that task off their plate for good.
              </p>
            </div>
          </div>
          {SYSTEMS.map((s) => (
            <article className="svc" key={s.code}>
              <span className="svc-code">
                <span className="live" />
                {s.code}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p className="svc-body">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sec on-night">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">The AUT workflow</span>
            <div className="row">
              <h2 className="h-xl rv">
                Audit to
                <br />
                autopilot.
              </h2>
              <p className="lede rv" style={{ maxWidth: "40ch" }}>
                Nothing acts alone until it has proven itself against your team&rsquo;s own output. Five runs, in order, every time.
              </p>
            </div>
          </div>
          <div className="pipe">
            {RUNS.map((r) => (
              <div className="pipe-step rv" key={r.code}>
                <span className="pipe-code">{r.code}</span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="metrics">
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
            <Link href="/services/websites" className="btn btn-line" data-magnetic>
              Websites &amp; Product
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
        ghost="AUTOMATE"
        badge="Open for new projects"
        titleTop="Stop doing"
        titleSwipe="robot work."
        lede="Tell us where the hours go. We'll tell you which ones a system can own — and what that's worth per month."
        cta="Book an automation audit"
      />
    </div>
  );
}
