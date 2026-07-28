"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
  Smartphone,
  DownloadCloud,
  ShieldCheck,
  Zap,
  BookOpen,
  ArrowRight,
} from "lucide-react";

// =================================
// App Features
// =================================

const appFeatures = [
  {
    title: "Quran & Hadith",
    icon: BookOpen,
  },

  {
    title: "AI Islamic Assistant",
    icon: Zap,
  },

  {
    title: "Secure Experience",
    icon: ShieldCheck,
  },
];

// =================================
// Component
// =================================

export default function Download() {
  return (
    <section
      className="
py-24
bg-[#F7F8F5]
overflow-hidden
"
    >
      <div
        className="
max-w-[1400px]
mx-auto
px-6

grid

lg:grid-cols-2

gap-16

items-center

"
      >
        {/* =====================
 Mobile Preview
===================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
flex
justify-center

"
        >
          <div
            className="
relative

w-[280px]

h-[560px]

rounded-[45px]

bg-[#154D40]

p-4

shadow-2xl

"
          >
            {/* Phone Screen */}

            <div
              className="
w-full
h-full

rounded-[35px]

bg-white

overflow-hidden

"
            >
              <div
                className="
h-24

bg-[#154D40]

flex

items-end

p-6

"
              >
                <div>
                  <p
                    className="
text-[#D4AF37]

text-sm

"
                  >
                    Assalamu Alaikum
                  </p>

                  <h3
                    className="
text-white

font-bold

text-xl

"
                  >
                    HudaVerse
                  </h3>
                </div>
              </div>

              <div
                className="
p-5

space-y-4

"
              >
                <div
                  className="
p-5

rounded-2xl

bg-[#F7F8F5]

"
                >
                  <BookOpen className="text-[#154D40]" />

                  <p
                    className="
mt-3

font-bold

text-[#154D40]

"
                  >
                    Read Quran
                  </p>
                </div>

                <div
                  className="
p-5

rounded-2xl

bg-[#154D40]

text-white

"
                >
                  <p
                    className="
font-bold

"
                  >
                    Prayer Time
                  </p>

                  <p
                    className="
text-[#D4AF37]

mt-2

"
                  >
                    Asr 03:45 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =====================
 Content
===================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div
            className="
inline-flex

items-center

gap-2

px-5

py-2

rounded-full

bg-[#154D40]/10

text-[#154D40]

font-semibold

text-sm

"
          >
            <Smartphone size={16} />
            Mobile Application
          </div>

          <h2
            className="
mt-6

text-4xl

md:text-5xl

font-bold

text-[#154D40]

leading-tight

"
          >
            Your Islamic Companion Anywhere, Anytime
          </h2>

          <p
            className="
mt-6

text-gray-600

text-lg

leading-relaxed

"
          >
            Download HudaVerse mobile app and access Quran, Hadith, AI
            Assistant, Prayer Times and more from your phone.
          </p>

          <div
            className="
mt-8

space-y-5

"
          >
            {appFeatures.map((item) => (
              <div
                key={item.title}
                className="
flex
items-center
gap-4

"
              >
                <div
                  className="
w-11

h-11

rounded-xl

bg-[#154D40]

flex

items-center

justify-center

"
                >
                  <item.icon size={20} className="text-[#D4AF37]" />
                </div>

                <p
                  className="
font-medium

text-[#154D40]

"
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <div
            className="
mt-10

flex

flex-wrap

gap-4

"
          >
            <Link
              href="#"
              className="
flex

items-center

gap-3

px-6

py-4

rounded-xl

bg-black

text-white

font-semibold

"
            >
              <DownloadCloud size={20} />
              Google Play
            </Link>

            <Link
              href="#"
              className="
flex

items-center

gap-3

px-6

py-4

rounded-xl

bg-[#154D40]

text-white

font-semibold

"
            >
              <Smartphone size={20} />
              App Store
            </Link>
          </div>

          <Link
            href="/download"
            className="
inline-flex

items-center

gap-2

mt-8

text-[#D08A39]

font-semibold

"
          >
            Learn More
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
