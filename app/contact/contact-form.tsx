"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Form = { name: string; email: string; phone: string; message: string };

const initial: Form = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const [data, setData] = useState<Form>(initial);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((prev) => ({ ...prev, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mt-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded-2xl border border-electric/30 bg-electric/5 p-8"
          >
            <CheckCircle2 className="h-10 w-10 text-electric" />
            <h3 className="mt-4 text-2xl font-bold text-navy">
              Message bien reçu
            </h3>
            <p className="mt-2 max-w-md text-sm text-navy/70">
              Merci {data.name || "à vous"}, un agent francophone vous répond
              sous 4h ouvrées. Pour aller plus vite, n'hésitez pas à nous écrire
              directement sur WhatsApp.
            </p>
            <Button
              variant="outlineDark"
              className="mt-6"
              onClick={() => {
                setSubmitted(false);
                setData(initial);
              }}
            >
              Envoyer un autre message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="space-y-5 rounded-2xl border border-navy/10 bg-white p-6 shadow-card lg:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  required
                  value={data.name}
                  onChange={set("name")}
                  placeholder="Ex. Aïcha Diop"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Email professionnel</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={data.email}
                  onChange={set("email")}
                  placeholder="vous@entreprise.com"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Téléphone / WhatsApp</Label>
              <Input
                id="phone"
                value={data.phone}
                onChange={set("phone")}
                placeholder="+221 …"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="message">Votre message</Label>
              <Textarea
                id="message"
                required
                value={data.message}
                onChange={set("message")}
                placeholder="Décrivez votre projet, le type de marchandise et la destination souhaitée."
                className="mt-2"
              />
            </div>

            <div className="flex flex-col items-start gap-3 border-t border-navy/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-navy/55">
                En envoyant ce formulaire, vous acceptez d'être recontacté par
                un agent Yarnel.
              </p>
              <Button type="submit" size="lg">
                Envoyer <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
