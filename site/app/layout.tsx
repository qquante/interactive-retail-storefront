import type { Metadata } from "next";
import "./globals.css";

const configuredOrigin = process.env.SITE_ORIGIN;
let metadataBase: URL | undefined;

if (configuredOrigin) {
  try {
    const parsedOrigin = new URL(configuredOrigin);
    if (
      parsedOrigin.protocol === "https:" ||
      parsedOrigin.hostname === "localhost"
    ) {
      metadataBase = parsedOrigin;
    }
  } catch {
    metadataBase = undefined;
  }
}

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "HEAL — Incensos para estar presente",
    template: "%s — HEAL",
  },
  description:
    "Conheça os incensos HEALS: Canela, Lavanda Celestial, Mirra, Olíbano e Alecrim. Encontre seu aroma na HEAL.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "HEAL — Incensos para estar presente",
    description: "HEALS são os incensos da HEAL. Encontre seu aroma.",
    images: [
      {
        url: "/images/heals/heal-incense-hero-v1.webp",
        width: 1600,
        height: 900,
        alt: "Vareta de incenso HEALS com brasa e fumaça sobre fundo escuro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HEAL — Incensos para estar presente",
    description: "HEALS são os incensos da HEAL. Encontre seu aroma.",
    images: ["/images/heals/heal-incense-hero-v1.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
