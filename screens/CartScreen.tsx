import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col min-h-screen w-full mx-auto shadow-2xl bg-bg-light">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-bg-light/95 backdrop-blur-md border-b border-gray-200/50">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-black/5 transition-colors">
          <span className="material-symbols-outlined text-text-main" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-text-main">Your Basket</h1>
        <button className="flex items-center justify-center w-10 h-10 -mr-2 text-sm font-medium text-gray-500 hover:text-black transition-colors">
            Edit
        </button>
      </header>

      <main className="flex-1 pb-32 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-1 p-4">
            {/* Cart Item 1 */}
            <div className="group relative flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="relative shrink-0 overflow-hidden rounded-lg w-[88px] h-[88px] bg-gray-100">
                    <img alt="Item" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFbXfSAdg2HhiP7OLCJ8zJKB52urX0Grh8BtjvYBXCNcW7hl2wexVayI0a1jC0GiHnsVgL7S7K_5Nd4rtoQtQ78mx4TmG7lEBr0dCevjqrrrNSyfMubVt2gr11rCj7H3omAcNS-qCHb4h1URYRoT6O8xpMOxf9rg72KOp6a_xYEiUzKrZEI_yL-RfMa2nLl1FQFP6S0e78UuDoSdF0BB-fgXkaR_32bgBb7wS0H7NP37X-YskLWW1iwYguJ2QOej65fttvuJR3NA"/>
                </div>
                <div className="flex flex-col flex-1 justify-between py-0.5">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="text-base font-semibold leading-tight text-text-main">Organic Onesie</h3>
                            <p className="text-base font-bold text-text-main">$32.00</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Sage Green • 0-3m</p>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                            <button className="w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:text-primary transition-colors"><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>remove</span></button>
                            <span className="text-sm font-semibold w-4 text-center text-text-main">1</span>
                            <button className="w-6 h-6 flex items-center justify-center rounded-full text-primary bg-white shadow-sm hover:bg-blue-50 transition-colors"><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span></button>
                        </div>
                        <button className="text-xs font-medium text-red-500/80 hover:text-red-600 underline decoration-red-500/30 underline-offset-2">Remove</button>
                    </div>
                </div>
            </div>

            {/* Cart Item 2 */}
            <div className="group relative flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md mt-3">
                <div className="relative shrink-0 overflow-hidden rounded-lg w-[88px] h-[88px] bg-gray-100">
                    <img alt="Item" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1pS_e4FQvBIabjhb95KMZTgR7VMDrFb5Ig6CjHv6csrMGX_9mDejtl7f4oILsCUcZYORrcLuQTn9svXPOx0H08b-G53slJLUqrHK8tROzLnpuFqLFrlWjc8Ws-nSZTYvAGuQxxirYpaf8rNjT3CIP31gz3eG3sl8NYKguaqEdT5BcH6_DGKvBzADQrtoEnBsCT80vGCu1MuUrFnimTRSVoq5n1RnRjkqk5WFFiPvVDmiR2nd5IA7nLPVelmtTJ6Xx5NK5Qck_AQ"/>
                </div>
                <div className="flex flex-col flex-1 justify-between py-0.5">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="text-base font-semibold leading-tight text-text-main">Hand-Knit Booties</h3>
                            <p className="text-base font-bold text-text-main">$24.00</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Cream • Newborn</p>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                            <button className="w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:text-primary transition-colors"><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>remove</span></button>
                            <span className="text-sm font-semibold w-4 text-center text-text-main">1</span>
                            <button className="w-6 h-6 flex items-center justify-center rounded-full text-primary bg-white shadow-sm hover:bg-blue-50 transition-colors"><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span></button>
                        </div>
                        <button className="text-xs font-medium text-red-500/80 hover:text-red-600 underline decoration-red-500/30 underline-offset-2">Remove</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="h-px w-full bg-gray-200 my-2"></div>

        {/* Promo Code */}
        <div className="px-4 py-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Discount Code</label>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '20px' }}>sell</span>
                    </div>
                    <input className="block w-full pl-10 pr-3 py-3 rounded-lg border-gray-200 bg-white text-sm text-text-main placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" placeholder="Enter gift code" type="text"/>
                </div>
                <button className="px-5 py-2.5 bg-text-main text-white font-semibold rounded-lg text-sm hover:bg-gray-800 transition-colors">Apply</button>
            </div>
        </div>

        {/* Badges */}
        <div className="px-4 py-2">
            <div className="grid grid-cols-3 gap-2 bg-primary/10 rounded-xl p-4 border border-primary/20">
                {[
                    { icon: 'eco', label: 'Organic' },
                    { icon: 'map', label: 'Canada Made' },
                    { icon: 'verified_user', label: 'Secure' }
                ].map((badge, idx) => (
                    <div key={idx} className={`flex flex-col items-center gap-1 text-center ${idx === 1 ? 'border-l border-r border-blue-100' : ''}`}>
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>{badge.icon}</span>
                        <span className="text-[10px] uppercase tracking-wide font-bold text-slate-600">{badge.label}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Summary */}
        <div className="p-4 mt-2">
            <h2 className="text-sm font-semibold text-text-main mb-4">Order Summary</h2>
            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-text-main">$56.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Shipping Estimate</span>
                    <span className="font-medium text-primary">Free</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span className="font-medium text-text-main">$0.00</span>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-base font-bold text-text-main">Total</span>
                    <span className="text-xl font-bold text-text-main">$56.00</span>
                </div>
            </div>
        </div>

        <div className="p-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 text-xs text-gray-500">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>info</span>
                <p>Free returns within 30 days of delivery.</p>
            </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-white/90 backdrop-blur-lg border-t border-gray-100 safe-bottom">
        <button 
            onClick={() => navigate('/checkout')}
            className="group w-full relative flex items-center justify-between bg-primary hover:bg-primary-dark active:scale-[0.98] text-[#111712] rounded-full h-14 px-6 transition-all shadow-[0_4px_14px_0_rgba(184,216,234,0.5)]"
        >
            <span className="font-bold text-base">Checkout</span>
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold opacity-80 border-r border-black/20 pr-3 mr-1">2 items</span>
                <span className="font-bold text-lg">$56.00</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontSize: '20px' }}>arrow_forward</span>
            </div>
        </button>
      </div>
    </div>
  );
};

export default CartScreen;