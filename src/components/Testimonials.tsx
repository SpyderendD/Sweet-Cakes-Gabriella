import { motion } from "motion/react";

const testimonials = [
  {
    id: 1,
    text: "Gabriella a făcut tortul visurilor mele! Era atât de frumos încât aproape că nu am vrut să-l tăiem, dar gustul a fost chiar mai bun decât aspectul.",
  },
  {
    id: 2,
    text: "Atenția la detalii este de neegalat. Florile de zahăr păreau atât de reale, iar aroma de lavandă a fost perfect echilibrată.",
  },
  {
    id: 3,
    text: "Sweet Cakes by Gabriella a oferit cele mai adorabile și delicioase brioșe pentru baby shower-ul meu. Toată lumea i-a cerut datele de contact!",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 relative bg-pastel-pink/10 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-64 h-64 bg-pastel-rose/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ x: [20, -20, 20], y: [20, -20, 20] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pastel-blue/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-micro mb-4 inline-block px-4 py-1.5 border-soft rounded-full bg-white/40 backdrop-blur-md"
          >
            Feedback Clienți
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as any, bounce: 0.5 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-brand-dark mb-6 tracking-tighter"
          >
            Cuvinte <span className="text-brand-magenta font-script italic">Dulci</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2, type: "spring" as any, bounce: 0.4 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-8 rounded-[2.5rem] relative cursor-default border border-white/50 shadow-xl group"
            >
              {/* Quote mark decoration */}
              <motion.div 
                initial={{ scale: 0, rotate: -15 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3, type: "spring" as any }}
                className="absolute -top-6 -left-2 text-8xl text-pastel-rose/20 font-serif leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                "
              </motion.div>
              
              <div className="relative z-10">
                <p className="font-sans text-brand-dark/80 text-lg md:text-xl leading-relaxed italic text-center">
                  "{t.text}"
                </p>
              </div>
              
              {/* Decorative sparkle */}
              <motion.div 
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: index }}
                className="absolute top-6 right-8 text-pastel-rose/30"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
