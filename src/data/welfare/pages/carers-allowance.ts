import type { WelfarePage } from '../types';
import { e, n, date, table } from '../fmt';
import { CA, CHILD_SUPPORT } from '../../../lib/welfare-2026';
import { carersAllowance, carerCapitalMeans } from '../../../lib/welfare-engine';

const ex = carersAllowance({ over66: false, caringForTwoOrMore: false, couple: true, weeklyIncome: 2050, capital: 145_000, childrenUnder12: 0, children12Plus: 0 });
const [b1, b2, b3] = CA.capitalBands;
// Under 66, caring for one person: the last €2.50 is paid up to this level of means, nothing above it (SW19: over €275.10, nil).
const lastStep = CA.fullRateMeans + CA.under66.one - CA.step;

export const page: WelfarePage = {
  path: '/social-welfare/carers-allowance/',
  nav: "Carer's Allowance",
  card: 'Rates by age and number of people cared for, the new income disregard and the €2.50 means steps.',
  title: "Carer's Allowance Ireland 2026: Rates and Means Test",
  description: `Carer's Allowance 2026: ${e(CA.under66.one)} a week under 66, ${e(CA.over66.one)} at 66+, half again for two people. ${e(CA.disregardSingle)}/${e(CA.disregardCouple)} weekly income disregard from July 2026, means test shown.`,
  h1: "Carer's Allowance in 2026: rates and the means test",
  citable: `Carer's Allowance is the means-tested weekly payment for someone who provides full-time care, at least ${CA.minCareHours} hours a week, to a person who needs it because of age, illness or disability. In 2026 the maximum is ${e(CA.under66.one)} a week for a carer under 66 looking after one person and ${e(CA.under66.twoOrMore)} for two or more; from age 66 it is ${e(CA.over66.one)} and ${e(CA.over66.twoOrMore)}. Children add ${e(CHILD_SUPPORT.under12)} or ${e(CHILD_SUPPORT.over12)} each, at half rate for a carer living with a partner. Since ${date(CA.disregardFrom)} the first ${e(CA.disregardSingle)} of a single carer's weekly income, and ${e(CA.disregardCouple)} of a couple's, is ignored; half of what remains is a couple's means. The rate stays at its maximum while means are ${e(CA.fullRateMeans, 2)} or less, then falls by ${e(CA.step, 2)} for every ${e(CA.step, 2)} of means.`,
  sim: 'ca',
  simHref: '/social-welfare/state-pension/',
  sections: [
    {
      h2: 'The four maximum rates',
      html: `${table(['Carer', 'Caring for one person', 'Caring for two or more'], [
  ['Under 66', e(CA.under66.one), e(CA.under66.twoOrMore)],
  ['66 or over', e(CA.over66.one), e(CA.over66.twoOrMore)],
], "Carer's Allowance, maximum weekly rates 2026 (SW19)")}
<p>Caring for two or more people raises the rate by half. A carer who already gets another social welfare payment, such as a State Pension or Jobseeker's Allowance, can usually keep it and receive half-rate Carer's Allowance on top, but no Child Support Payment comes with the half rate. Carer's Allowance has no increase for a qualified adult.</p>
<p>The Carer's Support Grant is paid automatically every June to anyone on Carer's Allowance. While on the allowance you may also receive credited PRSI contributions, and long-term caring can count towards the State Pension (Contributory) through HomeCaring periods or Long-Term Carers Contributions.</p>`,
    },
    {
      h2: 'How the means test works since July 2026',
      html: `<p>The Department adds up the household's weekly income and a weekly value for its capital. Income from employment is counted after PRSI, pension contributions and union subscriptions, not after income tax or USC. Child maintenance has been excluded since June 2024. Certain income from renting a room is also ignored.</p>
<ol>
<li>Add the weekly income of the carer and, for a couple, the spouse, civil partner or cohabitant.</li>
<li>Add the weekly means from capital (savings, investments, property other than the home).</li>
<li>Take away the income disregard: ${e(CA.disregardSingle)} for a single carer, ${e(CA.disregardCouple)} for a couple, from ${date(CA.disregardFrom)}.</li>
<li>For a couple, halve the result. That is the weekly means.</li>
</ol>
<p>Citizens Information gives the example of John, earning ${e(1800)} a week, and Mary, earning ${e(250)}, with ${e(145000)} of savings between them. Their capital is worth ${e(carerCapitalMeans(145000, true))} a week, total income ${e(2126)}, ${e(2126 - CA.disregardCouple)} after the disregard and ${e(ex.means)} after halving. On the SW19 table, ${e(ex.means)} of means leaves a personal rate of ${e(ex.personal, 2)} a week for a carer under 66 looking after one person.</p>`,
    },
    {
      h2: 'From weekly means to the rate paid',
      html: `<p>The DSP publishes the result as a table in its SW19 booklet, in steps of ${e(CA.step, 2)}. Up to ${e(CA.fullRateMeans, 2)} of means, the full rate is paid. Each further ${e(CA.step, 2)} of means, or any part of it, takes ${e(CA.step, 2)} off the weekly payment. For a carer under 66 looking after one person, a payment of ${e(CA.step, 2)} is still made with means of up to ${e(lastStep, 2)}, and nothing above that. Caring for two or more, the extra half keeps being reduced until it too reaches nil.</p>
<p>That step rule means the reduction is roughly euro for euro on the carer's assessed means. For a couple, because the means are halved, an extra ${e(10)} of household income above the disregard costs about ${e(5)} of allowance.</p>`,
    },
    {
      h2: 'Savings and property',
      html: `${table(['Capital', 'Weekly means'], [
  [`First ${e(b1.from)}`, 'Nothing'],
  [`${e(b1.from)} to ${e(b1.to)}`, `${e(b1.perThousand)} per ${e(1000)}`],
  [`${e(b2.from)} to ${e(b2.to)}`, `${e(b2.perThousand)} per ${e(1000)}`],
  [`Over ${e(b3.from)}`, `${e(b3.perThousand)} per ${e(1000)}`],
], "Carer's Allowance capital scale")}
<p>A couple's capital is pooled, halved, assessed on this scale and the result doubled before it is added to income. The ${e(b1.from)} disregard therefore effectively applies twice for a couple. The family home is not counted. Because the income disregard is now so large, savings rarely change the outcome on their own unless they are well above ${e(b3.from)}.</p>`,
      mini: 'ca-capital',
      miniHref: '/social-welfare/jobseekers-allowance/',
    },
    {
      h2: 'Who qualifies as a carer',
      html: `<p>You must be aged 18 or over and provide full-time care and attention: at least ${CA.minCareHours} hours a week over five to seven days. The person cared for, if aged 16 or over, must be so incapacitated that they need full-time care and attention for at least twelve months, which the Department assesses on medical evidence. You can work, study, train or volunteer for up to ${n(CA.maxWorkHours)} hours a week outside the home and still qualify, as long as the person is cared for while you are away.</p>
<p>Carer's Allowance is taxable, but often no tax arises when it is the only income. If the carer dies, a spouse or civil partner already on their own welfare payment can keep the allowance for six weeks. Apply on MyWelfare.ie or on form CR1, one form for each person you care for.</p>`,
    },
  ],
  faqs: [
    { q: "How much is Carer's Allowance in 2026?", a: `Up to ${e(CA.under66.one)} a week for a carer under 66 caring for one person, ${e(CA.under66.twoOrMore)} for two or more. From 66 it is ${e(CA.over66.one)} or ${e(CA.over66.twoOrMore)}. Children add ${e(CHILD_SUPPORT.under12)} or ${e(CHILD_SUPPORT.over12)} each, halved for a carer living with a partner. Means above ${e(CA.fullRateMeans, 2)} a week reduce the rate.` },
    { q: 'What is the income limit for Carer’s Allowance?', a: `There is no single limit. From ${date(CA.disregardFrom)} the first ${e(CA.disregardSingle)} of a single carer’s weekly income and ${e(CA.disregardCouple)} of a couple’s is ignored. Anything above that, halved for a couple, is weekly means, and each ${e(CA.step, 2)} of means beyond ${e(CA.fullRateMeans, 2)} reduces the payment by ${e(CA.step, 2)} until it reaches nil.` },
    { q: 'Can I work and get Carer’s Allowance?', a: `Yes, for up to ${n(CA.maxWorkHours)} hours a week in employment, self-employment, training, education or voluntary work, provided the person you care for is looked after while you are out. Your earnings then count in the means test, after PRSI and pension contributions, together with your partner’s.` },
    { q: 'Does my spouse’s income count?', a: `Yes. The income of a spouse, civil partner or cohabitant is added to yours, the ${e(CA.disregardCouple)} couple disregard is taken off, and half of what remains is your weekly means. A household earning up to ${e(CA.disregardCouple)} a week between them, with modest savings, now keeps the full rate.` },
    { q: 'Can I get Carer’s Allowance with a State Pension?', a: 'Yes, at half rate. Someone already receiving another social welfare payment, such as the State Pension, Jobseeker’s Allowance or Illness Benefit, can usually keep it and get half-rate Carer’s Allowance in addition. No Child Support Payment is paid with the half rate. The Carer’s Support Grant is still paid each June.' },
    { q: 'Is Carer’s Allowance taxable?', a: 'Yes, it is taxable income, but tax often does not arise when it is the carer’s only income, because the personal tax credits cover it. When the carer or their spouse also earns, Revenue collects the tax by reducing the tax credits applied to the salary, so the tax shows on the payslip rather than on the allowance.' },
  ],
  sources: ['sw19', 'ciCa', 'govCa', 'swca'],
  related: ['/social-welfare/', '/social-welfare/state-pension/', '/social-welfare/illness-benefit/', '/guides/tax-credits-ireland/'],
};
