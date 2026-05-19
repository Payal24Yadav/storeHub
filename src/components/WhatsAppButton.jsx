import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919999999999?text=Hi%20PVRS%2099StoreHub%2C%20I%20have%20an%20inquiry!"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center p-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl hover:from-emerald-400 hover:to-green-500 shadow-emerald-900/10 cursor-pointer"
      title="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-5 h-5" />
    </motion.a>
  );
}
