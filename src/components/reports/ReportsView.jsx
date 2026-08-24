import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  MapPin, 
  CheckCircle2, 
  ShieldAlert, 
  TreePine, 
  AlertTriangle, 
  Route, 
  Calendar,
  Sparkles,
  ArrowUpRight,
  Eye
} from 'lucide-react';
import RiskBadge from '../common/RiskBadge';
import ReportDocumentModal from './ReportDocumentModal';
import { HIMALAYAN_ZONES } from '../../data/himalayanZones';

export default function ReportsView({ activeZone, onSelectZone }) {
  const [selectedReportZone, setSelectedReportZone] = useState(activeZone || HIMALAYAN_ZONES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const zone = selectedReportZone || HIMALAYAN_ZONES[0];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowDocumentModal(true);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-950/70 border border-indigo-500/30 text-indigo-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Demo Environmental Monitoring Report Generator
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Automated multi-spectral audit synthesis prototype for simulated disaster management workflows
              </p>
            </div>
          </div>
        </div>

        {/* Generate Report Primary Button */}
        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 via-cyan-500 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white text-xs font-bold font-mono rounded-xl shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all transform active:scale-95"
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>Synthesizing Report...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Generate Demo Report (PDF)</span>
            </>
          )}
        </button>
      </div>

      {/* Target Zone Selector Strip */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <MapPin className="h-4 w-4 text-cyan-400" />
          <span>REPORT TARGET SECTOR:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {HIMALAYAN_ZONES.map(z => {
            const isSelected = zone.id === z.id;
            return (
              <button
                key={z.id}
                onClick={() => {
                  setSelectedReportZone(z);
                  if (onSelectZone) onSelectZone(z);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-950'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{z.name.split(' ')[0]}</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-slate-800 text-slate-300">
                  {z.riskScore}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Report Preview Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Report Synthesis Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Executive Monitoring Summary Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase">
                  1. MONITORING SYNTHESIS & SECTOR PROFILE
                </span>
              </div>
              <RiskBadge severity={zone.severity} score={zone.riskScore} size="sm" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500">Zone Focus:</span>
                <p className="font-bold text-white text-sm font-sans mt-0.5">{zone.name}</p>
                <span className="text-cyan-400 text-[11px]">{zone.state} ({zone.district})</span>
              </div>
              <div>
                <span className="text-slate-500">Telemetry Sensor:</span>
                <p className="font-bold text-white mt-0.5">{zone.satelliteSensor}</p>
                <span className="text-slate-400 text-[11px]">Last Pass: {zone.lastAcquisition}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
              {zone.summary}
            </p>
          </div>

          {/* Before / After Change Results */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase">
                2. SATELLITE BEFORE / AFTER DIFFERENTIAL
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Baseline: {zone.beforeAfterData.baselineDate} → Current: {zone.beforeAfterData.telemetryDate}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">NDVI VEGETATION LOSS</span>
                <p className="text-lg font-bold text-rose-400 font-display mt-1">{zone.beforeAfterData.ndviChange}</p>
                <span className="text-[11px] text-slate-400 font-mono">{zone.changeMetrics.vegetationLossArea} degraded</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">SOIL MOISTURE INCREASE</span>
                <p className="text-lg font-bold text-cyan-400 font-display mt-1">{zone.beforeAfterData.soilMoistureChange}</p>
                <span className="text-[11px] text-slate-400 font-mono">Saturation: {zone.factors.soilSaturation}%</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-500 text-[10px] font-mono uppercase block">SLOPE EROSION DISCHARGE</span>
                <p className="text-lg font-bold text-amber-400 font-display mt-1">{zone.beforeAfterData.slopeErosionVolume}</p>
                <span className="text-[11px] text-slate-400 font-mono">Rate: {zone.changeMetrics.displacementRate}</span>
              </div>
            </div>
          </div>

          {/* Recommended Authority Actions */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase">
                3. SUGGESTED MITIGATION & RESPONSE PLAN
              </span>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs">
              <span className="font-mono font-bold text-cyan-300 uppercase block mb-1">
                Suggested Action Plan:
              </span>
              <p className="text-slate-200 leading-relaxed font-sans">
                {zone.recommendedAction}
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {zone.actionChecklist?.map(act => (
                <div key={act.id} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    <span className="text-slate-200">{act.title}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                    {act.priority.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Dossier Generator Panel & Document Quick View */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-5 backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white font-display">
                Report Output Specifications (Demo)
              </h3>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500">Document Type:</span>
                <span className="text-white font-semibold">Demo Monitoring Report</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500">Format:</span>
                <span className="text-cyan-400 font-semibold">Printable PDF / HTML</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500">Simulated Jurisdiction:</span>
                <span className="text-white font-semibold">{zone.state} SDMA (Simulated)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500">Classification:</span>
                <span className="text-rose-400 font-bold">PROTOTYPE ONLY</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleGenerateReport}
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white text-xs font-bold font-mono rounded-xl shadow-lg shadow-cyan-950 flex items-center justify-center gap-2 transition-all"
              >
                <Eye className="h-4 w-4" />
                <span>Open Demo Monitoring Report</span>
              </button>

              <button
                onClick={() => {
                  setShowDocumentModal(true);
                  setTimeout(() => window.print(), 300);
                }}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="h-4 w-4" />
                <span>Quick Print / Save as PDF</span>
              </button>
            </div>
          </div>

          {/* Environmental Indicators Radar Snapshot Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl text-xs font-mono space-y-3">
            <span className="text-slate-400 font-bold block pb-2 border-b border-slate-800">
              AUDIT COMPLIANCE STATUS (SIMULATED)
            </span>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span>InSAR Tilt Analysis:</span>
                <span className="text-emerald-400 font-bold">SIMULATED OK</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Rainfall Gauge:</span>
                <span className="text-emerald-400 font-bold">SIMULATED (148mm)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Geological Fault Creep:</span>
                <span className="text-amber-400 font-bold">SIMULATED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Report Document Modal */}
      {showDocumentModal && (
        <ReportDocumentModal
          zone={zone}
          onClose={() => setShowDocumentModal(false)}
        />
      )}
    </div>
  );
}
