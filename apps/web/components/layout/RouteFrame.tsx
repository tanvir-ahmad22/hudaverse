"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import enNavbar from "@/locales/en/navbar";
import bnNavbar from "@/locales/bn/navbar";
import arNavbar from "@/locales/ar/navbar";
import urNavbar from "@/locales/ur/navbar";
import faNavbar from "@/locales/fa/navbar";
import trNavbar from "@/locales/tr/navbar";

const NAVBAR_LOCALES = { en: enNavbar, bn: bnNavbar, ar: arNavbar, ur: urNavbar, fa: faNavbar, tr: trNavbar };

const AUTH_ROUTES = new Set(["/login", "/get-started", "/forgot-password", "/reset-password", "/verify-email"]);

export default function RouteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentLang } = useLanguage();
  if (AUTH_ROUTES.has(pathname)) return <div className="min-h-dvh">{children}</div>;
  const copy = NAVBAR_LOCALES[currentLang];
  return <><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-[var(--surface)] focus:px-4 focus:py-3 focus:text-[var(--text-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">{copy.actions.skipToContent}</a><Navbar /><main id="main-content" className="flex-1">{children}</main><Footer /></>;
}
