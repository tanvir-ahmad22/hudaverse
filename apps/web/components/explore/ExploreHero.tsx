"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { isRTL } from "@/lib/language";
import { explore as en } from "@/locales/en/explore";
import { explore as bn } from "@/locales/bn/explore";
import { explore as ar } from "@/locales/ar/explore";
import { explore as ur } from "@/locales/ur/explore";
import { explore as fa } from "@/locales/fa/explore";
import { explore as tr } from "@/locales/tr/explore";

const localeMap = { en, bn, ar, ur, fa, tr };
type Language = keyof typeof localeMap;
type FormSegment = readonly [text: string, isRoot: 0 | 1];
type RootWord = {
  ar: string;
  root: string[] | null;
  forms: FormSegment[][];
};

// Illustrative roots, forms and patterns require qualified scholarly review before release.
const ROOT_WORDS: RootWord[] = [
  {
    ar: "اِقْرَأْ", root: ["ق", "ر", "أ"], forms: [
      [["اِ", 0], ["قْ", 1], ["رَ", 1], ["أْ", 1]],
      [["قُ", 1], ["رْ", 1], ["آ", 1], ["نْ", 0]],
      [["قِ", 1], ["رَ", 1], ["ا", 0], ["ءَ", 1], ["ة", 0]],
      [["قَ", 1], ["ا", 0], ["رِ", 1], ["ئ", 1]],
      [["مَ", 0], ["قْ", 1], ["رُ", 1], ["و", 0], ["ء", 1]],
    ],
  },
  {
    ar: "بِاسْمِ", root: ["س", "م", "و"], forms: [
      [["اِ", 0], ["سْ", 1], ["مْ", 1]],
      [["سَ", 1], ["مَّ", 1], ["ى", 1]],
      [["مُ", 0], ["سَ", 1], ["مًّ", 1], ["ى", 1]],
    ],
  },
  {
    ar: "رَبِّكَ", root: ["ر", "ب", "ب"], forms: [
      [["رَ", 1], ["بّ", 1]],
      [["رَ", 1], ["بَّ", 1], ["ى", 0]],
      [["تَ", 0], ["رْ", 1], ["بِ", 1], ["يَ", 0], ["ة", 0]],
    ],
  },
  {
    ar: "الَّذِي", root: null, forms: [
      [["الَّ", 0], ["تِ", 0], ["ي", 0]],
      [["الَّ", 0], ["ذِ", 0], ["ينَ", 0]],
    ],
  },
  {
    ar: "خَلَقَ", root: ["خ", "ل", "ق"], forms: [
      [["خَ", 1], ["لْ", 1], ["قْ", 1]],
      [["خَ", 1], ["ا", 0], ["لِ", 1], ["قْ", 1]],
      [["مَ", 0], ["خْ", 1], ["لُ", 1], ["و", 0], ["قْ", 1]],
    ],
  },
];

function getFontClasses(language: Language) {
  if (language === "bn") return { heading: "font-bangla", body: "font-bangla" };
  if (language === "ur") return { heading: "font-urdu", body: "font-urdu" };
  if (language === "fa") return { heading: "font-persian", body: "font-persian" };
  if (language === "ar") return { heading: "font-arabic", body: "font-arabic" };
  return { heading: "font-heading", body: "font-sans" };
}

export default function ExploreHero() {
  const { currentLang } = useLanguage();
  const language: Language = currentLang in localeMap ? currentLang as Language : "en";
  const copy = localeMap[language].hero;
  const rtl = isRTL(language);
  const fonts = getFontClasses(language);
  const reduceMotion = useReducedMotion() ?? false;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const wordButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const activeWord = ROOT_WORDS[currentIndex];
  const activeCopy = copy.words[currentIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => setPlaying(!reduceMotion), 0);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (!playing || reduceMotion) return;
    const timer = window.setTimeout(() => {
      setCurrentIndex((index) => (index + 1) % ROOT_WORDS.length);
    }, 5600);
    return () => window.clearTimeout(timer);
  }, [currentIndex, playing, reduceMotion]);

  function selectWord(index: number) {
    setCurrentIndex(index);
    setPlaying(false);
  }

  function handleWordKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const nextIndex = event.key === "ArrowLeft"
      ? (index + 1) % ROOT_WORDS.length
      : (index - 1 + ROOT_WORDS.length) % ROOT_WORDS.length;
    selectWord(nextIndex);
    wordButtons.current[nextIndex]?.focus();
  }

  return (
    <section
      id="explore-hero"
      lang={language}
      dir={rtl ? "rtl" : "ltr"}
      aria-labelledby="explore-hero-title"
      className="hv-explore-hero"
    >
      <Image
        src="/explore-hero-bg-img.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="hv-explore-hero-background"
      />
      <div className="hv-container hv-explore-hero-inner">
        <header className={`hv-explore-hero-copy ${fonts.body}`}>
          <p className="hv-explore-hero-eyebrow">{copy.eyebrow}</p>
          <h1 id="explore-hero-title" className="hv-h1 hv-explore-hero-heading">
            <span className={fonts.heading}>{copy.headingStart} </span>
            <em className={fonts.heading}>{copy.headingHighlight}</em>
          </h1>
          <p className="hv-explore-hero-description">{copy.description}</p>
          <div className="hv-explore-hero-signoff">
            <span aria-hidden="true" />
            <span>{copy.hint}</span>
          </div>
        </header>

        <section className={`hv-explore-hero-root-card ${fonts.body}`} aria-label={copy.visualizerLabel}>
          <p className="hv-explore-hero-root-card-citation">{copy.citation}</p>
          <div
            className="hv-explore-hero-root-card-words"
            role="group"
            aria-label={copy.regionLabel}
            lang="ar"
            dir="rtl"
          >
            {ROOT_WORDS.map((item, index) => (
              <button
                key={item.ar}
                ref={(element) => { wordButtons.current[index] = element; }}
                type="button"
                className="hv-explore-hero-root-card-word"
                aria-pressed={currentIndex === index}
                aria-label={`${copy.selectWordLabel}: ${copy.words[index].meaning}`}
                onClick={() => selectWord(index)}
                onKeyDown={(event) => handleWordKeyDown(event, index)}
              >
                {item.ar}
              </button>
            ))}
          </div>

          <div key={`${currentIndex}-${playing}`} className={`hv-explore-hero-root-card-progress${playing ? "" : " paused"}`}>
            <div className="hv-explore-hero-root-card-bars" aria-hidden="true">
              {ROOT_WORDS.map((item, index) => (
                <span key={item.ar} className={`hv-explore-hero-root-card-bar${index < currentIndex ? " done" : ""}${index === currentIndex ? " current" : ""}`}>
                  <b />
                </span>
              ))}
            </div>
            {!reduceMotion && (
              <Button
                type="button"
                variant="primary"
                aria-pressed={playing}
                onClick={() => setPlaying((value) => !value)}
              >
                {playing ? copy.pause : copy.play}
              </Button>
            )}
          </div>

          <div className="hv-explore-hero-root-card-panel" tabIndex={0} aria-live="polite" aria-atomic="true">
            <div className="hv-explore-hero-root-card-head">
              <span className="hv-explore-hero-root-card-meaning">{activeCopy.meaning}</span>
              <span className="hv-explore-hero-root-card-transliteration" dir="ltr">{activeCopy.transliteration}</span>
            </div>
            <div className="hv-explore-hero-root-card-rootbox">
              <span className="hv-explore-hero-root-card-label">
                {activeWord.root ? copy.rootLabel : copy.noRootLabel}
              </span>
              {activeWord.root ? (
                <div className="hv-explore-hero-root-card-tiles" lang="ar" dir="rtl">
                  {activeWord.root.map((letter, index) => (
                    <span key={`${letter}-${index}`} style={{ "--tile-index": index } as CSSProperties}>{letter}</span>
                  ))}
                </div>
              ) : null}
              <p className="hv-explore-hero-root-card-caption">{activeCopy.caption}</p>
            </div>
            <ul className="hv-explore-hero-root-card-forms" aria-label={copy.formsLabel}>
              {activeWord.forms.map((form, index) => {
                const formCopy = activeCopy.forms[index];
                return (
                  <li key={`${currentIndex}-${index}`} style={{ "--form-index": index } as CSSProperties}>
                    <span className="hv-explore-hero-root-card-form-arabic" lang="ar" dir="rtl">
                      {form.map(([segment, isRoot], segmentIndex) => (
                        <span className={isRoot ? "is-root" : undefined} key={`${segment}-${segmentIndex}`}>{segment}</span>
                      ))}
                    </span>
                    <span className="hv-explore-hero-root-card-form-meaning">
                      {formCopy.meaning}
                      <small dir="ltr">{formCopy.transliteration}</small>
                    </span>
                    <span className="hv-explore-hero-root-card-form-pattern">{formCopy.pattern}</span>
                  </li>
                );
              })}
            </ul>
            <p className="hv-explore-hero-root-card-note">{copy.illustrative}</p>
          </div>
        </section>
      </div>
    </section>
  );
}
