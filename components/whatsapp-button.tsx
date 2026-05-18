"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/8619582480671?text=Bonjour%20Yarnel%2C%20j'aimerais%20un%20devis."
      target="_blank"
      rel="noreferrer"
      aria-label="Discuter sur WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 18 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-glow ring-1 ring-white/30 hover:bg-[#1ebe5b] sm:bottom-7 sm:right-7"
    >
      <span className="relative grid h-8 w-8 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
        <MessageCircle className="relative h-5 w-5" />
      </span>
      <span className="hidden sm:inline">Parler à un agent</span>
    </motion.a>
  );
}
