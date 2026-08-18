"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import {
  Apple,
  ChevronDown,
  Download,
  Play,
  ShieldCheck,
  Smartphone,
  User,
  X,
} from "lucide-react";

import { Logo } from "./Logo";
import LanguageSwitcher from "../LanguageSwitcher";

import {
  getDownloadLinks,
  getNavItems,
  NAVBAR_HEIGHT,
  NAVBAR_MAX_BLUR,
  NAVBAR_MAX_DARK_OPACITY,
  useEscapeKey,
  useOutsideClick,
  useScrollProgress,
  type DownloadIconKey,
} from "./navbar.config";

import { useLanguage } from "../../../hooks/useLanguage";

/* ================================================================
   NAVBAR LOCALES
   ---------------------------------------------------------------
   All navbar UI text comes from:

   locales/en/navbar.ts
   locales/bn/navbar.ts
   locales/ar/navbar.ts
   locales/ur/navbar.ts
   locales/fa/navbar.ts
   locales/tr/navbar.ts

   No language-specific UI text is hardcoded in this component.
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

type NavbarLocale = typeof enNavbar;

/* ================================================================
   NAVBAR LOCALE MAP
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
   DOWNLOAD ICONS
================================================================ */

const DOWNLOAD_ICON_MAP: Record<
  DownloadIconKey,
  React.ComponentType<{ className?: string }>
> = {
  play: Play,
  apple: Apple,
  android: Smartphone,
};

/* ================================================================
   DESKTOP NAVBAR
================================================================ */

export const DesktopNavbar = React.memo(function DesktopNavbar() {
  const pathname = usePathname();

  /* ================================================================
     GLOBAL LANGUAGE
  ================================================================= */

  const { currentLang } = useLanguage();

  /* ================================================================
     SCROLL
  ================================================================= */

  const scrollProgress = useScrollProgress();

  /* ================================================================
     STATE
  ================================================================= */

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  /* ================================================================
     REFS
  ================================================================= */

  const downloadRef = useRef<HTMLDivElement>(null);

  /* ================================================================
     CURRENT NAVBAR CONTENT
  ================================================================= */

  const content = useMemo(() => {
    return NAVBAR_LOCALES[currentLang] ?? NAVBAR_LOCALES[DEFAULT_LANGUAGE];
  }, [currentLang]);

  /* ================================================================
     NAVIGATION
  ================================================================= */

  const navItems = useMemo(() => {
    return getNavItems(currentLang);
  }, [currentLang]);

  /* ================================================================
     DOWNLOAD LINKS
  ================================================================= */

  const downloadLinks = useMemo(() => {
    return getDownloadLinks(currentLang);
  }, [currentLang]);

  /* ================================================================
     CLOSE DOWNLOAD
  ================================================================= */

  const closeDownload = useCallback(() => {
    setIsDownloadOpen(false);
  }, []);

  /* ================================================================
     OUTSIDE CLICK
  ================================================================= */

  useOutsideClick(downloadRef, closeDownload, isDownloadOpen);

  /* ================================================================
     ESCAPE
  ================================================================= */

  useEscapeKey(closeDownload, isDownloadOpen);

  /* ================================================================
     ACTIVE ROUTE
  ================================================================= */

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/";
      }

      return pathname?.startsWith(href) ?? false;
    },
    [pathname],
  );

  /* ================================================================
     FOCUS RING
  ================================================================= */

  const focusRing =
    "focus-visible:outline-none " +
    "focus-visible:ring-2 " +
    "focus-visible:ring-amber-400 " +
    "focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-emerald-950";

  /* ================================================================
     SCROLL VISUALS
  ================================================================= */

  const backgroundColor = `rgba(3, 28, 22, ${(
    scrollProgress * NAVBAR_MAX_DARK_OPACITY
  ).toFixed(4)})`;

  const blurAmount = (scrollProgress * NAVBAR_MAX_BLUR).toFixed(2);

  const shadowOpacity = (scrollProgress * 0.65).toFixed(4);

  const shadowBlur = Math.round(scrollProgress * 34);

  const shadowVertical = Math.round(scrollProgress * 12);

  const shadowSpread = Math.round(-22 + scrollProgress * 4);

  const boxShadow =
    scrollProgress > 0
      ? `0 ${shadowVertical}px ${shadowBlur}px ${shadowSpread}px rgba(0,0,0,${shadowOpacity})`
      : "none";

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
        hidden
        w-full
        max-w-full
        overflow-visible
        lg:block
      "
    >
      <nav
        aria-label="Primary navigation"
        style={{
          height: `${NAVBAR_HEIGHT}px`,
          backgroundColor,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          boxShadow,
        }}
        className="
          pointer-events-auto
          relative
          flex
          w-full
          max-w-full
          min-w-0
          items-center
          justify-between
          gap-4
          overflow-visible
          px-6
          xl:px-10
          2xl:px-12
          will-change-[background-color,backdrop-filter,box-shadow]
        "
      >
        {/* ======================================================
            LOGO
        ======================================================= */}

        <Link
          href="/"
          aria-label="HudaVerse home"
          className={`flex min-w-0 shrink items-center rounded-xl ${focusRing}`}
        >
          <div
            className="
              flex
              h-full
              min-w-0
              max-w-[210px]
              items-center
              overflow-visible
            "
          >
            <Logo compact={false} />
          </div>
        </Link>

        {/* ======================================================
            MAIN NAVIGATION
        ======================================================= */}

        <ul
          className="
            flex
            min-w-0
            shrink
            items-center
            justify-center
            gap-0.5
            xl:gap-1
            2xl:gap-2
          "
        >
          {navItems.map((item) => {
            const active = isActive(item.href);

            const submenuOpen = openSubmenu === item.key;

            return (
              <li
                key={item.key}
                className="relative shrink-0"
                onMouseEnter={() => {
                  if (item.children) {
                    setOpenSubmenu(item.key);
                  }
                }}
                onMouseLeave={() => {
                  if (item.children) {
                    setOpenSubmenu(null);
                  }
                }}
              >
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-haspopup={item.children ? "menu" : undefined}
                  aria-expanded={item.children ? submenuOpen : undefined}
                  className={`
                    group
                    relative
                    flex
                    items-center
                    gap-1
                    whitespace-nowrap
                    rounded-lg
                    px-2.5
                    py-2
                    text-sm
                    font-medium
                    ${focusRing}
                    transition-all
                    duration-200
                    xl:px-3
                    ${
                      active
                        ? "text-amber-300"
                        : "text-white/90 hover:text-amber-200"
                    }
                  `}
                >
                  {item.label}

                  {item.children && (
                    <ChevronDown
                      aria-hidden="true"
                      className={`
                        h-3.5
                        w-3.5
                        transition-transform
                        duration-200
                        ${submenuOpen ? "rotate-180" : ""}
                      `}
                    />
                  )}

                  <span
                    aria-hidden="true"
                    className={`
                      pointer-events-none
                      absolute
                      -bottom-1
                      left-2.5
                      right-2.5
                      h-0.5
                      origin-left
                      rounded-full
                      bg-gradient-to-r
                      from-amber-400
                      to-amber-200
                      shadow-[0_0_8px_rgba(212,175,55,0.55)]
                      transition-transform
                      duration-200
                      ${
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }
                    `}
                  />
                </Link>

                {/* ==================================================
                    SUBMENU
                =================================================== */}

                <AnimatePresence>
                  {item.children && submenuOpen && (
                    <motion.ul
                      role="menu"
                      initial={{
                        opacity: 0,
                        y: 8,
                        scale: 0.97,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 8,
                        scale: 0.97,
                      }}
                      transition={{
                        duration: 0.18,
                        ease: "easeOut",
                      }}
                      className="
                        absolute
                        left-0
                        top-full
                        z-[150]
                        mt-2
                        w-56
                        max-w-[calc(100vw-32px)]
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-[#05261F]/95
                        p-2
                        shadow-2xl
                        shadow-black/40
                        backdrop-blur-2xl
                      "
                    >
                      {item.children.map((child) => (
                        <li key={child.key} role="none">
                          <Link
                            href={child.href}
                            role="menuitem"
                            className={`
                              block
                              rounded-xl
                              px-3
                              py-2.5
                              text-sm
                              text-white/85
                              ${focusRing}
                              transition-colors
                              hover:bg-amber-400/10
                              hover:text-amber-200
                            `}
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

        {/* ======================================================
            RIGHT ACTIONS
        ======================================================= */}

        <div
          className="
            flex
            min-w-0
            shrink-0
            items-center
            justify-end
            gap-2
            xl:gap-3
          "
        >
          {/* ====================================================
              LANGUAGE SWITCHER
          ===================================================== */}

          <LanguageSwitcher />

          {/* ====================================================
              SIGN IN
          ===================================================== */}

          <Link
            href="/sign-in"
            className={`
              flex
              shrink-0
              items-center
              gap-1.5
              whitespace-nowrap
              rounded-lg
              border
              border-white/15
              bg-white/[0.03]
              px-3
              py-2
              text-sm
              font-medium
              text-white
              ${focusRing}
              transition-all
              duration-200
              hover:border-amber-400/40
              hover:bg-white/[0.06]
              active:scale-95
              xl:px-4
            `}
          >
            <User aria-hidden="true" className="h-4 w-4 shrink-0" />

            {content.signIn}
          </Link>

          {/* ====================================================
              DOWNLOAD
          ===================================================== */}

          <div ref={downloadRef} className="relative shrink-0">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isDownloadOpen}
              aria-label={content.download.ariaLabel}
              onClick={() => {
                setIsDownloadOpen((value) => !value);
              }}
              className={`
                flex
                shrink-0
                items-center
                gap-1.5
                whitespace-nowrap
                rounded-lg
                bg-gradient-to-b
                from-amber-300
                to-amber-500
                px-3
                py-2
                text-sm
                font-semibold
                text-emerald-950
                shadow-md
                shadow-amber-900/20
                ${focusRing}
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-lg
                hover:shadow-amber-400/30
                active:scale-95
                xl:px-4
              `}
            >
              <Download aria-hidden="true" className="h-4 w-4 shrink-0" />

              {content.download.button}
            </button>

            {/* ==================================================
                DOWNLOAD POPUP
            =================================================== */}

            <AnimatePresence>
              {isDownloadOpen && (
                <motion.div
                  role="dialog"
                  aria-label={content.download.ariaLabel}
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    right-0
                    top-full
                    z-[160]
                    mt-3
                    w-80
                    max-w-[calc(100vw-24px)]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#05261F]/95
                    p-5
                    shadow-2xl
                    shadow-black/40
                    backdrop-blur-2xl
                  "
                >
                  {/* ==================================================
                      HEADER
                  =================================================== */}

                  <div
                    className="
                      mb-4
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                  >
                    <div className="min-w-0">
                      <h2 className="text-base font-bold text-white">
                        {content.download.title}
                      </h2>

                      <p className="text-xs text-white/50">
                        {content.download.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={closeDownload}
                      aria-label={content.download.close}
                      className={`
                        shrink-0
                        rounded-full
                        p-1
                        text-white/50
                        ${focusRing}
                        transition-colors
                        hover:bg-white/5
                        hover:text-white
                      `}
                    >
                      <X aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </div>

                  {/* ==================================================
                      DOWNLOAD LINKS
                  =================================================== */}

                  <div className="space-y-2">
                    {downloadLinks.map((link) => {
                      const Icon = DOWNLOAD_ICON_MAP[link.icon];

                      return (
                        <a
                          key={link.key}
                          href={link.href}
                          aria-disabled={link.disabled}
                          tabIndex={link.disabled ? -1 : 0}
                          onClick={(event) => {
                            if (link.disabled) {
                              event.preventDefault();
                            }
                          }}
                          className={`
                            flex
                            min-w-0
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-white/5
                            bg-white/[0.03]
                            px-3
                            py-2.5
                            ${focusRing}
                            transition-all
                            duration-200
                            ${
                              link.disabled
                                ? "cursor-not-allowed opacity-50"
                                : "hover:border-amber-400/30 hover:bg-amber-400/5"
                            }
                          `}
                        >
                          <Icon
                            aria-hidden="true"
                            className="
                              h-6
                              w-6
                              shrink-0
                              text-amber-300
                            "
                          />

                          <span
                            className="
                              min-w-0
                              flex-1
                              text-left
                            "
                          >
                            <span
                              className="
                                block
                                truncate
                                text-xs
                                text-white/40
                              "
                            >
                              {link.label}
                            </span>

                            <span
                              className="
                                block
                                truncate
                                text-sm
                                font-semibold
                                text-white
                              "
                            >
                              {link.subLabel}
                            </span>
                          </span>

                          {link.badge && (
                            <span
                              className="
                                shrink-0
                                rounded-full
                                bg-amber-400/15
                                px-2
                                py-0.5
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-wide
                                text-amber-300
                              "
                            >
                              {link.badge}
                            </span>
                          )}
                        </a>
                      );
                    })}
                  </div>

                  {/* ==================================================
                      TRUST
                  =================================================== */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-center
                      gap-1.5
                      text-xs
                      text-white/35
                    "
                  >
                    <ShieldCheck
                      aria-hidden="true"
                      className="
                        h-3.5
                        w-3.5
                        text-amber-300
                      "
                    />

                    {content.download.safeTrusted}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </header>
  );
});

DesktopNavbar.displayName = "DesktopNavbar";

export default DesktopNavbar;
