/** Registry of the social welfare and property pages, and labels for the links between pages. */
import type { WelfarePage } from './types';
import { page as hub } from './pages/hub';
import { page as jobseekersBenefit } from './pages/jobseekers-benefit';
import { page as jobseekersAllowance } from './pages/jobseekers-allowance';
import { page as illnessBenefit } from './pages/illness-benefit';
import { page as maternityBenefit } from './pages/maternity-benefit';
import { page as workingFamilyPayment } from './pages/working-family-payment';
import { page as carersAllowance } from './pages/carers-allowance';
import { page as statePension } from './pages/state-pension';
import { page as stampDuty } from './pages/stamp-duty';
import { page as helpToBuy } from './pages/help-to-buy';

export const HUB = hub;
/** Pages served under /social-welfare/<slug>/. */
export const WELFARE_PAGES: WelfarePage[] = [jobseekersBenefit, jobseekersAllowance, illnessBenefit, maternityBenefit, workingFamilyPayment, carersAllowance, statePension];
export const STAMP_DUTY_PAGE = stampDuty;
export const HELP_TO_BUY_PAGE = helpToBuy;
export const ALL_PAGES: WelfarePage[] = [hub, ...WELFARE_PAGES, stampDuty, helpToBuy];

/** Link labels: module pages from their data, existing pages of the site by hand. */
export const LABELS: Record<string, string> = {
  '/': 'Irish take-home pay calculator 2026',
  '/average-salary-ireland/': 'Average salary in Ireland',
  '/minimum-wage-ireland/': 'Minimum wage in Ireland',
  '/guides/prsi-social-insurance/': 'PRSI classes, rates and the benefits they unlock',
  '/guides/tax-credits-ireland/': 'Tax credits in Ireland',
  '/guides/pension-tax-relief/': 'Pension contributions and tax relief',
  ...Object.fromEntries(ALL_PAGES.map((p) => [p.path, p.h1])),
};
