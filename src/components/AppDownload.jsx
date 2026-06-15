import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Car, Search, ShieldCheck } from 'lucide-react';

const AppDownload = () => {
  const [phoneStep, setPhoneStep] = useState(0);

  // Cycle through simulated phone states: 0 = Where to, 1 = Dispatching, 2 = Confirmed
  useEffect(() => {
    const interval = setInterval(() => {
      setPhoneStep(prev => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-tascki-yellow/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-black uppercase tracking-wider rounded-full">
              Mobile App
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-gray-900 tracking-tight">
              Get the <br />
              <span className="text-tascki-yellow relative inline-block">TASCKI App<span className="absolute bottom-1.5 left-0 w-full h-[6px] bg-black/5 -z-10 rounded-full" /></span>
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed font-semibold">
              Download our application to experience the fastest, most reliable ride-booking service. Available on iOS and Android.
            </p>
            
            {/* App download stores */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {/* Play Store */}
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 bg-black px-6 py-4 rounded-2xl shadow-lg cursor-pointer"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.988 1.988 0 01-.582-1.378V3.192c0-.528.21-.103.581-1.378z" fill="#00f076"/>
                  <path d="M14.654 11.137l-10.45-6.02a1.05 1.05 0 010-1.815l1.62-.932a1.051 1.051 0 011.05 0l11.458 6.6-3.678 2.167z" fill="#ffc900"/>
                  <path d="M14.654 12.863L18.33 15.03l-3.677 2.167-10.449-6.02a1.05 1.05 0 00-1.05 0l-1.62-.932a1.051 1.051 0 000-1.815l10.45-6.02 3.678 2.167z" fill="#ff3a44" opacity="0.8"/>
                  <path d="M18.33 8.97l3.677 2.116a1.051 1.051 0 010 1.828l-3.677 2.117-3.676-2.117 3.676-2.116z" fill="#00a0ff"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold font-mono">GET IT ON</p>
                  <p className="text-sm font-black text-tascki-yellow uppercase tracking-wide">Google Play</p>
                </div>
              </motion.button>
              
              {/* App Store */}
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 bg-black px-6 py-4 rounded-2xl shadow-lg cursor-pointer"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.09 2.31-.83 3.63-.73 1.53.11 2.76.7 3.55 1.8-3.12 1.83-2.6 5.96.42 7.23-.74 1.8-1.72 3.58-2.68 3.87zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.34-1.7 4.38-3.74 4.25z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold font-mono">DOWNLOAD ON THE</p>
                  <p className="text-sm font-black text-tascki-yellow uppercase tracking-wide">App Store</p>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Panel: Simulated Dynamic Booking Phone */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] flex justify-center items-end"
          >
            {/* Smartphone container */}
            <div className="relative w-[300px] h-[550px] bg-black border-[10px] border-gray-900 rounded-t-[3rem] p-3 shadow-[0_-20px_50px_rgba(255,192,0,0.15)] overflow-hidden z-10 border-b-0">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black z-20 rounded-full flex items-center justify-center">
                <div className="w-8 h-1 bg-gray-800 rounded-full" />
              </div>
              
              <div className="absolute inset-0 bg-[#0b0f19] pt-14 px-5">
                <AnimatePresence mode="wait">
                  
                  {/* Step 0: "Where to?" Destination Input screen */}
                  {phoneStep === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 h-full flex flex-col justify-between pb-6"
                    >
                      <div className="space-y-6">
                        <div className="flex justify-between items-center mt-2">
                          <h3 className="text-lg font-black text-white uppercase tracking-wider">Where to?</h3>
                          <div className="w-8 h-8 rounded-full bg-tascki-yellow text-slate-950 flex items-center justify-center font-black text-xs shadow-md border border-amber-400/20">
                            ME
                          </div>
                        </div>
                        
                        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-inner flex items-center gap-3">
                          <Search className="w-4 h-4 text-tascki-yellow" />
                          <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">Enter destination...</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[
                          { title: 'Airport Terminal 2', desc: '4.2 km away' },
                          { title: 'Corporate Tech Park', desc: '8.5 km away' }
                        ].map((loc, i) => (
                          <div key={i} className="flex items-center gap-3 bg-slate-900/40 p-3.5 rounded-[1.5rem] border border-white/5 shadow-sm">
                            <div className="w-7 h-7 rounded-lg bg-tascki-yellow/15 flex items-center justify-center text-tascki-yellow border border-yellow-400/10">
                              <Navigation className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                            <div>
                              <p className="text-xs font-black text-white">{loc.title}</p>
                              <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5 font-mono">{loc.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 1: "Searching..." Dispatch Loader screen */}
                  {phoneStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col items-center justify-center gap-6"
                    >
                      {/* Pulsing circular search radar */}
                      <div className="relative flex items-center justify-center w-36 h-36">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-tascki-yellow/10 animate-ping" />
                        <span className="absolute inline-flex h-2/3 w-2/3 rounded-full bg-tascki-yellow/20 animate-pulse" />
                        <div className="w-16 h-16 rounded-full bg-tascki-yellow text-slate-950 flex items-center justify-center shadow-lg relative z-10 border-2 border-slate-950 shadow-[0_0_20px_rgba(255,192,0,0.5)]">
                          <Car size={26} className="stroke-[2.5] animate-bounce" />
                        </div>
                      </div>
                      
                      <div className="text-center space-y-1">
                        <p className="text-sm font-black text-white uppercase tracking-wider">Finding Drivers</p>
                        <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest font-mono">Matching nearest ride...</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: "Booking Confirmed" success status screen */}
                  {phoneStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col justify-between pb-6"
                    >
                      <div className="space-y-6 text-center mt-6">
                        <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-green-500/20 border-2 border-white">
                          <ShieldCheck size={28} className="stroke-[2.5]" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-lg font-black text-white uppercase tracking-wider">Match Confirmed!</h4>
                          <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest font-mono">Driver is heading to you</p>
                        </div>
                      </div>

                      {/* Driver Card overlay */}
                      <div className="bg-slate-900/50 border border-white/10 p-3.5 rounded-[1.5rem] space-y-3 shadow-2xl backdrop-blur-md">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-tascki-yellow text-slate-950 flex items-center justify-center shrink-0 border border-slate-950 shadow-md font-black text-xs">
                            RK
                          </div>
                          <div>
                            <p className="text-xs font-black text-white uppercase">Raj Kumar</p>
                            <p className="text-[9px] text-tascki-yellow font-extrabold uppercase tracking-widest font-mono">Auto Rickshaw • MH-12</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 font-mono border-t border-white/5 pt-2.5">
                          <span>ETA: 3 MINS</span>
                          <span>FARE: ₹134.00</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AppDownload;
