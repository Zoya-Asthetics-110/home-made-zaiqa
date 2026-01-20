
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[700px] flex flex-col items-center justify-center text-center px-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1596797038583-34508e648834?auto=format&fit=crop&q=80&w=2000")' }}
      >
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <h1 className="text-white text-7xl md:text-9xl font-bold tracking-tighter mb-2 leading-none serif drop-shadow-2xl">
          HOMEMADE<br />
          <span className="text-amber-500 italic">ZAIQA</span>
        </h1>
        <p className="text-amber-100 text-xl md:text-3xl font-medium italic mb-10 tracking-wide drop-shadow-lg">
          Pure Homemade Pickles - Real Desi Taste
        </p>
        <button className="btn-desi-red text-white font-bold py-4 px-14 rounded-full text-2xl tracking-tight transition-transform hover:scale-105 active:scale-95 border border-white/20">
          Shop Now
        </button>
      </div>

      {/* Decorative shelf bottom effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4e8d1] to-transparent"></div>
    </section>
  );
};

export default Hero;
