import type { Metadata } from 'next';
import './globals.css';

const configuredOrigin = process.env.SITE_ORIGIN;
let metadataBase: URL | undefined;

if (configuredOrigin) {
  try {
    const parsedOrigin = new URL(configuredOrigin);
    if (parsedOrigin.protocol === 'https:' || parsedOrigin.hostname === 'localhost') {
      metadataBase = parsedOrigin;
    }
  } catch {
    metadataBase = undefined;
  }
}

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'HEAL — Incensos para marcar a passagem',
    template: '%s — HEAL',
  },
  description:
    'HEALS são os incensos da HEAL: escolha pela atmosfera e entenda pela matéria. Experiência demonstrativa.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'HEAL — Incensos para acender um intervalo',
    description: 'HEALS são os incensos da HEAL. Escolha pela atmosfera. Entenda pela matéria.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEAL — Incensos para acender um intervalo',
    description: 'HEALS são os incensos da HEAL. Escolha pela atmosfera. Entenda pela matéria.',
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
