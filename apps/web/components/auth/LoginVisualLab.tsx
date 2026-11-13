"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, BookOpenCheck, Brain, CloudDownload, Eye, EyeOff, Fingerprint, Heart, LockKeyhole, Mail, Moon, Phone, Quote, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/navbar/Logo";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import type { LanguageCode } from "@/lib/language";
import { requestPasswordReset, signIn } from "@/modules/auth/services/auth.service";
import enLogin, { type LoginTranslations } from "@/locales/en/login";
import bnLogin from "@/locales/bn/login";
import arLogin from "@/locales/ar/login";
import urLogin from "@/locales/ur/login";
import faLogin from "@/locales/fa/login";
import trLogin from "@/locales/tr/login";

const LOGIN_LOCALES: Record<LanguageCode, LoginTranslations> = { en: enLogin, bn: bnLogin, ar: arLogin, ur: urLogin, fa: faLogin, tr: trLogin };
const COPY = {
  en: { working: "Signing you in…", sent: "If an account matches that email, password reset instructions have been sent.", forgotTitle: "Reset your password", back: "Back to sign in", reset: "Send reset link", success: "You’re signed in." },
  bn: { working: "সাইন ইন হচ্ছে…", sent: "এই ইমেইলের সঙ্গে অ্যাকাউন্ট থাকলে পাসওয়ার্ড রিসেটের নির্দেশনা পাঠানো হয়েছে।", forgotTitle: "পাসওয়ার্ড রিসেট", back: "সাইন ইনে ফিরে যান", reset: "রিসেট লিংক পাঠান", success: "আপনি সাইন ইন করেছেন।" },
  ar: { working: "جارٍ تسجيل الدخول…", sent: "إذا كان هناك حساب بهذا البريد، فقد أُرسلت تعليمات إعادة تعيين كلمة المرور.", forgotTitle: "إعادة تعيين كلمة المرور", back: "العودة لتسجيل الدخول", reset: "إرسال رابط إعادة التعيين", success: "تم تسجيل الدخول." },
  ur: { working: "سائن اِن ہو رہا ہے…", sent: "اگر اس ای میل سے اکاؤنٹ موجود ہے تو پاس ورڈ ری سیٹ کی ہدایات بھیج دی گئی ہیں۔", forgotTitle: "پاس ورڈ ری سیٹ کریں", back: "سائن اِن پر واپس جائیں", reset: "ری سیٹ لنک بھیجیں", success: "آپ سائن اِن ہو گئے ہیں۔" },
  fa: { working: "در حال ورود…", sent: "اگر حسابی با این ایمیل وجود داشته باشد، راهنمای بازنشانی رمز ارسال شده است.", forgotTitle: "بازنشانی گذرواژه", back: "بازگشت به ورود", reset: "ارسال پیوند بازنشانی", success: "وارد شدید." },
  tr: { working: "Giriş yapılıyor…", sent: "Bu e-postayla eşleşen bir hesap varsa parola sıfırlama talimatları gönderildi.", forgotTitle: "Parolanızı sıfırlayın", back: "Girişe dön", reset: "Sıfırlama bağlantısı gönder", success: "Giriş yaptınız." },
} as const;

export default function LoginVisualLab() {
  const { currentLang, currentLanguage } = useLanguage();
  const copy = LOGIN_LOCALES[currentLang];
  const local = COPY[currentLang];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const pageRef = useRef<HTMLDivElement>(null);
  const localeFontClass = currentLang === "bn" ? "font-bangla" : currentLang === "ar" ? "font-arabic" : currentLang === "ur" ? "font-urdu" : currentLang === "fa" ? "font-persian" : "font-sans";

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedEmail = window.localStorage.getItem("hudaverse_remembered_email");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const chrome = Array.from(body.children).filter((element) => !pageRef.current || !element.contains(pageRef.current));
    const previousState = chrome.map((element) => ({ element, inert: (element as HTMLElement).inert, ariaHidden: element.getAttribute("aria-hidden") }));
    body.style.overflow = "hidden";
    for (const element of chrome) {
      (element as HTMLElement).inert = true;
      element.setAttribute("aria-hidden", "true");
    }
    return () => {
      body.style.overflow = previousOverflow;
      for (const state of previousState) {
        (state.element as HTMLElement).inert = state.inert;
        if (state.ariaHidden === null) state.element.removeAttribute("aria-hidden");
        else state.element.setAttribute("aria-hidden", state.ariaHidden);
      }
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setNotice("");
    setError("");
    try {
      if (forgotMode) {
        await requestPasswordReset(email.trim());
        setNotice(local.sent);
      } else {
        await signIn(email.trim(), password);
        if (rememberMe) window.localStorage.setItem("hudaverse_remembered_email", email.trim());
        else window.localStorage.removeItem("hudaverse_remembered_email");
        setNotice(local.success);
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div ref={pageRef} lang={currentLang} dir={currentLanguage.dir} className={`fixed inset-0 z-[200] overflow-x-hidden overflow-y-auto bg-[var(--primary-dark)] ${localeFontClass}`}>
      <div className="mx-auto grid min-h-dvh w-full max-w-[1680px] lg:grid-cols-[1.12fr_0.88fr]">
        <section className="flex min-w-0 items-center justify-center bg-[var(--background)] px-3 py-5 sm:px-6 sm:py-8 lg:px-5 xl:px-8">
          <div className="w-full max-w-[720px] overflow-hidden rounded-2xl border border-[var(--border-light)] bg-[var(--surface)] shadow-[var(--shadow-card)]">
            <header className="flex min-h-[112px] items-center gap-3 bg-[var(--surface)] px-5 py-4 sm:px-10">
              <div dir="ltr" className="min-w-0"><Logo compact={false} tone="dark" /></div>
            </header>
            <div className="px-5 pb-7 pt-5 sm:px-10 sm:pb-9 sm:pt-7 lg:px-[9%]">
              <div className="mb-7">
                <h1 className="font-subheading text-3xl font-bold tracking-tight text-[var(--text-dark)] sm:text-4xl">{forgotMode ? local.forgotTitle : copy.title}<Heart aria-hidden="true" className="ms-2 inline h-5 w-5 fill-[var(--primary-soft)] text-[var(--primary-soft)]" /></h1>
                <p className="mt-2 text-base text-[var(--text-muted)] sm:text-lg">{forgotMode ? copy.forgotPassword : "Login to continue your spiritual journey"}</p>
              </div>

              {!forgotMode && <div className="mb-7 grid grid-cols-3 overflow-hidden rounded-2xl border border-[var(--border-light)] bg-[var(--surface)]" aria-label="Sign in method">
                {[{ label: copy.methods.email, Icon: Mail, active: true }, { label: copy.methods.phone, Icon: Phone, active: false }, { label: copy.methods.username, Icon: UserRound, active: false }].map(({ label, Icon, active }, index) => <button key={label} type="button" disabled={!active} aria-current={active ? "true" : undefined} className={`flex min-h-[62px] items-center justify-center gap-2 border-b-[3px] px-1 text-sm font-medium sm:text-base ${index > 0 ? "border-s-[1px] border-s-[var(--border-light)]" : ""} ${active ? "border-b-[var(--primary-soft)] text-[var(--primary)]" : "border-b-transparent text-[var(--text-muted)]"}`}><Icon aria-hidden="true" className="h-5 w-5" />{label}</button>)}
              </div>}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="login-email" className="mb-2 block font-subheading text-sm font-semibold text-[var(--text-dark)]">{copy.fields.email}</label>
                  <div className="relative">
                    <Mail aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input id="login-email" name="email" type="email" inputMode="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={copy.placeholders.email} className="min-h-[54px] w-full rounded-xl border border-[var(--border-light)] bg-[var(--surface)] ps-12 pe-4 text-start text-sm text-[var(--text-dark)] outline-none transition-shadow placeholder:text-[var(--text-muted)]/80 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--accent)]/35 sm:text-base" />
                  </div>
                </div>
                {!forgotMode && <div>
                  <label htmlFor="login-password" className="mb-2 block font-subheading text-sm font-semibold text-[var(--text-dark)]">{copy.fields.password}</label>
                  <div className="relative">
                    <LockKeyhole aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input id="login-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder={copy.placeholders.password} className="min-h-[54px] w-full rounded-xl border border-[var(--border-light)] bg-[var(--surface)] ps-12 pe-12 text-start text-sm text-[var(--text-dark)] outline-none transition-shadow placeholder:text-[var(--text-muted)]/80 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--accent)]/35 sm:text-base" />
                    <button type="button" aria-label={showPassword ? copy.passwordHide : copy.passwordShow} aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)} className="absolute end-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-muted)] outline-none hover:bg-[var(--background)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                      {showPassword ? <EyeOff aria-hidden="true" className="h-5 w-5" /> : <Eye aria-hidden="true" className="h-5 w-5" />}
                    </button>
                  </div>
                </div>}
                {!forgotMode && <div className="flex items-center justify-between gap-3">
                  <label className="inline-flex min-h-9 items-center gap-2 text-sm text-[var(--text-dark)]"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-5 w-5 rounded border-[var(--border-light)] accent-[var(--primary)]" />Remember me</label>
                  <button type="button" onClick={() => { setForgotMode(true); setError(""); setNotice(""); }} className="min-h-8 text-start text-sm font-medium text-[var(--primary)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">{copy.forgotPassword}</button>
                </div>}
                <Button type="submit" variant="primary" scale="lg" fullWidth disabled={pending}>
                  <span className="flex w-full items-center justify-between gap-3"><span className="flex-1 text-center">{pending ? local.working : forgotMode ? local.reset : copy.loginButton}</span><ArrowRight aria-hidden="true" className="hv-btn-arrow h-5 w-5" /></span>
                </Button>
              </form>
              <p className="mt-4 min-h-6 text-center text-sm text-[var(--primary)]" aria-live="polite">{notice}</p>
              {error && <p role="alert" className="mt-2 rounded-lg border border-[var(--status-error)]/30 bg-[var(--background)] px-3 py-2 text-center text-sm text-[var(--status-error)]">{error}</p>}
              {!forgotMode && <>
                <div className="my-6 flex items-center gap-3 text-sm text-[var(--text-muted)]"><span className="h-px flex-1 bg-[var(--border-light)]" />or continue with<span className="h-px flex-1 bg-[var(--border-light)]" /></div>
                <div className="space-y-3">
                  {[{ label: copy.social.google, symbol: "G" }, { label: copy.social.apple, symbol: "●" }, { label: copy.social.phone, symbol: "☎" }].map((item) => <button key={item.label} type="button" disabled className="flex min-h-[58px] w-full items-center justify-center gap-4 rounded-xl border border-[var(--border-light)] bg-[var(--surface)] text-base text-[var(--text-dark)] opacity-65"><span aria-hidden="true" className="w-6 font-semibold text-[var(--primary)]">{item.symbol}</span>{item.label}</button>)}
                </div>
                <div className="my-6 flex items-center gap-3 text-sm text-[var(--primary)]"><span className="h-px flex-1 bg-[var(--border-light)]" />or login with<span className="h-px flex-1 bg-[var(--border-light)]" /></div>
                <div className="flex flex-col items-center gap-2"><button type="button" disabled aria-label="Biometric sign in unavailable" className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-[var(--border-light)] text-[var(--primary-soft)] shadow-sm opacity-65"><Fingerprint aria-hidden="true" className="h-9 w-9" /></button><span className="text-sm text-[var(--text-muted)]">Use Biometrics</span></div>
                <p className="mt-6 text-center text-sm text-[var(--text-muted)]">{copy.noAccount} <span className="font-semibold text-[var(--primary)]">{copy.createAccount}</span></p>
                <div className="mt-6 flex items-center justify-center gap-2 border-t border-[var(--border-light)] pt-5 text-sm text-[var(--text-muted)]"><ShieldCheck aria-hidden="true" className="h-5 w-5 text-[var(--primary)]" />Your data is protected with end-to-end encryption</div>
              </>}
              {forgotMode && <button type="button" onClick={() => { setForgotMode(false); setError(""); setNotice(""); }} className="mt-3 min-h-10 w-full text-sm font-semibold text-[var(--primary)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">{local.back}</button>}
            </div>
          </div>
        </section>

        <aside className="relative isolate hidden min-h-dvh min-w-0 flex-col items-center overflow-hidden bg-[var(--primary-dark)] px-6 py-6 lg:flex xl:px-10 xl:py-8">
          <Image src="/hero-mosque.png" alt={copy.showcase.imageAlt} fill priority sizes="42vw" className="-z-20 object-cover object-center" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary-dark)_48%,transparent)_0%,color-mix(in_srgb,var(--primary-dark)_20%,transparent)_35%,var(--primary-dark)_100%)]" />
          <div className="z-10 flex w-full justify-end gap-3">
            <LanguageSwitcher />
            <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-[var(--primary-dark)]/65 text-[var(--accent-light)]"><Moon className="h-5 w-5" /></span>
          </div>
          <div className="z-10 mt-auto flex w-full max-w-[480px] flex-col items-center pb-4 text-center text-white xl:pb-6">
            <Quote aria-hidden="true" className="mb-1 h-8 w-8 rotate-180 fill-[var(--accent)] text-[var(--accent)]" />
            <p lang="ar" dir="rtl" className="font-arabic text-3xl leading-relaxed text-white">إِنَّ مَعَ الْعُسْرِ يُسْرًا</p>
            <p className="mt-2 text-base">Indeed, with hardship comes ease.</p>
            <p className="mt-2 text-sm text-[var(--accent-light)]">— Quran 94:6</p>
          </div>
          <div className="z-10 mb-2 mt-5 w-full max-w-[500px] rounded-2xl border border-white/20 bg-[color-mix(in_srgb,var(--primary-dark)_80%,transparent)] p-4 shadow-[var(--shadow-dark)] backdrop-blur-md sm:p-5">
            {[
              { title: "Secure & Private", description: "Your data is safe with us. We use advanced encryption to protect your privacy.", Icon: ShieldCheck },
              { title: "Authentic Content", description: "Quran, Hadith and Islamic content from authentic and trusted sources.", Icon: BookOpenCheck },
              { title: "AI Islamic Assistant", description: "Ask anything about Islam and get answers with Quran & Hadith references.", Icon: Brain },
              { title: "Works Offline", description: "Download content and use HudaVerse even without internet.", Icon: CloudDownload },
            ].map(({ title, description, Icon }) => <div key={title} className="flex items-start gap-4 rounded-xl px-2 py-3"><span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-white"><Icon className="h-6 w-6" /></span><div><h2 className="font-subheading text-base font-semibold text-white">{title}</h2><p className="mt-1 text-sm leading-relaxed text-white/80">{description}</p></div></div>)}
          </div>
        </aside>
      </div>
    </div>
  );
}
