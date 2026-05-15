import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export function Loading({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const interval = 20;
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 600);
          return 100;
        }
        
        // Update layers based on progress
        if (p > 10 && activeLayer < 1) setActiveLayer(1); // Plate
        if (p > 30 && activeLayer < 2) setActiveLayer(2); // Base layer
        if (p > 55 && activeLayer < 3) setActiveLayer(3); // Middle layer
        if (p > 75 && activeLayer < 4) setActiveLayer(4); // Top layer
        if (p > 90 && activeLayer < 5) setActiveLayer(5); // Cherry/Candle
        
        return p + step;
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, [activeLayer]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#f7f2ea] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isDone ? 0 : 1 }}
      transition={{ duration: 0.8, delay: isDone ? 0.2 : 0 }}
      onAnimationComplete={() => {
        if (isDone) onComplete();
      }}
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-brand-magenta/10 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-pastel-pink/10 rounded-full blur-[120px]"
        />
      </div>

      <AnimatePresence mode="wait">
        {!isDone && (
          <motion.div
            key="loading-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center w-full max-w-sm"
          >
            {/* The Cake Building Animation */}
            <div className="relative h-[240px] w-full flex items-end justify-center mb-10 mt-10">
              {/* Sparkles rotating around */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center opacity-80"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    className="absolute"
                    style={{
                      transform: `rotate(${i * 72}deg) translateY(-140px)`
                    }}
                  >
                    <Sparkles className="text-brand-magenta/40 w-6 h-6" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Cherry/Candle (Layer 5) */}
              <AnimatePresence>
                {activeLayer >= 5 && (
                  <motion.div
                    initial={{ y: -50, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ type: "spring" as any, bounce: 0.6, duration: 1 }}
                    className="absolute bottom-[135px] z-50 flex flex-col items-center"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-3 h-3 bg-yellow-400 rounded-full blur-[2px] mb-1"
                    />
                    <div className="w-1.5 h-6 bg-orange-200 rounded-t-sm" />
                    <div className="w-4 h-4 bg-red-500 rounded-full shadow-inner -mt-2 z-10" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Top Layer (Layer 4) */}
              <AnimatePresence>
                {activeLayer >= 4 && (
                  <motion.div
                    initial={{ y: -50, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ type: "spring" as any, bounce: 0.5, duration: 1.2 }}
                    className="absolute bottom-[95px] z-40 w-[80px]"
                  >
                    <div className="h-[45px] bg-pastel-pink rounded-t-xl rounded-b-md shadow-inner relative overflow-hidden">
                      {/* Icing drips */}
                      <div className="absolute top-0 w-full h-3 bg-white rounded-t-xl" />
                      <div className="absolute top-2 left-[10%] w-3 h-4 bg-white rounded-b-full" />
                      <div className="absolute top-2 left-[40%] w-4 h-6 bg-white rounded-b-full" />
                      <div className="absolute top-2 right-[20%] w-3 h-5 bg-white rounded-b-full" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Middle Layer (Layer 3) */}
              <AnimatePresence>
                {activeLayer >= 3 && (
                  <motion.div
                    initial={{ y: -50, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ type: "spring" as any, bounce: 0.4, duration: 1.4 }}
                    className="absolute bottom-[55px] z-30 w-[130px]"
                  >
                    <div className="h-[50px] bg-pastel-purple rounded-t-xl rounded-b-md shadow-inner relative overflow-hidden">
                       {/* Pattern */}
                      <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 flex justify-between px-2">
                        {[...Array(6)].map((_, i) => (
                           <div key={i} className="w-2 h-2 rounded-full bg-white/40" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Base Layer (Layer 2) */}
              <AnimatePresence>
                {activeLayer >= 2 && (
                  <motion.div
                    initial={{ y: -50, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ type: "spring" as any, bounce: 0.3, duration: 1.6 }}
                    className="absolute bottom-[10px] z-20 w-[180px]"
                  >
                    <div className="h-[55px] bg-brand-light rounded-t-xl rounded-b-sm shadow-[0_4px_10px_rgba(0,0,0,0.05)] border-b border-brand-dark/5 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
                       <div className="absolute bottom-0 w-full h-1/2 bg-brand-magenta/5" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Plate (Layer 1) */}
              <AnimatePresence>
                {activeLayer >= 1 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" as any, duration: 0.8 }}
                    className="absolute bottom-0 z-10"
                  >
                    <div className="w-[240px] h-[15px] bg-gray-100 rounded-full border border-gray-200 shadow-md relative">
                       <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-[220px] h-[6px] bg-white rounded-full" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content Group */}
            <div className="text-center z-10 relative">
              <motion.h2 
                className="font-serif text-5xl md:text-6xl font-bold text-brand-dark tracking-tight mb-4 flex items-center justify-center gap-3"
                animate={{ scale: isDone ? 1.05 : 1 }}
                transition={{ duration: 0.4 }}
              >
                Savori <span className="text-brand-magenta font-script lowercase text-6xl md:text-7xl block md:inline-block">în lucru</span>
              </motion.h2>
              
              <div className="flex flex-col items-center">
                <div className="w-64 h-1.5 bg-brand-dark/5 rounded-full mt-6 overflow-hidden relative shadow-inner">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-magenta via-pastel-pink to-brand-magenta bg-[length:200%_100%]"
                    animate={{ backgroundPosition: ['0%_0%', '100%_0%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between w-64 mt-3">
                  <motion.p className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-dark/40">
                    Pregătim bunătățile...
                  </motion.p>
                  <motion.p className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-magenta font-mono">
                    {Math.round(progress)}%
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Decorative Crumbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`crumb-${i}`}
            initial={{ 
              x: Math.random() * 100 - 50 + "vw", 
              y: Math.random() * 100 - 50 + "vh",
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 0.8, 0],
              scale: [0, Math.random() * 0.6 + 0.4, 0],
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 4 + Math.random() * 4, 
              repeat: Infinity, 
              ease: "easeOut",
              delay: Math.random() * 3
            }}
            className={`absolute w-1.5 h-1.5 rounded-sm ${
              i % 3 === 0 ? 'bg-brand-magenta/30' : 
              i % 3 === 1 ? 'bg-orange-300/40 rounded-full' : 
              'bg-pastel-pink/50'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
