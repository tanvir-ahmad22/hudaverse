"use client";

import SystemStatusPage from "@/components/system/SystemStatusPage";

export default function Error({ reset }: { reset: () => void }) {
  return <SystemStatusPage type="application-error" onRetry={reset} />;
}
