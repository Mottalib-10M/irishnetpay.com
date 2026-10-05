import type { WelfarePage } from '../types';
import { e, n, p, date, table } from '../fmt';
import { HTB, STAMP_DUTY } from '../../../lib/welfare-2026';
import { helpToBuy, stampDuty } from '../../../lib/welfare-engine';

const cases: Array<[string, number, number, number]> = [
  ['Couple, new house', 420_000, 340_000, 52_000],
  ['Single buyer, apartment', 260_000, 220_000, 31_000],
  ['Recent graduate, small tax record', 330_000, 300_000, 14_500],
  ['Large deposit, small mortgage', 400_000, 260_000, 60_000],
];
const ex = helpToBuy(380_000, 300_000, 45_000);

export const page: WelfarePage = {
  path: '/help-to-buy-ireland/',
  nav: 'Help to Buy',
  card: 'The refund on a first new home: the €30,000 cap, 10 % of the price and four years of tax.',
  title: 'Help to Buy Ireland 2026: €30,000 Refund Calculator',
  description: `Help to Buy Ireland 2026: the lesser of ${e(HTB.max)}, ${p(HTB.priceShare)} of a new home's price (max price ${e(HTB.priceCap)}) and your income tax and DIRT over 4 years. Free calculator.`,
  h1: 'Help to Buy in 2026: how much of your tax comes back',
  citable: `Help to Buy is a Revenue refund of income tax and Deposit Interest Retention Tax paid over the four tax years before you apply, for a first-time buyer of a newly built home or a self-build. Under the enhanced scheme, extended to ${date(HTB.endDate)}, the refund is the lowest of three figures: ${e(HTB.max)}, ${p(HTB.priceShare)} of the purchase price or approved valuation, and the income tax and DIRT you actually paid in those four years. USC and PRSI do not count. The home must cost ${e(HTB.priceCap)} or less, the mortgage from a qualifying lender must be at least ${p(HTB.minLtv)} of the price, and you must live in it as your main home for ${HTB.residenceYears} years. The refund is paid to the Revenue-approved developer as part of the deposit, or into the mortgage account for a self-build. A couple buying a ${e(380000)} home with a ${e(300000)} mortgage, who paid ${e(45000)} in income tax over four years, gets ${e(ex.amount)}.`,
  sim: 'htb',
  simHref: '/stamp-duty-ireland/',
  tool: true,
  sections: [
    {
      h2: 'The three limits, and which one applies to you',
      html: `<p>The refund is never more than the smallest of the three amounts below. Most couples buying in the €300,000 to €500,000 range hit the ${e(HTB.max)} ceiling; a single buyer early in their career is usually limited by the tax they have paid; a cheaper home is limited by the ${p(HTB.priceShare)} rule.</p>
${table(['Limit', 'Amount'], [
  ['Ceiling per property, however many buyers', e(HTB.max)],
  ['Share of the purchase price or approved valuation', p(HTB.priceShare)],
  ['Your tax', `Income tax and DIRT paid in the ${HTB.taxYears} tax years before the application`],
], 'Help to Buy, enhanced relief')}
${table(['Case', 'Price', 'Mortgage', 'Tax over 4 years', 'Refund'], cases.map(([label, price, mortgage, tax]) => { const r = helpToBuy(price, mortgage, tax); return [label, e(price), e(mortgage), e(tax), r.amount ? e(r.amount) : `Nil (${p(r.ltv)} mortgage)`]; }), 'Help to Buy, worked cases')}
<p>The last case shows a trap: a ${e(400000)} home bought with a ${e(260000)} mortgage is financed at ${p(260000 / 400000)}, below the ${p(HTB.minLtv)} floor, and gets nothing at all, however much tax the buyers paid. A larger deposit can cost the whole refund.</p>`,
    },
    {
      h2: 'Who qualifies',
      html: `<ul>
<li><strong>First-time buyer.</strong> You must never have bought or built a house or apartment, alone or with anyone, in Ireland or abroad. Every buyer named on the contract must meet this test. An inherited or gifted property does not necessarily disqualify you.</li>
<li><strong>A new home.</strong> It must never have been used or been suitable for use as a dwelling, and its construction must have been subject to Irish VAT. A non-residential building converted into a home can qualify. A second-hand home cannot.</li>
<li><strong>The price.</strong> The full open market value, or the lender's approved valuation for a self-build, must be ${e(HTB.priceCap)} or less. One euro above, and nothing is refunded.</li>
<li><strong>The mortgage.</strong> At least ${p(HTB.minLtv)} of the price, from a qualifying lender, used to buy or build the home. Shared equity under the First Home Scheme does not count towards the ${p(HTB.minLtv)}; an affordable dwelling contribution from a local authority, for contracts signed from 11 October 2023, does.</li>
<li><strong>Five years in the home.</strong> You must live in it as your main residence for ${HTB.residenceYears} years, or Revenue can claw the refund back.</li>
<li><strong>Tax compliance</strong>, with tax clearance where relevant, and a developer on Revenue's list of approved contractors. A self-builder does not need an approved contractor but must have a solicitor registered with Revenue as an HTB approver.</li>
</ul>`,
    },
    {
      h2: 'Help to Buy and Stamp Duty on the same home',
      html: `<p>The two meet on every new-build purchase. Stamp Duty on a new home is charged on the price without VAT, so it is lower than on a second-hand house at the same price, and the Help to Buy refund is usually much larger than the duty. On a ${e(420000)} new home with ${p(STAMP_DUTY.newHomeVat)} VAT included, the duty is ${e(stampDuty(420000, 'newInclVat').duty)}, while a buyer who paid enough tax receives ${e(helpToBuy(420000, 378000, 50000).amount)} from Help to Buy.</p>`,
      mini: 'stamp-htb',
      miniHref: '/stamp-duty-ireland/',
    },
    {
      h2: 'How much tax you need to have paid',
      html: `<p>For the refund to reach its ceiling, the buyers together need to have paid at least the lower of ${e(HTB.max)} and ${p(HTB.priceShare)} of the price in income tax and DIRT over the four tax years before the application, after any refunds already claimed for those years. On a ${e(300000)} home, ${e(Math.min(HTB.max, 300000 * HTB.priceShare))} of tax is enough; above ${e(HTB.max / HTB.priceShare)}, it takes ${e(HTB.max)}. Two buyers' tax is added together.</p>
<p>USC and PRSI never count, which surprises many applicants: on a typical payslip, income tax after credits is a smaller share than people expect. The site's salary calculator shows the income tax line on its own. Someone who has claimed back tax for those years, for example through the rent or medical expenses credits, reduces the amount Help to Buy can refund.</p>`,
      mini: 'htb-tax',
      miniHref: '/',
    },
    {
      h2: 'Applying',
      html: `<p>The process runs online through Revenue myAccount (or ROS) in three stages. The application checks your tax compliance and gives an application number, an access code and the maximum you could get from your tax record; buyers named together on the mortgage apply as a group. The claim follows, with the loan offer and the signed contract (or, for a self-build, proof of the first drawdown and the lender's valuation). The developer or the solicitor then verifies it. The scheme is open for contracts signed, or first drawdowns made, from 23 July 2020 to ${date(HTB.endDate)} under the enhanced rules. The refund goes to the approved developer, counting towards the deposit, or for a self-build into a bank account held with the mortgage lender.</p>`,
    },
  ],
  faqs: [
    { q: 'How much can I get from Help to Buy?', a: `The lowest of ${e(HTB.max)}, ${p(HTB.priceShare)} of the purchase price of the new home, and the income tax and DIRT you paid in the four tax years before applying. The ${e(HTB.max)} is a ceiling per property, not per buyer, so two buyers together still receive at most ${e(HTB.max)}.` },
    { q: 'Does Help to Buy apply to second-hand homes?', a: 'No. The home must be newly built, never used or suitable for use as a dwelling, with its construction subject to Irish VAT, or a self-build. A building converted from non-residential use can qualify. A second-hand house or apartment does not, however low its price, and neither does a property bought as an investment.' },
    { q: 'What is the maximum house price for Help to Buy?', a: `${e(HTB.priceCap)}, measured as the full open market value of the home or, for a self-build, the valuation approved by the lender. Above that figure no refund is payable at all; the scheme does not apply a reduced refund to dearer homes. For a purchase, it is normally the price you paid.` },
    { q: 'Why do I need a 70% mortgage?', a: `It is a condition of the scheme: the loan from a qualifying lender must be at least ${p(HTB.minLtv)} of the purchase value or approved valuation. A buyer who puts down a larger deposit and borrows less loses the refund entirely. First Home Scheme shared equity does not count towards the ${p(HTB.minLtv)}.` },
    { q: 'Does USC count towards Help to Buy?', a: 'No. Only income tax and Deposit Interest Retention Tax paid in the four tax years before the application are refundable. Universal Social Charge and PRSI, although deducted from the same payslip, are left out, as is any tax already refunded for those years. Check the income tax line, not total deductions.' },
    { q: 'What happens if I sell within five years?', a: `You must live in the home as your main residence for ${HTB.residenceYears} years after buying or building it. If you do not live there for that minimum period, Revenue can claw back the refund. It can also do so if you were not entitled to it, or if the purchase or the build is never completed.` },
    { q: 'Is Help to Buy still available in 2026?', a: `Yes. The enhanced scheme, with its ${e(HTB.max)} maximum, applies to contracts signed or first self-build drawdowns made up to ${date(HTB.endDate)}, according to Revenue's pages published on 1 January 2026. Applications are made through Revenue myAccount, and the developer must be on Revenue's approved list.` },
  ],
  sources: ['revHtbAmount', 'revHtbWho', 'revHtbProperty', 'revHtbApply', 'revHtbClawback', 'revHtbTdm', 'tca'],
  related: ['/stamp-duty-ireland/', '/guides/tax-credits-ireland/', '/', '/social-welfare/'],
};
