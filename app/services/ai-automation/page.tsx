import type { Metadata } from "next";
import AutomationServiceView from "@/components/views/AutomationServiceView";

export const metadata: Metadata = {
  title: "AI Automation & Workflow Solutions | Zoenex Studios",
  description:
    "Automate repetitive business workflows with custom AI solutions. Zoenex Studios builds custom AI agents, chatbots, CRM integrations, and automated operations.",
};

export default function AiAutomationPage() {
  return <AutomationServiceView />;
}
