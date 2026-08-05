"use client";

import Link from "next/link";
import {
  motion,
  type Variants,
  TargetAndTransition,
  Easing,
} from "framer-motion";
import {
  Search,
  Bookmark,
  Heart,
  Share2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Library,
  User,
  Hash,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles,
  Award,
  Layers,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Instantly discover authentic narrations.",
  },
  {
    icon: Library,
    title: "Collections",
    description: "Browse famous Hadith books beautifully.",
  },
  {
    icon: ShieldCheck,
    title: "Authenticity",
    description: "Verified sources and references.",
  },
  {
    icon: Bookmark,
    title: "Bookmarks",
    description: "Save Hadith for future reading.",
  },
];

const tabs = ["All", "Sahih", "Hasan", "Bookmarks", "Recent"];

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const floatingBadgeVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: custom,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const easeInOut: Easing = "easeInOut";

const floatingYAnimation: TargetAndTransition = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: easeInOut,
  },
};

const floatingYAnimation2: TargetAndTransition = {
  y: [0, 8, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: easeInOut,
    delay: 1,
  },
};

const floatingYAnimation3: TargetAndTransition = {
  y: [0, -6, 0],
  transition: {
    duration: 4.5,
    repeat: Infinity,
    ease: easeInOut,
    delay: 0.5,
  },
};

export default function HadithShowcase() {
  const [activeTab, setActiveTab] = useState("All");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShare = () => {
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-[#faf8f3] px-6 py-20 md:py-24">
      {/* Background Elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 -translate-x-1/3 -translate-y-1/3 rounded-full bg-emerald-200/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: Text content + features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="order-2 lg:order-1"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200/50"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Authentic Hadith
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 font-serif text-3xl font-bold leading-tight text-emerald-950 sm:text-4xl lg:text-5xl"
          >
            Discover The Timeless{" "}
            <span className="relative">
              <span className="relative z-10 text-amber-500">Wisdom</span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-1 left-0 h-2 w-full bg-amber-200/40"
              />
            </span>{" "}
            Of Prophet Muhammad <span className="text-2xl">ﷺ</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-lg text-sm leading-relaxed text-emerald-900/60 md:text-base"
          >
            Explore authentic Hadith collections through a beautiful reading
            experience featuring trusted narrations, intelligent search,
            collections and verified references.
          </motion.p>

          {/* Feature grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  className="group flex items-start gap-3 rounded-2xl border border-emerald-900/5 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-amber-200/30 hover:shadow-md hover:shadow-emerald-900/5"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-emerald-800 to-emerald-950 text-amber-300 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-900/20"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-950">
                      {feature.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-emerald-900/50">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/hadith"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-emerald-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:bg-emerald-800 hover:shadow-emerald-900/30 hover:shadow-xl"
            >
              Start Exploring Hadith
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: Hadith card with floating badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 mx-auto w-full max-w-md lg:order-2"
        >
          {/* Floating Badges */}

          <motion.div
            custom={0.3}
            variants={floatingBadgeVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="pointer-events-none absolute -left-16 top-8 z-20 hidden lg:flex"
          >
            <motion.div
              animate={floatingYAnimation}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-emerald-900/5 bg-white px-2.5 py-3 text-center shadow-lg shadow-emerald-900/10"
            >
              <Library className="h-5 w-5 text-amber-500" />
              <span className="text-[10px] font-medium leading-tight text-emerald-950">
                Sahih Bukhari
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            custom={0.5}
            variants={floatingBadgeVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="pointer-events-none absolute -left-12 top-36 z-20 hidden lg:flex"
          >
            <motion.div
              animate={floatingYAnimation2}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-emerald-900/5 bg-white px-2.5 py-3 text-center shadow-lg shadow-emerald-900/10"
            >
              <Award className="h-5 w-5 text-amber-500" />
              <span className="text-[10px] font-medium leading-tight text-emerald-950">
                Authentic
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            custom={0.4}
            variants={floatingBadgeVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="pointer-events-none absolute -right-12 top-20 z-20 hidden lg:flex"
          >
            <motion.div
              animate={floatingYAnimation3}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-emerald-900/5 bg-white px-2.5 py-3 text-center shadow-lg shadow-emerald-900/10"
            >
              <Layers className="h-5 w-5 text-amber-500" />
              <span className="text-[10px] font-medium leading-tight text-emerald-950">
                Saved Collection
              </span>
            </motion.div>
          </motion.div>

          {/* Hadith Card */}
          <motion.div
            whileHover={{
              y: -4,
              transition: { duration: 0.3 },
            }}
            className="relative z-10 overflow-hidden rounded-[2rem] border border-emerald-900/5 bg-white p-5 shadow-[0_25px_60px_-15px_rgba(6,78,59,0.15)] transition-shadow duration-300 hover:shadow-[0_35px_80px_-15px_rgba(6,78,59,0.2)]"
          >
            {/* Islamic Geometric Pattern Background */}
            <div className="pointer-events-none absolute inset-0 opacity-[2%]">
              <div className="h-full w-full bg-[radial-gradient(#065f46_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
            </div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-800 to-emerald-950 text-amber-300 shadow-lg shadow-emerald-900/20"
                >
                  <BookOpen className="h-4 w-4" />
                </motion.div>
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-emerald-950">
                    Sahih al-Bukhari
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-medium text-amber-700 ring-1 ring-amber-200/50">
                      Authentic
                    </span>
                  </p>
                  <p className="text-[11px] text-emerald-900/50">
                    Book of Revelation
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-medium text-emerald-700">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: easeInOut,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  />
                  Online
                </span>
              </div>
            </motion.div>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="group relative mt-4 flex items-center gap-2 overflow-hidden rounded-full border border-emerald-100 bg-white px-4 py-2.5 transition-all duration-300 focus-within:border-amber-300 focus-within:shadow-md focus-within:shadow-amber-200/20"
            >
              <Search className="h-4 w-4 text-emerald-900/40 transition-colors duration-300 group-focus-within:text-amber-500" />
              <input
                type="text"
                placeholder="Search Hadith, narrator, topic..."
                className="flex-1 bg-transparent text-xs text-emerald-900 placeholder:text-emerald-900/40 focus:outline-none"
              />
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-900/30 transition-colors duration-300 hover:text-amber-500" />
              </motion.div>
            </motion.div>

            {/* Filter tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-3 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide"
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-emerald-900 text-white shadow-lg shadow-emerald-900/20"
                      : "border border-emerald-100 bg-white text-emerald-900/60 hover:border-emerald-200 hover:bg-emerald-50"
                  }`}
                >
                  {activeTab === tab && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-emerald-900"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Hadith text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="relative mt-4 overflow-hidden rounded-2xl border border-amber-200/40 bg-linear-to-br from-amber-50/30 to-emerald-50/30 p-4 text-center transition-all duration-300 hover:border-amber-300/40"
            >
              <div className="absolute right-3 top-2 text-[10px] font-medium text-amber-500/60">
                #42
              </div>
              <div className="relative">
                <p
                  className="font-serif text-xl leading-loose text-emerald-950 md:text-2xl"
                  dir="rtl"
                >
                  إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ
                </p>
                <div className="my-3 flex items-center gap-3">
                  <div className="h-px flex-1 bg-linear-to-r from-transparent via-amber-300/30 to-transparent" />
                  <span className="text-amber-400">✦</span>
                  <div className="h-px flex-1 bg-linear-to-r from-transparent via-amber-300/30 to-transparent" />
                </div>
                <p className="font-serif text-sm font-semibold text-emerald-950 md:text-base">
                  &ldquo;Actions are judged by intentions.&rdquo;
                </p>
                <motion.div
                  animate={{ height: isExpanded ? "auto" : "3em" }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <p className="mt-2 text-xs leading-relaxed text-emerald-900/55 md:text-sm">
                    The reward of deeds depends upon the intentions and each
                    person will get the reward according to what he has
                    intended. So whoever emigrated for worldly benefits or for a
                    woman to marry, his emigration was for what he emigrated
                    for.
                  </p>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 transition-colors hover:text-amber-700"
                >
                  {isExpanded ? "Show Less" : "Read More"}
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>

            {/* Narrator / Reference / Grade */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-emerald-50/30 p-3"
            >
              {[
                {
                  icon: User,
                  label: "Narrator",
                  value: "Umar (RA)",
                  color: "text-emerald-950",
                },
                {
                  icon: Hash,
                  label: "Reference",
                  value: "Bukhari 1",
                  color: "text-amber-600",
                },
                {
                  icon: CheckCircle2,
                  label: "Grade",
                  value: "Sahih",
                  color: "text-emerald-600",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-1.5 text-[10px]"
                  >
                    <Icon className="h-3 w-3 text-emerald-900/40" />
                    <div>
                      <p className="text-emerald-900/40">{item.label}</p>
                      <p className={`font-medium ${item.color}`}>
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-4 grid grid-cols-[1fr_1fr_1fr_1.3fr] gap-2"
            >
              {[
                {
                  icon: Bookmark,
                  label: "Bookmark",
                  active: isBookmarked,
                  onClick: () => setIsBookmarked(!isBookmarked),
                  activeColor: "text-amber-500",
                },
                {
                  icon: Heart,
                  label: "Favorite",
                  active: isFavorited,
                  onClick: () => setIsFavorited(!isFavorited),
                  activeColor: "text-rose-500",
                },
                {
                  icon: Share2,
                  label: "Share",
                  active: isShared,
                  onClick: handleShare,
                  activeColor: "text-emerald-500",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={item.onClick}
                    className={`relative flex flex-col items-center gap-1 rounded-xl border py-2 transition-all duration-300 ${
                      item.active
                        ? "border-amber-200/50 bg-amber-50/50 shadow-sm"
                        : "border-emerald-100 bg-white hover:border-emerald-200 hover:bg-emerald-50"
                    }`}
                  >
                    <motion.div
                      animate={
                        item.active
                          ? {
                              scale: [1, 1.2, 1],
                              transition: { duration: 0.4 },
                            }
                          : {}
                      }
                    >
                      <Icon
                        className={`h-3.5 w-3.5 transition-colors duration-300 ${
                          item.active ? item.activeColor : "text-emerald-900/50"
                        }`}
                      />
                    </motion.div>
                    <span
                      className={`text-[9px] transition-colors duration-300 ${
                        item.active ? "text-emerald-800" : "text-emerald-900/50"
                      }`}
                    >
                      {item.active && item.label === "Share"
                        ? "Copied!"
                        : item.label}
                    </span>
                  </motion.button>
                );
              })}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-linear-to-br from-emerald-800 to-emerald-950 py-2 text-[10px] font-semibold text-amber-300 shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:shadow-emerald-900/30"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Read More
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
