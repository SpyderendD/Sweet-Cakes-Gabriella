import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
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
        <div className={`absolute right-5 transition-all duration-300 ${isTextArea ? 'top-6' : 'top-1/2 -translate-y-1/2'} ${isActive ? 'text-brand-magenta scale-110' : 'text-brand-dark/10'}`}>
          <Icon size={18} />
        </div>
      )}

      {isTextArea ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => onFocus(id)}
          onBlur={() => onFocus(null)}
          className={`w-full bg-white border-2 rounded-2xl py-4 px-6 outline-none transition-all resize-none font-sans text-brand-dark shadow-sm
            ${focused === id ? 'border-brand-magenta shadow-md' : 'border-brand-dark/5 hover:border-brand-dark/10'}`}
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
          className={`w-full bg-white border-2 rounded-2xl py-4 px-6 outline-none transition-all font-sans text-brand-dark shadow-sm
            ${focused === id ? 'border-brand-magenta shadow-md' : 'border-brand-dark/5 hover:border-brand-dark/10'}`}
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
        className={`w-full bg-white border-2 rounded-2xl py-4 px-6 cursor-pointer transition-all flex justify-between items-center shadow-sm
          ${isOpen ? 'border-brand-magenta shadow-md' : 'border-brand-dark/5 hover:border-brand-dark/10'}`}
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

  // LOGICA PENTRU AUTO-COMPLETARE (TORTURI SAU ISTORIC)
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
        // GESTIUNE ISTORIC (Ultimele 3)
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
    <section id="contact" className="py-24 bg-[#fbf9f4] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
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

        <div className="bg-white/40 backdrop-blur-xl rounded-4xl p-8 md:p-14 shadow-2xl border border-white/60">
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

              {/* Upload poze */}
              <div className="space-y-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-brand-magenta/20 rounded-4xl p-10 text-center hover:bg-brand-magenta/5 transition-all cursor-pointer group bg-white/30"
                >
                  <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                  <Upload className="mx-auto mb-3 text-brand-magenta/30 group-hover:scale-110 transition-transform" size={36} />
                  <p className="text-sm font-bold text-brand-dark/50">Atașează imagini de referință</p>
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
              className={`w-full py-6 bg-brand-dark text-white rounded-4xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:bg-brand-magenta transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-50' : ''}`}
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
    </section>
  );
}