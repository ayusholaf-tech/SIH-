from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import uvicorn
import time

from pipeline.utils import decode_image_bytes, resize_to_shared_size, numpy_to_base64_png
from pipeline.alignment import align_images_orb
from pipeline.vegetation import analyze_vegetation_change
from pipeline.land_change import analyze_land_change, create_composite_change_overlay
from pipeline.risk_engine import compute_transparent_risk
from data.himalayan_zones import HIMALAYAN_ZONES_DATA, get_zone_by_id
from data.sample_images import generate_synthetic_satellite_pair, get_sample_pair_bytes

app = FastAPI(
    title="HIM-SAFE API",
    description="Himalayan Environmental Impact Monitoring Prototype - SIH 2026",
    version="1.0.0"
)

# CORS middleware for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "service": "HIM-SAFE API",
        "version": "1.0.0",
        "purpose": "Himalayan Environmental Impact & Slope Disturbance Monitoring",
        "status": "OPERATIONAL",
        "endpoints": {
            "health": "/api/health",
            "zones": "/api/zones",
            "sample_scenarios": "/api/sample-scenarios",
            "analyze": "POST /api/analyze"
        },
        "vegetation_index": "Visible Atmospherically Resistant Index (VARI RGB Proxy - NOT true NDVI)",
        "risk_levels": ["LOW (0-39)", "MEDIUM (40-69)", "HIGH (70-100)"],
        "risk_weights": {
            "vegetation_loss": 0.45,
            "land_change": 0.35,
            "disturbance": 0.20
        }
    }

@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "opencv_version": "4.x",
        "engine": "HIM-SAFE Deterministic Risk Engine v1.0"
    }

@app.get("/api/zones")
async def list_zones():
    return {
        "count": len(HIMALAYAN_ZONES_DATA),
        "zones": HIMALAYAN_ZONES_DATA
    }

@app.get("/api/sample-scenarios")
async def sample_scenarios():
    """
    Returns pre-bundled paired scenarios for 1-click live testing.
    """
    scenarios = [
        {
            "id": "kedarnath",
            "name": "Kedarnath Mandakini Basin (Flash Flood / Debris)",
            "zone_id": "zone-kedarnath",
            "description": "Glacial debris mobilization and riverbed siltation above Gaurikund."
        },
        {
            "id": "badrinath",
            "name": "Badrinath Highway Cut (Slope Undercutting)",
            "zone_id": "zone-badrinath",
            "description": "Linear excavation cut along NH-07 with active bedrock scarp exposure."
        },
        {
            "id": "joshimath",
            "name": "Joshimath Subsidence Corridor (Slope Creep)",
            "zone_id": "zone-joshimath",
            "description": "Historical debris cone destabilization and structural shear fissure formation."
        }
    ]
    return {"scenarios": scenarios}

@app.get("/api/sample-images/{scenario}")
async def get_sample_images(scenario: str):
    """
    Returns base64 images for a pre-bundled demo scenario.
    """
    valid_scenarios = ["kedarnath", "badrinath", "joshimath"]
    if scenario not in valid_scenarios:
        scenario = "kedarnath"

    before_np, after_np = generate_synthetic_satellite_pair(scenario)
    return {
        "scenario": scenario,
        "before_image_b64": numpy_to_base64_png(before_np),
        "after_image_b64": numpy_to_base64_png(after_np)
    }

@app.post("/api/analyze")
async def analyze_images(
    before_image: UploadFile = File(...),
    after_image: UploadFile = File(...),
    zone_id: Optional[str] = Form(None)
):
    """
    Main Computer Vision & Environmental Impact Analysis Endpoint:
    1. Validates & decodes Before & After satellite images
    2. Resizes to shared resolution (800x600)
    3. Aligns images via OpenCV ORB + RANSAC Homography
    4. Computes RGB Vegetation Proxy (VARI) & canopy loss score
    5. Computes visual Land Change differencing & disturbance score
    6. Synthesizes transparent 0-100 Risk Score & LOW/MEDIUM/HIGH classification
    7. Generates actionable Field Inspection Recommendations
    8. Encodes Base64 overlays for interactive frontend rendering
    """
    start_time = time.time()

    # Step 1: Read & decode bytes
    try:
        before_bytes = await before_image.read()
        after_bytes = await after_image.read()

        before_raw = decode_image_bytes(before_bytes)
        after_raw = decode_image_bytes(after_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Image decoding failed: {str(e)}")

    # Step 2: Resize to shared size
    target_dim = (800, 600)
    before_rgb, after_rgb = resize_to_shared_size(before_raw, after_raw, target_dim)

    # Step 3: Align images using ORB feature matching + Homography
    aligned_after_rgb, alignment_meta = align_images_orb(before_rgb, after_rgb)

    # Step 4: Vegetation change analysis (RGB VARI Proxy)
    veg_analysis = analyze_vegetation_change(before_rgb, aligned_after_rgb)

    # Step 5: Land change & surface disturbance analysis
    land_analysis = analyze_land_change(before_rgb, aligned_after_rgb)

    # Step 6: Create Composite Change Overlay (Veg Loss Crimson + Land Change Amber)
    composite_overlay_rgb = create_composite_change_overlay(
        before_rgb,
        aligned_after_rgb,
        veg_analysis,
        land_analysis
    )

    # Step 7: Transparent Risk Calculation
    zone_info = get_zone_by_id(zone_id) if zone_id else None
    risk_result = compute_transparent_risk(
        veg_loss_score=veg_analysis["veg_loss_score"],
        land_change_score=land_analysis["land_change_score"],
        disturbance_score=land_analysis["disturbance_score"],
        zone_info=zone_info
    )

    processing_time_ms = int((time.time() - start_time) * 1000)

    # Step 8: Encode Base64 Overlays
    return {
        "success": True,
        "processing_time_ms": processing_time_ms,
        "zone": zone_info or {
            "id": "custom-zone",
            "name": "Custom Geographic Boundary",
            "state": "Himalayan Region",
            "coordinates": [30.5, 79.2]
        },
        "risk": risk_result,
        "metrics": {
            "vegetation_loss_percent": veg_analysis["veg_loss_percent"],
            "moderate_canopy_thinning_percent": veg_analysis["moderate_loss_percent"],
            "initial_canopy_coverage_pct": veg_analysis["initial_canopy_coverage_pct"],
            "land_change_percent": land_analysis["land_change_percent"],
            "active_scar_count": land_analysis["active_scar_count"],
            "disturbance_score": land_analysis["disturbance_score"]
        },
        "alignment": alignment_meta,
        "proxy_disclaimer": {
            "is_rgb_proxy": True,
            "index_name": "Visible Atmospherically Resistant Index (VARI)",
            "formula": "VARI = (Green - Red) / (Green + Red - Blue)",
            "sih_note": "MVP uses RGB proxy. Standard 3-band visible imagery lacks Near-Infrared (NIR) spectrum. Production roadmap transitions to Sentinel-2 L2A Red+NIR bands for true 10m NDVI."
        },
        "images": {
            "before_image": numpy_to_base64_png(before_rgb),
            "after_image": numpy_to_base64_png(after_rgb),
            "aligned_after_image": numpy_to_base64_png(aligned_after_rgb),
            "change_overlay": numpy_to_base64_png(composite_overlay_rgb),
            "veg_loss_overlay": numpy_to_base64_png(veg_analysis["overlay_rgb"]),
            "land_change_overlay": numpy_to_base64_png(land_analysis["overlay_rgb"])
        }
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
