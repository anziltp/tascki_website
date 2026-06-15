import React from 'react';
import { Globe, Mail, Phone, MessageCircle, Car } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-10 border-t border-gray-200 relative overflow-hidden">
      
      {/* Cityscape Skyline & Traffic Highway Visual Divider */}
      <div className="w-full relative h-28 -mt-16 mb-12 select-none overflow-hidden pointer-events-none">
        {/* Silhouette Buildings */}
        <svg className="w-full h-16 absolute bottom-6 left-0 opacity-[0.05] text-black" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path d="M0,100 L0,30 L30,30 L30,50 L40,50 L40,20 L70,20 L70,100 M65,100 L65,40 L100,40 L100,60 L110,60 L110,10 L140,10 L140,100 M135,100 L135,50 L180,50 L180,30 L220,30 L220,100 M215,100 L215,25 L260,25 L260,100 M255,100 L255,60 L300,60 L300,45 L320,45 L320,100 M315,100 L315,15 L360,15 L360,100 M355,100 L355,40 L400,40 L400,100 M395,100 L395,50 L430,50 L430,20 L480,20 L480,100 M475,100 L475,60 L520,60 L520,100 M515,100 L515,30 L550,30 L550,100 M545,100 L545,50 L590,50 L590,100 M585,100 L585,10 L640,10 L640,100 M635,100 L635,35 L680,35 L680,100 M675,100 L675,55 L720,55 L720,100 M715,100 L715,20 L750,20 L750,100 M745,100 L745,45 L790,45 L790,100 M785,100 L785,10 L840,10 L840,100 M835,100 L835,35 L880,35 L880,100 M875,100 L875,55 L920,55 L920,100 M915,100 L915,20 L950,20 L950,100 M945,100 L945,45 L990,45 L990,100 M985,100 L985,15 L1040,15 L1040,100 M1035,100 L1035,35 L1080,35 L1080,100 M1075,100 L1075,55 L1120,55 L1120,100 M1115,100 L1115,20 L1150,20 L1150,100 M1145,100 L1145,45 L1200,45 L1200,100" fill="currentColor" />
        </svg>

        {/* The Highway Road */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-950 border-t border-gray-900 flex items-center overflow-hidden">
          {/* Dashed Center lane markings */}
          <div className="w-full h-[1px] border-t border-dashed border-tascki-yellow/30 opacity-70" />
          
          {/* Loop Taxi silhouette driving left-to-right */}
          <div className="absolute top-1/2 -translate-y-1/2 drive-right-anim text-tascki-yellow">
            <Car size={13} className="stroke-[2.5]" />
          </div>

          {/* Loop Taxi silhouette driving right-to-left */}
          <div className="absolute top-1/2 -translate-y-1/2 drive-left-anim text-gray-700">
            <Car size={13} className="stroke-[2.5] scale-x-[-1]" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img 
                src="/tascki%20logo.png" 
                alt="TASCKI Logo" 
                className="h-9 w-auto" 
                onError={(e) => { 
                  e.target.style.display = 'none'; 
                  const h1 = e.target.parentNode?.querySelector('h1');
                  if (h1) h1.style.display = 'block'; 
                }} 
              />
              <h1 className="text-3xl font-black text-tascki-black tracking-tighter hidden">TASCKI</h1>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed font-semibold">
              Ride smarter, not harder. The premier ride-hailing service offering Autos, Taxis, and 7-Seaters with transparent pricing and live tracking.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Globe, href: '#' },
                { icon: Mail, href: '#' },
                { icon: Phone, href: '#' },
                { icon: MessageCircle, href: '#' }
              ].map((item, index) => (
                <a key={index} href={item.href} className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-tascki-yellow hover:text-black transition-colors shadow-sm">
                  <item.icon size={16} className="stroke-[2.5]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 font-extrabold mb-6 uppercase tracking-wider text-xs font-mono">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Blog', 'Press'].map((txt) => (
                <li key={txt}><a href="#" className="text-gray-500 hover:text-tascki-yellow transition-colors font-extrabold text-sm">{txt}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-extrabold mb-6 uppercase tracking-wider text-xs font-mono">Products</h4>
            <ul className="space-y-4">
              {['Ride', 'Drive', 'Business', 'Airports'].map((txt) => (
                <li key={txt}><a href="#" className="text-gray-500 hover:text-tascki-yellow transition-colors font-extrabold text-sm">{txt}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-extrabold mb-6 uppercase tracking-wider text-xs font-mono">Contact & Legal</h4>
            <ul className="space-y-4">
              {['Help Center', 'Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((txt) => (
                <li key={txt}><a href="#" className="text-gray-500 hover:text-tascki-yellow transition-colors font-extrabold text-sm">{txt}</a></li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-extrabold text-gray-400">
          <p>&copy; {new Date().getFullYear()} TASCKI Technologies Inc. All rights reserved.</p>
          <div className="flex space-x-4">
            <span>Made with <span className="text-tascki-yellow text-base animate-pulse">♥</span> for better rides</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
