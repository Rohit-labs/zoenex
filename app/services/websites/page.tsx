import type { Metadata } from "next";
import WebsitesServiceView from "@/components/views/WebsitesServiceView";

export const metadata: Metadata = {
  title: "Websites & Product — Zoenex Studios",
  description:
    "Fast, conversion-focused marketing sites and web apps built end to end. Our workflow: discovery & strategy, design in the browser, performance-budget build, QA & launch, grow & iterate.",
};

export default function WebsitesPage() {
  return <WebsitesServiceView />;
}
