import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TireTracks = () => (
  <svg className="w-full h-6 absolute bottom-12 left-0 right-0 opacity-40 text-black pointer-events-none" viewBox="0 0 100 10" preserveAspectRatio="none">
    <path
      d="M0,2 L100,2 M0,8 L100,8 M2,2 L6,8 M12,2 L16,8 M22,2 L26,8 M32,2 L36,8 M42,2 L46,8 M52,2 L56,8 M62,2 L66,8 M72,2 L76,8 M82,2 L86,8 M92,2 L96,8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const vehicles = [
  {
    name: 'Auto Rickshaw',
    desc: 'Quick and affordable for short local trips.',
    img: 'https://images.unsplash.com/photo-1590494490196-84d4da9d073d?auto=format&fit=crop&q=80',
    capacity: '3',
  },
  {
    name: 'Taxi Car',
    desc: 'Comfortable sedans for your daily commute.',
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80',
    capacity: '4',
  },
  {
    name: '7-Seater',
    desc: 'Spacious SUVs for family or group travel.',
    img: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80',
    capacity: '6',
  }
];

const Vehicles = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-24 relative overflow-hidden bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-extrabold text-xs uppercase tracking-wider mb-4">
            Our Fleet
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 tracking-tight">Choose Your <span className="text-tascki-yellow">Ride</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-semibold font-medium">A vehicle for every occasion, budget, and group size.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative border border-gray-100 cursor-pointer ${
                hoveredIndex === index ? 'engine-rumble' : ''
              }`}
            >
              {/* Card visual shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10 pointer-events-none" />
              
              {/* Vehicle Image */}
              <div className="h-72 overflow-hidden relative">
                <img src={vehicle.img} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              
              {/* Content Panel */}
              <div className="relative z-20 -mt-24 p-6 pt-12">
                <div className="bg-tascki-yellow text-black text-xs font-black px-4 py-1.5 rounded-full inline-block mb-3 shadow-md">
                  Up to {vehicle.capacity} Seats
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2 tracking-wide uppercase">{vehicle.name}</h3>
                <p className="text-gray-300 mb-8 font-semibold text-sm leading-relaxed">{vehicle.desc}</p>
                
                {/* Tire Track mark appearing on hover */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 0.25, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-x-0"
                    >
                      <TireTracks />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-wider text-xs hover:bg-tascki-yellow transition-colors shadow-md relative z-30">
                  Select {vehicle.name}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vehicles;
