import type { LoginTranslations } from "../en/login";

const login: LoginTranslations = {
  previewLabel: "معاينة الواجهة · مختبر التصميم",
  title: "مرحبًا بعودتك",
  subtitle: "سجّل الدخول لمواصلة رحلتك في طلب المعرفة.",
  methods: { email: "البريد الإلكتروني", username: "اسم المستخدم" },
  fields: {
    email: "عنوان البريد الإلكتروني",
    username: "اسم المستخدم",
    password: "كلمة المرور",
  },
  placeholders: {
    email: "أدخل عنوان بريدك الإلكتروني",
    username: "أدخل اسم المستخدم",
    password: "أدخل كلمة المرور",
  },
  rememberMe: "تذكّرني",
  forgotPassword: "هل نسيت كلمة المرور؟",
  loginButton: "تسجيل الدخول",
  continueWith: "أو المتابعة باستخدام",
  loginWith: "أو تسجيل الدخول باستخدام",
  social: {
    google: "المتابعة باستخدام Google",
    facebook: "المتابعة باستخدام Facebook",
    microsoft: "المتابعة باستخدام Microsoft",
  },
  noAccount: "ليس لديك حساب؟",
  createAccount: "إنشاء حساب",
  previewNotice: "معاينة للواجهة فقط. تسجيل الدخول غير متصل، ولا تُرسل أي بيانات اعتماد.",
  unavailableNotice: "طريقة تسجيل الدخول هذه غير متاحة بعد.",
  facebookEmailRequired: "لم يقدّم Facebook عنوان بريد إلكتروني. يُرجى إنشاء حساب باستخدام بريدك الإلكتروني.",
  facebookEmailUnverified: "تعذّر على Facebook التحقق من هذا البريد لربط الحساب. سجّل الدخول باستخدام بريدك الإلكتروني وكلمة المرور.",
  forgotNotice: "إذا وُجد حساب بهذا البريد، فستصل تعليمات إعادة تعيين كلمة المرور.",
  submitting: "جارٍ تسجيل الدخول…",
  genericFailure: "تعذر إكمال تسجيل الدخول. حاول مرة أخرى.",
  createNotice: "إنشاء الحساب غير متصل في معاينة الواجهة.",
  passwordShow: "إظهار كلمة المرور",
  passwordHide: "إخفاء كلمة المرور",
  biometrics: "استخدام القياسات الحيوية",
  encryptionNote: "بياناتك محمية بتشفير من طرف إلى طرف",
  languageSelector: "اللغة",
  themeToggle: "تبديل المظهر",
  verse: { arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "فإن مع العسر يسرا.", citation: "— القرآن ٩٤:٦" },
  showcase: {
    title: "المنظومة الإسلامية المتكاملة",
    principlesTitle: "المعرفة هي الأساس",
    imageAlt: "رسم توضيحي لمسجد عند الغروب",
    features: [
      { title: "آمن وخاص", description: "بياناتك آمنة لدينا. نستخدم تشفيرًا متقدمًا لحماية خصوصيتك." },
      { title: "محتوى موثوق", description: "القرآن والحديث ومحتوى إسلامي من مصادر موثوقة وأصيلة." },
      { title: "مساعد إسلامي بالذكاء الاصطناعي", description: "اسأل عن الإسلام واحصل على إجابات مع مراجع من القرآن والحديث." },
      { title: "يعمل دون اتصال", description: "نزّل المحتوى واستخدم HudaVerse دون اتصال بالإنترنت." },
    ],
    principles: [
      { title: "المعرفة أولًا", description: "تقديم المعرفة الإسلامية على التقنية والذكاء الاصطناعي." },
      { title: "معرفة أصيلة", description: "جعل المعرفة الإسلامية الأصيلة أساسًا للتعلّم." },
      { title: "تقنية مسؤولة", description: "تسخير التقنية لدعم التعلّم واكتشاف المعرفة." },
    ],
  },
};

export default login;
