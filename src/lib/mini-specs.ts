/** Mini-simulateurs des guides (RECETTE §9.3), calculés par le moteur fiscal irlandais. */
import { calculateSalary } from './engine';
import { USC_EXEMPTION, SRCOP } from './tax-rates-2026';
import type { MiniSpec } from './mini-types';

const eur = (x: number, d = 0) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', minimumFractionDigits: d, maximumFractionDigits: d }).format(x);
const pct = (x: number) => new Intl.NumberFormat('en-IE', { style: 'percent', maximumFractionDigits: 1 }).format(x > 1 ? x / 100 : x);
const salary = (def = 50000) => ({ id: 's', label: 'Gross annual salary', def, unit: '€', max: 5000000 });
const STATUS = [{ value: '0', label: 'Single' }, { value: '1', label: 'Married, one income' }, { value: '2', label: 'Married, two incomes' }, { value: '3', label: 'Single parent' }];
const ST = ['single', 'married_one_income', 'married_two_incomes', 'single_parent'] as const;
const C = (s: number, st = 0, pension = 0, extra = 0) => calculateSalary({ grossAnnual: s, filingStatus: ST[st] ?? 'single', pensionRate: pension, additionalCredits: extra });

const SPECS: Record<string, MiniSpec> = {
  takehome: { title: 'Your take-home pay', cta: 'Full salary calculator', inputs: [salary(), { id: 't', label: 'Tax status', def: 0, options: STATUS }], run: ({ s, t }) => {
    const r = C(s, t); return { head: ['Take-home per month', eur(r.netMonthly)], rows: [['Income tax per year', eur(r.incomeTaxNet)], ['USC per year', eur(r.usc)], ['PRSI per year', eur(r.prsi)]] };
  } },
  paye: { title: 'PAYE on your salary', cta: 'Full salary calculator', inputs: [salary(), { id: 't', label: 'Tax status', def: 0, options: STATUS }], run: ({ s, t }) => {
    const r = C(s, t); return { head: ['Income tax after credits', eur(r.incomeTaxNet)], rows: [['Tax before credits', eur(r.incomeTaxGross)], ['Tax credits', eur(r.taxCreditsTotal)], ['Standard rate band', eur(SRCOP[ST[t] ?? 'single'])]] };
  } },
  usc: { title: 'Your Universal Social Charge', cta: 'Full salary calculator', inputs: [salary()], run: ({ s }) => {
    const r = C(s); return { head: ['USC per year', eur(r.usc)], rows: [['Per month', eur(r.uscMonthly)], ['Exempt below', eur(USC_EXEMPTION)], ['Effective USC rate', pct(r.effectiveUSCRate)]] };
  } },
  prsi: { title: 'Your PRSI contribution', cta: 'Full salary calculator', inputs: [salary()], run: ({ s }) => {
    const r = C(s); return { head: ['Employee PRSI per year', eur(r.prsi)], rows: [['Per month', eur(r.prsiMonthly)], ['Employer PRSI', eur(r.employerPRSI)]] };
  } },
  credits: { title: 'What an extra tax credit is worth', cta: 'Full salary calculator', inputs: [salary(), { id: 'c', label: 'Extra tax credits per year', def: 500, unit: '€', max: 50000 }], run: ({ s, c }) => {
    const a = C(s); const b = C(s, 0, 0, c); return { head: ['Take-home gain per year', eur(b.netAnnual - a.netAnnual)], rows: [['Credits before', eur(a.taxCreditsTotal)], ['Credits after', eur(b.taxCreditsTotal)]] };
  } },
  pension: { title: 'Tax relief on your pension contribution', cta: 'Full salary calculator', inputs: [salary(60000), { id: 'p', label: 'Pension contribution, % of salary', def: 5, unit: '%', max: 40, decimals: 1 }], run: ({ s, p }) => {
    const a = C(s); const b = C(s, 0, p / 100); const cost = a.netAnnual - b.netAnnual; return { head: ['Paid into your pension per year', eur(b.pensionContribution)], rows: [['Cost to your take-home pay', eur(cost)], ['Tax relief received', eur(b.pensionContribution - cost)], ['Your marginal rate', pct(a.marginalRate)]] };
  } },
  married: { title: 'Single or jointly assessed?', cta: 'Full salary calculator', inputs: [salary(70000)], run: ({ s }) => {
    const a = C(s, 0); const b = C(s, 1); return { head: ['Extra take-home, married one income', eur(b.netAnnual - a.netAnnual)], rows: [['Take-home as single', eur(a.netAnnual)], ['Take-home, married one income', eur(b.netAnnual)]] };
  } },
  emergency: { title: 'What emergency tax costs you each month', cta: 'Full salary calculator', inputs: [salary(45000)], run: ({ s }) => {
    const r = C(s); const m = s / 12; const emergency = m * 0.4 + m * 0.08 + r.prsiMonthly; const normal = r.incomeTaxMonthly + r.uscMonthly + r.prsiMonthly; return { head: ['Overpaid per month on emergency tax', eur(Math.max(0, emergency - normal))], rows: [['Normal deductions per month', eur(normal)], ['Emergency: 40 % tax, 8 % USC, no credits', eur(emergency)]], note: 'Refunded once Revenue has your details and issues your tax credits. The first pay period is taxed less harshly.' };
  } },
  minwage: { title: 'Minimum wage take-home pay', cta: 'Full salary calculator', inputs: [{ id: 'h', label: 'Hourly rate', def: 14.15, unit: '€', max: 1000, decimals: 2 }, { id: 'w', label: 'Hours per week', def: 39, unit: 'h', max: 80 }], run: ({ h, w }) => {
    const g = h * w * 52; const r = C(g); return { head: ['Take-home per week', eur(r.netWeekly)], rows: [['Gross per year', eur(g)], ['Take-home per month', eur(r.netMonthly)]] };
  } },
};

export function getSpec(kind: string, _lang?: string): MiniSpec {
  const s = SPECS[kind]; if (!s) throw new Error(`Mini-simulateur inconnu : ${kind}`); return s;
}
