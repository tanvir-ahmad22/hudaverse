"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Brain, ChevronDown, CloudDownload, Eye, EyeOff, Fingerprint, Globe, Heart, LockKeyhole, Mail, Moon, Phone, Quote, ShieldCheck, Sun, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/navbar/Logo";
import { useLanguage } from "@/hooks/useLanguage";
import type { LanguageCode } from "@/lib/language";
import { requestPasskeySignIn, requestPhoneSignIn, signIn, startOAuth } from "@/modules/auth/services/auth.service";
import { FaApple, FaGoogle } from "react-icons/fa";
import enLogin, { type LoginTranslations } from "@/locales/en/login";
import bnLogin from "@/locales/bn/login";
import arLogin from "@/locales/ar/login";
import urLogin from "@/locales/ur/login";
import faLogin from "@/locales/fa/login";
import trLogin from "@/locales/tr/login";

const LOGIN_LOCALES: Record<LanguageCode, LoginTranslations> = { en: enLogin, bn: bnLogin, ar: arLogin, ur: urLogin, fa: faLogin, tr: trLogin };


export default function LoginPageContent() {
  const { currentLang, currentLanguage, availableLanguages, selectLanguage } = useLanguage();
  const copy = LOGIN_LOCALES[currentLang];
  const [email, setEmail] = useState("");
  const [identifierType, setIdentifierType] = useState<"email" | "phone" | "username">("email");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [lightTheme, setLightTheme] = useState(false);
  const localeFontClass = currentLang === "bn" ? "font-bangla" : currentLang === "ar" ? "font-arabic" : currentLang === "ur" ? "font-urdu" : currentLang === "fa" ? "font-persian" : "font-sans";
  const identifierIcon = identifierType === "email" ? Mail : identifierType === "phone" ? Phone : UserRound;
  const IdentifierIcon = identifierIcon;
  const identifierField = identifierType === "email" ? copy.fields.email : identifierType === "phone" ? copy.fields.phone : copy.fields.username;
  const identifierPlaceholder = identifierType === "email" ? copy.placeholders.email : identifierType === "phone" ? copy.placeholders.phone : copy.placeholders.username;
  const identifierInputType = identifierType === "email" ? "email" : identifierType === "phone" ? "tel" : "text";
  const identifierAutocomplete = identifierType === "phone" ? "tel" : identifierType === "email" ? "email" : "username";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      await signIn(email.trim(), password, rememberMe);
      const next = new URL(window.location.href).searchParams.get("next");
      const platformHome = process.env.NEXT_PUBLIC_PLATFORM_URL || "/dashboard";
      const candidate = next ? new URL(next, window.location.origin) : new URL(platformHome, window.location.origin);
      const safeTarget = candidate.origin === window.location.origin ? candidate : new URL(platformHome, window.location.origin);
      window.location.assign(safeTarget.href);
    } catch {
      setError(copy.genericFailure);
    } finally {
      setPending(false);
    }
  }

  async function runUnavailableAction(action: "google" | "apple" | "phone" | "passkey") {
    setPending(true);
    setError("");
    try {
      if (action === "google" || action === "apple") await startOAuth(action);
      else if (action === "phone") await requestPhoneSignIn(email.trim());
      else await requestPasskeySignIn();
      setError(copy.unavailableNotice);
    } catch {
      setError(copy.unavailableNotice);
    } finally {
      setPending(false);
    }
  }

  return (
    <div id="login-page" lang={currentLang} dir={currentLanguage.dir} className={`fixed inset-0 z-[200] overflow-x-hidden overflow-y-auto ${lightTheme ? "bg-[var(--background)]" : "bg-[var(--primary-dark)]"} ${localeFontClass}`}>
      <div className="grid min-h-dvh w-full grid-cols-1 lg:grid-cols-[55.76%_44.24%]">
        <section className={`relative z-10 flex min-w-0 items-start justify-center px-3 py-3 sm:px-4 sm:py-4 lg:items-center lg:justify-start lg:px-[17px] lg:py-[17px] ${lightTheme ? "bg-[var(--surface)]" : "bg-[var(--background)]"}`}>
          <div style={{ width: "var(--hv-login-card-width, 100%)" }} className={`hv-login-card overflow-hidden rounded-[28px] border border-[var(--border-light)] shadow-[var(--shadow-card)] lg:shrink-0 lg:max-w-none lg:min-h-[calc(100svh-34px)] ${lightTheme ? "bg-[var(--background)]" : "bg-[var(--surface)]"}`}>
            <header className="flex min-h-[132px] items-center gap-3 bg-[var(--surface)] px-5 py-4 sm:px-10 lg:min-h-[228px] lg:px-[9%]">
              <div data-testid="login-logo" dir="ltr" className="mx-auto min-w-0"><Logo className="origin-center scale-[0.86] sm:scale-100" compact={false} tone="brand" size="large" taglineTestId="login-tagline" staticTagline /></div>
            </header>
            <div className="mx-auto w-full max-w-[560px] px-5 pb-7 pt-2 sm:px-8 sm:pb-9 sm:pt-3 lg:w-[81%] lg:px-0 lg:pb-10 lg:pt-[24px]">
              <div className="mb-7">
                <h1 data-testid="login-heading" className="font-subheading text-3xl font-bold tracking-tight text-[var(--text-dark)] sm:text-4xl lg:text-[38px]">{copy.title}<Heart aria-hidden="true" className="ms-2 inline h-5 w-5 fill-[var(--primary-soft)] text-[var(--primary-soft)]" /></h1>
                <p className="mt-2 text-base text-[var(--text-muted)] sm:text-lg lg:text-[19px]">{copy.subtitle}</p>
              </div>

              <div className="mb-7 grid grid-cols-3 overflow-hidden rounded-xl border border-[var(--border-light)] bg-[var(--background)] lg:mb-9" aria-label={`${copy.methods.email}, ${copy.methods.phone}, ${copy.methods.username}`}>
                {([{ type: "email", label: copy.methods.email, Icon: Mail, testid: "tab-email" }, { type: "phone", label: copy.methods.phone, Icon: Phone, testid: "tab-phone" }, { type: "username", label: copy.methods.username, Icon: UserRound, testid: "tab-username" }] as const).map(({ type, label, Icon, testid }) => <button key={type} data-testid={testid} type="button" aria-pressed={identifierType === type} onClick={() => { setIdentifierType(type); setError(""); }} className={`flex min-h-[65px] items-center justify-center gap-2 border-b-[3px] px-1 text-sm font-medium sm:text-base lg:text-[17px] ${identifierType === type ? "border-b-[var(--primary-soft)] text-[var(--primary)]" : "border-b-transparent text-[var(--text-muted)]"}`}><Icon aria-hidden="true" className="h-5 w-5" />{label}</button>)}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-[25px]">
                <div>
                  <label htmlFor="login-identifier" className="mb-2 block font-subheading text-sm font-semibold text-[var(--text-dark)] lg:text-base">{identifierField}</label>
                  <div className="relative">
                    <IdentifierIcon aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input data-testid="field-identifier" id="login-identifier" name="identifier" type={identifierInputType} inputMode={identifierType === "phone" ? "tel" : identifierType === "email" ? "email" : "text"} autoComplete={identifierAutocomplete} aria-describedby={error ? "login-error" : undefined} aria-invalid={Boolean(error)} required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={identifierPlaceholder} className="min-h-[54px] w-full rounded-lg border border-[var(--border-light)] bg-[var(--surface)] ps-12 pe-4 text-start text-sm text-[var(--text-dark)] outline-none transition-shadow placeholder:text-[var(--text-muted)]/80 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--accent)]/35 sm:text-base lg:min-h-[61px]" />
                  </div>
                </div>
                <div>
                  <label htmlFor="login-password" className="mb-2 block font-subheading text-sm font-semibold text-[var(--text-dark)] lg:text-base">{copy.fields.password}</label>
                  <div className="relative">
                    <LockKeyhole aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input data-testid="field-password" id="login-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" aria-describedby={error ? "login-error" : undefined} aria-invalid={Boolean(error)} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder={copy.placeholders.password} className="min-h-[54px] w-full rounded-lg border border-[var(--border-light)] bg-[var(--surface)] ps-12 pe-12 text-start text-sm text-[var(--text-dark)] outline-none transition-shadow placeholder:text-[var(--text-muted)]/80 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--accent)]/35 sm:text-base lg:min-h-[61px]" />
                    <button data-testid="password-toggle" type="button" aria-label={showPassword ? copy.passwordHide : copy.passwordShow} aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)} className="absolute end-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-muted)] outline-none hover:bg-[var(--background)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                      {showPassword ? <EyeOff aria-hidden="true" className="h-5 w-5" /> : <Eye aria-hidden="true" className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <label className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--text-dark)] lg:text-base"><input data-testid="remember-me" type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-5 w-5 rounded border-[var(--border-light)] accent-[var(--primary)]" />{copy.rememberMe}</label>
                  <Link data-testid="forgot-link" href="/forgot-password" className="inline-flex min-h-11 items-center text-start text-sm font-medium text-[var(--primary)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] lg:text-base">{copy.forgotPassword}</Link>
                </div>
                <div className="hv-login-submit"><Button data-testid="login-submit" type="submit" variant="primary" scale="lg" fullWidth disabled={pending}>
                  <span className="flex w-full items-center justify-between gap-3"><span className="flex-1 text-center">{pending ? copy.submitting : copy.loginButton}</span><ArrowRight aria-hidden="true" className="hv-btn-arrow h-5 w-5" /></span>
                </Button></div>
              </form>
              {error && <p id="login-error" role="alert" aria-live="assertive" className="mt-2 rounded-lg border border-[var(--status-error)]/30 bg-[var(--background)] px-3 py-2 text-center text-sm text-[var(--status-error)]">{error}</p>}
              <>
                <div data-testid="divider-continue" className="my-5 flex items-center gap-3 text-sm text-[var(--text-muted)]"><span className="h-px flex-1 bg-[var(--border-light)]" />{copy.continueWith}<span className="h-px flex-1 bg-[var(--border-light)]" /></div>
                <div className="space-y-3">
                  <button data-testid="social-google" type="button" onClick={() => void runUnavailableAction("google")} disabled={pending} className="relative flex min-h-[58px] w-full items-center justify-center rounded-lg border border-[var(--border-light)] bg-[var(--surface)] text-base text-[var(--text-dark)]"><FaGoogle aria-hidden="true" className="absolute start-5 h-5 w-5" /><span>{copy.social.google}</span></button>
                  <button data-testid="social-apple" type="button" onClick={() => void runUnavailableAction("apple")} disabled={pending} className="relative flex min-h-[58px] w-full items-center justify-center rounded-lg border border-[var(--border-light)] bg-[var(--surface)] text-base text-[var(--text-dark)]"><FaApple aria-hidden="true" className="absolute start-5 h-5 w-5 text-black" /><span>{copy.social.apple}</span></button>
                  <button data-testid="social-phone" type="button" onClick={() => void runUnavailableAction("phone")} disabled={pending} className="relative flex min-h-[58px] w-full items-center justify-center rounded-lg border border-[var(--border-light)] bg-[var(--surface)] text-base text-[var(--text-dark)]"><Phone aria-hidden="true" className="absolute start-5 h-5 w-5 text-[var(--primary)]" /><span>{copy.social.phone}</span></button>
                </div>
                <div data-testid="divider-login-with" className="my-5 flex items-center gap-3 text-sm text-[var(--primary)] lg:mb-10"><span className="h-px flex-1 bg-[var(--border-light)]" />{copy.loginWith}<span className="h-px flex-1 bg-[var(--border-light)]" /></div>
                <div className="flex flex-col items-center gap-2"><button data-testid="biometrics-button" type="button" onClick={() => void runUnavailableAction("passkey")} aria-label={copy.biometrics} className="flex h-[86px] w-[86px] items-center justify-center rounded-full border border-[var(--border-light)] text-[var(--primary-soft)] shadow-[var(--shadow-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"><Fingerprint aria-hidden="true" className="h-9 w-9" /></button><span className="text-sm text-[var(--text-muted)]">{copy.biometrics}</span></div>
                <p className="mt-5 text-center text-sm text-[var(--text-muted)] sm:text-base lg:mt-[56px]">{copy.noAccount} <Link data-testid="create-account-link" href="/get-started" className="font-semibold text-[var(--primary)] hover:underline">{copy.createAccount}</Link></p>
                <div data-testid="encryption-note" className="mt-5 flex items-center justify-center gap-2 border-t border-[var(--border-light)] pt-4 text-sm text-[var(--text-muted)] lg:mt-[70px]"><ShieldCheck aria-hidden="true" className="h-5 w-5 text-[var(--primary)]" />{copy.encryptionNote}</div>
              </>
            </div>
          </div>
        </section>

        <aside className="relative isolate hidden min-h-dvh min-w-0 flex-col items-center overflow-hidden bg-[var(--primary-dark)] lg:flex">
          <Image src="/login-form.png" alt={copy.showcase.imageAlt} fill priority sizes="44vw" className="-z-20 object-cover object-[100%_center]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary-dark)_48%,transparent)_0%,color-mix(in_srgb,var(--primary-dark)_20%,transparent)_35%,var(--primary-dark)_100%)]" />
          <div className="absolute end-[38px] top-[38px] z-20 flex items-center gap-4">
            <label data-testid="lang-selector" className="relative flex h-[50px] w-[138px] items-center gap-2 rounded-full border border-white/20 bg-[var(--primary-dark)]/65 px-3 text-white">
              <Globe aria-hidden="true" className="h-5 w-5 shrink-0" />
              <span className="sr-only">{copy.languageSelector}</span>
              <select aria-label={copy.languageSelector} value={currentLang} onChange={(event) => selectLanguage(event.target.value)} className="min-w-0 flex-1 appearance-none bg-transparent text-sm outline-none">
                {availableLanguages.map((language) => <option className="text-[var(--text-dark)]" key={language.code} value={language.code}>{language.label}</option>)}
              </select>
              <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0" />
            </label>
            <button data-testid="theme-toggle" type="button" aria-label={copy.themeToggle} aria-pressed={lightTheme} onClick={() => setLightTheme((current) => !current)} className="flex h-[62px] w-[62px] items-center justify-center rounded-xl border border-white/20 bg-[var(--primary-dark)]/65 text-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">{lightTheme ? <Sun aria-hidden="true" className="h-5 w-5" /> : <Moon aria-hidden="true" className="h-5 w-5" />}</button>
          </div>
          <div className="absolute top-[40%] z-10 flex w-[90%] -translate-y-1/2 flex-col items-center text-center text-white">
            <Quote aria-hidden="true" className="mb-1 h-8 w-8 rotate-180 fill-[var(--accent)] text-[var(--accent)]" />
            <p data-testid="verse-arabic" lang="ar" dir="rtl" className="font-arabic text-3xl leading-relaxed text-white lg:text-[38px]">{copy.verse.arabic}</p>
            <p data-testid="verse-translation" className="mt-2 text-base lg:text-[19px]">{copy.verse.translation}</p>
            <p data-testid="verse-citation" className="mt-2 text-sm text-[var(--status-success)] lg:text-[17px]">{copy.verse.citation}</p>
          </div>
          <div className="hv-feature-card absolute top-[52%] z-10 min-h-[30%] w-[78%] rounded-2xl border border-white/20 bg-[color-mix(in_srgb,var(--primary-dark)_80%,transparent)] p-4 shadow-[var(--shadow-dark)] backdrop-blur-md sm:p-5">
            {copy.showcase.features.map(({ title, description }, index) => {
              const FeatureIcon = [ShieldCheck, BookOpenCheck, Brain, CloudDownload][index];
              const testIds = ["feature-secure", "feature-authentic", "feature-ai", "feature-offline"];
              return <div key={title} data-testid={testIds[index]} className="flex items-start gap-3 rounded-xl px-2 py-1 xl:gap-4 xl:py-3"><span aria-hidden="true" className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-white"><FeatureIcon aria-hidden="true" className="h-6 w-6" /></span><div><h2 className="font-subheading text-base font-semibold text-white sm:text-lg lg:text-[19px]">{title}</h2><p className="mt-1 text-sm leading-relaxed text-white/80">{description}</p></div></div>;
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
