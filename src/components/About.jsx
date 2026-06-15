import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Smartphone, ArrowRight, Car } from 'lucide-react';

const AnimatedTaxiBrake = () => {
  return (
    <div className="relative w-full h-44 overflow-hidden bg-slate-900 rounded-[2rem] p-6 flex flex-col justify-between shadow-2xl border border-white/5 mt-8">
      {/* HUD Header */}
      <div className="flex justify-between items-center text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-widest">
        <span>Dispatch Telemetry Simulator</span>
        <span className="text-tascki-yellow flex items-center gap-1.5 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-tascki-yellow" /> System Online
        </span>
      </div>

      {/* Road Lane */}
      <div className="relative h-4 w-full flex items-center">
        {/* Ground road shadow */}
        <div className="absolute inset-x-0 h-1.5 bg-slate-800 rounded-full" />
        {/* Dashed highway lines */}
        <div className="absolute inset-x-0 h-[2px] border-t border-dashed border-white/20" />
      </div>
      
      {/* The Taxi Container */}
      <motion.div
        initial={{ x: '-150%', rotate: 0 }}
        whileInView={{ 
          x: ['-150%', '55%', '45%'], // Over-shoots, then brakes and bounces back
          rotate: [0, -4, 0], // Dip/tilt for deceleration, then levels
        }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 1.6,
          times: [0, 0.75, 1],
          ease: 'easeOut'
        }}
        className="absolute bottom-6 left-0 flex flex-col items-center z-10"
      >
        {/* Taxi Cabin Vector */}
        <div className="bg-tascki-yellow text-slate-950 px-4 py-2 rounded-2xl border-2 border-slate-950 font-black flex items-center gap-1.5 shadow-lg relative">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-950 text-[8px] font-bold text-tascki-yellow px-1.5 py-0.5 rounded border border-tascki-yellow">
            TAXI
          </div>
          <Car size={18} className="stroke-[2.5]" />
          <span className="text-[10px] font-extrabold font-mono">MATCH</span>
        </div>
        
        {/* Spinning Wheels */}
        <div className="flex justify-between w-14 -mt-1 px-1">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 0.4, repeat: 3, ease: 'linear' }}
            className="w-3.5 h-3.5 bg-slate-950 border-2 border-white rounded-full shadow-sm"
          />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 0.4, repeat: 3, ease: 'linear' }}
            className="w-3.5 h-3.5 bg-slate-950 border-2 border-white rounded-full shadow-sm"
          />
        </div>
      </motion.div>
      
      {/* Brake Smoke Particles */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ 
          opacity: [0, 0.8, 0], 
          scale: [0.5, 1.6, 2.2],
          x: [-10, 15, 30] 
        }}
        viewport={{ once: true }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute bottom-5 left-[32%] flex gap-1 z-0"
      >
        <div className="w-5 h-5 bg-white/10 rounded-full blur-[2px]" />
        <div className="w-4 h-4 bg-white/5 rounded-full blur-[1.5px]" />
        <div className="w-3 h-3 bg-white/2 rounded-full blur-[1px]" />
      </motion.div>

      {/* Dispatch HUD footer info */}
      <div className="flex justify-between items-center text-[10px] font-mono font-bold">
        <span className="text-slate-400">Match Speed: <span className="text-green-400">0.27s</span></span>
        <span className="text-slate-400">Braking Distance: <span className="text-green-400">0.4m</span></span>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-extrabold text-xs uppercase tracking-wider mb-6 font-mono">
              ABOUT TASCKI
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-gray-900 tracking-tight">
              Built for Modern <br />
              <span className="text-tascki-yellow">Transportation</span>
            </h2>
            
            <p className="text-gray-600 text-base mb-8 leading-relaxed font-semibold">
              TASCKI is revolutionizing local commuting. We blend advanced dispatch matching tech with verified local drivers to deliver lightning-fast, highly secure booking experiences.
            </p>
            
            {/* Features lists */}
            <div className="space-y-4">
              {[
                { icon: Shield, title: 'Safe & Secure', desc: 'Verified drivers and live GPS tracking for passenger safety.' },
                { icon: Zap, title: 'Lightning Fast', desc: 'Algorithm matches matching taxi driver in less than 30 seconds.' },
                { icon: Smartphone, title: 'Smart Platform', desc: 'Predictive fare and route mapping.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200/50 bg-slate-50/50 hover:border-amber-400/40 transition-all hover:bg-white hover:shadow-lg hover:shadow-slate-100/50">
                  <div className="bg-white p-3 rounded-xl shadow-sm shrink-0 border border-slate-150">
                    <item.icon className="text-tascki-yellow stroke-[2.5]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-1 text-base tracking-wide">{item.title}</h3>
                    <p className="text-gray-500 text-xs font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Viewport Triggered Taxi Brake Animation */}
            <AnimatedTaxiBrake />
            
            <button className="mt-8 flex items-center gap-2 text-tascki-yellow font-black hover:gap-4 transition-all uppercase tracking-widest text-xs font-mono">
              <span>Learn more about our technology</span> 
              <ArrowRight size={16} className="stroke-[3]" />
            </button>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-tascki-yellow/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative glassmorphism rounded-[2.5rem] p-8 border border-white/60 shadow-2xl bg-white/40">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                  <div className="bg-gray-100 rounded-3xl h-40 overflow-hidden relative group shadow-lg border border-white">
                    <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80" alt="Taxi" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="bg-slate-900 text-tascki-yellow rounded-[2rem] h-32 p-5 flex flex-col justify-between shadow-xl relative border border-white/5">
                    <span className="font-black text-xl leading-tight">Smart<br/>Matching</span>
                    <span className="text-slate-400 font-extrabold text-[10px] uppercase tracking-widest font-mono">AI Dispatch</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-[2rem] h-32 p-4 flex flex-col justify-center items-center text-center shadow-lg border border-slate-200/50">
                    <span className="text-4xl font-black text-slate-950 mb-1">24/7</span>
                    <span className="text-slate-500 text-[10px] font-extrabold uppercase tracking-widest font-mono">Support Core</span>
                  </div>
                  <div className="bg-gray-100 rounded-3xl h-48 overflow-hidden relative group shadow-lg border border-white">
                    <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80" alt="Driving" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
