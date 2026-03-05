import React from 'react';
import { Calculator } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 transition-colors duration-200 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <a href="#home" className="flex items-center gap-2 mb-6 cursor-pointer">
          <div className="bg-indigo-600 text-white p-1.5 rounded-xl">
            <Calculator size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Vision <span className="text-indigo-400">AI</span> Calculator
          </span>
        </a>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <a href="#about" className="text-sm hover:text-white transition-colors duration-200">About Us</a>
          <a href="#terms" className="text-sm hover:text-white transition-colors duration-200">Terms & Conditions</a>
          <a href="#privacy" className="text-sm hover:text-white transition-colors duration-200">Privacy Policy</a>
        </div>
        
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Vision AI Calculator. All rights reserved.
        </p>
      </div>
    </footer>
  );
}


