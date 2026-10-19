import type { Metadata } from 'next';
import Link from 'next/link';
import { CommercePageShell } from '@/components/commerce/CommercePageShell';
import styles from '@/components/commerce/commerce.module.css';

export const metadata: Metadata = {
  title: 'Checkout — loja em preparação',
  description: 'O checkout HEAL será disponibilizado somente quando vendas e pagamentos estiverem ativos.',
  robots: { index: false, follow: false, nocache: true },
};

export default function CheckoutPage() {
  return (
    <CommercePageShell>
      <header className={`${styles.pageIntro} ${styles.handoff}`}>
        <p className={styles.eyebrow}>CHECKOUT INDISPONÍVEL</p>
        <h1>Nenhum pagamento começa aqui.</h1>
        <p>A loja ainda está em preparação. Quando abrir, o checkout exibirá preço final, entrega, políticas e provedor antes de qualquer confirmação.</p>
        <p><Link className={styles.primaryButton} href="/colecoes/heals">Voltar aos incensos</Link></p>
      </header>
    </CommercePageShell>
  );
}
