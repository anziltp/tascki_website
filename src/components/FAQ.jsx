import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How do I book a ride with TASCKI?",
    answer: "Simply open the app, enter your destination, choose your preferred vehicle type (Auto, Taxi, or 7-Seater), and tap 'Book'. A driver partner will be assigned to you instantly."
  },
  {
    question: "How is the fare calculated?",
    answer: "Fares are calculated based on flat base distance, duration, and local route mapping. We show you an upfront estimated flat fare before you confirm your booking so there are no surprises."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept TASCKI Wallet, UPI, QR code scanning, and cash payments directly to the driver partner."
  },
  {
    question: "Are TASCKI drivers verified?",
    answer: "Yes, all our driver partners undergo a rigorous background check, license checks, and service training before they can accept rides on our platform."
  },
  {
    question: "Can I schedule a ride in advance?",
    answer: "Currently, we focus on providing the fastest on-demand rides. However, scheduling is a feature we are actively working on and will roll out soon."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-24 relative bg-gradient-to-b from-slate-50 to-white border-y border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-extrabold text-xs uppercase tracking-wider mb-4 font-mono">
            Help Center
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 tracking-tight">Frequently Asked <span className="text-tascki-yellow">Questions</span></h2>
          <p className="text-gray-600 text-lg font-semibold leading-relaxed">Got questions? We've got answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden shadow-lg hover:shadow-xl hover:border-amber-400/30 transition-all duration-300"
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none cursor-pointer"
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                >
                  {/* Traffic Light State Indicator + Question */}
                  <div className="flex items-center gap-4">
                    {/* The Traffic Light Indicator */}
                    <div 
                      className={`w-3 h-3 rounded-full border border-slate-950/10 transition-all duration-300 shrink-0 ${
                        isOpen 
                          ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' 
                          : 'bg-red-500 shadow-[0_0_8px_#ef4444]'
                      }`} 
                      title={isOpen ? 'Open (Go)' : 'Closed (Stop)'}
                    />
                    <span className="font-extrabold text-base md:text-lg text-slate-900 tracking-wide">{faq.question}</span>
                  </div>
                  
                  <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-tascki-yellow text-slate-950' : 'bg-slate-50 text-slate-450 border border-slate-200/50'}`}>
                    <ChevronDown 
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                      size={18} 
                    />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-500 font-semibold border-t border-slate-100 pt-4 leading-relaxed text-sm ml-0 sm:ml-7">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
