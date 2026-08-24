import React from 'react';
import { BellRing, ShieldAlert, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

export default function RecentAlertsList({ alerts, onNavigateToAlerts, onSelectAlert }) {
  const topAlerts = alerts.slice(0, 4);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-400">
              <BellRing className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                Real-Time Incident Stream
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Active alerts flagged by satellite anomaly triggers
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToAlerts}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-mono font-semibold transition-colors"
          >
            <span>View All ({alerts.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {topAlerts.map(alert => (
            <div 
              key={alert.id}
              onClick={() => {
                if (onSelectAlert) onSelectAlert(alert);
                if (onNavigateToAlerts) onNavigateToAlerts();
              }}
              className="group p-3 rounded-xl border border-slate-800/80 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-850/60 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-400 font-bold">{alert.id}</span>
                  <RiskBadge severity={alert.severity} score={alert.riskScore} size="sm" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                  <Clock className="h-3 w-3" />
                  <span>{alert.timestamp}</span>
                </div>
              </div>

              <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                {alert.location}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                {alert.detectedChange}
              </p>

              <div className="mt-2 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-500">
                  Target Authority: <span className="text-slate-300">{alert.authorityAssigned}</span>
                </span>
                <span className={`px-1.5 py-0.5 rounded font-bold ${
                  alert.status === 'ACKNOWLEDGED' 
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                    : 'bg-rose-950 text-rose-400 border border-rose-800 animate-pulse'
                }`}>
                  {alert.status === 'ACKNOWLEDGED' ? 'ACKNOWLEDGED' : 'ACTION REQUIRED'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
        <button
          onClick={onNavigateToAlerts}
          className="w-full py-2 bg-slate-800/60 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white rounded-xl border border-slate-700/60 transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Open Full Incident Response Console</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
