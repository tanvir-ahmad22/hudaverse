"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Smartphone,
  CheckCircle2,
  Heart,
} from "lucide-react";

// Static particle configuration - generated once outside component
const CTA_PARTICLES = [
  {
    x: "12%",
    y: "20%",
    duration: 9,
    delay: 1,
  },
  {
    x: "35%",
    y: "70%",
    duration: 11,
    delay: 2,
  },
  {
    x: "78%",
    y: "30%",
    duration: 8,
    delay: 0.5,
  },
  {
    x: "5%",
    y: "85%",
    duration: 10,
    delay: 3.2,
  },
  {
    x: "92%",
    y: "65%",
    duration: 12,
    delay: 0.8,
  },
  {
    x: "45%",
    y: "15%",
    duration: 9.5,
    delay: 2.5,
  },
  {
    x: "60%",
    y: "90%",
    duration: 8.5,
    delay: 1.8,
  },
  {
    x: "20%",
    y: "45%",
    duration: 10.5,
    delay: 3.5,
  },
  {
    x: "85%",
    y: "10%",
    duration: 11.5,
    delay: 0.3,
  },
  {
    x: "50%",
    y: "50%",
    duration: 9.2,
    delay: 2.2,
  },
  {
    x: "15%",
    y: "95%",
    duration: 10.8,
    delay: 1.5,
  },
  {
    x: "70%",
    y: "40%",
    duration: 8.8,
    delay: 2.8,
  },
];

// =================================
// Component
// =================================

export default function CTA() {
  return (
    <section
      className="
relative
py-28
bg-[#0F2E26]
overflow-hidden
"
    >
      {/* Background Pattern & Glows */}

      {/* Islamic Geometric Pattern */}
      <div
        className="
absolute
inset-0
opacity-[0.03]
bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgMTBMNTAgMzAgMzAgNTAgMTAgMzBMMzAgMTB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEJGMzciIHN0cm9rZS13aWR0aD0iMC41Ii8+PHBhdGggZD0iTTMwIDBMMzAgNjBNMCAzMEw2MCAzME0wIDBMNjAgNjBNNjAgMEwwIDYwIiBzdHJva2U9IiNENEJGMzciIHN0cm9rZS13aWR0aD0iMC4yIi8+PC9zdmc+')]
bg-repeat
"
      />

      {/* Soft Glowing Orbs */}
      <motion.div
        className="
absolute
w-[600px]
h-[600px]
rounded-full
bg-[#D4AF37]/10
blur-3xl
top-[-300px]
right-[-200px]
"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
absolute
w-[400px]
h-[400px]
rounded-full
bg-[#D4AF37]/5
blur-3xl
bottom-[-200px]
left-[-100px]
"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gold Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {CTA_PARTICLES.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#D4AF37]/20"
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [null, "-30%", null],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-medium text-sm backdrop-blur-sm border border-[#D4AF37]/10"
          >
            <Sparkles size={16} className="text-[#D4AF37]" />
            Begin Your Spiritual Journey
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Your Journey Of Faith,
            <br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#e5c15a] to-[#D4AF37] bg-clip-text text-transparent">
              Knowledge & Growth
            </span>{" "}
            Starts Here
          </motion.h2>

          {/* Ecosystem Identity */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-6 flex flex-wrap justify-center gap-3 md:gap-5 text-white/50 text-sm font-medium tracking-wide"
          >
            <span>Quran</span>
            <span className="text-[#D4AF37]/30">•</span>
            <span>Hadith</span>
            <span className="text-[#D4AF37]/30">•</span>
            <span>AI Assistant</span>
            <span className="text-[#D4AF37]/30">•</span>
            <span>Prayer</span>
            <span className="text-[#D4AF37]/30">•</span>
            <span>Learning</span>
            <span className="text-[#D4AF37]/30">•</span>
            <span>Community</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            viewport={{ once: true }}
            className="mt-6 text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Explore the beauty of Islam through an integrated ecosystem designed
            to deepen your connection with faith and knowledge.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-5"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/quran"
                className="
flex
items-center
justify-center
gap-2.5
px-10
py-4.5
rounded-full
bg-gradient-to-r
from-[#D4AF37]
to-[#e5c15a]
text-[#0F2E26]
font-bold
text-base
shadow-lg
shadow-[#D4AF37]/20
hover:shadow-[#D4AF37]/40
transition-all
duration-300
"
              >
                Start Exploring
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/download"
                className="
flex
items-center
justify-center
gap-2.5
px-10
py-4.5
rounded-full
border
border-white/20
text-white
font-semibold
hover:bg-white/10
hover:border-white/40
transition-all
duration-300
backdrop-blur-sm
bg-white/5
"
              >
                <Smartphone size={18} />
                Download App
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/50 text-sm"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 size={16} className="text-[#D4AF37]" />
              Free Forever
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 size={16} className="text-[#D4AF37]" />
              No Advertisements
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 size={16} className="text-[#D4AF37]" />
              Built For Ummah
            </motion.div>
          </motion.div>

          {/* Inspirational Line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-8 flex items-center justify-center gap-3 text-white/30 text-sm tracking-widest uppercase"
          >
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
            <span className="flex items-center gap-2">
              <Heart size={12} className="text-[#D4AF37]/40" />
              Knowledge. Faith. Connection.
              <Heart size={12} className="text-[#D4AF37]/40" />
            </span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
