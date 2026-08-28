import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';
import { CartView } from '@/components/commerce/CartView';
import { CommercePageShell } from '@/components/commerce/CommercePageShell';
import styles from '@/components/commerce/commerce.module.css';

export const metadata: Metadata = {
  title: 'Sua sacola demonstrativa',
  description: 'Revise itens e valores fictícios da demonstração HEAL. Nenhum pagamento será processado.',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <CommercePageShell>
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Sacola demonstrativa' }]} />
      <header className={styles.pageIntro}>
        <p className={styles.eyebrow}>SACOLA · DEMONSTRAÇÃO</p>
        <h1>Sua sacola demonstrativa</h1>
        <p>Revise itens e quantidades. Valores, estoque e entrega são fictícios.</p>
      </header>
      <CartView />
    </CommercePageShell>
  );
}
