/* ================================================================
   HUDAVERSE GLOBAL UI LANGUAGE SYSTEM
   Supported UI Languages:
   English • Bangla • Arabic • Urdu • Persian • Turkish
================================================================ */

/* ================================================================
   DEFAULT LANGUAGE
================================================================ */

export const DEFAULT_LANGUAGE = "en" as const;

export const LANGUAGE_STORAGE_KEY = "hudaverse-language";

export const LANGUAGE_CHANGE_EVENT = "hudaverse-language-change";

/* ================================================================
   LANGUAGE TYPES
================================================================ */

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
  dir: "ltr" | "rtl";
}

/* ================================================================
   SUPPORTED LANGUAGES
================================================================ */

export const LANGUAGES = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    flag: "🇬🇧",
    dir: "ltr",
  },

  {
    code: "bn",
    label: "Bangla",
    nativeLabel: "বাংলা",
    flag: "🇧🇩",
    dir: "ltr",
  },

  {
    code: "ar",
    label: "Arabic",
    nativeLabel: "العربية",
    flag: "🇸🇦",
    dir: "rtl",
  },

  {
    code: "ur",
    label: "Urdu",
    nativeLabel: "اردو",
    flag: "🇵🇰",
    dir: "rtl",
  },

  {
    code: "fa",
    label: "Persian",
    nativeLabel: "فارسی",
    flag: "🇮🇷",
    dir: "rtl",
  },

  {
    code: "tr",
    label: "Turkish",
    nativeLabel: "Türkçe",
    flag: "🇹🇷",
    dir: "ltr",
  },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

/* ================================================================
   RTL LANGUAGES
================================================================ */

export const RTL_LANGUAGES: readonly LanguageCode[] = ["ar", "ur", "fa"];

/* ================================================================
   LANGUAGE VALIDATION
================================================================ */

export function isValidLanguage(
  language: string | null | undefined,
): language is LanguageCode {
  if (!language) {
    return false;
  }

  return LANGUAGES.some((item) => item.code === language);
}

/* ================================================================
   RESOLVE LANGUAGE
================================================================ */

export function resolveLanguage(
  language: string | null | undefined,
): LanguageCode {
  if (isValidLanguage(language)) {
    return language;
  }

  return DEFAULT_LANGUAGE;
}

/* ================================================================
   GET LANGUAGE OPTION
================================================================ */

export function getLanguageOption(language: LanguageCode): LanguageOption {
  return LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0];
}

/* ================================================================
   GET TEXT DIRECTION
================================================================ */

export function getLanguageDirection(language: string): "ltr" | "rtl" {
  const resolvedLanguage = resolveLanguage(language);

  return getLanguageOption(resolvedLanguage).dir;
}

/* ================================================================
   CHECK RTL
================================================================ */

export function isRTL(language: string): boolean {
  return getLanguageDirection(language) === "rtl";
}

/* ================================================================
   GLOBAL NAVBAR TRANSLATIONS
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
   NAVBAR TRANSLATIONS
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
      moreLanguagesComingSoon: "مزید زبانیں جلد آ رہی ہیں...",
    },

    download: {
      title: "HudaVerse ڈاؤن لوڈ کریں",
      description: "آپ کا مکمل اسلامی ساتھی",
      getItOn: "حاصل کریں",
      downloadOnThe: "ڈاؤن لوڈ کریں",
      downloadApk: "APK ڈاؤن لوڈ کریں",
      comingSoon: "جلد آ رہا ہے",
      safeTrusted: "محفوظ، قابلِ اعتماد اور لاکھوں افراد کا بھروسہ",
    },
  },

  /* ==============================================================
     PERSIAN
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
      description: "همراه جامع اسلامی شما",
      getItOn: "دریافت از",
      downloadOnThe: "دانلود از",
      downloadApk: "دانلود APK",
      comingSoon: "به‌زودی",
      safeTrusted: "امن، مطمئن و مورد اعتماد میلیون‌ها نفر",
    },
  },

  /* ==============================================================
     TURKISH
  ============================================================== */

  tr: {
    nav: {
      home: "Ana Sayfa",
      features: "Özellikler",
      aiAssistant: "Yapay Zekâ Asistanı",
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
      comingSoon: "Çok Yakında",
      safeTrusted:
        "Güvenli, emniyetli ve milyonlarca kişi tarafından güveniliyor",
    },
  },
};

/* ================================================================
   TRANSLATION HELPER
================================================================ */

export function getNavbarTranslations(language: string): NavbarTranslations {
  const resolvedLanguage = resolveLanguage(language);

  return NAV_TRANSLATIONS[resolvedLanguage];
}

/* ================================================================
   NAVIGATION TYPES
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

/* ================================================================
   NAVIGATION ITEMS
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
   DOWNLOAD LINK ITEMS
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
