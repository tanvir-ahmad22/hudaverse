import React from 'react';

interface LogoProps {
  /** Shrinks the mark and hides the tagline — used on scroll and on mobile. */
  compact?: boolean;
  className?: string;
}

export const Logo = React.memo(function Logo({ compact = false, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className={`shrink-0 transition-all duration-300 ${compact ? 'h-8 w-8' : 'h-10 w-10'}`}
      >
        <path
          d="M24 4a16 16 0 1 0 0 32 13 13 0 1 1 0-32Z"
          fill="none"
          stroke="url(#hudaverse-gold)"
          strokeWidth="1.6"
        />
        <path
          d="m30 8 1.1 2.6L34 12l-2.9 1.4L30 16l-1.1-2.6L26 12l2.9-1.4L30 8Z"
          fill="url(#hudaverse-gold)"
        />
        <defs>
          <linearGradient id="hudaverse-gold" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#F3D27A" />
            <stop offset="100%" stopColor="#C9962E" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex min-w-0 flex-col leading-none">
        <span
          className={`whitespace-nowrap font-serif font-bold tracking-tight transition-all duration-300 ${
            compact ? 'text-lg' : 'text-xl'
          }`}
        >
          <span className="text-emerald-50">Huda</span>
          <span className="bg-gradient-to-b from-amber-300 to-amber-500 bg-clip-text text-transparent">
            Verse
          </span>
        </span>
        {!compact && (
          <span className="mt-0.5 whitespace-nowrap text-[11px] font-medium text-emerald-200/60">
            Your Journey to Allah
          </span>
        )}
      </div>
    </div>
  );
});
