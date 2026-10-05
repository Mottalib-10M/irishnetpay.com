/** Formatting helpers for the welfare pages: every figure written in a page goes through these, from the parameters. */
import { SOURCES, type SourceKey } from '../../lib/welfare-2026';

/** Euro amount: `e(254)` → "€254", `e(163.7, 2)` → "€163.70". Whole amounts drop the cents automatically unless `d` is given. */
export const e = (x: number, d?: number) => {
  const decimals = d ?? (Number.isInteger(x) ? 0 : 2);
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(x);
};
/** Plain number with thousands separators. */
export const n = (x: number) => new Intl.NumberFormat('en-IE', { maximumFractionDigits: 2 }).format(x);
/** Percentage from a share: `p(0.6)` → "60%". */
export const p = (x: number, d = 1) => new Intl.NumberFormat('en-IE', { style: 'percent', maximumFractionDigits: d }).format(x);
/** Date in words, from an ISO date. */
export const date = (iso: string) => new Intl.DateTimeFormat('en-IE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T12:00:00Z`));
/** Link to an official source. */
export const src = (key: SourceKey, text: string) => `<a href="${SOURCES[key].url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
/** HTML table with a caption. */
export const table = (head: string[], rows: Array<Array<string>>, caption?: string) =>
  `<table>${caption ? `<caption>${caption}</caption>` : ''}<thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
