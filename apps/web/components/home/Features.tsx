"use client";

import { useRef, useState } from "react";
import { BookOpen, BookMarked, Landmark, Scale, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { getEcosystemModuleHref } from "@/lib/ecosystem-navigation";
import { useLanguage } from "@/hooks/useLanguage";
import { isRTL } from "@/lib/language";
import { landing as en } from "@/locales/en/landing";
import { landing as bn } from "@/locales/bn/landing";
import { landing as ar } from "@/locales/ar/landing";
import { landing as ur } from "@/locales/ur/landing";
import { landing as fa } from "@/locales/fa/landing";
import { landing as tr } from "@/locales/tr/landing";

const copyByLanguage = { en, bn, ar, ur, fa, tr };
const stageKeys = ["quran", "hadith", "tafsir", "fiqh", "understanding"] as const;
const stageIcons = [BookOpen, Landmark, BookMarked, Scale, Sparkles];
const orbitPositions = ["top", "right", "bottom-right", "bottom-left", "left"] as const;
const number = (index: number) => String(index + 1).padStart(2, "0");

type KnowledgeCopy = (typeof en.features.knowledgeMap);

function StagePreview({ stage, copy }: { stage: number; copy: KnowledgeCopy }) {
  const visual = copy.visuals;
  if (stage === 0) return (
    <div className="hv-journey-preview hv-journey-quran">
      <span className="hv-journey-preview-label">{visual.chapter}</span>
      <span className="hv-journey-preview-reference">1:2</span>
      <p className="hv-journey-preview-arabic" lang="ar" dir="rtl">
        &#x0671;&#x0644;&#x0652;&#x062D;&#x064E;&#x0645;&#x0652;&#x062F;&#x064F; &#x0644;&#x0650;&#x0644;&#x0651;&#x064E;&#x0647;&#x0650; &#x0631;&#x064E;&#x0628;&#x0651;&#x0650; &#x0671;&#x0644;&#x0652;&#x0639;&#x064E;&#x0640;&#x0670;&#x0644;&#x064E;&#x0645;&#x0650;&#x064A;&#x0646;&#x064E;
      </p>
      <span className="hv-journey-verse-marker">٢</span>
      <p className="hv-journey-preview-translation">All praise is due to Allah,<br />Lord of the worlds.</p>
      <small>Al-Fatihah 1:2</small>
    </div>
  );
  if (stage === 1) return (
    <div className="hv-journey-preview hv-journey-hadith">
      <span className="hv-journey-preview-label">{visual.collection}</span>
      <p className="hv-journey-preview-arabic" lang="ar" dir="rtl">
        &#x0625;&#x0650;&#x0646;&#x0651;&#x064E;&#x0645;&#x064E;&#x0627; &#x0627;&#x0644;&#x0652;&#x0623;&#x064E;&#x0639;&#x0652;&#x0645;&#x064E;&#x0627;&#x0644;&#x064F; &#x0628;&#x0650;&#x0627;&#x0644;&#x0646;&#x0651;&#x0650;&#x064A;&#x0651;&#x064E;&#x0627;&#x062A;&#x0650;
      </p>
      <small>Sahih al-Bukhari · {visual.number} 1</small>
    </div>
  );
  if (stage === 2) return (
    <div className="hv-journey-preview hv-journey-layers">
      <span className="hv-journey-preview-label">{visual.readThrough}</span>
      <p lang="ar" dir="rtl">&#x0671;&#x0644;&#x0652;&#x062D;&#x064E;&#x0645;&#x0652;&#x062F;&#x064F; &#x0644;&#x0650;&#x0644;&#x0651;&#x064E;&#x0647;&#x0650;</p>
      <div>{visual.tafsirLayers.map((layer, index) => <span key={layer}><b>0{index + 1}</b>{layer}</span>)}</div>
    </div>
  );
  if (stage === 3) return (
    <div className="hv-journey-preview hv-journey-fiqh">
      <span className="hv-journey-preview-label">{visual.fiqhPositions}</span>
      <div>{visual.schools.map((school, index) => <span key={school}><b>0{index + 1}</b>{school}</span>)}</div>
      <small>{visual.fiqhEvidence}</small>
    </div>
  );
  return (
    <div className="hv-journey-preview hv-journey-synthesis">
      <span className="hv-journey-preview-label">{visual.relatedContext}</span>
      <div>{stageKeys.map((key, index) => <span key={key}>{index > 0 && <i aria-hidden="true">&rarr;</i>}<b>{copy.steps[key].title}</b></span>)}</div>
    </div>
  );
}

export default function Features() {
  const { currentLang } = useLanguage();
  const locale = copyByLanguage[currentLang] as typeof en;
  const copy = locale.features.knowledgeMap;
  const rtl = isRTL(currentLang);
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeKey = stageKeys[active];
  const activeStep = copy.steps[activeKey];
  const go = (index: number) => setActive(Math.max(0, Math.min(stageKeys.length - 1, index)));

  function onTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | undefined;
    if (event.key === "ArrowRight") next = index + (rtl ? -1 : 1);
    if (event.key === "ArrowLeft") next = index + (rtl ? 1 : -1);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = stageKeys.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    const selected = (next + stageKeys.length) % stageKeys.length;
    go(selected);
    tabs.current[selected]?.focus();
  }

  return (
    <section className="hv-section hv-knowledge-section" dir={rtl ? "rtl" : "ltr"} aria-labelledby="hv-knowledge-heading">
      <div className="hv-container hv-knowledge-layout">
        <header className="mx-auto mb-8 w-full max-w-2xl text-center">
          <p className="hv-tagline">{copy.eyebrow}</p>
          <h2 id="hv-knowledge-heading" className="hv-h2 mt-3">{copy.title}</h2>
          <p className="hv-body-lg mx-auto mt-4 max-w-xl">{copy.description}</p>
        </header>

        <div className="hv-journey-tabs" role="tablist" aria-label={copy.stepsLabel}>
          {stageKeys.map((key, index) => {
            const Icon = stageIcons[index];
            const title = copy.steps[key].title;
            return (
              <button
                key={key}
                ref={(node) => { tabs.current[index] = node; }}
                type="button"
                role="tab"
                id={`hv-journey-tab-${key}`}
                aria-selected={active === index}
                aria-controls="hv-journey-panel"
                tabIndex={active === index ? 0 : -1}
                aria-label={copy.nodeLabel.replace("{step}", String(index + 1)).replace("{title}", title)}
                className={`hv-journey-tab ${active === index ? "is-active" : ""}`}
                onClick={() => go(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                <span className="hv-journey-tab-icon"><Icon size={24} strokeWidth={1.6} aria-hidden="true" /></span>
                <span className="hv-journey-tab-title">{title}</span>
                <span className="hv-journey-tab-number">{number(index)}</span>
              </button>
            );
          })}
        </div>

        <article id="hv-journey-panel" role="tabpanel" aria-labelledby={`hv-journey-tab-${activeKey}`} className="hv-card hv-journey-card p-0">
          <div className="hv-journey-orbit" aria-label={copy.diagramLabel}>
            <div className="hv-journey-orbit-rings" aria-hidden="true" />
            {stageKeys.map((key, index) => {
              const Icon = stageIcons[index];
              return (
                <button
                  key={key}
                  type="button"
                  className={`hv-journey-orbit-node hv-orbit-${orbitPositions[index]} ${index === active ? "is-active" : ""}`}
                  aria-label={copy.nodeLabel.replace("{step}", String(index + 1)).replace("{title}", copy.steps[key].title)}
                  aria-current={active === index ? "step" : undefined}
                  onClick={() => go(index)}
                >
                  <Icon size={30} strokeWidth={1.6} aria-hidden="true" />
                </button>
              );
            })}
            <div className="hv-journey-orbit-core" aria-hidden="true"><BookOpen size={76} strokeWidth={1.35} /></div>
            <span className="hv-journey-orbit-center-label">{copy.steps.quran.title}</span>
          </div>

          <div className="hv-journey-content">
            <div className="hv-journey-copy" aria-live="polite" aria-atomic="true">
              <span className="hv-journey-step-count">{copy.stepLabel} {number(active)} {copy.ofLabel} 05</span>
              <h3>{activeStep.title}</h3>
              <p>{activeStep.description}</p>
              <div className="hv-journey-divider" aria-hidden="true"><span /></div>
              <StagePreview stage={active} copy={copy} />
              <div className="hv-journey-actions">
                <Button href={activeKey === "quran" || activeKey === "hadith" ? getEcosystemModuleHref(activeKey) : "/explore"} variant="primary">
                  {locale.features.exploreLabel} {activeStep.title}
                  <span aria-hidden="true">{rtl ? <>&larr;</> : <>&rarr;</>}</span>
                </Button>
                <div className="hv-journey-step-controls">
                  <button type="button" onClick={() => go(active - 1)} disabled={active === 0}>{copy.controls.back}</button>
                  <button type="button" onClick={() => go(active + 1)} disabled={active === stageKeys.length - 1}>{copy.controls.next}</button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
