"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FileText,
  Image as ImageIcon,
  Package,
  Receipt,
  Ship
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoleGuard } from "@/components/role-guard";
import { cn, formatDateFR } from "@/lib/utils";
import { formatMoney } from "@/lib/currency";
import { useStore } from "@/lib/store";

export default function ComptePage() {
  return (
    <RoleGuard role="client">
      <ClientDashboard />
    </RoleGuard>
  );
}

type Tab = "devis" | "factures" | "departs";

function ClientDashboard() {
  const { user, quotes, invoices, departures } = useStore();
  const [tab, setTab] = useState<Tab>("devis");
  const currency = user!.currency;

  const myQuotes = useMemo(
    () => quotes.filter((q) => q.userEmail === user!.email),
    [quotes, user]
  );
  const myInvoices = useMemo(
    () => invoices.filter((i) => i.userEmail === user!.email),
    [invoices, user]
  );

  const tabs: { id: Tab; label: string; icon: typeof FileText; count: number }[] = [
    { id: "devis", label: "Mes devis", icon: FileText, count: myQuotes.length },
    { id: "factures", label: "Mes factures", icon: Receipt, count: myInvoices.length },
    { id: "departs", label: "Départs", icon: Ship, count: departures.length }
  ];

  return (
    <div className="bg-soft pt-24 lg:pt-28">
      <div className="container-tight py-10 lg:py-14">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Espace client</p>
            <h1 className="mt-2 text-3xl font-extrabold text-navy">
              Bonjour, {user!.name.split(" ")[0]}
            </h1>
            <p className="mt-1 text-sm text-navy/60">
              Devise : {currency} · {myQuotes.length} devis · {myInvoices.length}{" "}
              facture(s)
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/devis">
              Nouveau devis
            </Link>
          </Button>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
                tab === t.id
                  ? "bg-navy text-white"
                  : "bg-white text-navy/70 hover:text-navy"
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs",
                  tab === t.id ? "bg-white/20" : "bg-navy/10"
                )}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "devis" && (
            <div className="space-y-4">
              {myQuotes.length === 0 && (
                <Empty label="Aucun devis pour le moment." />
              )}
              {myQuotes.map((q) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-electric/10 text-electric">
                        {q.kind === "photo" ? (
                          <ImageIcon className="h-5 w-5" />
                        ) : (
                          <Package className="h-5 w-5" />
                        )}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-navy">
                          {q.kind === "photo"
                            ? "Devis par photo"
                            : `${q.goods} · ${q.shipping}`}
                        </p>
                        <p className="text-xs text-navy/55">
                          {formatDateFR(q.createdAt)}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={q.status} />
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-navy/70 sm:grid-cols-2">
                    {q.kind === "detaille" ? (
                      <>
                        <Info label="Destination" value={q.destination ?? "—"} />
                        <Info label="Poids" value={`${q.weightKg} kg`} />
                        <Info label="Délai" value={q.urgencyLabel ?? "—"} />
                        <Info
                          label="Estimation"
                          value={
                            q.priceUsd
                              ? formatMoney(q.priceUsd, currency)
                              : "—"
                          }
                        />
                        {(q.insurance || q.accompagnement) && (
                          <Info
                            label="Options"
                            value={[
                              q.insurance && "Assurance",
                              q.accompagnement && "Accompagnement"
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <Info label="Photo" value={q.photoName ?? "—"} />
                        <p className="sm:col-span-2">
                          <span className="text-xs uppercase text-navy/45">
                            Description
                          </span>
                          <br />
                          {q.description}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "factures" && (
            <div className="space-y-4">
              {myInvoices.length === 0 && (
                <Empty label="Aucune facture reçue pour l'instant." />
              )}
              {myInvoices.map((inv) => {
                const q = quotes.find((x) => x.id === inv.quoteId);
                return (
                  <div
                    key={inv.id}
                    className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-electric text-white">
                          <Receipt className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-navy">
                            Facture ·{" "}
                            {q?.kind === "photo"
                              ? "Devis photo"
                              : q?.destination ?? "Expédition"}
                          </p>
                          <p className="text-xs text-navy/55">
                            {formatDateFR(inv.createdAt)}
                          </p>
                        </div>
                      </div>
                      <p className="text-xl font-extrabold text-navy">
                        {formatMoney(inv.amountUsd, currency)}
                      </p>
                    </div>
                    <p className="mt-3 rounded-xl bg-soft p-3 text-sm text-navy/70">
                      {inv.note}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "departs" && (
            <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card">
              <table className="w-full text-left text-sm">
                <thead className="bg-navy/[0.03] text-xs uppercase text-navy/55">
                  <tr>
                    <th className="px-4 py-3">Référence</th>
                    <th className="px-4 py-3">Trajet</th>
                    <th className="px-4 py-3">Mode</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Remplissage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/5">
                  {departures.map((d) => {
                    const fill = Math.round((d.filledKg / d.capacityKg) * 100);
                    return (
                      <tr key={d.id} className="text-navy/80">
                        <td className="px-4 py-3 font-medium text-navy">
                          {d.reference}
                        </td>
                        <td className="px-4 py-3">
                          {d.origin} → {d.destination}
                        </td>
                        <td className="px-4 py-3">{d.mode}</td>
                        <td className="px-4 py-3">{formatDateFR(d.date)}</td>
                        <td className="px-4 py-3">{fill}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "en_attente" | "facture" }) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold",
        status === "facture"
          ? "bg-electric/10 text-electric"
          : "bg-amber-100 text-amber-700"
      )}
    >
      {status === "facture" ? "Facturé" : "En attente"}
    </span>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-xs uppercase text-navy/45">{label}</span>
      <br />
      <span className="font-medium text-navy">{value}</span>
    </p>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-navy/15 bg-white p-10 text-center text-sm text-navy/55">
      {label}
    </div>
  );
}
