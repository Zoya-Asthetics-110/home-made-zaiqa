
import React, { useState } from 'react';
import { CartItem, PaymentMethod, Order } from '../types';

interface Props {
  cart: CartItem[];
  total: number;
  onBack: () => void;
  onOrderSuccess: (order: Order) => void;
}

const Checkout: React.FC<Props> = ({ cart, total, onBack, onOrderSuccess }) => {
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState<PaymentMethod>(PaymentMethod.COD);
  const [isOrdered, setIsOrdered] = useState(false);

  const handleConfirm = () => {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerPhone: phone,
      items: [...cart],
      total: total,
      paymentMethod: payment,
      date: new Date().toLocaleString(),
      status: 'Pending'
    };
    
    onOrderSuccess(newOrder);
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="max-w-xl mx-auto py-32 px-4 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-6xl font-bold text-[#4a2c2a] mb-6 serif">Shukriya!</h2>
        <p className="text-2xl text-gray-600 mb-10">Order Confirmed. Our team will contact you shortly on <b>{phone}</b>.</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-desi-red text-white py-4 px-12 rounded-full font-bold text-xl shadow-xl"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-5xl font-bold text-[#4a2c2a] serif">Shop Checkout</h2>
        <button onClick={onBack} className="text-[#8b1a1a] font-bold text-lg hover:underline flex items-center uppercase tracking-widest">
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Shopping
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-10">
          {/* Step 1 */}
          <div className="parchment-card p-10 rounded-3xl border-2 border-amber-200 shadow-md">
            <div className="flex items-center space-x-5 mb-8">
              <span className="w-12 h-12 rounded-full bg-[#8b1a1a] text-white flex items-center justify-center font-bold text-2xl shadow-lg">1</span>
              <h3 className="text-3xl font-bold text-[#4a2c2a] serif">Enter Your Phone Number</h3>
            </div>
            <input 
              type="tel"
              placeholder="0300 1234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-6 rounded-2xl border-2 border-amber-100 focus:border-[#8b1a1a] focus:ring-0 outline-none transition-all text-2xl bg-white/50 shadow-inner placeholder:text-gray-300"
            />
          </div>

          {/* Step 2 */}
          <div className="parchment-card p-10 rounded-3xl border-2 border-amber-200 shadow-md">
            <div className="flex items-center space-x-5 mb-8">
              <span className="w-12 h-12 rounded-full bg-[#8b1a1a] text-white flex items-center justify-center font-bold text-2xl shadow-lg">2</span>
              <h3 className="text-3xl font-bold text-[#4a2c2a] serif">Select Payment Method</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: PaymentMethod.COD, label: 'Cash on Delivery', color: 'bg-green-50' },
                { id: PaymentMethod.EASYPAISA, label: 'Easypaisa', color: 'bg-orange-50' },
                { id: PaymentMethod.BANK, label: 'Bank Transfer', color: 'bg-blue-50' }
              ].map(method => (
                <button 
                  key={method.id}
                  onClick={() => setPayment(method.id)}
                  className={`p-6 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center space-y-3 ${payment === method.id ? 'border-[#8b1a1a] bg-amber-100 shadow-lg scale-105' : 'border-amber-100 bg-white/40 hover:bg-white'}`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${payment === method.id ? 'border-[#8b1a1a]' : 'border-gray-300'}`}>
                    {payment === method.id && <div className="w-3 h-3 rounded-full bg-[#8b1a1a]" />}
                  </div>
                  <span className="font-bold text-[#4a2c2a]">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="parchment-card p-10 rounded-3xl border-2 border-amber-200 shadow-md">
            <div className="flex items-center space-x-5 mb-8">
              <span className="w-12 h-12 rounded-full bg-[#8b1a1a] text-white flex items-center justify-center font-bold text-2xl shadow-lg">3</span>
              <h3 className="text-3xl font-bold text-[#4a2c2a] serif">Confirm Order</h3>
            </div>
            <button 
              onClick={handleConfirm}
              className="w-full bg-[#2d5a27] hover:bg-[#1a3a17] text-white py-6 rounded-2xl font-bold text-3xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center space-x-4 border-b-4 border-[#143612]"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span>Confirm Order</span>
            </button>
          </div>
        </div>

        {/* Sidebar Order Info */}
        <div className="lg:col-span-5">
          <div className="parchment-card p-10 rounded-[2.5rem] shadow-2xl border-2 border-amber-200 sticky top-32">
            <h3 className="text-3xl font-bold text-[#4a2c2a] mb-8 border-b-2 border-amber-100 pb-4 serif">Order Items</h3>
            <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-white/40 p-4 rounded-2xl border border-amber-50">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} className="w-16 h-16 object-cover rounded-xl shadow-md" />
                    <div>
                      <p className="font-bold text-xl text-[#4a2c2a] serif">{item.name}</p>
                      <p className="text-sm font-medium text-amber-800">Rs. {item.price} / kg x {item.quantity} kg</p>
                    </div>
                  </div>
                  <span className="font-bold text-2xl text-[#8b1a1a]">Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 pt-6 border-t-2 border-amber-100">
              <div className="flex justify-between items-center text-xl text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold">Rs. {total}</span>
              </div>
              <div className="flex justify-between items-center text-xl">
                <span className="text-gray-600">Delivery</span>
                <span className="text-green-600 font-bold uppercase tracking-widest">FREE</span>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-amber-200 mt-6">
                <span className="text-3xl font-bold text-[#4a2c2a] serif">Total Amount</span>
                <span className="text-4xl font-bold text-[#8b1a1a]">Rs. {total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
