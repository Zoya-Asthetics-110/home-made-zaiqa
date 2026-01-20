
import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-[#4a2c2a] serif diamond-separator">Why Homemade Zaiqa</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="parchment-card p-6 rounded-3xl flex flex-col items-center text-center transition-all hover:bg-amber-50 group">
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-amber-600/10 rounded-full blur-xl group-hover:bg-amber-600/20 transition-colors" />
              <img 
                src={feature.image} 
                alt={feature.title} 
                className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl relative z-10" 
              />
            </div>
            <span className="font-bold text-[#4a2c2a] text-xl md:text-2xl serif leading-tight">{feature.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
