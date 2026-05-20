import { Suspense } from "react";
import Link from "next/link";
import { LoginCard } from "@/components/login-card";

export const metadata = { title: "Connexion" };

export default function ConnexionPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-soft px-5 py-16">
      <div className="flex flex-col items-center">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-electric text-base font-bold text-white">
            Y
          </span>
          <span className="text-base font-semibold text-navy">
            Yarnel<span className="text-electric">Sourcing</span>
          </span>
        </Link>
        <Suspense fallback={null}>
          <LoginCard role="client" />
        </Suspense>
        <Link
          href="/admin/connexion"
          className="mt-6 text-xs font-medium text-navy/45 hover:text-navy"
        >
          Vous êtes administrateur ? Connexion équipe →
        </Link>
      </div>
    </div>
  );
}
