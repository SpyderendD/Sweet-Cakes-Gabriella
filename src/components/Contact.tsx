import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Mail, Sparkles, User, Calendar as CalendarIcon, 
  ChevronLeft, ChevronRight, Cake, Upload, Image as ImageIcon,
  Phone, MapPin, Clock, Utensils, PenTool, CheckCircle2
} from "lucide-react";
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, 
  isSameDay, isToday
} from "date-fns";
import { ro } from "date-fns/locale";

// --- SUB-COMPONENTĂ: INPUT CU FLOATING LABEL ---
const FormField = ({ id, label, icon: Icon, value, onChange, onFocus, focused, type = "text", isTextArea = false, required = false }: any) => {
  const isActive = focused === id || (value && value.toString().length > 0);

  return (
    <div className="relative w-full">
      {Icon && (
        <motion.div 
          animate={{ 
            scale: focused === id ? 1.15 : 1,
            color: focused === id ? "#e91e63" : "rgba(74, 59, 60, 0.2)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`absolute right-5 transition-all duration-300 ${isTextArea ? 'top-6' : 'top-1/2 -translate-y-1/2'}`}
        >
          <Icon size={18} />
        </motion.div>
      )}

      {isTextArea ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => onFocus(id)}
          onBlur={() => onFocus(null)}
          className={`w-full bg-white border-2 rounded-2xl py-4 px-6 outline-none transition-all resize-none font-sans text-brand-dark shadow-xs
            ${focused === id ? 'border-brand-magenta shadow-[0_0_15px_rgba(233,30,99,0.1)]' : 'border-brand-dark/5 hover:border-brand-dark/10'}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => onFocus(id)}
          onBlur={() => onFocus(null)}
          className={`w-full bg-white border-2 rounded-2xl py-4 px-6 outline-none transition-all font-sans text-brand-dark shadow-xs
            ${focused === id ? 'border-brand-magenta shadow-[0_0_15px_rgba(233,30,99,0.1)]' : 'border-brand-dark/5 hover:border-brand-dark/10'}`}
        />
      )}

      <label
        htmlFor={id}
        className={`absolute left-5 transition-all duration-300 pointer-events-none font-bold
          ${isActive 
            ? '-top-2.5 text-[10px] bg-brand-magenta text-white px-3 py-0.5 rounded-full shadow-sm z-20 opacity-100' 
            : 'top-1/2 -translate-y-1/2 text-brand-dark/30 text-sm z-10'
          } ${isTextArea && !isActive ? 'top-6 translate-y-0' : ''}`}
      >
        {label} {required && "*"}
      </label>
    </div>
  );
};

// --- SUB-COMPONENTĂ: CALENDAR ---
function CustomDatePicker({ value, onChange }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const isActive = isOpen || (value && value.length > 0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const calendarDays = eachDayOfInterval({ 
    start: startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 }), 
    end: endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 }) 
  });

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border-2 rounded-2xl py-4 px-6 cursor-pointer transition-all flex justify-between items-center shadow-xs
          ${isOpen ? 'border-brand-magenta shadow-[0_0_15px_rgba(233,30,99,0.1)]' : 'border-brand-dark/5 hover:border-brand-dark/10'}`}
      >
        <span className={`font-sans text-sm ${value ? 'text-brand-dark' : 'text-transparent'}`}>
          {value ? format(new Date(value), "dd MMMM yyyy", { locale: ro }) : "."}
        </span>
        <CalendarIcon size={18} className={isActive ? 'text-brand-magenta' : 'text-brand-dark/10'} />
      </div>

      <label className={`absolute left-5 transition-all duration-300 pointer-events-none font-bold
        ${isActive 
          ? '-top-2.5 text-[10px] bg-brand-magenta text-white px-3 py-0.5 rounded-full shadow-sm z-20' 
          : 'top-1/2 -translate-y-1/2 text-brand-dark/30 text-sm z-10'
        }`}>
        Data Evenimentului *
      </label>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-brand-dark/5 z-100 p-5 min-w-70"
          >
            <div className="flex items-center justify-between mb-4">
              <button type="button" onClick={() => setViewDate(subMonths(viewDate, 1))} className="p-2 text-brand-magenta hover:bg-brand-magenta/10 rounded-full transition-colors"><ChevronLeft size={16}/></button>
              <h4 className="font-serif font-bold text-brand-dark capitalize">{format(viewDate, "MMMM yyyy", { locale: ro })}</h4>
              <button type="button" onClick={() => setViewDate(addMonths(viewDate, 1))} className="p-2 text-brand-magenta hover:bg-brand-magenta/10 rounded-full transition-colors"><ChevronRight size={16}/></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-[10px] font-black text-brand-dark/20 uppercase text-center mb-2">
              {["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => (
                <button
                  key={i} type="button"
                  onClick={() => { onChange(format(day, "yyyy-MM-dd")); setIsOpen(false); }}
                  className={`h-8 rounded-lg text-xs font-bold transition-all
                    ${!isSameMonth(day, viewDate) ? 'text-brand-dark/10' : 'text-brand-dark'}
                    ${isSameDay(day, value ? new Date(value) : new Date(0)) ? 'bg-brand-magenta text-white shadow-md' : 'hover:bg-brand-magenta/5'}
                    ${isToday(day) ? 'border border-brand-magenta/30' : ''}
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

// --- COMPONENTA PRINCIPALĂ ---
export function Contact() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<{filename: string, content: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formValues, setFormValues] = useState({
    name: "", email: "", phone: "", address: "", 
    date: "", time: "", servings: "", flavor: "", 
    theme: "", cakeMessage: "", message: ""
  });

  useEffect(() => {
    const handleUpdate = (e: any) => {
      const { field, value, fullOrder } = e.detail;
      if (fullOrder) {
        setFormValues(fullOrder);
      } else if (field) {
        setFormValues(prev => ({ ...prev, [field]: value }));
      }
    };
    window.addEventListener('updateContactForm' as any, handleUpdate);
    return () => window.removeEventListener('updateContactForm' as any, handleUpdate);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formValues, attachments: files }),
      });

      if (res.ok) {
        const orderToSave = { ...formValues, id: Date.now(), submittedAt: new Date().toISOString() };
        const existingRaw = localStorage.getItem("sweetcakes_order_history");
        let history = existingRaw ? JSON.parse(existingRaw) : [];
        history = [orderToSave, ...history].slice(0, 3);
        
        localStorage.setItem("sweetcakes_order_history", JSON.stringify(history));
        localStorage.setItem("sweetcakes_email", formValues.email);

        setIsSubmitted(true);
        setFormValues({ 
          name: "", email: "", phone: "", address: "", 
          date: "", time: "", servings: "", flavor: "", 
          theme: "", cakeMessage: "", message: "" 
        });
        setFiles([]);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert("A apărut o problemă la trimitere. Te rugăm să încerci din nou.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = await Promise.all(Array.from(e.target.files).map(async (file) => {
        const reader = new FileReader();
        return new Promise<{filename: string, content: string}>((resolve) => {
          reader.onload = () => resolve({ filename: file.name, content: reader.result as string });
          reader.readAsDataURL(file);
        });
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  return (
    <section id="contact" className="py-24 pb-44 bg-[#fbf9f4] relative overflow-hidden">
      
      {/* Sclipiri de fundal delicate */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-10 w-96 h-96 bg-pastel-pink rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-pastel-cream rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-7xl font-bold text-brand-dark italic"
          >
            Hai să creăm ceva <span className="text-brand-magenta font-script lowercase text-7xl md:text-9xl">magic</span>.
          </motion.h2>
          <p className="text-brand-dark/30 font-sans tracking-[0.4em] uppercase text-[10px] font-black italic text-center">
            Fiecare detaliu contează în povestea ta dulce
          </p>
        </div>

        {/* STRUCTURA ASIMETRICĂ PE DOUĂ COLOANE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* COLOANA STÂNGA: FORMULARUL PREMIUM (col-span-7) */}
          <div className="lg:col-span-7 bg-white/40 backdrop-blur-xl rounded-4xl p-8 md:p-12 shadow-2xl border border-white/60 flex flex-col justify-between hover:border-brand-magenta/10 transition-colors duration-500">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* SECȚIUNEA 1: CONTACT */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-magenta/50 flex items-center gap-2">
                  <User size={14} /> Detalii Client
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField id="name" label="Nume Complet" icon={User} required value={formValues.name} onChange={(v:any) => setFormValues({...formValues, name: v})} onFocus={setFocusedField} focused={focusedField} />
                  <FormField id="email" label="Email" icon={Mail} type="email" required value={formValues.email} onChange={(v:any) => setFormValues({...formValues, email: v})} onFocus={setFocusedField} focused={focusedField} />
                  <FormField id="phone" label="Număr de Telefon" icon={Phone} value={formValues.phone} onChange={(v:any) => setFormValues({...formValues, phone: v})} onFocus={setFocusedField} focused={focusedField} />
                  <FormField id="address" label="Adresă Livrare (Opțional)" icon={MapPin} value={formValues.address} onChange={(v:any) => setFormValues({...formValues, address: v})} onFocus={setFocusedField} focused={focusedField} />
                </div>
              </div>

              {/* SECȚIUNEA 2: EVENIMENT */}
              <div className="space-y-6 pt-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-magenta/50 flex items-center gap-2">
                  <CalendarIcon size={14} /> Dată și Cantitate
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomDatePicker value={formValues.date} onChange={(v:any) => setFormValues({...formValues, date: v})} />
                  <FormField id="time" label="Ora Evenimentului" icon={Clock} value={formValues.time} onChange={(v:any) => setFormValues({...formValues, time: v})} onFocus={setFocusedField} focused={focusedField} />
                  <FormField id="servings" label="Nr. Porții / Persoane" icon={Utensils} value={formValues.servings} onChange={(v:any) => setFormValues({...formValues, servings: v})} onFocus={setFocusedField} focused={focusedField} />
                  <FormField id="flavor" label="Compoziție / Aromă" icon={Cake} value={formValues.flavor} onChange={(v:any) => setFormValues({...formValues, flavor: v})} onFocus={setFocusedField} focused={focusedField} />
                </div>
              </div>

              {/* SECȚIUNEA 3: DESIGN */}
              <div className="space-y-6 pt-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-magenta/50 flex items-center gap-2">
                  <Sparkles size={14} /> Design și Mesaj
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField id="theme" label="Tematică sau Model" icon={Sparkles} value={formValues.theme} onChange={(v:any) => setFormValues({...formValues, theme: v})} onFocus={setFocusedField} focused={focusedField} />
                  <FormField id="cakeMessage" label="Mesaj de scris pe tort" icon={PenTool} value={formValues.cakeMessage} onChange={(v:any) => setFormValues({...formValues, cakeMessage: v})} onFocus={setFocusedField} focused={focusedField} />
                </div>

                {/* Upload poze (Efect de ramă de tablou chic) */}
                <div className="space-y-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-brand-magenta/20 rounded-4xl p-10 text-center hover:bg-brand-magenta/5 hover:border-brand-magenta/40 transition-all duration-300 cursor-pointer group bg-white/30"
                  >
                    <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    <Upload className="mx-auto mb-3 text-brand-magenta/30 group-hover:scale-110 transition-transform duration-300" size={36} />
                    <p className="text-sm font-bold text-brand-dark/50 font-sans">Atașează imagini de referință</p>
                    <p className="text-[9px] text-brand-dark/20 uppercase tracking-[0.2em] mt-1 italic text-center">Modele care te inspiră</p>
                  </div>
                  
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {files.map((f, i) => (
                        <div key={i} className="bg-brand-magenta text-white text-[10px] font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                          <ImageIcon size={12}/> <span className="truncate max-w-25">{f.filename}</span>
                          <button type="button" onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="hover:text-brand-dark transition-colors"><X size={14}/></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mesaj Extra */}
              <div className="pt-4">
                <FormField id="message" label="Alte detalii sau întrebări importante" isTextArea value={formValues.message} onChange={(v:any) => setFormValues({...formValues, message: v})} onFocus={setFocusedField} focused={focusedField} />
              </div>

              {/* Buton Submit */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={isSubmitting}
                className={`w-full py-6 bg-brand-dark text-white rounded-4xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:bg-brand-magenta hover:shadow-[0_20px_40px_-5px_rgba(233,30,99,0.3)] transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-50' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Se trimite în laborator...
                  </>
                ) : "Trimite Cererea"}
              </motion.button>
            </form>
          </div>

          {/* COLOANA DREAPTA: LOCAȚIA CHIC (col-span-5) */}
          <div className="lg:col-span-5 bg-white/40 backdrop-blur-xl rounded-4xl p-8 md:p-12 shadow-2xl border border-white/60 flex flex-col justify-between h-full relative overflow-hidden hover:border-brand-magenta/10 transition-colors duration-500">
            
            {/* Harta cu efect Grayscale-to-Color & Live Pulse Badge */}
            <div className="w-full h-72 md:h-100 rounded-3xl overflow-hidden shadow-lg border border-brand-dark/5 relative group shrink-0">
              
              {/* Live Pulsing Dot Badge */}
              <div className="absolute top-4 left-4 z-30 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-brand-dark/5 flex items-center gap-2 select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-magenta opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-magenta"></span>
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-brand-dark font-sans">Locație Atelier</span>
              </div>

              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.0664537758362!2d24.576882176889758!3d46.5413346711367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474bb653459c03b1%3A0xe744e837ea6c6020!2sStrada%20Tisei%2011%2C%20T%C3%A2rgu%20Mure%C8%99!5e0!3m2!1sro!2sro!4v1724933000000!5m2!1sro!2sro" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Locație Sweet Cakes by Gabriella"
                className="grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
              />
            </div>
            
            {/* Secțiune text asortată */}
            <div className="mt-8 space-y-6 text-brand-dark flex-1 flex flex-col justify-end">
              <div className="space-y-3">
                <h4 className="font-serif text-2xl font-bold italic text-brand-magenta flex items-center gap-2">
                  <Sparkles size={18} /> Ne găsești la Atelier
                </h4>
                <p className="text-sm text-brand-dark/60 leading-relaxed italic">
                  Te așteptăm cu bucurie în spațiul nostru creativ pentru a programa o degustare personalizată de compoziții sau pentru a discuta ideile tale de decor.
                </p>
              </div>

              {/* Informații Interactive cu animație la Hover */}
              <div className="space-y-2 pt-4 border-t border-brand-dark/5">
                
                {/* Micro-card: Adresă */}
                <motion.div 
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/50 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-magenta/10 flex items-center justify-center text-brand-magenta shrink-0 mt-0.5">
                    <MapPin size={14} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[8px] uppercase tracking-wider text-brand-dark/30 font-black font-sans">Adresă Atelier</p>
                    <p className="text-xs font-bold text-brand-dark leading-tight">Strada Tisei, nr. 11, Târgu Mureș, România</p>
                  </div>
                </motion.div>

                {/* Micro-card: Telefon */}
                <motion.div 
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/50 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-magenta/10 flex items-center justify-center text-brand-magenta shrink-0 mt-0.5">
                    <Phone size={14} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[8px] uppercase tracking-wider text-brand-dark/30 font-black font-sans">Telefon Direct</p>
                    <a href="tel:+40756883344" className="text-xs font-black text-brand-dark hover:text-brand-magenta transition-colors tracking-wide">+40 756 883 344</a>
                  </div>
                </motion.div>

                {/* Micro-card: Program */}
                <motion.div 
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/50 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-magenta/10 flex items-center justify-center text-brand-magenta shrink-0 mt-0.5">
                    <Clock size={14} />
                  </div>
                  <div className="space-y-0.5 w-full">
                    <p className="text-[8px] uppercase tracking-wider text-brand-dark/30 font-black font-sans">Orar Atelier</p>
                    <div className="text-xs font-bold text-brand-dark space-y-0.5">
                      <p>Marți — Vineri: <span className="text-brand-magenta">12:00 - 18:00</span></p>
                      <p>Sâmbătă: <span className="text-brand-magenta">10:00 - 14:00</span></p>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
            
          </div>

        </div>
      </div>

      {/* MODAL SUCCES */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 bg-brand-dark/40 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setIsSubmitted(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white p-12 rounded-4xl text-center shadow-2xl max-w-sm border border-brand-magenta/10"
              onClick={(e) => e.stopPropagation()}
            >
              <CheckCircle2 size={60} className="mx-auto text-brand-magenta mb-6" />
              <h3 className="font-serif text-3xl font-bold text-brand-dark mb-3 italic">Perfect!</h3>
              <p className="text-brand-dark/50 text-sm leading-relaxed text-center">Cererea ta a fost trimisă. Te contactăm curând pentru confirmare.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 px-10 py-3 bg-brand-dark text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-magenta transition-all"
              >
                Super
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRANZIȚIA CURBATĂ ASIMETRICĂ SPRE FOOTER */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20 pointer-events-none transform translate-y-px">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-16 md:h-24">
          <path d="M0,45 C150,-10 350,95 550,20 C750,-45 1000,70 1200,30 L1200,120 L0,120 Z" className="fill-brand-dark" />
        </svg>
      </div>
    </section>
  );
}