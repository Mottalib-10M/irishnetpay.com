/**
 * Téléphone : tant que le bloc du résultat est sous l'écran, une barre collée en bas
 * montre le chiffre clé (RECETTE §5, règle du 2026-10-11). Ajoutée côté client
 * seulement : aucun texte en double dans le HTML servi.
 */
import { type RefObject, useEffect, useState } from 'react';

export function useBelow(ref: RefObject<HTMLElement | null>) {
  const [below, setBelow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setBelow(!e.isIntersecting && e.boundingClientRect.top > 0));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return below;
}

export default function StickyResult({ target, label, value }: { target: RefObject<HTMLElement | null>; label: string; value: string }) {
  const below = useBelow(target);
  if (!below) return null;
  return (
    <button type="button" aria-hidden="true" tabIndex={-1}
      onClick={() => target.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      className="fixed inset-x-0 bottom-0 z-40 flex items-baseline justify-between gap-3 border-t border-border bg-white px-4 py-3 text-left shadow-lg lg:hidden">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="tabular-nums text-xl font-bold text-green-600">{value}</span>
    </button>
  );
}
