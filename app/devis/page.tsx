import type { Metadata } from "next";
import { QuoteWizard } from "./quote-wizard";

export const metadata: Metadata = {
  title: "Devis en ligne",
  description:
    "Estimez le coût de votre expédition Chine → Afrique en 3 étapes. Tarifs transparents, prochain départ disponible affiché instantanément."
};

export default function DevisPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-navy/10 bg-navy text-white">
        <div className="container-tight py-24 lg:py-28">
          <p className="eyebrow-light">Devis express · 60 secondes</p>
          <h1 className="mt-4 max-w-3xl text-display-lg font-extrabold">
            Combien coûte mon{" "}
            <span className="text-sky">expédition</span> ?
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/75">
            Trois étapes simples. Pas de création de compte, pas d'engagement.
            Vous recevez un tarif et la date du prochain départ disponible.
          </p>
        </div>
      </section>

      <section className="container-tight py-16 lg:py-24">
        <QuoteWizard />
      </section>
    </div>
  );
}
