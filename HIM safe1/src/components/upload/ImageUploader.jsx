import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Zap, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  RefreshCw, 
  Layers,
  MapPin,
  FileCheck
} from 'lucide-react';
import { HIMALAYAN_ZONES } from '../../data/himalayanZones';
import { analyzeSatelliteImages, fetchSampleImages, dataURLtoFile } from '../../services/api';

const DEMO_PRESETS = [
  {
    id: "kedarnath",
    name: "Kedarnath Basin (Debris Flow & Siltation)",
    zoneId: "zone-kedarnath",
    desc: "Simulated glacial lake discharge surge and riverbed siltation above Gaurikund."
  },
  {
    id: "badrinath",
    name: "Badrinath Corridor (Highway Slope Undercut)",
    zoneId: "zone-badrinath",
    desc: "Linear bypass slope excavation along NH-07 with active bedrock scarp exposure."
  },
  {
    id: "joshimath",
    name: "Joshimath Corridor (Slope Creep & Cracking)",
    zoneId: "zone-joshimath",
    desc: "Subsidence debris cone creep and structural fissure progression."
  }
];

export default function ImageUploader({ activeZone, onSelectZone, onAnalysisComplete }) {
  const [selectedZoneId, setSelectedZoneId] = useState(activeZone?.id || HIMALAYAN_ZONES[0].id);
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  const [beforePreview, setBeforePreview] = useState(null);
  const [afterPreview, setAfterPreview] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState(null);
  const [activePreset, setActivePreset] = useState(null);

  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);

  // Handle local file uploads
  const handleBeforeFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBeforeFile(file);
      setBeforePreview(URL.createObjectURL(file));
      setActivePreset(null);
      setError(null);
    }
  };

  const handleAfterFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAfterFile(file);
      setAfterPreview(URL.createObjectURL(file));
      setActivePreset(null);
      setError(null);
    }
  };

  // Load pre-bundled sample scenario
  const handleSelectPreset = async (preset) => {
    try {
      setLoading(true);
      setLoadingStep(`Loading paired satellite capture for ${preset.name}...`);
      setError(null);
      setActivePreset(preset.id);
      setSelectedZoneId(preset.zoneId);

      const zoneObj = HIMALAYAN_ZONES.find(z => z.id === preset.zoneId);
      if (zoneObj && onSelectZone) {
        onSelectZone(zoneObj);
      }

      const sampleData = await fetchSampleImages(preset.id);
      
      const bFile = dataURLtoFile(sampleData.before_image_b64, `${preset.id}_before.png`);
      const aFile = dataURLtoFile(sampleData.after_image_b64, `${preset.id}_after.png`);

      setBeforeFile(bFile);
      setAfterFile(aFile);
      setBeforePreview(sampleData.before_image_b64);
      setAfterPreview(sampleData.after_image_b64);
    } catch (err) {
      setError(`Failed to load preset sample images: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Execute Analysis
  const handleRunAnalysis = async () => {
    if (!beforeFile || !afterFile) {
      setError("Please provide both BEFORE and AFTER satellite images to perform change detection.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      setLoadingStep("1/4: Transferring imagery to FastAPI backend & validating geometry...");
      await new Promise(r => setTimeout(r, 200));

      setLoadingStep("2/4: Executing OpenCV ORB keypoint matching & Homography alignment...");
      await new Promise(r => setTimeout(r, 200));

      setLoadingStep("3/4: Calculating RGB Vegetation Proxy (VARI) & Land Change differencing...");
      
      const result = await analyzeSatelliteImages(beforeFile, afterFile, selectedZoneId);

      setLoadingStep("4/4: Synthesizing transparent 0-100 risk score and generating recommendations...");
      await new Promise(r => setTimeout(r, 250));

      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }
    } catch (err) {
      setError(`Analysis Error: ${err.message}. Ensure backend is running at http://127.0.0.1:8000.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-5">
      {/* Header & Himalayan Zone Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400">
              <Layers className="h-4 w-4" />
            </span>
            <h3 className="text-base font-bold text-white font-display">
              Dual-Image Satellite Upload & Analysis
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Feed temporal satellite captures (Before vs After) for automated alignment, VARI vegetation proxy, and risk scoring.
          </p>
        </div>

        {/* Zone Dropdown */}
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-mono text-slate-400">HIMALAYAN SECTOR:</span>
          <select
            value={selectedZoneId}
            onChange={(e) => {
              const newId = e.target.value;
              setSelectedZoneId(newId);
              const z = HIMALAYAN_ZONES.find(item => item.id === newId);
              if (z && onSelectZone) onSelectZone(z);
            }}
            className="bg-slate-950 border border-slate-700 text-cyan-300 text-xs font-mono rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-400"
          >
            {HIMALAYAN_ZONES.map(z => (
              <option key={z.id} value={z.id}>
                {z.name} ({z.district})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Preset Demo Scenarios Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            1-CLICK SIH DEMO PRESETS (Pre-Bundled Satellite Scenarios):
          </span>
          <span className="text-[11px] text-slate-500 font-mono">Instant Test Imagery</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DEMO_PRESETS.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`p-3 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-950'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 font-mono">{preset.name}</span>
                  {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{preset.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual Upload Dropzone Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BEFORE Image Upload Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              1. BEFORE IMAGE (Baseline Satellite Scan)
            </span>
            {beforeFile && (
              <span className="text-slate-400 text-[11px]">
                {(beforeFile.size / 1024).toFixed(1)} KB
              </span>
            )}
          </div>

          <div
            onClick={() => beforeInputRef.current?.click()}
            className={`h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative ${
              beforePreview
                ? 'border-emerald-500/50 bg-slate-950'
                : 'border-slate-700 hover:border-emerald-500/50 bg-slate-950/50 hover:bg-slate-950'
            }`}
          >
            {beforePreview ? (
              <div className="relative w-full h-full group">
                <img
                  src={beforePreview}
                  alt="Before Satellite Scan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-xs font-mono">
                  <UploadCloud className="h-6 w-6 text-emerald-400 mb-1" />
                  <span>Click to Replace Baseline Image</span>
                </div>
              </div>
            ) : (
              <div className="text-center p-4">
                <UploadCloud className="h-8 w-8 text-emerald-400/80 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-200">Upload Pre-Disturbance Satellite Image</p>
                <p className="text-[11px] text-slate-500 font-mono mt-1">PNG, JPG, WebP (Max 10MB)</p>
              </div>
            )}
            <input
              ref={beforeInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBeforeFileChange}
            />
          </div>
        </div>

        {/* AFTER Image Upload Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-rose-400 font-bold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
              2. AFTER IMAGE (Post-Event / Recent Orbit Scan)
            </span>
            {afterFile && (
              <span className="text-slate-400 text-[11px]">
                {(afterFile.size / 1024).toFixed(1)} KB
              </span>
            )}
          </div>

          <div
            onClick={() => afterInputRef.current?.click()}
            className={`h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative ${
              afterPreview
                ? 'border-rose-500/50 bg-slate-950'
                : 'border-slate-700 hover:border-rose-500/50 bg-slate-950/50 hover:bg-slate-950'
            }`}
          >
            {afterPreview ? (
              <div className="relative w-full h-full group">
                <img
                  src={afterPreview}
                  alt="After Satellite Scan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-xs font-mono">
                  <UploadCloud className="h-6 w-6 text-rose-400 mb-1" />
                  <span>Click to Replace Post-Event Image</span>
                </div>
              </div>
            ) : (
              <div className="text-center p-4">
                <UploadCloud className="h-8 w-8 text-rose-400/80 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-200">Upload Post-Event Satellite Image</p>
                <p className="text-[11px] text-slate-500 font-mono mt-1">PNG, JPG, WebP (Max 10MB)</p>
              </div>
            )}
            <input
              ref={afterInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAfterFileChange}
            />
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-rose-950/60 border border-rose-500/40 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-200">
          <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Action Execution Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="text-xs text-slate-400 font-mono">
          {beforeFile && afterFile ? (
            <span className="text-emerald-400 flex items-center gap-1.5">
              <FileCheck className="h-4 w-4" /> Ready for OpenCV Alignment & Risk Engine Analysis
            </span>
          ) : (
            <span>Select a 1-click demo preset above or upload custom images to begin.</span>
          )}
        </div>

        <button
          type="button"
          disabled={loading || !beforeFile || !afterFile}
          onClick={handleRunAnalysis}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            loading || !beforeFile || !afterFile
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-950 border border-cyan-400 active:scale-95'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-cyan-200" />
              <span>{loadingStep || 'Processing Computer Vision Pipeline...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-cyan-200" />
              <span>RUN ENVIRONMENTAL IMPACT ANALYSIS</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
