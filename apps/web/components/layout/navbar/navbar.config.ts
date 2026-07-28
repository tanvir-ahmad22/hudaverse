// ============================================
// HudaVerse Navbar Configuration
// ============================================

export const navLinks = [
  {
    label: "Home",
    href: "/",
    match: "/",
  },

  {
    label: "Features",
    href: "/#features",
    match: "#features",
  },

  {
    label: "AI Assistant",
    href: "/ai-assistant",
    match: "/ai-assistant",
    highlight: true,
    badge: "AI",
  },

  {
    label: "Quran",
    href: "/quran",
    match: "/quran",
  },

  {
    label: "Hadith",
    href: "/hadith",
    match: "/hadith",
  },

  {
    label: "Learning",
    href: "/learning",
    match: "/learning",
  },

  {
    label: "Community",
    href: "/community",
    match: "/community",
  },
];

// ============================================
// Language Configuration
// ============================================

export const languages = [
  {
    code: "EN",
    label: "English",
  },
  {
    code: "BN",
    label: "বাংলা",
  },
  {
    code: "AR",
    label: "العربية",
  },
];

// ============================================
// Navbar Actions
// ============================================

export const navbarActions = {
  login: {
    label: "Sign In",
    href: "/login",
  },

  download: {
    label: "Get App",
    href: "/#download",
  },
};
