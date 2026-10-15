import type { Metadata } from "next";
import Link from "next/link";
import { LOCATIONS } from "@/lib/locations-data";
import BigCta from "@/components/BigCta";

export const metadata: Metadata = {
  title: "Global & Regional Locations",
  description:
    "Explore Zoenex Studios locations across India (Mumbai, Bengaluru, Delhi NCR, Pune) and global delivery hubs in Dubai, London, New York, and SF.",
  alternates: {
    canonical: "https://zoenexstudios.in/locations",
  },
  openGraph: {
    title: "Global & Regional Locations | Zoenex Studios",
    description:
      "Explore Zoenex Studios engineering hubs across India and international commercial delivery centers.",
    url: "https://zoenexstudios.in/locations",
    siteName: "Zoenex Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zoenex Studios Locations",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global & Regional Locations | Zoenex Studios",
    description:
      "High-performance Next.js web development and AI automation studio serving India and global capitals.",
    images: ["/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://zoenexstudios.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Locations",
      item: "https://zoenexstudios.in/locations",
    },
  ],
};

export default function LocationsIndexPage() {
  const domestic = LOCATIONS.filter((l) => l.type === "Domestic Hub");
  const international = LOCATIONS.filter((l) => l.type === "International Delivery");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="view active">
        <section className="page-hero">
          <div className="wrap">
            <span className="eyebrow rv">Worldwide & Regional Coverage</span>
            <h1 className="h-mega rv" style={{ marginTop: "22px" }}>
              Engineered locally,
              <br />
              <span className="accent">shipped globally</span>
              <em className="accent">.</em>
            </h1>
            <p className="lede rv" style={{ maxWidth: "52ch" }}>
              Zoenex Studios is headquartered in Mumbai, India, delivering bespoke Next.js websites, custom web apps, and automated workflows to teams across India and international capitals.
            </p>
          </div>
        </section>

        {/* Domestic Hubs */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow rv">India Delivery & Engineering</span>
              <div className="row">
                <h2 className="h-xl rv">Domestic Hubs</h2>
                <p className="lede rv" style={{ maxWidth: "42ch" }}>
                  Same-day alignment, sub-second performance budgets, and high-converting architectures for Indian business leaders.
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginTop: "32px" }}>
              {domestic.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="wcard s4 rv"
                  style={{ textDecoration: "none", padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                >
                  <div>
                    <span className="mono-tag" style={{ color: "var(--brand-accent)" }}>{loc.heroTag}</span>
                    <h3 style={{ fontSize: "1.4rem", marginTop: "14px", marginBottom: "10px", color: "var(--paper-text)" }}>
                      Web Developers in {loc.name}
                    </h3>
                    <p style={{ fontSize: "0.92rem", color: "var(--paper-text-muted)", lineHeight: 1.6 }}>
                      {loc.heroDescription}
                    </p>
                  </div>
                  <div style={{ marginTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--paper-border-muted)", paddingTop: "14px" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--brand-accent)", fontWeight: 600 }}>
                      Explore {loc.name} Hub →
                    </span>
                    <span className="mono-tag">{loc.timezone}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* International Hubs */}
        <section className="sec on-night" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow rv">Global Client Partnerships</span>
              <div className="row">
                <h2 className="h-xl rv">International Hubs</h2>
                <p className="lede rv" style={{ maxWidth: "42ch" }}>
                  Boutique craftsmanship, direct senior engineering, and generous timezone overlap for US, UK, UAE, and APAC founders.
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginTop: "32px" }}>
              {international.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="wcard s4 rv"
                  style={{ textDecoration: "none", padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "var(--paper-surface-dark)" }}
                >
                  <div>
                    <span className="mono-tag" style={{ color: "var(--brand-accent)" }}>{loc.heroTag}</span>
                    <h3 style={{ fontSize: "1.4rem", marginTop: "14px", marginBottom: "10px", color: "var(--paper-on-night)" }}>
                      Web Developers for {loc.name}
                    </h3>
                    <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                      {loc.heroDescription}
                    </p>
                  </div>
                  <div style={{ marginTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "14px" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--brand-accent)", fontWeight: 600 }}>
                      View {loc.name} Delivery →
                    </span>
                    <span className="mono-tag" style={{ color: "rgba(255,255,255,0.6)" }}>{loc.timezone}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <BigCta
          ghost="LOC"
          badge="Global Inquiries Open — Q4 2026"
          titleTop="Let's build your next"
          titleSwipe="unfair advantage."
          lede="No matter where your team operates, our senior full-stack developers deliver sub-second websites and automated systems that move numbers."
          cta="Book an Audit"
          href="/audit"
          reassure={[
            "Global timezone overlap",
            "Fixed-scope sprint quote",
            "NDA on request",
            "Reply within 1 business day",
          ]}
        />
      </div>
    </>
  );
}
