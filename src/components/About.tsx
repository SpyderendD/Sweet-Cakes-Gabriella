import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Star, Award } from "lucide-react";

export function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const rotateImage = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section id="about" ref={ref} className="py-32 pb-44 relative overflow-hidden bg-brand-light">

      {/* Background Decorativ */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute -top-24 -right-24 w-125 h-125 bg-brand-magenta/10 rounded-full blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-125 h-125 bg-brand-dark/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          {/* Partea Stângă */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative max-w-md mx-auto">
              <motion.div style={{ rotate: rotateImage }} className="absolute inset-0 border-2 border-brand-magenta/20 rounded-[3rem] translate-x-6 translate-y-6 -z-10" />
              <div className="relative z-10 bg-white p-4 rounded-[3.5rem] shadow-2xl shadow-brand-dark/5 overflow-hidden group">
                <img src="/assets/images/eu.jpg" alt="Gabriella - Fondator" className="w-full h-full object-cover rounded-[2.8rem]" />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-brand-dark text-white p-8 rounded-4xl shadow-2xl z-20 border border-white/10">
                <div className="flex flex-col items-center">
                  <Award className="text-brand-magenta mb-2" size={24} />
                  <span className="font-serif italic text-2xl font-bold">10+</span>
                  <span className="text-[9px] uppercase tracking-widest font-black opacity-50">Ani de Artă</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Partea Dreaptă */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-brand-magenta" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-dark/40">Povestea Noastră</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-brand-dark mb-10 leading-[0.95] tracking-tighter">
              Creat cu <span className="text-brand-magenta font-script italic lowercase">dragoste</span>, <br /> servit cu emoție.
            </h2>
            <div className="space-y-6 font-sans text-brand-dark/60 text-lg leading-relaxed italic">
              <p>
                <span className="text-4xl font-serif font-bold text-brand-magenta mr-2 not-italic"> Bun venit! </span> <br />Eu sunt Gabriella, sufletul din spatele Sweet Cakes by Gabriella. ❤️<br />
                Povestea mea începe în copilărie, într-o casă în care duminicile aveau întotdeauna miros de prăjituri proaspăt coapte. Era aproape o tradiție: în fiecare duminică se pregătea ceva dulce, iar eu stăteam cu nerăbdare lângă mama, privind cum din ingrediente simple se nășteau deserturi care adunau întreaga familie în jurul mesei.<br />
                De atunci s-a născut pasiunea mea pentru dulce. Multe dintre rețetele pe care le folosesc și astăzi își au rădăcinile în caietul de rețete al mamei, păstrat cu drag și îmbogățit în timp cu propriile mele idei, experiențe și tehnici.<br />
                Pentru mine, fiecare tort și fiecare prăjitură înseamnă mai mult decât un desert. Înseamnă amintiri, emoții și bucuria de a crea ceva special pentru momentele importante din viața oamenilor.<br />
                Prin Sweet Cakes by Gabriella, îmi doresc să duc mai departe acea căldură a duminicilor din copilărie și să ofer deserturi pregătite cu grijă, ingrediente de calitate și mult suflet.<br />
                Fiindcă cele mai frumoase povești încep, de multe ori, cu o felie de prăjitură! 🍰❤️<br />
                La Sweet Cakes by Gabriella, toate produsele sunt realizate artizanal, în loturi mici, cu grijă pentru fiecare detaliu și folosind ingrediente atent alese. Nu urmăresc doar un aspect frumos, ci și gustul autentic al deserturilor făcute „ca acasă”, inspirate din rețetele de familie și din pasiunea mea pentru cofetărie.<br />
                Indiferent dacă sărbătoriți o aniversare, un botez, o nuntă, o cununie, un eveniment corporate sau pur și simplu vreți să aduceți un strop de dulce într-o zi obișnuită, vă aștept cu drag comenzile. ❤️<br />
                Abia aștept să fac parte din povestea voastră și să aduc pe masa voastră un desert cu adevărat special! 🍰.<br />
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* TRANZIȚIA 3: Curbă organică cu vârf ascuțit în centru spre Gallery (fill-[#fbf9f4]) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-20 pointer-events-none transform translate-y-px">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-16">
          <path d="M0,60 C200,-20 400,100 600,20 C800,-40 1000,80 1200,40 L1200,120 L0,120 Z" fill="#fbf9f4" />
        </svg>
      </div>
    </section>
  );
}