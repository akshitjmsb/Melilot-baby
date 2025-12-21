import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Product } from '../types';

const SearchScreen: React.FC = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => clearTimeout(timer);
    }, [query]);

    // Search Logic
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            try {
                // Search by name or description using ilike
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .or(`name.ilike.%${debouncedQuery}%,description.ilike.%${debouncedQuery}%`)
                    .limit(20);

                if (error) throw error;

                if (data) {
                    const mappedProducts: Product[] = data.map(item => ({
                        ...item,
                        price: item.base_price,
                        image: item.image_url || 'https://placehold.co/400x500?text=No+Image',
                    }));
                    setResults(mappedProducts);
                }
            } catch (err) {
                console.error('Search error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Header with Input */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-100 p-4 flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors active:scale-95"
                >
                    <span className="material-symbols-outlined text-gray-500">arrow_back</span>
                </button>
                <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">search</span>
                    <input
                        autoFocus
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-full py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gray-300 focus:bg-white transition-colors"
                    />
                    {query && (
                        <button
                            onClick={() => { setQuery(''); setResults([]); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Results */}
            <div className="flex-1 p-4">
                {loading ? (
                    <div className="flex justify-center pt-20">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                    </div>
                ) : results.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                        {results.map(product => (
                            <div
                                key={product.id}
                                onClick={() => navigate(`/product/${product.id}`)}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-2">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                                <p className="text-sm text-gray-500">${product.price?.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                ) : debouncedQuery.length > 0 ? (
                    <div className="text-center pt-20 text-gray-400">
                        <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
                        <p className="text-sm">No results found for "{debouncedQuery}"</p>
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Popular Searches</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Romper', 'Bonnets', 'Oatmeal', 'Leggings'].map(term => (
                                <button
                                    key={term}
                                    onClick={() => setQuery(term)}
                                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-gray-300 transition-colors"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchScreen;
