import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";

export const metadata: Metadata = {
  title: "Zoenex Studios | Web Development, AI Automation & Digital Solutions",
  description:
    "Zoenex Studios builds modern websites, AI-powered solutions, and business automation systems that help businesses grow and operate smarter.",
};

export default function HomePage() {
  return <HomeView />;
}
