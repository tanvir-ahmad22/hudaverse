"use client";

import React from "react";
import {
  BookOpen,
  Brain,
  Clock3,
  Heart,
  Moon,
  NotebookPen,
  Sun,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { isRTL } from "@/lib/language";
import { explore as en } from "@/locales/en/explore";
import { explore as bn } from "@/locales/bn/explore";
import { explore as ar } from "@/locales/ar/explore";
import { explore as ur } from "@/locales/ur/explore";
import { explore as fa } from "@/locales/fa/explore";
import { explore as tr } from "@/locales/tr/explore";

const localeMap = { en, bn, ar, ur, fa, tr };

type DayMoment = {
  time: string;
  title: string;
  description: string;
  icon: typeof BookOpen;
  tone: string;
};

const moments: DayMoment[] = [
  {
    time: "",
    title: "",
    description: "",
    icon: Clock3,
    tone: "gold",
  },
  {
    time: "",
    title: "",
    description: "",
    icon: BookOpen,
    tone: "green",
  },
  {
    time: "",
    title: "",
    description: "",
    icon: Brain,
    tone: "blue",
  },
  {
    time: "",
    title: "",
    description: "",
    icon: BookOpen,
    tone: "amber",
  },
  {
    time: "",
    title: "",
    description: "",
    icon: Heart,
    tone: "rose",
  },
  {
    time: "",
    title: "",
    description: "",
    icon: NotebookPen,
    tone: "night",
  },
];

const toneStyles: Record<
  string,
  {
    icon: string;
    dot: string;
    time: string;
  }
> = {
  gold: {
    icon: "bg-[var(--primary-dark)] text-[var(--accent-light)]",
    dot: "bg-[var(--accent)]",
    time: "text-[var(--accent)]",
  },
  green: {
    icon: "bg-[var(--primary)] text-[var(--accent-light)]",
    dot: "bg-[var(--primary)]",
    time: "text-[var(--primary)]",
  },
  blue: {
    icon: "bg-[var(--primary-dark)] text-[var(--accent-light)]",
    dot: "bg-[var(--primary)]",
    time: "text-[var(--primary-soft)]",
  },
  amber: {
    icon: "bg-[var(--primary-dark)] text-[var(--accent-light)]",
    dot: "bg-[var(--accent)]",
    time: "text-[var(--accent)]",
  },
  rose: {
    icon: "bg-[var(--primary-dark)] text-[var(--accent-light)]",
    dot: "bg-[var(--accent)]",
    time: "text-[var(--primary-soft)]",
  },
  night: {
    icon: "bg-[var(--primary)] text-[var(--accent-light)]",
    dot: "bg-[var(--accent-light)]",
    time: "text-[var(--primary-soft)]",
  },
};

function MomentCard({
  moment,
  index,
  reduceMotion,
}: {
  moment: DayMoment;
  index: number;
  reduceMotion: boolean;
}) {
  const Icon = moment.icon;
  const tone = toneStyles[moment.tone];

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: "easeOut",
      }}
      className="hv-day-card relative h-full min-w-0"
    >
      <div className="hv-card group flex h-full min-h-64 flex-col p-5 transition-shadow duration-300">
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.icon}`}
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </div>

          <span
            className={`pt-1 text-[10px] font-bold uppercase tracking-[0.18em] ${tone.time}`}
          >
            {moment.time}
          </span>
        </div>

        <h3 className="hv-h4 mt-4 text-[var(--text-dark)]">
          {moment.title}
        </h3>

        <p className="hv-day-description hv-body-sm mt-2 text-[var(--text-dark)]/55">
          {moment.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function Day() {
  const { currentLang } = useLanguage();
  const copy = localeMap[currentLang].day;
  const rtl = isRTL(currentLang);
  const reduceMotion = useReducedMotion() ?? false;
  const localizedMoments = moments.map((moment, index) => ({
    ...moment,
    ...copy.moments[index],
  }));

  const sectionRef = React.useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /*
   * The entire section gradually moves through:
   * dawn → daylight → afternoon → dusk → night.
   */
  const background = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.68, 0.88, 1],
    [
      "var(--background)",
      "var(--surface)",
      "var(--background)",
      "var(--surface)",
      "var(--background)",
      "var(--surface)",
    ],
  );

  const desktopIndicatorX = useTransform(
    scrollYProgress,
    [0, 1],
    rtl ? ["91.667%", "8.333%"] : ["8.333%", "91.667%"],
  );

  const mobileIndicatorY = useTransform(
    scrollYProgress,
    [0, 1],
    rtl ? ["100%", "0%"] : ["0%", "100%"],
  );

  const indicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.88, 1],
    [0.65, 1, 1, 0.8],
  );

  return (
    <motion.section
      ref={sectionRef}
      id="day"
      lang={currentLang}
      dir={rtl ? "rtl" : "ltr"}
      aria-labelledby="day-title"
      style={{
        background,
      }}
      className="hv-section hv-explore-section scroll-mt-24 relative isolate overflow-hidden"
    >
      {/* Ambient light */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: reduceMotion ? 0.4 : indicatorOpacity }}
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[var(--accent-light)]/20 blur-3xl"
      />

      <div className="hv-container relative z-10">
        {/* Header */}
        <motion.header
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="hv-explore-eyebrow inline-flex items-center gap-2 rounded-full border border-[var(--border-light)]/10 bg-[var(--surface)]/70 px-3.5 py-1.5 text-[var(--primary-soft)] shadow-sm backdrop-blur-sm">
            <Sun className="h-3.5 w-3.5 text-[var(--accent)]" strokeWidth={1.7} />{copy.badge}
          </div>

          <h2
            id="day-title"
            className="hv-explore-title mx-auto mt-6 max-w-4xl text-[var(--text-dark)]"
          >
            {copy.titleStart}
            <span className="block text-[var(--accent)]">
              {copy.titleHighlight}
            </span>
          </h2>

          <p className="hv-explore-description mx-auto mt-5 max-w-2xl text-[var(--text-dark)]/55">
            {copy.description}
          </p>
          <p className="hv-caption mx-auto mt-2 max-w-2xl text-center text-[var(--text-dark)]/40">
            {copy.disclaimer}
          </p>
        </motion.header>

        {/* Desktop day indicator */}
        {/* Desktop timeline */}
        <div className="relative mt-7 hidden md:block">
          <div className="grid auto-rows-fr grid-cols-2 items-stretch gap-5 lg:grid-cols-3 xl:grid-cols-6">
            {localizedMoments.map((moment, index) => (
              <MomentCard
                key={moment.time}
                moment={moment}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>

        {/* Desktop timeline rail and markers */}
        <div className="relative mx-auto mt-7 hidden w-full xl:block">
          <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--primary)]/10" />
          <motion.div
            aria-hidden="true"
            style={{
              left: reduceMotion ? "50%" : desktopIndicatorX,
              opacity: reduceMotion ? 1 : indicatorOpacity,
            }}
            className="absolute top-1/2 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-[var(--surface)] shadow-[var(--shadow-card)]"
          >
            <Sun className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.6} />
          </motion.div>
          <div className="relative grid grid-cols-6 gap-5">
            {localizedMoments.map((moment) => (
              <span key={moment.time} className="mx-auto h-3 w-3 rounded-full border-[3px] border-white bg-[var(--primary-soft)]" />
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="relative mt-10 md:hidden">
          {/* Vertical track */}
          <div className="absolute bottom-5 start-[18px] top-5 w-px bg-[var(--primary)]/10" />

          {/* Moving sun */}
          <motion.div
            aria-hidden="true"
            style={{
              top: mobileIndicatorY,
              opacity: reduceMotion ? 1 : indicatorOpacity,
            }}
            className="absolute start-[1px] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-[var(--surface)] shadow-[var(--shadow-card)]"
          >
            <Sun className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.6} />
          </motion.div>

          <div className="space-y-5">
            {localizedMoments.map((moment, index) => {
              const Icon = moment.icon;
              const tone = toneStyles[moment.tone];

              return (
                <motion.article
                  key={moment.time}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: rtl ? -18 : 18,
                        }
                  }
                  whileInView={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.04,
                    ease: "easeOut",
                  }}
                  className="hv-day-card relative ps-12"
                >
                  {/* Timeline point */}
                  <div
                    className={`absolute start-[13px] top-7 z-10 h-2.5 w-2.5 rounded-full border-2 border-white ${tone.dot}`}
                  />

                  <div className="hv-card p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.icon}`}
                        >
                          <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                        </div>

                        <div>
                          <p
                            className={`text-[9px] font-bold uppercase tracking-[0.17em] ${tone.time}`}
                          >
                            {moment.time}
                          </p>

                          <h3 className="mt-0.5 font-subheading text-base font-bold tracking-tight text-[var(--text-dark)]">
                            {moment.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="hv-day-description hv-body-sm mt-3 text-[var(--text-dark)]/55">
                      {moment.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Closing line */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 15,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-3 text-center"
        >
          <div className="h-px w-8 bg-[var(--accent)]/40" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-dark)]/35">
            {copy.closing}
          </p>

          <div className="h-px w-8 bg-[var(--accent)]/40" />
        </motion.div>

        {/* Night visual cue */}
        <div className="pointer-events-none absolute bottom-10 right-8 hidden md:block">
          <Moon className="h-5 w-5 text-white/20" strokeWidth={1.3} />
        </div>
      </div>
    </motion.section>
  );
}
