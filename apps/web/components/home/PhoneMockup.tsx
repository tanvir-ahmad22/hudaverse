"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Bot,
  CircleDot,
  Compass,
  Heart,
  Home,
  User,
} from "lucide-react";

const quickActions = [
  { label: "Quran", icon: BookOpen, accent: false },
  { label: "Dua", icon: Heart, accent: true },
  { label: "Tasbih", icon: CircleDot, accent: false },
  { label: "Qibla", icon: Compass, accent: false },
];

const navigationItems = [
  { icon: Home, label: "Home", active: true },
  { icon: BookOpen, label: "Quran", active: false },
  { icon: Bot, label: "AI", active: false },
  { icon: User, label: "Profile", active: false },
];

type PhoneMockupProps = {
  alt: string;
  className?: string;
  reduceMotion: boolean;
};

export default function PhoneMockup({
  alt,
  className = "",
  reduceMotion,
}: PhoneMockupProps) {
  return (
    <motion.div
      role="img"
      aria-label={alt}
      dir="ltr"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.65, ease: "easeOut" }}
      className={`relative aspect-[1/2] rounded-[2.2rem] border-[6px] border-[var(--primary)] bg-[var(--primary-dark)] p-1.5 shadow-[var(--shadow-dark)] ${className}`}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-white/10 bg-[var(--primary-dark)] px-3.5 pb-3 pt-6">
        <div className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/20" />

        <div className="flex items-center justify-between">
          <span className="font-heading text-[11px] font-semibold text-white">
            Huda<span className="text-[var(--accent-light)]">Verse</span>
          </span>
          <span className="h-4 w-4 rounded-full border border-white/20 bg-[var(--primary)]" />
        </div>

        <p className="mt-3 flex items-center gap-1 text-[10px] text-white/70">
          Assalamu Alaikum
          <Heart
            aria-hidden="true"
            className="h-2.5 w-2.5 fill-[var(--accent)] text-[var(--accent)]"
          />
        </p>
        <p className="text-[13px] font-semibold text-white">Your learning space</p>
        <p className="mt-0.5 text-[8px] text-white/55">Knowledge for every day</p>

        <div className="mt-3 rounded-2xl border border-white/10 bg-[var(--primary)] p-3">
          <span className="text-[9px] font-medium text-white/70">Next prayer</span>
          <p className="mt-1 text-lg font-bold tracking-tight text-white">
            Asr <span className="text-sm font-medium">01:45 PM</span>
          </p>
          <p className="text-[8px] text-white/55">Prayer times</p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[9px] font-medium text-white/65">Quick actions</span>
          <span className="text-[8px] text-white/55">View all</span>
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {quickActions.map(({ label, icon: Icon, accent }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  accent
                    ? "bg-[var(--accent)] text-[var(--primary-dark)]"
                    : "bg-[var(--primary)] text-[var(--text-on-dark)]"
                }`}
              >
                <Icon aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
              <span className="text-[7px] text-white/65">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex-1 rounded-2xl border border-white/10 bg-[var(--primary)] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-medium text-white/65">Daily verse</p>
            <BookOpen aria-hidden="true" className="h-3 w-3 text-[var(--accent-light)]" />
          </div>
          <p
            className="mt-2 text-right font-quran text-[13px] leading-relaxed text-white"
            dir="rtl"
            lang="ar"
          >
            لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا
          </p>
          <p className="mt-2 text-[8px] leading-relaxed text-white/70">
            Allah does not burden a soul beyond that it can bear.
          </p>
          <p className="mt-1 text-[7px] text-white/50">Al-Baqarah 2:286</p>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-white/10 px-1 pt-2">
          {navigationItems.map(({ icon: Icon, label, active }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <Icon
                aria-hidden="true"
                className={`h-3.5 w-3.5 ${
                  active ? "text-[var(--accent-light)]" : "text-white/50"
                }`}
              />
              <span
                className={`text-[7px] ${
                  active ? "text-[var(--accent-light)]" : "text-white/45"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
