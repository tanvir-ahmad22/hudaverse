"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/Button";

import { landing as en } from "@/locales/en/landing";
import { landing as bn } from "@/locales/bn/landing";
import { landing as ar } from "@/locales/ar/landing";
import { landing as ur } from "@/locales/ur/landing";
import { landing as fa } from "@/locales/fa/landing";
import { landing as tr } from "@/locales/tr/landing";

const landingTranslations = { en, bn, ar, ur, fa, tr } as const;

function getFontClasses(lang: keyof typeof landingTranslations) {
  if (lang === "bn") {
    return { heading: "font-bangla", body: "font-bangla", sub: "font-bangla" };
  }
  if (lang === "ur") {
    return { heading: "font-urdu", body: "font-urdu", sub: "font-urdu" };
  }
  if (lang === "fa") {
    return { heading: "font-persian", body: "font-persian", sub: "font-persian" };
  }
  if (lang === "ar") {
    return { heading: "font-arabic", body: "font-arabic", sub: "font-arabic" };
  }
  return { heading: "font-heading", body: "font-sans", sub: "font-subheading" };
}

function DownloadButtons({
  exploreLabel,
  getStartedLabel,
  fontClass,
}: {
  exploreLabel: string;
  getStartedLabel: string;
  fontClass: string;
}) {
  return (
    <div className={`flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center ${fontClass}`}>
      <Button href="/explore" variant="on-dark">
        <span className="relative z-10">{exploreLabel}</span>
        <ArrowRight
          className="hv-btn-arrow relative z-10 h-4 w-4"
          aria-hidden="true"
        />
      </Button>
      <Button href="/get-started" variant="secondary">
        {getStartedLabel}
      </Button>
    </div>
  );
}

function TrustUsers({
  builtFor,
  worldwide,
  fontClass,
}: {
  builtFor: string;
  worldwide: string;
  fontClass: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${fontClass}`}>
      <div className="flex -space-x-3 rtl:space-x-reverse" aria-hidden="true">
        {[1, 2, 3, 4].map((item) => (
          <span
            key={item}
            className="h-9 w-9 rounded-full border-2 border-[var(--primary-dark)] bg-white/20"
          />
        ))}
      </div>
      <div className="text-start">
        <p className="text-[11px] uppercase tracking-wider text-white/60">
          {builtFor}
        </p>
        <p className="text-sm font-semibold text-white">{worldwide}</p>
      </div>
    </div>
  );
}

function getHeroItemVariants(reduceMotion: boolean): Variants {
  return {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.01 : 0.42,
        ease: "easeOut",
      },
    },
  };
}

function getHeroContentVariants(reduceMotion: boolean): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.04,
        staggerChildren: reduceMotion ? 0 : 0.07,
      },
    },
  };
}

export default function Hero() {
  const { currentLang } = useLanguage();
  const reduceMotion = useReducedMotion() ?? false;
  const t = landingTranslations[currentLang] ?? landingTranslations.en;
  const font = getFontClasses(currentLang);
  const itemVariants = getHeroItemVariants(reduceMotion);
  const isRTL = currentLang === "ar" || currentLang === "ur" || currentLang === "fa";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative isolate overflow-hidden bg-[var(--primary-dark)] text-[var(--text-on-dark)]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-mosque.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center] xl:object-[60%_center]"
        />
      </div>
      <div className="hv-hero-photo-scrim pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="hv-container relative mx-auto grid min-h-[calc(100svh-5.5rem)] grid-cols-1 items-center gap-10 pb-14 pt-28 xl:min-h-[760px] xl:grid-cols-2 xl:gap-8 xl:py-20">
        <motion.div
          variants={getHeroContentVariants(reduceMotion)}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          className={`relative z-10 flex flex-col items-center text-center xl:items-start xl:text-start ${font.body}`}
        >
          <motion.span
            variants={itemVariants}
            className={`w-fit rounded-full border border-white/15 bg-[color-mix(in_srgb,var(--primary-dark)_58%,transparent)] px-4 py-1.5 text-xs font-medium text-[var(--accent-light)] backdrop-blur-sm ${font.sub}`}
          >
            {t.hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className={`mt-6 max-w-3xl ${font.heading} text-3xl font-bold leading-[1.15] text-white sm:text-5xl xl:mt-7 xl:text-[3.25rem]`}
          >
            {t.hero.title.before}{" "}
            <span className="text-[var(--accent-light)]">
              {t.hero.title.highlight}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-[52ch] text-sm leading-7 text-white/80 sm:text-base sm:leading-8 xl:mt-6"
          >
            {t.hero.description}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-7 w-full sm:mt-8 md:w-auto">
            <DownloadButtons
              exploreLabel={t.hero.exploreButton}
              getStartedLabel={t.hero.getStartedButton}
              fontClass={font.sub}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 sm:mt-10">
            <TrustUsers
              builtFor={t.hero.builtFor}
              worldwide={t.hero.worldwide}
              fontClass={font.sub}
            />
          </motion.div>
        </motion.div>

        <div className="relative z-10 flex min-h-0 items-center justify-center py-2 xl:min-h-[600px] xl:py-0">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.65, ease: "easeOut" }}
            className="relative h-[420px] w-[280px] sm:h-[500px] sm:w-[333px] xl:h-[590px] xl:w-[393px]"
          >
            <Image
              src="/hero-phone.png"
              alt={t.hero.phoneAlt}
              fill
              priority
              sizes="(min-width: 1280px) 393px, (min-width: 640px) 333px, 280px"
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
