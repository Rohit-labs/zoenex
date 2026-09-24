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

export default function AiAutomationPage() {
  return <AutomationServiceView />;
}
