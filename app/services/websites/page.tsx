import type { Metadata } from "next";
import WebsitesServiceView from "@/components/views/WebsitesServiceView";

export const metadata: Metadata = {
  title: "Web Development & Custom Web Applications in Mumbai | Zoenex Studios",
  description:
    "Custom web development, design, and software engineering. Zoenex Studios builds fast, conversion-focused websites, custom web applications, and e-commerce platforms in Mumbai.",
};

export default function WebsitesPage() {
  return <WebsitesServiceView />;
}
