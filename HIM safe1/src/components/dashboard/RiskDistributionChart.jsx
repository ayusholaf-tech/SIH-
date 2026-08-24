import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell,
  CartesianGrid 
} from 'recharts';
import { HIMALAYAN_ZONES } from '../../data/himalayanZones';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function RiskDistributionChart({ onSelectZone, activeZone }) {
  const chartData = HIMALAYAN_ZONES.map(z => ({
    name: z.name.split(' ')[0], // Short name
    fullName: z.name,
    score: z.riskScore,
    severity: z.severity,
    vegLoss: z.factors.vegetationLoss,
    rainfall: z.factors.rainfall24h,
    rawZone: z
  }));

  const getBarColor = (severity) => {
    if (severity === 'HIGH' || severity === 'CRITICAL') return '#f43f5e';
    if (severity === 'MEDIUM' || severity === 'MODERATE') return '#f59e0b';
    return '#10b981';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-950 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs font-sans">
          <p className="font-bold text-white mb-1">{data.fullName}</p>
          <div className="space-y-1 font-mono text-[11px]">
            <p className="text-cyan-400">
              Risk Score: <span className="font-bold text-white">{data.score}/100</span> [{data.severity}]
            </p>
            <p className="text-rose-400">Canopy Loss: {data.vegLoss}%</p>
            <p className="text-blue-400">24h Rainfall: {data.rainfall} mm</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display">
              Regional Risk Score Spectrum
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Comparative 0–100 vulnerability index across monitored zones
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-slate-800/80 px-2 py-0.5 rounded text-slate-400 border border-slate-700">
          3-TIER CLASSIFICATION
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2e4d" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              axisLine={{ stroke: '#1f2e4d' }}
              tickLine={{ stroke: '#1f2e4d' }}
              angle={-25}
              textAnchor="end"
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              axisLine={{ stroke: '#1f2e4d' }}
              tickLine={{ stroke: '#1f2e4d' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="score" 
              radius={[6, 6, 0, 0]}
              onClick={(data) => {
                if (data && data.rawZone && onSelectZone) {
                  onSelectZone(data.rawZone);
                }
              }}
              cursor="pointer"
            >
              {chartData.map((entry, index) => {
                const isSelected = activeZone?.id === entry.rawZone.id;
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getBarColor(entry.severity)}
                    stroke={isSelected ? '#38bdf8' : 'transparent'}
                    strokeWidth={isSelected ? 2 : 0}
                    opacity={isSelected ? 1 : 0.85}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-1 text-[11px] text-cyan-400">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Top Threat: Kedarnath Mandakini Basin (Score: 88)</span>
        </div>
        <span className="text-[10px] text-slate-500">Click any bar to inspect sector</span>
      </div>
    </div>
  );
}
