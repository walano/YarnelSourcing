import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Posez vos questions à un agent francophone. Bureaux à Guangzhou, Yiwu, Douala et Abidjan."
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

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-navy/10 bg-navy text-white">
        <div className="container-tight py-24 lg:py-28">
          <p className="eyebrow-light">Contact</p>
          <h1 className="mt-4 max-w-3xl text-display-lg font-extrabold">
            Parlons de votre{" "}
            <span className="text-sky">prochain envoi</span>.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/75">
            Notre équipe répond sous 4h ouvrées. Pour une réponse instantanée,
            écrivez-nous sur WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="sky">
              <a
                href="https://wa.me/8619582480671"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/devis">Demander un devis</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-tight py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="eyebrow">Formulaire</p>
            <h2 className="mt-3 text-display-md font-extrabold text-navy">
              Écrivez-nous
            </h2>
            <p className="mt-3 max-w-lg text-sm text-navy/65">
              Décrivez brièvement votre besoin : produit, volume, destination.
              Nous revenons vers vous avec une proposition détaillée.
            </p>
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
                    <p className="text-xs text-white/65">Bureau Chine · WhatsApp 7j/7</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-sky" />
                  <div>
                    <p className="font-semibold">contact@yarnelsourcing.com</p>
                    <p className="text-xs text-white/65">Réponse sous 4h ouvrées</p>
                  </div>
                </li>
              </ul>

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
      </section>
    </div>
  );
}
