import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiX, FiInfo } from 'react-icons/fi';

const ToastContext = createContext();

let toastRef = null;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastRef = (message, type = 'success') => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ show: (m, t) => toastRef?.(m, t) }}>
      {children}
      {/* Toast Render Node */}
      <div className="fixed top-6 right-6 z-[300] space-y-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 50, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className="pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-2xl glassmorphism shadow-[0_12px_40px_rgba(11,31,92,0.08)] border border-white/50 text-[#0B1F5C]"
            >
              {/* Type Icons */}
              {toast.type === 'success' && (
                <FiCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              )}
              {toast.type === 'error' && (
                <FiAlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
              )}
              {toast.type === 'info' && (
                <FiInfo className="w-5 h-5 text-[#FF7A00] flex-shrink-0" />
              )}

              {/* Message */}
              <p className="flex-1 text-sm font-semibold leading-snug">
                {toast.message}
              </p>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg hover:bg-gray-100/50 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const showToast = (message, type = 'success') => {
  if (toastRef) {
    toastRef(message, type);
  } else {
    console.warn('ToastProvider is not initialized yet.');
  }
};

export const useToast = () => useContext(ToastContext);
