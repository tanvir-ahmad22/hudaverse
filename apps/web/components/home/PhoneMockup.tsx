import {
  BookOpen,
  Heart,
  CircleDot,
  Compass,
  Home,
  User,
  Bot,
} from "lucide-react";

const quickActions = [
  { label: "Quran", icon: BookOpen, color: "bg-teal-600" },
  { label: "Dua", icon: Heart, color: "bg-amber-400 text-emerald-950" },
  { label: "Tasbih", icon: CircleDot, color: "bg-teal-600" },
  { label: "Qibla", icon: Compass, color: "bg-teal-600" },
];

export default function PhoneMockup() {
  return (
    <div className="relative h-[440px] w-[220px] rounded-[2.2rem] border-[6px] border-black bg-black shadow-[8px_20px_40px_rgba(0,0,0,0.5),inset_-3px_0_4px_rgba(255,255,255,0.1)] sm:h-[480px] sm:w-[240px]">
      {/* Camera dot */}
      <div className="absolute right-6 top-3 z-10 h-2 w-2 rounded-full bg-white/20" />

      {/* Screen content */}
      <div className="flex h-full flex-col overflow-hidden rounded-[1.7rem] bg-emerald-950 px-3.5 pb-3 pt-6">
        {/* App header row */}
        <div className="flex items-center justify-between">
          <span className="font-serif text-[11px] font-semibold text-white">
            Huda<span className="text-amber-400">Verse</span>
          </span>
          <div className="h-4 w-4 rounded-full bg-white/10" />
        </div>

        {/* Greeting */}
        <p className="mt-3 flex items-center gap-1 text-[10px] text-white/60">
          Assalamu Alaikum
          <Heart className="h-2.5 w-2.5 fill-rose-400 text-rose-400" />
        </p>
        <p className="text-[13px] font-semibold text-white">Tanvir Ahmed</p>
        <p className="mt-0.5 text-[8px] text-white/40">
          16 Dhul Hijjah 1446 AH · 22 June 2025
        </p>

        {/* Prayer time card */}
        <div className="mt-3 rounded-2xl bg-teal-700/40 p-3">
          <span className="text-[9px] font-medium text-white/60">Asr</span>
          <p className="mt-1 text-xl font-bold tracking-tight text-white">
            01:45:32
          </p>
          <p className="text-[8px] text-white/40">Remaining</p>
        </div>

        {/* Quick actions */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[9px] font-medium text-white/50">
            Quick Actions
          </span>
          <span className="text-[8px] text-white/40">View All</span>
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {quickActions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${item.color}`}
                >
                  <Icon className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-[7px] text-white/60">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Daily verse card */}
        <div className="mt-3 flex-1 rounded-2xl bg-teal-800/30 p-3">
          <p className="text-[9px] font-medium text-white/50">Daily Verse</p>
          <p
            className="mt-2 text-right font-serif text-[13px] leading-relaxed text-white"
            dir="rtl"
          >
            لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا
          </p>
          <p className="mt-2 text-[8px] leading-relaxed text-white/50">
            Allah does not burden a soul beyond that it can bear.
          </p>
        </div>

        {/* Bottom nav */}
        <div className="mt-2 flex items-center justify-between px-1 pt-2">
          {[
            { icon: Home, label: "Home", active: true },
            { icon: BookOpen, label: "Quran", active: false },
            { icon: Bot, label: "AI", active: false },
            { icon: User, label: "Profile", active: false },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex flex-col items-center gap-0.5"
              >
                <Icon
                  className={`h-3.5 w-3.5 ${
                    item.active ? "text-amber-400" : "text-white/40"
                  }`}
                />
                <span
                  className={`text-[7px] ${
                    item.active ? "text-amber-400" : "text-white/30"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
