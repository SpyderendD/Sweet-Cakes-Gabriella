import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { Accessibility, Type, Contrast, EyeOff, X, RotateCcw } from "lucide-react";

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    
    // Toggle clasele pe elementul HTML
    html.classList.toggle("access-large-text", largeText);
    html.classList.toggle("access-high-contrast", highContrast);
    html.classList.toggle("access-reduce-motion", reduceMotion);
  }, [largeText, highContrast, reduceMotion]);

  const resetAccessibility = () => {
    setLargeText(false);
    setHighContrast(false);
    setReduceMotion(false);
  };

  const menuVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20, x: -20 },
    show: { 
      opacity: 1, scale: 1, y: 0, x: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { opacity: 0, scale: 0.9, y: 20, x: -20 }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute bottom-16 left-0 w-72 bg-white/95 backdrop-blur-2xl border border-brand-dark/10 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] origin-bottom-left"
          >
            <div className="flex justify-between items-center mb-6 border-b border-brand-dark/5 pb-4">
              <div className="flex items-center gap-2">
                <Accessibility size={20} className="text-brand-magenta" />
                <h4 className="font-serif font-bold text-brand-dark">Accesibilitate</h4>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1.5 rounded-full hover:bg-brand-dark/5 transition-colors"
              >
                <X size={18} className="text-brand-dark/40" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Text mai mare */}
              <button
                onClick={() => setLargeText(!largeText)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                  largeText ? 'bg-brand-dark text-white shadow-lg' : 'bg-brand-dark/5 text-brand-dark hover:bg-brand-dark/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Type size={18} />
                  <span className="font-sans text-xs font-bold uppercase tracking-widest">Text mărit</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${largeText ? 'bg-brand-magenta animate-pulse' : 'bg-brand-dark/20'}`} />
              </button>

              {/* Contrast */}
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                  highContrast ? 'bg-brand-dark text-white shadow-lg' : 'bg-brand-dark/5 text-brand-dark hover:bg-brand-dark/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Contrast size={18} />
                  <span className="font-sans text-xs font-bold uppercase tracking-widest">Contrast</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${highContrast ? 'bg-brand-magenta animate-pulse' : 'bg-brand-dark/20'}`} />
              </button>

              {/* Motion */}
              <button
                onClick={() => setReduceMotion(!reduceMotion)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                  reduceMotion ? 'bg-brand-dark text-white shadow-lg' : 'bg-brand-dark/5 text-brand-dark hover:bg-brand-dark/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <EyeOff size={18} />
                  <span className="font-sans text-xs font-bold uppercase tracking-widest">Fără animații</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${reduceMotion ? 'bg-brand-magenta animate-pulse' : 'bg-brand-dark/20'}`} />
              </button>
            </div>

            {/* Buton Resetare */}
            {(largeText || highContrast || reduceMotion) && (
              <button
                onClick={resetAccessibility}
                className="w-full mt-6 flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-magenta hover:underline"
              >
                <RotateCcw size={12} />
                Resetează totul
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isOpen ? 'bg-brand-magenta text-white rotate-90' : 'bg-brand-dark text-white'
        }`}
        aria-label="Meniu Accesibilitate"
      >
        <Accessibility size={26} />
      </motion.button>
    </div>
  );
}