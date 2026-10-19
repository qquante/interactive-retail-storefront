import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { CommercePageShell } from "@/components/commerce/CommercePageShell";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { ProductCard } from "@/components/commerce/ProductCard";
import styles from "@/components/commerce/commerce.module.css";
import { HEAL_VARIANTS, getHealVariant } from "@/lib/brand/air-variants";
import { fixtureCommerce } from "@/lib/commerce";
type PageProps = { params: Promise<{ handle: string }> };
export async function generateStaticParams() {
  return HEAL_VARIANTS.map(({ id }) => ({ handle: id }));
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const visual = getHealVariant(handle);
  return {
    title: visual
      ? `${visual.name} · Incenso em bastão`
      : "Produto não encontrado",
    description: visual
      ? `Conheça ${visual.name}, da coleção de incensos HEALS. Veja a apresentação, o formato e os cuidados de uso.`
      : undefined,
    robots: { index: false, follow: true },
  };
}
export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const result = await fixtureCommerce.getProductByHandle(handle);
  if (!result.ok) notFound();
  const product = result.data;
  const visual = getHealVariant(handle);
  if (!visual) notFound();
  const related = await fixtureCommerce.listProducts({}, { limit: 5 });
  return (
    <CommercePageShell>
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Incensos", href: "/colecoes/heals" },
          { label: visual.name },
        ]}
      />
      <div className={styles.productLayout}>
        <ProductMedia product={product} priority />
        <section className={styles.buyPanel} aria-labelledby="product-title">
          <p className={styles.eyebrow}>HEALS · INCENSO EM BASTÃO</p>
          <h1 id="product-title">{visual.name}</h1>
          <p className={styles.productLead}>
            {visual.name} faz parte da coleção HEALS. Um incenso para acompanhar
            os momentos que você escolhe reservar para si e para o seu espaço.
          </p>
          <dl className={styles.sensoryList}>
            <div>
              <dt>Formato</dt>
              <dd>Incenso em bastão</dd>
            </div>
            <div>
              <dt>Coleção</dt>
              <dd>HEALS</dd>
            </div>
            <div>
              <dt>Aroma</dt>
              <dd>{visual.name}</dd>
            </div>
          </dl>
          <div className={styles.launchStatus}>
            <strong>Lançamento em preparação</strong>Este incenso ainda não está
            disponível para compra online. Preço, quantidade e ficha técnica
            serão informados na abertura.
          </div>
          <div className={styles.actionRow}>
            <Link href="/como-escolher" className={styles.primaryButton}>
              Encontre seu aroma ↗
            </Link>
            <Link href="/contato" className={styles.secondaryButton}>
              Atendimento
            </Link>
          </div>
          <div className={styles.disclosures}>
            <details>
              <summary>Sobre este incenso</summary>
              <p>
                A apresentação reúne a embalagem {visual.name} e o formato em
                bastão. As imagens são ilustrativas. Composição, quantidade por
                caixa, origem e tempo de queima serão publicados na ficha
                técnica do produto.
              </p>
            </details>
            <details>
              <summary>Uso e cuidados</summary>
              <p>
                Leia as instruções da embalagem antes de usar. Reserve um local
                ventilado e um suporte apropriado, estável e resistente ao
                calor. Nunca deixe o incenso aceso sem supervisão.
              </p>
              <p>
                <Link href="/seguranca">Ver cuidados de uso</Link>
              </p>
            </details>
            <details>
              <summary>Entrega e disponibilidade</summary>
              <p>
                Os pedidos online ainda não estão abertos. Frete, prazos e
                condições de compra serão exibidos antes da primeira venda.
              </p>
              <p>
                <Link href="/entrega-trocas">Entrega e trocas</Link>
              </p>
            </details>
          </div>
        </section>
      </div>
      {related.ok ? (
        <section
          className={styles.relatedSection}
          aria-labelledby="related-title"
        >
          <h2 id="related-title">Outros aromas para conhecer.</h2>
          <div className={styles.collectionGrid}>
            {related.data.items
              .filter((item) => item.handle !== handle)
              .map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
          </div>
        </section>
      ) : null}
    </CommercePageShell>
  );
}
