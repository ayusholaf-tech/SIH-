import React from 'react';

export default function RiskBadge({ severity, score, size = "md", showScore = true }) {
  // Normalize severity to 3 tiers
  let normalizedSeverity = severity ? severity.toUpperCase() : 'LOW';
  if (normalizedSeverity === 'CRITICAL') normalizedSeverity = 'HIGH';
  if (normalizedSeverity === 'MODERATE') normalizedSeverity = 'MEDIUM';

  const getColors = () => {
    switch (normalizedSeverity) {
      case 'HIGH':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/40 glow-rose';
      case 'MEDIUM':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/40 glow-amber';
      case 'LOW':
      default:
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 glow-emerald';
    }
  };

  const getDotColor = () => {
    switch (normalizedSeverity) {
      case 'HIGH':
        return 'bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse';
      case 'MEDIUM':
        return 'bg-amber-400 shadow-[0_0_8px_#fbbf24]';
      case 'LOW':
      default:
        return 'bg-emerald-400 shadow-[0_0_8px_#34d399]';
    }
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm font-semibold"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border font-mono uppercase tracking-wider ${getColors()} ${sizeClasses[size] || sizeClasses.md}`}>
      <span className={`h-2 w-2 rounded-full ${getDotColor()}`} />
      <span>{normalizedSeverity} RISK</span>
      {showScore && score !== undefined && (
        <span className="ml-1 pl-1.5 border-l border-current/30 font-bold">
          {score}/100
        </span>
      )}
    </span>
  );
}
