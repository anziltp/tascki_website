import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Daily Commuter',
    content: 'TASCKI has completely changed my daily commute. The app is super fast, and the drivers are always polite. The flat pricing is a game-changer.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    rating: 5,
    rotate: -1.5
  },
  {
    name: 'Rahul Verma',
    role: 'Business Traveler',
    content: 'I frequently use the 7-Seater option for my team. The vehicles are always clean, and the live tracking helps us coordinate perfectly. Highly recommended!',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    rating: 5,
    rotate: 1
  },
  {
    name: 'Anjali Desai',
    role: 'Student',
    content: 'The auto booking feature is what I use the most. It\'s affordable and the drivers arrive within minutes. TASCKI is the most reliable app out there.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    rating: 5,
    rotate: -1
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white border-t border-gray-100">
      {/* City skyline wireframe silhouette background */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#000_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-extrabold text-xs uppercase tracking-wider mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 tracking-tight">Loved by <span className="text-tascki-yellow">Thousands</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-semibold leading-relaxed">Hear what our passengers have to say about their rides.</p>
        </div>

        {/* Testimonial cards with playful rotation offsets */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotate: testi.rotate }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100, delay: index * 0.15 }}
              whileHover={{ 
                scale: 1.04, 
                rotate: 0,
                boxShadow: '0 20px 40px rgba(255,192,0,0.12)',
                borderColor: 'rgba(255,192,0,0.3)'
              }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-lg relative flex flex-col justify-between cursor-pointer transition-all duration-300"
            >
              {/* Backseat review window frame design */}
              <div className="absolute top-6 right-6 text-tascki-yellow/20">
                <MessageSquare size={48} className="stroke-[2.5]" />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-6 relative z-10">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-tascki-yellow text-tascki-yellow stroke-[2.5]" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-8 font-semibold italic text-base leading-relaxed relative z-10">
                  "{testi.content}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto border-t border-gray-50 pt-4">
                <img src={testi.img} alt={testi.name} className="w-14 h-14 rounded-full object-cover border-4 border-yellow-50 shadow-md shrink-0" />
                <div>
                  <h4 className="font-extrabold text-gray-900 text-base">{testi.name}</h4>
                  <p className="text-xs text-gray-400 font-extrabold uppercase tracking-wider">{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
