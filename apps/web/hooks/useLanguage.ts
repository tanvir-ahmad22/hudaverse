"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LANGUAGE_CHANGE_EVENT,
  LANGUAGE_STORAGE_KEY,
  getLanguageOption,
  getNavbarTranslations,
  isValidLanguage,
  resolveLanguage,
  type LanguageCode,
  type LanguageOption,
  type NavbarTranslations,
} from "../lib/language";

/* ================================================================
   RETURN TYPE
================================================================ */

interface UseLanguageReturn {
  currentLang: LanguageCode;
  currentLanguage: LanguageOption;
  availableLanguages: readonly LanguageOption[];
  translations: NavbarTranslations;
  selectLanguage: (language: string) => void;
}

/* ================================================================
   SERVER SNAPSHOT
================================================================ */

const SERVER_LANGUAGE: LanguageCode = DEFAULT_LANGUAGE;

/* ================================================================
   CLIENT LANGUAGE
================================================================ */

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

export function useLanguage(): UseLanguageReturn {
  /* ==============================================================
     CURRENT LANGUAGE
  ============================================================== */

  const currentLang = useSyncExternalStore(
    subscribe,
    getClientLanguage,
    () => SERVER_LANGUAGE,
  );

  /* ==============================================================
     CURRENT LANGUAGE OBJECT
  ============================================================== */

  const currentLanguage = useMemo(() => {
    return getLanguageOption(currentLang);
  }, [currentLang]);

  /* ==============================================================
     TRANSLATIONS
  ============================================================== */

  const translations = useMemo(() => {
    return getNavbarTranslations(currentLang);
  }, [currentLang]);

  /* ==============================================================
     AVAILABLE LANGUAGES
     
     This now comes directly from LANGUAGES.

     Step 1-এ LANGUAGES-এ যদি থাকে:

     en
     bn
     ar
     fa
     ur
     tr

     তাহলে LanguageSwitcher automatically 6টিই দেখাবে।
  ============================================================== */

  const availableLanguages = LANGUAGES;

  /* ==============================================================
     SELECT LANGUAGE
  ============================================================== */

  const selectLanguage = useCallback((language: string) => {
    if (typeof window === "undefined") {
      return;
    }

    /* ------------------------------------------------------------
       Validate language
    ------------------------------------------------------------ */

    if (!isValidLanguage(language)) {
      return;
    }

    const nextLanguage = language as LanguageCode;

    const currentLanguage = getClientLanguage();

    /* ------------------------------------------------------------
       No change required
    ------------------------------------------------------------ */

    if (currentLanguage === nextLanguage) {
      return;
    }

    /* ------------------------------------------------------------
       Save language
    ------------------------------------------------------------ */

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);

    /* ------------------------------------------------------------
       Notify every mounted component
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
    translations,
    selectLanguage,
  };
}
