/**
 * Realistic Fictional Demo Data for HIM-SAFE (Himalayan Environmental Impact Monitoring)
 * Clearly marked as Prototype / SIH Demo Data
 */

export const HIMALAYAN_ZONES = [
  {
    id: "zone-joshimath",
    name: "Joshimath Urban-Slope Subsidence Corridor",
    state: "Uttarakhand",
    district: "Chamoli",
    coordinates: [30.5562, 79.5637],
    elevation: "1,875 m",
    riskScore: 88,
    severity: "CRITICAL",
    primaryHazard: "Ground Subsidence & Slope Destabilization",
    satelliteSensor: "Demo Sentinel/Landsat-compatible imagery",
    lastAcquisition: "2026-05-18 05:42 UTC",
    summary: "Extensive sub-surface displacement observed along lower slopes. Severe canopy thinning (-42%) and fresh linear road excavations compounding slope creep.",
    factors: {
      vegetationLoss: 42, // % loss
      landDisturbance: 8.9, // 0 - 10 index
      slopeGradient: 38, // degrees
      rainfall24h: 148, // mm
      temperatureAnomaly: 2.8, // °C above seasonal norm
      geologicalFaultProximity: "0.4 km (Vaikrita Thrust)",
      soilSaturation: 84 // %
    },
    changeMetrics: {
      vegetationLossArea: "3.84 sq km",
      landDisturbanceArea: "5.12 sq km",
      newRoadLength: "8.4 km",
      activeFissureCount: 47,
      displacementRate: "4.2 mm/day"
    },
    beforeAfterData: {
      baselineDate: "Oct 2024 (Pre-Monsoon Baseline)",
      telemetryDate: "May 2026 (Simulated Orbit Scan)",
      ndviChange: "-38.5%",
      soilMoistureChange: "+46.2%",
      slopeErosionVolume: "142,000 m³"
    },
    recommendedAction: "Suggested Grade-A evacuation review for Wards 4, 6, and 7; pause heavy drilling on the Helang bypass corridor; reinforce toe support along the Alaknanda confluence.",
    actionChecklist: [
      { id: "act-1", title: "Deploy local survey & evacuation team to Ward 5", priority: "IMMEDIATE_24H", status: "PENDING" },
      { id: "act-2", title: "Review temporary restriction of heavy vehicular movement on NH-58", priority: "IMMEDIATE_24H", status: "ACKNOWLEDGED" },
      { id: "act-3", title: "Simulate placement of automated tiltmeters on destabilized toe slopes", priority: "MIDTERM_7D", status: "IN_PROGRESS" },
      { id: "act-4", title: "Plan bio-engineering vetiver turfing & micro-drainage network", priority: "LONGTERM_30D", status: "PLANNED" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 54, rainfall: 22, vegLoss: 14 },
      { month: "Jan 2026", risk: 58, rainfall: 35, vegLoss: 18 },
      { month: "Feb 2026", risk: 66, rainfall: 50, vegLoss: 24 },
      { month: "Mar 2026", risk: 74, rainfall: 82, vegLoss: 31 },
      { month: "Apr 2026", risk: 81, rainfall: 110, vegLoss: 37 },
      { month: "May 2026", risk: 88, rainfall: 148, vegLoss: 42 }
    ]
  },
  {
    id: "zone-kedarnath",
    name: "Kedarnath Mandakini Upper Catchment",
    state: "Uttarakhand",
    district: "Rudraprayag",
    coordinates: [30.7346, 79.0669],
    elevation: "3,583 m",
    riskScore: 92,
    severity: "CRITICAL",
    primaryHazard: "GLOF (Glacial Lake Outburst) & Debris Flow",
    satelliteSensor: "Demo Sentinel/Landsat-compatible imagery",
    lastAcquisition: "2026-05-19 04:15 UTC",
    summary: "Chorabari moraine dam lake volume expanded by 34% following high spring melt. High slope debris mobility detected in upper Mandakini gully.",
    factors: {
      vegetationLoss: 31,
      landDisturbance: 9.4,
      slopeGradient: 46,
      rainfall24h: 182,
      temperatureAnomaly: 3.4,
      geologicalFaultProximity: "1.2 km (Main Central Thrust)",
      soilSaturation: 91
    },
    changeMetrics: {
      vegetationLossArea: "2.10 sq km",
      landDisturbanceArea: "7.80 sq km",
      newRoadLength: "3.2 km",
      activeFissureCount: 62,
      displacementRate: "6.8 mm/day"
    },
    beforeAfterData: {
      baselineDate: "Nov 2024 (Baseline)",
      telemetryDate: "May 2026 (Simulated)",
      ndviChange: "-28.2%",
      soilMoistureChange: "+58.0%",
      slopeErosionVolume: "260,000 m³"
    },
    recommendedAction: "Suggested Level-3 flash flood alert across Gaurikund-Sonprayag corridor; review acoustic sensor sirens along the Mandakini river channel.",
    actionChecklist: [
      { id: "act-5", title: "Test simulated early warning siren triggers in Gaurikund & Sonprayag", priority: "IMMEDIATE_24H", status: "ACKNOWLEDGED" },
      { id: "act-6", title: "Evaluate siphon drainage on supra-glacial lake", priority: "MIDTERM_7D", status: "PLANNED" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 60, rainfall: 40, vegLoss: 10 },
      { month: "Jan 2026", risk: 62, rainfall: 45, vegLoss: 12 },
      { month: "Feb 2026", risk: 69, rainfall: 70, vegLoss: 17 },
      { month: "Mar 2026", risk: 78, rainfall: 105, vegLoss: 22 },
      { month: "Apr 2026", risk: 85, rainfall: 140, vegLoss: 27 },
      { month: "May 2026", risk: 92, rainfall: 182, vegLoss: 31 }
    ]
  },
  {
    id: "zone-chamoli",
    name: "Chamoli - Rishiganga Gash Basin",
    state: "Uttarakhand",
    district: "Chamoli",
    coordinates: [30.4124, 79.3326],
    elevation: "1,550 m",
    riskScore: 76,
    severity: "HIGH",
    primaryHazard: "Massive Rockslide & Silt Choking",
    satelliteSensor: "Demo Sentinel/Landsat-compatible imagery",
    lastAcquisition: "2026-05-17 06:10 UTC",
    summary: "Active scar progression detected on northern amphitheater wall. Hydro-power intake tunnels showing sediment overload alerts.",
    factors: {
      vegetationLoss: 36,
      landDisturbance: 7.8,
      slopeGradient: 42,
      rainfall24h: 96,
      temperatureAnomaly: 2.1,
      geologicalFaultProximity: "0.8 km",
      soilSaturation: 72
    },
    changeMetrics: {
      vegetationLossArea: "4.50 sq km",
      landDisturbanceArea: "6.20 sq km",
      newRoadLength: "11.2 km",
      activeFissureCount: 33,
      displacementRate: "3.1 mm/day"
    },
    beforeAfterData: {
      baselineDate: "Oct 2024",
      telemetryDate: "May 2026",
      ndviChange: "-34.0%",
      soilMoistureChange: "+32.1%",
      slopeErosionVolume: "185,000 m³"
    },
    recommendedAction: "Pre-position excavators at bridge bottlenecks; review night transit advisories along Joshimath-Malari road.",
    actionChecklist: [
      { id: "act-7", title: "Establish river gauge checkpoint at Tapovan", priority: "IMMEDIATE_24H", status: "ACKNOWLEDGED" },
      { id: "act-8", title: "Volumetric scan of northern scarp face", priority: "MIDTERM_7D", status: "IN_PROGRESS" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 48, rainfall: 18, vegLoss: 12 },
      { month: "Jan 2026", risk: 52, rainfall: 25, vegLoss: 15 },
      { month: "Feb 2026", risk: 59, rainfall: 42, vegLoss: 21 },
      { month: "Mar 2026", risk: 65, rainfall: 60, vegLoss: 26 },
      { month: "Apr 2026", risk: 71, rainfall: 78, vegLoss: 30 },
      { month: "May 2026", risk: 76, rainfall: 96, vegLoss: 36 }
    ]
  },
  {
    id: "zone-dharamshala",
    name: "Dharamshala - McLeod Ganj Ridge Sector",
    state: "Himachal Pradesh",
    district: "Kangra",
    coordinates: [32.2190, 76.3234],
    elevation: "1,750 m",
    riskScore: 68,
    severity: "HIGH",
    primaryHazard: "Slope Creep & Multi-Storey Overburden Collapse",
    satelliteSensor: "Demo Sentinel/Landsat-compatible imagery",
    lastAcquisition: "2026-05-18 07:30 UTC",
    summary: "Significant hill-cutting on Khanyara road; localized shear cracks observed near Bhagsu waterfall tourist sector.",
    factors: {
      vegetationLoss: 28,
      landDisturbance: 6.9,
      slopeGradient: 34,
      rainfall24h: 112,
      temperatureAnomaly: 1.8,
      geologicalFaultProximity: "1.6 km (Kangra Thrust)",
      soilSaturation: 68
    },
    changeMetrics: {
      vegetationLossArea: "2.90 sq km",
      landDisturbanceArea: "3.75 sq km",
      newRoadLength: "6.8 km",
      activeFissureCount: 21,
      displacementRate: "1.9 mm/day"
    },
    beforeAfterData: {
      baselineDate: "Oct 2024",
      telemetryDate: "May 2026",
      ndviChange: "-26.4%",
      soilMoistureChange: "+38.4%",
      slopeErosionVolume: "95,000 m³"
    },
    recommendedAction: "Advise strict controls on hill-slope excavations exceeding 4 meters without retaining walls; clear drainage gullies before monsoon surge.",
    actionChecklist: [
      { id: "act-9", title: "Inspection of high-slope structures in Bhagsu zone", priority: "IMMEDIATE_24H", status: "ACKNOWLEDGED" },
      { id: "act-10", title: "Construct stormwater culverts along Jogibara Road", priority: "MIDTERM_7D", status: "PLANNED" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 42, rainfall: 28, vegLoss: 10 },
      { month: "Jan 2026", risk: 46, rainfall: 32, vegLoss: 12 },
      { month: "Feb 2026", risk: 52, rainfall: 55, vegLoss: 16 },
      { month: "Mar 2026", risk: 58, rainfall: 72, vegLoss: 20 },
      { month: "Apr 2026", risk: 63, rainfall: 90, vegLoss: 24 },
      { month: "May 2026", risk: 68, rainfall: 112, vegLoss: 28 }
    ]
  },
  {
    id: "zone-spiti",
    name: "Spiti Valley High-Altitude Permafrost Zone",
    state: "Himachal Pradesh",
    district: "Lahaul and Spiti",
    coordinates: [32.2461, 78.0349],
    elevation: "3,800 m",
    riskScore: 44,
    severity: "MODERATE",
    primaryHazard: "Permafrost Degradation & Soil Fragility",
    satelliteSensor: "Demo Sentinel/Landsat-compatible imagery",
    lastAcquisition: "2026-05-16 04:50 UTC",
    summary: "Cold desert ecosystem showing localized gravel loss due to unregulated vehicular tracks on fragile alpine pastures near Kaza.",
    factors: {
      vegetationLoss: 15,
      landDisturbance: 4.2,
      slopeGradient: 22,
      rainfall24h: 18,
      temperatureAnomaly: 3.9,
      geologicalFaultProximity: "4.5 km",
      soilSaturation: 29
    },
    changeMetrics: {
      vegetationLossArea: "1.20 sq km",
      landDisturbanceArea: "2.40 sq km",
      newRoadLength: "14.5 km",
      activeFissureCount: 8,
      displacementRate: "0.6 mm/day"
    },
    beforeAfterData: {
      baselineDate: "Oct 2024",
      telemetryDate: "May 2026",
      ndviChange: "-12.8%",
      soilMoistureChange: "-14.2%",
      slopeErosionVolume: "32,000 m³"
    },
    recommendedAction: "Designate protected alpine conservation corridors; ban non-designated off-road vehicular excursions.",
    actionChecklist: [
      { id: "act-11", title: "Demarcate eco-sensitive pasture buffer rings around Kaza & Tabo", priority: "MIDTERM_7D", status: "ACKNOWLEDGED" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 32, rainfall: 5, vegLoss: 6 },
      { month: "Jan 2026", risk: 35, rainfall: 8, vegLoss: 8 },
      { month: "Feb 2026", risk: 38, rainfall: 10, vegLoss: 9 },
      { month: "Mar 2026", risk: 40, rainfall: 12, vegLoss: 11 },
      { month: "Apr 2026", risk: 42, rainfall: 15, vegLoss: 13 },
      { month: "May 2026", risk: 44, rainfall: 18, vegLoss: 15 }
    ]
  },
  {
    id: "zone-gangotri",
    name: "Gangotri Glacier Snout & Bhagirathi Source",
    state: "Uttarakhand",
    district: "Uttarkashi",
    coordinates: [30.9947, 78.9398],
    elevation: "4,020 m",
    riskScore: 84,
    severity: "CRITICAL",
    primaryHazard: "Rapid Glacier Snout Retreat & Moraine Collapse",
    satelliteSensor: "Demo Sentinel/Landsat-compatible imagery",
    lastAcquisition: "2026-05-18 03:55 UTC",
    summary: "Gaumukh snout calving accelerated by 24% compared to 2024 baseline. Moraine lateral collapse threatening pilgrimage trekking route.",
    factors: {
      vegetationLoss: 22,
      landDisturbance: 8.6,
      slopeGradient: 52,
      rainfall24h: 88,
      temperatureAnomaly: 3.7,
      geologicalFaultProximity: "2.1 km",
      soilSaturation: 79
    },
    changeMetrics: {
      vegetationLossArea: "0.85 sq km",
      landDisturbanceArea: "6.90 sq km",
      newRoadLength: "1.5 km",
      activeFissureCount: 41,
      displacementRate: "5.4 mm/day"
    },
    beforeAfterData: {
      baselineDate: "Oct 2024",
      telemetryDate: "May 2026",
      ndviChange: "-19.6%",
      soilMoistureChange: "+49.0%",
      slopeErosionVolume: "310,000 m³"
    },
    recommendedAction: "Suggest permit quota limits for Gaumukh trekking; review acoustic sensor monitors near Chirbasa cliff.",
    actionChecklist: [
      { id: "act-12", title: "Implement online permit quota control with biometric tracking", priority: "IMMEDIATE_24H", status: "ACKNOWLEDGED" },
      { id: "act-13", title: "Glaciological inspection team deployment", priority: "MIDTERM_7D", status: "IN_PROGRESS" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 52, rainfall: 15, vegLoss: 8 },
      { month: "Jan 2026", risk: 58, rainfall: 22, vegLoss: 10 },
      { month: "Feb 2026", risk: 65, rainfall: 38, vegLoss: 14 },
      { month: "Mar 2026", risk: 72, rainfall: 54, vegLoss: 17 },
      { month: "Apr 2026", risk: 79, rainfall: 70, vegLoss: 19 },
      { month: "May 2026", risk: 84, rainfall: 88, vegLoss: 22 }
    ]
  },
  {
    id: "zone-teesta",
    name: "Teesta North Sikkim GLOF Flashpoint",
    state: "Sikkim",
    district: "Mangan",
    coordinates: [27.5330, 88.5122],
    elevation: "2,200 m",
    riskScore: 89,
    severity: "CRITICAL",
    primaryHazard: "High-Altitude Glacial Lake Breach & Riverbed Scour",
    satelliteSensor: "Demo Sentinel/Landsat-compatible imagery",
    lastAcquisition: "2026-05-19 02:40 UTC",
    summary: "South Lhonak and Shako Cho glacial lakes showing elevated water level pressure. Heavy riverbank scouring along Chungthang axis.",
    factors: {
      vegetationLoss: 44,
      landDisturbance: 9.1,
      slopeGradient: 48,
      rainfall24h: 174,
      temperatureAnomaly: 2.9,
      geologicalFaultProximity: "1.0 km",
      soilSaturation: 88
    },
    changeMetrics: {
      vegetationLossArea: "6.20 sq km",
      landDisturbanceArea: "9.40 sq km",
      newRoadLength: "12.8 km",
      activeFissureCount: 54,
      displacementRate: "5.8 mm/day"
    },
    beforeAfterData: {
      baselineDate: "Oct 2024",
      telemetryDate: "May 2026",
      ndviChange: "-41.2%",
      soilMoistureChange: "+54.5%",
      slopeErosionVolume: "420,000 m³"
    },
    recommendedAction: "Alert downstream barrage operators; execute spillway gate readiness reviews.",
    actionChecklist: [
      { id: "act-14", title: "Early warning telemetry check with simulated river gauges", priority: "IMMEDIATE_24H", status: "ACKNOWLEDGED" },
      { id: "act-15", title: "Reinforce Chungthang bridge retaining abutments", priority: "MIDTERM_7D", status: "IN_PROGRESS" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 58, rainfall: 30, vegLoss: 18 },
      { month: "Jan 2026", risk: 64, rainfall: 42, vegLoss: 23 },
      { month: "Feb 2026", risk: 71, rainfall: 68, vegLoss: 29 },
      { month: "Mar 2026", risk: 78, rainfall: 102, vegLoss: 34 },
      { month: "Apr 2026", risk: 84, rainfall: 135, vegLoss: 39 },
      { month: "May 2026", risk: 89, rainfall: 174, vegLoss: 44 }
    ]
  },
  {
    id: "zone-leh",
    name: "Leh Valley Alluvial Cloudburst Fan",
    state: "Ladakh UT",
    district: "Leh",
    coordinates: [34.1526, 77.5771],
    elevation: "3,500 m",
    riskScore: 64,
    severity: "HIGH",
    primaryHazard: "Alluvial Fan Flash Flooding & Silt Washout",
    satelliteSensor: "Demo Sentinel/Landsat-compatible imagery",
    lastAcquisition: "2026-05-17 08:20 UTC",
    summary: "Urban building encroachment across traditional Khakshal mudflow channels creates high vulnerability in event of high-intensity short-duration downpours.",
    factors: {
      vegetationLoss: 18,
      landDisturbance: 6.5,
      slopeGradient: 26,
      rainfall24h: 34,
      temperatureAnomaly: 3.2,
      geologicalFaultProximity: "3.2 km",
      soilSaturation: 42
    },
    changeMetrics: {
      vegetationLossArea: "1.40 sq km",
      landDisturbanceArea: "4.10 sq km",
      newRoadLength: "9.2 km",
      activeFissureCount: 14,
      displacementRate: "1.2 mm/day"
    },
    beforeAfterData: {
      baselineDate: "Oct 2024",
      telemetryDate: "May 2026",
      ndviChange: "-16.0%",
      soilMoistureChange: "+22.0%",
      slopeErosionVolume: "54,000 m³"
    },
    recommendedAction: "Clear choked culverts on Saboo & Choglamsar drainage paths; suggest restriction on permanent masonry on active wash corridors.",
    actionChecklist: [
      { id: "act-16", title: "Heavy desiltation of 6 main Saboo nallah runoff channels", priority: "IMMEDIATE_24H", status: "PENDING" },
      { id: "act-17", title: "Issue demarcation map for flood hazard no-build zones", priority: "MIDTERM_7D", status: "ACKNOWLEDGED" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 36, rainfall: 4, vegLoss: 8 },
      { month: "Jan 2026", risk: 40, rainfall: 7, vegLoss: 10 },
      { month: "Feb 2026", risk: 46, rainfall: 12, vegLoss: 12 },
      { month: "Mar 2026", risk: 52, rainfall: 18, vegLoss: 14 },
      { month: "Apr 2026", risk: 58, rainfall: 25, vegLoss: 16 },
      { month: "May 2026", risk: 64, rainfall: 34, vegLoss: 18 }
    ]
  }
];

export const SYSTEM_METRICS = {
  totalMonitoredZones: 14,
  activeMonitoredZonesList: HIMALAYAN_ZONES.length,
  detectedLandChangesSqKm: 38.4,
  highRiskZonesCount: HIMALAYAN_ZONES.filter(z => z.severity === "CRITICAL" || z.severity === "HIGH").length,
  criticalZonesCount: HIMALAYAN_ZONES.filter(z => z.severity === "CRITICAL").length,
  averageRegionalRiskScore: Math.round(
    HIMALAYAN_ZONES.reduce((acc, z) => acc + z.riskScore, 0) / HIMALAYAN_ZONES.length
  ),
  satelliteConstellationStatus: "SIMULATED (Sentinel/Landsat-compatible prototype dataset)",
  lastTelemetrySync: "2026-05-19 14:38:20 IST",
  openAlertsCount: 18
};
