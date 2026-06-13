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
            <div className="p-10 md:p-16 space-y-6">
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
                  <div key={i} className="flex items-center gap-4 text-black font-extrabold text-base">
                    <div className="bg-white p-2 rounded-xl shadow-md border border-black/5">
                      <item.icon size={20} className="text-tascki-yellow stroke-[2.5]" fill="#000" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <motion.button 
                  whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-black text-tascki-yellow px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-md"
                >
                  <span>Become a Driver Today</span>
                  <ArrowRight size={16} className="stroke-[3]" />
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
