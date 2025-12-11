import React from 'react';
import { Claim } from '../types';
import { Plane, Car, MapPin } from 'lucide-react';

interface TicketCardProps {
  claim: Claim;
}

export const TicketCard: React.FC<TicketCardProps> = ({ claim }) => {
  return (
    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden mb-6 group hover:shadow-2xl transition-all duration-300">
      {/* Top Section - decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-200 via-rose-200 to-red-200"></div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">Vehicle Details</span>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-800">{claim.carDetails.year} {claim.carDetails.make}</h2>
            </div>
            <div className="flex items-center gap-2 mt-1">
               <p className="text-sm font-medium text-slate-500">{claim.carDetails.model} • {claim.carDetails.color}</p>
               <span className="h-1 w-1 rounded-full bg-slate-300"></span>
               <div className="inline-flex items-center px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-mono font-bold text-slate-600 border border-slate-200">
                  {claim.carDetails.plateNumber}
               </div>
            </div>
            <p className="text-sm text-slate-400 mt-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {claim.location}
            </p>
          </div>
          <div className="text-right">
             <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Policy</span>
             <p className="text-xl font-bold text-slate-800 mt-1">{claim.policyNumber}</p>
          </div>
        </div>

        {/* Barcode / Dashed Line simulation */}
        <div className="relative flex items-center justify-between my-6">
           <div className="absolute left-[-24px] w-6 h-6 bg-slate-50 rounded-full"></div>
           <div className="w-full border-b-2 border-dashed border-slate-200"></div>
           <div className="absolute right-[-24px] w-6 h-6 bg-slate-50 rounded-full"></div>
        </div>

        {/* Barcode Graphic (CSS Only) */}
        <div className="h-12 w-full flex items-end justify-between px-2 gap-[2px] opacity-70 mb-4">
            {[...Array(40)].map((_, i) => (
                <div key={i} className="bg-slate-800" style={{
                    width: Math.random() > 0.5 ? '4px' : '2px', 
                    height: `${Math.floor(Math.random() * 60) + 40}%`
                }}></div>
            ))}
        </div>

        <div className="flex justify-between items-center text-xs font-medium text-slate-500">
          <span>{claim.date}, {claim.time}</span>
          <span className="text-[#ff0083] bg-pink-50 px-2 py-1 rounded-md">{claim.status}</span>
        </div>
      </div>
    </div>
  );
};