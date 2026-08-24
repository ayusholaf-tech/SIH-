import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export default function DemoWatermark() {
  return (
    <div className="bg-amber-500/10 border-y border-amber-500/20 px-4 py-1.5 flex items-center justify-between text-xs text-amber-300 font-mono">
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
        <span className="font-semibold tracking-wide">
          Prototype demo — all imagery, telemetry, metrics, alerts, and recommendations are simulated for SIH evaluation.
        </span>
      </div>
      <div className="flex items-center gap-3 text-[11px] text-slate-400">
        <span className="hidden sm:inline bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 text-cyan-400">
          DATA MODE: SIMULATED PROTOTYPE DATASET
        </span>
        <span className="text-amber-400 font-bold">HIM-SAFE v1.0.4-demo</span>
      </div>
    </div>
  );
}
