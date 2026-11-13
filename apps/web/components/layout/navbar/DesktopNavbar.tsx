"use client";

import React, { useMemo } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { ChevronDown, User } from "lucide-react";

import { Logo } from "./Logo";
import LanguageSwitcher from "../LanguageSwitcher";
import { Button } from "@/components/ui/Button";

import {
  getNavItems,
  NAVBAR_HEIGHT,
  NAVBAR_MAX_BLUR,
  useScrollProgress,
} from "./navbar.config";

import { useLanguage } from "../../../hooks/useLanguage";
import {
  ECOSYSTEM_MODULE_EVENT,
  isEcosystemModuleId,
} from "../../../lib/ecosystem-navigation";

/* ================================================================
   NAVBAR LOCALES
   ---------------------------------------------------------------
   All navbar UI text comes from locales/{lang}/navbar.ts.
   This is the ONLY translation source for the navbar.
================================================================ */

import enNavbar from "../../../locales/en/navbar";
import bnNavbar from "../../../locales/bn/navbar";
import arNavbar from "../../../locales/ar/navbar";
import urNavbar from "../../../locales/ur/navbar";
import faNavbar from "../../../locales/fa/navbar";
import trNavbar from "../../../locales/tr/navbar";

import type { NavbarTranslations } from "../../../locales/en/navbar";

/* ================================================================
   NAVBAR LOCALE MAP
================================================================ */

const NAVBAR_LOCALES: Record<string, NavbarTranslations> = {
  en: enNavbar,
  bn: bnNavbar,
  ar: arNavbar,
  ur: urNavbar,
  fa: faNavbar,
  tr: trNavbar,
};

const DEFAULT_LANGUAGE = "en";

/* ================================================================
   DESKTOP NAVBAR
================================================================ */

export const DesktopNavbar = React.memo(function DesktopNavbar() {
  const pathname = usePathname();
  const { currentLang } = useLanguage();
  const [currentHash, setCurrentHash] = React.useState("");
  const navRef = React.useRef<HTMLElement>(null);

  const scrollProgress = useScrollProgress();
  const lightHero = pathname === "/about" && scrollProgress === 0;

  const [openPanel, setOpenPanel] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!openPanel) return;

    const handleOutsidePointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenPanel(null);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      const trigger = navRef.current?.querySelector<HTMLElement>(
        `[data-nav-trigger="${openPanel}"]`,
      );
      setOpenPanel(null);
      trigger?.focus();
    };

    document.addEventListener("pointerdown", handleOutsidePointer);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openPanel]);

  React.useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  /* ================================================================
     CONTENT
  ================================================================= */

  const content = useMemo(() => {
    return NAVBAR_LOCALES[currentLang] ?? NAVBAR_LOCALES[DEFAULT_LANGUAGE];
  }, [currentLang]);

  const navItems = useMemo(() => getNavItems(content), [content]);

  /* ================================================================
     ACTIVE ROUTE
  ================================================================= */

  const isActive = React.useCallback(
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

  /* ================================================================
     FOCUS RING (locked gold accent)
  ================================================================= */

  const focusRing =
    "focus-visible:outline-none " +
    "focus-visible:ring-2 " +
    "focus-visible:ring-[var(--accent)] " +
    "focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-[var(--primary)]";

  /* ================================================================
     SCROLL VISUALS — navbar scrim uses locked primary-dark token (#001F1A)
  ================================================================= */

  const backgroundColor = `color-mix(in srgb, var(--primary-dark) ${(scrollProgress * 100).toFixed(2)}%, transparent)`;

  const blurAmount = (scrollProgress * NAVBAR_MAX_BLUR).toFixed(2);

  const boxShadow =
    scrollProgress > 0
      ? `0 12px 32px rgba(0,0,0,${(scrollProgress * 0.15).toFixed(4)})`
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
        ref={navRef}
        aria-label={content.mobile.navLabel}
        style={{
          height: `${NAVBAR_HEIGHT}px`,
          paddingInline: "var(--layout-gutter)",
          backgroundColor,
          backgroundImage: lightHero ? "none" : "linear-gradient(to bottom, color-mix(in srgb, var(--primary-dark) 70%, transparent), transparent)",
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
          <div className="flex h-full min-w-0 max-w-[210px] items-center overflow-visible">
            <Logo compact={false} tone={lightHero ? "dark" : "light"} />
          </div>
        </Link>

        {/* ======================================================
            MAIN NAVIGATION
        ======================================================= */}

        <ul className="flex min-w-0 shrink items-center justify-center gap-0.5 xl:gap-1 2xl:gap-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const panelOpen = openPanel === item.key;

            return (
              <li
                key={item.key}
                className="relative shrink-0"
                onMouseEnter={() => {
                  if (item.children) {
                    setOpenPanel(item.key);
                  }
                }}
                onMouseLeave={() => {
                  if (item.children) {
                    setOpenPanel(null);
                  }
                }}
                onFocus={(event) => {
                  if (
                    item.children &&
                    !event.currentTarget.contains(event.relatedTarget as Node | null)
                  ) {
                    setOpenPanel(item.key);
                  }
                }}
                onBlur={(event) => {
                  if (
                    item.children &&
                    !event.currentTarget.contains(event.relatedTarget as Node | null)
                  ) {
                    setOpenPanel(null);
                  }
                }}
              >
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-haspopup={item.children ? "menu" : undefined}
                  aria-expanded={item.children ? panelOpen : undefined}
                  aria-controls={item.children ? `desktop-dropdown-${item.key}` : undefined}
                  data-nav-trigger={item.children ? item.key : undefined}
                  onKeyDown={(event) => {
                    if (item.children && event.key === "ArrowDown") {
                      event.preventDefault();
                      setOpenPanel(item.key);
                      requestAnimationFrame(() => {
                        navRef.current
                          ?.querySelector<HTMLElement>(`#desktop-dropdown-${item.key} a`)
                          ?.focus();
                      });
                    }
                  }}
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
                    ${lightHero ? (active ? "text-[var(--primary)]" : "text-[var(--text-dark)] hover:text-[var(--primary-soft)]") : (active ? "text-[var(--accent)]" : "text-white/90 hover:text-[var(--accent-light)]")}
                  `}
                >
                  {item.label}

                  {item.children && (
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${panelOpen ? "rotate-180" : ""}`}
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
                      from-[var(--accent)]
                      to-[var(--accent-light)]
                      transition-transform
                      duration-200
                      ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                    `}
                  />
                </Link>

                {/* ==================================================
                    CONTEXTUAL KNOWLEDGE NAVIGATION PANEL
                    (white surface / deep-emerald headings / gold accent
                    — locked Global Navbar Spec v2.0, dropdown design)
                =================================================== */}

                <AnimatePresence>
                  {item.children && panelOpen && (
                    <motion.div
                      id={`desktop-dropdown-${item.key}`}
                      role="menu"
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      onKeyDown={(event) => {
                        const menuItems = Array.from(
                          event.currentTarget.querySelectorAll<HTMLElement>(
                            '[role="menuitem"]',
                          ),
                        );
                        const currentIndex = menuItems.indexOf(
                          document.activeElement as HTMLElement,
                        );
                        let nextIndex: number | null = null;
                        if (event.key === "ArrowDown") {
                          nextIndex = (currentIndex + 1) % menuItems.length;
                        } else if (event.key === "ArrowUp") {
                          nextIndex = currentIndex <= 0 ? menuItems.length - 1 : currentIndex - 1;
                        } else if (event.key === "Home") {
                          nextIndex = 0;
                        } else if (event.key === "End") {
                          nextIndex = menuItems.length - 1;
                        }
                        if (nextIndex !== null && menuItems.length > 0) {
                          event.preventDefault();
                          menuItems[nextIndex]?.focus();
                        }
                      }}
                      className="
                        absolute
                        start-0
                        top-full
                        z-[150]
                        mt-0
                        w-[340px]
                        max-w-[calc(100vw-32px)]
                        overflow-hidden
                        rounded-xl
                        border
                        border-[var(--border-light)]
                        bg-white
                        p-5
                        shadow-[0_20px_50px_rgba(16,32,30,0.08)]
                      "
                    >
                      {/* Heading */}
                      <h2 className="text-base font-semibold text-[var(--primary)]">
                        {item.label}
                      </h2>

                      {/* Intro */}
                      {item.panelIntro && (
                        <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                          {item.panelIntro}
                        </p>
                      )}

                      {/* Section links */}
                        <ul className="mt-4 space-y-0.5">
                        {item.children.map((child) => (
                          <li key={child.key} role="none">
                            <Link
                              href={child.href}
                              role="menuitem"
                              onClick={(event) => {
                                setOpenPanel(null);
                                if (
                                  item.key === "ecosystem" &&
                                  isEcosystemModuleId(child.key) &&
                                  !event.defaultPrevented &&
                                  event.button === 0 &&
                                  !event.metaKey &&
                                  !event.ctrlKey &&
                                  !event.shiftKey &&
                                  !event.altKey
                                ) {
                                  window.dispatchEvent(
                                    new CustomEvent(ECOSYSTEM_MODULE_EVENT, {
                                      detail: { moduleId: child.key },
                                    }),
                                  );
                                }
                              }}
                              className={`
                                flex
                                min-h-16
                                flex-col
                                justify-center
                                rounded-lg
                                px-2.5
                                py-2
                                ${focusRing}
                                transition-colors
                                hover:bg-[var(--background)]
                              `}
                            >
                              <span className="block text-sm font-medium text-[var(--text-dark)]">
                                {child.title}
                              </span>
                              {child.description && (
                                <span className="line-clamp-2 block text-xs text-[var(--text-muted)]">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* Parent-page final CTA */}
                      {item.panelCtaHref && item.panelCtaLabel && (
                        <Link
                          href={item.panelCtaHref}
                          role="menuitem"
                          onClick={() => setOpenPanel(null)}
                          className={`
                            mt-4
                            block
                            border-t
                            border-[var(--border-light)]
                            pt-3
                            text-sm
                            font-semibold
                            text-[var(--accent)]
                            ${focusRing}
                            hover:text-[var(--primary)]
                          `}
                        >
                          {item.panelCtaLabel}
                        </Link>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* ======================================================
            RIGHT ACTIONS
            Order (locked): Language · Sign In · Get Started
        ======================================================= */}

        <div className="flex min-w-0 shrink-0 items-center justify-end gap-2 xl:gap-3">
          {/* LANGUAGE */}
          <LanguageSwitcher light={lightHero} />

          {/* SIGN IN — primary */}
          <Button
            href="/login"
            variant="primary"
          >
            <User aria-hidden="true" className="h-4 w-4 shrink-0" />
            {content.actions.signIn}
          </Button>

          {/* GET STARTED — secondary CTA */}
          <Button
            href="/get-started"
            variant="secondary"
          >
            {content.actions.getStarted}
          </Button>
        </div>
      </nav>
    </header>
  );
});

DesktopNavbar.displayName = "DesktopNavbar";

export default DesktopNavbar;
