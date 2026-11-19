"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import { BookOpen, Lock, ShieldCheck, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import enFooter from "../../locales/en/footer";
import bnFooter from "../../locales/bn/footer";
import arFooter from "../../locales/ar/footer";
import urFooter from "../../locales/ur/footer";
import faFooter from "../../locales/fa/footer";
import trFooter from "../../locales/tr/footer";
import { getEcosystemModuleForRoute, getEcosystemModuleHref } from "../../lib/ecosystem-navigation";

const FOOTER_LOCALES = { en: enFooter, bn: bnFooter, ar: arFooter, ur: urFooter, fa: faFooter, tr: trFooter };
const RTL_LANGUAGES = new Set(["ar", "ur", "fa"]);

function FooterColumn({ title, links, isRTL, reduceMotion }: { title: string; links: { label: string; href: string }[]; isRTL: boolean; reduceMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  return <motion.div ref={ref} initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6 }}>
    <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">{title}</h4>
    <ul className="space-y-3">{links.map((link) => {
      const moduleId = getEcosystemModuleForRoute(link.href);
      return <li key={link.href}><Link href={moduleId ? getEcosystemModuleHref(moduleId) : link.href} className="group inline-flex items-center gap-1.5 text-sm text-white/50 transition-all duration-200 hover:text-[var(--accent)]"><span>{link.label}</span><Arrow aria-hidden="true" className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100" /></Link></li>;
    })}</ul>
  </motion.div>;
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const reduceMotion = useReducedMotion() ?? false;
  const { currentLang } = useLanguage();
  const isRTL = RTL_LANGUAGES.has(currentLang);
  const content = useMemo(() => FOOTER_LOCALES[currentLang as keyof typeof FOOTER_LOCALES] ?? enFooter, [currentLang]);
  const trustBadges = [
    { icon: ShieldCheck, label: content.trust.noAds },
    { icon: Lock, label: content.trust.privacy },
    { icon: BookOpen, label: content.trust.authentic },
    { icon: Sparkles, label: content.trust.ai },
  ];
  const columns = [content.explore, content.platform, content.company].filter((column) => column.links.length > 0);

  return <footer ref={footerRef} dir={isRTL ? "rtl" : "ltr"} className="relative w-full overflow-hidden bg-gradient-to-b from-[var(--primary-dark)] to-[var(--primary-dark)]/95">
    <div className="hv-container relative py-16 lg:py-20">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={reduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6 }} className="sm:col-span-2 lg:col-span-3">
          <Link href="/" aria-label="HudaVerse home" className="flex items-center gap-3"><Image src="/logo-icon.png" alt="HudaVerse" width={40} height={40} className="h-10 w-10" /><span className="font-subheading text-2xl font-semibold tracking-tight"><span className="text-white">Huda</span><span className="text-[var(--accent)]">Verse</span></span></Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">{content.brand.description}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-3 py-1.5"><Sparkles aria-hidden="true" className="h-3 w-3 text-[var(--accent)]" /><span className="text-[10px] font-medium text-[var(--accent)]/80">{content.brand.badge}</span></div>
        </motion.div>
        {columns.map((column) => <div key={column.title} className="lg:col-span-3"><FooterColumn title={column.title} links={column.links} isRTL={isRTL} reduceMotion={reduceMotion} /></div>)}
      </div>
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={reduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ duration: 0.6 }} className="mt-12 flex flex-wrap items-center justify-center gap-3">
        {trustBadges.map(({ icon: Icon, label }) => <div key={label} className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5"><Icon aria-hidden="true" className="h-3.5 w-3.5 text-[var(--accent)]" /><span className="text-xs font-medium text-white/60">{label}</span></div>)}
      </motion.div>
      <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={reduceMotion || isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6 }} className="mt-12 border-t border-white/5 pt-8 text-center">
        <p className="text-xs text-white/30">© {new Date().getFullYear()} HudaVerse. {content.footer.rights}<span className="mx-2">·</span><span className="text-white/20">{content.footer.madeWith}</span></p>
      </motion.div>
    </div>
  </footer>;
}
