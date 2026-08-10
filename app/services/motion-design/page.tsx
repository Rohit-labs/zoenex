import type { Metadata } from "next";
import MotionServiceView from "@/components/views/MotionServiceView";

export const metadata: Metadata = {
  title: "Motion Design, Brand & Product Videos | Zoenex Studios",
  description:
    "Professional motion design services. We create high-quality brand launch films, product explainers, UI motion, and 3D social videos to engage your audience.",
};

export default function MotionDesignPage() {
  return <MotionServiceView />;
}
