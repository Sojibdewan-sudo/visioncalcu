import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Moon, Sun, Menu, X, ChevronDown, Keyboard } from 'lucide-react';

interface NavbarProps {
  activePage: string;
}

export function Navbar({ activePage }: NavbarProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalcDropdownOpen, setIsCalcDropdownOpen] = useState(false);
  const [isTestDropdownOpen, setIsTestDropdownOpen] = useState(false);
  const calcDropdownRef = useRef<HTMLDivElement>(null);
  const testDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calcDropdownRef.current && !calcDropdownRef.current.contains(event.target as Node)) {
        setIsCalcDropdownOpen(false);
      }
      if (testDropdownRef.current && !testDropdownRef.current.contains(event.target as Node)) {
        setIsTestDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsCalcDropdownOpen(false);
    setIsTestDropdownOpen(false);
  };

  const calcPages = ['scientific', 'ai', 'age', 'emi', 'loan'];
  const testPages = ['typing-en', 'typing-bn'];

  return (
    <nav className="sticky top-0 z-50 w-full h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800 transition-all duration-200 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <a href="#home" onClick={closeMenus} className="flex items-center gap-2 flex-shrink-0 group">
            <div className="bg-indigo-600 text-white p-1.5 rounded-xl transition-transform duration-300 group-hover:scale-110">
              <Calculator size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Vision <span className="text-indigo-600 dark:text-indigo-400">AI</span> Calculator
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <a
              href="#home"
              className={`relative group text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105 ${activePage === 'home' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400'}`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 transform origin-left transition-transform duration-300 ease-out ${activePage === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
            <a
              href="#convertor"
              className={`relative group text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105 ${activePage === 'convertor' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400'}`}
            >
              Convertor
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 transform origin-left transition-transform duration-300 ease-out ${activePage === 'convertor' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
            
            {/* Calculator Dropdown */}
            <div className="relative" ref={calcDropdownRef}>
              <button
                onClick={() => {
                  setIsCalcDropdownOpen(!isCalcDropdownOpen);
                  setIsTestDropdownOpen(false);
                }}
                className={`relative group flex items-center gap-1 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105 ${calcPages.includes(activePage) ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400'}`}
              >
                Calculator <ChevronDown size={16} className={`transition-transform duration-200 ${isCalcDropdownOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 transform origin-left transition-transform duration-300 ease-out ${calcPages.includes(activePage) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
              
              {isCalcDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <a href="#scientific" onClick={closeMenus} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">Scientific Calculator</a>
                  <a href="#ai" onClick={closeMenus} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">AI Text Calculator</a>
                  <a href="#age" onClick={closeMenus} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">Age Calculator</a>
                  <a href="#emi" onClick={closeMenus} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">EMI Calculator</a>
                  <a href="#loan" onClick={closeMenus} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">Loan Calculator</a>
                </div>
              )}
            </div>

            {/* Test Dropdown */}
            <div className="relative" ref={testDropdownRef}>
              <button
                onClick={() => {
                  setIsTestDropdownOpen(!isTestDropdownOpen);
                  setIsCalcDropdownOpen(false);
                }}
                className={`relative group flex items-center gap-1 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105 ${testPages.includes(activePage) ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400'}`}
              >
                Test <ChevronDown size={16} className={`transition-transform duration-200 ${isTestDropdownOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 transform origin-left transition-transform duration-300 ease-out ${testPages.includes(activePage) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
              
              {isTestDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <a href="#typing-en" onClick={closeMenus} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">English Typing Test</a>
                  <a href="#typing-bn" onClick={closeMenus} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">Bangla Typing Test</a>
                </div>
              )}
            </div>
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-12"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-12"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors duration-200 ease-in-out"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <a href="#home" onClick={closeMenus} className={`block w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-colors duration-200 ${activePage === 'home' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Home</a>
            <a href="#convertor" onClick={closeMenus} className={`block w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-colors duration-200 ${activePage === 'convertor' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Convertor</a>
            
            <div className="pt-2 pb-1">
              <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Calculators</p>
            </div>
            <a href="#scientific" onClick={closeMenus} className={`block w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-colors duration-200 ${activePage === 'scientific' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Scientific Calculator</a>
            <a href="#ai" onClick={closeMenus} className={`block w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-colors duration-200 ${activePage === 'ai' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>AI Text Calculator</a>
            <a href="#age" onClick={closeMenus} className={`block w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-colors duration-200 ${activePage === 'age' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Age Calculator</a>
            <a href="#emi" onClick={closeMenus} className={`block w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-colors duration-200 ${activePage === 'emi' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>EMI Calculator</a>
            <a href="#loan" onClick={closeMenus} className={`block w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-colors duration-200 ${activePage === 'loan' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Loan Calculator</a>

            <div className="pt-2 pb-1">
              <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tests</p>
            </div>
            <a href="#typing-en" onClick={closeMenus} className={`block w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-colors duration-200 ${activePage === 'typing-en' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>English Typing Test</a>
            <a href="#typing-bn" onClick={closeMenus} className={`block w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-colors duration-200 ${activePage === 'typing-bn' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Bangla Typing Test</a>
          </div>
        </div>
      )}
    </nav>
  );
}



