"use client";

import "./globals.css";

import SystemStatusPage from "@/components/system/SystemStatusPage";
import { fontVariableClasses } from "./fonts";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en" className={`h-full antialiased ${fontVariableClasses}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <main className="flex flex-1">
          <SystemStatusPage type="application-error" onRetry={reset} />
        </main>
      </body>
    </html>
  );
}
