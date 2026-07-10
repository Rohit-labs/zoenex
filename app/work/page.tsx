import type { Metadata } from "next";
import WorkView from "@/components/views/WorkView";

export const metadata: Metadata = {
  title: "Work — Zoenex Studios",
  description:
    "Selected projects by Zoenex Studios — automation systems, websites and films, each one measured against the number that mattered to the client.",
};

export default function WorkPage() {
  return <WorkView />;
}
