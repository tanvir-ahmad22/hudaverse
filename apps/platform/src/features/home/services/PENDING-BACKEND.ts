import type { InspirationKey, ModuleKey, PrayerKey, ToolKey } from "../types/home-view-model";

/**
 * PENDING-BACKEND: local response fixture for the future GET /home/dashboard
 * contract. No dashboard endpoint currently exists. Replace this source when
 * the backend publishes that contract; all user-facing rendering goes through
 * home.service.ts and its view model.
 */
export interface PendingHomeResponse {
  date: { timeZone: string | null };
  prayerSchedule: {
    location: string | null;
    calculationMethod: string | null;
    prayers: { key: PrayerKey; time: string | null; completed: boolean | null }[];
  };
  streakDays: number | null;
  inspiration: { key: InspirationKey; content: null }[];
  modules: { key: ModuleKey; href: string }[];
  learning: { key: "quran" | "hadith" | "fiqh" | "tafsir"; title: null; subtitle: null; location: null; progress: null }[];
  goals: { key: "readTwoPages" | "learnHadith" | "morningDua" | "studyFiqh"; completed: boolean | null }[];
  progress: { key: "quranPages" | "hadithRead" | "fiqhTopics" | "savedBookmarks" | "savedNotes"; value: number | null }[];
  tools: { key: ToolKey; href: string }[];
  audio: { tracks: { source: string; reciter: string; title: string }[] };
  community: { key: "latestDiscussions" | "popularQuestions" | "islamicArticles"; summary: null; href: string }[];
  challenges: { key: "quranChallenge" | "ramadanChallenge" | "dailyHadithChallenge" | "dailyDhikrChallenge"; progress: number | null; href: string }[];
}

export const pendingHomeResponse: PendingHomeResponse = {
  date: { timeZone: null },
  prayerSchedule: {
    location: null,
    calculationMethod: null,
    prayers: [
      { key: "fajr", time: null, completed: null },
      { key: "dhuhr", time: null, completed: null },
      { key: "asr", time: null, completed: null },
      { key: "maghrib", time: null, completed: null },
      { key: "isha", time: null, completed: null },
    ],
  },
  streakDays: null,
  // All scripture slots remain explicitly empty until verified API content exists.
  inspiration: [
    { key: "dailyAyah", content: null },
    { key: "dailyHadith", content: null },
    { key: "todaysDua", content: null },
  ],
  modules: [
    { key: "quran", href: "/quran" },
    { key: "hadith", href: "/hadith" },
    { key: "tafsir", href: "/tafsir" },
    { key: "fiqh", href: "/fiqh" },
    { key: "dua", href: "/dua" },
    { key: "tools", href: "/tools" },
    { key: "learning", href: "/learning" },
    { key: "community", href: "/community" },
    { key: "audio", href: "/audio" },
    { key: "family", href: "/family" },
  ],
  learning: [
    { key: "quran", title: null, subtitle: null, location: null, progress: null },
    { key: "hadith", title: null, subtitle: null, location: null, progress: null },
    { key: "fiqh", title: null, subtitle: null, location: null, progress: null },
    { key: "tafsir", title: null, subtitle: null, location: null, progress: null },
  ],
  goals: [
    { key: "readTwoPages", completed: null },
    { key: "learnHadith", completed: null },
    { key: "morningDua", completed: null },
    { key: "studyFiqh", completed: null },
  ],
  progress: [
    { key: "quranPages", value: null },
    { key: "hadithRead", value: null },
    { key: "fiqhTopics", value: null },
    { key: "savedBookmarks", value: null },
    { key: "savedNotes", value: null },
  ],
  tools: [
    { key: "zakat", href: "/tools/zakat" },
    { key: "inheritance", href: "/tools/inheritance" },
    { key: "qibla", href: "/tools/qibla" },
    { key: "prayerTime", href: "/tools/prayer-time" },
    { key: "tasbih", href: "/tools/tasbih" },
    { key: "hijriCalendar", href: "/tools/hijri-calendar" },
  ],
  audio: { tracks: [] },
  community: [
    { key: "latestDiscussions", summary: null, href: "/community" },
    { key: "popularQuestions", summary: null, href: "/community/questions" },
    { key: "islamicArticles", summary: null, href: "/community/articles" },
  ],
  challenges: [
    { key: "quranChallenge", progress: null, href: "/challenges/quran" },
    { key: "ramadanChallenge", progress: null, href: "/challenges/ramadan" },
    { key: "dailyHadithChallenge", progress: null, href: "/challenges/hadith" },
    { key: "dailyDhikrChallenge", progress: null, href: "/challenges/dhikr" },
  ],
};
