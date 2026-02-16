
import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onRemove: (productId: string, variantCode: string) => void;
  onCheckout: (details: OrderDetails) => void;
}

const Cart: React.FC<CartProps> = ({ items, onClose, onRemove, onCheckout }) => {
  const [step, setStep] = useState<'items' | 'details'>('items');
  const [details, setDetails] = useState<OrderDetails>({
    factoryName: '',
    licenseNo: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: ''
  });

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const isFormValid = details.factoryName && details.contactPerson && details.phone && details.address;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/60" onClick={onClose} />
      
      <div className="absolute top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="p-6 bg-[#1e3a8a] text-white flex items-center justify-between">
          <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Order Summary
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === 'items' ? (
            <div className="space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="font-medium">Your order is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.productId}-${item.variantCode}`} className="flex gap-4 p-3 border border-slate-100 hover:border-slate-200 transition-all">
                    <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover bg-slate-50" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm text-slate-800">{item.productName}</h4>
                        <button 
                          onClick={() => onRemove(item.productId, item.variantCode)}
                          className="text-slate-300 hover:text-red-500"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">{item.variantCode} - {item.variantName}</p>
                      <div className="flex justify-between items-end mt-2">
                        <p className="text-xs text-slate-600">
                          {item.quantity} {item.unitType} @ ৳{item.price}
                        </p>
                        <p className="font-bold text-[#1e3a8a]">৳{(item.quantity * item.price).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest border-b pb-2">B2B Order Verification</h3>
              <div className="space-y-3">
                <input 
                  name="factoryName"
                  placeholder="Factory/Company Name *"
                  className="w-full border p-3 text-sm focus:ring-1 focus:ring-[#1e3a8a] outline-none"
                  value={details.factoryName}
                  onChange={handleDetailsChange}
                />
                <input 
                  name="licenseNo"
                  placeholder="Garment License No (Optional)"
                  className="w-full border p-3 text-sm focus:ring-1 focus:ring-[#1e3a8a] outline-none"
                  value={details.licenseNo}
                  onChange={handleDetailsChange}
                />
                <input 
                  name="contactPerson"
                  placeholder="Contact Person *"
                  className="w-full border p-3 text-sm focus:ring-1 focus:ring-[#1e3a8a] outline-none"
                  value={details.contactPerson}
                  onChange={handleDetailsChange}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    name="phone"
                    placeholder="Phone Number *"
                    className="w-full border p-3 text-sm focus:ring-1 focus:ring-[#1e3a8a] outline-none"
                    value={details.phone}
                    onChange={handleDetailsChange}
                  />
                  <input 
                    name="email"
                    placeholder="Work Email"
                    className="w-full border p-3 text-sm focus:ring-1 focus:ring-[#1e3a8a] outline-none"
                    value={details.email}
                    onChange={handleDetailsChange}
                  />
                </div>
                <textarea 
                  name="address"
                  placeholder="Factory Shipping Address *"
                  rows={3}
                  className="w-full border p-3 text-sm focus:ring-1 focus:ring-[#1e3a8a] outline-none"
                  value={details.address}
                  onChange={handleDetailsChange}
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Valuation</p>
            <p className="text-2xl font-black text-[#1e3a8a]">৳{subtotal.toLocaleString()}</p>
          </div>

          {step === 'items' ? (
            <button 
              onClick={() => items.length > 0 && setStep('details')}
              disabled={items.length === 0}
              className="w-full bg-[#1e3a8a] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#1a357a] transition-all disabled:bg-slate-300 shadow-xl"
            >
              Proceed to Details
            </button>
          ) : (
            <div className="space-y-3">
              <button 
                onClick={() => isFormValid && onCheckout(details)}
                disabled={!isFormValid}
                className="w-full bg-[#d4af37] text-slate-900 py-4 font-bold uppercase tracking-widest hover:bg-[#c0a030] transition-all disabled:bg-slate-200 shadow-xl"
              >
                Submit Bulk Order
              </button>
              <button 
                onClick={() => setStep('items')}
                className="w-full text-slate-500 text-xs font-bold uppercase tracking-widest"
              >
                Back to Cart
              </button>
            </div>
          )}
          <p className="text-[10px] text-slate-400 text-center mt-4">
            * Wholesale invoice will be generated after manual factory validation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
