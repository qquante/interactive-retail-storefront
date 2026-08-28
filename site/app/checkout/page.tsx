import type { Metadata } from 'next';
import { CheckoutHandoff } from '@/components/commerce/CheckoutHandoff';
import { CommercePageShell } from '@/components/commerce/CommercePageShell';
import styles from '@/components/commerce/commerce.module.css';

export const metadata: Metadata = {
  title: 'Handoff demonstrativo',
  description: 'Revisão do fluxo demonstrativo da HEAL. Nenhum pedido ou pagamento será criado.',
  robots: { index: false, follow: false, nocache: true },
};

export default function CheckoutPage() {
  return (
    <CommercePageShell minimal>
      <header className={`${styles.pageIntro} ${styles.handoff}`}>
        <p className={styles.eyebrow}>DEMONSTRAÇÃO</p>
        <h1>Revise o fim deste fluxo.</h1>
      </header>
      <CheckoutHandoff />
    </CommercePageShell>
  );
}
