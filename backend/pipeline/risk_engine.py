def compute_transparent_risk(veg_loss_score: float, land_change_score: float, disturbance_score: float, zone_info: dict | None = None) -> dict:
    """
    Computes an explainable, transparent 0-100 environmental risk score
    using standardized weights:
      - Vegetation Loss: 45% (0.45)
      - Land Change: 35% (0.35)
      - Disturbance: 20% (0.20)

    Classification (3 tiers):
      - LOW: 0 - 39
      - MEDIUM: 40 - 69
      - HIGH: 70 - 100
    """
    # Clamp sub-scores 0..100
    veg_score = float(max(0.0, min(100.0, veg_loss_score)))
    land_score = float(max(0.0, min(100.0, land_change_score)))
    dist_score = float(max(0.0, min(100.0, disturbance_score)))

    # Component contributions
    veg_contribution = round(veg_score * 0.45, 2)
    land_contribution = round(land_score * 0.35, 2)
    dist_contribution = round(dist_score * 0.20, 2)

    # Base calculated risk score
    raw_risk = veg_contribution + land_contribution + dist_contribution
    final_risk_score = int(round(max(0, min(100, raw_risk))))

    # 3-Tier Classification
    if final_risk_score >= 70:
        risk_level = "HIGH"
        risk_color = "#f43f5e" # Rose / Red
        summary_statement = "Severe environmental disturbance detected. High probability of accelerated slope instability, canopy loss, or sediment loading."
    elif final_risk_score >= 40:
        risk_level = "MEDIUM"
        risk_color = "#f59e0b" # Amber
        summary_statement = "Moderate slope and canopy disturbance detected. Area warrants scheduled ground verification and drainage monitoring."
    else:
        risk_level = "LOW"
        risk_color = "#10b981" # Emerald / Green
        summary_statement = "Minimal change detected between satellite acquisitions. Terrain conditions appear stable within baseline thresholds."

    # Formula breakdown string
    formula_str = (
        f"Risk Score ({final_risk_score}) = "
        f"[Vegetation Loss ({veg_score:.1f}) × 0.45 = {veg_contribution:.1f}] + "
        f"[Land Change ({land_score:.1f}) × 0.35 = {land_contribution:.1f}] + "
        f"[Disturbance ({dist_score:.1f}) × 0.20 = {dist_contribution:.1f}]"
    )

    # Dynamic Field Inspection Recommendations
    recommendations = generate_field_recommendations(
        risk_level=risk_level,
        final_risk_score=final_risk_score,
        veg_score=veg_score,
        land_score=land_score,
        dist_score=dist_score,
        zone_info=zone_info
    )

    return {
        "final_risk_score": final_risk_score,
        "risk_level": risk_level,
        "risk_color": risk_color,
        "summary_statement": summary_statement,
        "formula": formula_str,
        "weights": {
            "vegetation_loss": 0.45,
            "land_change": 0.35,
            "disturbance": 0.20
        },
        "breakdown": {
            "vegetation_loss": {
                "raw_score": veg_score,
                "weight": 0.45,
                "weighted_contribution": veg_contribution,
                "percentage_share": round((veg_contribution / (raw_risk if raw_risk > 0 else 1)) * 100, 1)
            },
            "land_change": {
                "raw_score": land_score,
                "weight": 0.35,
                "weighted_contribution": land_contribution,
                "percentage_share": round((land_contribution / (raw_risk if raw_risk > 0 else 1)) * 100, 1)
            },
            "disturbance": {
                "raw_score": dist_score,
                "weight": 0.20,
                "weighted_contribution": dist_contribution,
                "percentage_share": round((dist_contribution / (raw_risk if raw_risk > 0 else 1)) * 100, 1)
            }
        },
        "field_recommendations": recommendations
    }

def generate_field_recommendations(risk_level: str, final_risk_score: int, veg_score: float, land_score: float, dist_score: float, zone_info: dict | None = None) -> list[dict]:
    """
    Generates actionable, prioritized field inspection recommendations based on calculated factors.
    """
    recs = []

    if risk_level == "HIGH":
        recs.append({
            "id": "rec-1",
            "priority": "HIGH (Within 24-48h)",
            "title": "Deploy Rapid Ground & Drone LiDAR Survey",
            "description": "Send field inspection unit to verify active scarp progression, displacement fissures, and toe slope destabilization.",
            "target_agency": "State Disaster Management Authority (SDMA) / District Administration",
            "status": "IMMEDIATE_ACTION"
        })
        if land_score > 50 or dist_score > 50:
            recs.append({
                "id": "rec-2",
                "priority": "HIGH (Immediate)",
                "title": "Slope Retaining & Drainage Diversion Protocol",
                "description": "Inspect hill cuts for undercutting; install geotextile netting and clear debris from natural stormwater drainage channels to prevent mudflow mobilization.",
                "target_agency": "Border Roads Organisation (BRO) / PWD",
                "status": "URGENT"
            })
        if veg_score > 50:
            recs.append({
                "id": "rec-3",
                "priority": "HIGH (7 Days)",
                "title": "Bio-Engineering Slope Stabilization & Vetiver Planting",
                "description": "Rapid vegetation clearing detected. Implement deep-root hydro-seeding and wire-mesh check dams to minimize surface runoff velocity.",
                "target_agency": "Forest Department / Soil Conservation Division",
                "status": "SCHEDULED"
            })

    elif risk_level == "MEDIUM":
        recs.append({
            "id": "rec-4",
            "priority": "MEDIUM (Within 7 Days)",
            "title": "Scheduled Verification of Disturbance Hotspots",
            "description": "Cross-reference newly exposed soil patches with local road expansion or construction permissions.",
            "target_agency": "District Environmental Inspection Cell",
            "status": "SCHEDULED"
        })
        recs.append({
            "id": "rec-5",
            "priority": "MEDIUM (14 Days)",
            "title": "Culvert & Silt Trap Maintenance",
            "description": "Ensure downhill runoff culverts are cleared of excavated silt prior to upcoming rainfall cycles.",
            "target_agency": "Local Municipal / Highway Maintenance",
            "status": "PLANNED"
        })

    else: # LOW
        recs.append({
            "id": "rec-6",
            "priority": "LOW (Routine)",
            "title": "Maintain Baseline Sentinel Satellite Surveillance",
            "description": "Area remains stable. Continue regular bi-weekly optical and radar satellite pass monitoring.",
            "target_agency": "HIM-SAFE Automated Telemetry Grid",
            "status": "MONITORING"
        })

    return recs
