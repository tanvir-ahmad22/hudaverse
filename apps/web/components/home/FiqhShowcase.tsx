"use client";

import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Search,
  HelpCircle,
  Bookmark,
  Share2,
  BookOpen,
  ScrollText,
  Users,
  ArrowRight,
  Home,
  Moon,
  Droplet,
  Scale,
  Award,
  ShieldCheck,
  MoreHorizontal,
  Sparkles,
  X,
  Clock,
  Eye,
  CheckCircle,
  Compass,
  Quote,
  Layers,
  Star,
  TrendingUp,
  Globe,
  Crown,
  Gem,
} from "lucide-react";

// ============================================================
// DATA
// ============================================================

const categories = [
  "All",
  "Prayer",
  "Purification",
  "Fasting",
  "Zakat",
  "Marriage",
  "Business",
  "Family",
];

const features = [
  {
    icon: Scale,
    title: "Daily Rulings",
    description: "Guidance for everyday situations with clarity",
    color: "from-emerald-50/80 to-emerald-100/40",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200/40",
    stat: "1,200+",
  },
  {
    icon: BookOpen,
    title: "Evidence Based",
    description: "Supported by Quran and authentic Hadith",
    color: "from-amber-50/80 to-amber-100/40",
    iconColor: "text-amber-600",
    borderColor: "border-amber-200/40",
    stat: "5,000+",
  },
  {
    icon: HelpCircle,
    title: "Easy Explanation",
    description: "Complex rulings made simple and accessible",
    color: "from-emerald-50/80 to-cyan-100/40",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200/40",
    stat: "500+",
  },
  {
    icon: Award,
    title: "Trusted Scholars",
    description: "Authentic opinions of recognized scholars",
    color: "from-amber-50/80 to-amber-100/40",
    iconColor: "text-amber-600",
    borderColor: "border-amber-200/40",
    stat: "200+",
  },
];

const floatingCards = [
  {
    icon: Home,
    label: "Prayer",
    top: "5%",
    left: "-100px",
    delay: "0s",
    color: "text-emerald-600",
  },
  {
    icon: Moon,
    label: "Ramadan",
    top: "35%",
    left: "-125px",
    delay: "1.3s",
    color: "text-amber-600",
  },
  {
    icon: Droplet,
    label: "Wudu",
    top: "65%",
    left: "-95px",
    delay: "2.1s",
    color: "text-cyan-600",
  },
  {
    icon: Scale,
    label: "Halal",
    top: "12%",
    left: "calc(100% + 20px)",
    delay: "0.6s",
    color: "text-emerald-600",
  },
  {
    icon: Compass,
    label: "Qibla",
    top: "42%",
    left: "calc(100% + 45px)",
    delay: "1.8s",
    color: "text-amber-600",
  },
  {
    icon: ShieldCheck,
    label: "Verified",
    top: "72%",
    left: "calc(100% + 15px)",
    delay: "2.6s",
    color: "text-amber-500",
  },
];

const searchQueries = [
  "Search Islamic Questions...",
  "Can I combine prayers?",
  "Is insurance halal?",
  "Can I pray while travelling?",
  "How to perform wudu?",
];

const questions = [
  {
    id: 1,
    question: "Can I combine prayers while traveling?",
    answer:
      "Travelers may combine certain obligatory prayers under specific conditions recognized in Islamic jurisprudence. The ruling is based on authentic narrations and aims to provide ease during travel...",
    tags: ["Quran", "Hadith", "Scholars"],
    bookmarks: 234,
    views: 1245,
    time: "2 min read",
    scholar: "Dr. Muhammad Al-Jibaly",
    authenticity: "Sahih",
    references: ["Surah An-Nisa, 4:101", "Hadith - Sahih Muslim 705"],
    category: "Prayer",
  },
  {
    id: 2,
    question: "Is insurance halal in Islam?",
    answer:
      "The permissibility of insurance depends on the type. Takaful (Islamic insurance) is permissible as it operates on mutual cooperation and risk-sharing principles...",
    tags: ["Business", "Finance", "Scholars"],
    bookmarks: 189,
    views: 987,
    time: "3 min read",
    scholar: "Sheikh Yusuf Al-Qaradawi",
    authenticity: "Hasan",
    references: ["Surah Al-Ma'idah, 5:2", "Fatwa - Islamic Fiqh Academy"],
    category: "Business",
  },
];

const stats = [
  { value: "12,000+", label: "Questions", icon: HelpCircle },
  { value: "40+", label: "Categories", icon: Layers },
  { value: "500+", label: "Scholars", icon: Users },
  { value: "100%", label: "Authentic", icon: ShieldCheck },
];

const trustIndicators = [
  { icon: CheckCircle, label: "Quran Based" },
  { icon: ScrollText, label: "Authentic Hadith" },
  { icon: ShieldCheck, label: "Verified Scholars" },
  { icon: Star, label: "Easy to Understand" },
];

// ============================================================
// CUSTOM HOOKS
// ============================================================

const useTypewriter = (words: string[], speed = 50) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timeout = setTimeout(
      () => {
        const word = words[currentWord];
        if (!isDeleting) {
          setCurrentText(word.substring(0, currentText.length + 1));
          if (currentText.length === word.length) {
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(true);
            }, 2000);
          }
        } else {
          setCurrentText(word.substring(0, currentText.length - 1));
          if (currentText.length === 0) {
            setIsDeleting(false);
            setCurrentWord((currentWord + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWord, words, speed, isPaused]);

  return currentText;
};

// ============================================================
// COMPONENTS
// ============================================================

// Floating Card
const FloatingCard = ({ data, index }: { data: any; index: number }) => {
  const Icon = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.12, duration: 0.5, type: "spring" }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -3, 3, 0],
        transition: { duration: 0.3 },
      }}
      className="absolute z-20 hidden w-20 cursor-pointer flex-col items-center gap-1.5 rounded-2xl border border-white/30 bg-white/90 px-2 py-3 text-center shadow-2xl shadow-emerald-900/10 backdrop-blur-xl transition-all hover:shadow-xl lg:flex"
      style={{ top: data.top, left: data.left }}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 2 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/30 to-amber-400/30 blur-md" />
          <Icon className={`relative h-5 w-5 ${data.color}`} />
        </div>
      </motion.div>
      <span className="text-[9px] font-medium leading-tight text-emerald-950">
        {data.label}
      </span>
    </motion.div>
  );
};

// Question Card
const QuestionCard = ({
  question,
  isExpanded,
  onToggle,
}: {
  question: any;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative cursor-pointer rounded-2xl border border-amber-200/50 bg-white p-4 transition-all hover:shadow-md"
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <motion.span
            whileHover={{ rotate: 10 }}
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"
          >
            <HelpCircle className="h-3 w-3" />
          </motion.span>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wide text-emerald-700">
              Question
            </p>
            <p className="text-sm font-semibold text-emerald-950">
              {question.question}
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="shrink-0 text-emerald-900/30 transition-colors hover:text-emerald-600"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          {isExpanded ? (
            <X className="h-4 w-4" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-[9px] font-semibold uppercase tracking-wide text-emerald-900/50">
              Answer Preview
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-emerald-900/60">
              {question.answer}
            </p>

            {question.references && (
              <div className="mt-3 space-y-1 rounded-lg bg-emerald-50/50 p-3">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-emerald-700">
                  References
                </p>
                {question.references.map((ref: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-[10px] text-emerald-700/60"
                  >
                    <Quote className="h-3 w-3" />
                    <span>{ref}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {question.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full border border-emerald-100 bg-white/80 px-2.5 py-1 text-[10px] text-emerald-900/60 backdrop-blur-sm"
                >
                  {tag === "Quran" && <BookOpen className="h-3 w-3" />}
                  {tag === "Hadith" && <ScrollText className="h-3 w-3" />}
                  {tag === "Scholars" && <Users className="h-3 w-3" />}
                  {tag === "Business" && <Scale className="h-3 w-3" />}
                  {tag === "Finance" && <TrendingUp className="h-3 w-3" />}
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-emerald-100/50 pt-3 text-[10px] text-emerald-600/60">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {question.time}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {question.views} views
              </span>
              <span className="flex items-center gap-1">
                <Bookmark className="h-3 w-3" />
                {question.bookmarks} saved
              </span>
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] text-emerald-700">
                <ShieldCheck className="h-3 w-3" />
                {question.authenticity}
              </span>
            </div>

            {question.scholar && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-50/80 to-amber-50/80 px-3 py-2"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-[9px] font-semibold text-white">
                  {question.scholar.charAt(0)}
                </div>
                <span className="text-[10px] text-emerald-700/70">
                  {question.scholar}
                </span>
                <span className="ml-auto text-[9px] text-emerald-600/50">
                  ✓ Verified
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Feature Card (Right Side)
const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const Icon = feature.icon;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className={`group relative overflow-hidden rounded-2xl border ${feature.borderColor} bg-gradient-to-br ${feature.color} p-3.5 shadow-sm transition-all hover:shadow-xl`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-amber-400/5 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex items-start gap-3">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm ${feature.iconColor}`}
        >
          <Icon className="h-4.5 w-4.5" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-emerald-950 truncate">
              {feature.title}
            </p>
            <span className="text-[10px] font-medium text-emerald-600/50 shrink-0">
              {feature.stat}
            </span>
          </div>
          <p className="mt-0.5 text-xs leading-relaxed text-emerald-900/50 line-clamp-2">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Stat Counter
const StatCounter = ({
  value,
  label,
  icon: Icon,
  index,
}: {
  value: string;
  label: string;
  icon: any;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/[^0-9]/g, ""));

  useEffect(() => {
    if (isInView && target > 0) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
      className="flex flex-col items-center text-center"
    >
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-emerald-400" />
        <div className="text-lg font-bold text-emerald-950">
          {isInView ? count.toLocaleString() : "0"}
          {value.includes("+") && "+"}
          {value.includes("%") && "%"}
        </div>
      </div>
      <div className="mt-0.5 text-[10px] text-emerald-600/60">{label}</div>
    </motion.div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function FiqhShowcase() {
  const [mounted, setMounted] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  const typedText = useTypewriter(searchQueries, 45);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let filtered = questions;

    if (activeCategory !== "All") {
      filtered = filtered.filter((q) => q.category === activeCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredQuestions(filtered);
  }, [searchQuery, activeCategory]);

  const toggleQuestion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#faf8f3] via-white to-[#faf8f3] px-4 py-16 sm:px-6 lg:py-24"
    >
      {/* ===== BACKGROUND LAYERS ===== */}

      <div className="pointer-events-none absolute left-1/4 top-10 h-96 w-96 rounded-full bg-emerald-200/15 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 h-96 w-96 rounded-full bg-amber-200/15 blur-3xl" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(16,185,129,0.08) 40px, rgba(16,185,129,0.08) 41px),
            repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(16,185,129,0.08) 40px, rgba(16,185,129,0.08) 41px)
          `,
        }}
      />

      {/* Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background:
              i % 2 === 0 ? "rgba(16,185,129,0.15)" : "rgba(251,191,36,0.15)",
          }}
          animate={{
            y: [-30, -120, -30],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ===== MAIN GRID - সমান সাইজ ===== */}

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* ===== LEFT: PHONE MOCKUP ===== */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative">
              {/* Floating Cards */}
              {floatingCards.map((card, i) => (
                <FloatingCard key={card.label} data={card} index={i} />
              ))}

              {/* Main Card */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-gradient-to-b from-white to-emerald-50/30 p-4 shadow-[0_20px_60px_-15px_rgba(6,78,59,0.25)] sm:p-6"
              >
                {/* Decorative Blurs */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-200/20 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-emerald-200/20 blur-2xl" />
                <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-br from-emerald-400/10 via-transparent to-amber-400/10" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300 shadow-md"
                      >
                        <BookOpen className="h-5 w-5" />
                      </motion.div>
                      <div>
                        <p className="text-sm font-semibold text-emerald-950">
                          Fiqh Guide
                        </p>
                        <motion.p
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-1 text-xs text-emerald-700"
                        >
                          <ShieldCheck className="h-3 w-3" />
                          Verified Sources
                        </motion.p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-lg p-1.5 text-emerald-900/40 transition-colors hover:bg-emerald-100/50"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </motion.button>
                  </div>

                  {/* Search Bar */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative mt-4"
                  >
                    <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2.5 shadow-sm transition-all focus-within:shadow-md focus-within:ring-2 focus-within:ring-emerald-200">
                      <Search className="h-4 w-4 text-emerald-900/40" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={typedText}
                        className="w-full bg-transparent text-xs text-emerald-900/80 placeholder:text-emerald-900/40 focus:outline-none"
                      />
                      <motion.div
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="h-4 w-0.5 bg-emerald-400"
                      />
                    </div>
                  </motion.div>

                  {/* Categories */}
                  <div className="relative mt-3 flex flex-wrap gap-1.5">
                    {categories.map((cat) => (
                      <motion.button
                        key={cat}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCategory(cat)}
                        className={`rounded-full px-3 py-1.5 text-[10px] font-medium transition-all ${
                          activeCategory === cat
                            ? "bg-gradient-to-r from-emerald-700 to-emerald-900 text-white shadow-md"
                            : "border border-emerald-100 bg-white text-emerald-900/60 hover:bg-emerald-50"
                        }`}
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </div>

                  {/* Questions */}
                  <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-emerald-200">
                    {filteredQuestions.map((q) => (
                      <QuestionCard
                        key={q.id}
                        question={q}
                        isExpanded={expandedId === q.id}
                        onToggle={() => toggleQuestion(q.id)}
                      />
                    ))}

                    {filteredQuestions.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-2xl border border-dashed border-emerald-200 p-8 text-center"
                      >
                        <p className="text-sm text-emerald-600/60">
                          No questions found
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="relative mt-4 grid grid-cols-3 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 py-2.5 text-[10px] font-semibold text-amber-300 shadow-md transition hover:shadow-lg"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Read Full
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#f0fdf4" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-1 rounded-xl border border-emerald-100 py-2.5 text-[10px] text-emerald-900/60 transition hover:bg-emerald-50"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#f0fdf4" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-1 rounded-xl border border-emerald-100 py-2.5 text-[10px] text-emerald-900/60 transition hover:bg-emerald-50"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      Share
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ===== RIGHT: CONTENT (সমান সাইজ) ===== */}

          <div className="flex flex-col justify-center space-y-5">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-emerald-50 to-amber-50 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm border border-emerald-200/30"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Fiqh Guide
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-serif text-2xl font-bold leading-tight text-emerald-950 sm:text-3xl lg:text-4xl"
            >
              Practice Islam With{" "}
              <motion.span
                initial={{ backgroundSize: "0% 100%" }}
                animate={{ backgroundSize: "100% 100%" }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
                className="bg-gradient-to-r from-amber-400 to-amber-500 bg-no-repeat pb-0.5 text-amber-500"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #fbbf24, #f59e0b)",
                }}
              >
                Confidence
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="max-w-lg text-sm leading-relaxed text-emerald-800/60"
            >
              Find authentic rulings for everyday life through trusted scholars,
              clear explanations, and evidence from the Quran and Sunnah.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="grid grid-cols-2 gap-2 rounded-2xl border border-emerald-200/20 bg-white/80 p-3 backdrop-blur-sm sm:grid-cols-4"
            >
              {stats.map((stat, i) => (
                <StatCounter key={stat.label} {...stat} index={i} />
              ))}
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {features.map((feature, i) => (
                <FeatureCard key={feature.title} feature={feature} index={i} />
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="rounded-2xl border border-emerald-200/20 bg-white/80 p-3 backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                {trustIndicators.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.05, duration: 0.3 }}
                    className="flex items-center gap-1.5"
                  >
                    <item.icon className="h-3 w-3 text-emerald-500" />
                    <span className="text-[11px] text-emerald-700/60">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Link
                href="/fiqh"
                className="group inline-block w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-emerald-700 to-emerald-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all hover:shadow-xl hover:shadow-emerald-900/40 sm:w-auto"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-emerald-400/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                    initial={false}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    Explore Fiqh
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
