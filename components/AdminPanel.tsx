
import React, { useState } from 'react';
import { Product, Order } from '../types';

interface Props {
  products: Product[];
  orders: Order[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onClose: () => void;
}

const AdminPanel: React.FC<Props> = ({ products, orders, setProducts, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'PRODUCTS' | 'ORDERS'>('DASHBOARD');
  
  // Add Product Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 1200,
    image: '',
    description: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'zaiqa123') {
      setIsLoggedIn(true);
    } else {
      alert("Ghalat Password! Try again.");
    }
  };

  const deleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `prod-${Date.now()}`;
    setProducts(prev => [...prev, { ...newProduct, id }]);
    setNewProduct({ name: '', price: 1200, image: '', description: '' });
    setShowAddForm(false);
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="parchment-card p-12 rounded-[2rem] w-full max-w-md shadow-2xl text-center">
          <h2 className="text-4xl font-bold text-[#4a2c2a] mb-8 serif">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl border border-amber-200 focus:border-[#8b1a1a] outline-none text-center text-2xl"
              autoFocus
            />
            <button type="submit" className="w-full btn-desi-red text-white py-4 rounded-xl font-bold text-lg">
              Unlock Panel
            </button>
            <button type="button" onClick={onClose} className="text-[#8b1a1a] font-bold text-sm uppercase tracking-widest hover:underline">
              Go Back
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf8f2]">
      {/* Admin Sidebar */}
      <div className="flex h-screen">
        <div className="w-64 bg-[#4a2c2a] text-white p-8 flex flex-col">
          <h2 className="text-3xl font-bold serif mb-12 tracking-widest">ADMIN</h2>
          <nav className="space-y-4 flex-grow">
            {[
              { id: 'DASHBOARD', label: 'Dashboard', icon: '📊' },
              { id: 'PRODUCTS', label: 'Products', icon: '📦' },
              { id: 'ORDERS', label: 'Orders', icon: '🧾' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left p-4 rounded-xl transition-all flex items-center space-x-3 ${activeTab === tab.id ? 'bg-amber-600 shadow-lg' : 'hover:bg-white/10'}`}
              >
                <span>{tab.icon}</span>
                <span className="font-bold">{tab.label}</span>
              </button>
            ))}
          </nav>
          <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-amber-200 transition-colors">
            Exit Admin
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow overflow-y-auto p-12 custom-scrollbar">
          <header className="flex justify-between items-center mb-12">
            <h1 className="text-5xl font-bold text-[#4a2c2a] serif">{activeTab}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Active Session</span>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
          </header>

          {activeTab === 'DASHBOARD' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="parchment-card p-10 rounded-3xl shadow-md border-b-8 border-amber-600">
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-2">Total Sales</p>
                  <p className="text-5xl font-black text-[#8b1a1a]">Rs. {totalRevenue}</p>
                </div>
                <div className="parchment-card p-10 rounded-3xl shadow-md border-b-8 border-green-600">
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-2">Total Orders</p>
                  <p className="text-5xl font-black text-[#4a2c2a]">{orders.length}</p>
                </div>
                <div className="parchment-card p-10 rounded-3xl shadow-md border-b-8 border-blue-600">
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-2">Inventory Items</p>
                  <p className="text-5xl font-black text-[#4a2c2a]">{products.length}</p>
                </div>
              </div>

              <div className="parchment-card p-10 rounded-3xl">
                <h3 className="text-2xl font-bold text-[#4a2c2a] mb-6 serif border-b-2 border-amber-100 pb-4">Recent Activity</h3>
                {orders.length === 0 ? (
                  <p className="text-gray-400 italic py-8">No recent orders to show.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex justify-between items-center bg-white/50 p-4 rounded-xl">
                        <div>
                          <p className="font-bold text-[#4a2c2a]">{order.id} - {order.customerPhone}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                        <span className="font-bold text-[#8b1a1a]">Rs. {order.total}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'PRODUCTS' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-[#4a2c2a] serif">Manage Your Items</h3>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center space-x-2 transition-all active:scale-95"
                >
                  <span>+</span>
                  <span>Add New Product</span>
                </button>
              </div>

              {showAddForm && (
                <div className="parchment-card p-8 rounded-3xl mb-12 border-2 border-amber-300">
                  <h4 className="text-xl font-bold text-[#4a2c2a] mb-6 serif">New Product Details</h4>
                  <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                      required 
                      placeholder="Product Name" 
                      className="p-4 rounded-xl border border-amber-100 focus:border-amber-500 outline-none"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                    <input 
                      required 
                      type="number" 
                      placeholder="Price (Rs.)" 
                      className="p-4 rounded-xl border border-amber-100 focus:border-amber-500 outline-none"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                    />
                    <input 
                      required 
                      placeholder="Image URL" 
                      className="p-4 rounded-xl border border-amber-100 focus:border-amber-500 outline-none"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    />
                    <input 
                      required 
                      placeholder="Description" 
                      className="p-4 rounded-xl border border-amber-100 focus:border-amber-500 outline-none"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    />
                    <div className="md:col-span-2 flex space-x-4">
                      <button type="submit" className="flex-grow btn-desi-red text-white py-4 rounded-xl font-bold">Save Product</button>
                      <button type="button" onClick={() => setShowAddForm(false)} className="px-8 bg-gray-200 hover:bg-gray-300 rounded-xl font-bold">Cancel</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map(product => (
                  <div key={product.id} className="parchment-card p-6 rounded-2xl flex space-x-4 group">
                    <img src={product.image} className="w-24 h-24 rounded-xl object-cover" />
                    <div className="flex-grow">
                      <h4 className="text-xl font-bold text-[#4a2c2a] serif">{product.name}</h4>
                      <p className="text-[#8b1a1a] font-bold">Rs. {product.price}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                    </div>
                    <div className="flex flex-col justify-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">Edit</button>
                      <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ORDERS' && (
            <div className="animate-fade-in">
              <div className="parchment-card rounded-3xl overflow-hidden shadow-lg">
                <table className="w-full text-left">
                  <thead className="bg-[#4a2c2a] text-white">
                    <tr>
                      <th className="p-6 font-bold serif">Order ID</th>
                      <th className="p-6 font-bold serif">Date</th>
                      <th className="p-6 font-bold serif">Customer Phone</th>
                      <th className="p-6 font-bold serif">Total</th>
                      <th className="p-6 font-bold serif">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-12 text-center text-gray-400 italic">No orders received yet.</td>
                      </tr>
                    ) : (
                      orders.map(order => (
                        <tr key={order.id} className="hover:bg-amber-50 transition-colors">
                          <td className="p-6 font-bold">{order.id}</td>
                          <td className="p-6 text-sm text-gray-600">{order.date}</td>
                          <td className="p-6">{order.customerPhone}</td>
                          <td className="p-6 font-bold text-[#8b1a1a]">Rs. {order.total}</td>
                          <td className="p-6">
                            <span className={`px-4 py-1 rounded-full text-xs font-bold ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
