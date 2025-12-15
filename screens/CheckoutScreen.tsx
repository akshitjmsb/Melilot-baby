import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(true);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-bg-light pb-32">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-bg-light/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center p-4 justify-between">
          <button onClick={() => navigate(-1)} className="text-text-main flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-text-main text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Secure Checkout</h2>
        </div>
        
        {/* Progress Steps */}
        <div className="flex w-full flex-row items-center justify-center gap-2 pb-4">
          <div className="flex flex-col items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-slate-300"></div>
          </div>
          <div className="h-[2px] w-8 bg-slate-300"></div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-2.5 w-2.5 ring-4 ring-primary/30 rounded-full bg-primary"></div>
          </div>
          <div className="h-[2px] w-8 bg-slate-300"></div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-slate-300"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-6">
        {/* Shipping Section */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-slate-700">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </span>
              <h2 className="text-lg font-bold text-text-main">Shipping</h2>
            </div>
            <button className="text-slate-600 hover:text-primary transition-colors text-sm font-semibold">Edit</button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">First Name</label>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" placeholder="Jane" type="text"/>
              </div>
              <div className="flex-1 space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Name</label>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" placeholder="Doe" type="text"/>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</label>
              <div className="relative">
                <input className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" placeholder="123 Maple Street" type="text"/>
                <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 text-[20px]">home</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-[2] space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">City</label>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" placeholder="Toronto" type="text"/>
              </div>
              <div className="flex-1 space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Prov</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none">
                    <option>ON</option>
                    <option>QC</option>
                    <option>BC</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-3 pointer-events-none text-slate-400 text-[18px]">expand_more</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Section */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-slate-700">
                <span className="material-symbols-outlined text-[20px]">credit_card</span>
              </span>
              <h2 className="text-lg font-bold text-text-main">Payment</h2>
            </div>
            <div className="flex gap-2">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">lock</span>
              <span className="material-symbols-outlined text-slate-400 text-[20px]">verified_user</span>
            </div>
          </div>
          <div className="p-5 space-y-5">
            <button className="w-full bg-black text-white h-12 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
              <span className="font-medium text-lg tracking-tight"> Pay</span>
            </button>
            <div className="relative flex items-center gap-3">
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-xs text-slate-400 uppercase font-medium">Or pay with card</span>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>
            
            {/* Card Form */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Card Number</label>
                <div className="relative">
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" placeholder="0000 0000 0000 0000" type="text"/>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 text-[20px]">payment</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expiry</label>
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" placeholder="MM/YY" type="text"/>
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">CVC</label>
                  <div className="relative">
                    <input className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400" placeholder="123" type="text"/>
                    <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 text-[18px]">help</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" defaultChecked />
              <label className="text-sm text-slate-600">Save this card for future purchases</label>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <button 
            onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
            className="w-full p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-slate-700">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              </span>
              <h2 className="text-lg font-bold text-text-main">Order Summary</h2>
            </div>
            <span className={`material-symbols-outlined text-slate-400 transition-transform ${isOrderSummaryOpen ? 'rotate-180' : ''}`}>expand_more</span>
          </button>
          
          {isOrderSummaryOpen && (
              <div className="px-5 pb-5 border-t border-slate-100 pt-4 animate-in slide-in-from-top-2 duration-200">
                <div className="flex gap-4 mb-4">
                  <div className="h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 relative">
                    <img alt="Item" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA48uxOfXgVash60ncE1RXuVaCpkVkL5x0SclwdXVZ3NzHz_zPfoy7gAE0arOXQxYuTatElqg5ytRHjxZb4L3PHLuoiv-GRfe2ljufPF-_g93fKCpFO-gKNRFNZgxdausn2lBSeAVgCEQmx_UmVRHlaJ8xJ5zEAg1Sfc-pECO9ioRE4zJLwOcyDLeYvYMMJ41WfK8wAz0eQDaeDwDBYfwfZNX7-6SEkz2fnYlC9NyQmDspKyllO10rfM-66IA8oXe4bto80EuhpLA"/>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-text-main leading-tight">Organic Cotton Onesie</h3>
                    <p className="text-xs text-slate-500 mt-1">Size: 3-6M • Cream</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-semibold text-text-main">$32.00</p>
                      <span className="text-xs text-slate-400">Qty: 1</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mb-6">
                  <div className="h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 relative">
                    <img alt="Item" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHjIg6iwTlCGpbqfSVnC1MVSRaytMkca8llj1MZy4AfGn5PAurzRDKZW2GycEbW-mXGWEqHlI8AO1AvqV-mRfp_0_ViAflyMr780gFnoDGnQuOkHqBq-fFDOgJxEwGdDq5vMG_VveksYqaWzR9ExwllDYxhECuDEM6j6zU96CTPnTJ9JtpidagGEvMBA9rCv3e4dTFzKB7wfc3HFJoKcdPWwNFdwmRfMIsAGneVWBmXvUkQ4mCS8sAgHtvD8cF2Du6gbLXxbjsEg"/>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-text-main leading-tight">Merino Wool Socks</h3>
                    <p className="text-xs text-slate-500 mt-1">Size: 0-6M • Oatmeal</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-semibold text-text-main">$18.00</p>
                      <span className="text-xs text-slate-400">Qty: 1</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-dashed border-slate-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium text-text-main">$50.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Shipping (Canada Post)</span>
                    <span className="font-medium text-text-main">$12.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">HST (13%)</span>
                    <span className="font-medium text-text-main">$8.06</span>
                  </div>
                </div>
              </div>
          )}
        </section>

        <p className="text-center text-xs text-slate-400 px-8 leading-relaxed">
          By placing your order, you agree to our <a className="underline hover:text-primary" href="#">Terms of Service</a> and <a className="underline hover:text-primary" href="#">Privacy Policy</a>.
        </p>
      </main>

      {/* Footer / Place Order */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4 pb-8 z-30 shadow-[0_-5px_15px_rgba(0,0,0,0.02)] safe-bottom">
        <div className="max-w-md mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Total CAD</span>
            <span className="text-2xl font-bold text-text-main tracking-tight">$70.06</span>
          </div>
          <button 
            onClick={() => { alert('Order placed!'); navigate('/home'); }}
            className="flex-1 h-14 bg-primary text-[#111712] rounded-full font-bold text-lg hover:bg-primary-dark active:scale-[0.98] transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
          >
            <span>Place Order</span>
            <span className="material-symbols-outlined text-[20px] font-bold">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutScreen;