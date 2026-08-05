"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Download,
  Globe,
  Home,
  Info,
  Layers,
  LayoutGrid,
  Menu,
  Search,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { Logo } from "./Logo";
import {
  DRAWER_MAX_WIDTH,
  LANGUAGES,
  NAV_ITEMS,
  useEscapeKey,
  useLockBodyScroll,
  useOutsideClick,
  type LanguageOption,
} from "./navbar.config";

const MENU_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  home: Home,
  features: LayoutGrid,
  "ai-assistant": Sparkles,
  modules: Layers,
  about: Info,
};

const SWIPE_CLOSE_THRESHOLD = 80;

export const MobileNavbar = React.memo(function MobileNavbar() {
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<LanguageOption>(
    LANGUAGES[0],
  );
  const [langQuery, setLangQuery] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const closeLang = useCallback(() => setIsLangOpen(false), []);

  useOutsideClick(drawerRef, closeDrawer, isDrawerOpen);
  useOutsideClick(langRef, closeLang, isLangOpen);
  useEscapeKey(closeDrawer, isDrawerOpen);
  useEscapeKey(closeLang, isLangOpen);
  useLockBodyScroll(isDrawerOpen);

  // Close the drawer whenever the route changes (e.g. a menu link was followed).
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  const filteredLanguages = useMemo(() => {
    const q = langQuery.trim().toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter((l) => l.label.toLowerCase().includes(q));
  }, [langQuery]);

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : (pathname?.startsWith(href) ?? false),
    [pathname],
  );

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    dragStartX.current = event.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((event: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - dragStartX.current;
    if (deltaX > SWIPE_CLOSE_THRESHOLD) setIsDrawerOpen(false);
    dragStartX.current = null;
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full lg:hidden">
      <nav
        aria-label="Primary"
        className="flex w-full items-center justify-between border-b border-amber-400/10 bg-emerald-950/95 px-4 py-2.5 shadow-lg shadow-black/20 backdrop-blur-xl"
      >
        <Link
          href="/"
          className="min-w-0 shrink rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <Logo compact />
        </Link>

        <div className="flex shrink-0 items-center gap-1">
          <div ref={langRef} className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              aria-label="Change language"
              onClick={() => setIsLangOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-emerald-50/90 outline-none transition-colors hover:bg-amber-400/10 focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95"
            >
              <Globe className="h-5 w-5" />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  role="listbox"
                  aria-label="Select language"
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-64 max-w-[80vw] overflow-hidden rounded-xl border border-amber-400/15 bg-emerald-950/95 shadow-2xl shadow-black/40 backdrop-blur-xl"
                >
                  <div className="border-b border-amber-400/10 p-3">
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-900/60 px-3 py-2">
                      <Search className="h-4 w-4 text-emerald-200/60" />
                      <input
                        value={langQuery}
                        onChange={(event) => setLangQuery(event.target.value)}
                        placeholder="Search language..."
                        aria-label="Search language"
                        className="w-full bg-transparent text-sm text-emerald-50 placeholder:text-emerald-200/40 outline-none"
                      />
                    </div>
                  </div>
                  <ul className="max-h-56 overflow-y-auto p-2">
                    {filteredLanguages.map((lang) => (
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
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-emerald-50/90 outline-none transition-colors hover:bg-amber-400/10 hover:text-amber-200 focus-visible:ring-2 focus-visible:ring-amber-400"
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
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-drawer"
            aria-label="Open menu"
            onClick={() => setIsDrawerOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-emerald-50/90 outline-none transition-colors hover:bg-amber-400/10 focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isDrawerOpen && (
          <React.Fragment key="drawer-root">
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeDrawer}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              key="drawer"
              id="mobile-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ maxWidth: DRAWER_MAX_WIDTH }}
              className="fixed inset-y-0 right-0 z-50 flex w-[85vw] flex-col bg-emerald-950 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-amber-400/10 px-5 py-4">
                <Logo compact />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeDrawer}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-emerald-50/90 outline-none transition-colors hover:bg-amber-400/10 focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto px-3 py-4">
                {NAV_ITEMS.map((item) => {
                  const Icon = MENU_ICON_MAP[item.key] ?? Home;
                  const active = isActive(item.href);
                  return (
                    <li key={item.key}>
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={`flex flex-1 items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 ${
                            active
                              ? "bg-amber-400/10 text-amber-300"
                              : "text-emerald-50/90 hover:bg-white/5"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </Link>
                        {item.children && (
                          <button
                            type="button"
                            aria-label={`Toggle ${item.label} submenu`}
                            aria-expanded={openSubmenu === item.key}
                            onClick={() =>
                              setOpenSubmenu((k) =>
                                k === item.key ? null : item.key,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-emerald-200/60 outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-amber-400"
                          >
                            <ChevronRight
                              className={`h-4 w-4 transition-transform duration-200 ${
                                openSubmenu === item.key ? "rotate-90" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {item.children && openSubmenu === item.key && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-8 overflow-hidden border-l border-amber-400/10 pl-3"
                          >
                            {item.children.map((child) => (
                              <li key={child.key}>
                                <Link
                                  href={child.href}
                                  className="block rounded-lg px-3 py-2 text-sm text-emerald-200/70 outline-none transition-colors hover:bg-white/5 hover:text-amber-200 focus-visible:ring-2 focus-visible:ring-amber-400"
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

              <div className="space-y-3 border-t border-amber-400/10 px-4 py-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {LANGUAGES.slice(0, 3).map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setActiveLanguage(lang)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        activeLanguage.code === lang.code
                          ? "border-amber-400 bg-amber-400/10 text-amber-300"
                          : "border-white/10 text-emerald-50/70 hover:border-amber-400/30"
                      }`}
                    >
                      <span aria-hidden="true">{lang.flag}</span>
                      {lang.nativeLabel}
                    </button>
                  ))}
                </div>

                <Link
                  href="/sign-in"
                  className="flex items-center justify-center gap-2 rounded-xl border border-amber-400/40 px-4 py-3 text-sm font-medium text-emerald-50 outline-none transition-colors hover:bg-amber-400/10 focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Link>

                <a
                  href="#download"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 px-4 py-3 text-sm font-semibold text-emerald-950 shadow-md shadow-amber-900/20 outline-none transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-200"
                >
                  <Download className="h-4 w-4" />
                  Download App
                </a>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </header>
  );
});
