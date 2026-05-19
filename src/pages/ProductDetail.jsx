import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiStar, FiHeart, FiShoppingCart, FiArrowLeft, FiTruck, FiShield, FiRefreshCw, FiZap } from 'react-icons/fi';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { showToast } from '../components/Toast';
import ImageWithFallback from '../components/ImageWithFallback';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Find active product
  const product = useMemo(() => {
    return products.find((p) => p.slug === slug);
  }, [slug]);

  // Wishlist check
  const isWishlisted = useMemo(() => {
    return product ? wishlist.some((item) => item.id === product.id) : false;
  }, [product, wishlist]);

  // Related products from same category
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-black text-[#0B1F5C]">Product Not Found</h2>
        <Link to="/" className="text-[#FF7A00] font-bold">Back to Home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    showToast(`Added ${quantity} x ${product.name} to Cart!`, 'success');
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    showToast(
      isWishlisted
        ? `Removed ${product.name} from Wishlist`
        : `Added ${product.name} to Wishlist`,
      'info'
    );
  };

  return (
    <div className="min-h-screen pb-20 mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* ─── BREADCRUMB & BACK ACTION ─── */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1F5C]/60 hover:text-[#FF7A00] transition-colors"
      >
        <FiArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* ─── DUAL GRID: IMAGES & DETAIL INFOS ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: LARGE PRODUCT IMAGE */}
        <div className="lg:col-span-6 relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-6 shadow-sm">
          {product.badge && (
            <span className="absolute top-6 left-6 z-10 px-3.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-xl bg-[#FF7A00] text-white shadow-md">
              {product.badge}
            </span>
          )}
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            containerClassName="w-full h-full bg-transparent"
            className="max-h-full max-w-full object-contain rounded-2xl"
          />
        </div>

        {/* RIGHT COLUMN: DETAIL INFOS AND CTAs */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs uppercase font-black tracking-widest text-[#FF7A00]">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-[#0B1F5C] mt-1.5 leading-snug">
              {product.name}
            </h1>

            {/* Star ratings */}
            <div className="flex items-center gap-2 mt-3 select-none">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : ''
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#0B1F5C]/80">
                {product.rating} Star rating
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-xs text-gray-400 font-semibold">
                ({product.reviews} reviews verified)
              </span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="p-5 rounded-2xl bg-orange-50/30 border border-[#FF7A00]/10">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#0B1F5C]">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            {product.originalPrice > product.price && (
              <p className="text-[10px] text-emerald-600 font-extrabold uppercase mt-1">
                ⚡ Save ₹{product.originalPrice - product.price} instantly!
              </p>
            )}
          </div>

          <p className="text-xs font-medium text-gray-500 leading-relaxed">
            {product.description || 'Premium retail product sourced meticulously for guaranteed high-quality experience inside Vijayawada.'}
          </p>

          {/* Quantity selector and checkout triggers */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-[#0B1F5C]">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden select-none bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 hover:bg-gray-50 text-gray-500 font-black text-sm"
                >
                  -
                </button>
                <span className="px-5 py-2 font-black text-xs text-[#0B1F5C] min-w-[50px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-2 hover:bg-gray-50 text-gray-500 font-black text-sm"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-white font-black text-sm shadow-xl shadow-orange-500/15 hover:shadow-orange-500/25 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                <FiShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border transition-all duration-300 ${
                  isWishlisted
                    ? 'bg-rose-500 border-rose-500 text-white hover:bg-rose-600'
                    : 'bg-white border-gray-200 hover:border-[#FF7A00]/25 text-[#0B1F5C]/80 hover:text-rose-500'
                }`}
              >
                <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Saved' : 'Wishlist'}
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* ─── DETAILED SPECS TABS VIEW ─── */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Tabs controls headers */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-black text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === tab
                  ? 'border-[#FF7A00] text-[#FF7A00]'
                  : 'border-transparent text-gray-400 hover:text-[#0B1F5C]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content panels */}
        <div className="p-6 md:p-8 text-xs font-medium text-gray-500 leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm text-[#0B1F5C] mb-2">Product Overview</h3>
              <p>This premium quality product is sourced from authorized vendor partners and double-checked for durability and safety standards.</p>
              <p>Perfect for daily retail use at school, office space, home kitchen counters, and elegant electrical configurations. Enjoy maximum warranty cover inside Vijayawada region!</p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="space-y-3">
              <h3 className="font-extrabold text-sm text-[#0B1F5C] mb-2">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex justify-between p-3 bg-gray-50 rounded-xl border border-gray-100/50">
                  <span className="font-bold text-gray-400">Category:</span>
                  <span className="font-extrabold text-[#0B1F5C] capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-xl border border-gray-100/50">
                  <span className="font-bold text-gray-400">Retail Brand:</span>
                  <span className="font-extrabold text-[#0B1F5C]">PVRS 99StoreHub</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-xl border border-gray-100/50">
                  <span className="font-bold text-gray-400">Pricing Base:</span>
                  <span className="font-extrabold text-[#0B1F5C]">₹99 Store Only</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-xl border border-gray-100/50">
                  <span className="font-bold text-gray-400">Local Delivery:</span>
                  <span className="font-extrabold text-[#0B1F5C]">Yes (Vijayawada Area)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm text-[#0B1F5C] mb-2">Customer Feedback</h3>
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="font-extrabold text-sm text-[#0B1F5C]">Ramesh Reddy</div>
                  <div className="text-[10px] text-gray-400 font-bold">1 week ago</div>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <FiStar key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p>Outstanding product! Absolutely authentic quality matching perfectly with the ₹99 retail catalog description. Fast local delivery inside Guntur region as well!</p>
              </div>
            </div>
          )}
        </div>

      </section>

      {/* ─── RELATED PRODUCTS SLIDER LIST ─── */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black text-[#0B1F5C]">Related E-commerce items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
