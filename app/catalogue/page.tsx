"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";
import { formatMoney, type Currency } from "@/lib/currency";
import { useStore } from "@/lib/store";

type SortKey = "pertinence" | "prix-asc" | "prix-desc" | "nom";

const priceRanges: { id: string; min: number; max: number }[] = [
  { id: "all", min: 0, max: Infinity },
  { id: "r1", min: 0, max: 10 },
  { id: "r2", min: 10, max: 50 },
  { id: "r3", min: 50, max: 100 },
  { id: "r4", min: 100, max: Infinity }
];

function rangeLabel(
  r: { id: string; min: number; max: number },
  currency: Currency
) {
  if (r.id === "all") return "Tous les prix";
  if (r.max === Infinity) return `Plus de ${formatMoney(r.min, currency)}`;
  if (r.min === 0) return `Moins de ${formatMoney(r.max, currency)}`;
  return `${formatMoney(r.min, currency)} – ${formatMoney(r.max, currency)}`;
}

export default function CataloguePage() {
  const { catalog, user } = useStore();
  const currency = user?.currency ?? "USD";

  const [search, setSearch] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [range, setRange] = useState("all");
  const [sort, setSort] = useState<SortKey>("pertinence");
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    catalog.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [catalog]);

  const results = useMemo(() => {
    const r = priceRanges.find((x) => x.id === range)!;
    let list = catalog.filter((p) => {
      const okSearch = p.name.toLowerCase().includes(search.toLowerCase().trim());
      const okCat = cats.length === 0 || cats.includes(p.category);
      const okPrice = p.priceUsd >= r.min && p.priceUsd < r.max;
      return okSearch && okCat && okPrice;
    });
    if (sort === "prix-asc") list = [...list].sort((a, b) => a.priceUsd - b.priceUsd);
    if (sort === "prix-desc") list = [...list].sort((a, b) => b.priceUsd - a.priceUsd);
    if (sort === "nom") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [catalog, search, cats, range, sort]);

  const toggleCat = (name: string) =>
    setCats((c) =>
      c.includes(name) ? c.filter((x) => x !== name) : [...c, name]
    );

  const clearAll = () => {
    setSearch("");
    setCats([]);
    setRange("all");
    setSort("pertinence");
  };

  const activeCount =
    cats.length + (range !== "all" ? 1 : 0) + (search ? 1 : 0);

  return (
    <div className="bg-white">
      <PageHeader
        title={
          <>
            Des rayons entiers, <span className="text-sky">négociés</span> en
            Chine.
          </>
        }
        description="Parcourez nos références par catégorie, comme dans un supermarché. Demandez un devis pour expédier le lot de votre choix."
      />

      <section className="container-tight py-10 lg:py-14">
        {/* Search + sort bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit…"
              className="pl-11"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-navy/15 px-4 py-3 text-sm font-medium text-navy lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtres
              {activeCount > 0 && (
                <span className="rounded-full bg-electric px-1.5 text-xs text-white">
                  {activeCount}
                </span>
              )}
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-12 rounded-xl border border-navy/15 bg-white px-3 text-sm text-navy outline-none focus:border-electric focus:ring-2 focus:ring-electric/15"
            >
              <option value="pertinence">Trier : Pertinence</option>
              <option value="prix-asc">Prix croissant</option>
              <option value="prix-desc">Prix décroissant</option>
              <option value="nom">Nom (A–Z)</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">
          {/* Filter rail */}
          <aside
            className={cn(
              "lg:block lg:self-start lg:sticky lg:top-28",
              showFilters ? "block" : "hidden"
            )}
          >
            <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-navy">Filtres</p>
                {activeCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="inline-flex items-center gap-1 text-xs font-medium text-electric"
                  >
                    <X className="h-3 w-3" /> Réinitialiser
                  </button>
                )}
              </div>

              {/* Departments */}
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase text-navy/45">
                  Rayons
                </p>
                <ul className="mt-3 space-y-1">
                  {categories.map((c) => {
                    const checked = cats.includes(c.name);
                    return (
                      <li key={c.name}>
                        <button
                          onClick={() => toggleCat(c.name)}
                          className="flex w-full items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left text-sm text-navy/75 hover:bg-navy/5"
                        >
                          <span
                            className={cn(
                              "grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors",
                              checked
                                ? "border-electric bg-electric text-white"
                                : "border-navy/25"
                            )}
                          >
                            {checked && <Check className="h-3 w-3" />}
                          </span>
                          <span className="flex-1">{c.name}</span>
                          <span className="text-xs text-navy/40">{c.count}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Price */}
              <div className="mt-6 border-t border-navy/10 pt-5">
                <p className="text-xs font-semibold uppercase text-navy/45">
                  Prix
                </p>
                <ul className="mt-3 space-y-1">
                  {priceRanges.map((r) => (
                    <li key={r.id}>
                      <button
                        onClick={() => setRange(r.id)}
                        className="flex w-full items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left text-sm text-navy/75 hover:bg-navy/5"
                      >
                        <span
                          className={cn(
                            "grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors",
                            range === r.id ? "border-electric" : "border-navy/25"
                          )}
                        >
                          {range === r.id && (
                            <span className="h-2 w-2 rounded-full bg-electric" />
                          )}
                        </span>
                        {rangeLabel(r, currency)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div>
            <p className="text-sm text-navy/55">
              {results.length} produit{results.length > 1 ? "s" : ""}
              {cats.length === 1 && ` · ${cats[0]}`}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3">
              {results.map((p) => (
                <article
                  key={p.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white transition-all hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="relative aspect-square overflow-hidden bg-soft">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width:1280px) 280px, (min-width:640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[11px] font-semibold uppercase text-electric">
                      {p.category}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-navy">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-lg font-extrabold text-navy">
                      {formatMoney(p.priceUsd, currency)}
                    </p>
                    <Button
                      asChild
                      size="sm"
                      variant="outlineDark"
                      className="mt-3"
                    >
                      <Link href="/devis">Demander un devis</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {results.length === 0 && (
              <div className="mt-6 rounded-2xl border border-dashed border-navy/15 p-12 text-center text-sm text-navy/55">
                Aucun produit ne correspond à vos filtres.
                <button
                  onClick={clearAll}
                  className="ml-1 font-semibold text-electric"
                >
                  Réinitialiser
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-soft">
        <div className="container-tight flex flex-col items-center gap-5 py-16 text-center">
          <h2 className="max-w-2xl text-2xl font-bold text-navy">
            Vous cherchez un produit précis ?
          </h2>
          <p className="max-w-lg text-sm text-navy/65">
            Envoyez-nous une photo et nos agents le sourcent pour vous en Chine.
          </p>
          <Button asChild size="lg">
            <Link href="/devis">Devis par photo</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
