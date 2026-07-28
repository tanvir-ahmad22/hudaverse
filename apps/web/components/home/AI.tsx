"use client";

// ===============================
// IMPORTS START
// ===============================

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  Mic,
  Send,
  User,
  Bot,
  MessageCircle,
  Search,
  AudioLines,
  ScrollText,
  Lock,
  CheckCheck,
  Clock,
  CheckCircle,
  Award,
  Database,
} from "lucide-react";

// ===============================
// IMPORTS END
// ===============================

// ===============================
// DATA START
// ===============================

const features = [
  {
    icon: BookOpen,
    title: "Quran Guided",
    desc: "Verses with meanings",
  },
  {
    icon: ScrollText,
    title: "Hadith Verified",
    desc: "Authentic sources",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Sources",
    desc: "Reference based",
  },
  {
    icon: Sparkles,
    title: "AI Intelligence",
    desc: "Smart understanding",
  },
];

const stats = [
  {
    value: "6,236+",
    label: "Quran Verses",
  },
  {
    value: "40K+",
    label: "Hadith",
  },
  {
    value: "99.8%",
    label: "Accuracy",
  },
];

const quickActions = [
  {
    icon: Search,
    label: "Explain",
  },
  {
    icon: ScrollText,
    label: "Hadith",
  },
  {
    icon: BookOpen,
    label: "Tafsir",
  },
  {
    icon: AudioLines,
    label: "Audio",
  },
];

// ===============================
// DATA END
// ===============================

// ===============================
// FEATURE CARD START
// ===============================

function FeatureCard({ item }: { item: (typeof features)[number] }) {
  const Icon = item.icon;

  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)",
      }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-xl border border-emerald-100/30 bg-white/80 backdrop-blur-sm p-4 transition-all hover:border-emerald-200 hover:bg-white"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-900 to-emerald-800 shadow-lg shadow-emerald-900/10 transition-all group-hover:shadow-emerald-900/20 group-hover:shadow-xl">
          <Icon className="h-4 w-4 text-amber-300 transition-all group-hover:text-amber-200 group-hover:scale-110" />
        </div>

        <div>
          <h4 className="text-xs font-bold text-emerald-950 tracking-tight">
            {item.title}
          </h4>
          <p className="mt-0.5 text-[11px] text-emerald-900/50 font-medium">
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ===============================
// FEATURE CARD END
// ===============================

// ===============================
// STAT CARD START
// ===============================

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-emerald-100/30 bg-white/60 backdrop-blur-sm px-5 py-4 transition-all hover:bg-white/80 hover:shadow-lg hover:shadow-emerald-900/5">
      <p className="text-lg font-bold text-emerald-950 tracking-tight">
        {value}
      </p>
      <p className="text-[10px] font-medium text-emerald-900/50 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

// ===============================
// STAT CARD END
// ===============================

// ===============================
// AI CHAT PREVIEW START
// ===============================

function AIChatPreview() {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100/30 bg-white/80 backdrop-blur-xl shadow-2xl shadow-emerald-900/10">
        {/* Premium Glass Gradient Border */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-emerald-400/10 via-amber-400/5 to-emerald-400/10 pointer-events-none" />

        {/* Animated Background Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl"
        />

        {/* ===============================
            AI HEADER START
        ================================ */}

        <div className="relative flex items-center justify-between border-b border-emerald-100/30 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl animate-pulse" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-800 to-emerald-900 shadow-lg shadow-emerald-900/20">
                <Sparkles className="h-5 w-5 text-amber-300" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-emerald-950">
                  HudaVerse AI
                </h3>
                <span className="rounded-full bg-emerald-100/50 backdrop-blur-sm px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                  Verified
                </span>
              </div>

              <div className="mt-1 flex items-center gap-2 text-[11px] text-emerald-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Online
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-50/50 backdrop-blur-sm border border-emerald-100/30 px-3 py-1.5">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-bold text-emerald-950">99.8%</span>
          </div>
        </div>

        {/* ===============================
            AI HEADER END
        ================================ */}

        {/* ===============================
            CHAT BODY START
        ================================ */}

        <div className="relative space-y-4 p-5">
          {/* AI Knowledge Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50/50 backdrop-blur-sm border border-emerald-100/30 px-3 py-1">
              <Database className="h-3 w-3 text-emerald-600" />
              <span className="text-[10px] font-medium text-emerald-700">
                AI Powered by Quran + Hadith Knowledge
              </span>
            </div>
          </div>

          {/* USER MESSAGE */}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-end"
          >
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-emerald-800 to-emerald-900 px-4 py-3 text-white shadow-lg shadow-emerald-900/20">
              <div className="mb-1.5 flex items-center justify-end gap-1.5 text-[10px] text-emerald-200/80">
                <User className="h-3 w-3" />
                You
              </div>

              <p className="text-sm leading-6">
                What does Islam teach about patience?
              </p>

              <div className="mt-2 flex items-center justify-end gap-1.5 text-[9px] text-emerald-200/60">
                <Clock className="h-2.5 w-2.5" />
                <span>12:45 PM</span>
                <CheckCheck className="h-3 w-3 text-emerald-300" />
              </div>
            </div>
          </motion.div>

          {/* AI RESPONSE */}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-800 to-emerald-900 shadow-lg shadow-emerald-900/20">
              <Bot className="h-4 w-4 text-amber-300" />
            </div>

            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <h4 className="text-sm font-bold text-emerald-950">
                  HudaVerse AI
                </h4>
                <span className="rounded-full bg-amber-50/50 backdrop-blur-sm border border-amber-200/30 px-2 py-0.5 text-[9px] text-amber-700 font-medium">
                  Trusted Source
                </span>
              </div>

              <div className="rounded-2xl border border-emerald-100/30 bg-gradient-to-br from-[#fafdfb] to-white/80 backdrop-blur-sm px-4 py-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-medium">
                      AI is typing...
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-emerald-900/70">
                    Islam teaches that patience (Sabr) gives strength during
                    difficulties. Allah is with those who remain patient and
                    steadfast.
                  </p>
                </div>

                {/* Verified Sources */}

                <div className="mt-4 rounded-xl bg-emerald-50/50 backdrop-blur-sm border border-emerald-100/30 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      Verified Sources
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-100/50 px-3 py-1">
                      <CheckCircle className="h-3 w-3 text-emerald-500" />
                      <span className="text-[10px] font-medium text-emerald-800">
                        Quran 2:153
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-amber-100/50 px-3 py-1">
                      <CheckCircle className="h-3 w-3 text-amber-500" />
                      <span className="text-[10px] font-medium text-amber-800">
                        Sahih Muslim
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-100/50 px-3 py-1">
                      <CheckCircle className="h-3 w-3 text-emerald-500" />
                      <span className="text-[10px] font-medium text-emerald-800">
                        Tafsir Ibn Kathir
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===============================
            CHAT BODY END
        ================================ */}

        {/* ===============================
            QUICK ACTION START
        ================================ */}

        <div className="border-t border-emerald-100/30 px-5 py-3">
          <div className="flex flex-wrap gap-2">
            {quickActions.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 rounded-full border border-emerald-100/30 bg-white/60 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-emerald-800 transition-all hover:bg-white hover:shadow-md"
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ===============================
            QUICK ACTION END
        ================================ */}

        {/* ===============================
            INPUT BAR START
        ================================ */}

        <div className="px-5 pb-5">
          <motion.div
            whileFocusWithin={{
              boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.1)",
            }}
            className="flex items-center gap-2 rounded-full border border-emerald-200/50 bg-white/60 backdrop-blur-sm px-3 py-1.5 transition-all hover:border-emerald-300"
          >
            <MessageCircle className="h-4 w-4 text-emerald-400" />

            <input
              placeholder="Ask Quran, Hadith or Islamic questions..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-emerald-400/60"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900 text-white transition-all hover:bg-emerald-800"
            >
              <Mic className="h-3.5 w-3.5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-lg shadow-amber-400/30 transition-all hover:shadow-amber-400/50"
            >
              <Send className="h-3.5 w-3.5" />
            </motion.button>
          </motion.div>
        </div>

        {/* ===============================
            INPUT BAR END
        ================================ */}

        {/* ===============================
            TRUST FOOTER START
        ================================ */}

        <div className="flex justify-center gap-6 border-t border-emerald-100/30 px-5 py-3 text-[10px] text-emerald-600/60">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            Verified
          </span>

          <span className="flex items-center gap-1.5">
            <Lock className="h-3 w-3 text-emerald-500" />
            Secure
          </span>

          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3 w-3 text-emerald-500" />
            Quran
          </span>
        </div>

        {/* ===============================
            TRUST FOOTER END
        ================================ */}
      </div>
    </motion.div>
  );
}

// ===============================
// AI CHAT PREVIEW END
// ===============================

// ===============================
// MAIN SECTION START
// ===============================

export default function AiAssistantShowcase() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#faf8f3] via-white to-[#faf8f3] px-5 py-20 sm:px-6 lg:py-32"
    >
      {/* ===============================
          BACKGROUND DECORATION START
      ================================ */}

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-emerald-200/10 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="pointer-events-none absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-amber-200/10 blur-3xl"
      />

      {/* ===============================
          BACKGROUND DECORATION END
      ================================ */}

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* ===============================
              LEFT CONTENT START
          ================================ */}

          <div>
            {/* Badge */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-200/50 bg-white/60 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-emerald-800 shadow-sm"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg shadow-amber-400/30">
                <Sparkles className="h-3 w-3 text-emerald-950" />
              </span>
              AI Powered Islamic Assistant
            </motion.div>

            {/* Heading */}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-xl font-serif text-3xl font-bold leading-[1.2] text-emerald-950 sm:text-4xl lg:text-5xl"
            >
              Ask Islam.
              <br />
              <span className="bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent">
                Receive Authentic
              </span>
              <br />
              Answers with AI.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={
                isInView ? { opacity: 1, width: 80 } : { opacity: 0, width: 0 }
              }
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 h-1 rounded-full bg-gradient-to-r from-emerald-700 to-emerald-500"
            />

            {/* Description */}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 max-w-lg text-sm leading-7 text-emerald-900/60 sm:text-base"
            >
              AI assistance based on Quran, Hadith and authentic Islamic
              sources. Get meaningful answers with references you can trust.
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/ai-assistant"
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-amber-400/30 transition-all hover:shadow-amber-400/50 hover:scale-105"
              >
                Start Asking
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full border border-emerald-200/50 bg-white/60 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-emerald-800 transition-all hover:bg-white hover:shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                Live Demo
              </motion.button>
            </motion.div>

            {/* Feature Cards */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 grid grid-cols-2 gap-3"
            >
              {features.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                >
                  <FeatureCard item={item} />
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                >
                  <StatCard value={item.value} label={item.label} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ===============================
              LEFT CONTENT END
          ================================ */}

          {/* ===============================
              RIGHT CHAT START
          ================================ */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full"
          >
            <AIChatPreview />
          </motion.div>

          {/* ===============================
              RIGHT CHAT END
          ================================ */}
        </motion.div>
      </div>
    </section>
  );
}

// ===============================
// MAIN SECTION END
// ===============================
