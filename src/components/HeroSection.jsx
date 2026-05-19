import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSection() {
  const slides = [
    {
      id: 0,
      image: "/banner1.png",
      alt: "PVRS 99StoreHub Premium Banner 1"
    },
    {
      id: 1,
      image: "/banner2.png",
      alt: "PVRS 99StoreHub Premium Banner 2"
    },
    {
      id: 2,
      image: "/banner3.png",
      alt: "PVRS 99StoreHub Premium Banner 3"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000); // Autoplay every 3 seconds
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Variants for slide transitions
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    })
  };

  return (
    <section className="relative h-[40vh] sm:h-[60vh] lg:h-[calc(100vh-80px)] w-full overflow-hidden select-none bg-[#030611]">
      
      {/* ─── DYNAMIC BACKGROUND SLIDER CAROUSEL ─── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* Clean full-bleed Banner Image */}
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
            {/* Subtle soft dark overlay for premium depth */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── DYNAMIC PAGINATION CONTROLLER DOTS ─── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30 select-none">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "w-8 bg-white" 
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* ─── SVG WAVE SHAPE TRANSITION DIVIDER AT BOTTOM ─── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <svg 
          className="w-full h-8 lg:h-12 fill-white"
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
        >
          <path d="M0,160 C288,224 576,224 864,160 C1152,96 1440,96 1440,160 L1440,320 L0,320 Z"></path>
        </svg>
      </div>

    </section>
  );
}