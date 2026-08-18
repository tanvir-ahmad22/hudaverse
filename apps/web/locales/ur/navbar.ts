/* ================================================================
   HUDAVERSE — NAVBAR URDU TRANSLATIONS
   Language: Urdu (اردو)
================================================================ */

export const navbar = {
  // Main navigation
  home: "ہوم",
  features: "خصوصیات",
  aiAssistant: "AI اسسٹنٹ",
  modules: "ماڈیولز",
  about: "HudaVerse کے بارے میں",

  // Module submenu
  quran: "قرآن",
  prayerTimes: "نماز کے اوقات",
  hadith: "حدیث",
  zakatCalculator: "زکوٰۃ کیلکولیٹر",

  // Language
  selectLanguage: "زبان منتخب کریں",
  searchLanguage: "زبان تلاش کریں...",
  noLanguagesFound: "کوئی زبان نہیں ملی",
  moreLanguagesComingSoon: "مزید زبانیں جلد شامل کی جائیں گی...",

  // Actions
  actions: {
    selectLanguage: "زبان منتخب کریں",
    signIn: "سائن اِن",
    downloadApp: "ایپ ڈاؤن لوڈ کریں",
  },

  // Mobile navbar
  mobile: {
    openMenu: "مینو کھولیں",
    closeMenu: "مینو بند کریں",
    home: "مرکزی نیویگیشن",
  },

  // Account
  signIn: "سائن اِن",

  // Download
  download: {
    button: "ایپ ڈاؤن لوڈ کریں",
    title: "HudaVerse حاصل کریں",
    description: "اپنا پسندیدہ پلیٹ فارم منتخب کریں۔",
    safeTrusted: "محفوظ اور قابلِ اعتماد ڈاؤن لوڈ",
    close: "ڈاؤن لوڈ ونڈو بند کریں",
    ariaLabel: "HudaVerse ڈاؤن لوڈ کریں",
  },

  downloadApp: "ایپ ڈاؤن لوڈ کریں",
  downloadHudaVerse: "HudaVerse ڈاؤن لوڈ کریں",
  allInOneIslamicCompanion: "آپ کا جامع اسلامی ساتھی",

  // Download platforms
  getItOn: "یہاں سے حاصل کریں",
  googlePlay: "Google Play",
  downloadOnThe: "یہاں سے ڈاؤن لوڈ کریں",
  appStore: "App Store",
  downloadApk: "APK ڈاؤن لوڈ کریں",
  comingSoon: "جلد آرہا ہے",
  new: "نیا",

  // Trust
  safeSecureTrusted: "محفوظ، قابلِ اعتماد اور لاکھوں افراد کا بھروسا",
} as const;

export type NavbarTranslations = typeof navbar;

export default navbar;
