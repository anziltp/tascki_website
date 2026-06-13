import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Car } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStats from './components/TrustStats';
import About from './components/About';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Vehicles from './components/Vehicles';
import LiveTracking from './components/LiveTracking';
import Payment from './components/Payment';
import RideHistory from './components/RideHistory';
import WhyTascki from './components/WhyTascki';
import Testimonials from './components/Testimonials';
import DriverPartner from './components/DriverPartner';
import AppDownload from './components/AppDownload';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to vertical position (from 0% to 100%)
  const taxiY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans relative">
      {/* Global Scroll-Road HUD Indicator */}
      <div className="hidden lg:block fixed left-6 top-28 bottom-28 w-4 z-40">
        {/* Dashed Road Track */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-gray-300" />
        
        {/* Road Highlight representing scroll depth */}
        <motion.div 
          style={{ height: taxiY }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-tascki-yellow"
        />
        
        {/* Animated driving taxi */}
        <motion.div 
          style={{ top: taxiY }} 
          className="absolute left-1/2 -translate-x-1/2 -mt-3 bg-tascki-yellow text-black p-1.5 rounded-full shadow-lg border border-amber-400/50 cursor-pointer"
          whileHover={{ scale: 1.15 }}
          title="Scroll Progress"
        >
          <Car size={16} className="rotate-90" />
        </motion.div>
      </div>

      <Navbar />
      <Hero />
      <TrustStats />
      <About />
      <Features />
      <HowItWorks />
      <Vehicles />
      <LiveTracking />
      <Payment />
      <RideHistory />
      <WhyTascki />
      <Testimonials />
      <DriverPartner />
      <AppDownload />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
