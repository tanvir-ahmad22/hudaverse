"use client";

import { useEffect, useMemo, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, ChevronDown, Cpu, GraduationCap, Globe2, LockKeyhole, Mail, ShieldCheck, Sparkles, Star, UsersRound, UserRound, UserRoundPlus, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/navbar/Logo";
import { useLanguage } from "@/hooks/useLanguage";
import type { LanguageCode } from "@/lib/language";
import { AuthServiceError, getAuthProviders, registerAccount, startOAuth, type AuthProviders } from "@/modules/auth/services/auth.service";
import { BrandMark } from "@/components/auth/BrandMark";
import enSignup, { type SignupTranslations } from "@/locales/en/signup";
import bnSignup from "@/locales/bn/signup";
import arSignup from "@/locales/ar/signup";
import urSignup from "@/locales/ur/signup";
import faSignup from "@/locales/fa/signup";
import trSignup from "@/locales/tr/signup";
import * as countryData from "i18n-iso-countries";

const SIGNUP_LOCALES: Record<LanguageCode, SignupTranslations> = { en: enSignup, bn: bnSignup, ar: arSignup, ur: urSignup, fa: faSignup, tr: trSignup };
const INTEREST_KEYS = ["quran", "hadith", "fiqh", "tafsir", "islamicHistory", "others"] as const;
const INTEREST_VALUES = ["QURAN", "HADITH", "FIQH", "TAFSIR", "ISLAMIC_HISTORY", "OTHERS"] as const;
const COMMON_PASSWORDS = new Set(["password1234", "password12345", "qwerty12345", "1234567890", "iloveyou123", "welcome1234", "letmein1234", "admin123456"]);

function LocaleSelector({ value, onChange, label, availableLanguages }: { value: string; onChange: (value: string) => void; label: string; availableLanguages: readonly { code: string; label: string }[] }) {
  return <label className="relative flex min-h-10 items-center gap-2 rounded-full border border-white/40 bg-[var(--primary-dark)] px-3 text-sm text-white"><Globe2 aria-hidden="true" className="h-4 w-4" /><span className="sr-only">{label}</span><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className="max-w-24 appearance-none bg-transparent pe-4 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">{availableLanguages.map((item) => <option key={item.code} value={item.code} className="text-[var(--text-dark)]">{item.label}</option>)}</select><ChevronDown aria-hidden="true" className="pointer-events-none absolute end-2 h-3 w-3" /></label>;
}

export default function SignUpPage() {
  const { currentLang, currentLanguage, availableLanguages, selectLanguage } = useLanguage();
  const copy = SIGNUP_LOCALES[currentLang];
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [countryQuery, setCountryQuery] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [interestsOpen, setInterestsOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [providers, setProviders] = useState<AuthProviders | null>(null);
  useEffect(() => { void getAuthProviders().then(setProviders).catch(() => setProviders(null)); }, []);
  const fontClass = currentLang === "bn" ? "font-bangla" : currentLang === "ar" ? "font-arabic" : currentLang === "ur" ? "font-urdu" : currentLang === "fa" ? "font-persian" : "font-sans";
  const countryNames = useMemo(() => new Intl.DisplayNames([currentLang], { type: "region" }), [currentLang]);
  const countryOptions = useMemo(() => Object.keys(countryData.getAlpha2Codes()).map((code) => ({ code, label: countryNames.of(code) ?? code })).sort((a, b) => a.label.localeCompare(b.label, currentLang)), [countryNames, currentLang]);
  const selectedCountryName = countryOptions.find((item) => item.code === country)?.label ?? "";
  const filteredCountries = countryOptions.filter((item) => item.label.toLocaleLowerCase(currentLang).includes(countryQuery.toLocaleLowerCase(currentLang))).slice(0, 80);
  const chosenInterestNames = selectedInterests.map((value) => {
    const index = INTEREST_VALUES.indexOf(value as (typeof INTEREST_VALUES)[number]);
    return copy.interests[INTEREST_KEYS[index]];
  });
  const strengthScore = password.length < 10 || COMMON_PASSWORDS.has(password.toLowerCase()) ? 0 : password.length >= 14 ? 2 : 1;
  const strengthLabel = strengthScore === 0 ? copy.strength.weak : strengthScore === 1 ? copy.strength.fair : copy.strength.strong;
  const interestNames = [copy.interests.quran, copy.interests.hadith, copy.interests.fiqh, copy.interests.tafsir, copy.interests.islamicHistory, copy.interests.others];
  const socialProviders = (["google", "microsoft", "facebook"] as const).filter((provider) => process.env.NODE_ENV !== "production" || providers?.[provider]);

  function toggleInterest(value: string) {
    setSelectedInterests((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  function onCountryKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") { event.preventDefault(); setCountryOpen(true); setActiveCountry((index) => Math.min(index + 1, filteredCountries.length - 1)); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActiveCountry((index) => Math.max(index - 1, 0)); }
    if (event.key === "Escape") setCountryOpen(false);
    if (event.key === "Enter" && countryOpen && filteredCountries[activeCountry]) {
      event.preventDefault(); setCountry(filteredCountries[activeCountry].code); setCountryQuery(""); setCountryOpen(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || success) return;
    setError(""); setFieldError("");
    if (!fullName.trim() || !email.trim()) {
      setFieldError(!fullName.trim() ? "fullName" : "email"); setError(copy.errors.required);
      event.currentTarget.querySelector<HTMLInputElement>(":invalid")?.focus(); return;
    }
    const emailInput = event.currentTarget.elements.namedItem("email") as HTMLInputElement;
    if (!emailInput.validity.valid) { setFieldError("email"); setError(copy.errors.email); emailInput.focus(); return; }
    if (password !== confirmPassword) { setFieldError("confirm"); setError(copy.errors.mismatch); return; }
    if (password.length < 10 || COMMON_PASSWORDS.has(password.toLowerCase())) { setFieldError("password"); setError(copy.errors.weak); return; }
    if (!termsAccepted) { setFieldError("terms"); setError(copy.terms.required); return; }
    setPending(true);
    try {
      await registerAccount({
        fullName: fullName.trim(), email: email.trim().toLowerCase(), password, confirmPassword,
        ...(dateOfBirth ? { dateOfBirth } : {}), ...(country ? { country } : {}),
        interests: selectedInterests, termsAccepted: true, locale: currentLang,
      });
      setSuccess(true);
    } catch (cause) {
      if (cause instanceof AuthServiceError && cause.status === 429) setError(copy.errors.rateLimit);
      else if (cause instanceof AuthServiceError && cause.status === 400) setError(copy.errors.required);
      else setError(copy.errors.general);
    } finally { setPending(false); }
  }

  async function handleProvider(provider: "google" | "microsoft" | "facebook") {
    if (pending) return;
    setError(""); setPending(true);
    if (!providers?.[provider]) { setPending(false); setError(copy.errors.unavailable); return; }
    startOAuth(provider);
  }

  return <div id="signup-page" lang={currentLang} dir={currentLanguage.dir} className={`min-h-dvh overflow-x-hidden bg-[var(--primary-dark)] text-white ${fontClass}`}>
    <header className="flex w-full flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:h-[104px] lg:flex-nowrap lg:ps-[11%] lg:pe-[2%] lg:py-0">
      <Link data-testid="signup-logo" href="/" aria-label="HudaVerse home" className="max-w-[58%] sm:max-w-none"><Logo className="origin-left scale-[0.68] sm:scale-[0.82] lg:scale-[0.9]" compact={false} tone="light" size="large" staticTagline taglineText={copy.brandTagline} priority={false} /></Link>
      <div className="ms-auto flex items-center gap-2 sm:gap-4">
        <div data-testid="signup-lang"><LocaleSelector value={currentLang} onChange={selectLanguage} label={copy.language} availableLanguages={availableLanguages} /></div>
        <span aria-hidden="true" className="hidden h-6 w-px bg-white/40 sm:block" />
        <span className="hidden text-sm text-white sm:inline">{copy.alreadyAccount}</span>
        <Link data-testid="signup-signin-link" href="/login" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--accent)] px-3 text-sm font-semibold text-[var(--accent-light)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-light)]"><span className="sm:hidden">{copy.signIn}</span><span className="hidden sm:inline">{copy.signIn}</span><ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" /></Link>
      </div>
    </header>

    <main className="grid w-full grid-cols-1 gap-5 px-4 pb-10 sm:px-6 lg:min-h-[calc(100dvh-104px)] lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-0 lg:px-0 lg:pb-8">
      <section className="order-1 self-center py-2 lg:col-start-1 lg:row-start-1 lg:translate-y-8 lg:ps-[14%] lg:pe-8 lg:pt-3">
        <h1 data-testid="hero-title" className="font-heading text-[clamp(2.5rem,4vw,4.8rem)] font-semibold leading-[1.06] tracking-tight text-white"><span>{copy.hero.join} </span><span className="text-[var(--accent-light)]">{copy.hero.brand}</span></h1>
        <p data-testid="hero-subtitle" className="mt-3 font-heading text-[clamp(1.6rem,2.9vw,3.4375rem)] leading-tight text-white">{copy.hero.subtitle}<br /><span>{copy.hero.with} </span><em className="font-semibold text-[var(--accent-light)]">{copy.hero.knowledge}</em></p>
        <div aria-hidden="true" className="my-5 flex max-w-[390px] items-center gap-3 text-[var(--accent)] lg:my-2.5"><span className="h-px flex-1 bg-[var(--accent)]" /><Sparkles className="h-5 w-5" /><span className="h-px flex-1 bg-[var(--accent)]" /></div>
        <p data-testid="hero-paragraph" className="max-w-[430px] text-base leading-relaxed text-white sm:text-lg">{copy.hero.paragraph}</p>
      </section>

      <section className="order-2 flex w-full justify-center self-center py-3 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:justify-start lg:self-start lg:ps-4 lg:py-0 lg:pt-2">
        <div className="relative w-full rounded-[var(--radius-card)] border border-[var(--border-light)] bg-[var(--background)] px-4 pb-5 pt-9 text-[var(--text-dark)] shadow-[var(--shadow-card)] sm:px-6 sm:pt-10 lg:w-[92%] lg:max-w-none lg:px-8 lg:pb-5 lg:pt-[76px]">
          <div aria-hidden="true" className="absolute start-1/2 top-0 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-light)] bg-[var(--background)] shadow-[var(--shadow-card)] rtl:translate-x-1/2">
            <Image src="/hudaverse-logo-mark.png" alt="" width={58} height={58} priority={false} className="h-[58px] w-[58px] object-contain" />
          </div>
          <div className="mb-3 text-center">
            <h2 data-testid="card-title" className="font-heading text-3xl font-semibold leading-tight text-[var(--primary-dark)] sm:text-[40px]">{copy.card.title}</h2>
            <p data-testid="card-subtitle" className="mt-1 text-sm text-[var(--text-muted)] sm:text-[19px]">{copy.card.subtitle}</p>
            <div aria-hidden="true" className="mx-auto mt-3 flex max-w-[360px] items-center gap-2 text-[var(--accent)]"><span className="h-px flex-1 bg-[var(--accent)]" /><Sparkles className="h-5 w-5" /><span className="h-px flex-1 bg-[var(--accent)]" /></div>
          </div>

          {success ? <div className="flex min-h-[500px] flex-col items-center justify-center px-2 text-center" role="status" aria-live="polite"><Mail aria-hidden="true" className="mb-5 h-12 w-12 text-[var(--primary)]" /><h3 className="font-heading text-2xl font-semibold">{copy.success.title}</h3><p className="mt-3 max-w-md leading-relaxed text-[var(--text-muted)]">{copy.success.body}</p><Link href="/login" className="mt-6 inline-flex min-h-11 items-center font-semibold text-[var(--primary)] underline underline-offset-4">{copy.success.back}</Link></div> : <form noValidate onSubmit={submit} className="space-y-[11px]" aria-busy={pending}>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <div className="relative min-w-0 rounded-xl border border-[var(--border-light)] bg-[var(--surface)] px-3 pt-1.5 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--accent)]/35">
                <label htmlFor="signup-fullname" className="block ps-8 text-xs font-semibold text-[var(--text-dark)] sm:text-[15px]">{copy.fields.fullName}</label><UserRound aria-hidden="true" className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--primary)]" />
                <input data-testid="field-fullname" id="signup-fullname" name="fullName" type="text" autoComplete="name" required minLength={2} maxLength={100} value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder={copy.fields.fullNamePlaceholder} aria-describedby={fieldError === "fullName" ? "signup-error" : undefined} className="min-h-8 w-full bg-transparent ps-8 text-sm outline-none placeholder:text-[var(--text-muted)] sm:text-[14px]" />
              </div>
              <div className="relative min-w-0 rounded-xl border border-[var(--border-light)] bg-[var(--surface)] px-3 pt-1.5 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--accent)]/35">
                <label htmlFor="signup-email" className="block ps-8 text-xs font-semibold text-[var(--text-dark)] sm:text-[15px]">{copy.fields.email}</label><Mail aria-hidden="true" className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--primary)]" />
                <input data-testid="field-email" id="signup-email" name="email" type="email" autoComplete="email" required maxLength={255} value={email} onChange={(event) => setEmail(event.target.value)} placeholder={copy.fields.emailPlaceholder} aria-describedby={fieldError === "email" ? "signup-error" : undefined} className="min-h-8 w-full bg-transparent ps-8 text-sm outline-none placeholder:text-[var(--text-muted)] sm:text-[14px]" />
              </div>
              <div className="relative min-w-0 rounded-xl border border-[var(--border-light)] bg-[var(--surface)] px-3 pt-1.5 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--accent)]/35">
                <label htmlFor="signup-password" className="flex items-center justify-between ps-8 text-xs font-semibold text-[var(--text-dark)] sm:text-[15px]"><span>{copy.fields.password}</span><span id="signup-password-strength" aria-live="polite" aria-label={copy.strength.label} className="text-xs font-normal text-[var(--primary)]">{password ? strengthLabel : ""}</span></label><LockKeyhole aria-hidden="true" className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--primary)]" />
                <input data-testid="field-password" id="signup-password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={10} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={copy.fields.passwordPlaceholder} aria-describedby="signup-password-strength" className="min-h-8 w-full bg-transparent ps-8 pe-8 text-sm outline-none placeholder:text-[var(--text-muted)] sm:text-[14px]" />
                <button type="button" aria-label={showPassword ? copy.fields.hidePassword : copy.fields.showPassword} aria-pressed={showPassword} onClick={() => setShowPassword((current) => !current)} className="absolute end-3 top-1/2 -translate-y-1/2 rounded p-1 text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">{showPassword ? <EyeOff aria-hidden="true" className="h-4 w-4" /> : <Eye aria-hidden="true" className="h-4 w-4" />}</button>
              </div>
              <div className="relative min-w-0 rounded-xl border border-[var(--border-light)] bg-[var(--surface)] px-3 pt-1.5 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--accent)]/35">
                <label htmlFor="signup-confirm" className="block ps-8 text-xs font-semibold text-[var(--text-dark)] sm:text-[15px]">{copy.fields.confirm}</label><LockKeyhole aria-hidden="true" className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--primary)]" />
                <input data-testid="field-confirm" id="signup-confirm" name="confirmPassword" type={showConfirm ? "text" : "password"} autoComplete="new-password" required minLength={10} maxLength={128} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder={copy.fields.confirmPlaceholder} aria-describedby={fieldError === "confirm" ? "signup-error" : undefined} className="min-h-8 w-full bg-transparent ps-8 pe-8 text-sm outline-none placeholder:text-[var(--text-muted)] sm:text-[14px]" />
                <button type="button" aria-label={showConfirm ? copy.fields.hidePassword : copy.fields.showPassword} aria-pressed={showConfirm} onClick={() => setShowConfirm((current) => !current)} className="absolute end-3 top-1/2 -translate-y-1/2 rounded p-1 text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">{showConfirm ? <EyeOff aria-hidden="true" className="h-4 w-4" /> : <Eye aria-hidden="true" className="h-4 w-4" />}</button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="relative min-w-0 rounded-xl border border-[var(--border-light)] bg-[var(--surface)] px-3 pt-1.5 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--accent)]/35">
                <label htmlFor="signup-dob" className="block ps-8 text-xs font-semibold sm:text-[15px]">{copy.fields.dob}</label><CalendarDays aria-hidden="true" className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--primary)]" /><input data-testid="field-dob" id="signup-dob" name="dateOfBirth" type="date" autoComplete="bday" max={new Date().toISOString().slice(0, 10)} min="1900-01-01" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} aria-label={copy.fields.dobPlaceholder} className="min-h-8 w-full bg-transparent ps-8 text-sm outline-none" />
              </div>
              <div className="relative min-w-0 rounded-xl border border-[var(--border-light)] bg-[var(--surface)] px-3 pt-1.5 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--accent)]/35">
                <label htmlFor="signup-country" className="block ps-8 text-xs font-semibold sm:text-[15px]">{copy.fields.country}</label><Globe2 aria-hidden="true" className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--primary)]" /><input data-testid="field-country" id="signup-country" name="country" role="combobox" aria-label={copy.fields.country} aria-autocomplete="list" aria-expanded={countryOpen} aria-controls="signup-country-options" aria-activedescendant={countryOpen && filteredCountries[activeCountry] ? `country-option-${filteredCountries[activeCountry].code}` : undefined} autoComplete="country-name" value={countryOpen ? countryQuery : selectedCountryName} onFocus={() => { setCountryOpen(true); setCountryQuery(""); setActiveCountry(-1); }} onChange={(event) => { setCountryQuery(event.target.value); setCountry(""); setCountryOpen(true); setActiveCountry(-1); }} onKeyDown={onCountryKeyDown} placeholder={countryOpen ? copy.fields.countrySearch : copy.fields.countryPlaceholder} className="min-h-8 w-full bg-transparent ps-8 pe-6 text-sm outline-none placeholder:text-[var(--text-muted)]" />
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                {countryOpen && <ul id="signup-country-options" role="listbox" aria-label={copy.fields.country} className="absolute inset-x-0 top-full z-30 mt-1 max-h-56 overflow-auto rounded-lg border border-[var(--border-light)] bg-[var(--surface)] p-1 shadow-[var(--shadow-card)]">{filteredCountries.length ? filteredCountries.map((item, index) => <li key={item.code} id={`country-option-${item.code}`} role="option" aria-selected={item.code === country} onMouseDown={(event) => event.preventDefault()} onClick={() => { setCountry(item.code); setCountryQuery(""); setCountryOpen(false); }} className={`cursor-pointer rounded px-3 py-2 text-sm hover:bg-[var(--background)] ${index === activeCountry ? "bg-[var(--background)]" : ""}`}>{item.label}</li>) : <li className="px-3 py-2 text-sm text-[var(--text-muted)]">{copy.fields.countryEmpty}</li>}</ul>}
              </div>
            </div>

            <div className="relative">
              <label htmlFor="signup-interest-trigger" className="sr-only">{copy.fields.interests}</label>
              <button data-testid="field-interests" id="signup-interest-trigger" type="button" aria-haspopup="listbox" aria-expanded={interestsOpen} onClick={() => setInterestsOpen((current) => !current)} className="flex min-h-[58px] w-full items-center gap-3 rounded-xl border border-[var(--border-light)] bg-[var(--surface)] px-3 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"><Star aria-hidden="true" className="h-5 w-5 shrink-0 text-[var(--primary)]" /><span className="min-w-0 flex-1"><span className="block text-xs font-semibold sm:text-sm">{copy.fields.interests}</span><span className="block truncate text-sm text-[var(--text-muted)]">{chosenInterestNames.length ? chosenInterestNames.join(", ") : copy.fields.interestsPlaceholder}</span></span><ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--text-muted)]" /></button>
              {interestsOpen && <div role="listbox" aria-multiselectable="true" aria-label={copy.fields.interests} className="absolute inset-x-0 top-full z-20 mt-1 grid grid-cols-2 gap-1 rounded-lg border border-[var(--border-light)] bg-[var(--surface)] p-2 shadow-[var(--shadow-card)] sm:grid-cols-3">{INTEREST_VALUES.map((value, index) => <label key={value} className="flex min-h-10 items-center gap-2 rounded px-2 text-sm hover:bg-[var(--background)]"><input type="checkbox" checked={selectedInterests.includes(value)} onChange={() => toggleInterest(value)} className="accent-[var(--primary)]" /><span>{interestNames[index]}</span></label>)}</div>}
              <div className="mt-2 flex flex-wrap justify-center gap-1.5" aria-label={copy.fields.interests}>
                {INTEREST_VALUES.map((value, index) => <button key={value} data-testid={`chip-${INTEREST_KEYS[index].replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`} type="button" aria-pressed={selectedInterests.includes(value)} onClick={() => toggleInterest(value)} className={`min-h-8 rounded-full border px-3 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${selectedInterests.includes(value) ? "border-[var(--primary)] bg-[var(--primary)] text-white" : "border-[var(--border-light)] bg-[var(--background)] text-[var(--text-dark)]"}`}>{interestNames[index]}</button>)}
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input data-testid="terms-checkbox" id="signup-terms" type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} required aria-describedby={fieldError === "terms" ? "signup-error" : undefined} className="mt-1 h-5 w-5 shrink-0 accent-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]" />
              <label htmlFor="signup-terms" className="text-xs leading-relaxed sm:text-sm">{copy.terms.before} <Link data-testid="terms-link" href="/terms" className="font-medium text-[var(--primary)] underline underline-offset-2">{copy.terms.service}</Link> {copy.terms.and} <Link data-testid="privacy-link" href="/privacy" className="font-medium text-[var(--primary)] underline underline-offset-2">{copy.terms.privacy}</Link></label>
            </div>
            {error && <p id="signup-error" role="alert" aria-live="assertive" className="text-sm text-[var(--status-error)]">{error}</p>}
            <div className="hv-signup-submit"><Button data-testid="signup-submit" type="submit" variant="gold" fullWidth disabled={pending} aria-disabled={pending}><UserRoundPlus aria-hidden="true" className="h-5 w-5" /><span>{pending ? copy.submitting : copy.submit}</span><ArrowRight aria-hidden="true" className="h-5 w-5 rtl:rotate-180" /></Button></div>
            <div data-testid="divider-continue" className="flex items-center gap-3 py-1 text-xs text-[var(--text-muted)] sm:text-sm"><span className="h-px flex-1 bg-[var(--border-light)]" />{copy.continueWith}<span className="h-px flex-1 bg-[var(--border-light)]" /></div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[repeat(var(--social-columns),minmax(0,1fr))]" style={{ "--social-columns": Math.max(socialProviders.length, 1) } as CSSProperties}>
              {socialProviders.map((provider) => <button key={provider} data-testid={`social-${provider}`} type="button" onClick={() => void handleProvider(provider)} disabled={pending} className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--border-light)] bg-[var(--surface)] px-2 text-xs text-[var(--text-dark)] transition-colors hover:bg-[var(--background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:opacity-60"><BrandMark provider={provider} className="h-4 w-4 shrink-0" /><span>{copy.social[provider]}</span></button>)}
            </div>
            <p data-testid="security-note" className="flex items-center justify-center gap-2 pt-1 text-center text-xs text-[var(--primary)] sm:text-sm"><ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0" />{copy.securityNote}</p>
          </form>}
        </div>
      </section>

      <section className="order-3 grid grid-cols-1 gap-4 pb-2 ps-0 sm:grid-cols-2 lg:col-start-1 lg:row-start-2 lg:grid-cols-1 lg:ps-[14%] lg:pe-10" aria-label={copy.hero.brand}>
        <div className="space-y-3">
          {copy.hero.features.map((feature, index) => {
            const icons = [BookOpen, GraduationCap, Cpu, UsersRound]; const Icon = icons[index]; const ids = ["feature-quran", "feature-learning", "feature-ai", "feature-community"];
            return <article key={feature.title} data-testid={ids[index]} className="flex items-center gap-3"><span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent-light)] sm:h-[50px] sm:w-[50px] lg:h-[62px] lg:w-[62px]"><Icon className="h-6 w-6" /></span><span><strong className="block text-sm font-semibold text-white sm:text-base">{feature.title}</strong><span className="block text-xs text-white sm:text-sm">{feature.description}</span></span></article>;
          })}
        </div>
        <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
          <blockquote data-testid="quote-plaque" className="relative rounded-xl border border-[var(--accent)] px-4 py-4 text-center text-white"><BookOpen aria-hidden="true" className="mx-auto -mt-7 mb-2 h-6 w-6 rounded-full bg-[var(--primary-dark)] p-0.5 text-[var(--accent-light)]" /><p className="font-heading text-base italic leading-snug">“{copy.hero.quote}”</p><cite className="mt-1 block text-xs not-italic text-[var(--accent-light)]">{copy.hero.quoteBy}</cite></blockquote>
          <div className="flex justify-center text-center" dir="ltr">
            <div data-testid="stat-languages" className="flex items-center justify-center gap-2 px-4 text-white"><Globe2 aria-hidden="true" className="h-6 w-6 text-[var(--accent-light)]" /><span><strong className="block text-sm">{availableLanguages.length}</strong><span className="text-[10px] sm:text-xs">{copy.hero.languages}</span></span></div>
          </div>
        </div>
      </section>
    </main>
  </div>;
}
