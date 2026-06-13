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
    <section className="py-24 relative bg-gray-50 border-y border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-extrabold text-xs uppercase tracking-wider mb-4">
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
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none cursor-pointer"
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                >
                  {/* Traffic Light State Indicator + Question */}
                  <div className="flex items-center gap-4">
                    {/* The Traffic Light Indicator */}
                    <div 
                      className={`w-3.5 h-3.5 rounded-full border border-black/10 transition-all duration-300 shrink-0 ${
                        isOpen 
                          ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]' 
                          : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]'
                      }`} 
                      title={isOpen ? 'Open (Go)' : 'Closed (Stop)'}
                    />
                    <span className="font-extrabold text-lg text-gray-900 tracking-wide">{faq.question}</span>
                  </div>
                  
                  <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-tascki-yellow text-black' : 'bg-gray-50 text-gray-400'}`}>
                    <ChevronDown 
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                      size={20} 
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
                      <div className="px-6 pb-6 text-gray-500 font-semibold border-t border-gray-100 pt-4 leading-relaxed text-sm ml-7">
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
