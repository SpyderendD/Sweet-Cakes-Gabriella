import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop", category: "Nuntă" },
  { id: 2, src: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop", category: "Aniversare" },
  { id: 3, src: "/assets/images/tort1.jpg", category: "Botez" },
  { id: 4, src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop", category: "Nuntă" },
  { id: 5, src: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?q=80&w=800&auto=format&fit=crop", category: "Petit Fours" },
  { id: 6, src: "https://images.unsplash.com/photo-1602351447937-745cb720612f?q=80&w=800&auto=format&fit=crop", category: "Aniversare" },
];

const categories = ["Toate", "Nuntă", "Botez", "Aniversare", "Petit Fours"];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring" as any, stiffness: 100 } 
  },
};

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState("Toate");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const filteredImages = activeFilter === "Toate" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setDirection(1);
      setSelectedIndex((selectedIndex + 1) % filteredImages.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setDirection(-1);
      setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
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
  }, [selectedIndex, filteredImages]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 15 : -15,
    }),
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-linear-to-b from-[#fbf9f4] to-brand-light">
      {/* 3D Decorative Elements */}
      <motion.div 
        animate={{ y: [0, -40, 0], rotate: [0, 45, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-10 w-32 h-32 bg-linear-to-br from-pastel-pink to-pastel-rose rounded-3xl shadow-[15px_15px_40px_rgba(255,182,193,0.6)] opacity-60 z-0"
        style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
        aria-hidden="true"
      />
      <motion.div 
        animate={{ y: [0, 50, 0], rotate: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 left-10 w-40 h-40 bg-linear-to-tr from-pastel-blue to-pastel-lavender rounded-full shadow-[15px_15px_50px_rgba(137,207,240,0.5)] opacity-50 z-0"
        aria-hidden="true"
      />
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 180, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pastel-cream/30 rounded-full mix-blend-multiply filter blur-3xl z-0"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
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
            className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-brand-dark mb-6 tracking-tighter"
          >
            Momente <span className="text-brand-magenta font-script italic">Dulci</span>
          </motion.h2>
          
          {/* Filter UI */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setSelectedIndex(null);
                }}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-brand-magenta text-white shadow-lg"
                    : "bg-white text-brand-dark/60 hover:bg-brand-magenta/10 hover:text-brand-magenta"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.button
                key={img.id}
                layout
                variants={itemVariants}
                className="w-full relative group overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 focus:outline-none"
                onClick={() => {
                  setDirection(0);
                  setSelectedIndex(index);
                }}
                aria-label={`Vezi imaginea ${index + 1} din galerie`}
              >
                <img
                  src={img.src}
                  alt={`${img.category} ${index + 1}`}
                  className="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-black tracking-widest uppercase bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm text-brand-magenta">
                    {img.category}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Carousel Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-brand-dark/95 backdrop-blur-xl p-4 perspective-1000" 
            onClick={() => setSelectedIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Vizualizare imagine"
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all z-50 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              aria-label="Închide galeria"
            >
              <X size={24} />
            </button>

            <button
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md transition-all z-50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={handlePrev}
              aria-label="Imaginea anterioară"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center" style={{ perspective: 1200 }}>
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.img
                  key={filteredImages[selectedIndex].id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring" as any, stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 }
                  }}
                  src={filteredImages[selectedIndex].src}
                  alt={filteredImages[selectedIndex].category}
                  className="absolute max-w-full max-h-full object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  referrerPolicy="no-referrer"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>
            </div>

            <button
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md transition-all z-50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={handleNext}
              aria-label="Imaginea următoare"
            >
              <ChevronRight size={32} />
            </button>
            
            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50 bg-black/20 p-3 rounded-full backdrop-blur-md" role="tablist">
              {filteredImages.map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={idx === selectedIndex}
                  aria-label={`Mergi la imaginea ${idx + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection(idx > selectedIndex ? 1 : -1);
                    setSelectedIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                    idx === selectedIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
