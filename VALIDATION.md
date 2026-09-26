# Validation, irishnetpay.com

## Sources

- [Revenue.ie](https://www.revenue.ie)
- [Citizens Information](https://www.citizensinformation.ie)
- [Gov.ie Budget](https://www.gov.ie/budget)

---

## Test Case 1: Single PAYE worker, EUR 40,000 gross

**Input:** Gross EUR 40,000, single, standard credits
**Expected:**
- PAYE: 20% on EUR 40,000 = EUR 8,000, less credits EUR 3,750 = EUR 4,250
- USC: ~EUR 905
- PRSI (4%): EUR 1,600
- **Net: ~EUR 33,245**

**Source:** revenue.ie PAYE bands 2026

### Test Case 2: Married one income, EUR 70,000 gross

**Input:** Gross EUR 70,000, married one income
**Expected:**
- Standard rate band: EUR 51,000
- PAYE: 20% on 51k + 40% on 19k = EUR 17,800, less credits EUR 5,625 = EUR 12,175
- **Net significantly higher than single at same gross**

### Test Case 3: Emergency tax scenario

**Input:** Gross EUR 3,500/month, emergency tax basis
**Verification:**
- Week 1-4: standard rate with partial credits
- After week 4: all income at 40%, no credits
- **Emergency tax = much lower net than normal PAYE**

---

## Build status

- **Build:** 31 pages, 0 errors
- **Tests:** 15/15 passed
- **Sitemap:** auto-generated (sitemap-index.xml)

## Page inventory (31 pages)

| Category | Count | Details |
|---|---|---|
| Home + legal | 3 | index, legal, privacy |
| Tool pages | 1 | faq |
| Guides index | 1 | /guides/ |
| Guide articles | 8 | paye-tax-ireland, usc-universal-social-charge, prsi-social-insurance, tax-credits-ireland, emergency-tax-ireland, married-tax-assessment, pension-tax-relief, first-job-ireland |
| Salary pages | 12 | salary-[amount] (25000 through 150000) |
| Scenario pages | 6 | [scenario]-take-home-pay (6 tax scenarios) |

## Components

- SalaryCalculator.tsx (Irish PAYE/USC/PRSI calculator)

## Data files

- tax-rates-2026.ts, PAYE bands, USC thresholds, PRSI rates, tax credits
- salaries-data.ts, 12 salary entries with pre-calculated examples
- tax-credits-data.ts, 6 tax scenario entries

## Quality gates

- [x] Build passes (31 pages, 0 errors)
- [x] Tests pass (15/15)
- [x] Sitemap generated
- [x] Schema.org on every page (WebApplication, FAQPage, BreadcrumbList)
- [x] Analytics: Plausible + GA4 placeholder
- [x] robots.txt present
- [x] llms.txt present
- [x] All guide pages > 1500 words
- [x] Disclaimer in footer
- [x] Mobile-responsive navigation (hamburger menu)
- [x] Internal cross-linking between tools and guides
