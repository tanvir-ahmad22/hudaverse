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
  ChevronRight,
  Download,
  Home,
  Info,
  Layers,
  LayoutGrid,
  Menu,
  Sparkles,
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

/* ================================================================
   LOCALE IMPORTS
   ---------------------------------------------------------------
   All mobile navbar UI text comes from:
   locales/{language}/navbar.ts
================================================================ */

import enNavbar from "../../../locales/en/navbar";
import bnNavbar from "../../../locales/bn/navbar";
import arNavbar from "../../../locales/ar/navbar";
import urNavbar from "../../../locales/ur/navbar";
import faNavbar from "../../../locales/fa/navbar";
import trNavbar from "../../../locales/tr/navbar";

/* ================================================================
   TYPES
================================================================ */

type NavbarLocale = {
  signIn: string;

  download: {
    button: string;
    title: string;
    description: string;
    safeTrusted: string;
    close: string;
    ariaLabel: string;
  };

  actions: {
    selectLanguage: string;
    signIn: string;
    downloadApp: string;
  };

  mobile: {
    openMenu: string;
    closeMenu: string;
    home: string;
  };
};

/* ================================================================
   NAVBAR LOCALES
================================================================ */

const NAVBAR_LOCALES: Record<string, NavbarLocale> = {
  en: enNavbar,
  bn: bnNavbar,
  ar: arNavbar,
  ur: urNavbar,
  fa: faNavbar,
  tr: trNavbar,
};

/* ================================================================
   DEFAULT LANGUAGE
================================================================ */

const DEFAULT_LANGUAGE = "en";

/* ================================================================
   CONFIG
================================================================ */

const SWIPE_CLOSE_THRESHOLD = 80;

const MOBILE_DRAWER_ID = "mobile-navigation-drawer";

/* ================================================================
   ICON MAP
================================================================ */

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

/* ================================================================
   MOBILE NAVBAR
================================================================ */

export const MobileNavbar = React.memo(function MobileNavbar() {
  const pathname = usePathname();

  /* ==============================================================
     GLOBAL LANGUAGE
  ============================================================== */

  const { currentLang } = useLanguage();

  /* ==============================================================
     CURRENT NAVBAR LOCALE
  ============================================================== */

  const translations = useMemo<NavbarLocale>(() => {
    return NAVBAR_LOCALES[currentLang] ?? NAVBAR_LOCALES[DEFAULT_LANGUAGE];
  }, [currentLang]);

  /* ==============================================================
     SCROLL
  ============================================================== */

  const isScrolled = useIsScrolled(SCROLL_THRESHOLD);

  /* ==============================================================
     DRAWER STATE
  ============================================================== */

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  /* ==============================================================
     REFS
  ============================================================== */

  const drawerRef = useRef<HTMLElement>(null);

  const touchStartX = useRef<number | null>(null);

  const touchStartY = useRef<number | null>(null);

  /* ==============================================================
     NAVIGATION
  ============================================================== */

  const navItems = useMemo(() => {
    return getNavItems(currentLang);
  }, [currentLang]);

  /* ==============================================================
     LANGUAGE CODE
  ============================================================== */

  const languageCode = currentLang;

  /* ==============================================================
     CLOSE DRAWER
  ============================================================== */

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setOpenSubmenu(null);
  }, []);

  /* ==============================================================
     OPEN DRAWER
  ============================================================== */

  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
    setOpenSubmenu(null);
  }, []);

  /* ==============================================================
     TOGGLE DRAWER
  ============================================================== */

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((current) => {
      if (current) {
        setOpenSubmenu(null);
      }

      return !current;
    });
  }, []);

  /* ==============================================================
     ESCAPE
  ============================================================== */

  useEscapeKey(closeDrawer, isDrawerOpen);

  /* ==============================================================
     BODY SCROLL LOCK
  ============================================================== */

  useLockBodyScroll(isDrawerOpen);

  /* ==============================================================
     ROUTE CHANGE
  ============================================================== */

  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  /* ==============================================================
     ACTIVE ROUTE
  ============================================================== */

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/";
      }

      return pathname?.startsWith(href) ?? false;
    },
    [pathname],
  );

  /* ==============================================================
     NAVIGATION
  ============================================================== */

  const handleNavigation = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  /* ==============================================================
     SUBMENU
  ============================================================== */

  const toggleSubmenu = useCallback((key: string) => {
    setOpenSubmenu((current) => (current === key ? null : key));
  }, []);

  /* ==============================================================
     TOUCH START
  ============================================================== */

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

  /* ==============================================================
     TOUCH END
  ============================================================== */

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

      if (deltaX > SWIPE_CLOSE_THRESHOLD && horizontalSwipe) {
        closeDrawer();
      }

      touchStartX.current = null;
      touchStartY.current = null;
    },
    [closeDrawer],
  );

  /* ==============================================================
     RENDER
  ============================================================== */

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
        aria-label={translations.mobile.home}
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(2, 24, 18, 0.94)"
            : "rgba(2, 24, 18, 0)",

          borderBottomColor: isScrolled
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0)",

          boxShadow: isScrolled
            ? "0 10px 30px -18px rgba(0,0,0,0.55)"
            : "0 0 0 rgba(0,0,0,0)",

          backdropFilter: isScrolled ? "blur(18px)" : "blur(0px)",

          WebkitBackdropFilter: isScrolled ? "blur(18px)" : "blur(0px)",
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
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
          px-3
          sm:h-16
          sm:px-5
        "
      >
        {/* ========================================================
            LOGO
        ========================================================= */}

        <Link
          href="/"
          aria-label="HudaVerse"
          className="
            flex
            min-w-0
            max-w-[65%]
            shrink
            items-center
            overflow-hidden
            rounded-lg
            touch-manipulation
            outline-none
            focus-visible:ring-2
            focus-visible:ring-amber-400
          "
        >
          <Logo compact={false} />
        </Link>

        {/* ========================================================
            RIGHT ACTIONS
        ========================================================= */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1
          "
        >
          {/* ======================================================
              GLOBAL LANGUAGE SWITCHER
          ======================================================= */}

          <LanguageSwitcher variant="mobile" />

          {/* ======================================================
              MENU BUTTON
          ======================================================= */}

          <button
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
            className="
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
              text-white/90
              outline-none
              transition-all
              duration-200
              hover:bg-white/10
              hover:text-amber-300
              focus-visible:ring-2
              focus-visible:ring-amber-400
              active:scale-95
              sm:h-11
              sm:w-11
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDrawerOpen ? (
                <motion.span
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.16,
                  }}
                  className="flex"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.16,
                  }}
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
            {/* ====================================================
                BACKDROP
            ===================================================== */}

            <motion.button
              type="button"
              aria-label={translations.mobile.closeMenu}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={closeDrawer}
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

            {/* ====================================================
                DRAWER
            ===================================================== */}

            <motion.aside
              id={MOBILE_DRAWER_ID}
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label={translations.mobile.openMenu}
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                maxWidth: DRAWER_MAX_WIDTH,
                touchAction: "pan-y",
              }}
              tabIndex={-1}
              className="
                pointer-events-auto
                fixed
                inset-y-0
                right-0
                z-[9500]
                flex
                w-[86vw]
                max-w-[380px]
                flex-col
                overflow-hidden
                border-l
                border-white/10
                bg-[#03251E]
                shadow-2xl
                shadow-black/50
              "
            >
              {/* ==================================================
                  DRAWER HEADER
              =================================================== */}

              <div
                className="
                  flex
                  h-14
                  shrink-0
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  px-4
                  sm:h-16
                  sm:px-5
                "
              >
                <Link
                  href="/"
                  onClick={handleNavigation}
                  aria-label="HudaVerse"
                  className="
                    flex
                    min-w-0
                    max-w-[70%]
                    overflow-hidden
                    rounded-lg
                    outline-none
                    focus-visible:ring-2
                    focus-visible:ring-amber-400
                  "
                >
                  <Logo compact={false} />
                </Link>

                <button
                  type="button"
                  aria-label={translations.mobile.closeMenu}
                  onClick={closeDrawer}
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
                    focus-visible:ring-amber-400
                    active:scale-95
                    sm:h-11
                    sm:w-11
                  "
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>

              {/* ==================================================
                  NAVIGATION
              =================================================== */}

              <nav
                aria-label={translations.mobile.openMenu}
                className="
                  min-h-0
                  flex-1
                  overflow-x-hidden
                  overflow-y-auto
                  overscroll-contain
                  px-3
                  py-4
                  sm:py-5
                "
              >
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = MENU_ICON_MAP[item.key] ?? Home;

                    const active = isActive(item.href);

                    const submenuOpen = openSubmenu === item.key;

                    return (
                      <li key={item.key}>
                        {item.children ? (
                          <>
                            <button
                              type="button"
                              aria-expanded={submenuOpen}
                              aria-controls={`mobile-submenu-${item.key}`}
                              onClick={() => toggleSubmenu(item.key)}
                              className={`
                                group
                                flex
                                min-h-12
                                w-full
                                touch-manipulation
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                text-left
                                text-sm
                                font-medium
                                outline-none
                                transition-all
                                focus-visible:ring-2
                                focus-visible:ring-amber-400

                                ${
                                  active || submenuOpen
                                    ? "bg-amber-400/10 text-amber-300"
                                    : "text-white/80 hover:bg-white/5 hover:text-white"
                                }
                              `}
                            >
                              <Icon
                                aria-hidden="true"
                                className="
                                  h-5
                                  w-5
                                  shrink-0
                                "
                              />

                              <span
                                className="
                                  min-w-0
                                  flex-1
                                  truncate
                                "
                              >
                                {item.label}
                              </span>

                              <ChevronRight
                                aria-hidden="true"
                                className={`
                                  h-4
                                  w-4
                                  shrink-0
                                  text-white/40
                                  transition-transform
                                  duration-200

                                  ${
                                    submenuOpen
                                      ? "rotate-90 text-amber-300"
                                      : ""
                                  }
                                `}
                              />
                            </button>

                            <AnimatePresence initial={false}>
                              {submenuOpen && (
                                <motion.ul
                                  id={`mobile-submenu-${item.key}`}
                                  initial={{
                                    height: 0,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    height: "auto",
                                    opacity: 1,
                                  }}
                                  exit={{
                                    height: 0,
                                    opacity: 0,
                                  }}
                                  transition={{
                                    duration: 0.22,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  className="
                                    ml-4
                                    overflow-hidden
                                    border-l
                                    border-amber-400/15
                                    pl-2
                                    sm:ml-6
                                    sm:pl-3
                                  "
                                >
                                  {item.children.map((child) => (
                                    <li key={child.key}>
                                      <Link
                                        href={child.href}
                                        onClick={handleNavigation}
                                        className="
                                            block
                                            min-h-10
                                            touch-manipulation
                                            truncate
                                            rounded-lg
                                            px-3
                                            py-2.5
                                            text-sm
                                            text-white/60
                                            outline-none
                                            transition-colors
                                            hover:bg-white/5
                                            hover:text-amber-200
                                            focus-visible:ring-2
                                            focus-visible:ring-amber-400
                                          "
                                      >
                                        {child.label}
                                      </Link>
                                    </li>
                                  ))}
                                </motion.ul>
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
                              focus-visible:ring-amber-400

                              ${
                                active
                                  ? "bg-amber-400/10 text-amber-300"
                                  : "text-white/80 hover:bg-white/5 hover:text-white"
                              }
                            `}
                          >
                            <Icon
                              aria-hidden="true"
                              className="
                                h-5
                                w-5
                                shrink-0
                              "
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

              {/* ==================================================
                  DRAWER FOOTER
              =================================================== */}

              <div
                className="
                  shrink-0
                  space-y-3
                  border-t
                  border-white/10
                  bg-[#03251E]
                  px-3
                  py-3
                  sm:px-4
                  sm:py-4
                "
              >
                {/* =================================================
                    CURRENT LANGUAGE
                ================================================== */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-3
                    py-2.5
                  "
                >
                  <span
                    className="
                      text-xs
                      font-medium
                      text-white/45
                    "
                  >
                    {translations.actions.selectLanguage}
                  </span>

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-amber-300
                    "
                  >
                    {languageCode.toUpperCase()}
                  </span>
                </div>

                {/* =================================================
                    SIGN IN
                ================================================== */}

                <Link
                  href="/sign-in"
                  onClick={handleNavigation}
                  className="
                    flex
                    min-h-12
                    touch-manipulation
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-amber-400/30
                    px-4
                    text-sm
                    font-medium
                    text-white
                    outline-none
                    transition-all
                    hover:border-amber-400/50
                    hover:bg-amber-400/10
                    focus-visible:ring-2
                    focus-visible:ring-amber-400
                    active:scale-[0.98]
                  "
                >
                  <User aria-hidden="true" className="h-4 w-4" />

                  {translations.actions.signIn}
                </Link>

                {/* =================================================
                    DOWNLOAD
                ================================================== */}

                <Link
                  href="#download"
                  onClick={handleNavigation}
                  className="
                    flex
                    min-h-12
                    touch-manipulation
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-b
                    from-amber-300
                    to-amber-500
                    px-4
                    text-sm
                    font-semibold
                    text-emerald-950
                    shadow-lg
                    shadow-amber-900/20
                    outline-none
                    transition-all
                    hover:-translate-y-0.5
                    focus-visible:ring-2
                    focus-visible:ring-amber-200
                    active:scale-[0.98]
                  "
                >
                  <Download aria-hidden="true" className="h-4 w-4" />

                  {translations.actions.downloadApp}
                </Link>
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
