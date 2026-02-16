
import React, { useState, useEffect } from 'react';
import { Product, PlatingFinish, UnitType } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (quantity: number, finish: PlatingFinish | null) => void;
  onClose: () => void;
}

const FALLBACK_IMAGE = "https://placehold.co/600x600/1e3a8a/d4af37?text=Image+Not+Found";

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onClose }) => {
  const [selectedFinish, setSelectedFinish] = useState<PlatingFinish | null>(
    product.platingFinishes.length > 0 ? product.platingFinishes[0] : null
  );
  const [quantity, setQuantity] = useState<number>(product.moq);
  const [activeImage, setActiveImage] = useState(product.images[0]);

  useEffect(() => {
    setActiveImage(product.images[0]);
    setQuantity(product.moq);
  }, [product]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleQuantityChange = (val: number) => {
    if (val < product.moq) return;
    setQuantity(val);
  };

  const totalPrice = quantity * product.basePrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row rounded-[2rem] overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-slate-100/50 hover:bg-slate-200 rounded-full text-slate-800 transition-all active:scale-90"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col gap-6 bg-slate-50/50">
          <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-inner border border-slate-100">
             <img 
               src={activeImage} 
               alt={product.name} 
               className="w-full h-full object-contain p-8" 
               onError={handleImageError}
             />
          </div>
          <div className="flex gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all ${activeImage === img ? 'border-[#1e3a8a] shadow-lg scale-105' : 'border-white hover:border-slate-200'}`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" onError={handleImageError} />
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-12 flex flex-col">
          <span className="text-[10px] font-black text-[#1e3a8a] uppercase tracking-[0.3em] mb-3">{product.category}</span>
          <h2 className="text-4xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">{product.name}</h2>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="space-y-10">
            {/* Plating Chart Selection */}
            {product.platingFinishes.length > 0 && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">
                  Finish Standards (Industry Chart)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {product.platingFinishes.map((finish) => (
                    <button
                      key={finish.code}
                      onClick={() => setSelectedFinish(finish)}
                      className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${
                        selectedFinish?.code === finish.code 
                          ? 'border-[#1e3a8a] bg-blue-50/50 shadow-md ring-1 ring-[#1e3a8a]' 
                          : 'border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div 
                        className="w-10 h-10 rounded-lg border border-slate-200 mb-2 shadow-sm" 
                        style={{ backgroundColor: finish.hex }}
                      />
                      <span className="text-[10px] font-black uppercase tracking-tighter text-slate-800">{finish.code}</span>
                      <span className="text-[8px] text-slate-400 text-center font-bold">{finish.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bulk Quantity Logic */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Bulk Wholesale Quantity
                </label>
                <span className="text-[10px] text-emerald-600 font-black tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">Min Req: {product.moq} {product.unitType}</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center bg-white border-2 border-slate-100 rounded-2xl p-1 shadow-sm">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-400 font-black text-xl transition-colors disabled:opacity-20"
                    disabled={quantity <= product.moq}
                  >
                    −
                  </button>
                  <input 
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || product.moq)}
                    className="w-20 text-center font-black text-slate-900 text-lg outline-none bg-transparent"
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-900 font-black text-xl transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm font-black text-slate-400 uppercase tracking-widest">
                  Total Units: <span className="text-[#1e3a8a] text-xl font-black">{quantity * (product.unitType === UnitType.GROSS ? 144 : 1)}</span> <span className="text-[10px]">PCS</span>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="pt-8 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">Estimated Invoice Subtotal</p>
                <p className="text-4xl font-black text-slate-900 tracking-tighter">৳{totalPrice.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Unit Rate</p>
                <p className="text-lg font-black text-[#d4af37]">৳{product.basePrice} / {product.unitType}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button 
                onClick={() => onAddToCart(quantity, selectedFinish)}
                className="bg-[#1e3a8a] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-blue-800 transition-all shadow-2xl active:scale-[0.98] text-xs"
              >
                Add To Request
              </button>
              <button 
                className="bg-white border-2 border-slate-100 text-slate-800 py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-[0.98] text-xs shadow-sm"
              >
                Get Sample
              </button>
            </div>
            
            <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest text-center leading-relaxed">
              * Wholesale rates fluctuate based on raw material market index. 
              <br />Logo engraving setup requires a one-time mold fee of ৳5,000.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
