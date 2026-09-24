import type { Metadata } from "next";
import WebsitesServiceView from "@/components/views/WebsitesServiceView";

export const metadata: Metadata = {
  title: "Web Development & Custom Web Applications in Mumbai | Zoenex Studios",
  description:
    "Zoenex Studios builds fast, conversion-focused websites, web applications, and e-commerce platforms for businesses in Mumbai and globally. Optimized for Core Web Vitals and local SEO.",
  alternates: {
    canonical: "https://zoenexstudios.in/services/websites",
  },
  openGraph: {
    title: "Web Development & Custom Web Applications in Mumbai | Zoenex Studios",
    description:
      "Zoenex Studios builds fast, conversion-focused websites, web applications, and e-commerce platforms for businesses in Mumbai and globally.",
    url: "https://zoenexstudios.in/services/websites",
    siteName: "Zoenex Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zoenex Studios Web Development Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development & Custom Web Applications in Mumbai | Zoenex Studios",
    description:
      "High-performance websites, custom web apps, and design systems built to convert traffic into leads.",
    images: ["/og-image.jpg"],
  },
};

export default function WebsitesPage() {
  return <WebsitesServiceView />;
}
