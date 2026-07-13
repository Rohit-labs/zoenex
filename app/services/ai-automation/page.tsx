import type { Metadata } from "next";
import AutomationServiceView from "@/components/views/AutomationServiceView";

export const metadata: Metadata = {
  title: "AI Automation — Zoenex Studios",
  description:
    "Custom AI agents, chatbots and workflow systems that take repetitive operations off your team. Our workflow: process audit, guardrails, shadow-mode build, supervised launch, ongoing optimisation.",
};

export default function AiAutomationPage() {
  return <AutomationServiceView />;
}
