"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Coins,
  Wallet,
  Building2,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const assets = [
  { icon: Coins, label: "Gold & Silver", value: 120000 },
  { icon: Wallet, label: "Cash & Savings", value: 250000 },
  { icon: Building2, label: "Business Assets", value: 80000 },
  { icon: TrendingUp, label: "Investments", value: 50000 },
];

const features = [
  {
    icon: Wallet,
    title: "Smart Calculation",
    description: "Calculate your eligible wealth.",
  },
  {
    icon: BookOpen,
    title: "Islamic Guidance",
    description: "Understand Zakat rules.",
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure",
    description: "Your information stays protected.",
  },
  {
    icon: BarChart3,
    title: "History Tracking",
    description: "Save previous calculations.",
  },
];

function StatCounter({
  value,
  prefix = "৳ ",
}: {
  value: number;
  prefix?: string;
}) {
  const { ref, value: count } = useCountUp(value);
  return (
    <span ref={ref}>
      {prefix}
      {Math.round(count).toLocaleString()}
    </span>
  );
}

function ZakatDonut() {
  // 2.5% represented visually as a highlighted arc on a ring
  const percentage = 2.5;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (percentage / 100) * circumference * 8; // exaggerated for visibility

  return (
    <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#d1e7dd"
          strokeWidth="10"
        />
        <motion.circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="url(#zakatGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <defs>
          <linearGradient
            id="zakatGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#065f46" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-serif text-2xl font-bold text-emerald-950">
          2.5%
        </span>
        <span className="text-[10px] text-emerald-900/50">Zakat Rate</span>
      </div>
    </div>
  );
}

export default function ZakatShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9f5] to-white px-6 py-24">
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 -translate-x-1/3 -translate-y-1/3 rounded-full bg-emerald-200/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-800">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Zakat Calculator
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-emerald-950 sm:text-4xl">
            Calculate Zakat With{" "}
            <span className="text-amber-500">Confidence</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-emerald-900/60">
            A simple, secure and guided experience based on Islamic principles
            and trusted references.
          </p>
        </div>

        {/* Interactive Dashboard */}
        <div className="mt-14 overflow-hidden rounded-[2rem] border border-emerald-900/5 bg-white shadow-[0_20px_60px_-15px_rgba(6,78,59,0.15)]">
          {/* Top stat bar */}
          <div className="grid grid-cols-2 divide-x divide-emerald-900/5 border-b border-emerald-900/5 bg-emerald-950 text-white sm:grid-cols-4">
            {assets.map((asset) => {
              const Icon = asset.icon;
              return (
                <div
                  key={asset.label}
                  className="flex flex-col items-center gap-2 px-4 py-6 text-center"
                >
                  <Icon className="h-5 w-5 text-amber-400" />
                  <p className="text-lg font-bold">
                    <StatCounter value={asset.value} />
                  </p>
                  <p className="text-[10px] text-white/50">{asset.label}</p>
                </div>
              );
            })}
          </div>

          {/* Dashboard body */}
          <div className="grid grid-cols-1 items-center gap-10 p-8 lg:grid-cols-[auto_1fr] lg:p-12">
            {/* Donut + total */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
              <ZakatDonut />
              <div className="text-center sm:text-left">
                <p className="text-xs text-emerald-900/50">Total Assets</p>
                <p className="font-serif text-3xl font-bold text-emerald-950">
                  <StatCounter value={500000} />
                </p>
                <div className="mt-3 rounded-xl bg-amber-50 px-4 py-2.5">
                  <p className="text-xs text-amber-700/70">Your Zakat</p>
                  <p className="font-serif text-2xl font-bold text-amber-600">
                    <StatCounter value={12500} />
                  </p>
                </div>
              </div>
            </div>

            {/* Feature list */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 rounded-2xl border border-emerald-900/5 p-4 transition hover:border-amber-200 hover:bg-amber-50/30"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-950">
                        {feature.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-emerald-900/50">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA bar */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-emerald-900/5 bg-emerald-50/40 px-8 py-6 sm:flex-row">
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-900/60">
              Simple. Secure. Spiritual.
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            </span>
            <Link
              href="/zakat"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-800"
            >
              Calculate Zakat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
