
import React, { useState, useEffect } from 'react';
import { Claim, DamageRegion } from '../types';
import { MapPin, AlignLeft, Camera, Image, PenLine, Check, X, Shield, Car, Calendar, DollarSign, FileText, StickyNote, Focus, Sparkles, Loader2 } from 'lucide-react';
import { generateEvidenceImage } from '../services/geminiService';
import { evidenceCache } from '../services/imageStore';

export const FnolContextWidget: React.FC<{ claim: Claim; onUpdateClaim?: (updates: Partial<Claim>) => void }> = ({ claim, onUpdateClaim }) => {
  const [editingSection, setEditingSection] = useState<'none' | 'transcript' | 'notes'>('none');
  const [tempValue, setTempValue] = useState('');

  const startEditing = (section: 'transcript' | 'notes') => {
    setEditingSection(section);
    setTempValue(section === 'transcript' ? claim.rawFnolData : (claim.adjusterNotes || ''));
  };

  const handleSave = () => {
    if (onUpdateClaim) {
        if (editingSection === 'transcript') {
            onUpdateClaim({ rawFnolData: tempValue });
        } else {
            onUpdateClaim({ adjusterNotes: tempValue });
        }
    }
    setEditingSection('none');
  };

  const handleCancel = () => {
    setEditingSection('none');
    setTempValue('');
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 mb-6 border border-slate-100 flex flex-col gap-8">
      
      {/* Top Section: Raw Transcript (Editable) */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-pink-50 rounded-lg">
                   <AlignLeft className="w-4 h-4 text-[#ff0083]" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">FNOL Raw Data</h4>
            </div>
            <div className="flex items-center gap-2">
                {editingSection !== 'transcript' && (
                    <button 
                        onClick={() => startEditing('transcript')}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                        title="Edit Raw Data"
                    >
                        <PenLine className="w-3 h-3" />
                    </button>
                )}
                <div className="px-2 py-1 bg-slate-100 rounded text-[10px] font-mono text-slate-400 border border-slate-200">
                    LOG_V2.0
                </div>
            </div>
        </div>
        
        {editingSection === 'transcript' ? (
             <div className="bg-pink-50 rounded-2xl p-2 border border-pink-100 focus-within:ring-2 focus-within:ring-pink-200 transition-all">
                <textarea 
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="w-full h-48 bg-transparent text-sm font-mono text-slate-700 p-2 focus:outline-none resize-none"
                />
                 <div className="flex justify-end gap-2 mt-2">
                    <button onClick={handleCancel} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">Cancel</button>
                    <button onClick={handleSave} className="px-3 py-1.5 rounded-lg bg-[#ff0083] text-white text-xs font-bold hover:bg-[#d9006b] shadow-sm">Save Changes</button>
                </div>
            </div>
        ) : (
            <div className="relative bg-slate-50 rounded-2xl p-4 border border-slate-100 group">
                <div className="absolute left-0 top-4 bottom-4 w-1 bg-pink-200 rounded-r-full"></div>
                <p className="text-sm text-slate-600 leading-relaxed font-mono text-xs whitespace-pre-wrap pl-3">
                    {claim.rawFnolData}
                </p>
            </div>
        )}
      </div>

      {/* Bottom Section: Adjuster Context / Open Input */}
      <div>
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-pink-50 rounded-lg">
                   <StickyNote className="w-4 h-4 text-[#ff0083]" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Scene Context & Notes</h4>
            </div>
            {editingSection !== 'notes' && (
                <button 
                  onClick={() => startEditing('notes')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 text-xs font-medium"
                >
                    <PenLine className="w-3 h-3" /> Edit Context
                </button>
            )}
         </div>

         <div className="relative">
            {editingSection === 'notes' ? (
                <div className="bg-pink-50 rounded-2xl p-2 border border-pink-100 focus-within:ring-2 focus-within:ring-pink-200 transition-all">
                    <textarea 
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        placeholder="Add specific details about the scene, missing context, or specific areas for the AI to focus on..."
                        className="w-full h-32 bg-transparent text-sm text-slate-700 p-2 focus:outline-none resize-none placeholder:text-pink-300"
                    />
                     <div className="flex justify-end gap-2 mt-2">
                        <button onClick={handleCancel} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">Cancel</button>
                        <button onClick={handleSave} className="px-3 py-1.5 rounded-lg bg-[#ff0083] text-white text-xs font-bold hover:bg-[#d9006b] shadow-sm">Update Context</button>
                    </div>
                </div>
            ) : (
                <div 
                    onClick={() => startEditing('notes')}
                    className="bg-pink-50/50 rounded-2xl p-4 border border-dashed border-pink-200 min-h-[5rem] cursor-text hover:bg-pink-50 transition-colors"
                >
                    {claim.adjusterNotes ? (
                         <p className="text-sm text-slate-700 whitespace-pre-wrap">{claim.adjusterNotes}</p>
                    ) : (
                        <p className="text-sm text-slate-400 italic">Click to add scene context, specific damage notes, or missing details to refine the visualization...</p>
                    )}
                </div>
            )}
         </div>
         <p className="text-[10px] text-slate-400 mt-2 pl-1">
             * Changes to FNOL Data or Notes will directly influence the scene regeneration prompt.
         </p>
      </div>

    </div>
  );
};

export const VehicleCoverageWidget: React.FC<{ claim: Claim }> = ({ claim }) => {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-6 border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vehicle Specs */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-blue-50 rounded-lg">
                            <Car className="w-4 h-4 text-blue-600" />
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Vehicle Specs</h4>
                    </div>
                    <div className="space-y-3">
                         <div className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-xs text-slate-400 font-medium">VIN</span>
                            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded">{claim.carDetails.vin}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-xs text-slate-400 font-medium">Vehicle</span>
                            <span className="text-sm font-bold text-slate-700">{claim.carDetails.year} {claim.carDetails.make} {claim.carDetails.model}</span>
                        </div>
                         <div className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-xs text-slate-400 font-medium">Color</span>
                            <span className="text-sm font-bold text-slate-700">{claim.carDetails.color}</span>
                        </div>
                         <div className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-xs text-slate-400 font-medium">Plate</span>
                            <div className="inline-flex items-center px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono font-bold text-slate-600 border border-slate-200">
                                {claim.carDetails.plateNumber}
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-xs text-slate-400 font-medium">Drivetrain</span>
                            <span className="text-sm font-bold text-slate-700">{claim.carDetails.drivetrain}</span>
                        </div>
                         <div className="flex justify-between items-center py-2">
                            <span className="text-xs text-slate-400 font-medium">Mileage</span>
                            <span className="text-sm font-bold text-slate-700">{claim.carDetails.mileage.toLocaleString()} mi</span>
                        </div>
                    </div>
                </div>

                {/* Coverage Details */}
                <div className="md:border-l md:border-slate-100 md:pl-8">
                     <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-emerald-50 rounded-lg">
                            <Shield className="w-4 h-4 text-emerald-600" />
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Coverage Details</h4>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-xs text-slate-400 font-medium">Policy Type</span>
                            <span className="text-sm font-bold text-emerald-700">{claim.coverage.policyType}</span>
                        </div>
                         <div className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-xs text-slate-400 font-medium">Limit</span>
                            <span className="text-sm font-bold text-slate-700">${claim.coverage.coverageLimit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-xs text-slate-400 font-medium">Deductible</span>
                            <span className="text-sm font-bold text-slate-700">${claim.coverage.deductible.toLocaleString()}</span>
                        </div>
                         <div className="flex justify-between items-center py-2">
                            <span className="text-xs text-slate-400 font-medium">Term End</span>
                            <span className="text-sm font-bold text-slate-700">{claim.coverage.endDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const PeopleWidget: React.FC<{ claim: Claim }> = ({ claim }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
       <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Involved Parties</h4>
       <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                <img src={claim.holder.avatarUrl} alt={claim.holder.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md" />
                <div>
                    <p className="text-sm font-bold text-slate-800">{claim.holder.name}</p>
                    <p className="text-xs text-slate-500">{claim.holder.role}</p>
                </div>
             </div>
             <span className="text-xs font-bold text-[#ff0083] bg-pink-50 px-2 py-1 rounded">12 D</span>
          </div>

          {claim.involvedParties.map(person => (
             <div key={person.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={person.avatarUrl} alt={person.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md" />
                    <div>
                        <p className="text-sm font-bold text-slate-800">{person.name}</p>
                        <p className="text-xs text-slate-500">{person.role}</p>
                    </div>
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">Witness</span>
             </div>
          ))}

          {claim.involvedParties.length === 0 && (
            <p className="text-xs text-slate-400 italic">No other parties involved.</p>
          )}
       </div>
    </div>
  );
};

export const LocationMapWidget: React.FC<{ claim: Claim }> = ({ claim }) => {
    return (
        <div className="bg-[#EBE8E4] rounded-3xl p-6 h-64 relative overflow-hidden group cursor-pointer border border-slate-200 shadow-sm">
            {/* Abstract Map Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 50 Q 100 100 200 50 T 400 150" fill="none" stroke="#A8A29E" strokeWidth="2" />
                <path d="M100 0 Q 150 150 50 300" fill="none" stroke="#FFFFFF" strokeWidth="4" />
                <path d="M250 0 L 250 300" fill="none" stroke="#FFFFFF" strokeWidth="4" />
                <path d="M0 200 L 400 200" fill="none" stroke="#A8A29E" strokeWidth="2" />
            </svg>
            
            <div className="relative z-10 flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Location Context</h4>
            </div>
            
            {/* Address Card */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded-xl shadow-sm border border-slate-100 max-w-[50%] text-right z-20">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Address</p>
                <p className="text-sm font-bold text-slate-700 leading-tight">{claim.location}</p>
                <p className="text-xs text-slate-500 mt-0.5">{claim.coordinates.lat.toFixed(4)}, {claim.coordinates.lng.toFixed(4)}</p>
            </div>

            {/* Fake Map Markers */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative flex flex-col items-center group/marker">
                     <div className="absolute bottom-full mb-2 bg-slate-800 text-white px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap opacity-100 transition-all transform translate-y-0">
                        Incident Location
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                    </div>
                    <div className="w-4 h-4 bg-[#ff0083] rounded-full ring-4 ring-white shadow-xl animate-pulse"></div>
                </div>
            </div>

            <div className="absolute top-1/4 right-1/3 opacity-50">
                 <MapPin className="w-5 h-5 text-slate-400" />
            </div>
             <div className="absolute bottom-1/3 left-1/4 opacity-50">
                 <MapPin className="w-5 h-5 text-orange-400" />
            </div>
        </div>
    )
}

export const EvidenceGallery: React.FC<{ claim: Claim; focusedRegion?: DamageRegion | null }> = ({ claim, focusedRegion }) => {
  const [evidenceImages, setEvidenceImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const cachedEvidence = evidenceCache.get(claim.id);
    if (cachedEvidence && cachedEvidence.length > 0) {
        setEvidenceImages(cachedEvidence);
    } else {
        // Automatically start generation on mount if not in cache
        handleGenerateEvidence();
    }
  }, [claim.id]);

  const handleGenerateEvidence = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setEvidenceImages([]);

    const basePrompt = `Amateur smartphone photo of a ${claim.carDetails.year} ${claim.carDetails.color} ${claim.carDetails.make} ${claim.carDetails.model} at ${claim.location}. The car has ${claim.description}. Realistic lighting, raw, unedited, user uploaded photo style.`;

    // Create 4 varied prompts for diversity
    const prompts = [
        `${basePrompt} Close up view of the specific damage area.`,
        `${basePrompt} Wide angle shot showing the whole car and the environment.`,
        `${basePrompt} Side angle view showing the impact.`,
        `${basePrompt} View from a standing person's perspective looking down at the damage.`
    ];

    try {
        const results = await Promise.all(prompts.map(p => generateEvidenceImage(p)));
        const validResults = results.filter(res => res !== null) as string[];
        
        if (validResults.length > 0) {
            setEvidenceImages(validResults);
            evidenceCache.set(claim.id, validResults);
        }
    } catch (e) {
        console.error("Failed to generate evidence", e);
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className={`bg-white rounded-3xl shadow-sm p-5 border transition-colors duration-300 h-full ${focusedRegion ? 'border-[#ff0083]/50 ring-4 ring-[#ff0083]/5' : 'border-slate-100'}`}>
      <div className="flex items-center justify-between mb-4">
         <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg transition-colors ${focusedRegion ? 'bg-[#ff0083] text-white' : 'bg-pink-50 text-[#ff0083]'}`}>
                {focusedRegion ? <Focus className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
            </div>
            <div className="flex flex-col">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {focusedRegion ? `Filtered: ${focusedRegion.label}` : 'Damage Evidence (User Uploads)'}
                </h4>
                {focusedRegion && <span className="text-[10px] text-slate-400">Showing photos matching detected damage</span>}
            </div>
         </div>
         <div className="flex items-center gap-2">
             <button 
                onClick={handleGenerateEvidence}
                disabled={isGenerating}
                className="flex items-center gap-1 bg-pink-50 hover:bg-pink-100 text-[#ff0083] text-[10px] px-2 py-1 rounded-md font-bold transition-colors disabled:opacity-50"
             >
                <Sparkles className="w-3 h-3" />
                {isGenerating ? 'GENERATING...' : 'REGENERATE AI EVIDENCE'}
             </button>
             <span className="bg-slate-50 border border-slate-100 text-slate-400 text-[10px] px-2 py-1 rounded-md font-bold font-mono">
                {evidenceImages.length} IMAGES
             </span>
         </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 h-32">
         {isGenerating ? (
            // Loading Skeletons
            Array.from({ length: 4 }).map((_, i) => (
                <div key={`loading-${i}`} className="h-full w-full rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
                </div>
            ))
         ) : (
            evidenceImages.map((photo, i) => {
                const isRelevant = !focusedRegion || (i % 2 === 0); 
                
                return (
                    <div key={i} className={`h-full w-full rounded-2xl overflow-hidden relative group cursor-pointer border shadow-sm transition-all duration-300 ${isRelevant ? 'opacity-100 scale-100 border-slate-100' : 'opacity-30 scale-95 grayscale'}`}>
                        <img src={photo} alt="evidence" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-[#ff0083]/0 group-hover:bg-[#ff0083]/10 transition-colors flex items-center justify-center">
                            <Image className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                        </div>
                        {focusedRegion && isRelevant && (
                            <div className="absolute top-1 right-1 w-3 h-3 bg-[#ff0083] rounded-full border border-white shadow-sm"></div>
                        )}
                    </div>
                )
            })
         )}
         
         {/* Fallback empty slots for visual consistency if few photos or generation failed */}
         {!isGenerating && Array.from({ length: Math.max(0, 4 - evidenceImages.length) }).map((_, i) => (
             <div key={`empty-${i}`} className="h-full w-full rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
             </div>
         ))}
      </div>
    </div>
  );
};
