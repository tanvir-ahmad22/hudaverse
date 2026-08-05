'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface NavChild {
  key: string;
  href: string;
  label: string;
}

export interface NavItem {
  key: string;
  href: string;
  label: string;
  children?: NavChild[];
}

export interface LanguageOption {
  code: string;
  label: string;
  nativeLabel: string;
  flag: string;
}

export type DownloadIconKey = 'play' | 'apple' | 'android';

export interface DownloadLinkItem {
  key: 'googlePlay' | 'appStore' | 'apk';
  label: string;
  subLabel: string;
  href: string;
  icon: DownloadIconKey;
  badge?: string;
  disabled?: boolean;
}

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* Edit here to change menu items, languages, or store links. Nothing  */
/* below needs to change in any component.                             */
/* ------------------------------------------------------------------ */

export const NAV_ITEMS: NavItem[] = [
  { key: 'home', href: '/', label: 'Home' },
  { key: 'features', href: '/features', label: 'Features' },
  { key: 'ai-assistant', href: '/ai-assistant', label: 'AI Assistant' },
  {
    key: 'modules',
    href: '/modules',
    label: 'Modules',
    children: [
      { key: 'quran', href: '/modules/quran', label: 'Quran' },
      { key: 'prayer-times', href: '/modules/prayer-times', label: 'Prayer Times' },
      { key: 'hadith', href: '/modules/hadith', label: 'Hadith' },
      { key: 'zakat-calculator', href: '/modules/zakat-calculator', label: 'Zakat Calculator' },
    ],
  },
  { key: 'about', href: '/about', label: 'About' },
];

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'bn', label: 'Bangla', nativeLabel: 'বাংলা', flag: '🇧🇩' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', flag: '🇸🇦' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷' },
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe', flag: '🇹🇷' },
];

export const DOWNLOAD_LINKS: DownloadLinkItem[] = [
  {
    key: 'googlePlay',
    label: 'Get it on',
    subLabel: 'Google Play',
    href: 'https://play.google.com/store/apps/details?id=com.hudaverse.app',
    icon: 'play',
  },
  {
    key: 'appStore',
    label: 'Download on the',
    subLabel: 'App Store',
    href: 'https://apps.apple.com/app/hudaverse',
    icon: 'apple',
  },
  {
    key: 'apk',
    label: 'Download APK',
    subLabel: 'Coming Soon',
    href: '#',
    icon: 'android',
    badge: 'New',
    disabled: true,
  },
];

export const SCROLL_THRESHOLD = 24;
export const NAVBAR_HEIGHT = { default: 80, scrolled: 68 } as const;
export const TRANSITION_DURATION = 0.3;
export const DRAWER_MAX_WIDTH = 320;

/* ------------------------------------------------------------------ */
/* Shared hooks                                                        */
/* Small, dependency-free hooks used by both Desktop and Mobile.       */
/* Kept here instead of a /hooks folder to respect the fixed 5-file    */
/* layout. Each hook is self-contained and side-effect free outside    */
/* of its own subscriptions, so it is safe for both navbars to use it  */
/* independently without coupling their behavior together.             */
/* ------------------------------------------------------------------ */

/** Tracks whether the page has scrolled past `threshold`, throttled via rAF. */
export function useIsScrolled(threshold: number = SCROLL_THRESHOLD): boolean {
  const [isScrolled, setIsScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > threshold);
        ticking.current = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}

/** Calls `handler` when a pointer event occurs outside `ref`. Active only while `enabled`. */
export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: PointerEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener('pointerdown', listener);
    return () => document.removeEventListener('pointerdown', listener);
  }, [ref, handler, enabled]);
}

/** Calls `handler` when Escape is pressed. Active only while `enabled`. */
export function useEscapeKey(handler: () => void, enabled: boolean = true): void {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handler();
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [handler, enabled]);
}

/** Locks body scroll while `locked` is true and restores the exact scroll position on unlock. */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const { body } = document;
    const previousStyle = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = previousStyle.position;
      body.style.top = previousStyle.top;
      body.style.width = previousStyle.width;
      body.style.overflow = previousStyle.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
