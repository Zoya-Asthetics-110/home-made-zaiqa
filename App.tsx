
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Features from './components/Features';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import ProductDetail from './components/ProductDetail';
import AdminPanel from './components/AdminPanel';
import { Product, CartItem, Order } from './types';
import { PRODUCTS as INITIAL_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderContent = () => {
    switch (currentView) {
      case 'ADMIN':
        return (
          <AdminPanel 
            products={products} 
            orders={orders} 
            setProducts={setProducts}
            onClose={() => setCurrentView('HOME')}
          />
        );
      case 'CHECKOUT':
        return (
          <Checkout 
            cart={cart} 
            total={cartTotal} 
            onBack={() => setCurrentView('HOME')}
            onOrderSuccess={handleOrderSuccess}
          />
        );
      
      case 'SHOP':
        return (
          <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
            <ProductGrid 
              products={products} 
              onAddToCart={addToCart} 
              onViewDetails={setSelectedProduct} 
            />
          </div>
        );

      case 'ABOUT':
        return (
          <div className="max-w-4xl mx-auto px-6 py-32 text-center animate-fade-in">
            <h2 className="text-6xl font-bold text-[#4a2c2a] mb-8 serif">Our Traditional Roots</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-12"></div>
            <p className="text-2xl text-amber-900/80 italic leading-relaxed parchment-card p-10 rounded-3xl">
              Started in a small home kitchen in Lahore, Zaiqa represents generations of secrets 
              passed down through family recipes. We use only sun-dried spices and pure mustard oil 
              to ensure every jar carries the true soul of Pakistani culture.
            </p>
          </div>
        );

      case 'CONTACT':
        return (
          <div className="max-w-4xl mx-auto px-6 py-32 animate-fade-in">
             <div className="parchment-card p-12 rounded-[3rem] text-center shadow-2xl">
                <h2 className="text-5xl font-bold text-[#4a2c2a] mb-6 serif">Get In Touch</h2>
                <p className="text-xl text-gray-600 mb-12">We love hearing from our customers! For bulk orders or queries:</p>
                <div className="space-y-6 text-3xl font-bold text-[#8b1a1a] serif">
                  <p>WhatsApp: +92 300 1234567</p>
                  <p>Email: zaiqa@homemade.pk</p>
                  <p>Address: Garden Town, Lahore</p>
                </div>
             </div>
          </div>
        );

      default: // HOME
        return (
          <div className="animate-fade-in">
            <Hero />
            <main className="max-w-7xl mx-auto px-4 py-16">
              <ProductGrid 
                products={products} 
                onAddToCart={addToCart} 
                onViewDetails={setSelectedProduct} 
              />
              <Features />
            </main>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f4e8d1] scroll-smooth">
      {currentView !== 'ADMIN' && (
        <Header 
          onCartClick={() => setIsCartOpen(true)} 
          cartCount={cartCount} 
          onNavigate={setCurrentView}
          currentView={currentView}
        />
      )}
      
      {renderContent()}

      {currentView !== 'ADMIN' && <Footer onAdminClick={() => setCurrentView('ADMIN')} />}
      
      {isCartOpen && (
        <CartSidebar 
          items={cart} 
          onClose={() => setIsCartOpen(false)} 
          onUpdateQty={updateQuantity}
          onCheckout={() => {
            setIsCartOpen(false);
            setCurrentView('CHECKOUT');
          }}
          total={cartTotal}
        />
      )}

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
        />
      )}

      {/* Floating Cart Button */}
      {currentView !== 'ADMIN' && currentView !== 'CHECKOUT' && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-[#8b1a1a] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center space-x-2 z-40 border-2 border-amber-600/30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="font-bold text-xl">{cartCount}</span>
        </button>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4d4d8;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default App;
