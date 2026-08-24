const API_BASE_URL = 'http://127.0.0.1:8000';

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    if (!res.ok) throw new Error(`Health check failed (${res.status})`);
    return await res.json();
  } catch (err) {
    console.warn('Backend offline or unreachable:', err.message);
    return null;
  }
}

export async function fetchHimalayanZones() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/zones`);
    if (!res.ok) throw new Error(`Failed to fetch zones (${res.status})`);
    return await res.json();
  } catch (err) {
    console.warn('Using local fallback zones data:', err.message);
    return null;
  }
}

export async function fetchSampleScenarios() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/sample-scenarios`);
    if (!res.ok) throw new Error(`Failed to fetch sample scenarios (${res.status})`);
    return await res.json();
  } catch (err) {
    console.warn('Failed to load sample scenarios:', err.message);
    return null;
  }
}

export async function fetchSampleImages(scenarioId) {
  const res = await fetch(`${API_BASE_URL}/api/sample-images/${scenarioId}`);
  if (!res.ok) throw new Error(`Failed to load sample images for ${scenarioId}`);
  return await res.json();
}

/**
 * Converts a Base64 data URL to a File object for multipart form upload
 */
export function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export async function analyzeSatelliteImages(beforeFile, afterFile, zoneId) {
  const formData = new FormData();
  formData.append('before_image', beforeFile);
  formData.append('after_image', afterFile);
  if (zoneId) {
    formData.append('zone_id', zoneId);
  }

  const res = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    let errorDetail = `Analysis failed with status ${res.status}`;
    try {
      const errData = await res.json();
      if (errData.detail) errorDetail = errData.detail;
    } catch (_) {}
    throw new Error(errorDetail);
  }

  return await res.json();
}
