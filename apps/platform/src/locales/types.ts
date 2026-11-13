export type LanguageCode = "en" | "bn" | "ar" | "ur" | "fa" | "tr";

export interface LocaleDictionary {
  shell: {
    home: string; quran: string; hadith: string; tafsir: string; fiqh: string;
    dua: string; tools: string; learning: string; community: string; bookmarks: string;
    notes: string; downloads: string; history: string; settings: string; premium: string;
    premiumBody: string; upgrade: string; search: string; language: string;
    notifications: string; profile: string; menu: string; close: string; greeting: string;
    viewAll: string; premiumMember: string; skipContent: string;
  };
  home: {
    journey: string; continueReading: string; dailyStreak: string; days: string;
    nextPrayer: string; hijriDate: string; dailyAyah: string; askAi: string;
    dailyInspiration: string; dailyHadith: string; todaysDua: string; verifyNotice: string;
    explore: string; allModules: string; quranSub: string; hadithSub: string;
    tafsirSub: string; fiqhSub: string; duaSub: string; toolsSub: string;
    learningSub: string; communitySub: string; audio: string; family: string;
    continueLearning: string; planner: string; goals: string; edit: string;
    progress: string; quranPages: string; hadithRead: string; fiqhTopics: string;
    savedBookmarks: string; savedNotes: string; streak: string; islamicTools: string;
    listenLearn: string; latestDiscussions: string; popularQuestions: string;
    challenges: string; startChallenge: string; noContent: string; emptyQuote: string;
    upcoming: string; completed: string; prayerPending: string; sourcePending: string;
    readTwoPages: string; learnHadith: string; morningDua: string; studyFiqh: string;
    surah: string; page: string; lesson: string; book: string; progressLabel: string;
    seeAll: string; reciterPending: string; today: string; fajr: string; dhuhr: string;
    asr: string; maghrib: string; isha: string; calculator: string; finder: string;
    checkNow: string; digital: string; calendar: string; listen: string; connect: string;
    minutes: string; prayerMethodPending: string;
    audioSub: string; familySub: string; zakat: string; inheritance: string;
    qibla: string; prayerTime: string; tasbih: string; hijriCalendar: string;
    islamicArticles: string; quranChallenge: string; ramadanChallenge: string;
    dailyHadithChallenge: string; dailyDhikrChallenge: string;
    loading: string; error: string; previous: string; next: string;
    play: string; pause: string; seek: string; volume: string;
    hours: string; goToSlide: string; unavailable: string; audioUnavailable: string;
    searchShortcut: string;
    welcomeLine: string; shortHint: string; emptyContentLine: string;
    nothingToContinue: string; askAnything: string; learnInstantly: string;
    noData: string; currentStreak: string; yearSuffix: string;
    communityTitle: string; premiumCardTitle: string; premiumCardBody: string;
    prayerPendingShort: string; discussionDesc: string; questionsDesc: string; articlesDesc: string;
    zakatTitle: string; inheritanceTitle: string; qiblaTitle: string;
    prayerTimeTitle: string; tasbihTitle: string; hijriCalendarTitle: string;
    upgradeNow: string;
    tagline: string;
    quickContinue: string; quickStreak: string; quickPrayer: string; quickAsk: string;
    anything: string; exploreModules: string;
  };
}
