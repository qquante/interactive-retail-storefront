import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AddToCartForm } from '@/components/commerce/AddToCartForm';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';
import { CommercePageShell } from '@/components/commerce/CommercePageShell';
import { ProductPlaceholder } from '@/components/commerce/ProductPlaceholder';
import { inventoryLabel } from '@/components/commerce/ProductCard';
import styles from '@/components/commerce/commerce.module.css';
import { fixtureCommerce, formatMoney } from '@/lib/commerce';

type PageProps = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  return [{ handle: 'intervalo-01' }, { handle: 'intervalo-02' }, { handle: 'intervalo-03' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const result = await fixtureCommerce.getProductByHandle(handle);
  if (!result.ok) return { title: 'Produto não encontrado', robots: { index: false, follow: false } };
  return {
    title: result.data.title,
    description: 'Produto fictício usado para validar a experiência de uma loja de incensos. Nenhuma informação comercial ou material é real.',
    robots: { index: false, follow: true },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const result = await fixtureCommerce.getProductByHandle(handle);
  if (!result.ok) notFound();
  const product = result.data;
  const variant = product.variants[0];
  if (!variant) notFound();

  return (
    <CommercePageShell>
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Intervalos', href: '/colecoes/intervalos' }, { label: product.title }]} />
      <div className={styles.productLayout}>
        <ProductPlaceholder sequence={product.handle.replace('intervalo-', '')} />
        <section className={styles.buyPanel} aria-labelledby="product-title">
          <p className={styles.eyebrow}>INCENSO · DEMONSTRAÇÃO</p>
          <h1 id="product-title">{product.title}</h1>
          <p>Produto fictício criado para testar leitura, comparação e compra. Os campos abaixo mostram a estrutura esperada; não descrevem um incenso real.</p>
          <dl className={styles.sensoryList}>
            <div><dt>Família aromática</dt><dd>[A VALIDAR]</dd></div>
            <div><dt>Notas percebidas</dt><dd>[A VALIDAR]</dd></div>
            <div><dt>Intensidade percebida</dt><dd>[A VALIDAR conforme método]</dd></div>
            <div><dt>Nível de fumaça</dt><dd>[A VALIDAR conforme método]</dd></div>
          </dl>
          <p><strong>Opção:</strong> {variant.title}</p>
          <p className={styles.price}>Valor demonstrativo — {formatMoney(variant.price.current)}</p>
          <p className={styles.availability}>Disponibilidade demonstrativa — {inventoryLabel(product)}</p>
          <AddToCartForm variantId={variant.id} productTitle={product.title} inventoryStatus={variant.inventory.status} />
        </section>
      </div>

      <section className={styles.proofSection} aria-labelledby="facts-title">
        <p className={styles.eyebrow}>PROVA ANTES DA POESIA</p>
        <h2 id="facts-title">O que sabemos sobre este produto</h2>
        <dl className={styles.factsList}>
          <div><dt>Formato</dt><dd>[A VALIDAR]</dd></div>
          <div><dt>Composição</dt><dd>[A VALIDAR]</dd></div>
          <div><dt>Origem de fabricação</dt><dd>[A VALIDAR]</dd></div>
          <div><dt>Origem de ingredientes</dt><dd>[A VALIDAR]</dd></div>
          <div><dt>Quantidade</dt><dd>[A VALIDAR]</dd></div>
          <div><dt>Dimensões</dt><dd>[A VALIDAR]</dd></div>
          <div><dt>Tempo aproximado de queima</dt><dd>[A VALIDAR]</dd></div>
        </dl>
        <p>Nenhum destes campos descreve um produto real até que a HEAL registre fonte, escopo e data de validação.</p>
      </section>
      <section className={styles.proofSection} aria-labelledby="safety-title">
        <h2 id="safety-title">Uso e segurança [A VALIDAR por produto]</h2>
        <p className={styles.warning}><strong>Demonstração:</strong> as instruções de uso e segurança deste produto ainda não foram fornecidas nem validadas. Este protótipo não deve ser usado como orientação de uso.</p>
      </section>
      <section className={styles.proofSection} aria-labelledby="policies-title">
        <h2 id="policies-title">Entrega, trocas e devoluções [A VALIDAR]</h2>
        <p>As condições comerciais da HEAL ainda não foram definidas. O texto final deve informar prazos, custos, cobertura, processo, exceções e contato reais.</p>
      </section>
    </CommercePageShell>
  );
}
