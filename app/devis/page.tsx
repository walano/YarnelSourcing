import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { QuoteWizard } from "./quote-wizard";

export const metadata: Metadata = {
  title: "Devis en ligne",
  description:
    "Estimez le coût de votre expédition Chine → Afrique en 3 étapes. Tarifs transparents, prochain départ disponible affiché instantanément."
};

export default function DevisPage() {
  return (
    <div className="bg-white">
      <PageHeader
        title={
          <>
            Combien coûte mon <span className="text-sky">expédition</span> ?
          </>
        }
        description="Décrivez votre marchandise ou envoyez simplement une photo. Connectez-vous à la fin pour révéler votre tarif et le suivre dans votre espace."
      />

      <section className="container-tight py-16 lg:py-24">
        <QuoteWizard />
      </section>
    </div>
  );
}
