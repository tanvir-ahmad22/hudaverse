// Copied from apps/web/components/layout/navbar/Logo.tsx on 2026-11-12.
// Platform copy retains wordmark, proportions, colors and tagline; motion is static to avoid new dependencies.
import Image from "next/image";
import { useTranslations } from "@/core/i18n";

export function Logo({ tone = "light", compact = false }: { tone?: "light" | "dark"; compact?: boolean }) {
  const { home } = useTranslations();
  return (
    <div className="hv-logo" aria-label="HudaVerse">
      <Image src="/hudaverse-logo-mark.png" alt="" width={64} height={64} priority draggable={false} />
      <span className="hv-logo__text">
        <span className="hv-logo__name" aria-label="HudaVerse">
          <span className={tone === "light" ? "hv-logo__light" : "hv-logo__dark"}>Huda</span>
          <span className={tone === "light" ? "hv-logo__gold" : "hv-logo__dark hv-logo__verse"}>Verse</span>
        </span>
        {!compact && <span className={tone === "light" ? "hv-logo__tagline hv-logo__tagline--dark" : "hv-logo__tagline"}>{home.tagline}</span>}
      </span>
    </div>
  );
}
