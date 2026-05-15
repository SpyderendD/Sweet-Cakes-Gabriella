import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("sweetcakes_cookie_consent");
    if (!consent) {
      // Small delay before showing to let the user see the site first
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("sweetcakes_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("sweetcakes_cookie_consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring" as any, stiffness: 100, damping: 20 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-white/90 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-2xl z-50"
          role="alertdialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
        >
          <div className="flex items-start gap-4 relative">
            <div className="w-10 h-10 bg-pastel-cream rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <Cookie className="text-pastel-rose" size={20} aria-hidden="true" />
            </div>
            <div>
              <h4 id="cookie-title" className="font-serif font-bold text-brand-dark mb-1 pr-6">Folosim Cookie-uri</h4>
              <p id="cookie-desc" className="font-sans text-sm text-brand-dark/70 mb-5">
                Acest site folosește cookie-uri pentru a-ți oferi cea mai bună experiență dulce. Ești de acord cu utilizarea lor?
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAccept}
                  className="flex-1 bg-brand-dark text-white text-sm font-medium py-2.5 rounded-xl hover:bg-brand-dark/90 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2"
                >
                  Acceptă
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDecline}
                  className="flex-1 bg-pastel-rose/10 text-brand-dark text-sm font-medium py-2.5 rounded-xl hover:bg-pastel-rose/20 transition-colors focus:outline-none focus:ring-2 focus:ring-pastel-rose focus:ring-offset-2"
                >
                  Refuză
                </motion.button>
              </div>
            </div>
            <button 
              onClick={handleDecline} 
              className="absolute -top-2 -right-2 p-2 text-brand-dark/40 hover:text-brand-dark transition-colors rounded-full hover:bg-brand-dark/5 focus:outline-none focus:ring-2 focus:ring-pastel-rose"
              aria-label="Închide bannerul de cookie-uri"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
