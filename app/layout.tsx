import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { PageTransition } from "@/components/page-transition";
import { StoreProvider } from "@/lib/store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "YarnelSourcing — Transit Chine vers Afrique",
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
    <html lang="fr" className={inter.variable}>
      <head>
        {/* Flaticon UIcons — used via <i className="fi fi-rs-..." /> */}
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-straight/css/uicons-regular-straight.css"
        />
      </head>
      <body className="min-h-screen bg-white font-sans">
        <StoreProvider>
          <Navbar />
          <PageTransition>
            <main className="min-h-screen">{children}</main>
          </PageTransition>
          <Footer />
          <ChatWidget />
        </StoreProvider>
      </body>
    </html>
  );
}
