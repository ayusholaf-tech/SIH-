import React, { useState } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import DemoWatermark from './components/common/DemoWatermark';
import DashboardView from './components/dashboard/DashboardView';
import MonitoringView from './components/monitoring/MonitoringView';
import RiskAnalysisView from './components/riskAnalysis/RiskAnalysisView';
import AlertsView from './components/alerts/AlertsView';
import ReportsView from './components/reports/ReportsView';
import { HIMALAYAN_ZONES } from './data/himalayanZones';
import { INITIAL_ALERTS } from './data/mockTelemetry';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeZone, setActiveZone] = useState(HIMALAYAN_ZONES[0]);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Alert actions
  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return { ...a, status: 'ACKNOWLEDGED' };
      }
      return a;
    }));
  };

  const handleDispatchTeam = (alertId, note) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return { ...a, status: 'TEAM_DISPATCHED', note };
      }
      return a;
    }));
  };

  const unreadAlertsCount = alerts.filter(a => a.status === 'PENDING_ACK' || a.status === 'REVIEW_RECOMMENDED' || a.status === 'REVIEW RECOMMENDED').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#070b12] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Demo Banner */}
      <DemoWatermark />

      {/* Main Command Header */}
      <Header
        activeZone={activeZone}
        onSelectZone={setActiveZone}
        onNavigateToAlerts={() => setActiveTab('alerts')}
        unreadAlertsCount={unreadAlertsCount}
      />

      {/* Application Body */}
      <div className="flex-1 flex w-full">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          alertsCount={unreadAlertsCount}
        />

        {/* Dynamic Main Stage View */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {activeTab === 'dashboard' && (
            <DashboardView
              activeZone={activeZone}
              onSelectZone={setActiveZone}
              onNavigateToMonitoring={() => setActiveTab('monitoring')}
              onNavigateToAlerts={() => setActiveTab('alerts')}
              alerts={alerts}
              onSelectAlert={(alert) => {
                setSelectedAlert(alert);
                setActiveTab('alerts');
              }}
            />
          )}

          {activeTab === 'monitoring' && (
            <MonitoringView
              activeZone={activeZone}
              onSelectZone={setActiveZone}
              onNavigateToRiskAnalysis={() => setActiveTab('risk-analysis')}
            />
          )}

          {activeTab === 'risk-analysis' && (
            <RiskAnalysisView
              activeZone={activeZone}
              onSelectZone={setActiveZone}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertsView
              alerts={alerts}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onDispatchTeam={handleDispatchTeam}
              selectedAlert={selectedAlert}
              setSelectedAlert={setSelectedAlert}
              onNavigateToMonitoring={() => setActiveTab('monitoring')}
              onSelectZone={setActiveZone}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView
              activeZone={activeZone}
              onSelectZone={setActiveZone}
            />
          )}
        </main>
      </div>

      {/* Command Center Footer */}
      <Footer />
    </div>
  );
}
