
import React from 'react';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartCount, onHomeClick }) => {
  return (
    <nav className="bg-[#1e3a8a] text-white sticky top-0 z-40 shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={onHomeClick}
        >
          <div className="w-10 h-10 bg-[#d4af37] rounded flex items-center justify-center font-bold text-xl shadow-inner">
            M
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight uppercase tracking-wider">Mahmud</h1>
            <p className="text-[10px] text-slate-300 tracking-[0.2em] uppercase">Accessories Ltd.</p>
          </div>
        </div>

        <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
          <button onClick={onHomeClick} className="hover:text-[#d4af37] transition-colors">Catalog</button>
          <a href="#" className="hover:text-[#d4af37] transition-colors">Plating Chart</a>
          <a href="#" className="hover:text-[#d4af37] transition-colors">Factory Compliance</a>
          <a href="#" className="hover:text-[#d4af37] transition-colors">Contact</a>
        </div>

        <div className="flex items-center space-x-6">
          <button 
            onClick={onCartClick}
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#d4af37] text-[#1e3a8a] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1e3a8a]">
                {cartCount}
              </span>
            )}
          </button>
          <button className="bg-white/10 px-4 py-2 rounded text-xs font-semibold hover:bg-white/20 transition-all border border-white/20">
            PORTAL LOGIN
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
