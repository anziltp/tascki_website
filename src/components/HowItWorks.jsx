import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Car } from 'lucide-react';

const steps = [
  { num: '01', title: 'Choose Pickup', desc: 'Select your exact pickup location on the map or type it in.' },
  { num: '02', title: 'Enter Destination', desc: 'Search for airports, stations, or any local landmark.' },
  { num: '03', title: 'Choose Vehicle', desc: 'Select from Auto, Taxi, or a 7-Seater depending on your need.' },
  { num: '04', title: 'View Fare Estimate', desc: 'Get transparent upfront pricing before you confirm.' },
  { num: '05', title: 'Confirm Ride', desc: 'Tap to book and get matched with the nearest driver instantly.' },
  { num: '06', title: 'Track Live', desc: 'Follow your driver on the live map until they arrive.' }
];

const HowItWorks = () => {
  const containerRef = useRef(null);
  
  // Track scroll within this specific timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Transform scroll progress to drive the taxi down the highway track
  const taxiY = useTransform(scrollYProgress, [0, 0.98], ['0%', '98%']);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-white">
      {/* City skyline silhouette in background */}
      <div className="absolute bottom-0 inset-x-0 h-32 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-extrabold text-xs uppercase tracking-wider mb-4">
            Step-By-Step
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 tracking-tight">How <span className="text-tascki-yellow">TASCKI</span> Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-semibold">Your journey begins with just a few simple taps.</p>
        </div>

        <div className="relative">
          {/* Highway timeline divider for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-6 bg-gray-900 transform -translate-x-1/2 rounded-full border border-gray-800 shadow-inner overflow-hidden">
            {/* Dashed Road Lanes */}
            <div className="w-full h-full border-l border-dashed border-tascki-yellow/60 mx-auto w-0.5 opacity-80" />
            
            {/* Highlighted active route road */}
            <motion.div 
              style={{ height: taxiY }}
              className="absolute top-0 left-0 right-0 bg-tascki-yellow/30 pointer-events-none"
            />
          </div>

          {/* Driving Taxi along scroll path */}
          <motion.div 
            style={{ top: taxiY }}
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 -mt-4 w-9 h-9 rounded-full bg-tascki-yellow border-2 border-black items-center justify-center shadow-[0_4px_15px_rgba(255,192,0,0.5)] z-20 cursor-pointer"
          >
            <Car size={16} className="text-black rotate-180 stroke-[2.5]" />
          </motion.div>
          
          <div className="space-y-16 md:space-y-0 relative">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Step Content */}
                <div className="flex-1 w-full md:px-12 py-4">
                  <motion.div 
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                    className={`bg-white p-8 rounded-3xl border border-gray-100 shadow-md relative hover:shadow-xl hover:border-yellow-100 transition-all ${
                      index % 2 === 0 ? 'md:text-left' : 'md:text-right text-left'
                    }`}
                  >
                    <span className="text-tascki-yellow text-7xl font-black opacity-[0.08] absolute top-4 right-6 pointer-events-none select-none font-mono">
                      {step.num}
                    </span>
                    
                    <h3 className="text-2xl font-black text-gray-900 mb-2 relative z-10 tracking-wide">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-500 relative z-10 font-semibold leading-relaxed text-sm">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>
                
                {/* Visual highway sign node in the center */}
                <div className="hidden md:flex justify-center items-center w-12 h-12 relative z-10">
                  <div className="w-5 h-5 bg-black rounded-full border-4 border-tascki-yellow shadow-md" />
                </div>
                
                {/* Spacer side column */}
                <div className="flex-1 w-full md:px-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
