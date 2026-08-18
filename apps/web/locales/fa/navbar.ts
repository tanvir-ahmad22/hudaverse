/* ================================================================
   HUDAVERSE — NAVBAR PERSIAN TRANSLATIONS
   Language: Persian (فارسی)
================================================================ */

export const navbar = {
  // Main navigation
  home: "خانه",
  features: "ویژگی‌ها",
  aiAssistant: "دستیار هوش مصنوعی",
  modules: "ماژول‌ها",
  about: "درباره ما",

  // Module submenu
  quran: "قرآن",
  prayerTimes: "اوقات نماز",
  hadith: "حدیث",
  zakatCalculator: "محاسبه زکات",

  // Language
  selectLanguage: "انتخاب زبان",
  searchLanguage: "جستجوی زبان...",
  noLanguagesFound: "هیچ زبانی یافت نشد",
  moreLanguagesComingSoon: "زبان‌های بیشتری به‌زودی اضافه خواهند شد...",

  // Actions
  actions: {
    selectLanguage: "انتخاب زبان",
    signIn: "ورود",
    downloadApp: "دانلود برنامه",
  },

  // Mobile navbar
  mobile: {
    openMenu: "باز کردن منو",
    closeMenu: "بستن منو",
    home: "پیمایش اصلی",
  },

  // Account
  signIn: "ورود",

  // Download
  download: {
    button: "دانلود برنامه",
    title: "HudaVerse را دریافت کنید",
    description: "پلتفرم مورد نظر خود را انتخاب کنید.",
    safeTrusted: "دانلود امن و مطمئن",
    close: "بستن پنجره دانلود",
    ariaLabel: "دانلود HudaVerse",
  },

  // Download information
  downloadHudaVerse: "دانلود HudaVerse",
  allInOneIslamicCompanion: "همراه جامع اسلامی شما",

  // Download platforms
  getItOn: "دریافت از",
  googlePlay: "Google Play",
  downloadOnThe: "دانلود از",
  appStore: "App Store",
  downloadApk: "دانلود APK",
  comingSoon: "به‌زودی",
  new: "جدید",

  // Trust
  safeSecureTrusted: "امن، مطمئن و مورد اعتماد میلیون‌ها نفر",
} as const;

export type NavbarTranslations = typeof navbar;

export default navbar;
