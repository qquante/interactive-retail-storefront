import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';
import { CommercePageShell } from '@/components/commerce/CommercePageShell';
import { ProductCard } from '@/components/commerce/ProductCard';
import styles from '@/components/commerce/commerce.module.css';
import { fixtureCommerce } from '@/lib/commerce';

type PageProps = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ ordem?: string; disponibilidade?: string }>;
};

export async function generateStaticParams() {
  return [{ handle: 'intervalos' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const result = await fixtureCommerce.getCollectionByHandle(handle);
  if (!result.ok) return { title: 'Coleção não encontrada', robots: { index: false, follow: false } };
  return {
    title: 'Intervalos — coleção demonstrativa de incensos',
    description: 'Veja como a HEAL organiza a escolha de incensos. Produtos e valores são fictícios e nenhum pagamento é processado.',
    robots: { index: false, follow: true },
  };
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const { handle } = await params;
  const { ordem, disponibilidade } = await searchParams;
  const collectionResult = await fixtureCommerce.getCollectionByHandle(handle);
  if (!collectionResult.ok) notFound();

  const allowedSort = ordem === 'price_asc' || ordem === 'price_desc' || ordem === 'title_asc' ? ordem : 'featured';
  const productsResult = await fixtureCommerce.listProducts(
    { collectionHandle: handle, sort: allowedSort },
    { limit: 24 },
  );
  const allowedAvailability = disponibilidade === 'confirmada' || disponibilidade === 'desconhecida' ? disponibilidade : 'todas';
  const products = productsResult.ok
    ? productsResult.data.items.filter((product) => {
        if (allowedAvailability === 'todas') return true;
        const status = product.variants[0]?.inventory.status;
        return allowedAvailability === 'confirmada' ? status === 'in_stock' : status === 'unknown';
      })
    : null;
  const productCountLabel = products ? `${products.length} ${products.length === 1 ? 'produto demonstrativo' : 'produtos demonstrativos'}` : '';

  return (
    <CommercePageShell>
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Coleções', href: '/colecoes' }, { label: 'Intervalos' }]} />
      <header className={styles.pageIntro}>
        <p className={styles.eyebrow}>COLEÇÃO DEMONSTRATIVA</p>
        <h1>Intervalos</h1>
        <p>Uma coleção fictícia para validar comparação, filtros e caminho de compra. Nenhum nome, atributo ou condição representa produto real da HEAL.</p>
        {products ? <p><strong>{productCountLabel}</strong></p> : null}
      </header>
      {products ? (
        <>
          <form className={styles.controls} method="get">
            <p role="status">{products.length} {products.length === 1 ? 'produto exibido' : 'produtos exibidos'}</p>
            <label className={styles.field} htmlFor="sort-products">
              Ordenar produtos
              <select id="sort-products" name="ordem" defaultValue={allowedSort}>
                <option value="featured">Destaques</option>
                <option value="price_asc">Menor valor demonstrativo</option>
                <option value="price_desc">Maior valor demonstrativo</option>
                <option value="title_asc">Nome de A a Z</option>
              </select>
            </label>
            <label className={styles.field} htmlFor="filter-availability">
              Disponibilidade demonstrativa
              <select id="filter-availability" name="disponibilidade" defaultValue={allowedAvailability}>
                <option value="todas">Todas</option>
                <option value="confirmada">Confirmada na fixture</option>
                <option value="desconhecida">Não confirmada</option>
              </select>
            </label>
            <button className={styles.secondaryButton} type="submit">Aplicar ordenação</button>
          </form>
          <div className={styles.collectionGrid}>
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </>
      ) : (
        <section className={styles.warning} role="alert">
          <h2>Não foi possível carregar os produtos.</h2>
          <p>Seus parâmetros de navegação foram preservados. Tente novamente ou volte às coleções.</p>
          <p><Link href={`/colecoes/${handle}?ordem=${allowedSort}&disponibilidade=${allowedAvailability}`}>Tentar novamente</Link> · <Link href="/colecoes">Ver todas as coleções</Link></p>
        </section>
      )}
    </CommercePageShell>
  );
}
