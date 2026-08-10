import type { Metadata } from "next";
import WorkView from "@/components/views/WorkView";

export const metadata: Metadata = {
  title: "Our Portfolio & Case Studies | Zoenex Studios",
  description:
    "Explore our portfolio of web development, AI automation workflows, and motion design projects delivered for B2B teams worldwide.",
};

export default function WorkPage() {
  return <WorkView />;
}
