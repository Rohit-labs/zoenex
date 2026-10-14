import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Contact Our Team",
  description:
    "Get in touch with Zoenex Studios for custom web development and AI business automation. Send a brief to get a reply within one business day.",
  alternates: {
    canonical: "https://zoenexstudios.in/contact",
  },
  openGraph: {
    title: "Contact Our Team | Zoenex Studios",
    description:
      "Get in touch with Zoenex Studios for custom web development and AI business automation. Send a brief to get a reply within one business day.",
    url: "https://zoenexstudios.in/contact",
    siteName: "Zoenex Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Zoenex Studios",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Our Team | Zoenex Studios",
    description:
      "Get in touch with Zoenex Studios to discuss your next web build or automation workflow.",
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
      name: "Contact",
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
