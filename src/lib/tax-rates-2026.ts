/**
 * Irish Tax Rates & Thresholds 2026
 * Sources: Revenue.ie, Citizens Information
 * Last updated: January 2026
 */

// --- Income Tax ---

/** Standard rate of income tax */
export const STANDARD_RATE = 0.20;
/** Higher rate of income tax */
export const HIGHER_RATE = 0.40;

/** Standard Rate Cut-Off Point (SRCOP) by filing status, annual */
export type FilingStatus = 'single' | 'married_one_income' | 'married_two_incomes' | 'single_parent';

export const SRCOP: Record<FilingStatus, number> = {
  single: 42_000,
  married_one_income: 51_000,
  married_two_incomes: 84_000, // Combined (each spouse max 42_000)
  single_parent: 46_000,
};

// --- Tax Credits (annual) ---

export const TAX_CREDITS = {
  personal_single: 1_875,
  personal_married: 3_750,
  employee_paye: 1_875,
  earned_income: 1_875, // For self-employed (not used for PAYE workers)
  single_parent: 1_750, // Single Person Child Carer Credit
  home_carer: 1_800, // Home Carer Tax Credit (married, one earner)
};

// --- Universal Social Charge (USC) ---

export interface USCBand {
  max: number;
  rate: number;
}

/** USC bands 2026, standard rates */
export const USC_BANDS: USCBand[] = [
  { max: 12_012, rate: 0.005 },   // 0.5%
  { max: 25_760, rate: 0.02 },    // 2%
  { max: 70_044, rate: 0.04 },    // 4%
  { max: Infinity, rate: 0.08 },  // 8%
];

/** USC exemption threshold, no USC if total income ≤ this */
export const USC_EXEMPTION = 13_000;

/** USC surcharge for non-PAYE income > €100,000 */
export const USC_SURCHARGE_RATE = 0.03;
export const USC_SURCHARGE_THRESHOLD = 100_000;

// --- PRSI (Pay Related Social Insurance) ---

/** Employee PRSI rate (Class A) */
export const PRSI_RATE = 0.04; // 4%

/** PRSI weekly income threshold, below this, no PRSI */
export const PRSI_WEEKLY_THRESHOLD = 352;

/** PRSI credit: tapered relief for low earners */
export const PRSI_CREDIT_MAX = 12; // per week
export const PRSI_CREDIT_TAPER_START = 352.01;
export const PRSI_CREDIT_TAPER_END = 424;

// --- Employer PRSI ---

export const EMPLOYER_PRSI_RATE_LOW = 0.0811; // 8.8% reduced (for earnings ≤ €441/week)
export const EMPLOYER_PRSI_RATE_HIGH = 0.1105; // 11.05% standard
export const EMPLOYER_PRSI_WEEKLY_THRESHOLD = 441;

// --- Minimum Wage ---

/** National minimum wage (per hour) 2026 */
export const MINIMUM_WAGE_HOURLY = 13.50;

/** Living wage (per hour) 2026 */
export const LIVING_WAGE_HOURLY = 14.80;
