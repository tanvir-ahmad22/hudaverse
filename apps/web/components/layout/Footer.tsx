"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
  Award,
} from "lucide-react";

// ===============================
// DATA START
// ===============================

const exploreLinks = [
  { label: "Quran", href: "/quran" },
  { label: "Hadith", href: "/hadith" },
  { label: "Tafsir", href: "/tafsir" },
  { label: "Fiqh", href: "/fiqh" },
  { label: "Dua", href: "/dua" },
  { label: "Prayer Times", href: "/prayer" },
];

const platformLinks = [
  { label: "AI Assistant", href: "/ai-assistant" },
  { label: "Learning Center", href: "/learn" },
  { label: "Community", href: "/community" },
  { label: "Bookmarks", href: "/bookmarks" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Mobile App", href: "/app" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const trustBadges = [
  { icon: ShieldCheck, label: "No Ads" },
  { icon: Lock, label: "Privacy Focused" },
  { icon: BookOpen, label: "Authentic Sources" },
  { icon: Sparkles, label: "AI Powered" },
];

const socialLinks = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaYoutube, label: "YouTube" },
  { icon: FaXTwitter, label: "Twitter/X" },
];

// ===============================
// DATA END
// ===============================

// ===============================
// FOOTER COLUMN START
// ===============================

function FooterColumn({
  title,
  links,
  delay = 0,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <h4 className="mb-5 text-sm font-semibold text-white tracking-wider uppercase">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <motion.li
            key={link.href}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.3, delay: delay + 0.05 + index * 0.03 }}
          >
            <Link
              href={link.href}
              className="text-sm text-white/50 transition-all hover:text-amber-400 hover:pl-1"
            >
              {link.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

// ===============================
// FOOTER COLUMN END
// ===============================

// ===============================
// SOCIAL ICON START
// ===============================

function SocialIcon({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <motion.a
      href="#"
      aria-label={label}
      whileHover={{
        scale: 1.1,
        rotate: -5,
        y: -2,
      }}
      whileTap={{ scale: 0.95 }}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/50 transition-all hover:border-amber-400 hover:bg-amber-400/10 hover:text-amber-400 hover:shadow-lg hover:shadow-amber-400/20"
    >
      <Icon className="h-4 w-4" />
    </motion.a>
  );
}

// ===============================
// SOCIAL ICON END
// ===============================

// ===============================
// TRUST BADGE START
// ===============================

function TrustBadge({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm px-3 py-1.5"
    >
      <Icon className="h-3.5 w-3.5 text-amber-400" />
      <span className="text-xs font-medium text-white/60">{label}</span>
    </motion.div>
  );
}

// ===============================
// TRUST BADGE END
// ===============================

// ===============================
// DONATION CARD START
// ===============================

function DonationCard() {
  const ref = useRef(null);
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
      className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-emerald-900/50 to-emerald-950/50 backdrop-blur-sm p-5 shadow-xl shadow-emerald-900/20"
    >
      {/* Glow Effect */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl" />

      <div className="relative">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-amber-400" />
          <h4 className="text-sm font-bold text-white">Keep HudaVerse Free</h4>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-white/60">
          Your support helps millions access authentic Islamic knowledge without
          ads.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4"
        >
          <Link
            href="/support"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-amber-400/30 transition-all hover:shadow-amber-400/50"
          >
            <Heart className="h-4 w-4" />
            Support Project
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ===============================
// DONATION CARD END
// ===============================

// ===============================
// MAIN FOOTER START
// ===============================

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-emerald-950 to-emerald-950/95"
    >
      {/* ===============================
          BACKGROUND PATTERN
      ================================ */}

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

      {/* ===============================
          MAIN CONTENT
      ================================ */}

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* ===============================
              COLUMN 1: BRAND
          ================================ */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
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
              Empowering Muslims worldwide with knowledge, spirituality, and AI
              technology.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1.5"
            >
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span className="text-[10px] font-medium text-amber-400/80">
                Built with AI + Islamic Knowledge
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
                  <SocialIcon icon={social.icon} label={social.label} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ===============================
              COLUMN 2: EXPLORE
          ================================ */}

          <div className="lg:col-span-2">
            <FooterColumn title="Explore" links={exploreLinks} delay={0.1} />
          </div>

          {/* ===============================
              COLUMN 3: PLATFORM
          ================================ */}

          <div className="lg:col-span-2">
            <FooterColumn title="Platform" links={platformLinks} delay={0.2} />
          </div>

          {/* ===============================
              COLUMN 4: COMPANY
          ================================ */}

          <div className="lg:col-span-2">
            <FooterColumn title="Company" links={companyLinks} delay={0.3} />
          </div>

          {/* ===============================
              COLUMN 5: DONATION
          ================================ */}

          <div className="lg:col-span-3">
            <DonationCard />
          </div>
        </div>

        {/* ===============================
            NEWSLETTER SECTION
        ================================ */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm p-6 shadow-xl shadow-emerald-900/20"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-400/10">
                <Mail className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">
                  Stay Connected With HudaVerse
                </h4>
                <p className="mt-1 text-sm text-white/50">
                  Receive Islamic updates, new features and knowledge reminders.
                </p>
              </div>
            </div>

            <form className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/30 backdrop-blur-sm transition-all focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 md:w-72"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-amber-400/20 transition-all hover:shadow-amber-400/40"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* ===============================
            TRUST BADGES SECTION
        ================================ */}

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

        {/* ===============================
            BOTTOM BAR
        ================================ */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 border-t border-white/5 pt-8 text-center"
        >
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} HudaVerse. All rights reserved.
            <span className="mx-2">·</span>
            <span className="text-white/20">Made with ❤️ for the Ummah</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

// ===============================
// MAIN FOOTER END
// ===============================
