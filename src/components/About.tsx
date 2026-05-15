import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FloatingShapes } from "./FloatingShapes";
import { Sparkles, Heart, Star } from "lucide-react";
import AboutImage from "../assets/images/regenerated_image_1778843329681.jpg";

export function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden bg-gradient-to-b from-[#fbf9f4] to-[#f7f2ea]">
      <FloatingShapes />
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-pastel-cream rounded-full mix-blend-multiply filter blur-[100px] opacity-40"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-pastel-pink rounded-full mix-blend-multiply filter blur-[100px] opacity-40"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -10 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, type: "spring" as any, bounce: 0.4 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <motion.div 
                style={{ rotate }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-pastel-blue/30 to-pastel-pink/30 rounded-[5rem] transform scale-105 blur-sm"
                aria-hidden="true"
              />
              <div className="relative z-10 w-full h-full p-4">
                <motion.img
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.8, type: "spring" as any }}
                  src={AboutImage}
                  alt="Gabriella, fondatoarea Sweet Cakes"
                  className="w-full h-full object-cover rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border-8 border-white"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating badges */}
              <motion.div
                animate={{ y: [-20, 20, -20], rotate: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-10 glass-card p-6 rounded-3xl z-20 flex items-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-2 border-white/80 backdrop-blur-xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pastel-rose to-pastel-pink rounded-2xl flex items-center justify-center text-white font-serif text-2xl font-black shadow-lg transform -rotate-6">
                  10+
                </div>
                <div>
                  <div className="font-serif text-xl font-bold text-brand-dark leading-none mb-1">Ani de</div>
                  <div className="font-sans text-sm font-black text-pastel-rose tracking-widest uppercase">Măiestrie</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [20, -20, 20], rotate: [5, -5, 5] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-10 -left-10 glass-card p-4 rounded-2xl z-20 shadow-xl border-2 border-white/80 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pastel-blue/20 rounded-full flex items-center justify-center text-pastel-blue">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <span className="font-sans font-bold text-brand-dark">Calitate Premium</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, type: "spring" as any }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Vertical Rail Text */}
            <div className="absolute -right-4 top-20 hidden xl:block">
              <span className="text-[10px] font-bold text-brand-dark/20 uppercase tracking-[0.8em] whitespace-nowrap rotate-90 origin-right">
                ESTABLISHED 2024 • ARTISAN BAKERY
              </span>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-micro mb-6 inline-block px-4 py-1.5 border-soft rounded-full bg-white/40 backdrop-blur-md"
            >
              Măiestrie & Pasiune
            </motion.div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-brand-dark mb-6 md:mb-8 leading-[1.15] tracking-tighter">
              Coapte cu <span className="text-brand-magenta font-script italic">dragoste</span>, <br />
              <span className="relative">
                create cu pasiune
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -bottom-2 left-0 h-1 bg-brand-magenta/20 rounded-full"
                />
              </span>
            </h2>
            <div className="space-y-8 font-sans text-brand-dark/70 text-lg md:text-xl leading-relaxed">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-brand-magenta first-letter:mr-4 first-letter:float-left first-letter:leading-none">
                Bună, sunt Gabriella. Atelierul meu este dedicat exclusiv dulciurilor la comandă, transformând ideile și visurile tale în realitate dulce.
              </p>
              <p>
                Fiecare tort, candy bar sau prăjitură este personalizată în detaliu. Folosim doar cele mai fine ingrediente – unt premium, ciocolată belgiană veritabilă și fructe proaspete.
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 flex items-center gap-8"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-brand-dark/20 to-transparent" />
              <div className="flex flex-col items-center">
                <span className="font-script text-4xl text-brand-magenta/60 -rotate-2 select-none">Gabriella</span>
                <span className="text-xs font-bold text-brand-dark/30 uppercase tracking-[0.2em] mt-1">Fondator & Cofetar</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
