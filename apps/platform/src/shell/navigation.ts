import { isAvailableRoute } from "@/core/config/env";

export const navigationItems = [
  { key: "home", href: "/dashboard", icon: "home" },
  { key: "quran", href: "/quran", icon: "book-open" },
  { key: "hadith", href: "/hadith", icon: "book-open-check" },
  { key: "tafsir", href: "/tafsir", icon: "book-text" },
  { key: "fiqh", href: "/fiqh", icon: "scale" },
  { key: "dua", href: "/dua", icon: "hands-praying" },
  { key: "tools", href: "/tools", icon: "settings-2" },
  { key: "learning", href: "/learning", icon: "graduation-cap" },
  { key: "community", href: "/community", icon: "users-round" },
  { key: "bookmarks", href: "/bookmarks", icon: "bookmark" },
  { key: "notes", href: "/notes", icon: "notebook-pen" },
  { key: "downloads", href: "/downloads", icon: "download" },
  { key: "history", href: "/history", icon: "history" },
  { key: "settings", href: "/settings", icon: "settings" },
] as const;

export const bottomTabItems = [
  navigationItems[0],
  navigationItems[1],
  navigationItems[2],
  navigationItems[4],
  { key: "profile", href: "/profile", icon: "user" },
] as const;

export { isAvailableRoute };
