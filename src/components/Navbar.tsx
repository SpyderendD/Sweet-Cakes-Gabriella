import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingBag, Facebook } from "lucide-react";
import { OrderHistoryModal } from "./OrderHistoryModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 300 } },
  };

  return (
    <>
      <motion.nav
        className={`fixed z-50 transition-all duration-500 left-4 right-4 md:left-8 md:right-8 lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-6xl rounded-full ${
          isScrolled 
            ? "top-4 py-3 bg-[#fbf9f4]/90 backdrop-blur-xl shadow-xl shadow-[#4a3b3c]/10 border border-white/50" 
            : "top-6 py-4 bg-[#fbf9f4]/40 backdrop-blur-md shadow-lg border border-white/20"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" as any }}
      >
        <div className="px-6 md:px-10 flex justify-between items-center relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="flex flex-col items-center leading-none group"
            >
              <span className="font-script text-3xl sm:text-4xl text-brand-magenta transition-transform group-hover:scale-105">Sweet</span>
              <div className="flex items-center gap-1.5 -mt-1">
                <div className="h-px w-3 bg-brand-teal/30" />
                <span className="font-sans text-[10px] sm:text-xs font-black text-brand-teal tracking-[0.4em] uppercase">Cakes</span>
                <div className="h-px w-3 bg-brand-teal/30" />
              </div>
              <span className="font-sans text-[9px] text-brand-dark/40 uppercase tracking-widest mt-1">by Gabriella</span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            role="menubar"
          >
            {navLinks.map((link) => (
              <motion.div key={link.name} variants={itemVariants} role="menuitem">
                <Link
                  to={link.href}
                  className="font-sans text-brand-dark hover:text-pastel-rose transition-colors relative group font-medium focus:outline-none focus:ring-2 focus:ring-pastel-rose focus:ring-offset-2 rounded-lg px-2 py-1"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pastel-rose transition-all group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOrderModalOpen(true)}
              className="relative p-2 text-brand-dark hover:text-brand-magenta transition-colors bg-white/50 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta focus:ring-offset-2"
              aria-label="Istoric Comenzi"
              role="menuitem"
            >
              <ShoppingBag size={22} />
            </motion.button>
            <motion.a
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.facebook.com/SweetCakesByGabriella"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-brand-dark hover:text-brand-magenta transition-colors bg-white/50 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta focus:ring-offset-2"
              aria-label="Facebook"
              role="menuitem"
            >
              <Facebook size={22} />
            </motion.a>
          </motion.div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <button 
              onClick={() => setIsOrderModalOpen(true)}
              className="relative p-2 text-brand-dark hover:text-brand-magenta transition-colors bg-white/50 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta focus:ring-offset-2"
              aria-label="Istoric Comenzi"
            >
              <ShoppingBag size={20} />
            </button>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.facebook.com/SweetCakesByGabriella"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-brand-dark hover:text-brand-magenta transition-colors bg-white/50 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-magenta focus:ring-offset-2"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </motion.a>
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-dark focus:outline-none p-1 bg-white/50 rounded-full shadow-sm focus:ring-2 focus:ring-brand-magenta focus:ring-offset-2"
              aria-label={isMobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, height: "auto", y: 0, scale: 1 }}
                exit={{ opacity: 0, height: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring" as any, stiffness: 200, damping: 20 }}
                className="absolute top-full left-0 right-0 mt-4 md:hidden bg-white/90 backdrop-blur-xl border border-white/50 overflow-hidden rounded-3xl shadow-xl origin-top"
                role="menu"
              >
                <div className="flex flex-col px-6 py-6 space-y-5">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      role="menuitem"
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-sans text-lg font-medium text-brand-dark hover:text-pastel-rose transition-colors border-b border-brand-dark/5 pb-2 focus:outline-none focus:text-pastel-rose block"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <OrderHistoryModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </>
  );
}
