/* ================================================================
   HUDAVERSE — NAVBAR BANGLA TRANSLATIONS
   Language: Bangla (বাংলা)
================================================================ */

export const navbar = {
  // Main navigation
  home: "হোম",
  features: "ফিচারসমূহ",
  aiAssistant: "AI সহকারী",
  modules: "মডিউলসমূহ",
  about: "HudaVerse সম্পর্কে",

  // Module submenu
  quran: "কুরআন",
  prayerTimes: "নামাজের সময়",
  hadith: "হাদিস",
  zakatCalculator: "যাকাত ক্যালকুলেটর",

  // Language
  selectLanguage: "ভাষা নির্বাচন করুন",
  searchLanguage: "ভাষা খুঁজুন...",
  noLanguagesFound: "কোনো ভাষা পাওয়া যায়নি",
  moreLanguagesComingSoon: "আরও ভাষা শীঘ্রই যোগ করা হবে...",

  // Actions
  actions: {
    selectLanguage: "ভাষা নির্বাচন করুন",
    signIn: "সাইন ইন",
    downloadApp: "অ্যাপ ডাউনলোড",
  },

  // Mobile navbar
  mobile: {
    openMenu: "মেনু খুলুন",
    closeMenu: "মেনু বন্ধ করুন",
    home: "প্রধান নেভিগেশন",
  },

  // Account
  signIn: "সাইন ইন",

  // Download
  download: {
    button: "অ্যাপ ডাউনলোড",
    title: "HudaVerse ডাউনলোড করুন",
    description: "আপনার পছন্দের প্ল্যাটফর্ম নির্বাচন করুন।",
    safeTrusted: "নিরাপদ ও বিশ্বস্ত ডাউনলোড",
    close: "ডাউনলোড পপআপ বন্ধ করুন",
    ariaLabel: "HudaVerse ডাউনলোড",
  },

  // Download information
  downloadHudaVerse: "HudaVerse ডাউনলোড করুন",
  allInOneIslamicCompanion: "আপনার সম্পূর্ণ ইসলামী সহচর",

  // Download platforms
  getItOn: "পাওয়া যাচ্ছে",
  googlePlay: "Google Play",
  downloadOnThe: "ডাউনলোড করুন",
  appStore: "App Store",
  downloadApk: "APK ডাউনলোড",
  comingSoon: "শীঘ্রই আসছে",
  new: "নতুন",

  // Trust
  safeSecureTrusted: "নিরাপদ ও বিশ্বস্ত ডাউনলোড",
} as const;

export type NavbarTranslations = typeof navbar;

export default navbar;
