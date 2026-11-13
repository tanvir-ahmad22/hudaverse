import { pendingHomeResponse } from "./PENDING-BACKEND";
import type {
  ChallengeViewModel,
  CommunityViewModel,
  HomeViewModel,
  IconKey,
  LearningViewModel,
  ModuleSubtitleKey,
  ModuleViewModel,
  PrayerKey,
  ProgressViewModel,
  SectionStatus,
  ToolViewModel,
} from "../types/home-view-model";

const modulePresentation: Record<HomeViewModel["modules"][number]["key"], { icon: IconKey; subtitleKey: ModuleSubtitleKey }> = {
  quran: { icon: "bookOpen", subtitleKey: "quranSub" },
  hadith: { icon: "bookCheck", subtitleKey: "hadithSub" },
  tafsir: { icon: "bookText", subtitleKey: "tafsirSub" },
  fiqh: { icon: "landmark", subtitleKey: "fiqhSub" },
  dua: { icon: "hands", subtitleKey: "duaSub" },
  tools: { icon: "settings", subtitleKey: "toolsSub" },
  learning: { icon: "graduation", subtitleKey: "learningSub" },
  community: { icon: "users", subtitleKey: "communitySub" },
  audio: { icon: "headphones", subtitleKey: "audioSub" },
  family: { icon: "heart", subtitleKey: "familySub" },
};

const progressIcons: Record<ProgressViewModel["key"], IconKey> = {
  quranPages: "quran",
  hadithRead: "bookCheck",
  fiqhTopics: "bookText",
  savedBookmarks: "bookmark",
  savedNotes: "note",
};

const toolIcons: Record<HomeViewModel["tools"][number]["key"], IconKey> = {
  zakat: "calculator",
  inheritance: "users",
  qibla: "compass",
  prayerTime: "clock",
  tasbih: "beads",
  hijriCalendar: "calendar",
};

const communityIcons: Record<CommunityViewModel["key"], IconKey> = {
  latestDiscussions: "discussion",
  popularQuestions: "discussion",
  islamicArticles: "article",
};

export interface PrayerState {
  passed: boolean[];
  nextPrayer: PrayerKey | null;
  countdownMinutes: number | null;
}

/** Pure local-time calculation; a timezone and five real schedule times are required. */
export function computePrayerState(
  prayers: readonly { key: PrayerKey; time: string | null; completed: boolean | null }[],
  now: Date,
  timeZone: string | null,
): PrayerState {
  if (!timeZone || prayers.some(({ time }) => !time)) {
    return { passed: prayers.map(({ completed }) => completed ?? false), nextPrayer: null, countdownMinutes: null };
  }

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const getPart = (type: "hour" | "minute") => Number(parts.find((part) => part.type === type)?.value ?? 0);
  const currentMinute = getPart("hour") * 60 + getPart("minute");
  const scheduledMinutes = prayers.map(({ time }) => {
    if (!time || !/^\d{2}:\d{2}$/.test(time)) return null;
    const [hour, minute] = time.split(":").map(Number);
    return hour < 24 && minute < 60 ? hour * 60 + minute : null;
  });
  const passed = scheduledMinutes.map((minute, index) =>
    prayers[index].completed ?? (minute !== null && minute <= currentMinute),
  );
  const nextIndex = scheduledMinutes.findIndex((minute) => minute !== null && minute > currentMinute);
  const firstIndex = scheduledMinutes.findIndex((minute) => minute !== null);
  const resolvedIndex = nextIndex >= 0 ? nextIndex : firstIndex;
  const targetMinute = scheduledMinutes[resolvedIndex];

  return {
    passed,
    nextPrayer: resolvedIndex >= 0 ? prayers[resolvedIndex].key : null,
    countdownMinutes:
      targetMinute === null || targetMinute === undefined
        ? null
        : (targetMinute - currentMinute + 1440) % 1440,
  };
}

function statusFor(hasVerifiedData: boolean): SectionStatus {
  return hasVerifiedData ? "ready" : "empty";
}

export function getHomeViewModel(
  displayName: string | null,
  now = new Date(),
  language = "en",
): HomeViewModel {
  const locale = `${language}-u-ca-islamic-umalqura`;
  const hijriDate = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(now);
  const hijriDayMonth = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(now);
  const hijriYear = new Intl.DateTimeFormat(locale, { year: "numeric" })
    .formatToParts(now)
    .find((part) => part.type === "year")?.value ?? "";
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(now);
  const prayerState = computePrayerState(
    pendingHomeResponse.prayerSchedule.prayers,
    now,
    pendingHomeResponse.date.timeZone,
  );
  const modules: ModuleViewModel[] = pendingHomeResponse.modules.map((module) => ({
    ...module,
    ...modulePresentation[module.key],
  }));
  const learning: LearningViewModel[] = pendingHomeResponse.learning.map((item) => ({
    key: item.key,
    title: item.title ?? "",
    subtitle: item.subtitle,
    location: item.location,
    progress: item.progress,
    icon: modulePresentation[item.key].icon,
  }));
  const progress: ProgressViewModel[] = pendingHomeResponse.progress.map((item) => ({
    ...item,
    icon: progressIcons[item.key],
  }));
  const tools: ToolViewModel[] = pendingHomeResponse.tools.map((item) => ({
    ...item,
    icon: toolIcons[item.key],
  }));
  const community: CommunityViewModel[] = pendingHomeResponse.community.map((item) => ({
    ...item,
    icon: communityIcons[item.key],
  }));
  const challenges: ChallengeViewModel[] = pendingHomeResponse.challenges.map((item) => ({ ...item }));
  const inspiration = pendingHomeResponse.inspiration.map((item) => ({
    ...item,
    icon: item.key === "dailyAyah" ? "bookOpen" as const : item.key === "dailyHadith" ? "bookCheck" as const : "hands" as const,
  }));
  const prayers = pendingHomeResponse.prayerSchedule.prayers.map((prayer, index) => ({
    key: prayer.key,
    time: prayer.time,
    passed: prayerState.passed[index] ?? false,
  }));

  return {
    displayName,
    hijriDate,
    hijriDayMonth,
    hijriYear,
    weekday,
    streakDays: pendingHomeResponse.streakDays,
    nextPrayer: prayerState.nextPrayer,
    countdownMinutes: prayerState.countdownMinutes,
    prayerMethod: pendingHomeResponse.prayerSchedule.calculationMethod,
    inspiration: { status: statusFor(inspiration.some((item) => item.content !== null)), items: inspiration },
    modules,
    learning: { status: statusFor(learning.some((item) => item.title || item.subtitle || item.progress !== null)), items: learning },
    prayers: { status: statusFor(prayers.some((item) => item.time !== null)), items: prayers },
    goals: { status: statusFor(pendingHomeResponse.goals.some((goal) => goal.completed !== null)), items: pendingHomeResponse.goals.map((goal) => ({ ...goal })) },
    progress: { status: statusFor(progress.some((item) => item.value !== null)), items: progress },
    tools,
    audio: { status: statusFor(pendingHomeResponse.audio.tracks.length > 0), items: [...pendingHomeResponse.audio.tracks] },
    community: { status: statusFor(community.some((item) => item.summary !== null)), items: community },
    challenges: { status: statusFor(challenges.some((item) => item.progress !== null)), items: challenges },
  };
}
