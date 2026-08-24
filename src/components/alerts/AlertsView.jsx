import React, { useState } from 'react';
import { 
  BellRing, 
  Search, 
  Filter, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowUpRight, 
  FileText, 
  Send,
  AlertTriangle
} from 'lucide-react';
import RiskBadge from '../common/RiskBadge';
import AlertDetailModal from './AlertDetailModal';

export default function AlertsView({ 
  alerts, 
  onAcknowledgeAlert, 
  onDispatchTeam, 
  selectedAlert, 
  setSelectedAlert,
  onNavigateToMonitoring,
  onSelectZone 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [activeModalAlert, setActiveModalAlert] = useState(null);

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.detectedChange.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = severityFilter === 'ALL' || alert.severity === severityFilter;
    const matchesState = stateFilter === 'ALL' || alert.state.toLowerCase().includes(stateFilter.toLowerCase());

    return matchesSearch && matchesSeverity && matchesState;
  });

  const criticalCount = alerts.filter(a => a.severity === 'CRITICAL').length;
  const highCount = alerts.filter(a => a.severity === 'HIGH').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-950/70 border border-rose-500/30 text-rose-400">
              <BellRing className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Environmental Incident & Alert Registry (Demo)
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Simulated critical anomaly flags and suggested mitigation actions
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="bg-rose-950/80 border border-rose-500/40 text-rose-400 px-2.5 py-1 rounded-xl font-bold flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            {criticalCount} CRITICAL
          </span>
          <span className="bg-amber-950/80 border border-amber-500/40 text-amber-400 px-2.5 py-1 rounded-xl font-bold">
            {highCount} HIGH
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search alerts by location or hazard..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Severity Pills */}
          <div className="bg-slate-950 border border-slate-800 p-1 rounded-xl flex items-center gap-1 text-xs font-mono">
            {['ALL', 'CRITICAL', 'HIGH', 'MODERATE'].map(sev => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  severityFilter === sev
                    ? sev === 'CRITICAL' ? 'bg-rose-600 text-white font-bold'
                    : sev === 'HIGH' ? 'bg-amber-600 text-white font-bold'
                    : sev === 'MODERATE' ? 'bg-yellow-600 text-white font-bold'
                    : 'bg-cyan-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* State Filter Dropdown */}
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="ALL">All States / UTs</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Himachal">Himachal Pradesh</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Ladakh">Ladakh UT</option>
          </select>
        </div>
      </div>

      {/* Incident Cards Grid / Table */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 font-mono text-xs">
            No active incidents found matching the selected search and severity criteria.
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border transition-all bg-slate-900/80 backdrop-blur-md shadow-lg ${
                alert.severity === 'CRITICAL'
                  ? 'border-rose-500/40 hover:border-rose-500/70'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Left Info Column */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {alert.id}
                    </span>
                    <RiskBadge severity={alert.severity} score={alert.riskScore} size="sm" />
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.timestamp} ({alert.dateFormatted})
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>{alert.location}</span>
                    <span className="text-xs font-mono text-slate-400 font-normal">[{alert.state}]</span>
                  </h3>

                  {/* Coordinates Pill */}
                  <div className="text-[11px] font-mono text-cyan-400">
                    COORDINATES: {alert.coordinates} • SENSOR: {alert.sensorSource}
                  </div>

                  {/* Detected Change Box */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                    <div className="text-rose-400 font-mono font-bold uppercase text-[10px] mb-0.5 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Detected Satellite Anomaly:
                    </div>
                    <p className="text-slate-200 font-medium">
                      {alert.detectedChange}
                    </p>
                  </div>

                  {/* Recommended Action Box */}
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs">
                    <div className="text-cyan-400 font-mono font-bold uppercase text-[10px] mb-0.5">
                      Suggested Mitigation Response:
                    </div>
                    <p className="text-slate-300">
                      {alert.recommendedAction}
                    </p>
                  </div>
                </div>

                {/* Right Action Column */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 justify-between items-end">
                  <div className="text-right font-mono text-xs w-full sm:w-auto">
                    <span className="text-slate-500 text-[10px] block">INCIDENT STATUS</span>
                    <span className={`inline-block mt-0.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                      alert.status === 'ACKNOWLEDGED' || alert.status === 'TEAM_DISPATCHED'
                        ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-400'
                        : 'bg-rose-950 border border-rose-500/40 text-rose-400 animate-pulse'
                    }`}>
                      {alert.status === 'TEAM_DISPATCHED' ? 'TASKFORCE EN ROUTE' : alert.status === 'ACKNOWLEDGED' ? 'ACKNOWLEDGED' : 'REVIEW RECOMMENDED'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setActiveModalAlert(alert)}
                      className="flex-1 sm:flex-initial px-3.5 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-xs font-bold font-mono rounded-xl shadow-lg shadow-cyan-950 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Take Action</span>
                    </button>

                    <button
                      onClick={() => {
                        if (onAcknowledgeAlert) onAcknowledgeAlert(alert.id);
                      }}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono rounded-xl border border-slate-700 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Acknowledge</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal View */}
      {activeModalAlert && (
        <AlertDetailModal
          alert={activeModalAlert}
          onClose={() => setActiveModalAlert(null)}
          onAcknowledgeAlert={onAcknowledgeAlert}
          onDispatchTeam={onDispatchTeam}
        />
      )}
    </div>
  );
}
