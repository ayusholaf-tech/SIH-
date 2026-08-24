import React from 'react';
import { 
  LayoutDashboard, 
  Satellite, 
  ShieldAlert, 
  BellRing, 
  FileText, 
  Sliders, 
  HelpCircle,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, alertsCount = 0 }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Command Dashboard',
      icon: LayoutDashboard,
      badge: null,
      description: 'Regional Overview & Map'
    },
    {
      id: 'monitoring',
      label: 'Satellite Monitoring',
      icon: Satellite,
      badge: 'LIVE',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      description: 'Before/After & Change Detection'
    },
    {
      id: 'risk-analysis',
      label: 'Multi-Factor Risk Analysis',
      icon: Sliders,
      badge: '0-100',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      description: 'Environmental Weights & Simulator'
    },
    {
      id: 'alerts',
      label: 'Incident Alerts',
      icon: BellRing,
      badge: alertsCount > 0 ? `${alertsCount} ACTIVE` : null,
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse',
      description: 'Hazard Logs & Directives'
    },
    {
      id: 'reports',
      label: 'Official Reports',
      icon: FileText,
      badge: 'PDF / DOSSIER',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      description: 'Intelligence Generator'
    }
  ];

  return (
    <aside className="w-64 shrink-0 bg-slate-950/80 backdrop-blur-md border-r border-slate-800/80 flex flex-col justify-between h-[calc(100vh-61px)] sticky top-[61px]">
      <div className="p-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
          TACTICAL MODULES
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full group flex items-start gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-950/40 border-cyan-500/40 text-white shadow-lg shadow-cyan-950/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 hover:border-slate-800'
              }`}
            >
              <div className={`mt-0.5 p-1.5 rounded-lg border transition-colors ${
                isActive 
                  ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-slate-200 group-hover:border-slate-700'
              }`}>
                <Icon className="h-4 w-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold tracking-wide ${isActive ? 'text-cyan-200 font-display' : 'text-slate-300'}`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={`font-mono text-[9px] px-1.5 py-0.2 rounded border font-bold ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Authority / System Telemetry Card */}
      <div className="p-3 border-t border-slate-900/90 bg-slate-950/40 m-2 rounded-xl border">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
            SYSTEM NODE: NDMA-ISRO LINK
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
          Prototype designed for Himalayan disaster mitigation and environmental impact auditing.
        </p>
      </div>
    </aside>
  );
}
