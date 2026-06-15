import React from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, Banknote, Headset, ArrowRight } from 'lucide-react';

const DriverPartner = () => {
  return (
    <section id="drive" className="py-24 relative bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-tascki-yellow rounded-[2.5rem] overflow-hidden relative shadow-2xl border border-amber-400/30">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Column content */}
            <div className="p-6 sm:p-10 md:p-16 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-black/10 text-black font-extrabold text-xs uppercase tracking-wider">
                Partner Program
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tight">
                Drive with TASCKI
              </h2>
              
              <p className="text-black/80 text-lg font-bold leading-relaxed">
                Join our fleet of professional driver partners. Be your own boss, set your own working hours, and earn daily payments on your own terms.
              </p>
              
              <div className="space-y-4 pt-2">
                {[
                  { icon: CalendarClock, text: 'Flexible working hours' },
                  { icon: Banknote, text: 'Higher earnings & fast daily payouts' },
                  { icon: Headset, text: '24/7 dedicated driver help desk' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-950 font-black text-base">
                    <div className="bg-slate-900 p-2.5 rounded-xl shadow-md border border-slate-950/20">
                      <item.icon size={18} className="text-tascki-yellow stroke-[2.5]" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <motion.button 
                  whileHover={{ scale: 1.03, boxShadow: '0 12px 30px rgba(0,0,0,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-slate-900 text-tascki-yellow px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all shadow-md font-mono"
                >
                  <span>Become a Driver Today</span>
                  <ArrowRight size={14} className="stroke-[3]" />
                </motion.button>
              </div>
            </div>
            
            {/* Right Column: Sliding Car Mockup with headlight flash pulses */}
            <div className="hidden md:block h-full relative self-stretch overflow-hidden min-h-[450px]">
              <motion.div
                initial={{ opacity: 0, x: 180 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, type: 'spring', stiffness: 60 }}
                className="w-full h-full absolute inset-0"
              >
                {/* Driver image */}
                <img 
                  src="https://images.unsplash.com/photo-1549317336-206569e8475c?auto=format&fit=crop&q=80" 
                  alt="Driver" 
                  className="w-full h-full object-cover rounded-l-[2rem] shadow-[-10px_0_30px_rgba(0,0,0,0.15)] border-l-4 border-black/10" 
                />
                
                {/* Floating telemetry dashboard stat on the driver photo */}
                <div className="absolute bottom-6 right-6 bg-slate-900/95 backdrop-blur-md px-4.5 py-3 rounded-2xl border border-white/10 text-white z-20 shadow-2xl pointer-events-none select-none">
                  <span className="text-[8px] text-tascki-yellow font-extrabold uppercase tracking-widest block font-mono mb-0.5">Guaranteed Payouts</span>
                  <span className="text-sm font-black tracking-wide uppercase">Earn up to ₹35,000/mo</span>
                </div>

                {/* Simulated pulsing headlights flashing toward the copy column */}
                <div className="absolute top-[38%] left-[-35px] w-24 h-24 bg-tascki-yellow/40 rounded-full blur-xl headlight-glow pointer-events-none" />
                <div className="absolute top-[52%] left-[-35px] w-24 h-24 bg-tascki-yellow/40 rounded-full blur-xl headlight-glow pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriverPartner;
