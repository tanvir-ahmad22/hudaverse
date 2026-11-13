"use client";

import React, { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Layers3,
  Lightbulb,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { isRTL } from "@/lib/language";
import { explore as en } from "@/locales/en/explore";
import { explore as bn } from "@/locales/bn/explore";
import { explore as ar } from "@/locales/ar/explore";
import { explore as ur } from "@/locales/ur/explore";
import { explore as fa } from "@/locales/fa/explore";
import { explore as tr } from "@/locales/tr/explore";

const localeMap = { en, bn, ar, ur, fa, tr };

/* ============================================================
   Section 04 — From Question to Understanding
   HudaVerse Explore Page

   Language:
   - UI: English
   - Qur'an Ayah: Arabic
   ============================================================ */

type SourceType = "quran" | "hadith" | "tafsir" | "scholarly";

type KnowledgeSource = {
  type: SourceType;
  label: string;
  reference: string;
  preview: string;
  meta: string;
};


/* ============================================================
   Source Icon
   ============================================================ */

function SourceIcon({ type }: { type: SourceType }) {
  const iconProps = {
    size: 17,
    strokeWidth: 1.8,
  };

  switch (type) {
    case "quran":
      return <BookOpen {...iconProps} />;

    case "hadith":
      return <MessageCircle {...iconProps} />;

    case "tafsir":
      return <Lightbulb {...iconProps} />;

    case "scholarly":
      return <Layers3 {...iconProps} />;

    default:
      return <BookOpen {...iconProps} />;
  }
}

/* ============================================================
   Question Bubble
   ============================================================ */

function QuestionBubble({
  reduceMotion,
  active,
  copy,
}: {
  reduceMotion: boolean;
  active: boolean;
  copy: (typeof en.ai);
}) {
  const [visibleText, setVisibleText] = useState(
    reduceMotion ? copy.question : "",
  );

  useEffect(() => {
    if (!active) return;

    if (reduceMotion) {
      const timer = window.setTimeout(() => setVisibleText(copy.question), 0);
      return () => window.clearTimeout(timer);
    }

    let index = 0;
    let typingTimer: number | undefined;
    const startTimer = window.setTimeout(() => {
      setVisibleText("");
      typingTimer = window.setInterval(() => {
        index += 1;
        setVisibleText(copy.question.slice(0, index));
        if (index >= copy.question.length && typingTimer !== undefined) {
          window.clearInterval(typingTimer);
        }
      }, 32);
    }, 0);

    return () => {
      window.clearTimeout(startTimer);
      if (typingTimer !== undefined) window.clearInterval(typingTimer);
    };
  }, [active, reduceMotion, copy.question]);

  if (!active) return null;

  const typingComplete = visibleText.length >= copy.question.length;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-end"
    >
      <span className="mb-2 px-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--primary-dark)]/40 sm:text-[11px]">
        {copy.asking}
      </span>

      <div className="max-w-[94%] rounded-[20px] rounded-br-[7px] border border-[var(--border-light)]/[0.07] bg-[var(--background)] px-4 py-3.5 text-[14px] leading-6 text-[var(--text-dark)] shadow-[0_4px_20px_rgba(6,78,59,0.03)] sm:max-w-[68%] sm:px-5 sm:py-4 sm:text-[15px]">
        {visibleText}

        {!reduceMotion && !typingComplete && (
          <span className="ml-1 inline-block h-[17px] w-px translate-y-[3px] animate-pulse bg-[var(--primary-soft)]" />
        )}
      </div>
    </motion.div>
  );
}

/* ============================================================
   Thinking Indicator
   ============================================================ */

function ThinkingIndicator({
  reduceMotion,
  active,
  copy,
}: {
  reduceMotion: boolean;
  active: boolean;
  copy: (typeof en.ai);
}) {
  if (!active) return null;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 7 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
      }}
      className="flex items-center gap-2.5"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-light)]/[0.08] bg-[var(--surface)] text-[var(--primary)]">
        <Sparkles size={13} strokeWidth={1.8} />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[11px] text-[var(--primary-dark)]/45 sm:text-[12px]">
          {copy.thinking}
        </span>

        <div className="flex items-center gap-1">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.25, 1, 0.25],
                      scale: [0.85, 1, 0.85],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 0.75,
                      repeat: Infinity,
                      delay: dot * 0.13,
                      ease: "easeInOut",
                    }
              }
              className="h-1.5 w-1.5 rounded-full bg-[var(--primary-soft)]"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Knowledge Source Card
   ============================================================ */

function KnowledgeSourceCard({
  source,
  reduceMotion,
  visible,
}: {
  source: KnowledgeSource;
  reduceMotion: boolean;
  visible: boolean;
}) {
  if (!visible) return null;

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 12,
              scale: 0.985,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.48,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex gap-3.5 sm:gap-4"
    >
      {/* Timeline node */}
      <div className="relative z-10 flex w-8 shrink-0 justify-center">
        <div className="mt-4 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-light)]/[0.08] bg-[var(--background)] text-[var(--primary)]">
          <SourceIcon type={source.type} />
        </div>
      </div>

      {/* Source card */}
      <div className="min-w-0 flex-1 rounded-[17px] border border-[var(--border-light)]/[0.07] bg-[var(--surface)] px-3.5 py-3.5 shadow-[0_3px_18px_rgba(6,78,59,0.025)] sm:px-4 sm:py-4">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[13px] font-semibold text-[var(--text-dark)]">
                {source.label}
              </span>

              <span className="text-[10px] text-[var(--primary-dark)]/25">
                ·
              </span>

              <span className="text-[11px] font-medium text-[var(--primary-dark)]/50">
                {source.reference}
              </span>
            </div>

            {/* Arabic Qur'an text */}
            {source.type === "quran" ? (
              <p
                lang="ar"
                dir="rtl"
                className="mt-2.5 text-right font-[var(--hv-font-quran)] text-[16px] leading-[2] text-[var(--text-dark)] sm:text-[17px]"
              >
                {source.preview}
              </p>
            ) : (
              <p className="mt-1.5 text-[12px] leading-5 text-[var(--primary-dark)]/55 sm:text-[13px] sm:leading-6">
                {source.preview}
              </p>
            )}
          </div>

          <span className="shrink-0 self-start rounded-full border border-[var(--border-light)]/[0.06] bg-[var(--background)] px-2.5 py-1 text-[9px] font-medium tracking-[0.03em] text-[var(--primary-dark)]/40">
            {source.meta}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Synthesized Answer
   ============================================================ */

function SynthesizedAnswer({
  reduceMotion,
  visible,
  copy,
}: {
  reduceMotion: boolean;
  visible: boolean;
  copy: (typeof en.ai);
}) {
  if (!visible) return null;

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 16,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden rounded-[21px] border border-[var(--border-light)]/25 bg-[var(--background)]/60 p-4 shadow-[0_12px_40px_rgba(6,78,59,0.05)] sm:p-5"
    >
      {/* Accent line */}
      <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-[var(--primary-soft)]" />

      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--primary)] shadow-sm">
          <CheckCircle2 size={15} strokeWidth={2} />
        </div>

        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--primary-soft)] sm:text-[11px]">
          {copy.answer}
        </span>
      </div>

      {/* Answer */}
      <p className="mt-4 text-[14px] leading-7 text-[var(--text-dark)] sm:text-[15px] sm:leading-7">
        {copy.answerText}
      </p>

      {/* Sources */}
      <div className="mt-5 border-t border-[var(--border-light)]/10 pt-3.5">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[var(--primary-dark)]/40 sm:text-[10px]">
            {copy.sources}
          </span>

          <span className="text-[11px] leading-5 text-[var(--primary-dark)]/55 sm:text-right">
            Qur&apos;an 2:153 · Sahih Muslim · Tafsir Ibn Kathir
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Main Section
   ============================================================ */

export default function ExploreUnderstanding() {
  const { currentLang } = useLanguage();
  const language = currentLang in localeMap ? currentLang as keyof typeof localeMap : "en";
  const copy = localeMap[language].ai;
  const sources: KnowledgeSource[] = copy.sourceItems;
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = Boolean(shouldReduceMotion);

  const [started, setStarted] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const [visibleSources, setVisibleSources] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  /* ============================================================
     Start sequence when section enters viewport
     ============================================================ */

  const startSequence = () => {
    if (started) return;

    setStarted(true);

    if (reduceMotion) {
      setShowThinking(false);
      setVisibleSources(sources.length);
      setShowAnswer(true);
      return;
    }

    /*
      Question typing runs inside QuestionBubble.
      Give it enough time to complete before showing thinking.
    */
    const thinkingTimer = window.setTimeout(() => {
      setShowThinking(true);
    }, 1050);

    /*
      Thinking indicator remains briefly.
    */
    const hideThinkingTimer = window.setTimeout(() => {
      setShowThinking(false);
    }, 1900);

    /*
      Reveal sources one by one.
    */
    const sourceTimers = sources.map((_, index) =>
      window.setTimeout(
        () => {
          setVisibleSources(index + 1);
        },
        2050 + index * 420,
      ),
    );

    /*
      Final answer after all sources.
    */
    const answerTimer = window.setTimeout(() => {
      setShowAnswer(true);
    }, 3900);

    return () => {
      window.clearTimeout(thinkingTimer);
      window.clearTimeout(hideThinkingTimer);
      window.clearTimeout(answerTimer);
      sourceTimers.forEach((timer) => window.clearTimeout(timer));
    };
  };

  return (
    <section
      id="ai"
      aria-labelledby="explore-understanding-title"
      lang={language}
      dir={isRTL(language) ? "rtl" : "ltr"}
      className="hv-section hv-explore-section scroll-mt-24 relative overflow-hidden bg-[var(--background)]"
    >
      {/* ========================================================
          Top subtle divider
          ======================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-light)] to-transparent"
      />

      <div className="hv-container relative">
        {/* ======================================================
            Section Heading
            ====================================================== */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-[760px] text-center"
        >
          {/* Eyebrow */}
          <span className="hv-explore-eyebrow inline-flex items-center rounded-full border border-[var(--border-light)] bg-[var(--surface)] px-3.5 py-1.5 text-[var(--primary-soft)]">
            {copy.eyebrow}
          </span>

          {/* Heading */}
          <h2
            id="explore-understanding-title"
            className="hv-explore-title mt-5 text-[var(--text-dark)]"
          >
            {copy.title}
          </h2>

          {/* Description */}
          <p className="hv-explore-description mx-auto mt-4 max-w-[690px] text-[var(--text-dark)]/55">
            {copy.description}
          </p>
        </motion.div>

        {/* ======================================================
            Main Demo
            ====================================================== */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          onViewportEnter={startSequence}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-12 max-w-[900px] sm:mt-14 lg:mt-16"
        >
          <div className="hv-card overflow-hidden p-0">
            {/* ==================================================
                Demo Header
                ================================================== */}
            <div className="flex items-center justify-between border-b border-[var(--border-light)]/[0.07] bg-[var(--surface)] px-4 py-3.5 sm:px-6 sm:py-4">
              <div>
                <p className="text-[12px] font-semibold text-[var(--text-dark)] sm:text-[13px]">
                  {copy.assistant}
                </p>

                <p className="mt-0.5 text-[10px] text-[var(--primary-dark)]/40 sm:text-[11px]">
                  {copy.researching}
                </p>
              </div>

            </div>

            {/* ==================================================
                Demo Content
                ================================================== */}
            <div className="px-3.5 py-5 sm:px-7 sm:py-8 lg:px-12 lg:py-10">
              {/* Question */}
              <QuestionBubble
                reduceMotion={reduceMotion}
                active={started}
                copy={copy}
              />

              {/* Thinking */}
              <div className="mt-5 min-h-[30px] sm:mt-6">
                <ThinkingIndicator
                  reduceMotion={reduceMotion}
                  active={showThinking}
                  copy={copy}
                />
              </div>

              {/* ==================================================
                  Sources
                  ================================================== */}
              <div className="relative mt-4 sm:mt-5">
                {/* Timeline */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-5 left-[15px] top-5 w-px bg-[var(--primary-dark)]/10 sm:left-[16px]"
                />

                <div className="relative space-y-2.5 sm:space-y-3">
                  {sources.map((source, index) => (
                    <KnowledgeSourceCard
                      key={source.type}
                      source={source}
                      reduceMotion={reduceMotion}
                      visible={visibleSources > index}
                    />
                  ))}
                </div>
              </div>

              {/* ==================================================
                  Connection Message
                  ================================================== */}
              {showAnswer && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                  }}
                  className="my-5 flex items-center justify-center gap-2 sm:my-6"
                >
                  <span className="h-px w-8 bg-[var(--primary)]/10 sm:w-12" />

                  <span className="text-[9px] font-medium tracking-[0.06em] text-[var(--primary-dark)]/35">
                    {copy.connecting}
                  </span>

                  <span className="h-px w-8 bg-[var(--primary)]/10 sm:w-12" />
                </motion.div>
              )}

              {/* ==================================================
                  Final Answer
                  ================================================== */}
              <SynthesizedAnswer
                reduceMotion={reduceMotion}
                visible={showAnswer}
                copy={copy}
              />
            </div>
          </div>
        </motion.div>

        {/* ======================================================
            Closing Statement
            ====================================================== */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            delay: reduceMotion ? 0 : 0.12,
          }}
          className="mx-auto mt-8 flex max-w-[700px] items-center justify-center gap-3 text-center sm:mt-10"
        >
          <span
            aria-hidden="true"
            className="hidden h-px w-8 bg-[var(--primary)]/10 sm:block"
          />

          <p className="text-xs leading-6 text-[var(--text-dark)]/45 sm:text-[13px]">
            {copy.illustrative}
          </p>

          <span
            aria-hidden="true"
            className="hidden h-px w-8 bg-[var(--primary)]/10 sm:block"
          />
        </motion.div>
      </div>
    </section>
  );
}
