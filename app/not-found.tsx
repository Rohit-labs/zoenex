import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="view active"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "65vh",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <span
        className="eyebrow"
        style={{
          color: "var(--paper-brand)",
          fontSize: "1.1rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        404 error
      </span>
      <h1 className="h-xl" style={{ marginTop: "12px", marginBottom: "20px" }}>
        Page Not Found
      </h1>
      <p
        className="lede"
        style={{
          maxWidth: "45ch",
          color: "var(--paper-text-muted)",
          marginBottom: "36px",
        }}
      >
        The path you requested does not exist on our site. Agents looking for sitemaps or machine-readable docs can find recovery links below.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn btn-fill" data-magnetic>
          Go Home
        </Link>
        <Link href="/work" className="btn btn-line" data-magnetic>
          See Portfolio
        </Link>
      </div>
      <div
        style={{
          marginTop: "60px",
          paddingTop: "24px",
          borderTop: "1px solid var(--paper-border-muted)",
          fontSize: "0.85rem",
          color: "var(--paper-text-dim)",
        }}
      >
        AI Crawler / Agent resources:{" "}
        <Link href="/llms.txt" style={{ color: "var(--paper-brand)", textDecoration: "underline", marginRight: "12px" }}>
          llms.txt
        </Link>
        <Link href="/sitemap.xml" style={{ color: "var(--paper-brand)", textDecoration: "underline" }}>
          sitemap.xml
        </Link>
      </div>
    </div>
  );
}
