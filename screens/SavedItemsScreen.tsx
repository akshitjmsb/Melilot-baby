import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavedItems } from '../context/SavedItemsContext';
import BottomNav from '../components/BottomNav';

const SavedItemsScreen: React.FC = () => {
    const navigate = useNavigate();
    const { savedItems, removeFromSaved } = useSavedItems();

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-bg-light pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 flex items-center bg-bg-light/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <span className="material-symbols-outlined text-text-main">arrow_back</span>
                </button>
                <h2 className="text-text-main text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Saved Items</h2>
                <div className="w-12"></div> {/* Spacer for centering */}
            </header>

            {/* Content */}
            <main className="flex-1 overflow-y-auto px-4 py-6">
                {savedItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">favorite</span>
                        <h2 className="text-xl font-bold text-text-main mb-2">No saved items yet</h2>
                        <p className="text-gray-500 mb-6">Start saving your favorite products to see them here.</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="px-6 py-3 bg-primary text-text-main font-bold rounded-full hover:bg-primary-dark transition-colors active:scale-95"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                        {savedItems.map((product) => (
                            <div
                                key={product.id}
                                className="group flex flex-col gap-3 cursor-pointer active:scale-[0.98] transition-transform"
                            >
                                <div
                                    className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100"
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    <img
                                        src={product.image || product.image_url || 'https://placehold.co/400x500?text=No+Image'}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <button
                                        className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform active:scale-90 shadow-sm hover:bg-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromSaved(product.id);
                                        }}
                                    >
                                        <span className="material-symbols-outlined text-red-500 filled-icon" style={{ fontSize: '18px' }}>favorite</span>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-0.5" onClick={() => navigate(`/product/${product.id}`)}>
                                    <p className="text-sm font-semibold text-text-main line-clamp-1">{product.name}</p>
                                    <p className="text-xs text-gray-500 line-clamp-1">{product.category}</p>
                                    <p className="text-sm font-bold text-text-main mt-1">
                                        ${(product.price || product.base_price || 0).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
};

export default SavedItemsScreen;

