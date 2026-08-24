import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { HIMALAYAN_ZONES } from '../../data/himalayanZones';
import RiskBadge from '../common/RiskBadge';
import { Eye, Layers, ShieldAlert, Activity, ArrowUpRight } from 'lucide-react';

// Custom SVG Icons for Leaflet markers
const createCustomIcon = (severity, score) => {
  let color = '#10b981'; // green
  let glowColor = 'rgba(16, 185, 129, 0.4)';
  if (severity === 'CRITICAL') {
    color = '#f43f5e'; // red
    glowColor = 'rgba(244, 63, 94, 0.6)';
  } else if (severity === 'HIGH') {
    color = '#f59e0b'; // amber
    glowColor = 'rgba(245, 158, 11, 0.5)';
  } else if (severity === 'MODERATE') {
    color = '#eab308'; // yellow
    glowColor = 'rgba(234, 179, 8, 0.4)';
  }

  const svgHtml = `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
      <div style="position: absolute; width: 32px; height: 32px; border-radius: 50%; background: ${glowColor}; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
      <div style="position: relative; width: 26px; height: 26px; border-radius: 50%; background: #0c1322; border: 2px solid ${color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px ${color};">
        <span style="color: ${color}; font-size: 10px; font-weight: 800; font-family: monospace;">${score}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'custom-map-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
};

// Map controller component for smooth flyTo animation
function MapRecenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 8, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function HimalayanMap({ activeZone, onSelectZone, onNavigateToMonitoring }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [mapType, setMapType] = useState('dark'); // 'dark' or 'osm'

  const filteredZones = HIMALAYAN_ZONES.filter(zone => {
    if (filterSeverity === 'ALL') return true;
    if (filterSeverity === 'CRITICAL') return zone.severity === 'CRITICAL';
    if (filterSeverity === 'HIGH') return zone.severity === 'HIGH';
    return true;
  });

  const centerCoord = activeZone ? activeZone.coordinates : [30.8, 78.5];

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl">
      {/* Map Control Bar Overlay */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl shadow-lg pointer-events-auto">
          <Layers className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-slate-300">HIMALAYAN DEMO MONITORING GRID</span>
          <span className="text-xs text-slate-500">|</span>
          <span className="text-xs text-cyan-400 font-mono font-bold">{filteredZones.length} Demo Hotspots</span>
        </div>

        {/* Severity Filters & Tile Switcher */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="bg-slate-950/90 backdrop-blur-md border border-slate-800 p-1 rounded-xl flex items-center gap-1 shadow-lg text-xs font-mono">
            <button
              onClick={() => setFilterSeverity('ALL')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterSeverity === 'ALL' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilterSeverity('CRITICAL')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterSeverity === 'CRITICAL' ? 'bg-rose-600 text-white font-bold' : 'text-rose-400 hover:bg-rose-950/50'
              }`}
            >
              CRITICAL
            </button>
            <button
              onClick={() => setFilterSeverity('HIGH')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterSeverity === 'HIGH' ? 'bg-amber-600 text-white font-bold' : 'text-amber-400 hover:bg-amber-950/50'
              }`}
            >
              HIGH
            </button>
          </div>

          <div className="bg-slate-950/90 backdrop-blur-md border border-slate-800 p-1 rounded-xl flex items-center gap-1 shadow-lg text-xs font-mono">
            <button
              onClick={() => setMapType('dark')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                mapType === 'dark' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              DARK HUD
            </button>
            <button
              onClick={() => setMapType('osm')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                mapType === 'osm' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              STREET
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[460px] w-full">
        <MapContainer
          center={centerCoord}
          zoom={7}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <MapRecenter center={centerCoord} zoom={8} />

          {/* Base Tile Layer */}
          {mapType === 'dark' ? (
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              maxZoom={19}
            />
          ) : (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
          )}

          {/* Zones & Impact Radius Circles */}
          {filteredZones.map(zone => {
            const isSelected = activeZone?.id === zone.id;
            const circleColor = zone.severity === 'CRITICAL' ? '#f43f5e' : zone.severity === 'HIGH' ? '#f59e0b' : '#10b981';

            return (
              <React.Fragment key={zone.id}>
                {/* Vulnerability buffer zone */}
                <Circle
                  center={zone.coordinates}
                  radius={zone.severity === 'CRITICAL' ? 14000 : 9000}
                  pathOptions={{
                    color: circleColor,
                    fillColor: circleColor,
                    fillOpacity: isSelected ? 0.25 : 0.12,
                    weight: isSelected ? 2 : 1,
                    dashArray: isSelected ? '4 4' : undefined
                  }}
                />

                {/* Marker with score */}
                <Marker
                  position={zone.coordinates}
                  icon={createCustomIcon(zone.severity, zone.riskScore)}
                  eventHandlers={{
                    click: () => onSelectZone(zone)
                  }}
                >
                  <Popup>
                    <div className="p-1 min-w-[240px] text-slate-100 font-sans">
                      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-800">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                          {zone.state} • {zone.district}
                        </span>
                        <RiskBadge severity={zone.severity} score={zone.riskScore} size="sm" />
                      </div>

                      <h4 className="font-bold text-sm text-white mb-1">
                        {zone.name}
                      </h4>
                      <p className="text-xs text-rose-300 font-medium mb-2 flex items-center gap-1">
                        <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
                        {zone.primaryHazard}
                      </p>

                      <div className="grid grid-cols-2 gap-1.5 bg-slate-950/70 p-2 rounded-lg border border-slate-800 text-[11px] font-mono mb-3">
                        <div>
                          <span className="text-slate-500">Elevation:</span>
                          <span className="ml-1 text-slate-300 font-semibold">{zone.elevation}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Slope:</span>
                          <span className="ml-1 text-slate-300 font-semibold">{zone.factors.slopeGradient}°</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Veg Loss:</span>
                          <span className="ml-1 text-rose-400 font-semibold">{zone.factors.vegetationLoss}%</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Rainfall:</span>
                          <span className="ml-1 text-cyan-400 font-semibold">{zone.factors.rainfall24h}mm</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onSelectZone(zone);
                          if (onNavigateToMonitoring) onNavigateToMonitoring();
                        }}
                        className="w-full flex items-center justify-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-md transition-colors"
                      >
                        <span>Inspect in Satellite Monitoring</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      {/* Map Legend Footer */}
      <div className="bg-slate-950/90 border-t border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-300 text-[11px]">THREAT LEVELS:</span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]"></span>
            Critical (80-100)
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]"></span>
            High (60-79)
          </span>
          <span className="flex items-center gap-1.5 text-yellow-300">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
            Moderate (40-59)
          </span>
        </div>
        <div className="text-[11px] text-slate-500 hidden sm:block">
          COORDINATES: WGS84 / UTM ZONE 44N • DEMO REVISIT CADENCE: 5 DAYS
        </div>
      </div>
    </div>
  );
}
