import type { WelfarePage } from '../types';
import { e, n, table } from '../fmt';
import { FAMILY_LEAVE, CHILD_SUPPORT, GRADUATED_BANDS, IQA_LIMIT, CSP_HALF_LIMIT, IQA_FULL } from '../../../lib/welfare-2026';
import { familyLeave } from '../../../lib/welfare-engine';

const W = FAMILY_LEAVE.weeks;
const mary = familyLeave('maternity', 600, { partner: 1, partnerIncome: 0, childrenUnder12: 2, children12Plus: 0 });

export const page: WelfarePage = {
  path: '/social-welfare/maternity-benefit/',
  nav: 'Maternity Benefit',
  card: 'Maternity, Paternity and Parent’s Benefit: the weekly rate, the Illness Benefit top-up and the weeks paid.',
  title: `Maternity Benefit Ireland 2026: ${e(FAMILY_LEAVE.rate)} a Week, Calculator`,
  description: `Maternity Benefit Ireland 2026: ${e(FAMILY_LEAVE.rate)} a week for ${W.maternity} weeks, or more with dependants. Paternity Benefit ${W.paternity} weeks, Parent's Benefit ${W.parents}. PRSI rules and totals.`,
  h1: 'Maternity, Paternity and Parent’s Benefit in 2026',
  citable: `Maternity Benefit is paid by the Department of Social Protection at a flat ${e(FAMILY_LEAVE.rate)} a week in 2026, for ${W.maternity} weeks, to a mother on maternity leave with enough PRSI contributions, usually ${n(FAMILY_LEAVE.minPaidInYear)} weeks paid in the twelve months before the leave starts. Paternity Benefit is paid at the same rate for ${W.paternity} weeks, and Parent's Benefit for ${W.parents} weeks per parent for a child born or adopted from 1 August 2024. The rate is not linked to salary, but it has a floor that most people miss: when the Illness Benefit you would get, with increases for a partner and children, is higher than ${e(FAMILY_LEAVE.rate)}, that higher amount is paid instead. A mother with a partner at home and two children under 12 gets ${e(mary.weekly, 2)} a week rather than ${e(FAMILY_LEAVE.rate)}. The benefit is taxable, but USC and PRSI are not charged on it.`,
  sim: 'mb',
  simHref: '/social-welfare/working-family-payment/',
  sections: [
    {
      h2: 'Three payments, one rate',
      html: `${table(['Payment', 'Weekly rate 2026', 'Weeks paid', 'When'], [
  ['Maternity Benefit', e(FAMILY_LEAVE.rate), String(W.maternity), 'At least 2 and at most 16 weeks before the end of the week the baby is due'],
  ['Paternity Benefit', e(FAMILY_LEAVE.rate), String(W.paternity), 'Two consecutive weeks within 6 months of the birth or placement'],
  ['Parent’s Benefit', e(FAMILY_LEAVE.rate), `${W.parents} per parent`, 'Within 2 years of the birth or placement, in separate weeks or at once'],
], 'Family leave payments, 2026 (SW19)')}
<p>Adoptive Benefit follows the same rate. The ${W.maternity} paid weeks can be followed by up to ${FAMILY_LEAVE.unpaidMaternityWeeks} weeks of unpaid maternity leave, for which no benefit is paid but a credited PRSI contribution is given each week. A premature birth extends the paid period by the time between the birth and the planned start of leave.</p>`,
    },
    {
      h2: 'When you get more than the standard rate',
      html: `<p>The rule is easy to miss because no application is needed. The DSP compares the standard ${e(FAMILY_LEAVE.rate)} with the Illness Benefit you would get if you were off sick, including the increase for a qualified adult and the Child Support Payment, and pays the higher figure. Illness Benefit starts from a lower personal rate, at most ${e(GRADUATED_BANDS[0].personal)}, so the top-up only matters with dependants.</p>
<p>A partner who is unemployed and signing for credits, or earning ${e(IQA_FULL[0].upTo)} a week or less, gives the full increase and full child payments: ${e(GRADUATED_BANDS[0].personal)} + ${e(GRADUATED_BANDS[0].adult, 2)} + 2 × ${e(CHILD_SUPPORT.under12)} = ${e(mary.weekly, 2)} for two children under 12, the case Citizens Information uses. Between ${e(IQA_FULL[0].upTo + 0.01, 2)} and ${e(IQA_LIMIT)} the partner increase tapers; from ${e(IQA_LIMIT + 0.01, 2)} to ${e(CSP_HALF_LIMIT)} only half-rate child payments are added; above ${e(CSP_HALF_LIMIT)} nothing is added, and the standard rate applies.</p>
<p>The Illness Benefit side also depends on your earnings in the relevant tax year (2024 for leave starting in 2026). A parent who earned less than ${e(GRADUATED_BANDS[0].from)} a week on average that year has a lower personal rate in the comparison, which can make the top-up smaller.</p>`,
    },
    {
      h2: 'PRSI conditions',
      html: `<p>Contributions from employment (Classes A, E and H) and self-employment (Class S) both count. One of three conditions must be met at the start of the leave:</p>
<ul>
<li>${n(FAMILY_LEAVE.minPaidInYear)} weeks of PRSI paid in the 12 months before the first day of leave; or</li>
<li>${n(FAMILY_LEAVE.minPaidInYear)} weeks paid since first starting work, and ${n(FAMILY_LEAVE.minPaidInYear)} weeks paid or credited in the relevant tax year (2024) or in 2025; or</li>
<li>26 weeks paid in 2024 and 26 weeks paid in 2023.</li>
</ul>
<p>A self-employed parent qualifies with 52 weeks of Class S paid in 2023, 2024 or 2025, provided the tax and PRSI for the relevant year have been paid. Contributions from another EU country or the UK can be combined with Irish ones if the most recent was paid in Ireland and you are currently insured here.</p>`,
    },
    {
      h2: 'Your employer, tax and the money you actually receive',
      html: `<p>An employer has no obligation to pay you during maternity, paternity or parent's leave. Many do top up to full salary, and then usually ask for the benefit to be paid into their account. The gap between your gross pay and ${e(FAMILY_LEAVE.rate)} a week is what an employer top-up covers, and what a household without one has to plan for.</p>
<p>The benefit is taxable, collected through your tax credits rather than at source, and USC and PRSI are not charged on it. Working Family Payment continues alongside it when the conditions for both are met. Apply at least 6 weeks before the leave (12 weeks if self-employed) for Maternity Benefit, and 4 weeks before for Paternity and Parent's Benefit, on MyWelfare.ie with the employer certificate.</p>`,
      mini: 'mb-gap',
      miniHref: '/social-welfare/illness-benefit/',
    },
  ],
  faqs: [
    { q: 'How much is Maternity Benefit in 2026?', a: `${e(FAMILY_LEAVE.rate)} a week for ${W.maternity} weeks, the same for everyone who qualifies, whatever the salary. It is higher only when the Illness Benefit you would receive, with increases for a dependent partner and children, exceeds ${e(FAMILY_LEAVE.rate)}: that amount is then paid automatically, with no separate application.` },
    { q: 'Is Maternity Benefit paid for 26 weeks or 42?', a: `${W.maternity} weeks are paid. A further ${FAMILY_LEAVE.unpaidMaternityWeeks} weeks of unpaid maternity leave can follow, without benefit but with a credited PRSI contribution for each week. So the total leave can reach 42 weeks, of which ${W.maternity} carry a payment from the Department.` },
    { q: 'How much is Paternity Benefit?', a: `${e(FAMILY_LEAVE.rate)} a week for ${W.paternity} consecutive weeks, taken at any time in the 6 months after the birth or adoption placement. The same Illness Benefit comparison applies, so a father with a partner at home and children can receive more. The PRSI conditions are the same as for Maternity Benefit.` },
    { q: 'Do both parents get Parent’s Benefit?', a: `Yes. Each parent has their own ${W.parents} weeks for a child born or adopted from 1 August 2024, paid at ${e(FAMILY_LEAVE.rate)} a week. Each parent needs the PRSI contributions in their own name. The weeks can be taken separately or all at once, within two years of the birth or placement, and the claim is made at least 4 weeks before.` },
    { q: 'Do I pay tax on Maternity Benefit?', a: 'It is taxable income, but nothing is deducted from the weekly payment. Revenue reduces your tax credits and rate band, so any tax due is collected through your salary or your partner’s, if jointly assessed. USC and PRSI are not charged on the benefit, which makes it worth slightly more than the same gross salary.' },
    { q: 'Can my employer keep my Maternity Benefit?', a: 'Only if the employer continues to pay you during the leave. Where your contract provides full or partial pay during maternity leave, the employer will usually require the benefit to be paid to it, so that you do not receive both. Without such a payment from the employer, the benefit is yours.' },
  ],
  sources: ['sw19', 'ciMb', 'ciPb', 'ciParb', 'govMb', 'swca'],
  related: ['/social-welfare/', '/social-welfare/illness-benefit/', '/social-welfare/working-family-payment/', '/guides/tax-credits-ireland/'],
};
