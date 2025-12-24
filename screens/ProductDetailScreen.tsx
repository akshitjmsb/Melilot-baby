import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSavedItems } from '../context/SavedItemsContext';
import { supabase } from '../supabaseClient';
import { Product, ProductVariant } from '../types';

const ProductDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToCart, itemCount } = useCart();
  const { addToSaved, removeFromSaved, isSaved } = useSavedItems();

  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Rich Media State
  const [activeMedia, setActiveMedia] = useState<string>('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | '360'>('image');
  const [rotationIndex, setRotationIndex] = useState(0); // For 360 view

  useEffect(() => {
    if (id) {
      fetchProductAndVariants(id);
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      // Simple SEO Title Update
      document.title = product.seo_title || `${product.name} | Petit Coton`;
      // Meta description would ideally be handled by a Helmet library, 
      // but for this PWA demo we assume standard SPA behavior or server-side rendering later.
    }
  }, [product]);

  const fetchProductAndVariants = async (productId: string) => {
    try {
      setLoading(true);

      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (productError) throw productError;

      const { data: variantsData, error: variantsError } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', productId)
        .gt('inventory_count', 0);

      if (variantsError) throw variantsError;

      if (productData) {
        const mappedProduct: Product = {
          ...productData,
          price: productData.base_price,
          image: productData.image_url || 'https://placehold.co/400x500?text=No+Image',
          images_360: productData.images_360 || [],
          gallery_images: productData.gallery_images || [],
          video_url: productData.video_url
        };
        setProduct(mappedProduct);
        setActiveMedia(mappedProduct.image_url || '');
        setMediaType('image');
      }

      if (variantsData) {
        setVariants(variantsData);
        if (variantsData.length > 0) {
          setSelectedSize(variantsData[0].size);
        }
      }

      // Fetch related products (same category, excluding current product)
      if (productData) {
        const { data: relatedData } = await supabase
          .from('products')
          .select('*')
          .eq('category', productData.category)
          .neq('id', productId)
          .limit(4);

        if (relatedData) {
          setRelatedProducts(relatedData.map(item => ({
            ...item,
            price: item.base_price,
            image: item.image_url || 'https://placehold.co/400x500?text=No+Image',
          })));
        }
      }

    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    const selectedVariant = variants.find(v => v.size === selectedSize);
    let finalPrice = product.price || 0;
    if (selectedVariant?.additional_price) {
      finalPrice += selectedVariant.additional_price;
    }

    // Add the item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        price: finalPrice,
        id: selectedVariant ? selectedVariant.id : product.id
      }, selectedSize);
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    setQuantity(1); // Reset quantity after adding
  };

  const handleQuantityChange = (delta: number) => {
    const selectedVariant = variants.find(v => v.size === selectedSize);
    const maxStock = selectedVariant?.inventory_count || 100;
    setQuantity(prev => {
      const newQuantity = prev + delta;
      if (newQuantity < 1) return 1;
      if (newQuantity > maxStock) return prev;
      return newQuantity;
    });
  };

  const selectedVariant = variants.find(v => v.size === selectedSize);
  const currentPrice = (product?.price || 0) + (selectedVariant?.additional_price || 0);

  // 360 Interaction Logic
  const handle360Scrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotationIndex(Number(e.target.value));
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <p>Product not found</p>
        <button onClick={() => navigate('/products')} className="text-primary underline">Back to Products</button>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-28 bg-bg-light">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50 transition-all duration-200">
        <div className="flex items-center justify-between px-4 h-14">
          <button 
            onClick={() => navigate(-1)} 
            aria-label="Go back"
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-all text-text-main focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
          </button>
          <h1 className="text-sm font-bold tracking-wide uppercase opacity-90 truncate max-w-[200px]">{product.name}</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (product) {
                  if (isSaved(product.id)) {
                    removeFromSaved(product.id);
                  } else {
                    addToSaved(product);
                  }
                }
              }}
              aria-label={product && isSaved(product.id) ? `Remove ${product.name} from saved items` : `Save ${product.name} to wishlist`}
              className={`flex size-10 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                product && isSaved(product.id) ? 'text-red-500' : 'text-text-main'
              }`}
            >
              <span className={`material-symbols-outlined ${product && isSaved(product.id) ? 'filled-icon' : ''}`} style={{ fontSize: '24px' }}>favorite</span>
            </button>
            <button 
              onClick={() => navigate('/cart')} 
              aria-label={`Shopping cart${itemCount > 0 ? ` with ${itemCount} item${itemCount > 1 ? 's' : ''}` : ''}`}
              className="relative flex size-10 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-all text-text-main focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>shopping_bag</span>
              {itemCount > 0 && (
              <span className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-primary text-text-main text-[10px] font-bold">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full pt-14">
        {/* Gallery / Media Viewer */}
        <div className="relative w-full aspect-[4/5] bg-neutral-100 overflow-hidden group">

          {/* Media Content */}
          <div className="w-full h-full flex items-center justify-center bg-white">
            {mediaType === 'video' && product.video_url ? (
              <video
                src={product.video_url}
                controls
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            ) : mediaType === '360' && product.images_360 && product.images_360.length > 0 ? (
              <div className="relative w-full h-full">
                <img
                  src={product.images_360[rotationIndex]}
                  alt="360 View"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-0 right-0 px-8 flex flex-col items-center gap-2">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-md">Drag to Rotate</span>
                  <input
                    type="range"
                    min="0"
                    max={product.images_360.length - 1}
                    value={rotationIndex}
                    onChange={handle360Scrub}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            ) : (
              <img src={activeMedia} alt={product.name} className="w-full h-full object-cover transition-opacity duration-300" />
            )}
          </div>

          {/* Media Thumbnails Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto no-scrollbar pb-1 z-10">
            {/* Main Image */}
            <button
              onClick={() => { setActiveMedia(product.image!); setMediaType('image'); }}
              className={`size-14 shrink-0 rounded-lg overflow-hidden border-2 ${activeMedia === product.image && mediaType === 'image' ? 'border-primary' : 'border-white'} shadow-sm`}
            >
              <img src={product.image} className="w-full h-full object-cover" />
            </button>

            {/* 360 Toggle */}
            {product.images_360 && product.images_360.length > 0 && (
              <button
                onClick={() => { setMediaType('360'); setRotationIndex(0); }}
                className={`size-14 shrink-0 rounded-lg overflow-hidden border-2 flex items-center justify-center bg-white ${mediaType === '360' ? 'border-primary' : 'border-white'} shadow-sm`}
              >
                <span className="material-symbols-outlined text-gray-700">360</span>
              </button>
            )}

            {/* Video Toggle */}
            {product.video_url && (
              <button
                onClick={() => { setActiveMedia(''); setMediaType('video'); }}
                className={`size-14 shrink-0 rounded-lg overflow-hidden border-2 flex items-center justify-center bg-white ${mediaType === 'video' ? 'border-primary' : 'border-white'} shadow-sm`}
              >
                <span className="material-symbols-outlined text-gray-700">play_circle</span>
              </button>
            )}

            {/* Gallery Images */}
            {product.gallery_images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveMedia(img); setMediaType('image'); }}
                className={`size-14 shrink-0 rounded-lg overflow-hidden border-2 ${activeMedia === img && mediaType === 'image' ? 'border-primary' : 'border-white'} shadow-sm`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="px-5 pt-6 pb-2">
          {/* Title & Price */}
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-text-main">{product.name}</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-text-main">${currentPrice.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through decoration-1">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-text-main flex items-center gap-2">Select Size</label>
              <button className="text-xs font-medium text-neutral-500 underline decoration-neutral-300">Size Guide</button>
            </div>
            {variants.length > 0 ? (
              <div className="grid grid-cols-4 gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setSelectedSize(variant.size);
                      // Reset quantity when size changes and update max based on new size
                      setQuantity(1);
                    }}
                    className={`h-12 rounded-xl text-sm transition-all flex items-center justify-center
                            ${selectedSize === variant.size
                        ? 'bg-primary text-[#112114] font-bold ring-2 ring-primary/20 shadow-sm'
                        : 'bg-white border border-gray-100 text-gray-600 font-medium hover:bg-gray-50'}`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-500 italic">One size available</div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-text-main flex items-center gap-2 mb-3">Quantity</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>remove</span>
                </button>
                <span className="text-sm font-semibold w-8 text-center text-text-main">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= (variants.find(v => v.size === selectedSize)?.inventory_count || 100)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-primary bg-white shadow-sm hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                </button>
              </div>
              <span className="text-xs text-gray-500">
                {variants.find(v => v.size === selectedSize)?.inventory_count || 'Many'} available
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 p-4 bg-white rounded-2xl border border-gray-100">
            <h3 className="text-sm font-bold text-text-main mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">description</span>
              Description
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">
              {product.description || 'No description available for this product.'}
            </p>
          </div>

          {/* Features Accordion (Static for Demo) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">local_shipping</span>
                <span className="text-sm font-medium text-text-main">Free Shipping over $100</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">verified</span>
                <span className="text-sm font-medium text-text-main">100% Organic Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="px-5 pt-8 pb-4">
            <h2 className="text-xl font-bold text-text-main mb-4">You might also like</h2>
            <div className="grid grid-cols-2 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  className="group flex flex-col gap-2 cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={relatedProduct.image || relatedProduct.image_url || 'https://placehold.co/400x500?text=No+Image'}
                      alt={relatedProduct.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-sm font-semibold text-text-main line-clamp-1">{relatedProduct.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1">{relatedProduct.category}</p>
                    <p className="text-sm font-bold text-text-main mt-1">
                      ${(relatedProduct.price || relatedProduct.base_price || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 p-4 safe-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <button
          onClick={handleAddToCart}
          disabled={variants.length > 0 && !selectedSize}
          className={`relative w-full overflow-hidden rounded-full h-14 group transition-all active:scale-[0.98] shadow-lg flex items-center justify-between px-6 
            ${isAdded ? 'bg-[#112114] text-white' : 'bg-primary text-[#112114] hover:bg-primary-dark'} 
            disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <span className="text-sm font-bold">{isAdded ? 'Added!' : `Add ${quantity > 1 ? `${quantity} × ` : ''}to Cart`}</span>
          <span className="text-sm font-bold">${(currentPrice * quantity).toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetailScreen;