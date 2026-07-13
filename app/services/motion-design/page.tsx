import type { Metadata } from "next";
import MotionServiceView from "@/components/views/MotionServiceView";

export const metadata: Metadata = {
  title: "Motion Design — Zoenex Studios",
  description:
    "Brand films, product explainers, UI motion and social-first video. Our workflow: script & concept, styleframes & boards, animation & production, sound & polish, delivery & cutdowns.",
};

export default function MotionDesignPage() {
  return <MotionServiceView />;
}
