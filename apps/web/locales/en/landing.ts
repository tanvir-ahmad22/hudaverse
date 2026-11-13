export const landing = {
  hero: {
    eyebrow: "THE ISLAMIC KNOWLEDGE ECOSYSTEM",

    title: {
      before: "Everything You Need to",
      highlight: "Know, Understand & Learn Islam.",
    },

    description:
      "HudaVerse is a comprehensive Islamic Knowledge, Learning, Research & Scholarly Ecosystem—bringing trusted knowledge, scholarly content, structured learning, research resources, and intelligent tools together in one place.",

    exploreButton: "Explore HudaVerse",
    getStartedButton: "Get Started",

    builtFor: "Built For",
    worldwide: "Muslims Worldwide",

    phoneAlt: "HudaVerse App Preview",
    mosqueAlt: "HudaVerse Islamic Knowledge Ecosystem",
  },

  features: {
    eyebrow: "Islamic Knowledge Ecosystem",

    title: {
      before: "Everything You Need For Your",
      highlight: "Islamic",
      after: "Journey",
    },

    description:
      "Four core knowledge modules, plus intelligent tools, to support every part of your Islamic learning.",

    knowledgeMap: {
      eyebrow: "FEATURES",
      title: "Your Journey Through Islamic Knowledge",
      description:
        "From the words of Allah to practical guidance, explore the complete circle of Islamic knowledge, step by step.",
      diagramLabel:
        "Circles of knowledge: Quran at the centre, surrounded by Hadith, Tafsir, Fiqh and Understanding.",
      diagramHint: "Select a circle to explore",
      stepLabel: "Step",
      ofLabel: "of",
      stepsLabel: "Knowledge path steps",
      nodeLabel: "Step {step}: {title}",
      controls: { back: "Back", next: "Next", restart: "Start again" },
      steps: {
        quran: {
          title: "Quran",
          description:
            "Begin with the revelation that forms the foundation of Islamic knowledge.",
        },
        hadith: {
          title: "Hadith",
          description:
            "Explore the Prophetic guidance that illuminates the meaning and practice of revelation.",
        },
        tafsir: {
          title: "Tafsir",
          description:
            "Discover how scholars have explained the meanings, context, and guidance within the Quran.",
        },
        fiqh: {
          title: "Fiqh",
          description:
            "Explore how scholars derive practical guidance from revelation, Prophetic tradition, and legal reasoning.",
        },
        understanding: {
          title: "Understanding",
          description:
            "Bring the sources and scholarly perspectives together to deepen your understanding.",
        },
      },
      visuals: {
        chapter: "Al-Fatihah",
        collection: "Collection",
        number: "Hadith",
        hadithTranslation: "Actions are judged by intentions.",
        readThrough: "Read through",
        tafsirLayers: ["Meaning", "Context", "Guidance"],
        fiqhPositions: "Scholarly positions",
        fiqhEvidence: "Sources and legal reasoning",
        relatedContext: "Related scholarly context",
        chainLabel: "Tafsir, then Hadith, then Fiqh, leading to Understanding",
        schools: ["Hanafi", "Maliki", "Shafi’i", "Hanbali"],
      },
    },

    coreLabel: "Core Knowledge Modules",
    secondaryLabel: "Also Included",

    exploreLabel: "Explore",
    exploreAll: "Explore All Features",

    core: {
      quran: {
        title: "Quran",
        description:
          "Read, listen and understand the words of Allah with verified Tafsir.",
        tags: ["Read", "Listen", "Learn"],
      },

      hadith: {
        title: "Hadith",
        description: "Explore authentic Hadith collections with smart search.",
        tags: ["Authentic", "Search"],
      },

      tafsir: {
        title: "Tafsir",
        description:
          "In-depth scholarly explanation of every verse, from trusted sources.",
        tags: ["Scholarly", "Context"],
      },

      fiqh: {
        title: "Fiqh",
        description: "Clear, practical Islamic rulings for everyday life.",
        tags: ["Rulings", "Practical"],
      },
    },

    secondary: {
      ai: {
        title: "AI Assistant",
        description: "Your intelligent Islamic companion powered by AI.",
      },

      prayer: {
        title: "Prayer Times",
        description: "Accurate prayer times wherever you are.",
      },

      dua: {
        title: "Dua",
        description: "Beautiful duas for every moment of life.",
      },

      community: {
        title: "Community",
        description: "Connect and grow with the global Ummah.",
      },
    },
  },

  /* ---------------------------------------------------------------------- */
  /* AI ASSISTANT SHOWCASE                                                   */
  /* ---------------------------------------------------------------------- */

  aiAssistant: {
    eyebrow: "HudaVerse AI Assistant",

    title: "Ask about Islam.",
    titleHighlight: "Understand with evidence.",

    description:
      "Explore Islamic questions through a guided AI experience designed to connect answers with the Quran, Hadith and Tafsir—helping you learn with context, clarity and references.",

    previewBadge: "Preview",

    previewTitle: "HudaVerse AI",

    previewDescription: "Ask questions. Explore sources. Understand Islam.",

    actions: {
      explain: "Explain",
      hadith: "Hadith",
      tafsir: "Tafsir",
      audio: "Audio",
    },

    audioUnavailable: "Audio playback is not available in this preview.",

    thinking: "Finding and organizing relevant sources…",

    answer: "HudaVerse AI",

    sources: "Sources",

    you: "You",

    quran: "Quran",

    tryAnother: "Try Another",

    openAssistant: "Explore AI Assistant",

    trust: {
      title: "Built around Islamic sources",

      item1: "Answers can be connected to the Quran, Hadith and Tafsir.",

      item2:
        "Relevant references are designed to remain visible alongside the answer.",

      item3:
        "The experience is designed for learning and understanding—not simply generating text.",
    },

    conversations: [
      {
        question: "What does Islam teach about patience?",

        answer:
          "In Islam, patience is more than simply waiting. It includes remaining steadfast, controlling the self, continuing to do what is right and seeking Allah's help during difficulty.",

        sources: [
          {
            kind: "quran",
            type: "Quran",
            title: "Al-Baqarah",
            reference: "2:153",
            excerpt: "Seek help through patience and prayer.",
          },

          {
            kind: "tafsir",
            type: "Tafsir",
            title: "Tafsir Reference",
            reference: "Al-Baqarah 2:153",
          },
        ],
      },

      {
        question: "Why is knowledge important in Islam?",

        answer:
          "Islam places great importance on knowledge and understanding. The Quran encourages people to reflect, learn and recognize the difference between truth and falsehood, while Islamic scholarship developed systems for preserving and studying knowledge.",

        sources: [
          {
            kind: "quran",
            type: "Quran",
            title: "Az-Zumar",
            reference: "39:9",
          },

          {
            kind: "hadith",
            type: "Hadith",
            title: "Sahih Muslim",
            reference: "Book of Knowledge",
          },
        ],
      },

      {
        question: "How should I understand a Quran verse correctly?",

        answer:
          "A Quran verse should not be understood only through an isolated translation. Its surrounding context, related Quranic passages, authentic Hadith and established Tafsir can all help build a more complete understanding.",

        sources: [
          {
            kind: "quran",
            type: "Quran",
            title: "Quranic Context",
            reference: "Verse & surrounding passages",
          },

          {
            kind: "tafsir",
            type: "Tafsir",
            title: "Classical Tafsir",
            reference: "Scholarly Explanation",
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* FINAL CTA                                                               */
  /* ---------------------------------------------------------------------- */

  faq: {
    eyebrow: "COMMON QUESTIONS",
    title: "Questions, clearly answered.",
    description:
      "Learn what HudaVerse is building, what is available today, and how to explore its knowledge experience.",
    filterLabel: "Filter questions by topic",
    questionsLabel: "Questions in this topic",
    answerLabel: "Answer",
    categories: {
      all: "All questions",
      about: "About HudaVerse",
      ai: "AI Assistant",
      sources: "Quran & Hadith",
      account: "Account & privacy",
      mobile: "Mobile & access",
    },
    items: [
      {
        category: "about",
        question: "What is HudaVerse?",
        answer:
          "HudaVerse is being built as an Islamic knowledge ecosystem for Quran, Hadith, Tafsir, Fiqh, learning and research. The public website introduces that direction; individual services become available as they are developed.",
      },
      {
        category: "ai",
        question: "How does the HudaVerse AI Assistant handle Islamic answers?",
        answer:
          "The assistant is designed to connect explanations with relevant Quran, Hadith and Tafsir references. The landing-page conversation is an illustrative preview: generated text is not independent source verification or a religious ruling. Check cited material in context and consult a qualified scholar for personal rulings.",
      },
      {
        category: "sources",
        question: "How are Quran and Hadith sources selected?",
        answer:
          "HudaVerse's content plan calls for entries to be checked against trusted references before publication. A citation should still be read in context, and Hadith reports can have different gradings. This preview does not certify every item shown as reviewed or published content.",
      },
      {
        category: "account",
        question: "What personal information does HudaVerse store?",
        answer:
          "Account and personalization features may need information to provide their functions. Only enter information requested by a feature that is currently available, and review the product's privacy details before sharing personal or sensitive data.",
      },
      {
        category: "about",
        question: "Which languages does HudaVerse support?",
        answer:
          "The current landing-page experience is available in English, Bangla, Arabic, Urdu, Persian and Turkish. Language availability may differ across features as the platform develops.",
      },
      {
        category: "mobile",
        question: "Can I use HudaVerse on a phone?",
        answer:
          "The current website is designed to adapt to mobile browsers. This website does not provide an Android or iOS app download, so check official HudaVerse announcements for any future app release.",
      },
      {
        category: "sources",
        question: "Can I save Quran verses and Hadith?",
        answer:
          "Personal bookmarks and a library are part of the HudaVerse product direction, but saving content and syncing it across devices are not available from this landing-page preview.",
      },
      {
        category: "about",
        question: "Can scholars submit content to HudaVerse?",
        answer:
          "There is no public scholar-submission flow linked from this website. The content plan uses an editorial process of draft, review, approval and publication.",
      },
      {
        category: "about",
        question: "How can I support HudaVerse?",
        answer:
          "There is no community contribution or donation action connected to this FAQ. You can explore the public site and share it with others; use an official contact channel if one is published.",
      },
    ],
    supportTitle: "Keep exploring",
    supportDescription:
      "Visit the AI preview or explore the wider HudaVerse ecosystem.",
    aiPreview: "Explore AI preview",
    explore: "Explore HudaVerse",
  },

  cta: {
    badge: "Begin Your Spiritual Journey",

    title: {
      line1: "Your Journey Of Faith,",
      highlight: "Knowledge & Growth",
      line2: "Starts Here",
    },

    ecosystemTags: [
      "Quran",
      "Hadith",
      "AI Assistant",
      "Prayer",
      "Learning",
      "Community",
    ],

    description:
      "Explore the beauty of Islam through an integrated ecosystem designed to deepen your connection with faith and knowledge.",

    primaryButton: "Start Exploring",

    secondaryButton: "Read FAQs",

    trust: {
      freeForever: "Free Forever",
      noAds: "No Advertisements",
      builtForUmmah: "Built For Ummah",
    },

    tagline: "Knowledge. Faith. Connection.",
  },
} as const;
