export const ECOSYSTEM_MODULE_IDS = [
  "quran",
  "hadith",
  "prayer",
  "dua",
  "ai",
  "learning",
  "community",
  "tools",
  "profile",
  "bookmarks",
  "settings",
] as const;

export type EcosystemModuleId = (typeof ECOSYSTEM_MODULE_IDS)[number];

export const ECOSYSTEM_MODULE_EVENT = "hudaverse:open-ecosystem-module";

const MODULE_ROUTES: Record<string, EcosystemModuleId> = {
  "/quran": "quran",
  "/hadith": "hadith",
  "/prayer": "prayer",
  "/dua": "dua",
  "/ai-assistant": "ai",
  "/learn": "learning",
  "/community": "community",
  "/bookmarks": "bookmarks",
};

export function isEcosystemModuleId(value: string | null): value is EcosystemModuleId {
  return value !== null && ECOSYSTEM_MODULE_IDS.some((id) => id === value);
}

export function getEcosystemModuleHref(id: EcosystemModuleId): string {
  return `/explore?module=${id}#ecosystem`;
}

export function getEcosystemModuleForRoute(href: string): EcosystemModuleId | null {
  const path = href.split(/[?#]/, 1)[0];
  return MODULE_ROUTES[path] ?? null;
}
