import type { Metadata } from "next";

import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/Footer";

import "./globals.css";

// =================================
// HudaVerse Metadata
// =================================

export const metadata: Metadata = {
  title: "HudaVerse — Your Journey to Allah",

  description:
    "AI-powered Islamic ecosystem — Quran, Hadith, Dua, Prayer, and more, all in one place.",
};

// =================================
// Root Layout
// =================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        {/* Global Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
