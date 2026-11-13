import type { LoginTranslations } from "../en/login";

const login: LoginTranslations = {
  previewLabel: "معاينة الواجهة · مختبر التصميم",
  title: "مرحبًا بعودتك",
  subtitle: "سجّل الدخول لمواصلة رحلتك في طلب المعرفة.",
  methods: { email: "البريد الإلكتروني", phone: "الهاتف", username: "اسم المستخدم" },
  fields: {
    email: "عنوان البريد الإلكتروني",
    phone: "رقم الهاتف",
    username: "اسم المستخدم",
    password: "كلمة المرور",
  },
  placeholders: {
    email: "أدخل عنوان بريدك الإلكتروني",
    phone: "أدخل رقم هاتفك",
    username: "أدخل اسم المستخدم",
    password: "أدخل كلمة المرور",
  },
  rememberMe: "تذكّرني",
  forgotPassword: "هل نسيت كلمة المرور؟",
  loginButton: "تسجيل الدخول",
  continueWith: "أو المتابعة باستخدام",
  social: {
    google: "المتابعة باستخدام Google",
    apple: "المتابعة باستخدام Apple",
    phone: "المتابعة باستخدام الهاتف",
  },
  noAccount: "ليس لديك حساب؟",
  createAccount: "إنشاء حساب",
  previewNotice: "معاينة للواجهة فقط. تسجيل الدخول غير متصل، ولا تُرسل أي بيانات اعتماد.",
  unavailableNotice: "هذا الخيار غير متصل في معاينة الواجهة.",
  forgotNotice: "استعادة كلمة المرور غير متصلة في معاينة الواجهة.",
  createNotice: "إنشاء الحساب غير متصل في معاينة الواجهة.",
  passwordShow: "إظهار كلمة المرور",
  passwordHide: "إخفاء كلمة المرور",
  showcase: {
    title: "المنظومة الإسلامية المتكاملة",
    principlesTitle: "المعرفة هي الأساس",
    imageAlt: "رسم توضيحي لمسجد عند الغروب",
    principles: [
      { title: "المعرفة أولًا", description: "تقديم المعرفة الإسلامية على التقنية والذكاء الاصطناعي." },
      { title: "معرفة أصيلة", description: "جعل المعرفة الإسلامية الأصيلة أساسًا للتعلّم." },
      { title: "تقنية مسؤولة", description: "تسخير التقنية لدعم التعلّم واكتشاف المعرفة." },
    ],
  },
};

export default login;
