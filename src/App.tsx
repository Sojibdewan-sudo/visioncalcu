import React, { useState, useEffect, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { AdPlaceholder } from './components/AdPlaceholder';
import { AboutUs, TermsConditions, PrivacyPolicy } from './components/LegalPages';
import { updateSEO } from './lib/seo';

// Lazy load heavy components
const UnitConverter = React.lazy(() => import('./components/UnitConverter').then(m => ({ default: m.UnitConverter })));
const ScientificCalculator = React.lazy(() => import('./components/ScientificCalculator').then(m => ({ default: m.ScientificCalculator })));
const AICalculator = React.lazy(() => import('./components/AICalculator').then(m => ({ default: m.AICalculator })));
const AgeCalculator = React.lazy(() => import('./components/AgeCalculator').then(m => ({ default: m.AgeCalculator })));
const EMICalculator = React.lazy(() => import('./components/EMICalculator').then(m => ({ default: m.EMICalculator })));
const LoanCalculator = React.lazy(() => import('./components/LoanCalculator').then(m => ({ default: m.LoanCalculator })));
const TypingTest = React.lazy(() => import('./components/TypingTest').then(m => ({ default: m.TypingTest })));

const getPageFromHash = () => {
  const hash = window.location.hash.replace("#", "");
  return hash || "home";
};

export default function App() {
  const [activePage, setActivePage] = useState(getPageFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setActivePage(page);
      updateSEO(page);
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Track page view in GA
      if (typeof window !== 'undefined' && (window as any).gtag) {
        const gaId = import.meta.env.VITE_GA_ID;
        if (gaId) {
          (window as any).gtag('config', gaId, {
            page_path: window.location.pathname + window.location.hash
          });
        }
      }
    };

    // Initial SEO update
    updateSEO(activePage);

    // Initial GA tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const gaId = import.meta.env.VITE_GA_ID;
      if (gaId) {
        (window as any).gtag('config', gaId, {
          page_path: window.location.pathname + window.location.hash
        });
      }
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isToolPage = ['convertor', 'scientific', 'ai', 'age', 'emi', 'loan', 'typing-en', 'typing-bn'].includes(activePage);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 ease-in-out flex flex-col">
      <Navbar activePage={activePage} />
      
      <main className="flex-grow flex flex-col">
        {/* Top banner ad */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4">
          <AdPlaceholder className="h-24" text="Top Banner Advertisement" />
        </div>

        <div className="flex-grow animate-in fade-in duration-500">
          {activePage === 'home' && <Hero />}
          
          <Suspense fallback={<div className="py-16 text-center">Loading...</div>}>
            {activePage === 'convertor' && <UnitConverter />}
            {activePage === 'scientific' && <ScientificCalculator />}
            {activePage === 'ai' && <AICalculator />}
            {activePage === 'age' && <AgeCalculator />}
            {activePage === 'emi' && <EMICalculator />}
            {activePage === 'loan' && <LoanCalculator />}
            {activePage === 'typing-en' && <TypingTest language="en" />}
            {activePage === 'typing-bn' && <TypingTest language="bn" />}
          </Suspense>

          {activePage === 'about' && <AboutUs />}
          {activePage === 'terms' && <TermsConditions />}
          {activePage === 'privacy' && <PrivacyPolicy />}
        </div>
      </main>

      {/* Footer ad */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-4">
        <AdPlaceholder className="h-24" text="Footer Advertisement" />
      </div>

      <Footer />
    </div>
  );
}




