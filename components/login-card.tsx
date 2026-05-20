"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useStore, type Role } from "@/lib/store";
import { currencies, type Currency } from "@/lib/currency";

// Identity "returned" by Google once the user authenticates.
const googleAccount = {
  client: { name: "Awa Ndong", email: "awa.ndong@gmail.com" },
  admin: { name: "Admin Yarnel", email: "admin@yarnelsourcing.com" }
};

export function LoginCard({ role }: { role: Role }) {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useStore();

  const [step, setStep] = useState<"start" | "confirm">("start");
  const [name, setName] = useState(googleAccount[role].name);
  const [currency, setCurrency] = useState<Currency>("FCFA");

  const isAdmin = role === "admin";
  const email = googleAccount[role].email;

  const finish = () => {
    login({ name: name.trim() || googleAccount[role].name, email, role, currency });
    const next = params.get("next");
    router.push(next || (isAdmin ? "/admin" : "/compte"));
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-navy/10 bg-white p-7 shadow-card sm:p-9">
      {isAdmin && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white">
          <ShieldCheck className="h-3.5 w-3.5 text-sky" /> Espace administrateur
        </div>
      )}

      {step === "start" ? (
        <>
          <h1 className="text-2xl font-bold text-navy">
            {isAdmin ? "Connexion admin" : "Connexion"}
          </h1>
          <p className="mt-2 text-sm text-navy/60">
            {isAdmin
              ? "Réservé à l'équipe Yarnel : gérez les départs et répondez aux devis."
              : "Accédez à vos devis et suivez vos factures."}
          </p>

          <Button
            onClick={() => setStep("confirm")}
            size="lg"
            className="mt-8 w-full"
            variant="white"
          >
            <GoogleGlyph />
            Continuer avec Google
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-navy">Confirmez votre compte</h1>
          <p className="mt-2 text-sm text-navy/60">
            Vérifiez les informations de votre compte Google et choisissez votre
            devise.
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-soft p-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-sm font-semibold text-white">
              {name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-navy">{name}</p>
              <p className="truncate text-xs text-navy/55">{email}</p>
            </div>
          </div>

          <div className="mt-5 space-y-5">
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2"
                placeholder="Votre nom"
              />
            </div>

            <div>
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

            <Button onClick={finish} size="lg" className="w-full">
              Confirmer et continuer
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}
