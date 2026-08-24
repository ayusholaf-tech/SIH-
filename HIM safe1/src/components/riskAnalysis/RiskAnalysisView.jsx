import React from 'react';
import { 
  Sliders, 
  MapPin, 
  TrendingUp, 
  Activity, 
  ShieldAlert, 
  Layers, 
  Calendar,
  Zap
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import RiskScoreGauge from './RiskScoreGauge';
import FactorBreakdownRadar from './FactorBreakdownRadar';
import RiskSimulator from './RiskSimulator';
import RiskBadge from '../common/RiskBadge';
import { HIMALAYAN_ZONES } from '../../data/himalayanZones';

export default function RiskAnalysisView({ activeZone, onSelectZone }) {
  const currentZone = activeZone || HIMALAYAN_ZONES[0];

  const CustomTrendTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs font-sans">
          <p className="font-bold text-white mb-1">{label}</p>
          <div className="space-y-1 font-mono text-[11px]">
            <p className="text-rose-400">Risk Score: {payload[0]?.value}/100</p>
            <p className="text-cyan-400">Rainfall: {payload[1]?.value} mm</p>
            <p className="text-emerald-400">Veg Loss: {payload[2]?.value}%</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Zone Picker */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
              <Sliders className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Multi-Factor Environmental Risk Engine
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Mathematical multi-criteria evaluation (MCE) integrating GIS terrain & weather indices
              </p>
            </div>
          </div>
        </div>

        {/* Location selector pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-mono text-slate-500 whitespace-nowrap hidden sm:inline">SECTOR:</span>
          {HIMALAYAN_ZONES.map(z => {
            const isSelected = currentZone.id === z.id;
            return (
              <button
                key={z.id}
                onClick={() => onSelectZone(z)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-950'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <MapPin className="h-3 w-3" />
                <span>{z.name.split(' ')[0]}</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-slate-800 text-slate-300">
                  {z.riskScore}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Two Column Analytics: Risk Score Gauge + 5-Factor Radar Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RiskScoreGauge
            score={currentZone.riskScore}
            zoneName={currentZone.name}
            severity={currentZone.severity}
          />
        </div>

        <div className="lg:col-span-2">
          <FactorBreakdownRadar factors={currentZone.factors} />
        </div>
      </div>

      {/* Historical Vulnerability Progression Chart */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                6-Month Risk & Climatic Trendline ({currentZone.name})
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Seasonal correlation: Precipitation surges & escalating vegetative slope weakening
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-emerald-400 border border-slate-700">
            DEC 2025 – MAY 2026
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentZone.historicalTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2e4d" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                axisLine={{ stroke: '#1f2e4d' }}
                tickLine={{ stroke: '#1f2e4d' }}
              />
              <YAxis 
                domain={[0, 200]}
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                axisLine={{ stroke: '#1f2e4d' }}
                tickLine={{ stroke: '#1f2e4d' }}
              />
              <Tooltip content={<CustomTrendTooltip />} />
              <Area 
                type="monotone" 
                dataKey="risk" 
                name="Risk Score" 
                stroke="#f43f5e" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#riskGrad)" 
              />
              <Area 
                type="monotone" 
                dataKey="rainfall" 
                name="24h Rainfall (mm)" 
                stroke="#06b6d4" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#rainGrad)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="h-2 w-2 rounded-full bg-rose-500"></span>
              Composite Risk Score (0-100)
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
              24h Rainfall (mm)
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            Source: Simulated prototype dataset
          </span>
        </div>
      </div>

      {/* Interactive What-If Risk Simulator */}
      <RiskSimulator zone={currentZone} />
    </div>
  );
}
