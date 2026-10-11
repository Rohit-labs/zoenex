"use client";

import { Fragment, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useViewAnimations } from "@/lib/useViewAnimations";
import { FAQs } from "@/lib/faqs";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight } from "../icons";

const SERVICES = [
  { id: "s-aut", value: "AI Automation", label: "AI Automation" },
  { id: "s-web", value: "Website / Product", label: "Website / Product" },
  { id: "s-ns", value: "Not sure", label: "Not sure — advise me" },
];

type Errors = {
  name: boolean;
  email: boolean;
  message: boolean;
  services: boolean;
};

const NO_ERRORS: Errors = {
  name: false,
  email: false,
  message: false,
  services: false,
};

export default function ContactView() {
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formStartedRef = useRef(false);

  const [errors, setErrors] = useState<Errors>(NO_ERRORS);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useViewAnimations(ref);

  useGSAP(
    () => {
      if (!sent || !successRef.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) gsap.from(successRef.current, { y: 20, autoAlpha: 0, duration: 0.7 });
    },
    { dependencies: [sent], scope: ref }
  );

  const handleFieldInteraction = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackEvent("contact_form_start");
    }
  };

  const clearError = (key: keyof Errors) => {
    handleFieldInteraction();
    setErrors((e) => (e[key] ? { ...e, [key]: false } : e));
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (submitting) return;

    const form = ev.currentTarget;
    const value = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? "";

    const nameVal = value("name").trim();
    const emailVal = value("email").trim();
    const messageVal = value("message").trim();
    const checkedServices: string[] = [];
    form.querySelectorAll('input[name="services"]:checked').forEach((el) => {
      checkedServices.push((el as HTMLInputElement).value);
    });

    const next: Errors = {
      name: nameVal.length < 2,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailVal),
      message: messageVal.length < 10,
      services: checkedServices.length === 0,
    };

    setErrors(next);
    if (next.name || next.email || next.message || next.services) return;

    const botcheckVal = (form.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    if (botcheckVal) {
      setSent(true);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    trackEvent("contact_form_submit");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error("Web3Forms Access Key is missing from environment variables.");
      setSubmitError("Form submission is currently misconfigured (missing API key).");
      setSubmitting(false);
      trackEvent("contact_form_error", { message: "missing_access_key" });
      return;
    }

    const payload = {
      access_key: accessKey,
      name: nameVal,
      email: emailVal,
      company: value("company").trim() || "Not specified",
      services: checkedServices.join(", "),
      message: messageVal,
      subject: `New Zoenex Project Enquiry from ${nameVal}`,
      from_name: "Zoenex Studios Contact Form",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setSent(true);
        form.reset();
        trackEvent("contact_form_success");
      } else {
        const errorMsg = result.message || "Something went wrong. Please try again.";
        setSubmitError(errorMsg);
        trackEvent("contact_form_error", { message: errorMsg });
      }
    } catch (err) {
      console.error("Web3Forms submission error:", err);
      const networkError = "Network error. Please check your connection and try again.";
      setSubmitError(networkError);
      trackEvent("contact_form_error", { message: networkError });
    } finally {
      setSubmitting(false);
    }
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
            Send a brief below and we&rsquo;ll reply within one business day. If we&rsquo;re not the right fit, we&rsquo;ll
            say so and point you somewhere better. Looking specifically for a website or automation teardown? You can also{" "}
            <Link href="/audit" style={{ color: "var(--cobalt)", textDecoration: "underline" }}>
              Book an Audit
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: "8px", paddingBottom: 0 }}>
        <div className="wrap">
          <div className="bookband rv">
            <div className="bb-copy">
              <span className="eyebrow bb-eyebrow">Website review</span>
              <h2>Want an in-depth audit instead?</h2>
              <p>
                If you want us to review your existing website, Core Web Vitals, conversion leaks, and automation
                opportunities, request a dedicated audit teardown.
              </p>
            </div>
            <div className="bb-side">
              <Link
                className="btn btn-fill"
                href="/audit"
                data-magnetic
                onClick={() => trackEvent("audit_cta_click", { location: "contact_to_audit_band" })}
              >
                Book an Audit
                <ArrowRight />
              </Link>
              <ul className="bb-tags" aria-label="Audit highlights">
                <li>UX Teardown</li>
                <li>Core Web Vitals</li>
                <li>Actionable Steps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="enquiry" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
        <div className="wrap" style={{ marginBottom: "clamp(36px,4vw,56px)" }}>
          <span className="eyebrow rv">Project Brief & General Inquiry</span>
        </div>
        <div className="wrap cgrid">
          <aside className="cinfo rv">
            <div className="iblk">
              <h4>Email</h4>
              <a href="mailto:zoenexstudios@gmail.com">zoenexstudios@gmail.com</a>
              <p className="sub">New projects & general enquiries</p>
            </div>
            <div className="iblk">
              <h4>Studio</h4>
              <p>Mumbai, India</p>
              <p className="sub">Remote-first, working worldwide</p>
            </div>
            <div className="iblk">
              <h4>Response time</h4>
              <p>Within 1 business day</p>
              <p className="sub">Async-friendly · overlap with EU daily, US by arrangement</p>
            </div>
            <div className="iblk">
              <h4>Payments</h4>
              <div className="pay">
                <span>Stripe</span>
                <span>Wise</span>
                <span>PayPal</span>
              </div>
              <p className="sub">Invoiced in USD, EUR, GBP or INR</p>
            </div>
            <div className="iblk">
              <h4>Terms</h4>
              <p style={{ fontSize: "15px", fontWeight: 500 }}>Fixed quotes · milestone billing</p>
              <p className="sub">Contract on every project · NDA on request</p>
            </div>
            <div className="iblk">
              <h4>Elsewhere</h4>
              <p>
                <a href="https://www.instagram.com/madebyzoenex" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </p>
            </div>
          </aside>

          <div className="fcard rv">
            <form
              className="fgrid"
              ref={formRef}
              noValidate
              onSubmit={onSubmit}
              style={sent ? { display: "none" } : undefined}
            >
              {/* Web3Forms honeypot spam protection */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
              />

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
                  placeholder="e.g. Alex Morgan"
                  aria-required="true"
                  aria-invalid={errors.name ? "true" : undefined}
                  className={errors.name ? "error" : undefined}
                  onInput={() => clearError("name")}
                  onFocus={handleFieldInteraction}
                />
                <span className={`ferr${errors.name ? " show" : ""}`} role="alert">
                  Please enter your name.
                </span>
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
                  placeholder="e.g. alex@company.com"
                  aria-required="true"
                  aria-invalid={errors.email ? "true" : undefined}
                  className={errors.email ? "error" : undefined}
                  onInput={() => clearError("email")}
                  onFocus={handleFieldInteraction}
                />
                <span className={`ferr${errors.email ? " show" : ""}`} role="alert">
                  Please enter a valid email address.
                </span>
              </div>

              <div className="field full">
                <label htmlFor="company">Company (optional)</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="organization"
                  placeholder="e.g. Acme Corp"
                  onFocus={handleFieldInteraction}
                />
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
                <div className="pills">
                  {SERVICES.map((s) => (
                    <Fragment key={s.id}>
                      <input
                        type="checkbox"
                        id={s.id}
                        name="services"
                        value={s.value}
                        onChange={() => clearError("services")}
                      />
                      <label htmlFor={s.id}>{s.label}</label>
                    </Fragment>
                  ))}
                </div>
                <span className={`ferr${errors.services ? " show" : ""}`} role="alert">
                  Pick at least one option.
                </span>
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
                  aria-required="true"
                  aria-invalid={errors.message ? "true" : undefined}
                  className={errors.message ? "error" : undefined}
                  onInput={() => clearError("message")}
                  onFocus={handleFieldInteraction}
                />
                <span className={`ferr${errors.message ? " show" : ""}`} role="alert">
                  Tell us a little about the project (10+ characters helps).
                </span>
              </div>

              <div className="ffoot">
                <button
                  type="submit"
                  className="btn btn-fill"
                  data-magnetic
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? "Sending..." : "Send enquiry"}
                  <ArrowRight />
                </button>
                <span className="mono-tag">No spam. No mailing list. Just an honest reply.</span>
              </div>

              {submitError && (
                <span className="ferr show" style={{ marginTop: "14px", display: "block" }} role="alert">
                  {submitError}
                </span>
              )}
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
            {FAQs.map((f) => (
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
