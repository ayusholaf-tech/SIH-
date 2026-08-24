# HIM-SAFE: Himalayan Environmental Impact Monitoring Command Center

![Status](https://img.shields.io/badge/Status-Operational%20Prototype-06b6d4)
![Theme](https://img.shields.io/badge/Design-Tactical%20Environmental%20Command-10b981)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Tailwind%20%7C%20Leaflet%20%7C%20Recharts-38bdf8)

**HIM-SAFE** is a geospatial environmental monitoring and early-warning command center prototype engineered for government authorities (NDMA, MoEFCC, State Disaster Management Authorities of Uttarakhand, Himachal Pradesh, Sikkim, and Ladakh) to track ecological degradation, deforestation, land disturbances, road cutting excavations, and landslide/GLOF hazards across the Indian Himalayan Region (IHR).

---

## Key Modules & Capabilities

### 1. Command Dashboard
- **Spatial Telemetry Overview**: Real-time KPI summaries covering Monitored Zones, Total Detected Land Disturbance (sq km), High-Risk Zones, and Average Regional Vulnerability Index.
- **Interactive Himalayan Map**: Leaflet & OpenStreetMap powered GIS grid with risk-level colored circular zones, threat markers, and interactive telemetry popups across Himalayan hotspots (Joshimath, Kedarnath, Chamoli, Dharamshala, Spiti, Gangotri, Teesta, Leh).
- **Regional Risk Distribution Spectrum**: Ranked bar charts visualizing comparative risk metrics.
- **Real-Time Incident Stream**: Ticker feed displaying active alerts triggered by satellite anomalies.

### 2. Satellite Monitoring & Change Detection
- **Himalayan Location Selector**: Seamless switching between vulnerable Himalayan catchment sectors.
- **Interactive Before vs After Satellite Comparator**: Split-screen draggable slider comparing pre-disturbance baseline imagery against current satellite passes.
- **Multispectral Dynamic Overlays**:
  - *Vegetation Loss (NDVI)*: Infrared canopy thinning heat signatures.
  - *Land Disturbance Mask*: Soil exposure, rockfall scars, and active tension fissures.
  - *New Road / Trail Detection*: Deep linear infrastructure slope cut extraction vectors.
- **Biophysical Telemetry**: Quantitative change indices including displacement velocity (mm/day), erosion volume (m³), and slope gradients.

### 3. Multi-Factor Risk Analysis & Live Simulator
- **0–100 Composite Vulnerability Gauge**: Weighted multi-criteria evaluation (MCE) reflecting compound ecological risks.
- **5-Factor Radar Matrix**: Multi-dimensional breakdown of Vegetation Loss (25%), Land Disturbance Index (25%), Slope Gradient (20%), 24h Precipitation (15%), and Thermal Anomalies (15%).
- **Interactive "What-If" Hazard Simulator (Sandbox)**: Allows authorities to dynamically test extreme scenarios (e.g. cloudburst rainfall surges, excessive hill-cutting) with live recalculated risk scores and automated emergency mitigation advisories.
- **6-Month Historical Climatic Trendline**: Correlation between seasonal monsoon precipitation surges and escalating slope destabilization.

### 4. Incident Alerts & Authority Response
- Filterable registry of active environmental alerts classified by severity (CRITICAL, HIGH, MODERATE).
- Searchable by sector, hazard, or coordinates.
- **Incident Response Console**: Interactive acknowledgment workflows and simulated SDRF / NDRF taskforce dispatch actions.

### 5. Official Intelligence Dossier Generator
- Synthesizes comprehensive government-grade environmental impact reports.
- Includes official letterheads, classified document serial numbers, quantitative indicator tables, and prioritized administrative action roadmaps.
- Built-in **Print / Save as PDF** functionality.

---

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom command center dark HUD aesthetic, glassmorphism, glowing telemetry accents)
- **Mapping & GIS**: Leaflet + React-Leaflet + OpenStreetMap & CartoDB Dark Matter
- **Charts & Data Visualization**: Recharts (Radar, Area, Bar charts)
- **Icons**: Lucide React

---

## Local Development Setup

```bash
# Clone the repository
git clone https://github.com/ayusholaf-tech/SIH-.git
cd SIH-

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

*Note: All satellite feeds, IMD precipitation data, and telemetry logs in this version are realistic fictional prototype demonstration datasets created for SIH 2026 evaluation.*
