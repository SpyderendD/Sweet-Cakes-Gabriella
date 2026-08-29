import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Heart, ChevronUp, Facebook, Instagram } from "lucide-react";

// --- SUB-COMPONENTĂ: ICONIȚĂ TIKTOK ---
const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.44-4.22-1.17-.57-.31-1.1-.69-1.58-1.12V15c0 2.14-1.31 4.13-3.3 4.96-1.99.83-4.39.46-6.02-1.01-1.63-1.47-2.31-3.86-1.68-5.96.63-2.1 2.6-3.66 4.81-3.79V13.2c-1.1.06-2.15.77-2.58 1.79-.43 1.02-.2 2.27.56 3.07.76.8 2.05.99 3.02.46s1.5-1.74 1.43-2.81c.01-4.71.01-9.42.01-14.13.01-.13.01-.27.01-.41Z"/>
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-dark text-white pt-24 pb-16 relative overflow-hidden font-sans border-t border-white/5">
      {/* Glow radial de fundal */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-brand-magenta rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Butonul Înapoi Sus */}
        <div className="flex justify-center md:justify-end mb-16">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5, backgroundColor: "#e91e63", borderColor: "#e91e63" }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md transition-all duration-300 group"
            aria-label="Înapoi sus"
          >
            <ChevronUp size={18} className="text-white/60 group-hover:text-white transition-colors" />
          </motion.button>
        </div>

        {/* Structura pe 3 Coloane */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mb-16 pb-16 border-b border-white/5">
          
          {/* Coloana 1: Brand & Date de Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <Link to="/" className="group block">
              <img 
                src="/assets/images/logo.jpg" 
                alt="Sweet Cakes by Gabriella" 
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-2xl border border-white/10 transition-transform duration-500 group-hover:scale-105 shadow-2xl" 
              />
            </Link>
            <p className="font-serif italic text-lg text-white/70 max-w-xs">
              "Fiecare detaliu contează în povestea ta dulce."
            </p>
            <div className="space-y-3 pt-2 text-white/50 text-sm">
              <a href="tel:+40756883344" className="flex items-center justify-center md:justify-start gap-3 hover:text-brand-magenta transition-colors group">
                <Phone size={14} className="text-brand-magenta/70 group-hover:scale-110 transition-transform" />
                <span className="font-bold tracking-wider">+40 756 883 344</span>
              </a>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Strada+Tisei+11+Targu+Mures" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start justify-center md:justify-start gap-3 hover:text-brand-magenta transition-colors group"
              >
                <MapPin size={14} className="text-brand-magenta/70 mt-1 group-hover:scale-110 transition-transform shrink-0" />
                <span>Str. Tisei, nr. 11, Târgu Mureș</span>
              </a>
            </div>
          </div>

          {/* Coloana 2: Navigare Meniu principal */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black mb-8 text-brand-magenta">Meniu</span>
            <nav className="flex flex-col space-y-4 items-center">
              {[
                { name: 'Colecție Torturi', href: '/#cakes' },
                { name: 'Povestea Noastră', href: '/#about' },
                { name: 'Galerie Foto', href: '/#gallery' },
                { name: 'Contactează-ne', href: '/#contact' }
              ].map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-brand-magenta transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Coloana 3: Program de lucru & Social */}
          <div className="flex flex-col items-center md:items-end space-y-8">
            <div className="w-full max-w-xs bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
              <div className="flex items-center justify-center md:justify-end gap-2 text-brand-magenta mb-4">
                <Clock size={14} />
                <span className="text-[10px] uppercase font-black tracking-widest">Program Atelier</span>
              </div>
              <div className="text-center md:text-right space-y-2 text-xs text-white/60">
                <p>Marți — Vineri: <span className="text-white font-bold">12:00 - 18:00</span></p>
                <p>Sâmbătă: <span className="text-white font-bold">10:00 - 14:00</span></p>
                <p className="text-white/30 italic pt-1">Duminică & Luni: Închis</p>
              </div>
            </div>

            <div className="flex space-x-3">
              {[
                { icon: <Facebook size={18} />, url: "https://www.facebook.com/p/Sweet-Cakes-by-Gabriella-100063574656863/" },
                { icon: <Instagram size={18} />, url: "#" },
                { icon: <TikTokIcon size={18} />, url: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, backgroundColor: "#e91e63", borderColor: "#e91e63" }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Zona Legală & Reclamații SAL/SOL */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-[10px] text-white/40">
          
          {/* Drepturi de autor */}
          <div className="text-center lg:text-left space-y-2 md:pl-24">
            <p className="tracking-widest uppercase">
              &copy; {currentYear} Sweet Cakes by Gabriella. Creat cu <Heart size={10} className="inline-block text-brand-magenta fill-brand-magenta mx-1 animate-pulse" /> pentru tine.
            </p>
            <p className="text-[9px] text-white/20">
              Digital Experience by <a href="https://invatam-impreuna.vercel.app/eu" target="_blank" rel="noopener noreferrer" className="hover:text-brand-magenta transition-colors">Mera Alin</a>
            </p>
          </div>

          {/* Linkuri Legale & Ambele plachete ANPC */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto justify-center md:pr-24">
            <div className="flex flex-wrap justify-center gap-6 tracking-[0.15em] uppercase font-bold text-[9px]">
              <Link to="/politica-de-confidentialitate" className="hover:text-white transition-colors">Confidențialitate</Link>
              <Link to="/politica-cookies" className="hover:text-white transition-colors">Cookie-uri</Link>
              <Link to="/termeni-si-conditii" className="hover:text-white transition-colors">Termeni</Link>
            </div>
            
            {/* SAL (ANPC 2026) și noul link SOL actualizat */}
            <div className="flex gap-2 shrink-0">
              <a 
                href="https://reclamatiisal.anpc.ro/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:opacity-85 transition-opacity"
              >
                <img 
                  src="/assets/images/anpc-sal.webp" 
                  alt="Soluționarea Alternativă a Litigiilor" 
                  className="h-9 md:h-10 w-auto object-contain rounded-lg bg-white p-1 border border-white/10" 
                />
              </a>
              <a 
                href="https://consumer-redress.ec.europa.eu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:opacity-85 transition-opacity"
              >
                <img 
                  src="/assets/images/anpc-sol.webp" 
                  alt="Soluționarea Online a Litigiilor (Comisia Europeană)" 
                  className="h-9 md:h-10 w-auto object-contain rounded-lg bg-white p-1 border border-white/10" 
                />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}