import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About HudaVerse",
  description: "The vision, principles, and founder’s note behind HudaVerse.",
};

export default function AboutRoute() {
  return <AboutPage />;
}
