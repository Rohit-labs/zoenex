import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";

export const metadata: Metadata = {
  title: "Web Developers in Mumbai | AI Automation & Design | Zoenex Studios",
  description:
    "Zoenex Studios is a top-rated web development and AI automation studio in Mumbai, India. We build high-performance business websites, web applications, and intelligent workflows.",
};

export default function HomePage() {
  return <HomeView />;
}
