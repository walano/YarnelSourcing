import type { Metadata } from "next";
import { DeparturesList } from "./departures-list";

export const metadata: Metadata = {
  title: "Calendrier des départs",
  description:
    "Consultez les prochains départs aériens et maritimes Chine → Afrique. Réservez vos kilos en quelques clics."
};

export default function DeparturesPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-navy/10 bg-navy text-white">
        <div className="container-tight py-24 lg:py-28">
          <p className="eyebrow-light">Marketplace kilos</p>
          <h1 className="mt-4 max-w-3xl text-display-lg font-extrabold">
            Réservez sur les{" "}
            <span className="text-sky">prochains départs</span>{" "}
            groupés.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/75">
            Capacité, taux de remplissage, ville d'arrivée : tout est visible en
            temps réel. Bloquez vos kilos avant qu'ils ne soient pris.
          </p>
        </div>
      </section>

      <DeparturesList />
    </div>
  );
}
