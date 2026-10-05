import type { WelfarePage } from '../types';
import { e, n, p, date, table } from '../fmt';
import { STAMP_DUTY } from '../../../lib/welfare-2026';
import { stampDuty } from '../../../lib/welfare-engine';

const [b1, b2] = STAMP_DUTY.bands;
const examples = [350_000, 600_000, 1_200_000, 2_000_000];
const newHome = stampDuty(400_000, 'newInclVat');
const block = stampDuty(3_000_000, 'secondHand', true);
const plain = stampDuty(3_000_000);

export const page: WelfarePage = {
  path: '/stamp-duty-ireland/',
  nav: 'Stamp Duty',
  card: 'Residential Stamp Duty band by band, with VAT taken out of a new-build price as Revenue requires.',
  title: 'Stamp Duty Ireland 2026: Calculator, 1%, 2% and 6% Bands',
  description: `Stamp Duty Ireland 2026 on a home: ${p(b1.rate)} up to ${e(b1.upTo)}, ${p(b2.rate)} to ${e(b2.upTo)}, ${p(STAMP_DUTY.bands[2].rate)} above. New builds are taxed on the price without VAT. Free online calculator.`,
  h1: 'Stamp Duty on residential property in Ireland',
  citable: `Stamp Duty on a home in Ireland is charged by Revenue on the price, in bands, for every buyer: there is no first-time buyer exemption. On instruments executed since ${date(STAMP_DUTY.ratesFrom)}, the rate is ${p(b1.rate)} on the first ${e(b1.upTo)}, ${p(b2.rate)} on the part between ${e(b1.upTo)} and ${e(b2.upTo)}, and ${p(STAMP_DUTY.bands[2].rate)} on anything above ${e(b2.upTo)}. A ${e(350000)} house therefore costs ${e(stampDuty(350000).duty)} in duty and a ${e(2000000)} house ${e(stampDuty(2000000).duty)}. On a new home the duty is worked out on the price without VAT: Revenue's own example divides a ${e(400000)} price that includes ${p(STAMP_DUTY.newHomeVat)} VAT by ${1 + STAMP_DUTY.newHomeVat}, giving ${e(newHome.consideration, 2)}, so the duty is ${e(newHome.duty, 2)} rather than ${e(4000)}. The return is filed and the duty paid on ROS, usually by your solicitor, within ${STAMP_DUTY.fileWithinDays} days of the deed being signed.`,
  sim: 'stamp',
  simHref: '/help-to-buy-ireland/',
  tool: true,
  sections: [
    {
      h2: 'The bands, and what they cost at common prices',
      html: `${table(['Part of the price', 'Rate'], [
  [`Up to ${e(b1.upTo)}`, p(b1.rate)],
  [`${e(b1.upTo)} to ${e(b2.upTo)}`, p(b2.rate)],
  [`Above ${e(b2.upTo)}`, p(STAMP_DUTY.bands[2].rate)],
], `Residential property, instruments executed on or after ${date(STAMP_DUTY.ratesFrom)}`)}
${table(['Price', 'Stamp Duty', 'Effective rate'], examples.map((x) => { const r = stampDuty(x); return [e(x), e(r.duty), p(r.effective, 2)]; }), 'Second-hand homes, 2026')}
<p>Each rate applies only to the slice of the price inside its band, the way income tax bands work. Crossing ${e(b1.upTo)} does not raise the duty on the first million: a ${e(1_000_001)} home pays ${e(stampDuty(1_000_001).duty, 2)}. The ${p(STAMP_DUTY.bands[2].rate)} band, introduced for instruments executed from ${date(STAMP_DUTY.ratesFrom)}, only reaches homes above ${e(b2.upTo)}.</p>`,
    },
    {
      h2: 'New homes: the VAT comes out first',
      html: `<p>Stamp Duty is never charged on VAT. When the price of a new house or apartment includes VAT, Revenue requires the VAT-exclusive amount to be worked out first, by dividing the price by one plus the VAT rate, and the duty is charged on that. Using the ${p(STAMP_DUTY.newHomeVat)} rate of Revenue's example, a ${e(400000)} new home is taxed on ${e(newHome.consideration, 2)} and pays ${e(newHome.duty, 2)}, about ${e(4000 - newHome.duty)} less than a second-hand home at the same price. The calculator offers both cases; if the contract states the price net of VAT, choose the third option.</p>
<p>The same principle applies when you buy a site with a connected building agreement, where the site cannot be transferred without the house being built: the site counts as residential and the duty is charged on the site plus the building cost, excluding VAT. A site bought on its own, with no such agreement, is non-residential property and pays ${p(STAMP_DUTY.nonResidential)}.</p>`,
    },
    {
      h2: 'What counts as residential, and special cases',
      html: `<p>A house or apartment used, or suitable for use, as a dwelling is residential, including one being built or adapted. The garden, driveway, garage and sheds up to ${n(STAMP_DUTY.curtilageAcres)} acre count with it; any land beyond one acre is non-residential and pays ${p(STAMP_DUTY.nonResidential)}. A derelict house is still residential property for Stamp Duty. Planning permission alone does not make a site residential.</p>
<ul>
<li><strong>Three or more apartments in the same block</strong> bought in one transaction pay ${p(STAMP_DUTY.apartmentBlockBands[0].rate)} up to ${e(STAMP_DUTY.apartmentBlockBands[0].upTo)} and ${p(STAMP_DUTY.apartmentBlockBands[1].rate)} on the rest, with no ${p(STAMP_DUTY.bands[2].rate)} band: ${e(block.duty)} on ${e(3_000_000)} instead of ${e(plain.duty)}.</li>
<li><strong>Ten or more houses</strong> (not apartments) bought by the same person within 12 months attract ${p(STAMP_DUTY.bulkRate)} under section 31E of the Stamp Duties Consolidation Act 1999.</li>
<li><strong>Mixed-use property</strong>, such as a flat over a shop, is split: the residential rates on the residential part and ${p(STAMP_DUTY.nonResidential)} on the rest.</li>
<li><strong>A gift</strong> of property pays Stamp Duty on its market value, at the same rates.</li>
</ul>`,
      mini: 'stamp-htb',
      miniHref: '/help-to-buy-ireland/',
    },
    {
      h2: 'Paying it',
      html: `<p>The buyer pays. A Stamp Duty return is filed through the Revenue Online Service, usually by the solicitor handling the purchase, who needs the Local Property Tax property ID of the home. The duty is paid as part of filing the return, and both should happen within ${STAMP_DUTY.fileWithinDays} days of the date the deed is executed (signed, sealed or both).</p>
<p>A return filed after ${STAMP_DUTY.fileWithinDays} days carries a surcharge of ${p(STAMP_DUTY.surcharge[0].rate)} of the unpaid duty, capped at ${e(STAMP_DUTY.surcharge[0].cap)}; after ${STAMP_DUTY.surcharge[1].afterDays} days it becomes ${p(STAMP_DUTY.surcharge[1].rate)}, capped at ${e(STAMP_DUTY.surcharge[1].cap)}. Late payment also bears interest of ${p(STAMP_DUTY.dailyInterest, 4)} a day from the date of execution. Once the return is filed and paid, ROS issues a stamp certificate: attached to the deed, it shows that the deed has been stamped, and it is also the receipt.</p>
<p>For a first home that is new, Help to Buy can refund part of the deposit, which is usually several times the Stamp Duty on the same purchase.</p>`,
    },
  ],
  faqs: [
    { q: 'How much is Stamp Duty on a house in Ireland?', a: `${p(b1.rate)} of the price up to ${e(b1.upTo)}, ${p(b2.rate)} on the part between ${e(b1.upTo)} and ${e(b2.upTo)}, and ${p(STAMP_DUTY.bands[2].rate)} above that. A ${e(350000)} home pays ${e(stampDuty(350000).duty)} and a ${e(600000)} home ${e(stampDuty(600000).duty)}. On a new home, the duty is charged on the price excluding VAT.` },
    { q: 'Do first-time buyers pay Stamp Duty in Ireland?', a: 'Yes. There is no Stamp Duty exemption or reduced rate for first-time buyers on a residential purchase; the same bands apply to every buyer. First-time buyers of a new home may instead claim Help to Buy, a refund of income tax and DIRT that goes towards the deposit and is usually larger than the duty.' },
    { q: 'Is Stamp Duty charged on the VAT of a new home?', a: `No. Revenue states that Stamp Duty is not paid on VAT. If the price includes VAT, divide it by one plus the VAT rate to get the VAT-exclusive consideration, and apply the bands to that. At ${p(STAMP_DUTY.newHomeVat)} VAT, a ${e(400000)} price becomes ${e(newHome.consideration, 2)} and the duty ${e(newHome.duty, 2)}.` },
    { q: 'When is the 6% Stamp Duty rate charged?', a: `Only on the part of a residential price above ${e(b2.upTo)}, for instruments executed on or after ${date(STAMP_DUTY.ratesFrom)}. A ${e(2_000_000)} home pays ${p(b1.rate)} on the first million, ${p(b2.rate)} on the next half million and ${p(STAMP_DUTY.bands[2].rate)} on the last half million: ${e(stampDuty(2_000_000).duty)} in total.` },
    { q: 'Who pays Stamp Duty, buyer or seller?', a: 'The buyer. The return is filed on the Revenue Online Service, usually by the buyer’s solicitor, and the duty is paid with it, within ${STAMP_DUTY.fileWithinDays} days of the deed being executed. After that a surcharge of ${p(STAMP_DUTY.surcharge[0].rate)} applies, rising to ${p(STAMP_DUTY.surcharge[1].rate)} after ${STAMP_DUTY.surcharge[1].afterDays} days, plus daily interest on the unpaid duty.' },
    { q: 'Is there Stamp Duty on a site?', a: `A site bought on its own is non-residential and pays ${p(STAMP_DUTY.nonResidential)}. If the purchase of the site is connected to an agreement to build a house on it, so that one cannot happen without the other, the site is residential and duty is charged at the residential rates on the site plus the building cost, excluding VAT.` },
    { q: 'Does land around the house count?', a: `Gardens, driveways, garages and sheds count as residential up to ${n(STAMP_DUTY.curtilageAcres)} acre. Anything beyond one acre is non-residential and charged at ${p(STAMP_DUTY.nonResidential)}, so the price is split between the residential and non-residential parts, each taxed at its own rate. The site on which the house stands is not part of that one-acre allowance.` },
  ],
  sources: ['revSdRates', 'revSdVat', 'revSdRes', 'revSdLate', 'sdca'],
  related: ['/help-to-buy-ireland/', '/social-welfare/', '/', '/average-salary-ireland/'],
};
