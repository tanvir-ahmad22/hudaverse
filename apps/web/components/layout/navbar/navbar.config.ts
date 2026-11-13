"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

import type { NavbarTranslations } from "../../../locales/en/navbar";
import {
  ECOSYSTEM_MODULE_IDS,
  getEcosystemModuleHref,
} from "../../../lib/ecosystem-navigation";

/* ================================================================
   TYPES
================================================================ */

export interface NavChild {
  key: string;
  href: string;
  title: string;
  description: string;
}

export interface NavItem {
  key: string;
  href: string;
  label: string;
  children?: NavChild[];
  panelIntro?: string;
  panelCtaLabel?: string;
  panelCtaHref?: string;
}

export interface LanguageOption {
  code: string;
  label: string;
  nativeLabel: string;
  flag: string;
}

/* ================================================================
   LANGUAGES
================================================================ */

/*
 * HudaVerse supported UI languages
 *
 * en → English   |  bn → Bangla   |  ar → Arabic
 * fa → Persian   |  ur → Urdu     |  tr → Turkish
 */

export const LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇬🇧" },
  { code: "bn", label: "Bangla", nativeLabel: "বাংলা", flag: "🇧🇩" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", flag: "🇸🇦" },
  { code: "fa", label: "Persian", nativeLabel: "فارسی", flag: "🇮🇷" },
  { code: "ur", label: "Urdu", nativeLabel: "اردو", flag: "🇵🇰" },
  { code: "tr", label: "Turkish", nativeLabel: "Türkçe", flag: "🇹🇷" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export const LANGUAGE_STORAGE_KEY = "preferred-language";

/* ================================================================
   LANGUAGE HELPERS
================================================================ */

export function isValidLanguage(language: string): language is LanguageCode {
  return LANGUAGES.some((item) => item.code === language);
}

export function resolveLanguage(
  language: string | null | undefined,
): LanguageCode {
  if (language && isValidLanguage(language)) {
    return language;
  }

  return DEFAULT_LANGUAGE;
}

/* ================================================================
   NAVIGATION
   ---------------------------------------------------------------
   Public website navigation uses the Landing, Explore, and About pages.
   Explore dropdown destinations point to rendered Explore sections or
   supported ecosystem modules.

   Takes the resolved NavbarTranslations object directly — this is
   now the ONLY source for nav copy, no duplicate translation table.
================================================================ */

export function getNavItems(t: NavbarTranslations): NavItem[] {
  const ecosystemItems = t.ecosystem.sections;

  return [
    {
      key: "home",
      href: "/",
      label: t.nav.home,
    },
    {
      key: "explore",
      href: "/explore",
      label: t.nav.explore,
      children: [
        {
          key: "ai",
          href: "/explore#ai",
          title: t.explore.sections.ai.label,
          description: t.explore.sections.ai.description,
        },
        {
          key: "learning",
          href: "/explore#learning",
          title: t.explore.sections.learning.label,
          description: t.explore.sections.learning.description,
        },
        {
          key: "personal-space",
          href: "/explore#personal-space",
          title: t.explore.sections.personalSpace.label,
          description: t.explore.sections.personalSpace.description,
        },
        {
          key: "knowledge",
          href: "/explore#knowledge",
          title: t.explore.sections.knowledge.label,
          description: t.explore.sections.knowledge.description,
        },
        {
          key: "trust",
          href: "/explore#trust",
          title: t.explore.sections.trust.label,
          description: t.explore.sections.trust.description,
        },
        {
          key: "a-day",
          href: "/explore#day",
          title: t.explore.sections.aDay.label,
          description: t.explore.sections.aDay.description,
        },
      ],
    },
    {
      key: "ecosystem",
      href: "/explore#ecosystem",
      label: t.nav.ecosystem,
      children: ECOSYSTEM_MODULE_IDS.map((moduleId) => ({
        key: moduleId,
        href: getEcosystemModuleHref(moduleId),
        title: ecosystemItems[moduleId].title,
        description: ecosystemItems[moduleId].description,
      })),
    },
    {
      key: "about",
      href: "/about",
      label: t.nav.about,
    },
  ];
}

/* ================================================================
   NAVBAR CONSTANTS
================================================================ */

export const SCROLL_THRESHOLD = 24;
export const SCROLL_TRANSITION_DISTANCE = 180;
export const NAVBAR_HEIGHT = 86;
export const NAVBAR_MAX_BORDER_OPACITY = 0;
export const NAVBAR_MAX_BLUR = 18;
export const DRAWER_MAX_WIDTH = 320;
export const TRANSITION_DURATION = 0.3;

/* ================================================================
   SCROLL PROGRESS
================================================================ */

export function useScrollProgress(
  start: number = SCROLL_THRESHOLD,
  distance: number = SCROLL_TRANSITION_DISTANCE,
): number {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      ticking.current = false;

      const scrollY = window.scrollY;
      const safeDistance = Math.max(distance, 1);
      const rawProgress = (scrollY - start) / safeDistance;
      const nextProgress = Math.min(Math.max(rawProgress, 0), 1);

      setProgress((current) => {
        if (Math.abs(current - nextProgress) < 0.001) {
          return current;
        }
        return nextProgress;
      });
    };

    const handleScroll = () => {
      if (ticking.current) {
        return;
      }
      ticking.current = true;
      frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      ticking.current = false;
    };
  }, [start, distance]);

  return progress;
}

/* ================================================================
   SCROLLED STATE
================================================================ */

export function useIsScrolled(threshold: number = SCROLL_THRESHOLD): boolean {
  const [isScrolled, setIsScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      ticking.current = false;
      const next = window.scrollY > threshold;
      setIsScrolled((current) => (current === next ? current : next));
    };

    const handleScroll = () => {
      if (ticking.current) {
        return;
      }
      ticking.current = true;
      frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      ticking.current = false;
    };
  }, [threshold]);

  return isScrolled;
}

/* ================================================================
   OUTSIDE CLICK
================================================================ */

export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  enabled: boolean = true,
): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      const element = ref.current;
      if (!element || element.contains(target)) {
        return;
      }
      handler();
    };

    document.addEventListener("pointerdown", listener);
    return () => document.removeEventListener("pointerdown", listener);
  }, [ref, handler, enabled]);
}

/* ================================================================
   ESCAPE
================================================================ */

export function useEscapeKey(
  handler: () => void,
  enabled: boolean = true,
): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [handler, enabled]);
}

/* ================================================================
   BODY SCROLL LOCK
================================================================ */

export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) {
      return;
    }

    const scrollY = window.scrollY;
    const body = document.body;

    const previousStyle = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.position = previousStyle.position;
      body.style.top = previousStyle.top;
      body.style.width = previousStyle.width;
      body.style.overflow = previousStyle.overflow;
      body.style.paddingRight = previousStyle.paddingRight;

      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
    };
  }, [locked]);
}
