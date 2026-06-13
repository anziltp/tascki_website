import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, ArrowRight, ShieldCheck } from 'lucide-react';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('auto');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');

  const bookingTabs = [
    { id: 'auto', label: 'Auto', desc: 'Fast local transit' },
    { id: 'taxi', label: 'Taxi', desc: 'Daily comfort sedan' },
    { id: 'outstation', label: 'Outstation', desc: 'Long distance SUV' },
  ];

  // Container variants to stagger text elements after the taxi sweeps by
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 }
    }
  };

  return (
    <div id="ride" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-gradient-to-br from-yellow-50/50 via-white to-gray-50/30">
      {/* Decorative City Grid Pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
      
      {/* Skewed Taxi Stripe Accent */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-tascki-yellow/15 to-transparent skew-x-12 translate-x-1/4 rounded-bl-[120px] pointer-events-none" />

      {/* Page-Load Entrance Taxi: sweeps from left to right and exits/docks */}
      <motion.div
        initial={{ x: '-150vw', rotate: 0 }}
        animate={{ 
          x: ['-150vw', '10vw', '110vw'], // Sweeps across, pauses slightly, and exits
          rotate: [0, -3, 3, 0]
        }}
        transition={{
          duration: 3.5,
          times: [0, 0.45, 1],
          ease: 'easeInOut'
        }}
        className="absolute top-1/3 left-0 opacity-[0.12] pointer-events-none z-20"
      >
        <Car size={320} className="text-tascki-yellow stroke-[1.5]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Panel: Staggered Texts & Booking HUD */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tascki-yellow text-black font-extrabold text-xs tracking-wider uppercase shadow-md shadow-tascki-yellow/20"
            >
              <ShieldCheck size={14} className="stroke-[2.5]" />
              #1 Safe Ride Booking Platform
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-none text-gray-900 tracking-tight"
            >
              Ride <span className="text-tascki-yellow relative inline-block">Smarter<span className="absolute bottom-1 left-0 w-full h-[8px] bg-black/10 -z-10 rounded-full" /></span><br />
              with TASCKI
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-xl leading-relaxed font-semibold"
            >
              Book rides instantly with live mapping, transparent flat rates, and verified driver partners.
            </motion.p>
            
            {/* Interactive Taxi Booking Widget */}
            <motion.div 
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-md border border-gray-100 p-6 rounded-3xl shadow-xl max-w-lg relative"
            >
              {/* Chevron Stripe border details */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-tascki-yellow via-yellow-400 to-tascki-yellow rounded-t-3xl" />
              
              {/* Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {bookingTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`p-3 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-black text-tascki-yellow shadow-lg shadow-black/10 scale-105 font-bold'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100 font-semibold'
                    }`}
                  >
                    <Car size={18} className={activeTab === tab.id ? 'text-tascki-yellow' : 'text-gray-400'} />
                    <span className="text-xs">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Form Input fields */}
              <div className="space-y-4">
                <div className="relative flex items-center bg-gray-50 rounded-2xl border border-gray-100 p-3 hover:border-tascki-yellow/50 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Pickup Location</p>
                    <input 
                      type="text" 
                      placeholder="Enter pickup address..." 
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full bg-transparent border-0 p-0 text-sm font-bold text-gray-900 placeholder-gray-400 focus:ring-0 outline-none"
                    />
                  </div>
                </div>

                <div className="relative flex items-center bg-gray-50 rounded-2xl border border-gray-100 p-3 hover:border-tascki-yellow/50 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-tascki-yellow shrink-0">
                    <MapPin size={16} className="text-tascki-yellow stroke-[2.5]" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Dropoff Destination</p>
                    <input 
                      type="text" 
                      placeholder="Enter destination address..." 
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      className="w-full bg-transparent border-0 p-0 text-sm font-bold text-gray-900 placeholder-gray-400 focus:ring-0 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Booking Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-gradient-to-r from-tascki-yellow to-amber-500 text-black py-4 rounded-2xl font-black text-base shadow-lg hover:shadow-tascki-yellow/30 flex justify-center items-center gap-2 cursor-pointer transition-all duration-300"
              >
                <span>Book Instant {bookingTabs.find(t => t.id === activeTab)?.label}</span>
                <ArrowRight size={18} className="stroke-[3]" />
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Right Panel: Simulated Phone Map HUD & Docked Entrance Taxi */}
          <div className="lg:col-span-5 relative h-[600px] flex justify-center items-center">
            {/* Ambient Background Glow Orb */}
            <div className="absolute w-[450px] h-[450px] bg-tascki-yellow/10 rounded-full blur-[80px] -z-10" />

            {/* Smartphone Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 80 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 50, damping: 14, delay: 0.6 }}
              className="relative w-[310px] h-[610px] bg-black border-[10px] border-gray-900 rounded-[3.2rem] p-3.5 shadow-2xl overflow-hidden z-10"
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black z-20 rounded-full flex items-center justify-center">
                {/* Speaker Grill */}
                <div className="w-10 h-1 bg-gray-800 rounded-full" />
              </div>
              
              {/* Map HUD Simulation */}
              <div className="absolute inset-0 bg-[#0b0f19] select-none">
                {/* Grid Lines */}
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                
                {/* Pulsing Target Radar Circles */}
                <div className="absolute top-[150px] left-[55px] -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inline-flex h-12 w-12 rounded-full bg-green-500/20 animate-ping" />
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white relative z-10 flex items-center justify-center shadow-lg" />
                </div>
                
                <div className="absolute top-[380px] left-[225px] -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inline-flex h-16 w-16 rounded-full bg-tascki-yellow/30 animate-ping" />
                  <div className="w-6 h-6 bg-tascki-yellow text-black rounded-full border-2 border-white relative z-10 flex items-center justify-center shadow-lg">
                    <MapPin size={10} className="stroke-[3]" />
                  </div>
                </div>

                {/* Pulsating Glowing Route Line */}
                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d="M 55,150 C 120,200 140,300 225,380"
                    fill="none"
                    stroke="rgba(255, 192, 0, 0.2)"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M 55,150 C 120,200 140,300 225,380"
                    fill="none"
                    stroke="#ffc000"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="6, 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                </svg>

                {/* Simulated taxi driving inside HUD map */}
                <motion.div
                  animate={{ 
                    x: [35, 100, 205],
                    y: [135, 245, 365],
                    rotate: [45, 60, 50]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 left-0 bg-black border border-amber-500/50 p-1.5 rounded-full shadow-[0_0_15px_rgba(255,192,0,0.5)] z-20"
                >
                  <Car size={16} className="text-tascki-yellow" />
                </motion.div>

                {/* Booking HUD Overlay on Phone */}
                <div className="absolute bottom-4 inset-x-4 bg-gray-950/90 backdrop-blur-md p-4 rounded-3xl border border-white/10 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
                  <div className="h-1 w-10 bg-gray-700 rounded-full mx-auto mb-4" />
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-tascki-yellow/10 flex items-center justify-center shrink-0">
                          <Car size={14} className="text-tascki-yellow" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Assigned Ride</p>
                          <p className="text-xs font-black text-white">MH-12 Auto Rickshaw</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">ETA</p>
                        <p className="text-xs font-black text-tascki-yellow">2 Min</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Entrance Taxi that drives in from the left and parks next to the phone mockup */}
            <motion.div 
              initial={{ x: '-200%', opacity: 0, rotate: -5 }}
              animate={{ x: 0, opacity: 1, rotate: [0, 2, -2, 0] }}
              transition={{ 
                type: 'spring', 
                stiffness: 45, 
                damping: 12, 
                delay: 1.0 // Settle right after the text finishes its spring reveal
              }}
              whileHover={{ scale: 1.05 }}
              className="absolute top-24 -right-8 bg-black/90 backdrop-blur-md border border-tascki-yellow/30 p-4 rounded-2xl flex items-center gap-3 z-20 shadow-xl cursor-default"
            >
              <div className="bg-tascki-yellow p-2 rounded-xl text-black animate-pulse">
                <Car size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Driver Status</p>
                <p className="text-sm font-black text-white">Arriving Shortly</p>
              </div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
