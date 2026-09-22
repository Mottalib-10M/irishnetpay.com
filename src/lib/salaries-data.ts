/**
 * Programmatic SEO salary-level data for Ireland 2026
 */

export interface SalaryFAQ {
  question: string;
  answer: string;
}

export interface SalaryEntry {
  slug: string;
  gross: number;
  grossFormatted: string;
  description: string;
  faqs: SalaryFAQ[];
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export const salaries: SalaryEntry[] = [
  {
    slug: '25000',
    gross: 25_000,
    grossFormatted: fmt(25_000),
    description:
      'A gross salary of €25,000 per year places you close to the national minimum wage in Ireland when calculated on a full-time basis. Workers earning this amount typically include retail assistants, hospitality staff, junior administrative roles, and entry-level positions across many sectors. At this income level, the majority of your earnings fall within the standard 20% income tax band, and your tax credits, the Personal Tax Credit and Employee PAYE Tax Credit, will shelter a significant portion of your income from income tax entirely. You will still be liable for the Universal Social Charge at the lower bands and PRSI at 4%, though the effective rate of all deductions combined remains comparatively modest. Living on €25,000 in Ireland can be challenging, particularly in Dublin and other major cities where rent often consumes a large share of take-home pay. Outside of Dublin, in towns and rural areas, this salary can stretch further, especially if accommodation costs are lower. Many people at this income level qualify for means-tested social supports such as the Housing Assistance Payment (HAP) or the Working Family Payment (WFP) if they have dependent children. Building savings or contributing to a pension at this salary level is difficult but still worthwhile, as even small pension contributions benefit from marginal tax relief at the 20% rate. Understanding your exact take-home pay helps you budget effectively and identify any additional tax credits or reliefs you may be entitled to claim from Revenue.',
    faqs: [
      {
        question: 'How much tax do I pay on a €25,000 salary in Ireland?',
        answer:
          'On a €25,000 salary as a single PAYE worker in 2026, you pay relatively little income tax because your combined Personal Tax Credit (€1,875) and Employee PAYE Tax Credit (€1,875) of €3,750 offset most of the tax due. You will also pay USC across the lower bands and PRSI at 4%. Your total effective tax rate is approximately 15-17%.',
      },
      {
        question: 'What is the monthly take-home pay on €25,000 in Ireland?',
        answer:
          'A single person earning €25,000 gross per year in Ireland can expect a net monthly take-home pay of approximately €1,760 to €1,800 after income tax, USC, and PRSI deductions. The exact amount depends on your filing status and any additional tax credits you may claim.',
      },
      {
        question: 'Is €25,000 a good salary in Ireland?',
        answer:
          'A salary of €25,000 is below the national average wage in Ireland, which is approximately €49,000. It is close to the minimum wage for full-time work. While it is possible to live on this amount, it can be tight in high-cost areas like Dublin. Many workers at this level supplement income with overtime, second jobs, or social welfare supports.',
      },
    ],
  },
  {
    slug: '30000',
    gross: 30_000,
    grossFormatted: fmt(30_000),
    description:
      'Earning €30,000 per year in Ireland puts you above the minimum wage threshold but still below the national average. This salary level is common among junior office workers, early-career teachers before increments, call centre operators, and skilled tradespeople in their first years of employment. Your entire income falls within the 20% standard rate band for a single person, meaning you do not pay any income tax at the higher 40% rate. After applying your standard tax credits (Personal Tax Credit of €1,875 and Employee PAYE Tax Credit of €1,875), your net income tax liability is modest. USC applies across three bands, 0.5% on the first €12,012, 2% on the next portion up to €25,760, and 4% on the remainder up to €30,000. PRSI is charged at a flat 4% on all earnings since your weekly income exceeds the €352 exemption threshold. Day-to-day living on €30,000 is manageable in many parts of Ireland, particularly in commuter towns and regional cities such as Limerick, Cork, Galway, and Waterford. However, Dublin and surrounding areas present significant cost-of-living challenges, with average rents consuming a substantial portion of net income. Workers at this salary level should ensure they are claiming all available tax credits, including the Rent Tax Credit (€750 per year for an individual) if applicable, and flat-rate expenses if their occupation qualifies. Even at this level, contributing a small percentage to a pension is advisable, as the compounding benefit over decades is substantial and the tax relief reduces the effective cost of each contribution.',
    faqs: [
      {
        question: 'What is the take-home pay on €30,000 in Ireland?',
        answer:
          'A single PAYE worker earning €30,000 per year in Ireland can expect an annual net income of approximately €25,500 to €25,900, which works out to roughly €2,125 to €2,160 per month after income tax, USC, and PRSI deductions.',
      },
      {
        question: 'Do I pay the higher rate of tax on €30,000?',
        answer:
          'No. The higher rate of income tax (40%) only applies to income above the Standard Rate Cut-Off Point, which is €42,000 for a single person in 2026. At €30,000, your entire income is taxed at the standard 20% rate before tax credits are applied.',
      },
      {
        question: 'What jobs in Ireland typically pay €30,000?',
        answer:
          'Roles paying around €30,000 in Ireland include junior administrative staff, early-career teachers, retail supervisors, call centre agents, entry-level IT support, junior accountants, and apprentice tradespeople who have recently qualified. Salaries vary by region and employer.',
      },
    ],
  },
  {
    slug: '35000',
    gross: 35_000,
    grossFormatted: fmt(35_000),
    description:
      'A salary of €35,000 per year is a common starting point for graduate roles in Ireland across sectors such as finance, technology, public service, and professional services. At this level, all of your income remains within the 20% standard rate band for a single filer, as the Standard Rate Cut-Off Point is €42,000. This means your income tax burden is entirely at 20%, reduced by the standard Personal Tax Credit and Employee PAYE Tax Credit totalling €3,750 for a single person. The Universal Social Charge is applied progressively across three bands, and PRSI is deducted at 4% of your full gross salary. Your effective overall deduction rate at €35,000 sits at roughly 19-21%, leaving you with a net monthly income of approximately €2,350 to €2,400. This salary allows for a reasonable standard of living in most parts of Ireland outside Dublin, where rent and transport costs are lower. In Dublin, however, many people on this salary share accommodation to manage housing costs. Graduate employees at this level often see relatively rapid salary progression over the first three to five years, particularly in technology, accounting, and engineering. It is worth reviewing your tax position annually, as life changes such as marriage, having children, or starting pension contributions can significantly alter your take-home pay. Pension contributions at this salary level attract tax relief at 20%, meaning every €100 contributed effectively costs you €80. Even modest pension saving from an early age has a considerable long-term impact due to compound growth.',
    faqs: [
      {
        question: 'How much is €35,000 after tax in Ireland?',
        answer:
          'A single person earning €35,000 in Ireland in 2026 can expect a net annual income of approximately €28,200 to €28,600 after income tax, USC, and PRSI. This is roughly €2,350 to €2,380 per month.',
      },
      {
        question: 'Is €35,000 a typical graduate salary in Ireland?',
        answer:
          'Yes, €35,000 is within the typical range for graduate starting salaries in Ireland, particularly in sectors such as accounting, technology, engineering, and the public sector. Some high-demand fields such as software engineering and data science may offer higher starting salaries.',
      },
      {
        question: 'What deductions apply to a €35,000 salary in Ireland?',
        answer:
          'Three deductions apply: income tax (20% standard rate, reduced by tax credits of €3,750 for a single PAYE worker), USC (progressive rates from 0.5% to 4% across three bands), and PRSI (flat 4% on all earnings). No higher-rate income tax applies at this salary level.',
      },
    ],
  },
  {
    slug: '40000',
    gross: 40_000,
    grossFormatted: fmt(40_000),
    description:
      'At €40,000 per year, you are approaching the Standard Rate Cut-Off Point for a single person in Ireland, which stands at €42,000 in 2026. This means almost all of your income is taxed at the 20% standard rate, with no exposure to the 40% higher rate. This salary is typical for mid-level roles in administration, public sector positions at the middle of the pay scale, experienced retail managers, qualified nurses and midwives at certain points on the HSE pay scale, and early- to mid-career professionals in accounting, marketing, and human resources. Your take-home pay after income tax, USC, and PRSI will be approximately €2,640 to €2,700 per month as a single person. The effective total deduction rate at this level is around 21-23%, which is modest by European standards. Living on €40,000 in Ireland provides a comfortable standard of living in most regional areas, with the ability to rent a one-bedroom apartment independently, maintain a car, and save modestly. In Dublin, budgeting remains important, and many people at this level choose to share accommodation or live in commuter towns. If you are married and assessed jointly, your tax position improves further, as the combined standard rate cut-off point increases and additional tax credits apply. Pension contributions are strongly recommended at this salary level, as the tax relief effectively reduces the cost and the retirement benefits build meaningfully over time. Workers on €40,000 should also check whether they qualify for flat-rate expenses for their occupation, which Revenue allows for a wide range of jobs.',
    faqs: [
      {
        question: 'What is my take-home pay on €40,000 in Ireland?',
        answer:
          'A single PAYE worker on €40,000 in 2026 can expect a net annual pay of approximately €31,700 to €32,200, or about €2,640 to €2,680 per month after all deductions including income tax, USC, and PRSI.',
      },
      {
        question: 'Am I close to the higher tax rate at €40,000?',
        answer:
          'Yes. The Standard Rate Cut-Off Point for a single person is €42,000 in 2026. At €40,000, you are just below this threshold, so all your income is taxed at 20%. Any pay increase or bonus pushing you above €42,000 will be taxed at 40% on the amount exceeding the cut-off.',
      },
      {
        question: 'How does marriage affect tax on a €40,000 salary?',
        answer:
          'If you marry and opt for joint assessment, the Standard Rate Cut-Off Point increases to €51,000 (one income) or up to €84,000 (two incomes). You also receive the married Personal Tax Credit of €3,750 instead of €1,875, which can result in a significant increase in take-home pay.',
      },
    ],
  },
  {
    slug: '45000',
    gross: 45_000,
    grossFormatted: fmt(45_000),
    description:
      'A gross salary of €45,000 per year in Ireland means you have crossed the Standard Rate Cut-Off Point for a single person (€42,000), and €3,000 of your income is now taxed at the higher 40% rate. This is a psychologically significant threshold for many workers, as it marks the point where each additional euro of income is taxed at almost double the standard rate. At this level, your income tax before credits is calculated as 20% on €42,000 plus 40% on €3,000, giving a gross tax figure that is then reduced by your Personal Tax Credit and Employee PAYE Tax Credit. USC is applied across three bands, and PRSI continues at 4%. Roles paying €45,000 include experienced public sector positions, qualified accountants with a few years of post-qualification experience, mid-level IT professionals, secondary school teachers at mid-scale, and skilled tradespeople running their own operations. The net monthly take-home pay at this salary is approximately €2,870 to €2,940 for a single person, representing an effective deduction rate of roughly 23-24%. Living on this salary is comfortable in most parts of Ireland, allowing for independent accommodation, regular savings, and leisure activities. Pension contributions become particularly valuable at this level because the portion of your income above €42,000 receives tax relief at 40% rather than 20%, meaning every €100 contributed from the higher-rate portion costs you only €60 after tax relief. Single parents benefit from a higher SRCOP of €46,000 and the additional Single Person Child Carer Credit, which further reduces their tax liability at this income level.',
    faqs: [
      {
        question: 'How much of a €45,000 salary is taxed at 40% in Ireland?',
        answer:
          'For a single person in 2026, the first €42,000 is taxed at 20% and the remaining €3,000 is taxed at 40%. This means only a small portion of your salary falls into the higher rate band. After applying tax credits of €3,750, the net income tax is significantly reduced.',
      },
      {
        question: 'What is the net monthly pay on €45,000?',
        answer:
          'A single PAYE worker earning €45,000 in Ireland in 2026 takes home approximately €2,870 to €2,940 per month after income tax, USC, and PRSI. Married workers with joint assessment may take home more due to higher tax credits and cut-off points.',
      },
      {
        question: 'Should I contribute to a pension on €45,000?',
        answer:
          'Yes, pension contributions are especially beneficial at this salary because income above €42,000 is taxed at 40%. Contributing from this higher-rate income gives you 40% tax relief, effectively, a €100 pension contribution costs you only €60. This makes pension saving at this level highly tax-efficient.',
      },
    ],
  },
  {
    slug: '50000',
    gross: 50_000,
    grossFormatted: fmt(50_000),
    description:
      'A salary of €50,000 per year is close to the national average wage in Ireland and represents a significant milestone for many workers. At this level, €8,000 of your income (the portion above the €42,000 Standard Rate Cut-Off Point for a single person) is taxed at the higher 40% rate. Combined with USC across four bands and PRSI at 4%, your total deductions amount to approximately 25-27% of gross income for a single filer. This salary is typical for experienced professionals across many sectors, including mid-level software developers, qualified solicitors in their early years, experienced nurses at higher HSE pay points, middle management in retail and hospitality, and established civil servants at Executive Officer level. Your monthly take-home pay at €50,000 is approximately €3,090 to €3,160 as a single person. This provides a comfortable standard of living in most of Ireland, including the ability to rent independently, maintain a car, save regularly, and enjoy discretionary spending. In Dublin, this salary allows for a reasonable lifestyle, though housing costs remain a significant line item. Pension contributions at this level are strongly recommended, as every euro contributed from the higher-rate portion receives 40% tax relief. A 5% pension contribution (€2,500 per year) at this salary costs approximately €1,500 after tax relief for income above the SRCOP. Workers at €50,000 should also review whether they can claim any additional tax credits, such as the Rent Tax Credit, medical expense relief, or flat-rate expenses specific to their occupation, all of which directly reduce their tax bill.',
    faqs: [
      {
        question: 'What is the take-home pay on €50,000 in Ireland in 2026?',
        answer:
          'A single PAYE worker earning €50,000 in 2026 receives approximately €37,100 to €37,600 net per year, or roughly €3,090 to €3,130 per month. The effective total deduction rate (income tax, USC, and PRSI combined) is approximately 25-26%.',
      },
      {
        question: 'Is €50,000 the average salary in Ireland?',
        answer:
          'The average annual earnings in Ireland are approximately €49,000 to €50,000, making a €50,000 salary broadly average. However, the median salary is lower (around €40,000-€42,000), meaning more than half of workers earn less than €50,000. The average is skewed upward by high earners in multinational companies.',
      },
      {
        question: 'How much more tax do I pay on €50,000 compared to €42,000?',
        answer:
          'The additional €8,000 above the €42,000 cut-off is taxed at 40% instead of 20%, resulting in approximately €1,600 more income tax on that portion. After accounting for USC and PRSI on the full amount, the total deductions on the extra €8,000 are approximately €4,160.',
      },
    ],
  },
  {
    slug: '60000',
    gross: 60_000,
    grossFormatted: fmt(60_000),
    description:
      'Earning €60,000 per year places you well above the Irish average and into the higher-rate tax bracket for a substantial portion of your income. As a single person, €18,000 of your salary (the amount above the €42,000 SRCOP) is taxed at 40%, which is a meaningful increase in your tax burden compared to someone earning just under the threshold. Your total effective deduction rate at this level is approximately 28-30% for a single filer. This salary is typical for senior professionals including experienced software engineers, mid-level managers in multinational companies, senior public servants at Higher Executive Officer level, experienced pharmacists, and qualified actuaries. Monthly take-home pay on €60,000 is approximately €3,480 to €3,570 for a single person. This income level provides a very comfortable standard of living across Ireland, including Dublin, where independent accommodation, regular savings, and pension contributions are all feasible. Workers earning €60,000 who are married and jointly assessed see a significant tax advantage. Under married one-income assessment, the SRCOP rises to €51,000, meaning only €9,000 is taxed at 40% instead of €18,000. Under two-income assessment, the combined SRCOP of €84,000 means the higher rate may not apply at all if income is distributed between spouses. Pension planning becomes increasingly important at this level. Contributing 10% of salary (€6,000) to a pension reduces your taxable income, saving approximately €2,400 in income tax annually (at the 40% rate on the higher-rate portion). This represents an immediate 40% return on your pension investment, making it one of the most tax-efficient financial decisions available to Irish workers.',
    faqs: [
      {
        question: 'What is the net pay on €60,000 in Ireland?',
        answer:
          'A single PAYE worker earning €60,000 in 2026 takes home approximately €41,800 to €42,400 per year, or about €3,480 to €3,530 per month. The effective tax rate including income tax, USC, and PRSI is approximately 29-30%.',
      },
      {
        question: 'How much income tax do I pay on €60,000?',
        answer:
          'On €60,000 as a single person: 20% on the first €42,000 = €8,400, plus 40% on the remaining €18,000 = €7,200, giving a gross tax of €15,600. After deducting tax credits of €3,750, your net income tax is approximately €11,850.',
      },
      {
        question: 'How does marriage reduce tax on €60,000?',
        answer:
          'Joint assessment for a married couple with one income raises the SRCOP from €42,000 to €51,000, reducing the amount taxed at 40% from €18,000 to €9,000. Combined with the higher married Personal Tax Credit (€3,750 vs €1,875) and the Home Carer Credit (€1,800), the annual tax saving can exceed €5,000.',
      },
    ],
  },
  {
    slug: '70000',
    gross: 70_000,
    grossFormatted: fmt(70_000),
    description:
      'A gross salary of €70,000 per year in Ireland places you in the top quartile of earners nationally. At this level, €28,000 of your income is taxed at the higher 40% rate for a single person, and your USC liability is calculated across all four bands, with the top portion falling into the 4% USC band (income up to €70,044). Your combined effective deduction rate is approximately 31-33%. This salary is typical for senior software developers, team leads in technology companies, experienced solicitors in mid-size firms, senior civil servants at Assistant Principal level, senior accountants in practice or industry, and experienced medical professionals. Your monthly take-home pay is approximately €3,880 to €3,960 as a single person. At €70,000, you are living comfortably in any part of Ireland. In Dublin, this salary supports independent living in a good-quality apartment, regular savings, pension contributions, and an active social life. Outside Dublin, it provides an even higher standard of living with the possibility of mortgage affordability for a first home. Tax planning becomes increasingly valuable at this income level. Pension contributions are particularly powerful because a large portion of income sits in the 40% band, meaning every euro directed to a pension saves 40 cent in income tax. A 10% pension contribution (€7,000 per year) at this salary saves approximately €2,800 in income tax annually. Additionally, workers at this level should consider whether they are maximising all available reliefs, including medical expense claims, tuition fee relief for third-level education, and any applicable flat-rate expenses.',
    faqs: [
      {
        question: 'What is the take-home pay on €70,000 in Ireland?',
        answer:
          'A single PAYE worker on €70,000 in 2026 takes home approximately €46,600 to €47,200 per year, or roughly €3,880 to €3,930 per month. The effective total deduction rate is approximately 32-33%.',
      },
      {
        question: 'What USC band does €70,000 fall into?',
        answer:
          'At €70,000, you pay USC across three bands: 0.5% on the first €12,012, 2% on income from €12,012 to €25,760, 4% on income from €25,760 to €70,000. You are just below the €70,044 threshold for the 8% USC band. Total USC is approximately €2,491.',
      },
      {
        question: 'Should I get a financial adviser at this salary level?',
        answer:
          'It is advisable. At €70,000, tax planning through pension contributions, investment strategies, and credit optimisation can save thousands annually. A qualified financial adviser can help maximise pension tax relief, advise on Additional Voluntary Contributions (AVCs), and structure investments tax-efficiently. Before paying for advice, it is worth checking what is available without it: the age-related pension limits, the four-year window for claiming credits, and employer matching on AVCs are all public information. Advice earns its cost on more complex questions, such as share schemes or investment structures.',
      },
    ],
  },
  {
    slug: '80000',
    gross: 80_000,
    grossFormatted: fmt(80_000),
    description:
      'Earning €80,000 per year in Ireland places you among the highest-paid workers in the country, with approximately €38,000 of your income taxed at the 40% higher rate as a single person. You are now firmly in the 8% USC band (income above €70,044), which means your marginal rate on each additional euro is 52% (40% income tax + 8% USC + 4% PRSI). This salary level is typical for senior managers in multinational companies, experienced IT architects, principal-level public servants, senior barristers, experienced medical consultants at certain career stages, and partners in mid-size professional firms. Monthly take-home pay at €80,000 is approximately €4,250 to €4,350 for a single person, with an effective deduction rate of about 34-35%. At this income, you can live very comfortably anywhere in Ireland. Mortgage affordability calculations typically allow borrowing of 3.5 times gross income (€280,000), which is sufficient for property purchase in many areas, though Dublin city centre prices may still require additional savings or a dual-income household. Tax planning is essential at this level. Maximising pension contributions within the age-related limits provides substantial tax relief at the 40% marginal rate. For someone aged 30-39, the pension contribution limit is 20% of gross salary (€16,000), which would reduce income tax by approximately €6,400 annually. Additional strategies include salary sacrifice for pension top-ups, claims for medical expenses, and ensuring all allowable credits are claimed. Workers at this level who are married and jointly assessed benefit significantly from band sharing, potentially moving thousands of euros from the 40% band to the 20% band.',
    faqs: [
      {
        question: 'How much tax do I pay on an €80,000 salary in Ireland?',
        answer:
          'A single person on €80,000 in 2026 pays approximately €15,850 in income tax (after credits), €3,287 in USC, and €3,200 in PRSI, totalling around €22,337 in deductions. This gives a net annual income of approximately €57,663 and a net monthly pay of about €4,805.',
      },
      {
        question: 'What is the marginal tax rate on €80,000?',
        answer:
          'At €80,000, your marginal rate is 52%: 40% income tax + 8% USC (as you are above the €70,044 threshold) + 4% PRSI. This means for every additional euro earned above this level, 52 cent goes to tax and charges.',
      },
      {
        question: 'How much can I save in tax through pension contributions?',
        answer:
          'At €80,000 with income above the SRCOP, pension contributions receive 40% income tax relief. A 10% contribution (€8,000) saves €3,200 in income tax annually. The age-related contribution limit for someone aged 30-39 is 20% (€16,000), which would save €6,400 in income tax.',
      },
    ],
  },
  {
    slug: '100000',
    gross: 100_000,
    grossFormatted: fmt(100_000),
    description:
      'A salary of €100,000 per year places you in the top 10% of earners in Ireland. At this level, €58,000 of your income is taxed at the higher 40% rate for a single filer, and you are well into the 8% USC band. Your total annual deductions including income tax, USC, and PRSI amount to approximately €34,000 to €35,000, giving an effective deduction rate of 34-35%. Monthly take-home pay is approximately €5,400 to €5,500 as a single person. This salary is typical for senior technology professionals, experienced management consultants, senior legal practitioners, medical consultants at mid-career, senior financial services professionals, and directors in medium-sized companies. Living on €100,000 in Ireland is comfortable by any standard. You can afford high-quality accommodation, save regularly, contribute meaningfully to a pension, and enjoy an excellent quality of life. Mortgage borrowing capacity at this salary is approximately €350,000 (at 3.5 times gross income), which allows property purchase in most parts of the country. At this income level, tax planning has a major financial impact. The difference between optimised and unoptimised tax positions can be several thousand euros per year. Maximum pension contributions within the age-related limits are strongly recommended, as the 40% relief on higher-rate income represents an immediate return. Workers should also consider the impact of Benefit-in-Kind (BIK) for company cars, health insurance, and other employer-provided benefits, which are taxable at the marginal rate. Those with investment income should be aware that the 8% USC surcharge may apply to non-PAYE income above €100,000, bringing the total USC rate on that portion to 11%. Married workers at this level benefit enormously from joint assessment and band sharing.',
    faqs: [
      {
        question: 'What is the take-home pay on €100,000 in Ireland?',
        answer:
          'A single PAYE worker on €100,000 in 2026 takes home approximately €64,700 to €65,500 per year, or roughly €5,390 to €5,460 per month. The effective total deduction rate is approximately 34-35%.',
      },
      {
        question: 'Am I in the top 10% of earners at €100,000?',
        answer:
          'Yes. Approximately 8-10% of full-time workers in Ireland earn €100,000 or more. The median full-time salary is around €40,000-€42,000, making €100,000 more than double the median. This salary is concentrated in sectors such as technology, finance, legal, and medicine.',
      },
      {
        question: 'What tax planning should I do on €100,000?',
        answer:
          'Priority actions include maximising pension contributions (up to age-related limits on €115,000 cap), claiming all available credits (Rent Tax Credit, medical expenses, flat-rate expenses), reviewing filing status for joint assessment if married, and considering salary sacrifice arrangements for pension top-ups. Professional tax advice can save thousands annually.',
      },
    ],
  },
  {
    slug: '120000',
    gross: 120_000,
    grossFormatted: fmt(120_000),
    description:
      'Earning €120,000 per year in Ireland places you firmly among the highest-paid employees in the country. With €78,000 of your income taxed at 40% as a single filer and a substantial portion falling into the 8% USC band, your total deductions amount to approximately €43,000 to €44,000 annually. Your effective deduction rate is approximately 36-37%, and your marginal rate on each additional euro is 52%. This salary is typical for senior directors in multinational corporations, principal software engineers, experienced medical consultants, senior partners in professional firms, senior barristers with established practices, and heads of department in large organisations. Monthly take-home pay at €120,000 is approximately €6,330 to €6,450 for a single person. At this level, financial planning and tax optimisation become not just advisable but essential. The difference in take-home pay between a single person and a jointly assessed married couple at this income can exceed €8,000 per year. Pension contributions are critical: a 25% contribution for someone aged 40-49 (€30,000, capped at the €115,000 earnings limit for relief purposes) would reduce income tax by approximately €12,000 annually. Workers at this salary should work with a qualified tax adviser to ensure all reliefs are maximised, including pension, medical expenses, deeds of covenant, and any applicable capital allowances. Those with equity compensation such as share options or restricted stock units (RSUs) common in the technology sector need to understand the specific tax treatment, as these are taxed at the marginal rate and may also trigger USC and PRSI on the gain. Estate planning and investment structuring also become relevant considerations at this income level.',
    faqs: [
      {
        question: 'What is the net pay on €120,000 in Ireland?',
        answer:
          'A single PAYE worker on €120,000 in 2026 takes home approximately €76,000 to €77,000 per year, or roughly €6,330 to €6,420 per month. The effective total deduction rate is approximately 36%.',
      },
      {
        question: 'How much pension contribution should I make on €120,000?',
        answer:
          'You should aim to contribute the maximum allowed for your age bracket. For ages 40-49, this is 25% of earnings (up to the €115,000 cap), or €28,750 per year. At the 40% marginal rate, this saves €11,500 in income tax annually, making it extremely tax-efficient.',
      },
      {
        question: 'What is the employer cost for a €120,000 salary?',
        answer:
          'The employer pays 11.05% PRSI on top of your salary, adding approximately €13,260 to the cost of employment. The total employer cost is therefore approximately €133,260. This does not include any employer pension contributions, health insurance, or other benefits. That figure matters in a salary negotiation, because it is the number the employer has in mind rather than the gross on the contract. It also makes salary sacrifice arrangements attractive to both sides: a euro moved into a pension avoids employer PRSI as well as employee deductions.',
      },
    ],
  },
  {
    slug: '150000',
    gross: 150_000,
    grossFormatted: fmt(150_000),
    description:
      'A salary of €150,000 per year places you in the top 3-5% of earners in Ireland. The vast majority of your income, €108,000, is taxed at the higher 40% rate as a single person, and a substantial portion falls into the 8% USC band. Your total deductions including income tax, USC, and PRSI amount to approximately €57,000 to €58,000 annually, giving an effective deduction rate of about 38-39%. Monthly take-home pay is approximately €7,680 to €7,800 as a single person. Roles commanding this salary include C-suite executives in medium to large companies, senior partners in top-tier law and accounting firms, experienced medical consultants in the HSE or private practice, senior technology leaders at director or VP level in multinationals, and successful senior barristers. At this income level, tax planning is not optional, it is a financial imperative. The pension contribution cap for tax relief purposes is based on earnings up to €115,000, meaning the age-related percentage limit is applied to €115,000 rather than €150,000. For someone aged 50-54, the 30% limit allows pension contributions of up to €34,500 with full tax relief, saving approximately €13,800 in income tax annually. Workers at €150,000 should engage a qualified tax adviser for comprehensive planning covering pension strategy, investment income structuring, estate planning, and capital gains tax management. Those with share-based compensation, multiple income sources, or rental income face additional complexity. The Domicile Levy and High Earners Restriction may also become relevant considerations. Despite the high deduction rate, a net monthly income of approximately €7,700 provides an excellent quality of life anywhere in Ireland, with substantial capacity for savings, investment, and mortgage servicing.',
    faqs: [
      {
        question: 'What is the take-home pay on €150,000 in Ireland?',
        answer:
          'A single PAYE worker on €150,000 in 2026 takes home approximately €92,100 to €93,000 per year, or roughly €7,680 to €7,750 per month. The effective total deduction rate is approximately 38%.',
      },
      {
        question: 'What is the maximum pension contribution on €150,000?',
        answer:
          'Pension tax relief is capped at earnings of €115,000, not your full €150,000 salary. The age-related percentage is applied to €115,000. For example, at age 40-49 (25% limit), the maximum relief-qualifying contribution is €28,750, not €37,500. The cap catches people out at exactly the income level where pension contributions are most attractive. Contributions above the relief-qualifying amount are still permitted, but they carry no tax advantage, so they are usually better directed at an investment held outside the pension wrapper.',
      },
      {
        question: 'How does the High Earners Restriction affect a €150,000 salary?',
        answer:
          'The High Earners Restriction limits the use of certain specified reliefs (such as property-based tax incentives) for individuals with adjusted income over €125,000. It ensures that high earners pay a minimum effective income tax rate. Standard reliefs like pension contributions and personal tax credits are not affected.',
      },
    ],
  },
];
