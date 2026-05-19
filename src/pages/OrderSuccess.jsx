import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiShoppingBag, FiHome } from 'react-icons/fi';

export default function OrderSuccess() {
  // Generate random order number
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_12px_45px_rgba(11,31,92,0.04)] text-center space-y-6"
      >
        {/* Bouncy verification circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-inner"
        >
          <FiCheckCircle className="w-10 h-10" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#0B1F5C]">Order Confirmed!</h1>
          <p className="text-xs font-semibold text-gray-400">
            Thank you for shopping at PVRS 99StoreHub. Your order has been registered successfully!
          </p>
        </div>

        {/* Details Card */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100/50 text-xs font-semibold text-gray-500 space-y-2 select-none">
          <div className="flex justify-between">
            <span>Order Number:</span>
            <span className="font-black text-[#0B1F5C]">#PVRS-{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Delivery:</span>
            <span className="font-black text-emerald-600">Within 24 Hours</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Cost:</span>
            <span className="text-emerald-600 font-extrabold">FREE COURIER</span>
          </div>
        </div>

        {/* Checkout actions routes */}
        <div className="flex flex-col sm:flex-row items-center gap-3 select-none">
          <Link
            to="/shop"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-white font-black text-xs shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all"
          >
            <FiShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-gray-200 hover:border-[#FF7A00]/25 text-[#0B1F5C]/85 hover:bg-orange-50/20 transition-all font-extrabold text-xs"
          >
            <FiHome className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
