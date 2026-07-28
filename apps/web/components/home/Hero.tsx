// ===============================
// HERO PART 1 START
// ===============================

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaAndroid, FaApple } from "react-icons/fa6";

// ===============================
// Download Buttons
// ===============================

function DownloadButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href="#download-android"
        className="flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:scale-105 hover:bg-amber-300"
      >
        <FaAndroid size={16} />
        Download Android
      </Link>

      <Link
        href="#download-ios"
        className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-white/10"
      >
        <FaApple size={16} />
        Download iOS
      </Link>
    </div>
  );
}

// ===============================
// Trust Users
// ===============================

function TrustUsers() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item * 0.08 }}
            className="h-9 w-9 rounded-full border-2 border-emerald-950 bg-white/20"
          />
        ))}
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-wider text-white/50">
          Trusted By
        </p>
        <p className="text-sm font-semibold text-white">
          50K+ Muslims Worldwide
        </p>
      </div>
    </div>
  );
}

// ===============================
// Phone Mockup
// ===============================

// ===============================
// Premium Phone Mockup
// ===============================

function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.92,
      }}
      animate={{
        opacity: 1,
        y: [0, -12, 0],
        scale: 1,
      }}
      transition={{
        opacity: {
          duration: 0.8,
        },

        scale: {
          duration: 0.8,
          ease: "easeOut",
        },

        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        y: -18,
      }}
      className={`
        ${className}
        drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]
      `}
    >
      {/* Phone Glow */}

      <div
        className="
        absolute
        inset-0
        -z-10
        rounded-full
        bg-amber-400/20
        blur-3xl
        "
      />

      <Image
        src="/hero-phone.png"
        alt="HudaVerse App Preview"
        fill
        priority
        className="
        object-contain
        "
      />
    </motion.div>
  );
}

// ===============================
// Hero Start
// ===============================

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-emerald-950">
      {/* ===============================
          Desktop Start
      ================================ */}

      <div className="hidden xl:grid grid-cols-2 max-w-[1440px] mx-auto">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 flex flex-col justify-center px-10 py-32"
        >
          <span className="w-fit rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-amber-300 backdrop-blur">
            The Ultimate Islamic Experience
          </span>

          <h1 className="mt-7 max-w-xl font-serif text-[3.3rem] font-bold leading-[1.15] text-white">
            All-in-One
            <span className="text-amber-400"> Islamic</span>
            App with
            <span className="text-amber-400"> AI</span>
            Assistant
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70">
            Read Quran, track prayers, explore Hadith, make duas and get answers
            from our AI Islamic Assistant — All in one place.
          </p>

          <div className="mt-9">
            <DownloadButtons />
          </div>

          <div className="mt-12">
            <TrustUsers />
          </div>
        </motion.div>

        {/* Image Area */}
        <div className="relative min-h-[700px] overflow-hidden">
          {/* Mosque Background */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <Image
              src="/hero-mosque.png"
              alt="HudaVerse Mosque"
              fill
              priority
              className="object-cover object-[48%_center]"
            />
          </motion.div>

          {/* Smooth Blend */}
          <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-emerald-950 via-emerald-950/50 to-transparent" />

          {/* Top Fade */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-950/50 to-transparent" />

          {/* Phone Glow */}
          <div className="absolute bottom-16 right-16 h-48 w-48 rounded-full bg-amber-400/20 blur-3xl" />

          {/* Phone */}
          <PhoneMockup className="absolute bottom-8 right-12 z-10 h-[78%] w-[42%]" />
        </div>
      </div>

      {/* ===============================
          Tablet Start
      ================================ */}

      <div className="hidden md:flex xl:hidden relative min-h-[850px] items-center justify-center overflow-hidden">
        {/* Background */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <Image
            src="/hero-mosque.png"
            alt="HudaVerse Mosque"
            fill
            className="object-cover object-center opacity-40"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-emerald-950/75" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center px-8 text-center"
        >
          <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-amber-300 backdrop-blur">
            The Ultimate Islamic Experience
          </span>

          <h1 className="mt-6 max-w-3xl font-serif text-5xl font-bold leading-tight text-white">
            All-in-One
            <span className="text-amber-400"> Islamic</span>
            App with
            <span className="text-amber-400"> AI</span>
            Assistant
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
            Read Quran, Hadith, Dua, Prayer and get AI powered Islamic guidance
            in one place.
          </p>

          <div className="mt-8">
            <DownloadButtons />
          </div>

          {/* Tablet Phone */}
          <PhoneMockup className="relative mt-10 h-[390px] w-[240px]" />

          <div className="mt-8">
            <TrustUsers />
          </div>
        </motion.div>
      </div>

      {/* ===============================
          Mobile Start
      ================================ */}

      <div className="flex md:hidden relative min-h-[850px] flex-col items-center overflow-hidden px-5 pt-24 pb-12 text-center">
        {/* Mobile Background */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <Image
            src="/hero-mosque.png"
            alt="HudaVerse Mosque"
            fill
            className="object-cover object-center opacity-25"
          />
        </motion.div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-emerald-950/85" />

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-emerald-950 to-transparent" />

        {/* Mobile Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex flex-col items-center"
        >
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-amber-300 backdrop-blur">
            The Ultimate Islamic Experience
          </span>

          <h1 className="mt-5 max-w-sm font-serif text-3xl font-bold leading-tight text-white">
            All-in-One
            <span className="text-amber-400"> Islamic</span>
            App with
            <span className="text-amber-400"> AI</span>
            Assistant
          </h1>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Quran, Hadith, Dua, Prayer and AI guidance in one beautiful
            experience.
          </p>

          <div className="mt-7 w-full">
            <DownloadButtons />
          </div>
        </motion.div>

        {/* Mobile Phone Showcase */}
        <div className="relative z-10 mt-10 h-[360px] w-[230px]">
          {/* Phone Glow */}
          <div className="absolute bottom-8 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-amber-400/30 blur-3xl" />

          <PhoneMockup className="relative h-full w-full" />
        </div>

        <div className="relative z-10 mt-8">
          <TrustUsers />
        </div>
      </div>
    </section>
  );
}
