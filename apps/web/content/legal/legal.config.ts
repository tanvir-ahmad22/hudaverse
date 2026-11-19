// TEST CONTENT: review and replace before public launch
export const legalConfig = {
  operatorName: "HudaVerse",
  operatorLocation: "Bangladesh",
  supportEmail: "support@hudaverse.com",
  privacyEmail: "privacy@hudaverse.com",
  lastUpdated: "19 November 2026",
  minimumAge: 13,
  deletionDays: 30,
  backupDays: 30,
} as const;

export type LegalConfig = typeof legalConfig;

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: readonly string[] }
  | { type: "steps"; items: readonly string[] }
  | { type: "definitions"; items: readonly { term: string; description: string }[] }
  | { type: "link"; text: string; href: "/privacy" | "/terms" | "/data-deletion" };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: readonly LegalBlock[];
};

export type LegalDocument = {
  id: "privacy" | "terms" | "data-deletion";
  title: string;
  summary: string;
  lastUpdated: string;
  sections: readonly LegalSection[];
};

export function interpolateLegalText(text: string): string {
  return text.replace(/{{(\w+)}}/g, (token, key: string) => {
    const value = legalConfig[key as keyof LegalConfig];
    return value === undefined ? token : String(value);
  });
}

export function withLegalConfig<T extends Omit<LegalDocument, "lastUpdated">>(document: T): LegalDocument {
  return { ...document, lastUpdated: legalConfig.lastUpdated };
}
