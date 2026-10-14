import type { Metadata } from "next";
import BlogView from "@/components/views/BlogView";

export const metadata: Metadata = {
  title: "Insights & Engineering Blog",
  description:
    "Read technical guides on Next.js 15 web development, self-hosted n8n workflows, Core Web Vitals, and enterprise AI agents from Zoenex Studios.",
  alternates: {
    canonical: "https://zoenexstudios.in/blog",
  },
  openGraph: {
    title: "Insights & Engineering Blog | Zoenex Studios",
    description:
      "Read technical guides on Next.js 15 web development, self-hosted n8n workflows, Core Web Vitals, and enterprise AI agents from Zoenex Studios.",
    url: "https://zoenexstudios.in/blog",
    siteName: "Zoenex Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zoenex Studios Insights & Engineering Blog",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Engineering Blog | Zoenex Studios",
    description:
      "Actionable technical guides on Next.js 15, Core Web Vitals, and AI workflow automation.",
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
      name: "Blog & Insights",
      item: "https://zoenexstudios.in/blog",
    },
  ],
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogView />
    </>
  );
}
