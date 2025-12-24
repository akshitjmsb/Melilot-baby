import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationDrawer from '../components/NavigationDrawer';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-bg-light">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>eco</span>
          <span className="text-xl font-bold tracking-tight text-text-main">Petit Coton</span>
        </div>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined text-gray-600">menu</span>
        </button>
      </header>

      {/* Hero Content */}
      <div className="px-4 pb-2">
        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-sm group">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHuPmoD9fy21b692VFGxHQTuD2iFRjDiyKCEmROYQrzNaqVEykJb7LGA_feCxaA1ZitLxe92TeObpzj9a2aYCXlOHCL0e8-aa3H3aqF_5aVr3RiyY_tEmbXB-W8INS0G2OG-ttZZbM6u7x_jaPDzRr-W2Ui_XeWfB76yZfa8EOmIN0ULQPNxhRAz1C_g1WrK0bBWSpG5B59lGrKVxfTvFoExNCcSXN7YSaqKdGbXUshNrTmrH9RyM81E7DhrxXQg3bS4qhMt-Wbw")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-3 items-start">
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/90 text-text-main text-xs font-bold backdrop-blur-sm shadow-sm">
              New Collection
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="text-white text-3xl font-bold leading-tight tracking-tight">Softness Stitched<br/>with Love</h2>
              <p className="text-white/90 text-sm font-medium leading-relaxed max-w-[260px]">
                100% Organic. Hand-made in Canada. Pure comfort for delicate skin.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Promise Section */}
      <div className="pt-8 pb-3 px-6 flex items-center justify-between">
        <h3 className="text-text-main tracking-tight text-xl font-bold">Our Promise</h3>
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-gray-200"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-gray-200"></div>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-4 px-6 pb-6 no-scrollbar snap-x snap-mandatory">
        {[
            { title: "100% Organic", sub: "Certified pure cotton", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUZHQ8itHIHzF7CJSXPI5hEfSr9H-awmbnX228lt_OSjNBwe2IeJ_tb3VZEcBMoE_ShbekCHtdrVb3qyOVlQiqgg27hFkXQkXNI5FY4E8Sr7UeX3QrRT7uUYkqsJaeaqeGQ1wUJRzRXufX7zJEXFoOyUxB-0dQt-toxGvgOcDoymuUwaHxKe7zam-U5rTXRK3A4iidCPFHXDOCeOsUbt1fRMOdGZg6t2QKs8WXm5xq21M9yry2PBBODPo8SID8PWW8KDi2Z3IBeg" },
            { title: "Hand-stitched", sub: "Heirloom details", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVi7NRQ8QZR-96Egpcym957nxlVgb86SIs6AtnDCCvufjfj7Fq4c2BCroAl_QJF5gaFplbKsj3X3Sb-GuIGGcHmVF0_xKuht5uDyNNUqwUuhj68mp6_6cUCB_lygsEupwKSIchIOHaVe8eFeGP-GotyVz5qKk8Gt8uKF-n-nuzK97G2Zx51RWXxdraKKHLOoYx2Twt-9wJoqx5bkMSpc_fS9TIX2u2T19SqJOXvfSJp_1ds0Kft6bQnIVwsbtPxmt7mH2CXS60TA" },
            { title: "Canadian Roots", sub: "Made in Montreal", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqUAmrP-VrMkTo_Pz-AqHsQgN3p-6hUgEMIsSepg40JGTCb-YpmRpO1IUNwzmBuct8xeLwUDQxVNEJgeHSCggpClvuX5q-l9VFIgHiN_j5M1QSi_Pn8QscWkrHnVQOCEAmqVh4KoAP5YpPweSybfypPYUyfHv7bCqB2phaCVAlXUeNdnCDx9es9gTtkDS8-bb6SLZzsxQbXPbpfFOWjJ6iT7UNO58BnZIVc0TowjZXKQ_4Owaw4SQgL0hjeUY9VwakBlQjzFnR6Q" }
        ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-3 min-w-[150px] snap-center">
                <div 
                    className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-xl shadow-sm relative overflow-hidden" 
                    style={{ backgroundImage: `url("${item.img}")` }}
                >
                    <div className="absolute inset-0 bg-black/5"></div>
                </div>
                <div>
                    <p className="text-text-main text-base font-bold leading-tight">{item.title}</p>
                    <p className="text-gray-500 text-xs font-normal mt-1 leading-normal">{item.sub}</p>
                </div>
            </div>
        ))}
      </div>

      <div className="mt-auto p-6 bg-gradient-to-t from-white via-white to-transparent pt-10 sticky bottom-0 z-20">
        <button 
            onClick={() => navigate('/home')}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary hover:bg-primary-dark transition-all text-text-main text-lg font-bold shadow-lg shadow-primary/25 active:scale-[0.98]"
        >
          <span className="truncate mr-2">Start Shopping</span>
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
        <div className="mt-4 text-center">
          <button className="text-sm font-semibold text-gray-400 hover:text-primary transition-colors">
            Already a member? <span className="text-gray-600">Log In</span>
          </button>
        </div>
      </div>
      <div className="h-6 w-full"></div>
      
      {/* Navigation Drawer */}
      <NavigationDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default WelcomeScreen;
