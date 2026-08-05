"use client";

import { useState, useEffect } from "react";

interface ScrollHook {
  isScrolled: boolean;
  scrollY: number;
}

export function useScroll(threshold: number = 10): ScrollHook {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return {
    isScrolled,
    scrollY,
  };
}
