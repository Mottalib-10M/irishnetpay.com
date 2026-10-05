import type { WelfarePage } from '../types';
import { e, n, p, src, table } from '../fmt';
import { JA, CHILD_SUPPORT } from '../../../lib/welfare-2026';
import { capitalMeans, meansFromWork, jobseekersAllowance } from '../../../lib/welfare-engine';

const familyMax = JA.personal + JA.adult + 2 * CHILD_SUPPORT.under12;
const tom = meansFromWork(300, 3);
const mary = jobseekersAllowance({ ageRate: 0, household: 1, ownEarnings: 0, ownDays: 0, partnerEarnings: 400, partnerDays: 5, savings: 25_000, childrenUnder12: 1, children12Plus: 1 });
const [c1, c2, c3] = JA.capitalBands;

export const page: WelfarePage = {
  path: '/social-welfare/jobseekers-allowance/',
  nav: "Jobseeker's Allowance",
  card: 'The means test step by step: part-time pay, a partner’s earnings, savings and children.',
  title: "Jobseeker's Allowance Ireland 2026: Means Test Calculator",
  description: `Jobseeker's Allowance Ireland 2026: ${e(JA.personal)} a week at 25+, ${e(JA.personalUnder25, 2)} at 18-24 at home, minus means from work, a partner's pay and savings above ${e(c1.from)} each week.`,
  h1: "Jobseeker's Allowance in 2026: rates and the means test",
  citable: `Jobseeker's Allowance is the means-tested payment for people out of work who do not qualify, or no longer qualify, for an insurance-based jobseeker's payment. The maximum personal rate in 2026 is ${e(JA.personal)} a week from age 25, with ${e(JA.adult, 2)} more for a dependent spouse or partner and a Child Support Payment of ${e(CHILD_SUPPORT.under12)} per child under 12 or ${e(CHILD_SUPPORT.over12)} per child aged 12 or over. Under 25, the rate is ${e(JA.personalUnder25, 2)} unless you live independently with housing support or have children. From that maximum the Department of Social Protection deducts your weekly means: ${p(JA.earningsTaper, 0)} of any earnings after a disregard of ${e(JA.dailyDisregard)} for each day worked (three days at most), the same for your partner's pay, and a standard amount for savings above ${e(c1.from)}. The result is what you are paid.`,
  sim: 'ja',
  simHref: '/social-welfare/jobseekers-benefit/',
  sections: [
    {
      h2: 'The maximum rate for your household',
      html: `<p>The means test starts from a ceiling, the most the household could get with no means at all. It is the personal rate, plus an increase for a qualified adult if your spouse, civil partner or cohabitant depends on you, plus the Child Support Payment for each child. A couple with two children under 12 and no income has a maximum of ${e(familyMax, 2)} a week.</p>
${table(['Situation', 'Personal rate', 'Qualified adult'], [
  ['Aged 25 or over', e(JA.personal), e(JA.adult, 2)],
  ['Aged 18 to 24, living independently with Rent Supplement, RAS or HAP', e(JA.personal), e(JA.adult, 2)],
  ['Aged 18 to 24 with a dependent child', e(JA.personal), e(JA.adult, 2)],
  ['Aged 18 to 24, other cases', e(JA.personalUnder25, 2), e(JA.adultUnder25, 2)],
], "Jobseeker's Allowance, weekly rates 2026 (SW19)")}
<p>When your partner gets a social welfare payment in their own right, the household loses the qualified adult increase and each of you gets a half-rate Child Support Payment instead. Half of the couple's combined means is then assessed against each claim. Child Benefit, Domiciliary Care Allowance and half-rate Carer's Allowance do not count as a payment in their own right for this rule.</p>`,
    },
    {
      h2: 'How earnings are counted',
      html: `<p>You can work part-time and still get Jobseeker's Allowance, as long as you are unemployed for at least four days out of seven and still looking for full-time work. Start from gross weekly pay and take off PRSI, pension contributions, PRSAs, AVCs and union dues. Income tax and USC are <strong>not</strong> deducted. That gives assessable earnings.</p>
<p>Then take off ${e(JA.dailyDisregard)} for each day worked, up to ${e(JA.dailyDisregard * JA.maxDisregardDays)} for three days, and count ${p(JA.earningsTaper, 0)} of what is left. The Citizens Information example: earnings of ${e(300)} for three days leave ${e(300 - 60)} after the disregard, and ${p(JA.earningsTaper, 0)} of that is ${e(tom)} of weekly means. Someone on the full ${e(JA.personal)} would keep ${e(JA.personal - tom)} of allowance on top of the wage.</p>
<p>A spouse, civil partner or cohabitant's employment income goes through the same formula, with the same ${e(JA.dailyDisregard * JA.maxDisregardDays)} weekly ceiling on the disregard. Their self-employment income has no disregard at all: expected annual profit after work expenses is divided by 52 and counted in full.</p>
<p>Example: a couple with one child under 12 and one over 12, where the partner earns ${e(400)} a week over five days and the household has ${e(25000)} saved. The maximum is ${e(mary.maximum, 2)}. The partner's pay produces ${e(mary.partnerMeans, 2)} of means and the savings ${e(mary.capitalMeans, 2)}, so the allowance is ${e(mary.weekly, 2)} a week.</p>`,
    },
    {
      h2: 'Savings, investments and property',
      html: `<p>Capital is assessed whether or not it earns anything. It covers savings, shares, a pension lump sum and any property other than the home you live in, valued at market value less any mortgage registered against it. Rent from that property is then not assessed separately. The home itself is ignored, and renting a room in it brings in up to ${e(JA.rentARoomWeekly, 2)} a week without affecting the payment.</p>
${table(['Capital', 'Weekly means assessed'], [
  [`First ${e(c1.from)}`, 'Nothing'],
  [`${e(c1.from)} to ${e(c1.to)}`, `${e(c1.perThousand)} per ${e(1000)}`],
  [`${e(c2.from)} to ${e(c2.to)}`, `${e(c2.perThousand)} per ${e(1000)}`],
  [`Over ${e(c3.from)}`, `${e(c3.perThousand)} per ${e(1000)}`],
], "Jobseeker's Allowance capital scale")}
<p>On this scale ${e(55000)} of savings counts as ${e(capitalMeans(55000))} a week, the figure Citizens Information uses in its own example. Savings put aside from a welfare payment count like any other. A joint account belongs in full to each holder in law, but when both partners claim a means-tested payment it is assessed on a shared basis.</p>`,
      mini: 'ja-capital',
      miniHref: '/social-welfare/carers-allowance/',
    },
    {
      h2: 'Living with your parents and other cases',
      html: `<p>A claimant under 25 living in the family home has part of the parents' income counted as "benefit and privilege". It is the rule that most often surprises young claimants, and it is not modelled in the calculator: the DSP assesses it on a form about the parents' household income and housing costs.</p>
<p>When a partner is on Jobseeker's Pay-Related Benefit, half of it is deducted from your allowance, and if the two together fall below the family rate of Jobseeker's Allowance, the allowance is topped up to reach it; other means are then deducted. Claims in that situation are reviewed every 13 weeks, as the pay-related rate steps down. A household in which the partner gets Illness Benefit, a State Pension or Jobseeker's Benefit cannot receive more as a couple than one claimant with a qualified adult would.</p>
<p>The allowance is not taxable. You must be at least 18 and out of school for three months, available for and genuinely seeking full-time work, and a full-time student cannot claim. Apply on ${src('govJa', 'gov.ie')} through MyWelfare.ie or at an Intreo Centre.</p>`,
    },
  ],
  faqs: [
    { q: "How much is Jobseeker's Allowance a week in 2026?", a: `The maximum personal rate is ${e(JA.personal)} from age 25, plus ${e(JA.adult, 2)} for a dependent partner and ${e(CHILD_SUPPORT.under12)} or ${e(CHILD_SUPPORT.over12)} per child depending on age. People aged 18 to 24 living at home without children get ${e(JA.personalUnder25, 2)}. What is actually paid is that maximum minus your weekly means.` },
    { q: "Can I work and get Jobseeker's Allowance?", a: `Yes, for up to three days a week. ${e(JA.dailyDisregard)} of earnings per day worked is ignored, then ${p(JA.earningsTaper, 0)} of the rest counts as means. Working a fourth day in the same week means you are no longer unemployed four days out of seven, so nothing is paid for that week, whatever you earned.` },
    { q: 'Does my partner’s salary stop my claim?', a: `It counts, on the same formula as your own pay: up to ${e(JA.dailyDisregard * JA.maxDisregardDays)} a week disregarded, then ${p(JA.earningsTaper, 0)} assessed. A partner earning a full-time salary usually brings the means above the household maximum, and the claim is then refused. Their self-employment profit is counted in full, with no disregard.` },
    { q: 'How much can I have in savings?', a: `The first ${e(c1.from)} is ignored. Above that, savings produce weekly means of ${e(c1.perThousand)} per ${e(1000)} up to ${e(c1.to)}, ${e(c2.perThousand)} up to ${e(c2.to)} and ${e(c3.perThousand)} beyond. There is no fixed cut-off: the allowance falls as means rise and stops once they exceed the maximum rate for your household.` },
    { q: 'Is the under-25 rate always lower?', a: `No. The reduced ${e(JA.personalUnder25, 2)} applies only to claimants aged 18 to 24 without children who do not live independently with Rent Supplement, the Rental Accommodation Scheme or HAP. It also does not apply to people moving from Disability Allowance or who were in State care in the year before turning 18.` },
    { q: "What is the difference with Jobseeker's Benefit?", a: "Jobseeker's Benefit and Pay-Related Benefit depend on your PRSI record and ignore household income and savings. Jobseeker's Allowance ignores the PRSI record but tests the household's means. Someone who has run out of a PRSI-based payment, or never had enough contributions, moves to the allowance if the means test allows." },
  ],
  sources: ['sw19', 'ciJa', 'ciJaMeans', 'ciJaWork', 'govJa', 'swca'],
  related: ['/social-welfare/', '/social-welfare/jobseekers-benefit/', '/social-welfare/working-family-payment/', '/minimum-wage-ireland/'],
};
