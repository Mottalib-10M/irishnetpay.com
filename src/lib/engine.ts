/**
 * Irish Salary Calculator Engine
 * Calculates: Income Tax, USC, PRSI, Tax Credits
 */

import {
  type FilingStatus,
  STANDARD_RATE,
  HIGHER_RATE,
  SRCOP,
  TAX_CREDITS,
  USC_BANDS,
  USC_EXEMPTION,
  PRSI_RATE,
  PRSI_RATE_OCT_DEC,
  MARRIED_BASE_BAND,
  MARRIED_TWO_INCOMES_INCREASE_MAX,
  PRSI_WEEKLY_THRESHOLD,
  PRSI_CREDIT_MAX,
  PRSI_CREDIT_TAPER_START,
  PRSI_CREDIT_TAPER_END,
  EMPLOYER_PRSI_RATE_LOW,
  EMPLOYER_PRSI_RATE_HIGH,
  EMPLOYER_PRSI_WEEKLY_THRESHOLD,
} from './tax-rates-2026';

// --- Types ---

export interface SalaryInput {
  /** Gross annual salary in € */
  grossAnnual: number;
  /** Filing status */
  filingStatus: FilingStatus;
  /** Pension contribution rate (% of gross) */
  pensionRate: number;
  /** Additional tax credits (annual) */
  additionalCredits: number;
  /** Married, two incomes: the spouse's gross annual income. Left out, this salary is taken as the higher of the two. */
  spouseIncome?: number;
  /** Married, one income: the spouse at home cares for a dependent person (Home Carer Tax Credit). */
  homeCarer?: boolean;
}

export interface SalaryResult {
  // Annual amounts
  grossAnnual: number;
  pensionContribution: number;
  taxableIncome: number;
  /** Income taxed at 20% for this salary (standard rate cut-off point) */
  standardRateBand: number;
  incomeTaxGross: number;
  taxCreditsTotal: number;
  incomeTaxNet: number;
  usc: number;
  prsi: number;
  totalDeductions: number;
  netAnnual: number;

  // Monthly amounts
  grossMonthly: number;
  netMonthly: number;
  incomeTaxMonthly: number;
  uscMonthly: number;
  prsiMonthly: number;
  pensionMonthly: number;

  // Weekly amounts
  grossWeekly: number;
  netWeekly: number;

  // Effective rates
  effectiveTaxRate: number;
  effectiveUSCRate: number;
  effectivePRSIRate: number;
  effectiveTotalRate: number;
  marginalRate: number;

  // Employer cost
  employerPRSI: number;
  totalEmployerCost: number;

  // Info
  filingStatus: FilingStatus;
}

// --- Income Tax ---

/**
 * Cut-off point of this salary. Married with two incomes: the higher earner uses the €53,000 base band; the lower
 * earner uses the €35,000 increase (capped by law at their own income, which the band cannot exceed anyway) plus any
 * part of the €53,000 the higher earner leaves unused.
 */
export function standardRateBand(grossAnnual: number, filingStatus: FilingStatus, spouseIncome?: number): number {
  if (filingStatus !== 'married_two_incomes') return SRCOP[filingStatus];
  if (spouseIncome === undefined || grossAnnual >= spouseIncome) return MARRIED_BASE_BAND;
  return MARRIED_TWO_INCOMES_INCREASE_MAX + Math.max(0, MARRIED_BASE_BAND - spouseIncome);
}

function calculateIncomeTax(taxableIncome: number, cutoff: number): number {
  const atStandardRate = Math.min(taxableIncome, cutoff);
  const atHigherRate = Math.max(0, taxableIncome - cutoff);

  return atStandardRate * STANDARD_RATE + atHigherRate * HIGHER_RATE;
}

function getTaxCredits(filingStatus: FilingStatus, additionalCredits: number, homeCarer: boolean): number {
  let credits = 0;

  if (filingStatus === 'married_one_income' || filingStatus === 'married_two_incomes') {
    credits += TAX_CREDITS.personal_married;
  } else {
    credits += TAX_CREDITS.personal_single;
  }

  credits += TAX_CREDITS.employee_paye;

  if (filingStatus === 'single_parent') {
    credits += TAX_CREDITS.single_parent;
  }

  if (filingStatus === 'married_one_income' && homeCarer) {
    credits += TAX_CREDITS.home_carer;
  }

  credits += additionalCredits;

  return credits;
}

// --- USC ---

function calculateUSC(grossAnnual: number): number {
  if (grossAnnual <= USC_EXEMPTION) return 0;

  let usc = 0;
  let remaining = grossAnnual;
  let previous = 0;

  for (const band of USC_BANDS) {
    const bandAmount = Math.min(remaining, band.max - previous);
    if (bandAmount <= 0) break;
    usc += bandAmount * band.rate;
    remaining -= bandAmount;
    previous = band.max;
    if (remaining <= 0) break;
  }

  return Math.round(usc * 100) / 100;
}

// --- PRSI ---

function calculatePRSI(grossAnnual: number): number {
  const weeklyIncome = grossAnnual / 52;

  if (weeklyIncome <= PRSI_WEEKLY_THRESHOLD) return 0;

  const annualPRSI = grossAnnual * PRSI_RATE;

  // PRSI credit for low earners (tapered)
  if (weeklyIncome >= PRSI_CREDIT_TAPER_START && weeklyIncome <= PRSI_CREDIT_TAPER_END) {
    const taper = (weeklyIncome - PRSI_CREDIT_TAPER_START) / (PRSI_CREDIT_TAPER_END - PRSI_CREDIT_TAPER_START);
    const weeklyCredit = PRSI_CREDIT_MAX * (1 - taper);
    const annualCredit = weeklyCredit * 52;
    return Math.max(0, Math.round((annualPRSI - annualCredit) * 100) / 100);
  }

  return Math.round(annualPRSI * 100) / 100;
}

// --- Employer PRSI ---

function calculateEmployerPRSI(grossAnnual: number): number {
  const weeklyIncome = grossAnnual / 52;
  const rate = weeklyIncome <= EMPLOYER_PRSI_WEEKLY_THRESHOLD
    ? EMPLOYER_PRSI_RATE_LOW
    : EMPLOYER_PRSI_RATE_HIGH;
  return Math.round(grossAnnual * rate * 100) / 100;
}

// --- Marginal rate ---

/** Rate on the next euro earned today: PRSI at the rate in force since 1 October 2026, not the yearly average. */
function calculateMarginalRate(taxableIncome: number, cutoff: number): number {
  const incomeTaxMarginal = taxableIncome > cutoff ? HIGHER_RATE : STANDARD_RATE;

  // USC marginal rate
  let uscMarginal = 0;
  for (const band of USC_BANDS) {
    if (taxableIncome <= band.max) {
      uscMarginal = band.rate;
      break;
    }
  }

  return incomeTaxMarginal + uscMarginal + PRSI_RATE_OCT_DEC;
}

// --- Main calculation ---

export function calculateSalary(input: SalaryInput): SalaryResult {
  const { grossAnnual, filingStatus, pensionRate, additionalCredits, spouseIncome, homeCarer = false } = input;
  const band = standardRateBand(grossAnnual, filingStatus, spouseIncome);

  // Pension contribution
  const pensionContribution = Math.round(grossAnnual * pensionRate * 100) / 100;

  // Taxable income (after pension deduction)
  const taxableIncome = Math.max(0, grossAnnual - pensionContribution);

  // Income Tax
  const incomeTaxGross = Math.round(calculateIncomeTax(taxableIncome, band) * 100) / 100;
  const taxCreditsTotal = getTaxCredits(filingStatus, additionalCredits, homeCarer);
  const incomeTaxNet = Math.max(0, Math.round((incomeTaxGross - taxCreditsTotal) * 100) / 100);

  // USC (on gross, not reduced by pension for occupational pension)
  const usc = calculateUSC(grossAnnual);

  // PRSI
  const prsi = calculatePRSI(grossAnnual);

  // Total deductions
  const totalDeductions = pensionContribution + incomeTaxNet + usc + prsi;
  const netAnnual = Math.round((grossAnnual - totalDeductions) * 100) / 100;

  // Monthly/Weekly
  const grossMonthly = Math.round(grossAnnual / 12 * 100) / 100;
  const netMonthly = Math.round(netAnnual / 12 * 100) / 100;
  const grossWeekly = Math.round(grossAnnual / 52 * 100) / 100;
  const netWeekly = Math.round(netAnnual / 52 * 100) / 100;

  // Effective rates
  const effectiveTaxRate = grossAnnual > 0 ? incomeTaxNet / grossAnnual : 0;
  const effectiveUSCRate = grossAnnual > 0 ? usc / grossAnnual : 0;
  const effectivePRSIRate = grossAnnual > 0 ? prsi / grossAnnual : 0;
  const effectiveTotalRate = grossAnnual > 0 ? totalDeductions / grossAnnual : 0;

  // Marginal rate
  const marginalRate = calculateMarginalRate(taxableIncome, band);

  // Employer cost
  const employerPRSI = calculateEmployerPRSI(grossAnnual);
  const totalEmployerCost = Math.round((grossAnnual + employerPRSI) * 100) / 100;

  return {
    grossAnnual,
    pensionContribution,
    taxableIncome,
    standardRateBand: band,
    incomeTaxGross,
    taxCreditsTotal,
    incomeTaxNet,
    usc,
    prsi,
    totalDeductions: Math.round(totalDeductions * 100) / 100,
    netAnnual,
    grossMonthly,
    netMonthly,
    incomeTaxMonthly: Math.round(incomeTaxNet / 12 * 100) / 100,
    uscMonthly: Math.round(usc / 12 * 100) / 100,
    prsiMonthly: Math.round(prsi / 12 * 100) / 100,
    pensionMonthly: Math.round(pensionContribution / 12 * 100) / 100,
    grossWeekly,
    netWeekly,
    effectiveTaxRate: Math.round(effectiveTaxRate * 10000) / 10000,
    effectiveUSCRate: Math.round(effectiveUSCRate * 10000) / 10000,
    effectivePRSIRate: Math.round(effectivePRSIRate * 10000) / 10000,
    effectiveTotalRate: Math.round(effectiveTotalRate * 10000) / 10000,
    marginalRate: Math.round(marginalRate * 10000) / 10000,
    employerPRSI,
    totalEmployerCost,
    filingStatus,
  };
}
