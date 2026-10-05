import type { WelfarePage } from '../types';
import { e, n, p, table } from '../fmt';
import { WFP, JA } from '../../../lib/welfare-2026';
import { workingFamilyPayment, wfpIncomeFromGross } from '../../../lib/welfare-engine';

const L = WFP.limits;
const ex = workingFamilyPayment(2, 640);
const exGross = wfpIncomeFromGross(1, 32_000, 0);
const exGrossWfp = workingFamilyPayment(3, exGross);

export const page: WelfarePage = {
  path: '/social-welfare/working-family-payment/',
  nav: 'Working Family Payment',
  card: 'Income limits by family size from January 2026, the 60 % rule and a calculator from gross pay.',
  title: 'Working Family Payment 2026: Limits & Weekly Calculator',
  description: `Working Family Payment 2026: limits from ${e(L[0])} a week (1 child) to ${e(L[L.length - 1])} (8+), paid at ${p(WFP.rate)} of the gap, at least ${e(WFP.minimum)} a week. Calculated from your gross pay.`,
  h1: 'Working Family Payment in 2026: limits and how much you get',
  citable: `Working Family Payment is a tax-free weekly top-up from the Department of Social Protection for employees on low pay who have at least one child. From 1 January 2026 the household's weekly income must be under ${e(L[0])} with one child, ${e(L[1])} with two, ${e(L[2])} with three and ${e(L[3])} with four, rising to ${e(L[L.length - 1])} with eight or more. The payment is ${p(WFP.rate)} of the difference between that limit and the family's assessable income, which is gross pay less income tax, PRSI, USC and pension contributions, plus any other income. It is never less than ${e(WFP.minimum)} a week. You, or you and a partner together, must work at least ${WFP.hoursPerFortnight} hours a fortnight as employees in a job expected to last three months. Once awarded, the amount is fixed for ${WFP.weeks} weeks, even if pay changes in between.`,
  sim: 'wfp',
  simHref: '/social-welfare/jobseekers-allowance/',
  sections: [
    {
      h2: 'The income limits from January 2026',
      html: `${table(['Children', 'Weekly family income must be under', 'Maximum gap paid at 60 %'], L.map((lim, i) => [i === L.length - 1 ? `${i + 1} or more` : String(i + 1), e(lim), `${e(lim * WFP.rate, 2)} if income were nil`]), 'Working Family Payment income limits from 1 January 2026 (SW19)')}
<p>The third column is only the arithmetic ceiling: in practice someone working ${WFP.hoursPerFortnight} hours a fortnight always has some income. With two children and an assessable family income of ${e(640)} a week, the gap to the ${e(L[1])} limit is ${e(ex.gap)} and the payment ${e(ex.weekly, 2)} a week, ${e(ex.weekly * WFP.weeks)} over the year.</p>`,
    },
    {
      h2: 'What counts as family income',
      html: `<p>The DSP works from net figures. For each earner it takes gross pay and removes income tax, employee PRSI, USC and superannuation, including auto-enrolment (MyFutureFund) deductions, PRSA contributions and the public service pension levy. Overtime, bonuses, allowances and commission are included. Self-employment income of a partner counts, as do occupational pensions, rental income (gross, with no deduction for the mortgage), Carer's Allowance or Carer's Benefit, and most other social welfare payments.</p>
<p>Several payments are ignored: Child Benefit, Back to Work Family Dividend, Domiciliary Care Allowance, Fuel Allowance, Rent Supplement, Foster Care Allowance and child maintenance. Income from renting a room in your home is ignored up to ${e(JA.rentARoomWeekly, 2)} a week. Savings and property are not assessed at all: WFP has no capital test.</p>
<p>Average earnings are normally taken over the period up to the application. A new job is averaged from its start. A partner's self-employment uses the previous twelve months. Maintenance received for yourself is assessed, after an offset for housing costs; maintenance for a child is not.</p>`,
    },
    {
      h2: 'From gross salary to the weekly payment',
      html: `<p>The calculator at the top of this page takes gross annual pay and runs it through the same Irish tax engine as the site's salary calculator, then applies the WFP rule. A couple with one earner on ${e(32000)} and three children has assessable income of about ${e(exGross, 2)} a week, under the ${e(L[2])} limit, which gives a payment of ${e(exGrossWfp.weekly, 2)} a week.</p>
<p>When both partners work, each is taxed on their own pay. At the incomes WFP covers, two earners each below the standard rate cut-off point pay the same tax whether assessed jointly or separately, so this gives the figure the DSP will use. If you already know your family's net weekly income, the second calculator takes it directly.</p>`,
      mini: 'wfp-net',
      miniHref: '/social-welfare/maternity-benefit/',
    },
    {
      h2: 'Hours, renewals and payments that rule it out',
      html: `<p>The ${WFP.hoursPerFortnight} hours a fortnight can be made up by both partners together, in any combination, but only as employees: hours on Community Employment, Tús, the Rural Social Scheme or in self-employment do not count. Apprentices qualify, including during off-the-job training. The job must be expected to last at least three months, and tax and PRSI must be paid in Ireland.</p>
<p>WFP cannot be paid with Jobseeker's Benefit, Jobseeker's Allowance, Farm Assist, the Part-Time Job Incentive or a place on Community Employment. If your partner is on one of those, you can still claim, but their payment then counts as family income and the increase they were getting for you stops. WFP continues for up to 6 weeks of Illness Benefit, and alongside Maternity, Paternity, Adoptive and Parent's Benefit.</p>
<p>The award lasts ${WFP.weeks} weeks. A fall in pay does not increase it, though you can close the claim and reapply on the lower income; a new child, or the end of One-Parent Family Payment, triggers a review. Renew within 4 weeks of the end date so the new award follows on. Since 1 January 2026, people on WFP are treated as meeting the Fuel Allowance means test, and the allowance is paid with WFP.</p>`,
    },
  ],
  faqs: [
    { q: 'What is the income limit for Working Family Payment with 2 children?', a: `${e(L[1])} a week from 1 January 2026, measured after income tax, PRSI, USC and pension contributions. With one child it is ${e(L[0])}, with three ${e(L[2])}. If your family income is below the limit, you get ${p(WFP.rate)} of the difference, with a minimum of ${e(WFP.minimum)} a week.` },
    { q: 'Is Working Family Payment based on gross or net pay?', a: 'Net. The Department takes gross pay and removes income tax, employee PRSI, USC and pension contributions, including auto-enrolment deductions. What remains, plus most other income such as a partner’s pay, self-employment profit or social welfare payments, is compared with the limit for your family size.' },
    { q: 'Do savings affect Working Family Payment?', a: 'No. There is no capital test for WFP: money in the bank, investments, a car or a second property are not assessed as means. Rent from a property does count as income, in full and without deducting the mortgage, but rent from a room in your own home is ignored up to the rent-a-room limit.' },
    { q: 'Can I get WFP if I am self-employed?', a: `Not on self-employment alone: the ${WFP.hoursPerFortnight} hours a fortnight must be worked as an employee. A couple where one partner is an employee working enough hours can claim, and the self-employed partner’s profit over the previous twelve months is then counted as family income.` },
    { q: 'Does WFP go up if my pay drops?', a: `Not automatically. The rate is fixed for ${WFP.weeks} weeks from the award. If your earnings fall, you can ask the WFP section to close the claim and apply again on the new, lower income. A new child joining the family, by contrast, leads to a review of the current award without a fresh claim.` },
    { q: 'Is Working Family Payment taxable?', a: 'No, WFP is paid tax-free, and it is not counted as income in the means test for a medical card. Recipients may also qualify for the Back to School Clothing and Footwear Allowance, and since January 2026 they are treated as passing the Fuel Allowance means test.' },
  ],
  sources: ['sw19', 'ciWfp', 'govWfp', 'swca'],
  related: ['/social-welfare/', '/social-welfare/jobseekers-allowance/', '/social-welfare/maternity-benefit/', '/minimum-wage-ireland/', '/'],
};
