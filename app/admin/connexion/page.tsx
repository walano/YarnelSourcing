import { Suspense } from "react";
import Link from "next/link";
import { LoginCard } from "@/components/login-card";

export const metadata = { title: "Connexion admin" };

export default function AdminConnexionPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-navy px-5 pt-28 pb-16">
      <div className="flex flex-col items-center">
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
