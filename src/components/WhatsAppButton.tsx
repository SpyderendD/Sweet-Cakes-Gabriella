import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
 
  const phoneNumber = "+40756883344"; 
  const message = "Bună! Aș dori să discutăm despre o comandă de tort.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 2 // Sincronizat cu noul Loading rapid
      }}
      // Am schimbat z-[90] în z-50 pentru a fi standard Tailwind
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] transition-shadow group"
      aria-label="Contactează-ne pe WhatsApp"
    >
      {/* Iconița cu un mic efect de puls la hover */}
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{ duration: 0.5, delay: 5, repeat: Infinity, repeatDelay: 4 }}
      >
        <MessageCircle size={32} fill="white" className="relative z-10" />
      </motion.div>
      
      {/* Tooltip Premium cu săgeată */}
      <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none">
        <div className="bg-white text-brand-dark text-xs font-bold py-2.5 px-5 rounded-xl shadow-2xl border border-brand-dark/5 whitespace-nowrap relative">
          Comandă pe WhatsApp
          {/* Săgeata tooltip-ului */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-r border-b border-brand-dark/5 -rotate-45" />
        </div>
      </div>

      {/* Ripple Effect (Unda de șoc) mai discretă */}
      <motion.div
        animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-[#25D366] z-0"
      />
    </motion.a>
  );
}