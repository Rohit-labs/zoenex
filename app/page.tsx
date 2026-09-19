import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";

export const metadata: Metadata = {
  title: "Web Developers in Mumbai | AI Automation & Design | Zoenex Studios",
  description:
    "Zoenex Studios builds high-performance websites, AI automation systems, and web applications for businesses in Mumbai and beyond.",
  alternates: {
    canonical: "https://zoenexstudios.in/",
  },
};

export default function HomePage() {
  return <HomeView />;
}
