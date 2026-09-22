/**
 * Questions complementaires, engendrees a partir des donnees de chaque page.
 *
 * La recette (§7) demande six a huit questions sur une page pilier ; ces pages
 * en portaient trois. Les completer avec un texte commun aurait aggrave la
 * ressemblance entre pages : chaque reponse ci-dessous est donc construite sur
 * les chiffres propres a la page, salaire, tranche, credits, taux marginal.
 * Deux pages ne peuvent pas produire le meme texte.
 *
 * Les reponses tiennent les bornes de 40 a 90 mots imposees par la recette.
 */
import { calculateSalary } from './engine';
import type { SalaryEntry } from './salaries-data';
import type { TaxScenarioEntry } from './tax-credits-data';

export interface FAQ {
  question: string;
  answer: string;
}

const eur = (v: number) =>
  '€' + Math.round(v).toLocaleString('en-IE');

/** Questions propres a un niveau de salaire. */
export function faqsSalaire(s: SalaryEntry): FAQ[] {
  const r = calculateSalary({
    grossAnnual: s.gross,
    filingStatus: 'single',
    pensionRate: 0,
    additionalCredits: 0,
  });
  const avecPension = calculateSalary({
    grossAnnual: s.gross,
    filingStatus: 'single',
    pensionRate: 0.05,
    additionalCredits: 0,
  });
  /* Ce que la pension coute reellement : la cotisation, moins le net regagne. */
  const coutNetPension = s.gross * 0.05 - (r.netAnnual - avecPension.netAnnual);
  const tauxEffectif = (r.totalDeductions / s.gross) * 100;
  const auDessusSRCOP = s.gross > 42000;

  return [
    {
      question: `What is the effective tax rate on ${s.grossFormatted} in Ireland?`,
      answer:
        `Total deductions come to ${eur(r.totalDeductions)} a year, which is ` +
        `${tauxEffectif.toFixed(1)}% of gross. That is the effective rate, and it is well below the ` +
        `marginal rate people usually quote, because income tax credits and the lower USC bands ` +
        `apply to everyone regardless of salary. The marginal rate only describes what happens to ` +
        `the next euro earned, not to the salary as a whole.`,
    },
    {
      question: `Does a pension contribution pay for itself on ${s.grossFormatted}?`,
      answer:
        `Contributing five percent of ${s.grossFormatted} costs ${eur(s.gross * 0.05)} gross but ` +
        `reduces take-home pay by only ${eur(r.netAnnual - avecPension.netAnnual)}, ` +
        `because contributions are relieved against income tax at your marginal rate. The relief ` +
        `does not extend to USC or PRSI, which are charged on the full gross. Age-related limits ` +
        `cap the contribution eligible for relief, starting at fifteen percent under thirty.`,
    },
    {
      question: `Which tax band does ${s.grossFormatted} fall into?`,
      answer: auDessusSRCOP
        ? `${s.grossFormatted} sits above the standard rate cut-off point of €42,000 for a single ` +
          `person, so the portion above that threshold is taxed at forty percent rather than twenty. ` +
          `Only the excess is affected: the first €42,000 is still taxed at the standard rate. A ` +
          `married couple with one income has a higher cut-off point, which is why the same salary ` +
          `produces a different result depending on filing status.`
        : `${s.grossFormatted} sits below the standard rate cut-off point of €42,000 for a single ` +
          `person, so all of it is taxed at the standard twenty percent rate before credits are ` +
          `applied. Crossing that threshold does not raise the tax on income already earned; only ` +
          `the portion above it is taxed at forty percent, which is the point most often ` +
          `misunderstood about the Irish system.`,
    },
    {
      question: `How much USC is paid on ${s.grossFormatted}?`,
      answer:
        `USC on this salary comes to ${eur(r.usc)} for the year, charged across four progressive ` +
        `bands rather than at a single rate. It applies to gross income before pension relief, ` +
        `which is why a pension contribution reduces income tax but not USC. Anyone earning ` +
        `€13,000 or less in the year is exempt from USC entirely, and reduced rates apply to some ` +
        `medical card holders and those over seventy.`,
    },
  ];
}

/** Questions propres a une situation fiscale. */
export function faqsSituation(e: TaxScenarioEntry): FAQ[] {
  const reference = 50000;
  const r = calculateSalary({
    grossAnnual: reference,
    filingStatus: e.slug.includes('married') ? 'married_one_income' : 'single',
    pensionRate: 0,
    additionalCredits: 0,
  });
  const credits = e.keyCredits.map((c) => c.name).join(', ');

  return [
    {
      question: `What does a ${e.label.toLowerCase()} take home on €50,000?`,
      answer:
        `On a €50,000 salary this status leaves ${eur(r.netAnnual)} a year, or ` +
        `${eur(r.netAnnual / 12)} a month, after income tax of ${eur(r.incomeTaxNet)}, USC of ` +
        `${eur(r.usc)} and PRSI of ${eur(r.prsi)}. The figure assumes no pension contribution and ` +
        `no credits beyond the standard ones, so it is a floor rather than a forecast: most people ` +
        `in this position claim at least one additional relief.`,
    },
    {
      question: `Which credits apply to a ${e.label.toLowerCase()}?`,
      answer:
        `The credits that define this position are ${credits}. They are deducted from the tax ` +
        `calculated, not from income, so each euro of credit reduces the bill by a full euro. ` +
        `Credits are allocated on your Revenue record rather than applied automatically, which is ` +
        `why checking the allocation at the start of a year is worth more than most tax planning ` +
        `carried out at the end of one.`,
    },
    {
      question: `What if I stop being a ${e.label.toLowerCase()} mid-year?`,
      answer:
        `Tax credits and the standard rate cut-off point are annual figures applied cumulatively ` +
        `through the year, so a change in status is reflected from the point Revenue is notified ` +
        `and any overpayment is refunded through payroll. Marriage, a new child, a second job or ` +
        `becoming a carer all shift the position. None of them apply retroactively unless the ` +
        `change is declared, which is done through the Revenue online service.`,
    },
  ];
}

/**
 * Complete les reponses trop courtes ecrites a la main.
 *
 * Plusieurs reponses des donnees tiennent en trente mots : elles annoncent un
 * montant et s'arretent la. Plutot que d'y coller une phrase passe-partout, on
 * calcule ce qui manquait vraiment, c'est-a-dire ce que vaut l'euro suivant a
 * ce niveau de salaire. La precision differe donc d'une page a l'autre, et elle
 * repond a la question que se pose quelqu'un qui negocie une augmentation.
 */
export function completeCourtes(faqs: FAQ[], brut: number): FAQ[] {
  const base = calculateSalary({
    grossAnnual: brut,
    filingStatus: 'single',
    pensionRate: 0,
    additionalCredits: 0,
  });
  const plus = calculateSalary({
    grossAnnual: brut + 1000,
    filingStatus: 'single',
    pensionRate: 0,
    additionalCredits: 0,
  });
  const gardeSur1000 = plus.netAnnual - base.netAnnual;
  const marginal = 100 - (gardeSur1000 / 1000) * 100;

  const precision =
    ` At this level the marginal rate is ${marginal.toFixed(0)}%, so a €1,000 rise adds ` +
    `${eur(gardeSur1000)} to net pay rather than the full amount. That is the figure worth ` +
    `carrying into a salary negotiation.`;

  return faqs.map((f) =>
    f.answer.split(/\s+/).length < 40 ? { ...f, answer: f.answer + precision } : f,
  );
}
