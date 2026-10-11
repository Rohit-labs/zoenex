import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Book an Audit & Contact | Zoenex Studios",
  description:
    "Request a practical review of your website, conversion experience, and automation opportunities. Book an audit with Zoenex Studios.",
  alternates: {
    canonical: "https://zoenexstudios.in/contact",
  },
  openGraph: {
    title: "Book an Audit & Contact | Zoenex Studios",
    description:
      "Get a practical review of your website, conversion experience, and opportunities for improvement. Book an audit with Zoenex Studios.",
    url: "https://zoenexstudios.in/contact",
    siteName: "Zoenex Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Book an Audit with Zoenex Studios",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book an Audit & Contact | Zoenex Studios",
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
      item: "https://zoenexstudios.in/contact",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactView />
    </>
  );
}
