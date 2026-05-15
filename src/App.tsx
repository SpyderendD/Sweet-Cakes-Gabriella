/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CustomCursor } from "./components/CustomCursor";
import { Particles } from "./components/Particles";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FeaturedCakes } from "./components/FeaturedCakes";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Loading } from "./components/Loading";
import { CookieBanner } from "./components/CookieBanner";
import { AccessibilityMenu } from "./components/AccessibilityMenu";
import { WhatsAppButton } from "./components/WhatsAppButton";

// Import new pages
import { Privacy } from "./pages/Privacy";
import { Cookies } from "./pages/Cookies";
import { Terms } from "./pages/Terms";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
}

function Home() {
  return (
    <main id="main-content" className="relative">
      <Hero />
      <FeaturedCakes />
      <About />
      <Gallery />
      <Testimonials />
      <Contact />
    </main>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-brand-dark focus:text-white focus:rounded-full focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-pastel-rose"
      >
        Sari la conținut
      </a>
      {isLoading && <Loading onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="relative selection:bg-pastel-rose selection:text-white">
          <CustomCursor />
          <Particles />
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/politica-de-confidentialitate" element={<Privacy />} />
            <Route path="/politica-cookies" element={<Cookies />} />
            <Route path="/termeni-si-conditii" element={<Terms />} />
          </Routes>

          <Footer />
          <CookieBanner />
          <AccessibilityMenu />
          <WhatsAppButton />
        </div>
      )}
    </Router>
  );
}

