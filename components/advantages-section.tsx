"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll
} from "framer-motion";
import { cn } from "@/lib/utils";

type Advantage = {
  id: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  image: string;
};

const advantages: Advantage[] = [
  {
    id: "delais",
    title: "Délais maîtrisés",
    description:
      "6 à 8 jours par voie aérienne, 35 à 45 jours par voie maritime. Chaque expédition suit un calendrier publié sur la plateforme, sans surprise.",
    metric: "98%",
    metricLabel: "Livraisons dans les délais",
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "precision",
    title: "Précision logistique",
    description:
      "Pesée certifiée, étiquetage harmonisé, tracking colis par colis. Vous savez à tout moment où se trouve votre marchandise.",
    metric: "0,4%",
    metricLabel: "Taux d'incident moyen",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "tech",
    title: "Technologie de pointe",
    description:
      "Plateforme de devis instantané, EDI douane, notifications WhatsApp temps réel. Moins de paperasse, plus de visibilité.",
    metric: "72h",
    metricLabel: "Devis garanti",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "surmesure",
    title: "Solutions sur-mesure",
    description:
      "Sourcing usine, contrôle qualité, regroupement, dédouanement clé en main. On assemble la chaîne dont vous avez besoin.",
    metric: "8 500+",
    metricLabel: "Expéditions accompagnées",
    image:
      "https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "reseau",
    title: "Réseau africain",
    description:
      "Hubs locaux à Libreville, Douala, Abidjan, Dakar. Livraison dernier kilomètre dans 16 villes, partenaires francophones triés sur le volet.",
    metric: "16",
    metricLabel: "Villes desservies",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80"
  }
];

const slots = [
  { offset: -300, size: 90 },
  { offset: -220, size: 130 },
  { offset: -100, size: 200 },
  { offset: 80, size: 130 },
  { offset: 200, size: 90 }
];

export function AdvantagesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      advantages.length - 1,
      Math.max(0, Math.floor(v * advantages.length))
    );
    setActive(idx);
  });

  const current = advantages[active];

  return (
    <section
      ref={ref}
      className="relative bg-soft lg:h-[420vh]"
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:items-center">
        <div className="container-tight w-full py-16 lg:py-20">
          {/* Headline */}
          <div className="flex flex-col items-center text-center">
            <h2 className="max-w-3xl text-display-lg font-extrabold leading-[1.02] text-navy -tracking-wider text-2xl font-bold">
              Profitez pleinement de tous nos <span className="text-electric">avantages</span>.
            </h2>
          </div>

          {/* 5-image gallery: 1 center + 2L + 2R */}
          <div className="relative mx-auto mt-12 hidden h-[260px] max-w-4xl items-center justify-center sm:flex">
            {slots.map((slot, i) => {
              const isActive = i === active;
              return (
                <motion.div
                  key={i}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    opacity: isActive ? 1 : 1
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: slot.size,
                    height: slot.size,
                    left: `calc(50% + ${slot.offset}px)`,
                    zIndex: isActive ? 10 : 5 - Math.abs(i - 2)
                  }}
                  className={cn(
                    "absolute -translate-x-1/2 overflow-hidden rounded-full shadow-card transition-all duration-500",
                    isActive
                      ? "ring-4 ring-electric ring-offset-2 ring-offset-soft grayscale-0"
                      : "ring-2 ring-white grayscale"
                  )}
                >
                  <Image
                    src={advantages[i].image}
                    alt={advantages[i].title}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Mobile single image */}
          <div className="mt-10 flex justify-center sm:hidden">
            <div className="relative h-44 w-44 overflow-hidden rounded-full ring-4 ring-electric ring-offset-2 ring-offset-soft">
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {advantages.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  active === i ? "w-10 bg-electric" : "w-1.5 bg-navy/20"
                )}
              />
            ))}
          </div>

          {/* Active content */}
          <div className="mx-auto mt-8 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="grid items-center gap-8 rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:grid-cols-[1fr_auto] sm:p-8"
              >
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-navy">
                    {current.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy/70 sm:text-base">
                    {current.description}
                  </p>
                </div>
                <div className="border-t border-navy/10 pt-5 text-center sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                  <p className="text-4xl font-extrabold text-electric sm:text-5xl">
                    {current.metric}
                  </p>
                  <p className="mt-2 text-sm text-navy/60">
                    {current.metricLabel}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
