import type { Metadata } from "next";
import AuditView from "@/components/views/AuditView";

export const metadata: Metadata = {
  title: "Book a Website Audit",
  description:
    "Request a practical review of your website, conversion experience, and automation opportunities. Book an audit teardown with Zoenex Studios.",
  alternates: {
    canonical: "https://zoenexstudios.in/audit",
  },
  openGraph: {
    title: "Book a Website Audit | Zoenex Studios",
    description:
      "Request a practical review of your website, conversion experience, and automation opportunities. Book an audit teardown with Zoenex Studios.",
    url: "https://zoenexstudios.in/audit",
    siteName: "Zoenex Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Book a Website Audit with Zoenex Studios",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Website Audit | Zoenex Studios",
    description:
      "Request a practical review of your website, conversion experience, and opportunities for improvement.",
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
      name: "Book an Audit",
      item: "https://zoenexstudios.in/audit",
    },
  ],
};

export default function AuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AuditView />
    </>
  );
}
