import React from 'react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip 
} from 'recharts';
import { Sliders, TreePine, AlertTriangle, Mountain, CloudRain, Thermometer, ShieldCheck } from 'lucide-react';

export default function FactorBreakdownRadar({ factors }) {
  // Normalize factor metrics onto a 0-100 scale for radar visualization
  const radarData = [
    {
      subject: 'Vegetation Loss',
      factor: 'Vegetation Loss',
      value: Math.min(100, Math.round(factors.vegetationLoss * 2.2)),
      rawText: `${factors.vegetationLoss}% Loss`,
      weight: '25% Weight',
      icon: TreePine,
      color: '#f43f5e'
    },
    {
      subject: 'Land Disturbance',
      factor: 'Land Disturbance',
      value: Math.min(100, Math.round(factors.landDisturbance * 10)),
      rawText: `${factors.landDisturbance}/10 Index`,
      weight: '25% Weight',
      icon: AlertTriangle,
      color: '#f59e0b'
    },
    {
      subject: 'Slope Gradient',
      factor: 'Slope Gradient',
      value: Math.min(100, Math.round((factors.slopeGradient / 60) * 100)),
      rawText: `${factors.slopeGradient}° Incline`,
      weight: '20% Weight',
      icon: Mountain,
      color: '#38bdf8'
    },
    {
      subject: '24h Rainfall',
      factor: '24h Rainfall',
      value: Math.min(100, Math.round((factors.rainfall24h / 200) * 100)),
      rawText: `${factors.rainfall24h} mm`,
      weight: '15% Weight',
      icon: CloudRain,
      color: '#06b6d4'
    },
    {
      subject: 'Thermal Anomaly',
      factor: 'Thermal Anomaly',
      value: Math.min(100, Math.round((factors.temperatureAnomaly / 5) * 100)),
      rawText: `+${factors.temperatureAnomaly}°C Anomaly`,
      weight: '15% Weight',
      icon: Thermometer,
      color: '#ec4899'
    }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
            <Sliders className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display">
              Multi-Dimensional Threat Matrix
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Biophysical & meteorological stress contribution weights
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-cyan-400 border border-slate-700">
          5-FACTOR MODEL
        </span>
      </div>

      {/* Radar Chart */}
      <div className="h-56 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke="#1e293b" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
            <Radar
              name="Threat Vector"
              dataKey="value"
              stroke="#06b6d4"
              fill="#06b6d4"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Factor Breakdown List */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        {radarData.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.factor} className="flex items-center justify-between text-xs font-mono p-1.5 rounded-lg bg-slate-950/50 border border-slate-800/80">
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5" style={{ color: item.color }} />
                <span className="text-slate-300 font-semibold">{item.factor}</span>
                <span className="text-[10px] text-slate-500">({item.weight})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
                <span className="font-bold text-white min-w-[70px] text-right">
                  {item.rawText}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
