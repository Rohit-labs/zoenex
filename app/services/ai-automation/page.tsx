import type { Metadata } from "next";
import AutomationServiceView from "@/components/views/AutomationServiceView";

export const metadata: Metadata = {
  title: "AI Automation & Workflow Solutions | Zoenex Studios",
  description:
    "Automate repetitive business workflows with custom AI agents, chatbots, CRM integrations, and intelligent automation from Zoenex Studios.",
  alternates: {
    canonical: "https://zoenexstudios.in/services/ai-automation",
  },
};

export default function AiAutomationPage() {
  return <AutomationServiceView />;
}
