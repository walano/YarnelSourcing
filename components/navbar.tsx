"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/departs", label: "Départs" },
  { href: "/devis", label: "Devis" },
  { href: "/blog", label: "Ressources" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:px-8 lg:pt-6">
      <div
        className={cn(
          "mx-auto flex max-w-[1280px] items-center justify-between rounded-full bg-white/95 px-4 py-3 backdrop-blur transition-shadow duration-300 lg:px-6 lg:py-3.5",
          scrolled
            ? "shadow-[0_8px_32px_-12px_rgba(4,9,47,0.18)]"
            : "shadow-[0_4px_24px_-16px_rgba(4,9,47,0.18)]"
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-electric text-base font-bold text-white">
            Y
          </span>
          <span className="text-base font-semibold text-navy">
            Yarnel<span className="text-electric">Sourcing</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-navy" : "text-navy/65 hover:text-navy"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-electric"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex">
          <Button asChild size="sm">
            <Link href="/devis">Obtenir un devis</Link>
          </Button>
        </div>

        <button
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full text-navy lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-3 max-w-[1280px] rounded-3xl bg-white p-4 shadow-card lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-xl px-3 py-3 text-base font-medium",
                      active ? "bg-electric/5 text-electric" : "text-navy/80"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button asChild className="mt-2">
                <Link href="/devis">Obtenir un devis</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
