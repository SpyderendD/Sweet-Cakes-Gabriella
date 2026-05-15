import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles, Star, Heart, Plus } from "lucide-react";

const cakes = [
  {
    id: 1,
    name: "Nuntă Elegantă",
    category: "Evenimente de Lux",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop",
    badge: "Premium Choice",
    icon: Star,
  },
  {
    id: 2,
    name: "Candy Bar Botez",
    category: "Design Tematic",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800&auto=format&fit=crop",
    icon: Sparkles,
  },
  {
    id: 3,
    name: "Aniversare Copii",
    category: "Personaje & Poveste",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop",
    badge: "New Design",
    icon: Heart,
  },
  {
    id: 4,
    name: "Torturi Corporate",
    category: "Branding Comestibil",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop",
    icon: Star,
  },
];

export function FeaturedCakes() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax fin pentru elementele de fundal
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
      className="py-32 relative overflow-hidden bg-[#fffcf9]"
    >
      {/* Decorative Background - Gradient fin și textură */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute top-0 right-0 w-125 h-125 bg-brand-magenta/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Secțiune */}
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
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-brand-dark/50 max-w-xl text-lg leading-relaxed italic"
          >
            Fiecare creație este o piesă unică, modelată manual pentru a reflecta personalitatea și eleganța evenimentului tău.
          </motion.p>
        </div>
 
        {/* Grid de Produse */}
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
              {/* Image Container */}
              <div className="relative aspect-3/4 overflow-hidden rounded-4xl bg-gray-50 shadow-sm transition-all duration-700 group-hover:shadow-2xl mb-6">
                
                {/* Badge-ul minimalist */}
                {cake.badge && (
                  <div className="absolute top-6 left-6 z-20">
                    <span className="text-[9px] font-black tracking-widest uppercase bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-brand-dark">
                      {cake.badge}
                    </span>
                  </div>
                )}

                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />

                {/* Overlay la Hover */}
                <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-dark shadow-xl"
                  >
                    <Plus size={24} />
                  </motion.div>
                </div>
              </div>

              {/* Info Text */}
              <div className="text-center md:text-left px-2">
                <span className="text-[10px] uppercase tracking-widest text-brand-magenta font-bold mb-2 block">
                  {cake.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-dark group-hover:italic transition-all">
                  {cake.name}
                </h3>
                
                {/* Link discret sub titlu */}
                <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-brand-dark/30 group-hover:text-brand-magenta transition-colors overflow-hidden">
                  <span className="text-[10px] uppercase font-bold tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Solicită Detalii</span>
                  <ArrowRight size={12} className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Buton "Vezi Tot" Rafinat */}
        <div className="mt-24 text-center">
          <motion.a
            href="#gallery"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-4 px-12 py-5 bg-brand-dark text-white rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-brand-magenta transition-all group"
          >
            Portofoliu Complet 
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}