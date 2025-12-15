import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { Product } from '../types';

const ProductListScreen: React.FC = () => {
  const navigate = useNavigate();

  const products: Product[] = [
    { id: '1', name: 'Oatmeal Waffle Knit', price: 42.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLGsit8Sny2koshqxQBSV-kX33VM-w87LIHgLvjnUwKcAwFv1dAOAAsSNVgUkT1iixnhNyGXlV_Yu2JDwKwV9O3Yq8hzSm5KIPhoo1OF9LomThXZZR-_bK6iAs4UxBPdLNHkwPKMognZpWylkf7hE_0ZyWp7b2O2MPrRiS8bm9J9JhoYjRsSMlskyKBFAX-3uwe3nsvFR1MgxJHRruBw-uDKDNY7Bcg-fdZmg5vu93be8Hu9OvVH0yKQcranSLjXsceofhMB_qnA', category: 'Romper' },
    { id: '2', name: 'Heirloom Bonnet', price: 28.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA45ZXf87TdnhHVcWsGh-a3sgGpy4QPZrp4UnV_pbIYIxnfJh_dDzM9jtCH7eZzb2qDXGBr5Sa5EEdPticsqQluzCWsYF7ioW-cWX27dX3Th-MX3CvUiFsCHBq89k7S1llG3n6Z61RdJD1zMn1oR8jXvWJ0a1R9n1_LW3WnPTFcLw1oPRjMNmWcOwfwCP8db-_xlWk7R3jgm3JQPxFae9r8XV2LdZcrF1eNPJjPZy-QtRX-z2zh067cTYi_LFgllT21YTWubgCOPQ', category: 'Accessories' },
    { id: '3', name: 'Forest Walk Leggings', price: 34.00, originalPrice: 45.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMLBY68v-Tz3070JR6FactiHN3NzJIz6D-fyjGzHCG7tgs2wIuc-hQtJnZ79c__N6CBkx1oij9aleKRohoVMzm9iLILe24BdPuz5zCui3VSfKZeB6s7Smt653vujhYOjFMDxh5ypTVp_lXyJ94cqYU_GVJdn7TSK4POw-EYnYNqSmPS7lMp_JLtiXoC3RjQYztrFvHLPh8TV81SQlpJRe-cVn5YzilG7WJE-zriCSzfvCuXd5K5Id7n8OM8hO-LoyLizhd0YTY3w', category: 'Leggings' },
    { id: '4', name: 'Moss Stitch Cardigan', price: 52.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGE3aNJ504qlyWaM02tHKTGsEdhjYGaiFbjVQGz0AZE5FX9nU1me4_NXt3qkxsDXSbTKIB0XoGNyQ9TfLb5lc5xgAm77J6uu-YgBbFX_hq5cPYlFRUykmpe0Fuzau5CyGgEXXJZZXq8a86ovaC6W5nHo0fnJvZtJ_RG8EAS41LcTshPSaG56q4-VZha8hCQ6i5KI3Cmz991P9Tcxm5tHUp1glxqZZt43QVoW__Cka3Mknw1H1cb2xf_lSPtu_8dzuUw8YjdLhcrg', category: 'Tops' },
    { id: '5', name: 'Linen Overalls', price: 48.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC19WDKjphieWvn_PDrcSAdFC5jDUXBzzMmvpIn1s_xksp7FZPXozwQ-kroPJ7SsN1Zz0WhpEOO_IA5eUEvl9NfdlyrwEJJo6RMPjsLWhXJXyVL7TW62cZgzX8w-unDq_6JA9hpvZoqPiSh-CLAHlAWUML9i2KbT3vO1MQnrgMIrYRFkbANCTwa0eLR5aTLFYqe8ezHAhQmZ9nuUFy0boBUqRR8rnh9kR9iHVcEl0ptSobierNXUBrTrJ71u9aCEbVWpyvDOVLvAA', category: 'Overalls' },
    { id: '6', name: 'Snuggle Booties', price: 22.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo6BBEf405LMnHZvIqzZ0Z6b7PDER84q02hiNvyNhATGjbK080mqX92XugCHVzk9ZVpgSYGKimR6jfjNUPvaEU3KdKiMJKAcTr-blG-aEYxEMqM_BOSyNScdxslEote_FLpACRA_UAZzaFWchtlvx87AIk_EzIOfJ1aMJtQa-Ievf3LPITxoD_S5Jylnn6GoGQ_8DkDRZBrt9KceILyzCPftood_WmEAK6yqg1E9mSERmNjftHWSWlY70SShZmJK2XvILRX4JACw', category: 'Footwear' },
  ];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white/95 backdrop-blur-md px-4 py-3 border-b border-gray-50">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full hover:bg-gray-50 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-text-main" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.01em] text-text-main flex-1 text-center">Organic Onesies</h2>
        <div className="flex items-center justify-end w-10 relative">
          <button 
            onClick={() => navigate('/cart')}
            className="flex items-center justify-center text-text-main hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>shopping_bag</span>
          </button>
          <div className="absolute top-0 right-0 size-2 bg-primary rounded-full ring-2 ring-white"></div>
        </div>
      </header>

      {/* Filters */}
      <div className="sticky top-[60px] z-40 bg-white/95 backdrop-blur-md w-full py-3">
        <div className="flex gap-2.5 px-4 overflow-x-auto no-scrollbar items-center">
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-1.5 rounded-full border border-gray-200 bg-white pl-3 pr-4 transition-all active:scale-95">
            <span className="material-symbols-outlined text-text-main" style={{ fontSize: '18px' }}>tune</span>
            <span className="text-xs font-semibold text-text-main">Filters</span>
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1 shrink-0"></div>
          {['Size', 'Color', 'Material', 'Price: Low to High'].map((filter) => (
             <button key={filter} className="flex h-9 shrink-0 items-center justify-center gap-x-1 rounded-full bg-[#F1F5F9] pl-3 pr-2 transition-colors hover:bg-gray-100 active:scale-95">
             <p className="text-xs font-medium text-text-main whitespace-nowrap">{filter}</p>
             <span className="material-symbols-outlined text-text-main opacity-60" style={{ fontSize: '18px' }}>keyboard_arrow_down</span>
           </button>
          ))}
        </div>
      </div>

      <main className="flex-1 px-4 pt-2 pb-28">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-gray-500">24 Items Found</p>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {products.map((product) => (
            <div 
                key={product.id} 
                onClick={() => navigate(`/product/${product.id}`)}
                className="group flex flex-col gap-3 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <button 
                    className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform active:scale-90 shadow-sm hover:bg-white"
                    onClick={(e) => { e.stopPropagation(); }}
                >
                  <span className="material-symbols-outlined text-gray-600 filled-icon" style={{ fontSize: '18px' }}>favorite</span>
                </button>
                <button 
                    className="absolute bottom-2 right-2 flex size-9 items-center justify-center rounded-full bg-primary text-white shadow-soft transition-all active:scale-90 hover:bg-primary-dark hover:shadow-lg"
                    onClick={(e) => { e.stopPropagation(); navigate('/cart'); }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>add</span>
                </button>
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-normal text-text-main line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2">
                    <p className={`text-sm font-bold ${product.originalPrice ? 'text-primary' : 'text-text-main'}`}>
                        ${product.price.toFixed(2)} CAD
                    </p>
                    {product.originalPrice && (
                        <p className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3">
          <p className="text-xs text-gray-400">You've viewed 6 of 24 products</p>
          <div className="h-1 w-32 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-1/4 bg-primary rounded-full"></div>
          </div>
          <button className="mt-2 px-8 py-3 rounded-full bg-primary text-sm font-bold text-white shadow-soft hover:bg-primary-dark active:scale-95 transition-all">
            Load more
          </button>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default ProductListScreen;