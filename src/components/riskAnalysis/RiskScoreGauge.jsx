import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

export default function RiskScoreGauge({ score, zoneName, severity }) {
  // Calculate stroke dashoffset for circular gauge
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return '#f43f5e';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#eab308';
    return '#10b981';
  };

  const getThreatCategory = () => {
    if (score >= 80) return 'GRADE-A CRITICAL HAZARD';
    if (score >= 60) return 'GRADE-B HIGH VULNERABILITY';
    if (score >= 40) return 'GRADE-C MODERATE CAUTION';
    return 'GRADE-D NORMAL STABILITY';
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl flex flex-col items-center justify-between text-center relative overflow-hidden">
      {/* Background HUD aura */}
      <div 
        className="absolute w-44 h-44 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: getColor() }}
      />

      <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-slate-300 uppercase">
            COMPOSITE HAZARD GAUGE
          </span>
        </div>
        <RiskBadge severity={severity} score={score} size="sm" />
      </div>

      {/* SVG Circular Progress Gauge */}
      <div className="relative my-4 flex items-center justify-center">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="#1e293b"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke={getColor()}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{ transition: 'stroke-dashoffset 0.8s ease-in-out, stroke 0.5s ease' }}
          />
        </svg>

        {/* Center Score Text */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold font-display tracking-tight text-white">
            {score}
          </span>
          <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
            OUT OF 100
          </span>
        </div>
      </div>

      {/* Classification Tag */}
      <div className="w-full bg-slate-950/80 p-3 rounded-xl border border-slate-800">
        <div className="text-xs font-mono font-bold" style={{ color: getColor() }}>
          {getThreatCategory()}
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Sector: <strong className="text-white">{zoneName}</strong>
        </p>
      </div>
    </div>
  );
}
