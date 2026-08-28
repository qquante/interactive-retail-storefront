import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';
import { CommercePageShell } from '@/components/commerce/CommercePageShell';
import styles from '@/components/commerce/commerce.module.css';
import { fixtureCommerce } from '@/lib/commerce';

export const metadata: Metadata = {
  title: 'Coleções demonstrativas de incensos',
  description: 'Conheça a estrutura demonstrativa de coleções da HEAL. Produtos e condições não são reais.',
  robots: { index: false, follow: true },
};

export default async function CollectionsPage() {
  const result = await fixtureCommerce.listCollections({ limit: 24 });
  const collections = result.ok ? result.data.items : [];

  return (
    <CommercePageShell>
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Coleções' }]} />
      <header className={styles.pageIntro}>
        <p className={styles.eyebrow}>COLEÇÕES · DEMONSTRAÇÃO</p>
        <h1>Escolha com contexto.</h1>
        <p>Estas coleções existem apenas para validar navegação e comparação. Nenhum atributo representa um catálogo real.</p>
      </header>
      <div className={styles.collectionGrid}>
        {collections.map((collection) => (
          <article className={styles.productCard} key={collection.id}>
            <p className={styles.eyebrow}>COLEÇÃO DEMONSTRATIVA</p>
            <h2 className={styles.cardTitle}>{collection.title}</h2>
            <p>{collection.description}</p>
            <p>{collection.productCount} produtos demonstrativos</p>
            <Link className={styles.secondaryButton} href={`/colecoes/${collection.handle}`}>Explorar coleção</Link>
          </article>
        ))}
      </div>
    </CommercePageShell>
  );
}

