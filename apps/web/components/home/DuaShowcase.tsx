import Link from "next/link";
import {
  Calendar,
  Volume2,
  BookOpen,
  Share2,
  Heart,
  ArrowRight,
  Moon,
  Sun,
  Star,
  Bell,
  Layers,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Daily Duas",
    description: "Essential duas for everyday life.",
    iconBg: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Sun,
    title: "Morning & Evening Adhkar",
    description: "Start and end your day with remembrance.",
    iconBg: "bg-amber-50 text-amber-600",
  },
  {
    icon: Volume2,
    title: "Audio Recitation",
    description: "Listen and memorize beautifully.",
    iconBg: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Heart,
    title: "Favorites",
    description: "Save your most important duas.",
    iconBg: "bg-rose-50 text-rose-500",
  },
];

// পিক্সেল-ভিত্তিক position — card-এর boundary-র বাইরে নিশ্চিতভাবে থাকবে
const leftFloatingIcons = [
  {
    icon: Sun,
    label: "Morning\nAdhkar",
    top: "10px",
    left: "-110px",
    delay: "0s",
    color: "text-amber-500",
  },
  {
    icon: Moon,
    label: "Evening\nAdhkar",
    top: "200px",
    left: "-135px",
    delay: "1.3s",
    color: "text-emerald-700",
  },
  {
    icon: Star,
    label: "Favorites",
    top: "400px",
    left: "-105px",
    delay: "2.1s",
    color: "text-amber-500",
  },
];

const rightFloatingIcons = [
  {
    icon: Volume2,
    label: "Audio",
    top: "20px",
    left: "100%",
    delay: "0.6s",
    color: "text-emerald-700",
  },
  {
    icon: Layers,
    label: "Collection",
    top: "210px",
    left: "112%",
    delay: "1.8s",
    color: "text-amber-500",
  },
  {
    icon: Bell,
    label: "Daily\nReminder",
    top: "410px",
    left: "98%",
    delay: "2.6s",
    color: "text-emerald-700",
  },
];

export default function DuaShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#faf8f3] px-6 py-24">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute left-1/4 top-10 h-72 w-72 rounded-full bg-amber-200/25 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-emerald-200/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* Left: Dua card mockup with scattered hanging icons around it */}
        <div className="relative mx-auto w-full max-w-xs">
          {/* Floating icons — positioned relative to this wrapper, fully outside the card */}
          <div className="relative">
            {[...leftFloatingIcons, ...rightFloatingIcons].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="animate-sway absolute z-20 hidden w-20 flex-col items-center gap-1.5 rounded-2xl border border-amber-200/70 bg-white/90 px-2 py-3 text-center shadow-lg backdrop-blur-sm sm:flex"
                  style={{
                    top: item.top,
                    left: item.left,
                    animationDelay: item.delay,
                  }}
                >
                  <Icon className={`h-5 w-5 ${item.color}`} />
                  <span className="whitespace-pre-line text-[10px] font-medium leading-tight text-emerald-950">
                    {item.label}
                  </span>
                </div>
              );
            })}

            {/* Dua Card — premium styling */}
            <div className="relative z-10 overflow-hidden rounded-[2rem] border border-amber-300/70 bg-gradient-to-b from-white to-amber-50/40 p-6 shadow-[0_20px_60px_-15px_rgba(6,78,59,0.25)]">
              {/* Subtle corner accent */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-200/30 blur-2xl" />
              <Sparkles className="absolute right-5 top-5 h-4 w-4 text-amber-400/70" />

              {/* Card header */}
              <div className="relative flex items-center justify-between border-b border-amber-200/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300 shadow-md">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-950">
                      Daily Dua
                    </p>
                    <p className="text-xs text-emerald-900/50">
                      Today&apos;s Spiritual Companion
                    </p>
                  </div>
                </div>
                <Calendar className="h-4 w-4 text-emerald-900/40" />
              </div>

              {/* Date row */}
              <div className="relative mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-emerald-900/50">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  25 July 2025
                </span>
                <span className="flex items-center gap-1">
                  <Moon className="h-3.5 w-3.5" />
                  29 Muharram 1447 AH
                </span>
              </div>

              {/* Today's Dua */}
              <p className="relative mt-5 text-xs font-semibold uppercase tracking-wide text-amber-600">
                Today&apos;s Dua
              </p>
              <p
                className="relative mt-3 text-center font-serif text-3xl leading-relaxed text-emerald-950"
                dir="rtl"
              >
                رَبِّ زِدْنِي عِلْمًا
              </p>
              <p className="relative mt-3 text-center text-sm font-medium text-emerald-900">
                &ldquo;My Lord, increase me in knowledge.&rdquo;
              </p>
              <p className="relative mt-2 text-center text-xs leading-relaxed text-emerald-900/50">
                A timeless supplication for every seeker of knowledge. It opens
                the doors of understanding and blesses the journey of learning.
              </p>

              {/* Audio player */}
              <div className="relative mt-5 flex items-center gap-3 rounded-xl border border-amber-200/50 bg-white p-3 shadow-sm">
                <button
                  aria-label="Play"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300 shadow-md transition hover:scale-105"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <div className="flex-1">
                  <div className="h-1.5 w-full rounded-full bg-amber-100">
                    <div className="h-1.5 w-1/4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500" />
                  </div>
                  <div className="mt-1 flex justify-between text-[10px] text-emerald-900/40">
                    <span>0:00</span>
                    <span>1:12</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="relative mt-4 grid grid-cols-4 gap-2 text-center">
                {[
                  { icon: Heart, label: "Save" },
                  { icon: Volume2, label: "Listen" },
                  { icon: Share2, label: "Share" },
                  { icon: BookOpen, label: "Read More" },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      className="flex flex-col items-center gap-1 rounded-xl border border-amber-200/50 bg-white py-2.5 text-emerald-900/70 transition hover:border-amber-300 hover:bg-amber-50"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-[10px]">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Text content + feature cards */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-800">
            Daily Dua
          </span>

          <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-emerald-950 sm:text-4xl">
            Strengthen Your Heart With{" "}
            <span className="text-amber-500">Every Dua</span>
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-emerald-900/60">
            Discover authentic daily duas with Arabic text, translation,
            transliteration, audio recitation and meaningful explanations that
            help strengthen your connection with Allah every day.
          </p>

          {/* Feature grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 rounded-2xl border border-emerald-900/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${feature.iconBg}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-950">
                      {feature.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-emerald-900/50">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="/dua"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-800"
          >
            Explore Duas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
