import urllib.request
import json
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from data.sample_images import get_sample_pair_bytes

def test_api():
    b_bytes, a_bytes = get_sample_pair_bytes("kedarnath")

    boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
    body = []
    body.extend([
        f"--{boundary}".encode(),
        b'Content-Disposition: form-data; name="before_image"; filename="before.png"',
        b"Content-Type: image/png",
        b"",
        b_bytes,
        f"--{boundary}".encode(),
        b'Content-Disposition: form-data; name="after_image"; filename="after.png"',
        b"Content-Type: image/png",
        b"",
        a_bytes,
        f"--{boundary}".encode(),
        b'Content-Disposition: form-data; name="zone_id"',
        b"",
        b"zone-kedarnath",
        f"--{boundary}--".encode(),
        b""
    ])
    payload = b"\r\n".join(body)

    req = urllib.request.Request("http://127.0.0.1:8000/api/analyze", data=payload)
    req.add_header("Content-Type", f"multipart/form-data; boundary={boundary}")

    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode())
        print("Analyze HTTP status: 200 OK")
        print("Processing time:", res["processing_time_ms"], "ms")
        print("Risk score:", res["risk"]["final_risk_score"], res["risk"]["risk_level"])
        print("Formula:", res["risk"]["formula"])
        print("Metrics:", res["metrics"])
        print("Returned Overlays:", list(res["images"].keys()))

if __name__ == "__main__":
    test_api()
