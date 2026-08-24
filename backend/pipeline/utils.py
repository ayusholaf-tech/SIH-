import io
import base64
import numpy as np
from PIL import Image
import cv2

def decode_image_bytes(image_bytes: bytes) -> np.ndarray:
    """
    Decodes raw image bytes into an RGB NumPy array.
    Raises ValueError if the image is corrupt or format unsupported.
    """
    if not image_bytes or len(image_bytes) < 16:
        raise ValueError("Invalid image: File is empty or too small.")

    try:
        pil_img = Image.open(io.BytesIO(image_bytes))
        pil_img.verify()  # verify integrity
    except Exception as e:
        raise ValueError(f"Corrupt or unsupported image file: {str(e)}")

    # Reopen to read data after verify()
    pil_img = Image.open(io.BytesIO(image_bytes))
    if pil_img.mode != "RGB":
        pil_img = pil_img.convert("RGB")

    return np.array(pil_img)

def resize_to_shared_size(img1: np.ndarray, img2: np.ndarray, target_size=(800, 600)) -> tuple[np.ndarray, np.ndarray]:
    """
    Resizes both images to a shared target resolution (width, height).
    """
    w, h = target_size
    img1_resized = cv2.resize(img1, (w, h), interpolation=cv2.INTER_AREA)
    img2_resized = cv2.resize(img2, (w, h), interpolation=cv2.INTER_AREA)
    return img1_resized, img2_resized

def numpy_to_base64_png(image_np: np.ndarray, is_bgr: bool = False) -> str:
    """
    Encodes a NumPy image array (RGB, BGR, or RGBA) into a base64 PNG data URL.
    """
    if is_bgr:
        image_rgb = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB)
    else:
        image_rgb = image_np

    pil_img = Image.fromarray(image_rgb.astype(np.uint8))
    buffered = io.BytesIO()
    pil_img.save(buffered, format="PNG", optimize=True)
    img_b64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{img_b64}"
