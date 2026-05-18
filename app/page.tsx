import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Plane,
  Quote,
  Ship,
  Star,
  Truck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";
import {
  cargoModes,
  departures,
  services,
  stats,
  testimonials
} from "@/lib/data";
import { formatDateFR } from "@/lib/utils";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=2000&q=80";
const MOOD_IMAGE =
  "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1400&q=80";
const SECONDARY_IMAGE =
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1400&q=80";

export default function HomePage() {
  const featuredDeparture = departures[0];
  const fillPercent = Math.round(
    (featuredDeparture.filledKg / featuredDeparture.capacityKg) * 100
  );

  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-navy text-white">
        <Image
          src={HERO_IMAGE}
          alt="Porte-conteneurs au port"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy" />
        <div className="absolute inset-0 grain mix-blend-overlay opacity-40" />

        <div className="container-tight relative flex min-h-[100svh] flex-col pt-28 lg:pt-32">
          <div className="flex-1">
            <Reveal>
              <Badge variant="outline" className="mb-6">
                Phase 1 · Lancement 2026
              </Badge>
            </Reveal>

            <h1 className="max-w-5xl text-display-xl font-extrabold leading-[0.95] tracking-tight">
              <Reveal as="div" delay={0.05}>
                <span className="block">
                  Le fret <span className="display-italic text-sky">malin</span> entre
                </span>
              </Reveal>
              <Reveal as="div" delay={0.15}>
                <span className="block">la Chine et l'Afrique.</span>
              </Reveal>
            </h1>

            <Reveal delay={0.3}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-white/75 lg:text-lg">
                Yarnel regroupe vos colis, négocie avec les usines et achemine vos
                marchandises en moins de 8 jours. Pas de minimum, pas de surprise,
                un interlocuteur unique francophone.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/devis">
                    Obtenir un devis <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/departs">Voir les départs</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Hero bottom strip */}
          <Reveal delay={0.55} className="pb-10 lg:pb-14">
            <div className="grid gap-6 border-t border-white/15 pt-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                {cargoModes.map((m) => (
                  <div key={m.title} className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                      <m.icon className="h-5 w-5 text-sky" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">{m.title}</p>
                      <p className="text-xs text-white/60">{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.18em] text-sky">
                  Prochain départ aérien
                </p>
                <p className="mt-2 font-display text-2xl font-semibold">
                  {featuredDeparture.origin} → {featuredDeparture.destination}
                </p>
                <p className="text-sm text-white/70">
                  {formatDateFR(featuredDeparture.date)} · {fillPercent}% rempli
                </p>
                <Link
                  href="/departs"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sky hover:text-white"
                >
                  Réserver des kilos <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO + EDITORIAL */}
      <section className="bg-white">
        <div className="container-tight grid gap-12 py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-28">
          <Reveal>
            <p className="eyebrow">À propos de Yarnel</p>
            <h2 className="mt-4 text-display-lg font-extrabold tracking-tight text-navy">
              Une logistique{" "}
              <span className="display-italic text-electric">précise</span>,
              négociée pour les marchés africains.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy/70">
              Depuis nos bureaux de Guangzhou et Yiwu, nos agents francophones
              sélectionnent les usines, contrôlent vos commandes et organisent
              le transport groupé. Vous suivez chaque étape, du paiement au
              dernier kilomètre, sur une seule plateforme.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:max-w-md">
              <div className="border-l-2 border-electric pl-4">
                <p className="text-3xl font-extrabold tracking-tight text-navy">
                  72h
                </p>
                <p className="mt-1 text-sm text-navy/65">Devis garanti</p>
              </div>
              <div className="border-l-2 border-sky pl-4">
                <p className="text-3xl font-extrabold tracking-tight text-navy">
                  16
                </p>
                <p className="mt-1 text-sm text-navy/65">Villes desservies</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <div className="grid grid-cols-5 grid-rows-6 gap-3 lg:gap-4">
              <div className="relative col-span-5 row-span-4 overflow-hidden rounded-2xl">
                <Image
                  src={MOOD_IMAGE}
                  alt="Conteneurs au port"
                  width={900}
                  height={700}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative col-span-3 row-span-2 overflow-hidden rounded-2xl bg-electric p-5 text-white">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                  Économie moyenne
                </p>
                <p className="mt-2 text-4xl font-extrabold">−38%</p>
                <p className="mt-1 text-xs text-white/75">vs. import individuel</p>
              </div>
              <div className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl">
                <Image
                  src={SECONDARY_IMAGE}
                  alt="Avion cargo"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-royal text-white">
        <div className="container-tight py-20 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <p className="eyebrow-light">Nos services</p>
              <h2 className="mt-4 max-w-2xl text-display-lg font-extrabold tracking-tight">
                Quatre métiers,{" "}
                <span className="display-italic text-sky">une seule équipe</span>{" "}
                à vos côtés.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="max-w-md text-sm text-white/70">
                Du sourcing au déchargement, nous couvrons toute la chaîne pour
                vous éviter les intermédiaires et préserver votre marge.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal as="article" key={s.id} delay={i * 0.08}>
                <Link
                  href={s.href}
                  className="group relative flex h-full flex-col gap-6 rounded-2xl border-t-2 border-electric bg-navy p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky hover:bg-[#070f3d]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-electric/15 ring-1 ring-electric/30">
                    <s.icon className="h-6 w-6 text-sky" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">
                      {s.description}
                    </p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.16em] text-sky transition-transform group-hover:translate-x-1">
                    Découvrir <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="container-tight relative py-20 lg:py-24">
          <Reveal>
            <p className="eyebrow-light">En chiffres</p>
            <h2 className="mt-4 max-w-3xl text-display-lg font-extrabold tracking-tight">
              Une plateforme déjà{" "}
              <span className="display-italic text-sky">éprouvée</span>{" "}
              sur le terrain.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <StatCounter {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white">
        <div className="container-tight py-20 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <p className="eyebrow">Ils nous font confiance</p>
              <h2 className="mt-4 max-w-2xl text-display-lg font-extrabold tracking-tight text-navy">
                Des importateurs qui{" "}
                <span className="display-italic text-electric">gagnent du temps</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <Button asChild variant="outlineDark">
                <Link href="/contact">
                  Parler à un client <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal as="article" key={t.name} delay={i * 0.1}>
                <div className="flex h-full flex-col gap-5 rounded-2xl border border-navy/10 bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:border-electric/30">
                  <Quote className="h-7 w-7 text-electric" />
                  <p className="text-base leading-relaxed text-navy/85">
                    « {t.quote} »
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-navy/10 pt-5">
                    <div>
                      <p className="text-sm font-semibold text-navy">{t.name}</p>
                      <p className="text-xs text-navy/60">{t.role}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} className="h-3.5 w-3.5 fill-electric text-electric" />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-electric text-white">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="container-tight relative grid gap-10 py-20 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:py-24">
          <Reveal>
            <p className="eyebrow-light !text-white/70">Prêt à expédier ?</p>
            <h2 className="mt-4 max-w-3xl text-display-lg font-extrabold tracking-tight">
              Calculez votre tarif{" "}
              <span className="display-italic">en moins d'une minute</span>.
            </h2>
            <p className="mt-5 max-w-lg text-base text-white/85">
              Renseignez votre poids, votre destination et votre niveau d'urgence.
              Vous obtenez un prix transparent et la date du prochain départ.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg" variant="secondary">
                <Link href="/devis">
                  Lancer mon devis <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Parler à un expert</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
