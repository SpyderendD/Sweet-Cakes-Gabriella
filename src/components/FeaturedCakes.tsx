import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Heart, Plus } from "lucide-react";

const cakes = [
  {
    id: 1,
    name: "Nuntă Elegantă",
    category: "Evenimente de Lux",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop",
    badge: "Premium Choice",
  },
  {
    id: 2,
    name: "Candy Bar Botez",
    category: "Design Tematic",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Aniversare Copii",
    category: "Personaje & Poveste",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop",
    badge: "New Design",
  },
  {
    id: 4,
    name: "Torturi Corporate",
    category: "Branding Comestibil",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop",
  },
];

export function FeaturedCakes() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleCustomizeClick = (cakeName: string) => {
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
      className="py-32 pb-44 relative overflow-hidden bg-[#fffcf9]"
    >
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute top-0 right-0 w-125 h-125 bg-brand-magenta/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-brand-magenta" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-dark/40">Colecția de Artă</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-7xl font-bold text-brand-dark mb-8 tracking-tighter leading-[0.9]"
          >
            Inspirație pentru <br />
            <span className="text-brand-magenta italic font-script lowercase">momente magice.</span>
          </motion.h2>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cakes.map((cake, index) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => handleCustomizeClick(cake.name)}
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-4xl bg-gray-50 shadow-sm transition-all duration-700 group-hover:shadow-2xl mb-6">
                {cake.badge && (
                  <div className="absolute top-6 left-6 z-20">
                    <span className="text-[9px] font-black tracking-widest uppercase bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-brand-dark">
                      {cake.badge}
                    </span>
                  </div>
                )}
                <img src={cake.image} alt={cake.name} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-dark shadow-xl"><Plus size={24} /></div>
                </div>
              </div>

              <div className="text-center md:text-left px-2">
                <span className="text-[10px] uppercase tracking-widest text-brand-magenta font-bold mb-2 block">{cake.category}</span>
                <h3 className="font-serif text-2xl font-bold text-brand-dark group-hover:italic transition-all">{cake.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TRANZIȚIA 2: Val asimetric cu dublă curbură din FeaturedCakes spre About (fill-brand-light) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20 pointer-events-none transform translate-y-px">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-14 md:h-24">
          <path d="M0,30 C150,110 350,10 550,85 C750,140 1000,-10 1200,45 L1200,120 L0,120 Z" className="fill-brand-light" />
        </svg>
      </div>
    </section>
  );
}