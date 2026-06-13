import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Custom Animated Hamburger Icon Lines morphing to X (Black colored for contrast on yellow navbar)
const HamburgerIcon = ({ isOpen }) => {
  return (
    <div className="w-6 h-5 flex flex-col justify-between items-center relative cursor-pointer">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 9, backgroundColor: "#000000" } : { rotate: 0, y: 0, backgroundColor: "#000000" }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-full h-[3px] rounded-full origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1, backgroundColor: "#000000" }}
        transition={{ duration: 0.2 }}
        className="w-full h-[3px] rounded-full"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -9, backgroundColor: "#000000" } : { rotate: 0, y: 0, backgroundColor: "#000000" }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-full h-[3px] rounded-full origin-center"
      />
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeSection, setActiveSection] = useState('ride');

  const navLinks = [
    { name: 'Ride', href: '#ride' },
    { name: 'Drive', href: '#drive' },
    { name: 'Business', href: '#business' },
    { name: 'About', href: '#about' },
  ];

  // Detect scroll to trigger compact floating state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Spy Observer to update active navigation pill dynamically
  useEffect(() => {
    const sections = ['ride', 'drive', 'business', 'about'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      }, {
        rootMargin: '-40% 0px -40% 0px' // triggers when section occupies the middle portion of viewport
      });
      
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(obs => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className={`fixed z-50 transition-all duration-500 left-0 right-0 mx-auto rounded-full flex items-center justify-between ${
          scrolled
            ? 'top-4 w-[90%] max-w-5xl bg-tascki-yellow/95 backdrop-blur-lg border border-amber-400/40 shadow-[0_12px_40px_rgba(255,192,0,0.25)] px-6 h-16'
            : 'top-6 w-[94%] max-w-7xl bg-tascki-yellow border border-amber-300/30 shadow-[0_8px_32px_rgba(255,192,0,0.15)] px-8 h-20'
        }`}
      >
        {/* Glow Ribbon Strip on Scroll (White-glow on Yellow navbar) */}
        {scrolled && (
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent rounded-full shadow-[0_1px_8px_rgba(255,255,255,0.8)] pointer-events-none" />
        )}

        {/* Logo with scale effect and subtle dark pulse glow */}
        <motion.a 
          href="#"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex-shrink-0 flex items-center gap-2 cursor-pointer relative z-50"
        >
          <div className="relative">
            <img 
              src="/tascki logo.png" 
              alt="TASCKI Logo" 
              className={`w-auto transition-all duration-500 ${scrolled ? 'h-8' : 'h-10'}`} 
              onError={(e) => { 
                e.target.style.display = 'none'; 
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'block'; 
              }} 
            />
            {/* Decorative logo pulse glow */}
            <div className="absolute inset-0 bg-black/5 blur-md rounded-full -z-0" />
          </div>
          <h1 className="text-3xl font-extrabold text-tascki-black tracking-tighter hidden">TASCKI</h1>
        </motion.a>
        
        {/* Desktop Navigation Links with Sliding Pill Background */}
        <div className="hidden md:flex items-center space-x-2 relative">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.href.substring(1);
            const isHovered = hoveredIndex === index;
            
            return (
              <a
                key={link.name}
                href={link.href}
                className="relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full"
                style={{ color: isActive ? '#ffc000' : '#000000' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Scroll-Spy Active Indicator (Solid Black Pill) */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-black rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                
                {/* Hover Indicator (Glass Capsule with Black Border) */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-black/10 border border-black/10 rounded-full"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <motion.a 
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative text-black hover:text-black/80 font-bold text-sm transition-colors py-2 px-4 group"
          >
            <span>Log in</span>
            {/* Draw underline on hover */}
            <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
          </motion.a>
          
          <motion.button 
            whileHover="hover"
            whileTap="tap"
            variants={{
              hover: { scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' },
              tap: { scale: 0.95 }
            }}
            className="sheen-effect bg-black text-tascki-yellow px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Sign up</span>
            <motion.span
              variants={{
                hover: { x: 3 },
                default: { x: 0 }
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <ArrowRight size={16} className="stroke-[3]" />
            </motion.span>
          </motion.button>
        </div>

        {/* Mobile Menu Hamburger Button with morph and rotate */}
        <div className="md:hidden flex items-center relative z-50">
          <motion.button 
            onClick={() => setIsOpen(!isOpen)} 
            whileTap={{ scale: 0.9 }}
            className="p-2 focus:outline-none"
          >
            <HamburgerIcon isOpen={isOpen} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer Overlay (Yellow-themed for consistency) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`fixed z-40 left-0 right-0 mx-auto w-[92%] rounded-3xl bg-tascki-yellow/98 backdrop-blur-xl border border-amber-400/40 p-6 shadow-2xl flex flex-col gap-6 md:hidden ${
              scrolled ? 'top-22' : 'top-28'
            }`}
          >
            {/* Nav list with staggered animations */}
            <div className="flex flex-col space-y-3">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`block text-lg font-bold py-2 border-b border-black/5 last:border-0 transition-colors ${
                      isActive ? 'text-black underline decoration-2 underline-offset-4' : 'text-black/80 hover:text-black'
                    }`}
                  >
                    <span className={isActive ? 'font-extrabold text-black' : 'font-semibold text-black/80'}>
                      {link.name}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <motion.button 
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-black hover:bg-black/5 border border-black/10 font-bold text-lg py-3 rounded-2xl bg-white/20 transition-all"
              >
                Log in
              </motion.button>
              <motion.button 
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-black text-tascki-yellow font-extrabold text-lg py-4 rounded-2xl shadow-md hover:shadow-lg transition-all"
              >
                Sign up
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
