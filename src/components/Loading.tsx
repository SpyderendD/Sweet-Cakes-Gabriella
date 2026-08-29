import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface LoadingProps {
  onComplete: () => void;
}

export function Loading({ onComplete }: LoadingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600); // Mică întârziere pentru un fade-out lin
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 bg-brand-light z-9999 flex flex-col items-center justify-center"
      >
        <div className="text-center space-y-6 px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="font-script text-5xl md:text-7xl text-brand-magenta">Sweet</span>
            <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-brand-dark uppercase font-black -mt-2">
              Cakes by Gabriella
            </span>
          </motion.div>

          {/* Bară de progres premium */}
          <div className="w-48 h-1 bg-brand-dark/10 rounded-full overflow-hidden mx-auto relative">
            <motion.div
              className="h-full bg-brand-magenta"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="flex items-center justify-center gap-1.5 text-brand-dark/40 text-[9px] uppercase tracking-[0.2em] font-sans">
            <Sparkles size={10} className="animate-spin text-brand-magenta" />
            <span>Se prepară magia... {progress}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}