"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Clock3,
  MapPin,
  Bell,
  Navigation,
  ArrowRight,
  CheckCircle2,
  Circle,
  Compass,
  Calendar,
  ChevronRight,
  BellRing,
  Sun,
  Moon,
} from "lucide-react";

// ================================
// Prayer Data
// ================================

const prayers = [
  { name: "Fajr", time: "05:12 AM", isCompleted: true, icon: Sun },
  { name: "Dhuhr", time: "12:15 PM", isCompleted: true, icon: Sun },
  {
    name: "Asr",
    time: "03:45 PM",
    isNext: true,
    isCompleted: false,
    icon: Sun,
  },
  { name: "Maghrib", time: "06:20 PM", isCompleted: false, icon: Moon },
  { name: "Isha", time: "07:45 PM", isCompleted: false, icon: Moon },
];

const features = [
  {
    icon: MapPin,
    title: "Accurate Location Timing",
    description: "Prayer times based on your location",
  },
  {
    icon: Bell,
    title: "Smart Prayer Reminder",
    description: "Never miss your Salah",
  },
  {
    icon: Compass,
    title: "Qibla Direction",
    description: "Find direction anywhere",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function PrayerTimes() {
  return (
    <section className="py-24 bg-[#F7F8F5] relative overflow-hidden">
      {/* Islamic Geometric Pattern - Very Subtle */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, #154D40 1px, transparent 1px),
              radial-gradient(circle at 80% 50%, #154D40 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(60deg, #154D40 1px, transparent 1px),
              linear-gradient(-60deg, #154D40 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* =====================
              Left Content
          ====================== */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#154D40]/10 text-[#154D40] font-semibold text-sm border border-[#154D40]/5">
              <Clock3 size={16} className="text-[#D4AF37]" />
              Daily Prayer Companion
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-6 text-4xl md:text-5xl font-bold leading-tight"
            >
              <span className="text-[#154D40]">Stay Connected</span>
              <br />
              <span className="text-[#154D40]">With Allah </span>
              <span className="text-[#D4AF37]">Through Every Prayer</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 text-gray-600 text-lg leading-relaxed max-w-lg"
            >
              Experience accurate prayer times with intelligent reminders and
              Qibla direction support — everything you need to maintain your
              daily connection with Allah.
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="mt-8 space-y-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    x: 6,
                    transition: { duration: 0.2 },
                  }}
                  className="flex items-start gap-4 group cursor-default p-2 rounded-xl hover:bg-[#154D40]/5 transition-colors duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#154D40] flex items-center justify-center group-hover:bg-[#154D40]/90 transition-colors duration-300 flex-shrink-0">
                    <feature.icon className="text-[#D4AF37]" size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#154D40] font-semibold group-hover:text-[#D4AF37] transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link
                href="/prayer-times"
                className="inline-flex items-center gap-2 mt-10 px-7 py-4 rounded-full bg-[#154D40] text-white font-semibold hover:bg-[#103b31] transition-all duration-300 group shadow-lg shadow-[#154D40]/20 hover:shadow-xl hover:shadow-[#154D40]/30"
              >
                Explore Prayer Tools
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* =====================
              Prayer Dashboard
          ====================== */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Subtle glow behind card */}
            <div className="absolute -inset-4 bg-[#D4AF37]/5 blur-2xl rounded-[40px]" />

            <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-[#E8ECE5] relative">
              {/* Gold accent top line */}
              <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

              {/* Header with Location & Date */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={14} className="text-[#D4AF37]" />
                    <span>Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <h3 className="text-lg font-bold text-[#154D40]">
                      Monday, 27 Jul 2026
                    </h3>
                    <span className="text-xs text-gray-400">•</span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-[#F7F8F5] px-2.5 py-1 rounded-full">
                      <Calendar size={12} className="text-[#D4AF37]" />2
                      Muharram 1448
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{
                    rotate: [0, 8, -8, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-12 h-12 rounded-2xl bg-[#154D40] flex items-center justify-center shadow-lg shadow-[#154D40]/20"
                >
                  <Clock3 className="text-[#D4AF37]" size={24} />
                </motion.div>
              </div>

              {/* Next Prayer - Hero Element */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 rounded-2xl bg-gradient-to-br from-[#154D40] to-[#1a5a4a] p-6 text-white relative overflow-hidden"
              >
                {/* Animated glow effect */}
                <motion.div
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 via-transparent to-transparent"
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm font-medium flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
                        </span>
                        Next Prayer
                      </p>
                      <h4 className="mt-1.5 text-3xl font-bold tracking-wide">
                        Asr
                      </h4>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-xs font-medium">
                        Remaining
                      </p>
                      <motion.p
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-[#D4AF37] text-2xl font-bold font-mono tracking-wider"
                      >
                        02:35:20
                      </motion.p>
                    </div>
                  </div>
                  {/* Small timer progress bar */}
                  <div className="mt-3 h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "65%" }}
                      animate={{ width: "68%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-full bg-[#D4AF37] rounded-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Prayer List */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className="mt-5 space-y-1.5"
              >
                {prayers.map((prayer, index) => {
                  const Icon = prayer.icon;
                  return (
                    <motion.div
                      key={prayer.name}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.01,
                        transition: { duration: 0.2 },
                      }}
                      className={`
                        flex justify-between items-center p-3 rounded-xl transition-all duration-300
                        ${
                          prayer.isNext
                            ? "bg-[#154D40]/5 border-2 border-[#154D40]/15 shadow-sm"
                            : "hover:bg-[#F7F8F5] border-2 border-transparent"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <motion.div
                          animate={
                            prayer.isNext
                              ? {
                                  scale: [1, 1.2, 1],
                                }
                              : {}
                          }
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="flex-shrink-0"
                        >
                          {prayer.isCompleted ? (
                            <CheckCircle2
                              className="text-[#154D40]"
                              size={18}
                            />
                          ) : prayer.isNext ? (
                            <Circle
                              className="text-[#D4AF37] fill-[#D4AF37]/15"
                              size={18}
                            />
                          ) : (
                            <Circle className="text-gray-300" size={18} />
                          )}
                        </motion.div>
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon
                            size={14}
                            className={`
                              flex-shrink-0
                              ${prayer.isNext ? "text-[#D4AF37]" : "text-gray-400"}
                            `}
                          />
                          <span
                            className={`
                              font-semibold text-sm truncate
                              ${
                                prayer.isNext
                                  ? "text-[#154D40]"
                                  : prayer.isCompleted
                                    ? "text-[#154D40]"
                                    : "text-gray-500"
                              }
                            `}
                          >
                            {prayer.name}
                          </span>
                          {prayer.isNext && (
                            <span className="text-[10px] text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-2 py-0.5 rounded-full flex-shrink-0">
                              Next
                            </span>
                          )}
                          {prayer.isCompleted && (
                            <span className="text-[10px] text-[#154D40]/50 font-medium flex-shrink-0">
                              ✓ Done
                            </span>
                          )}
                        </div>
                      </div>
                      <span
                        className={`
                          text-sm flex-shrink-0 ml-2
                          ${
                            prayer.isNext
                              ? "text-[#154D40] font-semibold"
                              : "text-gray-600"
                          }
                        `}
                      >
                        {prayer.time}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Bottom Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-5 pt-4 border-t border-[#E8ECE5] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F7F8F5] hover:bg-[#154D40]/5 rounded-full text-xs font-medium text-[#154D40] transition-all duration-300"
                  >
                    <Compass size={14} className="text-[#D4AF37]" />
                    Qibla Direction
                    <ChevronRight size={12} className="opacity-50" />
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-full text-xs font-medium text-[#D4AF37] transition-all duration-300"
                >
                  <BellRing size={14} />
                  Reminder ON
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
