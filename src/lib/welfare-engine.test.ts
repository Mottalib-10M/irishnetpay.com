/**
 * Welfare, Stamp Duty and Help to Buy engine. Every worked example published by
 * the paying body becomes a test, with its source in the comment (RECETTE §17.4, point 5),
 * and each rule is probed on both sides of its thresholds.
 */
import { describe, it, expect } from 'vitest';
import {
  graduatedRate, jobseekersBenefitWeek, jobseekersBenefitDays, jprbSchedule, capitalMeans, meansFromWork,
  jobseekersAllowance, illnessBenefitDays, illnessBenefitSpell, familyLeave, workingFamilyPayment, wfpLimit,
  wfpIncomeFromGross, carersAllowance, carerCapitalMeans, statePension, stampDuty, helpToBuy, qualifiedAdult, childSupport,
} from './welfare-engine';

const kids = (u12: number, o12 = 0) => ({ partner: 1 as const, partnerIncome: 0, childrenUnder12: u12, children12Plus: o12 });

describe("Jobseeker's Benefit and Illness Benefit rates", () => {
  it('pays the full personal rate from €300 a week, and the graduated rates below', () => {
    expect(graduatedRate(300).personal).toBe(254);
    expect(graduatedRate(299.99).personal).toBe(198.9);
    expect(graduatedRate(220).personal).toBe(198.9);
    expect(graduatedRate(219.99).personal).toBe(163.7);
    expect(graduatedRate(150).personal).toBe(163.7);
    expect(graduatedRate(149.99).personal).toBe(114);
    expect(graduatedRate(0).personal).toBe(114); // notional €32
  });
  it('family rate: personal + qualified adult + two children under 12 = €538.60 (Citizens Information, Maternity Benefit example, 2026)', () => {
    expect(graduatedRate(400, kids(2)).weekly).toBe(538.6);
  });
  it('tapers the qualified adult on the SW19 appendix tables', () => {
    expect(qualifiedAdult(100, false)).toBe(168.6);
    expect(qualifiedAdult(100.01, false)).toBe(163.6);
    expect(qualifiedAdult(310, false)).toBe(48.5);
    expect(qualifiedAdult(310.01, false)).toBe(0);
    expect(qualifiedAdult(150, true)).toBe(90.8);
  });
  it('child support: full up to €310 of partner income, half up to €400, none above', () => {
    const d = { partner: 1 as const, childrenUnder12: 1, children12Plus: 1 };
    expect(childSupport({ ...d, partnerIncome: 310 }).amount).toBe(136);
    expect(childSupport({ ...d, partnerIncome: 350 }).amount).toBe(68);
    expect(childSupport({ ...d, partnerIncome: 401 }).amount).toBe(0);
    expect(childSupport({ ...d, partner: 0, partnerIncome: 0 }).amount).toBe(136);
  });
  it('removes one fifth per day worked, and pays nothing at four days', () => {
    expect(jobseekersBenefitWeek(400, 2).payable).toBeCloseTo(254 * 3 / 5, 2);
    expect(jobseekersBenefitWeek(400, 3).payable).toBeCloseTo(254 * 2 / 5, 2);
    expect(jobseekersBenefitWeek(400, 4).payable).toBe(0);
  });
  it('lasts 234 days from 260 paid contributions, 156 below, nothing under 104', () => {
    expect(jobseekersBenefitDays(260)).toBe(234);
    expect(jobseekersBenefitDays(259)).toBe(156);
    expect(jobseekersBenefitDays(103)).toBe(0);
  });
});

describe("Jobseeker's Pay-Related Benefit", () => {
  it('60 / 55 / 50 % capped at €450 / €375 / €300 over 39 weeks with 260 contributions', () => {
    const s = jprbSchedule(1000, 300);
    expect(s.periods.map((p) => p.weekly)).toEqual([450, 375, 300]);
    expect(s.weeks).toBe(39);
    expect(s.total).toBe(13 * (450 + 375 + 300));
  });
  it('below the caps: 60 % of €600 is €360, then €330, then €300', () => {
    expect(jprbSchedule(600, 260).periods.map((p) => p.weekly)).toEqual([360, 330, 300]);
  });
  it('26 weeks at 50 % (max €300) with 104 to 259 contributions', () => {
    const s = jprbSchedule(800, 200);
    expect(s.weeks).toBe(26);
    expect(s.periods[0].weekly).toBe(300);
  });
  it('never pays less than the €125 minimum, and nothing under 104 contributions', () => {
    expect(jprbSchedule(150, 300).periods.map((p) => p.weekly)).toEqual([125, 125, 125]);
    expect(jprbSchedule(800, 103).eligible).toBe(false);
  });
});

describe("Jobseeker's Allowance means test", () => {
  it('capital: €55,000 gives €90 a week (Citizens Information example)', () => {
    expect(capitalMeans(55_000)).toBe(90);
    expect(capitalMeans(20_000)).toBe(0);
    expect(capitalMeans(30_000)).toBe(10);
  });
  it('work: €300 for 3 days gives €144 of means (Citizens Information, Tom)', () => {
    expect(meansFromWork(300, 3)).toBe(144);
  });
  it('couple with 2 children under 12, no means: family rate €538.60', () => {
    const r = jobseekersAllowance({ ageRate: 0, household: 1, ownEarnings: 0, ownDays: 0, partnerEarnings: 0, partnerDays: 0, savings: 0, childrenUnder12: 2, children12Plus: 0 });
    expect(r.maximum).toBe(538.6);
    expect(r.weekly).toBe(538.6);
  });
  it('18-24 living at home: €163.70; with savings of €30,000: €153.70', () => {
    const base = { ageRate: 1 as const, household: 0 as const, ownEarnings: 0, ownDays: 0, partnerEarnings: 0, partnerDays: 0, childrenUnder12: 0, children12Plus: 0 };
    expect(jobseekersAllowance({ ...base, savings: 0 }).weekly).toBe(163.7);
    expect(jobseekersAllowance({ ...base, savings: 30_000 }).weekly).toBe(153.7);
  });
  it('partner on a payment of their own: half child support, means halved', () => {
    const r = jobseekersAllowance({ ageRate: 0, household: 2, ownEarnings: 0, ownDays: 0, partnerEarnings: 0, partnerDays: 0, savings: 30_000, childrenUnder12: 2, children12Plus: 0 });
    expect(r.maximum).toBe(312); // €254 + 2 × €29 (Citizens Information, John and Susan)
    expect(r.means).toBe(5);
  });
  it('no JA for a week with four days of work', () => {
    const r = jobseekersAllowance({ ageRate: 0, household: 0, ownEarnings: 400, ownDays: 4, partnerEarnings: 0, partnerDays: 0, savings: 0, childrenUnder12: 0, children12Plus: 0 });
    expect(r.weekly).toBe(0);
  });
});

describe('Illness Benefit duration', () => {
  it('624 days from 260 contributions, 312 from 104', () => {
    expect(illnessBenefitDays(260)).toBe(624);
    expect(illnessBenefitDays(104)).toBe(312);
    expect(illnessBenefitDays(50)).toBe(0);
  });
  it('sick pay covers 5 days and IB starts on day 6; without it, 3 waiting days', () => {
    expect(illnessBenefitSpell(12, 5, 300)).toMatchObject({ sickPay: 5, waiting: 0, paid: 7 });
    expect(illnessBenefitSpell(12, 0, 300)).toMatchObject({ sickPay: 0, waiting: 3, paid: 9 });
  });
});

describe('Maternity, Paternity and Parent\'s Benefit', () => {
  it('flat €299 for 26 weeks, topped up to the Illness Benefit family rate (€538.60, Citizens Information example)', () => {
    expect(familyLeave('maternity', 500).weekly).toBe(299);
    expect(familyLeave('maternity', 500).total).toBe(299 * 26);
    expect(familyLeave('paternity', 500, kids(2)).weekly).toBe(538.6);
    expect(familyLeave('parents', 500).weeks).toBe(9);
  });
});

describe('Working Family Payment', () => {
  it('limits from 1 January 2026', () => {
    expect(wfpLimit(1)).toBe(765);
    expect(wfpLimit(4)).toBe(1058);
    expect(wfpLimit(8)).toBe(1532);
    expect(wfpLimit(11)).toBe(1532);
  });
  it('60 % of the gap, minimum €20, nothing at or above the limit', () => {
    expect(workingFamilyPayment(2, 600).weekly).toBe(159.6);
    expect(workingFamilyPayment(1, 760).weekly).toBe(20);
    expect(workingFamilyPayment(1, 765).weekly).toBe(0);
  });
  it('turns gross pay into assessable income with the site tax engine', () => {
    const w = wfpIncomeFromGross(0, 30_000, 0);
    expect(w).toBeGreaterThan(400);
    expect(w).toBeLessThan(30_000 / 52);
  });
});

describe("Carer's Allowance", () => {
  it('capital of a couple: €145,000 gives €76 a week (Citizens Information example)', () => {
    expect(carerCapitalMeans(145_000, true)).toBe(76);
  });
  it('couple earning €2,050 with €145,000: means €63, rate €212.50 (CI example, SW19 table)', () => {
    const r = carersAllowance({ over66: false, caringForTwoOrMore: false, couple: true, weeklyIncome: 2050, capital: 145_000, childrenUnder12: 0, children12Plus: 0 });
    expect(r.means).toBe(63);
    expect(r.personal).toBe(212.5);
  });
  it('full rate up to €7.60 of means, nil above €275.10 (one person) and €410.10 (two)', () => {
    const base = { over66: false, couple: false, capital: 0, childrenUnder12: 0, children12Plus: 0 };
    expect(carersAllowance({ ...base, caringForTwoOrMore: false, weeklyIncome: 1007.6 }).personal).toBe(270);
    expect(carersAllowance({ ...base, caringForTwoOrMore: false, weeklyIncome: 1010 }).personal).toBe(267.5);
    expect(carersAllowance({ ...base, caringForTwoOrMore: false, weeklyIncome: 1010.1 }).personal).toBe(267.5);
    expect(carersAllowance({ ...base, caringForTwoOrMore: false, weeklyIncome: 1010.11 }).personal).toBe(265);
    expect(carersAllowance({ ...base, caringForTwoOrMore: false, weeklyIncome: 1275.11 }).personal).toBe(0);
    expect(carersAllowance({ ...base, caringForTwoOrMore: true, weeklyIncome: 1275.11 }).personal).toBe(135);
    expect(carersAllowance({ ...base, caringForTwoOrMore: true, weeklyIncome: 1410.11 }).personal).toBe(0);
  });
  it('66 or over: €308, or €462 caring for two', () => {
    const base = { over66: true, couple: false, capital: 0, weeklyIncome: 0, childrenUnder12: 0, children12Plus: 0 };
    expect(carersAllowance({ ...base, caringForTwoOrMore: false }).personal).toBe(308);
    expect(carersAllowance({ ...base, caringForTwoOrMore: true }).personal).toBe(462);
  });
});

describe('State Pension (Contributory)', () => {
  const base = { paid: 2080, credits: 0, homeCaring: 0, years: 40, drawdownAge: 66, drawdownYear: 2026 };
  it('2,080 contributions: maximum €299.30', () => {
    expect(statePension(base).weekly).toBe(299.3);
  });
  it('gov.ie TCA example: 947 paid + 855 credits (520 used) + 350 HomeCaring = 1,817, 87.35 %', () => {
    const r = statePension({ ...base, paid: 947, credits: 855, homeCaring: 350, years: 45 });
    expect(r.tcaTotal).toBe(1817);
    expect(r.tcaPercent).toBe(87.35);
    expect(r.tcaRate).toBe(261.44); // 87.35 % of €299.30 (gov.ie applied it to the €289.30 of the time: €252.70)
  });
  it('2026: the better of TCA alone or 80 % yearly average + 20 % TCA', () => {
    // 1,040 paid over 20 years: TCA 50 % = €149.65; yearly average 52 → €299.30; combined 0.8 × 299.30 + 0.2 × 149.65
    const r = statePension({ ...base, paid: 1040, years: 20 });
    expect(r.tcaRate).toBe(149.65);
    expect(r.combined).toBe(269.37);
    expect(r.weekly).toBe(269.37);
  });
  it('the yearly average share falls each year until 2034', () => {
    const r2033 = statePension({ ...base, paid: 1040, years: 20, drawdownYear: 2033 });
    const r2034 = statePension({ ...base, paid: 1040, years: 20, drawdownYear: 2034 });
    expect(r2033.weekly).toBeCloseTo(0.1 * 299.3 + 0.9 * 149.65, 2);
    expect(r2034.weekly).toBe(149.65);
  });
  it('under 520 paid contributions: no pension', () => {
    expect(statePension({ ...base, paid: 519 }).weekly).toBe(0);
  });
  it('drawn at 70: €363.90 at the maximum', () => {
    expect(statePension({ ...base, drawdownAge: 70 }).weekly).toBe(363.9);
  });
  it('credits and HomeCaring periods together never exceed 1,040', () => {
    expect(statePension({ ...base, paid: 600, credits: 800, homeCaring: 900 }).tcaTotal).toBe(600 + 1040);
  });
});

describe('Stamp Duty (residential)', () => {
  it('1 % up to €1m, 2 % to €1.5m, 6 % above', () => {
    expect(stampDuty(400_000).duty).toBe(4000);
    expect(stampDuty(1_000_000).duty).toBe(10_000);
    expect(stampDuty(1_500_000).duty).toBe(20_000);
    expect(stampDuty(2_000_000).duty).toBe(50_000);
  });
  it('new home: duty on the VAT-exclusive price (Revenue: €400,000 ÷ 1.135 = €352,422.90)', () => {
    const r = stampDuty(400_000, 'newInclVat');
    expect(r.consideration).toBe(352_422.91);
    expect(r.duty).toBeCloseTo(3524.23, 2);
  });
  it('three or more apartments in one block: no 6 % band', () => {
    expect(stampDuty(2_000_000, 'secondHand', true).duty).toBe(30_000);
  });
});

describe('Help to Buy', () => {
  it('the lesser of €30,000, 10 % of the price and four years of tax', () => {
    expect(helpToBuy(400_000, 320_000, 50_000).amount).toBe(30_000);
    expect(helpToBuy(250_000, 200_000, 50_000).amount).toBe(25_000);
    expect(helpToBuy(400_000, 320_000, 18_000).amount).toBe(18_000);
  });
  it('nothing above €500,000 or with a mortgage under 70 %', () => {
    expect(helpToBuy(500_001, 400_000, 50_000).amount).toBe(0);
    expect(helpToBuy(500_000, 350_000, 50_000).amount).toBe(30_000);
    expect(helpToBuy(400_000, 279_000, 50_000).amount).toBe(0);
  });
});
