import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Shared navy hero header for all inner pages (Devis, Départs, Catalogue,
// Ressources, À propos, Contact). Edit the design here once — every page
// updates. Each page only passes its text via props.
export function PageHeader({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-navy/10 bg-navy text-white">
      <div className="container-tight pb-24 pt-32 lg:pb-28 lg:pt-40">
        {eyebrow && <p className="eyebrow-light">{eyebrow}</p>}
        <h1
          className={cn(
            "max-w-3xl text-display-lg font-extrabold -tracking-wider",
            eyebrow && "mt-4"
          )}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-base text-white/75">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
