import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#fcfbfc] mesh-gradient-bg">
      <div className="relative flex flex-col items-center">
        {/* Glowing Halo ring */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-[#FF7A00]/20 to-[#FFC107]/20 blur-xl"
        />

        {/* Central Spinning Logo Ring */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border-[3px] border-[#0B1F5C]/5 border-t-[#3BB77E] border-r-[#FF7A00]"
          />
          <div className="absolute inset-0 flex items-center justify-center p-3">
            <img src="/logo.png" alt="PVRS 99StoreHub Logo" className="max-h-full max-w-full object-contain select-none" />
          </div>
        </div>

        {/* Pulsing indicator text */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-center"
        >
          <div className="text-xs uppercase tracking-[0.2em] font-black text-[#0B1F5C]/60">
            99StoreHub
          </div>
          <div className="text-[10px] text-[#FF7A00] font-bold mt-1 tracking-wider">
            Loading Premium Experience...
          </div>
        </motion.div>
      </div>
    </div>
  );
}
