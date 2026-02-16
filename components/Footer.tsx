
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center space-x-2 mb-6 text-white">
            <div className="w-8 h-8 bg-[#d4af37] rounded flex items-center justify-center font-bold text-lg text-[#1e3a8a]">
              M
            </div>
            <h1 className="font-bold text-lg leading-tight uppercase tracking-wider">Mahmud</h1>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Leading manufacturer of high-quality metal buttons and trims for the global denim industry. Proudly serving the Bangladesh apparel sector since 1998.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Solutions</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Metal Button Engraving</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Custom Plating Lab</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Eco-Friendly Trims</a></li>
            <li><a href="#" className="hover:text-white transition-colors">OEKO-TEX Certified</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Corporate</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Factory Compliance</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Annual Audit Report</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Wholesale</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Connect</h4>
          <p className="text-sm mb-4">Plot 12, Industrial Area, Uttara, Dhaka, Bangladesh</p>
          <p className="text-sm mb-4">Email: info@mahmudaccessories.com</p>
          <p className="text-sm">Phone: +880 1712 345678</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs">© 2024 Mahmud Accessories Ltd. All rights reserved.</p>
        <div className="flex space-x-6">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d4af37]">ISO 9001 Certified</span>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d4af37]">OEKO-TEX Standard 100</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
