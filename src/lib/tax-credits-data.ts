/**
 * Programmatic SEO tax-credit / scenario data for Ireland 2026
 */

export interface ScenarioFAQ {
  question: string;
  answer: string;
}

export interface TaxScenarioEntry {
  slug: string;
  label: string;
  description: string;
  keyCredits: { name: string; amount: string; note: string }[];
  faqs: ScenarioFAQ[];
}

export const taxScenarios: TaxScenarioEntry[] = [
  {
    slug: 'single-paye',
    label: 'Single PAYE Employee',
    description:
      'As a single PAYE worker in Ireland in 2026, your tax position is the most straightforward of all filing statuses. You are entitled to two primary tax credits: the Personal Tax Credit of €1,875 and the Employee (PAYE) Tax Credit of €1,875, giving you a combined annual credit of €3,750. These credits are deducted directly from your calculated income tax liability, not from your income, meaning they reduce your tax bill euro for euro. Your Standard Rate Cut-Off Point (SRCOP) is €42,000, which means the first €42,000 of your taxable income is taxed at the standard rate of 20%, and any income above this threshold is taxed at the higher rate of 40%. In addition to income tax, you pay the Universal Social Charge (USC) on your gross income. USC has four progressive bands: 0.5% on the first €12,012, 2% from €12,012 to €25,760, 4% from €25,760 to €70,044, and 8% on all income above €70,044. If your total income is €13,000 or less, you are exempt from USC entirely. PRSI (Pay Related Social Insurance) is charged at 4% on all earnings if your weekly income exceeds €352. There is no upper limit on PRSI contributions. As a single PAYE worker, your marginal rate of tax once your income exceeds the SRCOP and the €70,044 USC threshold is 52% (40% income tax + 8% USC + 4% PRSI). Tax planning strategies available to you include pension contributions (which reduce taxable income for income tax purposes), claiming flat-rate expenses for your occupation, the Rent Tax Credit of up to €750 per year if you are renting, and medical expense relief at 20% for qualifying expenses. You should ensure your tax credits are correctly allocated on your Revenue record, as errors can lead to under- or over-deduction of tax throughout the year.',
    keyCredits: [
      { name: 'Personal Tax Credit', amount: '€1,875', note: 'Automatically applied to all single filers' },
      { name: 'Employee (PAYE) Tax Credit', amount: '€1,875', note: 'Available to all PAYE employees' },
      { name: 'Rent Tax Credit', amount: 'Up to €750', note: 'For tenants paying rent on a qualifying tenancy' },
    ],
    faqs: [
      {
        question: 'What tax credits does a single PAYE worker get in Ireland?',
        answer:
          'Every single PAYE worker receives the Personal Tax Credit (€1,875) and the Employee PAYE Tax Credit (€1,875), totalling €3,750 per year. Additional credits may be available depending on circumstances, such as the Rent Tax Credit (€750), medical expense relief, and flat-rate expenses for specific occupations.',
      },
      {
        question: 'What is the Standard Rate Cut-Off Point for a single person?',
        answer:
          'In 2026, the SRCOP for a single person is €42,000. Income up to this amount is taxed at 20% (standard rate), and income above it is taxed at 40% (higher rate). This cut-off applies to taxable income after pension deductions.',
      },
      {
        question: 'How can a single PAYE worker reduce their tax bill?',
        answer:
          'Key strategies include contributing to a pension (tax relief at your marginal rate), claiming the Rent Tax Credit if renting, claiming flat-rate expenses for your occupation, medical expense relief at 20%, and ensuring your tax credits on your Revenue record are correct. Review your tax position annually through Revenue\'s myAccount portal.',
      },
    ],
  },
  {
    slug: 'married-one-income',
    label: 'Married (One Income)',
    description:
      'Married couples in Ireland where only one spouse has an income benefit from several significant tax advantages under joint assessment. The Personal Tax Credit for a married couple is €3,750, which is double the single person\'s credit of €1,875. The earning spouse also receives the Employee PAYE Tax Credit of €1,875, bringing the total baseline credits to €5,625. In addition, if the non-earning spouse is caring for a dependent person (child, elderly relative, or person with a disability) at home, the couple may claim the Home Carer Tax Credit of €1,800, increasing total credits to €7,425. The Standard Rate Cut-Off Point for a married couple with one income is €51,000, which is €9,000 higher than the single person\'s cut-off of €42,000. This means that an additional €9,000 of income is taxed at 20% instead of 40%, saving €1,800 in income tax compared to a single person on the same salary. The combination of higher tax credits and a higher SRCOP can result in annual tax savings exceeding €5,000 compared to the single filing status. USC and PRSI are assessed individually regardless of marital status, so the earning spouse pays USC and PRSI on their own income at the standard rates. The non-earning spouse has no USC or PRSI liability if they have no income. One-income married couples should ensure they are registered for joint assessment with Revenue, as this is not automatic, you must apply through myAccount or by contacting your Revenue office. It is also important to note that the Home Carer Tax Credit is subject to an income limit: the home carer (non-earning spouse) can earn up to €7,200 per year and still qualify for the full credit, with a tapered reduction between €7,200 and €10,800. If you are recently married, notify Revenue promptly to update your tax credits and avoid a large reconciliation at year-end.',
    keyCredits: [
      { name: 'Personal Tax Credit (Married)', amount: '€3,750', note: 'Double the single person\'s credit' },
      { name: 'Employee (PAYE) Tax Credit', amount: '€1,875', note: 'For the employed spouse' },
      { name: 'Home Carer Tax Credit', amount: '€1,800', note: 'If non-earning spouse cares for a dependent at home' },
    ],
    faqs: [
      {
        question: 'How much extra tax do married one-income couples save?',
        answer:
          'Compared to a single person, a married one-income couple saves approximately €3,675 to €5,475 per year in income tax, depending on salary level. This comes from the higher SRCOP (€51,000 vs €42,000), double Personal Tax Credit (€3,750 vs €1,875), and the Home Carer Credit (€1,800) if applicable.',
      },
      {
        question: 'What is the Home Carer Tax Credit?',
        answer:
          'The Home Carer Tax Credit of €1,800 is available to married couples where one spouse stays at home to care for a dependent person, typically a child, an elderly relative, or a person with a disability. The home carer can earn up to €7,200 per year and still receive the full credit. It tapers out between €7,200 and €10,800.',
      },
      {
        question: 'Do we need to apply for joint assessment?',
        answer:
          'Yes. Joint (or aggregated) assessment is not automatic. You must apply to Revenue through myAccount, the Revenue Online Service (ROS), or by contacting your local Revenue office. Once set up, it remains in place until you notify Revenue of a change. Applying as soon as possible after marriage ensures you benefit from the higher credits and cut-off points.',
      },
    ],
  },
  {
    slug: 'married-two-incomes',
    label: 'Married (Two Incomes)',
    description:
      'Married couples in Ireland where both spouses earn an income can achieve the most tax-efficient position through joint assessment with income splitting. Under this arrangement, the combined Standard Rate Cut-Off Point is €84,000, with each spouse\'s individual allocation capped at €42,000. This means that if one spouse earns €60,000 and the other earns €30,000, the higher-earning spouse can use up to €54,000 of the standard rate band (transferring €12,000 from the lower-earning spouse\'s unused allocation), reducing their higher-rate tax liability. The Personal Tax Credit for a married couple is €3,750, and each employed spouse receives their own Employee PAYE Tax Credit of €1,875, giving total credits of €7,500. This is the highest level of baseline tax credits available under any filing status in Ireland. USC and PRSI are calculated individually for each spouse based on their own income, so these charges cannot be shared or transferred between spouses. The key advantage of two-income assessment is the ability to transfer unused standard rate band from the lower-earning spouse to the higher-earning spouse. This is most valuable when incomes are unequal. For example, if both spouses earn €42,000 each, neither pays higher-rate tax. But if one earns €70,000 and the other €14,000, transferring the unused portion reduces the higher-rate exposure of the first spouse significantly. Couples should review their band allocation annually, as changes in income can alter the optimal split. Revenue allows you to adjust the allocation through myAccount. Two-income couples should also coordinate pension contributions, as it may be more tax-efficient for the higher-earning spouse (who pays tax at 40%) to maximise pension contributions, while the lower-earning spouse (at 20%) benefits less from pension tax relief. Other considerations include coordinating medical expense claims, reviewing BIK implications if either spouse has employer-provided benefits, and ensuring that both Employment Tax Credits are being utilised.',
    keyCredits: [
      { name: 'Personal Tax Credit (Married)', amount: '€3,750', note: 'Shared between both spouses' },
      { name: 'Employee (PAYE) Tax Credit (x2)', amount: '€3,750', note: '€1,875 per employed spouse' },
      { name: 'Standard Rate Band Transfer', amount: 'Up to €42,000', note: 'Unused band can transfer between spouses' },
    ],
    faqs: [
      {
        question: 'How does standard rate band transfer work for married couples?',
        answer:
          'Under joint assessment, the combined SRCOP is €84,000, with each spouse capped at €42,000. If one spouse earns below €42,000, the unused portion of their standard rate band can transfer to the other spouse. For example, if one spouse earns €30,000, they transfer €12,000 of unused band, giving the other spouse a cut-off of €54,000.',
      },
      {
        question: 'What total tax credits do two-income married couples get?',
        answer:
          'Two-income married couples receive the married Personal Tax Credit (€3,750) plus two Employee PAYE Tax Credits (€1,875 each), totalling €7,500. This is the highest level of standard credits available and is €3,750 more than a single person receives. The credits are only half the picture: the standard rate cut-off point for two incomes rises to €84,000, though the increase is capped at the amount the second earner actually makes. A couple with one large income and one small one cannot transfer the whole band.',
      },
      {
        question: 'Should both spouses contribute to a pension?',
        answer:
          'It depends on individual tax rates. Pension contributions receive tax relief at your marginal income tax rate. If one spouse pays tax at 40% and the other at 20%, it is more efficient for the higher-rate spouse to maximise pension contributions first, as they receive double the tax relief per euro contributed compared to the 20% spouse.',
      },
    ],
  },
  {
    slug: 'single-parent',
    label: 'Single Parent (SPCCC)',
    description:
      'Single parents in Ireland receive additional tax supports to recognise the financial challenges of raising children alone. The most important of these is the Single Person Child Carer Credit (SPCCC) of €1,750 per year, which is available to the primary carer of a qualifying child. A qualifying child is a child who is under 18 at the start of the tax year, or under 21 if in full-time education, or a child of any age who became permanently incapacitated before age 21 (or before age 25 if in full-time education). In addition to the SPCCC, single parents receive the standard Personal Tax Credit (€1,875) and the Employee PAYE Tax Credit (€1,875), bringing total baseline credits to €5,500, significantly more than the €3,750 available to a single person without children. The Standard Rate Cut-Off Point for a single parent (referred to as a qualifying claimant of the SPCCC) is increased to €46,000, which is €4,000 higher than the standard single person\'s cut-off of €42,000. This means an additional €4,000 of income is taxed at 20% instead of 40%, saving €800 in income tax annually. The combined effect of the SPCCC and the higher SRCOP can save a single parent approximately €2,550 per year compared to a single person without children on the same salary. USC and PRSI are calculated on the same basis as for a single person, with no adjustments for dependants. Single parents should also be aware of other supports available outside the tax system, including the Working Family Payment (WFP) for those on lower incomes, the One-Parent Family Payment, Child Benefit (€140 per child per month, non-taxable), and the Back to School Clothing and Footwear Allowance. Within the tax system, additional reliefs include the Rent Tax Credit, medical expense relief for children\'s medical costs, and childcare-related deductions. It is essential to register as the primary carer with Revenue to ensure the SPCCC is applied to your tax record. If both parents are separated, only the primary carer can claim the SPCCC in full, though the credit can be relinquished to the other parent in certain circumstances.',
    keyCredits: [
      { name: 'Single Person Child Carer Credit', amount: '€1,750', note: 'For the primary carer of a qualifying child' },
      { name: 'Personal Tax Credit', amount: '€1,875', note: 'Standard single person credit' },
      { name: 'Employee (PAYE) Tax Credit', amount: '€1,875', note: 'For PAYE employees' },
    ],
    faqs: [
      {
        question: 'What is the Single Person Child Carer Credit?',
        answer:
          'The SPCCC is a tax credit of €1,750 per year available to the primary carer of a qualifying child. It also increases your Standard Rate Cut-Off Point from €42,000 to €46,000. A qualifying child is under 18 (or under 21 if in full-time education). Only the primary carer can claim this credit.',
      },
      {
        question: 'How much more does a single parent take home compared to a single person?',
        answer:
          'A single parent takes home approximately €2,550 more per year than a single person on the same salary. This comes from the SPCCC (€1,750 tax credit) and the higher SRCOP (€46,000 vs €42,000), which saves an additional €800 on income above €42,000 that would otherwise be taxed at 40%.',
      },
      {
        question: 'Can I claim the SPCCC if I share custody?',
        answer:
          'The SPCCC is awarded to the primary carer, the parent with whom the child lives for most of the year. If you share custody equally, the parent who receives Child Benefit is generally considered the primary carer. The primary carer can relinquish the credit to the other parent by notifying Revenue, but only one parent can claim it in any given year.',
      },
    ],
  },
  {
    slug: 'pension-contributor',
    label: 'Pension Contributor',
    description:
      'Contributing to a pension in Ireland is one of the most tax-efficient financial decisions available to workers. Pension contributions to an approved occupational pension scheme, a Personal Retirement Savings Account (PRSA), or a Retirement Annuity Contract (RAC) qualify for income tax relief at your marginal rate. If you pay tax at the higher rate of 40%, every €100 you contribute to your pension effectively costs you only €60, as Revenue refunds the €40 tax you would have paid on that income. Even if you pay tax at the standard rate of 20%, a €100 contribution costs you only €80 after relief. This relief applies to income tax only, pension contributions do not reduce your USC or PRSI liability. Revenue sets age-related limits on the maximum percentage of earnings eligible for pension tax relief: 15% for those under 30, 20% for ages 30 to 39, 25% for ages 40 to 49, 30% for ages 50 to 54, 35% for ages 55 to 59, and 40% for ages 60 and over. These percentages are applied to your gross earnings, subject to an overall earnings cap of €115,000, meaning the maximum pensionable earnings are €115,000 regardless of your actual salary. For an employee aged 35 earning €80,000, the maximum tax-relievable contribution is 20% of €80,000, which is €16,000. At the 40% marginal rate, this saves €6,400 in income tax annually. Employer contributions to your pension do not count against your personal limits and are not subject to Benefit-in-Kind tax, making employer pension matching one of the most valuable employee benefits available. When planning pension contributions, consider the impact on your overall cash flow. While the tax relief reduces the net cost, the contribution still reduces your take-home pay. It is important to balance current living expenses with long-term retirement planning. Workers should also be aware that pension income in retirement is subject to income tax (though USC is reduced for those over 70) and that a tax-free lump sum of up to €200,000 is available on retirement. The compounding effect of pension contributions over decades makes early and consistent saving extremely valuable, starting a pension at 25 rather than 35 can result in a retirement fund more than 50% larger, even with the same total contributions.',
    keyCredits: [
      { name: 'Pension Tax Relief', amount: 'At marginal rate (20% or 40%)', note: 'On contributions within age-related limits' },
      { name: 'Age-Related Limits', amount: '15% to 40% of earnings', note: 'Percentage increases with age; earnings cap €115,000' },
      { name: 'Employer Contributions', amount: 'Not limited by personal cap', note: 'No BIK; does not count against employee limits' },
    ],
    faqs: [
      {
        question: 'How much tax do I save by contributing to a pension in Ireland?',
        answer:
          'You save income tax at your marginal rate on every euro contributed within the limits. At the 40% rate, a €500 monthly contribution saves €200 per month in income tax (€2,400 per year). At the 20% rate, the saving is €100 per month. Pension contributions do not reduce USC or PRSI.',
      },
      {
        question: 'What are the age-related pension contribution limits?',
        answer:
          'The maximum tax-relievable pension contribution as a percentage of earnings is: under 30: 15%, 30-39: 20%, 40-49: 25%, 50-54: 30%, 55-59: 35%, 60+: 40%. These percentages apply to earnings up to €115,000. Contributions above these limits do not receive tax relief.',
      },
      {
        question: 'Should I contribute to a pension if I only pay the standard rate?',
        answer:
          'Yes, even at the 20% standard rate, pension contributions are beneficial. You receive 20% tax relief, and the investment grows tax-free within the pension fund. Additionally, your income may grow over time, pushing you into the 40% band where the relief is even more valuable. Starting early maximises the compounding effect.',
      },
    ],
  },
  {
    slug: 'first-job',
    label: 'First Job in Ireland',
    description:
      'Starting your first job in Ireland, whether as a recent graduate, a school-leaver, or someone arriving from abroad, involves navigating the Irish tax system for the first time. The most important step is to register with Revenue and obtain your Personal Public Service (PPS) number if you do not already have one. Without a PPS number registered with Revenue, your employer is required to deduct emergency tax, which applies the higher rate of 40% to your income without any tax credits, resulting in significantly higher deductions than necessary. Once registered, you should log in to Revenue\'s myAccount portal, register your employment, and ensure your tax credits certificate is issued to your employer. As a first-time PAYE employee, you are entitled to the Personal Tax Credit (€1,875) and the Employee PAYE Tax Credit (€1,875), totalling €3,750 per year. These credits reduce your income tax liability directly. If your annual income is below €18,750, these credits may be sufficient to reduce your income tax to zero, though you will still pay USC (if earning over €13,000) and PRSI (if earning over approximately €18,304 annually or €352 per week). For those starting work partway through the year, tax credits and rate bands are cumulated, meaning you receive the benefit of unused credits from the months you were not working. This often results in a tax refund when your end-of-year review is processed. New employees should also be aware of the concept of "week 1 / month 1" basis, which Revenue may apply temporarily while your records are being processed. On this basis, your tax is calculated on each pay period independently, without cumulation. Once your records are fully updated, Revenue will switch you to the cumulative basis and any overpaid tax will be refunded through your pay. If you are arriving from abroad, you should check whether Ireland has a double taxation agreement with your home country, as this may affect how your income is taxed. EU/EEA nationals can work immediately, while non-EEA nationals require an employment permit. Consider setting up a pension early in your career, even small contributions benefit from decades of compound growth, and the tax relief effectively gives you free money from Revenue towards your retirement.',
    keyCredits: [
      { name: 'Personal Tax Credit', amount: '€1,875', note: 'Available from your first day of employment' },
      { name: 'Employee (PAYE) Tax Credit', amount: '€1,875', note: 'For all PAYE employees' },
      { name: 'Cumulative Tax Credits', amount: 'Pro-rated', note: 'Unused credits from months not worked are carried forward' },
    ],
    faqs: [
      {
        question: 'What do I need to do before starting my first job in Ireland?',
        answer:
          'You need a PPS number (apply at your local Intreo centre or online) and to register with Revenue through myAccount. Once employed, register your new job on myAccount so Revenue issues your tax credits certificate to your employer. Without this, you will be taxed on an emergency basis at the higher rate with no credits.',
      },
      {
        question: 'What is emergency tax and how do I avoid it?',
        answer:
          'Emergency tax applies when Revenue has not issued tax credits for your employment. You are taxed at 40% with no credits, resulting in much higher deductions. To avoid it, register your employment on Revenue\'s myAccount before or shortly after your start date. If emergency tax is deducted, it will be refunded once your records are updated.',
      },
      {
        question: 'Will I get a tax refund at the end of the year?',
        answer:
          'Likely yes, especially if you started work partway through the year. Your annual tax credits and rate band are divided over 12 months, so if you only worked for part of the year, you have unused credits that will result in a refund. You can claim this by submitting an income tax return through myAccount after the year ends.',
      },
    ],
  },
];
