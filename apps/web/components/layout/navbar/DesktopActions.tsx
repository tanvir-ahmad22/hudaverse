"use client";

import SearchButton from "./SearchButton";
import LanguageSwitcher from "./LanguageSwitcher";
import UserMenu from "./UserMenu";
import Link from "next/link";
import { navbarActions } from "./navbar.config";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";

export default function DesktopActions() {
  return (
    <div
      className="
        hidden
        lg:flex
        items-center
        gap-1.5
        xl:gap-2
        2xl:gap-3
        shrink-0
      "
    >
      {/* Search - Large desktop only */}
      <div className="hidden xl:block">
        <SearchButton />
      </div>

      {/* Language - Desktop all sizes */}
      <LanguageSwitcher />

      {/* User */}
      <UserMenu />

      {/* Get App Button */}
      <Link href={navbarActions.download.href}>
        <motion.button
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="
            flex
            items-center
            gap-1.5

            rounded-full

            bg-gradient-to-r
            from-yellow-400
            to-amber-500

            px-3
            xl:px-4

            py-2

            text-xs
            xl:text-sm

            font-semibold

            text-emerald-950

            shadow-lg
            shadow-yellow-500/20

            transition-all
            duration-300

            whitespace-nowrap
          "
        >
          <Smartphone size={15} strokeWidth={2.2} />

          <span>Get App</span>
        </motion.button>
      </Link>
    </div>
  );
}
