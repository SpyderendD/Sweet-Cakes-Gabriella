import { Link } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Loading({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Viteza de încărcare: se termină în fix 1.2 secunde
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 4; // Incrementare mai mare pentru rapiditate
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      // Am schimbat z-[100] în z-100 conform sugestiei VS Code
      className="fixed inset-0 z-100 bg-[#fffcf9] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={progress === 100 ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onAnimationComplete={() => {
        if (progress === 100) onComplete();
      }}
    >
      {/* Background Glow - Am folosit w-125 și h-125 conform sugestiei VS Code */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-125 h-125 bg-brand-magenta/10 rounded-full blur-[100px]"
      />

      <div className="relative flex flex-col items-center">
        {/* Titlu elegant */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="flex flex-col items-center leading-none group"
              >
                <span className="font-script text-3xl sm:text-4xl text-brand-magenta transition-transform group-hover:scale-105">Sweet</span>
                <div className="flex items-center gap-1.5 -mt-1">
                  <div className="h-px w-3 bg-brand-teal/30" />
                  <span className="font-sans text-[10px] sm:text-xs font-black text-brand-teal tracking-[0.4em] uppercase">Cakes</span>
                  <div className="h-px w-3 bg-brand-teal/30" />
                </div>
                <span className="font-sans text-[9px] text-brand-dark/40 uppercase tracking-widest mt-1">by Gabriella</span>
              </motion.div>
            </motion.div>
          </motion.div>
          <p className="text-[10px] uppercase tracking-[0.5em] text-brand-dark/40 mt-2">
            Laborator Artizanal
          </p>
        </motion.div>

        {/* Bara de progres centrală */}
        <div className="w-48 h-0.5 bg-brand-dark/5 rounded-full overflow-hidden relative">
          <motion.div
            // Am folosit h-0.5 conform sugestiei VS Code pentru înălțimea de 2px
            className="absolute top-0 left-0 h-0.5 bg-brand-magenta"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Procentaj discret */}
        <div className="mt-4">
          <span className="font-mono text-[10px] text-brand-magenta font-bold">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Mesaj de subsol care se schimbă */}
      <motion.div
        className="absolute bottom-12 text-[9px] uppercase tracking-widest text-brand-dark/30"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {progress < 60 ? "Se pregătește cuptorul..." : "Decorăm glazura..."}
      </motion.div>
    </motion.div>
  );
}