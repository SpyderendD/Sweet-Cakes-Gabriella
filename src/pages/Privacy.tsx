import { motion } from "motion/react";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export function Privacy() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-brand-light relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-pastel-rose/20 rounded-2xl flex items-center justify-center text-pastel-rose">
              <Shield size={28} />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark">
              Politica de Confidențialitate
            </h1>
          </div>

          <div className="prose prose-brand max-w-none font-sans text-brand-dark/80 leading-relaxed space-y-8">
            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                <Eye size={20} className="text-pastel-rose" />
                1. Introducere
              </h2>
              <p>
                La Sweet Cakes by Gabriella, respectăm confidențialitatea datelor tale. Această politică explică modul în care colectăm, utilizăm și protejăm informațiile tale personale atunci când vizitezi site-ul nostru sau plasezi o cerere de comandă.
              </p>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                <FileText size={20} className="text-pastel-rose" />
                2. Datele Colectate
              </h2>
              <p>Colectăm următoarele tipuri de informații:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Informații de contact:</strong> Nume, adresă de email, număr de telefon (atunci când completezi formularul de contact).</li>
                <li><strong>Detalii comandă:</strong> Tipul de tort, data evenimentului, preferințe de design.</li>
                <li><strong>Date tehnice:</strong> Adresa IP, tipul browserului, paginile vizitate (prin intermediul cookie-urilor).</li>
              </ul>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                <Lock size={20} className="text-pastel-rose" />
                3. Scopul Colectării
              </h2>
              <p>Utilizăm datele tale pentru:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Procesarea și onorarea cererilor de comandă.</li>
                <li>Comunicarea cu tine privind detaliile evenimentului.</li>
                <li>Îmbunătățirea experienței pe site-ul nostru.</li>
                <li>Respectarea obligațiilor legale și fiscale.</li>
              </ul>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">
                4. Protecția Datelor
              </h2>
              <p>
                Implementăm măsuri de securitate tehnice și organizatorice pentru a proteja datele tale împotriva accesului neautorizat, pierderii sau alterării. Nu vindem și nu închiriem datele tale personale către terți.
              </p>
            </section>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">
                5. Drepturile Tale
              </h2>
              <p>Conform GDPR, ai următoarele drepturi:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Dreptul de acces la datele tale.</li>
                <li>Dreptul de a solicita rectificarea sau ștergerea datelor.</li>
                <li>Dreptul de a te opune prelucrării.</li>
                <li>Dreptul la portabilitatea datelor.</li>
              </ul>
              <p className="mt-4">
                Pentru a exercita aceste drepturi, ne poți contacta la adresa de email afișată în secțiunea de contact.
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
