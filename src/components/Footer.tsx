import { Instagram, Facebook, Heart } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-pastel-rose rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pastel-blue rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-16">
          <div className="text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Link 
                to="/" 
                className="flex flex-col items-center md:items-start leading-none"
              >
                <span className="font-script text-4xl text-brand-magenta -mb-1">Sweet</span>
                <span className="font-sans text-base font-bold text-brand-teal tracking-[0.3em] uppercase">Cakes</span>
                <span className="font-script text-lg text-brand-teal mt-1">by Gabriella</span>
              </Link>
            </motion.div>
            <p className="font-sans text-white/60 max-w-xs mx-auto md:mx-0 leading-relaxed">
              Atelierul nostru transformă visurile tale în realitate dulce, folosind doar cele mai fine ingrediente și multă pasiune.
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="font-serif text-xl font-bold mb-6 text-pastel-rose">Navigare Rapidă</h3>
            <nav className="flex flex-col space-y-4" aria-label="Navigare subsol">
              {[
                { name: 'Acasă', href: '/' },
                { name: 'Torturi', href: '/#cakes' },
                { name: 'Despre Noi', href: '/#about' },
                { name: 'Galerie', href: '/#gallery' },
                { name: 'Contact', href: '/#contact' }
              ].map((link) => (
                <Link 
                  key={link.name}
                  to={link.href}
                  className="font-sans text-white/70 hover:text-pastel-rose transition-colors focus:outline-none focus:text-pastel-rose focus:underline underline-offset-4"
                  aria-label={`Mergi la ${link.name}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="text-center md:text-right">
            <h3 className="font-serif text-xl font-bold mb-6 text-pastel-rose">Urmărește-ne</h3>
            <div className="flex justify-center md:justify-end space-x-6 mb-8">
              <motion.a 
                whileHover={{ y: -5, scale: 1.1 }}
                href="#" 
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-magenta hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-magenta" 
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -5, scale: 1.1 }}
                href="https://www.facebook.com/SweetCakesByGabriella" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-magenta hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-magenta" 
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </motion.a>
            </div>
            <div className="font-sans text-white/60 space-y-2">
              <p>Luni - Vineri: 09:00 - 18:00</p>
              <p>Sâmbătă: 10:00 - 14:00</p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="font-sans text-sm text-white/40 flex items-center gap-2">
              &copy; {new Date().getFullYear()} Sweet Cakes by Gabriella. Creat cu <Heart size={14} className="text-pastel-rose fill-pastel-rose" /> pentru momente dulci.
            </p>
            <p className="font-sans text-xs text-white/30">
              Creat și întreținut de <a href="https://invatam-impreuna.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-pastel-rose hover:underline">Mera Alin</a>
            </p>
          </div>
          <div className="flex gap-8 text-xs font-sans text-white/30 tracking-widest uppercase">
            <Link to="/politica-de-confidentialitate" className="hover:text-white transition-colors focus:outline-none focus:text-white">Politica de Confidențialitate</Link>
            <Link to="/politica-cookies" className="hover:text-white transition-colors focus:outline-none focus:text-white">Politica Cookies</Link>
            <Link to="/termeni-si-conditii" className="hover:text-white transition-colors focus:outline-none focus:text-white">Termeni și Condiții</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

