import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ClaimsList } from './pages/ClaimsList';
import { Dashboard } from './pages/Dashboard';
import { LandingPage } from './pages/LandingPage';
import { Claim } from './types';
import { Layout, Key, Home } from 'lucide-react';
import { Button } from './components/Button';

const AppContent: React.FC = () => {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    navigate(`/claim/${claim.id}`);
  };

  const handleBack = () => {
    setSelectedClaim(null);
    navigate('/claims');
  };

  const isLanding = location.pathname === '/';
  const isDashboard = location.pathname.includes('/claim/');
  const isClaimsList = location.pathname === '/claims';

  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans">
      
      {/* Sidebar - Hidden on Landing Page */}
      {!isLanding && (
        <div className="hidden md:flex flex-col w-24 bg-white border-r border-slate-100 items-center py-8 z-20 shrink-0">
            <div className="w-10 h-10 bg-[#ff0083] rounded-xl mb-12 shadow-lg shadow-pink-200 flex items-center justify-center cursor-pointer" onClick={() => navigate('/claims')}>
                <Layout className="text-white w-6 h-6" />
            </div>
            
            <div className="flex flex-col gap-8 w-full items-center">
                <div 
                    className={`p-3 rounded-xl cursor-pointer transition-all ${isClaimsList ? 'bg-pink-50 text-[#ff0083]' : 'text-slate-400 hover:text-slate-600'}`} 
                    onClick={() => navigate('/claims')}
                    title="Claims Queue"
                >
                    <Home className="w-6 h-6" />
                </div>
                <div className={`p-3 rounded-xl cursor-pointer transition-all ${isDashboard ? 'bg-pink-50 text-[#ff0083]' : 'text-slate-400 hover:text-slate-600'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <div className="p-3 text-slate-400 hover:text-slate-600 cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                </div>
            </div>
            
            <div className="mt-auto">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden cursor-pointer" onClick={() => navigate('/')}>
                    <img src="https://picsum.photos/seed/user/100" alt="User" />
                </div>
            </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/claims" element={<ClaimsList onSelectClaim={handleSelectClaim} />} />
          <Route 
            path="/claim/:id" 
            element={selectedClaim ? <Dashboard claim={selectedClaim} onBack={handleBack} /> : <ClaimsList onSelectClaim={handleSelectClaim} />} 
          />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState<boolean>(false);

  useEffect(() => {
    const checkKey = async () => {
      // Access via type assertion to resolve type conflict with global definition
      const win = window as any;
      if (win.aistudio && win.aistudio.hasSelectedApiKey) {
        const has = await win.aistudio.hasSelectedApiKey();
        setHasKey(has);
      } else {
        // Fallback for environments where aistudio is not injected (local dev with env var)
        setHasKey(!!process.env.API_KEY);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    const win = window as any;
    if (win.aistudio && win.aistudio.openSelectKey) {
        await win.aistudio.openSelectKey();
        // Race condition mitigation: Assume success immediately after the promise resolves.
        setHasKey(true);
    }
  };

  if (!hasKey) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-slate-50 p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
            <div className="w-16 h-16 bg-pink-50 text-[#ff0083] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Key className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">API Key Required</h1>
            <p className="text-slate-500 mb-8">
                To generate high-quality claim visualizations with Gemini Pro, please select a billing-enabled API key.
            </p>
            <Button onClick={handleSelectKey} className="w-full justify-center">
                Select API Key
            </Button>
            <p className="mt-4 text-xs text-slate-400">
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">
                    Learn more about billing requirements
                </a>
            </p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;