"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { PageTransition } from "@/components/page-transition";

// Routes that render as a standalone full page (no nav / footer / support).
const bareRoutes = ["/connexion", "/admin/connexion"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = bareRoutes.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`)
  );

  if (bare) {
    return <PageTransition>{children}</PageTransition>;
  }

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen">{children}</main>
      </PageTransition>
      <Footer />
      <ChatWidget />
    </>
  );
}
