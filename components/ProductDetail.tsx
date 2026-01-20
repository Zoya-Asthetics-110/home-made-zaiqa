
import React, { useState } from 'react';
import { Product } from '../types';

interface Props {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product, qty: number) => void;
}

const ProductDetail: React.FC<Props> = ({ product, onClose, onAddToCart }) => {
  const [qty, setQty] = useState(1);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#4a2c2a]/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative parchment-card w-full max-w-5xl rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-6 right-6 z-20 bg-white/80 p-2 rounded-full hover:bg-white text-[#8b1a1a] shadow-lg transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Product Image */}
        <div className="md:w-1/2 h-[400px] md:h-auto overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Right Side: Content */}
        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white/40">
          <h2 className="text-6xl font-bold text-[#4a2c2a] mb-4 serif leading-tight">{product.name}</h2>
          <div className="w-24 h-1 bg-amber-600 mb-8 rounded-full" />
          
          <p className="text-2xl text-amber-900/80 mb-10 italic font-medium leading-relaxed">
            {product.description || "The authentic traditional taste made with love and fresh ingredients."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8 mb-10">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 bg-white/60 rounded-full p-2 border border-amber-200 shadow-inner">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-12 h-12 rounded-full bg-[#8b1a1a] text-white font-bold text-2xl flex items-center justify-center hover:bg-[#b91c1c] active:scale-90 transition-all"
              >-</button>
              <span className="text-2xl font-bold w-10 text-center text-[#4a2c2a]">{qty} kg</span>
              <button 
                onClick={() => setQty(qty + 1)}
                className="w-12 h-12 rounded-full bg-[#8b1a1a] text-white font-bold text-2xl flex items-center justify-center hover:bg-[#b91c1c] active:scale-90 transition-all"
              >+</button>
            </div>
            
            <div className="text-4xl font-bold text-[#8b1a1a] serif">
              Rs. {product.price * qty}
            </div>
          </div>

          <button 
            onClick={() => onAddToCart(product, qty)}
            className="w-full btn-desi-red text-white py-6 rounded-2xl font-bold text-2xl shadow-xl transition-all hover:-translate-y-1 active:translate-y-0"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
