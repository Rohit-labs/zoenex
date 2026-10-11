"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useViewAnimations } from "@/lib/useViewAnimations";
import { BLOG_POSTS, BlogPost } from "@/lib/blog-data";
import BigCta from "../BigCta";
import { ArrowRight, ArrowUpRight } from "../icons";

const CATEGORIES = ["All", "Web Development", "AI & Automation", "Performance & SEO"] as const;
type Category = (typeof CATEGORIES)[number];

export default function BlogView() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  useViewAnimations(ref);

  const filteredPosts =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featured = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  const gridPosts = filteredPosts.filter((p) => (activeCategory === "All" ? p.slug !== featured.slug : true));

  return (
    <div className="view active" ref={ref}>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow rv">Insights & Strategy</span>
          <h1 className="h-mega rv" style={{ marginTop: "22px" }} aria-label="Web Development & AI Automation Insights | Zoenex Studios">
            Engineering<em>.</em>
            <br />
            Automation<em>.</em>
          </h1>
          <p className="lede rv">
            Actionable technical guides on Next.js 15 web performance, self-hosted n8n workflows, Core Web Vitals optimization, and autonomous AI agents for modern B2B businesses.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {/* Category Filter Pills */}
          <div className="rv" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  borderRadius: "100px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  border: activeCategory === cat ? "1px solid var(--cobalt)" : "1px solid var(--ink-12)",
                  background: activeCategory === cat ? "var(--cobalt)" : "transparent",
                  color: activeCategory === cat ? "#fff" : "var(--ink)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post (shown when 'All' is selected) */}
          {activeCategory === "All" && (
            <div className="rv" style={{ marginBottom: "50px" }}>
              <Link
                href={`/blog/${featured.slug}`}
                className="casestudy"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 0.9fr",
                  background: "var(--night)",
                  color: "var(--paper-on-night)",
                  borderColor: "var(--line-night)",
                }}
              >
                <div style={{ padding: "clamp(32px, 4vw, 56px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8EA0FF" }}>
                      Featured · {featured.category}
                    </span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--paper-on-night-50)" }}>
                      {featured.readTime}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "clamp(26px, 2.6vw, 38px)", textTransform: "uppercase", lineHeight: 1.1, marginBottom: "16px" }}>
                    {featured.title}
                  </h2>
                  <p style={{ color: "var(--paper-on-night-50)", fontSize: "15px", lineHeight: 1.6, marginBottom: "26px" }}>
                    {featured.excerpt}
                  </p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#8EA0FF", fontFamily: "var(--mono)", fontSize: "13px" }}>
                    Read article <ArrowRight />
                  </span>
                </div>
                <div
                  className="art art-grid3d"
                  style={{
                    position: "relative",
                    minHeight: "280px",
                    borderLeft: "1px solid var(--line-night)",
                  }}
                >
                  <span className="art-label">Architecture</span>
                </div>
              </Link>
            </div>
          )}

          {/* Article Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "28px",
            }}
          >
            {gridPosts.map((post) => (
              <article
                key={post.slug}
                className="rv"
                style={{
                  border: "1px solid var(--ink-12)",
                  borderRadius: "18px",
                  padding: "clamp(24px, 3vw, 32px)",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.3s ease",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cobalt)" }}>
                      {post.category}
                    </span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--ink-60)" }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "clamp(19px, 1.8vw, 24px)", textTransform: "uppercase", lineHeight: 1.15, marginBottom: "14px" }}>
                    <Link href={`/blog/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {post.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: "14.5px", color: "var(--ink-60)", lineHeight: 1.55, marginBottom: "22px" }}>
                    {post.excerpt}
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "18px", borderTop: "1px solid var(--ink-12)" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "11.5px", color: "var(--ink-60)" }}>
                    {post.date}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "var(--mono)",
                      fontSize: "12px",
                      color: "var(--cobalt)",
                      fontWeight: 600,
                    }}
                  >
                    Read <ArrowUpRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BigCta
        ghost="AUDIT"
        badge="Ready to optimize?"
        titleTop="Turn insights into"
        titleSwipe="working systems."
        lede="Get a practical review of your website, conversion experience, and opportunities for improvement. Submit your site for an audit."
        cta="Book an Audit"
      />
    </div>
  );
}
