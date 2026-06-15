import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, Car, KeyRound, ArrowRight } from 'lucide-react';

const TireIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-[2.5]">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3.5" fill="currentColor" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);

const featureCategories = [
  {
    title: "Access & Account",
    icon: KeyRound,
    desc: "Seamless OTP entry and dashboard profile management.",
    features: ["OTP Login Authentication", "Easy Profile Registration", "Wallet Balance System", "Dashboard Ride History"]
  },
  {
    title: "Smart Navigation",
    icon: MapPin,
    desc: "Locate and route anywhere instantly via integrated maps.",
    features: ["Pickup Pin Selection", "Dynamic Destination Search", "Landmark & POI Finder", "Airports & Railway Stations"]
  },
  {
    title: "Instant Dispatch",
    icon: Car,
    desc: "Select your ride and see flat upfront pricing.",
    features: ["Local Auto Rickshaws", "Comfort Sedans (Taxi)", "Spacious 7-Seater SUVs", "Upfront Fare & ETA Estimates"]
  },
  {
    title: "Telemetry & Safety",
    icon: Shield,
    desc: "Stay secure with live tracking feeds and direct support.",
    features: ["Live Driver Tracking", "Vehicle Verification Logs", "Speedometer Telemetry", "Ratings & Issue Reports"]
  }
];

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white border-t border-slate-200/60">
      {/* Decorative tyre marks background accent */}
      <div className="absolute top-1/2 left-0 right-0 h-40 bg-gradient-to-r from-amber-400/5 via-transparent to-amber-400/5 rotate-3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-extrabold text-xs uppercase tracking-wider mb-4 font-mono">
            All-In-One Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 tracking-tight">Premium <span className="text-tascki-yellow">Features</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-semibold">Everything you need for a perfect ride experience, packed into one powerful application.</p>
        </div>

        {/* Feature Grid with Categorized Visual Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureCategories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="bg-white rounded-[2rem] p-6 border border-slate-200/60 shadow-lg hover:shadow-2xl hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-default group"
            >
              <div>
                {/* Heading Category with Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-yellow-50 text-tascki-yellow p-3 rounded-2xl border border-yellow-100 shrink-0 group-hover:bg-tascki-yellow group-hover:text-black transition-colors duration-300">
                    <cat.icon size={20} className="stroke-[2.5]" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 tracking-wide leading-tight uppercase group-hover:text-tascki-yellow transition-colors">{cat.title}</h3>
                </div>
                
                <p className="text-xs text-gray-400 font-semibold mb-6 leading-relaxed border-b border-gray-50 pb-4">
                  {cat.desc}
                </p>

                {/* Sub Features bullet list */}
                <ul className="space-y-3">
                  {cat.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                      <span className="text-tascki-yellow flex-shrink-0">
                        <TireIcon />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover indicator link */}
              <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-400 group-hover:text-tascki-yellow transition-colors">
                <span>View Documentation</span>
                <ArrowRight size={12} className="stroke-[3] group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
