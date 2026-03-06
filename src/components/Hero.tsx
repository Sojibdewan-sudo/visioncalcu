import React from 'react';
import { ArrowRight, Calculator, Cpu, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32 transition-colors duration-200 ease-in-out animate-in fade-in duration-700">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-slate-50 dark:from-indigo-900/10 dark:via-slate-900 dark:to-slate-900"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8 border border-slate-200 dark:border-slate-700 shadow-sm">
         
      
        </div>
        
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-7xl">
          All-in-One Smart <br className="hidden sm:block" />
          <span className="text-indigo-600 dark:text-indigo-400">
            Calculator Platform
          </span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-[600px] text-lg tracking-tight text-slate-600 dark:text-slate-300">
          Convert units instantly, use advanced scientific calculator, and solve real-life problems with AI. Free online smart calculator tool.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#convertor"
            className="inline-flex items-center justify-center rounded-xl py-3 px-8 text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
          >
            Start Calculating
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a
            href="#ai"
            className="inline-flex items-center justify-center rounded-xl py-3 px-8 text-sm font-semibold bg-transparent text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 ease-in-out"
          >
            Try AI Assistant
            <Cpu className="ml-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </a>
        </div>
        
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
          {[
            { name: '100+ Unit Conversions', desc: 'Accurate and instant conversions across 13 categories.', icon: Calculator },
            { name: 'Scientific Precision Calculator', desc: 'Advanced mathematical functions and expressions.', icon: Zap },
            { name: 'AI Smart Problem Solver', desc: 'Natural language understanding for complex queries.', icon: Cpu },
          ].map((feature) => (
            <div key={feature.name} className="flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-in-out">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 mb-4">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white text-center">{feature.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 text-center">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

