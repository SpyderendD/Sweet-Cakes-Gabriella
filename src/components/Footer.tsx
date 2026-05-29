import { Instagram, Facebook, Heart, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Iconiță TikTok (Lucide nu are una oficială standard în toate versiunile, folosim un SVG)
const TikTokIcon = ({ size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.44-4.22-1.17-.57-.31-1.1-.69-1.58-1.12V15c0 2.14-1.31 4.13-3.3 4.96-1.99.83-4.39.46-6.02-1.01-1.63-1.47-2.31-3.86-1.68-5.96.63-2.1 2.6-3.66 4.81-3.79V13.2c-1.1.06-2.15.77-2.58 1.79-.43 1.02-.2 2.27.56 3.07.76.8 2.05.99 3.02.46s1.5-1.74 1.43-2.81c.01-4.71.01-9.42.01-14.13.01-.13.01-.27.01-.41Z"/>
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white py-24 relative overflow-hidden">
      {/* Background Decorativ */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-magenta rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">

          {/* Coloana 1: Logo & Contact Activ */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Link to="/" className="group block">
                <img 
                  src="/assets/images/logo.jpg"
                  alt="Sweet Cakes by Gabriella" 
                  className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-2xl shadow-2xl border border-white/10 transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            </motion.div>

            <div className="space-y-4 w-full">
              {/* LINK TELEFON */}
              <a 
                href="tel:+40756883344" 
                className="flex items-center justify-center md:justify-start gap-3 text-white/50 hover:text-brand-magenta transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-magenta group-hover:text-white transition-all">
                  <Phone size={16} />
                </div>
                <span className="text-sm font-bold tracking-wider">+40 756 883 344</span>
              </a>

              {/* LINK GOOGLE MAPS */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Strada+Tisei+11+Targu+Mures" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start justify-center md:justify-start gap-3 text-white/50 hover:text-brand-magenta transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-magenta group-hover:text-white transition-all">
                  <MapPin size={16} />
                </div>
                <span className="text-sm leading-relaxed pt-1">
                  Str. Tisei, nr. 11,<br />Târgu Mureș, România
                </span>
              </a>
            </div>
          </div>

          {/* Coloana 2: Navigare & Mesaj */}
          <div className="flex flex-col items-center">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-black mb-10 text-brand-magenta">Meniu</h3>
            <nav className="flex flex-col space-y-5 items-center">
              {[
                { name: 'Colecție Torturi', href: '/#cakes' },
                { name: 'Povestea Noastră', href: '/#about' },
                { name: 'Galerie Foto', href: '/#gallery' },
                { name: 'Contactează-ne', href: '/#contact' }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-brand-magenta transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>
            <p className="mt-12 text-center text-xs text-white/20 italic max-w-[200px]">
              "Creat cu dragoste pentru cele mai frumoase evenimente din viața ta."
            </p>
          </div>

          {/* Coloana 3: Social & Program */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-black mb-10 text-brand-magenta">Social Media</h3>
            <div className="flex space-x-4 mb-12">
              {[
                { icon: <Facebook size={20} />, url: 'https://www.facebook.com/p/Sweet-Cakes-by-Gabriella-100063574656863/', label: 'Facebook' },
                { icon: <Instagram size={20} />, url: '#', label: 'Instagram' },
                { icon: <TikTokIcon size={20} />, url: '#', label: 'TikTok' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, backgroundColor: '#d14d72' }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-magenta transition-all duration-300 backdrop-blur-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <div className="text-center md:text-right space-y-3 bg-white/5 p-6 rounded-3xl border border-white/5">
              <div className="flex items-center justify-center md:justify-end gap-2 text-brand-magenta mb-2">
                <Clock size={14} />
                <span className="text-[10px] uppercase font-black tracking-widest">Program Atelier</span>
              </div>
              <p className="text-xs text-white/60">Marți — Vineri: <span className="text-white">12:00 - 18:00</span></p>
              <p className="text-xs text-white/60">Sâmbătă: <span className="text-white">10:00 - 14:00</span></p>
              <p className="text-xs text-white/40 italic">Duminică & Luni: Închis</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase">
              &copy; {currentYear} Sweet Cakes by Gabriella. Creat cu <Heart size={10} className="inline-block text-brand-magenta fill-brand-magenta mx-1" /> pentru tine.
            </p>
          </div>

          <div className="flex gap-8 text-[9px] font-black tracking-[0.2em] text-white/20 uppercase">
            <Link to="/politica-de-confidentialitate" className="hover:text-white transition-colors">Confidențialitate</Link>
            <Link to="/politica-de-cookie-uri" className="hover:text-white transition-colors">Cookie-uri</Link>
            <Link to="/termeni-si-conditii" className="hover:text-white transition-colors">Termeni</Link>
            <a href="https://invatam-impreuna.vercel.app/eu" className="hover:text-brand-magenta transition-colors text-white/40">Digital Experience by Mera Alin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}