"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Check, ChevronDown, Globe, Search } from "lucide-react";

import { useLanguage } from "../../hooks/useLanguage";

/* ================================================================
   LANGUAGE SWITCHER
   GLOBAL UI LANGUAGE CONTROL
================================================================ */

export default function LanguageSwitcher({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const { currentLang, currentLanguage, selectLanguage, availableLanguages } =
    useLanguage();

  /* ================================================================
     STATE
  ================================================================= */

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  /* ================================================================
     REFS
  ================================================================= */

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ================================================================
     FILTER LANGUAGES
  ================================================================= */

  const filteredLanguages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return availableLanguages;
    }

    return availableLanguages.filter((language) => {
      return (
        language.label.toLowerCase().includes(normalizedQuery) ||
        language.nativeLabel.toLowerCase().includes(normalizedQuery) ||
        language.code.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query, availableLanguages]);

  /* ================================================================
     OPEN
  ================================================================= */

  const openSwitcher = useCallback(() => {
    setIsOpen(true);
    setQuery("");
  }, []);

  /* ================================================================
     CLOSE
  ================================================================= */

  const closeSwitcher = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  /* ================================================================
     TOGGLE
  ================================================================= */

  const toggleSwitcher = useCallback(() => {
    setIsOpen((current) => {
      if (current) {
        setQuery("");
      }

      return !current;
    });
  }, []);

  /* ================================================================
     SELECT LANGUAGE
  ================================================================= */

  const handleSelect = useCallback(
    (code: string) => {
      selectLanguage(code);
      closeSwitcher();
    },
    [selectLanguage, closeSwitcher],
  );

  /* ================================================================
     OUTSIDE CLICK
  ================================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (containerRef.current && !containerRef.current.contains(target)) {
        closeSwitcher();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, closeSwitcher]);

  /* ================================================================
     ESCAPE
  ================================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSwitcher();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeSwitcher]);

  /* ================================================================
     INPUT FOCUS
  ================================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  /* ================================================================
     RENDER
  ================================================================= */

  return (
    <div ref={containerRef} className="relative shrink-0">
      {/* ==========================================================
          LANGUAGE BUTTON
      =========================================================== */}

      <button
        type="button"
        onClick={toggleSwitcher}
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="
          flex
          h-10
          items-center
          justify-center
          gap-1.5
          whitespace-nowrap
          rounded-xl
          border
          border-white/15
          bg-white/[0.03]
          px-2.5
          text-sm
          font-medium
          text-white/90
          outline-none
          transition-all
          duration-200
          hover:border-amber-400/40
          hover:bg-white/[0.06]
          hover:text-amber-200
          focus-visible:ring-2
          focus-visible:ring-amber-400
          active:scale-95
          sm:h-11
          sm:px-3
        "
      >
        <Globe aria-hidden="true" className="h-4 w-4 shrink-0" />

        <span className="uppercase">{currentLanguage.code}</span>

        <ChevronDown
          aria-hidden="true"
          className={`
            h-3.5
            w-3.5
            transition-transform
            duration-200
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* ==========================================================
          DROPDOWN
      =========================================================== */}

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select language"
          className={`
            absolute
            top-full
            z-[99999]
            mt-2
            w-72
            max-w-[calc(100vw-24px)]
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[#05261F]
            shadow-2xl
            shadow-black/50

            ${variant === "mobile" ? "right-0" : "right-0"}
          `}
        >
          {/* ======================================================
              SEARCH
          ======================================================= */}

          <div className="border-b border-white/10 p-3">
            <div
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                px-3
                py-2.5
              "
            >
              <Search
                aria-hidden="true"
                className="
                  h-4
                  w-4
                  shrink-0
                  text-white/40
                "
              />

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                placeholder="Search language..."
                aria-label="Search language"
                autoComplete="off"
                className="
                  w-full
                  min-w-0
                  bg-transparent
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-white/35
                "
              />
            </div>
          </div>

          {/* ======================================================
              LANGUAGE LIST
          ======================================================= */}

          <ul
            className="
              max-h-72
              overflow-y-auto
              overscroll-contain
              p-2
            "
          >
            {filteredLanguages.map((language) => {
              const active = currentLang === language.code;

              return (
                <li key={language.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => handleSelect(language.code)}
                    className={`
                      flex
                      min-h-11
                      w-full
                      touch-manipulation
                      items-center
                      justify-between
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      outline-none
                      transition-colors
                      focus-visible:ring-2
                      focus-visible:ring-amber-400

                      ${
                        active
                          ? "bg-amber-400/10 text-amber-300"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <span
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-2.5
                      "
                    >
                      {/* FLAG */}

                      <span
                        aria-hidden="true"
                        className="
                          shrink-0
                          text-base
                        "
                      >
                        {language.flag}
                      </span>

                      {/* NATIVE NAME */}

                      <span
                        className="
                          min-w-0
                          truncate
                          font-medium
                        "
                      >
                        {language.nativeLabel}
                      </span>

                      {/* ENGLISH NAME */}

                      <span
                        className="
                          truncate
                          text-xs
                          text-white/30
                        "
                      >
                        {language.label}
                      </span>
                    </span>

                    {/* ACTIVE CHECK */}

                    {active && (
                      <Check
                        aria-hidden="true"
                        className="
                          h-4
                          w-4
                          shrink-0
                          text-amber-400
                        "
                      />
                    )}
                  </button>
                </li>
              );
            })}

            {/* ====================================================
                EMPTY STATE
            ===================================================== */}

            {filteredLanguages.length === 0 && (
              <li
                className="
                  px-3
                  py-6
                  text-center
                  text-sm
                  text-white/40
                "
              >
                No languages found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
