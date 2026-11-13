"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpenCheck, Copy, GraduationCap, LibraryBig } from "lucide-react";
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
const SOURCE_URL = "https://quran.com/al-baqarah/286";

function ShieldIcon({ className = "" }: { className?: string }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 20 6v5c0 5.2-3.4 8.3-8 10-4.6-1.7-8-4.8-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>;
}

export default function Trust() {
  const { currentLang } = useLanguage();
  const copy = localeMap[currentLang].trust;
  const rtl = isRTL(currentLang);
  const reduceMotion = useReducedMotion() ?? false;
  const [copied, setCopied] = useState(false);
  const stepIcons = [ArrowUpRight, BookOpenCheck, LibraryBig, GraduationCap];

  async function copyReference() {
    try {
      await navigator.clipboard.writeText(`${copy.referenceTitle} — ${SOURCE_URL}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="trust" lang={currentLang} dir={rtl ? "rtl" : "ltr"} aria-labelledby="trust-title" className="hv-section hv-explore-section scroll-mt-24 relative isolate overflow-hidden bg-[var(--background)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image src="/Elegant Islamic Geometric Mosque Landscape.png" alt="" fill sizes="100vw" className="object-cover object-center opacity-40 max-sm:object-[62%_center]" />
      </div>
      <div className="hv-container relative">
        <motion.header initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
          <p className="hv-explore-eyebrow inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-3 py-1.5 text-[var(--primary)]"><ShieldIcon className="h-4 w-4" />{copy.eyebrow}</p>
          <h2 id="trust-title" className="hv-explore-title mx-auto mt-4 max-w-3xl text-[var(--primary)]">{copy.title}</h2>
          <p className="hv-explore-description mx-auto mt-4 max-w-2xl text-[var(--text-dark)]">{copy.description}</p>
        </motion.header>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <ol className="grid gap-4">
            {copy.steps.map((step, index) => (
              <motion.li key={step.title} initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.06 }} className="grid grid-cols-[32px_48px_minmax(0,1fr)] items-center gap-3">
                <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-[var(--primary)] font-[var(--hv-font-subheading)] text-xs font-semibold text-white">{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true" className="grid aspect-square place-items-center rounded-xl border border-[var(--border-light)] bg-[var(--surface)]/90 text-[var(--primary)]">
                  {React.createElement(stepIcons[index], { className: `h-6 w-6 ${index === 2 ? "text-[var(--accent)]" : "text-[var(--primary)]"}`, strokeWidth: 1.6 })}
                </span>
                <span className="min-w-0 border-s-[1px] border-[var(--accent)] ps-3 sm:ps-4">
                <strong className="hv-h4 block text-[var(--text-dark)]">{step.title}</strong>
                <span className="hv-body-sm mt-1 block text-[var(--text-muted)]">{step.description}</span>
                </span>
              </motion.li>
            ))}
          </ol>

          <motion.article initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55 }} className="hv-card overflow-hidden p-0">
            <div className="flex min-h-12 items-center gap-3 bg-[var(--primary)] px-5 py-3 text-white"><BookOpenCheck aria-hidden="true" className="h-5 w-5" /><span className="font-[var(--hv-font-subheading)] text-sm font-semibold uppercase tracking-[0.08em]">{copy.cardTitle}</span></div>
            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-light)] pb-4">
                <h3 className="hv-h4 text-[var(--text-dark)]">{copy.referenceTitle}</h3>
                <span className="rounded-full bg-[var(--background)] px-3 py-1.5 font-[var(--hv-font-subheading)] text-xs font-medium text-[var(--primary)]">{copy.contentType}</span>
              </div>
              <dl className="divide-y divide-[var(--border-light)]">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-4"><dt className="font-[var(--hv-font-subheading)] text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">{copy.referenceLabel}</dt><dd className="text-end font-[var(--hv-font-body)] text-base text-[var(--text-dark)]">{copy.referenceValue}</dd></div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4"><dt className="font-[var(--hv-font-subheading)] text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">{copy.originalTextLabel}</dt><dd lang="ar" dir="rtl" className="font-[var(--hv-font-quran)] text-[1.8rem] leading-[1.8] text-[var(--primary)]">لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا</dd></div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-4"><dt className="font-[var(--hv-font-subheading)] text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">{copy.translationLabel}</dt><dd className="max-w-[15rem] text-end font-[var(--hv-font-body)] text-sm text-[var(--text-muted)]">{copy.translationUnavailable}</dd></div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-4"><dt className="font-[var(--hv-font-subheading)] text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">{copy.explanationLabel}</dt><dd className="text-end font-[var(--hv-font-body)] text-sm text-[var(--text-muted)]">{copy.attributionUnavailable}</dd></div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4"><dt className="font-[var(--hv-font-subheading)] text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">{copy.contentTypeLabel}</dt><dd className="rounded-full bg-[var(--background)] px-3 py-1.5 font-[var(--hv-font-body)] text-sm text-[var(--primary)]">{copy.contentType}</dd></div>
              </dl>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button href={SOURCE_URL} target="_blank" rel="noopener noreferrer" variant="primary-outline" scale="lg" fullWidth><ArrowUpRight aria-hidden="true" className="h-5 w-5" />{copy.openSource}</Button>
                <Button onClick={copyReference} variant="primary-outline" scale="lg" fullWidth><Copy aria-hidden="true" className="h-5 w-5" />{copied ? copy.copied : copy.copyReference}</Button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{copy.sourceNote}</p>
            </div>
          </motion.article>
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-xl border border-[var(--border-light)] bg-[var(--surface)]/90 p-5">
          <ShieldIcon className="h-8 w-8 shrink-0 text-[var(--primary)]" />
          <div className="border-s border-[var(--accent)] ps-4"><p className="hv-h4 text-[var(--text-dark)]">{copy.stripTitle}</p><p className="hv-body-sm mt-1 text-[var(--text-muted)]">{copy.stripDescription}</p></div>
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center font-[var(--hv-font-body)] text-sm leading-relaxed text-[var(--text-muted)]">{copy.disclaimer}</p>
      </div>
    </section>
  );
}
