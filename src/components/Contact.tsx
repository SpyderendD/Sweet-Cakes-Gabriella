import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import { 
  X, Mail, Sparkles, User, MessageSquare, 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, 
  Cake, Upload, File as FileIcon, Image as ImageIcon 
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
            className="absolute top-full left-0 right-0 mt-4 bg-white rounded-4xl shadow-2xl border border-brand-magenta/10 z-50 p-6 min-w-75"
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <h4 className="font-serif font-bold text-brand-dark capitalize">
                {format(viewDate, "MMMM yyyy", { locale: ro })}
              </h4>
              <div className="flex gap-2">
                <button type="button" onClick={() => setViewDate(subMonths(viewDate, 1))} className="p-2 hover:bg-brand-magenta/5 rounded-full text-brand-magenta transition-colors"><ChevronLeft size={18} /></button>
                <button type="button" onClick={() => setViewDate(addMonths(viewDate, 1))} className="p-2 hover:bg-brand-magenta/5 rounded-full text-brand-magenta transition-colors"><ChevronRight size={18} /></button>
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<{filename: string, content: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formValues, setFormValues] = useState({
    name: "", email: "", date: "", size: "", theme: "", message: ""
  });

  // LOGICA DE AUTO-COMPLETARE DIN GALERIE
  useEffect(() => {
    const handleUpdate = (e: any) => {
      const { field, value } = e.detail;
      setFormValues(prev => ({ ...prev, [field]: value }));
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener('updateContactForm' as any, handleUpdate);
    return () => window.removeEventListener('updateContactForm' as any, handleUpdate);
  }, []);

  // Conversie fișier în Base64 pentru trimitere API
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const processed = await Promise.all(
        newFiles.map(async (file) => ({
          filename: file.name,
          content: await convertToBase64(file)
        }))
      );
      setFiles(prev => [...prev, ...processed]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formValues, attachments: files }),
      });

      if (response.ok) {
        localStorage.setItem("sweetcakes_email", formValues.email);
        localStorage.setItem("sweetcakes_last_order", new Date().toISOString());
        setIsSubmitted(true);
        setFormValues({ name: "", email: "", date: "", size: "", theme: "", message: "" });
        setFiles([]);
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        alert("A apărut o eroare la trimitere. Te rugăm să încerci din nou.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <form className="space-y-10" onSubmit={handleSubmit}>
            
            {/* Rând 1: Nume & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative">
                <input
                  type="text"
                  required
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
                  id="email"
                  type="email"
                  required
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

            {/* Rând 2: Dată & Mărime */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <CustomDatePicker 
                value={formValues.date} 
                onChange={(d) => setFormValues({...formValues, date: d})}
                isActive={focusedField === 'date'}
              />

              <div className="relative">
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

            {/* Tematică */}
            <div className="relative">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-magenta/30 animate-pulse"><Sparkles size={20} /></div>
              <input
                type="text"
                id="theme"
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

            {/* Fișiere Atașate */}
            <div className="space-y-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-brand-magenta/20 rounded-3xl p-8 flex flex-col items-center justify-center bg-white/50 hover:bg-brand-magenta/5 transition-all group"
              >
                <input 
                  type="file" multiple accept="image/*,.pdf" ref={fileInputRef} 
                  onChange={handleFileChange} className="hidden" 
                />
                <Upload className="text-brand-magenta/40 group-hover:scale-110 transition-transform mb-2" size={32} />
                <p className="text-sm font-bold text-brand-dark/60">Apasă sau trage imagini de referință aici</p>
                <p className="text-[10px] text-brand-dark/30 mt-1 uppercase tracking-tighter italic">Maxim 5MB per fișier</p>
              </div>

              {files.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {files.map((file, i) => (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key={i} className="bg-white border border-brand-dark/5 p-3 rounded-2xl flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3 truncate">
                        <div className="w-8 h-8 bg-brand-magenta/10 rounded-lg flex items-center justify-center text-brand-magenta shrink-0">
                          {file.filename.match(/\.(jpg|jpeg|png|webp)$/i) ? <ImageIcon size={16} /> : <FileIcon size={16} />}
                        </div>
                        <span className="text-xs font-bold text-brand-dark truncate">{file.filename}</span>
                      </div>
                      <button type="button" onClick={() => removeFile(i)} className="p-1.5 text-brand-dark/20 hover:text-red-500 transition-colors">
                        <X size={18} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Mesaj */}
            <div className="relative">
              <textarea
                rows={3}
                value={formValues.message}
                onChange={(e) => setFormValues({...formValues, message: e.target.value})}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-white border-2 border-brand-dark/5 rounded-4xl py-5 px-6 outline-none focus:border-brand-magenta/30 transition-all resize-none shadow-sm"
              />
              <label className={`absolute left-6 transition-all duration-300 font-bold ${isFieldActive('message') ? '-top-3 text-[10px] bg-brand-magenta text-white px-3 py-1 rounded-full shadow-md' : 'top-6 text-brand-dark/20'}`}>
                Mesajul tău (arome, detalii, întrebări...)
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
              className={`w-full py-6 bg-brand-dark text-white rounded-4xl font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-brand-magenta transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Se trimite...
                </>
              ) : 'Trimite în laborator'}
            </motion.button>
          </form>
        </div>
      </div>

      {/* MODAL SUCCES */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-110 bg-brand-dark/20 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setIsSubmitted(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white p-12 rounded-4xl text-center max-w-sm shadow-2xl border border-brand-magenta/10"
            >
              <div className="w-20 h-20 bg-brand-magenta/10 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🧁</div>
              <h3 className="font-serif text-3xl font-bold text-brand-dark mb-2 italic">Gata!</h3>
              <p className="text-brand-dark/50 text-sm italic">Am primit cererea ta. Vom pregăti oferta și te sunăm imediat.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}