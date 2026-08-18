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
} from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";

import enFooter from "../../locales/en/footer";
import bnFooter from "../../locales/bn/footer";
import arFooter from "../../locales/ar/footer";
import urFooter from "../../locales/ur/footer";
import faFooter from "../../locales/fa/footer";
import trFooter from "../../locales/tr/footer";

/* ================================================================
   TYPES
================================================================ */

type FooterLink = {
  label: string;
  href: string;
};

type FooterContent = {
  brand: {
    description: string;
    badge: string;
  };

  explore: {
    title: string;
    links: FooterLink[];
  };

  platform: {
    title: string;
    links: FooterLink[];
  };

  company: {
    title: string;
    links: FooterLink[];
  };

  donation: {
    title: string;
    description: string;
    button: string;
  };

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

  footer: {
    rights: string;
    madeWith: string;
  };

  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
  };
};

/* ================================================================
   FOOTER LOCALES
   All footer translations come from locales/
================================================================ */

const FOOTER_LOCALES: Record<string, FooterContent> = {
  en: enFooter,
  bn: bnFooter,
  ar: arFooter,
  ur: urFooter,
  fa: faFooter,
  tr: trFooter,
};

/* ================================================================
   DEFAULT LANGUAGE
================================================================ */

const DEFAULT_LANGUAGE = "en";

/* ================================================================
   FOOTER COLUMN
================================================================ */

function FooterColumn({
  title,
  links,
  delay = 0,
}: {
  title: string;
  links: FooterLink[];
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay,
      }}
    >
      <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h4>

      <ul className="space-y-3">
        {links.map((link, index) => (
          <motion.li
            key={`${link.href}-${index}`}
            initial={{
              opacity: 0,
              x: -10,
            }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{
              duration: 0.3,
              delay: delay + 0.05 + index * 0.03,
            }}
          >
            <Link
              href={link.href}
              className="
                text-sm
                text-white/50
                transition-all
                hover:pl-1
                hover:text-amber-400
              "
            >
              {link.label}
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
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <motion.a
      href="#"
      aria-label={label}
      whileHover={{
        scale: 1.1,
        rotate: -5,
        y: -2,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-white/5
        text-white/50
        backdrop-blur-sm
        transition-all
        hover:border-amber-400
        hover:bg-amber-400/10
        hover:text-amber-400
        hover:shadow-lg
        hover:shadow-amber-400/20
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
      whileHover={{
        scale: 1.05,
      }}
      className="
        flex
        items-center
        gap-2
        rounded-full
        border
        border-white/5
        bg-white/5
        px-3
        py-1.5
        backdrop-blur-sm
      "
    >
      <Icon className="h-3.5 w-3.5 text-amber-400" />

      <span className="text-xs font-medium text-white/60">{label}</span>
    </motion.div>
  );
}

/* ================================================================
   DONATION CARD
================================================================ */

function DonationCard({ content }: { content: FooterContent["donation"] }) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={
        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-amber-400/20
        bg-gradient-to-br
        from-emerald-900/50
        to-emerald-950/50
        p-5
        shadow-xl
        shadow-emerald-900/20
        backdrop-blur-sm
      "
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl" />

      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl" />

      <div className="relative">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-amber-400" />

          <h4 className="text-sm font-bold text-white">{content.title}</h4>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-white/60">
          {content.description}
        </p>

        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="mt-4"
        >
          <Link
            href="/support"
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              bg-gradient-to-r
              from-amber-400
              to-amber-500
              px-4
              py-2.5
              text-sm
              font-semibold
              text-emerald-950
              shadow-lg
              shadow-amber-400/30
              transition-all
              hover:shadow-amber-400/50
            "
          >
            <Heart className="h-4 w-4" />

            {content.button}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   MAIN FOOTER
================================================================ */

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  const isInView = useInView(footerRef, {
    once: true,
    amount: 0.1,
  });

  const { currentLang } = useLanguage();

  /* ==============================================================
     CURRENT LANGUAGE CONTENT
     ============================================================= */

  const content = useMemo<FooterContent>(() => {
    return FOOTER_LOCALES[currentLang] ?? FOOTER_LOCALES[DEFAULT_LANGUAGE];
  }, [currentLang]);

  /* ==============================================================
     SOCIAL LINKS
     ============================================================= */

  const socialLinks = [
    {
      icon: FaFacebookF,
      label: content.social.facebook,
    },
    {
      icon: FaInstagram,
      label: content.social.instagram,
    },
    {
      icon: FaYoutube,
      label: content.social.youtube,
    },
    {
      icon: FaXTwitter,
      label: content.social.twitter,
    },
  ];

  /* ==============================================================
     TRUST BADGES
     ============================================================= */

  const trustBadges = [
    {
      icon: ShieldCheck,
      label: content.trust.noAds,
    },
    {
      icon: Lock,
      label: content.trust.privacy,
    },
    {
      icon: BookOpen,
      label: content.trust.authentic,
    },
    {
      icon: Sparkles,
      label: content.trust.ai,
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-emerald-950
        to-emerald-950/95
      "
    >
      {/* =========================================================
          BACKGROUND PATTERN
      ========================================================== */}

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 40px,
                rgba(255, 255, 255, 0.1) 40px,
                rgba(255, 255, 255, 0.1) 41px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 40px,
                rgba(255, 255, 255, 0.1) 40px,
                rgba(255, 255, 255, 0.1) 41px
              )
            `,
          }}
        />
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* =====================================================
              BRAND
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
            }}
            className="lg:col-span-3"
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl" />

                <Image
                  src="/logo-icon.png"
                  alt="HudaVerse"
                  width={40}
                  height={40}
                  className="relative h-10 w-10"
                />
              </div>

              <span className="font-serif text-2xl font-semibold tracking-tight">
                <span className="text-white">Huda</span>

                <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Verse
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              {content.brand.description}
            </p>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              className="
                mt-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-amber-400/20
                bg-amber-400/5
                px-3
                py-1.5
              "
            >
              <Sparkles className="h-3 w-3 text-amber-400" />

              <span className="text-[10px] font-medium text-amber-400/80">
                {content.brand.badge}
              </span>
            </motion.div>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + index * 0.05,
                  }}
                >
                  <SocialIcon icon={social.icon} label={social.label} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* =====================================================
              EXPLORE
          ====================================================== */}

          <div className="lg:col-span-2">
            <FooterColumn
              title={content.explore.title}
              links={content.explore.links}
              delay={0.1}
            />
          </div>

          {/* =====================================================
              PLATFORM
          ====================================================== */}

          <div className="lg:col-span-2">
            <FooterColumn
              title={content.platform.title}
              links={content.platform.links}
              delay={0.2}
            />
          </div>

          {/* =====================================================
              COMPANY
          ====================================================== */}

          <div className="lg:col-span-2">
            <FooterColumn
              title={content.company.title}
              links={content.company.links}
              delay={0.3}
            />
          </div>

          {/* =====================================================
              DONATION
          ====================================================== */}

          <div className="lg:col-span-3">
            <DonationCard content={content.donation} />
          </div>
        </div>

        {/* =========================================================
            NEWSLETTER
        ========================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
          }}
          className="
            mt-16
            rounded-3xl
            border
            border-white/5
            bg-white/5
            p-6
            shadow-xl
            shadow-emerald-900/20
            backdrop-blur-sm
          "
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-400/10">
                <Mail className="h-6 w-6 text-amber-400" />
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

            <form className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <input
                type="email"
                placeholder={content.newsletter.placeholder}
                aria-label={content.newsletter.placeholder}
                className="
                  w-full
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-3
                  text-sm
                  text-white
                  placeholder:text-white/30
                  outline-none
                  backdrop-blur-sm
                  transition-all
                  focus:border-amber-400/50
                  focus:ring-2
                  focus:ring-amber-400/20
                  md:w-72
                "
              />

              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type="submit"
                className="
                  shrink-0
                  rounded-full
                  bg-gradient-to-r
                  from-amber-400
                  to-amber-500
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-emerald-950
                  shadow-lg
                  shadow-amber-400/20
                  transition-all
                  hover:shadow-amber-400/40
                "
              >
                {content.newsletter.button}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* =========================================================
            TRUST BADGES
        ========================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
          }}
          className="
            mt-12
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
          "
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: 0.3,
                delay: 0.5 + index * 0.05,
              }}
            >
              <TrustBadge icon={badge.icon} label={badge.label} />
            </motion.div>
          ))}
        </motion.div>

        {/* =========================================================
            BOTTOM BAR
        ========================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.6,
          }}
          className="
            mt-12
            border-t
            border-white/5
            pt-8
            text-center
          "
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
