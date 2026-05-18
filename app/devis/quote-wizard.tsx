"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  PackageCheck,
  Rocket,
  Sparkles,
  Wallet,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, formatDateFR, formatPrice } from "@/lib/utils";
import {
  destinations,
  estimateQuote,
  type QuoteResult,
  type Urgency
} from "@/lib/data";

type GoodsType = "electronique" | "mode" | "beaute" | "meuble" | "autre";

const goodsOptions: { value: GoodsType; label: string }[] = [
  { value: "electronique", label: "Électronique & high-tech" },
  { value: "mode", label: "Mode & textile" },
  { value: "beaute", label: "Beauté & cosmétiques" },
  { value: "meuble", label: "Mobilier & déco" },
  { value: "autre", label: "Autre catégorie" }
];

const urgencyOptions: {
  value: Urgency;
  title: string;
  detail: string;
  icon: typeof Clock;
}[] = [
  {
    value: "standard",
    title: "Standard maritime",
    detail: "≈ 40 jours · le meilleur tarif au kilo",
    icon: Clock
  },
  {
    value: "express",
    title: "Express mixte",
    detail: "≈ 15 jours · équilibre prix / délai",
    icon: Zap
  },
  {
    value: "premium",
    title: "Premium aérien",
    detail: "≈ 6 jours · livraison ultra rapide",
    icon: Rocket
  }
];

const steps = [
  { title: "Marchandise", subtitle: "Type, poids, volume" },
  { title: "Itinéraire", subtitle: "Destination & urgence" },
  { title: "Résultat", subtitle: "Tarif & prochain départ" }
];

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [goods, setGoods] = useState<GoodsType>("mode");
  const [weight, setWeight] = useState<string>("80");
  const [volume, setVolume] = useState<string>("");
  const [destination, setDestination] = useState<string>(destinations[0]);
  const [urgency, setUrgency] = useState<Urgency>("express");

  const weightNum = Number(weight) || 0;
  const volumeNum = volume ? Number(volume) : undefined;
  const canContinueStep1 = weightNum > 0;
  const canContinueStep2 = destination.length > 0;

  const quote: QuoteResult | null = useMemo(() => {
    if (step < 2 || weightNum <= 0) return null;
    return estimateQuote(weightNum, destination, urgency, volumeNum);
  }, [step, weightNum, destination, urgency, volumeNum]);

  const next = () => setStep((s) => Math.min(2, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const reset = () => setStep(0);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
      {/* Stepper rail */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <ol className="space-y-6">
          {steps.map((s, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <li key={s.title} className="flex items-start gap-4">
                <span
                  className={cn(
                    "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors",
                    done && "bg-electric text-white",
                    active && !done && "bg-navy text-white",
                    !active && !done && "bg-navy/10 text-navy/60"
                  )}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </span>
                <div>
                  <p
                    className={cn(
                      "text-sm font-semibold tracking-tight",
                      active ? "text-navy" : "text-navy/70"
                    )}
                  >
                    {s.title}
                  </p>
                  <p className="text-xs text-navy/55">{s.subtitle}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 rounded-2xl border border-navy/10 bg-navy p-5 text-white">
          <Sparkles className="h-5 w-5 text-sky" />
          <p className="mt-3 text-sm font-semibold">Besoin d'aide en direct ?</p>
          <p className="mt-1 text-xs text-white/70">
            Un agent francophone répond sur WhatsApp en moins de 10 minutes,
            7 jours sur 7.
          </p>
          <Button asChild variant="sky" size="sm" className="mt-4 w-full">
            <Link href="/contact">Parler à un agent</Link>
          </Button>
        </div>
      </aside>

      {/* Steps */}
      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card lg:p-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <p className="eyebrow">Étape 1</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy lg:text-3xl">
                Décrivez votre marchandise
              </h2>
              <p className="mt-2 text-sm text-navy/65">
                Les produits dangereux, denrées périssables et liquides
                inflammables nécessitent un devis manuel.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <Label htmlFor="goods">Type de marchandise</Label>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {goodsOptions.map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => setGoods(g.value)}
                        className={cn(
                          "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all",
                          goods === g.value
                            ? "border-electric bg-electric/5 text-electric"
                            : "border-navy/15 text-navy/75 hover:border-navy/40"
                        )}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="weight">Poids (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      min={1}
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Ex. 80"
                      className="mt-3"
                    />
                  </div>
                  <div>
                    <Label htmlFor="volume">Volume (m³) — optionnel</Label>
                    <Input
                      id="volume"
                      type="number"
                      min={0}
                      step={0.1}
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      placeholder="Ex. 0.5"
                      className="mt-3"
                    />
                  </div>
                </div>
              </div>

              <Footer
                onNext={next}
                onBack={null}
                canNext={canContinueStep1}
              />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <p className="eyebrow">Étape 2</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy lg:text-3xl">
                Où acheminer votre colis ?
              </h2>
              <p className="mt-2 text-sm text-navy/65">
                Choisissez la ville d'arrivée et l'urgence souhaitée. Nous
                gérons le pré-acheminement depuis n'importe quelle usine en Chine.
              </p>

              <div className="mt-8 space-y-7">
                <div>
                  <Label htmlFor="destination">Ville de destination</Label>
                  <select
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="mt-3 flex h-12 w-full rounded-xl border border-navy/15 bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-electric focus:ring-2 focus:ring-electric/15"
                  >
                    {destinations.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Niveau d'urgence</Label>
                  <div className="mt-3 grid gap-3 lg:grid-cols-3">
                    {urgencyOptions.map((u) => (
                      <button
                        key={u.value}
                        type="button"
                        onClick={() => setUrgency(u.value)}
                        className={cn(
                          "group rounded-2xl border p-5 text-left transition-all",
                          urgency === u.value
                            ? "border-electric bg-electric/5 ring-1 ring-electric/30"
                            : "border-navy/15 hover:border-navy/40"
                        )}
                      >
                        <span
                          className={cn(
                            "grid h-10 w-10 place-items-center rounded-xl",
                            urgency === u.value
                              ? "bg-electric text-white"
                              : "bg-navy/5 text-navy"
                          )}
                        >
                          <u.icon className="h-5 w-5" />
                        </span>
                        <p className="mt-4 text-sm font-semibold text-navy">
                          {u.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-navy/65">
                          {u.detail}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Footer onNext={next} onBack={back} canNext={canContinueStep2} />
            </motion.div>
          )}

          {step === 2 && quote && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <p className="eyebrow">Votre devis</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy lg:text-3xl">
                {weightNum} kg vers{" "}
                <span className="text-electric">{destination}</span>
              </h2>
              <p className="mt-2 text-sm text-navy/65">
                Estimation indicative · Catégorie {goodsLabel(goods)} ·{" "}
                {quote.urgencyLabel}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <ResultCard
                  icon={Wallet}
                  label="Prix estimatif"
                  value={formatPrice(quote.price)}
                  detail={`≈ ${quote.pricePerKg} $/kg tout inclus`}
                  highlight
                />
                <ResultCard
                  icon={Clock}
                  label="Délai estimé"
                  value={quote.delayLabel}
                  detail="Porte à porte"
                />
                <ResultCard
                  icon={Calendar}
                  label="Prochain départ"
                  value={formatDateFR(quote.nextDeparture.date)}
                  detail={`${quote.nextDeparture.mode} · ${quote.nextDeparture.reference}`}
                />
              </div>

              <div className="mt-8 rounded-2xl border border-dashed border-navy/15 bg-navy/[0.02] p-5">
                <div className="flex items-start gap-3">
                  <PackageCheck className="mt-0.5 h-5 w-5 text-electric" />
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      Tout est inclus
                    </p>
                    <p className="mt-1 text-sm text-navy/70">
                      Enlèvement usine en Chine · dédouanement export ·
                      transport principal · dédouanement import · livraison ville.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Réserver un envoi <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outlineDark">
                  <Link href="/contact">Créer un compte</Link>
                </Button>
                <Button size="lg" variant="ghost" onClick={reset}>
                  Refaire une simulation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Footer({
  onBack,
  onNext,
  canNext
}: {
  onBack: (() => void) | null;
  onNext: () => void;
  canNext: boolean;
}) {
  return (
    <div className="mt-10 flex items-center justify-between border-t border-navy/10 pt-6">
      {onBack ? (
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>
      ) : (
        <span />
      )}
      <Button onClick={onNext} disabled={!canNext}>
        Continuer <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function ResultCard({
  icon: Icon,
  label,
  value,
  detail,
  highlight
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  detail: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        highlight
          ? "border-electric bg-electric text-white shadow-glow"
          : "border-navy/10 bg-white"
      )}
    >
      <Icon className={cn("h-5 w-5", highlight ? "text-sky" : "text-electric")} />
      <p
        className={cn(
          "mt-4 text-[11px] uppercase tracking-[0.18em]",
          highlight ? "text-white/70" : "text-navy/55"
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-2xl font-extrabold tracking-tight",
          highlight ? "text-white" : "text-navy"
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-1 text-xs",
          highlight ? "text-white/80" : "text-navy/60"
        )}
      >
        {detail}
      </p>
    </div>
  );
}

function goodsLabel(g: GoodsType) {
  return goodsOptions.find((o) => o.value === g)?.label ?? g;
}
