import type { Metadata } from "next";
import WebsitesServiceView from "@/components/views/WebsitesServiceView";

export const metadata: Metadata = {
  title: "Web Development & Custom Web Applications",
  description:
    "Zoenex Studios designs fast, conversion-focused websites, custom web apps, and e-commerce platforms. Explore our live builds and web portfolio.",
  alternates: {
    canonical: "https://zoenexstudios.in/services/websites",
  },
  openGraph: {
    title: "Web Development, Custom Web Applications & Portfolio | Zoenex Studios",
    description:
      "Explore our web development portfolio, live client builds, and custom web applications delivered by Zoenex Studios.",
    url: "https://zoenexstudios.in/services/websites",
    siteName: "Zoenex Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zoenex Studios Web Development Services & Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development, Custom Web Applications & Portfolio | Zoenex Studios",
    description:
      "High-performance websites, custom web apps, and live client builds by Zoenex Studios.",
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
      name: "Websites & Development",
      item: "https://zoenexstudios.in/services/websites",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Web Development & High-Performance Web Applications",
  serviceType: "Web Development",
  provider: {
    "@type": "ProfessionalService",
    name: "Zoenex Studios",
    url: "https://zoenexstudios.in",
  },
  areaServed: ["Mumbai", "India", "United States", "United Kingdom", "United Arab Emirates"],
  description: "High-performance websites, custom web applications, Next.js engineering, and conversion-focused web development.",
};

export default function WebsitesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, serviceSchema]) }}
      />
      <WebsitesServiceView />
    </>
  );
}
