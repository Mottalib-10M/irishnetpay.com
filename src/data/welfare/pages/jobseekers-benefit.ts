import type { WelfarePage } from '../types';
import { e, n, p, date, src, table } from '../fmt';
import { JB, JPRB, GRADUATED_BANDS, NOTIONAL_WEEKLY_EARNINGS, CHILD_SUPPORT, IQA_LIMIT, IQA_FULL } from '../../../lib/welfare-2026';
import { jprbSchedule } from '../../../lib/welfare-engine';

const [l1, l2, l3] = JPRB.long;
const s1 = JPRB.short[0];
const G = 800;
const ex = jprbSchedule(G, 300);
const full = GRADUATED_BANDS[0];

export const page: WelfarePage = {
  path: '/social-welfare/jobseekers-benefit/',
  nav: "Jobseeker's Benefit",
  card: 'Pay-related rate after a lay-off, graduated rate for part-time weeks, and how long each lasts.',
  title: "Jobseeker's Benefit 2026: Pay-Related Rate Calculator",
  description: `Jobseeker's Benefit Ireland 2026: ${p(l1.rate)} of pay up to ${e(l1.cap)} a week for 13 weeks, the graduated rates up to ${e(full.personal)}, duration by PRSI record. Free calculator.`,
  h1: "Jobseeker's Benefit and Pay-Related Benefit in 2026",
  citable: `Since 31 March 2025 a worker who loses a job outright no longer gets the flat Jobseeker's Benefit: the Department of Social Protection pays Jobseeker's Pay-Related Benefit instead, worked out on gross earnings over the twelve months that end eight weeks before the job ended. With ${n(JPRB.longPaidContributions)} or more paid PRSI contributions, the rate is ${p(l1.rate)} of those weekly earnings for ${l1.weeks} weeks, capped at ${e(l1.cap)}, then ${p(l2.rate)} capped at ${e(l2.cap)}, then ${p(l3.rate)} capped at ${e(l3.cap)}, for ${l1.weeks + l2.weeks + l3.weeks} weeks in all. Between ${n(JPRB.minPaidContributions)} and ${n(JPRB.longPaidContributions - 1)} paid contributions it is ${p(s1.rate)} for ${s1.weeks} weeks, capped at ${e(s1.cap)}. Nobody gets less than ${e(JPRB.minimum)} a week. The older Jobseeker's Benefit, graduated from ${e(GRADUATED_BANDS[3].personal, 2)} to ${e(full.personal)} by earnings in 2024, now covers part-time, casual, short-time and seasonal workers who keep some work.`,
  sim: 'jprb',
  simHref: '/social-welfare/jobseekers-allowance/',
  sections: [
    {
      h2: 'Which of the two payments you claim',
      html: `<p>The split is about how much work you have lost, not about your contract type. If the job has gone completely and you have no other employment, the claim is for the pay-related scheme: it is paid only to people who are <strong>fully unemployed</strong>, and you cannot work any day while on it. If you still have some work, a reduced week, a seasonal lay-off or casual shifts, the claim is for Jobseeker's Benefit, which is paid for the days you are not working provided you are unemployed for at least four days out of seven.</p>
<p>The two schemes connect. Someone on the pay-related scheme who takes part-time work moves to Jobseeker's Benefit for the days without work, and the earnings figure used for the pay-related rate carries over. Time already spent on the pay-related scheme counts against the Jobseeker's Benefit entitlement, each week of it counting as ${JB.paymentDaysPerWeek} days.</p>
<p>People whose last day of work was before Friday 28 March 2025 stayed on the old scheme until their entitlement ran out. Anyone in that position needs to work again before qualifying for the pay-related payment.</p>`,
    },
    {
      h2: 'How the pay-related rate is set',
      html: `<p>The DSP takes your earnings directly from Revenue's payroll data. It averages your gross weekly earnings over the twelve months ending eight weeks before you lost the job: a job lost on 15 December 2025 looks back to 20 October 2025, and averages earnings from 20 October 2024 to that date. You do not have to supply payslips, but it is worth checking the figure in the decision letter against your own records, particularly where a bonus or overtime fell inside the window.</p>
${table(['Weeks', 'Share of average weekly earnings', 'Weekly cap'], [
  [`1 to ${l1.weeks}`, p(l1.rate), e(l1.cap)],
  [`${l1.weeks + 1} to ${l1.weeks + l2.weeks}`, p(l2.rate), e(l2.cap)],
  [`${l1.weeks + l2.weeks + 1} to ${l1.weeks + l2.weeks + l3.weeks}`, p(l3.rate), e(l3.cap)],
], `With ${n(JPRB.longPaidContributions)} or more paid contributions, 2026. Minimum ${e(JPRB.minimum)} a week throughout.`)}
<p>A worked example: average gross pay of ${e(G)} a week gives ${e(ex.periods[0].weekly)} for the first ${l1.weeks} weeks (${p(l1.rate)} of ${e(G)} is ${e(G * l1.rate)}, ${G * l1.rate > l1.cap ? 'over' : 'under'} the cap), ${e(ex.periods[1].weekly)} for the next ${l2.weeks}, then ${e(ex.periods[2].weekly)}. Over the whole claim that is ${e(ex.total)}. The caps start to bite at weekly earnings of ${e(l1.cap / l1.rate)} in the first period and ${e(l3.cap / l3.rate)} in the last, which is why higher earners see three flat amounts.</p>
<p>No increase is paid for a partner or children on the pay-related scheme. A household with dependants can ask at any point, if under 66, whether the means-tested Optional Jobseeker's Allowance would pay more, which tends to happen after the first ${l1.weeks} weeks or when the pay-related rate is low. Time on Optional Jobseeker's Allowance counts as time on the pay-related scheme.</p>`,
    },
    {
      h2: 'The PRSI conditions',
      html: `<p>Three conditions apply to the pay-related scheme, and all three must be met: at least ${n(JPRB.minPaidContributions)} paid contributions at Class A, H or P since you started work; at least 4 paid contributions at Class A or H in the 10 weeks before you apply; and at least 26 in the 52 weeks before your first day of unemployment. Credited contributions do not count towards the ${n(JPRB.minPaidContributions)}, which is why someone who has worked for less than two years usually ends up on Jobseeker's Allowance.</p>
<p>The duration then follows the paid record: ${n(JPRB.longPaidContributions)} or more paid contributions (about five years) gives the full ${l1.weeks + l2.weeks + l3.weeks} weeks; fewer gives ${s1.weeks} weeks at the ${p(s1.rate)} rate. Apply within ${JPRB.applyWithinWeeks} weeks of losing the job: a late claim can cost part of the entitlement.</p>
<p>Jobseeker's Benefit for part-time workers uses a different test, based on the relevant tax year, which for a claim made in 2026 is 2024. You need ${n(JB.minPaidContributions)} paid contributions since you started work, plus either 39 paid or credited in 2024 (at least 13 of them paid), or 26 paid in 2024 and 26 paid in 2023.</p>`,
    },
    {
      h2: "Jobseeker's Benefit rates for a reduced working week",
      html: `<p>Jobseeker's Benefit is not pay-related. The personal rate depends on your average weekly earnings in the relevant tax year: gross earnings in 2024 divided by the number of paid contributions in 2024. Below ${e(NOTIONAL_WEEKLY_EARNINGS)} a week, or with only credits that year, a notional ${e(NOTIONAL_WEEKLY_EARNINGS)} is used.</p>
${table(['Average weekly earnings in 2024', 'Personal rate', 'Increase for a qualified adult'], GRADUATED_BANDS.map((b, i) => [
  i === 0 ? `${e(b.from)} or more` : i === GRADUATED_BANDS.length - 1 ? `Less than ${e(GRADUATED_BANDS[i - 1].from)}` : `${e(b.from)} to ${e(GRADUATED_BANDS[i - 1].from - 0.01, 2)}`,
  e(b.personal, 2), e(b.adult, 2),
]), "Jobseeker's Benefit, weekly rates 2026 (SW19)")}
<p>A Child Support Payment of ${e(CHILD_SUPPORT.under12)} for each child under 12 and ${e(CHILD_SUPPORT.over12)} for each child aged 12 or over is added in full when you get an increase for your partner or are parenting alone. The partner increase tapers once their gross income passes ${e(IQA_FULL[0].upTo)} a week and stops above ${e(IQA_LIMIT)}.</p>
<p>The week is counted as five days. Each day you work removes one fifth of the weekly rate: two days of work leaves three fifths, three days leaves two fifths. A fourth day of work means you are no longer unemployed for four days out of seven, and nothing is paid for that week.</p>`,
      mini: 'jb-parttime',
      miniHref: '/social-welfare/jobseekers-allowance/',
    },
    {
      h2: 'How long it lasts, waiting days and disqualification',
      html: `<p>Jobseeker's Benefit is paid for ${n(JB.daysLong)} days (nine months) with ${n(JB.longPaidContributions)} or more paid contributions and ${n(JB.daysShort)} days (six months) with fewer. The first ${JB.waitingDays} days of a new claim are not paid, so the claim should be made on the first day of unemployment. A claim made within 26 weeks of the last one links to it: no new waiting days, and the days already used are carried forward.</p>
<p>Either payment can be withheld for up to nine weeks if you left work voluntarily without good reason or lost the job through misconduct. On Jobseeker's Benefit only, a worker under 55 whose redundancy payment exceeds ${e(JB.redundancyDisqualificationFrom)} faces a disqualification of one to nine weeks depending on the amount. A redundancy payment has no effect on the pay-related scheme.</p>
<p>Both payments are taxable, collected by reducing your tax credits rather than at source. You receive a credited PRSI contribution for each week paid, which protects your record for the State Pension. The figures here were read on ${date('2026-10-05')} in the DSP's SW19 booklet and on Citizens Information.</p>`,
    },
  ],
  faqs: [
    { q: "Is Jobseeker's Benefit the same as Pay-Related Benefit?", a: `No. Since 31 March 2025 anyone fully unemployed after a job of their own claims the pay-related payment, set at a share of previous earnings up to ${e(l1.cap)} a week. Jobseeker's Benefit remains for people who still work part of the week, such as casual, seasonal or short-time workers, and is paid at graduated flat rates up to ${e(full.personal)} a week.` },
    { q: 'Which earnings does the DSP use for the pay-related rate?', a: 'Your gross weekly earnings averaged over the twelve months that end eight weeks before the job ended, taken from Revenue payroll data. Bonuses and overtime paid inside that window count. If you were on another payment or on maternity or parental leave before claiming, the DSP generally uses the year before that period instead.' },
    { q: 'Can I get more than €450 a week?', a: `No. ${e(l1.cap)} is the ceiling for the first ${l1.weeks} weeks, whatever the salary, and no increase for a partner or child is added to the pay-related scheme. A family with dependants may find that Optional Jobseeker's Allowance pays more, especially after week ${l1.weeks}, and can switch while staying within the same overall entitlement.` },
    { q: 'What happens when the 39 weeks run out?', a: "The pay-related scheme ends and there is no automatic follow-on. If you are still out of work, you can apply for Jobseeker's Allowance, which is means-tested on household income and savings. A break of more than 13 weeks closes a pay-related claim; after twelve months without one, a new claim starts with a fresh entitlement." },
    { q: 'Does a redundancy payment stop the benefit?', a: `Not on the pay-related scheme: a statutory or voluntary redundancy lump sum has no effect on it. On Jobseeker's Benefit, a person under 55 who receives more than ${e(JB.redundancyDisqualificationFrom)} can be disqualified for one to nine weeks, the length rising by one week for each ${e(5000)} band above the threshold.` },
    { q: 'How do I apply?', a: `Online at MyWelfare.ie with a verified MyGovID, or at an Intreo Centre. Apply within ${JPRB.applyWithinWeeks} weeks of losing the job for the pay-related payment, and on the first day of unemployment for Jobseeker's Benefit, since its first ${JB.waitingDays} days are unpaid. Your employer does not need to send anything: the DSP takes the earnings from Revenue.` },
    { q: 'Is it taxed?', a: "Yes, both are taxable income, but no tax is deducted from the weekly payment. Revenue collects it by reducing the tax credits and rate band on your record, so the tax shows up on your next payslip or on the end-of-year statement. USC and PRSI are not charged on the benefit itself. Short-time work support is the one case that is not taxed." },
  ],
  sources: ['sw19', 'ciJprb', 'ciJb', 'govJprb', 'govJb', 'swca'],
  related: ['/social-welfare/', '/social-welfare/jobseekers-allowance/', '/social-welfare/illness-benefit/', '/guides/prsi-social-insurance/', '/'],
};
