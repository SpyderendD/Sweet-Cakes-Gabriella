import { motion } from "motion/react";
import { FileText, Scale, AlertCircle, HelpCircle } from "lucide-react";

export function Terms() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-brand-light relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-pastel-lavender/20 rounded-2xl flex items-center justify-center text-pastel-lavender">
              <FileText size={28} />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark">
              Termeni și Condiții
            </h1>
          </div>

          <div className="prose prose-brand max-w-none font-sans text-brand-dark/80 leading-relaxed space-y-8">
            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                <Scale size={20} className="text-pastel-lavender" />
                1. Acceptarea Termenilor
              </h2>
              <p>
                Prin accesarea și utilizarea acestui site web, accepți să respecți și să fii legat de acești Termeni și Condiții. Dacă nu ești de acord cu oricare dintre acești termeni, te rugăm să nu utilizezi site-ul nostru.
              </p>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                <AlertCircle size={20} className="text-pastel-lavender" />
                2. Comenzi și Plăți
              </h2>
              <p>
                Toate cererile de comandă plasate prin intermediul site-ului nostru sunt supuse confirmării noastre. Ne rezervăm dreptul de a refuza orice comandă din motive întemeiate (cum ar fi disponibilitatea ingredientelor sau capacitatea de producție).
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Prețurile afișate sunt orientative și pot varia în funcție de complexitatea designului și a ingredientelor alese.</li>
                <li>Plata se va efectua conform detaliilor stabilite în timpul confirmării comenzii.</li>
                <li>Anularea unei comenzi confirmate poate atrage costuri suplimentare, în funcție de stadiul de pregătire.</li>
              </ul>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">
                3. Proprietatea Intelectuală
              </h2>
              <p>
                Întreg conținutul acestui site (text, imagini, logo-uri, design-uri) este proprietatea Sweet Cakes by Gabriella și este protejat de legile privind drepturile de autor. Utilizarea neautorizată a oricărui material de pe acest site este strict interzisă.
              </p>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                <HelpCircle size={20} className="text-pastel-lavender" />
                4. Limitarea Răspunderii
              </h2>
              <p>
                Sweet Cakes by Gabriella nu va fi răspunzătoare pentru niciun fel de daune directe, indirecte, accidentale sau speciale rezultate din utilizarea sau imposibilitatea de a utiliza acest site sau produsele noastre, în măsura permisă de lege.
              </p>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">
                5. Modificări
              </h2>
              <p>
                Ne rezervăm dreptul de a modifica acești Termeni și Condiții în orice moment, fără notificare prealabilă. Modificările vor intra în vigoare imediat după publicarea lor pe site.
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
