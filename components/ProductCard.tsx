
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const FALLBACK_IMAGE = "https://placehold.co/600x600/1e3a8a/d4af37?text=Image+Not+Found";

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div 
      onClick={() => onClick(product)}
      className="bg-white border border-slate-200 group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col rounded-2xl overflow-hidden shadow-sm"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={handleImageError}
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
            <span className="bg-[#1e3a8a] text-white px-3 py-1 text-[10px] font-black border border-white/20 rounded-lg shadow-lg">
                MOQ: {product.moq} {product.unitType}
            </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-2">
          {product.category}
        </p>
        <h3 className="font-black text-slate-800 text-base mb-4 line-clamp-2 leading-tight group-hover:text-[#1e3a8a] transition-colors uppercase tracking-tight">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-black block tracking-widest">Starting From</span>
            <span className="font-black text-xl text-slate-900 tracking-tighter">৳{product.basePrice.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 font-bold"> / {product.unitType}</span>
          </div>
          <div className="flex -space-x-1">
            {product.platingFinishes.slice(0, 3).map(f => (
              <div 
                key={f.code}
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: f.hex }}
                title={f.name}
              />
            ))}
            {product.platingFinishes.length > 3 && (
              <div className="w-4 h-4 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[7px] font-black text-slate-500 shadow-sm">
                +{product.platingFinishes.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
