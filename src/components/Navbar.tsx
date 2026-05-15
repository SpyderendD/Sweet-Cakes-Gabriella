import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingBag, Facebook, Heart } from "lucide-react";
import { OrderHistoryModal } from "./OrderHistoryModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Acasă", href: "/" },
    { name: "Torturi", href: "/#cakes" },
    { name: "Despre", href: "/#about" },
    { name: "Galerie", href: "/#gallery" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed z-50 transition-all duration-500 left-4 right-4 md:left-10 md:right-10 lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-6xl rounded-full ${
          isScrolled 
            ? "top-4 py-3 bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white/50" 
            : "top-8 py-5 bg-white/20 backdrop-blur-md border border-white/20"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="px-6 md:px-10 flex justify-between items-center">
          
          {/* Logo Section */}
          <motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-xs uppercase tracking-widest font-bold text-brand-dark/70 hover:text-brand-magenta transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-brand-magenta rounded-full opacity-0 group-hover:w-1 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
            </div>

            <div className="flex items-center pl-6 border-l border-brand-dark/5 space-x-4">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOrderModalOpen(true)}
                className="p-2.5 text-brand-dark hover:text-brand-magenta transition-colors bg-white/40 rounded-full shadow-sm"
                aria-label="Istoric Comenzi"
              >
                <ShoppingBag size={20} strokeWidth={2.5} />
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.facebook.com/p/Sweet-Cakes-by-Gabriella-100063574656863/?locale=ro_RO"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-brand-dark hover:text-brand-magenta transition-colors bg-white/40 rounded-full shadow-sm"
              >
                <Facebook size={20} strokeWidth={2.5} />
              </motion.a>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
             <button 
                onClick={() => setIsOrderModalOpen(true)}
                className="p-2 text-brand-dark bg-white/50 rounded-full"
              >
                <ShoppingBag size={18} />
              </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-brand-dark bg-brand-dark/5 rounded-full"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-[calc(100%+15px)] left-0 right-0 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden md:hidden"
            >
              <div className="flex flex-col p-8 space-y-6 text-center">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-serif italic text-brand-dark hover:text-brand-magenta transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 border-t border-brand-dark/5 flex justify-center space-x-6">
                   <Facebook className="text-brand-dark/40" size={20} />
                   <Heart className="text-brand-magenta" size={20} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <OrderHistoryModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </>
  );
}