import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TireIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-[2.5]">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3.5" fill="currentColor" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
  </svg>
);

const featureList = [
  "OTP Login", "Easy Registration", "Pickup Selection", "Destination Search",
  "Landmark Search", "Airport Search", "Railway Station Search", "Bus Stand Search",
  "Tourist Destination Search", "Auto Booking", "Taxi Booking", "7-Seater Booking",
  "Fare Estimation", "Distance Calculation", "ETA Prediction", "Live Driver Tracking",
  "Driver Information", "Vehicle Information", "Speed Tracking", "Ride History",
  "Wallet System", "Cash Payment", "UPI Payment", "QR Payment",
  "Ratings & Reviews", "Feedback System", "Issue Reporting"
];

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-24 relative overflow-hidden bg-gray-50 border-t border-gray-100">
      {/* Decorative tyre marks background accent */}
      <div className="absolute top-1/2 left-0 right-0 h-40 bg-gradient-to-r from-amber-400/5 via-transparent to-amber-400/5 rotate-3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-extrabold text-xs uppercase tracking-wider mb-4">
            All-In-One Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 tracking-tight">Premium <span className="text-tascki-yellow">Features</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-semibold">Everything you need for a perfect ride experience, packed into one powerful application.</p>
        </div>

        {/* Feature Grid with Traffic Merging Entrance Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                type: 'spring', 
                stiffness: 120, 
                damping: 20, 
                delay: (index % 3) * 0.08 
              }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 8px 24px rgba(255,192,0,0.12)',
                borderColor: 'rgba(255,192,0,0.4)'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-md border border-gray-100 cursor-default transition-all"
            >
              {/* Spinning Tire Icon on Hover */}
              <motion.div
                animate={hoveredIndex === index ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-tascki-yellow shrink-0 p-1 bg-yellow-50 rounded-xl"
              >
                <TireIcon />
              </motion.div>
              
              <span className="text-gray-800 font-extrabold text-base tracking-wide">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
