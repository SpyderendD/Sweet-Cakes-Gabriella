import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import { Send, Upload, File, X, Image as ImageIcon, AlertCircle, Calendar, User, Mail, Users, MessageSquare, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday, addDays } from "date-fns";
import { ro } from "date-fns/locale";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isActive: boolean;
}

function CustomDatePicker({ value, onChange, onFocus, onBlur, isActive }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onBlur();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  const days = ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDateClick = (day: Date) => {
    onChange(format(day, "yyyy-MM-dd"));
    setIsOpen(false);
    onBlur();
  };

  return (
    <div className="relative group" ref={containerRef}>
      <div 
        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10 pointer-events-none ${isActive ? 'text-brand-magenta' : 'text-brand-dark/30 group-hover:text-brand-magenta/50'}`}
      >
        <Calendar size={18} />
      </div>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          onFocus();
        }}
        className={`w-full bg-white border-2 border-brand-dark/5 rounded-[1.25rem] py-4 px-5 outline-none transition-all cursor-pointer min-h-[58px] flex items-center shadow-sm group-hover:border-brand-magenta/10 ${isActive ? 'border-brand-magenta/30 bg-white ring-8 ring-brand-magenta/5' : ''}`}
      >
        <span className={`font-sans transition-opacity duration-300 ${value ? 'text-brand-dark opacity-100' : (isActive ? 'text-brand-dark/30 opacity-100' : 'opacity-0')}`}>
          {value ? format(new Date(value), "dd MMMM yyyy", { locale: ro }) : "Selectează data"}
        </span>
      </div>
      
      <label
        className={`absolute left-5 transition-all duration-500 pointer-events-none font-sans font-bold z-20 ${
          isActive ? '-top-3 text-[10px] bg-brand-magenta text-white px-3 py-1.5 rounded-full shadow-md tracking-wider uppercase' : 'top-4 text-brand-dark/30'
        }`}
      >
        Data Evenimentului
      </label>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-md rounded-[2rem] shadow-2xl border border-brand-magenta/10 z-[100] p-6 overflow-hidden min-w-[320px]"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-serif font-bold text-brand-dark capitalize">
                {format(currentMonth, "MMMM yyyy", { locale: ro })}
              </h4>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prevMonth(); }}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-brand-magenta/10 text-brand-dark/60 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); nextMonth(); }}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-brand-magenta/10 text-brand-dark/60 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map(day => (
                <div key={day} className="text-center text-[10px] font-bold text-brand-dark/30 uppercase tracking-widest py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleDateClick(day); }}
                  className={`
                    h-10 w-full rounded-xl flex items-center justify-center text-sm font-medium transition-all
                    ${!isSameMonth(day, monthStart) ? 'text-brand-dark/10' : 'text-brand-dark'}
                    ${isSameDay(day, value ? new Date(value) : new Date(0)) ? 'bg-brand-magenta text-white shadow-lg scale-110 z-10' : 'hover:bg-brand-magenta/5'}
                    ${isToday(day) && !isSameDay(day, value ? new Date(value) : new Date(0)) ? 'text-brand-magenta border border-brand-magenta/20' : ''}
                  `}
                >
                  {format(day, "d")}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-brand-dark/5 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-brand-dark/40">
              <span>* Recomandat cu 2-4 săptămâni înainte</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    date: "",
    servings: "",
    theme: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const handleExternalUpdate = (e: CustomEvent<{ field: keyof typeof formValues, value: string }>) => {
      const { field, value } = e.detail;
      setFormValues(prev => ({ ...prev, [field]: value }));
      setFocusedField(field);
    };

    window.addEventListener('updateContactForm' as any, handleExternalUpdate as any);
    return () => window.removeEventListener('updateContactForm' as any, handleExternalUpdate as any);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files) as File[];
      const oversized = newFiles.filter(file => file.size > 5 * 1024 * 1024);
      
      if (oversized.length > 0) {
        setFileError("Fișierele nu pot depăși 5MB fiecare.");
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      
      setFileError(null);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    if (files.length <= 1) setFileError(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files) as File[];
      const oversized = newFiles.filter(file => file.size > 5 * 1024 * 1024);
      
      if (oversized.length > 0) {
        setFileError("Fișierele nu pot depăși 5MB fiecare.");
        return;
      }
      
      setFileError(null);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "A apărut o eroare la trimitere.");
      }

      localStorage.setItem("sweetcakes_email", formValues.email);
      localStorage.setItem("sweetcakes_last_order", new Date().toISOString());
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormValues({
          name: "",
          email: "",
          date: "",
          servings: "",
          theme: "",
          message: ""
        });
        setFiles([]);
        setFocusedField(null);
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(error instanceof Error ? error.message : "Eroare la trimitere.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFieldActive = (fieldName: keyof typeof formValues) => {
    return focusedField === fieldName || formValues[fieldName].length > 0;
  };

  const formVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { type: "spring" as any, stiffness: 120 } },
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#fbf9f4]">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-0 w-96 h-96 bg-pastel-blue rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2"
      />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto glass-card rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-pastel-pink/20">
          
          <div className="w-full md:w-2/5 bg-brand-magenta-light/20 p-6 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-dark/5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-micro mb-4 text-brand-magenta opacity-80">Contactează-ne</div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mb-4 leading-tight">Să vorbim despre <span className="font-script text-brand-magenta italic">torturi</span>.</h3>
              <p className="font-sans text-brand-dark/70 mb-8 text-sm sm:text-base leading-relaxed">
                Fiecare desert este realizat la comandă. Completează formularul pentru o ofertă personalizată.
              </p>
              
              <div className="space-y-6 font-sans text-brand-dark text-sm sm:text-base">
                <motion.p whileHover={{ x: 5 }} className="flex items-center gap-4 cursor-default">
                  <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-magenta">📍</span>
                  123 Sugar Lane, Sweet City
                </motion.p>
                <motion.p whileHover={{ x: 5 }} className="flex items-center gap-4 cursor-default">
                  <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-magenta">📞</span>
                  (555) 123-4567
                </motion.p>
                <motion.p whileHover={{ x: 5 }} className="flex items-center gap-4 cursor-default">
                  <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-magenta">✉️</span>
                  hello@sweetcakes.com
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 md:mt-12"
            >
              <p className="font-serif font-bold text-brand-dark mb-2">Urmărește-ne</p>
              <div className="flex gap-4">
                {['Instagram', 'Pinterest', 'Facebook'].map((social) => (
                  <motion.a 
                    whileHover={{ y: -3, color: "var(--color-pastel-rose)" }}
                    key={social} 
                    href="#" 
                    className="text-xs sm:text-sm font-sans text-brand-dark/70 transition-colors"
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-3/5 p-6 sm:p-10 bg-white/50 relative border-t md:border-t-0 md:border-l border-brand-dark/5">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-20 p-10 text-center"
              >
                <div className="w-20 h-20 bg-pastel-cream rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-4xl">✨</span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-brand-dark mb-2">Cerere Trimisă!</h3>
                <p className="font-sans text-brand-dark/70">
                  Mulțumim! Am salvat detaliile și te vom contacta în curând cu o ofertă.
                </p>
              </motion.div>
            ) : null}

            <motion.form 
              variants={formVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6" 
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={inputVariants} className="relative group">
                  <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10 ${isFieldActive('name') ? 'text-brand-magenta' : 'text-brand-dark/30 group-hover:text-brand-magenta/50'}`}>
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formValues.name}
                    onChange={handleInputChange}
                    aria-required="true"
                    className="w-full bg-white border-2 border-brand-dark/5 rounded-[1.25rem] py-4 px-5 outline-none focus:border-brand-magenta/30 focus:bg-white transition-all peer font-sans text-brand-dark focus:ring-8 focus:ring-brand-magenta/5 shadow-sm group-hover:border-brand-magenta/10"
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-5 transition-all duration-500 pointer-events-none font-sans font-bold z-20 ${
                      isFieldActive('name') ? '-top-3 text-[10px] bg-brand-magenta text-white px-3 py-1.5 rounded-full shadow-md tracking-wider uppercase' : 'top-4 text-brand-dark/30'
                    }`}
                  >
                    Numele Tău
                  </label>
                </motion.div>
                <motion.div variants={inputVariants} className="relative group">
                  <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10 ${isFieldActive('email') ? 'text-brand-magenta' : 'text-brand-dark/30 group-hover:text-brand-magenta/50'}`}>
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formValues.email}
                    onChange={handleInputChange}
                    aria-required="true"
                    className="w-full bg-white border-2 border-brand-dark/5 rounded-[1.25rem] py-4 px-5 outline-none focus:border-brand-magenta/30 focus:bg-white transition-all peer font-sans text-brand-dark focus:ring-8 focus:ring-brand-magenta/5 shadow-sm group-hover:border-brand-magenta/10"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-5 transition-all duration-500 pointer-events-none font-sans font-bold z-20 ${
                      isFieldActive('email') ? '-top-3 text-[10px] bg-brand-magenta text-white px-3 py-1.5 rounded-full shadow-md tracking-wider uppercase' : 'top-4 text-brand-dark/30'
                    }`}
                  >
                    Adresa de Email
                  </label>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={inputVariants}>
                  <CustomDatePicker
                    value={formValues.date}
                    onChange={(date) => setFormValues(prev => ({ ...prev, date }))}
                    onFocus={() => setFocusedField('date')}
                    onBlur={() => setFocusedField(null)}
                    isActive={isFieldActive('date')}
                  />
                </motion.div>
                <div className="space-y-4">
                  <motion.div variants={inputVariants} className="relative group">
                    <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10 ${isFieldActive('servings') ? 'text-brand-magenta' : 'text-brand-dark/30 group-hover:text-brand-magenta/50'}`}>
                      <Users size={18} />
                    </div>
                    <input
                      type="number"
                      id="servings"
                      name="servings"
                      min="1"
                      required
                      value={formValues.servings}
                      onChange={handleInputChange}
                      aria-required="true"
                      className="w-full bg-white border-2 border-brand-dark/5 rounded-[1.25rem] py-4 px-5 outline-none focus:border-brand-magenta/30 focus:bg-white transition-all peer font-sans text-brand-dark focus:ring-8 focus:ring-brand-magenta/5 shadow-sm group-hover:border-brand-magenta/10"
                      onFocus={() => setFocusedField('servings')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <label
                      htmlFor="servings"
                      className={`absolute left-5 transition-all duration-500 pointer-events-none font-sans font-bold z-20 ${
                        isFieldActive('servings') ? '-top-3 text-[10px] bg-brand-magenta text-white px-3 py-1.5 rounded-full shadow-md tracking-wider uppercase' : 'top-4 text-brand-dark/30'
                      }`}
                    >
                      Număr de Porții
                    </label>
                  </motion.div>
                  
                  <AnimatePresence>
                    {formValues.servings && parseInt(formValues.servings) > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-brand-magenta/5 rounded-2xl p-4 border border-brand-magenta/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-magenta/10 flex items-center justify-center text-brand-magenta">
                            <Sparkles size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-brand-magenta/60 tracking-wider">Estimare Preț</p>
                            <p className="text-brand-dark font-bold">~{parseInt(formValues.servings) * 25} RON</p>
                          </div>
                        </div>
                        <div className="text-[10px] text-brand-dark/40 italic text-right max-w-[120px]">
                          *Prețul final depinde de design
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <motion.div variants={inputVariants} className="relative mt-2 group">
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10 ${isFieldActive('theme') ? 'text-brand-magenta' : 'text-brand-dark/30 group-hover:text-brand-magenta/50'}`}>
                  <Sparkles size={18} />
                </div>
                <input
                  type="text"
                  id="theme"
                  name="theme"
                  required
                  value={formValues.theme}
                  onChange={handleInputChange}
                  className="w-full bg-white border-2 border-brand-dark/5 rounded-[1.25rem] py-4 px-5 outline-none focus:border-brand-magenta/30 focus:bg-white transition-all peer font-sans text-brand-dark focus:ring-8 focus:ring-brand-magenta/5 shadow-sm group-hover:border-brand-magenta/10"
                  onFocus={() => setFocusedField('theme')}
                  onBlur={() => setFocusedField(null)}
                />
                <label
                  htmlFor="theme"
                  className={`absolute left-5 transition-all duration-500 pointer-events-none font-sans font-bold z-20 ${
                    isFieldActive('theme') ? '-top-3 text-[10px] bg-brand-magenta text-white px-3 py-1.5 rounded-full shadow-md tracking-wider uppercase' : 'top-4 text-brand-dark/30'
                  }`}
                >
                  Tematică / Design Dorit
                </label>
              </motion.div>

              <motion.div variants={inputVariants} className="relative mt-4 group">
                <div className={`absolute right-4 top-8 transition-colors duration-300 z-10 ${isFieldActive('message') ? 'text-brand-magenta' : 'text-brand-dark/30 group-hover:text-brand-magenta/50'}`}>
                  <MessageSquare size={18} />
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formValues.message}
                  onChange={handleInputChange}
                  className="w-full bg-white border-2 border-brand-dark/5 rounded-[1.75rem] py-5 px-6 outline-none focus:border-brand-magenta/30 focus:bg-white transition-all peer font-sans text-brand-dark resize-none focus:ring-8 focus:ring-brand-magenta/5 shadow-sm group-hover:border-brand-magenta/10"
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                ></textarea>
                <label
                  htmlFor="message"
                  className={`absolute left-6 transition-all duration-500 pointer-events-none font-sans font-bold z-20 ${
                    isFieldActive('message') ? '-top-3 text-[10px] bg-brand-magenta text-white px-3 py-1.5 rounded-full shadow-md tracking-wider uppercase' : 'top-5 text-brand-dark/30'
                  }`}
                >
                  Alte Detalii (Alergii, Arome preferate)
                </label>
              </motion.div>

              {/* File Upload Section */}
              <motion.div variants={inputVariants} className="space-y-4">
                <label className="block text-sm font-bold text-brand-dark/50 font-sans ml-1">
                  Referințe Vizuale (Poze, Documente)
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-3 ${
                    isDragging 
                      ? 'border-pastel-rose bg-pastel-rose/5' 
                      : 'border-brand-dark/10 hover:border-pastel-rose/50 hover:bg-black/[0.02]'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isDragging ? 'bg-pastel-rose text-white' : 'bg-brand-dark/5 text-brand-dark/40'
                  }`}>
                    <Upload size={24} />
                  </div>
                  <div className="text-center">
                    <p className="font-sans font-bold text-brand-dark/60">
                      Trage fișierele aici sau <span className="text-pastel-rose">apasă pentru a alege</span>
                    </p>
                    <p className="text-xs text-brand-dark/40 mt-1">
                      Poze (.jpg, .png) sau documente (.pdf, .docx)
                    </p>
                  </div>
                </div>
                
                <AnimatePresence>
                  {fileError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ 
                        opacity: 1, 
                        height: 'auto', 
                        y: 0,
                        x: [0, -5, 5, -5, 5, 0]
                      }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      className="bg-red-50 text-red-500 text-xs p-3 rounded-xl border border-red-100 flex items-center gap-2 font-bold overflow-hidden"
                    >
                      <AlertCircle size={14} />
                      {fileError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {files.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4"
                    >
                      {files.map((file, index) => (
                        <motion.div
                          key={`${file.name}-${index}`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex items-center gap-3 p-3 bg-white border border-brand-dark/5 rounded-xl shadow-sm group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-pastel-rose/10 text-pastel-rose flex items-center justify-center shrink-0">
                            {file.type.startsWith('image/') ? <ImageIcon size={20} /> : <File size={20} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-brand-dark truncate">{file.name}</p>
                            <p className="text-xs text-brand-dark/40">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(index);
                            }}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-brand-dark/30 hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.button
                variants={inputVariants}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(74, 59, 60, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-brand-dark text-white rounded-xl font-medium text-lg hover:bg-brand-dark/90 transition-all shadow-lg mt-4 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Se trimite...' : 'Trimite Cererea'}
              </motion.button>
              <AnimatePresence>
                {submitError && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      x: [0, -10, 10, -10, 10, 0]
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ 
                      duration: 0.5,
                      x: { duration: 0.4, ease: "easeInOut" }
                    }}
                    className="bg-red-50 text-red-600 text-sm mt-6 p-4 rounded-2xl border border-red-100 flex items-center gap-3 font-bold shadow-sm"
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                    >
                      <AlertCircle size={20} className="shrink-0" />
                    </motion.div>
                    <span>{submitError}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
