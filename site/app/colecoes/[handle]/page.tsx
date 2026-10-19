import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { CommercePageShell } from "@/components/commerce/CommercePageShell";
import { ProductCard } from "@/components/commerce/ProductCard";
import styles from "@/components/commerce/commerce.module.css";
import { fixtureCommerce } from "@/lib/commerce";

type PageProps = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{
    ordem?: string;
    disponibilidade?: string;
    cursor?: string;
  }>;
};

export async function generateStaticParams() {
  return [{ handle: "heals" }];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const result = await fixtureCommerce.getCollectionByHandle(handle);
  if (!result.ok)
    return {
      title: "Coleção não encontrada",
      robots: { index: false, follow: false },
    };
  return {
    title: "Incensos · Coleção HEALS",
    description:
      "Conheça Canela, Lavanda Celestial, Mirra, Olíbano e Alecrim, a coleção de estreia dos incensos HEALS.",
    robots: { index: false, follow: true },
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: PageProps) {
  const { handle } = await params;
  const { ordem, disponibilidade, cursor } = await searchParams;
  const collectionResult = await fixtureCommerce.getCollectionByHandle(handle);
  if (!collectionResult.ok) notFound();

  const allowedSort = ordem === "title_asc" ? ordem : "featured";
  const requestedCursor =
    typeof cursor === "string" && cursor.length <= 200 ? cursor : undefined;
  const productsResult = await fixtureCommerce.listProducts(
    { collectionHandle: handle, sort: allowedSort },
    { limit: 24, cursor: requestedCursor },
  );
  const allowedAvailability =
    disponibilidade === "todas" ? disponibilidade : "todas";
  const products = productsResult.ok ? productsResult.data.items : null;
  const nextCursor = productsResult.ok ? productsResult.data.nextCursor : null;
  const productCountLabel = products
    ? `${products.length} ${products.length === 1 ? "incenso" : "incensos"}`
    : "";
  const firstPageHref = `/colecoes/${encodeURIComponent(handle)}?ordem=${allowedSort}`;
  const nextPageHref = nextCursor
    ? `${firstPageHref}&cursor=${encodeURIComponent(nextCursor)}`
    : null;

  return (
    <CommercePageShell>
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Incensos" }]}
      />
      <header className={styles.pageIntro}>
        <p className={styles.eyebrow}>HEALS · OS INCENSOS DA HEAL</p>
        <h1>Encontre seu aroma.</h1>
        <p>
          Canela, Lavanda Celestial, Mirra, Olíbano e Alecrim. Explore os
          incensos da coleção e escolha por onde começar.
        </p>
      </header>
      {products ? (
        <>
          <form className={styles.controls} method="get">
            <p role="status">{productCountLabel} na coleção</p>
            <label className={styles.field} htmlFor="sort-products">
              Organizar coleção
              <select
                id="sort-products"
                name="ordem"
                defaultValue={allowedSort}
              >
                <option value="featured">Ordem da coleção</option>
                <option value="title_asc">Nome de A a Z</option>
              </select>
            </label>
            <input
              type="hidden"
              name="disponibilidade"
              value={allowedAvailability}
            />
            <button className={styles.secondaryButton} type="submit">
              Organizar
            </button>
          </form>
          <div className={styles.collectionGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {requestedCursor || nextPageHref ? (
            <nav className={styles.actionRow} aria-label="Paginação da coleção">
              {requestedCursor ? (
                <Link className={styles.secondaryButton} href={firstPageHref}>
                  Voltar à primeira página
                </Link>
              ) : null}
              {nextPageHref ? (
                <Link className={styles.primaryButton} href={nextPageHref}>
                  Ver próximos incensos
                </Link>
              ) : null}
            </nav>
          ) : null}
        </>
      ) : (
        <section className={styles.warning} role="alert">
          <h2>Não foi possível carregar os produtos.</h2>
          <p>
            Seus parâmetros de navegação foram preservados. Tente novamente ou
            volte às coleções.
          </p>
          <p>
            <Link href={`/colecoes/${handle}?ordem=${allowedSort}`}>
              Tentar novamente
            </Link>{" "}
            · <Link href="/colecoes">Ver todas as coleções</Link>
          </p>
        </section>
      )}
    </CommercePageShell>
  );
}
