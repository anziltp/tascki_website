import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const OdometerCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const numberMatch = value.match(/\d+/);
  const targetNumber = numberMatch ? parseInt(numberMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, '');

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, targetNumber, {
        duration: duration,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setCount(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, targetNumber, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const SpeedometerDial = ({ percent }) => {
  const rotation = (percent / 100) * 180 - 90; // Rotate between -90deg and +90deg
  return (
    <div className="relative w-28 h-16 mx-auto mb-4 flex justify-center items-end overflow-hidden">
      {/* Gauge Outer Ring */}
      <svg className="w-28 h-28 absolute -bottom-10" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(0,0,0,0.05)"
          strokeWidth="9"
          strokeDasharray="125 250"
          strokeLinecap="round"
          transform="rotate(-180 50 50)"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#ffc000"
          strokeWidth="9"
          strokeDasharray="125 250"
          strokeLinecap="round"
          transform="rotate(-180 50 50)"
          initial={{ strokeDashoffset: 125 }}
          whileInView={{ strokeDashoffset: 125 - (percent / 100) * 125 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        />
      </svg>
      
      {/* Gauge Needle */}
      <motion.div
        className="w-1.5 h-11 bg-black rounded-full origin-bottom absolute -bottom-1"
        initial={{ rotate: -90 }}
        whileInView={{ rotate: rotation }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
        style={{ transformOrigin: 'bottom center' }}
      />
      
      {/* Center cap */}
      <div className="w-4 h-4 bg-tascki-yellow border-2 border-black rounded-full absolute -bottom-2 z-10 shadow-sm" />
    </div>
  );
};

const stats = [
  { value: '10K+', label: 'Rides Completed', percent: 85 },
  { value: '2K+', label: 'Driver Partners', percent: 70 },
  { value: '50+', label: 'Cities Covered', percent: 55 },
  { value: '98%', label: 'User Satisfaction', percent: 98 },
];

const TrustStats = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gray-50 border-y border-gray-200">
      {/* Decorative tire tracks in the section background */}
      <div className="absolute top-0 inset-x-0 h-4 bg-amber-400/10 opacity-30 select-none pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center relative group overflow-hidden"
            >
              {/* Dashboard dial visual */}
              <SpeedometerDial percent={stat.percent} />

              <div className="relative z-10 mt-2">
                {/* Odometer ticking text style */}
                <div className="text-4xl md:text-5xl font-black text-black tracking-tight mb-2 select-none font-mono">
                  <OdometerCounter value={stat.value} />
                </div>
                
                <div className="text-gray-500 font-bold text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>

              {/* Background amber subtle card highlight on hover */}
              <div className="absolute inset-0 bg-tascki-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
