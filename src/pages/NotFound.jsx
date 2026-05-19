import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiHelpCircle } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Floating background blur rings */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#FF7A00]/5 blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#FFC107]/5 blur-2xl pointer-events-none" />

      <div className="text-center space-y-6 max-w-md relative z-10 select-none">
        
        {/* Floating 404 Text */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-8xl font-black bg-gradient-to-r from-[#0B1F5C] via-[#FF7A00] to-[#FFC107] bg-clip-text text-transparent tracking-widest"
        >
          404
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#0B1F5C]">Oops! Page Not Found</h1>
          <p className="text-xs font-semibold text-gray-400 max-w-xs mx-auto leading-relaxed">
            The page you are trying to reach has either been relocated, removed, or is temporarily offline inside PVRS 99StoreHub.
          </p>
        </div>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-white font-black text-xs shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all"
          >
            <FiHome className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-gray-200 hover:border-[#FF7A00]/25 text-[#0B1F5C]/80 hover:bg-orange-50/20 font-extrabold text-xs transition-all"
          >
            <FiHelpCircle className="w-4 h-4" />
            Report Issue
          </Link>
        </div>

      </div>
    </div>
  );
}
