import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { SEOBlock } from './SEOBlock';

export function EMICalculator() {
  const [principal, setPrincipal] = useState<number | ''>('');
  const [rate, setRate] = useState<number | ''>('');
  const [tenure, setTenure] = useState<number | ''>('');
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [result, setResult] = useState<{ emi: number; totalPayment: number; totalInterest: number } | null>(null);

  useEffect(() => {
    if (principal && rate && tenure) {
      calculateEMI();
    } else {
      setResult(null);
    }
  }, [principal, rate, tenure, tenureType]);

  const calculateEMI = () => {
    const P = Number(principal);
    const R = Number(rate) / 12 / 100;
    const N = tenureType === 'years' ? Number(tenure) * 12 : Number(tenure);

    if (P <= 0 || R <= 0 || N <= 0) return;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    setResult({ emi, totalPayment, totalInterest });
  };

  return (
    <section id="emi" className="py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
            <Calculator size={28} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">EMI Calculator</h1>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 p-6 sm:p-8 transition-all duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Loan Amount</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                placeholder="e.g. 500000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Interest Rate (% p.a.)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                placeholder="e.g. 8.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tenure</label>
              <div className="flex">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-l-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  placeholder="e.g. 5"
                />
                <select
                  value={tenureType}
                  onChange={(e) => setTenureType(e.target.value as 'years' | 'months')}
                  className="bg-slate-100 dark:bg-slate-700 border border-l-0 border-slate-200 dark:border-slate-700 rounded-r-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>

          {result && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800/50 animate-in zoom-in duration-300">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 text-center">EMI Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Monthly EMI</div>
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {result.emi.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Total Interest</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {result.totalInterest.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Total Payment</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {result.totalPayment.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <SEOBlock
          title="an EMI Calculator"
          description={[
            "An EMI (Equated Monthly Installment) calculator online is a financial tool that helps you determine the monthly payments you need to make towards a loan. Whether you're planning for a home loan, car loan, or personal loan, this tool uses the standard loan EMI formula to give you accurate repayment figures.",
            "By using our monthly installment calculator, you can plan your finances better, compare different loan offers, and ensure that your borrowing fits comfortably within your budget."
          ]}
          howToUse={[
            "Enter the total Loan Amount you wish to borrow.",
            "Input the annual Interest Rate provided by your lender.",
            "Specify the loan Tenure in either years or months.",
            "The calculator will instantly display your Monthly EMI, Total Interest payable, and the Total Payment amount."
          ]}
          benefits={[
            "Financial Planning: Know your exact monthly commitment before taking a loan.",
            "Quick Comparisons: Easily adjust the tenure or interest rate to see how it affects your EMI.",
            "Accurate Results: Uses the standard mathematical formula for precise calculations.",
            "Time-Saving: Avoid complex manual math and get instant answers."
          ]}
          faq={[
            {
              question: "What is the loan EMI formula?",
              answer: "The standard formula is EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is the principal amount, R is the monthly interest rate, and N is the number of monthly installments."
            },
            {
              question: "Does the EMI change during the loan tenure?",
              answer: "For fixed-rate loans, the EMI remains constant throughout the tenure. For floating-rate loans, the EMI may change if the interest rate is revised by the lender."
            },
            {
              question: "Can I use this for any type of loan?",
              answer: "Yes, this calculator works for personal loans, home loans, car loans, and education loans, provided the interest is calculated on a reducing balance basis."
            }
          ]}
        />
      </div>
    </section>
  );
}
