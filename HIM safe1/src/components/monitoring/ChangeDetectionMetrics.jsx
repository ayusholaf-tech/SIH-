import React from 'react';
import { 
  TreePine, 
  AlertTriangle, 
  Route, 
  Activity, 
  ArrowUpRight, 
  Layers, 
  CheckCircle2, 
  ShieldAlert,
  Calculator,
  Compass,
  FileSpreadsheet
} from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

export default function ChangeDetectionMetrics({ zone, analysisResult, onNavigateToRiskAnalysis }) {
  // Use live analysisResult if available, otherwise zone metadata
  const isLive = Boolean(analysisResult);
  
  const vegLossPct = isLive 
    ? analysisResult.metrics.vegetation_loss_percent 
    : zone?.factors?.vegetationLoss || 35;

  const landChangePct = isLive 
    ? analysisResult.metrics.land_change_percent 
    : (zone?.factors?.landDisturbance ? zone.factors.landDisturbance * 8.5 : 40);

  const scarCount = isLive 
    ? analysisResult.metrics.active_scar_count 
    : zone?.changeMetrics?.activeFissureCount || 24;

  const disturbanceScore = isLive 
    ? analysisResult.metrics.disturbance_score 
    : 45;

  const riskInfo = isLive ? analysisResult.risk : {
    final_risk_score: zone?.riskScore || 75,
    risk_level: zone?.severity || 'HIGH',
    formula: `Risk Score (${zone?.riskScore || 75}) = [Veg Loss × 0.45] + [Land Change × 0.35] + [Disturbance × 0.20]`,
    breakdown: {
      vegetation_loss: { raw_score: vegLossPct, weighted_contribution: (vegLossPct * 0.45).toFixed(1) },
      land_change: { raw_score: landChangePct, weighted_contribution: (landChangePct * 0.35).toFixed(1) },
      disturbance: { raw_score: disturbanceScore, weighted_contribution: (disturbanceScore * 0.20).toFixed(1) }
    },
    field_recommendations: [
      {
        id: "rec-def-1",
        priority: "HIGH (24h)",
        title: "Deploy Rapid Slope Inspection & Evacuation Review",
        description: zone?.recommendedAction || "Inspect active scarp progression and verify structural fissures.",
        target_agency: "State Disaster Management Authority (SDMA)",
        status: "IMMEDIATE_ACTION"
      }
    ]
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl space-y-5">
      {/* Header & Risk Score Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display">
              Explainable Risk Engine & Metrics
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              {isLive ? "Live OpenCV Computer Vision Inference" : "Telemetry Baseline Profile"}
            </p>
          </div>
        </div>

        <RiskBadge
          severity={riskInfo.risk_level}
          score={riskInfo.final_risk_score}
          size="md"
        />
      </div>

      {/* 3 Core Metric Cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Metric 1: Veg Loss */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase">Canopy Loss</span>
            <TreePine className="h-3.5 w-3.5 text-rose-400" />
          </div>
          <div className="text-lg font-bold text-rose-400 font-mono">
            {vegLossPct}%
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
            VARI RGB Proxy
          </div>
        </div>

        {/* Metric 2: Land Change */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase">Land Change</span>
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-amber-400 font-mono">
            {landChangePct}%
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
            Exposed Soil
          </div>
        </div>

        {/* Metric 3: Active Scars */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase">Active Scars</span>
            <Route className="h-3.5 w-3.5 text-cyan-400" />
          </div>
          <div className="text-lg font-bold text-cyan-400 font-mono">
            {scarCount}
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
            Cluster Contours
          </div>
        </div>
      </div>

      {/* Transparent Math Breakdown */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-cyan-300 font-bold flex items-center gap-1.5">
            <Calculator className="h-3.5 w-3.5" />
            TRANSPARENT FORMULA BREAKDOWN:
          </span>
          <span className="text-[10px] text-slate-400 font-bold">
            Weights: 45% Veg | 35% Land | 20% Dist
          </span>
        </div>

        {/* Math formula display */}
        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
          {riskInfo.formula}
        </div>

        {/* Progress contributions */}
        <div className="space-y-1.5 pt-1 text-[11px] font-mono">
          <div>
            <div className="flex justify-between text-slate-400 text-[10px] mb-0.5">
              <span>Vegetation Loss (45% Weight)</span>
              <span className="text-rose-400 font-bold">+{riskInfo.breakdown?.vegetation_loss?.weighted_contribution || 0} pts</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-500 rounded-full" 
                style={{ width: `${Math.min(100, (riskInfo.breakdown?.vegetation_loss?.raw_score || 0))}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 text-[10px] mb-0.5">
              <span>Land Change (35% Weight)</span>
              <span className="text-amber-400 font-bold">+{riskInfo.breakdown?.land_change?.weighted_contribution || 0} pts</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full" 
                style={{ width: `${Math.min(100, (riskInfo.breakdown?.land_change?.raw_score || 0))}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 text-[10px] mb-0.5">
              <span>Disturbance & Cuts (20% Weight)</span>
              <span className="text-cyan-400 font-bold">+{riskInfo.breakdown?.disturbance?.weighted_contribution || 0} pts</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-500 rounded-full" 
                style={{ width: `${Math.min(100, (riskInfo.breakdown?.disturbance?.raw_score || 0))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Field Inspection Recommendations */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-bold flex items-center gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
            FIELD INSPECTION RECOMMENDATIONS:
          </span>
          <span className="text-[10px] text-slate-500">Automated Action Plan</span>
        </div>

        <div className="space-y-2">
          {(riskInfo.field_recommendations || []).map((rec, idx) => (
            <div 
              key={rec.id || idx}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white font-display flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  {rec.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 border border-amber-500/40 text-amber-300 font-bold">
                  {rec.priority}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {rec.description}
              </p>
              <div className="text-[10px] font-mono text-cyan-400/80 pt-0.5">
                Target Authority: <span className="text-slate-300">{rec.target_agency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
