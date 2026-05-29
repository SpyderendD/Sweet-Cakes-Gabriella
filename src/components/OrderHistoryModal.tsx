import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, ArrowRight, Sparkles, ShoppingBag, Cake, Utensils, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderHistoryModal({ isOpen, onClose }: OrderHistoryModalProps) {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      const savedHistory = localStorage.getItem("sweetcakes_order_history");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    }
  }, [isOpen]);

  const handleReorder = (order: any) => {
    onClose();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      
      // Trimitem tot obiectul de comandă către formular
      setTimeout(() => {
        const event = new CustomEvent('updateContactForm', {
          detail: { 
            fullOrder: {
              ...order,
              // Putem alege să golim data dacă vrem ca utilizatorul să aleagă una nouă, 
              // dar cerința a fost să se completeze tot.
              date: "" // Recomand să lăsăm data goală ca să forțăm alegerea uneia noi
            } 
          }
        });
        window.dispatchEvent(event);
      }, 800);
    }
  };

  const deleteHistory = () => {
    if(confirm("Ștergi tot istoricul de comenzi?")) {
      localStorage.removeItem("sweetcakes_order_history");
      setHistory([]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/60 backdrop-blur-md z-200"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
            className="fixed top-1/2 left-1/2 w-[calc(100%-2.5rem)] max-w-xl bg-[#fffdfa] rounded-[2.5rem] shadow-2xl z-200 overflow-hidden border border-white/20"
          >
            {/* Header */}
            <div className="bg-brand-dark p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-magenta rounded-full flex items-center justify-center">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold italic">Istoric Cereri</h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-50">Ultimele 3 creații</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 custom-scrollbar">
              {history.length > 0 ? (
                history.map((order, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={order.id}
                    className="group relative bg-white border border-brand-dark/5 rounded-3xl p-5 hover:border-brand-magenta/30 transition-all shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[9px] font-black bg-brand-magenta/10 text-brand-magenta px-2 py-1 rounded-full uppercase tracking-tighter">
                          {order.theme || "Tort Personalizat"}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-brand-dark mt-1 italic">
                          {order.flavor || "Aromă clasică"}
                        </h4>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-brand-dark/30 flex items-center gap-1 justify-end">
                          <Clock size={10} /> {new Date(order.submittedAt).toLocaleDateString('ro-RO')}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="flex items-center gap-2 text-xs text-brand-dark/60 bg-brand-dark/5 p-2 rounded-xl">
                        <Utensils size={12} className="text-brand-magenta" />
                        <span>{order.servings || "Nespecificat"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-brand-dark/60 bg-brand-dark/5 p-2 rounded-xl">
                        <Cake size={12} className="text-brand-magenta" />
                        <span className="truncate">{order.cakeMessage || "Fără mesaj"}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleReorder(order)}
                      className="w-full py-3 bg-brand-dark text-white rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-brand-magenta transition-all"
                    >
                      Repetă Comanda <ArrowRight size={14} />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Sparkles className="mx-auto text-brand-dark/10 mb-4" size={48} />
                  <p className="text-brand-dark/40 italic">Nu ai nicio comandă salvată încă.</p>
                </div>
              )}
            </div>

            {history.length > 0 && (
              <div className="p-4 bg-brand-dark/5 flex justify-between items-center">
                <button 
                  onClick={deleteHistory}
                  className="text-[10px] uppercase font-bold text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <Trash2 size={12} /> Șterge tot
                </button>
                <p className="text-[9px] uppercase tracking-widest text-brand-dark/30 italic">Dulciuri făcute cu drag</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}