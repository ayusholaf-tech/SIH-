import React, { useState, useRef } from 'react';
import { 
  Sliders, 
  Eye, 
  Layers, 
  Maximize2, 
  Sparkles, 
  ShieldAlert, 
  Compass, 
  Check, 
  MoveHorizontal
} from 'lucide-react';

export default function SatelliteComparisonSlider({ 
  zone, 
  showVegLossLayer = true, 
  showLandDisturbanceLayer = true, 
  showRoadDetectionLayer = true 
}) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!isDragging && e.buttons !== 1) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      {/* Top Telemetry Header Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-20 relative">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs text-cyan-400">
            <Compass className="h-4 w-4" />
            <span className="font-bold">DEMO MULTISPECTRAL COMPARATOR</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-mono text-slate-400">
            GRID: <span className="text-white font-semibold">{zone.coordinates[0]}° N, {zone.coordinates[1]}° E</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">SLIDER POSITION:</span>
          <span className="text-cyan-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
            {Math.round(sliderPosition)}% AFTER
          </span>
        </div>
      </div>

      {/* Main Interactive Visual Comparison Stage */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative h-[480px] w-full select-none cursor-ew-resize overflow-hidden bg-[#0a101d]"
      >
        {/* Background BEFORE Layer (Baseline Oct 2024) */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="beforeHills" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a29" />
                <stop offset="50%" stopColor="#142c1f" />
                <stop offset="100%" stopColor="#0d1f15" />
              </linearGradient>
              <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <pattern id="forestPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="6" fill="#15803d" opacity="0.6" />
                <circle cx="30" cy="20" r="8" fill="#166534" opacity="0.7" />
                <circle cx="20" cy="30" r="7" fill="#14532d" opacity="0.6" />
              </pattern>
            </defs>

            {/* Pristine Mountain Base Contours */}
            <rect width="1000" height="600" fill="url(#beforeHills)" />
            <rect width="1000" height="600" fill="url(#forestPattern)" />

            {/* Mountain Ridge Lines */}
            <path d="M0,180 Q250,90 500,210 T1000,160 L1000,600 L0,600 Z" fill="#0f2b1d" opacity="0.8" />
            <path d="M0,290 Q300,190 650,330 T1000,280 L1000,600 L0,600 Z" fill="#0b2217" opacity="0.9" />

            {/* Pristine River Channel */}
            <path d="M120,0 C220,180 180,340 380,480 S700,560 880,600" fill="none" stroke="url(#riverGrad)" strokeWidth="16" strokeLinecap="round" opacity="0.85" />
            <path d="M120,0 C220,180 180,340 380,480 S700,560 880,600" fill="none" stroke="#67e8f9" strokeWidth="4" opacity="0.7" />

            {/* Historic Village Cluster */}
            <rect x="420" y="320" width="80" height="60" fill="#334155" rx="4" opacity="0.8" />
            <rect x="440" y="300" width="40" height="30" fill="#475569" rx="2" opacity="0.8" />
          </svg>

          {/* Before Label Badge */}
          <div className="absolute top-4 left-4 bg-slate-950/90 border border-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-mono shadow-xl backdrop-blur-md">
            <span className="font-bold">BASELINE SCAN:</span> {zone.beforeAfterData.baselineDate}
            <div className="text-[10px] text-slate-400">High Canopy Density • Pristine Slopes</div>
          </div>
        </div>

        {/* Foreground AFTER Layer (Clipped dynamically by slider position) */}
        <div 
          className="absolute inset-0 h-full overflow-hidden border-r-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 w-[1000px] h-[600px] max-w-none">
            <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
              <defs>
                <linearGradient id="afterHills" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2a241b" />
                  <stop offset="50%" stopColor="#1e1b16" />
                  <stop offset="100%" stopColor="#13110e" />
                </linearGradient>
                <linearGradient id="riverMurky" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#92400e" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
              </defs>

              {/* Degraded Disturbed Soil Base */}
              <rect width="1000" height="600" fill="url(#afterHills)" />

              {/* Disturbed Scarp & Mountain Ridges */}
              <path d="M0,180 Q250,90 500,210 T1000,160 L1000,600 L0,600 Z" fill="#1c1917" opacity="0.9" />
              <path d="M0,290 Q300,190 650,330 T1000,280 L1000,600 L0,600 Z" fill="#151210" opacity="0.95" />

              {/* Turbid / Silt Choked River */}
              <path d="M120,0 C220,180 180,340 380,480 S700,560 880,600" fill="none" stroke="url(#riverMurky)" strokeWidth="22" strokeLinecap="round" opacity="0.9" />

              {/* LAYER 1: VEGETATION LOSS HEATMAP (NDVI Anomaly) */}
              {showVegLossLayer && (
                <g id="layer-ndvi-loss" className="animate-pulse">
                  {/* Heavy Red Canopy Loss Hotspots */}
                  <ellipse cx="280" cy="220" rx="90" ry="60" fill="#f43f5e" opacity="0.45" />
                  <ellipse cx="620" cy="260" rx="120" ry="70" fill="#f43f5e" opacity="0.4" />
                  <ellipse cx="480" cy="380" rx="140" ry="80" fill="#e11d48" opacity="0.5" />
                  <circle cx="480" cy="380" r="45" fill="#9f1239" opacity="0.6" />
                </g>
              )}

              {/* LAYER 2: LAND DISTURBANCE & SOIL EXPOSURE MASK */}
              {showLandDisturbanceLayer && (
                <g id="layer-land-disturbance">
                  {/* Amber Scars & Landslide Creep Zones */}
                  <polygon points="220,160 310,290 260,340 180,240" fill="#d97706" opacity="0.55" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                  <polygon points="560,210 740,320 680,420 520,310" fill="#d97706" opacity="0.5" stroke="#fbbf24" strokeWidth="2" />
                  <polygon points="340,390 490,460 410,540 280,480" fill="#b45309" opacity="0.6" stroke="#f59e0b" strokeWidth="2" />
                  
                  {/* Fissure Fracture Lines */}
                  <path d="M430,360 L455,385 L448,410 L470,435" stroke="#f43f5e" strokeWidth="3" fill="none" />
                  <path d="M465,370 L485,395 L500,425" stroke="#f43f5e" strokeWidth="3" fill="none" />
                  <path d="M600,240 L630,270 L625,305" stroke="#f43f5e" strokeWidth="3" fill="none" />
                </g>
              )}

              {/* LAYER 3: NEW ROAD CUT / TRAIL DETECTIONS */}
              {showRoadDetectionLayer && (
                <g id="layer-road-cuts">
                  {/* Heavy Cut Linear Vectors (Char Dham / Bypass excavation) */}
                  <path d="M0,320 C180,310 260,260 440,290 S680,220 1000,260" fill="none" stroke="#06b6d4" strokeWidth="7" strokeDasharray="8 4" opacity="0.9" />
                  <path d="M440,290 C490,360 450,440 560,520 S820,540 1000,560" fill="none" stroke="#38bdf8" strokeWidth="5" strokeDasharray="6 3" opacity="0.9" />

                  {/* Cut slope undercutting tag */}
                  <rect x="460" y="270" width="130" height="24" rx="4" fill="#0c1322" stroke="#06b6d4" strokeWidth="1" />
                  <text x="468" y="286" fill="#67e8f9" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    NEW CUT: +{zone.changeMetrics.newRoadLength}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* After Label Badge */}
          <div className="absolute top-4 left-4 bg-slate-950/90 border border-rose-500/50 text-rose-400 px-3 py-1.5 rounded-lg text-xs font-mono shadow-xl backdrop-blur-md">
            <span className="font-bold">SIMULATED SCAN:</span> {zone.beforeAfterData.telemetryDate}
            <div className="text-[10px] text-rose-300 font-semibold">
              Canopy Loss: {zone.beforeAfterData.ndviChange} • Scars Active
            </div>
          </div>
        </div>

        {/* Draggable Split Handle */}
        <div 
          className="absolute top-0 bottom-0 z-30 flex flex-col items-center justify-center pointer-events-none -ml-5"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-cyan-500 border-2 border-white shadow-[0_0_15px_#06b6d4] flex items-center justify-center text-slate-950">
            <MoveHorizontal className="h-5 w-5" />
          </div>
          <div className="bg-slate-950/90 text-cyan-300 border border-cyan-500/40 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded mt-2 uppercase shadow-lg">
            DRAG
          </div>
        </div>
      </div>

      {/* Bottom Slider & Image Metadata Bar */}
      <div className="bg-slate-900/90 border-t border-slate-800 p-3.5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-400">SLIDER ADJUST:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="w-48 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span>SENSOR: <strong className="text-white">{zone.satelliteSensor}</strong></span>
          <span>RESOLUTION: <strong className="text-white">10m Multispectral</strong></span>
          <span>DISPLACEMENT: <strong className="text-rose-400">{zone.changeMetrics.displacementRate}</strong></span>
        </div>
      </div>
    </div>
  );
}
