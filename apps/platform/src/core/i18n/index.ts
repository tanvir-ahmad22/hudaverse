"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { LanguageCode } from "@/locales/types";
import { dictionaries } from "@/locales";

export const DEFAULT_LANGUAGE: LanguageCode = "en";
export const LANGUAGE_STORAGE_KEY = "hudaverse-language";
export const LANGUAGE_CHANGE_EVENT = "hudaverse-language-change";
export const LANGUAGES = ["en", "bn", "ar", "ur", "fa", "tr"] as const;
export const isRTL = (language: LanguageCode) => ["ar", "ur", "fa"].includes(language);

const getLanguage = (): LanguageCode => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return LANGUAGES.includes(stored as LanguageCode) ? stored as LanguageCode : DEFAULT_LANGUAGE;
};

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(LANGUAGE_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useLanguage() {
  const language = useSyncExternalStore(subscribe, getLanguage, () => DEFAULT_LANGUAGE);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL(language) ? "rtl" : "ltr";
  }, [language]);
  const selectLanguage = useCallback((next: LanguageCode) => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  }, []);
  return { language, selectLanguage, direction: isRTL(language) ? "rtl" as const : "ltr" as const };
}

export type TranslationKey = keyof typeof dictionaries.en.shell;
export function useTranslations() {
  const { language, ...languageState } = useLanguage();
  const t = useCallback((key: TranslationKey) => dictionaries[language].shell[key], [language]);
  return { ...languageState, language, t, home: dictionaries[language].home, shell: dictionaries[language].shell };
}
