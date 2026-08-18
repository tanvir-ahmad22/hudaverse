"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { TRANSITION_DURATION } from "./navbar.config";

// ============================================================
// TYPES
// ============================================================

interface LogoProps {
  /**
   * Kept for compatibility with DesktopNavbar / MobileNavbar.
   *
   * compact does NOT resize the logo.
   * It only controls tagline visibility.
   */
  compact?: boolean;

  /** Optional custom classes for the logo wrapper. */
  className?: string;
}

// ============================================================
// CONFIG
// ============================================================

const TAGLINE = "Your Journey to Allah";

/**
 * Speed of typing each character.
 */
const TYPING_SPEED = 75;

/**
 * Speed of deleting each character.
 */
const DELETE_SPEED = 45;

/**
 * Delay before the first character appears.
 */
const START_DELAY = 300;

/**
 * How long the complete tagline stays visible.
 */
const HOLD_DURATION = 5000;

/**
 * Small pause before typing starts again
 * after the text has been completely deleted.
 */
const RESTART_DELAY = 700;

// ============================================================
// LOGO
// ============================================================

export const Logo = React.memo(function Logo({
  compact = false,
  className = "",
}: LogoProps) {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ----------------------------------------------------------
  // Animation cancellation
  // ----------------------------------------------------------

  const cancelledRef = useRef(false);

  // ============================================================
  // TIMER CLEANUP
  // ============================================================

  const clearTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // ============================================================
  // TYPEWRITER LOOP
  // ============================================================

  useEffect(() => {
    /**
     * Always cancel the previous animation when compact changes.
     */
    cancelledRef.current = true;
    clearTimer();

    /**
     * When navbar is compact/scrolled,
     * stop the animation and hide the tagline.
     *
     * We intentionally keep typedText in state so that
     * returning to normal mode can restart cleanly.
     */
    if (compact) {
      setIsTyping(false);
      return;
    }

    /**
     * Start a completely new animation cycle.
     */
    cancelledRef.current = false;

    let index = 0;

    setTypedText("");
    setIsTyping(true);

    // ----------------------------------------------------------
    // TYPE
    // ----------------------------------------------------------

    const typeNext = () => {
      if (cancelledRef.current) {
        return;
      }

      if (index < TAGLINE.length) {
        index += 1;

        setTypedText(TAGLINE.slice(0, index));

        timerRef.current = setTimeout(typeNext, TYPING_SPEED);

        return;
      }

      // --------------------------------------------------------
      // FULL TEXT IS NOW VISIBLE
      // --------------------------------------------------------

      setIsTyping(false);

      timerRef.current = setTimeout(deleteNext, HOLD_DURATION);
    };

    // ----------------------------------------------------------
    // DELETE
    // ----------------------------------------------------------

    const deleteNext = () => {
      if (cancelledRef.current) {
        return;
      }

      if (index > 0) {
        index -= 1;

        setTypedText(TAGLINE.slice(0, index));

        timerRef.current = setTimeout(deleteNext, DELETE_SPEED);

        return;
      }

      // --------------------------------------------------------
      // TEXT COMPLETELY DELETED
      // --------------------------------------------------------

      setIsTyping(true);

      timerRef.current = setTimeout(typeNext, RESTART_DELAY);
    };

    // ----------------------------------------------------------
    // INITIAL START
    // ----------------------------------------------------------

    timerRef.current = setTimeout(typeNext, START_DELAY);

    // ----------------------------------------------------------
    // CLEANUP
    // ----------------------------------------------------------

    return () => {
      cancelledRef.current = true;
      clearTimer();
    };
  }, [compact]);

  // ============================================================
  // FINAL UNMOUNT CLEANUP
  // ============================================================

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      clearTimer();
    };
  }, []);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      className={["group flex min-w-0 items-center select-none", className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ======================================================
          LOGO MARK
      ======================================================= */}

      <div
        className="
          relative
          shrink-0
          origin-left
        "
      >
        <Image
          src="/hudaverse-logo-mark.png"
          alt="HudaVerse"
          width={64}
          height={64}
          priority
          draggable={false}
          className="
            h-11
            w-auto
            object-contain
          "
        />
      </div>

      {/* ======================================================
          BRAND CONTENT
      ======================================================= */}

      <div
        className="
          ml-3
          flex
          min-w-0
          flex-col
          justify-center
        "
      >
        {/* ====================================================
            BRAND NAME
        ==================================================== */}

        <span
          className="
            whitespace-nowrap
            font-serif
            text-xl
            font-bold
            leading-none
            tracking-[-0.025em]
          "
          aria-label="HudaVerse"
        >
          {/* Huda */}

          <span
            className="
              text-white
              [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]
              transition-colors
              duration-300
              group-hover:text-slate-50
            "
          >
            Huda
          </span>

          {/* Verse */}

          <span
            className="
              bg-gradient-to-b
              from-amber-300
              via-amber-400
              to-amber-600
              bg-clip-text
              text-transparent
              transition-all
              duration-300
              group-hover:from-amber-200
              group-hover:via-amber-300
              group-hover:to-amber-500
            "
          >
            Verse
          </span>
        </span>

        {/* ====================================================
            TAGLINE
        ==================================================== */}

        <AnimatePresence initial={false}>
          {!compact && (
            <motion.div
              key="hudaverse-tagline"
              initial={{
                height: 0,
                opacity: 0,
                marginTop: 0,
                y: -3,
              }}
              animate={{
                height: 17,
                opacity: 1,
                marginTop: 6,
                y: 0,
              }}
              exit={{
                height: 0,
                opacity: 0,
                marginTop: 0,
                y: -3,
              }}
              transition={{
                duration: TRANSITION_DURATION,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                overflow-hidden
              "
            >
              <span
                className="
                  flex
                  h-[17px]
                  items-center
                  whitespace-nowrap
                  text-[10px]
                  font-medium
                  leading-none
                  tracking-[0.075em]
                  text-slate-300/85
                "
                aria-label={TAGLINE}
              >
                {/* Typed text */}

                <span>{typedText}</span>

                {/* ==================================================
                    TYPEWRITER CURSOR
                ================================================== */}

                <motion.span
                  animate={{
                    opacity: [0.25, 1, 0.25],
                  }}
                  transition={{
                    duration: 0.75,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                  className="
                    ml-[3px]
                    inline-block
                    h-[10px]
                    w-px
                    shrink-0
                    bg-amber-400/90
                  "
                />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

Logo.displayName = "Logo";
