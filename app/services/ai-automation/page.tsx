import type { Metadata } from "next";
import AutomationServiceView from "@/components/views/AutomationServiceView";

export const metadata: Metadata = {
  title: "AI Automation & Workflow Solutions | Zoenex Studios",
  description:
    "Automate repetitive business workflows with custom AI agents, chatbots, CRM integrations, and intelligent automation from Zoenex Studios. Reduce manual operations and scale faster.",
  alternates: {
    canonical: "https://zoenexstudios.in/services/ai-automation",
  },
  openGraph: {
    title: "AI Automation & Workflow Solutions | Zoenex Studios",
    description:
      "Automate repetitive business workflows with custom AI agents, chatbots, CRM integrations, and intelligent automation from Zoenex Studios.",
    url: "https://zoenexstudios.in/services/ai-automation",
    siteName: "Zoenex Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zoenex Studios AI Automation Solutions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation & Workflow Solutions | Zoenex Studios",
    description:
      "Custom AI agents, intelligent business automation, and CRM integrations that eliminate repetitive work.",
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
      name: "AI Automation",
      item: "https://zoenexstudios.in/services/ai-automation",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Business Automation & Workflow Engineering",
  name: "AI Business Automation & Workflow Engineering",
  provider: {
    "@type": "ProfessionalService",
    name: "Zoenex Studios",
    url: "https://zoenexstudios.in",
  },
  areaServed: ["Mumbai", "India", "United States", "United Kingdom", "United Arab Emirates"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Automation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Autonomous AI Agents",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "CRM Integrations & Workflow Pipelines (n8n/Make)",
        },
      },
    ],
  },
};

export default function AiAutomationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, serviceSchema]) }}
      />
      <AutomationServiceView />
    </>
  );
}
