import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Contact — Zoenex Studios",
  description:
    "Tell Zoenex Studios what should move. Two minutes of your time, one business day for our reply — AI automation, websites and motion design.",
};

export default function ContactPage() {
  return <ContactView />;
}
