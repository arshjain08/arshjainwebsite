'use client';

import { useTheme } from '@/components/ThemeProvider';

export default function ThemeBackground() {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Subtle paper texture */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-30'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,119,198,0.1)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>

      {/* Space backdrop */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.18),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.12),transparent_55%)]'
              : 'bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.06),transparent_45%)]'
          }`}
        />
        <div
          className={`absolute inset-0 ${
            isDark ? 'opacity-70' : 'opacity-40'
          } bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.35)_1px,transparent_0)] bg-[length:40px_40px]`}
        />
        <div
          className={`absolute inset-0 ${
            isDark ? 'opacity-60' : 'opacity-25'
          } bg-[radial-gradient(circle_at_2px_2px,rgba(226,232,240,0.5)_1px,transparent_0)] bg-[length:90px_90px]`}
        />

        {/* Sun / Moon glow */}
        <div
          className={`absolute -top-24 -left-24 w-64 h-64 rounded-full blur-2xl ${
            isDark
              ? 'bg-[radial-gradient(circle,rgba(148,163,184,0.35),transparent_65%)]'
              : 'bg-[radial-gradient(circle,rgba(253,224,71,0.45),transparent_65%)]'
          }`}
        />
        <div
          className={`absolute top-10 left-10 w-28 h-28 rounded-full shadow-2xl ${
            isDark
              ? 'bg-gradient-to-br from-slate-200 to-slate-500'
              : 'bg-gradient-to-br from-yellow-200 to-amber-400'
          }`}
        />

        {/* Planets */}
        <div className="absolute top-24 right-24 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-300/70 to-teal-600/80 shadow-lg" />
        <div className="absolute bottom-24 left-16 w-24 h-24 rounded-full bg-gradient-to-br from-violet-300/70 to-fuchsia-600/80 shadow-lg" />
        <div className="absolute bottom-32 right-40 w-16 h-16 rounded-full bg-gradient-to-br from-sky-300/70 to-blue-600/80 shadow-lg" />
        <div className="absolute bottom-36 right-32 w-28 h-6 rounded-full border border-white/30 opacity-70 rotate-[-12deg]" />
      </div>
    </div>
  );
}

