"use client";

import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";

import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LANGUAGE_CHANGE_EVENT,
  LANGUAGE_STORAGE_KEY,
  getLanguageOption,
  getLanguageDirection,
  isValidLanguage,
  resolveLanguage,
  type LanguageCode,
  type LanguageOption,
} from "../lib/language";

/* ================================================================
   RETURN TYPE
================================================================ */

export interface UseLanguageReturn {
  currentLang: LanguageCode;
  currentLanguage: LanguageOption;
  availableLanguages: readonly LanguageOption[];
  selectLanguage: (language: string) => void;
}

/* ================================================================
   SERVER SNAPSHOT
================================================================ */

/**
 * Server always uses the default language.
 *
 * This keeps the initial server render deterministic and
 * prevents hydration mismatches caused by localStorage.
 */
const SERVER_LANGUAGE: LanguageCode = DEFAULT_LANGUAGE;

/* ================================================================
   CLIENT LANGUAGE
================================================================ */

/**
 * Reads the user's language preference from localStorage.
 *
 * Important:
 * - Never accesses localStorage during SSR.
 * - Invalid or missing values automatically fall back
 *   through resolveLanguage().
 */
function getClientLanguage(): LanguageCode {
  if (typeof window === "undefined") {
    return SERVER_LANGUAGE;
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  return resolveLanguage(storedLanguage);
}

/* ================================================================
   SUBSCRIBE
================================================================ */

/**
 * Subscribes mounted components to language changes.
 *
 * Two events are supported:
 *
 * 1. LANGUAGE_CHANGE_EVENT
 *    → changes made inside the current tab.
 *
 * 2. storage
 *    → changes made from another browser tab/window.
 */
function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleLanguageChange = () => {
    callback();
  };

  window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);

  window.addEventListener("storage", handleLanguageChange);

  return () => {
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);

    window.removeEventListener("storage", handleLanguageChange);
  };
}

/* ================================================================
   GLOBAL LANGUAGE HOOK
================================================================ */

/**
 * Global HudaVerse language engine.
 *
 * Responsibilities:
 * - Read current language
 * - Persist language preference
 * - Notify mounted components
 * - Expose available languages
 *
 * This hook intentionally does NOT contain page-specific
 * translations.
 *
 * Example:
 *
 * const { currentLang } = useLanguage();
 *
 * Then a page/component can load its own locale:
 *
 * landing[currentLang]
 * explore[currentLang]
 * navbar[currentLang]
 */
export function useLanguage(): UseLanguageReturn {
  /* ==============================================================
     CURRENT LANGUAGE
  ============================================================== */

  const currentLang = useSyncExternalStore(
    subscribe,
    getClientLanguage,
    () => SERVER_LANGUAGE,
  );

  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = getLanguageDirection(currentLang);
  }, [currentLang]);

  /* ==============================================================
     CURRENT LANGUAGE OBJECT
  ============================================================== */

  const currentLanguage = useMemo(() => {
    return getLanguageOption(currentLang);
  }, [currentLang]);

  /* ==============================================================
     AVAILABLE LANGUAGES
  ============================================================== */

  /**
   * LANGUAGES is the single source of truth.
   *
   * If language.ts contains:
   *
   * en
   * bn
   * ar
   * ur
   * fa
   * tr
   *
   * the language switcher automatically receives all six.
   */
  const availableLanguages = LANGUAGES;

  /* ==============================================================
     SELECT LANGUAGE
  ============================================================== */

  const selectLanguage = useCallback((language: string) => {
    if (typeof window === "undefined") {
      return;
    }

    /* ------------------------------------------------------------
       Validate requested language
    ------------------------------------------------------------ */

    if (!isValidLanguage(language)) {
      return;
    }

    const nextLanguage = language as LanguageCode;

    /* ------------------------------------------------------------
       Read current language
    ------------------------------------------------------------ */

    const currentLanguage = getClientLanguage();

    /* ------------------------------------------------------------
       Nothing to update
    ------------------------------------------------------------ */

    if (currentLanguage === nextLanguage) {
      return;
    }

    /* ------------------------------------------------------------
       Persist preference
    ------------------------------------------------------------ */

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);

    /* ------------------------------------------------------------
       Notify current tab
    ------------------------------------------------------------ */

    window.dispatchEvent(
      new CustomEvent(LANGUAGE_CHANGE_EVENT, {
        detail: {
          language: nextLanguage,
        },
      }),
    );
  }, []);

  /* ==============================================================
     RETURN
  ============================================================== */

  return {
    currentLang,
    currentLanguage,
    availableLanguages,
    selectLanguage,
  };
}
