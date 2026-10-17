"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useViewAnimations } from "@/lib/useViewAnimations";
import { TEAM_MEMBERS, TeamMember } from "@/lib/team-data";
import BigCta from "../BigCta";
import { ArrowRight, ArrowUpRight, LinkedInIcon, MailIcon } from "../icons";
import { trackEvent } from "@/lib/analytics";

export default function TeamView() {
  const ref = useRef<HTMLDivElement>(null);
  useViewAnimations(ref);

  const founders = TEAM_MEMBERS.filter((m) => m.isFounder);
  const additionalMembers = TEAM_MEMBERS.filter((m) => !m.isFounder);

  return (
    <div className="view active" ref={ref}>
      {/* ---------- page hero ---------- */}
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow rv">Studio Leadership · The People Behind Zoenex</span>
          <h1
            className="h-mega rv"
            style={{ marginTop: "22px" }}
            aria-label="Our Team & Founders | Zoenex Studios"
          >
            THE MINDS
            <br />
            BEHIND THE
            <br />
            <em>CRAFT.</em>
          </h1>
          <p className="lede rv">
            Zoenex Studios is driven by direct engineering and hands-on technical craftsmanship.
            We don&rsquo;t employ middle-tier account managers or outsource our core code &mdash; you collaborate directly
            with the builders designing your web architecture and automating your business operations.
          </p>
          <div className="team-badges rv">
            <span>Mumbai, India HQ</span>
            <span>Founder-Led Engineering</span>
            <span>Full-Stack & Applied AI</span>
            <span>100% Bespoke Code</span>
          </div>
        </div>
      </section>

      {/* ---------- founders spotlight ---------- */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">Leadership Spotlight</span>
            <div className="row">
              <h2 className="h-xl rv">
                Built by
                <br />
                Builders<em>.</em>
              </h2>
              <p className="lede rv" style={{ maxWidth: "44ch" }}>
                Every line of code, interaction curve, and automated pipeline is shaped with intention.
                Meet our founding technical leadership.
              </p>
            </div>
          </div>

          {/* Founders Spotlight Cards */}
          <div style={{ display: "grid", gap: "clamp(36px, 5vw, 64px)" }}>
            {founders.map((founder, idx) => (
              <article className="team-spotlight rv" key={founder.id}>
                <div className="team-portrait">
                  <Image
                    src={founder.image}
                    alt={`${founder.name} — ${founder.role}`}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 960px) 280px, 320px"
                    className="team-portrait-img"
                  />
                  <span className="team-portrait-badge">Active Founder · Mumbai Desk</span>
                </div>

                <div className="team-dossier">
                  <div className="team-dossier-top">
                    <span className="team-code">ZNX / FOUNDER · {String(idx + 1).padStart(2, "0")}</span>
                    <span className="mono-tag">{founder.location}</span>
                  </div>

                  <h2>{founder.name}</h2>
                  <p className="team-tagline">{founder.tagline}</p>

                  <div className="team-bio">
                    {founder.detailedBio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="team-specs">
                    <span className="team-specs-label">Core Technical Domains</span>
                    <ul className="team-tags">
                      {founder.specialties.map((spec) => (
                        <li key={spec}>{spec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="team-actions">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-social-btn"
                      data-magnetic
                      onClick={() => trackEvent("social_click", { network: "linkedin", profile: founder.id })}
                    >
                      <LinkedInIcon />
                      LinkedIn Profile
                      <ArrowUpRight size={13} />
                    </a>

                    <Link
                      href="/contact"
                      className="btn btn-fill"
                      data-magnetic
                      onClick={() => trackEvent("contact_cta_click", { location: `team_founder_${founder.id}` })}
                    >
                      Work with {founder.name.split(" ")[0]}
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Dynamic Grid for Additional Founders / Members */}
          {additionalMembers.length > 0 && (
            <div className="team-grid">
              {additionalMembers.map((member: TeamMember, index: number) => (
                <article className="team-card rv" key={member.id}>
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "16/10",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "var(--night)",
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "12px",
                        background: "rgba(13,12,10,.7)",
                        padding: "4px 10px",
                        borderRadius: "100px",
                        fontFamily: "var(--mono)",
                        fontSize: "10px",
                        letterSpacing: "0.12em",
                        color: "var(--paper-on-night)",
                        textTransform: "uppercase",
                      }}
                    >
                      {member.role}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ fontSize: "24px", textTransform: "uppercase" }}>{member.name}</h3>
                    <span className="mono-tag">ZNX / {String(index + 2).padStart(2, "0")}</span>
                  </div>

                  <p style={{ color: "var(--ink-60)", fontSize: "15px" }}>{member.bio}</p>

                  <ul className="team-tags">
                    {member.specialties.slice(0, 3).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-social-btn"
                      style={{ padding: "8px 16px", fontSize: "11px" }}
                      data-magnetic
                    >
                      <LinkedInIcon size={14} /> LinkedIn
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Studio Expansion / Collaboration Callout */}
          <div className="team-expand rv" style={{ marginTop: "clamp(36px, 5vw, 64px)" }}>
            <span className="eyebrow" style={{ color: "var(--ink-60)" }}>
              The Studio Roster
            </span>
            <h3>Expanding Our Founding Bench</h3>
            <p>
              Zoenex Studios pairs with specialized engineering leads, creative directors, and AI researchers across Mumbai and worldwide.
              More founding leaders and key team profiles will be unveiled here soon.
            </p>
            <Link
              href="/contact"
              className="btn btn-line"
              data-magnetic
              onClick={() => trackEvent("contact_cta_click", { location: "team_expansion_callout" })}
            >
              Collaborate With Us
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- engineering values (dark band) ---------- */}
      <section className="sec on-night scwork-band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv">The Zoenex Standard</span>
            <div className="row">
              <h2 className="h-xl rv">
                WHY FOUNDER-LED
                <br />
                MATTERS<em>.</em>
              </h2>
              <p className="lede rv" style={{ maxWidth: "44ch" }}>
                Traditional agencies sell with senior executives and deliver with junior subcontractors.
                We operate on an entirely different philosophy.
              </p>
            </div>
          </div>

          <div className="team-pillars-grid">
            <div className="team-pillar rv">
              <span className="n">01 / DIRECT DIALOGUE</span>
              <h3>No Middlemen</h3>
              <p>
                You communicate directly with the founders writing your code and architecting your systems.
                Every decision is fast, accurate, and technically sound.
              </p>
            </div>

            <div className="team-pillar rv">
              <span className="n">02 / ZERO TEMPLATES</span>
              <h3>Handcrafted Code</h3>
              <p>
                We do not use page-builder themes or bloated CMS templates. Everything is built natively with Next.js,
                TypeScript, and custom CSS tokens for flawless Core Web Vitals.
              </p>
            </div>

            <div className="team-pillar rv">
              <span className="n">03 / CONVERSION FIRST</span>
              <h3>Engineered for Growth</h3>
              <p>
                Visual elegance is table stakes. We measure success through conversion rates, fast checkout flows,
                and lead capture pipelines that accelerate revenue.
              </p>
            </div>

            <div className="team-pillar rv">
              <span className="n">04 / AUTONOMOUS SCALE</span>
              <h3>AI That Works</h3>
              <p>
                We build intelligent AI workflows and autonomous agents that eliminate repetitive back-office work,
                allowing small teams to operate with the leverage of large organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Big CTA ---------- */}
      <BigCta
        ghost="BUILD"
        badge="Ready to build? — Mumbai & Global"
        titleTop="Work directly with"
        titleSwipe="the builders."
        lede="Discuss your website architecture, high-performance web applications, or custom AI automation systems with our founding team. We reply within one business day."
        cta="Start a Conversation"
        href="/contact"
        reassure={[
          "Direct founder dialogue",
          "Fixed quotes & launch dates",
          "NDA on request",
          "Reply within 1 business day",
        ]}
      />
    </div>
  );
}
