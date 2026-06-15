import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, ArrowRight, ShieldCheck } from 'lucide-react';
import ThreeHeroAnimation from './ThreeHeroAnimation';


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

  const BookingWidget = () => (
    <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-6 rounded-[2rem] shadow-xl max-w-lg relative">
      {/* Chevron Yellow top stripe */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-tascki-yellow via-yellow-400 to-tascki-yellow rounded-t-[2rem]" />
      
      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {bookingTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-3 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-black text-tascki-yellow shadow-lg shadow-black/10 scale-105 font-black'
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100/80 border border-slate-200/50 font-semibold'
            }`}
          >
            <Car size={18} className={activeTab === tab.id ? 'text-tascki-yellow' : 'text-slate-400'} />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Form Input fields */}
      <div className="space-y-4">
        <div className="relative flex items-center bg-slate-50 rounded-2xl border border-slate-200/50 p-3 hover:border-tascki-yellow/60 transition-all group">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Pickup Location</p>
            <input 
              type="text" 
              placeholder="Enter pickup address..." 
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-sm font-bold text-slate-900 placeholder-slate-400 focus:ring-0 outline-none"
            />
          </div>
        </div>

        <div className="relative flex items-center bg-slate-50 rounded-2xl border border-slate-200/50 p-3 hover:border-tascki-yellow/60 transition-all group">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-tascki-yellow shrink-0">
            <MapPin size={16} className="text-tascki-yellow stroke-[2.5]" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Dropoff Destination</p>
            <input 
              type="text" 
              placeholder="Enter destination address..." 
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-sm font-bold text-slate-900 placeholder-slate-400 focus:ring-0 outline-none"
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
    </div>
  );

  return (
    <>
      <div id="ride" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      {/* Cinematic Full-Width 3D Animation Background */}
      <ThreeHeroAnimation />

      {/* Subtle overlay gradient to ensure readability at the left edge without masking the 3D scene */}
      <div className="absolute inset-0 lg:inset-y-0 lg:left-0 w-full lg:w-1/2 bg-gradient-to-b lg:bg-gradient-to-r from-white/70 via-white/20 to-transparent lg:from-white/65 lg:via-white/20 lg:to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Panel: Glassmorphic Texts & Booking HUD */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 space-y-8"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tascki-yellow text-black font-extrabold text-xs tracking-wider uppercase shadow-md shadow-tascki-yellow/30"
            >
              <ShieldCheck size={14} className="stroke-[2.5]" />
              #1 Safe Ride Booking Platform
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-none text-slate-900 tracking-tight"
            >
              Ride <span className="text-tascki-yellow relative inline-block">Smarter<span className="absolute bottom-1 left-0 w-full h-[8px] bg-black/5 -z-10 rounded-full" /></span><br />
              with TASCKI
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-slate-600 max-w-xl leading-relaxed font-semibold"
            >
              Book rides instantly with live mapping, transparent flat rates, and verified driver partners.
            </motion.p>
            
            {/* Desktop Booking Widget (Hidden on mobile to show 3D animation clearly) */}
            <motion.div 
              variants={itemVariants}
              className="hidden lg:block relative z-20"
            >
              <BookingWidget />
            </motion.div>
            
            {/* Scroll down indicator on mobile viewports */}
            <motion.div
              variants={itemVariants}
              className="lg:hidden flex items-center gap-2.5 text-xs font-black uppercase tracking-widest text-slate-500 animate-bounce mt-4"
            >
              <span>Scroll down to book</span>
              <ArrowRight size={14} className="rotate-90 stroke-[2.5]" />
            </motion.div>
          </motion.div>
          
          {/* Right Panel: Left empty to frame the cinematic background animation on desktop */}
          <div className="hidden lg:flex lg:col-span-7 h-[600px] w-full justify-center items-center pointer-events-none" />

        </div>
      </div>

      {/* Floating Cinematic HUD Overlay */}
      <div className="absolute bottom-10 right-10 bg-white/80 backdrop-blur-md px-4.5 py-3 rounded-2xl border border-slate-200/60 shadow-xl z-20 max-w-[240px] hidden lg:block select-none pointer-events-none">
        <span className="text-[10px] text-tascki-yellow font-black uppercase block tracking-widest mb-1 animate-pulse">Cinematic 3D Simulation</span>
        <p className="text-xs font-semibold text-slate-600 leading-snug">Watch the taxi arrive, board the passenger, and drive through the daytime city skyline.</p>
      </div>

    </div>

    {/* Mobile Booking Section (Visible only below the fold on mobile screens) */}
    <div className="lg:hidden max-w-md mx-auto px-4 pb-16 pt-4 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
      >
        <BookingWidget />
      </motion.div>
    </div>
    </>
  );
};

export default Hero;
