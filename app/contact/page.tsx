import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Contact Our Team | Zoenex Studios",
  description:
    "Get in touch with Zoenex Studios for custom web development, AI solutions, business automation, and digital design queries. Book a 20-minute call or send a project brief.",
  alternates: {
    canonical: "https://zoenexstudios.in/contact",
  },
  openGraph: {
    title: "Contact Our Team | Zoenex Studios",
    description:
      "Get in touch with Zoenex Studios for custom web development, AI solutions, business automation, and digital design queries.",
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
      "Book a 20-minute discovery call or send a brief to get a custom quote within one business day.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactPage() {
  return <ContactView />;
}
