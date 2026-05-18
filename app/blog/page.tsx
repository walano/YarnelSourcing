import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { articles } from "@/lib/data";
import { formatDateFR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ressources & guides",
  description:
    "Conseils d'import, sourcing en Chine, contrôle qualité usine, optimisation logistique : nos guides à destination des PME africaines."
};

const HEADER_IMG =
  "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?auto=format&fit=crop&w=1800&q=80";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&w=1200&q=80"
];

export default function BlogPage() {
  const [feature, ...rest] = articles;

  return (
    <div className="bg-white">
      <section className="border-b border-navy/10 bg-navy text-white">
        <div className="container-tight py-24 lg:py-28">
          <p className="eyebrow-light">Ressources</p>
          <h1 className="mt-4 max-w-3xl text-display-lg font-extrabold tracking-tight">
            Apprendre à{" "}
            <span className="display-italic text-sky">importer mieux</span>,
            chaque semaine.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/75">
            Guides terrain rédigés par nos agents en Chine et nos transitaires.
            Des conseils concrets, des chiffres, zéro jargon.
          </p>
        </div>
      </section>

      <section className="container-tight py-16 lg:py-24">
        {/* Featured */}
        <Reveal>
          <Link
            href={`/blog#${feature.slug}`}
            className="group grid gap-8 overflow-hidden rounded-2xl border border-navy/10 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-electric/30 lg:grid-cols-[1.2fr_1fr] lg:p-6"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:aspect-auto">
              <Image
                src={HEADER_IMG}
                alt={feature.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center gap-5 p-2 lg:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="electric">À la une</Badge>
                <Badge variant="sky">{feature.category}</Badge>
                <span className="text-xs text-navy/55">
                  {formatDateFR(feature.date)} · {feature.readMinutes} min de lecture
                </span>
              </div>
              <h2 className="text-display-md font-extrabold leading-tight tracking-tight text-navy">
                {feature.title}
              </h2>
              <p className="text-base leading-relaxed text-navy/70">
                {feature.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-electric transition-transform group-hover:translate-x-1">
                Lire l'article <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal as="article" key={a.id} delay={i * 0.08}>
              <Link
                href={`/blog#${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card transition-all hover:-translate-y-1 hover:border-electric/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                    alt={a.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{a.category}</Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-navy/55">
                      <Clock className="h-3 w-3" />
                      {a.readMinutes} min
                    </span>
                  </div>
                  <h3 className="text-lg font-bold leading-tight tracking-tight text-navy">
                    {a.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-navy/65">
                    {a.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-navy/10 pt-4">
                    <span className="text-xs text-navy/55">
                      {formatDateFR(a.date)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-electric transition-transform group-hover:translate-x-1">
                      Lire <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Newsletter */}
        <Reveal className="mt-16">
          <div className="grid gap-6 rounded-2xl bg-electric p-8 text-white lg:grid-cols-[1.5fr_1fr] lg:items-center lg:p-12">
            <div>
              <p className="eyebrow-light !text-white/70">Lettre mensuelle</p>
              <h3 className="mt-3 text-display-md font-extrabold leading-tight tracking-tight">
                Recevez nos analyses de marché et nos guides pratiques.
              </h3>
              <p className="mt-3 max-w-lg text-sm text-white/85">
                Tarifs Chine, alertes Incoterms, retours d'expérience clients.
                Un seul email par mois, désinscription en un clic.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <input
                type="email"
                required
                placeholder="votre@email.com"
                className="h-12 flex-1 rounded-xl border border-white/30 bg-white/10 px-4 text-sm text-white placeholder:text-white/60 outline-none focus:border-white"
              />
              <button
                type="submit"
                className="h-12 rounded-xl bg-white px-6 text-sm font-semibold text-electric transition-colors hover:bg-sky hover:text-navy"
              >
                S'abonner
              </button>
            </form>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
