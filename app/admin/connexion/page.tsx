import { Suspense } from "react";
import Link from "next/link";
import { LoginCard } from "@/components/login-card";

export const metadata = { title: "Connexion admin" };

export default function AdminConnexionPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-navy px-5 py-16">
      <div className="flex flex-col items-center">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-electric text-base font-bold text-white">
            Y
          </span>
          <span className="text-base font-semibold text-white">
            Yarnel<span className="text-sky">Sourcing</span>
          </span>
        </Link>
        <Suspense fallback={null}>
          <LoginCard role="admin" />
        </Suspense>
        <Link
          href="/connexion"
          className="mt-6 text-xs font-medium text-white/50 hover:text-white"
        >
          ← Connexion client
        </Link>
      </div>
    </div>
  );
}
