import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PageTransition } from "@/components/page-transition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["italic", "normal"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "YarnelSourcing — Transit Chine ↔ Afrique",
    template: "%s · YarnelSourcing"
  },
  description:
    "Plateforme de transit aérien et maritime entre la Chine et l'Afrique. Devis en 72h, départs hebdomadaires, accompagnement francophone sur place.",
  metadataBase: new URL("https://yarnelsourcing.com")
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white font-sans">
        <Navbar />
        <PageTransition>
          <main className="min-h-screen">{children}</main>
        </PageTransition>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
