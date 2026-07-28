"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  BookMarked,
  Bookmark,
  Play,
  Pause,
  MoreVertical,
  Globe2,
  Search,
  Headphones,
  ArrowRight,
  Clock,
  Flame,
  Sparkles,
  ChevronRight,
  Volume2,
  CheckCircle2,
  Shield,
  Crown,
  Star,
  Layers,
  BookOpen,
  Eye,
  Share2,
  Award,
  Heart,
} from "lucide-react";

// ================================
// Animation Variants
// ================================

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const floatAnimation = (delay = 0, yOffset = 8) => ({
  initial: { y: 0 },
  animate: {
    y: [0, -yOffset, 0],
    transition: {
      duration: 3 + Math.random() * 1.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  },
});

const glowPulse = {
  initial: { opacity: 0.15 },
  animate: {
    opacity: [0.15, 0.3, 0.15],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const slowDrift = {
  initial: { x: 0, y: 0 },
  animate: {
    x: [0, 10, 0, -10, 0],
    y: [0, -5, 0, 5, 0],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ================================
// Constants
// ================================

const SURAH_INFO = {
  number: 1,
  arabicName: "الْفَاتِحَة",
  englishName: "Al-Fatihah",
  totalAyahs: 7,
  revelationType: "Makki",
  juz: 1,
};

const AYAH_DATA = [
  {
    number: 1,
    text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful.",
  },
  {
    number: 2,
    text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of all the worlds.",
  },
  {
    number: 3,
    text: "الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "The Most Gracious, the Most Merciful.",
  },
  {
    number: 4,
    text: "مَالِكِ يَوْمِ الدِّينِ",
    translation: "Master of the Day of Judgment.",
  },
  {
    number: 5,
    text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translation: "You alone we worship, and You alone we ask for help.",
  },
];

const features = [
  {
    icon: Search,
    title: "Powerful Search",
    description: "Find verses instantly",
  },
  {
    icon: Headphones,
    title: "Audio Recitation",
    description: "Listen beautifully",
  },
  {
    icon: Globe2,
    title: "Multiple Translations",
    description: "20+ trusted translations",
  },
  {
    icon: Bookmark,
    title: "Personal Bookmarks",
    description: "Save your favorites",
  },
];

const stats = [
  { value: 114, label: "Surahs", icon: BookMarked },
  { value: 6236, label: "Verses", icon: Layers },
  { value: 30, label: "Juz", icon: Star },
  { value: 0, label: "Free Forever", icon: Heart },
];

// ================================
// Helper Components
// ================================

const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-200/50 bg-white/80 px-3 py-1 text-[11px] font-medium text-emerald-800 backdrop-blur-sm shadow-sm ${className}`}
  >
    {children}
  </span>
);

const GlowOrb = ({ className = "" }: { className?: string }) => (
  <div
    className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
  />
);

const GlassDivider = () => (
  <div className="my-3 h-px bg-gradient-to-r from-transparent via-emerald-900/8 to-transparent" />
);

// ================================
// FloatingBadge
// ================================

const FloatingBadge = ({
  icon: Icon,
  label,
  delay = 0,
  className = "",
  yOffset = 8,
}: {
  icon: React.ElementType;
  label: string;
  delay?: number;
  className?: string;
  yOffset?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    variants={floatAnimation(delay * 0.3, yOffset)}
    whileHover={{ scale: 1.05, y: -4 }}
    className={`absolute z-20 flex items-center gap-2 rounded-xl border border-emerald-900/5 bg-white/80 px-3 py-1.5 shadow-lg backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl ${className}`}
  >
    <div className="rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100/70 p-1">
      <Icon className="h-3 w-3 text-emerald-700" />
    </div>
    <span className="text-[10px] font-medium text-emerald-950">{label}</span>
    <motion.div
      variants={glowPulse}
      className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 to-amber-500/5 opacity-0 transition-opacity duration-300 hover:opacity-100"
    />
  </motion.div>
);

// ================================
// StatCard
// ================================

const StatCard = ({
  value,
  label,
  icon: Icon,
  index,
}: {
  value: number;
  label: string;
  icon: React.ElementType;
  index: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          if (value === 0) {
            setCount(0);
            return;
          }
          let start = 0;
          const end = value;
          const duration = 1200;
          const increment = Math.max(1, Math.floor(end / 50));

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, duration / 50);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 + index * 0.04, duration: 0.3 }}
      className="group flex items-center gap-2 rounded-lg p-1.5 transition-all duration-300 hover:bg-emerald-50/30"
    >
      <div className="rounded-lg bg-emerald-50/50 p-1.5 transition-colors duration-300 group-hover:bg-emerald-100/50">
        <Icon className="h-3.5 w-3.5 text-emerald-700" />
      </div>
      <div>
        <p className="font-serif text-base font-bold text-emerald-950 tabular-nums">
          {value === 0 ? "100%" : count.toLocaleString() + "+"}
        </p>
        <p className="text-[9px] font-medium text-emerald-900/40 uppercase tracking-wider">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

// ================================
// InteractiveButton
// ================================

const InteractiveButton = ({
  icon: Icon,
  label,
  onClick,
  isActive = false,
  activeColor = "text-emerald-700",
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  activeColor?: string;
}) => {
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }
    onClick?.();
  };

  return (
    <div className="relative group">
      <motion.button
        ref={buttonRef}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(6,95,70,0.06)" }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className={`relative rounded-full p-1.5 transition-all duration-200 ${
          isActive
            ? `bg-emerald-50 ${activeColor}`
            : "text-emerald-900/40 hover:text-emerald-700"
        }`}
        aria-label={label}
      >
        <Icon className="h-3.5 w-3.5" />
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-emerald-400/30"
            style={{
              left: ripple.x - 12,
              top: ripple.y - 12,
              width: 24,
              height: 24,
            }}
          />
        ))}
      </motion.button>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-emerald-950/90 px-1.5 py-0.5 text-[8px] text-white/90 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        {label}
      </motion.div>
    </div>
  );
};

// ================================
// AudioPlayer
// ================================

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(28);
  const duration = 128;

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, duration]);

  return (
    <div className="rounded-lg bg-gradient-to-br from-emerald-50/40 to-emerald-100/20 p-2.5">
      <div className="flex items-center gap-2.5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-700 to-emerald-950 text-white shadow-md shadow-emerald-900/20"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-sm" />
          {isPlaying ? (
            <Pause className="relative h-3.5 w-3.5" />
          ) : (
            <Play className="relative h-3.5 w-3.5 fill-current" />
          )}
        </motion.button>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-emerald-950">
              Mishary Al-Afasy
            </span>
            <span className="text-[9px] text-emerald-900/40">
              {Math.floor(currentTime / 60)}:
              {String(currentTime % 60).padStart(2, "0")} /{" "}
              {Math.floor(duration / 60)}:
              {String(duration % 60).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-emerald-200/50">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentTime / duration) * 100}%` }}
              transition={{ duration: 0.1 }}
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-500"
            />
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={isPlaying ? { height: [3, 6, 3] } : { height: 3 }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.12,
                  }}
                  className="w-0.5 rounded-full bg-emerald-500/40"
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[1, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  className={`text-[8px] font-medium transition-colors ${
                    speed === 1
                      ? "text-emerald-700"
                      : "text-emerald-900/30 hover:text-emerald-900/60"
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>
        <Volume2 className="h-3 w-3 text-emerald-900/30" />
      </div>
    </div>
  );
};

// ================================
// IslamicPattern
// ================================

const IslamicPattern = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Primary geometric pattern - centered behind Quran card */}
      <motion.div
        variants={slowDrift}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <svg
          width="600"
          height="600"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-[0.04]"
        >
          {/* Eight-pointed star pattern */}
          <g>
            {/* Outer star */}
            <path
              d="M300 30L337.5 97.5L412.5 67.5L390 142.5L465 150L427.5 217.5L502.5 247.5L450 300L502.5 352.5L427.5 382.5L465 450L390 457.5L412.5 532.5L337.5 502.5L300 570L262.5 502.5L187.5 532.5L210 457.5L135 450L172.5 382.5L97.5 352.5L150 300L97.5 247.5L172.5 217.5L135 150L210 142.5L187.5 67.5L262.5 97.5L300 30Z"
              stroke="#D4AF37"
              strokeWidth="1.5"
              opacity="0.6"
            />

            {/* Inner star */}
            <path
              d="M300 90L325 142.5L382.5 127.5L367.5 187.5L427.5 195L402.5 247.5L457.5 277.5L412.5 300L457.5 322.5L402.5 352.5L427.5 405L367.5 412.5L382.5 472.5L325 457.5L300 510L275 457.5L217.5 472.5L232.5 412.5L172.5 405L197.5 352.5L142.5 322.5L187.5 300L142.5 277.5L197.5 247.5L172.5 195L232.5 187.5L217.5 127.5L275 142.5L300 90Z"
              stroke="#154D40"
              strokeWidth="1.2"
              opacity="0.4"
            />

            {/* Diamond patterns */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const r = 200;
              const x = 300 + r * Math.cos(rad);
              const y = 300 + r * Math.sin(rad);
              return (
                <g key={i} transform={`translate(${x - 30}, ${y - 30})`}>
                  <rect
                    x="0"
                    y="0"
                    width="60"
                    height="60"
                    transform="rotate(45 30 30)"
                    stroke="#D4AF37"
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.3"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="8"
                    stroke="#154D40"
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.2"
                  />
                </g>
              );
            })}

            {/* Concentric circles */}
            <circle
              cx="300"
              cy="300"
              r="160"
              stroke="#154D40"
              strokeWidth="0.8"
              opacity="0.15"
              strokeDasharray="4 8"
            />
            <circle
              cx="300"
              cy="300"
              r="260"
              stroke="#D4AF37"
              strokeWidth="0.8"
              opacity="0.1"
              strokeDasharray="2 12"
            />

            {/* Corner arabesque elements */}
            {[
              { x: 20, y: 20 },
              { x: 580, y: 20 },
              { x: 20, y: 580 },
              { x: 580, y: 580 },
            ].map((pos, i) => (
              <g key={`corner-${i}`}>
                <path
                  d={`M${pos.x} ${pos.y} Q${pos.x + 40} ${pos.y + 40} ${pos.x + 80} ${pos.y}`}
                  stroke="#D4AF37"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.2"
                />
                <path
                  d={`M${pos.x} ${pos.y} Q${pos.x + 20} ${pos.y + 60} ${pos.x} ${pos.y + 80}`}
                  stroke="#154D40"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.15"
                />
              </g>
            ))}
          </g>
        </svg>
      </motion.div>

      {/* Secondary pattern - subtle mesh overlay */}
      <motion.div
        variants={slowDrift}
        className="absolute inset-0"
        style={{ animationDelay: "-5s" }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-[0.015]"
        >
          <pattern
            id="mesh"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0 L50 100 M0 50 L100 50"
              stroke="#154D40"
              strokeWidth="0.5"
            />
            <path
              d="M25 25 L75 75 M25 75 L75 25"
              stroke="#D4AF37"
              strokeWidth="0.3"
            />
            <circle
              cx="50"
              cy="50"
              r="3"
              stroke="#154D40"
              strokeWidth="0.5"
              fill="none"
            />
          </pattern>
          <rect width="1000" height="1000" fill="url(#mesh)" />
        </svg>
      </motion.div>

      {/* Light sweep effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
      />
    </div>
  );
};

// ================================
// QuranCard
// ================================

const QuranCard = () => {
  const [hoveredAyah, setHoveredAyah] = useState<number | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [showBookmarkConfirm, setShowBookmarkConfirm] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(28);
  const cardRef = useRef<HTMLDivElement>(null);
  const duration = 128;

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    setShowBookmarkConfirm(true);
    setTimeout(() => setShowBookmarkConfirm(false), 2000);
  };

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, duration]);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeInScale}
      className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-emerald-900/5 bg-white/80 shadow-[0_20px_50px_-12px_rgba(6,78,59,0.12)] backdrop-blur-xl hover:shadow-[0_25px_60px_-12px_rgba(6,78,59,0.18)] transition-shadow duration-500"
    >
      {/* Card glow */}
      <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-amber-500/5 blur-2xl" />
      <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-emerald-500/5 blur-2xl" />
      <motion.div
        variants={glowPulse}
        className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/5 blur-3xl"
      />

      <div className="relative p-5">
        {/* ================================
        Card Header
        ================================ */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-700 to-emerald-950 blur-sm opacity-30" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-700 to-emerald-950 text-amber-300 shadow-md shadow-emerald-900/20">
                <BookMarked className="h-4 w-4" />
              </div>
            </motion.div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-serif text-sm font-semibold text-emerald-950">
                  Al Quran
                </p>
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              </div>
              <div className="flex items-center gap-1">
                <p className="text-[10px] text-emerald-900/40">
                  {SURAH_INFO.arabicName}
                </p>
                <span className="text-[8px] text-emerald-900/20">•</span>
                <p className="text-[10px] text-emerald-900/40">
                  {SURAH_INFO.englishName}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <InteractiveButton
              icon={Bookmark}
              label="Bookmark"
              onClick={handleBookmark}
              isActive={bookmarked}
              activeColor="text-amber-500"
            />
            <InteractiveButton
              icon={isPlaying ? Pause : Play}
              label={isPlaying ? "Pause" : "Play"}
              onClick={() => setIsPlaying(!isPlaying)}
              isActive={isPlaying}
              activeColor="text-emerald-600"
            />
            <InteractiveButton icon={Share2} label="Share" />
            <InteractiveButton icon={MoreVertical} label="More" />
          </div>
        </div>

        {/* Surah info */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {[
            { icon: Star, label: `Surah ${SURAH_INFO.number}` },
            { icon: Layers, label: `${SURAH_INFO.totalAyahs} Ayahs` },
            { icon: Globe2, label: SURAH_INFO.revelationType },
            { icon: BookOpen, label: `Juz ${SURAH_INFO.juz}` },
          ].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-emerald-50/50 px-2 py-0.5 text-[9px] font-medium text-emerald-700/70"
            >
              <item.icon className="h-2.5 w-2.5" />
              {item.label}
            </span>
          ))}
        </div>

        <GlassDivider />

        {/* ================================
        Arabic Area
        ================================ */}
        <div className="space-y-2.5 text-center">
          {AYAH_DATA.map((ayah, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + idx * 0.06 }}
              onMouseEnter={() => setHoveredAyah(idx)}
              onMouseLeave={() => setHoveredAyah(null)}
              className={`group relative flex items-center justify-center gap-1.5 rounded-lg px-2 py-1 transition-all duration-300 ${
                hoveredAyah === idx ? "bg-emerald-50/80 shadow-sm" : ""
              }`}
            >
              <motion.span
                animate={{
                  scale: hoveredAyah === idx ? 1.15 : 1,
                  backgroundColor:
                    hoveredAyah === idx
                      ? "rgb(245, 158, 11)"
                      : "rgb(245, 158, 11, 0.08)",
                  color: hoveredAyah === idx ? "white" : "rgb(245, 158, 11)",
                  boxShadow:
                    hoveredAyah === idx
                      ? "0 4px 12px rgba(245, 158, 11, 0.3)"
                      : "none",
                }}
                transition={{ duration: 0.2 }}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-medium transition-shadow duration-200"
              >
                {ayah.number}
              </motion.span>

              <motion.p
                animate={{
                  scale: hoveredAyah === idx ? 1.02 : 1,
                  color:
                    hoveredAyah === idx ? "rgb(6, 78, 59)" : "rgb(6, 78, 59)",
                }}
                transition={{ duration: 0.2 }}
                className="font-serif text-base leading-[2] text-emerald-950 transition-all duration-300 group-hover:text-emerald-800"
                dir="rtl"
              >
                {ayah.text}
              </motion.p>

              <AnimatePresence>
                {hoveredAyah === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    className="absolute bottom-full left-1/2 z-10 mb-1.5 w-40 -translate-x-1/2 rounded-lg bg-emerald-950/90 px-2.5 py-1 text-center text-[9px] text-white/90 backdrop-blur-sm shadow-lg"
                  >
                    {ayah.translation}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <GlassDivider />

        {/* ================================
        Translation
        ================================ */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-emerald-50/60 to-emerald-100/20 px-3 py-2 text-center backdrop-blur-sm transition-all duration-300 hover:border-emerald-200/30 hover:shadow-sm"
        >
          <div className="absolute inset-0 bg-emerald-200/10 blur-lg transition-opacity duration-300 group-hover:opacity-50" />
          <p className="relative text-xs font-medium leading-relaxed text-emerald-900 transition-colors duration-300 group-hover:text-emerald-800">
            "{AYAH_DATA[1].translation}"
          </p>
          <div className="relative mt-1 flex items-center justify-center gap-1.5 text-[9px] text-emerald-900/40 transition-colors duration-300 group-hover:text-emerald-900/60">
            <Sparkles className="h-2.5 w-2.5" />
            <span>Sahih International</span>
          </div>
        </motion.div>

        <GlassDivider />

        {/* ================================
        Reading & Audio
        ================================ */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-amber-100/40 p-1">
                <Flame className="h-3 w-3 text-amber-600" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-medium text-emerald-950">
                  7 day streak
                </span>
                <span className="text-[8px] text-emerald-900/30">•</span>
                <span className="text-[9px] text-emerald-900/40">
                  3 min read
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-emerald-900/30">
              <Eye className="h-3 w-3" />
              <span>Today</span>
            </div>
          </div>

          <AudioPlayer />

          <div className="flex items-center justify-between border-t border-emerald-900/5 pt-2">
            <div className="flex items-center gap-1.5 text-[9px] text-emerald-900/30">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-100/50 text-[7px] text-amber-600">
                ۩
              </span>
              Ayah {AYAH_DATA[0].number}-
              {AYAH_DATA[AYAH_DATA.length - 1].number}
            </div>
            <div className="flex items-center gap-2 text-[9px] text-emerald-900/30">
              <Shield className="h-3 w-3" />
              <span>Verified</span>
              <Award className="h-3 w-3" />
              <span>Authentic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bookmark confirmation */}
      <AnimatePresence>
        {showBookmarkConfirm && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-lg bg-emerald-950/90 px-4 py-2 text-white/90 backdrop-blur-sm shadow-lg"
          >
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              {bookmarked ? "✓ Saved to Bookmarks" : "✕ Removed from Bookmarks"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ================================
// Main Component
// ================================

export default function QuranShowcase() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] overflow-hidden bg-[#f7f9f6] px-4 py-12 sm:px-6 md:py-16 lg:py-20"
    >
      {/* ================================
      Islamic Pattern Background
      ================================ */}
      <IslamicPattern />

      {/* ================================
      Background Effects
      ================================ */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, #065f46 1px, transparent 1px),
            radial-gradient(circle at 80% 50%, #065f46 1px, transparent 1px),
            radial-gradient(circle at 50% 20%, #065f46 1px, transparent 1px),
            radial-gradient(circle at 50% 80%, #065f46 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0, 30px 0, 0 30px, 30px 30px",
        }}
      />

      <GlowOrb
        className="left-0 top-0 h-[400px] w-[400px] -translate-x-1/4 -translate-y-1/4 bg-emerald-300/12"
        style={{
          transform: `translate(${mousePosition.x * -8}px, ${mousePosition.y * -8}px)`,
        }}
      />
      <GlowOrb
        className="right-0 bottom-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 bg-amber-200/8"
        style={{
          transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
        }}
      />
      <GlowOrb className="left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 bg-emerald-400/4" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* ================================
          Left Column - Quran Card
          ================================ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex w-full items-center justify-center py-4"
          >
            {/* Floating Badges */}
            <FloatingBadge
              icon={Bookmark}
              label="Bookmark Saved"
              delay={0.2}
              yOffset={6}
              className="left-0 top-2 hidden sm:flex lg:top-6"
            />
            <FloatingBadge
              icon={Headphones}
              label="Audio Playing"
              delay={0.4}
              yOffset={7}
              className="bottom-16 left-0 hidden sm:flex"
            />
            <FloatingBadge
              icon={Globe2}
              label="Translation Ready"
              delay={0.3}
              yOffset={5}
              className="right-1 top-1/2 hidden -translate-y-1/2 lg:flex"
            />
            <FloatingBadge
              icon={Sparkles}
              label="AI Insight"
              delay={0.5}
              yOffset={8}
              className="bottom-2 right-0 hidden sm:flex lg:bottom-12"
            />

            <QuranCard />
          </motion.div>

          {/* ================================
          Right Column - Content
          ================================ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-2"
            >
              <Badge>
                <BookMarked className="h-3 w-3 text-amber-500" />
                The Holy Quran
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="font-serif text-2xl font-bold leading-tight text-emerald-950 sm:text-3xl lg:text-4xl"
            >
              Reconnect With The{" "}
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                Words of Allah
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-2 max-w-md text-xs leading-relaxed text-emerald-900/60 sm:text-sm"
            >
              Read, understand, and reflect on the Quran with beautiful Arabic
              text, trusted translations, and immersive audio recitation.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-4 space-y-2.5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/quran"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-700 to-emerald-950 px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-emerald-900/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/30 hover:brightness-110"
                  >
                    <span className="relative z-10">Start Reading Quran</span>
                    <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/features"
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/50 bg-white/80 px-5 py-2 text-xs font-medium text-emerald-700 transition-all duration-300 hover:bg-white hover:shadow-sm"
                  >
                    Explore Features
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </motion.div>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-medium text-emerald-900/40">
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-amber-400" />
                  Free Forever
                </span>
                <span className="text-emerald-900/20">•</span>
                <span>No Ads</span>
                <span className="text-emerald-900/20">•</span>
                <span>Authentic Sources</span>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-emerald-900/5 py-3"
            >
              {[
                { icon: Shield, label: "Verified Sources" },
                { icon: Crown, label: "Authentic Quran" },
                { icon: CheckCircle2, label: "Trusted Translation" },
                { icon: Award, label: "Scholarly References" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center gap-1 text-[9px] text-emerald-900/40"
                >
                  <item.icon className="h-3 w-3" />
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Features */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="mt-3 grid grid-cols-1 gap-0.5 sm:grid-cols-2"
            >
              {features.map((feature) => (
                <motion.div key={feature.title} variants={fadeInUp}>
                  <div className="group flex items-start gap-3 rounded-xl border border-transparent p-2 transition-all duration-300 hover:border-emerald-200/30 hover:bg-white/40">
                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-emerald-50/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-100/50" />
                      <feature.icon className="relative h-4 w-4 text-emerald-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-emerald-950">
                        {feature.title}
                      </h4>
                      <p className="mt-0.5 text-[10px] leading-relaxed text-emerald-900/50">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
