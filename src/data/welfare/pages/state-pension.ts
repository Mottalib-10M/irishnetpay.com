import type { WelfarePage } from '../types';
import { e, n, p, table } from '../fmt';
import { SPC } from '../../../lib/welfare-2026';
import { statePension } from '../../../lib/welfare-engine';

const ya2026 = SPC.yaShare[2026];
const gap = statePension({ paid: 1040, credits: 0, homeCaring: 0, years: 20, drawdownAge: 66, drawdownYear: 2026 });
const gap2030 = statePension({ paid: 1040, credits: 0, homeCaring: 0, years: 20, drawdownAge: 66, drawdownYear: 2030 });
const carer = statePension({ paid: 1100, credits: 300, homeCaring: 600, years: 45, drawdownAge: 66, drawdownYear: 2026 });
const ages = Object.keys(SPC.byAge).map(Number);

export const page: WelfarePage = {
  path: '/social-welfare/state-pension/',
  nav: 'State Pension',
  card: 'The 2026 rate from your contribution record: Total Contributions Approach, the yearly average blend and deferral to 70.',
  title: 'State Pension Ireland 2026: Contributory Rate Calculator',
  description: `State Pension (Contributory) 2026: ${e(SPC.max, 2)} a week with ${n(SPC.tcaFull)} contributions, up to ${e(SPC.byAge[70], 2)} drawn at 70. The TCA and yearly average blend, calculated for you.`,
  h1: 'State Pension (Contributory) in 2026: what your record pays',
  citable: `The maximum State Pension (Contributory) in 2026 is ${e(SPC.max, 2)} a week at 66. The Department of Social Protection now sets the rate mainly by the Total Contributions Approach: paid and voluntary PRSI contributions, plus up to ${n(SPC.maxCredits)} credited contributions and up to ${n(SPC.maxHomeCaring)} HomeCaring periods (no more than ${n(SPC.maxCreditsAndHomeCaring)} of the two together), divided by ${n(SPC.tcaFull)}. A record of ${n(SPC.tcaFull)}, forty years, pays the full rate; ${n(SPC.tcaFull / 2)} pays half. At least ${n(SPC.minPaid)} paid contributions are needed for any pension. The old yearly average method is being phased out until 2034: for a pension first drawn in 2026, the Department also calculates ${p(ya2026, 0)} of the yearly average rate plus ${p(1 - ya2026, 0)} of the TCA rate, and pays whichever result is higher. Drawing the pension later, up to 70, raises the weekly rate, to ${e(SPC.byAge[70], 2)} at the maximum.`,
  sim: 'spc',
  simHref: '/social-welfare/carers-allowance/',
  sections: [
    {
      h2: 'The Total Contributions Approach, step by step',
      html: `<p>Take the record shown on your Contribution Statement from MyWelfare.ie. Column 5 holds the reckonable paid contributions, at most 52 a year; column 6 the reckonable credits. Add them, with HomeCaring periods, under three caps:</p>
<ul>
<li>credited contributions: at most ${n(SPC.maxCredits)} (ten years);</li>
<li>HomeCaring periods, for years spent caring for a child under 12 or an incapacitated person: at most ${n(SPC.maxHomeCaring)} (twenty years);</li>
<li>credits and HomeCaring periods together: at most ${n(SPC.maxCreditsAndHomeCaring)}.</li>
</ul>
<p>Divide the total by ${n(SPC.tcaFull)}. The Department cuts the result at four decimals: in its own example, 1,817 ÷ 2,080 gives 0.8735, so 87.35&nbsp;% of the maximum rate. Applied to ${e(SPC.max, 2)}, that is ${e(Math.floor(1817 / 2080 * 10000) / 10000 * SPC.max, 2)} a week. A carer with ${n(1100)} paid contributions, ${n(300)} credits and ${n(600)} HomeCaring periods reaches ${n(carer.tcaTotal)} usable contributions, ${p(carer.tcaPercent / 100, 2)} of the maximum: ${e(carer.tcaRate, 2)} a week.</p>
<p>Voluntary contributions count as paid ones. They can be made by someone who leaves insurable work with at least ${n(SPC.minPaid)} paid contributions, if they apply within the time limit, and they are often the cheapest way to close a gap.</p>`,
    },
    {
      h2: 'The transition from the yearly average, 2025 to 2034',
      html: `<p>Until 2024, the Department paid the better of the TCA and the yearly average method, which divides all paid and credited contributions by the years since you entered insurance. The yearly average favoured people with a short career and few gaps. It is now being phased out, by the year you draw the pension:</p>
${table(['Year of drawdown', 'Combined approach', 'Paid'], Object.entries(SPC.yaShare).map(([y, s]) => [y, `${p(s, 0)} yearly average + ${p(1 - s, 0)} TCA`, 'Higher of TCA alone or combined']).concat([['2034 onwards', 'TCA only', 'TCA']]), 'State Pension (Contributory): calculation by year of drawdown')}
${table(['Yearly average', 'Rate at 100 %'], SPC.yaBands.map((b, i) => [i === 0 ? `${b.from} or more` : `${b.from} to ${SPC.yaBands[i - 1].from - 1}`, e(b.rate, 2)]), 'Yearly average bands, 2026 rates')}
<p>The yearly average is rounded to the nearest whole number, 47.5 becoming 48. Take someone with ${n(1040)} paid contributions over 20 years in insurance: a yearly average of 52, the top band, but only half the TCA target. Drawn in 2026, the TCA alone pays ${e(gap.tcaRate, 2)}, while the combined approach pays ${p(ya2026, 0)} × ${e(gap.yaRate, 2)} + ${p(1 - ya2026, 0)} × ${e(gap.tcaRate, 2)} = ${e(gap.combined, 2)}, which is what they receive. The same record drawn in 2030 gives ${e(gap2030.weekly, 2)}.</p>`,
    },
    {
      h2: 'Drawing the pension later',
      html: `<p>Since January 2024 the pension can be drawn at any age from 66 to 70, with an actuarially increased rate. You choose the drawdown date; contributions paid until then count, which can matter for anyone short of ${n(SPC.minPaid)}. The year of drawdown, not the year you turn 66, sets which combined approach applies.</p>
${table(['Age at drawdown', 'Maximum weekly rate 2026'], ages.map((a) => [String(a), e(SPC.byAge[a], 2)]), 'Flexible pension: maximum rates (TCA 100 %)')}
<p>For someone on less than the maximum, the increase is reduced in proportion. Waiting four years means giving up four years of payments, which the higher rate repays slowly: the calculator below shows how many years it takes, before tax and future Budget increases, which apply to both options.</p>`,
      mini: 'spc-defer',
      miniHref: '/guides/pension-tax-relief/',
    },
    {
      h2: 'Extras, tax and applying',
      html: `<p>On top of the personal rate, a pensioner living alone gets ${e(SPC.livingAlone)} a week, and ${e(SPC.over80)} more from age 80. A dependent spouse or partner adds an increase for a qualified adult, scaled to the percentage of the maximum you receive and tapered on their own income, and dependent children add the Child Support Payment.</p>
<p>The State Pension (Contributory) is taxable but is paid gross; Revenue collects any tax through other income such as an occupational pension. It is not means-tested, so savings and other pensions do not reduce it. Apply on MyWelfare.ie or on paper, choosing the drawdown date on the form. Anyone with fewer than ${n(SPC.minPaid)} paid contributions can ask about the State Pension (Non-Contributory), which is means-tested, or work on to 70 to complete the record.</p>`,
    },
  ],
  faqs: [
    { q: 'How much is the State Pension in Ireland in 2026?', a: `The maximum State Pension (Contributory) is ${e(SPC.max, 2)} a week at 66, with ${n(SPC.tcaFull)} or more contributions under the Total Contributions Approach. It rises to ${e(SPC.byAge[70], 2)} if drawn at 70. Living alone adds ${e(SPC.livingAlone)} a week and being 80 or over adds ${e(SPC.over80)}.` },
    { q: 'How many years of PRSI do I need for a full State Pension?', a: `${n(SPC.tcaFull)} contributions, which is 40 years of 52 weeks. They can include up to ${n(SPC.maxCredits)} credited contributions and ${n(SPC.maxHomeCaring)} HomeCaring periods, with no more than ${n(SPC.maxCreditsAndHomeCaring)} of the two combined. With fewer, the rate is reduced in proportion. At least ${n(SPC.minPaid)} of the contributions must be paid, not credited.` },
    { q: 'What is the Total Contributions Approach?', a: `The method that divides your total contributions, with capped credits and HomeCaring periods, by ${n(SPC.tcaFull)} to give a percentage of the maximum pension. It replaces the yearly average method gradually: from 2034 it will be the only method, and until then the Department pays the better of TCA alone or a blend with the yearly average.` },
    { q: 'Is it worth deferring the State Pension to 70?', a: `It depends on your health and other income. At the maximum, waiting from 66 to 70 raises the pension from ${e(SPC.max, 2)} to ${e(SPC.byAge[70], 2)} a week, but four years of payments are forgone, and the extra amount takes many years to repay them. Deferral is most useful for someone still short of the contributions needed.` },
    { q: 'Do credits from Jobseeker’s or Illness Benefit count?', a: `Yes, but only up to ${n(SPC.maxCredits)} under the Total Contributions Approach, and together with HomeCaring periods within the ${n(SPC.maxCreditsAndHomeCaring)} cap. Under the yearly average method, still blended into the calculation until 2033, all reckonable credits count. Credits never count towards the ${n(SPC.minPaid)} paid contributions needed to qualify.` },
    { q: 'Is the State Pension taxed?', a: 'Yes, it is taxable income, though it is paid without deduction. Revenue collects the tax by reducing the tax credits applied to an occupational or private pension, or to earnings. It is not means-tested, so savings, a lump sum or a private pension never reduce it.' },
  ],
  sources: ['sw19', 'ciSp', 'govSpCalc', 'govSp', 'swca'],
  related: ['/social-welfare/', '/social-welfare/carers-allowance/', '/guides/prsi-social-insurance/', '/guides/pension-tax-relief/'],
};
