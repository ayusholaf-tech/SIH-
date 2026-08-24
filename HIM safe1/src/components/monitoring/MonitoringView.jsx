import React, { useState } from 'react';
import { 
  Satellite, 
  MapPin, 
  Layers, 
  Compass, 
  Sparkles, 
  ShieldAlert, 
  Calendar,
  RefreshCw, 
  SlidersHorizontal,
  UploadCloud
} from 'lucide-react';
import SatelliteComparisonSlider from './SatelliteComparisonSlider';
import LayerControls from './LayerControls';
import ChangeDetectionMetrics from './ChangeDetectionMetrics';
import ImageUploader from '../upload/ImageUploader';
import ProxyDisclaimer from '../common/ProxyDisclaimer';
import RiskBadge from '../common/RiskBadge';
import { HIMALAYAN_ZONES } from '../../data/himalayanZones';

export default function MonitoringView({ activeZone, onSelectZone, onNavigateToRiskAnalysis }) {
  const [showVegLossLayer, setShowVegLossLayer] = useState(true);
  const [showLandDisturbanceLayer, setShowLandDisturbanceLayer] = useState(true);
  const [showCompositeOverlay, setShowCompositeOverlay] = useState(true);
  
  // Real backend analysis result state
  const [analysisResult, setAnalysisResult] = useState(null);

  const currentZone = activeZone || HIMALAYAN_ZONES[0];

  const handleAnalysisSuccess = (result) => {
    setAnalysisResult(result);
    if (result.zone?.id) {
      const match = HIMALAYAN_ZONES.find(z => z.id === result.zone.id);
      if (match && onSelectZone) {
        onSelectZone(match);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Transparent RGB VARI Proxy Disclaimer */}
      <ProxyDisclaimer />

      {/* 2. Top Dual Image Upload & Sample Preset Selector */}
      <ImageUploader
        activeZone={currentZone}
        onSelectZone={onSelectZone}
        onAnalysisComplete={handleAnalysisSuccess}
      />

      {/* 3. Himalayan Sector Quick Navigation Bar */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
            <Satellite className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-display">
              Satellite Differential Split Comparator
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              {analysisResult 
                ? `Active Inference: Aligned via ${analysisResult.alignment.method} (${analysisResult.processing_time_ms}ms)`
                : "Pre-disturbance baseline vs post-event satellite scan"}
            </p>
          </div>
        </div>

        {/* Location Picker Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-mono text-slate-500 whitespace-nowrap hidden sm:inline">SECTOR:</span>
          {HIMALAYAN_ZONES.map(z => {
            const isSelected = currentZone.id === z.id;
            return (
              <button
                key={z.id}
                onClick={() => {
                  onSelectZone(z);
                  setAnalysisResult(null); // reset custom inference to zone view
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-950'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <MapPin className="h-3 w-3" />
                <span>{z.name.split(' ')[0]}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                  z.severity === 'HIGH' ? 'bg-rose-950 text-rose-300' : z.severity === 'MEDIUM' ? 'bg-amber-950 text-amber-300' : 'bg-emerald-950 text-emerald-300'
                }`}>
                  {z.riskScore}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Main Satellite Comparison Visual Split Area */}
      <SatelliteComparisonSlider
        zone={currentZone}
        analysisResult={analysisResult}
        showVegLossLayer={showVegLossLayer}
        showLandDisturbanceLayer={showLandDisturbanceLayer}
        showCompositeOverlay={showCompositeOverlay}
      />

      {/* 5. Two Column Inspector: Layer Overlays & Telemetry Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LayerControls
          showVegLossLayer={showVegLossLayer}
          setShowVegLossLayer={setShowVegLossLayer}
          showLandDisturbanceLayer={showLandDisturbanceLayer}
          setShowLandDisturbanceLayer={setShowLandDisturbanceLayer}
          showCompositeOverlay={showCompositeOverlay}
          setShowCompositeOverlay={setShowCompositeOverlay}
        />

        <ChangeDetectionMetrics
          zone={currentZone}
          analysisResult={analysisResult}
          onNavigateToRiskAnalysis={onNavigateToRiskAnalysis}
        />
      </div>
    </div>
  );
}
