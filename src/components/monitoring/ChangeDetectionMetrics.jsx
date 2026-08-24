import React from 'react';
import { 
  TreePine, 
  AlertTriangle, 
  Route, 
  Activity, 
  Droplets, 
  Mountain, 
  Compass, 
  ShieldAlert, 
  ArrowUpRight 
} from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

export default function ChangeDetectionMetrics({ zone, onNavigateToRiskAnalysis }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-400">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                Change Detection Telemetry
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Satellite biophysical divergence vs baseline
              </p>
            </div>
          </div>
          <RiskBadge severity={zone.severity} score={zone.riskScore} size="md" />
        </div>

        {/* 4 Core Change Detection Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-rose-400 font-mono font-semibold">
                <TreePine className="h-4 w-4" />
                Vegetation Loss
              </span>
              <span className="font-mono text-rose-400 font-bold">{zone.beforeAfterData.ndviChange}</span>
            </div>
            <div className="mt-2 text-xl font-bold font-display text-white">
              {zone.changeMetrics.vegetationLossArea}
            </div>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">
              Forest canopy degradation & clearing
            </p>
          </div>

          <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-400 font-mono font-semibold">
                <AlertTriangle className="h-4 w-4" />
                Land Disturbance
              </span>
              <span className="font-mono text-amber-400 font-bold">{zone.factors.landDisturbance}/10 Index</span>
            </div>
            <div className="mt-2 text-xl font-bold font-display text-white">
              {zone.changeMetrics.landDisturbanceArea}
            </div>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">
              Topsoil exposure & rockfall scars
            </p>
          </div>

          <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-mono font-semibold">
                <Route className="h-4 w-4" />
                New Road / Cut
              </span>
              <span className="font-mono text-cyan-400 font-bold">Linear Extrusion</span>
            </div>
            <div className="mt-2 text-xl font-bold font-display text-white">
              +{zone.changeMetrics.newRoadLength}
            </div>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">
              Hill-slope excavation & bypass tracks
            </p>
          </div>

          <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-indigo-400 font-mono font-semibold">
                <Activity className="h-4 w-4" />
                Active Fissures
              </span>
              <span className="font-mono text-rose-400 font-bold">{zone.changeMetrics.displacementRate}</span>
            </div>
            <div className="mt-2 text-xl font-bold font-display text-white">
              {zone.changeMetrics.activeFissureCount} Fractures
            </div>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">
              Sub-surface tensile shear cracks
            </p>
          </div>
        </div>

        {/* Morphological Terrain Summary */}
        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
            <span>GEOLOGICAL FAULT PROXIMITY:</span>
            <span className="text-amber-300 font-semibold">{zone.factors.geologicalFaultProximity}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
            <span>SOIL MOISTURE SATURATION:</span>
            <span className="text-cyan-300 font-semibold">{zone.factors.soilSaturation}% (Elevated)</span>
          </div>
          <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
            <span>EROSION SEDIMENT VOLUME:</span>
            <span className="text-rose-300 font-semibold">{zone.beforeAfterData.slopeErosionVolume}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800">
        <button
          onClick={onNavigateToRiskAnalysis}
          className="w-full py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-900/30 transition-all flex items-center justify-center gap-2"
        >
          <span>Examine Risk Multi-Factor Weights</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
