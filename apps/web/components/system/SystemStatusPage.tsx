"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { isRTL, type LanguageCode } from "@/lib/language";
import { systemStatus as en } from "@/locales/en/system-status";
import { systemStatus as bn } from "@/locales/bn/system-status";
import { systemStatus as ar } from "@/locales/ar/system-status";
import { systemStatus as ur } from "@/locales/ur/system-status";
import { systemStatus as fa } from "@/locales/fa/system-status";
import { systemStatus as tr } from "@/locales/tr/system-status";

type StatusCopy = {
  actions: { home: string; explore: string; retry: string };
  notFound: { eyebrow: string; heading: string; message: string; note: string };
  unavailable: { eyebrow: string; heading: string; message: string; note: string };
  applicationError: { eyebrow: string; heading: string; message: string; note: string };
};
type PageStatus = "notFound" | "unavailable" | "applicationError";
type SystemStatusPageProps = {
  type: "not-found" | "application-error";
  onRetry?: () => void;
};

const copyByLanguage: Record<LanguageCode, StatusCopy> = { en, bn, ar, ur, fa, tr };
const localeFontClass: Record<LanguageCode, string> = {
  en: "font-sans",
  bn: "font-bangla",
  ar: "font-arabic",
  ur: "font-urdu",
  fa: "font-persian",
  tr: "font-sans",
};
const localizedHeadingFontClass: Partial<Record<LanguageCode, string>> = {
  bn: "font-bangla",
  ar: "font-arabic",
  ur: "font-urdu",
  fa: "font-persian",
};

const unavailablePaths = new Set([
  "/learn",
  "/knowledge",
  "/library",
  "/about",
  "/login",
  "/get-started",
  "/support",
]);

function isUnavailablePath(pathname: string | null) {
  const normalizedPath = pathname?.replace(/\/+$/, "") || "/";
  return unavailablePaths.has(normalizedPath);
}

export default function SystemStatusPage({ type, onRetry }: SystemStatusPageProps) {
  const pathname = usePathname();
  const { currentLang } = useLanguage();
  const copy = copyByLanguage[currentLang];
  const fontClass = localeFontClass[currentLang];
  const pageStatus: PageStatus = type === "application-error"
    ? "applicationError"
    : isUnavailablePath(pathname)
      ? "unavailable"
      : "notFound";
  const pageCopy = copy[pageStatus];

  return (
    <section
      lang={currentLang}
      dir={isRTL(currentLang) ? "rtl" : "ltr"}
      className={`hv-section isolate flex min-h-full items-center overflow-hidden bg-[var(--background)] ${fontClass}`}
      aria-labelledby="system-status-heading"
    >
      <Image
        src="/erorr-page-bg.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none z-0 object-cover object-[58%_center]"
      />
      <div className="hv-container relative z-10 w-full">
        <div className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl bg-[var(--surface)]/90 px-6 py-8 text-center shadow-xl sm:px-12 sm:py-10">
          <Image
            src="/logo-icon.png"
            alt="HudaVerse"
            width={512}
            height={512}
            className="mb-8 h-20 w-20 object-contain"
          />

          <p className="hv-tagline"><span className={currentLang === "en" || currentLang === "tr" ? "font-subheading" : fontClass}>{pageCopy.eyebrow}</span></p>
          <h1 id="system-status-heading" className="hv-h1 mt-4 max-w-2xl">
            <span className={localizedHeadingFontClass[currentLang]}>{pageCopy.heading}</span>
          </h1>
          <p className="hv-body mt-6 max-w-2xl text-[var(--text-muted)]">
            <span className={fontClass}>{pageCopy.message}</span>
          </p>
          <p className="hv-body-sm mt-4 max-w-xl text-[var(--text-muted)]">
            <span className={fontClass}>{pageCopy.note}</span>
          </p>

          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
            {pageStatus === "applicationError" ? (
              <Button type="button" variant="primary" onClick={onRetry}>
                <span className={fontClass}>{copy.actions.retry}</span>
              </Button>
            ) : (
              <Button href="/" variant="primary">
                <span className={fontClass}>{copy.actions.home}</span>
              </Button>
            )}
            <Button href="/explore" variant="primary-outline">
              <span className={fontClass}>{copy.actions.explore}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
