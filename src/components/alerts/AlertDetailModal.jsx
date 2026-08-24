import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  MapPin, 
  Clock, 
  Radio, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  FileCheck,
  Share2
} from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

export default function AlertDetailModal({ alert, onClose, onAcknowledgeAlert, onDispatchTeam }) {
  const [taskStatus, setTaskStatus] = useState(alert.status);
  const [dispatchNote, setDispatchNote] = useState('');
  const [isDispatched, setIsDispatched] = useState(false);

  if (!alert) return null;

  const handleAcknowledge = () => {
    setTaskStatus('ACKNOWLEDGED');
    if (onAcknowledgeAlert) onAcknowledgeAlert(alert.id);
  };

  const handleDispatch = () => {
    setIsDispatched(true);
    setTaskStatus('TEAM_DISPATCHED');
    if (onDispatchTeam) onDispatchTeam(alert.id, dispatchNote);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Top Header */}
        <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-950/70 border border-rose-500/40 text-rose-400">
              <ShieldAlert className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-400">{alert.id}</span>
                <RiskBadge severity={alert.severity} score={alert.riskScore} size="sm" />
              </div>
              <h3 className="text-base font-bold text-white font-display mt-0.5">
                Incident Response Directive
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Location & Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-500">LOCATION:</span>
              <p className="font-bold text-white text-sm font-sans mt-0.5">{alert.location}</p>
              <span className="text-cyan-400 text-[11px]">{alert.coordinates}</span>
            </div>
            <div>
              <span className="text-slate-500">TIME OF DETECTION:</span>
              <p className="font-semibold text-slate-200 mt-0.5">{alert.dateFormatted}</p>
              <span className="text-slate-400 text-[11px]">Sensor: {alert.sensorSource}</span>
            </div>
          </div>

          {/* Detected Anomaly Description */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
            <span className="text-xs font-mono uppercase text-rose-400 font-bold flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              Detected Environmental Anomaly
            </span>
            <p className="text-sm text-slate-200 mt-1 font-medium leading-relaxed">
              {alert.detectedChange}
            </p>
          </div>

          {/* Recommended Authority Action */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
              <FileCheck className="h-4 w-4" />
              Prescribed NDMA / SDMA Mitigation Action
            </span>
            <p className="text-sm text-slate-200 mt-1 leading-relaxed">
              {alert.recommendedAction}
            </p>
            <div className="mt-2 text-[11px] font-mono text-slate-400">
              Assigned Jurisdiction: <strong className="text-white">{alert.authorityAssigned}</strong>
            </div>
          </div>

          {/* Incident Response Workflow Actions */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-mono uppercase text-slate-300 font-bold">
              AUTHORITY ACTION CONSOLE:
            </span>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleAcknowledge}
                disabled={taskStatus === 'ACKNOWLEDGED' || taskStatus === 'TEAM_DISPATCHED'}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold font-mono flex items-center justify-center gap-2 border transition-all ${
                  taskStatus === 'ACKNOWLEDGED' || taskStatus === 'TEAM_DISPATCHED'
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 cursor-default'
                    : 'bg-slate-800 hover:bg-slate-750 text-white border-slate-700'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{taskStatus === 'ACKNOWLEDGED' || taskStatus === 'TEAM_DISPATCHED' ? 'DIRECTIVE ACKNOWLEDGED' : 'ACKNOWLEDGE ALERT'}</span>
              </button>

              <button
                onClick={handleDispatch}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold font-mono flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white border border-rose-500/40 shadow-lg shadow-rose-950 transition-all"
              >
                <Send className="h-4 w-4" />
                <span>{isDispatched ? 'TASKFORCE DISPATCHED' : 'DISPATCH SDRF TASKFORCE'}</span>
              </button>
            </div>

            {isDispatched && (
              <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-xs font-mono text-emerald-300 flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Emergency taskforce mobilization order broadcasted to regional control room.</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 border-t border-slate-800 px-6 py-3 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>SECURE TELEMETRY LOG ID: {alert.id}-VER-1</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
