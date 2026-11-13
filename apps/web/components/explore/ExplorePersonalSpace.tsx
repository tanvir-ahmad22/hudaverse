"use client";

import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { isRTL } from "@/lib/language";
import { explore as en } from "@/locales/en/explore";
import { explore as bn } from "@/locales/bn/explore";
import { explore as ar } from "@/locales/ar/explore";
import { explore as ur } from "@/locales/ur/explore";
import { explore as fa } from "@/locales/fa/explore";
import { explore as tr } from "@/locales/tr/explore";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bookmark,
  BookOpen,
  Brain,
  Clock3,
  GraduationCap,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Settings,
  Sparkles,
} from "lucide-react";

const localeMap = { en, bn, ar, ur, fa, tr };

type PersonalTab = "bookmarks" | "learning" | "history";

type BookmarkItem = {
  type: "Ayah" | "Hadith" | "Dua";
  title: string;
  meta: string;
  icon: typeof BookOpen;
};

type PersonalCopy = (typeof en.personalSpace);
const bookmarkTypes: BookmarkItem["type"][] = ["Ayah", "Hadith", "Dua"];
const bookmarkIcons = [BookOpen, MessageCircle, Heart] as const;

/* ============================================================
   Main Section
============================================================ */

export default function ExplorePersonalSpace() {
  const { currentLang } = useLanguage();
  const language = currentLang in localeMap ? currentLang as keyof typeof localeMap : "en";
  const copy = localeMap[language].personalSpace;
  const [activeTab, setActiveTab] = useState<PersonalTab>("bookmarks");
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="personal-space"
      aria-labelledby="personal-space-heading"
      lang={language}
      dir={isRTL(language) ? "rtl" : "ltr"}
      className="hv-section hv-explore-section scroll-mt-24 relative isolate overflow-hidden bg-[var(--background)]"
    >
      {/* ======================================================
          Background Atmosphere
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12rem] top-16 h-[30rem] w-[30rem] rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,transparent)] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] bottom-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[var(--accent-light)]/15 blur-3xl"
      />

      <div className="hv-container relative z-10">
        {/* ====================================================
            Section Heading
        ==================================================== */}

        <motion.header
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.55,
            ease: "easeOut",
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="flex flex-col items-center">
            {/* Eyebrow */}

            <div className="hv-explore-eyebrow inline-flex items-center gap-2 rounded-full border border-[var(--border-light)] bg-[var(--surface)] px-3.5 py-1.5 text-[var(--primary-soft)] shadow-sm">
              <Sparkles
                className="h-3.5 w-3.5 text-[var(--accent)]"
                strokeWidth={1.7}
              />
              {copy.eyebrow}
            </div>

            {/* Heading */}

            <h2
              id="personal-space-heading"
              className="hv-explore-title mt-5 max-w-3xl text-[var(--text-dark)]"
            >
              {copy.titleStart}
              <span className="block text-[var(--accent)]">{copy.titleHighlight}</span>
            </h2>

            {/* Description */}

            <p className="hv-explore-description mx-auto mt-5 max-w-2xl text-center text-[var(--text-dark)]/55">
              {copy.description}
            </p>
          </div>
        </motion.header>

        {/* ====================================================
            Product Preview
        ==================================================== */}

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: 0.7,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-12 max-w-6xl sm:mt-14 lg:mt-16"
        >
          {/* ==================================================
              Desktop Browser
          ================================================== */}

          <div className="hv-card hidden overflow-hidden p-0 md:block">
            {/* Browser Header */}

            <BrowserHeader />

            {/* App Body */}

            <div className="flex min-h-[555px] bg-[var(--background)]">
              {/* Sidebar */}

              <DesktopSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                copy={copy}
              />

              {/* Main Area */}

              <div className="min-w-0 flex-1 p-7 lg:p-9">
                <DashboardHeader copy={copy} />

                <DashboardTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  copy={copy}
                />

                <div className="mt-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={
                        reducedMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 7,
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={
                        reducedMotion
                          ? undefined
                          : {
                              opacity: 0,
                              y: -5,
                            }
                      }
                      transition={{
                        duration: reducedMotion ? 0 : 0.22,
                      }}
                    >
                      <TabContent activeTab={activeTab} copy={copy} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              Mobile Phone
          ================================================== */}

          <div className="mx-auto w-full max-w-[390px] md:hidden">
            <div className="rounded-[2.4rem] border-[6px] border-[var(--border-light)] bg-[var(--primary)] p-1.5 shadow-[var(--shadow-dark)]">
              <div className="overflow-hidden rounded-[1.9rem] bg-[var(--background)]">
                {/* Phone Header */}

                <div className="relative flex h-12 items-center justify-center border-b border-[var(--border-light)]/[0.06] bg-[var(--surface)]">
                  <div className="absolute left-1/2 top-2 h-1.5 w-20 -translate-x-1/2 rounded-full bg-[var(--primary)]" />

                  <span className="mt-2 font-mono text-[9px] font-medium text-[var(--text-dark)]/30">
                    hudaverse.app
                  </span>
                </div>

                {/* Phone Content */}

                <div className="px-4 pb-4 pt-5">
                  <div className="mb-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--primary-soft)]">
                      {copy.eyebrow}
                    </p>

                    <h3 className="mt-1.5 font-subheading text-xl font-bold tracking-tight text-[var(--text-dark)]">
                      {copy.yourSpace}
                    </h3>

                    <p className="mt-1 text-[10px] leading-5 text-[var(--text-dark)]/45">
                      {copy.demo.tagline}
                    </p>
                  </div>

                  <DashboardTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    compact
                    copy={copy}
                  />

                  <div className="mt-4 min-h-[390px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={
                          reducedMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 6,
                              }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={
                          reducedMotion
                            ? undefined
                            : {
                                opacity: 0,
                                y: -4,
                              }
                        }
                        transition={{
                          duration: reducedMotion ? 0 : 0.2,
                        }}
                      >
                        <TabContent activeTab={activeTab} mobile copy={copy} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Mobile Bottom Navigation */}

                <MobileBottomNav
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  copy={copy}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   Browser Header
============================================================ */

function BrowserHeader() {
  return (
    <div className="flex h-[58px] items-center border-b border-[var(--border-light)]/[0.07] bg-[var(--surface)] px-5">
      {/* Window dots */}

      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]/15" />
      </div>

      {/* Address */}

      <div className="mx-auto flex h-8 w-[300px] items-center justify-center rounded-lg border border-[var(--border-light)]/[0.07] bg-[var(--background)] px-4">
        <span className="font-mono text-[10px] text-[var(--text-dark)]/35">
          hudaverse.app/profile
        </span>
      </div>

      <div className="w-[42px]" />
    </div>
  );
}

/* ============================================================
   Desktop Sidebar
============================================================ */

function DesktopSidebar({
  activeTab,
  onTabChange,
  copy,
}: {
  activeTab: PersonalTab;
  onTabChange: (tab: PersonalTab) => void;
  copy: PersonalCopy;
}) {
  return (
    <aside className="flex w-[76px] shrink-0 flex-col items-center border-r border-[var(--border-light)]/[0.07] bg-[var(--surface)] py-6">
      {/* Logo mark */}

      <div className="mb-8 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--accent-light)]">
        <Sparkles size={16} strokeWidth={1.6} />
      </div>

      <div className="flex flex-col items-center gap-3">
        <SidebarButton
          label={copy.demo.tabs[0]}
          icon={Bookmark}
          active={activeTab === "bookmarks"}
          onClick={() => onTabChange("bookmarks")}
        />

        <SidebarButton
          label={copy.demo.tabs[1]}
          icon={GraduationCap}
          active={activeTab === "learning"}
          onClick={() => onTabChange("learning")}
        />

        <SidebarButton
          label={copy.demo.tabs[2]}
          icon={Brain}
          active={activeTab === "history"}
          onClick={() => onTabChange("history")}
        />

        <div className="my-2 h-px w-7 bg-[var(--primary)]/[0.07]" />

        <SidebarButton
          label={copy.demo.settings}
          icon={Settings}
          active={false}
          onClick={() => undefined}
        />
      </div>
    </aside>
  );
}

function SidebarButton({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: typeof Bookmark;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={[
        "group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200",
        active
          ? "bg-[var(--background)] text-[var(--primary-soft)]"
          : "text-[var(--text-dark)]/30 hover:bg-[var(--background)] hover:text-[var(--primary-soft)]",
      ].join(" ")}
    >
      <Icon size={17} strokeWidth={1.7} />

      {active && (
        <span className="absolute -right-[18px] h-5 w-0.5 rounded-full bg-[var(--primary-soft)]" />
      )}
    </button>
  );
}

/* ============================================================
   Dashboard Header
============================================================ */

function DashboardHeader({ copy }: { copy: PersonalCopy }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--primary-soft)]">
          {copy.eyebrow}
        </p>

        <h3 className="mt-1.5 font-subheading text-xl font-bold tracking-tight text-[var(--text-dark)]">
          {copy.yourSpace}
        </h3>
      </div>

      <button
        type="button"
        aria-label={copy.demo.moreOptions}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-dark)]/30 transition hover:bg-[var(--primary)]/[0.04] hover:text-[var(--text-dark)]/60"
      >
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
}

/* ============================================================
   Dashboard Tabs
============================================================ */

function DashboardTabs({
  activeTab,
  onTabChange,
  copy,
  compact = false,
}: {
  activeTab: PersonalTab;
  onTabChange: (tab: PersonalTab) => void;
  copy: PersonalCopy;
  compact?: boolean;
}) {
  const tabs = [
    { id: "bookmarks" as const, icon: Bookmark, label: copy.demo.tabs[0] },
    { id: "learning" as const, icon: GraduationCap, label: copy.demo.tabs[1] },
    { id: "history" as const, icon: Brain, label: copy.demo.tabs[2] },
  ];
  return (
    <div
      role="tablist"
      className={[
        "flex items-center border-b border-[var(--border-light)]/[0.07]",
        compact ? "gap-0 overflow-x-auto" : "gap-1",
      ].join(" ")}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onTabChange(tab.id)}
            className={[
              "relative flex shrink-0 items-center gap-2 pb-3 pt-2 text-left font-bold transition-colors",
              compact ? "px-2 text-[9px]" : "px-3 text-xs",
              active
                ? "text-[var(--primary-soft)]"
                : "text-[var(--text-dark)]/35 hover:text-[var(--text-dark)]/60",
            ].join(" ")}
          >
            <Icon size={compact ? 13 : 14} strokeWidth={1.7} />

            <span>{tab.label}</span>

            {active && (
              <motion.span
                layoutId={
                  compact ? "personal-mobile-tab" : "personal-desktop-tab"
                }
                className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-[var(--primary-soft)]"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   Tab Content
============================================================ */

function TabContent({
  activeTab,
  mobile = false,
  copy,
}: {
  activeTab: PersonalTab;
  mobile?: boolean;
  copy: PersonalCopy;
}) {
  if (activeTab === "learning") {
    return <LearningContent mobile={mobile} copy={copy} />;
  }

  if (activeTab === "history") {
    return <HistoryContent mobile={mobile} copy={copy} />;
  }

  return <BookmarksContent mobile={mobile} copy={copy} />;
}

/* ============================================================
   Bookmarks
============================================================ */

function BookmarksContent({ mobile = false, copy }: { mobile?: boolean; copy: PersonalCopy }) {
  const bookmarks: BookmarkItem[] = copy.demo.savedItems.map((item, index) => ({
    ...item,
    type: bookmarkTypes[index],
    icon: bookmarkIcons[index],
  }));
  return (
    <div>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h4 className="font-subheading text-sm font-bold text-[var(--text-dark)]">
            {copy.savedForYou}
          </h4>

          <p className="mt-1 text-[10px] text-[var(--text-dark)]/40">
            {copy.returnTo}
          </p>
        </div>

        <span className="rounded-full bg-[var(--background)] px-2.5 py-1 text-[9px] font-bold text-[var(--primary-soft)]">
          {copy.demo.savedCount.replace("{count}", String(bookmarks.length))}
        </span>
      </div>

      <div
        className={["grid gap-3", mobile ? "grid-cols-1" : "grid-cols-3"].join(
          " ",
        )}
      >
        {bookmarks.map((item) => (
          <BookmarkCard key={item.type} item={item} copy={copy} />
        ))}
      </div>
    </div>
  );
}

function BookmarkCard({ item, copy }: { item: BookmarkItem; copy: PersonalCopy }) {
  const Icon = item.icon;

  return (
    <div className="group rounded-2xl border border-[var(--border-light)]/[0.07] bg-[var(--surface)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-light)]/15 hover:shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--background)] text-[var(--primary-soft)]">
          <Icon size={15} strokeWidth={1.7} />
        </div>

        <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--text-dark)]/25">
          {copy.demo.types[item.type]}
        </span>
      </div>

      <p className="mt-4 line-clamp-2 min-h-[38px] text-[11px] font-semibold leading-5 text-[var(--text-dark)]/70">
        {item.title}
      </p>

      <div className="mt-4 flex items-center gap-1.5 text-[9px] text-[var(--text-dark)]/30">
        <Clock3 size={10} strokeWidth={1.7} />

        <span>{item.meta}</span>
      </div>
    </div>
  );
}

/* ============================================================
   Learning
============================================================ */

function LearningContent({ mobile = false, copy }: { mobile?: boolean; copy: PersonalCopy }) {
  return (
    <div>
      <div className="mb-5">
        <h4 className="font-subheading text-sm font-bold text-[var(--text-dark)]">
          {copy.continueLearning}
        </h4>

        <p className="mt-1 text-[10px] text-[var(--text-dark)]/40">
          {copy.demo.learningDescription}
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border-light)]/[0.07] bg-[var(--surface)] p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--background)] text-[var(--primary-soft)]">
              <GraduationCap size={19} strokeWidth={1.6} />
            </div>

            <div className="min-w-0">
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--primary-soft)]">
                {copy.demo.pathLabel}
              </span>

              <h5 className="mt-1 font-subheading text-xs font-bold text-[var(--text-dark)] sm:text-sm">
                {copy.demo.pathTitle}
              </h5>
            </div>
          </div>

          <span className="shrink-0 text-xs font-bold text-[var(--primary-soft)]">
            50%
          </span>
        </div>

        {/* Progress */}

        <div className="mt-6">
          <div className="h-2 overflow-hidden rounded-full bg-[var(--primary)]/[0.06]">
            <div className="h-full w-1/2 rounded-full bg-[var(--primary-soft)]" />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[9px] font-medium text-[var(--text-dark)]/30">
            <span>{copy.demo.lessonsProgress}</span>
            <span>{copy.demo.keepGoing}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[var(--border-light)]/[0.06] pt-4">
          <div className="flex items-center gap-2 text-[9px] text-[var(--text-dark)]/35">
            <BookOpen size={12} strokeWidth={1.7} />

            <span>{copy.demo.learningCenter}</span>
          </div>

          <span className="text-[9px] font-bold text-[var(--primary-soft)]">
            {copy.demo.inProgress}
          </span>
        </div>
      </div>

      {!mobile && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          <MiniStat icon={BookOpen} label={copy.demo.lessonsStudied} value="12" />

          <MiniStat icon={Clock3} label={copy.demo.learningTime} value="2h 40m" />
        </div>
      )}
    </div>
  );
}

/* ============================================================
   AI History
============================================================ */

function HistoryContent({ mobile = false, copy }: { mobile?: boolean; copy: PersonalCopy }) {
  const historyItems = copy.demo.historyItems;
  return (
    <div>
      <div className="mb-5">
        <h4 className="font-subheading text-sm font-bold text-[var(--text-dark)]">
          {copy.previousQuestions}
        </h4>

        <p className="mt-1 text-[10px] text-[var(--text-dark)]/40">
          {copy.demo.historyDescription}
        </p>
      </div>

      <div className="space-y-2.5">
        {historyItems.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 rounded-2xl border border-[var(--border-light)]/[0.07] bg-[var(--surface)] p-4 transition hover:border-[var(--border-light)]/15"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--background)] text-[var(--primary-soft)]">
              <MessageCircle size={15} strokeWidth={1.7} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-[var(--text-dark)]/70">
                {item.title}
              </p>

              <div className="mt-1 flex items-center gap-1.5 text-[9px] text-[var(--text-dark)]/30">
                <Clock3 size={10} />

                <span>{item.time}</span>
              </div>
            </div>

            <MessageCircle size={14} className="shrink-0 text-[var(--text-dark)]/15" />
          </div>
        ))}
      </div>

      {!mobile && (
        <div className="mt-3 rounded-2xl border border-dashed border-[var(--border-light)]/10 bg-[var(--surface)]/60 p-4">
          <div className="flex items-center gap-2 text-[10px] text-[var(--text-dark)]/35">
            <Brain size={13} />

          <span>{copy.demo.historyNote}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Mini Stats
============================================================ */

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-light)]/[0.07] bg-[var(--surface)] p-4">
      <div className="flex items-center gap-2 text-[var(--text-dark)]/30">
        <Icon size={13} strokeWidth={1.7} />

        <span className="text-[9px] font-medium">{label}</span>
      </div>

      <p className="mt-2 font-subheading text-lg font-bold tracking-tight text-[var(--text-dark)]">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   Mobile Bottom Navigation
============================================================ */

function MobileBottomNav({
  activeTab,
  onTabChange,
  copy,
}: {
  activeTab: PersonalTab;
  onTabChange: (tab: PersonalTab) => void;
  copy: PersonalCopy;
}) {
  return (
    <nav className="grid grid-cols-4 border-t border-[var(--border-light)]/[0.07] bg-[var(--surface)] px-2 py-2">
      <MobileNavItem
        icon={Bookmark}
        label={copy.demo.mobileTabs[0]}
        active={activeTab === "bookmarks"}
        onClick={() => onTabChange("bookmarks")}
      />

      <MobileNavItem
        icon={GraduationCap}
        label={copy.demo.mobileTabs[1]}
        active={activeTab === "learning"}
        onClick={() => onTabChange("learning")}
      />

      <MobileNavItem
        icon={Brain}
        label={copy.demo.mobileTabs[2]}
        active={activeTab === "history"}
        onClick={() => onTabChange("history")}
      />

      <MobileNavItem
        icon={Settings}
        label={copy.demo.mobileTabs[3]}
        active={false}
        onClick={() => undefined}
      />
    </nav>
  );
}

function MobileNavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Bookmark;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex flex-col items-center gap-1 rounded-xl py-2 transition-colors",
        active
          ? "text-[var(--primary-soft)]"
          : "text-[var(--text-dark)]/25 hover:text-[var(--text-dark)]/50",
      ].join(" ")}
    >
      <Icon size={16} strokeWidth={1.7} />

      <span className="text-[8px] font-bold">{label}</span>
    </button>
  );
}
