export type SectionStatus = "loading" | "empty" | "error" | "ready";

export interface SectionViewModel<T> {
  status: SectionStatus;
  items: T[];
}

export type PrayerKey = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
export type InspirationKey = "dailyAyah" | "dailyHadith" | "todaysDua";
export type ModuleKey =
  | "quran" | "hadith" | "tafsir" | "fiqh" | "dua" | "tools"
  | "learning" | "community" | "audio" | "family";
export type ToolKey = "zakat" | "inheritance" | "qibla" | "prayerTime" | "tasbih" | "hijriCalendar";
export type IconKey =
  | "bookOpen" | "bookCheck" | "bookText" | "landmark" | "hands"
  | "settings" | "graduation" | "users" | "headphones" | "heart"
  | "calculator" | "compass" | "clock" | "beads" | "calendar"
  | "quran" | "bookmark" | "note" | "discussion" | "article";
export type ModuleSubtitleKey =
  | "quranSub" | "hadithSub" | "tafsirSub" | "fiqhSub" | "duaSub"
  | "toolsSub" | "learningSub" | "communitySub" | "audioSub" | "familySub";

export interface VerifiedContentViewModel {
  arabic: string | null;
  translation: string | null;
  reference: string | null;
  imageUrl?: string | null;
}

export interface InspirationCardViewModel {
  key: InspirationKey;
  icon: IconKey;
  content: VerifiedContentViewModel | null;
}

export interface PrayerViewModel {
  key: PrayerKey;
  time: string | null;
  passed: boolean;
}

export interface GoalViewModel {
  key: "readTwoPages" | "learnHadith" | "morningDua" | "studyFiqh";
  completed: boolean | null;
}

export interface ProgressViewModel {
  key: "quranPages" | "hadithRead" | "fiqhTopics" | "savedBookmarks" | "savedNotes";
  value: number | null;
  icon: IconKey;
}

export interface LearningViewModel {
  key: "quran" | "hadith" | "fiqh" | "tafsir";
  title: string;
  subtitle: string | null;
  location: string | null;
  progress: number | null;
  icon: IconKey;
}

export interface ModuleViewModel {
  key: ModuleKey;
  subtitleKey: ModuleSubtitleKey;
  icon: IconKey;
  href: string;
}

export interface ToolViewModel {
  key: ToolKey;
  icon: IconKey;
  href: string;
}

export interface CommunityViewModel {
  key: "latestDiscussions" | "popularQuestions" | "islamicArticles";
  icon: IconKey;
  summary: string | null;
  href: string;
}

export interface ChallengeViewModel {
  key: "quranChallenge" | "ramadanChallenge" | "dailyHadithChallenge" | "dailyDhikrChallenge";
  progress: number | null;
  href: string;
}

export interface AudioTrackViewModel {
  source: string;
  reciter: string;
  title: string;
}

export interface HomeViewModel {
  displayName: string | null;
  hijriDate: string;
  hijriDayMonth: string;
  hijriYear: string;
  weekday: string;
  streakDays: number | null;
  nextPrayer: PrayerKey | null;
  countdownMinutes: number | null;
  prayerMethod: string | null;
  inspiration: SectionViewModel<InspirationCardViewModel>;
  modules: ModuleViewModel[];
  learning: SectionViewModel<LearningViewModel>;
  prayers: SectionViewModel<PrayerViewModel>;
  goals: SectionViewModel<GoalViewModel>;
  progress: SectionViewModel<ProgressViewModel>;
  tools: ToolViewModel[];
  audio: SectionViewModel<AudioTrackViewModel>;
  community: SectionViewModel<CommunityViewModel>;
  challenges: SectionViewModel<ChallengeViewModel>;
}
