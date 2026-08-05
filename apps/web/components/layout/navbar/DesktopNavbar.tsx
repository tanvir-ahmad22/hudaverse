"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Apple,
  Check,
  ChevronDown,
  Download,
  Globe,
  Play,
  Search,
  ShieldCheck,
  Smartphone,
  User,
  X,
} from "lucide-react";
import { Logo } from "./Logo";
import {
  DOWNLOAD_LINKS,
  LANGUAGES,
  NAV_ITEMS,
  SCROLL_THRESHOLD,
  useEscapeKey,
  useIsScrolled,
  useOutsideClick,
  type DownloadIconKey,
  type LanguageOption,
} from "./navbar.config";

/** lucide-react has no official brand marks — these are neutral stand-ins.
 *  Swap for licensed Google Play / App Store badge assets before shipping. */
const DOWNLOAD_ICON_MAP: Record<
  DownloadIconKey,
  React.ComponentType<{ className?: string }>
> = {
  play: Play,
  apple: Apple,
  android: Smartphone,
};

export const DesktopNavbar = React.memo(function DesktopNavbar() {
  const pathname = usePathname();
  const isScrolled = useIsScrolled(SCROLL_THRESHOLD);

  const [activeLanguage, setActiveLanguage] = useState<LanguageOption>(
    LANGUAGES[0],
  );
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [langQuery, setLangQuery] = useState("");
  const [activeLangIndex, setActiveLangIndex] = useState(0);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const langRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const langSearchRef = useRef<HTMLInputElement>(null);

  const closeLang = useCallback(() => setIsLangOpen(false), []);
  const closeDownload = useCallback(() => setIsDownloadOpen(false), []);

  useOutsideClick(langRef, closeLang, isLangOpen);
  useOutsideClick(downloadRef, closeDownload, isDownloadOpen);
  useEscapeKey(closeLang, isLangOpen);
  useEscapeKey(closeDownload, isDownloadOpen);

  const filteredLanguages = useMemo(() => {
    const q = langQuery.trim().toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(
      (l) =>
        l.label.toLowerCase().includes(q) ||
        l.nativeLabel.toLowerCase().includes(q),
    );
  }, [langQuery]);

  const openLangDropdown = useCallback(() => {
    setIsLangOpen(true);
    setLangQuery("");
    setActiveLangIndex(0);
    requestAnimationFrame(() => langSearchRef.current?.focus());
  }, []);

  const handleLangKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveLangIndex((i) =>
          Math.min(i + 1, filteredLanguages.length - 1),
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveLangIndex((i) => Math.max(i - 1, 0));
      } else if (event.key === "Enter") {
        event.preventDefault();
        const lang = filteredLanguages[activeLangIndex];
        if (lang) {
          setActiveLanguage(lang);
          setIsLangOpen(false);
        }
      }
    },
    [filteredLanguages, activeLangIndex],
  );

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : (pathname?.startsWith(href) ?? false),
    [pathname],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden justify-center px-4 pt-4 lg:flex lg:px-8">
      <motion.nav
        aria-label="Primary"
        initial={false}
        animate={{
          height: isScrolled ? 68 : 80,
          backgroundColor: isScrolled
            ? "rgba(4, 20, 14, 0.92)"
            : "rgba(6, 36, 25, 0.8)",
          paddingLeft: isScrolled ? 20 : 28,
          paddingRight: isScrolled ? 20 : 28,
          boxShadow: isScrolled
            ? "0 12px 32px -8px rgba(0,0,0,0.45)"
            : "0 8px 24px -12px rgba(0,0,0,0.3)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex w-full max-w-7xl items-center justify-between rounded-2xl border border-amber-400/10 backdrop-blur-xl"
      >
        <Link
          href="/"
          className="shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <Logo compact={isScrolled} />
        </Link>

        <ul className="flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <li
                key={item.key}
                className="relative"
                onMouseEnter={() => item.children && setOpenSubmenu(item.key)}
                onMouseLeave={() => item.children && setOpenSubmenu(null)}
              >
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-haspopup={item.children ? "menu" : undefined}
                  aria-expanded={
                    item.children ? openSubmenu === item.key : undefined
                  }
                  className={`group relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    active
                      ? "text-amber-300"
                      : "text-emerald-50/90 hover:-translate-y-0.5 hover:text-amber-200"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        openSubmenu === item.key ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -bottom-1 left-3 right-3 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-200 shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-transform duration-200 ${
                      active ? "scale-x-100" : "group-hover:scale-x-100"
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {item.children && openSubmenu === item.key && (
                    <motion.ul
                      role="menu"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-amber-400/10 bg-emerald-950/95 p-2 shadow-xl shadow-black/30 backdrop-blur-xl"
                    >
                      {item.children.map((child) => (
                        <li key={child.key} role="none">
                          <Link
                            href={child.href}
                            role="menuitem"
                            className="block rounded-lg px-3 py-2 text-sm text-emerald-50/90 outline-none transition-colors hover:bg-amber-400/10 hover:text-amber-200 focus-visible:ring-2 focus-visible:ring-amber-400"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          {/* Language dropdown */}
          <div ref={langRef} className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              onClick={() => (isLangOpen ? closeLang() : openLangDropdown())}
              className="flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-emerald-50/90 outline-none transition-all duration-200 hover:border-amber-400/30 hover:bg-amber-400/5 focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Globe className="h-4 w-4" />
              {activeLanguage.code.toUpperCase()}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  isLangOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  role="listbox"
                  aria-label="Select language"
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  onKeyDown={handleLangKeyDown}
                  className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-amber-400/15 bg-emerald-950/95 shadow-2xl shadow-black/40 backdrop-blur-xl"
                >
                  <div className="border-b border-amber-400/10 px-4 py-3">
                    <p className="mb-2 text-sm font-semibold text-amber-300">
                      Select Language
                    </p>
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-900/60 px-3 py-2">
                      <Search className="h-4 w-4 text-emerald-200/60" />
                      <input
                        ref={langSearchRef}
                        value={langQuery}
                        onChange={(event) => {
                          setLangQuery(event.target.value);
                          setActiveLangIndex(0);
                        }}
                        placeholder="Search language..."
                        aria-label="Search language"
                        className="w-full bg-transparent text-sm text-emerald-50 placeholder:text-emerald-200/40 outline-none"
                      />
                    </div>
                  </div>

                  <ul className="max-h-64 overflow-y-auto p-2">
                    {filteredLanguages.map((lang, index) => (
                      <li
                        key={lang.code}
                        role="option"
                        aria-selected={activeLanguage.code === lang.code}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setActiveLanguage(lang);
                            setIsLangOpen(false);
                          }}
                          onMouseEnter={() => setActiveLangIndex(index)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
                            index === activeLangIndex
                              ? "bg-amber-400/10 text-amber-200"
                              : "text-emerald-50/90"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span aria-hidden="true">{lang.flag}</span>
                            {lang.label}
                          </span>
                          {activeLanguage.code === lang.code && (
                            <Check className="h-4 w-4 text-amber-400" />
                          )}
                        </button>
                      </li>
                    ))}
                    {filteredLanguages.length === 0 && (
                      <li className="px-3 py-6 text-center text-sm text-emerald-200/50">
                        No languages found
                      </li>
                    )}
                  </ul>
                  <p className="border-t border-amber-400/10 px-4 py-2 text-xs text-emerald-200/40">
                    More languages coming soon...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sign In */}
          <Link
            href="/sign-in"
            className="flex items-center gap-1.5 rounded-lg border border-amber-400/40 px-4 py-2 text-sm font-medium text-emerald-50 outline-none transition-all duration-200 hover:border-amber-400 hover:bg-amber-400/10 focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95"
          >
            <User className="h-4 w-4" />
            Sign In
          </Link>

          {/* Download App */}
          <div ref={downloadRef} className="relative">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isDownloadOpen}
              onClick={() => setIsDownloadOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-b from-amber-300 to-amber-500 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-md shadow-amber-900/20 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/30 focus-visible:ring-2 focus-visible:ring-amber-200 active:scale-95"
            >
              <Download className="h-4 w-4" />
              Download App
            </button>

            <AnimatePresence>
              {isDownloadOpen && (
                <motion.div
                  role="dialog"
                  aria-label="Download HudaVerse"
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-3 w-80 overflow-hidden rounded-2xl border border-amber-400/15 bg-emerald-950/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h2 className="text-base font-bold text-emerald-50">
                        Download HudaVerse
                      </h2>
                      <p className="text-xs text-emerald-200/60">
                        Your all-in-one Islamic companion
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={closeDownload}
                      aria-label="Close download popup"
                      className="rounded-full p-1 text-emerald-200/60 outline-none transition-colors hover:bg-white/5 hover:text-emerald-50 focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {DOWNLOAD_LINKS.map((link) => {
                      const Icon = DOWNLOAD_ICON_MAP[link.icon];
                      return (
                        <a
                          key={link.key}
                          href={link.href}
                          aria-disabled={link.disabled}
                          tabIndex={link.disabled ? -1 : 0}
                          onClick={(event) =>
                            link.disabled && event.preventDefault()
                          }
                          className={`flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-amber-400 ${
                            link.disabled
                              ? "cursor-not-allowed opacity-50"
                              : "hover:border-amber-400/30 hover:bg-amber-400/5"
                          }`}
                        >
                          <Icon className="h-6 w-6 shrink-0 text-amber-300" />
                          <span className="min-w-0 flex-1 text-left">
                            <span className="block text-xs text-emerald-200/60">
                              {link.label}
                            </span>
                            <span className="block text-sm font-semibold text-emerald-50">
                              {link.subLabel}
                            </span>
                          </span>
                          {link.badge && (
                            <span className="shrink-0 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-300">
                              {link.badge}
                            </span>
                          )}
                        </a>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-emerald-200/50">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-300" />
                    Safe, Secure &amp; Trusted by Millions
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
    </header>
  );
});
