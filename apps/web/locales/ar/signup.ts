import type { SignupTranslations } from "../en/signup";

const signup: SignupTranslations = {
  brandTagline: "المعرفة · الإرشاد · السلام", language: "اللغة", alreadyAccount: "لديك حساب بالفعل؟", signIn: "تسجيل الدخول",
  hero: { join: "انضم إلى", brand: "HudaVerse", subtitle: "ابدأ رحلتك", with: "مع", knowledge: "المعرفة الإلهية", paragraph: "تعرّف على القرآن والحديث والمعرفة الإسلامية وأدوات تعلّم فعّالة في مكان واحد.", features: [{ title: "القرآن والحديث", description: "اقرأ وتعلّم وتأمّل" }, { title: "التعلّم الإسلامي", description: "عمّق معرفتك" }, { title: "المساعد الذكي", description: "احصل على إرشاد موثوق" }, { title: "مجتمع عالمي", description: "تواصل ونمُ مع الآخرين" }], quote: "اطلبوا العلم، فهو نور لا يخبو أبداً.", quoteBy: "— HudaVerse", languages: "لغات" },
  card: { title: "إنشاء حساب", subtitle: "ابدأ رحلتك في منظومة HudaVerse" },
  fields: { fullName: "الاسم الكامل *", fullNamePlaceholder: "أدخل اسمك الكامل", email: "البريد الإلكتروني *", emailPlaceholder: "you@example.com", password: "كلمة المرور *", passwordPlaceholder: "أنشئ كلمة مرور قوية", confirm: "تأكيد كلمة المرور *", confirmPlaceholder: "أعد إدخال كلمة المرور", dob: "تاريخ الميلاد (اختياري)", dobPlaceholder: "اختر تاريخ ميلادك", country: "البلد / المنطقة", countryPlaceholder: "اختر بلدك", countrySearch: "ابحث عن بلد", countryEmpty: "لم يتم العثور على بلدان", interests: "اختر اهتماماتك (اختياري)", interestsPlaceholder: "اختر اهتماماً أو أكثر", showPassword: "إظهار كلمة المرور", hidePassword: "إخفاء كلمة المرور" },
  interests: { quran: "القرآن", hadith: "الحديث", fiqh: "الفقه", tafsir: "التفسير", islamicHistory: "التاريخ الإسلامي", others: "أخرى" },
  strength: { label: "قوة كلمة المرور", weak: "ضعيفة", fair: "متوسطة", strong: "قوية" },
  terms: { before: "أوافق على", and: "و", service: "شروط الخدمة", privacy: "سياسة الخصوصية", required: "يرجى الموافقة على شروط الخدمة وسياسة الخصوصية للمتابعة." },
  submit: "إنشاء حساب", submitting: "جارٍ إنشاء الحساب…", continueWith: "أو المتابعة باستخدام", social: { google: "المتابعة باستخدام Google", microsoft: "المتابعة باستخدام Microsoft", facebook: "المتابعة باستخدام Facebook" }, securityNote: "معلوماتك آمنة ومحمية مع HudaVerse.",
  errors: { required: "أكمل الحقول المطلوبة ثم حاول مجدداً.", mismatch: "كلمتا المرور غير متطابقتين.", weak: "اختر كلمة مرور غير شائعة لا تقل عن 10 أحرف.", rateLimit: "تجاوزت عدد المحاولات. يرجى الانتظار قبل المحاولة مجدداً.", unavailable: "طريقة إنشاء الحساب هذه غير متاحة بعد.", general: "تعذر إنشاء الحساب. حاول مجدداً.", email: "أدخل بريداً إلكترونياً صالحاً." },
  success: { title: "تحقق من بريدك الإلكتروني", body: "إذا أمكن إنشاء حساب لهذا العنوان، فسنرسل تعليمات التحقق إلى بريدك. اتبع الرابط لإكمال إنشاء الحساب.", back: "العودة إلى تسجيل الدخول" }
};
export default signup;
