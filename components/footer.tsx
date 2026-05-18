import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const groups = [
  {
    title: "Services",
    links: [
      { href: "/devis", label: "Obtenir un devis" },
      { href: "/departs", label: "Calendrier des départs" },
      { href: "/blog", label: "Ressources & guides" },
      { href: "/contact", label: "Parler à un agent" }
    ]
  },
  {
    title: "Couloirs",
    links: [
      { href: "/devis", label: "Chine → Gabon" },
      { href: "/devis", label: "Chine → Cameroun" },
      { href: "/devis", label: "Chine → Côte d'Ivoire" },
      { href: "/devis", label: "Chine → Sénégal" }
    ]
  },
  {
    title: "Entreprise",
    links: [
      { href: "/contact", label: "À propos" },
      { href: "/contact", label: "Conditions générales" },
      { href: "/contact", label: "Politique de confidentialité" },
      { href: "/contact", label: "Devenir partenaire" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-tight py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-electric text-base font-bold">
                Y
              </span>
              <span className="text-lg font-semibold">
                Yarnel<span className="text-sky">Sourcing</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Plateforme de transit et de sourcing Chine → Afrique. Nous accompagnons
              importateurs, PME et e-commerçants à chaque étape, de l'usine au dernier kilomètre.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-sky" />
                Guangzhou · Yiwu · Libreville · Douala
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-sky" />
                +86 195 8248 0671
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-sky" />
                contact@yarnelsourcing.com
              </li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title}>
                <h4 className="eyebrow-light">{g.title}</h4>
                <ul className="mt-5 space-y-3">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/75 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} YarnelSourcing. Tous droits réservés.</p>
          <p>Fret aérien & maritime · Sourcing usine · Marketplace kilos</p>
        </div>
      </div>
    </footer>
  );
}
