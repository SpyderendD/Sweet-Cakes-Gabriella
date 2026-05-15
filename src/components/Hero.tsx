import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { Star, Heart } from "lucide-react";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-linear-to-b from-[#fbf9f4] to-brand-light"
    >
      {/* Background blobs with parallax */}
      <motion.div 
        style={{ x: useTransform(smoothX, [-0.5, 0.5], [50, -50]), y: useTransform(smoothY, [-0.5, 0.5], [50, -50]) }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 w-64 h-64 bg-pastel-pink rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      />
      <motion.div 
        style={{ x: useTransform(smoothX, [-0.5, 0.5], [-50, 50]), y: useTransform(smoothY, [-0.5, 0.5], [-50, 50]) }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-10 w-72 h-72 bg-pastel-blue rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      />
      <motion.div 
        style={{ x: useTransform(smoothX, [-0.5, 0.5], [30, -30]), y: useTransform(smoothY, [-0.5, 0.5], [30, -30]) }}
        animate={{ scale: [1, 1.15, 1], x: [0, 50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-8 left-40 w-80 h-80 bg-pastel-lavender rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          style={{ x, y }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" as any, stiffness: 100 }}
          className="text-center md:text-left flex flex-col items-center md:items-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-micro mb-8 inline-block px-5 py-2 border-soft rounded-full bg-white/40 backdrop-blur-md shadow-sm"
          >
            Arta Cofetăriei Artizanale
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-serif text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[1.05] mb-10 text-brand-dark tracking-tighter"
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
            className="font-sans text-lg md:text-xl text-brand-dark/60 mb-10 max-w-md leading-relaxed"
          >
            Unde imaginația întâlnește gustul rafinat. Creăm experiențe senzoriale deosebite pentru cele mai importante momente.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px -10px rgba(233, 30, 99, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-brand-magenta text-white rounded-2xl font-bold text-xl shadow-xl transition-all w-full sm:w-auto relative overflow-hidden group text-center focus:outline-none focus:ring-4 focus:ring-brand-magenta/30"
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
              className="px-10 py-5 bg-white/60 backdrop-blur-md border-2 border-white text-brand-dark rounded-2xl font-bold text-xl shadow-lg transition-all w-full sm:w-auto text-center focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              Explorează
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, type: "spring" as any, bounce: 0.5, delay: 0.3 }}
          className="relative h-125 md:h-175 flex justify-center items-center"
        >
          {/* Main Cake Image with Floating Effect */}
          <motion.div
            style={{ x: useTransform(smoothX, [-0.5, 0.5], [-20, 20]), y: useTransform(smoothY, [-0.5, 0.5], [-20, 20]) }}
            animate={{ 
              y: [-20, 20, -20],
              rotate: [-2, 2, -2],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-full max-w-md group"
          >
            <div className="absolute inset-0 bg-pastel-rose/20 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop"
              alt="Tort de nuntă de lux"
              className="w-full h-auto object-cover rounded-4xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border-8 border-white/50 backdrop-blur-sm"
            />
            {/* Floating Icons around the cake */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 text-pastel-rose opacity-60"
            >
              <Star size={48} fill="currentColor" />
            </motion.div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -left-10 text-pastel-blue opacity-60"
            >
              <Heart size={48} fill="currentColor" />
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            style={{ x: useTransform(smoothX, [-0.5, 0.5], [40, -40]), y: useTransform(smoothY, [-0.5, 0.5], [40, -40]) }}
            className="absolute top-10 right-0 z-30"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=200&auto=format&fit=crop"
              alt="Macaron"
              className="w-28 h-28 object-cover rounded-full shadow-2xl border-4 border-white"
              animate={{ y: [-15, 15, -15], rotate: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div
            style={{ x: useTransform(smoothX, [-0.5, 0.5], [-40, 40]), y: useTransform(smoothY, [-0.5, 0.5], [-40, 40]) }}
            className="absolute bottom-20 left-0 z-30"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1514517521153-1be72277b32f?q=80&w=200&auto=format&fit=crop"
              alt="Căpșună"
              className="w-24 h-24 object-cover rounded-full shadow-2xl border-4 border-white"
              animate={{ y: [15, -15, 15], rotate: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          {/* Decorative circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none">
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, scale: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute inset-0 border-2 border-dashed border-pastel-pink/30 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360, scale: [1, 1.1, 1] }}
              transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute inset-10 border border-pastel-blue/40 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
