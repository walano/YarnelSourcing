"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  CircleCheck,
  Filter,
  MapPin,
  Plane,
  Ship
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { departures } from "@/lib/data";
import { cn, formatDateFR } from "@/lib/utils";

type Mode = "Tous" | "Aérien" | "Maritime";
type Sort = "date" | "remplissage";

export function DeparturesList() {
  const [mode, setMode] = useState<Mode>("Tous");
  const [sort, setSort] = useState<Sort>("date");

  const items = useMemo(() => {
    let list = [...departures];
    if (mode !== "Tous") list = list.filter((d) => d.mode === mode);
    list.sort((a, b) => {
      if (sort === "date") return +new Date(a.date) - +new Date(b.date);
      const pa = a.filledKg / a.capacityKg;
      const pb = b.filledKg / b.capacityKg;
      return pa - pb;
    });
    return list;
  }, [mode, sort]);

  return (
    <section className="container-tight py-16 lg:py-24">
      {/* Filters */}
      <div className="flex flex-col gap-4 border-b border-navy/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-navy/55" />
          <span className="text-xs uppercase tracking-[0.18em] text-navy/55">
            Filtrer
          </span>
          <div className="ml-2 flex gap-1.5">
            {(["Tous", "Aérien", "Maritime"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                  mode === m
                    ? "border-electric bg-electric text-white"
                    : "border-navy/15 text-navy/65 hover:border-navy/40"
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="uppercase tracking-[0.18em] text-navy/55">
            Trier par
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-xl border border-navy/15 bg-white px-3 py-1.5 text-xs text-navy outline-none focus:border-electric"
          >
            <option value="date">Date de départ</option>
            <option value="remplissage">Disponibilité (places restantes)</option>
          </select>
        </div>
      </div>

      {/* List */}
      <ul className="mt-6 space-y-4">
        {items.map((d, i) => {
          const pct = Math.round((d.filledKg / d.capacityKg) * 100);
          const remaining = d.capacityKg - d.filledKg;
          const tight = pct >= 85;
          const ModeIcon = d.mode === "Aérien" ? Plane : Ship;
          return (
            <motion.li
              key={d.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-electric/40 lg:p-7"
            >
              <div className="grid gap-6 lg:grid-cols-[1.4fr_2fr_auto] lg:items-center">
                {/* Identity */}
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-xl text-white",
                      d.mode === "Aérien" ? "bg-electric" : "bg-navy"
                    )}
                  >
                    <ModeIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant={d.mode === "Aérien" ? "electric" : "sky"}>
                        {d.mode}
                      </Badge>
                      <span className="text-xs text-navy/55">
                        Réf. {d.reference}
                      </span>
                    </div>
                    <p className="mt-2 text-lg font-bold tracking-tight text-navy">
                      <span className="text-navy/55">{d.origin}</span> →{" "}
                      <span className="text-electric">{d.destination}</span>
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-navy/60">
                      <CalendarClock className="h-3.5 w-3.5" />
                      {formatDateFR(d.date)}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between text-xs text-navy/65">
                    <span>
                      <strong className="text-navy">{d.filledKg.toLocaleString("fr-FR")} kg</strong> / {d.capacityKg.toLocaleString("fr-FR")} kg
                    </span>
                    <span
                      className={cn(
                        "font-semibold",
                        tight ? "text-electric" : "text-navy/70"
                      )}
                    >
                      {pct}% rempli
                    </span>
                  </div>
                  <div className="mt-3">
                    <Progress
                      value={pct}
                      className="h-2.5 bg-navy/10"
                      indicatorClassName={cn(
                        tight ? "bg-electric" : "bg-sky"
                      )}
                    />
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-navy/60">
                    <MapPin className="h-3.5 w-3.5 text-sky" />
                    {remaining.toLocaleString("fr-FR")} kg encore disponibles
                  </p>
                </div>

                {/* Action */}
                <div className="flex flex-col items-stretch gap-2 lg:items-end">
                  {tight && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-electric">
                      <CircleCheck className="h-3.5 w-3.5" />
                      Bientôt complet
                    </span>
                  )}
                  <Button asChild>
                    <Link href="/devis">
                      Réserver des kilos <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>

      {/* Helper card */}
      <div className="mt-14 grid gap-6 rounded-2xl border border-navy/10 bg-navy p-8 text-white lg:grid-cols-[1.6fr_1fr] lg:items-center lg:p-10">
        <div>
          <p className="eyebrow-light">Bon à savoir</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight">
            Un départ chaque semaine, sur tous les couloirs majeurs.
          </h3>
          <p className="mt-3 max-w-xl text-sm text-white/75">
            Si aucune date ne vous convient, nos agents peuvent ajouter votre
            colis au prochain consolidé. Aucun minimum imposé.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button asChild variant="sky">
            <Link href="/devis">
              Calculer mon tarif <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Parler à un agent</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
