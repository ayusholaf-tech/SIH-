import React, { useState, useEffect } from 'react';
import { 
  Mountain, 
  Radio, 
  Satellite, 
  Bell, 
  Clock, 
  ShieldAlert, 
  Globe, 
  ChevronDown 
} from 'lucide-react';
import { HIMALAYAN_ZONES } from '../../data/himalayanZones';

export default function Header({ activeZone, onSelectZone, onNavigateToAlerts, unreadAlertsCount = 4 }) {
  const [timeState, setTimeState] = useState({
    ist: '',
    utc: ''
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimeState({
        ist: now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST',
        utc: now.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour12: false }) + ' UTC'
      });
    };
    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="flex items-center justify-between px-4 lg:px-6 py-2.5">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-600 to-emerald-700 text-white shadow-lg shadow-cyan-900/30 border border-cyan-400/30">
            <Mountain className="h-6 w-6" />
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-black tracking-wider text-white">
                HIM<span className="text-cyan-400">-SAFE</span>
              </span>
              <span className="bg-slate-800/90 border border-slate-700 text-cyan-300 font-mono text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold">
                GOV COMMAND
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block tracking-tight">
              Himalayan Environmental Impact Monitoring & Early Warning System
            </p>
          </div>
        </div>

        {/* Center: Live Sector Switcher */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-1.5 shadow-inner">
          <Globe className="h-4 w-4 text-cyan-400" />
          <span className="text-xs text-slate-400 font-mono">SECTOR FOCUS:</span>
          <select 
            value={activeZone?.id || ''}
            onChange={(e) => {
              const zone = HIMALAYAN_ZONES.find(z => z.id === e.target.value);
              if (zone) onSelectZone(zone);
            }}
            className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer border-none pr-2 font-mono"
          >
            {HIMALAYAN_ZONES.map(z => (
              <option key={z.id} value={z.id} className="bg-slate-900 text-slate-200">
                {z.name} [{z.state}]
              </option>
            ))}
          </select>
        </div>

        {/* Right Status & Telemetry Indicators */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Realtime Clocks */}
          <div className="hidden md:flex flex-col items-end text-[11px] font-mono text-slate-300 bg-slate-900/60 px-2.5 py-1 rounded border border-slate-800">
            <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
              <Clock className="h-3 w-3" />
              <span>{timeState.ist || '14:38:00 IST'}</span>
            </div>
            <span className="text-[10px] text-slate-500">{timeState.utc || '09:08:00 UTC'}</span>
          </div>

          {/* Satellite Telemetry Sync Pill */}
          <div className="hidden sm:flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs text-emerald-400 font-mono">
            <Satellite className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
            <span className="hidden xl:inline text-[11px]">SENTINEL-2 / ISRO PASS:</span>
            <span className="font-bold text-[11px]">SYNCED</span>
          </div>

          {/* Alert Trigger Button */}
          <button 
            onClick={onNavigateToAlerts}
            className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:bg-slate-850 text-slate-300 transition-colors"
            title="View Active Critical Alerts"
          >
            <Bell className="h-5 w-5 text-slate-300" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-lg animate-pulse">
                {unreadAlertsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
