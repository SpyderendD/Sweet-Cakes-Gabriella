import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Star, Heart } from "lucide-react";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Setări ultra-smooth pentru senzori de mișcare
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const x = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const y = useTransform(smoothY, [-0.5, 0.5], [-35, 35]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-36 overflow-hidden bg-linear-to-b from-[#fbf9f4] to-brand-light"
    >
      {/* Fundal mesh cu blobs strălucitoare */}
      <motion.div 
        style={{ x: useTransform(smoothX, [-0.5, 0.5], [60, -60]), y: useTransform(smoothY, [-0.5, 0.5], [60, -60]) }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 w-64 h-64 bg-pastel-pink rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      />
      <motion.div 
        style={{ x: useTransform(smoothX, [-0.5, 0.5], [-60, 60]), y: useTransform(smoothY, [-0.5, 0.5], [-60, 60]) }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-10 w-72 h-72 bg-pastel-blue rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Partea Stângă (Text & Animații textuale) */}
        <motion.div
          style={{ x, y }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
          className="text-center md:text-left flex flex-col items-center md:items-start relative"
        >
          {/* SIGILIU LUXURY ROTATIV (Text curb elegant care se rotește în fundal) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-48 h-48 absolute -top-14 -left-12 z-0 select-none pointer-events-none hidden md:block"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text className="font-sans text-[6px] uppercase tracking-[0.23em] font-black fill-brand-dark/15">
                <textPath href="#circlePath">
                  • sweet cakes by gabriella • arta dulce • targu mures •
                </textPath>
              </text>
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-micro mb-8 inline-block px-5 py-2 border-soft rounded-full bg-white/40 backdrop-blur-md shadow-sm relative z-10"
          >
            Arta Cofetăriei Artizanale
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-serif text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[1.05] mb-10 text-brand-dark tracking-tighter relative z-10"
          >
            Arta <br />
            <span className="text-brand-magenta font-script italic block mt-4">
              Dulcelui
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="font-sans text-lg md:text-xl text-brand-dark/60 mb-10 max-w-md leading-relaxed relative z-10"
          >
            Unde imaginația întâlnește gustul rafinat. Creăm experiențe senzoriale deosebite pentru cele mai importante momente.
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6 w-full relative z-10">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px -10px rgba(233, 30, 99, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-brand-magenta text-white rounded-2xl font-bold text-xl shadow-xl transition-all w-full sm:w-auto relative overflow-hidden group text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Creează-ți Tortul <Heart size={20} className="fill-white" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />
            </motion.a>
            <motion.a
              href="#gallery"
              whileHover={{ scale: 1.05, y: -5, backgroundColor: "rgba(255,255,255,1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/60 backdrop-blur-md border-2 border-white text-brand-dark rounded-2xl font-bold text-xl shadow-lg transition-all w-full sm:w-auto text-center"
            >
              Explorează
            </motion.a>
          </div>
        </motion.div>

        {/* Partea Dreaptă (Imagini Plutitoare Parallax) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.5, delay: 0.3 }}
          className="relative h-125 md:h-175 flex justify-center items-center"
        >
          <motion.div
            style={{ x: useTransform(smoothX, [-0.5, 0.5], [-25, 25]), y: useTransform(smoothY, [-0.5, 0.5], [-25, 25]) }}
            animate={{ 
              y: [-15, 15, -15],
              rotate: [-2, 2, -2],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-full max-w-md group"
          >
            <div className="absolute inset-0 bg-pastel-rose/20 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/assets/images/vitrina.jpg"
              alt="Vitrina cu deliciuri"
              className="w-full h-auto object-cover rounded-4xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border-8 border-white/50 backdrop-blur-sm"
            />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 text-pastel-rose opacity-60"
            >
              <Star size={48} fill="currentColor" />
            </motion.div>
          </motion.div>

          {/* Elemente plutitoare (Macaron & Căpșună) */}
          <motion.div
            style={{ x: useTransform(smoothX, [-0.5, 0.5], [45, -45]), y: useTransform(smoothY, [-0.5, 0.5], [45, -45]) }}
            className="absolute top-10 right-0 z-30"
          >
            <motion.img
              src="/assets/images/savarina.jpg"
              alt="Macaron"
              className="w-28 h-28 object-cover rounded-full shadow-2xl border-4 border-white"
              animate={{ y: [-15, 15, -15], rotate: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div
            style={{ x: useTransform(smoothX, [-0.5, 0.5], [-45, 45]), y: useTransform(smoothY, [-0.5, 0.5], [-45, 45]) }}
            className="absolute bottom-20 left-0 z-30"
          >
            <motion.img
              src="/assets/images/cinnamon_rolls.jpg"
              alt="Cinnamon Rolls"
              className="w-24 h-24 object-cover rounded-full shadow-2xl border-4 border-white"
              animate={{ y: [15, -15, 15], rotate: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* INDICATOR DE SCROLL PREMIUM */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2">
        <span className="text-[8px] uppercase tracking-[0.3em] text-brand-dark/40 font-black font-sans">Explorează</span>
        <div className="w-5 h-8 rounded-full border border-brand-dark/20 p-1 flex justify-center">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-brand-magenta"
          />
        </div>
      </div>

      {/* VAL CURBAT ASIMETRIC NEUNIFORM */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20 pointer-events-none transform translate-y-px">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-12 md:h-20">
          <path d="M0,32 C300,100 600,-20 900,80 C1050,110 1150,50 1200,32 L1200,120 L0,120 Z" className="fill-brand-light" />
        </svg>
      </div>
    </section>
  );
}