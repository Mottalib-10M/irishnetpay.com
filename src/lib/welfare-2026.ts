/**
 * Social welfare, Stamp Duty and Help to Buy: parameters for 2026.
 *
 * Every figure below was read on 2026-10-05 in the official source named in
 * its comment. The pages and the calculators read this file and nothing else:
 * a rate never appears as a literal in a page (RECETTE §17.4, point 7).
 *
 * Primary source for weekly rates: Department of Social Protection, SW19
 * "Rates of Payment 2026", May 2026 edition (SOURCES.sw19).
 */

export interface Source { url: string; label: string; read: string }

/** Official sources, each with the date it was read. */
export const SOURCES = {
  sw19: { url: 'https://assets.gov.ie/static/documents/9c18b85f/20260520_Rates_of_Payment_Booklet_-_SW19_-_2026_May.pdf', label: 'Department of Social Protection, SW19 Rates of Payment 2026 (May 2026 edition)', read: '2026-10-05' },
  sw19Index: { url: 'https://www.gov.ie/en/department-of-social-protection/collections/rates-of-payment-sw19/', label: 'gov.ie, Rates of payment (SW19) collection', read: '2026-10-05' },
  swca: { url: 'https://www.irishstatutebook.ie/eli/2005/act/26/enacted/en/html', label: 'Social Welfare Consolidation Act 2005 (irishstatutebook.ie)', read: '2026-10-05' },
  ciJb: { url: 'https://www.citizensinformation.ie/en/social-welfare/unemployed-people/jobseekers-benefit/', label: "Citizens Information, Jobseeker's Benefit (page edited 12 August 2026)", read: '2026-10-05' },
  ciJprb: { url: 'https://www.citizensinformation.ie/en/social-welfare/unemployed-people/jobseekers-pay-related-benefit/', label: "Citizens Information, Jobseeker's Pay-Related Benefit (page edited 26 August 2026)", read: '2026-10-05' },
  govJprb: { url: 'https://www.gov.ie/en/department-of-social-protection/services/jobseekers-pay-related-benefit/', label: "gov.ie, Jobseeker's Pay-Related Benefit", read: '2026-10-05' },
  govJb: { url: 'https://www.gov.ie/en/department-of-social-protection/services/jobseekers-benefit/', label: "gov.ie, Jobseeker's Benefit", read: '2026-10-05' },
  ciJa: { url: 'https://www.citizensinformation.ie/en/social-welfare/unemployed-people/jobseekers-allowance/', label: "Citizens Information, Jobseeker's Allowance (page edited 14 July 2026)", read: '2026-10-05' },
  ciJaMeans: { url: 'https://www.citizensinformation.ie/en/social-welfare/irish-social-welfare-system/means-test-for-social-welfare-payments/means-test-for-jobseekers-allowance/', label: "Citizens Information, Means test for Jobseeker's Allowance (page edited 10 March 2026)", read: '2026-10-05' },
  ciJaWork: { url: 'https://www.citizensinformation.ie/en/social-welfare/irish-social-welfare-system/means-test-for-social-welfare-payments/work-and-jobseekers-allowance/', label: "Citizens Information, Jobseeker's Allowance and work", read: '2026-10-05' },
  govJa: { url: 'https://www.gov.ie/en/department-of-social-protection/services/jobseekers-allowance/', label: "gov.ie, Jobseeker's Allowance", read: '2026-10-05' },
  ciIb: { url: 'https://www.citizensinformation.ie/en/social-welfare/disability-and-illness/illness-benefit/', label: 'Citizens Information, Illness Benefit', read: '2026-10-05' },
  govIb: { url: 'https://www.gov.ie/en/department-of-social-protection/services/illness-benefit/', label: 'gov.ie, Illness Benefit', read: '2026-10-05' },
  ciMb: { url: 'https://www.citizensinformation.ie/en/social-welfare/families-and-children/maternity-benefit/', label: 'Citizens Information, Maternity Benefit (page edited 8 September 2026)', read: '2026-10-05' },
  ciPb: { url: 'https://www.citizensinformation.ie/en/social-welfare/families-and-children/paternity-benefit/', label: 'Citizens Information, Paternity Benefit (page edited 1 January 2026)', read: '2026-10-05' },
  ciParb: { url: 'https://www.citizensinformation.ie/en/social-welfare/families-and-children/parents-benefit/', label: "Citizens Information, Parent's Benefit", read: '2026-10-05' },
  govMb: { url: 'https://www.gov.ie/en/department-of-social-protection/services/maternity-benefit/', label: 'gov.ie, Maternity Benefit', read: '2026-10-05' },
  ciWfp: { url: 'https://www.citizensinformation.ie/en/social-welfare/families-and-children/working-family-payment/', label: 'Citizens Information, Working Family Payment (page edited 14 April 2026)', read: '2026-10-05' },
  govWfp: { url: 'https://www.gov.ie/en/department-of-social-protection/services/working-family-payment-wfp/', label: 'gov.ie, Working Family Payment', read: '2026-10-05' },
  ciCa: { url: 'https://www.citizensinformation.ie/en/social-welfare/carers/carers-allowance/', label: "Citizens Information, Carer's Allowance (page edited 26 August 2026)", read: '2026-10-05' },
  govCa: { url: 'https://www.gov.ie/en/department-of-social-protection/services/carers-allowance/', label: "gov.ie, Carer's Allowance", read: '2026-10-05' },
  ciSp: { url: 'https://www.citizensinformation.ie/en/social-welfare/older-and-retired-people/state-pension-contributory/', label: 'Citizens Information, State Pension (Contributory) (page edited 23 September 2026)', read: '2026-10-05' },
  govSpCalc: { url: 'https://www.gov.ie/en/department-of-social-protection/publications/how-to-calculate-your-state-pension-contributory-rate/', label: 'gov.ie, How to calculate your State Pension (Contributory) rate', read: '2026-10-05' },
  govSp: { url: 'https://www.gov.ie/en/department-of-social-protection/services/state-pension-contributory/', label: 'gov.ie, State Pension (Contributory)', read: '2026-10-05' },
  revSdRates: { url: 'https://www.revenue.ie/en/property/stamp-duty/property/stamp-duty-property/rates.aspx', label: 'Revenue, Stamp Duty rates on property (published 22 October 2025)', read: '2026-10-05' },
  revSdVat: { url: 'https://www.revenue.ie/en/property/stamp-duty/consideration/vat-exclusive-consideration.aspx', label: 'Revenue, VAT-exclusive consideration (published 13 July 2026)', read: '2026-10-05' },
  revSdLate: { url: 'https://www.revenue.ie/en/property/stamp-duty/paying-the-duty/late-filing-and-paying.aspx', label: 'Revenue, What happens if you file and pay Stamp Duty late', read: '2026-10-05' },
  revSdRes: { url: 'https://www.revenue.ie/en/property/stamp-duty/property/stamp-duty-property/residential-property.aspx', label: 'Revenue, What is residential property for Stamp Duty', read: '2026-10-05' },
  sdca: { url: 'https://www.irishstatutebook.ie/eli/1999/act/31/enacted/en/html', label: 'Stamp Duties Consolidation Act 1999 (irishstatutebook.ie)', read: '2026-10-05' },
  revHtbAmount: { url: 'https://www.revenue.ie/en/property/help-to-buy-incentive/how-much-can-you-claim.aspx', label: 'Revenue, Help to Buy: how much can you claim (published 1 January 2026)', read: '2026-10-05' },
  revHtbWho: { url: 'https://www.revenue.ie/en/property/help-to-buy-incentive/who-can-claim-htb.aspx', label: 'Revenue, Help to Buy: who can claim (published 1 January 2026)', read: '2026-10-05' },
  revHtbProperty: { url: 'https://www.revenue.ie/en/property/help-to-buy-incentive/what-type-of-property-qualifies.aspx', label: 'Revenue, Help to Buy: what is a qualifying property (published 1 January 2026)', read: '2026-10-05' },
  revHtbApply: { url: 'https://www.revenue.ie/en/property/help-to-buy-incentive/how-do-you-apply-for-help-to-buy-htb.aspx', label: 'Revenue, How do you apply for Help to Buy', read: '2026-10-05' },
  revHtbClawback: { url: 'https://www.revenue.ie/en/property/help-to-buy-incentive/can-revenue-claw-back-a-refund.aspx', label: 'Revenue, Can Revenue claw back a Help to Buy refund (published 1 January 2026)', read: '2026-10-05' },
  revHtbTdm: { url: 'https://www.revenue.ie/en/tax-professionals/tdm-wm/income-tax-capital-gains-tax-corporation-tax/part-15/15-01-46.pdf', label: 'Revenue, Tax and Duty Manual Part 15-01-46, Help to Buy', read: '2026-10-05' },
  tca: { url: 'https://www.irishstatutebook.ie/eli/1997/act/39/enacted/en/html', label: 'Taxes Consolidation Act 1997, section 477C (irishstatutebook.ie)', read: '2026-10-05' },
} satisfies Record<string, Source>;
export type SourceKey = keyof typeof SOURCES;

/** Date the module's figures were last checked against the sources. */
export const WELFARE_CHECKED = '2026-10-05';

/** Child Support Payment, weekly, every scheme (SW19 2026). */
export const CHILD_SUPPORT = { under12: 58, over12: 78 } as const;

/** Jobseeker's Benefit and Illness Benefit: graduated personal rate by average weekly earnings in the relevant tax year (SW19 2026, Jobseeker's Benefit and Illness Benefit tables). */
export interface GraduatedBand { from: number; personal: number; adult: number }
export const GRADUATED_BANDS: GraduatedBand[] = [
  { from: 300, personal: 254, adult: 168.6 },
  { from: 220, personal: 198.9, adult: 109.2 },
  { from: 150, personal: 163.7, adult: 109.2 },
  { from: 0, personal: 114, adult: 109.2 },
];
/** Earnings below this are replaced by a notional €32 (Citizens Information, JB). */
export const NOTIONAL_WEEKLY_EARNINGS = 32;

/** Increase for a Qualified Adult, tapered on the adult's gross weekly income (SW19 2026, appendix). Each row: income up to `upTo` → amount. */
export interface IqaRow { upTo: number; amount: number }
const IQA_STEPS = [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310];
const rows = (amounts: number[]): IqaRow[] => IQA_STEPS.map((upTo, i) => ({ upTo, amount: amounts[i] }));
/** Full personal rate (€168.60 maximum). */
export const IQA_FULL = rows([168.6, 163.6, 158.6, 152.9, 147.0, 141.3, 135.5, 129.7, 123.9, 118.0, 112.3, 106.4, 100.7, 94.8, 89.1, 83.3, 77.5, 71.7, 65.9, 60.1, 54.3, 48.5]);
/** Reduced personal rate (€109.20 maximum). */
export const IQA_REDUCED = rows([109.2, 105.6, 101.8, 98.2, 94.5, 90.8, 87.1, 83.4, 79.7, 76.1, 72.3, 68.7, 65.1, 61.3, 57.7, 54.0, 50.3, 46.6, 42.9, 39.2, 35.6, 31.9]);
/** Above this, a half-rate Child Support Payment only; above CSP_HALF_LIMIT, none (SW19 2026, CI Maternity Benefit). */
export const IQA_LIMIT = 310;
export const CSP_HALF_LIMIT = 400;

/** Jobseeker's Benefit (part-time, casual, short-time and seasonal workers). */
export const JB = {
  waitingDays: 3,
  longPaidContributions: 260,
  daysLong: 234, // 9 months
  daysShort: 156, // 6 months
  minPaidContributions: 104,
  paymentDaysPerWeek: 6,
  workWeekDays: 5, // each day worked removes 1/5 of the weekly rate
  redundancyDisqualificationFrom: 50_000, // under 55
} as const;

/** Jobseeker's Pay-Related Benefit (fully unemployed from 31 March 2025), SW19 2026. */
export const JPRB = {
  minimum: 125,
  long: [
    { weeks: 13, rate: 0.6, cap: 450 },
    { weeks: 13, rate: 0.55, cap: 375 },
    { weeks: 13, rate: 0.5, cap: 300 },
  ],
  short: [{ weeks: 26, rate: 0.5, cap: 300 }],
  longPaidContributions: 260,
  minPaidContributions: 104,
  applyWithinWeeks: 6,
} as const;

/** Jobseeker's Allowance (SW19 2026; Citizens Information means test pages). */
export const JA = {
  personal: 254,
  adult: 168.6,
  personalUnder25: 163.7,
  adultUnder25: 163.7,
  dailyDisregard: 20,
  maxDisregardDays: 3,
  earningsTaper: 0.6,
  maxDaysWorked: 3, // working 4 days or more in a week: no JA for that week
  /** Capital (not the home): first €20,000 nil, then €1/€2/€4 per €1,000. */
  capitalBands: [
    { from: 20_000, to: 30_000, perThousand: 1 },
    { from: 30_000, to: 40_000, perThousand: 2 },
    { from: 40_000, to: Infinity, perThousand: 4 },
  ],
  rentARoomWeekly: 269.23,
} as const;

/** Illness Benefit (SW19 2026; Citizens Information). */
export const IB = {
  waitingDays: 3,
  statutorySickPayDays: 5,
  daysLong: 624, // 2 years, 260+ paid contributions
  daysShort: 312, // 1 year, 104-259
  longPaidContributions: 260,
  minPaidContributions: 104,
  applyWithinWeeks: 6,
} as const;

/** Maternity, Paternity, Adoptive and Parent's Benefit: flat weekly rate (SW19 2026). */
export const FAMILY_LEAVE = {
  rate: 299,
  weeks: { maternity: 26, paternity: 2, parents: 9 },
  unpaidMaternityWeeks: 16,
  minPaidInYear: 39,
} as const;

/** Working Family Payment income limits from 1 January 2026, by number of children (SW19 2026). Index 0 = 1 child; the last applies to 8 or more. */
export const WFP = {
  limits: [765, 866, 967, 1058, 1184, 1300, 1436, 1532],
  rate: 0.6,
  minimum: 20,
  hoursPerFortnight: 38,
  weeks: 52,
} as const;

/** Carer's Allowance (SW19 2026; Citizens Information). */
export const CA = {
  under66: { one: 270, twoOrMore: 405 },
  over66: { one: 308, twoOrMore: 462 },
  /** Means up to this leave the full rate; each further €2.50 band (or part) removes €2.50. */
  fullRateMeans: 7.6,
  step: 2.5,
  /** Weekly income disregard from 2 July 2026. */
  disregardSingle: 1000,
  disregardCouple: 2000,
  disregardFrom: '2026-07-02',
  capitalBands: [
    { from: 50_000, to: 60_000, perThousand: 1 },
    { from: 60_000, to: 70_000, perThousand: 2 },
    { from: 70_000, to: Infinity, perThousand: 4 },
  ],
  maxWorkHours: 18.5,
  minCareHours: 35,
} as const;

/** State Pension (Contributory), SW19 2026 and the gov.ie calculation guide. */
export const SPC = {
  max: 299.3,
  tcaFull: 2080,
  minPaid: 520,
  maxCredits: 520,
  maxHomeCaring: 1040,
  maxCreditsAndHomeCaring: 1040,
  /** Share of the yearly average rate in the combined approach, by year of drawdown. */
  yaShare: { 2025: 0.9, 2026: 0.8, 2027: 0.7, 2028: 0.6, 2029: 0.5, 2030: 0.4, 2031: 0.3, 2032: 0.2, 2033: 0.1 } as Record<number, number>,
  /** Yearly average bands (rate payable at 100 %). */
  yaBands: [
    { from: 48, rate: 299.3 },
    { from: 40, rate: 293.5 },
    { from: 30, rate: 269.1 },
    { from: 20, rate: 254.8 },
    { from: 15, rate: 195.0 },
    { from: 10, rate: 119.6 },
  ],
  /** Maximum personal rate by age of drawdown (flexible pension, actuarially increased). */
  byAge: { 66: 299.3, 67: 313.4, 68: 328.9, 69: 345.7, 70: 363.9 } as Record<number, number>,
  livingAlone: 22,
  over80: 10,
} as const;

/** Residential Stamp Duty, instruments executed on or after 2 October 2024 (Revenue, rates page). */
export const STAMP_DUTY = {
  bands: [
    { upTo: 1_000_000, rate: 0.01 },
    { upTo: 1_500_000, rate: 0.02 },
    { upTo: Infinity, rate: 0.06 },
  ],
  /** Three or more apartments in the same block: 1 % then 2 % with no 6 % band. */
  apartmentBlockBands: [
    { upTo: 1_000_000, rate: 0.01 },
    { upTo: Infinity, rate: 0.02 },
  ],
  bulkRate: 0.15, // ten or more houses within 12 months, s.31E SDCA 1999
  bulkCount: 10,
  newHomeVat: 0.135, // Revenue example on VAT-exclusive consideration
  nonResidential: 0.075,
  curtilageAcres: 1,
  ratesFrom: '2024-10-02',
  /** File and pay within 44 days of execution; surcharge 5 % to day 92 (cap €12,695), 10 % after (cap €63,485); interest 0.0219 % a day (Revenue, late filing and paying). */
  fileWithinDays: 44,
  surcharge: [{ afterDays: 44, rate: 0.05, cap: 12_695 }, { afterDays: 92, rate: 0.1, cap: 63_485 }],
  dailyInterest: 0.000219,
} as const;

/** Help to Buy, enhanced relief (Revenue, pages published 1 January 2026). */
export const HTB = {
  max: 30_000,
  priceShare: 0.1,
  priceCap: 500_000,
  minLtv: 0.7,
  taxYears: 4,
  endDate: '2029-12-31',
  residenceYears: 5,
} as const;
