"use client";

import { useState, useEffect, useRef } from "react";

interface LanguageHook {
  currentLang: string;
  selectLanguage: (code: string) => void;
  availableLanguages: { code: string; label: string }[];
}

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "ur", label: "اردو" },
];

export function useLanguage(): LanguageHook {
  // Initialize state with a function to read localStorage only once
  const [currentLang, setCurrentLang] = useState<string>(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("preferred-language");
      if (savedLang && LANGUAGES.some((lang) => lang.code === savedLang)) {
        return savedLang;
      }
    }
    return "en";
  });

  const selectLanguage = (code: string) => {
    if (LANGUAGES.some((lang) => lang.code === code)) {
      setCurrentLang(code);
      localStorage.setItem("preferred-language", code);
      // You can add logic here to change the app's language
      // For example: document.documentElement.lang = code;
    }
  };

  return {
    currentLang,
    selectLanguage,
    availableLanguages: LANGUAGES,
  };
}
