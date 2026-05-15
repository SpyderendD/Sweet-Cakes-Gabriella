import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Clock, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderHistoryModal({ isOpen, onClose }: OrderHistoryModalProps) {
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const [lastOrderDate, setLastOrderDate] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const email = localStorage.getItem("sweetcakes_email");
      const date = localStorage.getItem("sweetcakes_last_order");
      setSavedEmail(email);
      setLastOrderDate(date);
    }
  }, [isOpen]);

  const handleRequestAgain = () => {
    onClose();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const emailInput = document.getElementById("email") as HTMLInputElement;
        if (emailInput && savedEmail) {
          emailInput.value = savedEmail;
          emailInput.focus();
          emailInput.blur();
        }
      }, 800);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay - mai întunecat pentru focus */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/60 backdrop-blur-md z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2.5rem)] max-w-md bg-[#fffdfa] rounded-[2.5rem] shadow-2xl z-50 overflow-hidden border border-white/20"
          >
            {/* Header Decorativ */}
            <div className="relative bg-brand-dark p-8 text-white text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-brand-magenta rounded-full blur-3xl" />
              </div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
              >
                <ShoppingBag className="text-brand-magenta" size={28} />
              </motion.div>
              
              <h3 className="font-serif text-3xl font-bold italic">
                Bun venit <span className="text-brand-magenta text-4xl font-script">înapoi</span>
              </h3>
              
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-10">
              {savedEmail ? (
                <div className="space-y-8">
                  {/* Cardul de Info stilizat */}
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative p-6 bg-white rounded-3xl border border-brand-dark/5 shadow-sm overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Sparkles size={40} className="text-brand-magenta" />
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-brand-magenta/10 rounded-full flex items-center justify-center">
                        <Mail className="text-brand-magenta" size={14} />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-dark/40">Email de contact</span>
                    </div>
                    
                    <p className="text-lg font-serif font-bold text-brand-dark mb-4">{savedEmail}</p>
                    
                    {lastOrderDate && (
                      <div className="flex items-center gap-2 pt-4 border-t border-brand-dark/5 text-brand-dark/40 italic text-sm">
                        <Clock size={14} />
                        <span>Ultima comandă: {new Date(lastOrderDate).toLocaleDateString('ro-RO')}</span>
                      </div>
                    )}
                  </motion.div>

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRequestAgain}
                    className="w-full py-5 bg-brand-magenta text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-[0_10px_25px_-5px_rgba(233,30,99,0.4)] hover:bg-brand-magenta/90 transition-all group"
                  >
                    Vreau un tort nou
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-brand-dark/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="text-brand-dark/20" size={32} />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-brand-dark mb-2">Încă nu ai cereri salvate</h4>
                  <p className="text-sm text-brand-dark/50 mb-8 max-w-50 mx-auto">
                    Trimite prima ta cerere și îți vom salva datele aici.
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRequestAgain}
                    className="px-10 py-4 bg-brand-dark text-white rounded-full font-bold text-sm uppercase tracking-widest"
                  >
                    Creează prima cerere
                  </motion.button>
                </div>
              )}
            </div>
            
            {/* Footer discret */}
            <div className="bg-brand-dark/5 py-4 text-center">
              <p className="text-[9px] uppercase tracking-widest text-brand-dark/30">Gătim momente dulci cu pasiune</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}