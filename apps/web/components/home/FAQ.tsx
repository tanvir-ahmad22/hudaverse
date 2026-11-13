"use client";

import { useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Globe2,
  HelpCircle,
  House,
  Smartphone,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";

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
type Category = "all" | "about" | "ai" | "sources" | "account" | "mobile";
type FaqItem = {
  category: Exclude<Category, "all">;
  question: string;
  answer: string;
};

type FaqCopy = {
  eyebrow: string;
  title: string;
  description: string;
  filterLabel: string;
  questionsLabel: string;
  answerLabel: string;
  categories: Record<Category, string>;
  items: ReadonlyArray<FaqItem>;
  supportTitle: string;
  supportDescription: string;
  aiPreview: string;
  explore: string;
};

type LandingLocale = { faq: FaqCopy };

const localeMap: Record<Language, LandingLocale> = {
  en,
  bn,
  ar,
  ur,
  fa,
  tr,
};

const domains: ReadonlyArray<{ key: Category; icon: LucideIcon }> = [
  { key: "all", icon: Globe2 },
  { key: "about", icon: House },
  { key: "ai", icon: Sparkles },
  { key: "sources", icon: BookOpen },
  { key: "account", icon: UserRound },
  { key: "mobile", icon: Smartphone },
];

function getLanguageFont(language: Language) {
  switch (language) {
    case "bn":
      return { className: "font-bangla", family: "var(--font-bangla)" };
    case "ar":
      return { className: "font-arabic", family: "var(--font-arabic)" };
    case "ur":
      return { className: "font-urdu", family: "var(--font-urdu)" };
    case "fa":
      return { className: "font-persian", family: "var(--font-persian)" };
    default:
      return { className: "", family: undefined };
  }
}

export default function FAQ() {
  const { currentLang } = useLanguage();
  const language = currentLang as Language;
  const rtl = isRTL(language);
  const reducedMotion = useReducedMotion();
  const copy = localeMap[language].faq;
  const languageFont = getLanguageFont(language);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedQuestionId, setSelectedQuestionId] = useState(1);

  const allItems = copy.items.map((item, index) => ({
    ...item,
    id: index + 1,
  }));
  const visibleItems = allItems.filter(
    (item) => activeCategory === "all" || item.category === activeCategory,
  );
  const selectedItem =
    visibleItems.find((item) => item.id === selectedQuestionId) ?? visibleItems[0];
  const DirectionArrow = rtl ? ArrowLeft : ArrowRight;
  const buttonStyle = languageFont.family
    ? { fontFamily: languageFont.family }
    : undefined;

  const selectCategory = (category: Category) => {
    const nextItems = allItems.filter(
      (item) => category === "all" || item.category === category,
    );

    setActiveCategory(category);
    setSelectedQuestionId(nextItems[0]?.id ?? 1);
  };

  const handleDomainKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const forwardKey = rtl ? "ArrowLeft" : "ArrowRight";
    const backwardKey = rtl ? "ArrowRight" : "ArrowLeft";
    let nextIndex: number | undefined;

    if (event.key === forwardKey) nextIndex = (index + 1) % domains.length;
    if (event.key === backwardKey) {
      nextIndex = (index - 1 + domains.length) % domains.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = domains.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextCategory = domains[nextIndex].key;
    selectCategory(nextCategory);
    document.getElementById(`faq-domain-${nextCategory}`)?.focus();
  };

  return (
    <section
      className="hv-section bg-[var(--background)]"
      dir={rtl ? "rtl" : "ltr"}
      aria-labelledby="faq-heading"
    >
      <div className="hv-container">
        <header className={`mb-8 max-w-2xl sm:mb-10 ${languageFont.className}`}>
          <div className="mb-3 flex items-center gap-2 text-[var(--accent)]">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            <span
              className={`${languageFont.className || "font-subheading"} text-xs font-semibold uppercase tracking-[0.14em]`}
            >
              {copy.eyebrow}
            </span>
          </div>

          <h2
            id="faq-heading"
            className={`hv-h2 ${languageFont.className || "font-heading tracking-[-0.025em]"} text-[var(--text-dark)]`}
          >
            {copy.title}
          </h2>

          <p
            className={`hv-body-lg mt-4 max-w-xl text-[var(--text-muted)] ${languageFont.className || "font-sans"}`}
          >
            {copy.description}
          </p>
        </header>

        <div className="grid gap-7 lg:grid-cols-2 xl:grid-cols-[190px_minmax(260px,0.9fr)_minmax(0,1.2fr)] xl:gap-9">
          <nav
            aria-label={copy.filterLabel}
            className="min-w-0 overflow-x-auto overscroll-x-contain pb-1 lg:col-span-2 xl:col-span-1 xl:overflow-visible"
          >
            <div className="flex min-w-max items-stretch gap-1 xl:min-w-0 xl:flex-col xl:border-s xl:border-[var(--border-light)]">
              {domains.map(({ key, icon: Icon }, index) => {
                const selected = activeCategory === key;

                return (
                  <button
                    id={`faq-domain-${key}`}
                    key={key}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => selectCategory(key)}
                    onKeyDown={(event) => handleDomainKeyDown(event, index)}
                    className={`group relative flex shrink-0 items-center gap-2.5 px-3 py-2.5 text-start focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)] xl:w-full xl:ps-4 ${
                      selected
                        ? "text-[var(--primary)] xl:bg-[var(--surface)]"
                        : "text-[var(--text-muted)] hover:bg-[var(--surface)]/70 hover:text-[var(--primary)]"
                    }`}
                  >
                    <span
                      className={`font-subheading text-[10px] tabular-nums ${
                        selected ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                      }`}
                    >
                      {String(index).padStart(2, "0")}
                    </span>
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span
                      className={`${languageFont.className || "font-subheading"} text-xs font-semibold leading-5 sm:text-sm`}
                    >
                      {copy.categories[key]}
                    </span>
                    {selected && (
                      <span
                        className="absolute inset-y-1 end-0 hidden w-0.5 bg-[var(--accent)] xl:block"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="grid min-w-0 gap-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:col-span-2 xl:contents">
          <section aria-labelledby="faq-questions-heading" className="min-w-0">
            <div className="mb-2 flex items-center justify-between gap-3 border-b border-[var(--border-light)] pb-3">
              <h3
                id="faq-questions-heading"
                className={`${languageFont.className || "font-subheading"} text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]`}
              >
                {copy.questionsLabel}
              </h3>
              <span className="font-subheading text-[10px] tabular-nums text-[var(--text-muted)]">
                {String(visibleItems.length).padStart(2, "0")}
              </span>
            </div>

            <ol className="divide-y divide-[var(--border-light)]">
              {visibleItems.map((item) => {
                const selected = selectedItem?.id === item.id;

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      aria-controls="faq-answer-panel"
                      aria-current={selected ? "true" : undefined}
                      onClick={() => setSelectedQuestionId(item.id)}
                      className={`group flex w-full items-start gap-3 border-s-2 py-3.5 ps-3 pe-2 text-start focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)] ${
                        selected
                          ? "border-[var(--accent)] bg-[var(--surface)]/70"
                          : "border-transparent hover:border-[var(--border-light)] hover:bg-[var(--surface)]/50"
                      }`}
                    >
                      <span
                        className={`mt-0.5 shrink-0 font-subheading text-[10px] tabular-nums ${
                          selected
                            ? "text-[var(--accent)]"
                            : "text-[var(--text-muted)]"
                        }`}
                      >
                        {String(item.id).padStart(2, "0")}
                      </span>
                      <span
                        className={`${languageFont.className || "font-subheading"} min-w-0 flex-1 break-words text-sm font-medium leading-6 ${
                          selected
                            ? "text-[var(--primary)]"
                            : "text-[var(--text-dark)] group-hover:text-[var(--primary)]"
                        }`}
                      >
                        {item.question}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>

          {selectedItem && (
            <section
              id="faq-answer-panel"
              aria-labelledby="faq-selected-question"
              aria-live="polite"
              aria-atomic="true"
              className="min-w-0 border-s-2 border-[var(--accent)] bg-[var(--surface)] px-5 py-5 sm:px-7 sm:py-7"
            >
              <motion.div
                key={selectedItem.id}
                initial={reducedMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.18 }}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span
                    className={`${languageFont.className || "font-subheading"} text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]`}
                  >
                    {copy.answerLabel}
                  </span>
                  <span className="font-subheading text-[10px] tabular-nums text-[var(--text-muted)]">
                    {String(selectedItem.id).padStart(2, "0")} / {String(allItems.length).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  id="faq-selected-question"
                  className={`${languageFont.className || "font-heading"} text-xl font-semibold leading-snug text-[var(--text-dark)] sm:text-2xl`}
                >
                  {selectedItem.question}
                </h3>

                <p
                  className={`${languageFont.className || "font-sans"} mt-4 max-w-prose text-sm leading-7 text-[var(--text-muted)] sm:text-[15px] sm:leading-8`}
                >
                  {selectedItem.answer}
                </p>
              </motion.div>
            </section>
          )}
          </div>
        </div>

        <aside className="mt-7 flex flex-col gap-4 border-t border-[var(--border-light)] pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <h3
              className={`${languageFont.className || "font-subheading"} text-sm font-semibold text-[var(--text-dark)]`}
            >
              {copy.supportTitle}
            </h3>
            <p
              className={`${languageFont.className || "font-sans"} mt-1 text-sm leading-6 text-[var(--text-muted)]`}
            >
              {copy.supportDescription}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <Button
              href="#ai-demo"
              variant="gold"
              scale="sm"
              style={buttonStyle}
            >
              {copy.aiPreview}
              <DirectionArrow className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              href="/explore"
              variant="secondary-outline"
              scale="sm"
              style={buttonStyle}
            >
              {copy.explore}
              <DirectionArrow className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
