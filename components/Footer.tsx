
import React from 'react';

interface Props {
  onAdminClick?: () => void;
}

const Footer: React.FC<Props> = ({ onAdminClick }) => {
  return (
    <footer className="bg-[#4a2c2a] text-amber-50 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-3xl font-bold serif mb-4 tracking-wider">ZAIQA</h3>
          <p className="text-sm text-amber-200/70 leading-relaxed">
            Authentic, high-quality, and 100% natural homemade pickles. We bring the traditional taste of Desi kitchens to your doorstep.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-amber-100/80">
            <li><a href="#" className="hover:text-amber-400">Home</a></li>
            <li><a href="#" className="hover:text-amber-400">Our Shop</a></li>
            <li><a href="#" className="hover:text-amber-400">About Us</a></li>
            <li><a href="#" className="hover:text-amber-400">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm text-amber-100/80">
            <li className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Lahore, Pakistan</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+92 300 1234567</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Newsletter</h4>
          <div className="flex flex-col space-y-4">
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border-none rounded-l-lg p-3 text-sm focus:ring-0 w-full"
              />
              <button className="bg-amber-600 px-4 rounded-r-lg font-bold hover:bg-amber-700 transition-colors">Join</button>
            </div>
            {onAdminClick && (
              <button 
                onClick={onAdminClick}
                className="text-amber-200/20 text-[10px] uppercase tracking-widest text-left hover:text-amber-200/50 transition-colors"
              >
                Admin Panel
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-xs text-amber-100/50">
        © 2024 Homemade Zaiqa. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
