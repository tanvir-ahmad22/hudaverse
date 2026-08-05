"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Plus,
  Minus,
  HelpCircle,
  MessageCircle,
  Users,
  Shield,
  Globe,
  BookOpen,
  ChevronRight,
  Home,
  Bot,
  Star,
  Smartphone,
  User,
} from "lucide-react";

// =================================
// FAQ Data
// =================================

const faqs = [
  {
    id: 1,
    category: "About HudaVerse",
    icon: Home,
    question: "What is HudaVerse?",
    answer:
      "HudaVerse is a comprehensive Islamic digital ecosystem that combines Quran, Hadith, AI Assistant, Prayer Times, and learning tools into one seamless platform. Our mission is to make authentic Islamic knowledge accessible to everyone through modern technology.",
  },
  {
    id: 2,
    category: "AI Assistant",
    icon: Bot,
    question: "How does HudaVerse AI verify Islamic answers?",
    answer:
      "HudaVerse AI cross-references answers with authentic Quranic verses, Sahih Hadith collections, and trusted scholarly interpretations. Each response includes source references for verification, ensuring accuracy and reliability.",
  },
  {
    id: 3,
    category: "Quran & Hadith",
    icon: BookOpen,
    question: "Are Quran and Hadith sources authentic?",
    answer:
      "Yes, all Quranic texts follow the Uthmani script with Tajweed rules. Hadith are sourced from authenticated collections including Sahih Bukhari, Sahih Muslim, and other major compilations, ensuring complete authenticity.",
  },
  {
    id: 4,
    category: "Account",
    icon: User,
    question: "Does HudaVerse store my personal data?",
    answer:
      "HudaVerse respects your privacy. We store minimal data required for personalization like bookmarks and preferences. All data is encrypted and never shared with third parties, ensuring your information stays secure.",
  },
  {
    id: 5,
    category: "About HudaVerse",
    icon: Globe,
    question: "Is HudaVerse available worldwide?",
    answer:
      "Yes, HudaVerse is accessible globally. We support multiple languages including Arabic, English, Urdu, and Indonesian, with more languages being added to serve our diverse Muslim community worldwide.",
  },
  {
    id: 6,
    category: "Mobile App",
    icon: Smartphone,
    question: "Can I use HudaVerse on mobile?",
    answer:
      "Yes, HudaVerse is fully optimized for mobile devices and available on both Android and iOS platforms. The mobile apps provide a seamless experience with all features accessible on the go.",
  },
  {
    id: 7,
    category: "Quran & Hadith",
    icon: Star,
    question: "Can I save Quran verses and Hadith?",
    answer:
      "Yes, users can bookmark Quran verses, Hadith, and their favorite Islamic content. Your bookmarks are synced across devices, allowing you to access your saved content anytime, anywhere.",
  },
  {
    id: 8,
    category: "About HudaVerse",
    icon: Shield,
    question: "Can scholars contribute content to HudaVerse?",
    answer:
      "Absolutely! We welcome contributions from qualified Islamic scholars. Our platform includes a scholar verification system to ensure content accuracy and authenticity, maintaining the highest standards of Islamic knowledge.",
  },
  {
    id: 9,
    category: "About HudaVerse",
    icon: Users,
    question: "How can I support HudaVerse?",
    answer:
      "You can support HudaVerse through community contributions, sharing the platform with others, providing feedback, or volunteering for translation and content development. Your support helps us grow and serve the community better.",
  },
];

// =================================
// Component
// =================================

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(faqs.map((faq) => faq.category))),
  ];

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
      },
    },
  };

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-[#F7F8F5]">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#154D40]/5 to-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#154D40]/5 to-[#D4AF37]/5 rounded-full blur-3xl" />

        {/* Islamic Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 50px, #154D40 50px, #154D40 51px),
                repeating-linear-gradient(90deg, transparent, transparent 50px, #154D40 50px, #154D40 51px),
                repeating-linear-gradient(45deg, transparent, transparent 70px, #D4AF37 70px, #D4AF37 71px),
                repeating-linear-gradient(-45deg, transparent, transparent 70px, #D4AF37 70px, #D4AF37 71px)
              `,
              backgroundSize:
                "100px 100px, 100px 100px, 140px 140px, 140px 140px",
            }}
          />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#154D40]/10 shadow-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 flex items-center justify-center"
            >
              <HelpCircle size={16} className="text-[#D4AF37]" />
            </motion.div>
            <span className="text-[#154D40] font-semibold text-xs tracking-widest uppercase">
              Knowledge Base
            </span>
            <div className="w-px h-4 bg-[#154D40]/20" />
            <span className="text-gray-500 text-xs">FAQ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold text-[#154D40] leading-tight tracking-tight"
          >
            Frequently Asked
            <br />
            <span className="relative inline-block">
              Questions
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/20 rounded-full"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-5 text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to know about HudaVerse ecosystem, AI assistant,
            Quran, Hadith, and learning experience.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeCategory === category
                    ? "bg-[#154D40] text-white shadow-lg shadow-[#154D40]/20"
                    : "bg-white/80 text-gray-600 hover:bg-white hover:text-[#154D40] border border-[#E5E9E2] hover:border-[#154D40]/30"
                }
              `}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          {filteredFaqs.map((item) => {
            const active = open === item.id;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                viewport={{ once: true }}
                layout
              >
                <div
                  className={`
                    relative rounded-2xl transition-all duration-500
                    ${
                      active
                        ? "bg-gradient-to-br from-[#154D40] to-[#1a5a4a] shadow-2xl shadow-[#154D40]/20"
                        : "bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-[#154D40]/5 border border-[#E5E9E2] hover:border-[#154D40]/20"
                    }
                  `}
                >
                  {/* Active Glow Effect */}
                  {active && (
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 rounded-2xl blur-xl opacity-50" />
                  )}

                  <button
                    type="button"
                    onClick={() => setOpen(active ? null : item.id)}
                    className="relative w-full flex items-center justify-between p-5 md:p-6 text-left z-10"
                    aria-expanded={active}
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div
                        className={`
                          w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300
                          ${
                            active
                              ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                              : "bg-[#154D40]/10 text-[#154D40] group-hover:bg-[#154D40] group-hover:text-white"
                          }
                        `}
                      >
                        <Icon size={18} />
                      </div>

                      <div className="flex-1 min-w-0">
                        {!active && (
                          <span className="text-xs font-medium text-[#D4AF37] uppercase tracking-wider mb-1 block">
                            {item.category}
                          </span>
                        )}
                        <span
                          className={`
                            font-semibold text-base md:text-lg transition-colors duration-300 block
                            ${
                              active
                                ? "text-white"
                                : "text-[#154D40] group-hover:text-[#154D40]"
                            }
                          `}
                        >
                          {item.question}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`
                        ml-4 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500
                        ${
                          active
                            ? "bg-[#D4AF37] rotate-180"
                            : "bg-[#154D40]/10 group-hover:bg-[#154D40]"
                        }
                      `}
                    >
                      {active ? (
                        <Minus size={16} className="text-[#154D40]" />
                      ) : (
                        <Plus
                          size={16}
                          className="text-[#154D40] group-hover:text-white transition-colors"
                        />
                      )}
                    </div>
                  </button>

                  <AnimatePresence mode="wait">
                    {active && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                            opacity: { duration: 0.3, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                            opacity: { duration: 0.2 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 pl-[60px] md:pl-[72px] pr-12 md:pr-16">
                          <div className="relative">
                            {/* Decorative Line */}
                            <div className="absolute -left-6 md:-left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />

                            <motion.div
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              <p className="text-white/90 leading-relaxed text-sm md:text-base">
                                {item.answer}
                              </p>

                              {item.id === 9 && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                  className="mt-4 flex flex-wrap items-center gap-3"
                                >
                                  <button
                                    type="button"
                                    className="text-sm text-[#D4AF37] font-semibold hover:text-white transition-colors flex items-center gap-1"
                                  >
                                    Learn more
                                    <ChevronRight size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    className="text-sm text-[#D4AF37] font-semibold hover:text-white transition-colors flex items-center gap-1"
                                  >
                                    Support us
                                    <ChevronRight size={14} />
                                  </button>
                                </motion.div>
                              )}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#154D40] to-[#1a5a4a] p-8 md:p-10">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-2xl" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-white font-bold text-xl md:text-2xl">
                  Still have questions?
                </h4>
                <p className="text-white/70 text-sm mt-1 max-w-md">
                  Our team is here to help you on your journey with HudaVerse
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  className="group px-6 py-3 bg-[#D4AF37] text-[#154D40] rounded-full font-semibold text-sm hover:bg-white transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <MessageCircle
                    size={16}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  Ask AI Assistant
                </button>
                <button
                  type="button"
                  className="group px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-sm hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-2"
                >
                  <Users size={16} />
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
