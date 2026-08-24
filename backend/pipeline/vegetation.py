import numpy as np
import cv2

def compute_vari_proxy(rgb_img: np.ndarray) -> np.ndarray:
    """
    Computes the Visible Atmospherically Resistant Index (VARI) RGB proxy.
    Formula: (Green - Red) / (Green + Red - Blue + epsilon)
    NOTE: This is an RGB vegetation proxy, NOT true satellite NDVI.
    """
    # Convert to float32 normalized 0..1
    img_float = rgb_img.astype(np.float32) / 255.0
    r = img_float[:, :, 0]
    g = img_float[:, :, 1]
    b = img_float[:, :, 2]

    eps = 1e-5
    numerator = g - r
    denominator = g + r - b + eps

    # Avoid division issues
    denominator[denominator == 0] = eps
    vari = numerator / denominator

    # Clip to standard [-1.0, 1.0] range
    vari = np.clip(vari, -1.0, 1.0)
    return vari

def analyze_vegetation_change(before_rgb: np.ndarray, after_rgb: np.ndarray) -> dict:
    """
    Analyzes vegetation change between Before and After images using the VARI RGB proxy.
    Returns quantitative metrics and overlay image arrays.
    """
    h, w = before_rgb.shape[:2]
    total_pixels = h * w

    vari_before = compute_vari_proxy(before_rgb)
    vari_after = compute_vari_proxy(after_rgb)

    # Vegetated baseline mask in Before image (VARI threshold > 0.04)
    veg_mask_before = vari_before > 0.04
    initial_veg_pixels = int(np.sum(veg_mask_before))

    # Delta VARI: negative indicates vegetation loss
    delta_vari = vari_after - vari_before

    # Severe vegetation loss mask (initially vegetated AND loss > 0.12)
    loss_mask = veg_mask_before & (delta_vari < -0.12)
    moderate_loss_mask = veg_mask_before & (delta_vari >= -0.12) & (delta_vari < -0.05)
    regrowth_mask = (delta_vari > 0.10)

    loss_pixels = int(np.sum(loss_mask))
    moderate_loss_pixels = int(np.sum(moderate_loss_mask))
    regrowth_pixels = int(np.sum(regrowth_mask))

    # Calculate percentage loss relative to baseline vegetated area (or total area if low vegetation)
    if initial_veg_pixels > (0.05 * total_pixels):
        veg_loss_percent = round((loss_pixels / initial_veg_pixels) * 100.0, 1)
        moderate_loss_percent = round((moderate_loss_pixels / initial_veg_pixels) * 100.0, 1)
    else:
        # For sparse alpine areas
        veg_loss_percent = round((loss_pixels / total_pixels) * 100.0 * 2.5, 1)
        moderate_loss_percent = round((moderate_loss_pixels / total_pixels) * 100.0 * 2.5, 1)

    veg_loss_percent = float(np.clip(veg_loss_percent, 0.0, 100.0))

    # Scaled 0-100 vegetation loss score for risk engine
    veg_loss_score = round(float(np.clip(veg_loss_percent * 1.8 + (moderate_loss_percent * 0.4), 0.0, 100.0)), 1)

    # Build colorized overlay for visualization
    # Base: After image
    overlay_rgb = after_rgb.copy()

    # Red/Crimson highlight on severe loss areas
    loss_color = np.array([244, 63, 94], dtype=np.uint8) # Rose-500
    mod_color = np.array([251, 146, 60], dtype=np.uint8) # Amber/Orange-400

    # Alpha blend severe loss
    alpha_severe = 0.55
    overlay_rgb[loss_mask] = (overlay_rgb[loss_mask] * (1 - alpha_severe) + loss_color * alpha_severe).astype(np.uint8)

    # Alpha blend moderate loss
    alpha_mod = 0.40
    overlay_rgb[moderate_loss_mask] = (overlay_rgb[moderate_loss_mask] * (1 - alpha_mod) + mod_color * alpha_mod).astype(np.uint8)

    # Standalone heatmap mask on dark background
    heatmap_standalone = np.zeros((h, w, 3), dtype=np.uint8)
    heatmap_standalone[loss_mask] = loss_color
    heatmap_standalone[moderate_loss_mask] = mod_color

    return {
        "veg_loss_score": veg_loss_score,
        "veg_loss_percent": veg_loss_percent,
        "moderate_loss_percent": moderate_loss_percent,
        "initial_canopy_coverage_pct": round((initial_veg_pixels / total_pixels) * 100.0, 1),
        "regrowth_percent": round((regrowth_pixels / total_pixels) * 100.0, 1),
        "overlay_rgb": overlay_rgb,
        "heatmap_standalone_rgb": heatmap_standalone,
        "is_rgb_proxy": True,
        "index_name": "Visible Atmospherically Resistant Index (VARI)",
        "method_disclaimer": "RGB Vegetation Proxy (VARI) active. Standard 3-band optical imagery does not capture the Near-Infrared (NIR) spectrum. Production roadmap will ingest Sentinel-2 L2A Band 4 (Red) + Band 8 (NIR) for true 10m NDVI."
    }
