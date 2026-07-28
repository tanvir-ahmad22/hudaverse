"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
  Users,
  MessageCircle,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

// =================================
// Community Features
// =================================

const communityFeatures = [
  {
    title: "Islamic Discussions",
    icon: MessageCircle,
  },

  {
    title: "Learning Groups",
    icon: GraduationCap,
  },

  {
    title: "Share Knowledge",
    icon: BookOpen,
  },
];

// =================================
// Component
// =================================

export default function Community() {
  return (
    <section
      className="
py-24
bg-[#154D40]
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
        {/* ======================
 Left Content
======================= */}

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
        >
          <div
            className="
inline-flex
items-center
gap-2

px-5
py-2

rounded-full

bg-[#D4AF37]/20

text-[#D4AF37]

font-semibold

text-sm

"
          >
            <Users size={16} />
            HudaVerse Community
          </div>

          <h2
            className="
mt-6

text-4xl

md:text-5xl

font-bold

text-white

leading-tight

"
          >
            Grow Together In Faith & Knowledge
          </h2>

          <p
            className="
mt-6

text-white/70

text-lg

leading-relaxed

"
          >
            Connect with Muslims worldwide, discuss Islamic topics and learn
            from each other in a safe environment.
          </p>

          <div
            className="
mt-8

space-y-5

"
          >
            {communityFeatures.map((item) => (
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

bg-[#D4AF37]/20

flex
items-center
justify-center

"
                >
                  <item.icon size={20} className="text-[#D4AF37]" />
                </div>

                <p
                  className="
text-white

font-medium

"
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/community"
            className="
inline-flex

items-center

gap-2

mt-10

px-7

py-4

rounded-full

bg-[#D4AF37]

text-[#154D40]

font-semibold

hover:bg-[#e6c45c]

transition

"
          >
            Join Community
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* ======================
 Community Preview
======================= */}

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
bg-white

rounded-[32px]

p-8

shadow-2xl

"
          >
            {/* Header */}

            <div
              className="
flex
items-center
gap-4

border-b

pb-5

"
            >
              <div
                className="
w-14
h-14

rounded-2xl

bg-[#154D40]

flex
items-center
justify-center

"
              >
                <Users size={28} className="text-[#D4AF37]" />
              </div>

              <div>
                <h3
                  className="
text-xl

font-bold

text-[#154D40]

"
                >
                  Community Feed
                </h3>

                <p
                  className="
text-sm

text-gray-500

"
                >
                  12,500+ Members
                </p>
              </div>
            </div>

            {/* Post */}

            <div
              className="
mt-6

bg-[#F7F8F5]

rounded-2xl

p-6

"
            >
              <div
                className="
flex
items-center
gap-3

"
              >
                <div
                  className="
w-10
h-10

rounded-full

bg-[#154D40]

"
                ></div>

                <div>
                  <p
                    className="
font-semibold

text-[#154D40]

"
                  >
                    Ahmed Rahman
                  </p>

                  <p
                    className="
text-xs

text-gray-500

"
                  >
                    2 minutes ago
                  </p>
                </div>
              </div>

              <p
                className="
mt-5

text-gray-700

leading-relaxed

"
              >
                What is the importance of patience in Islam?
              </p>

              <div
                className="
mt-5

flex

items-center

gap-3

text-sm

text-[#154D40]

font-medium

"
              >
                <MessageCircle size={16} />
                245 Replies
              </div>
            </div>

            {/* Bottom Stats */}

            <div
              className="
grid

grid-cols-3

gap-4

mt-6

"
            >
              <div
                className="
text-center

p-4

rounded-xl

bg-[#154D40]/5

"
              >
                <p
                  className="
font-bold

text-[#154D40]

"
                >
                  50K+
                </p>

                <span
                  className="
text-xs

text-gray-500

"
                >
                  Members
                </span>
              </div>

              <div
                className="
text-center

p-4

rounded-xl

bg-[#154D40]/5

"
              >
                <p
                  className="
font-bold

text-[#154D40]

"
                >
                  10K+
                </p>

                <span
                  className="
text-xs

text-gray-500

"
                >
                  Posts
                </span>
              </div>

              <div
                className="
text-center

p-4

rounded-xl

bg-[#154D40]/5

"
              >
                <p
                  className="
font-bold

text-[#154D40]

"
                >
                  100+
                </p>

                <span
                  className="
text-xs

text-gray-500

"
                >
                  Groups
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
