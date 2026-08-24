import cv2
import numpy as np

def analyze_land_change(before_rgb: np.ndarray, after_rgb: np.ndarray) -> dict:
    """
    Detects physical land change, soil exposure, landslide scars, and surface disturbance.
    Returns metrics, scar contours, and overlay images.
    """
    h, w = before_rgb.shape[:2]
    total_pixels = h * w

    # Grayscale conversion
    gray_before = cv2.cvtColor(before_rgb, cv2.COLOR_RGB2GRAY)
    gray_after = cv2.cvtColor(after_rgb, cv2.COLOR_RGB2GRAY)

    # Blur to reduce high frequency sensor noise
    blur_before = cv2.GaussianBlur(gray_before, (5, 5), 0)
    blur_after = cv2.GaussianBlur(gray_after, (5, 5), 0)

    # Absolute difference
    diff = cv2.absdiff(blur_before, blur_after)

    # Color difference in LAB space to detect soil exposure (brown/ochre changes)
    lab_before = cv2.cvtColor(before_rgb, cv2.COLOR_RGB2LAB)
    lab_after = cv2.cvtColor(after_rgb, cv2.COLOR_RGB2LAB)
    lab_diff = np.sqrt(np.sum((lab_before.astype(np.float32) - lab_after.astype(np.float32)) ** 2, axis=2))
    norm_lab_diff = np.clip((lab_diff / np.max(lab_diff) if np.max(lab_diff) > 0 else lab_diff) * 255, 0, 255).astype(np.uint8)

    # Combined visual diff
    combined_diff = cv2.addWeighted(diff, 0.5, norm_lab_diff, 0.5, 0)

    # Otsu thresholding + fixed threshold
    _, thresh1 = cv2.threshold(combined_diff, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    _, thresh2 = cv2.threshold(combined_diff, 35, 255, cv2.THRESH_BINARY)
    raw_mask = cv2.bitwise_or(thresh1, thresh2)

    # Morphological cleaning
    kernel_open = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    kernel_close = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))
    cleaned_mask = cv2.morphologyEx(raw_mask, cv2.MORPH_OPEN, kernel_open)
    cleaned_mask = cv2.morphologyEx(cleaned_mask, cv2.MORPH_CLOSE, kernel_close)

    # Find contours for discrete disturbance scars
    contours, _ = cv2.findContours(cleaned_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    significant_scars = []
    total_disturbed_pixels = 0

    # Overlay rendering
    overlay_rgb = after_rgb.copy()
    mask_bool = cleaned_mask > 0

    # Amber color for soil disturbance
    amber_color = np.array([245, 158, 11], dtype=np.uint8) # Amber-500
    alpha = 0.5
    overlay_rgb[mask_bool] = (overlay_rgb[mask_bool] * (1 - alpha) + amber_color * alpha).astype(np.uint8)

    # Draw contour outlines
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area > 100:  # ignore tiny specks
            total_disturbed_pixels += int(area)
            x, y, cw, ch = cv2.boundingRect(cnt)
            significant_scars.append({
                "x": int(x),
                "y": int(y),
                "width": int(cw),
                "height": int(ch),
                "area_pixels": int(area),
                "perimeter": round(float(cv2.arcLength(cnt, True)), 1)
            })
            # Draw contour border on overlay
            cv2.drawContours(overlay_rgb, [cnt], -1, (251, 191, 36), 2) # Yellow-Amber outline

    # Calculate percentages
    land_change_percent = round((total_disturbed_pixels / total_pixels) * 100.0, 1)
    land_change_percent = float(np.clip(land_change_percent, 0.0, 100.0))

    # Calculate land change score (0-100)
    land_change_score = round(float(np.clip(land_change_percent * 2.2, 0.0, 100.0)), 1)

    # Calculate Disturbance Intensity Score (0-100) based on scar fragmentation, largest scar ratio, and edge density
    largest_scar_area = max([s["area_pixels"] for s in significant_scars], default=0)
    largest_scar_ratio = (largest_scar_area / total_pixels) if total_pixels > 0 else 0
    scar_count = len(significant_scars)

    # Edge analysis for linear cuts (e.g. road excavations)
    edges = cv2.Canny(blur_after, 50, 150)
    edge_in_mask = cv2.bitwise_and(edges, edges, mask=cleaned_mask)
    edge_density = float(np.sum(edge_in_mask > 0) / (total_disturbed_pixels + 1))

    disturbance_score = round(float(np.clip(
        (land_change_score * 0.45) +
        (min(scar_count * 3.5, 30.0)) +
        (largest_scar_ratio * 120.0) +
        (edge_density * 40.0),
        0.0,
        100.0
    )), 1)

    return {
        "land_change_score": land_change_score,
        "land_change_percent": land_change_percent,
        "disturbance_score": disturbance_score,
        "active_scar_count": scar_count,
        "total_disturbed_pixels": total_disturbed_pixels,
        "significant_scars": significant_scars[:15], # top 15
        "overlay_rgb": overlay_rgb,
        "mask_binary": cleaned_mask
    }

def create_composite_change_overlay(before_rgb: np.ndarray, after_rgb: np.ndarray, veg_result: dict, land_result: dict) -> np.ndarray:
    """
    Creates a rich composite change overlay showing both vegetation loss (crimson)
    and soil disturbance / scar cuts (amber) blended onto the after image.
    """
    composite = after_rgb.copy().astype(np.float32)

    # Crimson for vegetation loss
    veg_overlay = veg_result["heatmap_standalone_rgb"]
    veg_mask = np.any(veg_overlay > 0, axis=2)

    # Amber for land change
    land_mask = land_result["mask_binary"] > 0

    # Overlap pixels (both veg loss and land excavation) -> Highlight bright Magenta
    overlap = veg_mask & land_mask
    veg_only = veg_mask & (~overlap)
    land_only = land_mask & (~overlap)

    composite[veg_only] = composite[veg_only] * 0.45 + np.array([244, 63, 94], dtype=np.float32) * 0.55
    composite[land_only] = composite[land_only] * 0.50 + np.array([245, 158, 11], dtype=np.float32) * 0.50
    composite[overlap] = composite[overlap] * 0.35 + np.array([225, 29, 72], dtype=np.float32) * 0.65

    return np.clip(composite, 0, 255).astype(np.uint8)
