import type { Metadata } from "next";
import WebsitesServiceView from "@/components/views/WebsitesServiceView";

export const metadata: Metadata = {
  title: "Web Development & Custom Web Applications in Mumbai | Zoenex Studios",
  description:
    "Zoenex Studios builds fast, conversion-focused websites, web applications, and e-commerce platforms for businesses in Mumbai.",
  alternates: {
    canonical: "https://zoenexstudios.in/services/websites",
  },
};

export default function WebsitesPage() {
  return <WebsitesServiceView />;
}
