"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, ArrowLeft, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP =
  "https://wa.me/8619582480671?text=Bonjour%20Yarnel%2C%20j'ai%20besoin%20d'aide.";

type Topic = { id: string; q: string; a: string };

const topics: Topic[] = [
  {
    id: "delais",
    q: "Quels sont vos délais ?",
    a: "Premium aérien ≈ 3 jours, Express mix ≈ 5 jours, Standard maritime ≈ 15 jours, porte à porte."
  },
  {
    id: "tarifs",
    q: "Comment sont calculés les tarifs ?",
    a: "Au kilo pour l'aérien, au volume (CBM) pour le maritime. Faites une simulation sur la page Devis pour un prix instantané."
  },
  {
    id: "assurance",
    q: "Proposez-vous une assurance ?",
    a: "Oui : 4 000 FCFA par kilo, couverture totale en cas de perte ou de casse. Activable au moment du devis."
  },
  {
    id: "suivi",
    q: "Comment suivre mon colis ?",
    a: "Chaque envoi a une référence (ex. YS-AIR-…). Retrouvez le statut et vos factures dans votre espace client."
  },
  {
    id: "paiement",
    q: "Quels moyens de paiement ?",
    a: "Mobile money, virement et espèces en agence. Le détail figure sur la facture envoyée par votre agent."
  }
];

type Msg = { from: "bot" | "user"; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Bonjour, je suis l'assistant Yarnel. Sur quoi puis-je vous aider ?"
    }
  ]);
  const [resolved, setResolved] = useState<boolean | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" });
  }, [messages, open]);

  const pick = (t: Topic) => {
    setMessages((m) => [
      ...m,
      { from: "user", text: t.q },
      { from: "bot", text: t.a }
    ]);
    setResolved(null);
  };

  const askResolved = messages.length > 1 && resolved === null;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-40 flex h-[460px] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-card sm:bottom-28 sm:right-7"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-navy px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-electric">
                  <Headphones className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Assistant Yarnel</p>
                  <p className="text-[11px] text-white/60">Réponse immédiate</p>
                </div>
              </div>
              <button
                aria-label="Fermer"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-soft/50 p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm",
                    m.from === "bot"
                      ? "bg-white text-navy shadow-[0_4px_18px_-12px_rgba(4,9,47,0.25)]"
                      : "ml-auto bg-electric text-white"
                  )}
                >
                  {m.text}
                </div>
              ))}

              {askResolved && (
                <div className="rounded-2xl bg-white p-3 text-sm shadow-[0_4px_18px_-12px_rgba(4,9,47,0.25)]">
                  <p className="text-navy/70">Cela répond à votre question ?</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => setResolved(true)}
                      className="flex-1 rounded-lg bg-electric/10 px-3 py-2 text-xs font-semibold text-electric"
                    >
                      Oui, merci
                    </button>
                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-lg bg-[#25D366] px-3 py-2 text-center text-xs font-semibold text-white"
                    >
                      Parler à un agent
                    </a>
                  </div>
                </div>
              )}

              {resolved === true && (
                <div className="rounded-2xl bg-white px-3.5 py-2.5 text-sm text-navy shadow-[0_4px_18px_-12px_rgba(4,9,47,0.25)]">
                  Avec plaisir ! Une autre question ?
                </div>
              )}
            </div>

            {/* Quick topics */}
            <div className="border-t border-navy/10 bg-white p-3">
              <div className="mb-2 flex items-center gap-1 text-[11px] font-semibold uppercase text-navy/45">
                {messages.length > 1 && (
                  <button
                    onClick={() => {
                      setMessages(messages.slice(0, 1));
                      setResolved(null);
                    }}
                    className="mr-1 inline-flex items-center gap-1 text-navy/60 hover:text-navy"
                  >
                    <ArrowLeft className="h-3 w-3" /> Début
                  </button>
                )}
                Questions fréquentes
              </div>
              <div className="flex max-h-24 flex-wrap gap-2 overflow-y-auto">
                {topics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => pick(t)}
                    className="rounded-full border border-navy/15 px-3 py-1.5 text-xs font-medium text-navy/75 transition-colors hover:border-electric hover:text-electric"
                  >
                    {t.q}
                  </button>
                ))}
              </div>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1ebe5b]"
              >
                <MessageCircle className="h-4 w-4" /> Parler à un agent humain
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-electric px-4 py-3 text-sm font-semibold text-white shadow-glow ring-1 ring-white/30 hover:bg-[#1a1aff] sm:bottom-7 sm:right-7"
      >
        <span className="relative grid h-8 w-8 place-items-center">
          {!open && (
            <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
          )}
          {open ? (
            <X className="relative h-5 w-5" />
          ) : (
            <MessageCircle className="relative h-5 w-5" />
          )}
        </span>
        <span className="hidden sm:inline">{open ? "Fermer" : "Aide & devis"}</span>
      </motion.button>
    </>
  );
}
