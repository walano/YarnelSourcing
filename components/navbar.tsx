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
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "border-b border-navy/5 bg-white/95 backdrop-blur"
      )}
    >
      <div className="container-tight flex h-16 items-center justify-between lg:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span
            className={cn(
              "grid h-9 w-9 place-items-center rounded-xl bg-electric text-white text-base font-bold",
              transparent && "ring-1 ring-white/30"
            )}
          >
            Y
          </span>
          <span
            className={cn(
              "text-base font-semibold tracking-tight",
              transparent ? "text-white" : "text-navy"
            )}
          >
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
                  transparent
                    ? "text-white/85 hover:text-white"
                    : "text-navy/75 hover:text-navy",
                  active && (transparent ? "text-white" : "text-navy")
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px",
                      transparent ? "bg-sky" : "bg-electric"
                    )}
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
          className={cn(
            "grid h-10 w-10 place-items-center rounded-xl lg:hidden",
            transparent ? "text-white" : "text-navy"
          )}
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
            className="border-t border-navy/5 bg-white shadow-card lg:hidden"
          >
            <div className="container-tight flex flex-col gap-1 py-4">
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
