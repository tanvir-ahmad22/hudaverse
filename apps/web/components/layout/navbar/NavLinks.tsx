"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { navLinks } from "./navbar.config";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavLinks() {
  const pathname = usePathname();

  const [hash, setHash] = useState("");

  // Track hash changes (#features etc.)
  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash);
    };

    updateHash();

    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  return (
    <nav
      className="
        hidden
        lg:flex
        items-center
        gap-0
        xl:gap-1
      "
    >
      {navLinks.map((item) => {
        const match = item.match ?? item.href;

        const isActive = match.startsWith("#")
          ? hash === match
          : match === "/"
            ? pathname === "/"
            : pathname.startsWith(match);

        return (
          <Link
            key={item.label}
            href={item.href}
            className="
              relative
              group
              flex
              items-center
              px-2.5
              xl:px-3
              py-2
              whitespace-nowrap
            "
          >
            <div className="flex items-center gap-1.5">
              <span
                className={`
                  text-[13px]
                  xl:text-sm
                  font-medium
                  transition-colors
                  duration-300

                  ${
                    isActive
                      ? "text-white"
                      : "text-emerald-100/80 group-hover:text-white"
                  }
                `}
              >
                {item.label}
              </span>

              {item.badge && (
                <span
                  className="
                    rounded-full
                    bg-gradient-to-r
                    from-yellow-400
                    to-amber-500
                    px-1.5
                    py-0.5
                    text-[9px]
                    font-bold
                    text-emerald-950
                    shadow-sm
                  "
                >
                  {item.badge}
                </span>
              )}
            </div>

            {/* Hover underline */}
            <motion.span
              className="
                absolute
                bottom-0
                left-1/2
                h-[2px]
                w-full
                -translate-x-1/2
                scale-x-0
                rounded-full
                bg-gradient-to-r
                from-yellow-300
                to-yellow-500
                transition-transform
                duration-300
                group-hover:scale-x-100
              "
            />

            {/* Active underline */}
            {isActive && (
              <motion.span
                layoutId="active-nav"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-full
                  -translate-x-1/2
                  rounded-full
                  bg-yellow-400
                  shadow-[0_0_12px_rgba(212,175,55,0.7)]
                "
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
