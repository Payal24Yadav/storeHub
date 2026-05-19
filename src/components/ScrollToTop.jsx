import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 15, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-20 z-40 p-3.5 rounded-xl bg-gradient-to-r from-[#0B1F5C] to-blue-900 text-white shadow-xl hover:from-[#FF7A00] hover:to-[#FFC107] hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="w-5 h-5 group-hover:animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
