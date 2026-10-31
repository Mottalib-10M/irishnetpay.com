import { describe, it, expect } from 'vitest';
import { calculateSalary } from './engine';

const DEFAULT = { pensionRate: 0, additionalCredits: 0 };

describe('Income Tax', () => {
  it('calculates tax for income below SRCOP (single)', () => {
    const r = calculateSalary({ grossAnnual: 35_000, filingStatus: 'single', ...DEFAULT });
    // All at 20%: 35000 × 0.20 = 7000 - credits (2000 + 2000) = 3000
    expect(r.incomeTaxGross).toBeCloseTo(7_000, 0);
    expect(r.incomeTaxNet).toBeCloseTo(3_000, 0);
  });

  it('calculates tax for income above SRCOP (single)', () => {
    const r = calculateSalary({ grossAnnual: 60_000, filingStatus: 'single', ...DEFAULT });
    // 44000 × 0.20 + 16000 × 0.40 = 8800 + 6400 = 15200 - 4000 credits = 11200
    expect(r.incomeTaxGross).toBeCloseTo(15_200, 0);
    expect(r.incomeTaxNet).toBeCloseTo(11_200, 0);
  });

  it('applies married one income SRCOP and credits', () => {
    const r = calculateSalary({ grossAnnual: 60_000, filingStatus: 'married_one_income', homeCarer: true, ...DEFAULT });
    // SRCOP = 53000: 53000×0.20 + 7000×0.40 = 10600 + 2800 = 13400
    // Credits: 4000 (married) + 2000 (PAYE) + 1950 (home carer) = 7950
    // Net tax = 13400 - 7950 = 5450
    expect(r.incomeTaxGross).toBeCloseTo(13_400, 0);
    expect(r.incomeTaxNet).toBeCloseTo(5_450, 0);
  });

  // Audit de Sami du 2026-10-28 ; règles lues sur revenue.ie le 2026-10-31.
  it('adds the Home Carer credit only when a dependent person is cared for', () => {
    const sans = calculateSalary({ grossAnnual: 70_000, filingStatus: 'married_one_income', ...DEFAULT });
    expect(sans.taxCreditsTotal).toBe(6_000);
    expect(Math.round(sans.netAnnual)).toBe(54_001);
    const avec = calculateSalary({ grossAnnual: 70_000, filingStatus: 'married_one_income', homeCarer: true, ...DEFAULT });
    expect(avec.taxCreditsTotal).toBe(7_950);
    expect(Math.round(avec.netAnnual)).toBe(55_951);
  });

  it('married two incomes: one salary uses €53,000 at 20%, never the couple\'s €88,000', () => {
    const r = calculateSalary({ grossAnnual: 88_000, filingStatus: 'married_two_incomes', ...DEFAULT });
    expect(r.standardRateBand).toBe(53_000);
    expect(r.incomeTaxGross).toBeCloseTo(24_600, 0); // 53000×0.2 + 35000×0.4
    const r60 = calculateSalary({ grossAnnual: 60_000, filingStatus: 'married_two_incomes', spouseIncome: 30_000, ...DEFAULT });
    expect(r60.incomeTaxGross).toBeCloseTo(13_400, 0); // 53000×0.2 + 7000×0.4, 1,400 more than with an €88,000 band
  });

  it('married two incomes: the lower earner uses the €35,000 increase plus any unused base band', () => {
    // Spouse earns 70,000 (uses the full 53,000): this 40,000 salary has 35,000 at 20%.
    const a = calculateSalary({ grossAnnual: 40_000, filingStatus: 'married_two_incomes', spouseIncome: 70_000, ...DEFAULT });
    expect(a.standardRateBand).toBe(35_000);
    expect(a.incomeTaxGross).toBeCloseTo(9_000, 0); // 35000×0.2 + 5000×0.4
    // Spouse earns 45,000: 8,000 of the base band is unused and can go to this salary.
    const b = calculateSalary({ grossAnnual: 40_000, filingStatus: 'married_two_incomes', spouseIncome: 45_000, ...DEFAULT });
    expect(b.standardRateBand).toBe(43_000);
    expect(b.incomeTaxGross).toBeCloseTo(8_000, 0);
  });

  it('marginal rate uses PRSI at 4.35% (rate since 1 October 2026)', () => {
    expect(calculateSalary({ grossAnnual: 60_000, filingStatus: 'single', ...DEFAULT }).marginalRate).toBeCloseTo(0.4735, 4);
    expect(calculateSalary({ grossAnnual: 80_000, filingStatus: 'single', ...DEFAULT }).marginalRate).toBeCloseTo(0.5235, 4);
  });

  it('applies single parent credits', () => {
    const r = calculateSalary({ grossAnnual: 40_000, filingStatus: 'single_parent', ...DEFAULT });
    // Credits: 2000 (personal) + 2000 (PAYE) + 1900 (SPCCC) = 5900
    expect(r.taxCreditsTotal).toBe(5_900);
  });

  it('never returns negative income tax', () => {
    const r = calculateSalary({ grossAnnual: 10_000, filingStatus: 'single', ...DEFAULT });
    expect(r.incomeTaxNet).toBe(0);
  });
});

describe('USC', () => {
  it('exempts income below threshold', () => {
    const r = calculateSalary({ grossAnnual: 12_000, filingStatus: 'single', ...DEFAULT });
    expect(r.usc).toBe(0);
  });

  it('calculates USC for standard income', () => {
    const r = calculateSalary({ grossAnnual: 50_000, filingStatus: 'single', ...DEFAULT });
    // Band 1: 12012 × 0.5% = 60.06
    // Band 2: (28700-12012) × 2% = 333.76
    // Band 3: (50000-28700) × 3% = 639.00
    // Total ≈ 1032.82
    expect(r.usc).toBeCloseTo(1_032.82, 0);
  });

  it('applies 8% band for high earners', () => {
    const r = calculateSalary({ grossAnnual: 100_000, filingStatus: 'single', ...DEFAULT });
    // Band 1: 60.06, Band 2: 333.76, Band 3: (70044-28700)×3% = 1240.32, Band 4: (100000-70044)×8% = 2396.48
    // Total ≈ 4030.62
    expect(r.usc).toBeCloseTo(4_030.62, 0);
  });
});

describe('PRSI', () => {
  it('exempts low weekly income', () => {
    // 352 × 52 = 18_304
    const r = calculateSalary({ grossAnnual: 18_000, filingStatus: 'single', ...DEFAULT });
    expect(r.prsi).toBe(0);
  });

  it('calculates PRSI at the 2026 calendar-year rate of 4.2375% (4.2% then 4.35% from October)', () => {
    const r = calculateSalary({ grossAnnual: 50_000, filingStatus: 'single', ...DEFAULT });
    expect(r.prsi).toBeCloseTo(2_118.75, 0);
  });
});

describe('Pension deduction', () => {
  it('reduces taxable income by pension contribution', () => {
    const without = calculateSalary({ grossAnnual: 60_000, filingStatus: 'single', pensionRate: 0, additionalCredits: 0 });
    const with5 = calculateSalary({ grossAnnual: 60_000, filingStatus: 'single', pensionRate: 0.05, additionalCredits: 0 });

    expect(with5.pensionContribution).toBe(3_000);
    expect(with5.taxableIncome).toBe(57_000);
    expect(with5.incomeTaxNet).toBeLessThan(without.incomeTaxNet);
  });
});

describe('Full calculation', () => {
  it('calculates net for a typical single earner at 50k', () => {
    const r = calculateSalary({ grossAnnual: 50_000, filingStatus: 'single', ...DEFAULT });

    expect(r.netAnnual).toBeGreaterThan(50_000 * 0.60);
    expect(r.netAnnual).toBeLessThan(50_000 * 0.80);
    expect(r.effectiveTotalRate).toBeGreaterThan(0.20);
    expect(r.effectiveTotalRate).toBeLessThan(0.40);
    expect(r.netMonthly).toBeCloseTo(r.netAnnual / 12, 0);
    expect(r.netWeekly).toBeCloseTo(r.netAnnual / 52, 0);
  });

  it('handles zero salary', () => {
    const r = calculateSalary({ grossAnnual: 0, filingStatus: 'single', ...DEFAULT });
    expect(r.netAnnual).toBe(0);
    expect(r.effectiveTotalRate).toBe(0);
  });

  it('calculates employer cost', () => {
    const r = calculateSalary({ grossAnnual: 50_000, filingStatus: 'single', ...DEFAULT });
    expect(r.employerPRSI).toBeGreaterThan(0);
    expect(r.totalEmployerCost).toBeGreaterThan(50_000);
  });

  it('calculates marginal rate correctly', () => {
    const below = calculateSalary({ grossAnnual: 35_000, filingStatus: 'single', ...DEFAULT });
    const above = calculateSalary({ grossAnnual: 60_000, filingStatus: 'single', ...DEFAULT });

    // Below SRCOP: 20% + USC + PRSI
    expect(below.marginalRate).toBeLessThan(above.marginalRate);
    // Above SRCOP: 40% + USC 8% band possible + PRSI 4%
    expect(above.marginalRate).toBeGreaterThan(0.40);
  });
});
