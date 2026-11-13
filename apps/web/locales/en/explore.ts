export type EcosystemUiCopy = {
  eyebrow: string; title: string; description: string;
  constellationLabel: string; centralLabel: string; moduleIndex: string; search: string;
  searchPlaceholder: string; searchLabel: string; searchResults: string;
  clear: string; all: string; moduleCount: string; emptyTitle: string;
  emptyDescription: string; showAll: string; closeDetails: string; role: string;
  keyCapabilities: string; moreCapabilities: string; benefits: string;
  journey: string; connected: string; exploreModule: string; noMatch: string;
  searchFooter: string; escape: string; moduleLabel: string; closeSearch: string;
  supportCards: readonly string[];
  supportDescriptions: readonly string[]; categories: Readonly<Record<string, string>>;
  modules: Readonly<Record<string, string>>; moduleSummaries: Readonly<Record<string, string>>;
};

export interface ExploreTranslations {
  hero: {
    entranceHeading: string;
    entranceDescription: string;
    enter: string;
    nodes: Array<{ label: string; description: string }>;
    folioAreas: string[];
    pillars: string[];
    eyebrow: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    start: string;
    ecosystem: string;
    continuationLabel: string;
    continuation: string;
    imageAlt: string;
    coreLabel: string;
    ecosystemName: string;
    connected: string;
    headingStart: string;
    headingHighlight: string;
    hint: string;
    visualizerLabel: string;
    citation: string;
    rootLabel: string;
    noRootLabel: string;
    formsLabel: string;
    illustrative: string;
    pause: string;
    play: string;
    regionLabel: string;
    selectWordLabel: string;
    words: Array<{
      meaning: string;
      transliteration: string;
      caption: string;
      forms: Array<{ meaning: string; transliteration: string; pattern: string }>;
    }>;
  };
  ai: { eyebrow: string; title: string; description: string; researching: string; asking: string; thinking: string; connecting: string; answer: string; sources: string; illustrative: string; question: string; assistant: string; answerText: string; sourceItems: Array<{ type: "quran" | "hadith" | "tafsir" | "scholarly"; label: string; reference: string; preview: string; meta: string }> };
  learning: { eyebrow:string; title:string; description:string; sample:string; sourceText:string; sourceTranslation:string; completed:string; inProgress:string; upcoming:string; pathTitle:string; steps:Array<{title:string;description:string;duration:string}>; layers:{sourceLabel:string;wordMeaning:{title:string;description:string};tafsir:{title:string;description:string};relatedHadith:{title:string;description:string};fiqhContext:{title:string;description:string}}; labels:{start:string;lesson:string;currentLesson:string;checkpoint:string;nextMilestone:string;locked:string;score:string;viewDetails:string;learningJourney:string;progress:string;stepsCompleted:string;quizScore:string;readingComplete:string;stepCount:string;upNext:string;minutesLeft:string;continue:string;learningNote:string;illustrative:string;layers:string;closing:string;flow:string[]}};
    personalSpace: { eyebrow: string; titleStart: string; titleHighlight: string; description: string; yourSpace: string; savedForYou: string; returnTo: string; continueLearning: string; previousQuestions: string; demo: { settings: string; moreOptions: string; tagline: string; savedCount: string; types: { Ayah: string; Hadith: string; Dua: string }; savedItems: Array<{ title: string; meta: string }>; learningDescription: string; pathLabel: string; pathTitle: string; lessonsProgress: string; keepGoing: string; learningCenter: string; lessonsStudied: string; learningTime: string; inProgress: string; historyDescription: string; historyItems: Array<{ title: string; time: string }>; historyNote: string; tabs: string[]; mobileTabs: string[] } };
  knowledge: { eyebrow: string; title: string; description: string; sourceAyah: string; sourceReference: string; sourceTranslation: string; questionsLabel: string; sourceLabel: string; questionProgress: string; illustrative: string; aiExplanation: string; questions: Array<{ question: string; answer: string; calloutLabel: string; callout: string; chips: string[]; primaryAction: string; secondaryAction: string }> };
  trust: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<{ title: string; description: string }>;
    cardTitle: string;
    referenceTitle: string;
    contentType: string;
    referenceLabel: string;
    referenceValue: string;
    originalTextLabel: string;
    translationLabel: string;
    translationUnavailable: string;
    explanationLabel: string;
    attributionUnavailable: string;
    contentTypeLabel: string;
    openSource: string;
    copyReference: string;
    copied: string;
    sourceNote: string;
    stripTitle: string;
    stripDescription: string;
    disclaimer: string;
  };
  day: {
    moments: Array<{ time: string; title: string; description: string }>;
    badge: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    closing: string;
    disclaimer: string;
  };
  ecosystem: EcosystemUiCopy;
}

export const explore: ExploreTranslations = {
  hero: {
    entranceHeading: "Enter HudaVerse",
    entranceDescription: "A place to explore Islamic knowledge, learning and connected sources.",
    enter: "Enter HudaVerse",
    folioAreas: ["Quran", "Hadith", "Tafsir", "Fiqh"],
    pillars: ["Learn", "Understand", "Research", "Connect"],
    nodes: [
      { label: "Quran", description: "Read, understand and explore the Qur'an." },
      { label: "Hadith", description: "Explore authentic Hadith and their meanings." },
      { label: "AI Assistant", description: "Ask questions and get source-aware answers." },
      { label: "Learning", description: "Build knowledge through structured lessons." },
      { label: "Dua", description: "Find authentic supplications for every moment." },
      { label: "Prayer", description: "Keep prayer times and worship in one place." },
    ],
    eyebrow: "Explore HudaVerse",
    titleStart: "Everything You Need to",
    titleHighlight: "Learn, Understand",
    titleEnd: "& Explore Islam",
    description: "Every Arabic word grows from a three-letter root. Tap a word of the first revealed verse and watch its meaning unfold, one root at a time.",
    start: "Start exploring",
    ecosystem: "See the ecosystem",
    continuationLabel: "Continue exploring HudaVerse",
    continuation: "Continue Exploring",
    imageAlt: "An annotated folio presenting Islamic knowledge areas",
    coreLabel: "Islamic Knowledge",
    ecosystemName: "Islamic Knowledge Ecosystem",
    connected: "Everything here is connected — nothing stands alone.",
    headingStart: "Start with one word.",
    headingHighlight: "See how deep it goes.",
    hint: "Tap any word of the verse",
    visualizerLabel: "Arabic Root Visualization",
    citation: "Surah Al-Alaq 96:1",
    rootLabel: "Root",
    noRootLabel: "No root",
    formsLabel: "Words built from this word",
    illustrative: "Illustrative preview. Roots and forms require scholarly review before release.",
    pause: "Pause",
    play: "Play",
    regionLabel: "Select a word of the verse",
    selectWordLabel: "Word",
    words: [
      { meaning: "Read / Recite", transliteration: "iqra", caption: "Three letters carry the core idea: reading and recitation.", forms: [
        { meaning: "Read! (command)", transliteration: "iqra'", pattern: "Command" },
        { meaning: "The Recitation", transliteration: "qur'an", pattern: "Verbal noun" },
        { meaning: "Reading", transliteration: "qira'a", pattern: "Verbal noun" },
        { meaning: "One who reads", transliteration: "qari'", pattern: "Doer" },
        { meaning: "That which is read", transliteration: "maqru'", pattern: "Done-to" },
      ] },
      { meaning: "In the name of", transliteration: "bismi", caption: "Root of naming. The weak letter can change form or drop.", forms: [
        { meaning: "Name", transliteration: "ism", pattern: "Noun" },
        { meaning: "He named", transliteration: "samma", pattern: "Past verb" },
        { meaning: "Named, appointed", transliteration: "musamman", pattern: "Done-to" },
      ] },
      { meaning: "Your Lord", transliteration: "rabbika", caption: "Root of nurturing and sustaining.", forms: [
        { meaning: "Lord, Sustainer", transliteration: "rabb", pattern: "Noun" },
        { meaning: "He raised, nurtured", transliteration: "rabba", pattern: "Past verb" },
        { meaning: "Upbringing", transliteration: "tarbiya", pattern: "Verbal noun" },
      ] },
      { meaning: "The One who", transliteration: "alladhi", caption: "A function word with no root. It changes form instead.", forms: [
        { meaning: "The one who (feminine)", transliteration: "allati", pattern: "Feminine" },
        { meaning: "Those who", transliteration: "alladhina", pattern: "Plural" },
      ] },
      { meaning: "Created", transliteration: "khalaqa", caption: "Root of creating and shaping.", forms: [
        { meaning: "Creation (the act)", transliteration: "khalq", pattern: "Verbal noun" },
        { meaning: "Creator", transliteration: "khaliq", pattern: "Doer" },
        { meaning: "Created being", transliteration: "makhluq", pattern: "Done-to" },
      ] },
    ],
  },
  ai: {
    eyebrow: "How HudaVerse Answers",
    title: "One Question. A Complete Picture.",
    description: "Follow a question from relevant Islamic sources to a clearly identified explanation.",
    researching: "Finding relevant sources",
    asking: "You asked",
    thinking: "Reviewing the question",
    connecting: "Relating the sources",
    answer: "Illustrative explanation",
    sources: "Example references",
    illustrative: "Illustrative example only. References and interpretation require scholarly review before publication.",
    question: "What does Islam say about patience?",
    assistant: "HudaVerse Assistant",
    answerText: "This illustrative synthesis describes patience as remaining steadfast in faith and worship through difficulty while seeking Allah's help. It is an example of how an answer might connect source material; it is not a verified religious ruling.",
    sourceItems: [
      { type: "quran", label: "Qur'an", reference: "Al-Baqarah · 2:153", preview: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", meta: "Quranic text" },
      { type: "hadith", label: "Hadith", reference: "Sahih Muslim", preview: "An illustrative paraphrase about patience and responding to hardship; the narration and reference must be verified before publication.", meta: "Illustrative paraphrase" },
      { type: "tafsir", label: "Tafsir", reference: "Tafsir Ibn Kathir", preview: "An illustrative summary about steadfastness and seeking Allah's help; the interpretation must be checked against the cited edition.", meta: "Illustrative summary" },
      { type: "scholarly", label: "Scholarly context", reference: "General topic summary", preview: "A topic overview, not a quotation or a named scholarly ruling. Add a verified source before publication.", meta: "Needs a verified source" },
    ],
  },
  learning: { eyebrow:"Talab al-Ilm", title:"One verse, many layers of understanding.", description:"Start from the source, then go deeper one layer at a time: meaning, tafsir, hadith and fiqh. HudaVerse keeps your place in every layer.", sample:"Al-Baqarah 2:286", sourceText:"\u0644\u064e\u0627 \u064a\u064f\u0643\u064e\u0644\u0651\u0650\u0641\u064f \u0627\u0644\u0644\u0651\u064e\u0647\u064f \u0646\u064e\u0641\u0652\u0633\u064b\u0627 \u0625\u0650\u0644\u0651\u064e\u0627 \u0648\u064f\u0633\u0652\u0639\u064e\u0647\u064e\u0627", sourceTranslation:"“Allah does not burden a soul beyond what it can bear.”", completed:"Done", inProgress:"In progress", upcoming:"Locked", pathTitle:"Word meaning", steps: [
      { title: "Begin", description: "Start with the verse and its reference.", duration: "" },
      { title: "Read", description: "Read the verse and its translation.", duration: "" },
      { title: "Word meaning", description: "Explore the meaning carried by each word.", duration: "" },
      { title: "Checkpoint quiz", description: "Check what you have understood so far.", duration: "" },
      { title: "Tafsir: what capacity means", description: "Read an explanation of the verse’s statement about capacity.", duration: "" },
      { title: "Hadith and Fiqh", description: "Continue into related Hadith and Fiqh context.", duration: "" },
    ],
    layers:{sourceLabel:"The source",wordMeaning:{title:"Word meaning",description:"Explore the meaning carried by each word."},tafsir:{title:"Tafsir",description:"Read an explanation grounded in trusted scholarship."},relatedHadith:{title:"Related Hadith",description:"Explore narrations connected to the verse."},fiqhContext:{title:"Fiqh context",description:"See how jurists approach its meaning."}}, labels:{start:"",lesson:"",currentLesson:"",checkpoint:"",nextMilestone:"",locked:"",score:"",viewDetails:"",learningJourney:"",progress:"",stepsCompleted:"{completed} of {total} steps complete",quizScore:"Quiz score {score}",readingComplete:"Reading complete",stepCount:"Step {n} of {total}",upNext:"Up next",minutesLeft:"About {minutes} minutes left",continue:"Continue lesson",learningNote:"",illustrative:"Illustrative example: this study path is a preview, not a live learning record.",layers:"Study layers",closing:"",flow:[]}},
    personalSpace: {
    eyebrow: "Personal Space",
    titleStart: "Your Work,",
    titleHighlight: "Kept Together.",
    description: "Illustrative workspace preview for returning to saved passages, learning activity and earlier questions.",
    yourSpace: "Your HudaVerse",
    savedForYou: "Saved items",
    returnTo: "Things to return to.",
    continueLearning: "Continue learning",
    previousQuestions: "Previous questions",
    demo: {
      settings: "Settings",
      moreOptions: "More options",
      tagline: "Your knowledge, saved and organized around you.",
      savedCount: "{count} saved",
      types: { Ayah: "Ayah", Hadith: "Hadith", Dua: "Dua" },
      savedItems: [
        { title: "Indeed, with hardship comes ease.", meta: "Saved 2 days ago" },
        { title: "Actions are judged by intentions.", meta: "Saved 2 days ago" },
        { title: "A prayer for guidance and steadfastness.", meta: "Saved 2 days ago" },
      ],
      learningDescription: "Pick up where you left off.",
      pathLabel: "Learning path",
      pathTitle: "Understanding Salah",
      lessonsProgress: "5 of 10 lessons",
      keepGoing: "Keep going",
      learningCenter: "Islamic Learning Center",
      lessonsStudied: "Lessons studied",
      learningTime: "Learning time",
      inProgress: "In progress",
      historyDescription: "Previous questions, kept in one place.",
      historyItems: [
        { title: "Asked about patience in hardship", time: "3 days ago" },
        { title: "Explored the meaning of Tawakkul", time: "5 days ago" },
      ],
      historyNote: "This is an illustrative preview of how a personal history could appear.",
      tabs: ["Bookmarks", "Learning", "AI History"],
      mobileTabs: ["Saved", "Learn", "AI", "Settings"],
    },
  },
  knowledge: {
    "eyebrow": "The questions of a student of knowledge",
    "title": "Ask a verse what it means, and where it leads.",
    "description": "Start with a question, not a menu. Each answer comes with its source and a way to go deeper.",
    "sourceAyah": "Source Ayah",
    "sourceReference": "Al-Baqarah 2:286",
    "sourceTranslation": "Allah does not burden a soul beyond what it can bear.",
    "questionsLabel": "Questions about this verse",
    "sourceLabel": "Sources",
    "questionProgress": "Question {current} of {total}",
    "illustrative": "Illustrative example. References and interpretation require scholarly review before publication.",
    "aiExplanation": "An illustrative plain-language explanation. It is not a ruling and requires source and scholarly review.",
    "questions": [
      {
        "question": "What does yukallifu mean?",
        "answer": "The word describes placing a burden or responsibility upon someone. In this verse it says Allah does not place a burden that a person cannot carry.",
        "calloutLabel": "Arabic lexical meaning",
        "callout": "يُكَلِّفُ: to place a burden or responsibility upon someone.",
        "chips": [
          "Al-Baqarah 2:286",
          "Source named"
        ],
        "primaryAction": "Open word study",
        "secondaryAction": "Explain in simple terms"
      },
      {
        "question": "What did the scholars say?",
        "answer": "The verse establishes that Allah does not impose on a person anything beyond their capacity, so accountability follows ability.",
        "calloutLabel": "Tafsir Ibn Kathir",
        "callout": "Allah does not impose upon a person what is beyond their capacity.",
        "chips": [
          "Al-Baqarah 2:286",
          "Source named"
        ],
        "primaryAction": "Read full tafsir",
        "secondaryAction": "Explain in simple terms"
      },
      {
        "question": "Is there a related hadith?",
        "answer": "The Prophet ï·º taught that deeds are judged according to intentions, connecting responsibility with what a person intends.",
        "calloutLabel": "Sahih al-Bukhari 1",
        "callout": "Deeds are judged according to intentions.",
        "chips": [
          "Sahih al-Bukhari 1",
          "Source named"
        ],
        "primaryAction": "Read the hadith",
        "secondaryAction": "Explain in simple terms"
      },
      {
        "question": "Where else does the Quran say this?",
        "answer": "Related verses reinforce the principle that Allah intends ease for people and does not intend hardship.",
        "calloutLabel": "Quran, Al-Baqarah 2:185",
        "callout": "Allah intends ease for you and does not intend hardship for you.",
        "chips": [
          "Al-Baqarah 2:185",
          "Source named"
        ],
        "primaryAction": "Open related ayah",
        "secondaryAction": "Explain in simple terms"
      },
      {
        "question": "What does fiqh say about it?",
        "answer": "The principle of capacity appears throughout Islamic rulings, including concessions when a person genuinely cannot perform an obligation normally.",
        "calloutLabel": "Fiqh principle",
        "callout": "Capacity and hardship.",
        "chips": [
          "Fiqh principle",
          "Source named"
        ],
        "primaryAction": "Read fiqh context",
        "secondaryAction": "Explain in simple terms"
      },
      {
        "question": "Which topics does it connect to?",
        "answer": "This ayah connects naturally with responsibility, hardship, forgiveness, intention and personal accountability.",
        "calloutLabel": "Knowledge topic",
        "callout": "Responsibility.",
        "chips": [
          "Responsibility",
          "Hardship",
          "Forgiveness",
          "Intention",
          "Personal accountability"
        ],
        "primaryAction": "Explore this topic",
        "secondaryAction": "Explain in simple terms"
      }
    ]
  },
  trust: {
    eyebrow: "Verify it yourself",
    title: "Trust, but check: every source should be within reach.",
    description: "Explore the references behind Islamic knowledge. Check original texts, follow citations, and understand where explanations come from.",
    steps: [
      { title: "Open the source reference", description: "Where a source reference is available, open it to see the citation behind the content." },
      { title: "Check the original text", description: "Compare the cited Arabic text and its reference with the original source." },
      { title: "Understand the attribution", description: "See the named scholar, book, or source when attribution is available." },
      { title: "Seek qualified guidance", description: "Use HudaVerse as a learning resource. For personal religious rulings or complex questions, consult a qualified scholar." },
    ],
    cardTitle: "Source reference",
    referenceTitle: "Al-Baqarah 2:286",
    contentType: "Quranic reference",
    referenceLabel: "Reference",
    referenceValue: "Surah Al-Baqarah · Ayah 286",
    originalTextLabel: "Original text",
    translationLabel: "Translation",
    translationUnavailable: "No translation attribution provided in this example.",
    explanationLabel: "Explanation source",
    attributionUnavailable: "No attribution provided",
    contentTypeLabel: "Content type",
    openSource: "Open cited source",
    copyReference: "Copy reference",
    copied: "Copied",
    sourceNote: "Illustrative example. Source availability and attribution depend on the content.",
    stripTitle: "Know the source. Understand the context. Verify the reference.",
    stripDescription: "Source references help you trace information back to their origin.",
    disclaimer: "Illustrative example. Source availability and attribution depend on the content. Translations and scholarly explanations should be checked against their cited sources.",
  },
  day: {
    moments: [
      { time: "Fajr", title: "A gentle beginning", description: "Prayer time reminder wakes you gently." },
      { time: "Morning", title: "Before the day begins", description: "A few minutes with the Qur'an before the day begins." },
      { time: "Noon", title: "Clarity when you need it", description: "A question comes up at work — Hadith and AI give you clarity in minutes." },
      { time: "Afternoon", title: "A little time to learn", description: "Free time becomes a lesson — one step further in your learning path." },
      { time: "Maghrib", title: "A familiar Dua", description: "Dua for the evening, saved from last week, right when you need it." },
      { time: "Isha", title: "A quiet reflection", description: "Bookmarks and notes from the day, all in one place." },
    ],
    badge: "A Day in HudaVerse",
    titleStart: "From Fajr to Isha,",
    titleHighlight: "Knowledge Walks With You.",
    description: "HudaVerse isn't something you open once a day. It's part of how your day moves.",
    closing: "One day · Many moments · One connected space",
    disclaimer: "Illustrative scenario; not every depicted workflow is currently available.",
  },

  ecosystem: {
  eyebrow: "Explore HudaVerse",
  title: "Discover what HudaVerse can do for you.",
  description: "Explore each part of HudaVerse, what it offers, and how its modules connect.",
  constellationLabel: "HudaVerse module constellation",
  centralLabel: "A connected knowledge ecosystem",
  moduleIndex: "Explore the modules",
  search: "Search modules",
  searchPlaceholder: "Search Quran, Hadith, AI, Learning, Profile...",
  searchLabel: "Search HudaVerse modules",
  searchResults: "Showing results for",
  clear: "Clear",
  all: "All",
  moduleCount: "modules to explore",
  emptyTitle: "No modules found",
  emptyDescription: "Try another search term or clear the current filters to explore all modules.",
  showAll: "Show all modules",
  closeDetails: "Close module details",
  role: "Role in HudaVerse",
  keyCapabilities: "Key capabilities",
  moreCapabilities: "More capabilities",
  benefits: "User benefits",
  journey: "Example user journey",
  connected: "Connected modules",
  exploreModule: "Explore module",
  noMatch: "No matching module",
  moduleLabel: "Module",
  closeSearch: "Close search",
  searchFooter: "Search HudaVerse modules",
  escape: "ESC to close",
  supportCards: ["Explore freely", "Discover connections", "Understand before you enter"],
  supportDescriptions: [
    "Discover a module and learn what it is designed to provide before entering the product.",
    "See how knowledge, learning, AI and practical tools connect across HudaVerse.",
    "Review each part's capabilities, benefits and example user journey.",
  ],
  categories: {
    "Core Knowledge": "Core Knowledge",
    "Daily Worship": "Daily Worship",
    "Intelligent Assistance": "Intelligent Assistance",
    Education: "Education",
    "Social Learning": "Social Learning",
    Utilities: "Utilities",
    "Personal Experience": "Personal Experience",
    "Personal Knowledge": "Personal Knowledge",
  },
  modules: {
    quran: "Quran", hadith: "Hadith", prayer: "Prayer", dua: "Dua",
    ai: "AI Assistant", learning: "Learning Center", community: "Community",
    tools: "Islamic Tools", profile: "Profile", bookmarks: "Bookmarks & Notes",
    settings: "Settings & Personalization",
  },
  moduleSummaries: {
    quran: "Read and explore Quran text with connected meanings and context.",
    hadith: "Study Prophetic traditions with source context and related knowledge.",
    prayer: "Prayer times and worship guidance in one place.",
    dua: "Find supplications with meaning, context and source details.",
    ai: "Ask a question, inspect related references and continue to the source material.",
    learning: "Follow topics through lessons, practice and progress markers.",
    community: "A Phase 6 roadmap expansion; its user-facing scope remains to be defined.",
    tools: "An overview grouping Blueprint-listed Prayer and Zakat areas.",
    profile: "A personal area for account details and preferences, as those capabilities become available.",
    bookmarks: "A planned cross-module space for saved study material, with notes where supported.",
    settings: "Manage language, reading and privacy preferences as supported by each module.",
  },
},
};
