import type { Metadata } from "next";
import WebsitesServiceView from "@/components/views/WebsitesServiceView";

export const metadata: Metadata = {
  title: "Web Development & Web Applications | Zoenex Studios",
  description:
    "Custom web development and design. Zoenex Studios builds fast, conversion-focused marketing websites, custom web applications, and e-commerce platforms.",
};

export default function WebsitesPage() {
  return <WebsitesServiceView />;
}
