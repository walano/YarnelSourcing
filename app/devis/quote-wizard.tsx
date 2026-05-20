"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  ImagePlus,
  PackageCheck,
  Rocket,
  ShieldCheck,
  Wallet,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InlineAuth } from "@/components/inline-auth";
import { cn, formatDateFR } from "@/lib/utils";
import { formatMoney } from "@/lib/currency";
import { useStore } from "@/lib/store";
import {
  destinations,
  estimateQuote,
  goodsOptions,
  INSURANCE_USD_PER_KG,
  type GoodsType,
  type QuoteResult,
  type ShippingMode,
  type Urgency
} from "@/lib/data";

const shippingOptions: ShippingMode[] = ["Maritime", "Aérien"];

const urgencyOptions: {
  value: Urgency;
  title: string;
  detail: string;
  icon: typeof Clock;
}[] = [
  { value: "premium", title: "Premium aérien", detail: "≈ 3 jours · livraison ultra rapide", icon: Rocket },
  { value: "express", title: "Express mix", detail: "≈ 5 jours · équilibre prix / délai", icon: Zap },
  { value: "standard", title: "Standard", detail: "≈ 15 jours · le meilleur tarif", icon: Clock }
];

const steps = [
  { title: "Marchandise", subtitle: "Type, mode, poids" },
  { title: "Itinéraire", subtitle: "Destination, délai, options" },
  { title: "Résultat", subtitle: "Tarif & prochain départ" }
];

export function QuoteWizard() {
  const [kind, setKind] = useState<"detaille" | "photo">("detaille");

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        {/* Mode switch */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-navy/10 bg-white p-1.5 shadow-card">
          <button
            onClick={() => setKind("detaille")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
              kind === "detaille" ? "bg-navy text-white" : "text-navy/60"
            )}
          >
            <FileText className="h-4 w-4" /> Détaillé
          </button>
          <button
            onClick={() => setKind("photo")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
              kind === "photo" ? "bg-navy text-white" : "text-navy/60"
            )}
          >
            <ImagePlus className="h-4 w-4" /> Par photo
          </button>
        </div>

        {kind === "detaille" && <Stepper />}
      </aside>

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card lg:p-10">
        {kind === "detaille" ? <DetailedFlow /> : <PhotoFlow />}
      </div>
    </div>
  );
}

/* ----------------------------- Detailed flow ----------------------------- */

function DetailedFlow() {
  const { user, addQuote } = useStore();
  const currency = user?.currency ?? "FCFA";
  const [step, setStep] = useState(0);
  const [goods, setGoods] = useState<GoodsType>("ordinaire");
  const [shipping, setShipping] = useState<ShippingMode>("Maritime");
  const [weight, setWeight] = useState("80");
  const [cbm, setCbm] = useState("");
  const [destination, setDestination] = useState(destinations[0]);
  const [urgency, setUrgency] = useState<Urgency>("express");
  const [insurance, setInsurance] = useState(false);
  const [accompagnement, setAccompagnement] = useState(false);
  const savedRef = useRef(false);

  const weightNum = Number(weight) || 0;
  const cbmNum = cbm ? Number(cbm) : undefined;
  const canStep1 = weightNum > 0;

  const quote: QuoteResult | null = useMemo(() => {
    if (step < 2 || weightNum <= 0) return null;
    return estimateQuote({
      weightKg: weightNum,
      destination,
      urgency,
      goods,
      shippingMode: shipping,
      cbm: cbmNum,
      insurance,
      accompagnement
    });
  }, [step, weightNum, destination, urgency, goods, shipping, cbmNum, insurance, accompagnement]);

  // Save the quote once the user is authenticated and the result is shown.
  useEffect(() => {
    if (step === 2 && user && quote && !savedRef.current) {
      savedRef.current = true;
      addQuote({
        userEmail: user.email,
        userName: user.name,
        kind: "detaille",
        goods: goodsOptions.find((g) => g.value === goods)?.label,
        shipping,
        weightKg: weightNum,
        cbm: cbmNum,
        destination,
        urgency,
        urgencyLabel: quote.urgencyLabel,
        insurance,
        accompagnement,
        priceUsd: quote.price
      });
    }
  }, [step, user, quote, addQuote, goods, shipping, weightNum, cbmNum, destination, urgency, insurance, accompagnement]);

  const next = () => setStep((s) => Math.min(2, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const reset = () => {
    savedRef.current = false;
    setStep(0);
  };

  return (
    <AnimatePresence mode="wait">
      {step === 0 && (
        <StepShell key="d0">
          <p className="eyebrow">Étape 1</p>
          <h2 className="mt-3 text-2xl font-bold text-navy lg:text-3xl">
            Décrivez votre marchandise
          </h2>
          <p className="mt-2 text-sm text-navy/65">
            Les batteries, liquides et poudres suivent des règles d'expédition
            spécifiques et sont tarifés en conséquence.
          </p>

          <div className="mt-8 space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="goods">Type de marchandise</Label>
                <select
                  id="goods"
                  value={goods}
                  onChange={(e) => setGoods(e.target.value as GoodsType)}
                  className={selectClass}
                >
                  {goodsOptions.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="shipping">Mode d'expédition</Label>
                <select
                  id="shipping"
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value as ShippingMode)}
                  className={selectClass}
                >
                  {shippingOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
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
              {shipping === "Maritime" && (
                <div>
                  <Label htmlFor="cbm">CBM (m³)</Label>
                  <Input
                    id="cbm"
                    type="number"
                    min={0}
                    step={0.1}
                    value={cbm}
                    onChange={(e) => setCbm(e.target.value)}
                    placeholder="Ex. 1.5"
                    className="mt-3"
                  />
                  <p className="mt-1.5 text-xs text-navy/50">
                    Le maritime est facturé au volume (CBM).
                  </p>
                </div>
              )}
            </div>
          </div>

          <NavRow onNext={next} onBack={null} canNext={canStep1} />
        </StepShell>
      )}

      {step === 1 && (
        <StepShell key="d1">
          <p className="eyebrow">Étape 2</p>
          <h2 className="mt-3 text-2xl font-bold text-navy lg:text-3xl">
            Où acheminer votre colis ?
          </h2>
          <p className="mt-2 text-sm text-navy/65">
            Choisissez la ville d'arrivée, le délai souhaité et vos options.
          </p>

          <div className="mt-8 space-y-7">
            <div>
              <Label htmlFor="destination">Ville de destination</Label>
              <select
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={selectClass}
              >
                {destinations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Délai</Label>
              <div className="mt-3 grid gap-3 lg:grid-cols-3">
                {urgencyOptions.map((u) => (
                  <button
                    key={u.value}
                    type="button"
                    onClick={() => setUrgency(u.value)}
                    className={cn(
                      "group rounded-2xl border bg-white p-5 text-left transition-all",
                      urgency === u.value
                        ? "border-electric ring-1 ring-electric/30"
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

            <div className="space-y-3">
              <OptionToggle
                checked={insurance}
                onChange={() => setInsurance((v) => !v)}
                icon={ShieldCheck}
                title="Assurance marchandise"
                detail={`${formatMoney(
                  INSURANCE_USD_PER_KG,
                  currency
                )} par kilo · couverture totale en cas de perte`}
              />
              <OptionToggle
                checked={accompagnement}
                onChange={() => setAccompagnement((v) => !v)}
                icon={PackageCheck}
                title="Accompagnement en Chine"
                detail="Sourcing, négociation et contrôle qualité avant le transit"
              />
            </div>
          </div>

          <NavRow onNext={next} onBack={back} canNext />
        </StepShell>
      )}

      {step === 2 && quote && (
        <StepShell key="d2">
          {!user ? (
            <>
              <p className="eyebrow">Votre devis est prêt</p>
              <h2 className="mt-3 text-2xl font-bold text-navy lg:text-3xl">
                Une dernière étape
              </h2>
              <p className="mt-2 text-sm text-navy/65">
                Connectez-vous pour révéler le tarif et l'enregistrer dans votre
                espace.
              </p>
              <div className="mt-8">
                <InlineAuth
                  cta="Continuer avec Google & voir le devis"
                  onAuthed={() => {}}
                />
              </div>
              <NavRow onNext={() => {}} onBack={back} canNext={false} hideNext />
            </>
          ) : (
            <ResultView quote={quote} destination={destination} onReset={reset} />
          )}
        </StepShell>
      )}
    </AnimatePresence>
  );
}

function ResultView({
  quote,
  destination,
  onReset
}: {
  quote: QuoteResult;
  destination: string;
  onReset: () => void;
}) {
  const { user } = useStore();
  const currency = user?.currency ?? "USD";

  return (
    <div>
      <p className="eyebrow">Votre devis</p>
      <h2 className="mt-3 text-2xl font-bold text-navy lg:text-3xl">
        Vers <span className="text-electric">{destination}</span>
      </h2>
      <p className="mt-2 text-sm text-navy/65">
        {quote.shippingMode} · {quote.urgencyLabel} · estimation indicative
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <ResultCard
          icon={Wallet}
          label="Prix estimatif"
          value={formatMoney(quote.price, currency)}
          detail="Tout inclus"
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

      <div className="mt-6 rounded-2xl border border-navy/10 bg-soft p-5 text-sm">
        <p className="font-semibold text-navy">Détail</p>
        <dl className="mt-3 space-y-2 text-navy/70">
          <Row label="Fret" value={formatMoney(quote.freight, currency)} />
          {quote.insuranceFee > 0 && (
            <Row
              label="Assurance"
              value={formatMoney(quote.insuranceFee, currency)}
            />
          )}
          {quote.accompagnementFee > 0 && (
            <Row
              label="Accompagnement Chine"
              value={formatMoney(quote.accompagnementFee, currency)}
            />
          )}
          <div className="flex items-center justify-between border-t border-navy/10 pt-2 font-semibold text-navy">
            <span>Total</span>
            <span>{formatMoney(quote.price, currency)}</span>
          </div>
        </dl>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-navy/15 bg-white p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-electric" />
          <p className="text-sm text-navy/70">
            Devis enregistré dans votre espace. Un agent vous enverra une
            facture officielle en réponse.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/compte">Voir mes devis</Link>
        </Button>
        <Button size="lg" variant="ghost" onClick={onReset}>
          Refaire une simulation
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------- Photo flow ------------------------------- */

function PhotoFlow() {
  const { user, addQuote } = useStore();
  const [step, setStep] = useState(0);
  const [fileName, setFileName] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [description, setDescription] = useState("");
  const savedRef = useRef(false);

  const canSubmit = fileName !== "" && description.trim().length >= 5;

  useEffect(() => {
    if (step === 1 && user && !savedRef.current) {
      savedRef.current = true;
      addQuote({
        userEmail: user.email,
        userName: user.name,
        kind: "photo",
        photoName: fileName,
        description: description.trim()
      });
    }
  }, [step, user, addQuote, fileName, description]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    setPreview(URL.createObjectURL(f));
  };

  if (step === 1) {
    return (
      <StepShell key="p1">
        {!user ? (
          <>
            <p className="eyebrow">Dernière étape</p>
            <h2 className="mt-3 text-2xl font-bold text-navy lg:text-3xl">
              Connectez-vous pour envoyer
            </h2>
            <p className="mt-2 text-sm text-navy/65">
              Votre demande sera transmise à un agent qui vous répondra avec une
              facture.
            </p>
            <div className="mt-8">
              <InlineAuth
                title="Connectez-vous pour envoyer votre demande"
                cta="Continuer avec Google & envoyer"
                onAuthed={() => {}}
              />
            </div>
            <button
              onClick={() => setStep(0)}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy/60 hover:text-navy"
            >
              <ArrowLeft className="h-4 w-4" /> Modifier ma demande
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-electric/10">
              <CheckCircle2 className="h-8 w-8 text-electric" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-navy">
              Demande envoyée
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-navy/65">
              Un agent Yarnel étudie votre photo et vos informations, puis vous
              enverra une facture personnalisée dans votre espace.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/compte">Voir mes devis</Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => {
                  savedRef.current = false;
                  setFileName("");
                  setPreview("");
                  setDescription("");
                  setStep(0);
                }}
              >
                Nouvelle demande
              </Button>
            </div>
          </div>
        )}
      </StepShell>
    );
  }

  return (
    <StepShell key="p0">
      <p className="eyebrow">Devis par photo</p>
      <h2 className="mt-3 text-2xl font-bold text-navy lg:text-3xl">
        Envoyez une photo de ce que vous voulez
      </h2>
      <p className="mt-2 text-sm text-navy/65">
        Idéal si vous ne connaissez pas encore les détails. Ajoutez une photo et
        décrivez précisément votre besoin.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <Label>Photo du produit</Label>
          <label className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-navy/20 bg-soft/60 px-6 py-10 text-center transition-colors hover:border-electric">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Aperçu"
                className="h-32 w-32 rounded-xl object-cover"
              />
            ) : (
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-electric shadow-card">
                <ImagePlus className="h-6 w-6" />
              </span>
            )}
            <span className="text-sm font-medium text-navy">
              {fileName || "Cliquez pour choisir une image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={onFile}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <Label htmlFor="desc">
            Décrivez votre besoin <span className="text-electric">*</span>
          </Label>
          <Textarea
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex. Je veux 300 paires de baskets comme sur la photo, tailles 39-44, livrées à Libreville."
            className="mt-3 min-h-[120px]"
          />
          <p className="mt-1.5 text-xs text-navy/50">
            Champ obligatoire — quantité, tailles, couleurs, ville de livraison…
          </p>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-end border-t border-navy/10 pt-6">
        <Button onClick={() => setStep(1)} disabled={!canSubmit}>
          Envoyer ma demande
        </Button>
      </div>
    </StepShell>
  );
}

/* -------------------------------- Helpers -------------------------------- */

const selectClass =
  "mt-3 flex h-12 w-full rounded-xl border border-navy/15 bg-white px-4 text-sm text-navy outline-none transition-colors focus:border-electric focus:ring-2 focus:ring-electric/15";

function StepShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function Stepper() {
  return (
    <ol className="mt-6 space-y-5">
      {steps.map((s, i) => (
        <li key={s.title} className="flex items-start gap-4">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy/10 text-sm font-semibold text-navy/60">
            {i + 1}
          </span>
          <div>
            <p className="text-sm font-semibold text-navy/80">{s.title}</p>
            <p className="text-xs text-navy/55">{s.subtitle}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function NavRow({
  onBack,
  onNext,
  canNext,
  hideNext
}: {
  onBack: (() => void) | null;
  onNext: () => void;
  canNext: boolean;
  hideNext?: boolean;
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
      {!hideNext && (
        <Button onClick={onNext} disabled={!canNext}>
          Continuer
        </Button>
      )}
    </div>
  );
}

function OptionToggle({
  checked,
  onChange,
  icon: Icon,
  title,
  detail
}: {
  checked: boolean;
  onChange: () => void;
  icon: typeof ShieldCheck;
  title: string;
  detail: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "flex w-full items-center gap-4 rounded-2xl border bg-white p-4 text-left transition-all",
        checked
          ? "border-electric ring-1 ring-electric/30"
          : "border-navy/15 hover:border-navy/40"
      )}
    >
      <span
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
          checked ? "bg-electric text-white" : "bg-navy/5 text-navy"
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex-1">
        <span className="block text-sm font-semibold text-navy">{title}</span>
        <span className="block text-xs text-navy/60">{detail}</span>
      </span>
      <span
        className={cn(
          "grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors",
          checked ? "border-electric bg-electric text-white" : "border-navy/25"
        )}
      >
        {checked && <CheckCircle2 className="h-4 w-4" />}
      </span>
    </button>
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
          "mt-4 text-[11px] uppercase",
          highlight ? "text-white/70" : "text-navy/55"
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-2xl font-extrabold",
          highlight ? "text-white" : "text-navy"
        )}
      >
        {value}
      </p>
      <p className={cn("mt-1 text-xs", highlight ? "text-white/80" : "text-navy/60")}>
        {detail}
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
