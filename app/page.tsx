import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";
import { AdvantagesSection } from "@/components/advantages-section";
import { ProcessList } from "@/components/process-list";
import { departures, services, stats, testimonials } from "@/lib/data";
import { formatDateFR } from "@/lib/utils";

const HERO_IMAGE = "/cargo.jpg";
const WORKER_IMAGE =
  "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1000&q=80";
const PORT_IMAGE =
  "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1400&q=80";
const SHIP_IMAGE =
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1400&q=80";

export default function HomePage() {
  const featured = departures[0];
  const fill = Math.round((featured.filledKg / featured.capacityKg) * 100);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative isolate overflow-hidden pt-15 lg:pt-36 -translate-y-20 sm:translate-y-0">
        <Image
          src={HERO_IMAGE}
          alt="Container Yarnel suspendu"
          fill
          priority
          sizes="100vw"
          // className="-z-10 origin-center animate-hero-zoom object-cover object-center sm:animate-none"
          className="-z-10 object-cover object-center scale-150 sm:scale-"
        />

        <div className="container-tight relative">
          {/* Headline */}
          <Reveal>
            <h1 className="mx-auto mt-[35vh] max-w-4xl text-balance text-center font-extrabold leading-[0.95] text-white text-[clamp(1.85rem,5vw,4.25rem)] -tracking-wider lg:mt-[25vh]">
              Le fret malin entre{" "}
              <br className="hidden sm:block" />
              la Chine et l'Afrique.
            </h1>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.2}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-3 lg:mt-10 -translate-y-10 sm:translate-y-0">
              <Button asChild size="lg" variant="white">
                <Link href="/devis">Obtenir un devis</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/departs">Voir les départs</Link>
              </Button>
            </div>
          </Reveal>

          {/* Centered Prochain départ card */}
          <Reveal delay={0.35}>
            <div className="mx-auto mt-24 max-w-md rounded-3xl bg-white/95 p-5 text-center shadow-card backdrop-blur sm:mt-32 lg:mt-40">
              <p className="text-xs font-semibold uppercase text-navy/55">
                Prochain départ
              </p>
              <p className="mt-2 text-xl font-bold text-navy">
                {featured.origin}{" "}
                <ArrowRight className="inline-block h-4 w-4 -translate-y-px" />{" "}
                <span className="text-electric">{featured.destination}</span>
              </p>
              <p className="mt-1 text-sm text-navy/70">
                {formatDateFR(featured.date)} · {fill}% rempli · {featured.mode}
              </p>
              <Link
                href="/departs"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-electric hover:gap-2"
              >
                Réserver des kilos
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="h-16 lg:h-24" />
      </section>

      {/* ============ ABOUT (logistique précise) ============ */}
      <section className="bg-white">
        <div className="container-tight py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
            <Reveal>
              <h2 className="text-display-lg font-extrabold leading-[1.02] text-navy -tracking-wider text-2xl font-bold">
                Une logistique{" "}
                <span className="text-electric">précise</span>, négociée pour les marchés africains.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-navy/70 lg:text-lg">
                Depuis nos bureaux de Guangzhou et Yiwu, nos agents
                francophones sélectionnent les usines, contrôlent vos commandes
                et organisent le transport groupé. Vous suivez chaque étape,
                du paiement au dernier kilomètre, sur une seule plateforme.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid gap-3 lg:gap-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src={PORT_IMAGE}
                    alt="Conteneurs au port"
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={WORKER_IMAGE}
                      alt="Agent Yarnel sur le terrain"
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={SHIP_IMAGE}
                      alt="Cargo aérien"
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="relative isolate overflow-hidden bg-royal text-white">
        <div className="absolute inset-0 grain opacity-25" />
        <div className="container-tight relative py-20 lg:py-28">
          <div className="flex flex-col items-center text-center">
            <h2 className="max-w-3xl text-display-lg font-extrabold leading-[1.02] -tracking-wider text-2xl font-bold">
              Découvrez nos <span className="text-sky">services</span> de fret cargo
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-navy p-6 ring-1 ring-white/10 lg:p-8">
                <div className="grid items-center gap-6 sm:grid-cols-[1fr_1fr]">
                  <div className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-white/10">
                    <Image
                      src={PORT_IMAGE}
                      alt="Port maritime"
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Solutions cargo mondial
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      Nos réseaux d'expédition aériens et maritimes acheminent
                      vos marchandises de la Chine vers les principales villes
                      africaines, en toute fluidité.
                    </p>
                    <Link
                      href="/devis"
                      className="mt-5 inline-flex items-center gap-1 rounded-full bg-electric px-4 py-2 text-xs font-semibold uppercase text-white hover:bg-sky hover:text-navy"
                    >
                      Voir les services
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-3xl bg-navy p-6 text-white ring-1 ring-white/10 lg:p-8">
                <div className="grid items-center gap-6 sm:grid-cols-[1fr_1fr]">
                  <div className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-white/10">
                    <Image
                      src={WORKER_IMAGE}
                      alt="Agent francophone"
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      Accompagnement local
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      Agents francophones sur place, contrôle qualité,
                      livraison dernier kilomètre dans 16 villes. Un
                      interlocuteur, zéro intermédiaire.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-5 inline-flex items-center gap-1 rounded-full bg-electric px-4 py-2 text-xs font-semibold uppercase text-white hover:bg-sky hover:text-navy"
                    >
                      Parler à un agent
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.06}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col gap-5 rounded-2xl bg-navy p-6 ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:bg-[#070f3d] hover:ring-electric/40"
                >
                  <div>
                    <h3 className="text-base font-bold leading-tight text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {s.description}
                    </p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold uppercase text-sky transition-transform group-hover:translate-x-1">
                    Découvrir <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS LIST ============ */}
      <ProcessList />

      {/* ============ ADVANTAGES ============ */}
      <AdvantagesSection />

      {/* ============ STATS (dark) ============ */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="container-tight relative py-20 lg:py-24">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <p className="eyebrow-light">En chiffres</p>
              <h2 className="mt-4 max-w-3xl text-display-lg font-extrabold -tracking-wider text-2xl font-bold">
                Une plateforme déjà{" "}
                <span className="text-sky">éprouvée</span> sur le terrain.
              </h2>
            </div>
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

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-white">
        <div className="container-tight py-20 lg:py-28">
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow-muted">Ils nous font confiance</p>
            <h2 className="mt-5 max-w-3xl text-display-lg font-extrabold leading-[1.02] text-navy -tracking-wider text-2xl font-bold">
              Des importateurs qui{" "}
              <span className="text-electric">gagnent du temps</span>.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal as="article" key={t.name} delay={i * 0.1}>
                <div className="flex h-full flex-col gap-5 rounded-2xl border border-navy/10 bg-soft p-7 transition-all hover:-translate-y-1 hover:border-electric/30 hover:bg-white hover:shadow-card">
                  <i className="fi fi-rs-quote-right text-2xl leading-none text-electric" />
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
                        <Star
                          key={idx}
                          className="h-3.5 w-3.5 fill-electric text-electric"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER (Calculez votre tarif) ============ */}
      <section className="relative isolate overflow-hidden bg-electric text-white">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="container-tight relative grid gap-10 py-20 lg:grid-cols-[1.6fr_1fr] lg:items-center lg:py-24">
          <Reveal>
            <h2 className="max-w-3xl text-display-lg font-extrabold leading-[1.05] -tracking-wider text-2xl font-bold">
              Calculez votre tarif{" "}
              <span className="text-sky">en moins d'une minute</span>.
            </h2>
            <p className="mt-5 max-w-lg text-base text-white/85">
              Renseignez votre poids, votre destination et votre niveau
              d'urgence. Vous obtenez un prix transparent et la date du
              prochain départ.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg" variant="secondary">
                <Link href="/devis">
                  Lancer mon devis
                </Link>
              </Button>
              <Button asChild size="lg" variant="white" className="hover:bg-sky">
                <Link href="/contact">Parler à un expert</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
