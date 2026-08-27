"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/* ================================================================
   TYPES
================================================================ */

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

export type DownloadIconKey = "play" | "apple" | "android";

export interface DownloadLinkItem {
  key: "googlePlay" | "appStore" | "apk";
  label: string;
  subLabel: string;
  href: string;
  icon: DownloadIconKey;
  badge?: string;
  disabled?: boolean;
}

/* ================================================================
   LANGUAGES
================================================================ */

/*
 * HudaVerse supported UI languages
 *
 * en → English
 * bn → Bangla
 * ar → Arabic
 * fa → Persian / Farsi
 * ur → Urdu
 * tr → Turkish
 */

export const LANGUAGES = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    flag: "🇬🇧",
  },
  {
    code: "bn",
    label: "Bangla",
    nativeLabel: "বাংলা",
    flag: "🇧🇩",
  },
  {
    code: "ar",
    label: "Arabic",
    nativeLabel: "العربية",
    flag: "🇸🇦",
  },
  {
    code: "fa",
    label: "Persian",
    nativeLabel: "فارسی",
    flag: "🇮🇷",
  },
  {
    code: "ur",
    label: "Urdu",
    nativeLabel: "اردو",
    flag: "🇵🇰",
  },
  {
    code: "tr",
    label: "Turkish",
    nativeLabel: "Türkçe",
    flag: "🇹🇷",
  },
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
   NAVBAR TRANSLATIONS TYPE
================================================================ */

export interface NavbarTranslations {
  nav: {
    home: string;
    features: string;
    aiAssistant: string;
    modules: string;
    about: string;
  };

  modules: {
    quran: string;
    prayerTimes: string;
    hadith: string;
    zakatCalculator: string;
  };

  actions: {
    signIn: string;
    downloadApp: string;
    selectLanguage: string;
    searchLanguage: string;
    noLanguagesFound: string;
    moreLanguagesComingSoon: string;
  };

  download: {
    title: string;
    description: string;
    getItOn: string;
    downloadOnThe: string;
    downloadApk: string;
    comingSoon: string;
    safeTrusted: string;
  };
}

/* ================================================================
   TRANSLATIONS
================================================================ */

export const NAV_TRANSLATIONS: Record<LanguageCode, NavbarTranslations> = {
  /* ==============================================================
     ENGLISH
  ============================================================== */

  en: {
    nav: {
      home: "Home",
      features: "Features",
      aiAssistant: "AI Assistant",
      modules: "Modules",
      about: "About",
    },

    modules: {
      quran: "Quran",
      prayerTimes: "Prayer Times",
      hadith: "Hadith",
      zakatCalculator: "Zakat Calculator",
    },

    actions: {
      signIn: "Sign In",
      downloadApp: "Download App",
      selectLanguage: "Select Language",
      searchLanguage: "Search language...",
      noLanguagesFound: "No languages found",
      moreLanguagesComingSoon: "More languages coming soon...",
    },

    download: {
      title: "Download HudaVerse",
      description: "Your all-in-one Islamic companion",
      getItOn: "Get it on",
      downloadOnThe: "Download on the",
      downloadApk: "Download APK",
      comingSoon: "Coming Soon",
      safeTrusted: "Safe, Secure & Trusted by Millions",
    },
  },

  /* ==============================================================
     BANGLA
  ============================================================== */

  bn: {
    nav: {
      home: "হোম",
      features: "ফিচার",
      aiAssistant: "AI সহকারী",
      modules: "মডিউল",
      about: "আমাদের সম্পর্কে",
    },

    modules: {
      quran: "কুরআন",
      prayerTimes: "নামাজের সময়",
      hadith: "হাদিস",
      zakatCalculator: "যাকাত ক্যালকুলেটর",
    },

    actions: {
      signIn: "সাইন ইন",
      downloadApp: "অ্যাপ ডাউনলোড",
      selectLanguage: "ভাষা নির্বাচন করুন",
      searchLanguage: "ভাষা খুঁজুন...",
      noLanguagesFound: "কোনো ভাষা পাওয়া যায়নি",
      moreLanguagesComingSoon: "আরও ভাষা শীঘ্রই আসছে...",
    },

    download: {
      title: "HudaVerse ডাউনলোড করুন",
      description: "আপনার সম্পূর্ণ ইসলামিক সহচর",
      getItOn: "পান",
      downloadOnThe: "ডাউনলোড করুন",
      downloadApk: "APK ডাউনলোড",
      comingSoon: "শীঘ্রই আসছে",
      safeTrusted: "নিরাপদ, সুরক্ষিত ও বিশ্বস্ত",
    },
  },

  /* ==============================================================
     ARABIC
  ============================================================== */

  ar: {
    nav: {
      home: "الرئيسية",
      features: "الميزات",
      aiAssistant: "المساعد الذكي",
      modules: "الوحدات",
      about: "حولنا",
    },

    modules: {
      quran: "القرآن",
      prayerTimes: "أوقات الصلاة",
      hadith: "الحديث",
      zakatCalculator: "حاسبة الزكاة",
    },

    actions: {
      signIn: "تسجيل الدخول",
      downloadApp: "تحميل التطبيق",
      selectLanguage: "اختر اللغة",
      searchLanguage: "ابحث عن لغة...",
      noLanguagesFound: "لم يتم العثور على لغات",
      moreLanguagesComingSoon: "المزيد من اللغات قريبًا...",
    },

    download: {
      title: "تحميل HudaVerse",
      description: "رفيقك الإسلامي المتكامل",
      getItOn: "احصل عليه من",
      downloadOnThe: "حمّله من",
      downloadApk: "تحميل APK",
      comingSoon: "قريبًا",
      safeTrusted: "آمن وموثوق به من الملايين",
    },
  },

  /* ==============================================================
     PERSIAN / FARSI
  ============================================================== */

  fa: {
    nav: {
      home: "خانه",
      features: "ویژگی‌ها",
      aiAssistant: "دستیار هوشمند",
      modules: "ماژول‌ها",
      about: "درباره ما",
    },

    modules: {
      quran: "قرآن",
      prayerTimes: "اوقات نماز",
      hadith: "حدیث",
      zakatCalculator: "محاسبه زکات",
    },

    actions: {
      signIn: "ورود",
      downloadApp: "دانلود برنامه",
      selectLanguage: "انتخاب زبان",
      searchLanguage: "جستجوی زبان...",
      noLanguagesFound: "زبانی پیدا نشد",
      moreLanguagesComingSoon: "زبان‌های بیشتری به‌زودی اضافه می‌شوند...",
    },

    download: {
      title: "دانلود HudaVerse",
      description: "همراه اسلامی همه‌جانبه شما",
      getItOn: "دریافت از",
      downloadOnThe: "دانلود از",
      downloadApk: "دانلود APK",
      comingSoon: "به‌زودی",
      safeTrusted: "امن، مطمئن و مورد اعتماد میلیون‌ها نفر",
    },
  },

  /* ==============================================================
     URDU
  ============================================================== */

  ur: {
    nav: {
      home: "ہوم",
      features: "خصوصیات",
      aiAssistant: "AI معاون",
      modules: "ماڈیولز",
      about: "ہمارے بارے میں",
    },

    modules: {
      quran: "قرآن",
      prayerTimes: "نماز کے اوقات",
      hadith: "حدیث",
      zakatCalculator: "زکوٰۃ کیلکولیٹر",
    },

    actions: {
      signIn: "سائن اِن",
      downloadApp: "ایپ ڈاؤن لوڈ کریں",
      selectLanguage: "زبان منتخب کریں",
      searchLanguage: "زبان تلاش کریں...",
      noLanguagesFound: "کوئی زبان نہیں ملی",
      moreLanguagesComingSoon: "مزید زبانیں جلد آرہی ہیں...",
    },

    download: {
      title: "HudaVerse ڈاؤن لوڈ کریں",
      description: "آپ کا مکمل اسلامی ساتھی",
      getItOn: "یہاں سے حاصل کریں",
      downloadOnThe: "یہاں سے ڈاؤن لوڈ کریں",
      downloadApk: "APK ڈاؤن لوڈ کریں",
      comingSoon: "جلد آرہا ہے",
      safeTrusted: "محفوظ، قابلِ اعتماد اور لاکھوں افراد کا بھروسا",
    },
  },

  /* ==============================================================
     TURKISH
  ============================================================== */

  tr: {
    nav: {
      home: "Ana Sayfa",
      features: "Özellikler",
      aiAssistant: "Yapay Zeka Asistanı",
      modules: "Modüller",
      about: "Hakkımızda",
    },

    modules: {
      quran: "Kur'an",
      prayerTimes: "Namaz Vakitleri",
      hadith: "Hadis",
      zakatCalculator: "Zekât Hesaplayıcı",
    },

    actions: {
      signIn: "Giriş Yap",
      downloadApp: "Uygulamayı İndir",
      selectLanguage: "Dil Seç",
      searchLanguage: "Dil ara...",
      noLanguagesFound: "Dil bulunamadı",
      moreLanguagesComingSoon: "Daha fazla dil yakında...",
    },

    download: {
      title: "HudaVerse'i İndir",
      description: "Hepsi bir arada İslami yardımcınız",
      getItOn: "Şuradan edinin",
      downloadOnThe: "Şuradan indirin",
      downloadApk: "APK İndir",
      comingSoon: "Yakında",
      safeTrusted: "Güvenli ve milyonlarca kişi tarafından güvenilir",
    },
  },
};

/* ================================================================
   TRANSLATION HELPER
================================================================ */

export function getNavbarTranslations(language: string): NavbarTranslations {
  if (isValidLanguage(language)) {
    return NAV_TRANSLATIONS[language];
  }

  return NAV_TRANSLATIONS[DEFAULT_LANGUAGE];
}

/* ================================================================
   NAVIGATION
================================================================ */

export function getNavItems(language: string): NavItem[] {
  const translations = getNavbarTranslations(language);

  return [
    {
      key: "home",
      href: "/",
      label: translations.nav.home,
    },

    {
      key: "features",
      href: "/features",
      label: translations.nav.features,
    },

    {
      key: "ai-assistant",
      href: "/ai-assistant",
      label: translations.nav.aiAssistant,
    },

    {
      key: "modules",
      href: "/modules",
      label: translations.nav.modules,

      children: [
        {
          key: "quran",
          href: "/modules/quran",
          label: translations.modules.quran,
        },

        {
          key: "prayer-times",
          href: "/modules/prayer-times",
          label: translations.modules.prayerTimes,
        },

        {
          key: "hadith",
          href: "/modules/hadith",
          label: translations.modules.hadith,
        },

        {
          key: "zakat-calculator",
          href: "/modules/zakat-calculator",
          label: translations.modules.zakatCalculator,
        },
      ],
    },

    {
      key: "about",
      href: "/about",
      label: translations.nav.about,
    },
  ];
}

/* ================================================================
   DOWNLOAD LINKS
================================================================ */

export function getDownloadLinks(language: string): DownloadLinkItem[] {
  const translations = getNavbarTranslations(language);

  return [
    {
      key: "googlePlay",
      label: translations.download.getItOn,
      subLabel: "Google Play",
      href: "https://play.google.com/store/apps/details?id=com.hudaverse.app",
      icon: "play",
    },

    {
      key: "appStore",
      label: translations.download.downloadOnThe,
      subLabel: "App Store",
      href: "https://apps.apple.com/app/hudaverse",
      icon: "apple",
    },

    {
      key: "apk",
      label: translations.download.downloadApk,
      subLabel: translations.download.comingSoon,
      href: "#",
      icon: "android",
      badge: "New",
      disabled: true,
    },
  ];
}

/* ================================================================
   NAVBAR CONSTANTS
================================================================ */

export const SCROLL_THRESHOLD = 24;

export const SCROLL_TRANSITION_DISTANCE = 180;

export const NAVBAR_HEIGHT = 86;

export const NAVBAR_MAX_DARK_OPACITY = 0.82;

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

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll, {
      passive: true,
    });

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

      setIsScrolled((current) => {
        if (current === next) {
          return current;
        }

        return next;
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

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

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

    return () => {
      document.removeEventListener("pointerdown", listener);
    };
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

    return () => {
      document.removeEventListener("keydown", listener);
    };
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

      window.scrollTo({
        top: scrollY,
        left: 0,
        behavior: "auto",
      });
    };
  }, [locked]);
}
