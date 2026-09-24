import type { Metadata } from "next";
import WorkView from "@/components/views/WorkView";

export const metadata: Metadata = {
  title: "Our Portfolio & Case Studies | Zoenex Studios",
  description:
    "Explore our portfolio of web development and AI automation workflows delivered for B2B teams worldwide. View live client builds and interactive project demos.",
  alternates: {
    canonical: "https://zoenexstudios.in/work",
  },
  openGraph: {
    title: "Our Portfolio & Case Studies | Zoenex Studios",
    description:
      "Explore our portfolio of web development and AI automation workflows delivered for B2B teams worldwide.",
    url: "https://zoenexstudios.in/work",
    siteName: "Zoenex Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zoenex Studios Work Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Portfolio & Case Studies | Zoenex Studios",
    description:
      "Explore selected web development and AI automation case studies and live interactive projects by Zoenex Studios.",
    images: ["/og-image.jpg"],
  },
};

export default function WorkPage() {
  return <WorkView />;
}
