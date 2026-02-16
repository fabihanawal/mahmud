
import React, { useState } from 'react';
import { Product, Order, OrderStatus, SiteConfig, UnitType } from '../types';

interface AdminPanelProps {
  products: Product[];
  orders: Order[];
  siteConfig: SiteConfig;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateOrders: (orders: Order[]) => void;
  onUpdateSiteConfig: (config: SiteConfig) => void;
  onLogout: () => void;
}

const FALLBACK_IMAGE = "https://placehold.co/600x600/1e3a8a/d4af37?text=Image+Not+Found";

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, orders, siteConfig, onUpdateProducts, onUpdateOrders, onUpdateSiteConfig, onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'site'>('orders');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const newOrders = orders.map(o => o.id === orderId ? { ...o, status } : o);
    onUpdateOrders(newOrders);
  };

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name) return;

    if (editingProduct.id) {
      onUpdateProducts(products.map(p => p.id === editingProduct.id ? (editingProduct as Product) : p));
    } else {
      const newProduct: Product = {
        ...editingProduct as Product,
        id: Date.now().toString(),
        slug: editingProduct.name.toLowerCase().replace(/ /g, '-'),
        images: editingProduct.images && editingProduct.images.length > 0 
          ? editingProduct.images 
          : ['https://images.unsplash.com/photo-1590736962236-41398835f6a9?auto=format&fit=crop&q=80&w=800'],
        platingFinishes: editingProduct.platingFinishes || []
      };
      onUpdateProducts([...products, newProduct]);
    }
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1e3a8a] text-white flex flex-col shadow-2xl z-20">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#d4af37] rounded-lg flex items-center justify-center font-black text-[#1e3a8a] shadow-inner text-xl">M</div>
            <span className="font-black tracking-widest uppercase text-base">Mahmud Admin</span>
          </div>
          <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold">Control Center</p>
        </div>
        
        <nav className="flex-1 p-6 space-y-3">
          {[
            { id: 'orders', label: 'Order Requests', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
            { id: 'products', label: 'Inventory Manager', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { id: 'site', label: 'Site Customization', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab.id 
                ? 'bg-white text-[#1e3a8a] shadow-[0_10px_20px_rgba(0,0,0,0.2)]' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {tab.label}
              {tab.id === 'orders' && orders.filter(o => o.status === OrderStatus.PENDING).length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {orders.filter(o => o.status === OrderStatus.PENDING).length}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="p-8 border-t border-white/10">
          <button onClick={onLogout} className="flex items-center gap-3 text-white/50 hover:text-red-400 text-xs font-black uppercase tracking-widest transition-colors w-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            System Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 overflow-y-auto p-12 bg-slate-50">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2">
              {activeTab === 'orders' ? 'Wholesale Orders' : activeTab === 'products' ? 'Product Inventory' : 'Site Settings'}
            </h1>
            <p className="text-slate-400 text-sm font-medium">Manage your factory operations and digital storefront.</p>
          </div>
          {activeTab === 'products' && (
            <button 
              onClick={() => setEditingProduct({ name: '', category: 'Metal Buttons', basePrice: 0, unitType: UnitType.GROSS, moq: 1, images: [''] })}
              className="bg-[#1e3a8a] text-white px-8 py-3 rounded-lg text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Add New SKU
            </button>
          )}
        </header>

        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase font-black text-[10px] tracking-[0.2em]">
                <tr>
                  <th className="px-8 py-6">Reference & Factory</th>
                  <th className="px-8 py-6">Item Breakdown</th>
                  <th className="px-8 py-6">Valuation</th>
                  <th className="px-8 py-6">Workflow Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="text-[10px] font-black text-[#1e3a8a] mb-1">#{order.id}</div>
                      <div className="font-black text-slate-800 uppercase text-sm mb-1">{order.details.factoryName}</div>
                      <div className="text-[11px] text-slate-500 font-bold uppercase">{order.details.contactPerson} • {order.details.phone}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-xs font-medium text-slate-600">
                            {item.quantity} {item.unitType} - {item.productName} ({item.variantCode})
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-lg font-black text-slate-800">৳{order.totalAmount.toLocaleString()}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        order.status === OrderStatus.PENDING ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-200' :
                        order.status === OrderStatus.CONFIRMED ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200' :
                        'bg-rose-100 text-rose-700 ring-1 ring-rose-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-2">
                        {order.status === OrderStatus.PENDING && (
                          <>
                            <button 
                              onClick={() => updateOrderStatus(order.id, OrderStatus.CONFIRMED)}
                              className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                              title="Confirm Order"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => updateOrderStatus(order.id, OrderStatus.CANCELLED)}
                              className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                              title="Reject Order"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden border border-slate-100">
                    <img 
                      src={p.images[0]} 
                      alt={p.name} 
                      className="w-full h-full object-cover" 
                      onError={handleImageError}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingProduct(p)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button onClick={() => onUpdateProducts(products.filter(item => item.id !== p.id))} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{p.category}</div>
                <h3 className="font-black text-slate-800 text-lg mb-4">{p.name}</h3>
                <div className="flex justify-between items-end pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Base Rate</div>
                    <div className="font-black text-slate-900">৳{p.basePrice} / {p.unitType}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">MOQ</div>
                    <div className="font-black text-[#1e3a8a]">{p.moq} {p.unitType}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'site' && (
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 max-w-3xl">
            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs">01</span>
                  Hero Section Content
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-2">Main Headline</label>
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#1e3a8a] outline-none transition-all"
                      value={siteConfig.heroTitle}
                      onChange={e => onUpdateSiteConfig({...siteConfig, heroTitle: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-2">Hero Description</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1e3a8a] outline-none transition-all"
                      rows={3}
                      value={siteConfig.heroSubtitle}
                      onChange={e => onUpdateSiteConfig({...siteConfig, heroSubtitle: e.target.value})}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>

      {/* Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={saveProduct} className="bg-white w-full max-w-2xl rounded-3xl p-10 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-300">
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-4">
              <span className="w-10 h-10 bg-[#1e3a8a] text-[#d4af37] rounded-xl flex items-center justify-center text-xl shadow-lg">SKU</span>
              {editingProduct.id ? 'Modify SKU' : 'Add New SKU'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-2">Full Product Name</label>
                <input 
                  required
                  placeholder="e.g. 17mm Copper Alloy Shank Button"
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-black focus:ring-2 focus:ring-[#1e3a8a] outline-none transition-all"
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-2">Primary Image URL</label>
                <input 
                  required
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1e3a8a] outline-none transition-all"
                  value={editingProduct.images?.[0] || ''}
                  onChange={e => setEditingProduct({...editingProduct, images: [e.target.value]})}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-2">Unit Rate (৳)</label>
                <input 
                  type="number"
                  required
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-black focus:ring-2 focus:ring-[#1e3a8a] outline-none transition-all"
                  value={editingProduct.basePrice}
                  onChange={e => setEditingProduct({...editingProduct, basePrice: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-2">Ordering Unit</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-black focus:ring-2 focus:ring-[#1e3a8a] outline-none transition-all"
                  value={editingProduct.unitType}
                  onChange={e => setEditingProduct({...editingProduct, unitType: e.target.value as UnitType})}
                >
                  {Object.values(UnitType).map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-2">MOQ Limit</label>
                <input 
                  type="number"
                  required
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-black focus:ring-2 focus:ring-[#1e3a8a] outline-none transition-all"
                  value={editingProduct.moq}
                  onChange={e => setEditingProduct({...editingProduct, moq: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-2">Inventory Category</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-black focus:ring-2 focus:ring-[#1e3a8a] outline-none transition-all"
                  value={editingProduct.category}
                  onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="flex-1 bg-[#1e3a8a] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-blue-800 transition-all">Save SKU</button>
              <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 bg-slate-100 text-slate-500 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all">Discard</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
