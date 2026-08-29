import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Accessibility, Type, Contrast, EyeOff, X, RotateCcw, 
  MousePointer2, Blinds, Sun, SpellCheck 
} from "lucide-react";

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollVisible, setIsScrollVisible] = useState(true);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [settings, setSettings] = useState({
    largeText: false,
    highContrast: false,
    reduceMotion: false,
    grayscale: false,
    dyslexicFont: false,
    bigCursor: false,
    textSpacing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("accessibility_settings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    Object.entries(settings).forEach(([key, value]) => {
      html.classList.toggle(`access-${key}`, value);
    });
    localStorage.setItem("accessibility_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollVisible(false); // Ascunde butonul la scroll

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrollVisible(true); // Reapare după oprirea scroll-ului
      }, 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAccessibility = () => {
    setSettings({
      largeText: false,
      highContrast: false,
      reduceMotion: false,
      grayscale: false,
      dyslexicFont: false,
      bigCursor: false,
      textSpacing: false,
    });
  };

  const menuVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { 
      opacity: 1, scale: 1, y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { opacity: 0, scale: 0.9, y: 20 }
  };

  const AccessButton = ({ id, label, icon: Icon }: any) => {
    const active = settings[id as keyof typeof settings];
    return (
      <button
        onClick={() => toggleSetting(id as keyof typeof settings)}
        className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all ${
          active ? 'bg-brand-dark text-white shadow-lg' : 'bg-brand-dark/5 text-brand-dark hover:bg-brand-dark/10'
        }`}
        aria-pressed={active}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className={active ? "text-brand-magenta" : ""} />
          <span className="font-sans text-[10px] font-black uppercase tracking-widest">{label}</span>
        </div>
        <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-brand-magenta animate-pulse' : 'bg-brand-dark/20'}`} />
      </button>
    );
  };

  // Forțăm meniul să rămână vizibil dacă utilizatorul îl are activ deschis
  const shouldBeVisible = isScrollVisible || isOpen;

  return (
    <div className="fixed bottom-6 left-6 z-100">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden" animate="show" exit="exit"
            className="absolute bottom-20 left-0 w-80 bg-white/95 backdrop-blur-2xl border border-brand-dark/10 p-6 rounded-[2.5rem] shadow-2xl origin-bottom-left"
          >
            <div className="flex justify-between items-center mb-6 border-b border-brand-dark/5 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-magenta/10 rounded-full flex items-center justify-center text-brand-magenta">
                   <Accessibility size={18} />
                </div>
                <h4 className="font-serif font-bold text-brand-dark">Accesibilitate</h4>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors">
                <X size={18} className="text-brand-dark/30" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <AccessButton id="largeText" label="Text Mărit" icon={Type} />
              <AccessButton id="dyslexicFont" label="Font Dislexie" icon={SpellCheck} />
              <AccessButton id="textSpacing" label="Spațiere Text" icon={Blinds} />
              <AccessButton id="highContrast" label="Contrast Ridicat" icon={Contrast} />
              <AccessButton id="grayscale" label="Monocrom" icon={Sun} />
              <AccessButton id="bigCursor" label="Cursor Mărit" icon={MousePointer2} />
              <AccessButton id="reduceMotion" label="Fără Animații" icon={EyeOff} />
            </div>

            <button
              onClick={resetAccessibility}
              className="w-full mt-6 flex items-center justify-center gap-2 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-brand-magenta hover:bg-brand-magenta/5 rounded-xl transition-all"
            >
              <RotateCcw size={12} /> Resetează totul
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shouldBeVisible && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
                isOpen ? 'bg-brand-magenta text-white rotate-90' : 'bg-brand-dark text-white'
            }`}
            aria-label="Deschide meniu accesibilitate"
          >
            <Accessibility size={26} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}