
import React from 'react';
import { MOCK_CLAIMS } from '../constants';
import { Claim, ClaimStatus } from '../types';
import { ChevronRight, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface ClaimsListProps {
  onSelectClaim: (claim: Claim) => void;
}

export const ClaimsList: React.FC<ClaimsListProps> = ({ onSelectClaim }) => {
  
  const getStatusColor = (status: ClaimStatus) => {
      switch(status) {
          case ClaimStatus.Approved: return 'bg-green-100 text-green-700';
          case ClaimStatus.Review: return 'bg-pink-100 text-[#ff0083]';
          case ClaimStatus.Pending: return 'bg-orange-100 text-orange-700';
          case ClaimStatus.Rejected: return 'bg-red-100 text-red-700';
          default: return 'bg-slate-100 text-slate-700';
      }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="p-8 max-w-7xl mx-auto"
    >
      <div className="flex justify-between items-center mb-10">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
           <h1 className="text-4xl font-bold text-slate-800">Claims Queue</h1>
           <p className="text-slate-500 mt-2">Manage and review active incident reports.</p>
        </motion.div>
        <div className="flex gap-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search policy..." 
                    className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
            </div>
            <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
            </button>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4"
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-100 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-1">ID</div>
            <div className="col-span-3">Policy Holder</div>
            <div className="col-span-3">Incident Type</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Action</div>
        </div>

        {/* Rows */}
        {MOCK_CLAIMS.map((claim) => (
            <motion.div 
                key={claim.id} 
                variants={itemVariants}
                onClick={() => onSelectClaim(claim)}
                whileHover={{ scale: 1.01, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                whileTap={{ scale: 0.99 }}
                className="grid grid-cols-12 gap-4 items-center px-6 py-4 bg-white rounded-2xl shadow-sm cursor-pointer group border border-transparent hover:border-pink-100 transition-colors"
            >
                <div className="col-span-1 font-bold text-slate-700">{claim.id.split('-')[1]}</div>
                <div className="col-span-3 flex items-center gap-3">
                    <img src={claim.holder.avatarUrl} alt="" className="w-8 h-8 rounded-full" />
                    <div>
                        <p className="font-medium text-slate-800">{claim.holder.name}</p>
                        <p className="text-xs text-slate-400">{claim.policyNumber}</p>
                    </div>
                </div>
                <div className="col-span-3 text-slate-600">{claim.type}</div>
                <div className="col-span-2 text-slate-500 text-sm">{claim.date}</div>
                <div className="col-span-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${getStatusColor(claim.status)}`}>
                        {claim.status}
                    </span>
                </div>
                <div className="col-span-1 flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-pink-50 transition-colors">
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#ff0083]" />
                    </div>
                </div>
            </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
