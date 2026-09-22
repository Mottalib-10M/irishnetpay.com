import { useState, useMemo } from 'react';
import { calculateSalary, type SalaryResult } from '../lib/engine';
import type { FilingStatus } from '../lib/tax-rates-2026';

function fmt(n: number): string {
  return n.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function pct(n: number): string {
  return (n * 100).toFixed(1) + '%';
}

export default function SalaryCalculator() {
  const [grossAnnual, setGrossAnnual] = useState(50_000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [pensionRate, setPensionRate] = useState(0);
  const [additionalCredits, setAdditionalCredits] = useState(0);

  const result: SalaryResult = useMemo(() => {
    return calculateSalary({ grossAnnual, filingStatus, pensionRate: pensionRate / 100, additionalCredits });
  }, [grossAnnual, filingStatus, pensionRate, additionalCredits]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gross Annual Salary</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500 text-sm">€</span>
              <input type="number" value={grossAnnual} onChange={e => setGrossAnnual(Number(e.target.value) || 0)}
                className="w-full rounded-lg border-gray-300 border pl-7 pr-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary" min={0} step={1000} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status</label>
            <select value={filingStatus} onChange={e => setFilingStatus(e.target.value as FilingStatus)}
              className="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary">
              <option value="single">Single</option>
              <option value="married_one_income">Married (one income)</option>
              <option value="married_two_incomes">Married (two incomes)</option>
              <option value="single_parent">Single Parent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pension Contribution (%)</label>
            <input type="number" value={pensionRate} onChange={e => setPensionRate(Math.max(0, Math.min(40, Number(e.target.value) || 0)))}
              className="w-full rounded-lg border-gray-300 border px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary" min={0} max={40} step={0.5} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Extra Tax Credits (annual)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500 text-sm">€</span>
              <input type="number" value={additionalCredits} onChange={e => setAdditionalCredits(Number(e.target.value) || 0)}
                className="w-full rounded-lg border-gray-300 border pl-7 pr-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary" min={0} step={100} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Take-Home Pay</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Net Monthly</p>
            <p className="text-2xl font-bold text-green-600">€{fmt(result.netMonthly)}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Net Annual</p>
            <p className="text-xl font-bold text-primary">€{fmt(result.netAnnual)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Effective Tax Rate</p>
            <p className="text-xl font-bold text-gray-700">{pct(result.effectiveTotalRate)}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden flex">
            <div className="bg-green-500 h-5 transition-all duration-500"
              style={{ width: `${grossAnnual > 0 ? (result.netAnnual / grossAnnual) * 100 : 0}%` }} />
            <div className="bg-red-400 h-5 transition-all duration-500"
              style={{ width: `${pct(result.effectiveTaxRate)}` }} />
            <div className="bg-orange-400 h-5 transition-all duration-500"
              style={{ width: `${pct(result.effectiveUSCRate)}` }} />
            <div className="bg-blue-400 h-5 transition-all duration-500"
              style={{ width: `${pct(result.effectivePRSIRate)}` }} />
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-1">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full inline-block" /> Net</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-400 rounded-full inline-block" /> Income Tax</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-400 rounded-full inline-block" /> USC</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-400 rounded-full inline-block" /> PRSI</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Monthly Breakdown</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Gross Monthly</td>
                  <td className="py-1.5 text-right font-medium">€{fmt(result.grossMonthly)}</td>
                </tr>
                {result.pensionMonthly > 0 && (
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5 text-gray-600">Pension</td>
                    <td className="py-1.5 text-right font-medium text-purple-600">−€{fmt(result.pensionMonthly)}</td>
                  </tr>
                )}
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Income Tax</td>
                  <td className="py-1.5 text-right font-medium text-red-600">−€{fmt(result.incomeTaxMonthly)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">USC</td>
                  <td className="py-1.5 text-right font-medium text-orange-600">−€{fmt(result.uscMonthly)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">PRSI</td>
                  <td className="py-1.5 text-right font-medium text-blue-600">−€{fmt(result.prsiMonthly)}</td>
                </tr>
                <tr className="border-t-2 border-gray-300">
                  <td className="py-2 font-semibold">Net Monthly</td>
                  <td className="py-2 text-right font-bold text-green-600">€{fmt(result.netMonthly)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tax Details (Annual)</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Gross Tax</td>
                  <td className="py-1.5 text-right">€{fmt(result.incomeTaxGross)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Tax Credits</td>
                  <td className="py-1.5 text-right text-green-600">−€{fmt(result.taxCreditsTotal)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Net Income Tax</td>
                  <td className="py-1.5 text-right font-medium">€{fmt(result.incomeTaxNet)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Marginal Rate</td>
                  <td className="py-1.5 text-right font-medium">{pct(result.marginalRate)}</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="py-1.5 text-gray-600">Employer PRSI</td>
                  <td className="py-1.5 text-right">€{fmt(result.employerPRSI)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-600">Total Employer Cost</td>
                  <td className="py-1.5 text-right font-medium">€{fmt(result.totalEmployerCost)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          Estimate based on 2026 Irish tax rates, USC bands, and PRSI rates. Actual amounts may vary
          based on specific circumstances, additional reliefs, and Revenue determinations. This is not
          tax advice, consult <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" className="underline">Revenue.ie</a> or
          a tax advisor for your individual situation.
        </p>
      </div>
    </div>
  );
}
