/* ================================================================
   HUDAVERSE — NAVBAR TURKISH TRANSLATIONS
   Language: Turkish (Türkçe)
================================================================ */

export const navbar = {
  // Main navigation
  home: "Ana Sayfa",
  features: "Özellikler",
  aiAssistant: "Yapay Zekâ Asistanı",
  modules: "Modüller",
  about: "Hakkında",

  // Module submenu
  quran: "Kur'an",
  prayerTimes: "Namaz Vakitleri",
  hadith: "Hadis",
  zakatCalculator: "Zekât Hesaplayıcı",

  // Language
  selectLanguage: "Dil Seçin",
  searchLanguage: "Dil ara...",
  noLanguagesFound: "Hiçbir dil bulunamadı",
  moreLanguagesComingSoon: "Daha fazla dil yakında eklenecek...",

  // Actions
  actions: {
    selectLanguage: "Dil Seçin",
    signIn: "Giriş Yap",
    downloadApp: "Uygulamayı İndir",
  },

  // Mobile navbar
  mobile: {
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    home: "Ana gezinme",
  },

  // Account
  signIn: "Giriş Yap",

  // Download
  download: {
    button: "Uygulamayı İndir",
    title: "HudaVerse'i Edinin",
    description: "Tercih ettiğiniz platformu seçin.",
    safeTrusted: "Güvenli ve güvenilir indirme",
    close: "İndirme penceresini kapat",
    ariaLabel: "HudaVerse'i İndir",
  },

  downloadApp: "Uygulamayı İndir",
  downloadHudaVerse: "HudaVerse'i İndir",
  allInOneIslamicCompanion: "Hepsi bir arada İslami yardımcınız",

  // Download platforms
  getItOn: "Şuradan edinin",
  googlePlay: "Google Play",
  downloadOnThe: "Şuradan indirin",
  appStore: "App Store",
  downloadApk: "APK İndir",
  comingSoon: "Yakında",
  new: "Yeni",

  // Trust
  safeSecureTrusted: "Güvenli ve güvenilir indirme",

  // Kept for backward compatibility with any old flat references
  ariaLabel: "HudaVerse'i İndir",
  closeDownload: "İndirme penceresini kapat",
} as const;

export type NavbarTranslations = typeof navbar;

export default navbar;
