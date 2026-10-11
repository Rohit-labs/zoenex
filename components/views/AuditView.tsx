"use client";

import { Fragment, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useViewAnimations } from "@/lib/useViewAnimations";
import { FAQs } from "@/lib/faqs";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight } from "../icons";

const AUDIT_TYPES = [
  { id: "audit-conv", value: "Website conversion audit", label: "Website conversion audit" },
  { id: "audit-seo", value: "SEO and technical audit", label: "SEO and technical audit" },
  { id: "audit-ux", value: "UX and design audit", label: "UX and design audit" },
  { id: "audit-ai", value: "AI automation opportunity audit", label: "AI automation opportunity audit" },
  { id: "audit-comp", value: "Comprehensive website audit", label: "Comprehensive website audit" },
];

type Errors = {
  name: boolean;
  email: boolean;
  website: boolean;
  auditType: boolean;
};

const NO_ERRORS: Errors = {
  name: false,
  email: false,
  website: false,
  auditType: false,
};

export default function AuditView() {
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formStartedRef = useRef(false);

  const [selectedAuditType, setSelectedAuditType] = useState<string>("Website conversion audit");
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
      trackEvent("audit_form_start");
    }
  };

  const clearError = (key: keyof Errors) => {
    handleFieldInteraction();
    setErrors((e) => (e[key] ? { ...e, [key]: false } : e));
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // Prevent duplicate concurrent submissions
    if (submitting) return;

    const form = ev.currentTarget;
    const value = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? "";

    const nameVal = value("name").trim();
    const emailVal = value("email").trim();
    const websiteVal = value("website").trim();
    const botcheckVal = (form.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;

    const next: Errors = {
      name: nameVal.length < 2,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailVal),
      website: websiteVal.length < 3,
      auditType: !selectedAuditType,
    };

    setErrors(next);
    if (next.name || next.email || next.website || next.auditType) return;

    // Honeypot spam check
    if (botcheckVal) {
      setSent(true);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    trackEvent("audit_form_submit", { audit_type: selectedAuditType });

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error("Web3Forms Access Key is missing from environment variables.");
      setSubmitError("Form submission is currently misconfigured (missing API key).");
      setSubmitting(false);
      trackEvent("audit_form_error", { message: "missing_access_key" });
      return;
    }

    const payload = {
      access_key: accessKey,
      name: nameVal,
      email: emailVal,
      company_or_website: websiteVal,
      audit_type: selectedAuditType,
      main_challenge: value("challenge").trim() || "Not specified",
      additional_details: value("details").trim() || "None provided",
      subject: `New Zoenex Audit Request: ${selectedAuditType} from ${nameVal}`,
      from_name: "Zoenex Studios Audit Form",
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
        trackEvent("audit_form_success", { audit_type: selectedAuditType });
      } else {
        const errorMsg = result.message || "Something went wrong. Please try again.";
        setSubmitError(errorMsg);
        trackEvent("audit_form_error", { message: errorMsg });
      }
    } catch (err) {
      console.error("Web3Forms submission error:", err);
      const networkError = "Network error. Please check your connection and try again.";
      setSubmitError(networkError);
      trackEvent("audit_form_error", { message: networkError });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="view active" ref={ref}>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow rv">Book an Audit</span>
          <h1 className="h-mega rv" style={{ marginTop: "22px" }}>
            Get a practical
            <br />
            website review<em className="accent">.</em>
          </h1>
          <p className="lede rv">
            Get a practical review of your website, conversion experience, and opportunities for improvement. Submit
            your website and tell us what you want to improve. We&rsquo;ll review your request and follow up with the next
            steps.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: "8px", paddingBottom: 0 }}>
        <div className="wrap">
          <div className="bookband rv">
            <div className="bb-copy">
              <span className="eyebrow bb-eyebrow">Practical diagnostic</span>
              <h2>Book your website audit.</h2>
              <p>
                Submit your website and tell us what you want to improve. We&rsquo;ll examine conversion friction,
                performance bottlenecks, and technical architecture, and follow up with clear next steps.
              </p>
            </div>
            <div className="bb-side">
              <a
                className="btn btn-fill"
                href="#audit-form"
                data-magnetic
                onClick={() => trackEvent("audit_cta_click", { location: "audit_bookband" })}
              >
                Book an Audit
                <ArrowRight />
              </a>
              <ul className="bb-tags" aria-label="Audit focus areas">
                <li>Core Web Vitals</li>
                <li>Conversion UX</li>
                <li>Actionable Next Steps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="audit-form" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
        <div className="wrap" style={{ marginBottom: "clamp(36px,4vw,56px)" }}>
          <span className="eyebrow rv">Audit Request</span>
        </div>
        <div className="wrap cgrid">
          <aside className="cinfo rv">
            <div className="iblk">
              <h4>Email</h4>
              <a href="mailto:zoenexstudios@gmail.com">zoenexstudios@gmail.com</a>
              <p className="sub">Direct engineering & studio enquiries</p>
            </div>
            <div className="iblk">
              <h4>Studio</h4>
              <p>Mumbai, India</p>
              <p className="sub">Remote-first, working worldwide</p>
            </div>
            <div className="iblk">
              <h4>What happens next</h4>
              <p>Engineering review</p>
              <p className="sub">We review your submission and follow up with practical findings and next steps.</p>
            </div>
            <div className="iblk">
              <h4>General Inquiry?</h4>
              <p style={{ fontSize: "15px", fontWeight: 500 }}>
                Looking to send a project brief instead?
              </p>
              <p className="sub" style={{ marginTop: "8px" }}>
                <Link href="/contact" style={{ color: "var(--cobalt)", textDecoration: "underline" }}>
                  Visit our general contact page →
                </Link>
              </p>
            </div>
            <div className="iblk">
              <h4>Terms</h4>
              <p style={{ fontSize: "15px", fontWeight: 500 }}>Fixed quotes · milestone billing</p>
              <p className="sub">Contract on every project · NDA on request</p>
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
                  Full name <em>*</em>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="e.g. Alex Morgan"
                  required
                  aria-required="true"
                  aria-invalid={errors.name ? "true" : undefined}
                  className={errors.name ? "error" : undefined}
                  onInput={() => clearError("name")}
                  onFocus={handleFieldInteraction}
                />
                <span className={`ferr${errors.name ? " show" : ""}`} role="alert">
                  Please enter your full name.
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
                  placeholder="e.g. alex@company.com"
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? "true" : undefined}
                  className={errors.email ? "error" : undefined}
                  onInput={() => clearError("email")}
                  onFocus={handleFieldInteraction}
                />
                <span className={`ferr${errors.email ? " show" : ""}`} role="alert">
                  Please enter a valid work email address.
                </span>
              </div>

              <div className="field full">
                <label htmlFor="website">
                  Company name or website URL <em>*</em>
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  placeholder="e.g. company.com or Company Name"
                  required
                  aria-required="true"
                  aria-invalid={errors.website ? "true" : undefined}
                  className={errors.website ? "error" : undefined}
                  onInput={() => clearError("website")}
                  onFocus={handleFieldInteraction}
                />
                <span className={`ferr${errors.website ? " show" : ""}`} role="alert">
                  Please enter your website URL or company name.
                </span>
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
                  Audit type <em style={{ color: "var(--cobalt)", fontStyle: "normal" }}>*</em>
                </span>
                <div className="pills">
                  {AUDIT_TYPES.map((a) => (
                    <Fragment key={a.id}>
                      <input
                        type="radio"
                        id={a.id}
                        name="auditType"
                        value={a.value}
                        checked={selectedAuditType === a.value}
                        onChange={() => {
                          setSelectedAuditType(a.value);
                          clearError("auditType");
                        }}
                      />
                      <label htmlFor={a.id}>{a.label}</label>
                    </Fragment>
                  ))}
                </div>
                <span className={`ferr${errors.auditType ? " show" : ""}`} role="alert">
                  Please select an audit type.
                </span>
              </div>

              <div className="field full">
                <label htmlFor="challenge">Main challenge (optional)</label>
                <input
                  type="text"
                  id="challenge"
                  name="challenge"
                  placeholder="e.g. Visitors bounce without submitting, high load times, low mobile leads"
                  onFocus={handleFieldInteraction}
                />
              </div>

              <div className="field full">
                <label htmlFor="details">Additional details (optional)</label>
                <textarea
                  id="details"
                  name="details"
                  placeholder="Specific pages to review, key metrics, current tech stack, or objectives you would like us to look into."
                  style={{ minHeight: "110px" }}
                  onFocus={handleFieldInteraction}
                />
              </div>

              <div className="ffoot">
                <button
                  type="submit"
                  className="btn btn-fill"
                  data-magnetic
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? "Submitting request..." : "Book an Audit"}
                  <ArrowRight />
                </button>
                <span className="mono-tag">
                  Submit your website and tell us what you want to improve. We&rsquo;ll review your request and follow up with the next steps.
                </span>
              </div>

              {submitError && (
                <span className="ferr show" style={{ marginTop: "14px", display: "block" }} role="alert">
                  {submitError}
                </span>
              )}
            </form>

            <div className={`fsuccess${sent ? " show" : ""}`} ref={successRef} role="status">
              <div className="ok">✓</div>
              <h3>Audit Request Received</h3>
              <p>
                Thanks — your website details are in our inbox. We&rsquo;ll review your request and follow up with the next steps.
              </p>
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
