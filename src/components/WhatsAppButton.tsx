import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "+40756883344"; 
  const message = "Bună! Aș dori să discutăm despre o comandă de tort.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const [isScrollVisible, setIsScrollVisible] = useState(true);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollVisible(false); // Ascunde butonul în timpul derulării

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Reafișează butonul la 300ms după ce scroll-ul s-a oprit
      scrollTimeout.current = setTimeout(() => {
        setIsScrollVisible(true);
      }, 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {isScrollVisible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] transition-shadow group"
          aria-label="Contactează-ne pe WhatsApp"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, delay: 5, repeat: Infinity, repeatDelay: 4 }}
          >
            <MessageCircle size={32} fill="white" className="relative z-10" />
          </motion.div>
          
          {/* Tooltip Premium */}
          <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none">
            <div className="bg-white text-brand-dark text-xs font-bold py-2.5 px-5 rounded-xl shadow-2xl border border-brand-dark/5 whitespace-nowrap relative font-sans">
              Comandă pe WhatsApp
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-r border-b border-brand-dark/5 -rotate-45" />
            </div>
          </div>

          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-[#25D366] z-0"
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
}