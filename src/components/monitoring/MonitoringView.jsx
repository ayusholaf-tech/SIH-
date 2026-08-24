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
  SlidersHorizontal
} from 'lucide-react';
import SatelliteComparisonSlider from './SatelliteComparisonSlider';
import LayerControls from './LayerControls';
import ChangeDetectionMetrics from './ChangeDetectionMetrics';
import RiskBadge from '../common/RiskBadge';
import { HIMALAYAN_ZONES } from '../../data/himalayanZones';

export default function MonitoringView({ activeZone, onSelectZone, onNavigateToRiskAnalysis }) {
  const [showVegLossLayer, setShowVegLossLayer] = useState(true);
  const [showLandDisturbanceLayer, setShowLandDisturbanceLayer] = useState(true);
  const [showRoadDetectionLayer, setShowRoadDetectionLayer] = useState(true);

  const currentZone = activeZone || HIMALAYAN_ZONES[0];

  return (
    <div className="space-y-6">
      {/* Top Location Selector and Orbit Info */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
              <Satellite className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Satellite Change Detection Inspector
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Multispectral differential analytics: Pre-disturbance baseline vs present orbit
              </p>
            </div>
          </div>
        </div>

        {/* Location Picker Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-mono text-slate-500 whitespace-nowrap hidden sm:inline">SELECT SECTOR:</span>
          {HIMALAYAN_ZONES.map(z => {
            const isSelected = currentZone.id === z.id;
            return (
              <button
                key={z.id}
                onClick={() => onSelectZone(z)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-950'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <MapPin className="h-3 w-3" />
                <span>{z.name.split(' ')[0]}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded ${
                  z.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300' : 'bg-slate-800 text-slate-300'
                }`}>
                  {z.riskScore}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Satellite Comparison Visual Area */}
      <SatelliteComparisonSlider
        zone={currentZone}
        showVegLossLayer={showVegLossLayer}
        showLandDisturbanceLayer={showLandDisturbanceLayer}
        showRoadDetectionLayer={showRoadDetectionLayer}
      />

      {/* Two Column Inspector: Layer Overlays & Telemetry Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LayerControls
          showVegLossLayer={showVegLossLayer}
          setShowVegLossLayer={setShowVegLossLayer}
          showLandDisturbanceLayer={showLandDisturbanceLayer}
          setShowLandDisturbanceLayer={setShowLandDisturbanceLayer}
          showRoadDetectionLayer={showRoadDetectionLayer}
          setShowRoadDetectionLayer={setShowRoadDetectionLayer}
        />

        <ChangeDetectionMetrics
          zone={currentZone}
          onNavigateToRiskAnalysis={onNavigateToRiskAnalysis}
        />
      </div>
    </div>
  );
}
