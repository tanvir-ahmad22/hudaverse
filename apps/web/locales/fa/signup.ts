import type { SignupTranslations } from "../en/signup";

const signup: SignupTranslations = {
  brandTagline: "دانش · راهنمایی · آرامش", language: "زبان", alreadyAccount: "از قبل حساب دارید؟", signIn: "ورود",
  hero: { join: "به", brand: "HudaVerse", subtitle: "سفر خود را آغاز کنید", with: "با", knowledge: "دانش الهی", paragraph: "قرآن، حدیث، دانش اسلامی و ابزارهای یادگیری کاربردی را یک‌جا در اختیار داشته باشید.", features: [{ title: "قرآن و حدیث", description: "بخوانید، بیاموزید و بیندیشید" }, { title: "آموزش اسلامی", description: "دانش خود را گسترش دهید" }, { title: "دستیار هوشمند", description: "راهنمایی معتبر دریافت کنید" }, { title: "جامعه جهانی", description: "ارتباط بگیرید و رشد کنید" }], quote: "دانش را بجویید، که نوری است که هرگز خاموش نمی‌شود.", quoteBy: "— HudaVerse", languages: "زبان" },
  card: { title: "ایجاد حساب", subtitle: "سفر خود را در اکوسیستم HudaVerse آغاز کنید" },
  fields: { fullName: "نام کامل *", fullNamePlaceholder: "نام کامل خود را وارد کنید", email: "نشانی ایمیل *", emailPlaceholder: "you@example.com", password: "گذرواژه *", passwordPlaceholder: "گذرواژه‌ای قوی بسازید", confirm: "تأیید گذرواژه *", confirmPlaceholder: "گذرواژه را دوباره وارد کنید", dob: "تاریخ تولد (اختیاری)", dobPlaceholder: "تاریخ تولد را انتخاب کنید", country: "کشور / منطقه", countryPlaceholder: "کشور خود را انتخاب کنید", countrySearch: "جست‌وجوی کشورها", countryEmpty: "کشوری پیدا نشد", interests: "علاقه‌مندی‌ها را انتخاب کنید (اختیاری)", interestsPlaceholder: "یک یا چند مورد را انتخاب کنید", showPassword: "نمایش گذرواژه", hidePassword: "پنهان‌کردن گذرواژه" },
  interests: { quran: "قرآن", hadith: "حدیث", fiqh: "فقه", tafsir: "تفسیر", islamicHistory: "تاریخ اسلام", others: "سایر" },
  strength: { label: "قدرت گذرواژه", weak: "ضعیف", fair: "متوسط", strong: "قوی" },
  terms: { before: "با موارد زیر موافقم:", and: "و", service: "شرایط استفاده", privacy: "سیاست حریم خصوصی", required: "برای ادامه، شرایط استفاده و سیاست حریم خصوصی را بپذیرید." },
  submit: "ایجاد حساب", submitting: "در حال ایجاد حساب…", continueWith: "یا ادامه با", social: { google: "ادامه با Google", microsoft: "ادامه با Microsoft", facebook: "ادامه با Facebook" }, securityNote: "اطلاعات شما در HudaVerse ایمن و محفوظ است.",
  errors: { required: "فیلدهای ضروری را تکمیل و دوباره تلاش کنید.", mismatch: "گذرواژه‌ها یکسان نیستند.", weak: "گذرواژه‌ای غیرمعمول با دست‌کم ۱۰ نویسه انتخاب کنید.", rateLimit: "تعداد تلاش‌ها زیاد است. پیش از تلاش دوباره کمی صبر کنید.", unavailable: "این روش ثبت‌نام هنوز در دسترس نیست.", general: "ایجاد حساب انجام نشد. دوباره تلاش کنید.", email: "نشانی ایمیل معتبر وارد کنید." },
  success: { title: "ایمیل خود را بررسی کنید", body: "اگر بتوان برای این نشانی حساب ساخت، راهنمای تأیید به صندوق ورودی شما ارسال می‌شود. برای تکمیل ساخت حساب، پیوند را دنبال کنید.", back: "بازگشت به ورود" }
};
export default signup;
