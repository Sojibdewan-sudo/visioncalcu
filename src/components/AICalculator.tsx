import React, { useState, useEffect } from 'react';
import { Bot, Loader2, Send, Sparkles, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SEOBlock } from './SEOBlock';

const MAX_DAILY_CREDITS = 10;

export function AICalculator() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    finalAnswer: string;
    explanation: string;
    summary: string;
    provider?: string;
  } | null>(null);
  const [error, setError] = useState('');
  const [creditsUsed, setCreditsUsed] = useState(0);

  useEffect(() => {
    // Initialize credits from localStorage
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('ai_usage_date');
    const storedCount = localStorage.getItem('ai_usage_count');

    if (storedDate !== today) {
      // New day, reset credits
      localStorage.setItem('ai_usage_date', today);
      localStorage.setItem('ai_usage_count', '0');
      setCreditsUsed(0);
    } else {
      setCreditsUsed(parseInt(storedCount || '0', 10));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (creditsUsed >= MAX_DAILY_CREDITS) {
      setError('Daily AI limit reached. Please try again tomorrow.');
      return;
    }

    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: query }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch AI response');
      }

      const parsedResponse = await res.json();
      setResponse(parsedResponse);

      // Update credits
      const newCount = creditsUsed + 1;
      setCreditsUsed(newCount);
      localStorage.setItem('ai_usage_count', newCount.toString());

      // Log to Supabase
      if (supabase) {
        await supabase.from('ai_logs').insert([
          {
            query: query,
            response: parsedResponse,
            user_ip: parsedResponse.userIp,
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (err: any) {
      console.error('AI Error:', err);
      setError(err.message || 'Failed to process your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-calculator" className="py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl text-indigo-600 dark:text-indigo-400">
            <Bot size={24} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">AI Text Calculator</h2>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 p-6 sm:p-8 transition-all duration-200">
          <div className="flex justify-between items-center mb-6">
            <label htmlFor="ai-query" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Ask any math or financial question in plain English
            </label>
            <div className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-800/50">
              <Zap size={14} className={creditsUsed >= MAX_DAILY_CREDITS ? "text-slate-400" : "text-amber-500"} />
              <span>AI Credits Today: {MAX_DAILY_CREDITS - creditsUsed} / {MAX_DAILY_CREDITS}</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative">
              <textarea
                id="ai-query"
                rows={3}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., If I save 2000 taka per month for 3 years with 10% interest?"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none pr-16 disabled:opacity-60"
                disabled={loading || creditsUsed >= MAX_DAILY_CREDITS}
              />
              <button
                type="submit"
                disabled={loading || !query.trim() || creditsUsed >= MAX_DAILY_CREDITS}
                className="absolute bottom-4 right-4 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
          </form>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800/30 mb-6">
              {error}
            </div>
          )}

          {response && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Final Answer */}
              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-2 text-sm uppercase tracking-wider">
                  <Sparkles size={16} />
                  Result
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {response.finalAnswer}
                </div>
              </div>

              {/* Explanation */}
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Short Explanation</h3>
                <div className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {response.explanation}
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
                  Simple Summary
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 italic pl-4">
                  "{response.summary}"
                </p>
              </div>
            </div>
          )}
        </div>

        <SEOBlock
          title="the AI Text Calculator"
          description={[
            "Our AI Text Calculator is a revolutionary tool that allows you to solve complex mathematical and financial problems using natural language. Instead of figuring out which formula to use or how to punch numbers into a traditional calculator, you simply type your question in plain English.",
            "Powered by advanced AI models, it understands context, performs the necessary calculations, and provides not just the final answer, but a detailed, step-by-step explanation of how it arrived at that result."
          ]}
          howToUse={[
            "Type your math or financial problem into the text box just as you would ask a human.",
            "For example, \"If I save $500 a month for 5 years at 6% interest, how much will I have?\"",
            "Click the send button or press enter.",
            "Review the final answer, the step-by-step breakdown, and the concise summary provided by the AI."
          ]}
          benefits={[
            "Natural Language Processing: No need to learn complex calculator syntax. Just ask.",
            "Educational: The step-by-step explanations help you understand the math behind the answer.",
            "Versatile: Can handle a wide variety of problems, from simple arithmetic to complex compound interest scenarios.",
            "Time-Saving: Get instant answers to word problems without having to translate them into equations first."
          ]}
          faq={[
            {
              question: "What kind of questions can I ask?",
              answer: "You can ask anything from basic math (\"What is 15% of 850?\") to complex financial scenarios (\"How long will it take to double my money at 7% interest?\")."
            },
            {
              question: "Is the AI always accurate?",
              answer: "While the AI is highly advanced and accurate for standard mathematical and financial calculations, it's always good practice to double-check critical financial decisions."
            },
            {
              question: "Can it solve algebra or calculus?",
              answer: "Yes, the AI is capable of solving algebraic equations and basic calculus problems, providing the steps along the way."
            }
          ]}
        />
      </div>
    </section>
  );
}
