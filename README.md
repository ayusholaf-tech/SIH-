# HIM-SAFE: Himalayan Environmental Impact Monitoring
### Smart India Hackathon (SIH 2026) Prototype — Local Working MVP

**HIM-SAFE** is an explainable, computer-vision powered environmental risk monitoring system designed for fragile Himalayan slope corridors (*Kedarnath, Badrinath, Joshimath, Chamoli, Dharamshala, Spiti*). It performs temporal satellite image alignment, RGB vegetation proxy analysis, physical soil change detection, transparent formulaic 0–100 risk scoring with a 3-tier classification, interactive Leaflet GIS mapping, and automated field inspection action plan generation.

---

## 🚀 Key Features

1. **Dual Satellite Image Ingestion & OpenCV Alignment**:
   - Accepts temporal Before & After satellite captures.
   - Robust spatial registration using **ORB Keypoint Feature Matching + RANSAC Homography warping**.
2. **RGB Visible Vegetation Index (VARI Proxy)**:
   - Evaluates canopy loss and slope clearing using the formula:
     $$\text{VARI} = \frac{\text{Green} - \text{Red}}{\text{Green} + \text{Red} - \text{Blue}}$$
   - *SIH Transparency Note*: Explicitly labeled in the UI as an **RGB proxy**, not true satellite NDVI. True NDVI requires Sentinel-2 NIR band 8, targeted for the production roadmap.
3. **Land Change & Disturbance Segmentation**:
   - Differencing + bilateral filtering + morphological opening/closing to isolate real slope scarp failures, road-widening excavation scars, and river siltation.
4. **Transparent Risk Scoring Engine (0–100)**:
   - 100% deterministic and auditable math:
     $$\text{Risk Score} = (0.45 \times \text{Veg Loss}) + (0.35 \times \text{Land Change}) + (0.20 \times \text{Disturbance})$$
5. **Standardized 3-Tier Severity Classification**:
   - 🟢 **LOW RISK (0 – 39)**: Terrain conditions within baseline tolerance.
   - 🟡 **MEDIUM RISK (40 – 69)**: Moderate slope disturbance; scheduled inspection recommended.
   - 🔴 **HIGH RISK (70 – 100)**: Severe slope failure hazard; urgent field intervention required.
6. **Interactive Leaflet GIS Mapping**:
   - Real Himalayan sector overlays, geofence vulnerability buffers, and OSM / Dark HUD tile modes.
7. **Actionable Field Inspection Checklist**:
   - Automated priority recommendations dispatched to responsible authorities (SDMA, BRO, Forest Dept).

---

## 🛠 Technology Stack

- **Frontend**: React + Vite, Tailwind CSS, Lucide Icons, Leaflet / React-Leaflet, Recharts.
- **Backend**: Python 3.12+, FastAPI, Uvicorn.
- **Image Processing & CV**: OpenCV (`opencv-python-headless`), NumPy, Pillow.
- **GIS**: Leaflet + OpenStreetMap / CARTO Basemaps.

---

## 💻 How to Run on Windows

### Option A: 1-Click Launch (Recommended)
Double-click `run_all.bat` from the project root. This opens both the FastAPI backend and the Vite frontend simultaneously in separate command windows.

### Option B: Manual Terminal Startup

**1. Start the Backend:**
```powershell
cd backend
uv venv .venv
uv pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
- API Base URL: `http://127.0.0.1:8000`
- Interactive Swagger API Docs: `http://127.0.0.1:8000/docs`

**2. Start the Frontend:**
```powershell
cd "HIM safe1"
npm install
npm run dev
```
- Frontend Web App: `http://localhost:5173`

---

## 📡 API Endpoints

- `GET /`: API overview and calculation weights.
- `GET /api/health`: Health check and OpenCV version.
- `GET /api/zones`: List of Himalayan sectors (*Kedarnath, Badrinath, Joshimath, Chamoli, Dharamshala, Spiti*).
- `GET /api/sample-scenarios`: 1-click test scenarios for instant live demo.
- `GET /api/sample-images/{scenario}`: Pre-bundled Before/After satellite base64 pairs.
- `POST /api/analyze`: Multipart upload receiving `before_image` and `after_image`. Returns base64 overlays, alignment metrics, explainable formula breakdown, and field recommendations.
