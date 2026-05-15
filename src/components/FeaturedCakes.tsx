import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles, Star, Heart } from "lucide-react";
import { FloatingShapes } from "./FloatingShapes";

const cakes = [
  {
    id: 1,
    name: "Nuntă Elegantă",
    price: "Personalizat",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop",
    color: "bg-pastel-pink/20",
    badge: "Popular",
    icon: Star,
  },
  {
    id: 2,
    name: "Candy Bar Botez",
    price: "La cerere",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800&auto=format&fit=crop",
    color: "bg-pastel-lavender/30",
    icon: Sparkles,
  },
  {
    id: 3,
    name: "Aniversare Copii",
    price: "Personalizat",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop",
    color: "bg-pastel-cream/40",
    badge: "Nou",
    icon: Heart,
  },
  {
    id: 4,
    name: "Torturi Corporate",
    price: "La cerere",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop",
    color: "bg-pastel-blue/20",
    icon: Star,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -10 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    rotateX: 0,
    transition: { type: "spring" as any, stiffness: 100, damping: 15 } 
  },
};

export function FeaturedCakes() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleCustomizeClick = (e: React.MouseEvent, cakeName: string) => {
    e.stopPropagation();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      
      setTimeout(() => {
        const event = new CustomEvent('updateContactForm', {
          detail: { field: 'theme', value: `Doresc personalizare tort: ${cakeName}` }
        });
        window.dispatchEvent(event);
      }, 800);
    }
  };

  return (
    <section 
      id="cakes" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#f7f2ea] to-[#fbf9f4]"
    >
      <FloatingShapes />
      
      {/* Decorative Background Elements with Parallax */}
      <motion.div 
        style={{ x: x1, opacity }}
        animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-32 h-32 bg-pastel-pink/30 rounded-full mix-blend-multiply filter blur-2xl z-0"
      />
      <motion.div 
        style={{ x: x2, opacity }}
        animate={{ y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 right-10 w-40 h-40 bg-pastel-blue/30 rounded-full mix-blend-multiply filter blur-2xl z-0"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-micro mb-4 inline-block px-4 py-1.5 border-soft rounded-full bg-white/40 backdrop-blur-md"
          >
            Colecția de Sezon
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-brand-dark mb-6 tracking-tighter"
          >
            Inspirație pentru <br />
            <span className="text-brand-magenta italic font-script">Evenimentul Tău</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-brand-dark/60 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Fiecare tort sau prăjitură este realizată exclusiv la comandă, personalizată exact așa cum îți dorești. Iată câteva dintre creațiile noastre anterioare pentru a te inspira.
          </motion.p>
        </div>
 
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 perspective-2000"
        >
          {cakes.map((cake) => (
            <motion.div
              key={cake.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring" as any, stiffness: 400, damping: 30 }}
              className="group relative"
            >
              <div className={`relative rounded-[2.5rem] overflow-hidden mb-6 ${cake.color} p-4 aspect-[4/5] flex items-center justify-center transition-all duration-500 shadow-sm group-hover:shadow-2xl z-10 border border-white/50 backdrop-blur-sm`}>
                
                {cake.badge && (
                  <div className="absolute top-6 right-6 z-20">
                    <motion.span 
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="text-[10px] font-black tracking-widest uppercase bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-md flex items-center gap-2 text-brand-magenta"
                    >
                      <cake.icon size={12} fill="currentColor" /> {cake.badge}
                    </motion.span>
                  </div>
                )}

                <motion.img
                  src={cake.image}
                  alt={`Tort ${cake.name}`}
                  className="w-full h-full object-cover rounded-[1.8rem] shadow-lg group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Refined Hover Overlay */}
                <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                  <button 
                    onClick={(e) => handleCustomizeClick(e, cake.name)}
                    className="w-full bg-white/95 text-brand-dark py-4 rounded-xl font-bold shadow-xl flex items-center justify-center gap-3 hover:bg-brand-magenta hover:text-white transition-all text-sm uppercase tracking-wider group/btn"
                    aria-label={`Personalizează modelul ${cake.name}`}
                  >
                    Personalizează <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              <div className="text-center relative z-10">
                <h3 className="font-serif text-2xl font-bold text-brand-dark mb-1 group-hover:text-brand-magenta transition-colors">{cake.name}</h3>
                <p className="text-micro opacity-50 tracking-[0.2em]">{cake.price}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-20 text-center relative z-10">
          <motion.a
            href="#gallery"
            whileHover={{ scale: 1.05, y: -5, backgroundColor: "var(--color-pastel-rose)", color: "white", boxShadow: "0 20px 40px -10px rgba(255, 182, 193, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 border-2 border-pastel-rose text-pastel-rose rounded-2xl font-bold text-lg transition-all shadow-md hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pastel-rose/30"
          >
            Vezi Portofoliul Complet <ArrowRight size={20} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
