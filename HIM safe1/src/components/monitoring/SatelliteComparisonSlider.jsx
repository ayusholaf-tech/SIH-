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
  MoveHorizontal,
  FileCheck2
} from 'lucide-react';

export default function SatelliteComparisonSlider({ 
  zone, 
  analysisResult = null,
  showVegLossLayer = true, 
  showLandDisturbanceLayer = true, 
  showCompositeOverlay = true 
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

  // Determine what image to show on the AFTER side based on layer toggles
  const getAfterImageSource = () => {
    if (!analysisResult?.images) return null;
    if (showCompositeOverlay && analysisResult.images.change_overlay) {
      return analysisResult.images.change_overlay;
    }
    if (showVegLossLayer && analysisResult.images.veg_loss_overlay) {
      return analysisResult.images.veg_loss_overlay;
    }
    if (showLandDisturbanceLayer && analysisResult.images.land_change_overlay) {
      return analysisResult.images.land_change_overlay;
    }
    return analysisResult.images.aligned_after_image || analysisResult.images.after_image;
  };

  const beforeSrc = analysisResult?.images?.before_image;
  const afterSrc = getAfterImageSource();

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      {/* Top Telemetry Header Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-20 relative">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs text-cyan-400">
            <Compass className="h-4 w-4" />
            <span className="font-bold">
              {analysisResult ? "LIVE OPENCV ALIGNED COMPARISON" : "MULTISPECTRAL SECTOR COMPARATOR"}
            </span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-mono text-slate-400">
            SECTOR: <span className="text-white font-semibold">{zone?.name || "Himalayan Grid"}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          {analysisResult && (
            <span className="text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
              <FileCheck2 className="h-3 w-3" /> CV Registered ({analysisResult.processing_time_ms}ms)
            </span>
          )}
          <span className="text-slate-400">SPLIT:</span>
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
        className="relative h-[460px] w-full select-none cursor-ew-resize overflow-hidden bg-[#070c16]"
      >
        {/* Background BEFORE Layer (Baseline) */}
        <div className="absolute inset-0 w-full h-full">
          {beforeSrc ? (
            <img
              src={beforeSrc}
              alt="Before Satellite Baseline"
              className="w-full h-full object-cover"
            />
          ) : (
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
              <rect width="1000" height="600" fill="url(#beforeHills)" />
              <rect width="1000" height="600" fill="url(#forestPattern)" />
              <path d="M0,180 Q250,90 500,210 T1000,160 L1000,600 L0,600 Z" fill="#0f2b1d" opacity="0.8" />
              <path d="M0,290 Q300,190 650,330 T1000,280 L1000,600 L0,600 Z" fill="#0b2217" opacity="0.9" />
              <path d="M120,0 C220,180 180,340 380,480 S700,560 880,600" fill="none" stroke="url(#riverGrad)" strokeWidth="16" strokeLinecap="round" opacity="0.85" />
              <path d="M120,0 C220,180 180,340 380,480 S700,560 880,600" fill="none" stroke="#67e8f9" strokeWidth="4" opacity="0.7" />
            </svg>
          )}

          {/* Before Label Badge */}
          <div className="absolute top-4 left-4 bg-slate-950/90 border border-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-mono shadow-xl backdrop-blur-md">
            <span className="font-bold">BEFORE (BASELINE):</span> {zone?.beforeAfterData?.baselineDate || "Baseline Scan"}
            <div className="text-[10px] text-slate-400">High Forest / Vegetated Baseline</div>
          </div>
        </div>

        {/* Foreground AFTER Layer (Clipped dynamically by slider position) */}
        <div 
          className="absolute inset-0 h-full overflow-hidden border-r-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 w-full h-full">
            {afterSrc ? (
              <img
                src={afterSrc}
                alt="After Satellite Differential"
                className="w-full h-full object-cover"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%', maxWidth: 'none' }}
              />
            ) : (
              <div className="w-[1000px] h-[600px]">
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
                  <rect width="1000" height="600" fill="url(#afterHills)" />
                  <path d="M0,180 Q250,90 500,210 T1000,160 L1000,600 L0,600 Z" fill="#1c1917" opacity="0.9" />
                  <path d="M120,0 C220,180 180,340 380,480 S700,560 880,600" fill="none" stroke="url(#riverMurky)" strokeWidth="22" strokeLinecap="round" opacity="0.9" />
                  {showVegLossLayer && (
                    <g id="layer-ndvi-loss" className="animate-pulse">
                      <ellipse cx="280" cy="220" rx="90" ry="60" fill="#f43f5e" opacity="0.45" />
                      <ellipse cx="620" cy="260" rx="120" ry="70" fill="#f43f5e" opacity="0.4" />
                      <ellipse cx="480" cy="380" rx="140" ry="80" fill="#e11d48" opacity="0.5" />
                    </g>
                  )}
                  {showLandDisturbanceLayer && (
                    <g id="layer-land-disturbance">
                      <polygon points="220,160 310,290 260,340 180,240" fill="#d97706" opacity="0.55" stroke="#f59e0b" strokeWidth="2" />
                      <polygon points="560,210 740,320 680,420 520,310" fill="#d97706" opacity="0.5" stroke="#fbbf24" strokeWidth="2" />
                    </g>
                  )}
                </svg>
              </div>
            )}
          </div>

          {/* After Label Badge */}
          <div className="absolute top-4 left-4 bg-slate-950/90 border border-rose-500/50 text-rose-400 px-3 py-1.5 rounded-lg text-xs font-mono shadow-xl backdrop-blur-md">
            <span className="font-bold">AFTER (DIFFERENTIAL):</span> {zone?.beforeAfterData?.telemetryDate || "Post-Event"}
            <div className="text-[10px] text-rose-300 font-semibold">
              {showCompositeOverlay ? "Composite Change Mask Active" : showVegLossLayer ? "VARI Vegetation Loss Active" : "Land Disturbance Active"}
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
          <span>PIPELINE: <strong className="text-white">OpenCV + NumPy</strong></span>
          <span>PROXY: <strong className="text-cyan-300">VARI RGB Proxy</strong></span>
          <span>COORDS: <strong className="text-white">{zone?.coordinates ? `${zone.coordinates[0]}°N, ${zone.coordinates[1]}°E` : "30.7°N, 79.1°E"}</strong></span>
        </div>
      </div>
    </div>
  );
}
