"use client";

import Link from "next/link";
import { Menu, X, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { navLinks, navbarActions } from "./navbar.config";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle mobile menu"
        className="
          flex
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-white/5
          p-2
          text-white
          backdrop-blur-xl
          transition
          hover:border-yellow-400/30
          hover:text-yellow-300
        "
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="
              fixed
              left-0
              top-[68px]
              h-[calc(100vh-68px)]
              w-full
              overflow-y-auto
              border-t
              border-white/10
              bg-emerald-950/95
              backdrop-blur-xl
              shadow-2xl
            "
          >
            <nav
              className="
                flex
                flex-col
                gap-2
                px-6
                py-6
              "
            >
              {/* Brand */}
              <div
                className="
                  mb-4
                  border-b
                  border-white/10
                  pb-4
                "
              >
                <h2
                  className="
                    text-lg
                    font-semibold
                    text-white
                  "
                >
                  Huda
                  <span className="text-amber-400">Verse</span>
                </h2>

                <p
                  className="
                    mt-1
                    text-xs
                    text-emerald-100/70
                  "
                >
                  Your Journey to Allah
                </p>
              </div>

              {/* Links */}
              {navLinks.map((link, index) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{
                      opacity: 0,
                      x: -15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        px-3
                        py-3
                        text-sm
                        font-medium
                        transition

                        ${
                          active
                            ? "bg-white/10 text-yellow-300"
                            : "text-white/90 hover:bg-white/10 hover:text-yellow-300"
                        }
                      `}
                    >
                      <span>{link.label}</span>

                      {link.badge && (
                        <span
                          className="
                            rounded-full
                            bg-yellow-400
                            px-2
                            py-0.5
                            text-[10px]
                            font-bold
                            text-emerald-950
                          "
                        >
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Sign In */}
              <Link
                href={navbarActions.login.href}
                onClick={() => setOpen(false)}
                className="
                  mt-4
                  rounded-xl
                  border
                  border-white/10
                  px-4
                  py-3
                  text-center
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-white/10
                "
              >
                {navbarActions.login.label}
              </Link>

              {/* Get App */}
              <Link
                href={navbarActions.download.href}
                onClick={() => setOpen(false)}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-yellow-400
                  to-amber-500
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-emerald-950
                "
              >
                <Smartphone size={16} />
                Get App
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
