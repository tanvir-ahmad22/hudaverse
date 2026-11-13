"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { verifyEmail } from "@/modules/auth/services/auth.service";

const copy = {
  en: { title: "Verify your email", pending: "Verifying your address…", success: "Your email address is verified.", failure: "This verification link is invalid or expired.", login: "Continue to sign in" },
  bn: { title: "ইমেইল যাচাই করুন", pending: "ইমেইল ঠিকানা যাচাই হচ্ছে…", success: "আপনার ইমেইল ঠিকানা যাচাই হয়েছে।", failure: "যাচাই লিংকটি সঠিক নয় অথবা মেয়াদ শেষ হয়েছে।", login: "সাইন ইন চালিয়ে যান" },
  ar: { title: "تحقق من بريدك الإلكتروني", pending: "جارٍ التحقق من عنوانك…", success: "تم التحقق من بريدك الإلكتروني.", failure: "رابط التحقق غير صالح أو منتهي الصلاحية.", login: "متابعة تسجيل الدخول" },
  ur: { title: "اپنی ای میل کی تصدیق کریں", pending: "ای میل کی تصدیق ہو رہی ہے…", success: "آپ کے ای میل پتے کی تصدیق ہوگئی۔", failure: "تصدیقی لنک غلط ہے یا اس کی مدت ختم ہوگئی ہے۔", login: "سائن اِن جاری رکھیں" },
  fa: { title: "ایمیل خود را تأیید کنید", pending: "در حال تأیید نشانی شما…", success: "نشانی ایمیل شما تأیید شد.", failure: "پیوند تأیید نامعتبر است یا منقضی شده است.", login: "ادامه به ورود" },
  tr: { title: "E-postanızı doğrulayın", pending: "Adresiniz doğrulanıyor…", success: "E-posta adresiniz doğrulandı.", failure: "Bu doğrulama bağlantısı geçersiz veya süresi dolmuş.", login: "Giriş yapmaya devam et" },
} as const;

export default function EmailVerificationPage() {
  const { currentLang, currentLanguage } = useLanguage();
  const text = copy[currentLang];
  const [state, setState] = useState<"pending" | "success" | "failure">("pending");
  useEffect(() => {
    let cancelled = false;
    const token = new URLSearchParams(window.location.search).get("token") ?? "";
    verifyEmail(token).then(() => { if (!cancelled) setState("success"); }).catch(() => { if (!cancelled) setState("failure"); });
    return () => { cancelled = true; };
  }, []);
  const status = state === "pending" ? text.pending : state === "success" ? text.success : text.failure;
  return <main lang={currentLang} dir={currentLanguage.dir} className="flex min-h-dvh items-center justify-center bg-[var(--background)] px-4"><section className="w-full max-w-xl rounded-3xl border border-[var(--border-light)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-card)]"><h1 className="font-subheading text-3xl font-bold text-[var(--text-dark)]">{text.title}</h1><p role={state === "failure" ? "alert" : "status"} aria-live="polite" className="mt-5 text-[var(--text-muted)]">{status}</p>{state === "success" && <Link href="/login" className="mt-6 inline-flex min-h-11 items-center font-medium text-[var(--primary)] hover:underline">{text.login}</Link>}</section></main>;
}
