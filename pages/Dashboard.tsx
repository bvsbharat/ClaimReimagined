
import React, { useState, useEffect } from 'react';
import { Claim, DamageRegion } from '../types';
import { SceneViewer } from '../components/SceneViewer';
import { FnolContextWidget, PeopleWidget, LocationMapWidget, EvidenceGallery, VehicleCoverageWidget } from '../components/InfoWidgets';
import { ArrowLeft, MessageSquare, Download, Share2 } from 'lucide-react';
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardProps {
  claim: Claim;
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ claim: initialClaim, onBack }) => {
  // Local state to handle edits to the claim (like FNOL data)
  const [claim, setClaim] = useState<Claim>(initialClaim);
  const [focusedDamage, setFocusedDamage] = useState<DamageRegion | null>(null);

  // Reset local state if prop changes
  useEffect(() => {
    setClaim(initialClaim);
    setFocusedDamage(null);
  }, [initialClaim.id]);

  const handleUpdateClaim = (updates: Partial<Claim>) => {
    setClaim(prev => ({
        ...prev,
        ...updates
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex flex-col p-6 bg-slate-50 overflow-hidden"
    >
      
      {/* Header / Nav */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex justify-between items-center mb-6 shrink-0"
      >
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-2xl font-bold text-slate-800">Review Claim <span className="text-slate-400">#{claim.id}</span></h1>
         </div>
         <div className="flex gap-3">
            <Button variant="ghost"><Share2 className="w-4 h-4" /></Button>
            <Button variant="ghost"><Download className="w-4 h-4" /></Button>
            <Button variant="primary" className="rounded-full px-6">Approve Claim</Button>
         </div>
      </motion.div>

      {/* Main Grid Content - Unified Scroll Container */}
      <div className="flex-1 overflow-y-auto min-h-0 -mr-2 pr-2">
        <div className="grid grid-cols-12 gap-6 pb-6">
            
            {/* Left Panel: The Scene (Large) & Detailed Info Stream */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                
                {/* The Main visualizer */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="min-h-[450px] w-full"
                >
                    <SceneViewer 
                        claim={claim} 
                        onSelectDamage={setFocusedDamage}
                        selectedDamageId={focusedDamage?.id}
                    />
                </motion.div>
                
                {/* Evidence Gallery */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                    <EvidenceGallery claim={claim} focusedRegion={focusedDamage} />
                </motion.div>


                {/* Quick Stats Bar */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl shadow-sm p-5 flex flex-wrap items-center justify-between gap-4 border border-slate-100"
                >
                     <div className="flex gap-8 items-center">
                         <div>
                             <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Incident Type</p>
                             <p className="text-lg font-bold text-slate-800">{claim.type}</p>
                         </div>
                         <div className="w-px h-10 bg-slate-100 hidden sm:block"></div>
                         <div>
                             <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Est. Repair Time</p>
                             <p className="text-lg font-bold text-slate-800">12 Days</p>
                         </div>
                          <div className="w-px h-10 bg-slate-100 hidden sm:block"></div>
                         <div>
                             <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Deductible</p>
                             <p className="text-lg font-bold text-slate-800">${claim.coverage.deductible}</p>
                         </div>
                     </div>

                     <div className="flex items-center gap-3 ml-auto">
                         <div className="relative">
                            <img src="https://picsum.photos/seed/agent/100" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border border-white rounded-full"></div>
                         </div>
                         <div className="text-sm text-slate-600 mr-2 hidden xl:block">
                            <p className="font-bold">Agent Support</p>
                            <p className="text-xs text-green-600">Online</p>
                         </div>
                         <Button variant="secondary" className="rounded-full p-3"><MessageSquare className="w-5 h-5" /></Button>
                     </div>
                </motion.div>

                {/* Vehicle & Coverage Specs */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                    <VehicleCoverageWidget claim={claim} />
                </motion.div>

            </div>

            {/* Right Panel: Sidebar style */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                
                {/* FNOL Transcript & Context Editor */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                    <FnolContextWidget claim={claim} onUpdateClaim={handleUpdateClaim} />
                </motion.div>
                
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <LocationMapWidget claim={claim} />
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <PeopleWidget claim={claim} />
                </motion.div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};
