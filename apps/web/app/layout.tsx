import type { Metadata } from "next";

import { Inter, Manrope, Amiri, Hind_Siliguri } from "next/font/google";

import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/Footer";

import "./globals.css";

// =================================
// HudaVerse Typography System
// =================================

// UI + Body Font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Heading Font
const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
});

// Quran / Hadith Arabic Font
const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

// Bangla Font
const hindSiliguri = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

// =================================
// Metadata
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
    <html
      lang="en"
      className={`
        ${inter.variable}
        ${manrope.variable}
        ${amiri.variable}
        ${hindSiliguri.variable}
        h-full
        antialiased
      `}
    >
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
