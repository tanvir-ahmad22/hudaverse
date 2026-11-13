"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { registerAccount, requestPasswordReset, resetPassword } from "@/modules/auth/services/auth.service";

type Flow = "register" | "forgot" | "reset";

const labels = {
  en: { title: { register: "Create Account", forgot: "Reset your password", reset: "Choose a new password" }, name: "Full name", username: "Username", email: "Email address", password: "Password", confirm: "Confirm password", submit: { register: "Create account", forgot: "Send reset link", reset: "Save new password" }, working: "Please wait…", success: { register: "Account created. Check your email to verify your address.", forgot: "If an account matches that email, password reset instructions have been sent.", reset: "Password updated. You can sign in now." }, failure: "We couldn't complete your request. Please try again.", back: "Back to sign in", mismatch: "Passwords do not match." },
  bn: { title: { register: "অ্যাকাউন্ট তৈরি করুন", forgot: "পাসওয়ার্ড রিসেট", reset: "নতুন পাসওয়ার্ড দিন" }, name: "পুরো নাম", username: "ব্যবহারকারীর নাম", email: "ইমেইল ঠিকানা", password: "পাসওয়ার্ড", confirm: "পাসওয়ার্ড নিশ্চিত করুন", submit: { register: "অ্যাকাউন্ট তৈরি করুন", forgot: "রিসেট লিংক পাঠান", reset: "নতুন পাসওয়ার্ড সংরক্ষণ" }, working: "অনুগ্রহ করে অপেক্ষা করুন…", success: { register: "অ্যাকাউন্ট তৈরি হয়েছে। ইমেইল যাচাই করুন।", forgot: "অ্যাকাউন্ট থাকলে পাসওয়ার্ড রিসেট নির্দেশনা পাঠানো হয়েছে।", reset: "পাসওয়ার্ড আপডেট হয়েছে। এখন সাইন ইন করুন।" }, failure: "অনুরোধটি সম্পন্ন হয়নি। আবার চেষ্টা করুন।", back: "সাইন ইন-এ ফিরুন", mismatch: "পাসওয়ার্ড দুটি মেলেনি।" },
  ar: { title: { register: "إنشاء حساب", forgot: "إعادة تعيين كلمة المرور", reset: "اختيار كلمة مرور جديدة" }, name: "الاسم الكامل", username: "اسم المستخدم", email: "البريد الإلكتروني", password: "كلمة المرور", confirm: "تأكيد كلمة المرور", submit: { register: "إنشاء الحساب", forgot: "إرسال رابط الإعادة", reset: "حفظ كلمة المرور" }, working: "يرجى الانتظار…", success: { register: "تم إنشاء الحساب. تحقق من بريدك الإلكتروني.", forgot: "إذا وُجد حساب بهذا البريد، فستصل تعليمات إعادة التعيين.", reset: "تم تحديث كلمة المرور. يمكنك تسجيل الدخول الآن." }, failure: "تعذر إكمال الطلب. حاول مرة أخرى.", back: "العودة لتسجيل الدخول", mismatch: "كلمتا المرور غير متطابقتين." },
  ur: { title: { register: "اکاؤنٹ بنائیں", forgot: "پاس ورڈ دوبارہ ترتیب دیں", reset: "نیا پاس ورڈ منتخب کریں" }, name: "پورا نام", username: "صارف نام", email: "ای میل پتہ", password: "پاس ورڈ", confirm: "پاس ورڈ کی تصدیق", submit: { register: "اکاؤنٹ بنائیں", forgot: "ری سیٹ لنک بھیجیں", reset: "نیا پاس ورڈ محفوظ کریں" }, working: "براہ کرم انتظار کریں…", success: { register: "اکاؤنٹ بن گیا۔ ای میل کی تصدیق کریں۔", forgot: "اگر اکاؤنٹ موجود ہے تو ری سیٹ ہدایات بھیج دی گئی ہیں۔", reset: "پاس ورڈ اپ ڈیٹ ہوگیا۔ اب سائن اِن کریں۔" }, failure: "درخواست مکمل نہیں ہو سکی۔ دوبارہ کوشش کریں۔", back: "سائن اِن پر واپس جائیں", mismatch: "پاس ورڈ مطابقت نہیں رکھتے۔" },
  fa: { title: { register: "ایجاد حساب", forgot: "بازنشانی گذرواژه", reset: "گذرواژه تازه انتخاب کنید" }, name: "نام کامل", username: "نام کاربری", email: "نشانی ایمیل", password: "گذرواژه", confirm: "تأیید گذرواژه", submit: { register: "ایجاد حساب", forgot: "ارسال پیوند بازنشانی", reset: "ذخیره گذرواژه" }, working: "لطفاً صبر کنید…", success: { register: "حساب ایجاد شد. ایمیل خود را تأیید کنید.", forgot: "اگر حسابی با این ایمیل باشد، راهنمای بازنشانی ارسال شده است.", reset: "گذرواژه به‌روز شد. اکنون وارد شوید." }, failure: "درخواست انجام نشد. دوباره تلاش کنید.", back: "بازگشت به ورود", mismatch: "گذرواژه‌ها یکسان نیستند." },
  tr: { title: { register: "Hesap oluştur", forgot: "Parolanızı sıfırlayın", reset: "Yeni parola belirleyin" }, name: "Ad soyad", username: "Kullanıcı adı", email: "E-posta adresi", password: "Parola", confirm: "Parolayı onayla", submit: { register: "Hesap oluştur", forgot: "Sıfırlama bağlantısı gönder", reset: "Yeni parolayı kaydet" }, working: "Lütfen bekleyin…", success: { register: "Hesap oluşturuldu. E-postanızı doğrulayın.", forgot: "Bu e-postayla eşleşen bir hesap varsa sıfırlama talimatları gönderildi.", reset: "Parola güncellendi. Şimdi giriş yapabilirsiniz." }, failure: "İstek tamamlanamadı. Lütfen tekrar deneyin.", back: "Girişe dön", mismatch: "Parolalar eşleşmiyor." },
} as const;

export default function AuthFlowPage({ flow }: { flow: Flow }) {
  const { currentLang, currentLanguage } = useLanguage();
  const text = labels[currentLang];
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const font = currentLang === "bn" ? "font-bangla" : currentLang === "ar" ? "font-arabic" : currentLang === "ur" ? "font-urdu" : currentLang === "fa" ? "font-persian" : "font-sans";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    setPending(true); setMessage(""); setError("");
    try {
      if (flow === "register") await registerAccount({ name: String(data.get("name")), username: String(data.get("username")), email: String(data.get("email")), password: String(data.get("password")) });
      else if (flow === "forgot") await requestPasswordReset(String(data.get("email")));
      else {
        const password = String(data.get("password"));
        if (password !== String(data.get("confirm"))) throw new Error(text.mismatch);
        await resetPassword(new URLSearchParams(window.location.search).get("token") ?? "", password);
      }
      setMessage(text.success[flow]);
    } catch (cause) { setError(cause instanceof Error && cause.message === text.mismatch ? text.mismatch : text.failure); }
    finally { setPending(false); }
  }

  const fields = flow === "register" ? [ ["name", text.name, "text", "name"], ["username", text.username, "text", "username"], ["email", text.email, "email", "email"], ["password", text.password, "password", "new-password"] ] : flow === "forgot" ? [["email", text.email, "email", "email"]] : [["password", text.password, "password", "new-password"], ["confirm", text.confirm, "password", "new-password"]];

  return <main lang={currentLang} dir={currentLanguage.dir} className={`flex min-h-dvh items-center justify-center bg-[var(--background)] px-4 py-8 ${font}`}><section className="w-full max-w-xl rounded-3xl border border-[var(--border-light)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] sm:p-10"><h1 className="font-subheading text-3xl font-bold text-[var(--text-dark)]">{text.title[flow]}</h1><form onSubmit={submit} className="mt-8 space-y-5">{fields.map(([name, label, type, autocomplete]) => <div key={name}><label htmlFor={`auth-${name}`} className="mb-2 block text-sm font-semibold text-[var(--text-dark)]">{label}</label><input id={`auth-${name}`} name={name} type={type} autoComplete={autocomplete} required minLength={type === "password" ? 8 : undefined} className="min-h-12 w-full rounded-xl border border-[var(--border-light)] bg-[var(--surface)] px-4 text-[var(--text-dark)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--accent)]/35" /></div>)}<button disabled={pending} className="min-h-12 w-full rounded-xl bg-[var(--primary)] px-5 font-semibold text-white disabled:opacity-60">{pending ? text.working : text.submit[flow]}</button></form><p aria-live="polite" className="mt-4 text-sm text-[var(--primary)]">{message}</p>{error && <p role="alert" className="mt-2 text-sm text-[var(--status-error)]">{error}</p>}<Link href="/login" className="mt-5 inline-flex min-h-11 items-center font-medium text-[var(--primary)] hover:underline">{text.back}</Link></section></main>;
}
