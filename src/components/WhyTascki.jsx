import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap, Map, HeadphonesIcon, Lock, CarFront, Cpu } from 'lucide-react';

const features = [
  { icon: Target, title: 'Flat Pricing', desc: 'Zero hidden fees. Flat transparent rates.' },
  { icon: Users, title: 'Safe Drivers', desc: 'Background checked & certified local driver partners.' },
  { icon: Zap, title: 'Instant Match', desc: 'Matched with nearest drivers in less than 30s.' },
  { icon: Map, title: 'Live Route GPS', desc: 'Follow driver arrival on real-time maps.' },
  { icon: HeadphonesIcon, title: '24/7 Dispatch', desc: 'Round-the-clock help desk ready to support.' },
  { icon: Lock, title: 'Secure Gateway', desc: 'Encrypted UPI & card transaction safety.' },
  { icon: CarFront, title: 'Flexible Fleet', desc: 'Auto, Sedans, and SUVs depending on need.' },
  { icon: Cpu, title: 'Smart Dispatch', desc: 'AI routing for faster, optimized trips.' },
];

const WhyTascki = () => {
  return (
    <section id="business" className="py-24 relative bg-gray-50 border-t border-gray-100">
      {/* Decorative safety stripe banner background */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-tascki-yellow via-black to-tascki-yellow opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-extrabold text-xs uppercase tracking-wider mb-4">
            Our Promise
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 tracking-tight">Why Choose <span className="text-tascki-yellow">TASCKI</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-semibold leading-relaxed">We are setting new standards in the ride-hailing industry.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.04,
                borderColor: 'rgba(255, 192, 0, 0.4)',
                boxShadow: '0 10px 30px rgba(255,192,0,0.12)'
              }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md hover:-translate-y-2 cursor-pointer transition-all duration-300 group hover:engine-rumble"
            >
              {/* Animated Icon container */}
              <div className="bg-gray-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-tascki-yellow group-hover:text-black transition-colors duration-300 border border-gray-100">
                <feature.icon className="text-tascki-yellow group-hover:text-black transition-colors duration-300 stroke-[2.5]" size={26} />
              </div>
              
              <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-wide">{feature.title}</h3>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTascki;
