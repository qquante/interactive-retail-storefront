import type { Metadata } from 'next';
import Link from 'next/link';
import { CommercePageShell } from '@/components/commerce/CommercePageShell';
import { ProductCard } from '@/components/commerce/ProductCard';
import commerceStyles from '@/components/commerce/commerce.module.css';
import editorialStyles from '@/components/editorial/EditorialPage.module.css';
import { fixtureCommerce } from '@/lib/commerce';

export const metadata: Metadata = { title: 'Busca', description: 'Busca demonstrativa da HEAL. CURA.', robots: { index: false, follow: true } };

const healthPattern = /\b(cura|curar|ansiedade|ins[oô]nia|depress[aã]o|sa[uú]de|tratar|tratamento|estresse)\b/i;

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams;
  const query = q.trim().slice(0, 100);
  const result = query ? await fixtureCommerce.listProducts({ search: query }, { limit: 24 }) : null;
  const products = result?.ok ? result.data.items : null;
  const asksForHealth = healthPattern.test(query);

  return (
    <CommercePageShell>
      <header className={commerceStyles.pageIntro}>
        <p className={commerceStyles.eyebrow}>BUSCA · DEMONSTRAÇÃO</p>
        <h1>Buscar na HEAL</h1>
        <p>Procure por nome ou texto da fixture. Famílias, ingredientes e guias só entrarão no índice quando houver conteúdo real.</p>
        <form className={editorialStyles.searchForm} action="/busca" method="get">
          <label htmlFor="q">O que você procura?</label>
          <input id="q" name="q" defaultValue={query} placeholder="Nome, família, ingrediente ou guia" maxLength={100} />
          <button type="submit">Buscar</button>
        </form>
      </header>

      {asksForHealth ? (
        <div className={commerceStyles.warning} role="note">
          A HEAL não recomenda incensos para tratar sintomas ou condições de saúde. Você pode explorar informações de produto, uso e segurança quando estiverem validadas.
        </div>
      ) : null}

      {query && products ? (
        products.length > 0 ? (
          <section aria-labelledby="search-results-title">
            <h2 id="search-results-title">{products.length} {products.length === 1 ? 'resultado' : 'resultados'} para “{query}”</h2>
            <div className={commerceStyles.collectionGrid}>
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </section>
        ) : (
          <section className={commerceStyles.emptyState}>
            <h2>Nenhum resultado para “{query}”.</h2>
            <p>Verifique a escrita ou explore a coleção demonstrativa.</p>
            <Link className={commerceStyles.primaryButton} href="/colecoes/intervalos">Ver coleção</Link>
          </section>
        )
      ) : null}

      {query && result && !result.ok ? (
        <section className={commerceStyles.warning} role="alert">
          <h2>A busca não respondeu.</h2>
          <p>Sua consulta foi preservada.</p>
          <Link href={`/busca?q=${encodeURIComponent(query)}`}>Tentar novamente</Link>
        </section>
      ) : null}
    </CommercePageShell>
  );
}
