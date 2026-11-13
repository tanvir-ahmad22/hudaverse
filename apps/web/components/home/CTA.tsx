"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { isRTL } from "@/lib/language";
import { landing as en } from "@/locales/en/landing";
import { landing as bn } from "@/locales/bn/landing";
import { landing as ar } from "@/locales/ar/landing";
import { landing as ur } from "@/locales/ur/landing";
import { landing as fa } from "@/locales/fa/landing";
import { landing as tr } from "@/locales/tr/landing";

type Language = "en" | "bn" | "ar" | "ur" | "fa" | "tr";
type CtaCopy = {
  badge: string;
  title: { line1: string; highlight: string; line2: string };
  description: string;
  primaryButton: string;
  secondaryButton: string;
  tagline: string;
};

const localeMap: Record<Language, { cta: CtaCopy }> = {
  en,
  bn,
  ar,
  ur,
  fa,
  tr,
};

function FolioSeal() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute end-0 top-1/2 hidden h-[min(29vw,340px)] w-[min(29vw,340px)] -translate-y-1/2 items-center justify-center lg:flex"
    >
      <svg viewBox="0 0 360 360" className="absolute inset-0 h-full w-full">
        <path
          d="M180 12 213 111 312 48 249 147 348 180 249 213 312 312 213 249 180 348 147 249 48 312 111 213 12 180 111 147 48 48 147 111Z"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity=".42"
          strokeWidth="1.2"
        />
        <path
          d="M180 50 310 180 180 310 50 180Z M180 91 269 180 180 269 91 180Z"
          fill="none"
          stroke="var(--accent-light)"
          strokeOpacity=".32"
          strokeWidth="1"
        />
      </svg>
      <span className="font-heading text-[clamp(5rem,10vw,8rem)] leading-none text-[var(--accent-light)]/70">
        05
      </span>
    </div>
  );
}

export default function CTA() {
  const { currentLang } = useLanguage();
  const lang: Language = currentLang in localeMap ? currentLang : "en";
  const cta = localeMap[lang].cta;
  const rtl = isRTL(lang);
  const reducedMotion = useReducedMotion() ?? false;
  const font =
    lang === "bn"
      ? "font-bangla"
      : lang === "ar"
        ? "font-arabic"
        : lang === "ur"
          ? "font-urdu"
          : lang === "fa"
            ? "font-persian"
            : "";

  return (
    <section
      dir={rtl ? "rtl" : "ltr"}
      aria-labelledby="cta-heading"
      className="hv-section relative overflow-hidden border-b border-[var(--accent)]/25 bg-[var(--primary-dark)] text-white"
    >
      <div className="hv-container">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className={font}
        >
          <div className="relative min-h-0 lg:min-h-[340px]">
            <FolioSeal />

            <header className="relative z-10 max-w-[780px] py-2 sm:py-8 lg:w-[66%]">
              <div className="mb-5 flex items-center gap-3 text-[var(--accent-light)]">
                <span className="h-px w-8 bg-[var(--accent)]" aria-hidden="true" />
                <span
                  className={`${font || "font-subheading"} text-xs font-semibold uppercase tracking-[0.16em]`}
                >
                  {cta.badge}
                </span>
                <span className="font-subheading text-[10px] tabular-nums text-white/45 lg:hidden">
                  05
                </span>
              </div>

              <h2
                id="cta-heading"
                className={`${font || "font-heading"} max-w-[760px] text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl ${rtl ? "" : "tracking-[-0.03em]"}`}
              >
                <span className="block">{cta.title.line1}</span>
                <span className="block text-[var(--accent-light)]">
                  {cta.title.highlight}
                </span>
                <span className="block text-white/85">{cta.title.line2}</span>
              </h2>
            </header>
          </div>

          <div className="mt-7 grid gap-6 border-t border-white/15 pt-6 sm:mt-9 sm:pt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <p
              className={`${font || "font-sans"} max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8`}
            >
              {cta.description}
            </p>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <p
                className={`${font || "font-heading"} text-lg text-[var(--accent-light)] sm:text-xl`}
              >
                {cta.tagline}
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button href="/explore" variant="primary" scale="lg">
                  {cta.primaryButton}
                  <ArrowRight
                    size={18}
                    className={`hv-btn-arrow ${rtl ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </Button>
                <Button
                  href="/#faq-heading"
                  variant="secondary-outline"
                  scale="lg"
                >
                  {cta.secondaryButton}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
