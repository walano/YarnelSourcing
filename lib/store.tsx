"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { departures as seedDepartures, type Departure } from "@/lib/data";
import type { Currency } from "@/lib/currency";

export type Role = "client" | "admin";

export type User = {
  name: string;
  email: string;
  role: Role;
  currency: Currency;
} | null;

export type QuoteStatus = "en_attente" | "facture";

export type Quote = {
  id: string;
  createdAt: string;
  userEmail: string;
  userName: string;
  kind: "detaille" | "photo";
  // detaillé
  goods?: string;
  shipping?: "Maritime" | "Aérien";
  weightKg?: number;
  cbm?: number;
  destination?: string;
  urgency?: string;
  urgencyLabel?: string;
  insurance?: boolean;
  accompagnement?: boolean;
  priceUsd?: number;
  // photo
  photoName?: string;
  photoDataUrl?: string;
  description?: string;
  status: QuoteStatus;
};

export type Invoice = {
  id: string;
  quoteId: string;
  createdAt: string;
  userEmail: string;
  amountUsd: number;
  note: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  priceUsd: number;
};

type StoreState = {
  user: User;
  quotes: Quote[];
  invoices: Invoice[];
  catalog: Product[];
  departures: Departure[];
};

type StoreContextValue = StoreState & {
  hydrated: boolean;
  login: (u: NonNullable<User>) => void;
  logout: () => void;
  setCurrency: (c: Currency) => void;
  addQuote: (q: Omit<Quote, "id" | "createdAt" | "status">) => Quote;
  sendInvoice: (i: Omit<Invoice, "id" | "createdAt">) => void;
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  addDeparture: (d: Omit<Departure, "id">) => void;
  updateDeparture: (id: string, patch: Partial<Departure>) => void;
  removeDeparture: (id: string) => void;
};

const STORAGE_KEY = "yarnel-store-v1";

const seedCatalog: Product[] = [
  { id: "p-01", name: "Écouteurs sans fil TWS", category: "Électronique", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=600&q=80", priceUsd: 9 },
  { id: "p-02", name: "Montre connectée", category: "Électronique", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80", priceUsd: 14 },
  { id: "p-03", name: "Power bank 20000 mAh", category: "Électronique", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80", priceUsd: 11 },
  { id: "p-04", name: "Robe wax imprimée", category: "Mode & textile", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=600&q=80", priceUsd: 7 },
  { id: "p-05", name: "Baskets running", category: "Mode & textile", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80", priceUsd: 12 },
  { id: "p-06", name: "Sac à main cuir PU", category: "Mode & textile", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80", priceUsd: 10 },
  { id: "p-07", name: "Kit maquillage 12 pièces", category: "Beauté & cosmétiques", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80", priceUsd: 8 },
  { id: "p-08", name: "Perruque cheveux", category: "Beauté & cosmétiques", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=600&q=80", priceUsd: 16 },
  { id: "p-09", name: "Lampe LED bureau", category: "Maison & déco", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80", priceUsd: 6 },
  { id: "p-10", name: "Set ustensiles cuisine", category: "Maison & déco", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80", priceUsd: 13 },
  { id: "p-11", name: "Smartphone reconditionné", category: "Téléphonie", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80", priceUsd: 95 },
  { id: "p-12", name: "Coque + verre trempé", category: "Téléphonie", image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80", priceUsd: 2 }
];

const seedQuotes: Quote[] = [
  {
    id: "q-demo-1",
    createdAt: "2026-05-12T09:24:00.000Z",
    userEmail: "awa.ndong@gmail.com",
    userName: "Awa Ndong",
    kind: "detaille",
    goods: "Ordinaire",
    shipping: "Maritime",
    weightKg: 320,
    cbm: 1.8,
    destination: "Libreville (Gabon)",
    urgency: "standard",
    urgencyLabel: "Standard",
    insurance: true,
    accompagnement: false,
    priceUsd: 1640,
    status: "facture"
  },
  {
    id: "q-demo-2",
    createdAt: "2026-05-16T14:02:00.000Z",
    userEmail: "awa.ndong@gmail.com",
    userName: "Awa Ndong",
    kind: "photo",
    description: "Je veux 200 paires de sandales, modèle sur la photo, tailles 38-44.",
    photoName: "sandales.jpg",
    status: "en_attente"
  }
];

const seedInvoices: Invoice[] = [
  {
    id: "inv-demo-1",
    quoteId: "q-demo-1",
    createdAt: "2026-05-13T08:00:00.000Z",
    userEmail: "awa.ndong@gmail.com",
    amountUsd: 1640,
    note: "Tarif tout inclus : transport maritime + assurance + dédouanement. Départ YS-SEA-2805-LBV."
  }
];

const initialState: StoreState = {
  user: null,
  quotes: seedQuotes,
  invoices: seedInvoices,
  catalog: seedCatalog,
  departures: seedDepartures
};

const StoreContext = createContext<StoreContextValue | null>(null);

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<StoreState>;
        setState((prev) => ({ ...prev, ...saved }));
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota / large photo data */
    }
  }, [state, hydrated]);

  const value = useMemo<StoreContextValue>(() => {
    return {
      ...state,
      hydrated,
      login: (u) => setState((s) => ({ ...s, user: u })),
      logout: () => setState((s) => ({ ...s, user: null })),
      setCurrency: (c) =>
        setState((s) => (s.user ? { ...s, user: { ...s.user, currency: c } } : s)),
      addQuote: (q) => {
        const quote: Quote = {
          ...q,
          id: uid("q"),
          createdAt: new Date().toISOString(),
          status: "en_attente"
        };
        setState((s) => ({ ...s, quotes: [quote, ...s.quotes] }));
        return quote;
      },
      sendInvoice: (i) => {
        const invoice: Invoice = {
          ...i,
          id: uid("inv"),
          createdAt: new Date().toISOString()
        };
        setState((s) => ({
          ...s,
          invoices: [invoice, ...s.invoices],
          quotes: s.quotes.map((q) =>
            q.id === i.quoteId ? { ...q, status: "facture" } : q
          )
        }));
      },
      addProduct: (p) =>
        setState((s) => ({
          ...s,
          catalog: [{ ...p, id: uid("p") }, ...s.catalog]
        })),
      updateProduct: (id, patch) =>
        setState((s) => ({
          ...s,
          catalog: s.catalog.map((p) => (p.id === id ? { ...p, ...patch } : p))
        })),
      removeProduct: (id) =>
        setState((s) => ({
          ...s,
          catalog: s.catalog.filter((p) => p.id !== id)
        })),
      addDeparture: (d) =>
        setState((s) => ({
          ...s,
          departures: [{ ...d, id: uid("dep") }, ...s.departures]
        })),
      updateDeparture: (id, patch) =>
        setState((s) => ({
          ...s,
          departures: s.departures.map((d) =>
            d.id === id ? { ...d, ...patch } : d
          )
        })),
      removeDeparture: (id) =>
        setState((s) => ({
          ...s,
          departures: s.departures.filter((d) => d.id !== id)
        }))
    };
  }, [state, hydrated]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
