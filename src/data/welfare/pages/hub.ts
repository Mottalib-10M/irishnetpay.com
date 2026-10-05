import type { WelfarePage } from '../types';
import { e, p, n, date, table } from '../fmt';
import { GRADUATED_BANDS, JPRB, JA, FAMILY_LEAVE, WFP, CA, SPC, CHILD_SUPPORT, IB } from '../../../lib/welfare-2026';

const top = GRADUATED_BANDS[0];
const l1 = JPRB.long[0];
const card = (href: string, name: string, text: string) => `<li><a href="${href}"><strong>${name}</strong></a>: ${text}</li>`;

export const page: WelfarePage = {
  path: '/social-welfare/',
  nav: 'Social welfare',
  card: 'Every weekly rate for 2026 in one table, with a calculator for each payment.',
  title: 'Social Welfare Rates Ireland 2026: Weekly Payments Table',
  description: `Social welfare rates in Ireland for 2026: Jobseeker's up to ${e(l1.cap)}, Illness Benefit ${e(top.personal)}, Maternity ${e(FAMILY_LEAVE.rate)}, State Pension ${e(SPC.max, 2)}, Carer's ${e(CA.under66.one)} a week, per person.`,
  h1: 'Social welfare payments in Ireland: 2026 rates and calculators',
  citable: `Irish social welfare splits into two families, and knowing which one a payment belongs to answers most questions about it. Social insurance payments, such as Jobseeker's Pay-Related Benefit, Jobseeker's Benefit, Illness Benefit, Maternity Benefit and the State Pension (Contributory), depend on your PRSI record and, for some, on your earnings; household income and savings do not matter. Social assistance payments, such as Jobseeker's Allowance, Working Family Payment and Carer's Allowance, ignore the PRSI record and test the household's means instead. In 2026 the core personal rate of the working-age schemes is ${e(JA.personal)} a week, the maximum State Pension (Contributory) is ${e(SPC.max, 2)}, and every child adds a Child Support Payment of ${e(CHILD_SUPPORT.under12)} under 12 or ${e(CHILD_SUPPORT.over12)} from 12. The calculator below compares what one earnings record gives across the insurance payments, and each page then works out its payment in full.`,
  sim: 'welfare-finder',
  simHref: '/social-welfare/jobseekers-benefit/',
  sections: [
    {
      h2: 'Weekly rates in 2026 at a glance',
      html: `${table(['Payment', 'Type', 'Maximum personal rate', 'Calculator'], [
  ["Jobseeker's Pay-Related Benefit", 'PRSI, pay-related', `${p(l1.rate)} of pay, up to ${e(l1.cap)}`, '<a href="/social-welfare/jobseekers-benefit/">Pay-related rate</a>'],
  ["Jobseeker's Benefit", 'PRSI, graduated', e(top.personal), '<a href="/social-welfare/jobseekers-benefit/">Part-time weeks</a>'],
  ["Jobseeker's Allowance", 'Means-tested', e(JA.personal), '<a href="/social-welfare/jobseekers-allowance/">Means test</a>'],
  ['Illness Benefit', 'PRSI, graduated', e(top.personal), '<a href="/social-welfare/illness-benefit/">Weekly rate</a>'],
  ['Maternity, Paternity, Parent’s Benefit', 'PRSI, flat rate', e(FAMILY_LEAVE.rate), '<a href="/social-welfare/maternity-benefit/">Leave payments</a>'],
  ['Working Family Payment', 'Means-tested top-up', `${p(WFP.rate)} of the gap to the limit`, '<a href="/social-welfare/working-family-payment/">From your pay</a>'],
  ["Carer's Allowance (under 66)", 'Means-tested', e(CA.under66.one), '<a href="/social-welfare/carers-allowance/">Means test</a>'],
  ['State Pension (Contributory)', 'PRSI record', e(SPC.max, 2), '<a href="/social-welfare/state-pension/">Your record</a>'],
], 'Department of Social Protection, maximum weekly personal rates 2026 (SW19)')}
<p>Increases for a dependent adult and for children come on top of most of these, tapered on the adult's own income. Working Family Payment is the exception: it is a single amount for the household, set by its income and number of children. The pay-related jobseeker's payment has no increase for dependants at all, which is why a family on it sometimes does better on Jobseeker's Allowance.</p>`,
    },
    {
      h2: 'The relevant tax year: why 2024 sets your 2026 rate',
      html: `<p>For the graduated benefits, Jobseeker's Benefit and Illness Benefit, and for the contribution test of most insurance payments, the Department looks at the <strong>relevant tax year</strong>: the second-last complete tax year before the claim. Every claim made in 2026 is assessed on 2024. Average weekly earnings in that year decide whether you get the full personal rate of ${e(top.personal)} (from ${e(top.from)} a week) or one of the reduced rates, down to ${e(GRADUATED_BANDS[GRADUATED_BANDS.length - 1].personal)}.</p>
<p>The pay-related payment for people who lose their job outright works differently: it looks at the last twelve months of pay before the job loss, minus eight weeks, taken from Revenue's payroll data. That is why the same person can see a high pay-related rate and a low Illness Benefit rate in the same year.</p>`,
    },
    {
      h2: 'Means-tested payments: what is counted',
      html: `<p>Each means test has its own rules, and the differences are large. Jobseeker's Allowance counts ${p(JA.earningsTaper, 0)} of earnings above a daily disregard and charges savings from ${e(JA.capitalBands[0].from)}. Carer's Allowance, since ${date(CA.disregardFrom)}, ignores the first ${e(CA.disregardSingle)} of a single person's weekly income and ${e(CA.disregardCouple)} of a couple's, and savings up to ${e(CA.capitalBands[0].from)}. Working Family Payment looks only at net income and has no savings test.</p>`,
    },
    {
      h2: 'The pages in this section',
      html: `<ul>
${card('/social-welfare/jobseekers-benefit/', "Jobseeker's Benefit", `the pay-related rate after a full lay-off (up to ${e(l1.cap)} for ${l1.weeks} weeks) and the graduated rate for a reduced week.`)}
${card('/social-welfare/jobseekers-allowance/', "Jobseeker's Allowance", 'the means test with part-time pay, a partner’s earnings, savings and children.')}
${card('/social-welfare/illness-benefit/', 'Illness Benefit', `rate by 2024 earnings, increases for dependants, waiting days and the ${n(IB.daysShort)} or ${n(IB.daysLong)} days of payment.`)}
${card('/social-welfare/maternity-benefit/', 'Maternity, Paternity and Parent’s Benefit', `${e(FAMILY_LEAVE.rate)} a week, or the higher Illness Benefit family rate.`)}
${card('/social-welfare/working-family-payment/', 'Working Family Payment', 'from gross pay to the weekly top-up, with the 2026 limits.')}
${card('/social-welfare/carers-allowance/', "Carer's Allowance", `the new income disregard and the ${e(CA.step, 2)} steps of the means test.`)}
${card('/social-welfare/state-pension/', 'State Pension (Contributory)', 'the Total Contributions Approach, the 2026 blend with the yearly average, and deferral to 70.')}
</ul>
<p>Buying a home is covered separately: <a href="/stamp-duty-ireland/">Stamp Duty</a> and <a href="/help-to-buy-ireland/">Help to Buy</a>.</p>`,
    },
    {
      h2: 'How these figures are checked',
      html: `<p>Every rate comes from the Department of Social Protection's SW19 booklet of rates of payment for 2026, cross-checked against the Citizens Information page for each scheme and the gov.ie service page, with the date each was read. The rules applied by the calculators, such as the taper of the increase for a qualified adult or the capital scale of each means test, are those of the same sources, and each calculator is tested against the worked examples they publish. Where a rule is too individual to model, such as the parental income assessed for a young jobseeker living at home, the page says so.</p>`,
    },
  ],
  faqs: [
    { q: 'How much is social welfare in Ireland per week in 2026?', a: `The core personal rate of the working-age schemes, Jobseeker’s Allowance, Jobseeker’s Benefit and Illness Benefit, is ${e(JA.personal)} a week, with ${e(top.adult, 2)} for a dependent adult and ${e(CHILD_SUPPORT.under12)} or ${e(CHILD_SUPPORT.over12)} per child. Maternity Benefit is ${e(FAMILY_LEAVE.rate)}, the State Pension (Contributory) up to ${e(SPC.max, 2)}.` },
    { q: 'What is the difference between Benefit and Allowance?', a: 'A Benefit is social insurance: it depends on your PRSI contributions, and household income or savings do not affect it. An Allowance is social assistance: it does not need a PRSI record, but it is means-tested on the household’s income and capital. The State Pension (Contributory) and Illness Benefit are insurance; Jobseeker’s and Carer’s Allowance are assistance.' },
    { q: 'Are social welfare payments taxable?', a: 'Most insurance payments are taxable, including Jobseeker’s Benefit, Illness Benefit, Maternity Benefit and the State Pension (Contributory), though no tax is deducted from the payment itself: Revenue adjusts your tax credits. Jobseeker’s Allowance and Working Family Payment are not taxable. Child Support Payments are not taxed.' },
    { q: 'Which tax year is used for a claim in 2026?', a: 'For the graduated rates of Jobseeker’s Benefit and Illness Benefit, and for most PRSI contribution tests, the relevant tax year is 2024, the second-last complete tax year before the claim. Jobseeker’s Pay-Related Benefit is different: it uses the twelve months of pay that end eight weeks before the job was lost.' },
    { q: 'Can I get two payments at once?', a: 'Usually not, with exceptions. Half-rate Carer’s Allowance can be paid on top of another payment, Working Family Payment continues with Maternity Benefit and for six weeks of Illness Benefit, and Child Benefit is paid to every family regardless. A couple’s total from certain pairs of payments is capped at what one claimant with a qualified adult would get.' },
    { q: 'Where do I apply?', a: 'Almost every payment is claimed online at MyWelfare.ie, which needs a verified MyGovID account, or at an Intreo Centre or Social Welfare Branch Office. The Department takes earnings and contribution records directly from Revenue, so an employer usually only has to certify leave for Maternity or Paternity Benefit.' },
  ],
  sources: ['sw19', 'sw19Index', 'ciJprb', 'ciJb', 'ciJa', 'ciIb', 'ciMb', 'ciWfp', 'ciCa', 'ciSp', 'swca'],
  related: ['/social-welfare/jobseekers-benefit/', '/social-welfare/state-pension/', '/guides/prsi-social-insurance/', '/'],
};
