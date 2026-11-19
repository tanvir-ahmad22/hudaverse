/* ================================================================
   HUDAVERSE — NAVBAR ENGLISH TRANSLATIONS
   Language: English
   Source of truth for navbar UI text (single translation system —
   navbar.config.ts no longer duplicates this).
================================================================ */

export const navbar = {
  // Primary nav labels
  nav: {
    home: "Home",
    explore: "Explore",
    ecosystem: "Ecosystem",
    about: "About",
  },
  // Explore — Contextual Knowledge Navigation Panel
  explore: {
    intro: "See the complete HudaVerse ecosystem before you dive in.",
    ctaLabel: "Explore Everything",
    sections: {
      ecosystem: {
        label: "Ecosystem",
        description: "Knowledge, learning, and tools across HudaVerse",
      },
      ai: {
        label: "AI Assistant",
        description: "Ask questions, get cited answers",
      },
      learning: {
        label: "Learning",
        description: "How guided learning works",
      },
      knowledge: {
        label: "Knowledge",
        description: "Browse Quran, Hadith, and other knowledge areas",
      },
      personalSpace: {
        label: "Personal Space",
        description: "Your profile and saved knowledge",
      },
      trust: {
        label: "Trust & Sources",
        description: "How we verify every source",
      },
      aDay: {
        label: "A Day with HudaVerse",
        description: "See a real use case",
      },
    },
  },

  ecosystem: {
    sections: {
      quran: { title: "Quran", description: "Read the Quran and its translations" },
      hadith: { title: "Hadith", description: "Browse Hadith collections and narrations" },
      prayer: { title: "Prayer", description: "Explore prayer times and guidance" },
      dua: { title: "Dua", description: "Find supplications for daily life" },
      ai: { title: "AI Assistant", description: "Ask questions with cited answers" },
      learning: { title: "Learning Center", description: "Follow structured learning paths" },
      community: { title: "Community", description: "Connect around shared learning" },
      tools: { title: "Islamic Tools", description: "Use practical tools for daily worship" },
      profile: { title: "Profile", description: "Manage your account and preferences" },
      bookmarks: { title: "Bookmarks & Notes", description: "Return to saved passages and notes" },
      settings: { title: "Settings & Personalization", description: "Adjust your experience and settings" },
    },
  },

  // Bar actions
  actions: {
    skipToContent: "Skip to main content",
    search: "Search",
    selectLanguage: "Select Language",
    searchLanguage: "Search language...",
    noLanguagesFound: "No languages found",
    moreLanguagesComingSoon: "More languages coming soon...",
    signIn: "Sign In",
    getStarted: "Get Started",
  },

  // Mobile drawer
  mobile: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navLabel: "Main navigation",
    menuTitle: "Menu",
  },
};

export type NavbarTranslations = typeof navbar;

export default navbar;
