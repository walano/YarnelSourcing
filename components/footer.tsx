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
    <footer className="relative overflow-hidden bg-white text-navy">
      <div className="container-tight pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-electric text-base font-bold text-white">
                Y
              </span>
              <span className="text-lg font-semibold text-navy">
                Yarnel<span className="text-electric">Sourcing</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy/65">
              Plateforme de transit et de sourcing Chine → Afrique. Nous
              accompagnons importateurs, PME et e-commerçants à chaque étape,
              de l'usine au dernier kilomètre.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-navy/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-electric" />
                Guangzhou · Yiwu · Libreville · Douala
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-electric" />
                +86 195 8248 0671
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-electric" />
                contact@yarnelsourcing.com
              </li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title}>
                <h4 className="text-xs font-semibold uppercase text-navy/50">
                  {g.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-navy/70 transition-colors hover:text-electric"
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

        <div className="mt-14 flex flex-col items-start gap-3 border-t border-navy/10 pt-6 text-xs text-navy/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} YarnelSourcing. Tous droits réservés.</p>
          <p>
            Website powered by{" "}
            <a
              href="https://walanodesign.com"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-navy hover:text-electric"
            >
              Walano Design
            </a>
          </p>
        </div>
      </div>

      {/* Giant fading brand */}
      <div
        aria-hidden
        className="brand-fade pointer-events-none mt-6 select-none whitespace-nowrap text-center text-[10vw] leading-none lg:mt-10"
      >
        YARNELSOURCING
      </div>
    </footer>
  );
}
