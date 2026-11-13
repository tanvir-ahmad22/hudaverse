"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/shell";
import { getUserSummary } from "@/features/user";
import { getHomeViewModel, HomeDashboard } from "@/features/home";
import { useLanguage } from "@/core/i18n";

export function PlatformLayout({ children }: { children: ReactNode }) {
  return <AppShell user={getUserSummary()}>{children}</AppShell>;
}

export function HomePage() {
  const user = getUserSummary();
  const { language } = useLanguage();
  return <HomeDashboard viewModel={getHomeViewModel(user.displayName, new Date(), language)} />;
}
