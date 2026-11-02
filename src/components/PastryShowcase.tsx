import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageCircle, Flame, X, Maximize2 } from "lucide-react";

// ==========================================
// 💡 PROMOȚIA TA (Păstrată exact așa cum ai setat-o):
// ==========================================
const currentPromo = {
  active: false, // Pune 'true' când vrei să reapară pe site
  badge: "Ofertă Specială de Sâmbătă",
  title: "2+1 GRATIS; Cumperi 2 prăjituri din vitrină și a treia este din partea noastră",
  note: "Valabil la ridicarea din laborator (Str. Tisei 11). Întreabă-ne pe WhatsApp ce e disponibil acum!",
};

// ==========================================
// 🥐 CINNAMON ROLLS (Slot separat):
// ==========================================
const cinnamonRollImage = "/assets/images/cinnamon_rolls2.jpg";

const cinnamonRolls = [
  { name: "Cinnamon Roll Original", detail: "Glazură fină de cremă de brânză", tag: "Clasic" },
  { name: "Cinnamon Roll cu Lotus Biscoff", detail: "Cremă speculoos & biscuite crocant", tag: "Favorit 🔥" },
  //{ name: "Cinnamon Roll cu Mere & Scorțișoară", detail: "Mere caramelizate cu unt la cuptor", tag: "Aromat" },
];

// ==========================================
// 🍰 MENIUL EDITORIAL AL VITRINEI (Pe Categorii):
// ==========================================
const categories = [
  {
    title: "Savarine & Eclere",
    items: [
      { name: "Savarină cu Frișcă Naturală", note: "Tradițional", popular: true },
      { name: "Eclere cu Ciocolată", note: "Glazură fină" },
      { name: "Mini Eclere Asortate", note: "Platou / Bucată" },
      { name: "Tarte cu Vanilie & Fructe", note: "Fructe proaspete" },
      { name: "Choux Craquelin", note: "Cremă vanilie", popular: true },
    ]
  },
  {
    title: "Prăjituri Clasice",
    items: [
      { name: "Doboș Tradițional", note: "Zahăr ars crocant", popular: true },
      { name: "Prăjitură Carpați", note: "Caramel & cocos" },
      { name: "Ruladă de Ciocolată", note: "Blat fin" },
      { name: "Diplomat cu Fructe", note: "Răcoritor" },
    ]
  },
  {
    title: "Specialități",
    items: [
      { name: "Mini Pavlova cu Fructe", note: "Bezea crocantă", popular: true },
      { name: "Cannoli cu Fistic & Ricotta", note: "Rețetă Siciliană" },
      { name: "Tiramisu Artizanal", note: "Pișcoturi & Mascarpone" },
    ]
  },
  {
    title: "Torturi la Felie",
    items: [
      { name: "Cheesecake cu Zmeură", note: "Felie generoasă", popular: true },
      { name: "Tort Medovic cu Miere", note: "Foi fine cu miere", popular: true },
    ]
  }
];

export function PastryShowcase() {
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string } | null>(null);

  // Închidere la tasta ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openWhatsApp = (customText?: string) => {
    const text = customText || "Bună Gabriella! Aș dori să știu ce prăjituri mai aveți disponibile astăzi în vitrina laboratorului.";
    window.open(`https://wa.me/40756883344?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="vitrina" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* 1. BANNER PROMOȚII (Cartonaș colorat: Roz-zmeură pal) */}
        {currentPromo.active && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 p-6 md:p-8 rounded-3xl bg-[#fef2f5] border border-brand-magenta/25 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-magenta text-white flex items-center justify-center shrink-0 shadow-xs">
                <Flame size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-magenta bg-white px-2.5 py-0.5 rounded-full inline-block mb-1 shadow-2xs">
                  {currentPromo.badge}
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-dark">
                  {currentPromo.title}
                </h3>
                <p className="text-xs text-brand-dark/70 font-sans mt-0.5">
                  {currentPromo.note}
                </p>
              </div>
            </div>

            <button
              onClick={() => openWhatsApp("Bună Gabriella! Aș vrea să beneficiez de oferta 2+1 GRATIS de sâmbătă.")}
              className="shrink-0 px-6 py-3 rounded-xl bg-brand-teal text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <MessageCircle size={15} /> Rezervă Oferta
            </button>
          </motion.div>
        )}

        {/* 2. HEADER MINIMALIST */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal-light text-brand-teal text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={12} /> Proaspăt în Fiecare Zi
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-dark tracking-tight">
            Vitrina cu <span className="font-script text-brand-magenta lowercase text-5xl md:text-7xl">delicii</span>
          </h2>
          <p className="text-sm text-brand-dark/60 font-sans leading-relaxed">
            Rețete artizanale, pregătite în laboratorul nostru din Târgu Mureș în cantități mici pentru prospețime maximă.
          </p>
        </div>

        {/* 3. TABLOU EDITORIAL (Cartonaș colorat: Crem cald vanilat) */}
        <div className="bg-[#fbf7ee] rounded-3xl p-8 md:p-12 border border-[#ede3cf] shadow-xs mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-[#e5d9c2] pb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                  <h3 className="text-xs uppercase font-black tracking-widest text-brand-dark/50 font-sans">
                    {cat.title}
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {cat.items.map((item, i) => (
                    <li 
                      key={i} 
                      className="flex items-center justify-between py-1.5 group hover:translate-x-1 transition-transform duration-200"
                    >
                      <span className="font-serif text-base md:text-lg text-brand-dark font-medium group-hover:text-brand-teal transition-colors">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        {item.popular && (
                          <span className="text-[9px] font-bold text-brand-magenta bg-white px-2 py-0.5 rounded-md shadow-2xs">
                            ★ Favorit
                          </span>
                        )}
                        <span className="text-[10px] text-brand-dark/50 font-sans">
                          {item.note}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* O SINGURĂ BARĂ ELEGANTĂ PENTRU COMANDĂ / WHATSAPP */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-white/60 p-6 rounded-2xl border border-[#ede3cf]">
            <div>
              <p className="font-serif text-base font-bold text-brand-dark">
                Ai poftă de ceva anume din vitrină?
              </p>
              <p className="text-xs text-brand-dark/60 font-sans">
                Sună-ne sau scrie-ne pe WhatsApp și îți punem prăjiturile deoparte înainte să treci pe la atelier.
              </p>
            </div>

            <button
              onClick={() => openWhatsApp()}
              className="px-6 py-3 rounded-2xl bg-brand-teal text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition-all flex items-center gap-2 shrink-0 shadow-xs cursor-pointer"
            >
              <MessageCircle size={15} /> Verifică Disponibilitatea
            </button>
          </div>
        </div>

        {/* 4. CINNAMON ROLLS (Cartonaș colorat: Verde-Fistic cald & fin) */}
        <div className="mb-16 bg-[#f1f8f6] rounded-3xl p-6 md:p-8 border border-brand-teal/20 shadow-xs">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Slot poză (Click pentru Zoom) */}
            <div 
              onClick={() => setZoomImage({ src: cinnamonRollImage, title: "Cinnamon Rolls Proaspăt Coapte" })}
              className="w-full md:w-5/12 aspect-4/3 rounded-2xl overflow-hidden relative cursor-pointer group shadow-xs bg-white"
            >
              <img 
                src={cinnamonRollImage} 
                alt="Cinnamon Rolls" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-bold text-xs backdrop-blur-[2px]">
                <Maximize2 size={16} /> Mărește poza
              </div>
            </div>

            {/* Cele 3 sortimente */}
            <div className="w-full md:w-7/12 space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-teal">
                  Coapte în fiecare dimineață
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark">
                  Cinnamon Rolls Artizanale
                </h3>
                <p className="text-xs text-brand-dark/60 font-sans mt-0.5">
                  Pregătite separat de vitrina rece, cu aluat dospit lent, unt 82% și scorțișoară Ceylon.
                </p>
              </div>

              <div className="space-y-2">
                {cinnamonRolls.map((roll, i) => (
                  <div 
                    key={i} 
                    className="p-3 bg-white rounded-xl border border-brand-teal/15 flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-bold text-brand-dark">{roll.name}</span>
                        <span className="text-[9px] font-bold text-brand-magenta">{roll.tag}</span>
                      </div>
                      <p className="text-[11px] text-brand-dark/60">{roll.detail}</p>
                    </div>

                    <button
                      onClick={() => openWhatsApp(`Bună Gabriella! Aș dori să rezerv o porție de ${roll.name}.`)}
                      className="text-brand-teal hover:text-brand-dark text-xs font-bold underline shrink-0 cursor-pointer"
                    >
                      Rezervă
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 5. POZA VITRINEI (Cu Zoom la click) */}
        <div 
          onClick={() => setZoomImage({ src: "/assets/images/vitrina.jpg", title: "Vitrina Sweet Cakes by Gabriella" })}
          className="rounded-3xl overflow-hidden border border-brand-dark/5 shadow-xs relative max-w-4xl mx-auto group cursor-pointer"
        >
          <img 
            src="/assets/images/vitrina.jpg" 
            alt="Vitrina Sweet Cakes" 
            className="w-full h-72 md:h-96 object-cover group-hover:scale-102 transition-transform duration-700"
          />
          
          <div className="absolute inset-0 bg-linear-to-t from-brand-dark/80 via-transparent to-transparent flex items-end justify-between p-6 md:p-8">
            <div className="text-left text-white">
              <h4 className="font-serif text-xl md:text-2xl font-bold">
                Așa arată vitrina noastră proaspătă
              </h4>
              <p className="text-xs text-white/80 font-sans">
                Te așteptăm cu drag pe Strada Tisei nr. 11, Târgu Mureș.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20">
              <Maximize2 size={14} /> Mărește
            </div>
          </div>
        </div>

      </div>

      {/* 6. MODAL LIGHTBOX PENTRU ZOOM */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-9999 bg-brand-dark/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-50"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img
                src={zoomImage.src}
                alt={zoomImage.title}
                className="w-full h-full max-h-[85vh] object-contain bg-black/40"
              />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-linear-to-t from-black/80 to-transparent text-white text-center font-serif text-base">
                {zoomImage.title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}