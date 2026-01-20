
import React from 'react';

interface Props {
  onCartClick: () => void;
  cartCount: number;
  onNavigate: (view: string) => void;
  currentView: string;
}

const Header: React.FC<Props> = ({ onCartClick, cartCount, onNavigate, currentView }) => {
  const navItems = ['HOME', 'SHOP', 'ABOUT', 'CONTACT'];

  return (
    <nav className="sticky top-0 z-50 bg-[#801414] text-white px-4 md:px-12 py-6 flex justify-between items-center border-b border-black/10 shadow-lg">
      {/* Brand Logo */}
      <div 
        className="cursor-pointer group"
        onClick={() => onNavigate('HOME')}
      >
        <span className="text-4xl md:text-5xl font-bold tracking-[0.25em] serif select-none transition-all group-hover:text-amber-100">
          ZAIQA
        </span>
      </div>
      
      {/* Centered Navigation */}
      <div className="hidden md:flex flex-grow justify-center space-x-12">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => onNavigate(item)}
            className={`text-sm font-bold tracking-[0.2em] transition-all hover:text-amber-400 relative py-1 ${
              currentView === item ? 'text-amber-400' : 'text-white'
            }`}
          >
            {item}
            {currentView === item && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 animate-pulse"></span>
            )}
          </button>
        ))}
      </div>

      {/* Cart Icon Section */}
      <div className="flex items-center">
        <button 
          onClick={onCartClick} 
          className="relative group p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/10 shadow-inner"
        >
          {/* Shopping Bag Icon from Image */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-[#801414] text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border border-[#801414] shadow-md">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Header;
