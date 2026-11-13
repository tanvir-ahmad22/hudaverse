"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/Footer";

const AUTH_ROUTES = new Set(["/login", "/get-started", "/forgot-password", "/reset-password", "/verify-email"]);

export default function RouteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (AUTH_ROUTES.has(pathname)) return <div className="min-h-dvh">{children}</div>;
  return <><Navbar /><main className="flex-1">{children}</main><Footer /></>;
}
