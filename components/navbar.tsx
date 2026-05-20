"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, User, LogOut, LayoutDashboard, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { currencyLabel } from "@/lib/currency";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/devis", label: "Devis" },
  { href: "/departs", label: "Départs" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/blog", label: "Ressources" },
  { href: "/a-propos", label: "À propos" }
];

// Pages that open on a dark navy hero: the navbar starts transparent and
// turns solid white once that hero is scrolled past.
const transparentRoutes = [
  "/devis",
  "/departs",
  "/catalogue",
  "/blog",
  "/contact",
  "/a-propos"
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useStore();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const overHero = transparentRoutes.includes(pathname);
  const [solid, setSolid] = useState(!overHero);

  const dashboardHref = user?.role === "admin" ? "/admin" : "/compte";

  useEffect(() => {
    if (!overHero) {
      setSolid(true);
      return;
    }
    setSolid(false);
    const compute = () => {
      const header = document.querySelector("main section") as HTMLElement | null;
      const threshold = header ? header.offsetHeight - 100 : 320;
      setSolid(window.scrollY > threshold);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [overHero, pathname]);

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // When solid → dark text on white. When transparent (over hero) → light text.
  const solidBar = solid || open;
  const light = !solidBar;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:px-8 lg:pt-6">
      <div
        className={cn(
          "mx-auto flex max-w-[1280px] items-center justify-between rounded-full px-4 py-3 transition-all duration-300 lg:px-6 lg:py-3.5",
          solidBar
            ? "bg-white/95 shadow-[0_8px_32px_-12px_rgba(4,9,47,0.18)] backdrop-blur"
            : "bg-navy/50 backdrop-blur"
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-electric text-base font-bold text-white">
            Y
          </span>
          <span
            className={cn(
              "text-base font-semibold transition-colors",
              light ? "text-white" : "text-navy"
            )}
          >
            Yarnel
            <span className={light ? "text-sky" : "text-electric"}>Sourcing</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? light
                    ? "text-white"
                    : "text-navy"
                  : light
                    ? "text-white/75 hover:text-white"
                    : "text-navy/65 hover:text-navy"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full",
                    light ? "bg-sky" : "bg-electric"
                  )}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop profile */}
        <div className="relative hidden lg:block" ref={menuRef}>
          {user ? (
            <>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Profil"
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-full text-sm font-semibold transition-colors",
                  light
                    ? "bg-white text-navy hover:bg-white/90"
                    : "bg-navy text-white hover:bg-royal"
                )}
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-60 rounded-2xl border border-navy/10 bg-white p-2 shadow-card"
                  >
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold text-navy">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-navy/55">
                        {user.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-soft px-3 py-2 text-xs text-navy/70">
                      <Wallet className="h-3.5 w-3.5 text-electric" />
                      Devise · {currencyLabel(user.currency)}
                    </div>
                    <Link
                      href={dashboardHref}
                      className="mt-1 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-navy hover:bg-navy/5"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      {user.role === "admin" ? "Espace admin" : "Mon espace"}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-navy hover:bg-navy/5"
                    >
                      <LogOut className="h-4 w-4" />
                      Déconnexion
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link
              href="/connexion"
              aria-label="Se connecter"
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full border transition-colors",
                light
                  ? "border-white/40 text-white hover:border-white"
                  : "border-navy/15 text-navy hover:border-electric hover:text-electric"
              )}
            >
              <User className="h-5 w-5" />
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "grid h-10 w-10 place-items-center rounded-full transition-colors lg:hidden",
            light ? "text-white" : "text-navy"
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
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
              {/* Profile first */}
              {user ? (
                <div className="mb-1 rounded-2xl bg-soft p-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-sm font-semibold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-navy">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-navy/55">
                        {currencyLabel(user.currency)} ·{" "}
                        {user.role === "admin" ? "Admin" : "Client"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link
                      href={dashboardHref}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-navy px-3 py-2.5 text-sm font-medium text-white"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      {user.role === "admin" ? "Admin" : "Mon espace"}
                    </Link>
                    <button
                      onClick={logout}
                      aria-label="Déconnexion"
                      className="grid h-10 w-10 place-items-center rounded-xl border border-navy/15 text-navy"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/connexion"
                  className="mb-1 flex items-center gap-3 rounded-2xl bg-soft px-3 py-3 text-base font-medium text-navy"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-navy/15">
                    <User className="h-5 w-5" />
                  </span>
                  Se connecter / S'inscrire
                </Link>
              )}

              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-3 py-3 text-base font-medium",
                    isActive(link.href)
                      ? "bg-electric/5 text-electric"
                      : "text-navy/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
