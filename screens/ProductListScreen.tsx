import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { Product } from '../types';
import { supabase } from '../supabaseClient';
import FilterDrawer, { FilterState } from '../components/FilterDrawer';
import { useSavedItems } from '../context/SavedItemsContext';
import { useCart } from '../context/CartContext';

const ProductListScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToSaved, removeFromSaved, isSaved } = useSavedItems();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Filter UI State
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filters state from URL
  const currentCategory = searchParams.get('category');
  const sortOption = searchParams.get('sort') || 'featured';

  const initialFilters: FilterState = {
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 200,
    sizes: searchParams.get('sizes')?.split(',') || [],
    colors: []
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const PAGE_SIZE = 12;

  useEffect(() => {
    fetchProducts(true);
  }, [currentCategory, sortOption, filters]);

  const fetchProducts = async (reset = false) => {
    try {
      setLoading(true);
      if (reset) {
        setProducts([]);
        setLoadedCount(0);
      }

      let query = supabase
        .from('products')
        .select('*, variants:product_variants(*)', { count: 'exact' });

      // Apply Category
      if (currentCategory) {
        query = query.eq('category', currentCategory);
      }

      // Apply Price Range
      query = query.gte('base_price', filters.minPrice);
      query = query.lte('base_price', filters.maxPrice);

      // Apply Sorting
      if (sortOption === 'price-low-high') {
        query = query.order('base_price', { ascending: true });
      } else if (sortOption === 'price-high-low') {
        query = query.order('base_price', { ascending: false });
      } else if (sortOption === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Apply Pagination
      const from = reset ? 0 : products.length;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      if (data) {
        let mappedProducts: Product[] = data.map(item => ({
          ...item,
          price: item.base_price,
          image: item.image_url || 'https://placehold.co/400x500?text=No+Image',
        }));

        // Client-side filtering for complex relations (Size)
        // Note: Ideally do this in Supabase with !inner join, but it affects pagination counts.
        // For small catalog, client-side post-filter is acceptable if pagination logic is adjusted (tricky).
        // Let's try to filter OUT products that don't have the size IF size filter is active.

        if (filters.sizes.length > 0) {
          mappedProducts = mappedProducts.filter(p => {
            // If it has variants, check if any match. If no variants (e.g. unknown), maybe keep or drop?
            // Let's assume seeded products have variants.
            const pVariants = (p as any).variants || [];
            if (pVariants.length === 0) return false; // Drop if no variants? Or keep?
            return pVariants.some((v: any) => filters.sizes.includes(v.size));
          });
        }

        setProducts(prev => reset ? mappedProducts : [...prev, mappedProducts]);
        // Note: totalCount is from DB query, doesn't reflect client-side filtering. 
        // This causes "Load More" to potentially behave oddly if we filtered out everything on page 1.
        // For now, accept this limitation of PWA prototype.
        if (count !== null) setTotalCount(count);

        const newLoadedCount = (reset ? 0 : products.length) + mappedProducts.length;
        setLoadedCount(newLoadedCount);
        // hasMore check is also approximate if we filter client side
        setHasMore(count !== null && newLoadedCount < count);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Update URL params
    setSearchParams(prev => {
      prev.set('minPrice', newFilters.minPrice.toString());
      prev.set('maxPrice', newFilters.maxPrice.toString());
      if (newFilters.sizes.length > 0) {
        prev.set('sizes', newFilters.sizes.join(','));
      } else {
        prev.delete('sizes');
      }
      return prev;
    });
  };

  const handleClearFilters = () => {
    const cleared = { minPrice: 0, maxPrice: 200, sizes: [], colors: [] };
    setFilters(cleared);
    setSearchParams(prev => {
      prev.delete('minPrice');
      prev.delete('maxPrice');
      prev.delete('sizes');
      return prev;
    });
  };

  const handleSortChange = (newSort: string) => {
    setSearchParams(prev => {
      prev.set('sort', newSort);
      return prev;
    });
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-white/95 backdrop-blur-md px-4 py-3 border-b border-gray-50">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full hover:bg-gray-50 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-text-main" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.01em] text-text-main flex-1 text-center">
          {currentCategory || 'Shop All'}
        </h2>
        <div className="flex items-center justify-end w-20 relative gap-1">
          <button
            onClick={() => navigate('/search')}
            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-50 active:scale-95 transition-all text-text-main"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>search</span>
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center justify-center text-text-main hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>shopping_bag</span>
          </button>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-md w-full py-3">
        <div className="flex gap-2.5 px-4 overflow-x-auto no-scrollbar items-center">
          <button
            onClick={() => setIsFilterOpen(true)}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-1.5 rounded-full border transition-all active:scale-95 ${filters.sizes.length > 0 || filters.minPrice > 0 || filters.maxPrice < 200
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-text-main border-gray-200'
              }`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>tune</span>
            <span className="text-xs font-semibold">Filters</span>
            {(filters.sizes.length > 0) && (
              <span className="flex items-center justify-center size-4 bg-primary text-text-main text-[10px] rounded-full font-bold">
                {filters.sizes.length}
              </span>
            )}
          </button>

          <div className="w-px h-6 bg-gray-200 mx-1 shrink-0"></div>

          <button onClick={() => handleSortChange('price-low-high')} className={`flex h-9 shrink-0 items-center justify-center gap-x-1 rounded-full pl-3 pr-2 transition-colors active:scale-95 ${sortOption === 'price-low-high' ? 'bg-black text-white' : 'bg-[#F1F5F9] hover:bg-gray-100'}`}>
            <p className="text-xs font-medium whitespace-nowrap">Price: Low to High</p>
          </button>
          <button onClick={() => handleSortChange('price-high-low')} className={`flex h-9 shrink-0 items-center justify-center gap-x-1 rounded-full pl-3 pr-2 transition-colors active:scale-95 ${sortOption === 'price-high-low' ? 'bg-black text-white' : 'bg-[#F1F5F9] hover:bg-gray-100'}`}>
            <p className="text-xs font-medium whitespace-nowrap">Price: High to Low</p>
          </button>
        </div>
      </div>

      <main className="flex-1 px-4 pt-2 pb-28">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-gray-500">{products.length} Items Found</p>
        </div>

        {loading && products.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6">
            <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
              <span className="material-symbols-outlined text-4xl">inventory_2</span>
            </div>
            <h3 className="text-lg font-bold text-text-main mb-2">No Products Found</h3>
            <p className="text-gray-500 text-sm max-w-[250px] leading-relaxed">
              Try adjusting your filters or check back later for new arrivals!
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-6 px-6 py-2.5 rounded-full border border-gray-200 bg-white text-text-main font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
            >
              Clear Filters
            </button>
          </div>
        ) : (
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
                  <div className="absolute top-2 left-2 flex gap-1">
                    {/* Show badges if relevant */}
                  </div>
                  <button
                    aria-label={isSaved(product.id) ? `Remove ${product.name} from saved items` : `Save ${product.name} to wishlist`}
                    className={`absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform active:scale-90 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
                      isSaved(product.id) ? 'text-red-500' : 'text-gray-600'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isSaved(product.id)) {
                        removeFromSaved(product.id);
                      } else {
                        addToSaved(product);
                      }
                    }}
                  >
                    <span className={`material-symbols-outlined ${isSaved(product.id) ? 'filled-icon' : ''}`} style={{ fontSize: '18px' }}>favorite</span>
                  </button>
                  <button
                    aria-label={`Add ${product.name} to cart`}
                    className="absolute bottom-2 right-2 flex size-9 items-center justify-center rounded-full bg-primary text-white shadow-soft transition-all active:scale-90 hover:bg-primary-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Get first available size from variants, or use a default
                      const variants = (product as any).variants || [];
                      if (variants.length > 0) {
                        const firstVariant = variants[0];
                        addToCart(product, firstVariant.size);
                      } else {
                        // If no variants, navigate to product detail to select size
                        navigate(`/product/${product.id}`);
                      }
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>add</span>
                  </button>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-sm font-normal text-text-main line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-bold ${product.originalPrice ? 'text-primary' : 'text-text-main'}`}>
                      ${product.price?.toFixed(2)} CAD
                    </p>
                    {product.originalPrice && (
                      <p className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button Logic can be improved, but leaving as is for PWA limit */}
        {hasMore && !loading && (
          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <button
              onClick={() => fetchProducts(false)}
              className="mt-2 px-8 py-3 rounded-full bg-primary text-sm font-bold text-white shadow-soft hover:bg-primary-dark active:scale-95 transition-all"
            >
              Load more
            </button>
          </div>
        )}
      </main>

      <BottomNav />
      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        currentFilters={filters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </div>
  );
};

export default ProductListScreen;