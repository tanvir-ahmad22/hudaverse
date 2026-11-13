import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVariableClasses } from "./fonts";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "HudaVerse",
  description: "HudaVerse core platform.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`h-full antialiased ${fontVariableClasses}`}
    >
      <head><meta charSet="utf-8" /></head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
