import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: "/assets/images/cinnamon_rolls.jpg" },
  { id: 2, src: "/assets/images/vitrina.jpg" },
  { id: 3, src: "/assets/images/tort_simplu_fructe.jpg" },
  { id: 4, src: "/assets/images/savarina.jpg" },
  { id: 5, src: "/assets/images/tort_mare.jpg" },
  { id: 6, src: "/assets/images/tort_regal.jpg" },
  { id: 7, src: "/assets/images/nutella.jpg" },
  { id: 8, src: "/assets/images/tort_dinozaur.jpg" },
  { id: 9, src: "/assets/images/tort_fructe.jpg" },
];

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const isMobile = window.innerWidth < 640;
      const cardWidth = (isMobile ? 280 : 340) + 24;

      if (dir === "right") {
        if (scrollLeft + clientWidth >= scrollWidth - 40) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      } else {
        if (scrollLeft <= 10) {
          carouselRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setDirection(1);
      setSelectedIndex((selectedIndex + 1) % galleryImages.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setDirection(-1);
      setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section id="gallery" className="py-24 pb-44 relative overflow-hidden bg-linear-to-b from-[#fbf9f4] to-brand-light">
      
      {/* Decorative Blobs */}
      <motion.div 
        animate={{ y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-10 w-32 h-32 bg-linear-to-br from-pastel-pink to-pastel-rose rounded-3xl opacity-60 z-0"
        style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Titlu & Navigare */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-micro mb-4 inline-block px-4 py-1.5 border-soft rounded-full bg-white/40 backdrop-blur-md"
            >
              Portofoliu Vizual
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-brand-dark tracking-tighter"
            >
              Momente <span className="text-brand-magenta font-script">Dulci</span>
            </motion.h2>
          </div>

          {/* Butoane Control */}
          <div className="flex justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full bg-white border border-brand-dark/5 flex items-center justify-center text-brand-dark shadow-md hover:bg-brand-magenta hover:text-white transition-colors cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-white border border-brand-dark/5 flex items-center justify-center text-brand-dark shadow-md hover:bg-brand-magenta hover:text-white transition-colors cursor-pointer"
              aria-label="Următor"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* CONTAINER CARUSEL CU FADE PE MARGINI */}
        <div className="relative w-full">
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 px-8 select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mask-[linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]"
          >
            {galleryImages.map((img, index) => (
              <motion.div
                key={img.id}
                whileHover={{ y: -4 }}
                className="shrink-0 w-70 sm:w-85 aspect-3/4 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative group cursor-pointer snap-start"
                onClick={() => {
                  setDirection(0);
                  setSelectedIndex(index);
                }}
              >
                <img
                  src={img.src}
                  alt=""
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white bg-brand-magenta/80 px-4 py-2 rounded-full shadow-lg">Zoom</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-brand-dark/95 backdrop-blur-xl p-4" 
            onClick={() => setSelectedIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all z-50 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              aria-label="Închide"
            >
              <X size={24} />
            </button>

            <button
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md transition-all z-50 cursor-pointer"
              onClick={handlePrev}
            >
              <ChevronLeft size={32} />
            </button>

            <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.img
                  key={galleryImages[selectedIndex].id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 }
                  }}
                  src={galleryImages[selectedIndex].src}
                  alt=""
                  className="absolute max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>
            </div>

            <button
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md transition-all z-50 cursor-pointer"
              onClick={handleNext}
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRANZIȚIA CURBATĂ NEUNIFORMĂ SPRE TESTIMONIALS */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20 pointer-events-none transform translate-y-px">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-14 md:h-20">
          <path d="M0,40 C180,10 320,90 500,40 C700,-10 880,100 1200,30 L1200,120 L0,120 Z" className="fill-brand-magenta-light" />
        </svg>
      </div>
    </section>
  );
}