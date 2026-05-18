# YarnelSourcing — Phase 1

Plateforme de transit Chine → Afrique. Frontend Next.js 14 (App Router), Tailwind, Framer Motion, composants shadcn-style. Aucun backend : données mockées dans `lib/data.ts`.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS (palette : `navy #04092F`, `royal #000B65`, `electric #0000FD`, `sky #7DC7E2`)
- Framer Motion (transitions de pages, fade-up, count-up, barres animées)
- Composants UI hand-rolled façon shadcn (`components/ui/*`)
- Radix primitives : `@radix-ui/react-slot`, `@radix-ui/react-progress`, `@radix-ui/react-label`
- `lucide-react` pour les icônes
- Polices : Inter (corps) + Playfair Display italique (accents éditoriaux)

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvre http://localhost:3000.

## Arborescence

```
app/
  layout.tsx          # navbar + footer + WhatsApp + transitions
  page.tsx            # homepage
  devis/              # wizard 3 étapes + résultat
  departs/            # liste filtrable + barres de progression
  blog/               # featured + grid d'articles
  contact/            # formulaire + bureaux
components/
  ui/                 # button, card, input, textarea, label, progress, badge
  navbar.tsx          # sticky transparent → blanc au scroll
  footer.tsx          # 4 colonnes + contact
  whatsapp-button.tsx # CTA flottant
  page-transition.tsx # fade entre routes
  stat-counter.tsx    # count-up on view
  reveal.tsx          # fade-up générique
lib/
  data.ts             # services, départs, articles, estimateQuote()
  utils.ts            # cn, formatPrice, formatDateFR
```

## Logique de devis

`estimateQuote(weight, destination, urgency, volume?)` →

- Calcul du poids volumétrique (`max(weight, volume × 167)`)
- Multiplicateur par destination (16 villes africaines)
- Tarif dégressif au-delà de 100 / 500 / 1 000 kg
- Date du prochain départ filtrée par mode (aérien / maritime)

## Données mockées

- 4 services (transit, accompagnement, catalogue, marketplace)
- 5 départs (aériens + maritimes) avec capacité / remplissage réels
- 4 articles avec catégorie, date, temps de lecture
- 4 stats animées, 3 témoignages

## À venir (hors Phase 1)

- Auth (création de compte / dashboard)
- Réservation effective + paiement
- Tracking colis temps réel
- Multilingue (EN, PT)
"# YarnelSourcing" 
