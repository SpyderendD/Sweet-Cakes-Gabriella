import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import { 
  X, Mail, Sparkles, User, MessageSquare, 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Cake 
} from "lucide-react";
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, 
  isSameDay, isToday
} from "date-fns";
import { ro } from "date-fns/locale";

// --- COMPONENTA CALENDAR CUSTOM ---
function CustomDatePicker({ value, onChange, isActive }: { 
  value: string, 
  onChange: (d: string) => void, 
  isActive: boolean 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const days = ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"];
  const startDate = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 });
  const endDate = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="relative" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border-2 border-brand-dark/5 rounded-2xl py-4 px-6 outline-none cursor-pointer transition-all flex justify-between items-center ${isOpen ? 'border-brand-magenta/30 shadow-lg' : ''}`}
      >
        <span className={`font-sans ${value ? 'text-brand-dark' : 'text-brand-dark/30'}`}>
          {value ? format(new Date(value), "dd MMMM yyyy", { locale: ro }) : "Selectează data evenimentului"}
        </span>
        <CalendarIcon size={18} className="text-brand-magenta/40" />
      </div>

      <label className={`absolute left-6 transition-all duration-300 pointer-events-none font-bold ${isActive || value ? '-top-3 text-[10px] bg-brand-magenta text-white px-3 py-1 rounded-full shadow-md' : 'top-4 opacity-0'}`}>
        Data Evenimentului
      </label>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            // CORECȚIE: rounded-[2rem] -> rounded-4xl | min-w-[300px] -> min-w-75
            className="absolute top-full left-0 right-0 mt-4 bg-white rounded-4xl shadow-2xl border border-brand-magenta/10 z-50 p-6 min-w-75"
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <h4 className="font-serif font-bold text-brand-dark capitalize">
                {format(viewDate, "MMMM yyyy", { locale: ro })}
              </h4>
              <div className="flex gap-2">
                <button type="button" onClick={() => setViewDate(subMonths(viewDate, 1))} className="p-2 hover:bg-brand-magenta/5 rounded-full text-brand-magenta"><ChevronLeft size={18} /></button>
                <button type="button" onClick={() => setViewDate(addMonths(viewDate, 1))} className="p-2 hover:bg-brand-magenta/5 rounded-full text-brand-magenta"><ChevronRight size={18} /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {days.map(d => <div key={d} className="text-[10px] font-black text-brand-dark/20 uppercase tracking-widest">{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { onChange(format(day, "yyyy-MM-dd")); setIsOpen(false); }}
                  className={`h-9 w-full rounded-xl text-xs font-bold transition-all flex items-center justify-center
                    ${!isSameMonth(day, viewDate) ? 'text-brand-dark/10' : 'text-brand-dark'}
                    ${isSameDay(day, value ? new Date(value) : new Date(0)) ? 'bg-brand-magenta text-white shadow-lg' : 'hover:bg-brand-magenta/5'}
                    ${isToday(day) ? 'border border-brand-magenta/20' : ''}
                  `}
                >
                  {format(day, "d")}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- COMPONENTA CONTACT PRINCIPALĂ ---
export function Contact() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "", email: "", date: "", size: "", theme: "", message: ""
  });

  useEffect(() => {
    const handleUpdate = (e: any) => {
      const { field, value } = e.detail;
      setFormValues(prev => ({ ...prev, [field]: value }));
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener('updateContactForm' as any, handleUpdate);
    return () => window.removeEventListener('updateContactForm' as any, handleUpdate);
  }, []);

  const isFieldActive = (name: keyof typeof formValues) => 
    focusedField === name || (formValues[name] && formValues[name].length > 0);

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#fbf9f4]">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <motion.h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-dark tracking-tighter leading-tight italic">
            Hai să creăm ceva <span className="text-brand-magenta font-script lowercase text-6xl md:text-8xl">magic</span>.
          </motion.h2>
          <p className="text-brand-dark/30 font-sans tracking-[0.4em] uppercase text-[9px] font-black italic">
            Fiecare detaliu contează în povestea ta dulce
          </p>
        </div>

        <div className="bg-white/40 backdrop-blur-2xl rounded-[3.5rem] p-8 md:p-16 shadow-2xl border border-white/60">
          <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative">
                <input
                  type="text"
                  value={formValues.name}
                  onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-white border-2 border-brand-dark/5 rounded-2xl py-4 px-6 outline-none focus:border-brand-magenta/30 transition-all font-sans text-brand-dark shadow-sm"
                />
                <label className={`absolute left-6 transition-all duration-300 font-bold ${isFieldActive('name') ? '-top-3 text-[10px] bg-brand-magenta text-white px-3 py-1 rounded-full shadow-md' : 'top-4 text-brand-dark/20'}`}>
                  Numele Tău
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  value={formValues.email}
                  onChange={(e) => setFormValues({...formValues, email: e.target.value})}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-white border-2 border-brand-dark/5 rounded-2xl py-4 px-6 outline-none focus:border-brand-magenta/30 transition-all font-sans text-brand-dark shadow-sm"
                />
                <label className={`absolute left-6 transition-all duration-300 font-bold ${isFieldActive('email') ? '-top-3 text-[10px] bg-brand-magenta text-white px-3 py-1 rounded-full shadow-md' : 'top-4 text-brand-dark/20'}`}>
                  Adresa de Email
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <CustomDatePicker 
                value={formValues.date} 
                onChange={(d) => setFormValues({...formValues, date: d})}
                isActive={focusedField === 'date'}
              />

              <div className="relative text-brand-dark">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-magenta/20"><Cake size={20} /></div>
                <input
                  type="text"
                  value={formValues.size}
                  onChange={(e) => setFormValues({...formValues, size: e.target.value})}
                  onFocus={() => setFocusedField('size')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={focusedField === 'size' ? "" : "Cât de mare să fie tortul?"}
                  className="w-full bg-white border-2 border-brand-dark/5 rounded-2xl py-4 px-6 outline-none focus:border-brand-magenta/30 transition-all shadow-sm"
                />
                <label className={`absolute left-6 transition-all duration-300 font-bold ${isFieldActive('size') ? '-top-3 text-[10px] bg-brand-magenta text-white px-3 py-1 rounded-full shadow-md' : 'top-4 opacity-0'}`}>
                  Dimensiune dorită
                </label>
              </div>
            </div>

            <div className="relative text-brand-dark">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-magenta/30 animate-pulse"><Sparkles size={20} /></div>
              <input
                type="text"
                value={formValues.theme}
                onChange={(e) => setFormValues({...formValues, theme: e.target.value})}
                onFocus={() => setFocusedField('theme')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-white border-2 border-brand-dark/5 rounded-2xl py-4 px-6 outline-none focus:border-brand-magenta/30 transition-all shadow-sm"
              />
              <label className={`absolute left-6 transition-all duration-300 font-bold ${isFieldActive('theme') ? '-top-3 text-[10px] bg-brand-magenta text-white px-3 py-1 rounded-full shadow-md' : 'top-4 text-brand-dark/20'}`}>
                Tematică sau model preferat
              </label>
            </div>

            <div className="relative text-brand-dark">
              <textarea
                rows={3}
                value={formValues.message}
                onChange={(e) => setFormValues({...formValues, message: e.target.value})}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                // CORECȚIE: rounded-[2rem] -> rounded-4xl
                className="w-full bg-white border-2 border-brand-dark/5 rounded-4xl py-5 px-6 outline-none focus:border-brand-magenta/30 transition-all resize-none shadow-sm"
              />
              <label className={`absolute left-6 transition-all duration-300 font-bold ${isFieldActive('message') ? '-top-3 text-[10px] bg-brand-magenta text-white px-3 py-1 rounded-full shadow-md' : 'top-6 text-brand-dark/20'}`}>
                Mesajul tău (arome, detalii, întrebări...)
              </label>
            </div>

           <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              // CORECȚIE: rounded-[2rem] -> rounded-4xl (linia 223)
              className="w-full py-6 bg-brand-dark text-white rounded-4xl font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-brand-magenta transition-all"
            >
              Trimite în laborator
            </motion.button>
          </form>
        </div>
      </div>

      {/* MODAL SUCCES */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            // CORECȚIE: z-[110] -> z-110 (linia 236)
            className="fixed inset-0 z-110 bg-brand-dark/20 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setIsSubmitted(false)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-12 rounded-4xl text-center max-w-sm shadow-2xl border border-brand-magenta/10">
              <div className="w-20 h-20 bg-brand-magenta/10 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🧁</div>
              <h3 className="font-serif text-3xl font-bold text-brand-dark mb-2 italic">Gata!</h3>
              {/* CORECȚIE: eliminat duplicatul 'italic' (linia 242) */}
              <p className="text-brand-dark/50 text-sm italic">
                Am primit cererea ta. Vom pregăti oferta și te sunăm imediat.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}