/**
 * Calculators of the social welfare and property pages (RECETTE §9.3, §17).
 * Each one calls `welfare-engine.ts`; none recomputes a rate. Weekly welfare
 * amounts keep their cents (the DSP publishes €163.70, €198.90), lump sums and
 * property figures are shown in whole euro.
 */
import type { MiniSpec } from './mini-types';
import {
  graduatedRate, jobseekersBenefitWeek, jobseekersBenefitDays, jprbSchedule, capitalMeans, jobseekersAllowance,
  illnessBenefitSpell, familyLeave, workingFamilyPayment, wfpIncomeFromGross, wfpLimit, carersAllowance, carerCapitalMeans,
  statePension, stampDuty, helpToBuy, type Dependants,
} from './welfare-engine';
import { JPRB, FAMILY_LEAVE, CA, SPC, HTB, STAMP_DUTY } from './welfare-2026';

const eur = (x: number, d = 0) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', minimumFractionDigits: d, maximumFractionDigits: d }).format(x);
const wk = (x: number) => `${eur(x, 2)} a week`;
const pct = (x: number, d = 2) => new Intl.NumberFormat('en-IE', { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: d }).format(x);
const num = (x: number) => new Intl.NumberFormat('en-IE').format(x);

const YES_NO = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }];
const KIDS = (max = 6) => Array.from({ length: max + 1 }, (_, i) => ({ value: String(i), label: String(i) }));
const PARTNER = [{ value: '0', label: 'No partner' }, { value: '1', label: 'Partner, income below' }];
const dep = (v: Record<string, number>): Dependants => ({ partner: v.p ? 1 : 0, partnerIncome: v.pi ?? 0, childrenUnder12: v.k ?? 0, children12Plus: v.t ?? 0 });

const awe = (def: number) => ({ id: 'e', label: 'Average weekly earnings in 2024', def, unit: '€', max: 100000 });
const partnerInputs = [
  { id: 'p', label: 'Spouse or partner', def: 0, options: PARTNER },
  { id: 'pi', label: "Partner's gross weekly income", def: 0, unit: '€', max: 100000 },
];
const childInputs = [
  { id: 'k', label: 'Children under 12', def: 0, options: KIDS() },
  { id: 't', label: 'Children aged 12 or over', def: 0, options: KIDS() },
];

export const WELFARE_SPECS: Record<string, MiniSpec> = {
  // ---- Hub: one set of earnings, every insurance payment side by side ----
  'welfare-finder': {
    title: 'Your weekly rate on each PRSI payment', cta: 'Full Jobseeker’s calculator',
    inputs: [{ id: 'g', label: 'Gross weekly pay before you stopped', def: 650, unit: '€', max: 100000 }, awe(600), ...childInputs],
    run: (v) => {
      const j = jprbSchedule(v.g, 300);
      const ib = graduatedRate(v.e, { ...dep(v), partner: 0 });
      return {
        head: ['Jobseeker’s Pay-Related Benefit, weeks 1 to 13', wk(j.periods[0]?.weekly ?? 0)],
        rows: [
          ['Weeks 14 to 26, then 27 to 39', `${eur(j.periods[1]?.weekly ?? 0, 2)}, ${eur(j.periods[2]?.weekly ?? 0, 2)}`],
          ['Illness Benefit, with your children', wk(ib.weekly)],
          ['Maternity or Paternity Benefit', wk(familyLeave('maternity', v.e, { ...dep(v), partner: 0 }).weekly)],
        ],
        note: 'Assumes 260 or more paid PRSI contributions and no partner. Illness and family-leave rates use 2024 earnings, as the DSP does for claims made in 2026.',
      };
    },
  },

  // ---- Jobseeker's Benefit / Pay-Related Benefit ----
  'jprb': {
    title: 'Jobseeker’s Pay-Related Benefit for a full lay-off', cta: 'Compare with Jobseeker’s Allowance',
    inputs: [
      { id: 'g', label: 'Average gross weekly pay before the job loss', def: 700, unit: '€', max: 100000 },
      { id: 'c', label: 'Paid PRSI contributions (Class A or H)', def: 300, max: 5000 },
    ],
    run: ({ g, c }) => {
      const s = jprbSchedule(g, c);
      if (!s.eligible) return { head: ['Weekly payment', eur(0)], rows: [['Paid contributions needed', num(JPRB.minPaidContributions)]], note: 'Under 104 paid contributions there is no pay-related benefit. Jobseeker’s Allowance, which is means-tested, may be paid instead.' };
      const label = (i: number, weeks: number) => `Weeks ${i * 13 + 1} to ${i * 13 + weeks}`;
      const tag = (p: { capped: boolean; floored: boolean }) => (p.capped ? ' (capped)' : p.floored ? ' (minimum)' : '');
      const rows: Array<[string, string]> = s.periods.slice(1).map((p, i) => [label(i + 1, p.weeks), `${eur(p.weekly, 2)}${tag(p)}`]);
      rows.push([`Total over ${s.weeks} weeks`, eur(s.total)]);
      const first = s.periods[0];
      return { head: [`${label(0, first.weeks)}${tag(first)}`, wk(first.weekly)], rows, note: c >= JPRB.longPaidContributions ? '260 or more paid contributions: 39 weeks in three steps.' : 'Between 104 and 259 paid contributions: 26 weeks at 50 %, capped at €300.' };
    },
  },
  'jb-parttime': {
    title: 'Jobseeker’s Benefit while working part of the week', cta: 'The means-tested alternative: Jobseeker’s Allowance',
    inputs: [awe(420), { id: 'd', label: 'Days worked this week', def: 2, options: KIDS(4).map((o) => ({ ...o, label: `${o.label} day${o.value === '1' ? '' : 's'}` })) }, ...partnerInputs, { id: 'c', label: 'Paid PRSI contributions', def: 300, max: 5000 }],
    run: (v) => {
      const r = jobseekersBenefitWeek(v.e, v.d, dep(v));
      const days = jobseekersBenefitDays(v.c);
      return {
        head: ['Jobseeker’s Benefit this week', wk(r.payable)],
        rows: [
          ['Full-week rate for your earnings', wk(r.weekly)],
          ['Personal rate band', r.full ? 'Maximum (€300 a week or more)' : `From ${eur(r.band)} a week`],
          ['Qualified adult included', eur(r.adult, 2)],
          ['Maximum duration', days ? `${days} payment days` : 'Under 104 paid contributions'],
        ],
        note: r.eligible ? 'One fifth of the weekly rate comes off for each day worked.' : 'Working four days or more: you are not unemployed for 4 days out of 7, so nothing is paid for this week.',
      };
    },
  },

  // ---- Jobseeker's Allowance ----
  'ja': {
    title: 'Jobseeker’s Allowance after the means test', cta: 'Check Jobseeker’s Pay-Related Benefit first',
    inputs: [
      { id: 'a', label: 'Age and housing', def: 0, options: [{ value: '0', label: '25 or over (or under 25 with own home)' }, { value: '1', label: '18 to 24, living with parents' }] },
      { id: 'h', label: 'Household', def: 0, options: [{ value: '0', label: 'Single' }, { value: '1', label: 'Couple, partner has no payment' }, { value: '2', label: 'Couple, partner has own payment' }] },
      { id: 'w', label: 'Your weekly earnings (after PRSI and pension)', def: 0, unit: '€', max: 100000 },
      { id: 'wd', label: 'Days you work each week', def: 0, options: KIDS(5) },
      { id: 'pw', label: "Partner's weekly earnings (after PRSI and pension)", def: 0, unit: '€', max: 100000 },
      { id: 's', label: 'Savings and property other than your home', def: 10000, unit: '€', max: 100000000 },
      ...childInputs,
    ],
    run: (v) => {
      const r = jobseekersAllowance({ ageRate: v.a as 0 | 1, household: v.h as 0 | 1 | 2, ownEarnings: v.w, ownDays: v.wd, partnerEarnings: v.pw, partnerDays: v.pw > 0 ? 5 : 0, savings: v.s, childrenUnder12: v.k, children12Plus: v.t });
      return {
        head: ['Jobseeker’s Allowance per week', wk(r.weekly)],
        rows: [['Maximum rate for your household', eur(r.maximum, 2)], ['Means from work', eur(r.ownMeans + r.partnerMeans, 2)], ['Means from savings', eur(r.capitalMeans, 2)], ['Means deducted', eur(r.means, 2)]],
        note: r.working ? 'Four or more days of work in the week: no Jobseeker’s Allowance for that week.' : 'Partner’s earnings are assessed over a five-day week (€60 disregard). Means are halved when both partners get a payment.',
      };
    },
  },
  'ja-capital': {
    title: 'What your savings cost you on a means test', cta: 'Savings in the Carer’s Allowance test',
    inputs: [{ id: 's', label: 'Savings, shares, second property (net of mortgage)', def: 45000, unit: '€', max: 100000000 }],
    run: ({ s }) => {
      const m = capitalMeans(s);
      return { head: ['Weekly means assessed', wk(m)], rows: [['Over a year', eur(m * 52)], ['First €20,000', 'Not counted'], ['Per €1,000 above €40,000', '€4 a week']], note: 'The assessment uses a standard formula whether or not the savings earn interest. Your own home is not counted.' };
    },
  },

  // ---- Illness Benefit ----
  'ib': {
    title: 'Your weekly Illness Benefit', cta: 'Compare with Jobseeker’s Benefit',
    inputs: [awe(500), ...partnerInputs, ...childInputs],
    run: (v) => {
      const r = graduatedRate(v.e, dep(v));
      return {
        head: ['Illness Benefit per week', wk(r.weekly)],
        rows: [['Personal rate', eur(r.personal, 2)], ['Increase for your partner', eur(r.adult, 2)], [`Child Support Payment (${r.childRate === 'none' ? 'none' : r.childRate + ' rate'})`, eur(r.children, 2)]],
        note: 'Rate set by your average weekly earnings in 2024, the relevant tax year for claims made in 2026. The personal rate and the partner increase are taxable; child payments are not.',
      };
    },
  },
  'ib-spell': {
    title: 'Days paid for one spell of illness', cta: 'Maternity Benefit, topped up to this rate',
    inputs: [
      { id: 'o', label: 'Days off sick, Sundays excluded', def: 12, max: 2000 },
      { id: 'sp', label: 'Statutory Sick Pay days left this year', def: 5, options: KIDS(5) },
      { id: 'c', label: 'Paid PRSI contributions', def: 300, max: 5000 },
      awe(500),
    ],
    run: (v) => {
      const s = illnessBenefitSpell(v.o, v.sp, v.c);
      const daily = graduatedRate(v.e).weekly / 6;
      return { head: ['Illness Benefit payment days', num(s.paid)], rows: [['Paid by your employer (sick pay)', `${num(s.sickPay)} days`], ['Waiting days, unpaid', `${num(s.waiting)} days`], ['Benefit for this spell, single rate', eur(s.paid * daily, 2)], ['Maximum claim', s.max ? `${num(s.max)} days` : 'Not enough contributions']], note: 'Illness Benefit is paid for six days a week; Sundays are not counted, as waiting days or as payment days.' };
    },
  },

  // ---- Maternity, Paternity, Parent's Benefit ----
  'mb': {
    title: 'Maternity, Paternity or Parent’s Benefit', cta: 'Working Family Payment alongside it',
    inputs: [
      { id: 'l', label: 'Leave', def: 0, options: [{ value: '0', label: `Maternity (${FAMILY_LEAVE.weeks.maternity} weeks)` }, { value: '1', label: `Paternity (${FAMILY_LEAVE.weeks.paternity} weeks)` }, { value: '2', label: `Parent’s leave (${FAMILY_LEAVE.weeks.parents} weeks)` }] },
      awe(550), ...partnerInputs, ...childInputs,
    ],
    run: (v) => {
      const kind = (['maternity', 'paternity', 'parents'] as const)[v.l] ?? 'maternity';
      const r = familyLeave(kind, v.e, dep(v));
      return { head: ['Weekly benefit', wk(r.weekly)], rows: [['Standard rate', eur(r.flat, 2)], ['Illness Benefit rate for your family', eur(r.illnessRate, 2)], [`Total over ${r.weeks} weeks`, eur(r.total, 2)]], note: r.toppedUp ? 'Your family’s Illness Benefit rate is higher than the standard rate, so that rate is paid instead.' : 'The standard rate applies. It is taxable, but USC and PRSI are not charged on it.' };
    },
  },
  'mb-gap': {
    title: 'The gap between your pay and Maternity Benefit', cta: 'How the Illness Benefit rate is set',
    inputs: [{ id: 's', label: 'Gross annual salary', def: 45000, unit: '€', max: 5000000 }, { id: 'w', label: 'Weeks of paid leave', def: FAMILY_LEAVE.weeks.maternity, max: 26 }],
    run: ({ s, w }) => {
      const weekly = s / 52; const gap = Math.max(0, weekly - FAMILY_LEAVE.rate);
      return { head: ['Gross pay lost per week', wk(gap)], rows: [['Your gross weekly pay', eur(weekly, 2)], ['Maternity Benefit', eur(FAMILY_LEAVE.rate, 2)], [`Over ${num(w)} weeks`, eur(gap * w)]], note: 'An employer who tops up to full pay usually asks for the benefit to be paid to it. Nothing obliges an employer to top up.' };
    },
  },

  // ---- Working Family Payment ----
  'wfp': {
    title: 'Working Family Payment from your gross pay', cta: 'Out of work instead? Jobseeker’s Allowance',
    inputs: [
      { id: 'n', label: 'Children', def: 2, options: Array.from({ length: 8 }, (_, i) => ({ value: String(i + 1), label: i === 7 ? '8 or more' : String(i + 1) })) },
      { id: 'h', label: 'Household', def: 1, options: [{ value: '0', label: 'One-parent family' }, { value: '1', label: 'Couple, one earner' }, { value: '2', label: 'Couple, two earners' }] },
      { id: 'y', label: 'Your gross annual pay', def: 32000, unit: '€', max: 5000000 },
      { id: 'q', label: "Partner's gross annual pay", def: 0, unit: '€', max: 5000000 },
    ],
    run: (v) => {
      const income = wfpIncomeFromGross(v.h as 0 | 1 | 2, v.y, v.h === 2 ? v.q : 0);
      const r = workingFamilyPayment(v.n, income);
      return { head: ['Working Family Payment per week', wk(r.weekly)], rows: [['Assessable family income', wk(income)], ['Income limit for your family', wk(r.limit)], ['Over 52 weeks', eur(r.weekly * 52)]], note: r.eligible ? (r.floor ? 'The €20 weekly minimum applies.' : '60 % of the gap between the limit and your income. Paid for 52 weeks, tax-free.') : 'Income at or above the limit for your family size: no payment.' };
    },
  },
  'wfp-net': {
    title: 'Working Family Payment from net weekly income', cta: 'WFP continues with Maternity Benefit',
    inputs: [{ id: 'n', label: 'Children', def: 1, options: Array.from({ length: 8 }, (_, i) => ({ value: String(i + 1), label: i === 7 ? '8 or more' : String(i + 1) })) }, { id: 'i', label: 'Family income after tax, PRSI, USC, pension', def: 600, unit: '€', max: 100000 }],
    run: ({ n, i }) => {
      const r = workingFamilyPayment(n, i);
      return { head: ['Weekly payment', wk(r.weekly)], rows: [['Limit', eur(wfpLimit(n))], ['Gap below the limit', eur(r.gap, 2)]] };
    },
  },

  // ---- Carer's Allowance ----
  'ca': {
    title: 'Your Carer’s Allowance after the means test', cta: 'How savings are assessed',
    inputs: [
      { id: 'o', label: 'Your age', def: 0, options: [{ value: '0', label: 'Under 66' }, { value: '1', label: '66 or over' }] },
      { id: 'two', label: 'Caring for', def: 0, options: [{ value: '0', label: 'One person' }, { value: '1', label: 'Two or more people' }] },
      { id: 'c', label: 'Household', def: 1, options: [{ value: '0', label: 'Single' }, { value: '1', label: 'Couple' }] },
      { id: 'i', label: 'Household weekly income after PRSI and pension', def: 1500, unit: '€', max: 100000 },
      { id: 's', label: 'Savings and property other than the home', def: 20000, unit: '€', max: 100000000 },
      ...childInputs,
    ],
    run: (v) => {
      const r = carersAllowance({ over66: v.o === 1, caringForTwoOrMore: v.two === 1, couple: v.c === 1, weeklyIncome: v.i, capital: v.s, childrenUnder12: v.k, children12Plus: v.t });
      return { head: ['Carer’s Allowance per week', wk(r.weekly)], rows: [['Maximum personal rate', eur(r.maximum, 2)], ['Weekly means assessed', eur(r.means, 2)], ['Personal rate after means', eur(r.personal, 2)], ['Child Support Payment', eur(r.children, 2)]], note: `Income disregard of ${eur(r.disregard)} a week from ${new Intl.DateTimeFormat('en-IE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(CA.disregardFrom + 'T12:00:00Z'))}. The rate falls by €2.50 for each €2.50 of means, or part of it, above €7.60.` };
    },
  },
  'ca-capital': {
    title: 'Savings in the Carer’s Allowance means test', cta: 'Full Carer’s Allowance calculator',
    inputs: [{ id: 's', label: 'Savings and property other than the home', def: 150000, unit: '€', max: 100000000 }, { id: 'c', label: 'Couple', def: 1, options: YES_NO }],
    run: ({ s, c }) => {
      const m = carerCapitalMeans(s, c === 1);
      return { head: ['Weekly means from capital', wk(m)], rows: [['Disregarded', c === 1 ? 'First €50,000 each, after halving' : 'First €50,000'], ['Reduction in Carer’s Allowance', `about ${eur(Math.ceil(m / CA.step) * CA.step, 2)}`]], note: 'For a couple, half the means are assessed against the carer, after the weekly income disregard.' };
    },
  },

  // ---- State Pension (Contributory) ----
  'spc': {
    title: 'Your State Pension (Contributory)', cta: 'Caring years count: Carer’s Allowance',
    inputs: [
      { id: 'p', label: 'Paid PRSI contributions (incl. voluntary)', def: 1560, max: 5000 },
      { id: 'c', label: 'Credited contributions', def: 200, max: 5000 },
      { id: 'h', label: 'HomeCaring periods (weeks)', def: 0, max: 5000 },
      { id: 'y', label: 'Years from first PRSI to the last full tax year', def: 40, max: 70 },
      { id: 'yr', label: 'Year you draw the pension', def: 2026, options: [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034].map((x) => ({ value: String(x), label: String(x) })) },
      { id: 'a', label: 'Age you draw it', def: 66, options: [66, 67, 68, 69, 70].map((x) => ({ value: String(x), label: String(x) })) },
    ],
    run: (v) => {
      const r = statePension({ paid: v.p, credits: v.c, homeCaring: v.h, years: v.y, drawdownAge: v.a, drawdownYear: v.yr });
      if (!r.eligible) return { head: ['Weekly pension', eur(0)], rows: [['Paid contributions needed', num(SPC.minPaid)]], note: 'Below 520 paid contributions there is no contributory pension. Working on to 70, or the means-tested non-contributory pension, may help.' };
      return { head: ['State Pension per week', wk(r.weekly)], rows: [[`Total Contributions Approach (${pct(r.tcaPercent / 100)})`, eur(r.tcaRate, 2)], [`Yearly average ${num(r.average)}: ${pct(r.share, 0)} of ${eur(r.yaRate, 2)} + ${pct(1 - r.share, 0)} of TCA`, eur(r.combined, 2)], ['Method paid', r.method === 'tca' ? 'Total Contributions Approach' : 'Combined approach'], ['Before any deferral increase', eur(r.atSixtySix, 2)]] };
    },
  },
  'spc-defer': {
    title: 'Drawing the pension at 66 or later', cta: 'Private pension tax relief',
    inputs: [{ id: 'a', label: 'Age you draw it', def: 70, options: [67, 68, 69, 70].map((x) => ({ value: String(x), label: String(x) })) }, { id: 'r', label: 'Your weekly rate if drawn at 66', def: SPC.max, unit: '€', max: 100000, decimals: 2 }],
    run: ({ a, r }) => {
      // The actuarial increase is reduced in proportion to the share of the maximum rate (SW19).
      const at66 = Math.min(r, SPC.max); const later = SPC.byAge[a] * (at66 / SPC.max);
      const forgone = at66 * 52 * (a - 66); const extra = (later - at66) * 52;
      return { head: [`Weekly pension from ${a}`, wk(later)], rows: [['At 66', eur(at66, 2)], ['Pension forgone by waiting', eur(forgone)], ['Years to recover it', extra > 0 ? new Intl.NumberFormat('en-IE', { maximumFractionDigits: 1 }).format(forgone / extra) : 'n/a']], note: 'Current rates, ignoring tax and future Budget increases, which apply to both options.' };
    },
  },

  // ---- Stamp Duty ----
  'stamp': {
    title: 'Stamp Duty on a home in Ireland', cta: 'Help to Buy on a new home',
    inputs: [
      { id: 'v', label: 'Purchase price', def: 450000, unit: '€', max: 100000000 },
      { id: 'b', label: 'Property', def: 0, options: [{ value: '0', label: 'Second-hand home' }, { value: '1', label: 'New home, price includes 13.5 % VAT' }, { value: '2', label: 'New home, price excludes VAT' }] },
      { id: 'ab', label: 'Three or more apartments in one block', def: 0, options: YES_NO },
    ],
    run: ({ v, b, ab }) => {
      const r = stampDuty(v, (['secondHand', 'newInclVat', 'newExclVat'] as const)[b] ?? 'secondHand', ab === 1);
      const rows: Array<[string, string]> = [['Price used for the duty', eur(r.consideration)]];
      r.slices.filter((s) => s.amount > 0).forEach((s) => rows.push([`${pct(s.rate, 0)} on ${eur(s.amount)}`, eur(s.duty)]));
      rows.push(['Effective rate on the price paid', pct(r.effective)]);
      return { head: ['Stamp Duty payable', eur(r.duty)], rows, note: b === 1 ? `VAT taken out first: ${eur(v)} ÷ ${1 + STAMP_DUTY.newHomeVat}.` : undefined };
    },
  },
  'stamp-htb': {
    title: 'New home: Stamp Duty and Help to Buy together', cta: 'Full Help to Buy calculator',
    inputs: [{ id: 'v', label: 'Price of the new home, VAT included', def: 420000, unit: '€', max: 100000000 }, { id: 't', label: 'Income tax and DIRT paid in the last 4 years', def: 40000, unit: '€', max: 10000000 }],
    run: ({ v, t }) => {
      const d = stampDuty(v, 'newInclVat').duty; const h = helpToBuy(v, v * 0.9, t).amount;
      return { head: ['Help to Buy minus Stamp Duty', eur(h - d)], rows: [['Stamp Duty', eur(d)], ['Help to Buy refund (90 % mortgage)', eur(h)]], note: v > HTB.priceCap ? 'Above €500,000 the home does not qualify for Help to Buy.' : undefined };
    },
  },

  // ---- Help to Buy ----
  'htb': {
    title: 'Your Help to Buy refund', cta: 'Stamp Duty on the same home',
    inputs: [
      { id: 'v', label: 'Price of the new home (or approved valuation)', def: 400000, unit: '€', max: 100000000 },
      { id: 'm', label: 'Mortgage amount', def: 320000, unit: '€', max: 100000000 },
      { id: 't', label: 'Income tax and DIRT paid over the last 4 years', def: 36000, unit: '€', max: 10000000 },
    ],
    run: ({ v, m, t }) => {
      const r = helpToBuy(v, m, t);
      const why = { price: `Price above ${eur(HTB.priceCap)}: not a qualifying home.`, mortgage: `Mortgage at ${pct(r.ltv, 1)} of the price: at least ${pct(HTB.minLtv, 0)} is required.`, cap: 'Capped at €30,000 per property, however many buyers.', tenPercent: 'Limited to 10 % of the price.', tax: 'Limited to the income tax and DIRT you paid.' }[r.binding];
      return { head: ['Help to Buy refund', eur(r.amount)], rows: [['Ceiling', eur(r.limits.cap)], ['10 % of the price', eur(r.limits.tenPercent)], ['Your tax over 4 years', eur(r.limits.tax)], ['Loan to value', pct(r.ltv, 1)]], note: why };
    },
  },
  'htb-tax': {
    title: 'Tax needed for the full Help to Buy', cta: 'Back to the Help to Buy calculator',
    inputs: [{ id: 'v', label: 'Price of the new home', def: 350000, unit: '€', max: 100000000 }, { id: 'b', label: 'Buyers', def: 2, options: [{ value: '1', label: 'One' }, { value: '2', label: 'Two' }] }],
    run: ({ v, b }) => {
      const r = helpToBuy(v, v, 0);
      return { head: ['Income tax + DIRT needed over 4 years', eur(r.taxForFull)], rows: [['Per buyer, split evenly', eur(r.taxForFull / Math.max(1, b))], ['Per buyer per year', eur(r.taxForFull / Math.max(1, b) / HTB.taxYears)], ['Minimum mortgage (70 %)', eur(v * HTB.minLtv)]], note: v > HTB.priceCap ? 'Above €500,000: no Help to Buy at all.' : 'USC and PRSI do not count: only income tax and DIRT.' };
    },
  },
};
