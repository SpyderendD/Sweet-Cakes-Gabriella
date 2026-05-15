import { Instagram, Facebook, Heart, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white py-20 relative overflow-hidden">
      {/* Background Decorativ Subtil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-magenta rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">

          {/* Coloana 1: Logo & Info */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                to="/"
                className="flex flex-col items-center leading-none group"
              >
                {/* "Sweet" - Micșorat de la 3xl/4xl la 2xl/3xl */}
                <span className="font-script text-2xl sm:text-3xl text-brand-magenta transition-transform group-hover:scale-105">
                  Sweet
                </span>

                {/* Containerul pentru "Cakes" - Am pus -mt-2 pentru a le apropia și mai mult */}
                <div className="flex items-center gap-1 -mt-2">
                  {/* Liniile laterale - Micșorate de la w-3 la w-2 */}
                  <div className="h-px w-2 bg-brand-teal/30" />

                  {/* "Cakes" - Micșorat la 9px/10px */}
                  <span className="font-sans text-[9px] sm:text-[10px] font-black text-brand-teal tracking-[0.3em] uppercase">
                    Cakes
                  </span>

                  <div className="h-px w-2 bg-brand-teal/30" />
                </div>

                {/* "by Gabriella" - Micșorat de la 9px la 8px */}
                <span className="font-sans text-[8px] text-brand-dark/40 uppercase tracking-widest mt-0.5">
                  by Gabriella
                </span>
              </Link>
            </motion.div>

            <p className="text-sm text-white/50 leading-relaxed text-center md:text-left max-w-xs">
              Transformăm ingrediente simple în amintiri de neuitat. Fiecare tort este o poveste artizanală creată special pentru tine.
            </p>

            <div className="flex flex-col space-y-3 pt-2">
              <a href="tel:+40755050706" className="flex items-center gap-3 text-white/60 hover:text-brand-magenta transition-colors text-sm">
                <Phone size={16} /> 0755 050 706
              </a>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin size={16} /> Târgu Mureș, România
              </div>
            </div>
          </div>

          {/* Coloana 2: Navigare */}
          <div className="flex flex-col items-center">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-brand-magenta">Navigare</h3>
            <nav className="flex flex-col space-y-4 items-center">
              {[
                { name: 'Acasă', href: '/' },
                { name: 'Colecție Torturi', href: '/#cakes' },
                { name: 'Povestea Noastră', href: '/#about' },
                { name: 'Galerie Foto', href: '/#gallery' },
                { name: 'Contact', href: '/#contact' }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-white/60 hover:text-white transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-magenta transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Coloana 3: Social & Program */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-brand-magenta">Social Media</h3>
            <div className="flex space-x-4 mb-10">
              {[
                { icon: <Facebook size={20} />, url: 'https://www.facebook.com/p/Sweet-Cakes-by-Gabriella-100063574656863/?locale=ro_RO', label: 'Facebook' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5 }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-magenta hover:bg-brand-magenta transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <div className="text-center md:text-right space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Program Atelier</p>
              <p className="text-sm text-white/60 italic">Luni — Vineri: 09:00 - 18:00</p>
              <p className="text-sm text-white/60 italic">Sâmbătă: 10:00 - 14:00</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-[10px] text-white/30 tracking-wide uppercase">
              &copy; {currentYear} Sweet Cakes by Gabriella. Creat cu <Heart size={10} className="inline-block text-brand-magenta fill-brand-magenta mx-1" /> pentru momente dulci.
            </p>
            <p className="text-[9px] text-white/20 mt-1 uppercase tracking-widest">
              Digital Experience by <a href="#" className="hover:text-brand-magenta transition-colors">Mera Alin</a>
            </p>
          </div>

          <div className="flex gap-6 text-[10px] font-bold tracking-tighter text-white/30 uppercase">
            <Link to="/politica-de-confidentialitate" className="hover:text-white transition-colors">Confidențialitate</Link>
            <Link to="/politica-cookies" className="hover:text-white transition-colors">Cookies</Link>
            <Link to="/termeni-si-conditii" className="hover:text-white transition-colors">Termeni</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}