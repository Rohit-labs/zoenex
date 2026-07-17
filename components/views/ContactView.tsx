"use client";

import { Fragment, useRef, useState } from "react";
import type { FormEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useViewAnimations } from "@/lib/useViewAnimations";
import { ArrowRight } from "../icons";

const SERVICES = [
  { id: "s-aut", value: "AI Automation", label: "AI Automation" },
  { id: "s-web", value: "Website / Product", label: "Website / Product" },
  { id: "s-mtn", value: "Motion Design", label: "Motion Design" },
  { id: "s-ns", value: "Not sure", label: "Not sure — advise me" },
];

const FAQ = [
  {
    q: "How long does a typical project take?",
    a: "Most websites ship in 4–8 weeks, automation systems in 3–6 weeks, and motion projects in 2–5 weeks depending on scope. You'll get a fixed timeline in the proposal before anything starts.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes — about half our work is international. We're remote-first, overlap with EU hours daily and with US hours by arrangement, and invoice in INR or USD.",
  },
  {
    q: "Can you take over an existing site or automation?",
    a: "Usually, yes. We start with a short paid audit of the current build, then give you a plan: improve in place, rebuild in parts, or start fresh — with honest reasoning for each.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes a handover and 30 days of post-launch support. After that, most clients keep us on a monthly retainer for optimisation, new automations and fresh motion content.",
  },
];

type Errors = { name: boolean; email: boolean; message: boolean; services: boolean };
const NO_ERRORS: Errors = { name: false, email: false, message: false, services: false };

export default function ContactView() {
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>(NO_ERRORS);
  const [sent, setSent] = useState(false);
  useViewAnimations(ref);

  useGSAP(
    () => {
      if (!sent || !successRef.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) gsap.from(successRef.current, { y: 20, autoAlpha: 0, duration: 0.7 });
    },
    { dependencies: [sent], scope: ref }
  );

  const clearError = (key: keyof Errors) => setErrors((e) => (e[key] ? { ...e, [key]: false } : e));

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const value = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? "";

    const next: Errors = {
      name: value("name").trim().length < 2,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value("email").trim()),
      message: value("message").trim().length < 10,
      services: form.querySelectorAll('input[name="services"]:checked').length === 0,
    };
    setErrors(next);
    if (next.name || next.email || next.message || next.services) return;

    /* Demo submit — POST this payload to your backend / API route to go live */
    const data: Record<string, string> = {};
    new FormData(form).forEach((v, k) => {
      data[k] = data[k] ? data[k] + ", " + String(v) : String(v);
    });
    console.log("Enquiry payload:", data);
    setSent(true);
  };

  return (
    <div className="view active" ref={ref}>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow rv">Contact</span>
          <h1 className="h-mega rv" style={{ marginTop: "22px" }}>
            Tell us what
            <br />
            should move<em className="accent">.</em>
          </h1>
          <p className="lede rv">
            Two minutes of your time, one business day for our reply. If we&rsquo;re not the right fit, we&rsquo;ll say so and point you
            somewhere better.
          </p>
        </div>
      </section>

      <section className="sec" id="enquiry" style={{ paddingTop: "28px" }}>
        <div className="wrap cgrid">
          <aside className="cinfo rv">
            <div className="iblk">
              <h4>Email</h4>
              <a href="mailto:hello@zoenex.studio">hello@zoenex.studio</a>
              <p className="sub">New projects &amp; general enquiries</p>
            </div>
            <div className="iblk">
              <h4>Studio</h4>
              <p>Mumbai, India</p>
              <p className="sub">Remote-first, working worldwide</p>
            </div>
            <div className="iblk">
              <h4>Response time</h4>
              <p>Within 1 business day</p>
              <p className="sub">Mon–Fri, 10:00–19:00 IST</p>
            </div>
            <div className="iblk">
              <h4>Elsewhere</h4>
              <p>
                <a href="#" rel="noopener">
                  LinkedIn
                </a>{" "}
                ·{" "}
                <a href="#" rel="noopener">
                  Instagram
                </a>{" "}
                ·{" "}
                <a href="#" rel="noopener">
                  X
                </a>
              </p>
            </div>
          </aside>

          <div className="fcard rv">
            <form className="fgrid" ref={formRef} noValidate onSubmit={onSubmit} style={sent ? { display: "none" } : undefined}>
              <div className="field">
                <label htmlFor="name">
                  Name <em>*</em>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  className={errors.name ? "error" : undefined}
                  onInput={() => clearError("name")}
                />
                <span className={`ferr${errors.name ? " show" : ""}`}>Please enter your name.</span>
              </div>
              <div className="field">
                <label htmlFor="email">
                  Work email <em>*</em>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  className={errors.email ? "error" : undefined}
                  onInput={() => clearError("email")}
                />
                <span className={`ferr${errors.email ? " show" : ""}`}>Please enter a valid email address.</span>
              </div>
              <div className="field full">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" autoComplete="organization" />
              </div>
              <div className="field full">
                <span
                  className="field label"
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: ".04em",
                    color: "var(--ink-60)",
                  }}
                >
                  What do you need? <em style={{ color: "var(--cobalt)", fontStyle: "normal" }}>*</em>
                </span>
                <div className="pills" onChange={() => clearError("services")}>
                  {SERVICES.map((s) => (
                    <Fragment key={s.id}>
                      <input type="checkbox" id={s.id} name="services" value={s.value} />
                      <label htmlFor={s.id}>{s.label}</label>
                    </Fragment>
                  ))}
                </div>
                <span className={`ferr${errors.services ? " show" : ""}`}>Pick at least one option.</span>
              </div>
              <div className="field full">
                <label htmlFor="message">
                  About the project <em>*</em>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="What are you building, what's slowing you down, and when do you want it live?"
                  required
                  className={errors.message ? "error" : undefined}
                  onInput={() => clearError("message")}
                />
                <span className={`ferr${errors.message ? " show" : ""}`}>
                  Tell us a little about the project (20+ characters helps).
                </span>
              </div>
              <div className="ffoot">
                <button type="submit" className="btn btn-fill" data-magnetic>
                  Send enquiry
                  <ArrowRight />
                </button>
                <span className="mono-tag">No spam. No mailing list. Just a reply.</span>
              </div>
            </form>
            <div className={`fsuccess${sent ? " show" : ""}`} ref={successRef} role="status">
              <div className="ok">✓</div>
              <h3>Enquiry sent</h3>
              <p>Thanks — your brief has landed in our inbox. Expect a reply from the Zoenex team within one business day.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">Before you ask</span>
            <h2 className="h-xl rv">
              Common
              <br />
              questions.
            </h2>
          </div>
          <div className="faq rv">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
