import type { LoginTranslations } from "../en/login";

const login: LoginTranslations = {
  previewLabel: "پیش‌نمایش رابط کاربری · آزمایشگاه بصری",
  title: "خوش برگشتید",
  subtitle: "برای ادامهٔ مسیر دانایی وارد شوید.",
  methods: { email: "ایمیل", phone: "تلفن", username: "نام کاربری" },
  fields: {
    email: "نشانی ایمیل",
    phone: "شماره تلفن",
    username: "نام کاربری",
    password: "گذرواژه",
  },
  placeholders: {
    email: "نشانی ایمیل خود را وارد کنید",
    phone: "شماره تلفن خود را وارد کنید",
    username: "نام کاربری خود را وارد کنید",
    password: "گذرواژهٔ خود را وارد کنید",
  },
  rememberMe: "مرا به خاطر بسپار",
  forgotPassword: "گذرواژه را فراموش کرده‌اید؟",
  loginButton: "ورود",
  continueWith: "یا ادامه با",
  social: {
    google: "ادامه با Google",
    apple: "ادامه با Apple",
    phone: "ادامه با تلفن",
  },
  noAccount: "حساب کاربری ندارید؟",
  createAccount: "ایجاد حساب",
  previewNotice: "فقط پیش‌نمایش رابط کاربری است. ورود متصل نیست و هیچ اطلاعاتی ارسال نمی‌شود.",
  unavailableNotice: "این گزینه در پیش‌نمایش بصری متصل نیست.",
  forgotNotice: "بازیابی گذرواژه در پیش‌نمایش بصری متصل نیست.",
  createNotice: "ایجاد حساب در پیش‌نمایش بصری متصل نیست.",
  passwordShow: "نمایش گذرواژه",
  passwordHide: "پنهان کردن گذرواژه",
  showcase: {
    title: "زیست‌بوم کامل اسلامی",
    principlesTitle: "با راهنمایی دانش",
    imageAlt: "تصویرسازی مسجد هنگام غروب",
    principles: [
      { title: "دانش در اولویت", description: "دانش اسلامی را بر فناوری و هوش مصنوعی مقدم بدانیم." },
      { title: "دانش اصیل", description: "دانش اصیل اسلامی را پایهٔ کار قرار دهیم." },
      { title: "فناوری مسئولانه", description: "فناوری را در خدمت یادگیری و کشف دانش به کار گیریم." },
    ],
  },
};

export default login;
