import cv2
import numpy as np
import io
from PIL import Image

def generate_synthetic_satellite_pair(scenario: str = "kedarnath") -> tuple[np.ndarray, np.ndarray]:
    """
    Generates realistic synthetic satellite imagery pairs (800x600)
    for high-impact live demonstration during SIH presentations.
    """
    w, h = 800, 600

    # Base background: mountain slope texture
    # Before Image: Healthy green forest canopy & clean river stream
    before_img = np.zeros((h, w, 3), dtype=np.uint8)

    # Base slope green gradient
    for y in range(h):
        # Upper slopes: darker green-brown, Lower slopes: vibrant pine green
        factor = y / h
        r = int(35 + factor * 25)
        g = int(85 + factor * 50)
        b = int(45 + factor * 20)
        before_img[y, :] = [r, g, b]

    # Add natural texture noise
    noise = np.random.normal(0, 12, (h, w, 3)).astype(np.int16)
    before_img = np.clip(before_img.astype(np.int16) + noise, 0, 255).astype(np.uint8)

    # Add dense forest canopy clusters (High Green VARI)
    for _ in range(350):
        cx = np.random.randint(20, w - 20)
        cy = np.random.randint(20, h - 20)
        rad = np.random.randint(12, 35)
        tree_color = (np.random.randint(20, 45), np.random.randint(110, 165), np.random.randint(30, 65))
        cv2.circle(before_img, (cx, cy), rad, tree_color, -1)

    # Add pristine turquoise mountain river
    river_pts = np.array([
        [int(w * 0.15), 0],
        [int(w * 0.25), int(h * 0.3)],
        [int(w * 0.45), int(h * 0.6)],
        [int(w * 0.85), h]
    ], np.int32)
    cv2.polylines(before_img, [river_pts], False, (14, 165, 233), thickness=16, lineType=cv2.LINE_AA) # Sky-500
    cv2.polylines(before_img, [river_pts], False, (103, 232, 249), thickness=5, lineType=cv2.LINE_AA) # Cyan-300

    # Smooth the before image
    before_img = cv2.GaussianBlur(before_img, (3, 3), 0)

    # Create After Image from Before Image
    after_img = before_img.copy()

    # Apply scenario-specific disturbance
    if scenario == "kedarnath":
        # Glacial / Flash Debris surge: Silt chokes the river, strips vegetation on right flank
        # Turbid muddy river
        cv2.polylines(after_img, [river_pts], False, (146, 64, 14), thickness=26, lineType=cv2.LINE_AA) # Brown-amber mud
        
        # Massive debris fan & cleared vegetation (Brownish-gray sediment)
        debris_fan = np.array([
            [int(w * 0.35), int(h * 0.2)],
            [int(w * 0.75), int(h * 0.55)],
            [int(w * 0.65), int(h * 0.85)],
            [int(w * 0.30), int(h * 0.5)]
        ], np.int32)
        cv2.fillPoly(after_img, [debris_fan], (140, 115, 85)) # Silt sediment
        
        # Add rubble texture
        rubble_noise = np.random.normal(0, 18, (h, w, 3)).astype(np.int16)
        after_img = np.clip(after_img.astype(np.int16) + rubble_noise, 0, 255).astype(np.uint8)

    elif scenario == "badrinath":
        # Highway linear excavation cut + landslide scar
        road_pts = np.array([
            [0, int(h * 0.45)],
            [int(w * 0.35), int(h * 0.40)],
            [int(w * 0.65), int(h * 0.35)],
            [w, int(h * 0.38)]
        ], np.int32)
        cv2.polylines(after_img, [road_pts], False, (180, 150, 110), thickness=14, lineType=cv2.LINE_AA)
        
        # Landslide scarp above the road
        scarp = np.array([
            [int(w * 0.40), int(h * 0.15)],
            [int(w * 0.62), int(h * 0.20)],
            [int(w * 0.58), int(h * 0.38)],
            [int(w * 0.38), int(h * 0.36)]
        ], np.int32)
        cv2.fillPoly(after_img, [scarp], (165, 125, 80)) # Exposed bedrock

    else: # joshimath
        # Ground subsidence, cleared terraces & fissure scars
        subsidence_zone = np.array([
            [int(w * 0.25), int(h * 0.3)],
            [int(w * 0.70), int(h * 0.35)],
            [int(w * 0.60), int(h * 0.75)],
            [int(w * 0.20), int(h * 0.65)]
        ], np.int32)
        cv2.fillPoly(after_img, [subsidence_zone], (135, 110, 80))
        
        # Fissure shear lines
        cv2.line(after_img, (int(w * 0.3), int(h * 0.4)), (int(w * 0.45), int(h * 0.55)), (40, 30, 25), 3)
        cv2.line(after_img, (int(w * 0.48), int(h * 0.42)), (int(w * 0.62), int(h * 0.6)), (40, 30, 25), 3)

    return before_img, after_img

def get_sample_pair_bytes(scenario: str = "kedarnath") -> tuple[bytes, bytes]:
    before_np, after_np = generate_synthetic_satellite_pair(scenario)

    def to_bytes(img_arr: np.ndarray) -> bytes:
        pil_img = Image.fromarray(img_arr)
        buf = io.BytesIO()
        pil_img.save(buf, format="PNG")
        return buf.getvalue()

    return to_bytes(before_np), to_bytes(after_np)
