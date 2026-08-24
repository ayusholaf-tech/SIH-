import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Mountain, 
  ShieldAlert, 
  CheckCircle2, 
  Calendar, 
  MapPin,
  FileText,
  BadgeCheck
} from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

export default function ReportDocumentModal({ zone, onClose }) {
  if (!zone) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        {/* Modal Action Bar (Hidden on Print) */}
        <div className="no-print bg-slate-950 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-400" />
            <span className="font-mono text-xs font-bold text-white uppercase">
              Official Environmental Intelligence Dossier
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold rounded-lg shadow-md flex items-center gap-1.5 transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Official Printable Report Document Body */}
        <div className="p-8 space-y-6 bg-[#080d18] text-slate-100 font-sans print:bg-white print:text-black print:p-0">
          {/* Official Letterhead */}
          <div className="border-b-2 border-cyan-500/50 pb-5 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-700 to-slate-900 border border-cyan-400/40 flex items-center justify-center text-white shadow-lg">
                <Mountain className="h-8 w-8" />
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  NATIONAL DISASTER MANAGEMENT & ECOLOGICAL MONITORING CELL
                </div>
                <h1 className="text-xl font-extrabold text-white font-display uppercase tracking-tight">
                  HIM-SAFE Geospatial Assessment Report
                </h1>
                <p className="text-xs text-slate-400 font-mono">
                  Integrated Himalayan Environmental Impact & Landslide Hazard Dossier
                </p>
              </div>
            </div>

            <div className="text-right font-mono text-xs space-y-1">
              <div className="text-slate-400">DOC REF: <strong className="text-white font-bold">HIM-2026/SEC-084</strong></div>
              <div className="text-slate-400">ISSUED: <strong className="text-cyan-300">19 MAY 2026</strong></div>
              <div className="text-[10px] bg-rose-950/80 border border-rose-500/40 text-rose-400 px-2 py-0.5 rounded font-bold uppercase inline-block">
                CLASSIFICATION: RESTRICTED OFFICIAL
              </div>
            </div>
          </div>

          {/* Section 1: Executive Sector Target Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">MONITORED ZONE:</span>
              <strong className="text-white text-sm font-sans block">{zone.name}</strong>
              <span className="text-cyan-400 text-[11px]">{zone.state} • {zone.district}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">COORDINATES & ELEVATION:</span>
              <strong className="text-white block">{zone.coordinates[0]}° N, {zone.coordinates[1]}° E</strong>
              <span className="text-slate-400 text-[11px]">Altitude: {zone.elevation}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">COMPOSITE THREAT LEVEL:</span>
              <div className="flex items-center gap-2 mt-0.5">
                <RiskBadge severity={zone.severity} score={zone.riskScore} size="md" />
              </div>
            </div>
          </div>

          {/* Section 2: Executive Summary & Field Findings */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              1.0 Executive Synthesis & Anomaly Detection
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
              {zone.summary} High-resolution multispectral differential analytics between baseline scan (<strong>{zone.beforeAfterData.baselineDate}</strong>) and latest satellite telemetry (<strong>{zone.beforeAfterData.telemetryDate}</strong>) confirm active micro-fissuring, accelerated toe erosion, and severe vegetative canopy depletion across vulnerable catchments.
            </p>
          </div>

          {/* Section 3: Biophysical & Change Detection Indicators */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              2.0 Quantitative Environmental Stress Matrix
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px]">VEGETATION LOSS</span>
                <p className="text-base font-bold text-rose-400 mt-1">{zone.factors.vegetationLoss}% Loss</p>
                <span className="text-[10px] text-slate-400">{zone.changeMetrics.vegetationLossArea}</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px]">LAND DISTURBANCE</span>
                <p className="text-base font-bold text-amber-400 mt-1">{zone.factors.landDisturbance} / 10</p>
                <span className="text-[10px] text-slate-400">{zone.changeMetrics.landDisturbanceArea}</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px]">LINEAR ROAD EXCAVATION</span>
                <p className="text-base font-bold text-cyan-400 mt-1">+{zone.changeMetrics.newRoadLength}</p>
                <span className="text-[10px] text-slate-400">Slope Cut Vector</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px]">24H PRECIPITATION</span>
                <p className="text-base font-bold text-blue-400 mt-1">{zone.factors.rainfall24h} mm</p>
                <span className="text-[10px] text-slate-400">Soil Sat: {zone.factors.soilSaturation}%</span>
              </div>
            </div>
          </div>

          {/* Section 4: Recommended Action Roadmap */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              3.0 Authority Directives & Priority Mitigation Roadmap
            </h3>
            
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/40 text-xs mb-3">
              <span className="font-bold text-cyan-300 font-mono block mb-1">IMMEDIATE ADMINISTRATIVE MANDATE:</span>
              <p className="text-slate-200 leading-relaxed">{zone.recommendedAction}</p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {zone.actionChecklist?.map(act => (
                <div key={act.id} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span className="text-slate-200 font-medium">{act.title}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    act.priority === 'IMMEDIATE_24H' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {act.priority.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Signature & Authentication Block */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-4">
            <div>
              <div className="h-10 w-36 border-b border-slate-700 mb-1 flex items-end">
                <span className="text-[11px] font-display text-cyan-400 font-semibold italic">Dr. K. Sharma, NDMA</span>
              </div>
              <span className="text-[10px]">DIRECTOR GENERAL (GEOSPATIAL AUDIT)</span>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-slate-500">DIGITAL HASH: SHA256: 7f89c4...e81a</div>
              <div className="text-emerald-400 text-[11px] font-bold">VERIFIED BY HIM-SAFE COMMAND NODE</div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="no-print bg-slate-950 border-t border-slate-800 px-6 py-3.5 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500">PROTOTYPE DEMONSTRATOR GENERATOR</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
