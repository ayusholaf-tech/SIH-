import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from data.sample_images import generate_synthetic_satellite_pair
from pipeline.utils import resize_to_shared_size, numpy_to_base64_png
from pipeline.alignment import align_images_orb
from pipeline.vegetation import analyze_vegetation_change
from pipeline.land_change import analyze_land_change, create_composite_change_overlay
from pipeline.risk_engine import compute_transparent_risk
from data.himalayan_zones import HIMALAYAN_ZONES_DATA

def test_full_pipeline():
    print("Testing HIM-SAFE Backend Pipeline...")

    # 1. Test sample generation
    for scenario in ["kedarnath", "badrinath", "joshimath"]:
        before_np, after_np = generate_synthetic_satellite_pair(scenario)
        assert before_np.shape == (600, 800, 3)
        assert after_np.shape == (600, 800, 3)
        print(f"[OK] Scenario '{scenario}' generated successfully ({before_np.shape})")

    # 2. Test shared resizing
    before_resized, after_resized = resize_to_shared_size(before_np, after_np, (800, 600))
    assert before_resized.shape == (600, 800, 3)
    print("[OK] Shared resizing verified")

    # 3. Test Alignment
    aligned_after, align_meta = align_images_orb(before_resized, after_resized)
    assert aligned_after.shape == (600, 800, 3)
    print(f"[OK] Alignment executed: {align_meta['method']}")

    # 4. Test RGB Vegetation Proxy (VARI)
    veg_res = analyze_vegetation_change(before_resized, aligned_after)
    assert 0 <= veg_res["veg_loss_score"] <= 100
    assert veg_res["is_rgb_proxy"] is True
    print(f"[OK] RGB Vegetation Proxy (VARI) computed: Veg Loss Score = {veg_res['veg_loss_score']} ({veg_res['veg_loss_percent']}%)")

    # 5. Test Land Change & Disturbance
    land_res = analyze_land_change(before_resized, aligned_after)
    assert 0 <= land_res["land_change_score"] <= 100
    assert 0 <= land_res["disturbance_score"] <= 100
    print(f"[OK] Land Change computed: Score = {land_res['land_change_score']} (Disturbance = {land_res['disturbance_score']}, Scars = {land_res['active_scar_count']})")

    # 6. Test Composite Overlay
    composite = create_composite_change_overlay(before_resized, aligned_after, veg_res, land_res)
    assert composite.shape == (600, 800, 3)
    b64_comp = numpy_to_base64_png(composite)
    assert b64_comp.startswith("data:image/png;base64,")
    print(f"[OK] Composite Overlay generated & encoded to Base64 (Length: {len(b64_comp)} chars)")

    # 7. Test Transparent Risk Engine with 3-Level Classification
    risk = compute_transparent_risk(
        veg_loss_score=veg_res["veg_loss_score"],
        land_change_score=land_res["land_change_score"],
        disturbance_score=land_res["disturbance_score"]
    )
    assert 0 <= risk["final_risk_score"] <= 100
    assert risk["risk_level"] in ["LOW", "MEDIUM", "HIGH"]
    assert risk["weights"]["vegetation_loss"] == 0.45
    assert risk["weights"]["land_change"] == 0.35
    assert risk["weights"]["disturbance"] == 0.20
    assert len(risk["field_recommendations"]) > 0
    print(f"[OK] Transparent Risk Score: {risk['final_risk_score']}/100 [{risk['risk_level']}]")
    print(f"  Formula: {risk['formula']}")
    print(f"  Recommendations generated: {len(risk['field_recommendations'])}")

    print("\nALL BACKEND PIPELINE TESTS PASSED!")

if __name__ == "__main__":
    test_full_pipeline()
