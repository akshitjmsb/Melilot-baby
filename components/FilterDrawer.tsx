import React, { useState, useEffect } from 'react';

export interface FilterState {
    minPrice: number;
    maxPrice: number;
    sizes: string[];
    colors: string[];
}

interface FilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    currentFilters: FilterState;
    onApply: (filters: FilterState) => void;
    onClear: () => void;
}

const AVAILABLE_SIZES = ['NB', '0-3M', '3-6M', '6-12M', '12-18M', '18-24M'];
const AVAILABLE_COLORS = ['Oatmeal', 'Sage', 'Terracotta', 'Cream', 'Blush', 'Navy'];

const FilterDrawer: React.FC<FilterDrawerProps> = ({
    isOpen,
    onClose,
    currentFilters,
    onApply,
    onClear
}) => {
    const [localFilters, setLocalFilters] = useState<FilterState>(currentFilters);

    // Sync local state when prop updates (e.g. from URL)
    useEffect(() => {
        setLocalFilters(currentFilters);
    }, [currentFilters, isOpen]);

    const handleSizeToggle = (size: string) => {
        setLocalFilters(prev => {
            const exists = prev.sizes.includes(size);
            return {
                ...prev,
                sizes: exists ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
            };
        });
    };

    const handleApply = () => {
        onApply(localFilters);
        onClose();
    };

    const handleClear = () => {
        onClear();
        setLocalFilters({
            minPrice: 0,
            maxPrice: 200,
            sizes: [],
            colors: []
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined text-gray-500">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Price Range */}
                    <div>
                        <h3 className="font-medium text-gray-900 mb-4">Price Range</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 mb-1 block">Min ($)</label>
                                <input
                                    type="number"
                                    value={localFilters.minPrice}
                                    onChange={(e) => setLocalFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                                    className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:border-gray-400 outline-none"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 mb-1 block">Max ($)</label>
                                <input
                                    type="number"
                                    value={localFilters.maxPrice}
                                    onChange={(e) => setLocalFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                                    className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:border-gray-400 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sizes */}
                    <div>
                        <h3 className="font-medium text-gray-900 mb-4">Size</h3>
                        <div className="flex flex-wrap gap-2">
                            {AVAILABLE_SIZES.map(size => (
                                <button
                                    key={size}
                                    onClick={() => handleSizeToggle(size)}
                                    className={`px-3 py-1.5 text-sm rounded-full border transition-all ${localFilters.sizes.includes(size)
                                            ? 'bg-gray-900 text-white border-gray-900 font-medium shadow-sm'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colors (Placeholder for now) */}
                    <div>
                        <h3 className="font-medium text-gray-900 mb-4">Color</h3>
                        <p className="text-xs text-gray-400">Color filters coming soon in US-004 iteration.</p>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 flex gap-3 bg-white">
                    <button
                        onClick={handleClear}
                        className="flex-1 py-3 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={handleApply}
                        className="flex-1 py-3 bg-gray-900 text-white rounded-full text-sm font-bold shadow-lg hover:bg-gray-800 active:scale-95 transition-all"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </>
    );
};

export default FilterDrawer;
