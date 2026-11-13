import type { LanguageCode, LocaleDictionary } from "./types";

import { shell as enShell, skipContent as enSkip } from "./en/shell";
import { home as enHome } from "./en/home";
import { homeExtra as enHomeExtra } from "./en/home-extra";
import { shell as bnShell, skipContent as bnSkip } from "./bn/shell";
import { home as bnHome } from "./bn/home";
import { homeExtra as bnHomeExtra } from "./bn/home-extra";
import { shell as arShell, skipContent as arSkip } from "./ar/shell";
import { home as arHome } from "./ar/home";
import { homeExtra as arHomeExtra } from "./ar/home-extra";
import { shell as urShell, skipContent as urSkip } from "./ur/shell";
import { home as urHome } from "./ur/home";
import { homeExtra as urHomeExtra } from "./ur/home-extra";
import { shell as faShell, skipContent as faSkip } from "./fa/shell";
import { home as faHome } from "./fa/home";
import { homeExtra as faHomeExtra } from "./fa/home-extra";
import { shell as trShell, skipContent as trSkip } from "./tr/shell";
import { home as trHome } from "./tr/home";
import { homeExtra as trHomeExtra } from "./tr/home-extra";

export const dictionaries: Record<LanguageCode, LocaleDictionary> = {
  en: { shell: { ...enShell, skipContent: enSkip }, home: { ...enHome, ...enHomeExtra } },
  bn: { shell: { ...bnShell, skipContent: bnSkip }, home: { ...bnHome, ...bnHomeExtra } },
  ar: { shell: { ...arShell, skipContent: arSkip }, home: { ...arHome, ...arHomeExtra } },
  ur: { shell: { ...urShell, skipContent: urSkip }, home: { ...urHome, ...urHomeExtra } },
  fa: { shell: { ...faShell, skipContent: faSkip }, home: { ...faHome, ...faHomeExtra } },
  tr: { shell: { ...trShell, skipContent: trSkip }, home: { ...trHome, ...trHomeExtra } },
};
