import cv2
import numpy as np

def align_images_orb(before_rgb: np.ndarray, after_rgb: np.ndarray) -> tuple[np.ndarray, dict]:
    """
    Aligns after_rgb to before_rgb using ORB feature detection and RANSAC Homography.
    Falls back gracefully to after_rgb if alignment cannot be reliably determined.
    """
    h, w = before_rgb.shape[:2]
    gray_before = cv2.cvtColor(before_rgb, cv2.COLOR_RGB2GRAY)
    gray_after = cv2.cvtColor(after_rgb, cv2.COLOR_RGB2GRAY)

    # Initialize ORB detector
    orb = cv2.ORB_create(nfeatures=1200, scaleFactor=1.2, nlevels=8)

    # Find keypoints and descriptors
    kp1, des1 = orb.detectAndCompute(gray_before, None)
    kp2, des2 = orb.detectAndCompute(gray_after, None)

    if des1 is None or des2 is None or len(kp1) < 8 or len(kp2) < 8:
        return after_rgb, {
            "success": False,
            "method": "Direct Resize (Keypoints Insufficient)",
            "keypoints_detected": min(len(kp1) if kp1 else 0, len(kp2) if kp2 else 0),
            "matches_used": 0,
            "inlier_ratio": 0.0
        }

    # Match features using Hamming distance
    matcher = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    matches = matcher.match(des2, des1)

    # Sort matches by score/distance
    matches = sorted(matches, key=lambda x: x.distance)

    # Take top 30% or at least 15 matches
    good_matches_count = max(15, int(len(matches) * 0.3))
    good_matches = matches[:good_matches_count]

    if len(good_matches) < 8:
        return after_rgb, {
            "success": False,
            "method": "Direct Resize (Too Few Matches)",
            "keypoints_detected": len(kp2),
            "matches_used": len(good_matches),
            "inlier_ratio": 0.0
        }

    # Extract locations of good matches
    src_pts = np.float32([kp2[m.queryIdx].pt for m in good_matches]).reshape(-1, 1, 2)
    dst_pts = np.float32([kp1[m.trainIdx].pt for m in good_matches]).reshape(-1, 1, 2)

    try:
        # Find homography with RANSAC
        H, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)

        if H is None:
            return after_rgb, {
                "success": False,
                "method": "Direct Resize (RANSAC Homography Failed)",
                "keypoints_detected": len(kp2),
                "matches_used": len(good_matches),
                "inlier_ratio": 0.0
            }

        inliers = np.sum(mask) if mask is not None else 0
        inlier_ratio = float(inliers / len(good_matches)) if len(good_matches) > 0 else 0.0

        # Warp after_rgb to align with before_rgb
        aligned_after = cv2.warpPerspective(after_rgb, H, (w, h), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

        return aligned_after, {
            "success": True,
            "method": "ORB + RANSAC Homography Warp",
            "keypoints_detected": len(kp2),
            "matches_used": len(good_matches),
            "inliers": int(inliers),
            "inlier_ratio": round(inlier_ratio, 3)
        }

    except Exception as e:
        return after_rgb, {
            "success": False,
            "method": f"Direct Resize (Alignment Exception: {str(e)})",
            "keypoints_detected": len(kp2),
            "matches_used": len(good_matches),
            "inlier_ratio": 0.0
        }
