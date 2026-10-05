/**
 * Social welfare, Stamp Duty and Help to Buy engine (2026).
 *
 * Pure functions over `welfare-2026.ts`. Each rule is the one the paying body
 * applies (Department of Social Protection, Revenue), as published in the
 * sources named there. The pages and the calculators call these functions and
 * never recompute a rate on their own.
 */
import {
  CHILD_SUPPORT, GRADUATED_BANDS, NOTIONAL_WEEKLY_EARNINGS, IQA_FULL, IQA_REDUCED, IQA_LIMIT, CSP_HALF_LIMIT,
  JB, JPRB, JA, IB, FAMILY_LEAVE, WFP, CA, SPC, STAMP_DUTY, HTB,
} from './welfare-2026';
import { calculateSalary } from './engine';

const r2 = (x: number) => Math.round(x * 100) / 100;

// --- Dependants -------------------------------------------------------------

export interface Dependants {
  /** 0 = no spouse, civil partner or cohabitant; 1 = one, with the gross weekly income below. */
  partner: 0 | 1;
  partnerIncome: number;
  childrenUnder12: number;
  children12Plus: number;
}
export const NO_DEPENDANTS: Dependants = { partner: 0, partnerIncome: 0, childrenUnder12: 0, children12Plus: 0 };

/** Increase for a Qualified Adult from the SW19 taper table. */
export function qualifiedAdult(partnerIncome: number, reducedPersonalRate: boolean): number {
  if (partnerIncome > IQA_LIMIT) return 0;
  const table = reducedPersonalRate ? IQA_REDUCED : IQA_FULL;
  return (table.find((row) => partnerIncome <= row.upTo) ?? table[table.length - 1]).amount;
}

/** Child Support Payment: full with a qualified adult or when parenting alone, half up to €400 of partner income, none above. */
export function childSupport(d: Dependants): { amount: number; rate: 'full' | 'half' | 'none' } {
  const kids = d.childrenUnder12 * CHILD_SUPPORT.under12 + d.children12Plus * CHILD_SUPPORT.over12;
  if (kids === 0) return { amount: 0, rate: 'none' };
  if (d.partner === 0 || d.partnerIncome <= IQA_LIMIT) return { amount: kids, rate: 'full' };
  if (d.partnerIncome <= CSP_HALF_LIMIT) return { amount: kids / 2, rate: 'half' };
  return { amount: 0, rate: 'none' };
}

// --- Jobseeker's Benefit and Illness Benefit: graduated rates ---------------

export function graduatedBand(averageWeeklyEarnings: number) {
  const awe = Math.max(averageWeeklyEarnings, NOTIONAL_WEEKLY_EARNINGS);
  return GRADUATED_BANDS.find((b) => awe >= b.from) ?? GRADUATED_BANDS[GRADUATED_BANDS.length - 1];
}

export interface GraduatedResult { personal: number; adult: number; children: number; childRate: 'full' | 'half' | 'none'; weekly: number; band: number; full: boolean }

/** Weekly Jobseeker's Benefit or Illness Benefit for a full week of unemployment or illness. */
export function graduatedRate(averageWeeklyEarnings: number, d: Dependants = NO_DEPENDANTS): GraduatedResult {
  const band = graduatedBand(averageWeeklyEarnings);
  const full = band.personal === GRADUATED_BANDS[0].personal;
  const adult = d.partner ? Math.min(band.adult, qualifiedAdult(d.partnerIncome, !full)) : 0;
  const cs = childSupport(d);
  return { personal: band.personal, adult, children: cs.amount, childRate: cs.rate, weekly: r2(band.personal + adult + cs.amount), band: band.from, full };
}

/** Jobseeker's Benefit when working part of the week: one fifth of the weekly rate comes off for each day worked. */
export function jobseekersBenefitWeek(averageWeeklyEarnings: number, daysWorked: number, d: Dependants = NO_DEPENDANTS) {
  const g = graduatedRate(averageWeeklyEarnings, d);
  const days = Math.max(0, Math.floor(daysWorked));
  const eligible = days <= 3; // must be unemployed for at least 4 days out of 7
  const share = eligible ? Math.max(0, JB.workWeekDays - days) / JB.workWeekDays : 0;
  return { ...g, daysWorked: days, eligible, payable: r2(g.weekly * share) };
}

/** Maximum duration of Jobseeker's Benefit, in payment days. */
export function jobseekersBenefitDays(paidContributions: number): number {
  if (paidContributions < JB.minPaidContributions) return 0;
  return paidContributions >= JB.longPaidContributions ? JB.daysLong : JB.daysShort;
}

// --- Jobseeker's Pay-Related Benefit -----------------------------------------

export interface JprbPeriod { weeks: number; weekly: number; capped: boolean; floored: boolean }

/** JPRB schedule from gross average weekly earnings and paid PRSI contributions. */
export function jprbSchedule(grossWeeklyEarnings: number, paidContributions: number) {
  if (paidContributions < JPRB.minPaidContributions) return { eligible: false, periods: [] as JprbPeriod[], weeks: 0, total: 0 };
  const plan = paidContributions >= JPRB.longPaidContributions ? JPRB.long : JPRB.short;
  const periods = plan.map((p) => {
    const raw = grossWeeklyEarnings * p.rate;
    const weekly = Math.max(JPRB.minimum, Math.min(p.cap, raw));
    return { weeks: p.weeks, weekly: r2(weekly), capped: raw > p.cap, floored: raw < JPRB.minimum };
  });
  const weeks = periods.reduce((s, p) => s + p.weeks, 0);
  return { eligible: true, periods, weeks, total: r2(periods.reduce((s, p) => s + p.weeks * p.weekly, 0)) };
}

// --- Jobseeker's Allowance ------------------------------------------------------

/** Weekly means from capital (not the home), Jobseeker's Allowance scale. */
export function capitalMeans(capital: number, bands: ReadonlyArray<{ from: number; to: number; perThousand: number }> = JA.capitalBands): number {
  let m = 0;
  for (const b of bands) {
    if (capital <= b.from) break;
    const slice = Math.min(capital, b.to) - b.from;
    m += Math.floor(slice / 1000) * b.perThousand;
  }
  return m;
}

/** Weekly means from employment: €20 a day disregarded (three days at most), 60 % of the balance counted. */
export function meansFromWork(weeklyEarnings: number, daysWorked: number): number {
  if (weeklyEarnings <= 0) return 0;
  const disregard = JA.dailyDisregard * Math.min(Math.max(0, daysWorked), JA.maxDisregardDays);
  return r2(Math.max(0, weeklyEarnings - disregard) * JA.earningsTaper);
}

export interface JaInput {
  /** 0 = 25 or over (or under 25 living independently with housing support, or with children); 1 = 18-24 living at home. */
  ageRate: 0 | 1;
  /** 0 = single; 1 = partner with no social welfare payment of their own; 2 = partner on their own payment. */
  household: 0 | 1 | 2;
  ownEarnings: number;
  ownDays: number;
  partnerEarnings: number;
  partnerDays: number;
  savings: number;
  childrenUnder12: number;
  children12Plus: number;
}

export function jobseekersAllowance(i: JaInput) {
  const kids = i.childrenUnder12 + i.children12Plus;
  const reduced = i.ageRate === 1 && kids === 0;
  const personal = reduced ? JA.personalUnder25 : JA.personal;
  const adult = i.household === 1 ? (reduced ? JA.adultUnder25 : JA.adult) : 0;
  const childFull = i.childrenUnder12 * CHILD_SUPPORT.under12 + i.children12Plus * CHILD_SUPPORT.over12;
  // Child Support Payment: full with a qualified adult or when parenting alone, half when the partner has a payment of their own.
  const children = i.household === 2 ? childFull / 2 : childFull;
  const maximum = r2(personal + adult + children);
  const working = i.ownDays > JA.maxDaysWorked;
  const own = meansFromWork(i.ownEarnings, i.ownDays);
  const partner = i.household === 0 ? 0 : meansFromWork(i.partnerEarnings, i.partnerDays);
  const capital = capitalMeans(i.savings);
  const combined = own + partner + capital;
  // A couple who both claim: half of the combined means is assessed against each claim.
  const means = r2(i.household === 2 ? combined / 2 : combined);
  const weekly = working ? 0 : r2(Math.max(0, maximum - means));
  return { personal, adult, children, maximum, ownMeans: own, partnerMeans: partner, capitalMeans: capital, means, weekly, working };
}

// --- Illness Benefit -----------------------------------------------------------

export function illnessBenefitDays(paidContributions: number): number {
  if (paidContributions < IB.minPaidContributions) return 0;
  return paidContributions >= IB.longPaidContributions ? IB.daysLong : IB.daysShort;
}

/**
 * Days of Illness Benefit paid for one spell of illness, counted in payment days
 * (six a week, Sunday excluded). With Statutory Sick Pay still available, the
 * employer pays the first five days and Illness Benefit starts on day six; once
 * it is used up, the three waiting days apply.
 */
export function illnessBenefitSpell(daysOff: number, sickPayDaysLeft: number, paidContributions: number) {
  const max = illnessBenefitDays(paidContributions);
  const sickPay = Math.min(Math.max(0, sickPayDaysLeft), IB.statutorySickPayDays, daysOff);
  const waiting = sickPay > 0 ? 0 : Math.min(IB.waitingDays, daysOff);
  const paid = Math.min(max, Math.max(0, daysOff - sickPay - waiting));
  return { sickPay, waiting, paid, max };
}

// --- Maternity, Paternity and Parent's Benefit ----------------------------------

export type LeaveKind = 'maternity' | 'paternity' | 'parents';

/** The flat rate, or the Illness Benefit rate the person would get if that is higher. */
export function familyLeave(kind: LeaveKind, averageWeeklyEarnings: number, d: Dependants = NO_DEPENDANTS) {
  const ib = graduatedRate(averageWeeklyEarnings, d);
  const weekly = Math.max(FAMILY_LEAVE.rate, ib.weekly);
  const weeks = FAMILY_LEAVE.weeks[kind];
  return { flat: FAMILY_LEAVE.rate, illnessRate: ib.weekly, weekly: r2(weekly), weeks, total: r2(weekly * weeks), toppedUp: ib.weekly > FAMILY_LEAVE.rate };
}

// --- Working Family Payment -----------------------------------------------------

export function wfpLimit(children: number): number {
  const n = Math.min(Math.max(1, Math.floor(children)), WFP.limits.length);
  return WFP.limits[n - 1];
}

/** Weekly WFP from weekly assessable family income (gross pay less tax, PRSI, USC and pension). */
export function workingFamilyPayment(children: number, weeklyIncome: number) {
  const limit = wfpLimit(children);
  if (children < 1 || weeklyIncome >= limit) return { limit, gap: 0, weekly: 0, eligible: false, floor: false };
  const raw = (limit - weeklyIncome) * WFP.rate;
  return { limit, gap: r2(limit - weeklyIncome), weekly: r2(Math.max(WFP.minimum, raw)), eligible: true, floor: raw < WFP.minimum };
}

/**
 * Weekly assessable income from gross annual pay, with the site's tax engine.
 * household: 0 = single parent, 1 = couple with one earner, 2 = couple with two earners
 * (each spouse is taxed on their own pay, which at the incomes WFP covers gives the
 * same tax as joint assessment: both incomes stay below the standard rate cut-off).
 */
export function wfpIncomeFromGross(household: 0 | 1 | 2, yourGross: number, partnerGross: number, pensionRate = 0): number {
  const net = (g: number, st: 'single' | 'single_parent' | 'married_one_income') => (g > 0 ? calculateSalary({ grossAnnual: g, filingStatus: st, pensionRate, additionalCredits: 0 }).netAnnual : 0);
  const annual = household === 0 ? net(yourGross, 'single_parent')
    : household === 1 ? net(yourGross, 'married_one_income')
    : net(yourGross, 'single') + net(partnerGross, 'single');
  return r2(annual / 52);
}

// --- Carer's Allowance ------------------------------------------------------------

export interface CarerInput {
  over66: boolean;
  caringForTwoOrMore: boolean;
  couple: boolean;
  /** Household weekly income from work, after PRSI, pension contributions and union dues. */
  weeklyIncome: number;
  /** Household savings and property other than the home. */
  capital: number;
  childrenUnder12: number;
  children12Plus: number;
}

/** Weekly means from capital for Carer's Allowance; a couple's capital is halved, assessed, then doubled. */
export function carerCapitalMeans(capital: number, couple: boolean): number {
  return couple ? capitalMeans(capital / 2, CA.capitalBands) * 2 : capitalMeans(capital, CA.capitalBands);
}

export function carersAllowance(i: CarerInput) {
  const rates = i.over66 ? CA.over66 : CA.under66;
  const maximum = i.caringForTwoOrMore ? rates.twoOrMore : rates.one;
  const capital = carerCapitalMeans(i.capital, i.couple);
  const total = i.weeklyIncome + capital;
  const disregard = i.couple ? CA.disregardCouple : CA.disregardSingle;
  const means = r2(Math.max(0, total - disregard) / (i.couple ? 2 : 1));
  const steps = means <= CA.fullRateMeans ? 0 : Math.ceil(Math.round(((means - CA.fullRateMeans) / CA.step) * 1e6) / 1e6);
  const personal = r2(Math.max(0, maximum - steps * CA.step));
  const childFull = i.childrenUnder12 * CHILD_SUPPORT.under12 + i.children12Plus * CHILD_SUPPORT.over12;
  const children = personal > 0 ? (i.couple ? childFull / 2 : childFull) : 0;
  return { maximum, capitalMeans: capital, disregard, means, personal, children, weekly: r2(personal + children) };
}

// --- State Pension (Contributory) -------------------------------------------------

export interface PensionInput {
  /** Reckonable paid contributions (employment, self-employment, voluntary). */
  paid: number;
  credits: number;
  homeCaring: number;
  /** Years from entry into insurance to the last complete tax year before drawdown, less full Homemaker's years. */
  years: number;
  drawdownAge: number;
  drawdownYear: number;
}

export function yearlyAverageRate(average: number): number {
  return (SPC.yaBands.find((b) => average >= b.from) ?? { rate: 0 }).rate;
}

export function statePension(i: PensionInput) {
  const eligible = i.paid >= SPC.minPaid;
  const credits = Math.min(Math.max(0, i.credits), SPC.maxCredits);
  const homeCaring = Math.min(Math.max(0, i.homeCaring), SPC.maxHomeCaring, SPC.maxCreditsAndHomeCaring - credits);
  const tcaTotal = i.paid + credits + homeCaring;
  // gov.ie worked example: 1,817 ÷ 2,080 = 0.8735, i.e. 87.35 %: the ratio is cut at four decimals, not rounded.
  const tcaPercent = Math.min(100, Math.floor((tcaTotal / SPC.tcaFull) * 10000 + 1e-9) / 100);
  const tcaRate = r2((tcaPercent / 100) * SPC.max);
  // Yearly average: all paid and credited contributions over the years in insurance, rounded half up.
  const average = i.years > 0 ? Math.floor((i.paid + Math.max(0, i.credits)) / i.years + 0.5) : 0;
  const yaRate = yearlyAverageRate(average);
  const share = i.drawdownYear >= 2034 ? 0 : (SPC.yaShare[i.drawdownYear] ?? 0);
  const combined = r2(share * yaRate + (1 - share) * tcaRate);
  const atSixtySix = eligible ? Math.max(tcaRate, combined) : 0;
  const age = Math.min(70, Math.max(66, Math.floor(i.drawdownAge)));
  const factor = SPC.byAge[age] / SPC.max;
  return { eligible, tcaTotal, tcaPercent, tcaRate, average, yaRate, share, combined, method: tcaRate >= combined ? 'tca' as const : 'combined' as const, atSixtySix: r2(atSixtySix), weekly: r2(atSixtySix * factor), age, factor };
}

// --- Stamp Duty -------------------------------------------------------------------

export type PriceBasis = 'secondHand' | 'newInclVat' | 'newExclVat';

export function stampDuty(price: number, basis: PriceBasis = 'secondHand', apartmentBlock = false) {
  const consideration = basis === 'newInclVat' ? r2(price / (1 + STAMP_DUTY.newHomeVat)) : price;
  const bands = apartmentBlock ? STAMP_DUTY.apartmentBlockBands : STAMP_DUTY.bands;
  let previous = 0;
  const slices = bands.map((b) => {
    const amount = Math.max(0, Math.min(consideration, b.upTo) - previous);
    previous = b.upTo;
    return { rate: b.rate, amount: r2(amount), duty: r2(amount * b.rate) };
  });
  const duty = r2(slices.reduce((s, x) => s + x.duty, 0));
  return { consideration, slices, duty, effective: price > 0 ? duty / price : 0 };
}

// --- Help to Buy --------------------------------------------------------------------

export function helpToBuy(price: number, mortgage: number, taxPaidFourYears: number) {
  const priceOk = price > 0 && price <= HTB.priceCap;
  const ltv = price > 0 ? mortgage / price : 0;
  const ltvOk = ltv >= HTB.minLtv;
  const tenPercent = r2(price * HTB.priceShare);
  const limits = { cap: HTB.max, tenPercent, tax: Math.max(0, taxPaidFourYears) };
  const amount = priceOk && ltvOk ? Math.min(limits.cap, limits.tenPercent, limits.tax) : 0;
  const binding = !priceOk ? 'price' : !ltvOk ? 'mortgage' : amount === limits.cap ? 'cap' : amount === limits.tenPercent ? 'tenPercent' : 'tax';
  return { amount: r2(amount), ltv, priceOk, ltvOk, limits, binding, taxForFull: Math.min(HTB.max, tenPercent) };
}
