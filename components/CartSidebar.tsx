
import React from 'react';
import { CartItem } from '../types';

interface Props {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
  total: number;
}

const CartSidebar: React.FC<Props> = ({ items, onClose, onUpdateQty, onCheckout, total }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="px-6 py-6 bg-[#8b1a1a] text-white flex justify-between items-center">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b border-gray-100 pb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-bold text-[#4a2c2a]">{item.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">Rs. {item.price} / kg</p>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-6 h-6 border rounded flex items-center justify-center hover:bg-gray-50"
                        >-</button>
                        <span className="text-sm font-medium">{item.quantity} kg</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-6 h-6 border rounded flex items-center justify-center hover:bg-gray-50"
                        >+</button>
                      </div>
                    </div>
                    <div className="font-bold text-[#8b1a1a]">
                      Rs. {item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="px-6 py-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-gray-600">Total</span>
                <span className="text-2xl font-bold text-[#8b1a1a]">Rs. {total}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-[#8b1a1a] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#6b1414] transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
