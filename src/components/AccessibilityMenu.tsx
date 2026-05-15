import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Accessibility, Type, Contrast, EyeOff, X } from "lucide-react";

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Apply classes to HTML element based on state
    const html = document.documentElement;
    
    if (largeText) html.classList.add("access-large-text");
    else html.classList.remove("access-large-text");

    if (highContrast) html.classList.add("access-high-contrast");
    else html.classList.remove("access-high-contrast");

    if (reduceMotion) html.classList.add("access-reduce-motion");
    else html.classList.remove("access-reduce-motion");
  }, [largeText, highContrast, reduceMotion]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            transition={{ type: "spring" as any, bounce: 0.3 }}
            className="absolute bottom-16 left-0 w-64 bg-white/95 backdrop-blur-xl border border-white/50 p-5 rounded-3xl shadow-2xl origin-bottom-left"
          >
            <div className="flex justify-between items-center mb-4 border-b border-brand-dark/10 pb-3">
              <h4 className="font-serif font-bold text-brand-dark flex items-center gap-2">
                <Accessibility size={18} className="text-pastel-rose" />
                Accesibilitate
              </h4>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1 rounded-full text-brand-dark/50 hover:text-brand-dark hover:bg-brand-dark/5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setLargeText(!largeText)}
                aria-pressed={largeText}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-pastel-rose focus:ring-offset-2 ${
                  largeText ? 'bg-pastel-rose text-white shadow-md' : 'bg-pastel-cream/30 text-brand-dark hover:bg-pastel-cream/60'
                }`}
              >
                <Type size={18} />
                <span className="font-sans text-sm font-medium">Text mai mare</span>
              </button>

              <button
                onClick={() => setHighContrast(!highContrast)}
                aria-pressed={highContrast}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-pastel-rose focus:ring-offset-2 ${
                  highContrast ? 'bg-pastel-rose text-white shadow-md' : 'bg-pastel-cream/30 text-brand-dark hover:bg-pastel-cream/60'
                }`}
              >
                <Contrast size={18} />
                <span className="font-sans text-sm font-medium">Contrast ridicat</span>
              </button>

              <button
                onClick={() => setReduceMotion(!reduceMotion)}
                aria-pressed={reduceMotion}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-pastel-rose focus:ring-offset-2 ${
                  reduceMotion ? 'bg-pastel-rose text-white shadow-md' : 'bg-pastel-cream/30 text-brand-dark hover:bg-pastel-cream/60'
                }`}
              >
                <EyeOff size={18} />
                <span className="font-sans text-sm font-medium">Reduce animațiile</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center shadow-xl hover:bg-brand-dark/90 transition-colors"
        aria-label="Meniu Accesibilitate"
      >
        <Accessibility size={24} />
      </motion.button>
    </div>
  );
}
