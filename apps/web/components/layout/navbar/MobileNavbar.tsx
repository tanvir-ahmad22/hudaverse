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
  BookOpen,
  ChevronRight,
  Compass,
  GraduationCap,
  Home,
  Info,
  Layers,
  Menu,
  User,
  X,
} from "lucide-react";

import { Logo } from "./Logo";
import LanguageSwitcher from "../LanguageSwitcher";

import {
  DRAWER_MAX_WIDTH,
  getNavItems,
  SCROLL_THRESHOLD,
  useEscapeKey,
  useIsScrolled,
  useLockBodyScroll,
} from "./navbar.config";

import { useLanguage } from "../../../hooks/useLanguage";
import { Button } from "@/components/ui/Button";
import { isRTL } from "@/lib/language";
import {
  ECOSYSTEM_MODULE_EVENT,
  isEcosystemModuleId,
} from "@/lib/ecosystem-navigation";

/* ================================================================
   LOCALE IMPORTS
================================================================ */

import enNavbar from "../../../locales/en/navbar";
import bnNavbar from "../../../locales/bn/navbar";
import arNavbar from "../../../locales/ar/navbar";
import urNavbar from "../../../locales/ur/navbar";
import faNavbar from "../../../locales/fa/navbar";
import trNavbar from "../../../locales/tr/navbar";

import type { NavbarTranslations } from "../../../locales/en/navbar";

const NAVBAR_LOCALES: Record<string, NavbarTranslations> = {
  en: enNavbar,
  bn: bnNavbar,
  ar: arNavbar,
  ur: urNavbar,
  fa: faNavbar,
  tr: trNavbar,
};

const DEFAULT_LANGUAGE = "en";

const SWIPE_CLOSE_THRESHOLD = 80;
const MOBILE_DRAWER_ID = "mobile-navigation-drawer";

/* ================================================================
   ICON MAP — matches the locked primary nav keys
================================================================ */

const MENU_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  home: Home,
  explore: Compass,
  ecosystem: Layers,
  learning: GraduationCap,
  knowledge: BookOpen,
  about: Info,
};

/* ================================================================
   MOBILE NAVBAR
================================================================ */

export const MobileNavbar = React.memo(function MobileNavbar() {
  const pathname = usePathname();
  const { currentLang } = useLanguage();
  const [currentHash, setCurrentHash] = useState("");

  const translations = useMemo<NavbarTranslations>(() => {
    return NAVBAR_LOCALES[currentLang] ?? NAVBAR_LOCALES[DEFAULT_LANGUAGE];
  }, [currentLang]);

  const isScrolled = useIsScrolled(SCROLL_THRESHOLD);
  const lightHero = pathname === "/about" && !isScrolled;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const drawerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const navItems = useMemo(() => getNavItems(translations), [translations]);

  const languageCode = currentLang;
  const rtl = isRTL(languageCode);

  const closeDrawer = useCallback((restoreFocus = true) => {
    setIsDrawerOpen(false);
    setOpenAccordion(null);
    if (restoreFocus) {
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((current) => {
      if (current) {
        setOpenAccordion(null);
      }
      return !current;
    });
  }, []);

  useEscapeKey(closeDrawer, isDrawerOpen);
  useLockBodyScroll(isDrawerOpen);

  useEffect(() => {
    if (!isDrawerOpen) return;
    requestAnimationFrame(() => {
      drawerRef.current
        ?.querySelector<HTMLElement>('a[href], button:not([disabled])')
        ?.focus();
    });
  }, [isDrawerOpen]);

  useEffect(() => {
    closeDrawer(false);
  }, [pathname, closeDrawer]);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/";
      }
      const [path, fragment] = href.split("#");
      if (fragment) {
        return pathname === path && currentHash === `#${fragment}`;
      }
      return pathname?.startsWith(path) ?? false;
    },
    [pathname, currentHash],
  );

  const handleNavigation = useCallback(() => {
    closeDrawer(false);
  }, [closeDrawer]);

  const handleChildNavigation = useCallback(
    (parentKey: string, childKey: string) => {
      if (parentKey === "ecosystem" && isEcosystemModuleId(childKey)) {
        window.dispatchEvent(
          new CustomEvent(ECOSYSTEM_MODULE_EVENT, {
            detail: { moduleId: childKey },
          }),
        );
      }
      closeDrawer(false);
    },
    [closeDrawer],
  );

  const toggleAccordion = useCallback((key: string) => {
    setOpenAccordion((current) => (current === key ? null : key));
  }, []);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
    },
    [],
  );

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      if (touchStartX.current === null || touchStartY.current === null) {
        return;
      }

      const touch = event.changedTouches[0];
      if (!touch) {
        touchStartX.current = null;
        touchStartY.current = null;
        return;
      }

      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = Math.abs(touch.clientY - touchStartY.current);
      const horizontalSwipe = Math.abs(deltaX) > deltaY * 1.25;

      if (
        (rtl ? deltaX < -SWIPE_CLOSE_THRESHOLD : deltaX > SWIPE_CLOSE_THRESHOLD) &&
        horizontalSwipe
      ) {
        closeDrawer();
      }

      touchStartX.current = null;
      touchStartY.current = null;
    },
    [closeDrawer, rtl],
  );

  /* ================================================================
     RENDER
  ================================================================= */

  return (
    <header
      className="
        pointer-events-none
        fixed
        inset-x-0
        top-0
        z-[100]
        w-full
        max-w-full
        overflow-visible
        lg:hidden
      "
    >
      {/* ==========================================================
          TOP MOBILE NAVBAR
      =========================================================== */}

      <motion.nav
        aria-label={translations.mobile.navLabel}
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "var(--primary-dark)"
            : "rgba(0, 0, 0, 0)",
          boxShadow: isScrolled ? "var(--shadow-navbar)" : "0 0 0 rgba(0,0,0,0)",
          borderBottomColor: isScrolled
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0)",
          backdropFilter: isScrolled ? "blur(18px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          paddingInline: "var(--layout-gutter)",
          WebkitBackdropFilter: isScrolled ? "blur(18px)" : "blur(0px)",
          backgroundImage: lightHero ? "none" : "linear-gradient(to bottom, color-mix(in srgb, var(--primary-dark) 70%, transparent), transparent)",
        }}
        className="
          pointer-events-auto
          relative
          flex
          h-14
          w-full
          max-w-full
          items-center
          justify-between
          border-b
          sm:h-16
        "
      >
        <Link
          href="/"
          aria-label="HudaVerse"
          className="
            flex
            min-w-0
            max-w-[55%]
            shrink
            items-center
            overflow-hidden
            rounded-lg
            touch-manipulation
            outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--accent)]
          "
        >
          <Logo compact={false} tone={lightHero ? "dark" : "light"} />
        </Link>

        <div className="flex shrink-0 items-center gap-1">
          <LanguageSwitcher variant="mobile" light={lightHero} />

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={
              isDrawerOpen
                ? translations.mobile.closeMenu
                : translations.mobile.openMenu
            }
            aria-haspopup="dialog"
            aria-expanded={isDrawerOpen}
            aria-controls={MOBILE_DRAWER_ID}
            onClick={toggleDrawer}
            className={`
              relative
              z-[10001]
              flex
              h-10
              w-10
              touch-manipulation
              select-none
              items-center
              justify-center
              rounded-xl
              ${lightHero ? "text-[var(--text-dark)] hover:bg-[var(--background)] hover:text-[var(--primary)]" : "text-white/90 hover:bg-white/10 hover:text-[var(--accent-light)]"}
              outline-none
              transition-all
              duration-200
              focus-visible:ring-2
              focus-visible:ring-[var(--accent)]
              active:scale-95
              sm:h-11
              sm:w-11
            `}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDrawerOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.16 }}
                  className="flex"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  transition={{ duration: 0.16 }}
                  className="flex"
                >
                  <Menu aria-hidden="true" className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ==========================================================
          DRAWER SYSTEM
      =========================================================== */}

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.button
              type="button"
              aria-label={translations.mobile.closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => closeDrawer()}
              className="
                pointer-events-auto
                fixed
                inset-0
                z-[9000]
                h-full
                w-full
                cursor-default
                border-0
                bg-black/65
                p-0
                outline-none
                backdrop-blur-[3px]
              "
            />

            <motion.aside
              id={MOBILE_DRAWER_ID}
              ref={drawerRef}
              dir={rtl ? "rtl" : "ltr"}
              role="dialog"
              aria-modal="true"
              aria-label={translations.mobile.menuTitle}
              initial={{ x: rtl ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: rtl ? "-100%" : "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onKeyDown={(event) => {
                if (event.key !== "Tab") return;
                const focusable = Array.from(
                  event.currentTarget.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled])',
                  ),
                ).filter((element) => element.offsetParent !== null);
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (!first || !last) return;
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault();
                  last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first.focus();
                }
              }}
              style={{ maxWidth: DRAWER_MAX_WIDTH, touchAction: "pan-y" }}
              tabIndex={-1}
              className="
                pointer-events-auto
                fixed
                inset-y-0
                end-0
                z-[9500]
                flex
                w-[86vw]
                max-w-[380px]
                flex-col
                overflow-hidden
                border-s
                border-white/10
                bg-[var(--primary)]
                shadow-2xl
                shadow-black/50
              "
            >
              {/* HEADER */}
              <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:h-16 sm:px-5">
                <Link
                  href="/"
                  onClick={handleNavigation}
                  aria-label="HudaVerse"
                  className="flex min-w-0 max-w-[70%] overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <Logo compact={false} />
                </Link>

                <button
                  type="button"
                  aria-label={translations.mobile.closeMenu}
                  onClick={() => closeDrawer()}
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    touch-manipulation
                    items-center
                    justify-center
                    rounded-xl
                    text-white/80
                    outline-none
                    transition-all
                    hover:bg-white/10
                    hover:text-white
                    focus-visible:ring-2
                    focus-visible:ring-[var(--accent)]
                    active:scale-95
                    sm:h-11
                    sm:w-11
                  "
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>

              {/* NAVIGATION */}
              <nav
                aria-label={translations.mobile.menuTitle}
                className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-3 py-4 sm:py-5"
              >
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = MENU_ICON_MAP[item.key] ?? Compass;
                    const active = isActive(item.href);
                    const expanded = openAccordion === item.key;

                    return (
                      <li key={item.key}>
                        {item.children ? (
                          <>
                            <div
                              className={`flex min-h-12 w-full items-center rounded-xl text-sm font-medium transition-all ${
                                active || expanded
                                  ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                                  : "text-white/80 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              <Link
                                href={item.href}
                                onClick={handleNavigation}
                                aria-current={active ? "page" : undefined}
                                className="group flex min-h-12 min-w-0 flex-1 touch-manipulation items-center gap-3 rounded-s-xl px-3 text-start outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                              >
                                <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                              </Link>
                              <button
                                type="button"
                                aria-label={`${expanded ? translations.mobile.closeMenu : translations.mobile.openMenu}: ${item.label}`}
                                aria-expanded={expanded}
                                aria-controls={`mobile-accordion-${item.key}`}
                                onClick={() => toggleAccordion(item.key)}
                                className="flex h-12 w-12 shrink-0 touch-manipulation items-center justify-center rounded-e-xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                              >
                                <ChevronRight
                                  aria-hidden="true"
                                  className={`h-4 w-4 text-white/40 transition-transform duration-200 ${
                                    rtl ? "-scale-x-100 " : ""
                                  }${expanded ? "rotate-90 text-[var(--accent)]" : ""}`}
                                />
                              </button>
                            </div>

                            <AnimatePresence initial={false}>
                              {expanded && (
                                <motion.div
                                  id={`mobile-accordion-${item.key}`}
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.22,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  className="ms-4 overflow-hidden border-s border-[var(--accent)]/15 ps-2 sm:ms-6 sm:ps-3"
                                >
                                  {item.panelIntro && (
                                    <p className="px-3 pb-2 pt-2 text-xs leading-relaxed text-white/45">
                                      {item.panelIntro}
                                    </p>
                                  )}

                                  <ul>
                                    {item.children.map((child) => (
                                      <li key={child.key}>
                                        <Link
                                          href={child.href}
                                          onClick={() =>
                                            handleChildNavigation(item.key, child.key)
                                          }
                                          className="
                                            flex
                                            min-h-14
                                            flex-col
                                            justify-center
                                            touch-manipulation
                                            rounded-lg
                                            px-3
                                            py-2.5
                                            outline-none
                                            transition-colors
                                            hover:bg-white/5
                                            focus-visible:ring-2
                                            focus-visible:ring-[var(--accent)]
                                          "
                                        >
                                          <span className="line-clamp-2 text-sm text-white/80">
                                            {child.title}
                                          </span>
                                          {child.description && (
                                            <span className="line-clamp-2 text-xs text-white/55">
                                              {child.description}
                                            </span>
                                          )}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>

                                  {item.panelCtaHref && item.panelCtaLabel && (
                                    <Link
                                      href={item.panelCtaHref}
                                      onClick={handleNavigation}
                                      className="block px-3 pb-1 pt-2 text-sm font-semibold text-[var(--accent)]"
                                    >
                                      {item.panelCtaLabel}
                                    </Link>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={handleNavigation}
                            aria-current={active ? "page" : undefined}
                            className={`
                              flex
                              min-h-12
                              w-full
                              touch-manipulation
                              items-center
                              gap-3
                              rounded-xl
                              px-3
                              text-sm
                              font-medium
                              outline-none
                              transition-all
                              focus-visible:ring-2
                              focus-visible:ring-[var(--accent)]
                              ${
                                active
                                  ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                                  : "text-white/80 hover:bg-white/5 hover:text-white"
                              }
                            `}
                          >
                            <Icon
                              aria-hidden="true"
                              className="h-5 w-5 shrink-0"
                            />
                            <span className="min-w-0 truncate">
                              {item.label}
                            </span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* FOOTER */}
              <div className="shrink-0 space-y-3 border-t border-white/10 bg-[var(--primary)] px-3 py-3 sm:px-4 sm:py-4">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                  <span className="text-xs font-medium text-white/45">
                    {translations.actions.selectLanguage}
                  </span>
                  <span className="text-xs font-semibold text-[var(--accent)]">
                    {languageCode.toUpperCase()}
                  </span>
                </div>

                <Button
                  href="/login"
                  onClick={handleNavigation}
                  variant="primary"
                  fullWidth
                >
                  <User aria-hidden="true" className="h-4 w-4" />
                  {translations.actions.signIn}
                </Button>

                <Button
                  href="/get-started"
                  onClick={handleNavigation}
                  variant="secondary"
                  fullWidth
                >
                  {translations.actions.getStarted}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
});

MobileNavbar.displayName = "MobileNavbar";

export default MobileNavbar;
