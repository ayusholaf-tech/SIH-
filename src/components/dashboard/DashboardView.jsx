import React from 'react';
import { 
  Globe, 
  Layers, 
  ShieldAlert, 
  Activity, 
  Radio, 
  MapPin,
  TrendingDown,
  Satellite,
  Compass,
  AlertTriangle
} from 'lucide-react';
import MetricCard from '../common/MetricCard';
import HimalayanMap from './HimalayanMap';
import RiskDistributionChart from './RiskDistributionChart';
import RecentAlertsList from './RecentAlertsList';
import { SYSTEM_METRICS } from '../../data/himalayanZones';

export default function DashboardView({ 
  activeZone, 
  onSelectZone, 
  onNavigateToMonitoring, 
  onNavigateToAlerts, 
  alerts,
  onSelectAlert 
}) {
  return (
    <div className="space-y-6">
      {/* Top Welcome / Status Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-base font-bold text-white font-display">
              Himalayan Spatial Telemetry Overview
            </h2>
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
              INDIAN HIMALAYAN REGION (IHR)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Synchronized with ISRO Bhuvan / Sentinel Multispectral Feeds • Active Grid: Uttarakhand, Himachal, Sikkim, Ladakh
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800 text-xs font-mono">
            <span className="text-slate-500">FOCUSED ZONE:</span>{' '}
            <span className="text-cyan-300 font-bold">{activeZone ? activeZone.name : 'All Zones'}</span>
          </div>
          <button
            onClick={onNavigateToMonitoring}
            className="px-3.5 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-900/30 transition-all flex items-center gap-1.5"
          >
            <Satellite className="h-4 w-4" />
            <span>Launch Satellite Inspector</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Monitored Sectors"
          value={SYSTEM_METRICS.totalMonitoredZones}
          unit="ZONES"
          subtitle="8 High-Altitude Corridors active"
          icon={Globe}
          trend="+2 Added (Sikkim/Ladakh)"
          trendType="neutral"
        />
        <MetricCard
          title="Detected Land Disturbance"
          value={SYSTEM_METRICS.detectedLandChangesSqKm}
          unit="SQ KM"
          subtitle="Canopy loss & road cut footprint"
          icon={Layers}
          trend="+12.4% vs 2024 Base"
          trendType="danger"
          alert={true}
        />
        <MetricCard
          title="Critical Risk Hotspots"
          value={SYSTEM_METRICS.criticalZonesCount}
          unit="ZONES"
          subtitle="Risk index ≥ 80 / 100 threshold"
          icon={ShieldAlert}
          trend="Immediate Action Required"
          trendType="danger"
          alert={true}
        />
        <MetricCard
          title="Avg Regional Vulnerability"
          value={SYSTEM_METRICS.averageRegionalRiskScore}
          unit="/ 100"
          subtitle="Composite weighted hazard index"
          icon={Activity}
          trend="+6.2 pts vs last orbit"
          trendType="warning"
        />
      </div>

      {/* Main Interactive Himalayan Map */}
      <HimalayanMap
        activeZone={activeZone}
        onSelectZone={onSelectZone}
        onNavigateToMonitoring={onNavigateToMonitoring}
      />

      {/* Bottom Grid: Risk Distribution & Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskDistributionChart
          activeZone={activeZone}
          onSelectZone={onSelectZone}
        />
        <RecentAlertsList
          alerts={alerts}
          onNavigateToAlerts={onNavigateToAlerts}
          onSelectAlert={onSelectAlert}
        />
      </div>
    </div>
  );
}
