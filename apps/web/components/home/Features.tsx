"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

import {
  BookOpen,
  ScrollText,
  Heart,
  Sparkles,
  Moon,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// ===============================
// FEATURES DATA START
// ===============================

const features = [
  {
    id: "quran",
    title: "Quran",
    description: "Read, listen and understand the words of Allah.",
    icon: BookOpen,
    tags: ["Read", "Listen", "Learn"],
  },

  {
    id: "hadith",
    title: "Hadith",
    description: "Explore authentic Hadith with smart search.",
    icon: ScrollText,
    tags: ["Authentic", "Search"],
  },

  {
    id: "dua",
    title: "Dua",
    description: "Beautiful duas for every moment of life.",
    icon: Heart,
    tags: ["Daily", "Peace"],
  },

  {
    id: "ai",
    title: "AI Assistant",
    description: "Your intelligent Islamic companion powered by AI.",
    icon: Sparkles,
    tags: ["Ask", "Learn"],
  },

  {
    id: "prayer",
    title: "Prayer Times",
    description: "Accurate prayer times wherever you are.",
    icon: Moon,
    tags: ["Times", "Qibla"],
  },

  {
    id: "community",
    title: "Community",
    description: "Connect and grow with the global Ummah.",
    icon: Users,
    tags: ["Share", "Grow"],
  },
];

// ===============================
// FEATURES DATA END
// ===============================

// ===============================
// FEATURE CARD START
// ===============================

function FeatureCard({
  item,
  index,
}: {
  item: (typeof features)[number];
  index: number;
}) {
  const Icon = item.icon;

  const ref = useRef(null);

  const isVisible = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={
        isVisible
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.45,
        delay: index * 0.07,
      }}
      whileHover={{
        y: -6,
      }}
      className="
      group
      relative
      overflow-hidden
      rounded-2xl
      border
      border-emerald-900/10
      bg-white
      p-5
      shadow-sm
      transition
      hover:border-amber-300/40
      hover:shadow-xl
      "
    >
      {/* Hover Glow */}

      <div
        className="
        absolute
        -right-12
        -top-12
        h-28
        w-28
        rounded-full
        bg-amber-300/20
        blur-3xl
        opacity-0
        transition
        duration-500
        group-hover:opacity-100
        "
      />

      {/* Icon */}

      <motion.div
        whileHover={{
          rotate: 8,
          scale: 1.08,
        }}
        className="
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-xl
        bg-emerald-950
        shadow-md
        "
      >
        <Icon
          className="
          h-5
          w-5
          text-amber-400
          "
        />
      </motion.div>

      {/* Title */}

      <h3
        className="
        mt-5
        font-serif
        text-lg
        font-bold
        text-emerald-950
        "
      >
        {item.title}
      </h3>

      {/* Description */}

      <p
        className="
        mt-2
        text-sm
        leading-relaxed
        text-emerald-900/60
        "
      >
        {item.description}
      </p>

      {/* Tags */}

      <div
        className="
        mt-4
        flex
        flex-wrap
        gap-1.5
        "
      >
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="
              inline-flex
              items-center
              gap-1
              rounded-full
              bg-emerald-50
              px-2.5
              py-1
              text-[10px]
              font-semibold
              text-emerald-800
              "
          >
            <CheckCircle2
              className="
                h-3
                w-3
                "
            />

            {tag}
          </span>
        ))}
      </div>

      {/* Link */}

      <Link
        href={`/${item.id}`}
        className="
        mt-4
        inline-flex
        items-center
        gap-1.5
        text-xs
        font-semibold
        text-amber-600
        "
      >
        Explore
        <ArrowRight
          className="
          h-3.5
          w-3.5
          transition
          group-hover:translate-x-1
          "
        />
      </Link>
    </motion.div>
  );
}

// ===============================
// FEATURE CARD END
// ===============================

export default function Features() {
  return (
    <section
      className="
relative
overflow-hidden
bg-[#faf8f3]
px-6
py-20
"
    >
      {/* Background Glow */}

      <div
        className="
absolute
left-1/2
top-10
h-72
w-72
-translate-x-1/2
rounded-full
bg-emerald-200/30
blur-3xl
"
      />

      <div
        className="
relative
mx-auto
max-w-6xl
"
      >
        {/* Header */}

        <div
          className="
mx-auto
max-w-2xl
text-center
"
        >
          <span
            className="
inline-flex
items-center
gap-2
rounded-full
bg-emerald-100
px-3.5
py-1.5
text-xs
font-semibold
text-emerald-800
"
          >
            <Sparkles
              className="
h-3.5
w-3.5
text-amber-500
"
            />
            Islamic Ecosystem
          </span>

          <h2
            className="
mt-5
font-serif
text-3xl
font-bold
leading-tight
text-emerald-950
sm:text-4xl
"
          >
            Everything You Need For Your
            <span className="text-amber-500">Islamic</span>
            Journey
          </h2>

          <p
            className="
mt-3
text-sm
leading-relaxed
text-emerald-900/60
"
          >
            Quran, Hadith, AI and worship tools in one peaceful Islamic
            experience.
          </p>
        </div>

        {/* Cards */}

        <div
          className="
mt-12
grid
grid-cols-1
gap-5
sm:grid-cols-2
lg:grid-cols-3
"
        >
          {features.map((item, index) => (
            <FeatureCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* CTA */}

        <div
          className="
mt-12
flex
justify-center
"
        >
          <Link
            href="/features"
            className="
inline-flex
items-center
gap-2
rounded-full
bg-emerald-950
px-6
py-3
text-sm
font-semibold
text-white
shadow-lg
transition
hover:bg-emerald-900
"
          >
            Explore All Features
            <ArrowRight
              className="
h-4
w-4
"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
