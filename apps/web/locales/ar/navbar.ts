/* ================================================================
   HUDAVERSE — NAVBAR ARABIC TRANSLATIONS
================================================================ */

import type { NavbarTranslations } from "../en/navbar";

export const navbar: NavbarTranslations = {
  nav: {
    home: "الرئيسية",
    explore: "استكشف",
    ecosystem: "النظام المتكامل",
    about: "حول",
  },
  explore: {
    intro: "تعرّف على نظام HudaVerse المتكامل قبل أن تبدأ.",
    ctaLabel: "استكشف كل شيء",
    sections: {
      ecosystem: {
        label: "النظام المتكامل",
        description: "المعرفة والتعلم والذكاء وأكثر في مكان واحد",
      },
      ai: {
        label: "المساعد الذكي",
        description: "اطرح أسئلة واحصل على إجابات موثقة",
      },
      learning: {
        label: "التعلّم",
        description: "كيف يعمل التعلم الموجّه",
      },
      knowledge: {
        label: "المعرفة",
        description: "تصفّح القرآن والحديث ومجالات المعرفة الأخرى",
      },
      personalSpace: {
        label: "مساحتك الشخصية",
        description: "ملفك الشخصي ومعارفك المحفوظة",
      },
      trust: { label: "الثقة والمصادر", description: "كيف نتحقق من كل مصدر" },
      aDay: {
        label: "يوم مع HudaVerse",
        description: "شاهد استخداماً حقيقياً",
      },
    },
  },




  ecosystem: {
    sections: {
      quran: { title: "القرآن", description: "اقرأ القرآن وترجماته" },
      hadith: { title: "الحديث", description: "تصفّح كتب الحديث ورواياته" },
      prayer: { title: "الصلاة", description: "اطّلع على أوقات الصلاة وإرشاداتها" },
      dua: { title: "الدعاء", description: "ابحث عن أدعية للحياة اليومية" },
      ai: { title: "المساعد الذكي", description: "اسأل واحصل على إجابات موثقة" },
      learning: { title: "مركز التعلم", description: "اتبع مسارات تعلم منظمة" },
      community: { title: "المجتمع", description: "تواصل حول التعلم المشترك" },
      tools: { title: "الأدوات الإسلامية", description: "استخدم أدوات عملية للعبادة اليومية" },
      profile: { title: "الملف الشخصي", description: "أدر حسابك وتفضيلاتك" },
      bookmarks: { title: "العلامات والملاحظات", description: "ارجع إلى النصوص والملاحظات المحفوظة" },
      settings: { title: "الإعدادات والتخصيص", description: "اضبط تجربتك وإعداداتك" },
    },
  },

  actions: {
    skipToContent: "انتقل إلى المحتوى الرئيسي",
    search: "بحث",
    selectLanguage: "اختر اللغة",
    searchLanguage: "ابحث عن لغة...",
    noLanguagesFound: "لم يتم العثور على لغات",
    moreLanguagesComingSoon: "المزيد من اللغات قريبًا...",
    signIn: "تسجيل الدخول",
    getStarted: "ابدأ الآن",
  },

  mobile: {
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    navLabel: "التنقل الرئيسي",
    menuTitle: "القائمة",
  },
};

export default navbar;
