import React from 'react';
import { motion } from 'framer-motion';
import { History, Star, ArrowRight, Car } from 'lucide-react';

const rides = [
  { id: 1, date: 'Today, 2:30 PM', vehicle: 'Taxi', from: 'Airport T2', to: 'City Center', fare: '₹450', rating: 5 },
  { id: 2, date: 'Yesterday, 9:15 AM', vehicle: 'Auto', from: 'Home Address', to: 'Office Space', fare: '₹85', rating: 4 },
  { id: 3, date: 'Mon, 10:00 AM', vehicle: '7-Seater', from: 'Central Mall', to: 'South Park', fare: '₹620', rating: 5 },
];

const MiniCarAnimation = () => {
  return (
    <div className="relative flex items-center justify-between w-20 h-6 px-1 shrink-0">
      <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
      <div className="relative w-full mx-1.5 h-1.5 flex items-center">
        {/* Dashed Track */}
        <div className="absolute inset-x-0 h-[1.5px] border-t border-dashed border-gray-300" />
        
        {/* Driving mini taxi */}
        <motion.div
          initial={{ left: '0%' }}
          whileInView={{ left: '78%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="absolute -mt-2 z-10"
        >
          <Car size={11} className="text-tascki-yellow rotate-90 stroke-[2.5]" />
        </motion.div>
      </div>
      <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
    </div>
  );
};

const RideHistory = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-tascki-yellow/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Trip History
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900 tracking-tight">
              All your journeys,<br />
              <span className="text-tascki-yellow relative inline-block">in one place.<span className="absolute bottom-1 left-0 w-full h-[6px] bg-black/5 -z-10 rounded-full" /></span>
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed font-semibold">
              Keep track of all your past rides, access detailed digital receipts, and rate your driver partners. Everything is securely stored in your personal passenger dashboard.
            </p>
            
            <button className="flex items-center gap-2 bg-black text-tascki-yellow px-8 py-4 rounded-2xl font-black text-sm hover:bg-gray-900 hover:scale-103 transition-all shadow-lg cursor-pointer">
              <span>View Full History</span> 
              <ArrowRight size={18} className="stroke-[3]" />
            </button>
          </motion.div>

          {/* Right Panel: Recent Rides Stack */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 rounded-[2.5rem] p-6 border border-gray-100 shadow-xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-tascki-yellow/10 blur-[40px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 border-b border-gray-200/50 pb-4">
              <div className="bg-tascki-yellow p-2 rounded-xl text-black">
                <History className="stroke-[2.5]" size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-wide">Recent Rides</h3>
            </div>
            
            <div className="space-y-4 relative z-10">
              {rides.map((ride) => (
                <div key={ride.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-lg hover:border-yellow-100 transition-all">
                  <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-3">
                    <div>
                      <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1 font-mono">{ride.date}</p>
                      <p className="font-black text-black text-lg uppercase tracking-wide">{ride.vehicle}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-black text-xl font-mono">{ride.fare}</p>
                      <div className="flex items-center gap-1 justify-end mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} className={i < ride.rating ? "fill-tascki-yellow text-tascki-yellow" : "fill-gray-200 text-gray-200"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Detailed Route with animate-on-scroll mini taxi */}
                  <div className="flex items-center justify-between text-xs font-bold bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                    <div className="flex-1 truncate text-left pr-2">
                      <p className="text-[8px] text-gray-400 font-extrabold uppercase">Pickup</p>
                      <p className="text-gray-900 font-extrabold truncate">{ride.from}</p>
                    </div>
                    
                    <MiniCarAnimation />
                    
                    <div className="flex-1 truncate text-right pl-2">
                      <p className="text-[8px] text-gray-400 font-extrabold uppercase">Dropoff</p>
                      <p className="text-gray-900 font-extrabold truncate">{ride.to}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default RideHistory;
