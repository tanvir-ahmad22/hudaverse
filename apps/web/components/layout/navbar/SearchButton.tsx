"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchButton() {
  return (
    <motion.button
      whileHover={{
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.96,
      }}
      aria-label="Search HudaVerse"
      className="
        hidden
        lg:flex

        items-center
        justify-center

        gap-2

        rounded-full

        border
        border-white/10

        bg-white/5

        px-3
        xl:px-4

        py-2

        text-xs
        xl:text-sm

        font-medium

        text-emerald-50

        backdrop-blur-xl

        shadow-sm

        transition-all
        duration-300

        hover:bg-white/10
        hover:border-yellow-400/30
        hover:shadow-yellow-400/10

        whitespace-nowrap
      "
    >
      <Search size={16} strokeWidth={2} />

      <span>Search</span>
    </motion.button>
  );
}
