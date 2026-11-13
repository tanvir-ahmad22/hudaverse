"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { isRTL } from "@/lib/language";
import { Button } from "@/components/ui/Button";
import { explore as en } from "@/locales/en/explore";
import { explore as bn } from "@/locales/bn/explore";
import { explore as ar } from "@/locales/ar/explore";
import { explore as ur } from "@/locales/ur/explore";
import { explore as fa } from "@/locales/fa/explore";
import { explore as tr } from "@/locales/tr/explore";

const localeMap = { en, bn, ar, ur, fa, tr };

export default function Knowledge() {
  const { currentLang } = useLanguage();
  const language = currentLang in localeMap ? currentLang as keyof typeof localeMap : "en";
  const copy = localeMap[language].knowledge;
  const rtl = isRTL(language);
  const reduceMotion = useReducedMotion() ?? false;
  const [isCompact, setIsCompact] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [showSimpleExplanation, setShowSimpleExplanation] = React.useState(false);
  const questionRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const selectedQuestion = copy.questions[selectedIndex];
  const questionCount = copy.questions.length;

  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 1023.98px)");
    const updateLayout = () => setIsCompact(media.matches);
    updateLayout();
    media.addEventListener("change", updateLayout);
    return () => media.removeEventListener("change", updateLayout);
  }, []);

  const selectQuestion = (index: number, moveFocus = false) => {
    setSelectedIndex(index);
    setShowSimpleExplanation(false);
    if (moveFocus) questionRefs.current[index]?.focus();
  };

  const handleQuestionKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === "ArrowDown") nextIndex = (index + 1) % questionCount;
    if (event.key === "ArrowUp") nextIndex = (index - 1 + questionCount) % questionCount;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = questionCount - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      selectQuestion(nextIndex, true);
    }
  };

  return (
    <section
      id="knowledge"
      aria-labelledby="knowledge-title"
      lang={language}
      dir={rtl ? "rtl" : "ltr"}
      className="hv-section hv-explore-section hv-qa-section scroll-mt-24"
    >
      <div className="hv-container">
        <div className="hv-qa-content">
          <motion.header
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="hv-qa-header"
          >
            <p className="hv-tagline-soft hv-explore-eyebrow">{copy.eyebrow}</p>
            <h2 id="knowledge-title" className="hv-h2 hv-explore-title">{copy.title}</h2>
            <p className="hv-body-lg hv-explore-description">{copy.description}</p>
          </motion.header>

          <article className="hv-card hv-qa-source" aria-label={copy.sourceAyah}>
            <span className="hv-card__badge hv-qa-reference">{copy.sourceReference}</span>
            <p dir="rtl" lang="ar" className="hv-card__arabic hv-qa-ayah">
              لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا
            </p>
            <p className="hv-qa-translation">{copy.sourceTranslation}</p>
          </article>

          <div className="hv-qa-grid">
            <div
              className="hv-qa-list"
              role={isCompact ? undefined : "tablist"}
              aria-orientation={isCompact ? undefined : "vertical"}
              aria-label={copy.questionsLabel}
            >
              {copy.questions.map((question, index) => {
                const selected = index === selectedIndex;
                return (
                  <button
                    key={question.question}
                    ref={(element) => { questionRefs.current[index] = element; }}
                    id={`knowledge-question-${index}`}
                    type="button"
                    role={isCompact ? undefined : "tab"}
                    aria-selected={isCompact ? undefined : selected}
                    aria-expanded={isCompact ? selected : undefined}
                    aria-controls="knowledge-answer-panel"
                    tabIndex={isCompact || selected ? 0 : -1}
                    className={`hv-qa-item${selected ? " hv-qa-item--active" : ""}`}
                    style={{ "--hv-qa-row": index * 2 + 1 } as React.CSSProperties}
                    onClick={() => selectQuestion(index)}
                    onKeyDown={(event) => handleQuestionKeyDown(event, index)}
                  >
                    <span className="hv-qa-item-label">{question.question}</span>
                    <ChevronRight
                      className={`hv-qa-chevron${rtl ? " hv-qa-chevron--rtl" : ""}${selected ? " hv-qa-chevron--open" : ""}`}
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            <motion.article
              key={selectedIndex}
              id="knowledge-answer-panel"
              role={isCompact ? "region" : "tabpanel"}
              aria-labelledby={`knowledge-question-${selectedIndex}`}
              className="hv-card hv-qa-panel"
              style={{ "--hv-qa-row": selectedIndex * 2 + 2 } as React.CSSProperties}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.15 }}
              tabIndex={0}
            >
              <p className="hv-tagline-soft hv-qa-progress">
                {copy.questionProgress.replace("{current}", String(selectedIndex + 1)).replace("{total}", String(questionCount))}
              </p>
              <h3 className="hv-qa-title">{selectedQuestion.question}</h3>
              <p className="hv-qa-answer">{selectedQuestion.answer}</p>

              <div className="hv-qa-callout">
                <p className="hv-tagline-soft">{selectedQuestion.calloutLabel}</p>
                <p className="hv-qa-callout-copy">{selectedQuestion.callout}</p>
              </div>

              <div className="hv-qa-chips" aria-label={copy.sourceLabel}>
                {selectedQuestion.chips.map((chip) => (
                  <span className="hv-card__badge hv-qa-chip" key={chip}>{chip}</span>
                ))}
              </div>

              <div className="hv-qa-actions">
                <Button variant="primary" scale="lg">{selectedQuestion.primaryAction}</Button>
                <Button
                  variant="secondary-outline"
                  scale="lg"
                  aria-expanded={showSimpleExplanation}
                  aria-controls="knowledge-ai-explanation"
                  onClick={() => setShowSimpleExplanation((shown) => !shown)}
                >
                  {selectedQuestion.secondaryAction}
                </Button>
              </div>
              <p id="knowledge-ai-explanation" className="hv-qa-ai-explanation" role="region" hidden={!showSimpleExplanation}>
                {copy.aiExplanation}
              </p>
            </motion.article>
          </div>

          <p className="hv-caption hv-qa-footnote">{copy.illustrative}</p>
        </div>
      </div>
    </section>
  );
}
