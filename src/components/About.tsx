import { motion, useScroll, useTransform, Variants } from "motion/react";
import { useRef } from "react";
import { Sparkles, Heart, Star, Award } from "lucide-react";
import AboutImage from "../assets/images/logo.jpg";

export function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax fin pentru elementele de profunzime
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const rotateImage = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden bg-[#fffcf9]">
      
      {/* Background Decorativ - Subtil & Elegant */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-24 -right-24 w-125 h-125 bg-brand-magenta/10 rounded-full blur-[120px]"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 left-0 w-125 h-125 bg-brand-dark/5 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          
          {/* Partea Stângă: Imaginea & Badge-uri */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Rama decorativă din spate */}
              <motion.div 
                style={{ rotate: rotateImage }}
                className="absolute inset-0 border-2 border-brand-magenta/20 rounded-[3rem] translate-x-6 translate-y-6 -z-10"
              />
              
              <div className="relative z-10 bg-white p-4 rounded-[3.5rem] shadow-2xl shadow-brand-dark/5 overflow-hidden group">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 1, ease: "circOut" }}
                  src={AboutImage}
                  alt="Gabriella - Fondator Sweet Cakes"
                  className="w-full h-full object-cover rounded-[2.8rem]"
                />
              </div>
              
              {/* Floating "Quality Seal" */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -right-8 bg-brand-dark text-white p-8 rounded-4xl shadow-2xl z-20 border border-white/10"
              >
                <div className="flex flex-col items-center">
                   <Award className="text-brand-magenta mb-2" size={24} />
                   <span className="font-serif italic text-2xl font-bold">10+</span>
                   <span className="text-[9px] uppercase tracking-widest font-black opacity-50">Ani de Artă</span>
                </div>
              </motion.div>

              {/* Floating detail badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-6 -left-6 bg-white py-3 px-6 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-brand-dark/5"
              >
                <div className="w-8 h-8 bg-brand-magenta/10 rounded-full flex items-center justify-center text-brand-magenta">
                  <Star size={16} fill="currentColor" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Calitate Premium</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Partea Dreaptă: Text & Poveste */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-brand-magenta" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-dark/40">Povestea Noastră</span>
            </div>

            <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-dark mb-10 leading-[0.95] tracking-tighter">
              Creat cu <span className="text-brand-magenta font-script italic lowercase">dragoste</span>, <br />
              <span className="relative">
                servit cu emoție.
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="absolute -bottom-2 left-0 h-1 bg-brand-magenta/20 rounded-full"
                />
              </span>
            </h2>

            <div className="space-y-6 font-sans text-brand-dark/60 text-lg leading-relaxed italic">
              <p>
                <span className="text-4xl font-serif font-bold text-brand-magenta mr-2 not-italic">Bună,</span> 
                sunt Gabriella. Atelierul meu s-a născut dintr-o pasiune infinită pentru frumos și pentru momentele acelea speciale care rămân tipărite în suflet.
              </p>
              <p>
                Nu fac doar torturi; plămădesc experiențe senzoriale. Folosesc doar ingrediente pe care le-aș pune la masa familiei mele: unt maturat, fructe proaspete și ciocolată belgiană de cea mai înaltă calitate.
              </p>
            </div>
            
            {/* Secțiunea Semnătură */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 flex items-center gap-8"
            >
              <div className="flex flex-col">
                <span className="font-script text-4xl text-brand-magenta">Gabriella</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/30 mt-2">Fondator & Master Pastry Chef</span>
              </div>
              <div className="h-px flex-1 bg-brand-dark/5" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <Heart key={i} size={14} className="text-brand-magenta/20 fill-brand-magenta/20" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}