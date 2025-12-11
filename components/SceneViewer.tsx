
import React, { useState, useEffect, useRef } from 'react';
import { Claim, DamageRegion } from '../types';
import { Button } from './Button';
import { generateSceneImage, detectDamageRegions } from '../services/geminiService';
import { imageCache } from '../services/imageStore';
import { RefreshCw, Maximize2, ChevronDown, ScanLine, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SceneViewerProps {
  claim: Claim;
  onSelectDamage?: (region: DamageRegion | null) => void;
  selectedDamageId?: string | null;
}

const VIEW_MODES = ['2D Schematic', 'Aerial Drone', 'Isometric 3D', 'Street Level'];

export const SceneViewer: React.FC<SceneViewerProps> = ({ claim, onSelectDamage, selectedDamageId }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(false);
  const [viewMode, setViewMode] = useState('2D Schematic');
  const [damageRegions, setDamageRegions] = useState<DamageRegion[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);

  // Load from cache or generate on mount/claim change
  useEffect(() => {
    const cachedImage = imageCache.get(claim.id);
    setDamageRegions([]); // Reset regions on new claim
    
    if (cachedImage) {
      setImageSrc(cachedImage);
      setLoading(false);
      // Optional: Try to analyze cached image if we don't have regions stored?
      // For now, we only analyze on fresh generation or manual trigger
    } else if (claim.generatedImage) {
      setImageSrc(claim.generatedImage);
      imageCache.set(claim.id, claim.generatedImage);
      setLoading(false);
    } else {
      handleRegenerate(true);
    }
  }, [claim.id]);

  // Trigger analysis when image is loaded if we don't have regions yet
  useEffect(() => {
    if (imageSrc && damageRegions.length === 0 && !analyzing && !loading) {
       handleAnalyzeDamage(imageSrc);
    }
  }, [imageSrc]);

  const constructPrompt = (mode: string) => {
    let viewSpec = "";
    let styleSpec = "";
    
    switch(mode) {
        case 'Isometric 3D':
            viewSpec = "Isometric view, 45-degree angle from above";
            styleSpec = "3D clay render, clean, minimal, studio lighting, pastel colors, high fidelity 3D art. Clean composition, no text overlays.";
            break;
        case 'Street Level':
            viewSpec = "Eye-level or Dashcam view, street level";
            styleSpec = "Photorealistic, slightly grainy, CCTV style, real world lighting, raw footage. Authentic look.";
            break;
        case '2D Schematic':
            viewSpec = "Strict Top-down Orthographic view (Bird's Eye).";
            styleSpec = "Technical architectural blueprint, clean white background, black vector lines with minimal shading. NO text overlays, NO labels, NO measurements, NO data boxes. Purely visual accident diagram. Use Hot Pink (#ff0083) only to highlight the damaged area of the vehicle.";
            break;
        case 'Aerial Drone':
            viewSpec = "High-angle top-down aerial drone view, showing the car and immediate surroundings from above (Eagle Eye)";
            styleSpec = "8k resolution, Unreal Engine 5, Raytracing, hyper-realistic, dramatic lighting, detailed textures, photorealistic. Clear view of road markings and environment.";
            break;
        default:
            viewSpec = "High-angle top-down aerial drone view";
            styleSpec = "Photorealistic 3D Render";
    }

    const structuredPrompt = {
        task: "Generate a clear collision scene visualization for insurance claim analysis.",
        vehicle: {
            details: `${claim.carDetails.year} ${claim.carDetails.make} ${claim.carDetails.model}`,
            color: claim.carDetails.color,
            license_plate: claim.carDetails.plateNumber,
            damage_description: "Must match exactly: " + claim.description,
        },
        environment: {
            location: claim.location,
            weather: claim.weatherCondition,
            time_of_day: claim.time
        },
        incident_context_from_fnol: claim.rawFnolData.substring(0, 300).replace(/\n/g, " "),
        adjuster_notes: claim.adjusterNotes,
        visual_style: {
            camera_angle: viewSpec,
            art_style: styleSpec,
            focus: "Clear visibility of vehicle damage and surrounding context. easy to understand, uncluttered."
        }
    };

    return JSON.stringify(structuredPrompt);
  };

  const handleRegenerate = async (initial = false) => {
    setLoading(true);
    setError(false);
    setDamageRegions([]);
    if (onSelectDamage) onSelectDamage(null);
    
    const prompt = constructPrompt(viewMode);
    
    try {
      const generated = await generateSceneImage(prompt);
      if (generated) {
        setImageSrc(generated);
        imageCache.set(claim.id, generated);
        // Analysis will be triggered by useEffect
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeDamage = async (img: string) => {
    setAnalyzing(true);
    try {
        const regions = await detectDamageRegions(img);
        setDamageRegions(regions);
    } catch (e) {
        console.error("Analysis failed", e);
    } finally {
        setAnalyzing(false);
    }
  };

  return (
    <div className="relative h-full w-full min-h-[450px] bg-slate-100 rounded-[40px] overflow-hidden shadow-inner group border border-slate-200">
      
      {/* Background/Image Area */}
      <AnimatePresence mode="wait">
      {imageSrc ? (
        <div className="relative w-full h-full">
            <motion.img 
            key="image"
            ref={imageRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={imageSrc} 
            alt="Claim Scene Render" 
            className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* SVG Overlay for Bounding Boxes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {damageRegions.map((region) => {
                    // Convert normalized coordinates to percentages
                    const x = region.box.xmin * 100 + '%';
                    const y = region.box.ymin * 100 + '%';
                    const width = (region.box.xmax - region.box.xmin) * 100 + '%';
                    const height = (region.box.ymax - region.box.ymin) * 100 + '%';
                    const isSelected = selectedDamageId === region.id;

                    return (
                        <g key={region.id} className="pointer-events-auto cursor-pointer group/box" onClick={() => onSelectDamage && onSelectDamage(region)}>
                            <rect 
                                x={x} y={y} width={width} height={height} 
                                fill={isSelected ? "rgba(255, 0, 131, 0.2)" : "rgba(255, 255, 255, 0.1)"}
                                stroke={isSelected ? "#ff0083" : "rgba(255, 255, 255, 0.8)"}
                                strokeWidth={isSelected ? "3" : "2"}
                                strokeDasharray={isSelected ? "0" : "5,5"}
                                className="transition-all duration-300 hover:stroke-[#ff0083] hover:fill-[#ff0083]/10"
                            />
                            {/* Label Tag */}
                            <foreignObject x={x} y={parseFloat(y) > 5 ? `calc(${y} - 30px)` : `calc(${y} + ${height} + 10px)`} width="100%" height="40px" className="overflow-visible">
                                <div className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold shadow-lg transition-all duration-300 ${isSelected ? 'bg-[#ff0083] text-white scale-110' : 'bg-white/90 text-slate-700 opacity-0 group-hover/box:opacity-100'}`}>
                                    {region.label}
                                </div>
                            </foreignObject>
                        </g>
                    );
                })}
            </svg>
        </div>
      ) : (
        <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200"
        >
           {loading ? (
             <div className="text-center">
                <div className="w-16 h-16 border-4 border-pink-200 border-t-[#ff0083] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-500 font-medium">Rendering Scene...</p>
             </div>
           ) : (
             <div className="text-center p-6">
                <p className="text-slate-400 mb-4">Visualization Ready to Generate</p>
                {error && <p className="text-red-400 text-sm mb-2">Generation failed. Please try again.</p>}
                <Button onClick={() => handleRegenerate()} variant="secondary">Generate Preview</Button>
             </div>
           )}
        </motion.div>
      )}
      </AnimatePresence>

      {/* Analysis Status Overlay */}
      {analyzing && imageSrc && (
          <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
              <ScanLine className="w-4 h-4 text-[#ff0083] animate-pulse" />
              <span className="text-xs font-bold text-slate-600">Detecting Damage...</span>
          </div>
      )}

      {/* Floating Controls */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-4 pointer-events-none">
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg max-w-xs transform transition-all hover:scale-105 origin-top-left pointer-events-auto"
        >
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Damage Estimate</p>
           <h3 className="text-3xl font-bold text-slate-800">${claim.damageEstimate.toLocaleString()}</h3>
           <div className="h-1 w-full bg-slate-100 mt-3 rounded-full overflow-hidden">
             <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-full bg-[#ff0083] rounded-full"
             ></motion.div>
           </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 justify-between items-end z-10 pointer-events-none">
         <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3 items-center pointer-events-auto"
         >
            
            {/* View Mode Dropdown */}
            <div className="relative group/dropdown">
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                </div>
                <select 
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value)}
                    disabled={loading}
                    className="appearance-none pl-4 pr-10 py-3 h-12 bg-white/90 backdrop-blur-md rounded-2xl text-sm font-bold text-slate-700 hover:bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ff0083] cursor-pointer disabled:opacity-50 transition-all border-none"
                >
                    {VIEW_MODES.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                    ))}
                </select>
            </div>

            <Button 
                variant="glass" 
                onClick={() => handleRegenerate()} 
                isLoading={loading}
                className="h-12 px-6 rounded-2xl font-bold text-slate-700 bg-white/90 hover:bg-white shadow-lg border-none"
            >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Regenerate' : 'Regenerate Scene'}
            </Button>
         </motion.div>
         
         <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 backdrop-blur p-2 rounded-full shadow-lg cursor-pointer hover:bg-white transition-colors pointer-events-auto"
         >
            <Maximize2 className="w-5 h-5 text-slate-600" />
         </motion.div>
      </div>
      
    </div>
  );
};
