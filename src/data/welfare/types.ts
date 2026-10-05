/**
 * One page of the social welfare and property module = one data file in
 * `pages/` (CONTRIBUTING-WELFARE.md). The component `WelfareArticle.astro`
 * renders it: breadcrumb, citable answer, main calculator, sections (each can
 * carry a second calculator), FAQ (visible and FAQPage from the same array),
 * related pages and dated sources.
 */
import type { SourceKey } from '../../lib/welfare-2026';

export interface WelfareSection {
  h2: string;
  /** HTML: p, ul, ol, table, h3, a. Figures come from welfare-2026.ts through the helpers in `fmt.ts`. */
  html: string;
  /** Kind of a calculator from `lib/welfare-specs.ts`, placed after this section. */
  mini?: string;
  miniHref?: string;
}

export interface WelfareFaq { q: string; a: string }

export interface WelfarePage {
  /** Absolute path with trailing slash, e.g. `/social-welfare/illness-benefit/`. */
  path: string;
  /** Short label for breadcrumb, menus and cards. */
  nav: string;
  /** One sentence for the cards that link to the page. */
  card: string;
  /** 50 to 60 characters, key term first (RECETTE §11). */
  title: string;
  /** 150 to 160 characters. */
  description: string;
  h1: string;
  /** One paragraph of 120 words or more, the answer to the query (RECETTE §21). */
  citable: string;
  /** Main calculator (kind from welfare-specs.ts) and where its button leads. */
  sim: string;
  simHref?: string;
  sections: WelfareSection[];
  faqs: WelfareFaq[];
  sources: SourceKey[];
  /** Paths of related pages (module or existing guides). */
  related: string[];
  /** True when the calculator is the page's main content (check-seo `data-outil`). */
  tool?: boolean;
}
