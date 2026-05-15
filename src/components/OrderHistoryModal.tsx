import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Clock, ArrowRight } from "lucide-react";
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
    // Scroll to contact form
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      
      // Pre-fill email if possible
      setTimeout(() => {
        const emailInput = document.getElementById("email") as HTMLInputElement;
        if (emailInput && savedEmail) {
          emailInput.value = savedEmail;
          // Trigger focus/blur to update floating label state
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring" as any, bounce: 0.3 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md bg-white rounded-[2rem] shadow-2xl z-50 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="bg-pastel-rose/10 p-6 flex justify-between items-center border-b border-pastel-rose/20">
              <h3 id="modal-title" className="font-serif text-2xl font-bold text-brand-dark">Istoric Comenzi</h3>
              <button 
                onClick={onClose}
                className="p-2 bg-white rounded-full text-brand-dark/50 hover:text-brand-dark hover:bg-pastel-rose/20 transition-colors focus:outline-none focus:ring-2 focus:ring-pastel-rose"
                aria-label="Închide istoricul"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              {savedEmail ? (
                <div className="space-y-6">
                  <div className="bg-pastel-cream/30 p-6 rounded-2xl border border-pastel-cream">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="text-pastel-rose" size={20} aria-hidden="true" />
                      <p className="font-sans text-sm text-brand-dark/60 uppercase tracking-wider">Email Salvat</p>
                    </div>
                    <p className="font-sans font-medium text-lg text-brand-dark">{savedEmail}</p>
                    
                    {lastOrderDate && (
                      <div className="mt-4 pt-4 border-t border-brand-dark/5 flex items-center gap-3">
                        <Clock className="text-brand-dark/40" size={16} aria-hidden="true" />
                        <p className="font-sans text-sm text-brand-dark/60">
                          Ultima cerere: {new Date(lastOrderDate).toLocaleDateString('ro-RO')}
                        </p>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRequestAgain}
                    className="w-full py-4 bg-brand-dark text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-brand-dark/90 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2"
                  >
                    Cere încă o dată
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-pastel-cream rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-pastel-rose" size={28} aria-hidden="true" />
                  </div>
                  <p className="font-sans text-brand-dark/70 mb-6">
                    Nu am găsit nicio adresă de email salvată. Trimite o cerere nouă pentru a o salva aici!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRequestAgain}
                    className="px-6 py-3 bg-pastel-rose text-white rounded-full font-medium hover:bg-pastel-rose/90 transition-colors focus:outline-none focus:ring-2 focus:ring-pastel-rose focus:ring-offset-2"
                  >
                    Creează o cerere
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
