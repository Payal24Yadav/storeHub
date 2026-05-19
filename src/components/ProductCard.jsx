import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { showToast } from './Toast';
import ImageWithFallback from './ImageWithFallback';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    showToast(`Added ${product.name} to Cart!`, 'success');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isWishlisted
        ? `Removed ${product.name} from Wishlist`
        : `Added ${product.name} to Wishlist`,
      'info'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col bg-white rounded-3xl border border-gray-100 hover:border-[#FF7A00]/20 shadow-[0_4px_20px_rgba(11,31,92,0.02)] hover:shadow-[0_20px_40px_rgba(11,31,92,0.06)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden h-full"
    >
      {/* Product Image and Overlay */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.badge && (
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg bg-[#FF7A00] text-white shadow-md shadow-orange-500/25">
              {product.badge}
            </span>
          )}
          {product.originalPrice > product.price && (
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg bg-[#FFC107] text-[#0B1F5C] shadow-md shadow-yellow-500/10">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % OFF
            </span>
          )}
        </div>

        {/* Wishlist Trigger */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-xl border transition-all duration-300 shadow-md ${
            isWishlisted
              ? 'bg-rose-500 border-rose-500 text-white hover:bg-rose-600'
              : 'bg-white/80 border-white/50 backdrop-blur-md text-gray-500 hover:text-rose-500 hover:bg-white hover:scale-105'
          }`}
        >
          <motion.div whileTap={{ scale: 1.3 }}>
            <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </motion.div>
        </button>

        {/* Product Image */}
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {/* Quick View Cover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F5C]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="px-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-md text-[#0B1F5C] font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-950/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <FiEye className="w-3.5 h-3.5" />
              Quick View
            </span>
          </div>
        </Link>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF7A00]">
            {product.category}
          </span>

          {/* Title */}
          <Link to={`/product/${product.slug}`} className="block mt-1">
            <h3 className="font-bold text-sm text-[#0B1F5C] hover:text-[#FF7A00] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating) ? 'fill-current' : ''
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-gray-400 ml-1">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Pricing and Cart Actions */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50/50">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-[#0B1F5C]">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through font-semibold">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="p-3 rounded-2xl bg-[#3BB77E]/10 hover:bg-[#3BB77E] text-[#3BB77E] hover:text-white transition-all duration-300 active:scale-95 shadow-sm shadow-[#3BB77E]/5 group/btn"
            title="Add to Cart"
          >
            <FiShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
