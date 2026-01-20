
import React from 'react';
import { Product } from '../types';

interface Props {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

const ProductGrid: React.FC<Props> = ({ products, onAddToCart, onViewDetails }) => {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-[#4a2c2a] serif diamond-separator">Featured Pickles</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="parchment-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 flex flex-col">
            <div 
              className="mb-6 overflow-hidden rounded-xl w-full aspect-square cursor-pointer shadow-inner bg-white/50"
              onClick={() => onViewDetails(product)}
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            
            <div className="text-center flex-grow">
              <h3 className="text-2xl font-bold text-[#4a2c2a] mb-1 serif">{product.name}</h3>
              <p className="text-[#8b1a1a] font-bold text-xl mb-6">Rs. {product.price} / kg</p>
            </div>
            
            <button 
              onClick={() => onAddToCart(product)}
              className="w-full btn-desi-red text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2 font-bold uppercase tracking-wider text-sm shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 100-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              <span>Add to Cart</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
