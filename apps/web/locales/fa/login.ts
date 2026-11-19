import type { LoginTranslations } from "../en/login";

const login: LoginTranslations = {
  previewLabel: "پیش‌نمایش رابط کاربری · آزمایشگاه بصری",
  title: "خوش برگشتید",
  subtitle: "برای ادامهٔ مسیر دانایی وارد شوید.",
  methods: { email: "ایمیل", username: "نام کاربری" },
  fields: {
    email: "نشانی ایمیل",
    username: "نام کاربری",
    password: "گذرواژه",
  },
  placeholders: {
    email: "نشانی ایمیل خود را وارد کنید",
    username: "نام کاربری خود را وارد کنید",
    password: "گذرواژهٔ خود را وارد کنید",
  },
  rememberMe: "مرا به خاطر بسپار",
  forgotPassword: "گذرواژه را فراموش کرده‌اید؟",
  loginButton: "ورود",
  continueWith: "یا ادامه با",
  loginWith: "یا ورود با",
  social: {
    google: "ادامه با Google",
    facebook: "ادامه با Facebook",
    microsoft: "ادامه با Microsoft",
  },
  noAccount: "حساب کاربری ندارید؟",
  createAccount: "ایجاد حساب",
  previewNotice: "فقط پیش‌نمایش رابط کاربری است. ورود متصل نیست و هیچ اطلاعاتی ارسال نمی‌شود.",
  unavailableNotice: "این روش ورود هنوز در دسترس نیست.",
  facebookEmailRequired: "Facebook نشانی ایمیل را ارائه نکرد. لطفاً با ایمیل ثبت‌نام کنید.",
  facebookEmailUnverified: "Facebook نتوانست این ایمیل را برای پیوند حساب تأیید کند. با ایمیل و گذرواژه خود وارد شوید.",
  forgotNotice: "اگر حسابی با این ایمیل باشد، راهنمای بازنشانی گذرواژه ارسال شده است.",
  submitting: "در حال ورود…",
  genericFailure: "ورود انجام نشد. دوباره تلاش کنید.",
  createNotice: "ایجاد حساب در پیش‌نمایش بصری متصل نیست.",
  passwordShow: "نمایش گذرواژه",
  passwordHide: "پنهان کردن گذرواژه",
  biometrics: "ورود زیست‌سنجی",
  encryptionNote: "داده‌های شما با رمزنگاری سرتاسری محافظت می‌شوند",
  languageSelector: "زبان",
  themeToggle: "تغییر پوسته",
  verse: { arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "پس بی‌تردید با دشواری آسانی است.", citation: "— قرآن ۹۴:۶" },
  showcase: {
    title: "زیست‌بوم کامل اسلامی",
    principlesTitle: "با راهنمایی دانش",
    imageAlt: "تصویرسازی مسجد هنگام غروب",
    features: [
      { title: "امن و خصوصی", description: "داده‌های شما نزد ما امن است. برای محافظت از حریم خصوصی از رمزنگاری پیشرفته استفاده می‌کنیم." },
      { title: "محتوای معتبر", description: "قرآن، حدیث و محتوای اسلامی از منابع معتبر و قابل اعتماد." },
      { title: "دستیار اسلامی هوش مصنوعی", description: "هر پرسشی درباره اسلام بپرسید و پاسخ‌هایی همراه با ارجاع به قرآن و حدیث دریافت کنید." },
      { title: "قابل استفاده آفلاین", description: "محتوا را دریافت کنید و بدون اینترنت از HudaVerse استفاده کنید." },
    ],
    principles: [
      { title: "دانش در اولویت", description: "دانش اسلامی را بر فناوری و هوش مصنوعی مقدم بدانیم." },
      { title: "دانش اصیل", description: "دانش اصیل اسلامی را پایهٔ کار قرار دهیم." },
      { title: "فناوری مسئولانه", description: "فناوری را در خدمت یادگیری و کشف دانش به کار گیریم." },
    ],
  },
};

export default login;
