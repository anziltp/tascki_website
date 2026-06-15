import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Banknote, QrCode, CreditCard, ChevronRight, Check } from 'lucide-react';

const paymentMethods = [
  { id: 'wallet', title: 'TASCKI Wallet', icon: Wallet, desc: 'Add money for seamless 1-tap booking.', color: 'bg-black text-tascki-yellow' },
  { id: 'upi', title: 'UPI AutoPay', icon: CreditCard, desc: 'Pay instantly from linked bank apps.', color: 'bg-[#0b0f19] text-white border border-white/10' },
  { id: 'qr', title: 'Scan QR Code', icon: QrCode, desc: 'Scan driver\'s QR directly in vehicle.', color: 'bg-white text-black border border-gray-200' },
  { id: 'cash', title: 'Cash on Ride', icon: Banknote, desc: 'Pay physical cash upon trip completion.', color: 'bg-amber-100 text-amber-800' },
];

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('wallet');

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white border-y border-slate-200/60">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-tascki-yellow/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-extrabold text-xs uppercase tracking-wider mb-4 font-mono">
            Payment Methods
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 tracking-tight">Pay <span className="text-tascki-yellow">Your Way</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-semibold">Secure, instant, and flexible payment channels designed for your comfort.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Rolling Taxi Odometer Meter Receipt */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Simulated Taxi Odometer Printer Box slot */}
              <div className="w-full h-8 bg-slate-900 rounded-t-3xl shadow-md border-b-4 border-slate-950 relative z-20 flex items-center justify-center">
                <div className="w-3/4 h-1.5 bg-slate-950 rounded-full shadow-inner" />
              </div>
              
              {/* Paper Receipt rolling down */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: 'auto', opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, type: 'spring', stiffness: 80 }}
                className="bg-white border-x border-b border-slate-200 p-6 pb-8 shadow-2xl relative z-10 origin-top overflow-hidden"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 95%, #f8fafc 100%)', backgroundSize: '100% 6px', backgroundPosition: 'bottom' }}
              >
                {/* Torn Jagged edge visual simulation */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-b from-black/5 to-transparent" />
                
                {/* Receipt Content */}
                <div className="space-y-4 font-mono text-xs text-slate-800">
                  <div className="text-center border-b border-dashed border-slate-200 pb-4">
                    <h3 className="font-black text-sm tracking-widest text-slate-900">TASCKI TICKET</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 font-mono">DATE: 2026-06-15 • TIME: 10:35</p>
                  </div>

                  <div className="space-y-2 font-bold text-slate-600">
                    <div className="flex justify-between">
                      <span>BASE RIDE FARE</span>
                      <span className="text-slate-900 font-extrabold">₹50.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DISTANCE CHARGE (4.2km)</span>
                      <span className="text-slate-900 font-extrabold">₹84.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PEAK DEMAND</span>
                      <span className="text-slate-900 font-extrabold">1.0x</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-slate-200 pt-4 flex justify-between items-baseline font-black text-sm text-slate-900">
                    <span>TOTAL CHARGE</span>
                    <span className="text-lg text-tascki-yellow font-black bg-slate-900 px-3 py-1 rounded-xl shadow-md">₹134.00</span>
                  </div>

                  {/* High-fidelity Barcode Visual */}
                  <div className="pt-4 border-t border-dashed border-slate-200 flex flex-col items-center gap-1.5 select-none">
                    <div className="w-full h-8 bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.85)_0px,rgba(0,0,0,0.85)_2px,transparent_2px,transparent_4px,rgba(0,0,0,0.85)_4px,rgba(0,0,0,0.85)_5px,transparent_5px,transparent_8px)]" />
                    <span className="text-[8px] text-slate-400 font-mono tracking-widest uppercase">TSK-2026-0615-OK</span>
                  </div>

                  <div className="text-center text-[9px] text-slate-400 font-extrabold leading-tight uppercase tracking-wider">
                    <p>Thank you for riding with us!</p>
                    <p className="mt-1">Verified via Safe-Taxi Audit</p>
                  </div>
                </div>

                {/* Jagged bottom edge circle cuts */}
                <div className="absolute bottom-0 inset-x-0 h-2.5 flex justify-between overflow-hidden pointer-events-none">
                  {[...Array(13)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-slate-50 rounded-full -mb-3 border border-slate-200/40 shrink-0" />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Interactive Card Stack Slider */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl font-black text-slate-950 mb-6 tracking-wide uppercase">Select Preferred Wallet</h3>
            
            <div className="flex flex-col gap-3">
              {paymentMethods.map((method) => {
                const isSelected = selectedMethod === method.id;
                
                return (
                  <motion.div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    whileHover={{ scale: 1.01, x: 5 }}
                    whileTap={{ scale: 0.99 }}
                    className={`p-5 rounded-[2rem] cursor-pointer flex items-center justify-between transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-2xl border-l-8 border-tascki-yellow border-y border-r border-white/5'
                        : 'bg-white hover:bg-slate-50/50 text-slate-800 border border-slate-200/60 shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                        isSelected 
                          ? 'bg-tascki-yellow text-slate-950 border-amber-400/40 shadow-[0_4px_12px_rgba(255,192,0,0.3)]' 
                          : 'bg-slate-50 text-slate-900 border-slate-200/50'
                      }`}>
                        <method.icon size={22} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-black text-base tracking-wide uppercase leading-tight group-hover:text-tascki-yellow">{method.title}</h4>
                        <p className={`text-xs font-semibold leading-relaxed mt-0.5 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                          {method.desc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative z-10 shrink-0">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-tascki-yellow text-slate-950 flex items-center justify-center shadow-md">
                          <Check size={14} className="stroke-[3]" />
                        </div>
                      ) : (
                        <ChevronRight size={18} className="text-slate-400" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Payment;
