import type { Metadata } from "next";

import RouteFrame from "@/components/layout/RouteFrame";
import { fontVariableClasses } from "./fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "HudaVerse — Your Journey to Allah",
  description:
    "AI-powered Islamic ecosystem — Quran, Hadith, Dua, Prayer, and more, all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full antialiased ${fontVariableClasses}`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <RouteFrame>{children}</RouteFrame>
      </body>
    </html>
  );
}
