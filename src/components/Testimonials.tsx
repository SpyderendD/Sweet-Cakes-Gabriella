import React from "react";
import { motion } from "framer-motion";
import { Star, Sparkles, Heart, MessageCircle, ExternalLink, CheckCircle } from "lucide-react";

// =========================================================================
// 💬 AICI PUI MESAJELE REALE primite de Gabriella de la clienți pe WhatsApp/Facebook:
// =========================================================================
const realReviews = [
  {
    id: 1,
    client: " ",
    event: " ",
    source: " ",
    date: " ",
    text: "Tortul a fost peste așteptările noastre, atât ca aspect, cât și la gust! Toți invitații au întrebat de unde l-am comandat. Mulțumim mult!",
  },
  {
    id: 2,
    text: "Prăjiturile au fost absolut delicioase, proaspete și pline de savoare! Se simte pasiunea și grija cu care sunt pregătite fiecare în parte. A fost o adevărată bucurie să le savurăm!🤍🍰",
  },
  {
    id: 3,
    text: "Atenția la detalii și gustul deserturilor au fost impecabile. Prăjiturelele au dispărut imediat de pe masă. Cu siguranță vom reveni!",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 pb-44 relative bg-[#fdf2f5] overflow-hidden">
      
      {/* PARTICULE DECORATIVE (Verde-Teal din logo & Auriu cald) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl"
        />

        <motion.div 
          animate={{ scale: [1, 1.2, 1], y: [0, 25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#fffdd0]/60 rounded-full blur-3xl"
        />

        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-12 text-brand-teal/40"
        >
          <Sparkles size={28} />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 18, 0], rotate: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-24 right-16 text-amber-400/50"
        >
          <Star size={24} fill="currentColor" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Titlu Secțiune */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-brand-teal text-[10px] font-black uppercase tracking-widest shadow-2xs border border-brand-teal/20">
            <CheckCircle size={12} className="text-brand-teal" /> Feedback de la Clienți Reali
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-brand-dark tracking-tight">
            Gânduri <span className="text-brand-magenta font-script lowercase text-6xl md:text-8xl">dulci</span>
          </h2>
          <p className="text-xs text-brand-dark/60 font-sans max-w-lg mx-auto">
            Mesaje primite cu drag de la oamenii care ne-au trecut pragul atelierului sau au comandat deserturi pentru evenimente importante.
          </p>
        </div>

        {/* Cartonașele cu recenzii */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {realReviews.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-brand-magenta/15 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Antet Card: Stele + Sursă reală */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  <span className="text-[9px] font-bold text-brand-teal bg-brand-teal-light px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle size={10} /> {t.source}
                  </span>
                </div>

                {/* Mesaj */}
                <p className="font-sans text-brand-dark/80 text-base leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              {/* Detalii autor */}
              <div className="pt-4 border-t border-brand-dark/5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-serif font-bold text-brand-dark block text-sm">
                    {t.client}
                  </span>
                  <span className="text-[10px] text-brand-dark/40 font-sans">
                    {t.event}
                  </span>
                </div>
                <span className="text-[10px] text-brand-dark/30 font-sans">
                  {t.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🔗 Buton spre Facebook Reviews + Notă de conformitate ANPC */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <a
            href="https://www.facebook.com/p/Sweet-Cakes-by-Gabriella-100063574656863/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-brand-dark hover:text-brand-magenta text-xs font-bold shadow-xs hover:shadow-md transition-all border border-brand-dark/10"
          >
            <span>Vezi recenziile și recomandările pe Facebook</span>
            <ExternalLink size={14} />
          </a>

          <p className="text-[9px] text-brand-dark/40 uppercase tracking-widest font-sans">
            Recenzii verificate • Colectate direct de la clienții laboratorului
          </p>
        </div>

      </div>

      {/* Tranziție spre secțiunea Contact */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20 pointer-events-none transform translate-y-px">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-16">
          <path d="M0,32 C250,90 450,-10 700,75 C920,115 1100,20 1200,45 L1200,120 L0,120 Z" fill="#fbf9f4" />
        </svg>
      </div>
    </section>
  );
}