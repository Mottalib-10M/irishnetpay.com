import type { WelfarePage } from '../types';
import { e, n, table } from '../fmt';
import { IB, GRADUATED_BANDS, CHILD_SUPPORT, IQA_FULL, IQA_REDUCED, IQA_LIMIT } from '../../../lib/welfare-2026';
import { graduatedRate, illnessBenefitSpell } from '../../../lib/welfare-engine';

const full = GRADUATED_BANDS[0];
const famille = graduatedRate(480, { partner: 1, partnerIncome: 150, childrenUnder12: 1, children12Plus: 0 });
const spell = illnessBenefitSpell(15, 0, 300);

export const page: WelfarePage = {
  path: '/social-welfare/illness-benefit/',
  nav: 'Illness Benefit',
  card: 'Weekly rate by 2024 earnings, partner and child increases, waiting days and the one- or two-year limit.',
  title: 'Illness Benefit 2026: Weekly Rate, Duration & Calculator',
  description: `Illness Benefit Ireland 2026: up to ${e(full.personal)} a week from ${e(full.from)} of average earnings in 2024, ${e(full.adult, 2)} for a partner, paid for one or two years. Check your rate.`,
  h1: 'Illness Benefit in 2026: how much, and for how long',
  citable: `Illness Benefit is the weekly payment the Department of Social Protection makes to an insured worker who is certified unfit for work by a GP. In 2026 the personal rate is ${e(full.personal)} a week when your average weekly earnings in the relevant tax year, 2024 for a claim starting in 2026, were ${e(full.from)} or more; lower earnings bring ${e(GRADUATED_BANDS[1].personal, 2)}, ${e(GRADUATED_BANDS[2].personal, 2)} or ${e(GRADUATED_BANDS[3].personal, 2)}. A dependent spouse or partner adds up to ${e(full.adult, 2)}, each child under 12 adds ${e(CHILD_SUPPORT.under12)} and each older child ${e(CHILD_SUPPORT.over12)}. The first ${IB.waitingDays} days of illness are unpaid, or covered by Statutory Sick Pay from the employer for the first ${IB.statutorySickPayDays} days. You need ${n(IB.minPaidContributions)} paid PRSI contributions; payment then lasts up to one year, or two years from ${n(IB.longPaidContributions)} paid contributions.`,
  sim: 'ib',
  simHref: '/social-welfare/jobseekers-benefit/',
  sections: [
    {
      h2: 'Your rate depends on 2024, not on your current salary',
      html: `<p>The rate is set by the earnings in the <strong>relevant tax year</strong>, which is the second-last complete tax year before the claim. For an illness that begins in 2026, that is 2024. Average weekly earnings are gross earnings in 2024 divided by the number of weeks worked that year. Someone who changed job or got a pay rise since then is paid on the 2024 figure, and someone who was a student in 2024 may land in a lower band than their current salary suggests.</p>
${table(['Average weekly earnings in 2024', 'Personal rate', 'Qualified adult, maximum'], GRADUATED_BANDS.map((b, i) => [
  i === 0 ? `${e(b.from)} or more` : i === GRADUATED_BANDS.length - 1 ? `Less than ${e(GRADUATED_BANDS[i - 1].from)}` : `${e(b.from)} to ${e(GRADUATED_BANDS[i - 1].from - 0.01, 2)}`,
  e(b.personal, 2), e(b.adult, 2),
]), 'Illness Benefit, weekly rates 2026 (SW19)')}
<p>Someone moving from long-term Jobseeker's Allowance (at least 390 days at the maximum rate) to Illness Benefit with no more than 3 days between the two claims, and with at least 260 qualifying contributions, gets the maximum rate whatever their 2024 earnings.</p>`,
    },
    {
      h2: 'Adding a partner and children',
      html: `<p>A spouse, civil partner or cohabitant whose own gross income is ${e(IQA_FULL[0].upTo)} a week or less brings the full increase: ${e(IQA_FULL[0].amount, 2)} with the maximum personal rate, ${e(IQA_REDUCED[0].amount, 2)} with a reduced one. Above ${e(IQA_FULL[0].upTo)} the increase drops in ten-euro steps and stops above ${e(IQA_LIMIT)}. At ${e(150)} a week, for example, it is ${e(IQA_FULL.find((r) => 150 <= r.upTo)!.amount, 2)} or ${e(IQA_REDUCED.find((r) => 150 <= r.upTo)!.amount, 2)}.</p>
<p>The Child Support Payment is paid in full when you get the partner increase or are parenting alone. If the partner earns more than ${e(IQA_LIMIT)} but no more than ${e(400)} a week, half the child amount is paid; above that, none. A worker with average 2024 earnings of ${e(480)}, a partner earning ${e(150)} and one child under 12 gets ${e(famille.weekly, 2)} a week: ${e(famille.personal)} personal, ${e(famille.adult, 2)} for the partner and ${e(famille.children)} for the child.</p>
<p>The personal rate and the partner increase are taxable; the child amounts are not. Nothing is deducted at source. Revenue adjusts your tax credits and rate band, so the tax appears on your payslip when you return, or on your partner's if you are jointly assessed.</p>`,
    },
    {
      h2: 'Waiting days, sick pay and the days paid',
      html: `<p>Illness Benefit is paid for six days a week; Sunday never counts. The first ${IB.waitingDays} days of an illness are waiting days and are not paid, unless you were on certain other welfare payments within the 3 days before. Since January 2024 employers pay Statutory Sick Pay for up to ${IB.statutorySickPayDays} days a year, and Illness Benefit is not paid for those days: for an illness longer than ${IB.statutorySickPayDays} days, Illness Benefit starts on day ${IB.statutorySickPayDays + 1}. Once the ${IB.statutorySickPayDays} days are used up for the year, a new illness is paid from day ${IB.waitingDays + 1}.</p>
<p>A spell of ${n(15)} days off with no sick pay left therefore gives ${n(spell.waiting)} waiting days and ${n(spell.paid)} days of benefit. Apply even if your employer pays you in full: the claim earns you a credited PRSI contribution for each week, which counts towards the State Pension and other benefits.</p>`,
      mini: 'ib-spell',
      miniHref: '/social-welfare/maternity-benefit/',
    },
    {
      h2: 'The PRSI conditions and the time limit',
      html: `<p>Two conditions apply. First, at least ${n(IB.minPaidContributions)} weeks of PRSI paid since you started work. Second, either 39 weeks paid or credited in 2024, of which at least 13 paid, or 26 weeks paid in 2024 and 26 paid in 2023. If the 13 paid contributions are missing in 2024, 13 paid in 2022, 2023, 2025 or the current year can be used instead. Only Classes A, E, H and P count, so the self-employed (Class S) do not qualify.</p>
<p>The payment lasts at most ${n(IB.daysLong)} payment days, two years, if you have ${n(IB.longPaidContributions)} or more paid contributions, and ${n(IB.daysShort)} days, one year, with ${n(IB.minPaidContributions)} to ${n(IB.longPaidContributions - 1)}. A new claim within 26 weeks of the last one is treated as the same claim, so the days add up. To requalify after exhausting it, you need 13 more paid contributions after returning to work.</p>
<p>A Medical Assessor employed by the Department can ask to see you and give an opinion on whether you are fit for work; missing that appointment suspends the payment. After six months on Illness Benefit, Partial Capacity Benefit lets you return to work with part of the payment kept. When the limit is reached, Invalidity Pension (permanent incapacity) or Disability Allowance (means-tested, for a disability expected to last a year) are the usual next steps.</p>`,
    },
    {
      h2: 'Claiming',
      html: `<p>The claim must be made within ${IB.applyWithinWeeks} weeks of falling ill, online at MyWelfare.ie with a verified MyGovID account once your GP has completed the medical certificate, or on form IB1 posted with the paper certificate to the Department. The GP does not charge for the certificate itself, though the consultation may be charged. A late claim can lose part of the payment unless there is a good reason for the delay.</p>
<p>When you are fit to return, the GP marks the last certificate as final and you close the claim on MyWelfare.ie. Working, including voluntary work or a course, needs written approval first.</p>`,
    },
  ],
  faqs: [
    { q: 'How much is Illness Benefit per week in 2026?', a: `${e(full.personal)} if your average weekly earnings in 2024 were ${e(full.from)} or more; ${e(GRADUATED_BANDS[1].personal, 2)}, ${e(GRADUATED_BANDS[2].personal, 2)} or ${e(GRADUATED_BANDS[3].personal, 2)} below that. A dependent partner adds up to ${e(full.adult, 2)}, and each child ${e(CHILD_SUPPORT.under12)} or ${e(CHILD_SUPPORT.over12)} depending on age. Your current salary does not change the rate.` },
    { q: 'Why is my Illness Benefit lower than a colleague’s?', a: 'Because the rate follows earnings in the relevant tax year, which for a 2026 claim is 2024, divided by the weeks worked that year. A colleague who earned more in 2024, or who has a dependent partner or children, gets a higher amount even on the same salary today. The decision letter shows the earnings figure used.' },
    { q: 'Do I get paid for the first days off sick?', a: `Not by the Department. The first ${IB.waitingDays} days are waiting days. Your employer must pay Statutory Sick Pay for up to ${IB.statutorySickPayDays} days a year, and Illness Benefit starts after those days. Many employers have their own sick pay scheme on top; it does not stop you claiming Illness Benefit.` },
    { q: 'Can self-employed people get Illness Benefit?', a: 'No. Only PRSI paid at Class A, E, H or P counts, and Class S contributions from self-employment do not. A self-employed person who is ill may qualify for Supplementary Welfare Allowance, which is means-tested, or for Invalidity Pension if the incapacity is likely to be permanent and its own PRSI conditions are met.' },
    { q: 'Can I keep working part-time on Illness Benefit?', a: 'No, not without written approval. Work of any kind, including voluntary work and training courses, needs the Department’s approval first. After six months on Illness Benefit you can apply for Partial Capacity Benefit, which lets you return to work and keep part of the payment, depending on a medical assessment of your restriction.' },
    { q: 'What happens after two years?', a: `The payment stops at ${n(IB.daysLong)} days, or ${n(IB.daysShort)} with fewer than ${n(IB.longPaidContributions)} paid contributions. The Department writes beforehand. If you are permanently incapable of work, Invalidity Pension may follow; if your disability will last a year or more, Disability Allowance; and failing those, Supplementary Welfare Allowance.` },
    { q: 'Is Illness Benefit taxed?', a: 'Yes, the personal rate and the partner increase are taxable, the child amounts are not. No tax is taken from the payment itself: Revenue reduces your tax credits and standard rate band, so the tax is collected through your wages when you return to work, or through your spouse’s if you are jointly assessed.' },
  ],
  sources: ['sw19', 'ciIb', 'govIb', 'swca'],
  related: ['/social-welfare/', '/social-welfare/maternity-benefit/', '/social-welfare/carers-allowance/', '/guides/prsi-social-insurance/'],
};
