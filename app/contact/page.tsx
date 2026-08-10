import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Contact Our Team | Zoenex Studios",
  description:
    "Get in touch with Zoenex Studios for custom web development, AI solutions, business automation, and digital design queries. Quick response times.",
};

export default function ContactPage() {
  return <ContactView />;
}
