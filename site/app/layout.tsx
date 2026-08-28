import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
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
