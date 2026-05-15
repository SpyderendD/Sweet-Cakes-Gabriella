import { motion } from "motion/react";
import { Cookie, Settings, Shield, Info } from "lucide-react";

export function Cookies() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-brand-light relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-pastel-blue/20 rounded-2xl flex items-center justify-center text-pastel-blue">
              <Cookie size={28} />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark">
              Politica de Cookies
            </h1>
          </div>

          <div className="prose prose-brand max-w-none font-sans text-brand-dark/80 leading-relaxed space-y-8">
            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                <Info size={20} className="text-pastel-blue" />
                1. Ce sunt cookie-urile?
              </h2>
              <p>
                Cookie-urile sunt fișiere text de mici dimensiuni care sunt stocate pe computerul sau dispozitivul tău mobil atunci când vizitezi un site web. Acestea sunt utilizate pe scară largă pentru a face site-urile web să funcționeze sau să funcționeze mai eficient, precum și pentru a furniza informații proprietarilor site-ului.
              </p>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                <Shield size={20} className="text-pastel-blue" />
                2. Cum utilizăm cookie-urile?
              </h2>
              <p>Utilizăm cookie-uri pentru următoarele scopuri:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Cookie-uri esențiale:</strong> Acestea sunt necesare pentru funcționarea site-ului și permit navigarea și utilizarea funcțiilor acestuia.</li>
                <li><strong>Cookie-uri de performanță:</strong> Ne ajută să înțelegem cum interacționează vizitatorii cu site-ul nostru, furnizând informații despre paginile vizitate, timpul petrecut pe site și eventualele erori.</li>
                <li><strong>Cookie-uri de funcționalitate:</strong> Permit site-ului să rețină alegerile pe care le faci (cum ar fi preferințele de limbă sau regiune) pentru a oferi o experiență mai personalizată.</li>
              </ul>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                <Settings size={20} className="text-pastel-blue" />
                3. Controlul cookie-urilor
              </h2>
              <p>
                Poți controla și/sau șterge cookie-urile după cum dorești. Poți șterge toate cookie-urile care sunt deja pe computerul tău și poți seta majoritatea browserelor să împiedice plasarea acestora. Totuși, dacă faci acest lucru, este posibil să fii nevoit să ajustezi manual unele preferințe de fiecare dată când vizitezi un site, iar unele servicii și funcționalități pot să nu funcționeze.
              </p>
              <p className="mt-4">
                Pentru a modifica setările cookie-urilor din browserul tău, consultă secțiunea de "Ajutor" a browserului respectiv.
              </p>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">
                4. Cookie-uri de la terți
              </h2>
              <p>
                În unele cazuri, utilizăm cookie-uri furnizate de terți de încredere. De exemplu, acest site utilizează Google Analytics, care este una dintre cele mai răspândite și de încredere soluții de analiză pe web, pentru a ne ajuta să înțelegem cum utilizezi site-ul și cum putem îmbunătăți experiența ta.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center text-brand-dark/40 text-sm font-sans">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
