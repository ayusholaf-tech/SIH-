import React from 'react';

export default function MetricCard({ title, value, unit, subtitle, icon: Icon, trend, trendType = "neutral", alert = false }) {
  const getTrendColor = () => {
    if (trendType === "danger") return "text-rose-400 bg-rose-500/10 border-rose-500/30";
    if (trendType === "warning") return "text-amber-400 bg-amber-500/10 border-amber-500/30";
    if (trendType === "positive") return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    return "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border p-5 transition-all duration-200 bg-slate-900/80 backdrop-blur-md ${
      alert ? "border-rose-500/50 glow-rose" : "border-slate-800 hover:border-slate-700 shadow-lg"
    }`}>
      {/* Background HUD accent lines */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 h-[2px] w-12 bg-cyan-500/40" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 font-mono">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-white font-display">
              {value}
            </span>
            {unit && (
              <span className="text-sm font-semibold text-slate-400 font-mono">
                {unit}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className="rounded-lg border border-slate-800 bg-slate-800/60 p-2.5 text-cyan-400 shadow-inner">
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
        <span className="text-slate-400 truncate max-w-[180px]">
          {subtitle}
        </span>

        {trend && (
          <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[11px] font-medium border ${getTrendColor()}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
