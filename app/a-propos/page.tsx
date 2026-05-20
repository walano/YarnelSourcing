import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/app/contact/contact-form";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "YarnelSourcing connecte les importateurs africains aux usines chinoises : sourcing, contrôle qualité et transit aérien et maritime clé en main."
};

const offices = [
  {
    city: "Libreville · Gabon",
    detail: "Quartier Glass, Boulevard du Bord de Mer",
    hours: "Lun – Ven · 8h – 17h",
    primary: true
  },
  {
    city: "Guangzhou · Chine",
    detail: "Tianhe District, Tower B, 22F",
    hours: "Lun – Sam · 9h – 19h"
  },
  {
    city: "Yiwu · Chine",
    detail: "Futian Market, Phase 4",
    hours: "Lun – Dim · 9h – 18h"
  },
  {
    city: "Douala · Cameroun",
    detail: "Bonapriso, Rue Castelnau",
    hours: "Lun – Ven · 8h – 17h"
  }
];

const values = [
  {
    icon: Compass,
    title: "Présence locale en Chine",
    text: "Agents francophones à Guangzhou et Yiwu pour sourcer, négocier et inspecter vos commandes sur place."
  },
  {
    icon: ShieldCheck,
    title: "Transparence totale",
    text: "Tarifs clairs, suivi colis par colis, assurance optionnelle. Vous savez toujours où en est votre marchandise."
  },
  {
    icon: Globe2,
    title: "Réseau africain",
    text: "Hubs de livraison à Libreville, Port-Gentil, Douala, Abidjan, Dakar et au-delà — 16 villes desservies."
  },
  {
    icon: Users,
    title: "Accompagnement humain",
    text: "Un interlocuteur dédié, zéro intermédiaire, du paiement fournisseur au dernier kilomètre."
  }
];

export default function AProposPage() {
  return (
    <div className="bg-white">
      <PageHeader
        title={
          <>
            La logistique Chine/Afrique,{" "}
            <span className="text-sky">sans friction</span>.
          </>
        }
        description="YarnelSourcing est née d'un constat simple : importer depuis la Chine restait trop opaque et trop risqué pour les PME africaines. Nous avons bâti une chaîne complète — sourcing, contrôle qualité, transit et livraison — pilotée depuis une seule plateforme."
      />

      <section className="container-tight py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="text-2xl font-bold text-navy lg:text-3xl -tracking-wider ">
              De l'usine chinoise à votre{" "}
              <span className="text-electric">entrepôt</span>.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-navy/70">
              Depuis nos bureaux de Guangzhou et Yiwu, nos équipes sélectionnent
              les fournisseurs, vérifient la qualité et regroupent vos commandes
              pour optimiser le coût au kilo. Vous choisissez l'aérien pour la
              rapidité ou le maritime pour l'économie, et nous gérons le
              dédouanement des deux côtés.
            </p>
            <p className="mt-4 text-base leading-relaxed text-navy/70">
              Notre objectif : que chaque importateur, du e-commerçant au
              grossiste, accède aux mêmes leviers que les grands groupes.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/devis">
                Obtenir un devis
              </Link>
            </Button>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=80"
                alt="Conteneurs au port"
                fill
                sizes="(min-width:1024px) 500px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-navy/10 bg-soft p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-electric text-white">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold text-navy">{v.title}</h3>
                <p className="text-sm leading-relaxed text-navy/65">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="bg-soft">
        <div className="container-tight py-20 lg:py-28">
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow">Contact</p>
            <h2 className="mt-3 max-w-2xl text-2xl font-bold text-navy lg:text-3xl">
              Parlons de votre <span className="text-electric">prochain envoi</span>.
            </h2>
            <p className="mt-3 max-w-lg text-sm text-navy/65">
              Décrivez votre besoin : produit, volume, destination. Un agent
              francophone vous répond sous 4h ouvrées.
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-navy/10 bg-navy p-8 text-white">
                <p className="eyebrow-light">Joindre un agent</p>
                <ul className="mt-6 space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-sky" />
                    <div>
                      <p className="font-semibold">+86 195 8248 0671</p>
                      <p className="text-xs text-white/65">
                        Bureau Chine · WhatsApp 7j/7
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-sky" />
                    <div>
                      <p className="font-semibold">contact@yarnelsourcing.com</p>
                      <p className="text-xs text-white/65">
                        Réponse sous 4h ouvrées
                      </p>
                    </div>
                  </li>
                </ul>

                <Button asChild variant="sky" size="lg" className="mt-7 w-full">
                  <a
                    href="https://wa.me/8619582480671"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> Écrire sur WhatsApp
                  </a>
                </Button>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="eyebrow-light">Bureaux</p>
                  <ul className="mt-5 space-y-4">
                    {offices.map((o) => (
                      <li key={o.city} className="flex items-start gap-3">
                        <MapPin
                          className={cn(
                            "mt-0.5 h-4 w-4",
                            o.primary ? "text-electric" : "text-sky"
                          )}
                        />
                        <div>
                          <p className="text-sm font-semibold">
                            {o.city}
                            {o.primary && (
                              <span className="ml-2 rounded-full bg-electric px-2 py-0.5 text-[10px] uppercase text-white">
                                Siège
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-white/65">{o.detail}</p>
                          <p className="text-xs text-white/45">{o.hours}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
