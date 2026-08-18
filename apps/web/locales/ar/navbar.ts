/* ================================================================
   HUDAVERSE — NAVBAR ARABIC TRANSLATIONS
   Language: Arabic (العربية)
================================================================ */

export const navbar = {
  // Main navigation
  home: "الرئيسية",
  features: "الميزات",
  aiAssistant: "المساعد الذكي",
  modules: "الوحدات",
  about: "عن HudaVerse",

  // Module submenu
  quran: "القرآن",
  prayerTimes: "مواقيت الصلاة",
  hadith: "الحديث",
  zakatCalculator: "حاسبة الزكاة",

  // Language
  selectLanguage: "اختر اللغة",
  searchLanguage: "ابحث عن لغة...",
  noLanguagesFound: "لم يتم العثور على لغة",
  moreLanguagesComingSoon: "المزيد من اللغات قريبًا...",

  // Actions
  actions: {
    selectLanguage: "اختر اللغة",
    signIn: "تسجيل الدخول",
    downloadApp: "تحميل التطبيق",
  },

  // Mobile navbar
  mobile: {
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    home: "التنقل الرئيسي",
  },

  // Account
  signIn: "تسجيل الدخول",

  // Download
  download: {
    button: "تحميل التطبيق",
    title: "احصل على HudaVerse",
    description: "اختر المنصة التي تفضلها.",
    safeTrusted: "تنزيل آمن وموثوق",
    close: "إغلاق نافذة التنزيل",
    ariaLabel: "تحميل HudaVerse",
  },

  // Download information
  downloadHudaVerse: "حمّل HudaVerse",
  allInOneIslamicCompanion: "رفيقك الإسلامي المتكامل",

  // Download platforms
  getItOn: "متوفر على",
  googlePlay: "Google Play",
  downloadOnThe: "حمّله من",
  appStore: "App Store",
  downloadApk: "تحميل APK",
  comingSoon: "قريبًا",
  new: "جديد",

  // Trust
  safeSecureTrusted: "آمن وموثوق ويحظى بثقة الملايين",
} as const;

export type NavbarTranslations = typeof navbar;

export default navbar;
