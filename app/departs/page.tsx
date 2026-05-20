import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { DeparturesList } from "./departures-list";

export const metadata: Metadata = {
  title: "Calendrier des départs",
  description:
    "Consultez les prochains départs aériens et maritimes Chine → Afrique. Réservez vos kilos en quelques clics."
};

export default function DeparturesPage() {
  return (
    <div className="bg-white">
      <PageHeader
        title={
          <>
            Réservez sur les{" "}
            <span className="text-sky">prochains départs</span> groupés.
          </>
        }
        description="Capacité, taux de remplissage, ville d'arrivée : tout est visible en temps réel. Bloquez vos kilos avant qu'ils ne soient pris."
      />

      <DeparturesList />
    </div>
  );
}
