/* ================================================================
   HUDAVERSE — NAVBAR ENGLISH TRANSLATIONS
   Language: English
================================================================ */

export const navbar = {
  // Main navigation
  home: "Home",
  features: "Features",
  aiAssistant: "AI Assistant",
  modules: "Modules",
  about: "About HudaVerse",

  // Module submenu
  quran: "Quran",
  prayerTimes: "Prayer Times",
  hadith: "Hadith",
  zakatCalculator: "Zakat Calculator",

  // Language
  selectLanguage: "Select Language",
  searchLanguage: "Search language...",
  noLanguagesFound: "No languages found",
  moreLanguagesComingSoon: "More languages coming soon...",

  // Actions
  actions: {
    selectLanguage: "Select Language",
    signIn: "Sign In",
    downloadApp: "Download App",
  },

  // Mobile navbar
  mobile: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Main navigation",
  },

  // Account
  signIn: "Sign In",

  // Download
  download: {
    button: "Download App",
    title: "Get HudaVerse",
    description: "Choose your preferred platform.",
    safeTrusted: "Safe & trusted download",
    close: "Close download popup",
    ariaLabel: "Download HudaVerse",
  },

  // Download information
  downloadHudaVerse: "Download HudaVerse",
  allInOneIslamicCompanion: "Your all-in-one Islamic companion",

  // Download platforms
  getItOn: "Get it on",
  googlePlay: "Google Play",
  downloadOnThe: "Download on the",
  appStore: "App Store",
  downloadApk: "Download APK",
  comingSoon: "Coming Soon",
  new: "New",

  // Trust
  safeSecureTrusted: "Safe, Secure & Trusted by Millions",
} as const;

export type NavbarTranslations = typeof navbar;

export default navbar;
