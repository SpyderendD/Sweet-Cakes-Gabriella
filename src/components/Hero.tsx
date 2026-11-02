import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Star, Heart } from "lucide-react";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Setări ultra-smooth pentru senzorii de mișcare
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const x = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const y = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-36 md:pt-28 pb-36 overflow-hidden bg-brand-light"
    >
      {/* Lumini ambientale de fundal (Roz delicat & Verde Fistic) */}
      <motion.div 
        style={{ x: useTransform(smoothX, [-0.5, 0.5], [50, -50]), y: useTransform(smoothY, [-0.5, 0.5], [50, -50]) }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute top-24 left-6 md:left-10 w-72 h-72 bg-brand-magenta/15 rounded-full filter blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ x: useTransform(smoothX, [-0.5, 0.5], [-50, 50]), y: useTransform(smoothY, [-0.5, 0.5], [-50, 50]) }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="absolute top-36 right-6 md:right-10 w-80 h-80 bg-brand-pistachio/25 rounded-full filter blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Partea Stângă (Text & Sigiliu) */}
        <motion.div
          style={{ x, y }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
          className="text-center md:text-left flex flex-col items-center md:items-start relative"
        >
          {/* SIGILIU LUXURY ROTATIV (Vizibil acum și pe mobil, cu text clar fistic) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="w-36 h-36 md:w-48 md:h-48 absolute -top-10 md:-top-14 -left-2 md:-left-12 z-0 select-none pointer-events-none opacity-40 md:opacity-60"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text className="font-sans text-[6.5px] uppercase tracking-[0.24em] font-black fill-brand-pistachio-dark">
                <textPath href="#circlePath">
                  • sweet cakes by gabriella • arta dulce • targu mures •
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Badge „Arta Cofetăriei Artizanale” cu stil Fistic */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[10px] tracking-widest font-black uppercase mb-6 inline-block px-4 py-1.5 rounded-full bg-brand-pistachio-light text-brand-pistachio-dark border border-brand-pistachio/30 shadow-xs relative z-10"
          >
            Arta Cofetăriei Artizanale
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-serif text-[clamp(3.5rem,9vw,7.5rem)] font-bold leading-[1.05] mb-8 text-brand-dark tracking-tighter relative z-10"
          >
            Arta <br />
            <span className="text-brand-magenta font-script italic block mt-2">
              Dulcelui
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-sans text-base md:text-xl text-brand-dark/70 mb-10 max-w-md leading-relaxed relative z-10 italic"
          >
            Unde imaginația întâlnește gustul rafinat. Creăm experiențe senzoriale deosebite pentru cele mai importante momente.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6 w-full relative z-10">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -3, boxShadow: "0 20px 35px -10px rgba(201, 93, 119, 0.4)" }}
              whileTap={{ scale: 0.96 }}
              className="px-10 py-5 bg-brand-magenta text-white rounded-2xl font-bold text-lg md:text-xl shadow-lg transition-all w-full sm:w-auto relative overflow-hidden group text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Creează-ți Tortul <Heart size={20} className="fill-white" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />
            </motion.a>

            <motion.a
              href="#gallery"
              whileHover={{ scale: 1.04, y: -3, backgroundColor: "rgba(255,255,255,1)" }}
              whileTap={{ scale: 0.96 }}
              className="px-10 py-5 bg-white/70 backdrop-blur-md border border-brand-dark/10 text-brand-dark rounded-2xl font-bold text-lg md:text-xl shadow-md transition-all w-full sm:w-auto text-center hover:border-brand-pistachio"
            >
              Explorează
            </motion.a>
          </div>
        </motion.div>

        {/* Partea Dreaptă (Imagini Plutitoare Parallax) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4, delay: 0.3 }}
          className="relative h-110 md:h-160 flex justify-center items-center mt-6 md:mt-0"
        >
          {/* Vitrina Principală */}
          <motion.div
            style={{ x: useTransform(smoothX, [-0.5, 0.5], [-20, 20]), y: useTransform(smoothY, [-0.5, 0.5], [-20, 20]) }}
            animate={{ 
              y: [-12, 12, -12],
              rotate: [-1.5, 1.5, -1.5]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-full max-w-sm md:max-w-md group"
          >
            <div className="absolute inset-0 bg-brand-pistachio/30 blur-2xl rounded-4xl scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/assets/images/vitrina.jpg"
              alt="Vitrina cu deliciuri"
              className="w-full h-auto object-cover rounded-4xl shadow-2xl border-4 md:border-8 border-white/70"
            />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -right-8 text-brand-magenta opacity-80"
            >
              <Star size={42} fill="currentColor" />
            </motion.div>
          </motion.div>

          {/* Element plutitor Sus: Savarină */}
          <motion.div
            style={{ x: useTransform(smoothX, [-0.5, 0.5], [40, -40]), y: useTransform(smoothY, [-0.5, 0.5], [40, -40]) }}
            className="absolute top-4 -right-2 md:top-8 md:right-0 z-30"
          >
            <motion.img
              src="/assets/images/savarina.jpg"
              alt="Prăjitură artizanală"
              className="w-22 h-22 md:w-28 md:h-28 object-cover rounded-full shadow-xl border-4 border-white"
              animate={{ y: [-12, 12, -12], rotate: [0, 15, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          
          {/* Element plutitor Jos: Cinnamon Rolls */}
          <motion.div
            style={{ x: useTransform(smoothX, [-0.5, 0.5], [-40, 40]), y: useTransform(smoothY, [-0.5, 0.5], [-40, 40]) }}
            className="absolute bottom-8 -left-2 md:bottom-16 md:left-0 z-30"
          >
            <motion.img
              src="/assets/images/cinnamon_rolls.jpg"
              alt="Cinnamon Rolls"
              className="w-20 h-20 md:w-26 md:h-26 object-cover rounded-full shadow-xl border-4 border-white"
              animate={{ y: [12, -12, 12], rotate: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Indicator Scroll Desktop */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2">
        <span className="text-[8px] uppercase tracking-[0.3em] text-brand-dark/40 font-black font-sans">Explorează</span>
        <div className="w-5 h-8 rounded-full border border-brand-dark/20 p-1 flex justify-center">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-brand-magenta"
          />
        </div>
      </div>

      {/* Val curbat asimetric spre secțiunea următoare */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20 pointer-events-none transform translate-y-px">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-12 md:h-20">
          <path d="M0,32 C300,100 600,-20 900,80 C1050,110 1150,50 1200,32 L1200,120 L0,120 Z" className="fill-white" />
        </svg>
      </div>
    </section>
  );
}