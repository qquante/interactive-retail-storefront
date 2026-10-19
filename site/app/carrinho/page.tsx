import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';
import { CommercePageShell } from '@/components/commerce/CommercePageShell';
import styles from '@/components/commerce/commerce.module.css';

export const metadata: Metadata = {
  title: 'Sacola — loja em preparação',
  description: 'A sacola HEAL será aberta junto com a operação de vendas online.',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <CommercePageShell>
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Sacola' }]} />
      <header className={styles.pageIntro}>
        <p className={styles.eyebrow}>LOJA EM PREPARAÇÃO</p>
        <h1>A sacola abre com a loja.</h1>
        <p>Preço, estoque, entrega e pagamento só entram no ar quando a operação comercial estiver pronta.</p>
        <p><Link className={styles.primaryButton} href="/colecoes/heals">Conhecer a coleção de estreia</Link></p>
      </header>
    </CommercePageShell>
  );
}
