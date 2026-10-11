"use client";

import Link from "next/link";
import { useRef } from "react";
import { useViewAnimations } from "@/lib/useViewAnimations";
import { BlogPost } from "@/lib/blog-data";
import BigCta from "../BigCta";
import { ArrowRight, ArrowUpRight } from "../icons";
import { trackEvent } from "@/lib/analytics";

interface Props {
  post: BlogPost;
}

export default function BlogPostView({ post }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useViewAnimations(ref);

  return (
    <div className="view active" ref={ref}>
      <article className="page-hero" style={{ paddingBottom: "20px" }}>
        <div className="wrap" style={{ maxWidth: "860px" }}>
          {/* Back link & Meta */}
          <div className="rv" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ink-60)",
              }}
            >
              ← Back to Insights
            </Link>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cobalt)" }}>
                {post.category}
              </span>
              <span style={{ color: "var(--ink-12)" }}>·</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--ink-60)" }}>
                {post.readTime}
              </span>
            </div>
          </div>

          <h1 className="h-mega rv" style={{ fontSize: "clamp(32px, 3.8vw, 56px)", lineHeight: 1.08, marginBottom: "24px" }}>
            {post.title}
          </h1>

          <div className="rv" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid var(--ink-12)" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--ink-60)" }}>
              By <b>{post.author}</b>
            </span>
            <span style={{ color: "var(--ink-12)" }}>·</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--ink-60)" }}>
              Published {post.date}
            </span>
          </div>

          {/* Topic Cluster Bridge (linking to commercial service) */}
          <div
            className="rv"
            style={{
              padding: "18px 24px",
              background: "rgba(31, 59, 234, 0.05)",
              border: "1px solid rgba(31, 59, 234, 0.2)",
              borderRadius: "14px",
              marginBottom: "40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "14px", color: "var(--ink)" }}>
              Explore how Zoenex Studios executes this in production:
            </span>
            <Link
              href={post.serviceLink.url}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--cobalt)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {post.serviceLink.label} <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Intro */}
          <p className="lede rv" style={{ fontSize: "clamp(18px, 1.6vw, 22px)", lineHeight: 1.6, marginBottom: "40px" }}>
            {post.content.intro}
          </p>

          {/* Article Sections */}
          <div style={{ display: "grid", gap: "44px" }}>
            {post.content.sections.map((section, idx) => (
              <section key={idx} className="rv">
                <h2 style={{ fontSize: "clamp(22px, 2.2vw, 30px)", textTransform: "uppercase", lineHeight: 1.15, marginBottom: "18px" }}>
                  {section.heading}
                </h2>
                <div style={{ display: "grid", gap: "16px", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-80, #333)" }}>
                  {section.body.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
                {section.takeaway && (
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "16px 20px",
                      borderLeft: "3px solid var(--cobalt)",
                      background: "rgba(20, 19, 17, 0.03)",
                      borderRadius: "0 10px 10px 0",
                      fontFamily: "var(--mono)",
                      fontSize: "13px",
                      color: "var(--ink)",
                    }}
                  >
                    <b>Key Takeaway:</b> {section.takeaway}
                  </div>
                )}
              </section>
            ))}

            {/* Conclusion */}
            <section className="rv" style={{ paddingTop: "20px", borderTop: "1px solid var(--ink-12)" }}>
              <h2 style={{ fontSize: "clamp(20px, 2vw, 26px)", textTransform: "uppercase", marginBottom: "16px" }}>
                Strategic Conclusion
              </h2>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--ink-80, #333)", marginBottom: "32px" }}>
                {post.content.conclusion}
              </p>

              <div
                style={{
                  background: "var(--night)",
                  color: "var(--paper-on-night)",
                  padding: "clamp(28px, 3.5vw, 40px)",
                  borderRadius: "18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "20px", textTransform: "uppercase", marginBottom: "8px" }}>
                    Ready to modernize your digital stack?
                  </h3>
                  <p style={{ color: "var(--paper-on-night-50)", fontSize: "14px", margin: 0 }}>
                    Discuss your project scope directly with the Zoenex engineering team.
                  </p>
                </div>
                <Link
                  href="/audit"
                  className="btn btn-fill"
                  data-magnetic
                  style={{ background: "var(--cobalt)", borderColor: "var(--cobalt)" }}
                  onClick={() => trackEvent("audit_cta_click", { location: "blog_post_inline" })}
                >
                  Book an Audit
                  <ArrowRight />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>

      <BigCta
        ghost="AUDIT"
        badge="Direct Engineering Access"
        titleTop="Let's optimize"
        titleSwipe="what works."
        lede="Get a practical review of your website, conversion experience, and opportunities for improvement."
        cta="Book an Audit"
      />
    </div>
  );
}
