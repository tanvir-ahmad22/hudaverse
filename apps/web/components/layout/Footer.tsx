"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import {
  Heart,
  Mail,
  ShieldCheck,
  Lock,
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";
import { Button } from "@/components/ui/Button";

import enFooter from "../../locales/en/footer";
import bnFooter from "../../locales/bn/footer";
import arFooter from "../../locales/ar/footer";
import urFooter from "../../locales/ur/footer";
import faFooter from "../../locales/fa/footer";
import trFooter from "../../locales/tr/footer";
import { getEcosystemModuleForRoute, getEcosystemModuleHref } from "../../lib/ecosystem-navigation";

/* ================================================================
   TYPES
================================================================ */

type FooterLink = {
  label: string;
  href: string;
};

type FooterContent = {
  brand: { description: string; badge: string };
  explore: { title: string; links: FooterLink[] };
  platform: { title: string; links: FooterLink[] };
  company: { title: string; links: FooterLink[] };
  donation: { title: string; description: string; button: string };
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    button: string;
  };
  trust: {
    noAds: string;
    privacy: string;
    authentic: string;
    ai: string;
  };
  footer: { rights: string; madeWith: string };
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
  };
};

/* ================================================================
   FOOTER LOCALES
================================================================ */

const FOOTER_LOCALES: Record<string, FooterContent> = {
  en: enFooter,
  bn: bnFooter,
  ar: arFooter,
  ur: urFooter,
  fa: faFooter,
  tr: trFooter,
};

const DEFAULT_LANGUAGE = "en";
const RTL_LANGUAGES = new Set(["ar", "ur", "fa"]);

/* ================================================================
   FOOTER COLUMN
================================================================ */

function FooterColumn({
  title,
  links,
  delay = 0,
  isRTL = false,
}: {
  title: string;
  links: FooterLink[];
  delay?: number;
  isRTL?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h4>

      <ul className="space-y-3">
        {links.map((link, index) => (
          <motion.li
            key={`${link.href}-${index}`}
            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: isRTL ? 10 : -10 }
            }
            transition={{ duration: 0.3, delay: delay + 0.05 + index * 0.03 }}
          >
            <Link
              href={(() => {
                const moduleId = getEcosystemModuleForRoute(link.href);
                return moduleId ? getEcosystemModuleHref(moduleId) : link.href;
              })()}
              className="
                group inline-flex items-center gap-1.5 text-sm text-white/50
                transition-all duration-200 hover:pl-1 hover:text-[var(--accent)]
              "
            >
              <span>{link.label}</span>
              <Arrow
                className="
                  h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200
                  group-hover:translate-x-0 group-hover:opacity-100
                "
              />
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ================================================================
   SOCIAL ICON
================================================================ */

function SocialIcon({
  icon: Icon,
  label,
  href = "#",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, rotate: -5, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="
        flex h-10 w-10 items-center justify-center rounded-full border
        border-white/10 bg-white/5 text-white/50 backdrop-blur-sm
        transition-all duration-200
        hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]
        hover:shadow-lg hover:shadow-[var(--accent)]/20
      "
    >
      <Icon className="h-4 w-4" />
    </motion.a>
  );
}

/* ================================================================
   TRUST BADGE
================================================================ */

function TrustBadge({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="
        flex items-center gap-2 rounded-full border border-white/5
        bg-white/5 px-3 py-1.5 backdrop-blur-sm
      "
    >
      <Icon aria-hidden="true" className="h-3.5 w-3.5 text-[var(--accent)]" />
      <span className="text-xs font-medium text-white/60">{label}</span>
    </motion.div>
  );
}

/* ================================================================
   DONATION CARD
================================================================ */

function DonationCard({ content }: { content: FooterContent["donation"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
      }
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className="
        relative overflow-hidden rounded-2xl border border-[var(--accent)]/20
        bg-gradient-to-br from-[var(--primary-soft)]/50 to-[var(--primary-dark)]/50 p-5
        shadow-xl shadow-[var(--primary-soft)]/20 backdrop-blur-sm
      "
    >
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--accent)]/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[var(--primary-soft)]/10 blur-2xl"
      />

      <div className="relative">
        <div className="flex items-center gap-2">
          <Heart aria-hidden="true" className="h-5 w-5 text-[var(--accent)]" />
          <h4 className="text-sm font-bold text-white">{content.title}</h4>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-white/60">
          {content.description}
        </p>

        <div className="mt-4">
          <Button href="/support" variant="gold" fullWidth>
            <Heart aria-hidden="true" className="h-4 w-4" />
            {content.button}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   MAIN FOOTER
================================================================ */

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const { currentLang } = useLanguage();

  const isRTL = RTL_LANGUAGES.has(currentLang);

  const content = useMemo<FooterContent>(
    () => FOOTER_LOCALES[currentLang] ?? FOOTER_LOCALES[DEFAULT_LANGUAGE],
    [currentLang],
  );

  /* Social links – add real hrefs here or in locale files */
  const socialLinks = [
    {
      icon: FaFacebookF,
      label: content.social.facebook,
      href: "https://facebook.com",
    },
    {
      icon: FaInstagram,
      label: content.social.instagram,
      href: "https://instagram.com",
    },
    {
      icon: FaYoutube,
      label: content.social.youtube,
      href: "https://youtube.com",
    },
    { icon: FaXTwitter, label: content.social.twitter, href: "https://x.com" },
  ];

  const trustBadges = [
    { icon: ShieldCheck, label: content.trust.noAds },
    { icon: Lock, label: content.trust.privacy },
    { icon: BookOpen, label: content.trust.authentic },
    { icon: Sparkles, label: content.trust.ai },
  ];

  return (
    <footer
      ref={footerRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[var(--primary-dark)] to-[var(--primary-dark)]/95"
    >
      {/* Background pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px),
              repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px)
            `,
          }}
        />
      </div>

      {/* Top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-56 w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/[0.035] blur-3xl"
      />

      <div className="hv-container relative py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <Link
              href="/"
              aria-label="HudaVerse home"
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-[var(--accent)]/20 blur-xl"
                />
                <Image
                  src="/logo-icon.png"
                  alt="HudaVerse"
                  width={40}
                  height={40}
                  className="relative h-10 w-10"
                />
              </div>
              <span className="font-subheading text-2xl font-semibold tracking-tight">
                <span className="text-white">Huda</span>
                <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] bg-clip-text text-transparent">
                  Verse
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              {content.brand.description}
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-3 py-1.5"
            >
              <Sparkles aria-hidden="true" className="h-3 w-3 text-[var(--accent)]" />
              <span className="text-[10px] font-medium text-[var(--accent)]/80">
                {content.brand.badge}
              </span>
            </motion.div>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <SocialIcon
                    icon={social.icon}
                    label={social.label}
                    href={social.href}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <FooterColumn
              title={content.explore.title}
              links={content.explore.links}
              delay={0.1}
              isRTL={isRTL}
            />
          </div>

          {/* Platform */}
          <div className="lg:col-span-2">
            <FooterColumn
              title={content.platform.title}
              links={content.platform.links}
              delay={0.2}
              isRTL={isRTL}
            />
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <FooterColumn
              title={content.company.title}
              links={content.company.links}
              delay={0.3}
              isRTL={isRTL}
            />
          </div>

          {/* Donation */}
          <div className="lg:col-span-3">
            <DonationCard content={content.donation} />
          </div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 rounded-3xl border border-white/5 bg-white/5 p-6 shadow-xl shadow-[var(--primary-soft)]/20 backdrop-blur-sm"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10">
                <Mail aria-hidden="true" className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">
                  {content.newsletter.title}
                </h4>
                <p className="mt-1 text-sm text-white/50">
                  {content.newsletter.description}
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full flex-col gap-3 sm:flex-row md:w-auto"
            >
              <label className="sr-only" htmlFor="footer-email">
                {content.newsletter.placeholder}
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder={content.newsletter.placeholder}
                aria-label={content.newsletter.placeholder}
                autoComplete="email"
                className="
                  w-full rounded-full border border-white/10 bg-white/5 px-5 py-3
                  text-sm text-white placeholder:text-white/30 outline-none
                  backdrop-blur-sm transition-all
                  focus:border-[var(--accent)]/50 focus:ring-2 focus:ring-[var(--accent)]/20
                  md:w-72
                "
              />

              <Button
                type="submit"
                variant="secondary"
                style={{ flexShrink: 0 }}
              >
                {content.newsletter.button}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Trust */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
            >
              <TrustBadge icon={badge.icon} label={badge.label} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 border-t border-white/5 pt-8 text-center"
        >
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} HudaVerse. {content.footer.rights}
            <span className="mx-2">·</span>
            <span className="text-white/20">{content.footer.madeWith}</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
