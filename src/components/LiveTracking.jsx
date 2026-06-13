import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Gauge, ShieldCheck, Share2 } from 'lucide-react';

const LiveTracking = () => {
  const [speed, setSpeed] = useState(44);

  // Fluctuating real-time telemetry speedometer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const nextSpeed = prev + delta;
        return nextSpeed >= 41 && nextSpeed <= 48 ? nextSpeed : prev;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* City grid line overlays */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1.5px,transparent_1.5px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Panel: Telemetry Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Ambient shadow glow */}
            <div className="absolute inset-0 bg-tascki-yellow/5 rounded-[2.5rem] blur-[50px] pointer-events-none" />
            
            {/* Dashboard Box */}
            <div className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-2xl relative overflow-hidden bg-gradient-to-br from-white via-white to-gray-50/50">
              {/* Header Chevron pattern */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-tascki-yellow via-yellow-400 to-tascki-yellow" />
              
              {/* Driver Card */}
              <div className="flex items-center gap-4 mb-8 relative z-10 border-b border-gray-100 pb-6">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80" alt="Driver" className="w-16 h-16 rounded-full border-4 border-tascki-yellow object-cover shadow-md" />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full border-2 border-white shadow-sm animate-pulse">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 tracking-wide">Raj Kumar</h4>
                  <p className="text-tascki-yellow font-extrabold text-sm tracking-wide">MH 12 AB 3456 • Auto Rickshaw</p>
                </div>
                <div className="ml-auto bg-green-50 text-green-700 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-green-200">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping shrink-0" /> Live Feed
                </div>
              </div>

              {/* Grid telemetry readings */}
              <div className="grid grid-cols-2 gap-4 relative z-10">
                
                {/* Simulated Live Speedometer */}
                <div className="bg-gray-950 text-white rounded-3xl p-5 border border-white/5 shadow-md flex flex-col justify-between h-32 relative overflow-hidden group">
                  <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                    <Gauge size={16} className="text-tascki-yellow stroke-[2.5]" /> 
                    <span>Live Speed</span>
                  </div>
                  <div className="text-4xl font-black text-white font-mono flex items-baseline">
                    <motion.span>{speed}</motion.span>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider ml-1">km/h</span>
                  </div>
                  <div className="absolute -right-6 -bottom-6 text-white/5 transform rotate-12 pointer-events-none group-hover:text-white/10 transition-colors">
                    <Gauge size={80} />
                  </div>
                </div>
                
                {/* Live ETA */}
                <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
                  <div className="flex items-center gap-2 text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                    <Clock size={16} className="text-tascki-yellow stroke-[2.5]" /> 
                    <span>ETA Remaining</span>
                  </div>
                  <div className="text-4xl font-black text-gray-900 font-mono flex items-baseline">
                    <span>4</span>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider ml-1">Min</span>
                  </div>
                  <div className="absolute -right-6 -bottom-6 text-black/5 transform rotate-12 pointer-events-none group-hover:text-black/10 transition-colors">
                    <Clock size={80} />
                  </div>
                </div>
                
                {/* Distance Progress */}
                <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100 col-span-2 flex flex-col justify-between shadow-sm relative overflow-hidden">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                      <MapPin size={16} className="text-tascki-yellow stroke-[2.5]" /> 
                      <span>Distance Left</span>
                    </div>
                    <span className="text-xs font-bold text-gray-900">1.2 km</span>
                  </div>
                  
                  {/* Progress Line */}
                  <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden shadow-inner border border-gray-100 relative">
                    <motion.div 
                      initial={{ width: "20%" }}
                      animate={{ width: "80%" }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className="h-full bg-gradient-to-r from-tascki-yellow to-amber-500 rounded-full relative" 
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[size:10px_10px]" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rotating surrounding accent indicators */}
            <div className="absolute -inset-8 border-[6px] border-yellow-500/5 rounded-full pointer-events-none -z-10" />
            <div className="absolute -inset-12 border border-yellow-500/10 rounded-full animate-[spin_60s_linear_infinite] border-dashed pointer-events-none -z-10" />
          </motion.div>

          {/* Right Panel: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-black uppercase tracking-wider rounded-full">
              GPS Telemetry
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900 tracking-tight">
              Know exactly where<br />
              <span className="text-tascki-yellow relative inline-block">your ride is.<span className="absolute bottom-1 left-0 w-full h-[6px] bg-black/5 -z-10 rounded-full" /></span>
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed font-semibold">
              Our advanced telemetry system updates location, velocity, and arrival predictions instantly. Share status links with family for a worry-free ride.
            </p>
            
            <div className="space-y-3">
              {[
                { icon: Share2, text: 'Share live GPS route with contacts' },
                { icon: ShieldCheck, text: 'Detailed driver license and background logs' },
                { icon: Gauge, text: 'Live velocity and route mismatch triggers' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100/70 p-4 rounded-2xl border border-gray-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center shrink-0 border border-yellow-100">
                    <item.icon className="w-4 h-4 text-tascki-yellow stroke-[2.5]" />
                  </div>
                  <span className="text-gray-700 font-extrabold text-sm tracking-wide">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LiveTracking;
