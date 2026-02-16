
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES } from './data/mockData';
import { Product, CartItem, PlatingFinish, OrderDetails, Order, OrderStatus, SiteConfig } from './types';

const INITIAL_SITE_CONFIG: SiteConfig = {
  heroTitle: "Engineered For Denim Excellence",
  heroSubtitle: "Bangladesh's leading manufacturer of high-precision shanks, rivets, and trims. Supplying wholesale solutions to major global garment exporters.",
  contactPhone: "+880 1712 345678",
  contactEmail: "info@mahmudaccessories.com",
  footerAbout: "Leading manufacturer of high-quality metal buttons and trims for the global denim industry. Proudly serving the Bangladesh apparel sector since 1998.",
  address: "Plot 12, Industrial Area, Uttara, Dhaka, Bangladesh"
};

const App: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mahmud_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mahmud_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('mahmud_config');
    return saved ? JSON.parse(saved) : INITIAL_SITE_CONFIG;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderConfirmationId, setOrderConfirmationId] = useState<string | null>(null);

  // Sync with LocalStorage
  useEffect(() => { localStorage.setItem('mahmud_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('mahmud_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('mahmud_config', JSON.stringify(siteConfig)); }, [siteConfig]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory, products]);

  const handleAddToCart = (quantity: number, finish: PlatingFinish | null) => {
    if (!selectedProduct) return;
    const existingItemIndex = cart.findIndex(
      item => item.productId === selectedProduct.id && item.variantCode === finish?.code
    );

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, {
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        variantCode: finish?.code || 'BASE',
        variantName: finish?.name || 'Standard',
        quantity,
        unitType: selectedProduct.unitType,
        price: selectedProduct.basePrice,
        image: selectedProduct.images[0]
      }]);
    }
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantCode: string) => {
    setCart(cart.filter(item => !(item.productId === productId && item.variantCode === variantCode)));
  };

  const handleCheckout = (details: OrderDetails) => {
    const newOrderId = `MA-${Math.floor(Math.random() * 900000) + 100000}`;
    const newOrder: Order = {
      id: newOrderId,
      details,
      items: cart,
      totalAmount: cart.reduce((s, i) => s + (i.price * i.quantity), 0),
      status: OrderStatus.PENDING,
      createdAt: new Date().toISOString()
    };
    setOrders([...orders, newOrder]);
    setCart([]);
    setIsCartOpen(false);
    setOrderConfirmationId(newOrderId);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      setIsAdminAuthenticated(true);
      setPasswordInput('');
    } else {
      alert('ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।');
    }
  };

  if (isAdminMode && isAdminAuthenticated) {
    return (
      <AdminPanel 
        products={products}
        orders={orders}
        siteConfig={siteConfig}
        onUpdateProducts={setProducts}
        onUpdateOrders={setOrders}
        onUpdateSiteConfig={setSiteConfig}
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setIsAdminMode(false);
        }}
      />
    );
  }

  if (isAdminMode && !isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-10 max-w-sm w-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rounded-3xl animate-in fade-in zoom-in duration-300">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#1e3a8a] text-[#d4af37] rounded-2xl flex items-center justify-center mx-auto mb-6 font-black text-4xl shadow-2xl">M</div>
            <h2 className="text-2xl font-black uppercase tracking-widest text-slate-800 mb-2">Admin Portal</h2>
            <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase">Mahmud Accessories Ltd.</p>
          </div>
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Security Passphrase</label>
              <input 
                type="password" 
                autoFocus
                className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl text-center font-black text-xl focus:border-[#1e3a8a] focus:bg-white outline-none transition-all"
                placeholder="••••••••"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-[#1e3a8a] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#152961] transition-all shadow-xl active:scale-95">Verify Identity</button>
            <button type="button" onClick={() => setIsAdminMode(false)} className="w-full text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-4 hover:text-slate-600">Return to Storefront</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cart.length}
        onHomeClick={() => {
          setSelectedCategory('All');
          setSelectedProduct(null);
          setOrderConfirmationId(null);
        }}
      />
      
      <main className="flex-1">
        {orderConfirmationId ? (
          <div className="max-w-xl mx-auto py-24 px-4 text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tighter mb-4">অর্ডার সফল হয়েছে!</h2>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              আপনার হোলসেল রিকুয়েস্ট (ID: <span className="text-[#1e3a8a] font-black">{orderConfirmationId}</span>) আমাদের এডমিন প্যানেলে জমা হয়েছে। মাহমুদ এক্সেসরিজ লিমিটেড-এর পক্ষ থেকে ফ্যাক্টরি ভেরিফিকেশনের পর আপনার সাথে দ্রুত যোগাযোগ করা হবে।
            </p>
            <button 
              onClick={() => setOrderConfirmationId(null)}
              className="bg-[#1e3a8a] text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
            >
              আরো ব্রাউজ করুন
            </button>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="bg-[#1e3a8a] py-32 px-4 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
              <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
                  {siteConfig.heroTitle.split(' ').map((word, i) => 
                    word.toLowerCase() === 'denim' ? <span key={i} className="text-[#d4af37]"> {word} </span> : word + ' '
                  )}
                </h2>
                <p className="text-xl text-white/60 mb-12 font-medium tracking-wide max-w-2xl mx-auto leading-relaxed">
                  {siteConfig.heroSubtitle}
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <button className="bg-[#d4af37] text-[#1e3a8a] px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)]">
                    Catalog View
                  </button>
                  <button className="bg-white/5 border border-white/20 text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm">
                    Sample Pack
                  </button>
                </div>
              </div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-4 py-12 overflow-x-auto no-scrollbar border-b border-slate-100 flex justify-center">
              <div className="flex items-center space-x-4 min-w-max p-2">
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${selectedCategory === 'All' ? 'bg-[#1e3a8a] text-white shadow-xl scale-105' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                  All Trims
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${selectedCategory === cat ? 'bg-[#1e3a8a] text-white shadow-xl scale-105' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Products */}
            <section className="max-w-7xl mx-auto px-4 py-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={(p) => setSelectedProduct(p)} 
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
      
      {/* Stealth Admin Link */}
      <div className="bg-slate-950 border-t border-white/5 py-8 text-center">
        <button 
          onClick={() => setIsAdminMode(true)}
          className="text-slate-800 hover:text-white/40 text-[9px] uppercase font-black tracking-[0.4em] transition-all duration-500"
        >
          Factory Administration Gateway
        </button>
      </div>

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={handleAddToCart}
        />
      )}

      {isCartOpen && (
        <Cart 
          items={cart} 
          onClose={() => setIsCartOpen(false)} 
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
      )}

      <WhatsAppButton />
    </div>
  );
};

export default App;
