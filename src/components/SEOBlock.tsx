import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SEOBlockProps {
  title: string;
  description: string[];
  howToUse: string[];
  benefits: string[];
  faq: { question: string; answer: string }[];
}

export function SEOBlock({ title, description, howToUse, benefits, faq }: SEOBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300">
      <div 
        className="p-6 sm:p-8 cursor-pointer flex justify-between items-center group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          Learn More About {title}
        </h2>
        <div className={`p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </div>
      
      <div 
        className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="p-6 sm:p-8 pt-0 prose prose-slate dark:prose-invert max-w-none border-t border-slate-100 dark:border-slate-700/50">
            <h3>What is this tool?</h3>
            {description.map((p, i) => <p key={i}>{p}</p>)}
            
            <h3>How to use it</h3>
            <ul>
              {howToUse.map((item, i) => <li key={i}>{item}</li>)}
            </ul>

            <h3>Benefits</h3>
            <ul>
              {benefits.map((item, i) => <li key={i}>{item}</li>)}
            </ul>

            <h3>FAQ</h3>
            <div className="space-y-4 not-prose">
              {faq.map((item, i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <strong className="block text-slate-900 dark:text-white mb-2">{item.question}</strong>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
