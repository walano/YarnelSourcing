import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

type Step = {
  number: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

const steps: Step[] = [
  {
    number: "001",
    title: "Sourcing usine en Chine",
    description:
      "Nos agents francophones négocient pour vous à Guangzhou, Yiwu et Shenzhen. Devis usine, échantillons, audit fournisseur.",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=600&q=80",
    href: "/contact"
  },
  {
    number: "002",
    title: "Contrôle qualité et regroupement",
    description:
      "Inspection en 14 points, photos, vidéos. Vos colis sont consolidés en entrepôt avant chaque départ groupé.",
    image:
      "https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&w=600&q=80",
    href: "/blog"
  },
  {
    number: "003",
    title: "Transit aérien ou maritime",
    description:
      "Départs hebdomadaires vers Libreville, Douala, Abidjan, Dakar. Dédouanement géré, suivi temps réel sur WhatsApp.",
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=600&q=80",
    href: "/departs"
  },
  {
    number: "004",
    title: "Livraison dernier kilomètre",
    description:
      "Réseau local dans 16 villes africaines. Livraison sur site, sur palette ou en magasin selon vos besoins.",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
    href: "/devis"
  }
];

export function ProcessList() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 grain opacity-30" />
      <div className="container-tight relative py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-16">
          <Reveal>
            <h2 className="text-display-lg font-extrabold leading-[1.05] -tracking-wider text-2xl font-bold">
              Boostez votre{" "}
              <span className="text-sky">LOGISTIQUE</span>
              <br />
              de la Chine vers l'Afrique.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 lg:text-base">
              Quatre étapes, une seule équipe. Du virement à votre fournisseur
              jusqu'à la livraison finale, vous gardez le contrôle sur chaque
              colis.
            </p>
          </Reveal>

          <div>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.number} delay={i * 0.08}>
                  <Link
                    href={s.href}
                    className="group flex items-center gap-5 py-6 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="w-12 shrink-0 text-lg font-semibold tabular-nums text-white/40 sm:text-xl">
                      {s.number}
                    </span>
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15 sm:h-20 sm:w-20">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </span>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold leading-tight text-white sm:text-lg">
                        {s.title}
                      </h3>
                      <p className="mt-1 hidden text-sm text-white/60 sm:block">
                        {s.description}
                      </p>
                    </div>
                    <span className="hidden h-10 items-center gap-2 rounded-full bg-white px-4 text-xs font-semibold text-navy transition-all group-hover:bg-electric group-hover:text-white sm:inline-flex">
                      En savoir plus
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-navy group-hover:bg-electric group-hover:text-white sm:hidden">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
