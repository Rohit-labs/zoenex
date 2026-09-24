import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";

export const metadata: Metadata = {
  title: "Web Developers in Mumbai | AI Automation & Design | Zoenex Studios",
  description:
    "Zoenex Studios builds high-performance websites, AI automation systems, and web applications for businesses in Mumbai and beyond. Get custom web solutions and automated workflows.",
  alternates: {
    canonical: "https://zoenexstudios.in",
  },
  openGraph: {
    title: "Web Developers in Mumbai | AI Automation & Design | Zoenex Studios",
    description:
      "Zoenex Studios builds high-performance websites, AI automation systems, and web applications for businesses in Mumbai and beyond.",
    url: "https://zoenexstudios.in",
    siteName: "Zoenex Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zoenex Studios - Web Development & AI Automation",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Developers in Mumbai | AI Automation & Design | Zoenex Studios",
    description:
      "High-performance websites, custom AI solutions, and automated workflows built for modern businesses.",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  return <HomeView />;
}
