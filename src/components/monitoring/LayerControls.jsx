import React from 'react';
import { Layers, Eye, EyeOff, TreePine, AlertTriangle, Route, Activity } from 'lucide-react';

export default function LayerControls({
  showVegLossLayer,
  setShowVegLossLayer,
  showLandDisturbanceLayer,
  setShowLandDisturbanceLayer,
  showRoadDetectionLayer,
  setShowRoadDetectionLayer
}) {
  const layers = [
    {
      id: 'veg',
      name: 'Vegetation Loss (NDVI)',
      description: 'Infrared reflectance canopy reduction heat signature',
      active: showVegLossLayer,
      toggle: () => setShowVegLossLayer(!showVegLossLayer),
      color: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
      activeBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      icon: TreePine
    },
    {
      id: 'disturb',
      name: 'Land Disturbance Mask',
      description: 'Exposed regolith, tension cracks, and scarp slip polygons',
      active: showLandDisturbanceLayer,
      toggle: () => setShowLandDisturbanceLayer(!showLandDisturbanceLayer),
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
      activeBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      icon: AlertTriangle
    },
    {
      id: 'road',
      name: 'New Road / Trail Detection',
      description: 'Automated deep linear infrastructure slope cut extraction',
      active: showRoadDetectionLayer,
      toggle: () => setShowRoadDetectionLayer(!showRoadDetectionLayer),
      color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
      activeBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      icon: Route
    }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display">
              Multispectral Layer Overlays
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Toggle satellite spectral anomaly overlays on telemetry
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {layers.map(layer => {
          const Icon = layer.icon;
          return (
            <div
              key={layer.id}
              onClick={layer.toggle}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                layer.active 
                  ? 'bg-slate-850/90 border-slate-700 shadow-md' 
                  : 'bg-slate-950/40 border-slate-800/80 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg border ${layer.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {layer.name}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-semibold ${layer.activeBadge}`}>
                      {layer.active ? 'ACTIVE LAYER' : 'OFF'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {layer.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className={`p-2 rounded-lg border transition-colors ${
                  layer.active
                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                {layer.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
