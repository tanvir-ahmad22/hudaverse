"use client";

import { Check, Lock } from "lucide-react";
import type { CSSProperties } from "react";
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
type StepStatus = "done" | "current" | "locked";
const stepDefinitions: Array<{ status: StepStatus; score?: string }> = [
  { status: "done" },
  { status: "done" },
  { status: "done" },
  { status: "done", score: "4/5" },
  { status: "current" },
  { status: "locked" },
];
const layerStatuses = ["done", "current", "locked", "locked"] as const;

export default function ExploreLearning() {
  const { currentLang } = useLanguage();
  const language = currentLang in localeMap ? currentLang as keyof typeof localeMap : "en";
  const copy = localeMap[language].learning;
  const reduceMotion = Boolean(useReducedMotion());
  const completed = stepDefinitions.filter((step) => step.status === "done").length;
  const total = stepDefinitions.length;
  const percentage = Math.round((completed / total) * 100);
  const score = stepDefinitions.find((step) => step.score)?.score ?? "";
  const layers = [copy.layers.wordMeaning, copy.layers.tafsir, copy.layers.relatedHadith, copy.layers.fiqhContext];
  const stepsText = copy.labels.stepsCompleted.replace("{completed}", String(completed)).replace("{total}", String(total));
  const scoreText = copy.labels.quizScore.replace("{score}", score);

  const renderSource = () => (
    <li className="hv-card hv-stack-sheet hv-stack-sheet--front hv-stack-sheet--done" style={{ "--hv-stack-depth": 0 } as CSSProperties}>
      <div className="flex items-center justify-between gap-3">
        <span className="hv-tagline-soft">{copy.layers.sourceLabel}</span>
        <span className="hv-card__badge">{copy.sample}</span>
      </div>
      <p lang="ar" dir="rtl" className="hv-card__arabic">{copy.sourceText}</p>
      <p className="hv-body">{copy.sourceTranslation}</p>
      <div className="hv-stack-front-footer">
        <span className="hv-caption">{copy.labels.readingComplete}</span>
        <span className="hv-caption">{copy.labels.stepCount.replace("{n}", "1").replace("{total}", String(total))}</span>
      </div>
    </li>
  );

  const renderLayer = (title: string, description: string, status: typeof layerStatuses[number], index: number) => {
    const statusLabel = status === "done" ? copy.completed : status === "current" ? copy.inProgress : copy.upcoming;
    return (
      <li key={title} className={`hv-stack-sheet hv-stack-sheet--${status}`} style={{ "--hv-stack-depth": index + 1 } as CSSProperties}>
        <div className="hv-stack-sheet-strip">
          <h3 className="hv-h5">{title}</h3>
          <span className={`hv-card__badge ${status === "current" ? "hv-card__badge--gold" : ""}`}>
            {status === "done" && <Check size={14} aria-hidden="true" />}
            {status === "locked" && <Lock size={14} aria-hidden="true" />}
            {statusLabel}
          </span>
        </div>
        <p className="hv-stack-sheet-desc hv-card__description">{description}</p>
      </li>
    );
  };

  return (
    <section id="learning" aria-labelledby="explore-learning-title" lang={language} dir={isRTL(language) ? "rtl" : "ltr"} className="hv-section hv-explore-section scroll-mt-24">
      <div className="hv-container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.4 }}
          className="hv-split"
        >
          <div>
            <p className="hv-tagline-soft hv-explore-eyebrow">{copy.eyebrow}</p>
            <h2 id="explore-learning-title" className="hv-h2 hv-explore-title">{copy.title}</h2>
            <p className="hv-body-lg hv-explore-description">{copy.description}</p>
            <div className="hv-segments" role="img" aria-label={`${percentage}%`}>
              {stepDefinitions.map((step, index) => (
                <span key={index} className={`hv-segments-item hv-segments-item--${step.status}`} aria-hidden="true" />
              ))}
            </div>
            <div className="flex items-center justify-between gap-3" role="group" aria-label={`${stepsText}, ${scoreText}`}>
              <span className="hv-caption">{stepsText}, {scoreText}</span>
              <span className="hv-caption">{percentage}%</span>
            </div>
            <article className="hv-card">
              <div>
                <p className="hv-tagline-soft">{copy.labels.upNext}</p>
                <h3 className="hv-h4">{copy.steps[4].title}</h3>
                <p className="hv-caption">{copy.labels.minutesLeft.replace("{minutes}", "6")}</p>
              </div>
              <Button variant="primary" scale="lg">{copy.labels.continue}</Button>
            </article>
            <p className="hv-caption">{copy.labels.illustrative}</p>
          </div>

          <ol className="hv-stack" aria-label={copy.labels.layers}>
            {renderSource()}
            {layers.map((layer, index) => renderLayer(layer.title, layer.description, layerStatuses[index], index))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
