# Module « social welfare + property » d'irishnetpay.com

Notice pour l'agent qui étoffe le module (ajouté le 2026-10-05). À lire avec `~/Documents/GitHub/RECETTE-SITE.md` (§6, §7, §9.3, §11, §17.4, §21, §26).

## Architecture : une page = un fichier de données

| Fichier | Rôle |
|---|---|
| `src/lib/welfare-2026.ts` | **Tous** les paramètres (taux, seuils, barèmes) et `SOURCES` (URL, libellé, date de lecture). Rien en dur ailleurs. |
| `src/lib/welfare-engine.ts` | Moteur pur : JB/JPRB, JA (test de ressources), IB, Maternity/Paternity/Parent's, WFP, Carer's, State Pension (TCA + transition), Stamp Duty, Help to Buy. |
| `src/lib/welfare-engine.test.ts` | Exemples officiels transformés en tests (Citizens Information, gov.ie, Revenue), bornes de chaque règle. |
| `src/lib/welfare-specs.ts` | Les calculateurs (`kind`) lus par `components/calc/MiniSimAutonome.tsx` via `lib/mini-specs.ts`. |
| `src/lib/welfare-specs.test.ts` | Chaque calculateur rend un résultat non nul ; chaque page respecte titre 50-60, description 150-160, bloc citable ≥ 120 mots, FAQ 6-8 réponses de 40-90 mots, questions uniques, pas de tiret cadratin. |
| `src/data/welfare/pages/<id>.ts` | **Une page** : chemin, titres, bloc citable, calculateur principal, sections (chacune peut porter un 2ᵉ calculateur), FAQ, sources, pages liées. |
| `src/data/welfare/index.ts` | Registre des pages et libellés des liens internes. |
| `src/components/WelfareArticle.astro` | Rendu commun (fil d'Ariane, FAQ visible + `FAQPage` depuis le même tableau, sources datées). |
| `src/pages/social-welfare/[slug].astro`, `index.astro`, `stamp-duty-ireland/`, `help-to-buy-ireland/` | Routes. |

## Ajouter une page

1. La requête doit être mesurée (`reports/volumes-2026-10-05/ie.txt` ou Keyword Planner).
2. Lire la source officielle (SW19 de l'année, citizensinformation.ie, gov.ie, revenue.ie, irishstatutebook.ie). Les sites gov.ie et citizensinformation.ie renvoient 403 à un client sans en-têtes de navigateur : `check-sources` les signale « bloqués », à revérifier avec un curl aux en-têtes complets.
3. Ajouter les valeurs et la source à `welfare-2026.ts`, la règle au moteur, un test par exemple officiel.
4. Copier la **structure** d'un fichier de `pages/` (jamais ses phrases), l'inscrire dans `index.ts` (et `WELFARE_PAGES` pour une page sous `/social-welfare/`).
5. `npx vitest run`, `npm run build`, puis tous les contrôles du brief (check-seo, check-trame, check-simulateurs, check-sources, check-legal, check-regles, check-portefeuille ; sur `dist` : check-unique, check-layout, check-contraste, check-saisie --max=60, check-nombres, typo-nbsp --check, check-liens).

## Pièges déjà rencontrés

- **Année de référence** : JB et IB 2026 se calculent sur les gains de **2024** ; le JPRB sur les 12 mois finissant 8 semaines avant la perte d'emploi.
- **JPRB** (depuis le 31 mars 2025) a remplacé JB pour les chômeurs complets ; JB reste pour le temps partiel. Aucune majoration pour personnes à charge sur le JPRB.
- **Carer's Allowance** : disregard de 1 000 € / 2 000 € par semaine depuis le 2 juillet 2026 ; le taux baisse par pas de 2,50 € (« ou fraction ») au-delà de 7,60 € de ressources.
- **State Pension** : le ratio TCA est **tronqué** à 4 décimales (exemple gov.ie 1 817 / 2 080 = 0,8735) ; en 2026, meilleur de TCA seul ou 80 % moyenne annuelle + 20 % TCA.
- **Stamp Duty** : prix hors TVA pour le neuf ; dépôt et paiement sous **44 jours** (pas 30).
- Un champ dont le `max` est inférieur à 500 fait échouer `check-saisie` : préférer une valeur en euros à un pourcentage plafonné.
- Un calculateur placé entre deux paragraphes doit être dans un élément `data-chrome`, sinon `check-layout` compte sa hauteur comme un « trou ».
