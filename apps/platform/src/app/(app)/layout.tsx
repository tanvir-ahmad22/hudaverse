import type { ReactNode } from "react";
import { PlatformLayout } from "@/compositions";

export default function AppLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <PlatformLayout>{children}</PlatformLayout>;
}
