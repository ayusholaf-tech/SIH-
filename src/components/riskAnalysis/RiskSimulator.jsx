import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Sparkles, 
  AlertTriangle, 
  ShieldAlert, 
  TreePine, 
  CloudRain, 
  Thermometer, 
  Mountain,
  Activity,
  ArrowRight
} from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

export default function RiskSimulator({ zone, onSimulateAction }) {
  const [vegLoss, setVegLoss] = useState(zone.factors.vegetationLoss);
  const [disturbance, setDisturbance] = useState(zone.factors.landDisturbance);
  const [slope, setSlope] = useState(zone.factors.slopeGradient);
  const [rainfall, setRainfall] = useState(zone.factors.rainfall24h);
  const [tempAnomaly, setTempAnomaly] = useState(zone.factors.temperatureAnomaly);

  // Sync state when selected zone changes
  useEffect(() => {
    setVegLoss(zone.factors.vegetationLoss);
    setDisturbance(zone.factors.landDisturbance);
    setSlope(zone.factors.slopeGradient);
    setRainfall(zone.factors.rainfall24h);
    setTempAnomaly(zone.factors.temperatureAnomaly);
  }, [zone]);

  // Mathematical composite risk score calculation
  const calculateRiskScore = () => {
    const vegComponent = Math.min(100, vegLoss) * 0.25;
    const distComponent = Math.min(10, disturbance) * 10 * 0.25;
    const slopeComponent = Math.min(100, (slope / 60) * 100) * 0.20;
    const rainComponent = Math.min(100, (rainfall / 220) * 100) * 0.15;
    const tempComponent = Math.min(100, (tempAnomaly / 5) * 100) * 0.15;

    const total = vegComponent + distComponent + slopeComponent + rainComponent + tempComponent;
    return Math.min(100, Math.max(0, Math.round(total)));
  };

  const simulatedScore = calculateRiskScore();

  const getSimulatedSeverity = (score) => {
    if (score >= 80) return 'CRITICAL';
    if (score >= 60) return 'HIGH';
    if (score >= 40) return 'MODERATE';
    return 'LOW';
  };

  const simulatedSeverity = getSimulatedSeverity(simulatedScore);

  const resetToBaseline = () => {
    setVegLoss(zone.factors.vegetationLoss);
    setDisturbance(zone.factors.landDisturbance);
    setSlope(zone.factors.slopeGradient);
    setRainfall(zone.factors.rainfall24h);
    setTempAnomaly(zone.factors.temperatureAnomaly);
  };

  const getSimulatedAdvisory = () => {
    if (simulatedScore >= 85) {
      return "CODE RED: High-risk scenario simulation. Severe debris avalanche and slope liquefaction indicated in model.";
    }
    if (simulatedScore >= 70) {
      return "CODE AMBER: Elevated risk simulation. Precautionary review and slope inspection indicated.";
    }
    if (simulatedScore >= 50) {
      return "CODE YELLOW: Moderate risk simulation. Routine drainage maintenance recommended.";
    }
    return "CODE GREEN: Sector within simulated baseline tolerance.";
  };

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-5 backdrop-blur-md shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
            <Sliders className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              Interactive "What-If" Hazard Simulator
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[9px] font-mono px-1.5 py-0.2 rounded uppercase">
                SIMULATED COMPUTATION
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Adjust environmental stress variables to forecast impact and test threshold triggers
            </p>
          </div>
        </div>

        <button
          onClick={resetToBaseline}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono rounded-lg border border-slate-700 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset to Baseline Values</span>
        </button>
      </div>

      {/* Simulator Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {/* 1. Rainfall Slider */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <CloudRain className="h-4 w-4" />
              24h Rainfall:
            </span>
            <span className="font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {rainfall} mm
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="300"
            value={rainfall}
            onChange={(e) => setRainfall(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0 mm (Dry)</span>
            <span>150 mm (Heavy)</span>
            <span>300 mm (Cloudburst)</span>
          </div>
        </div>

        {/* 2. Vegetation Loss Slider */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
              <TreePine className="h-4 w-4" />
              Vegetation Loss:
            </span>
            <span className="font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {vegLoss}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={vegLoss}
            onChange={(e) => setVegLoss(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0% (Pristine)</span>
            <span>50% (Deforested)</span>
            <span>100% (Barren)</span>
          </div>
        </div>

        {/* 3. Land Disturbance Slider */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <AlertTriangle className="h-4 w-4" />
              Land Disturbance Index:
            </span>
            <span className="font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {disturbance}/10
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={disturbance}
            onChange={(e) => setDisturbance(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0 (Intact)</span>
            <span>5.0 (Moderate)</span>
            <span>10.0 (Severe)</span>
          </div>
        </div>

        {/* 4. Slope Gradient Slider */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
              <Mountain className="h-4 w-4" />
              Slope Angle:
            </span>
            <span className="font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {slope}°
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="65"
            value={slope}
            onChange={(e) => setSlope(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>10° (Gentle)</span>
            <span>35° (Critical)</span>
            <span>65° (Cliff)</span>
          </div>
        </div>

        {/* 5. Temperature Anomaly Slider */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-pink-400 font-semibold">
              <Thermometer className="h-4 w-4" />
              Thermal Anomaly:
            </span>
            <span className="font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              +{tempAnomaly}°C
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="6"
            step="0.1"
            value={tempAnomaly}
            onChange={(e) => setTempAnomaly(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0°C (Normal)</span>
            <span>+3°C (Elevated)</span>
            <span>+6°C (High Melt)</span>
          </div>
        </div>

        {/* 6. Dynamic Result Tile */}
        <div className="p-3.5 rounded-xl border border-cyan-500/40 bg-gradient-to-br from-slate-950 to-cyan-950/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold">
              SIMULATED RISK SCORE
            </span>
            <RiskBadge severity={simulatedSeverity} score={simulatedScore} size="sm" />
          </div>

          <div className="flex items-baseline gap-2 my-1">
            <span className="text-3xl font-black font-display text-white">
              {simulatedScore}
            </span>
            <span className="text-xs font-mono text-slate-400">/ 100</span>
            <span className="ml-auto text-xs font-mono text-slate-400">
              Delta: <strong className={simulatedScore > zone.riskScore ? 'text-rose-400' : 'text-emerald-400'}>
                {simulatedScore - zone.riskScore > 0 ? `+${simulatedScore - zone.riskScore}` : `${simulatedScore - zone.riskScore}`} pts
              </strong>
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                simulatedScore >= 80 ? 'bg-rose-500' : simulatedScore >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${simulatedScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Mitigation Advisory Box */}
      <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <ShieldAlert className={`h-5 w-5 shrink-0 mt-0.5 ${
            simulatedScore >= 80 ? 'text-rose-400 animate-pulse' : 'text-amber-400'
          }`} />
          <div>
            <span className="text-xs font-mono font-bold text-white">
              SIMULATED MITIGATION ADVISORY:
            </span>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              {getSimulatedAdvisory()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
