"use client";

import { useState } from "react";
import {
  Ship,
  PackageSearch,
  Inbox,
  Plus,
  Pencil,
  Trash2,
  Send,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RoleGuard } from "@/components/role-guard";
import { cn, formatDateFR } from "@/lib/utils";
import { formatMoney, rates } from "@/lib/currency";
import { useStore, type Product } from "@/lib/store";
import type { Departure } from "@/lib/data";

export default function AdminPage() {
  return (
    <RoleGuard role="admin">
      <AdminDashboard />
    </RoleGuard>
  );
}

type Tab = "demandes" | "departs" | "catalogue";

function AdminDashboard() {
  const { quotes } = useStore();
  const [tab, setTab] = useState<Tab>("demandes");
  const pending = quotes.filter((q) => q.status === "en_attente").length;

  const tabs: { id: Tab; label: string; icon: typeof Inbox }[] = [
    { id: "demandes", label: `Demandes${pending ? ` (${pending})` : ""}`, icon: Inbox },
    { id: "departs", label: "Départs", icon: Ship },
    { id: "catalogue", label: "Catalogue", icon: PackageSearch }
  ];

  return (
    <div className="bg-soft pt-24 lg:pt-28">
      <div className="container-tight py-10 lg:py-14">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
            ADMIN
          </span>
          <p className="eyebrow">Console Yarnel</p>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold text-navy">
          Tableau de bord
        </h1>

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
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "demandes" && <Demandes />}
          {tab === "departs" && <DepartsAdmin />}
          {tab === "catalogue" && <CatalogueAdmin />}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Quote requests ---------------------------- */

function Demandes() {
  const { quotes, sendInvoice } = useStore();
  const [openId, setOpenId] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  if (quotes.length === 0)
    return <Empty label="Aucune demande de devis pour le moment." />;

  const submit = (quoteId: string, userEmail: string) => {
    const amt = Number(amount);
    if (!amt || !note.trim()) return;
    sendInvoice({ quoteId, userEmail, amountUsd: amt, note: note.trim() });
    setOpenId(null);
    setAmount("");
    setNote("");
  };

  return (
    <div className="space-y-4">
      {quotes.map((q) => (
        <div
          key={q.id}
          className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-navy">
                {q.userName}{" "}
                <span className="font-normal text-navy/50">· {q.userEmail}</span>
              </p>
              <p className="text-xs text-navy/55">{formatDateFR(q.createdAt)}</p>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                q.status === "facture"
                  ? "bg-electric/10 text-electric"
                  : "bg-amber-100 text-amber-700"
              )}
            >
              {q.status === "facture" ? "Facturé" : "En attente"}
            </span>
          </div>

          <div className="mt-4 grid gap-2 rounded-xl bg-soft p-4 text-sm text-navy/75 sm:grid-cols-2">
            {q.kind === "detaille" ? (
              <>
                <span>Type : {q.goods}</span>
                <span>Mode : {q.shipping}</span>
                <span>Poids : {q.weightKg} kg</span>
                {q.cbm ? <span>CBM : {q.cbm} m³</span> : <span />}
                <span>Destination : {q.destination}</span>
                <span>Délai : {q.urgencyLabel}</span>
                <span>
                  Options :{" "}
                  {[q.insurance && "Assurance", q.accompagnement && "Accompagnement"]
                    .filter(Boolean)
                    .join(", ") || "—"}
                </span>
                <span>Estimation : {q.priceUsd ? `${q.priceUsd} $` : "—"}</span>
              </>
            ) : (
              <>
                <span className="font-medium">Devis par photo : {q.photoName}</span>
                <span className="sm:col-span-2">« {q.description} »</span>
              </>
            )}
          </div>

          {q.status === "en_attente" && (
            <div className="mt-4">
              {openId === q.id ? (
                <div className="rounded-xl border border-navy/10 p-4">
                  <div className="grid gap-3 sm:grid-cols-[180px_1fr]">
                    <div>
                      <Label htmlFor={`amt-${q.id}`}>Montant (USD)</Label>
                      <Input
                        id={`amt-${q.id}`}
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="1640"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`note-${q.id}`}>Message / détail</Label>
                      <Textarea
                        id={`note-${q.id}`}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Tarif tout inclus, départ proposé…"
                        className="mt-2 min-h-[70px]"
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={() => submit(q.id, q.userEmail)}>
                      <Send className="h-4 w-4" /> Envoyer la facture
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setOpenId(null)}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={() => {
                    setOpenId(q.id);
                    setAmount(q.priceUsd ? String(q.priceUsd) : "");
                    setNote("");
                  }}
                >
                  <Send className="h-4 w-4" /> Répondre avec une facture
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------- Departures ------------------------------ */

const emptyDep: Omit<Departure, "id"> = {
  reference: "",
  origin: "",
  destination: "",
  mode: "Maritime",
  date: "",
  capacityKg: 10000,
  filledKg: 0
};

function DepartsAdmin() {
  const { departures, addDeparture, updateDeparture, removeDeparture } =
    useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Departure, "id">>(emptyDep);
  const [showForm, setShowForm] = useState(false);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyDep);
    setShowForm(true);
  };
  const startEdit = (d: Departure) => {
    setEditingId(d.id);
    const { id, ...rest } = d;
    setForm(rest);
    setShowForm(true);
  };
  const save = () => {
    if (!form.reference || !form.destination) return;
    if (editingId) updateDeparture(editingId, form);
    else addDeparture(form);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button size="sm" onClick={startAdd}>
          <Plus className="h-4 w-4" /> Ajouter un départ
        </Button>
      </div>

      {showForm && (
        <div className="mt-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-navy">
              {editingId ? "Modifier le départ" : "Nouveau départ"}
            </p>
            <button onClick={() => setShowForm(false)}>
              <X className="h-4 w-4 text-navy/50" />
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Référence">
              <Input
                value={form.reference}
                onChange={(e) => setForm({ ...form, reference: e.target.value })}
              />
            </Field>
            <Field label="Origine">
              <Input
                value={form.origin}
                onChange={(e) => setForm({ ...form, origin: e.target.value })}
              />
            </Field>
            <Field label="Destination">
              <Input
                value={form.destination}
                onChange={(e) =>
                  setForm({ ...form, destination: e.target.value })
                }
              />
            </Field>
            <Field label="Mode">
              <select
                value={form.mode}
                onChange={(e) =>
                  setForm({
                    ...form,
                    mode: e.target.value as Departure["mode"]
                  })
                }
                className={selectClass}
              >
                <option>Maritime</option>
                <option>Aérien</option>
              </select>
            </Field>
            <Field label="Date">
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Field>
            <Field label="Capacité (kg)">
              <Input
                type="number"
                value={form.capacityKg}
                onChange={(e) =>
                  setForm({ ...form, capacityKg: Number(e.target.value) })
                }
              />
            </Field>
            <Field label="Rempli (kg)">
              <Input
                type="number"
                value={form.filledKg}
                onChange={(e) =>
                  setForm({ ...form, filledKg: Number(e.target.value) })
                }
              />
            </Field>
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={save}>
              Enregistrer
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>
              Annuler
            </Button>
          </div>
        </div>
      )}

      <div className="mt-4 overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy/[0.03] text-xs uppercase text-navy/55">
            <tr>
              <th className="px-4 py-3">Référence</th>
              <th className="px-4 py-3">Trajet</th>
              <th className="px-4 py-3">Mode</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {departures.map((d) => (
              <tr key={d.id} className="text-navy/80">
                <td className="px-4 py-3 font-medium text-navy">{d.reference}</td>
                <td className="px-4 py-3">
                  {d.origin} → {d.destination}
                </td>
                <td className="px-4 py-3">{d.mode}</td>
                <td className="px-4 py-3">
                  {d.date ? formatDateFR(d.date) : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <IconBtn onClick={() => startEdit(d)}>
                      <Pencil className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn onClick={() => removeDeparture(d.id)} danger>
                      <Trash2 className="h-4 w-4" />
                    </IconBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------- Catalogue ------------------------------- */

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  category: "",
  image:
    "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=600&q=80",
  priceUsd: 10
};

function CatalogueAdmin() {
  const { catalog, addProduct, updateProduct, removeProduct } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(emptyProduct);
  const [showForm, setShowForm] = useState(false);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyProduct);
    setShowForm(true);
  };
  const startEdit = (p: Product) => {
    setEditingId(p.id);
    const { id, ...rest } = p;
    setForm(rest);
    setShowForm(true);
  };
  const save = () => {
    if (!form.name || !form.category) return;
    if (editingId) updateProduct(editingId, form);
    else addProduct(form);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button size="sm" onClick={startAdd}>
          <Plus className="h-4 w-4" /> Ajouter un produit
        </Button>
      </div>

      {showForm && (
        <div className="mt-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-navy">
              {editingId ? "Modifier le produit" : "Nouveau produit"}
            </p>
            <button onClick={() => setShowForm(false)}>
              <X className="h-4 w-4 text-navy/50" />
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label="Nom">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label="Catégorie (rayon)">
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Électronique, Mode & textile…"
              />
            </Field>
            <Field label="Image (URL)">
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </Field>
            <Field label="Prix (FCFA)">
              <Input
                type="number"
                value={Math.round(form.priceUsd * rates.FCFA)}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priceUsd: Number(e.target.value) / rates.FCFA
                  })
                }
              />
              <p className="mt-1.5 text-xs text-navy/50">
                Saisi en FCFA, converti automatiquement dans la devise du client.
              </p>
            </Field>
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={save}>
              Enregistrer
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>
              Annuler
            </Button>
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((p) => (
          <div
            key={p.id}
            className="flex gap-3 rounded-2xl border border-navy/10 bg-white p-3 shadow-card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.name}
              className="h-20 w-20 shrink-0 rounded-xl object-cover"
            />
            <div className="flex flex-1 flex-col">
              <p className="text-[11px] font-semibold uppercase text-electric">
                {p.category}
              </p>
              <p className="text-sm font-semibold text-navy">{p.name}</p>
              <p className="text-sm font-bold text-navy/80">
                {formatMoney(p.priceUsd, "FCFA")}
              </p>
              <div className="mt-auto flex gap-1 pt-2">
                <IconBtn onClick={() => startEdit(p)}>
                  <Pencil className="h-4 w-4" />
                </IconBtn>
                <IconBtn onClick={() => removeProduct(p.id)} danger>
                  <Trash2 className="h-4 w-4" />
                </IconBtn>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- Helpers -------------------------------- */

const selectClass =
  "flex h-11 w-full rounded-xl border border-navy/15 bg-white px-3 text-sm text-navy outline-none focus:border-electric focus:ring-2 focus:ring-electric/15";

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  danger
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-lg border transition-colors",
        danger
          ? "border-red-200 text-red-500 hover:bg-red-50"
          : "border-navy/15 text-navy/70 hover:bg-navy/5"
      )}
    >
      {children}
    </button>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-navy/15 bg-white p-10 text-center text-sm text-navy/55">
      {label}
    </div>
  );
}
