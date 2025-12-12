
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Eye, Layers, Box } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-x-hidden font-['Outfit'] selection:bg-[#ff0083] selection:text-white relative">
      
      {/* Background Image Layer - Absolute Top */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-0 w-full h-[120vh] pointer-events-none overflow-hidden z-0"
      >
          {/* Static Background Image */}
          <div className="absolute inset-0 w-full h-full bg-slate-50">
            <img 
                src="https://v3b.fal.media/files/b/0a85c97c/9R3o6lfQO91NS_a0FloNz.png" 
                alt="Modern Architecture Background"
                className="w-full h-full object-cover opacity-90"
            />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-white"></div>
          
          {/* Floating UI Cards - Positioned in the background layer but visually below hero text */}
          <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-4">
             <div className="relative h-64">
                 
                 {/* Floating Card 1: The Image */}
                 <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: [0, -15, 0], opacity: 1 }}
                    transition={{ 
                        opacity: { duration: 0.8, delay: 0.5 },
                        y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                    }}
                    className="absolute top-0 right-4 md:right-40 bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 w-64"
                 >
                     <div className="flex gap-3 mb-3">
                         <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-[#ff0083]" />
                         </div>
                         <div className="flex flex-col justify-center gap-1">
                             <div className="h-1.5 w-20 bg-slate-200 rounded-full"></div>
                             <div className="h-1.5 w-12 bg-slate-100 rounded-full"></div>
                         </div>
                     </div>
                     <div className="h-32 bg-slate-100 rounded-xl mb-3 overflow-hidden relative">
                        <img src="https://picsum.photos/seed/claim1/400/300" className="opacity-80 object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" alt="Claim Preview" />
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Analysis Complete</span>
                        <div className="w-2 h-2 rounded-full bg-[#ff0083]"></div>
                     </div>
                 </motion.div>

                 {/* Floating Card 2: The Data */}
                 <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: [0, -20, 0], opacity: 1 }}
                    transition={{ 
                        opacity: { duration: 0.8, delay: 0.8 },
                        y: { repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.5 }
                    }}
                    className="absolute top-24 left-4 md:left-40 bg-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 w-64 z-10"
                 >
                     <div className="flex items-center justify-between mb-6">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Damage Est.</span>
                         <span className="text-xl font-bold font-['Libre_Baskerville'] text-slate-800">$2,450</span>
                     </div>
                     <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden mb-2">
                         <div className="bg-[#ff0083] w-[70%] h-full rounded-full"></div>
                     </div>
                     <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                        <span>Deductible</span>
                        <span>$500.00</span>
                     </div>
                 </motion.div>
             </div>
          </div>
      </motion.div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between px-6 py-8 max-w-7xl mx-auto relative z-20"
      >
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500 w-1/3">
           <a href="#features" className="hover:text-[#ff0083] transition-colors">Our Vision</a>
           <a href="#demo" className="hover:text-[#ff0083] transition-colors">Technology</a>
           <a href="#pricing" className="hover:text-[#ff0083] transition-colors">Enterprise</a>
        </div>

        <div className="text-3xl text-slate-800 font-['Pacifico'] cursor-pointer select-none w-1/3 text-center" onClick={() => navigate('/')}>
          Claim Reimagined
        </div>
        
        <div className="flex items-center justify-end gap-4 w-1/3">
           <button className="text-xs font-bold text-slate-400 hover:text-slate-600 tracking-widest uppercase transition-colors">Sign In</button>
           <button 
             onClick={() => navigate('/claims')}
             className="hidden md:block border border-slate-200 text-slate-500 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:border-slate-400 hover:text-slate-700 transition-all"
           >
             Console
           </button>
        </div>
      </motion.nav>

      {/* Hero Section - Added Z-index and bottom padding to space out the layout over the background image */}
      <div className="relative pt-16 pb-96 flex flex-col items-center text-center px-4 max-w-4xl mx-auto z-10">
         
         <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-['Libre_Baskerville'] text-slate-800 mb-8 leading-tight drop-shadow-sm"
         >
            Claim insurance that <br/>
            <span className="italic text-slate-600">reimagines</span> reality.
         </motion.h1>
         
         <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mb-12 font-medium leading-relaxed drop-shadow-sm"
         >
            AI-driven scene reconstruction for instant adjuster insights. 
            Turn raw FNOL text into visual truth in seconds.
         </motion.p>

         <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/claims')}
            className="bg-[#ff0083] text-white text-sm font-bold tracking-widest uppercase px-10 py-5 rounded-lg shadow-xl shadow-pink-200 hover:bg-[#d9006b] hover:shadow-pink-300 transition-all duration-300"
         >
            Launch Console
         </motion.button>

         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
         >
            <a href="#features" className="text-[#ff0083] text-sm hover:underline decoration-pink-300 underline-offset-4 font-semibold">How our AI engine works</a>
         </motion.div>

      </div>

      {/* Features Section - Ensure Z-Index to sit above background */}
      <div id="features" className="relative z-10 max-w-7xl mx-auto px-8 py-24 md:py-32">
         <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center"
         >
            
            <motion.div variants={fadeInUp} className="flex flex-col items-center group">
                <div className="w-20 h-20 mb-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#ff0083]/5 transition-colors duration-500">
                    <Eye className="w-8 h-8 text-slate-300 group-hover:text-[#ff0083] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-['Libre_Baskerville'] text-slate-800 mb-4">Visual Insight</h3>
                <p className="text-slate-500 font-light leading-relaxed max-w-xs mx-auto">
                    First insight of the entire claim as soon as the adjuster lands on the screen. No more guessing.
                </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col items-center group">
                <div className="w-20 h-20 mb-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#ff0083]/5 transition-colors duration-500">
                    <Layers className="w-8 h-8 text-slate-300 group-hover:text-[#ff0083] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-['Libre_Baskerville'] text-slate-800 mb-4">Context Awareness</h3>
                <p className="text-slate-500 font-light leading-relaxed max-w-xs mx-auto">
                    Takes the unstructured context of the entire claim and reconstructs a structured 3D reality.
                </p>
            </motion.div>

             <motion.div variants={fadeInUp} className="flex flex-col items-center group">
                <div className="w-20 h-20 mb-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#ff0083]/5 transition-colors duration-500">
                    <Box className="w-8 h-8 text-slate-300 group-hover:text-[#ff0083] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-['Libre_Baskerville'] text-slate-800 mb-4">Realistic View</h3>
                <p className="text-slate-500 font-light leading-relaxed max-w-xs mx-auto">
                    View incident details in realistic imagery generated by our advanced Gemini Pro AI engine.
                </p>
            </motion.div>

         </motion.div>
      </div>
        
      {/* Bottom CTA */}
      <div className="bg-[#ff0083] text-white py-32 px-8 text-center relative overflow-hidden z-10">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-['Libre_Baskerville'] mb-10 leading-tight"
            >
                Ready to see the unseen?
            </motion.h2>
            <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/claims')}
                className="bg-white text-[#ff0083] text-sm font-bold tracking-widest uppercase px-12 py-5 rounded-lg shadow-2xl transition-all"
            >
                Get Started
            </motion.button>
          </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-16 text-center text-slate-400 text-sm font-light border-t border-slate-50 z-10 relative">
          <div className="font-['Pacifico'] text-3xl text-slate-300 mb-8 select-none">Claim Reimagined</div>
          <div className="flex justify-center gap-8 mb-8 font-medium">
              <a href="#" className="hover:text-[#ff0083] transition-colors">Team</a>
              <a href="#" className="hover:text-[#ff0083] transition-colors">Careers</a>
              <a href="#" className="hover:text-[#ff0083] transition-colors">Legal</a>
              <a href="#" className="hover:text-[#ff0083] transition-colors">Contact</a>
          </div>
          <p className="opacity-50">© 2024 Claim Reimagined Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};
