"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { languages } from "./navbar.config";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("EN");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        className="
          flex
          items-center
          gap-1.5

          rounded-full

          border
          border-white/10

          bg-white/5

          px-3
          py-2

          text-xs
          xl:text-sm

          font-medium

          text-emerald-50

          backdrop-blur-xl

          transition-all
          duration-300

          hover:bg-white/10
          hover:border-yellow-400/30
          hover:text-yellow-300
        "
      >
        <Globe className="h-4 w-4" />

        <span>{activeLang}</span>

        <ChevronDown
          className={`
            h-3.5
            w-3.5
            transition-transform
            duration-300

            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute
              right-0
              mt-3

              w-40

              overflow-hidden

              rounded-2xl

              border
              border-white/10

              bg-emerald-950/95

              shadow-xl

              backdrop-blur-xl
            "
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  setActiveLang(language.code);
                  setOpen(false);
                }}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between

                  px-4
                  py-3

                  text-left

                  text-sm

                  transition

                  ${
                    activeLang === language.code
                      ? "bg-yellow-400/20 text-yellow-300"
                      : "text-emerald-50 hover:bg-white/10"
                  }
                `}
              >
                <span>{language.label}</span>

                {activeLang === language.code && (
                  <span className="text-xs">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
