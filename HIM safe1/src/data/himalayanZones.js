/**
 * Himalayan Environmental Impact Monitoring (HIM-SAFE) Zone Profiles
 * Standardized to 3 Risk Levels:
 *   - LOW: 0 - 39
 *   - MEDIUM: 40 - 69
 *   - HIGH: 70 - 100
 */

export const HIMALAYAN_ZONES = [
  {
    id: "zone-kedarnath",
    name: "Kedarnath Mandakini Upper Catchment",
    state: "Uttarakhand",
    district: "Rudraprayag",
    coordinates: [30.7346, 79.0669],
    elevation: "3,583 m",
    riskScore: 88,
    severity: "HIGH",
    primaryHazard: "GLOF (Glacial Lake Outburst) & Debris Flow",
    satelliteSensor: "Sentinel-2 / Landsat Compatible Optical RGB",
    lastAcquisition: "2026-05-19 04:15 UTC",
    summary: "Chorabari moraine dam lake volume expanded following high spring melt. High slope debris mobility and sediment surging detected in upper Mandakini gully above Gaurikund.",
    factors: {
      vegetationLoss: 31, // % loss
      landDisturbance: 9.4, // 0 - 10 index
      slopeGradient: 46, // degrees
      rainfall24h: 182, // mm
      temperatureAnomaly: 3.4, // °C
      geologicalFaultProximity: "1.2 km (Main Central Thrust)",
      soilSaturation: 91 // %
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
      telemetryDate: "May 2026 (Simulated Orbit Scan)",
      vegProxyChange: "-28.2% (VARI Proxy)",
      soilMoistureChange: "+58.0%",
      slopeErosionVolume: "260,000 m³"
    },
    recommendedAction: "Suggested Level-3 flash flood alert across Gaurikund-Sonprayag corridor; review acoustic sensor sirens along the Mandakini river channel.",
    actionChecklist: [
      { id: "act-k1", title: "Test automated early warning sirens in Gaurikund & Sonprayag", priority: "HIGH (24h)", status: "ACKNOWLEDGED" },
      { id: "act-k2", title: "Deploy drone LiDAR survey across moraine gully scarp", priority: "HIGH (48h)", status: "PENDING" },
      { id: "act-k3", title: "Evaluate controlled siphon drainage on upper moraine pond", priority: "MEDIUM (7d)", status: "PLANNED" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 58, rainfall: 40, vegLoss: 10 },
      { month: "Jan 2026", risk: 62, rainfall: 45, vegLoss: 12 },
      { month: "Feb 2026", risk: 69, rainfall: 70, vegLoss: 17 },
      { month: "Mar 2026", risk: 76, rainfall: 105, vegLoss: 22 },
      { month: "Apr 2026", risk: 82, rainfall: 140, vegLoss: 27 },
      { month: "May 2026", risk: 88, rainfall: 182, vegLoss: 31 }
    ]
  },
  {
    id: "zone-badrinath",
    name: "Badrinath - Alaknanda Highway Corridor",
    state: "Uttarakhand",
    district: "Chamoli",
    coordinates: [30.7433, 79.4938],
    elevation: "3,133 m",
    riskScore: 76,
    severity: "HIGH",
    primaryHazard: "Slope Undercutting & Rockfall Creep",
    satelliteSensor: "Sentinel-2 / Landsat Compatible Optical RGB",
    lastAcquisition: "2026-05-18 06:20 UTC",
    summary: "Prominent linear excavation cuts detected along NH-07 bypass. Exposed bedrock scarp showing active loose rubble sliding toward the Alaknanda riverbed.",
    factors: {
      vegetationLoss: 38,
      landDisturbance: 8.2,
      slopeGradient: 42,
      rainfall24h: 124,
      temperatureAnomaly: 2.3,
      geologicalFaultProximity: "0.9 km (Vaikrita Thrust)",
      soilSaturation: 78
    },
    changeMetrics: {
      vegetationLossArea: "3.40 sq km",
      landDisturbanceArea: "5.60 sq km",
      newRoadLength: "9.8 km",
      activeFissureCount: 38,
      displacementRate: "4.5 mm/day"
    },
    beforeAfterData: {
      baselineDate: "Oct 2024 (Baseline)",
      telemetryDate: "May 2026 (Simulated Orbit Scan)",
      vegProxyChange: "-34.5% (VARI Proxy)",
      soilMoistureChange: "+41.0%",
      slopeErosionVolume: "175,000 m³"
    },
    recommendedAction: "Enforce slope retaining mesh along NH-07 cut section; clear downstream drainage culverts before heavy precipitation.",
    actionChecklist: [
      { id: "act-b1", title: "Deploy rockfall barrier nets along steep cutting chokepoints", priority: "HIGH (24h)", status: "IN_PROGRESS" },
      { id: "act-b2", title: "Ground inspection of Alaknanda river toe erosion", priority: "MEDIUM (7d)", status: "ACKNOWLEDGED" },
      { id: "act-b3", title: "Bio-engineering grass turfing on barren cut slopes", priority: "MEDIUM (14d)", status: "PLANNED" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 48, rainfall: 25, vegLoss: 12 },
      { month: "Jan 2026", risk: 52, rainfall: 30, vegLoss: 15 },
      { month: "Feb 2026", risk: 59, rainfall: 48, vegLoss: 20 },
      { month: "Mar 2026", risk: 65, rainfall: 72, vegLoss: 26 },
      { month: "Apr 2026", risk: 71, rainfall: 95, vegLoss: 32 },
      { month: "May 2026", risk: 76, rainfall: 124, vegLoss: 38 }
    ]
  },
  {
    id: "zone-joshimath",
    name: "Joshimath Urban-Slope Subsidence Corridor",
    state: "Uttarakhand",
    district: "Chamoli",
    coordinates: [30.5562, 79.5637],
    elevation: "1,875 m",
    riskScore: 82,
    severity: "HIGH",
    primaryHazard: "Ground Subsidence & Slope Destabilization",
    satelliteSensor: "Sentinel-2 / Landsat Compatible Optical RGB",
    lastAcquisition: "2026-05-18 05:42 UTC",
    summary: "Extensive sub-surface displacement observed along lower slopes. Severe canopy thinning (-42%) and fresh linear excavations compounding slope creep.",
    factors: {
      vegetationLoss: 42,
      landDisturbance: 8.9,
      slopeGradient: 38,
      rainfall24h: 148,
      temperatureAnomaly: 2.8,
      geologicalFaultProximity: "0.4 km (Vaikrita Thrust)",
      soilSaturation: 84
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
      vegProxyChange: "-38.5% (VARI Proxy)",
      soilMoistureChange: "+46.2%",
      slopeErosionVolume: "142,000 m³"
    },
    recommendedAction: "Suggested evacuation review for Wards 4, 6, and 7; pause heavy drilling on Helang bypass; reinforce toe support along Alaknanda confluence.",
    actionChecklist: [
      { id: "act-j1", title: "Deploy local survey & crack-monitoring team to Ward 5", priority: "HIGH (24h)", status: "PENDING" },
      { id: "act-j2", title: "Review temporary restriction of heavy vehicular transit", priority: "HIGH (24h)", status: "ACKNOWLEDGED" },
      { id: "act-j3", title: "Simulate automated tiltmeters on destabilized toe slopes", priority: "MEDIUM (7d)", status: "IN_PROGRESS" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 54, rainfall: 22, vegLoss: 14 },
      { month: "Jan 2026", risk: 58, rainfall: 35, vegLoss: 18 },
      { month: "Feb 2026", risk: 66, rainfall: 50, vegLoss: 24 },
      { month: "Mar 2026", risk: 72, rainfall: 82, vegLoss: 31 },
      { month: "Apr 2026", risk: 77, rainfall: 110, vegLoss: 37 },
      { month: "May 2026", risk: 82, rainfall: 148, vegLoss: 42 }
    ]
  },
  {
    id: "zone-chamoli",
    name: "Chamoli - Rishiganga Gash Basin",
    state: "Uttarakhand",
    district: "Chamoli",
    coordinates: [30.4124, 79.3326],
    elevation: "1,550 m",
    riskScore: 72,
    severity: "HIGH",
    primaryHazard: "Massive Rockslide & Silt Choking",
    satelliteSensor: "Sentinel-2 / Landsat Compatible Optical RGB",
    lastAcquisition: "2026-05-17 06:10 UTC",
    summary: "Active scar progression detected on northern amphitheater wall. Hydro-power intake tunnels showing sediment overload alerts.",
    factors: {
      vegetationLoss: 36,
      landDisturbance: 7.8,
      slopeGradient: 40,
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
      baselineDate: "Oct 2024 (Baseline)",
      telemetryDate: "May 2026 (Simulated)",
      vegProxyChange: "-34.0% (VARI Proxy)",
      soilMoistureChange: "+32.1%",
      slopeErosionVolume: "185,000 m³"
    },
    recommendedAction: "Pre-position excavators at bridge bottlenecks; review night transit advisories along Joshimath-Malari road.",
    actionChecklist: [
      { id: "act-c1", title: "Establish river gauge checkpoint at Tapovan", priority: "HIGH (24h)", status: "ACKNOWLEDGED" },
      { id: "act-c2", title: "Volumetric scan of northern scarp face", priority: "MEDIUM (7d)", status: "IN_PROGRESS" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 48, rainfall: 18, vegLoss: 12 },
      { month: "Jan 2026", risk: 52, rainfall: 25, vegLoss: 15 },
      { month: "Feb 2026", risk: 59, rainfall: 42, vegLoss: 21 },
      { month: "Mar 2026", risk: 64, rainfall: 60, vegLoss: 26 },
      { month: "Apr 2026", risk: 68, rainfall: 78, vegLoss: 30 },
      { month: "May 2026", risk: 72, rainfall: 96, vegLoss: 36 }
    ]
  },
  {
    id: "zone-dharamshala",
    name: "Dharamshala - McLeod Ganj Ridge Sector",
    state: "Himachal Pradesh",
    district: "Kangra",
    coordinates: [32.2190, 76.3234],
    elevation: "1,750 m",
    riskScore: 58,
    severity: "MEDIUM",
    primaryHazard: "Slope Creep & Multi-Storey Overburden Collapse",
    satelliteSensor: "Sentinel-2 / Landsat Compatible Optical RGB",
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
      baselineDate: "Oct 2024 (Baseline)",
      telemetryDate: "May 2026 (Simulated)",
      vegProxyChange: "-26.4% (VARI Proxy)",
      soilMoistureChange: "+38.4%",
      slopeErosionVolume: "95,000 m³"
    },
    recommendedAction: "Advise strict controls on hill-slope excavations exceeding 4 meters without retaining walls; clear drainage gullies before monsoon surge.",
    actionChecklist: [
      { id: "act-d1", title: "Inspection of high-slope structures in Bhagsu zone", priority: "MEDIUM (7d)", status: "ACKNOWLEDGED" },
      { id: "act-d2", title: "Construct stormwater culverts along Jogibara Road", priority: "MEDIUM (14d)", status: "PLANNED" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 38, rainfall: 28, vegLoss: 10 },
      { month: "Jan 2026", risk: 42, rainfall: 32, vegLoss: 12 },
      { month: "Feb 2026", risk: 48, rainfall: 55, vegLoss: 16 },
      { month: "Mar 2026", risk: 52, rainfall: 72, vegLoss: 20 },
      { month: "Apr 2026", risk: 55, rainfall: 90, vegLoss: 24 },
      { month: "May 2026", risk: 58, rainfall: 112, vegLoss: 28 }
    ]
  },
  {
    id: "zone-spiti",
    name: "Spiti Valley High-Altitude Permafrost Zone",
    state: "Himachal Pradesh",
    district: "Lahaul and Spiti",
    coordinates: [32.2461, 78.0349],
    elevation: "3,800 m",
    riskScore: 28,
    severity: "LOW",
    primaryHazard: "Permafrost Degradation & Soil Fragility",
    satelliteSensor: "Sentinel-2 / Landsat Compatible Optical RGB",
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
      baselineDate: "Oct 2024 (Baseline)",
      telemetryDate: "May 2026 (Simulated)",
      vegProxyChange: "-12.8% (VARI Proxy)",
      soilMoistureChange: "-14.2%",
      slopeErosionVolume: "32,000 m³"
    },
    recommendedAction: "Designate protected alpine conservation corridors; ban non-designated off-road vehicular excursions.",
    actionChecklist: [
      { id: "act-s1", title: "Demarcate eco-sensitive pasture buffer rings around Kaza & Tabo", priority: "LOW (Routine)", status: "ACKNOWLEDGED" }
    ],
    historicalTrend: [
      { month: "Dec 2025", risk: 20, rainfall: 5, vegLoss: 6 },
      { month: "Jan 2026", risk: 22, rainfall: 8, vegLoss: 7 },
      { month: "Feb 2026", risk: 24, rainfall: 10, vegLoss: 9 },
      { month: "Mar 2026", risk: 25, rainfall: 12, vegLoss: 11 },
      { month: "Apr 2026", risk: 27, rainfall: 15, vegLoss: 13 },
      { month: "May 2026", risk: 28, rainfall: 18, vegLoss: 15 }
    ]
  }
];

export const SYSTEM_METRICS = {
  totalMonitoredZones: HIMALAYAN_ZONES.length,
  detectedLandChangesSqKm: "24.8",
  criticalZonesCount: HIMALAYAN_ZONES.filter(z => z.severity === 'HIGH').length,
  averageRegionalRiskScore: Math.round(HIMALAYAN_ZONES.reduce((acc, z) => acc + z.riskScore, 0) / HIMALAYAN_ZONES.length),
  lastSatellitePass: "2026-05-19 04:15 UTC"
};

export const CALCULATION_WEIGHTS = {
  vegetationLoss: 0.45,
  landChange: 0.35,
  disturbance: 0.20
};

