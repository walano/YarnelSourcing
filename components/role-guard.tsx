"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useStore, type Role } from "@/lib/store";

export function RoleGuard({
  role,
  children
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const { user, hydrated } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      const login = role === "admin" ? "/admin/connexion" : "/connexion";
      router.replace(`${login}?next=${pathname}`);
    } else if (user.role !== role) {
      router.replace(user.role === "admin" ? "/admin" : "/compte");
    }
  }, [hydrated, user, role, router, pathname]);

  if (!hydrated || !user || user.role !== role) {
    return (
      <div className="grid min-h-screen place-items-center bg-soft">
        <Loader2 className="h-8 w-8 animate-spin text-electric" />
      </div>
    );
  }

  return <>{children}</>;
}
