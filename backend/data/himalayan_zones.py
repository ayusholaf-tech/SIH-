HIMALAYAN_ZONES_DATA = [
    {
        "id": "zone-kedarnath",
        "name": "Kedarnath Mandakini Upper Catchment",
        "state": "Uttarakhand",
        "district": "Rudraprayag",
        "coordinates": [30.7346, 79.0669],
        "elevation": "3,583 m",
        "riskScore": 88,
        "severity": "HIGH",
        "primaryHazard": "GLOF & Debris Flow Mobility",
        "slopeGradient": 46,
        "geologicalFault": "1.2 km (Main Central Thrust)",
        "summary": "Steep moraine catchment with high meltwater discharge, sediment loading, and active gully erosion above Gaurikund."
    },
    {
        "id": "zone-badrinath",
        "name": "Badrinath - Alaknanda Highway Corridor",
        "state": "Uttarakhand",
        "district": "Chamoli",
        "coordinates": [30.7433, 79.4938],
        "elevation": "3,133 m",
        "riskScore": 76,
        "severity": "HIGH",
        "primaryHazard": "Slope Undercutting & Rockfall Creep",
        "slopeGradient": 42,
        "geologicalFault": "0.9 km (Vaikrita Thrust)",
        "summary": "Deep gorge terrain along NH-07 with prominent linear slope excavation cuts and toe erosion by the Alaknanda river."
    },
    {
        "id": "zone-joshimath",
        "name": "Joshimath Urban-Slope Subsidence Corridor",
        "state": "Uttarakhand",
        "district": "Chamoli",
        "coordinates": [30.5562, 79.5637],
        "elevation": "1,875 m",
        "riskScore": 82,
        "severity": "HIGH",
        "primaryHazard": "Ground Subsidence & Fissure Widening",
        "slopeGradient": 38,
        "geologicalFault": "0.4 km (Vaikrita Thrust)",
        "summary": "Historical landslide debris cone experiencing toe destabilization, building shear cracks, and canopy clearing."
    },
    {
        "id": "zone-chamoli",
        "name": "Chamoli - Rishiganga Gash Basin",
        "state": "Uttarakhand",
        "district": "Chamoli",
        "coordinates": [30.4124, 79.3326],
        "elevation": "1,550 m",
        "riskScore": 72,
        "severity": "HIGH",
        "primaryHazard": "Massive Rockslide & Silt Choking",
        "slopeGradient": 40,
        "geologicalFault": "0.8 km",
        "summary": "Active amphitheater rock scar progression and silt accumulation near hydel intake nodes."
    },
    {
        "id": "zone-dharamshala",
        "name": "Dharamshala - McLeod Ganj Ridge Sector",
        "state": "Himachal Pradesh",
        "district": "Kangra",
        "coordinates": [32.2190, 76.3234],
        "elevation": "1,750 m",
        "riskScore": 58,
        "severity": "MEDIUM",
        "primaryHazard": "Slope Creep & Drainage Inundation",
        "slopeGradient": 34,
        "geologicalFault": "1.6 km (Kangra Thrust)",
        "summary": "Moderate urban slope excavation and localized surface shear cracks along Khanyara and Bhagsu sectors."
    },
    {
        "id": "zone-spiti",
        "name": "Spiti Valley High-Altitude Permafrost Zone",
        "state": "Himachal Pradesh",
        "district": "Lahaul and Spiti",
        "coordinates": [32.2461, 78.0349],
        "elevation": "3,800 m",
        "riskScore": 28,
        "severity": "LOW",
        "primaryHazard": "Sparse Pasture Degradation",
        "slopeGradient": 22,
        "geologicalFault": "4.5 km",
        "summary": "Cold desert alpine terrain with low vegetation density and stable baseline topographic features."
    }
]

def get_zone_by_id(zone_id: str) -> dict | None:
    for z in HIMALAYAN_ZONES_DATA:
        if z["id"] == zone_id:
            return z
    return None
