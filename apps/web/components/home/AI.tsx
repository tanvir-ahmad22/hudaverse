"use client";

import {
  ArrowRight,
  BookOpen,
  BookMarked,
  Headphones,
  MessageCircle,
  Search,
  ScrollText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/Button";
import { getEcosystemModuleHref } from "@/lib/ecosystem-navigation";
import { landing as en } from "@/locales/en/landing";
import { landing as bn } from "@/locales/bn/landing";
import { landing as ar } from "@/locales/ar/landing";
import { landing as ur } from "@/locales/ur/landing";
import { landing as fa } from "@/locales/fa/landing";
import { landing as tr } from "@/locales/tr/landing";

type Language = "en" | "bn" | "ar" | "ur" | "fa" | "tr";

type DemoAction = "explain" | "hadith" | "tafsir" | "audio";

type SourceKind = "quran" | "hadith" | "tafsir";

type DemoSource = {
  kind: SourceKind;
  type: string;
  title: string;
  reference: string;
  excerpt?: string;
};

type DemoConversation = {
  question: string;
  answer: string;
  sources: readonly DemoSource[];
};

type AiAssistantLocale = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;

  previewBadge: string;
  previewTitle: string;
  previewDescription: string;
  audioUnavailable: string;

  actions: {
    explain: string;
    hadith: string;
    tafsir: string;
    audio: string;
  };

  thinking: string;
  answer: string;
  sources: string;

  you: string;
  quran: string;

  tryAnother: string;
  openAssistant: string;

  trust: {
    title: string;
    item1: string;
    item2: string;
    item3: string;
  };

  conversations: readonly DemoConversation[];
};

type LandingLocale = { aiAssistant: AiAssistantLocale };

const localeMap: Record<Language, LandingLocale> = {
  en,
  bn,
  ar,
  ur,
  fa,
  tr,
};

function getFontClasses(language: Language) {
  switch (language) {
    case "bn":
      return {
        heading: "font-bangla",
        body: "font-bangla",
        sub: "font-bangla",
        isRTL: false,
      };

    case "ar":
      return {
        heading: "font-arabic",
        body: "font-arabic",
        sub: "font-arabic",
        isRTL: true,
      };

    case "ur":
      return {
        heading: "font-urdu",
        body: "font-urdu",
        sub: "font-urdu",
        isRTL: true,
      };

    case "fa":
      return {
        heading: "font-persian",
        body: "font-persian",
        sub: "font-persian",
        isRTL: true,
      };

    case "tr":
    case "en":
    default:
      return {
        heading: "font-heading",
        body: "font-sans",
        sub: "font-subheading",
        isRTL: false,
      };
  }
}

/* -------------------------------------------------------------------------- */
/* Typewriter                                                                  */
/* -------------------------------------------------------------------------- */

function useTypewriter(text: string, enabled: boolean, speed = 18) {
  const [progress, setProgress] = useState({ text: "", value: "" });
  const graphemes = useMemo(
    () =>
      Array.from(
        new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text),
        ({ segment }) => segment,
      ),
    [text],
  );

  useEffect(() => {
    if (!enabled || speed <= 0) return;

    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setProgress({ text, value: graphemes.slice(0, index).join("") });

      if (index >= graphemes.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, enabled, speed, graphemes]);

  if (!enabled || speed <= 0) return text;
  return progress.text === text ? progress.value : "";
}

/* -------------------------------------------------------------------------- */
/* Source Icon                                                                 */
/* -------------------------------------------------------------------------- */

function SourceIcon({ kind }: { kind: SourceKind }) {
  const icons: Record<SourceKind, LucideIcon> = {
    quran: BookOpen,
    hadith: ScrollText,
    tafsir: BookMarked,
  };

  const Icon = icons[kind];

  return (
    <Icon
      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary-soft)]"
      strokeWidth={1.7}
      aria-hidden="true"
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Source Card                                                                 */
/* -------------------------------------------------------------------------- */

function SourceCard({
  source,
  fonts,
}: {
  source: DemoSource;
  fonts: ReturnType<typeof getFontClasses>;
}) {
  return (
    <div
      className={`flex min-w-0 items-start gap-2.5 border-t border-[var(--border-light)] py-2.5 ${
        fonts.isRTL ? "text-right" : "text-left"
      }`}
      dir={fonts.isRTL ? "rtl" : "ltr"}
    >
      <SourceIcon kind={source.kind} />

      <div className="min-w-0 flex-1">
        <div
          className={`mb-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--primary-soft)] ${fonts.sub}`}
        >
          {source.type}
        </div>

        <div
          className={`break-words text-sm font-semibold text-[var(--text-dark)] ${fonts.body}`}
        >
          {source.title}
        </div>

        <div
          className={`mt-0.5 break-words text-xs text-[var(--text-muted)] ${fonts.body}`}
        >
          {source.reference}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Processing Pipeline                                                         */
/* -------------------------------------------------------------------------- */

function ProcessingPipeline({
  previewLabel,
  isRTL,
}: {
  previewLabel: string;
  isRTL: boolean;
}) {
  const stages = [Search, BookOpen, Sparkles];

  return (
    <div
      className="flex items-center gap-3 py-1"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <span className="shrink-0 text-[10px] font-semibold text-[var(--text-muted)]">
        {previewLabel}
      </span>

      <div className="flex items-center gap-2 text-[var(--primary-soft)]" aria-hidden="true">
        {stages.map((Icon, index) => (
          <span key={index} className="flex items-center gap-2">
            <Icon className="h-3.5 w-3.5" />
            {index < stages.length - 1 && (
              <span className="h-px w-4 bg-[var(--border-light)]" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* AI Chat Preview                                                             */
/* -------------------------------------------------------------------------- */

function AIChatPreview({
  data,
  fonts,
}: {
  data: AiAssistantLocale;
  fonts: ReturnType<typeof getFontClasses>;
}) {
  const reducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [action, setAction] = useState<DemoAction>("explain");
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
  const [actionNotice, setActionNotice] = useState("");
  const showAnswer = revealedIndex === activeIndex;

  const current = data.conversations[activeIndex];

  const typedAnswer = useTypewriter(
    current.answer,
    showAnswer,
    reducedMotion ? 0 : 14,
  );

  /* ---------------------------------------------------------------------- */
  /* Auto rotation                                                          */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (reducedMotion || action !== "explain") {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % data.conversations.length);
    }, 8500);

    return () => window.clearInterval(timer);
  }, [action, data.conversations.length, reducedMotion]);

  /* ---------------------------------------------------------------------- */
  /* Reveal the sample answer after a short pause                           */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const timer = window.setTimeout(
      () => setRevealedIndex(activeIndex),
      reducedMotion ? 0 : 650,
    );

    return () => window.clearTimeout(timer);
  }, [activeIndex, reducedMotion]);

  const handleAction = (nextAction: DemoAction) => {
    setAction(nextAction);
    setActionNotice("");

    if (nextAction === "audio") {
      setActionNotice(data.audioUnavailable);
      return;
    }

    if (nextAction === "explain") {
      setActiveIndex((previous) => {
        return (previous + 1) % data.conversations.length;
      });
      setRevealedIndex(null);
      return;
    }

    if (nextAction === "hadith") {
      const index = data.conversations.findIndex((conversation) =>
        conversation.sources.some((source) => source.kind === "hadith"),
      );

      if (index >= 0) {
        setActiveIndex(index);
        setRevealedIndex(index);
      }
      return;
    }

    if (nextAction === "tafsir") {
      const index = data.conversations.findIndex((conversation) =>
        conversation.sources.some((source) => source.kind === "tafsir"),
      );

      if (index >= 0) {
        setActiveIndex(index);
        setRevealedIndex(index);
      }
      return;
    }
  };

  return (
    <div
      id="ai-demo"
      className="relative w-full"
      dir={fonts.isRTL ? "rtl" : "ltr"}
    >
      {/* -------------------------------------------------------------- */}
      {/* FIXED CHAT CARD                                                */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          relative
          flex
          min-h-0
          w-full
          flex-col
          overflow-hidden
          rounded-[18px]
          border
          border-[var(--border-light)]
          bg-white
          shadow-[0_18px_44px_rgba(0,48,42,0.08)]
          min-[1200px]:min-h-[500px]
        "
      >
        {/* ------------------------------------------------------------ */}
        {/* CARD HEADER                                                  */}
        {/* ------------------------------------------------------------ */}

        <div className="shrink-0 border-b border-[var(--border-light)] bg-white px-4 py-3.5 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--background)] text-[var(--primary)]">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <div
                  className={`break-words text-sm font-bold leading-5 text-[var(--text-dark)] ${fonts.sub}`}
                >
                  {data.previewTitle}
                </div>

                <div
                  className={`mt-0.5 break-words text-xs leading-4 text-[var(--text-muted)] ${fonts.body}`}
                >
                  {data.previewDescription}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center rounded-full border border-[var(--border-light)] bg-[var(--background)] px-2.5 py-1.5">
              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] ${fonts.sub}`}
              >
                {data.previewBadge}
              </span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* CHAT BODY                                                    */}
        {/* ------------------------------------------------------------ */}

        <div className="flex-1 bg-[var(--background)]/55">
          <div className="px-4 py-4 sm:px-5 sm:py-5">
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
              {/* ------------------------------------------------------ */}
              {/* USER MESSAGE                                           */}
              {/* ------------------------------------------------------ */}

              <div
                className={`flex ${
                  fonts.isRTL ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-xl bg-[var(--primary)]/5 px-3.5 py-2.5 text-sm leading-6 text-[var(--text-dark)] sm:max-w-[82%] ${fonts.body}`}
                >
                  <div
                    className={`mb-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--primary-soft)] ${fonts.sub}`}
                  >
                    {data.you}
                  </div>

                  <p className="break-words">{current.question}</p>
                </div>
              </div>

              {/* ------------------------------------------------------ */}
              {/* PROCESSING                                             */}
              {/* ------------------------------------------------------ */}

              <AnimatePresence mode="wait">
                {!showAnswer && (
                  <motion.div
                    key="processing"
                    initial={{
                      opacity: 0,
                      y: 6,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -4,
                    }}
                    transition={{ duration: reducedMotion ? 0 : 0.2 }}
                  >
                    <ProcessingPipeline
                      previewLabel={data.previewBadge}
                      isRTL={fonts.isRTL}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ------------------------------------------------------ */}
              {/* AI ANSWER                                              */}
              {/* ------------------------------------------------------ */}

              <AnimatePresence mode="wait">
                {showAnswer && (
                  <motion.div
                    key={`${activeIndex}-${action}`}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.35,
                    }}
                  >
                    <div className="min-w-0">
                      <div
                        className={`mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--primary-soft)] ${fonts.sub}`}
                      >
                        {data.answer}
                      </div>

                      <p
                        className={`min-h-20 break-words whitespace-pre-line text-sm leading-[1.65] text-[var(--text-dark)] ${fonts.body}`}
                      >
                        {typedAnswer}
                      </p>
                    </div>

                    {/* ------------------------------------------------ */}
                    {/* SOURCES                                           */}
                    {/* ------------------------------------------------ */}

                    <div className="mt-3">
                      <div
                        className={`mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)] ${fonts.sub}`}
                      >
                        {data.sources}
                      </div>

                      <div className="grid gap-2 sm:grid-cols-2">
                        {current.sources.slice(0, 2).map((source) => (
                          <SourceCard
                            key={`${source.kind}-${source.reference}`}
                            source={source}
                            fonts={fonts}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* CARD FOOTER                                                  */}
        {/* ------------------------------------------------------------ */}

        <div className="shrink-0 border-t border-[var(--primary)]/8 bg-white p-3.5 sm:px-5 sm:py-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {(
              [
                {
                  key: "explain",
                  icon: Sparkles,
                  label: data.actions.explain,
                },
                {
                  key: "hadith",
                  icon: ScrollText,
                  label: data.actions.hadith,
                },
                {
                  key: "tafsir",
                  icon: BookMarked,
                  label: data.actions.tafsir,
                },
                {
                  key: "audio",
                  icon: Headphones,
                  label: data.actions.audio,
                },
              ] satisfies Array<{
                key: DemoAction;
                icon: LucideIcon;
                label: string;
              }>
            ).map((item) => {
              const Icon = item.icon;
              const selected = action === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleAction(item.key)}
                  aria-pressed={selected}
                  aria-label={item.label}
                  className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg border px-2.5 text-[11px] font-semibold transition-colors duration-200 sm:px-3 sm:text-xs ${
                    selected
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-sm"
                      : "border-transparent bg-transparent text-[var(--text-muted)] hover:border-[var(--border-light)] hover:bg-[var(--background)] hover:text-[var(--primary)]"
                  } ${fonts.sub}`}
                >
                  <Icon className="h-3.5 w-3.5" />

                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          {actionNotice && (
            <p
              role="status"
              className={`mt-2 text-xs leading-5 text-[var(--text-muted)] ${fonts.body}`}
            >
              {actionNotice}
            </p>
          )}
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* DECORATIVE BACKDROP                                            */}
      {/* -------------------------------------------------------------- */}

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                              */
/* -------------------------------------------------------------------------- */

export default function AiAssistantShowcase() {
  const { currentLang } = useLanguage();
  const currentLanguage: Language = currentLang;

  const locale = localeMap[currentLanguage];

  /**
   * IMPORTANT:
   * All multilingual copy comes from locales/{lang}/landing.ts.
   * This component only owns layout, animation and interaction.
   */

  const ai = locale.aiAssistant as AiAssistantLocale;

  const fonts = useMemo(
    () => getFontClasses(currentLanguage),
    [currentLanguage],
  );
  const trustPoints = [
    { label: ai.trust.item1, Icon: BookOpen },
    { label: ai.trust.item2, Icon: ScrollText },
    { label: ai.trust.item3, Icon: BookMarked },
  ];

  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
  });

  const reducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="hv-section relative overflow-hidden bg-[var(--background)]"
    >
      <div className="hv-container relative">
        <div className="grid items-center gap-8 min-[1200px]:grid-cols-[0.42fr_0.58fr] min-[1200px]:gap-12">
          {/* ============================================================ */}
          {/* LEFT CONTENT                                                 */}
          {/* ============================================================ */}

          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    x: -20,
                  }
            }
            animate={
              isInView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : undefined
            }
            transition={{
              duration: reducedMotion ? 0 : 0.65,
              ease: "easeOut",
            }}
            className={fonts.isRTL ? "text-right" : "text-left"}
            dir={fonts.isRTL ? "rtl" : "ltr"}
          >
            {/* Eyebrow */}

            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-[var(--accent)]" />

              <span
                className={`text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent)] sm:text-xs ${fonts.sub}`}
              >
                {ai.eyebrow}
              </span>
            </div>

            {/* Heading */}

            <h2
              className={`hv-h2 max-w-xl text-[var(--text-dark)] ${
                fonts.heading
              } ${fonts.isRTL ? "" : "tracking-[-0.035em]"}`}
            >
              {ai.title}

              <span className="text-[var(--primary)]"> {ai.titleHighlight}</span>
            </h2>

            {/* Description */}

            <p
              className={`hv-body-lg mt-4 max-w-lg text-[var(--text-muted)] ${fonts.body}`}
            >
              {ai.description}
            </p>

            {/* Trust */}

            <div className="mt-5 space-y-3">
              <div
                className={`text-sm font-semibold text-[var(--text-dark)] ${fonts.sub}`}
              >
                {ai.trust.title}
              </div>

              <div className="space-y-3.5">
                {trustPoints.map(({ label, Icon }) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <Icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary-soft)]"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-[13px] leading-5 text-[var(--text-muted)] ${fonts.body}`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}

            <div
              className={`mt-5 flex flex-col gap-2.5 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center ${fonts.sub}`}
            >
              <Button
                href={getEcosystemModuleHref("ai")}
                variant="gold"
              >
                <Sparkles className="h-4 w-4" />

                <span>{ai.openAssistant}</span>

                <ArrowRight className="hv-btn-arrow h-4 w-4" />
              </Button>

              <Button
                href="#ai-demo"
                variant="secondary-outline"
              >
                <MessageCircle className="h-4 w-4" />

                <span>{ai.tryAnother}</span>
              </Button>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* RIGHT — AI CHAT CARD                                         */}
          {/* ============================================================ */}

          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : undefined
            }
            transition={{
              duration: reducedMotion ? 0 : 0.75,
              delay: reducedMotion ? 0 : 0.1,
              ease: "easeOut",
            }}
          >
            <AIChatPreview data={ai} fonts={fonts} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
