import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { HIMALAYAN_ZONES } from '../../data/himalayanZones';
import RiskBadge from '../common/RiskBadge';
import { Eye, Layers, ShieldAlert, Activity, ArrowUpRight, MapPin } from 'lucide-react';

// Custom SVG Icons for Leaflet markers based on 3-tier classification
const createCustomIcon = (severity, score) => {
  let color = '#10b981'; // green for LOW
  let glowColor = 'rgba(16, 185, 129, 0.4)';
  
  if (severity === 'HIGH' || severity === 'CRITICAL') {
    color = '#f43f5e'; // red
    glowColor = 'rgba(244, 63, 94, 0.6)';
  } else if (severity === 'MEDIUM' || severity === 'MODERATE') {
    color = '#f59e0b'; // amber
    glowColor = 'rgba(245, 158, 11, 0.5)';
  }

  const svgHtml = `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
      <div style="position: absolute; width: 32px; height: 32px; border-radius: 50%; background: ${glowColor}; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
      <div style="position: relative; width: 28px; height: 28px; border-radius: 50%; background: #0c1322; border: 2px solid ${color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px ${color};">
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
  const [mapType, setMapType] = useState('dark');

  const filteredZones = HIMALAYAN_ZONES.filter(zone => {
    if (filterSeverity === 'ALL') return true;
    return zone.severity === filterSeverity;
  });

  const centerCoord = activeZone ? activeZone.coordinates : [30.74, 79.2];

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl">
      {/* Map Control Bar Overlay */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl shadow-lg pointer-events-auto">
          <Layers className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-slate-300">HIMALAYAN MONITORING GRID</span>
          <span className="text-xs text-slate-500">|</span>
          <span className="text-xs text-cyan-400 font-mono font-bold">{filteredZones.length} Sectors Active</span>
        </div>

        {/* 3-Tier Severity Filters & Tile Switcher */}
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
              onClick={() => setFilterSeverity('HIGH')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterSeverity === 'HIGH' ? 'bg-rose-600 text-white font-bold' : 'text-rose-400 hover:bg-rose-950/50'
              }`}
            >
              HIGH
            </button>
            <button
              onClick={() => setFilterSeverity('MEDIUM')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterSeverity === 'MEDIUM' ? 'bg-amber-600 text-white font-bold' : 'text-amber-400 hover:bg-amber-950/50'
              }`}
            >
              MEDIUM
            </button>
            <button
              onClick={() => setFilterSeverity('LOW')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterSeverity === 'LOW' ? 'bg-emerald-600 text-white font-bold' : 'text-emerald-400 hover:bg-emerald-950/50'
              }`}
            >
              LOW
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
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <MapRecenter center={centerCoord} zoom={8} />

          {/* Base Tile Layer */}
          {mapType === 'dark' ? (
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap'
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

          {/* Markers & Vulnerability Buffer Rings */}
          {filteredZones.map(zone => {
            const isSelected = activeZone && activeZone.id === zone.id;
            const circleColor = zone.severity === 'HIGH' ? '#f43f5e' : zone.severity === 'MEDIUM' ? '#f59e0b' : '#10b981';

            return (
              <React.Fragment key={zone.id}>
                {/* Geofence Vulnerability Buffer */}
                <Circle
                  center={zone.coordinates}
                  radius={zone.severity === 'HIGH' ? 7000 : zone.severity === 'MEDIUM' ? 5000 : 3500}
                  pathOptions={{
                    color: circleColor,
                    fillColor: circleColor,
                    fillOpacity: isSelected ? 0.25 : 0.12,
                    weight: isSelected ? 2 : 1,
                    dashArray: '4, 6'
                  }}
                />

                {/* Hotspot Interactive Pin Marker */}
                <Marker
                  position={zone.coordinates}
                  icon={createCustomIcon(zone.severity, zone.riskScore)}
                  eventHandlers={{
                    click: () => {
                      if (onSelectZone) onSelectZone(zone);
                    }
                  }}
                >
                  <Popup className="custom-leaflet-popup">
                    <div className="p-1 min-w-[220px] text-slate-900">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                          {zone.state} • {zone.district}
                        </span>
                        <RiskBadge severity={zone.severity} score={zone.riskScore} size="sm" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {zone.name}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                        {zone.summary}
                      </p>
                      <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-500">Elevation: {zone.elevation}</span>
                        {onNavigateToMonitoring && (
                          <button
                            onClick={() => {
                              if (onSelectZone) onSelectZone(zone);
                              onNavigateToMonitoring();
                            }}
                            className="text-cyan-700 font-bold hover:underline flex items-center gap-0.5"
                          >
                            <span>Inspect</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      {/* Bottom Map Status Strip */}
      <div className="bg-slate-950/90 border-t border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span>COORDINATE DATUM: <strong className="text-white">WGS 84 / UTM 44N</strong></span>
          <span className="hidden sm:inline">PROJECTION: <strong className="text-cyan-400">EPSG:3857 (Web Mercator)</strong></span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <strong className="text-slate-300">HIGH (70-100)</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <strong className="text-slate-300">MEDIUM (40-69)</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <strong className="text-slate-300">LOW (0-39)</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
