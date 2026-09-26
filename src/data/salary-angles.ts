/**
 * What is true at one salary level and false at the others (RECETTE §6).
 *
 * The twelve salary pages shared about 80 per cent of their text, because only
 * the figures changed and the uniqueness check neutralises figures. Each entry
 * below is about a threshold, a relief or a decision that belongs to that level
 * of income in Ireland, and the vocabulary differs on purpose.
 */
export interface Angle { heading: string; paragraphs: string[] }

export const SALARY_ANGLES: Record<string, Angle[]> = {
  '25000': [
    { heading: 'Around the USC exemption and the PRSI threshold',
      paragraphs: [
        'At this level two thresholds do more to the payslip than the income tax bands. The USC exemption applies below an annual income floor, and crossing it makes the charge payable on the whole income rather than on the excess, which produces a step in the deduction rather than a gradual increase. The weekly PRSI threshold works the same way for Class A employees: below it no employee contribution is due, and just above it a tapered credit softens the jump. Both are weekly or annual figures rather than monthly, which is why a month with overtime can carry a deduction that the following month does not.',
        'The practical consequence is that a small pay rise at this level can be worth less in the hand than the gross figure suggests, and that the timing of irregular pay matters. It is also the level at which the rent tax credit and the working from home relief are worth proportionally the most, because they are flat amounts set against a smaller tax bill.',
      ] },
  ],
  '30000': [
    { heading: 'Below the cut-off point, where credits do the work',
      paragraphs: [
        'At thirty thousand euro, all income falls within the standard rate band for a single person, so the marginal rate is the standard rate plus USC and PRSI. Nothing is taxed at the higher rate, which means the whole tax bill is determined by credits rather than by bands. That inverts the usual advice: reviewing the tax credit certificate is worth more here than any pension or timing decision, because each unclaimed credit is a euro-for-euro reduction in a bill that is already modest.',
        'The credits most often missed at this level are the rent tax credit, medical expenses relief, and the remote working relief on utility costs. Each can be claimed for the four previous years, so a first claim usually recovers several times the annual amount. A second point specific to this band: a pension contribution attracts relief only at the standard rate here, not at the higher rate, so the net cost of contributing is considerably greater than it is for a higher earner.',
      ] },
  ],
  '35000': [
    { heading: 'Approaching the standard rate cut-off point',
      paragraphs: [
        'Thirty-five thousand euro sits close to the single person standard rate cut-off point, which makes this the level at which the marginal rate is about to change and where a pay rise is worth the least per euro. Income up to the cut-off is taxed at the standard rate; anything above it at the higher rate, plus USC and PRSI on the whole amount. The jump is large enough that the net value of a two thousand euro rise differs substantially depending on which side of the line it falls.',
        'Two adjustments are specific to this position. A pension contribution made to bring taxable pay back under the cut-off attracts relief at the higher rate on the part above it, which is the most efficient euro a person at this income can contribute. And for a married couple, transferring part of the cut-off point to the higher earner moves income out of the higher rate entirely, which is worth checking before any other adjustment.',
      ] },
  ],
  '40000': [
    { heading: 'The first euros taxed at the higher rate',
      paragraphs: [
        'At forty thousand euro a single employee has income above the standard rate cut-off point, and the portion above it carries the higher rate. This changes the value of every deduction: a euro of pension contribution, of medical expense or of allowable expense now saves tax at the higher rate rather than the standard one, roughly doubling what the same claim was worth a few thousand euro lower down. It also means the effective rate on the last slice of income is markedly above the average rate, which is the figure a payslip makes visible and the average rate is not.',
        'The second consequence concerns bonuses. A bonus paid on top of this salary is taxed entirely at the marginal rate, so roughly half of it arrives. Where the employer offers a pension additional voluntary contribution facility, directing a bonus into it rather than taking it as cash avoids that, subject to the age-related contribution limit.',
      ] },
  ],
  '45000': [
    { heading: 'Where the marginal rate settles and stays',
      paragraphs: [
        'By forty-five thousand euro the marginal rate has stabilised: income tax at the higher rate, USC in its upper band and PRSI at the standard Class A rate, with no further thresholds until the top USC band. From here to well above one hundred thousand euro, an extra euro of salary is taxed at very nearly the same rate, which means the arithmetic of a pay rise stops changing and the arithmetic of what to do with it becomes the question.',
        'Three options are worth comparing at this level, and they are not equivalent. A pension contribution obtains relief at the marginal rate now and is taxed on drawdown at a rate that depends on retirement income. A salary sacrifice for a travel pass or a bike scheme reduces gross pay before tax, USC and PRSI, so its relief is slightly wider than pension relief. And a small benefit exemption allows a limited annual value in vouchers entirely free of tax, which is the only fully untaxed option available.',
      ] },
  ],
  '50000': [
    { heading: 'Two incomes, and the value of joint assessment',
      paragraphs: [
        'Fifty thousand euro is around the level at which the difference between the three bases of assessment for a married couple becomes material. Where one spouse earns fifty thousand and the other little or nothing, joint assessment allows part of the standard rate cut-off point to be transferred, moving several thousand euro of income from the higher rate to the standard rate. The saving runs to well over a thousand euro a year, it requires only a notification to Revenue, and it is frequently left unclaimed for years after a marriage.',
        'Where both spouses earn, the transfer is limited: the increased cut-off point available to a couple is capped, and it cannot all be loaded onto one spouse. The practical rule is that the further apart the two incomes, the more joint assessment is worth, and where the incomes are similar the three bases produce almost the same result. In the year of marriage a refund is often due for the portion of the year before it.',
      ] },
  ],
  '60000': [
    { heading: 'Pension relief at its most efficient',
      paragraphs: [
        'At sixty thousand euro, pension contributions attract relief at the higher rate on the whole amount, and the age-related percentage limit rather than the earnings cap is what binds. Those limits rise with age, from fifteen per cent of earnings under thirty to twenty per cent in the thirties, twenty-five per cent in the forties and further above that, which means the maximum efficient contribution changes on a birthday rather than with income.',
        'One detail is specific to this band and often missed: employer contributions do not count against the employee age-related limit, so a salary sacrifice arrangement in which the employer contributes instead of paying salary can move more into a pension than a personal contribution alone allows. USC and PRSI remain payable on personal contributions but not on employer ones, which makes the employer route measurably more efficient where it is available.',
      ] },
  ],
  '70000': [
    { heading: 'The top USC band, and what crosses it',
      paragraphs: [
        'Seventy thousand euro sits above the threshold for the highest USC band, which means the marginal deduction is at its full weight: higher rate income tax, top band USC and Class A PRSI together. Unlike the income tax bands, the USC bands are not transferable between spouses, so no assessment arrangement reduces this part of the bill.',
        'The relief that remains most valuable at this level is pension contribution, and the constraint that begins to matter is the standard fund threshold, the lifetime limit on the value of pension benefits that can be drawn without a penalty charge. It is remote at this salary but not irrelevant, because a defined benefit entitlement is capitalised for the purpose of the threshold and can consume more of it than the employee expects. Checking the projected value once every few years is enough.',
      ] },
  ],
  '80000': [
    { heading: 'Where share schemes and benefits change the arithmetic',
      paragraphs: [
        'At eighty thousand euro, the levers that remain are mostly non-salary. Approved profit sharing schemes and save as you earn schemes, where an employer operates them, allow shares to be acquired with income tax relief within statutory limits, though USC and PRSI still apply. Restricted stock units, by contrast, are taxed as employment income at vesting at the marginal rate, and the tax is due whether or not the shares are sold, which has caught out employees who held the shares and then watched the price fall.',
        'The second consideration is benefit-in-kind, which at this level is more likely to be part of the package. A company car is taxed on a percentage of its original market value adjusted for business mileage and emissions, and the percentage for a high-emission vehicle makes the benefit considerably more expensive than the equivalent salary. An electric vehicle within the exempt value threshold is the exception and is treated far more favourably.',
      ] },
  ],
  '100000': [
    { heading: 'Six figures, and the reliefs that are capped',
      paragraphs: [
        'At one hundred thousand euro the earnings cap on pension relief starts to bind rather than the age-related percentage: relief is available only on contributions computed against a capped figure of net relevant earnings, so a percentage of actual salary above that cap attracts no relief. The cap applies per individual, not per couple, which means a two-earner household has two caps available and a single-earner household has one.',
        'A second feature of this level is the high earner restriction, which limits the aggregate use of certain specified reliefs by individuals with income above a threshold, ensuring a minimum effective rate. It does not apply to ordinary pension relief or to normal employment deductions, but it does apply to a list of property and investment incentives, and it is the reason a tax planning proposal built on stacking those reliefs does not deliver what it promises at this income.',
      ] },
  ],
  '120000': [
    { heading: 'Where the employer side of the package starts to dominate',
      paragraphs: [
        'At one hundred and twenty thousand euro, the marginal deduction on salary is close to its maximum and the meaningful variation in total compensation comes from how the employer structures the package rather than from the salary figure. An employer pension contribution costs the employer the same as salary but reaches the employee without income tax, USC or PRSI, which makes it the most efficient component available. A defined contribution employer match left uncollected is a straightforward loss at this level.',
        'Two other components behave differently from salary. A bonus paid in cash is taxed at the marginal rate in the month of payment, while a bonus directed into a pension additional voluntary contribution attracts relief subject to the earnings cap. And relocation or professional subscription payments, where they meet Revenue conditions, can be reimbursed without a tax charge, which a salary increase of the same amount cannot.',
      ] },
  ],
  '150000': [
    { heading: 'Above the cap, and the special assignee relief',
      paragraphs: [
        'At one hundred and fifty thousand euro, the pension earnings cap means a large part of the salary attracts no pension relief at all, so the efficient contribution is a fixed amount rather than a percentage. What remains available depends on the structure of the employment: an employer contribution is not restricted by the employee age-related limit, and a defined benefit accrual is valued against the standard fund threshold rather than against the annual cap.',
        'One relief is specific to this income level and to inbound employees. The Special Assignee Relief Programme reduces the taxable portion of employment income for qualifying individuals assigned to Ireland from abroad, subject to a minimum income threshold, a certification deadline that is short and unforgiving, and a requirement not to have been Irish tax resident in the preceding years. Missing the certification window forfeits the relief for the whole assignment, which makes it the one deadline worth knowing before arrival rather than after.',
      ] },
  ],
};
