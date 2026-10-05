/**
 * Every welfare and property calculator renders a result from its default
 * inputs, and that first result is not zero (RECETTE §17.3: a calculator that
 * shows zero is not seen in the code).
 */
import { describe, it, expect } from 'vitest';
import { WELFARE_SPECS } from './welfare-specs';
import { ALL_PAGES } from '../data/welfare/index';

describe('welfare calculators', () => {
  for (const [kind, spec] of Object.entries(WELFARE_SPECS)) {
    it(`${kind}: default inputs give a non-zero headline`, () => {
      const v = Object.fromEntries(spec.inputs.map((i) => [i.id, i.def]));
      const out = spec.run(v);
      expect(out.head[1]).toMatch(/[1-9]/);
      for (const [label, value] of out.rows) {
        expect(label.length).toBeGreaterThan(0);
        expect(value.length).toBeGreaterThan(0);
      }
    });
  }
  it('every page calculator exists', () => {
    for (const p of ALL_PAGES) {
      expect(WELFARE_SPECS[p.sim], p.sim).toBeDefined();
      for (const s of p.sections) if (s.mini) expect(WELFARE_SPECS[s.mini], s.mini).toBeDefined();
    }
  });
});

describe('welfare pages', () => {
  const words = (t: string) => t.trim().split(/\s+/).length;
  const questions = new Set<string>();
  for (const p of ALL_PAGES) {
    it(`${p.path}: title, description, citable block and FAQ within the rules`, () => {
      expect(p.title.length).toBeGreaterThanOrEqual(50);
      expect(p.title.length).toBeLessThanOrEqual(60);
      expect(p.description.length).toBeGreaterThanOrEqual(150);
      expect(p.description.length).toBeLessThanOrEqual(160);
      expect(words(p.citable)).toBeGreaterThanOrEqual(120);
      expect(p.faqs.length).toBeGreaterThanOrEqual(6);
      expect(p.faqs.length).toBeLessThanOrEqual(8);
      for (const f of p.faqs) {
        const n = words(f.a);
        expect(n, f.q).toBeGreaterThanOrEqual(40);
        expect(n, f.q).toBeLessThanOrEqual(90);
        expect(questions.has(f.q), f.q).toBe(false);
        questions.add(f.q);
      }
      expect(`${p.title}${p.description}${p.citable}${JSON.stringify(p.sections)}`).not.toMatch(/—/);
    });
  }
});
