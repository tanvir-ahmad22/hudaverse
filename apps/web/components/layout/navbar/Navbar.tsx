"use client";

import { useEffect, useState } from "react";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import DesktopActions from "./DesktopActions";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        z-50
        w-full

        will-change-transform

        transition-all
        duration-500
        ease-out

        ${
          scrolled
            ? `
              border-b
              border-yellow-400/10

              bg-emerald-950/80

              backdrop-blur-xl

              shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            `
            : `
              bg-emerald-950/20

              backdrop-blur-md
            `
        }
      `}
    >
      <div
        className="
          mx-auto
          flex

          h-16
          sm:h-18
          lg:h-20

          max-w-[1440px]

          items-center
          justify-between

          px-4
          sm:px-6
          lg:px-10
        "
      >
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <NavLinks />

        {/* Desktop Actions */}
        <DesktopActions />

        {/* Mobile */}
        <MobileMenu />
      </div>
    </header>
  );
}
