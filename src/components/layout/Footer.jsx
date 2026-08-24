import React from 'react';
import { Mountain, Satellite, ShieldCheck, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-4 px-6 text-slate-500 font-mono text-xs">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Mountain className="h-4 w-4 text-cyan-500" />
          <span className="font-bold text-slate-400 font-sans">
            HIM-SAFE — Himalayan Environmental Impact Monitoring
          </span>
          <span className="text-slate-600">|</span>
          <span>SIH 2026 Innovation Platform</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ISRO BHUVAN / SENTINEL-2 LINK: ACTIVE
          </span>
          <span className="text-slate-600">•</span>
          <span>GIS ENGINE: LEAFLET / WGS84</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">VERSION 1.0.4 PROTOTYPE</span>
        </div>
      </div>
    </footer>
  );
}
