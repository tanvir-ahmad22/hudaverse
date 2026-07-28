"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { navbarActions } from "./navbar.config";
import { motion } from "framer-motion";

export default function UserMenu() {
  // Future:
  // const { user } = useAuth();

  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <Link href={navbarActions.login.href}>
        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="
            flex
            items-center
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

            transition-all

            hover:bg-white/10

            hover:border-yellow-400/30
          "
        >
          <User size={16} strokeWidth={2} />

          <span>Sign In</span>
        </motion.div>
      </Link>
    );
  }

  return (
    <button
      className="
        flex
        items-center
        gap-2
      "
    >
      User
    </button>
  );
}
