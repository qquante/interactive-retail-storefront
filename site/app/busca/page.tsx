import type { Metadata } from "next";
import Link from "next/link";
import { CommercePageShell } from "@/components/commerce/CommercePageShell";
import { ProductCard } from "@/components/commerce/ProductCard";
import commerceStyles from "@/components/commerce/commerce.module.css";
import editorialStyles from "@/components/editorial/EditorialPage.module.css";
import { fixtureCommerce } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "Buscar incensos",
  description: "Busque a coleção de incensos HEALS por aroma ou nome.",
  robots: { index: false, follow: true },
};

const healthPattern =
  /\b(cura|curar|ansiedade|ins[oô]nia|depress[aã]o|sa[uú]de|tratar|tratamento|estresse)\b/i;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cursor?: string }>;
}) {
  const { q = "", cursor } = await searchParams;
  const query = q.trim().slice(0, 100);
  const requestedCursor =
    typeof cursor === "string" && cursor.length <= 200 ? cursor : undefined;
  const result = await fixtureCommerce.listProducts(
    { search: query || undefined },
    { limit: 24, cursor: requestedCursor },
  );
  const products = result?.ok ? result.data.items : null;
  const nextCursor = result?.ok ? result.data.nextCursor : null;
  const firstPageHref = `/busca?q=${encodeURIComponent(query)}`;
  const nextPageHref = nextCursor
    ? `${firstPageHref}&cursor=${encodeURIComponent(nextCursor)}`
    : null;
  const asksForHealth = healthPattern.test(query);

  return (
    <CommercePageShell>
      <header className={commerceStyles.pageIntro}>
        <p className={commerceStyles.eyebrow}>BUSCA HEAL</p>
        <h1>Encontre seu incenso.</h1>
        <p>Procure pelo nome do aroma ou explore a coleção abaixo.</p>
        <form
          className={editorialStyles.searchForm}
          action="/busca"
          method="get"
        >
          <label htmlFor="q">O que você procura?</label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Ex.: Canela, Mirra, Olíbano"
            maxLength={100}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      {asksForHealth ? (
        <div className={commerceStyles.warning} role="note">
          A HEAL não recomenda incensos para tratar sintomas ou condições de
          saúde. Você pode explorar informações de produto, uso e segurança
          quando estiverem validadas.
        </div>
      ) : null}

      {products ? (
        products.length > 0 ? (
          <section aria-labelledby="search-results-title">
            <h2 id="search-results-title">
              {query
                ? `${products.length} ${products.length === 1 ? "resultado" : "resultados"} para “${query}”`
                : "Explore a coleção"}
            </h2>
            <div className={commerceStyles.collectionGrid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {requestedCursor || nextPageHref ? (
              <nav
                className={commerceStyles.actionRow}
                aria-label="Paginação da busca"
              >
                {requestedCursor ? (
                  <Link
                    className={commerceStyles.secondaryButton}
                    href={firstPageHref}
                  >
                    Voltar à primeira página
                  </Link>
                ) : null}
                {nextPageHref ? (
                  <Link
                    className={commerceStyles.primaryButton}
                    href={nextPageHref}
                  >
                    Ver próximos resultados
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </section>
        ) : (
          <section className={commerceStyles.emptyState}>
            <h2>Nenhum resultado para “{query}”.</h2>
            <p>Verifique a escrita ou explore a coleção de estreia.</p>
            <Link
              className={commerceStyles.primaryButton}
              href="/colecoes/heals"
            >
              Ver coleção
            </Link>
          </section>
        )
      ) : null}

      {query && result && !result.ok ? (
        <section className={commerceStyles.warning} role="alert">
          <h2>A busca não respondeu.</h2>
          <p>Sua consulta foi preservada.</p>
          <Link href={`/busca?q=${encodeURIComponent(query)}`}>
            Tentar novamente
          </Link>
        </section>
      ) : null}
    </CommercePageShell>
  );
}
