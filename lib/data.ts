import {
  Boxes,
  Compass,
  PackageSearch,
  Scale,
  Ship,
  Plane,
  Truck
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: typeof Boxes;
  href: string;
};

export const services: Service[] = [
  {
    id: "transit",
    title: "Transit aérien & maritime",
    description:
      "Acheminement sécurisé de vos marchandises depuis la Chine vers toute l'Afrique. Suivi en temps réel, dédouanement géré.",
    icon: Ship,
    href: "/devis"
  },
  {
    id: "accompagnement",
    title: "Accompagnement en Chine",
    description:
      "Agents francophones à Guangzhou et Yiwu. Sourcing, négociation, inspection qualité et regroupement de vos commandes.",
    icon: Compass,
    href: "/contact"
  },
  {
    id: "catalogue",
    title: "Catalogue produits",
    description:
      "Plus de 8 000 références négociées : électronique, mode, beauté, ameublement. Prix grossistes vérifiés.",
    icon: PackageSearch,
    href: "/blog"
  },
  {
    id: "marketplace",
    title: "Marketplace kilos",
    description:
      "Réservez à partir de 5 kg sur nos départs groupés. Tarif dégressif, transparence totale, sans minimum imposé.",
    icon: Scale,
    href: "/departs"
  }
];

export type Departure = {
  id: string;
  reference: string;
  origin: string;
  destination: string;
  mode: "Aérien" | "Maritime";
  date: string;
  capacityKg: number;
  filledKg: number;
};

export const departures: Departure[] = [
  {
    id: "dep-000",
    reference: "YS-AIR-2405-LBV",
    origin: "Guangzhou",
    destination: "Libreville",
    mode: "Aérien",
    date: "2026-05-24",
    capacityKg: 1400,
    filledKg: 1190
  },
  {
    id: "dep-001",
    reference: "YS-SEA-2805-LBV",
    origin: "Shenzhen",
    destination: "Libreville",
    mode: "Maritime",
    date: "2026-05-28",
    capacityKg: 20000,
    filledKg: 12400
  },
  {
    id: "dep-002",
    reference: "YS-AIR-2607",
    origin: "Guangzhou",
    destination: "Douala",
    mode: "Aérien",
    date: "2026-05-26",
    capacityKg: 1200,
    filledKg: 1044
  },
  {
    id: "dep-003",
    reference: "YS-SEA-3105",
    origin: "Shenzhen",
    destination: "Abidjan",
    mode: "Maritime",
    date: "2026-05-31",
    capacityKg: 18000,
    filledKg: 9540
  },
  {
    id: "dep-004",
    reference: "YS-AIR-0306",
    origin: "Yiwu",
    destination: "Dakar",
    mode: "Aérien",
    date: "2026-06-03",
    capacityKg: 1500,
    filledKg: 420
  },
  {
    id: "dep-005",
    reference: "YS-SEA-1206",
    origin: "Ningbo",
    destination: "Lomé",
    mode: "Maritime",
    date: "2026-06-12",
    capacityKg: 22000,
    filledKg: 16500
  },
  {
    id: "dep-006",
    reference: "YS-AIR-2006-LBV",
    origin: "Guangzhou",
    destination: "Libreville",
    mode: "Aérien",
    date: "2026-06-20",
    capacityKg: 1500,
    filledKg: 245
  }
];

export type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readMinutes: number;
};

export const articles: Article[] = [
  {
    id: "a-001",
    slug: "importer-de-chine-2026-guide",
    title: "Importer de Chine en 2026 : le guide complet pour les PME africaines",
    category: "Sourcing",
    date: "2026-05-02",
    excerpt:
      "Documents, taxes, Incoterms, choix du transitaire : tout ce qu'il faut savoir avant votre première commande grossiste à Guangzhou ou Yiwu.",
    readMinutes: 8
  },
  {
    id: "a-002",
    slug: "aerien-vs-maritime-bien-choisir",
    title: "Aérien ou maritime : comment arbitrer selon votre marge",
    category: "Logistique",
    date: "2026-04-18",
    excerpt:
      "Délais, coût au kilo, volume minimum rentable. Notre comparatif chiffré pour décider sans se tromper sur chaque expédition.",
    readMinutes: 6
  },
  {
    id: "a-003",
    slug: "controle-qualite-usines-chinoises",
    title: "Contrôle qualité en usine : la checklist Yarnel en 14 points",
    category: "Qualité",
    date: "2026-04-04",
    excerpt:
      "Nos inspecteurs sur le terrain partagent leur grille d'audit. À utiliser avant tout virement final à votre fournisseur chinois.",
    readMinutes: 5
  },
  {
    id: "a-004",
    slug: "marketplace-kilos-comment-ca-marche",
    title: "Marketplace kilos : la mutualisation qui divise vos coûts par 3",
    category: "Produit",
    date: "2026-03-21",
    excerpt:
      "Découvrez le fonctionnement du groupage Yarnel. Tarifs dégressifs, calendrier des départs, traçabilité colis par colis.",
    readMinutes: 4
  }
];

export type Urgency = "standard" | "express" | "premium";

export type QuoteResult = {
  price: number;
  delayLabel: string;
  delayDays: number;
  nextDeparture: { date: string; reference: string; mode: string };
  pricePerKg: number;
  urgencyLabel: string;
};

const destinationMultipliers: Record<string, number> = {
  "Libreville (Gabon)": 1.0,
  Douala: 1.05,
  Yaoundé: 1.08,
  Abidjan: 1.1,
  Dakar: 1.12,
  Cotonou: 1.05,
  Lomé: 1.05,
  Kinshasa: 1.2,
  Brazzaville: 1.18,
  Bangui: 1.3,
  Conakry: 1.18,
  Bamako: 1.22,
  Niamey: 1.25,
  Ouagadougou: 1.2,
  Lagos: 1.1,
  Nouakchott: 1.2
};

const urgencyConfig: Record<
  Urgency,
  { base: number; days: number; label: string; mode: "Aérien" | "Maritime" }
> = {
  standard: { base: 4.5, days: 40, label: "Standard maritime", mode: "Maritime" },
  express: { base: 9.8, days: 15, label: "Express mixte", mode: "Maritime" },
  premium: { base: 14.5, days: 6, label: "Premium aérien", mode: "Aérien" }
};

export const destinations = Object.keys(destinationMultipliers);

export function estimateQuote(
  weightKg: number,
  destination: string,
  urgency: Urgency,
  volumeM3?: number
): QuoteResult {
  const cfg = urgencyConfig[urgency];
  const destMult = destinationMultipliers[destination] ?? 1.15;
  const volumetric = volumeM3 ? Math.max(weightKg, volumeM3 * 167) : weightKg;

  let pricePerKg = cfg.base * destMult;
  if (volumetric >= 100) pricePerKg *= 0.92;
  if (volumetric >= 500) pricePerKg *= 0.9;
  if (volumetric >= 1000) pricePerKg *= 0.88;

  const handling = 35;
  const price = Math.round(volumetric * pricePerKg + handling);

  const next =
    departures
      .filter((d) => d.mode === cfg.mode)
      .sort((a, b) => +new Date(a.date) - +new Date(b.date))[0] ?? departures[0];

  return {
    price,
    pricePerKg: Math.round(pricePerKg * 10) / 10,
    delayDays: cfg.days,
    delayLabel: `${cfg.days} jours environ`,
    urgencyLabel: cfg.label,
    nextDeparture: {
      date: next.date,
      reference: next.reference,
      mode: next.mode
    }
  };
}

export const stats = [
  { value: 8500, suffix: "+", label: "Colis acheminés en 2025" },
  { value: 16, suffix: "", label: "Villes africaines desservies" },
  { value: 98, suffix: "%", label: "Livraisons dans les délais" },
  { value: 72, suffix: "h", label: "Réponse devis garantie" }
];

export const testimonials = [
  {
    name: "Aïcha Diop",
    role: "Fondatrice — Maison Diop, Dakar",
    quote:
      "Yarnel a divisé mes coûts d'import par deux. L'équipe à Guangzhou est réactive et l'inspection qualité m'a évité plusieurs catastrophes.",
    rating: 5
  },
  {
    name: "Jean-Marc Eboa",
    role: "Directeur achats — TechAfric, Douala",
    quote:
      "Les départs groupés hebdomadaires sont devenus notre standard. Suivi parfait, dédouanement clé en main, zéro mauvaise surprise.",
    rating: 5
  },
  {
    name: "Fatim Traoré",
    role: "E-commerçante — Bamako",
    quote:
      "Pour mes commandes de 30 kg, la marketplace kilos est imbattable. Je sais à l'avance ce que je paie, je réserve en 2 minutes.",
    rating: 5
  }
];

export const cargoModes = [
  { icon: Ship, title: "Maritime groupé", detail: "à partir de 4,5 $ / kg" },
  { icon: Plane, title: "Aérien express", detail: "5 à 8 jours porte à porte" },
  { icon: Truck, title: "Livraison finale", detail: "réseau partenaire dans 16 villes" },
  { icon: Boxes, title: "Stockage Chine", detail: "30 jours offerts en entrepôt" }
];
