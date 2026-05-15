import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "40722000000"; // Placeholder number
  const message = "Bună! Aș dori să discutăm despre o comandă de tort.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ 
        type: "spring" as any, 
        stiffness: 260, 
        damping: 20,
        delay: 4 // Show after loading
      }}
      className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] transition-shadow group"
      title="Contactează-ne pe WhatsApp"
    >
      <MessageCircle size={32} fill="white" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 bg-white text-brand-dark text-sm font-bold py-2 px-4 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-brand-dark/5">
        Comandă pe WhatsApp
      </div>

      {/* Ripple Effect */}
      <motion.div
        animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-[#25D366] -z-10"
      />
    </motion.a>
  );
}
