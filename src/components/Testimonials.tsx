import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { id: 1, text: "Gabriella a făcut tortul visurilor mele! Era atât de frumos încât aproape că nu am vrut să-l tăiem." },
  { id: 2, text: "Atenția la detalii este de neegalat. Florile de zahăr păreau atât de reale!" },
  { id: 3, text: "Cele mai delicioase brioșe pentru baby shower-ul meu. Recomand cu drag!" },
];

export function Testimonials() {
  return (
    <section className="py-24 pb-44 relative bg-pastel-pink/10 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-brand-dark mb-6 tracking-tighter">
            Cuvinte <span className="text-brand-magenta font-script">Dulci</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-[2.5rem] relative cursor-default border border-white/50"
            >
              <p className="font-sans text-brand-dark/80 text-lg md:text-xl leading-relaxed italic text-center">"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TRANZIȚIA 5: Curbă dinamică capricioasă spre Contact (fill-[#fbf9f4]) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20 pointer-events-none transform translate-y-px">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-16">
          <path d="M0,32 C250,90 450,-10 700,75 C920,115 1100,20 1200,45 L1200,120 L0,120 Z" fill="#fbf9f4" />
        </svg>
      </div>
    </section>
  );
}