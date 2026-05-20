"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { currencies, type Currency } from "@/lib/currency";

// Compact login used inside flows (e.g. quote) so the user fills the form,
// then connects, then sees the result — without leaving the page.
export function InlineAuth({
  title = "Connectez-vous pour voir votre devis",
  cta = "Continuer avec Google",
  onAuthed
}: {
  title?: string;
  cta?: string;
  onAuthed: () => void;
}) {
  const { login } = useStore();
  const [name, setName] = useState("Awa Ndong");
  const [email, setEmail] = useState("awa.ndong@gmail.com");
  const [currency, setCurrency] = useState<Currency>("FCFA");

  return (
    <div className="rounded-2xl border border-navy/10 bg-soft p-6">
      <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy">
        <Lock className="h-3.5 w-3.5 text-electric" /> Étape finale
      </div>
      <h3 className="mt-4 text-xl font-bold text-navy">{title}</h3>
      <p className="mt-1 text-sm text-navy/60">
        Vos devis et factures sont enregistrés dans votre espace.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="ia-name">Nom</Label>
          <Input
            id="ia-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="ia-email">Email</Label>
          <Input
            id="ia-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2"
          />
        </div>
      </div>

      <div className="mt-4">
        <Label>Devise</Label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {currencies.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCurrency(c.value)}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all",
                currency === c.value
                  ? "border-electric bg-electric/5 text-electric"
                  : "border-navy/15 text-navy/70 hover:border-navy/40"
              )}
            >
              {c.value === "FCFA" ? "FCFA" : `${c.label} ${c.symbol}`}
            </button>
          ))}
        </div>
      </div>

      <Button
        variant="white"
        size="lg"
        className="mt-5 w-full"
        onClick={() => {
          login({
            name: name.trim() || "Client",
            email,
            role: "client",
            currency
          });
          onAuthed();
        }}
      >
        {cta}
      </Button>
    </div>
  );
}
