import React from 'react';
import { Info, Sparkles, ShieldCheck } from 'lucide-react';

export default function ProxyDisclaimer({ compact = false }) {
  if (compact) {
    return (
      <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-300 font-mono">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-cyan-400 shrink-0" />
          <span>
            <strong className="text-cyan-300">RGB Vegetation Proxy (VARI):</strong> Standard 3-band visible spectrum proxy. <em className="text-slate-400 not-italic font-bold">NOT true NDVI</em>.
          </span>
        </div>
        <span className="hidden sm:inline-block text-[11px] bg-cyan-900/60 text-cyan-200 px-2 py-0.5 rounded border border-cyan-500/40">
          Future: Sentinel-2 Red + NIR Bands
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900/80 to-slate-950/90 border border-cyan-500/30 rounded-2xl p-4 shadow-lg backdrop-blur-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-cyan-900/50 border border-cyan-400/30 text-cyan-300 shrink-0">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white font-display">
                Methodology Notice: RGB Visible Vegetation Index (VARI Proxy)
              </h4>
              <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded">
                SIH MVP PROXY
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Standard optical RGB satellite/drone frames do not record Near-Infrared (NIR) light. 
              The HIM-SAFE MVP calculates the <span className="text-cyan-300 font-mono font-semibold">Visible Atmospherically Resistant Index: VARI = (Green - Red) / (Green + Red - Blue)</span>.
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right font-mono text-xs bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl">
          <div className="text-[11px] text-slate-400">PRODUCTION ROADMAP</div>
          <div className="text-emerald-400 font-bold flex items-center gap-1.5 justify-end mt-0.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Sentinel-2 L2A Red (B4) + NIR (B8)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
