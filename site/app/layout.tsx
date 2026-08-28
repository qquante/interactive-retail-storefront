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
    default: 'HEAL. CURA. — Incensos para marcar a passagem',
    template: '%s — HEAL. CURA.',
  },
  description:
    'Incensos para escolher pela atmosfera e entender pela matéria. Experiência demonstrativa da HEAL. CURA.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'HEAL. CURA. — Incensos para acender um intervalo',
    description: 'Escolha pela atmosfera. Entenda pela matéria.',
    ...(metadataBase
      ? { images: [{ url: '/og.png', width: 1200, height: 630, alt: 'HEAL. CURA. — Incensos para acender um intervalo.' }] }
      : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEAL. CURA. — Incensos para acender um intervalo',
    description: 'Escolha pela atmosfera. Entenda pela matéria.',
    ...(metadataBase ? { images: ['/og.png'] } : {}),
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
