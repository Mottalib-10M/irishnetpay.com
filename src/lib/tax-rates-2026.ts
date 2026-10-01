/**
 * Irish Tax Rates & Thresholds 2026
 * Sources: Revenue.ie, Citizens Information, Budget 2026
 * Last updated: 2026-10-01 (figures re-checked: cut-off points, credits, USC bands and PRSI were still those of 2024)
 */

// --- Income Tax ---

/** Standard rate of income tax */
export const STANDARD_RATE = 0.20;
/** Higher rate of income tax */
export const HIGHER_RATE = 0.40;

/** Standard Rate Cut-Off Point (SRCOP) by filing status, annual */
export type FilingStatus = 'single' | 'married_one_income' | 'married_two_incomes' | 'single_parent';

export const SRCOP: Record<FilingStatus, number> = {
  single: 44_000,
  married_one_income: 53_000,
  married_two_incomes: 88_000, // Combined: 53_000 plus up to 35_000 for the second income
  single_parent: 48_000,
};

// --- Tax Credits (annual) ---

export const TAX_CREDITS = {
  personal_single: 2_000,
  personal_married: 4_000,
  employee_paye: 2_000,
  earned_income: 2_000, // For self-employed (not used for PAYE workers)
  single_parent: 1_900, // Single Person Child Carer Credit
  home_carer: 1_950, // Home Carer Tax Credit (married, one earner)
};

// --- Universal Social Charge (USC) ---

export interface USCBand {
  max: number;
  rate: number;
}

/** USC bands 2026, standard rates */
export const USC_BANDS: USCBand[] = [
  { max: 12_012, rate: 0.005 },   // 0.5%
  { max: 28_700, rate: 0.02 },    // 2%
  { max: 70_044, rate: 0.03 },    // 3% (4% until 2024)
  { max: Infinity, rate: 0.08 },  // 8%
];

/** USC exemption threshold, no USC if total income ≤ this */
export const USC_EXEMPTION = 13_000;

/** USC surcharge for non-PAYE income > €100,000 */
export const USC_SURCHARGE_RATE = 0.03;
export const USC_SURCHARGE_THRESHOLD = 100_000;

// --- PRSI (Pay Related Social Insurance) ---

/** Employee PRSI rate (Class A): 4.2% from January to September 2026, 4.35% from 1 October 2026. */
export const PRSI_RATE_JAN_SEP = 0.042;
export const PRSI_RATE_OCT_DEC = 0.0435;
/** Rate over the calendar year 2026: nine months at 4.2% and three at 4.35%. */
export const PRSI_RATE = (PRSI_RATE_JAN_SEP * 9 + PRSI_RATE_OCT_DEC * 3) / 12; // 4.2375%

/** PRSI weekly income threshold, below this, no PRSI */
export const PRSI_WEEKLY_THRESHOLD = 352;

/** PRSI credit: tapered relief for low earners */
export const PRSI_CREDIT_MAX = 12; // per week
export const PRSI_CREDIT_TAPER_START = 352.01;
export const PRSI_CREDIT_TAPER_END = 424;

// --- Employer PRSI ---

/** 9% and 11.25% from January to September 2026, 9.15% and 11.4% from 1 October: rates over the calendar year. */
export const EMPLOYER_PRSI_RATE_LOW = (0.09 * 9 + 0.0915 * 3) / 12; // 9.0375% (earnings up to €552 a week)
export const EMPLOYER_PRSI_RATE_HIGH = (0.1125 * 9 + 0.114 * 3) / 12; // 11.2875%
export const EMPLOYER_PRSI_WEEKLY_THRESHOLD = 552;

// --- Minimum Wage ---

/** National minimum wage (per hour) 2026 */
export const MINIMUM_WAGE_HOURLY = 14.15;

/** Living wage (per hour) 2026 */
export const LIVING_WAGE_HOURLY = 14.80;
