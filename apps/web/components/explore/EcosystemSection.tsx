"use client";

import React, { useMemo, useRef, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Compass,
  HeartHandshake,
  MessageCircle,
  Network,
  Search,
  Sparkles,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import {
  ECOSYSTEM_MODULE_EVENT,
  isEcosystemModuleId,
  type EcosystemModuleId,
} from "@/lib/ecosystem-navigation";
import { isRTL } from "@/lib/language";
import { explore as enExplore } from "@/locales/en/explore";
import { explore as bnExplore } from "@/locales/bn/explore";
import { explore as arExplore } from "@/locales/ar/explore";
import { explore as urExplore } from "@/locales/ur/explore";
import { explore as faExplore } from "@/locales/fa/explore";
import { explore as trExplore } from "@/locales/tr/explore";
import type { EcosystemUiCopy } from "@/locales/en/explore";
import type { LanguageCode } from "@/lib/language";


export type EcosystemModule = {
  id: EcosystemModuleId;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  role: string;
  connections: EcosystemModuleId[];
  features: string[];
  benefits: string[];
  experience: string[];
  icon: LucideIcon;
};

export const ecosystemModules: EcosystemModule[] = [
  {
    id: "quran",
    number: "01",
    title: "Quran",
    category: "Core Knowledge",
    shortDescription:
      "Read, study and understand the Quran with connected meanings, context and learning support.",
    description:
      "The Quran experience places the original Arabic text at the center and gives users a deeper path from reading to understanding. A verse can connect to word-by-word meaning, full translation, linguistic information, context, Tafsir, related Quranic verses, relevant Hadith, necessary Fiqh context, audio and learning tools. The goal is to help a user explore an Ayah without losing the relationships between the sources and concepts around it.",
    role: "The central source of revelation and the foundation around which related Islamic knowledge can be discovered.",
    connections: ["hadith", "ai", "learning", "bookmarks"],
    features: [
      "Arabic Quranic text",
      "Word-by-word translation",
      "Full verse translations",
      "Multiple translation support",
      "Word and linguistic information",
      "Verse context and explanation",
      "Tafsir and related explanations",
      "Related Quranic verses",
      "Related Hadith",
      "Relevant Fiqh context",
      "Audio and recitation",
      "Memorization and learning support",
      "Search and navigation",
      "Bookmarks and personal notes",
      "Sharing and saved study points",
      "AI-assisted understanding",
    ],
    benefits: [
      "Understand an Ayah beyond a single translation.",
      "Move naturally from a verse to its relevant supporting knowledge.",
      "Study Quran vocabulary and meanings in a more connected way.",
      "Save, revisit and continue personal Quran study.",
    ],
    experience: [
      "Open an Ayah â†’ explore words and translation â†’ view Tafsir and related sources â†’ continue learning or ask AI for further explanation.",
    ],
    icon: BookOpen,
  },
  {
    id: "hadith",
    number: "02",
    title: "Hadith",
    category: "Core Knowledge",
    shortDescription:
      "Study Prophetic traditions with source context, related Quran, explanation and learning connections.",
    description:
      "The Hadith experience is designed to let users read a narration and then understand its source, grading and surrounding knowledge. Where appropriate, a Hadith can connect with related Quranic guidance, other narrations, topics, explanations, relevant Fiqh context and structured learning resources.",
    role: "A major source for understanding Prophetic guidance, practice and the context of Islamic teachings.",
    connections: ["quran", "learning", "ai", "bookmarks"],
    features: [
      "Hadith collections",
      "Arabic text and translations",
      "Source and reference information",
      "Hadith grading information",
      "Narrator-related information",
      "Topic-based discovery",
      "Related Quran references",
      "Related Hadith",
      "Explanation and context",
      "Relevant Fiqh context",
      "Search and filtering",
      "Bookmarks and notes",
      "Sharing",
      "Learning connections",
      "AI-assisted discovery",
    ],
    benefits: [
      "Find relevant Prophetic guidance around a subject.",
      "Understand a narration with its source and surrounding context.",
      "Discover connections between Hadith and Quranic guidance.",
      "Turn individual discoveries into structured learning.",
    ],
    experience: [
      "Read a Hadith â†’ inspect source and grading â†’ explore related Quran/Hadith â†’ understand the subject â†’ save it for later study.",
    ],
    icon: MessageCircle,
  },
  {
    id: "prayer",
    number: "03",
    title: "Prayer",
    category: "Daily Worship",
    shortDescription:
      "Keep prayer times, daily worship planning and practical guidance together in one place.",
    description:
      "Prayer is designed around the practical needs of daily worship. Users can see prayer timings, follow a daily schedule, receive reminders and access related guidance. The experience can work alongside HudaVerse's practical tools and Dua content so daily worship information is not isolated from the wider ecosystem.",
    role: "A practical layer for daily Salah, worship planning and consistent spiritual routine.",
    connections: ["tools", "dua", "profile", "settings"],
    features: [
      "Prayer timings",
      "Next-prayer information",
      "Daily prayer schedule",
      "Prayer reminders",
      "Prayer guidance",
      "Location-aware timing support",
      "Calculation preferences",
      "Madhhab-related settings where applicable",
      "Worship routine support",
      "Related Dua discovery",
      "Personal prayer preferences",
    ],
    benefits: [
      "Know what is coming next in the daily prayer schedule.",
      "Keep worship information easy to access throughout the day.",
      "Personalize relevant prayer and notification preferences.",
      "Connect prayer with related Dua and practical Islamic tools.",
    ],
    experience: [
      "Check today's schedule â†’ see the next prayer â†’ receive a reminder â†’ open related guidance or Dua when needed.",
    ],
    icon: Compass,
  },
  {
    id: "dua",
    number: "04",
    title: "Dua",
    category: "Daily Worship",
    shortDescription:
      "Discover authentic supplications with Arabic, meaning, context, sources and practical use.",
    description:
      "The Dua experience helps users find supplications for everyday situations, needs and occasions. Each Dua can be presented with Arabic, translation, transliteration where useful, meaning, context and source information, with links to related Quran and Hadith knowledge. Important Duas can be saved for quick personal access.",
    role: "A practical layer for remembrance, supplication and personal worship.",
    connections: ["quran", "prayer", "learning", "bookmarks"],
    features: [
      "Dua collections",
      "Arabic text",
      "Translation",
      "Transliteration where useful",
      "Meaning and explanation",
      "Occasion-based discovery",
      "Context and usage",
      "Source references",
      "Related Quran",
      "Related Hadith",
      "Audio support where available",
      "Bookmarks and personal notes",
      "Daily remembrance",
      "Search and discovery",
    ],
    benefits: [
      "Find a relevant Dua without searching through unrelated content.",
      "Understand what a supplication means and when it is used.",
      "Keep frequently used Duas together for quick access.",
      "Discover the Quranic and Prophetic knowledge connected to a Dua.",
    ],
    experience: [
      "Choose a situation â†’ read the Dua â†’ understand its meaning and source â†’ save it â†’ revisit it during daily worship.",
    ],
    icon: HeartHandshake,
  },
  {
    id: "ai",
    number: "05",
    title: "AI Assistant",
    category: "Intelligent Assistance",
    shortDescription:
      "Ask naturally and explore connected Islamic knowledge with source-aware assistance.",
    description:
      "Ask a question, inspect related references and continue to the underlying material. The example in the AI section shows this question-to-source workflow.",
    role: "An intelligent interface for questions, explanation, discovery and guided exploration.",
    connections: ["quran", "hadith", "learning", "tools", "profile"],
    features: [
      "Natural-language questions",
      "Context-aware conversations",
      "Relevant Quran discovery",
      "Relevant Hadith discovery",
      "Tafsir and explanation support",
      "Relevant Fiqh context",
      "Source-aware responses",
      "Follow-up questions",
      "Topic exploration",
      "Learning recommendations",
      "Conversation history",
      "Saved conversations",
      "Personalized assistance",
      "Clear uncertainty and source boundaries",
    ],
    benefits: [
      "Ask questions without first knowing where the answer is located.",
      "Move from an answer to the underlying sources and related knowledge.",
      "Use follow-up questions to build understanding step by step.",
      "Keep useful conversations for future learning.",
    ],
    experience: [
      "Ask a question â†’ AI identifies the topic â†’ relevant sources are surfaced â†’ explanation is given â†’ user can inspect sources or continue learning.",
    ],
    icon: Brain,
  },
  {
    id: "learning",
    number: "06",
    title: "Learning Center",
    category: "Education",
    shortDescription:
      "Turn individual discoveries into structured Quran, Hadith and Islamic learning journeys.",
    description:
      "Follow a topic through lessons, practice and progress markers. The Learning section below illustrates a sample path.",
    role: "Structured education and deeper study across interconnected Islamic subjects.",
    connections: ["quran", "hadith", "ai", "community", "profile"],
    features: [
      "Structured courses",
      "Lessons and topics",
      "Learning paths",
      "Quran-based lessons",
      "Hadith-based lessons",
      "Explanations and resources",
      "Practice activities",
      "Quizzes and assessments",
      "Progress tracking",
      "Revision support",
      "Saved learning materials",
      "Personal learning history",
      "AI learning assistance",
      "Community learning connections",
    ],
    benefits: [
      "Learn systematically instead of relying only on random discoveries.",
      "Track progress and return to unfinished study.",
      "Connect lessons directly with primary and supporting sources.",
      "Build a repeatable personal learning routine.",
    ],
    experience: [
      "Choose a topic â†’ follow lessons â†’ study Quran/Hadith sources â†’ practice â†’ review â†’ track progress and continue.",
    ],
    icon: Sparkles,
  },
  {
    id: "community",
    number: "07",
    title: "Community",
    category: "Social Learning",
    shortDescription:
      "A Phase 6 roadmap expansion; its user-facing scope remains to be defined.",
    description:
      "The Blueprint places Community in Phase 6. Specific features, access rules and workflows are not defined by this overview.",
    role: "Future expansion only; implementation scope requires a separate approved design.",
    connections: ["learning", "quran", "hadith", "ai", "profile"],
    features: [],
    benefits: [],
    experience: [],
    icon: Users,
  },
  {
    id: "tools",
    number: "08",
    title: "Islamic Tools",
    category: "Utilities",
    shortDescription:
      "An overview grouping Blueprint-listed Prayer and Zakat areas.",
    description:
      "This overview groups Prayer and Zakat subjects named in the Blueprint. It does not specify additional utility features or claim they are implemented.",
    role: "A high-level grouping for approved worship and Zakat subjects.",
    connections: ["prayer", "dua", "quran", "profile", "settings"],
    features: [
      "Prayer subject area",
      "Zakat subject area",
    ],
    benefits: [],
    experience: [],
    icon: CalendarDays,
  },
  {
    id: "profile",
    number: "09",
    title: "Profile",
    category: "Personal Experience",
    shortDescription:
      "Your personal HudaVerse space for identity, preferences, activity and learning progress.",
    description:
      "A personal area for account details and preferences, with links to saved material and learning activity as those capabilities become available.",
    role: "The personal layer that connects a user's activity, preferences and progress across HudaVerse.",
    connections: ["bookmarks", "learning", "community", "ai", "settings"],
    features: [
      "Account profile",
      "Personal preferences",
      "Language preference",
      "Reading preferences",
      "Learning progress",
      "Activity history",
      "Saved content access",
      "AI conversation history",
      "Community activity",
      "Notification preferences",
      "Privacy and security controls",
      "Personalized experience",
    ],
    benefits: [
      "Keep personal activity and learning progress in one place.",
      "Carry preferences across different HudaVerse modules.",
      "Return to previously saved or studied content quickly.",
      "Build a more personalized long-term learning experience.",
    ],
    experience: [
      "Open Profile â†’ review activity and progress â†’ manage preferences â†’ jump back into saved, learned or recently viewed content.",
    ],
    icon: Users,
  },
  {
    id: "bookmarks",
    number: "10",
    title: "Bookmarks & Notes",
    category: "Personal Knowledge",
    shortDescription:
      "Save meaningful Ayat, Hadith, Duas, lessons and discoveries into your own knowledge space.",
    description:
      "A planned cross-module space for saved passages and study materials, with personal notes where supported.",
    role: "A cross-module personal knowledge layer for saving, organizing and revisiting useful content.",
    connections: ["quran", "hadith", "dua", "learning", "profile"],
    features: [
      "Cross-module bookmarks",
      "Saved Ayat",
      "Saved Hadith",
      "Saved Duas",
      "Saved lessons",
      "Personal notes",
      "Collections or organization",
      "Search saved content",
      "Recent saves",
      "Quick revisit",
      "Profile integration",
      "Future study workflow support",
    ],
    benefits: [
      "Save useful knowledge once and find it later from one place.",
      "Build a personal collection of important Islamic resources.",
      "Add personal context to content through notes.",
      "Turn saved discoveries into future study material.",
    ],
    experience: [
      "Find something useful â†’ bookmark or note it â†’ organize it if needed â†’ open your saved space later â†’ continue studying.",
    ],
    icon: BookOpen,
  },
  {
    id: "settings",
    number: "11",
    title: "Settings & Personalization",
    category: "Personal Experience",
    shortDescription:
      "Control language, appearance, notifications, reading and privacy preferences across HudaVerse.",
    description:
      "Settings provide the controls needed to make HudaVerse comfortable and consistent across devices and modules. The system can manage language, reading preferences, notifications, appearance, privacy and other personal choices without requiring users to configure every module separately.",
    role: "The control layer for personal preferences, accessibility, privacy and system behavior.",
    connections: ["profile", "prayer", "quran", "tools"],
    features: [
      "Language selection",
      "Reading preferences",
      "Text and display controls",
      "Theme preferences",
      "Notification settings",
      "Prayer preferences",
      "Calculation preferences",
      "Privacy controls",
      "Security controls",
      "Account management",
      "Personalization",
      "Cross-module preferences",
    ],
    benefits: [
      "Make HudaVerse fit the user's preferred language and reading style.",
      "Control notifications and practical worship preferences.",
      "Manage privacy and security choices from one place.",
      "Keep personal settings consistent across the ecosystem.",
    ],
    experience: [
      "Open Settings â†’ choose a preference â†’ apply it across supported modules â†’ return to HudaVerse with a consistent experience.",
    ],
    icon: Compass,
  },
];


export type ConstellationPoint = { x: number; y: number };
export type ConstellationEdge = { from: EcosystemModuleId; to: EcosystemModuleId };
export type ConstellationGeometry = { positions: Map<EcosystemModuleId, ConstellationPoint>; edges: ConstellationEdge[] };

export function getValidatedConnections(module: EcosystemModule, modules: readonly EcosystemModule[]) {
  const available = new Map(modules.map((item) => [item.id, item]));
  return module.connections
    .filter((id, index, ids) => id !== module.id && available.has(id) && ids.indexOf(id) === index)
    .map((id) => available.get(id))
    .filter((item): item is EcosystemModule => item !== undefined);
}

export function getConstellationGeometry(modules: readonly EcosystemModule[]): ConstellationGeometry {
  const positions = new Map<EcosystemModuleId, ConstellationPoint>();
  const ids = new Set(modules.map((module) => module.id));
  const count = modules.length;

  if (count === 1) positions.set(modules[0].id, { x: 50, y: 50 });
  else if (count > 1) {
    const radiusX = 40;
    const radiusY = count > 8 ? 39 : 34;
    modules.forEach((module, index) => {
      const angle = -Math.PI / 2 + Math.PI / count + (Math.PI * 2 * index) / count;
      positions.set(module.id, {
        x: Number((50 + Math.cos(angle) * radiusX).toFixed(4)),
        y: Number((50 + Math.sin(angle) * radiusY).toFixed(4)),
      });
    });
  }

  const edges: ConstellationEdge[] = [];
  const seen = new Set<string>();
  for (const item of modules) {
    for (const target of item.connections) {
      if (target === item.id || !ids.has(target)) continue;
      const [from, to] = [item.id, target].sort();
      const key = `${from}:${to}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from, to });
    }
  }

  return { positions, edges };
}

export function validateEcosystemConnections(modules: readonly EcosystemModule[]) {
  const ids = new Set(modules.map((module) => module.id));
  return modules.flatMap((item) => item.connections
    .filter((target) => target === item.id || !ids.has(target))
    .map((target) => ({ moduleId: item.id, target })));
}

type Props = {
  modules: readonly EcosystemModule[];
  visibleIds: ReadonlySet<EcosystemModuleId>;
  selectedId: EcosystemModuleId | null;
  previewId: EcosystemModuleId | null;
  copy: EcosystemUiCopy;
  rtl: boolean;
  onPreview: (id: EcosystemModuleId | null) => void;
  onSelect: (id: EcosystemModuleId) => void;
};

function EcosystemConstellation({
  modules,
  visibleIds,
  selectedId,
  previewId,
  copy,
  rtl,
  onPreview,
  onSelect,
}: Props) {
  const reducedMotion = useReducedMotion() ?? false;
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const geometry = useMemo(() => getConstellationGeometry(modules), [modules]);
  const moduleMap = useMemo(() => new Map(modules.map((module) => [module.id, module])), [modules]);
  const highlightedId = selectedId ?? previewId;
  const highlightedModule = highlightedId ? moduleMap.get(highlightedId) ?? null : null;
  const connectedIds = new Set(highlightedModule ? getValidatedConnections(highlightedModule, modules).map((module) => module.id) : []);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!modules.length) return;
    const current = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-constellation-index]");
    if (!current) return;
    const currentIndex = Number(current.dataset.constellationIndex);
    let nextIndex: number | null = null;
    const forward = rtl ? "ArrowLeft" : "ArrowRight";
    const backward = rtl ? "ArrowRight" : "ArrowLeft";
    if (event.key === forward || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % modules.length;
    if (event.key === backward || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + modules.length) % modules.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = modules.length - 1;
    if (nextIndex === null || !modules.length) return;
    event.preventDefault();
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="hv-constellation-wrap">
      <div className="hv-constellation-desktop">
        <div
          role="group"
          className="hv-constellation-orbit"
          aria-label={copy.constellationLabel}
          onKeyDown={handleKeyDown}
        >
          <svg className="hv-constellation-edges" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
            {geometry.edges.map(({ from, to }) => {
              const source = geometry.positions.get(from);
              const target = geometry.positions.get(to);
              if (!source || !target) return null;
              const emphasized = highlightedId !== null && (from === highlightedId || to === highlightedId);
              const dimmed = highlightedId !== null && !emphasized;
              return (
                <line
                  key={`${from}:${to}`}
                  x1={(rtl ? 100 - source.x : source.x) * 10}
                  y1={source.y * 7}
                  x2={(rtl ? 100 - target.x : target.x) * 10}
                  y2={target.y * 7}
                  className="hv-constellation-edge"
                  data-emphasized={emphasized}
                  data-dimmed={dimmed}
                />
              );
            })}
          </svg>

          <div className="hv-constellation-hub" aria-live="polite" aria-atomic="true">
            <span className="hv-constellation-hub-mark" aria-hidden="true">HV</span>
            <span className="hv-constellation-hub-title">
              {highlightedModule ? copy.modules[highlightedModule.id] : copy.centralLabel}
            </span>
            {highlightedModule && (
              <span className="hv-constellation-hub-copy">
                {copy.moduleSummaries[highlightedModule.id]}
              </span>
            )}
          </div>

          {modules.map((module, index) => {
            const point = geometry.positions.get(module.id);
            if (!point) return null;
            const Icon = module.icon;
            const selected = selectedId === module.id;
            const connected = connectedIds.has(module.id);
            const dimmed = highlightedId !== null && highlightedId !== module.id && !connected;
            return (
              <div
                key={module.id}
                className="hv-constellation-node-position"
                style={{ left: `${rtl ? 100 - point.x : point.x}%`, top: `${point.y}%` }}
              >
                <button
                  ref={(node) => { buttonRefs.current[index] = node; }}
                  type="button"
                  data-constellation-index={index}
                  data-selected={selected}
                  data-connected={connected}
                  data-dimmed={dimmed || !visibleIds.has(module.id)}
                  aria-pressed={selected}
                  aria-label={`${copy.modules[module.id]}: ${copy.moduleSummaries[module.id]}`}
                  onClick={() => onSelect(module.id)}
                  onFocus={() => onPreview(module.id)}
                  onMouseEnter={() => onPreview(module.id)}
                  onMouseLeave={() => onPreview(null)}
                  className="hv-constellation-node"
                  style={{ transitionDuration: reducedMotion ? "0ms" : undefined }}
                >
                  <span className="hv-constellation-node-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.6} /></span>
                  <span className="hv-constellation-node-copy">
                    <span className="hv-constellation-node-number">{module.number}</span>
                    <span className="hv-constellation-node-title">{copy.modules[module.id]}</span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hv-constellation-mobile">
        <h3 className="hv-constellation-index-title">{copy.moduleIndex}</h3>
        <ol className="hv-constellation-index">
          {modules.filter((module) => visibleIds.has(module.id)).map((module) => {
            const Icon = module.icon;
            const selected = selectedId === module.id;
            return (
              <li key={module.id}>
                <button
                  type="button"
                  data-selected={selected}
                  aria-pressed={selected}
                  aria-label={`${copy.modules[module.id]}: ${copy.moduleSummaries[module.id]}`}
                  onClick={() => onSelect(module.id)}
                  onFocus={() => onPreview(module.id)}
                  className="hv-constellation-index-item"
                >
                  <span className="hv-constellation-index-number">{module.number}</span>
                  <span className="hv-constellation-index-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.6} /></span>
                  <span className="hv-constellation-index-copy">
                    <span className="hv-constellation-index-name">{copy.modules[module.id]}</span>
                    <span className="hv-constellation-index-summary">{copy.moduleSummaries[module.id]}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

const ecosystemCopy: Record<LanguageCode, EcosystemUiCopy> = { en: enExplore.ecosystem, bn: bnExplore.ecosystem, ar: arExplore.ecosystem, ur: urExplore.ecosystem, fa: faExplore.ecosystem, tr: trExplore.ecosystem };

function subscribeToPortalHost() {
  return () => {};
}

function getPortalHost() {
  return document.body;
}

function getServerPortalHost(): HTMLElement | null {
  return null;
}

function DetailPanel({
  module,
  copy,
  language,
  rtl,
  onClose,
  onSelectConnection,
  reduceMotion,
  modalRef,
}: {
  module: EcosystemModule;
  copy: EcosystemUiCopy;
  language: LanguageCode;
  rtl: boolean;
  onClose: () => void;
  onSelectConnection: (id: EcosystemModuleId) => void;
  reduceMotion: boolean;
  modalRef: React.RefObject<HTMLDivElement | null>;
}) {
  const Icon = module.icon;
  const connections = getValidatedConnections(module, ecosystemModules);
  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.97,
              y: 10,
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.97,
              y: 10,
            }
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={copy.modules[module.id]}
      tabIndex={-1}
      lang={language}
      dir={rtl ? "rtl" : "ltr"}
      className="hv-ecosystem hv-ecosystem-dialog relative w-full max-w-2xl"
    >
      <div className="hv-ecosystem-panel relative flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="hv-ecosystem-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            >
              <Icon className="h-5 w-5" strokeWidth={1.4} />
            </div>

            <div className="min-w-0">
              <p
                className="hv-ecosystem-label"
              >
                {copy.moduleLabel} {module.number}
              </p>

              <h3 className="hv-ecosystem-title hv-h5 mt-1">
                {copy.modules[module.id]}
              </h3>

              <p className="hv-caption mt-1">
                {copy.categories[module.category]}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
                aria-label={copy.closeDetails}
            className="hv-ecosystem-close flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <X className="h-4 w-4" />
          </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
        <p className="hv-body-sm mt-0">
          {module.description}
        </p>

        {module.role && (
          <section className="mt-4 rounded-lg border border-[var(--border-light)] bg-[var(--background)] p-3 sm:p-4">
            <h4 className="hv-overline">{copy.role}</h4>
            <p className="hv-body-sm mt-2">{module.role}</p>
          </section>
        )}

        {module.features.length > 0 && (
          <section className="mt-4">
            <h4 className="hv-overline">{copy.keyCapabilities}</h4>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
              {module.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm leading-5 text-emerald-950/65">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        )}

        {module.benefits.length > 0 && (
          <section className="mt-4">
            <h4 className="hv-overline">{copy.benefits}</h4>
            <ul className="mt-2 grid gap-1">
              {module.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-sm leading-5 text-emerald-950/65">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </section>
        )}

        {module.experience.length > 0 && (
          <section className="mt-4 rounded-lg border border-[var(--border-light)] p-3 sm:p-4">
            <h4 className="hv-overline">{copy.journey}</h4>
            <p className="hv-body-sm mt-2">{module.experience.join(" ")}</p>
          </section>
        )}

        {connections.length > 0 && <div className="mt-4">
          <p className="hv-overline">
            {copy.connected}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {connections.map((connection) => {
              const ConnectionIcon = connection.icon;

              return (
                <button
                  key={connection.id}
                  type="button"
                  onClick={() => onSelectConnection(connection.id)}
                  className="group inline-flex items-center gap-2 rounded-full border border-emerald-950/10 bg-white px-3 py-2 text-xs font-semibold text-emerald-950/60 transition hover:border-emerald-800/20 hover:bg-emerald-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <ConnectionIcon className="h-3.5 w-3.5" strokeWidth={1.6} />
                  {copy.modules[connection.id]}
                  <ChevronRight className="h-3 w-3 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:opacity-80" />
                </button>
              );
            })}
          </div>
        </div>}
      </div>
    </motion.div>
  );
}

export default function EcosystemSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const { currentLang } = useLanguage();
  const copy = ecosystemCopy[currentLang] ?? enExplore.ecosystem;

  const [dialog, setDialog] = React.useState<
    { type: "module"; id: EcosystemModuleId } | { type: "search" } | null
  >(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const invokingElementRef = React.useRef<HTMLElement | null>(null);
  const portalHost = React.useSyncExternalStore(
    subscribeToPortalHost,
    getPortalHost,
    getServerPortalHost,
  );
  const activeId = dialog?.type === "module" ? dialog.id : null;
  const searchOpen = dialog?.type === "search";
  const isDialogOpen = dialog !== null;
  const [previewId, setPreviewId] = React.useState<EcosystemModuleId | null>(null);

  const closeModule = React.useCallback(() => {
    setDialog((current) => current?.type === "module" ? null : current);
    const url = new URL(window.location.href);
    if (url.searchParams.has("module")) {
      url.searchParams.delete("module");
      window.history.replaceState({}, "", url);
    }
  }, []);

  React.useEffect(() => {
    const syncFromUrl = () => {
      const url = new URL(window.location.href);
      const requestedModule = url.searchParams.get("module");
      if (isEcosystemModuleId(requestedModule)) {
        setDialog({ type: "module", id: requestedModule });
      } else {
        setDialog((current) => current?.type === "module" ? null : current);
        if (requestedModule !== null) {
          url.searchParams.delete("module");
          window.history.replaceState({}, "", url);
        }
      }
    };
    const openRequestedModule = (event: Event) => {
      const requestedModule = (event as CustomEvent<{ moduleId?: unknown }>).detail?.moduleId;
      if (typeof requestedModule === "string" && isEcosystemModuleId(requestedModule)) {
        setDialog({ type: "module", id: requestedModule });
      }
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    window.addEventListener(ECOSYSTEM_MODULE_EVENT, openRequestedModule);
    return () => {
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener(ECOSYSTEM_MODULE_EVENT, openRequestedModule);
    };
  }, []);

  const filteredModules = React.useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase(currentLang);

    return ecosystemModules.filter((module) => {
      const searchableText = [
        copy.modules[module.id],
        copy.categories[module.category],
        copy.moduleSummaries[module.id],
        module.shortDescription,
        module.description,
        module.role,
        ...module.features,
        ...module.benefits,
        ...module.experience,
      ].join(" ").toLocaleLowerCase(currentLang);
      const matchesSearch = !query || searchableText.includes(query);

      return matchesSearch;
    });
  }, [searchQuery, copy, currentLang]);

  const activeModule =
    ecosystemModules.find((module) => module.id === activeId) ?? null;

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (searchOpen) {
          setDialog(null);
          return;
        }

        if (activeId) {
          closeModule();
        }
      }

      if (
        event.key === "/" &&
        !searchOpen &&
        !activeId &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();
        if (document.activeElement instanceof HTMLElement) invokingElementRef.current = document.activeElement;
        setDialog({ type: "search" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen, activeId, closeModule]);

  React.useEffect(() => {
    if (!searchOpen) return;

    const frame = requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [searchOpen]);

  React.useEffect(() => {
    if (!isDialogOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isDialogOpen]);

  React.useEffect(() => {
    if (activeModule) modalRef.current?.focus();
  }, [activeModule]);

  React.useEffect(() => {
    if (isDialogOpen) return;
    invokingElementRef.current?.focus();
    invokingElementRef.current = null;
  }, [isDialogOpen]);

  React.useEffect(() => {
    if (!isDialogOpen) return;
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const dialog = modalRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [isDialogOpen]);

  const openModule = (id: EcosystemModuleId) => {
    if (!dialog && document.activeElement instanceof HTMLElement) invokingElementRef.current = document.activeElement;
    if (activeId === id) return;
    setDialog({ type: "module", id });
    const url = new URL(window.location.href);
    url.searchParams.set("module", id);
    window.history.pushState({}, "", url);
  };

  const closeSearch = () => {
    setDialog(null);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <section
      id="ecosystem"
      aria-labelledby="ecosystem-title"
      lang={currentLang}
      dir={isRTL(currentLang) ? "rtl" : "ltr"}
      className="hv-ecosystem hv-section hv-explore-section scroll-mt-24 relative isolate overflow-hidden"
    >
      <div className="hv-container relative z-10">
        <motion.header
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="flex flex-col items-center">
            <div className="hv-ecosystem-label hv-explore-eyebrow inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3.5 py-1.5 shadow-sm">
              <Network
                className="h-3.5 w-3.5 text-amber-500"
                strokeWidth={1.7}
              />
              {copy.eyebrow}
            </div>

            <h2
              id="ecosystem-title"
              className="hv-ecosystem-heading hv-explore-title max-w-3xl"
            >
              {copy.title}
            </h2>

            <p className="hv-ecosystem-copy hv-explore-description mx-auto max-w-2xl text-center">
              {copy.description}
            </p>
          </div>
        </motion.header>

        <AnimatePresence initial={false}>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-5 flex items-center justify-between rounded-2xl border border-emerald-950/10 bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Search className="h-4 w-4 shrink-0 text-emerald-700" />

                <p className="truncate text-xs text-emerald-950/55">
                  {copy.searchResults}{" "}
                  <span className="font-bold text-emerald-950">
                    “{searchQuery}”
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={clearSearch}
                className="ml-3 shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 hover:text-emerald-950"
              >
                {copy.clear}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredModules.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hv-card hv-card--empty mt-7 px-6 py-16 text-center"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
              <Search className="h-5 w-5" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-emerald-950">
              {copy.emptyTitle}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-emerald-950/45">
              {copy.emptyDescription}
            </p>

            <button
              type="button"
              onClick={clearSearch}
              className="mt-5 rounded-xl bg-emerald-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-900"
            >
              {copy.showAll}
            </button>
          </motion.div>
        )}

        {filteredModules.length > 0 && (
          <EcosystemConstellation
            modules={ecosystemModules}
            visibleIds={new Set(filteredModules.map((module) => module.id))}
            selectedId={activeId}
            previewId={previewId}
            copy={copy}
            rtl={isRTL(currentLang)}
            onPreview={setPreviewId}
            onSelect={openModule}
          />
        )}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-7 grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-emerald-950/[0.07] bg-white p-5">
            <div className="hv-ecosystem-icon flex h-9 w-9 items-center justify-center rounded-xl">
              <Search className="h-4 w-4" strokeWidth={1.6} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-emerald-950">
              {copy.supportCards[0]}
            </h3>

            <p className="mt-2 text-xs leading-5 text-emerald-950/45">
              {copy.supportDescriptions[0]}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-950/[0.07] bg-white p-5">
            <div className="hv-ecosystem-icon flex h-9 w-9 items-center justify-center rounded-xl">
              <Network className="h-4 w-4" strokeWidth={1.6} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-emerald-950">
              {copy.supportCards[1]}
            </h3>

            <p className="mt-2 text-xs leading-5 text-emerald-950/45">
              {copy.supportDescriptions[1]}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-950/[0.07] bg-white p-5">
            <div className="hv-ecosystem-icon flex h-9 w-9 items-center justify-center rounded-xl">
              <Brain className="h-4 w-4" strokeWidth={1.6} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-emerald-950">
              {copy.supportCards[2]}
            </h3>

            <p className="mt-2 text-xs leading-5 text-emerald-950/45">
              {copy.supportDescriptions[2]}
            </p>
          </div>
        </motion.div>
      </div>

      {portalHost && createPortal(
        <AnimatePresence>
          {searchOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            dir={isRTL(currentLang) ? "rtl" : "ltr"}
            className="fixed inset-0 z-[10001] flex items-center justify-center bg-emerald-950/50 backdrop-blur-md"
            style={{ padding: "max(var(--space-4), env(safe-area-inset-top)) max(var(--space-4), env(safe-area-inset-right)) max(var(--space-4), env(safe-area-inset-bottom)) max(var(--space-4), env(safe-area-inset-left))" }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeSearch();
              }
            }}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={copy.searchLabel}
              tabIndex={-1}
              lang={currentLang}
              dir={isRTL(currentLang) ? "rtl" : "ltr"}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: -18,
                      scale: 0.98,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: -18,
                      scale: 0.98,
                    }
              }
              className="hv-ecosystem hv-ecosystem-dialog w-full max-w-2xl border shadow-2xl"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex shrink-0 items-center gap-3 border-b border-emerald-950/[0.08] px-4 py-3 sm:px-5">
                <Search className="h-5 w-5 shrink-0 text-emerald-800" />

                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  aria-label={copy.searchLabel}
                  placeholder={copy.searchPlaceholder}
                  className="min-w-0 flex-1 bg-transparent text-sm text-emerald-950 outline-none placeholder:text-emerald-950/30"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label={copy.clear}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-emerald-950/35 transition hover:bg-emerald-950/[0.05] hover:text-emerald-950"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label={copy.closeSearch}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-950/[0.05] text-emerald-950/45 transition hover:bg-emerald-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
                {filteredModules.length > 0 ? (
                  <div className="grid gap-2">
                    {filteredModules.map((module) => {
                      const Icon = module.icon;
                      return (
                        <button
                          key={module.id}
                          type="button"
                          onClick={() => openModule(module.id)}
          className="group flex w-full items-center gap-4 rounded-xl p-3 text-start transition hover:bg-[var(--background)]"
                        >
                          <div
                            className="hv-ecosystem-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                          >
                            <Icon className="h-5 w-5" strokeWidth={1.5} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-emerald-950">
                                {copy.modules[module.id]}
                              </h3>

                              <span className="hidden text-[9px] font-bold uppercase tracking-[0.1em] text-emerald-950/25 sm:inline">
          {copy.categories[module.category]}
                              </span>
                            </div>

                            <p className="mt-1 truncate text-xs text-emerald-950/45">
            {copy.moduleSummaries[module.id]}
                            </p>
                          </div>

                          <ChevronRight className="h-4 w-4 shrink-0 text-emerald-950/20 transition group-hover:translate-x-1 group-hover:text-emerald-800" />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-5 py-12 text-center">
                    <Search className="mx-auto h-6 w-6 text-emerald-950/25" />

                    <p className="mt-3 text-sm font-semibold text-emerald-950">
                      {copy.noMatch}
                    </p>

                    <p className="mt-1 text-xs text-emerald-950/40">
                      {copy.emptyDescription}
                    </p>

                    <button
                      type="button"
                      onClick={clearSearch}
                      className="mt-4 rounded-xl bg-emerald-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-900"
                    >
                      {copy.clear}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-emerald-950/[0.08] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-950/30 sm:px-6">
                  <span>{copy.searchFooter}</span>
                <span>{copy.escape}</span>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        portalHost,
      )}

      {portalHost && createPortal(
        <AnimatePresence>
          {activeModule && !searchOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            dir={isRTL(currentLang) ? "rtl" : "ltr"}
            className="fixed inset-0 z-[10001] flex items-end justify-center bg-emerald-950/45 backdrop-blur-sm sm:items-center"
            style={{ padding: "max(var(--space-4), env(safe-area-inset-top)) max(var(--space-4), env(safe-area-inset-right)) max(var(--space-4), env(safe-area-inset-bottom)) max(var(--space-4), env(safe-area-inset-left))" }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModule();
              }
            }}
          >
            <div className="flex min-h-0 w-full max-w-2xl flex-col" onMouseDown={(event) => event.stopPropagation()}>
              <DetailPanel
                module={activeModule}
                copy={copy}
                language={currentLang}
                rtl={isRTL(currentLang)}
                onClose={closeModule}
                onSelectConnection={openModule}
                reduceMotion={reduceMotion}
                modalRef={modalRef}
              />
            </div>
          </motion.div>
          )}
        </AnimatePresence>,
        portalHost,
      )}
    </section>
  );
}
