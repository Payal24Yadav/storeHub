import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { showToast } from '../components/Toast';
import ImageWithFallback from '../components/ImageWithFallback';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (product) => {
    addItem(product);
    toggleWishlist(product); // Remove from Wishlist
    showToast(`Moved ${product.name} to Cart successfully!`, 'success');
  };

  return (
    <div className="min-h-screen pb-20 mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Info */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-[#0B1F5C]">My Wishlist</h1>
        <p className="text-xs font-semibold text-gray-400 mt-1">Products you saved for later shopping.</p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden h-full"
            >
              {/* Product Thumbnail */}
              <div className="relative aspect-square w-full bg-gray-50 overflow-hidden flex items-center justify-center p-4">
                {/* Remove button */}
                <button
                  onClick={() => {
                    toggleWishlist(product);
                    showToast(`Removed ${product.name} from Wishlist`, 'info');
                  }}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-white/80 hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition-all border border-white/50 backdrop-blur-md"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
                <ImageWithFallback 
                  src={product.image} 
                  alt={product.name} 
                  containerClassName="w-full h-full bg-transparent"
                  className="max-h-full max-w-full object-contain" 
                />
              </div>

              {/* Product details */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF7A00]">
                    {product.category}
                  </span>
                  <Link to={`/product/${product.slug}`} className="block mt-1">
                    <h3 className="font-extrabold text-sm text-[#0B1F5C] hover:text-[#FF7A00] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="text-sm font-black text-[#0B1F5C] mt-2">₹{product.price}</div>
                </div>

                {/* Move to Cart button */}
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-orange-50 hover:bg-[#FF7A00] text-[#FF7A00] hover:text-white font-bold text-xs transition-colors"
                >
                  <FiShoppingCart className="w-4 h-4" />
                  Move to Cart
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-white border border-gray-100 shadow-sm text-center space-y-4 max-w-lg mx-auto">
          <FiHeart className="w-12 h-12 text-gray-300 mx-auto animate-pulse" />
          <h2 className="text-xl font-black text-[#0B1F5C]">Your Wishlist is Empty</h2>
          <p className="text-xs text-gray-400 font-semibold max-w-xs mx-auto">
            You haven't saved any retail items to your PVRS 99StoreHub wishlist yet! Explore categories now.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-white font-black text-xs shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all"
          >
            Explore Catalog
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

    </div>
  );
}
