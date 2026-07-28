"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="
        group
        flex
        items-center
        gap-2.5
        transition-all
        duration-300
      "
    >
      {/* Logo Icon */}
      <div
        className="
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.45)]
        "
      >
        <Image
          src="/logo-icon.png"
          alt="HudaVerse Logo"
          width={44}
          height={44}
          priority
          className="
            h-10
            w-10
            object-contain
          "
        />
      </div>

      {/* Brand */}
      <div
        className="
          flex
          flex-col
          leading-none
        "
      >
        <div
          className="
            flex
            items-center
            tracking-tight
          "
        >
          <span
            className="
              font-serif
              text-xl
              font-semibold
              text-white
            "
          >
            Huda
          </span>

          <span
            className="
              font-serif
              text-xl
              font-semibold
              text-amber-400
            "
          >
            Verse
          </span>
        </div>

        {/* Tagline */}
        <span
          className="
            mt-1
            hidden
            text-[10px]
            font-medium
            tracking-[0.08em]
            text-white/60
            lg:block
          "
        >
          Your Journey to Allah
        </span>
      </div>
    </Link>
  );
}
