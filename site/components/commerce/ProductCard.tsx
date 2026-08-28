import Link from 'next/link';
import { formatMoney, type Product } from '@/lib/commerce';
import { ProductPlaceholder } from './ProductPlaceholder';
import styles from './commerce.module.css';

export function inventoryLabel(product: Product): string {
  const status = product.variants[0]?.inventory.status ?? 'unknown';
  if (status === 'out_of_stock') return 'Indisponível nesta demonstração';
  if (status === 'unknown') return 'Disponibilidade não confirmada — compra bloqueada';
  return 'Disponível nesta demonstração';
}

export function ProductCard({ product }: { product: Product }) {
  const variant = product.variants[0];
  const sequence = product.handle.replace('intervalo-', '');
  return (
    <article className={styles.productCard}>
      <Link href={`/produtos/${product.handle}`} prefetch={false} aria-label={`Ver ${product.title}`}>
        <ProductPlaceholder sequence={sequence} />
      </Link>
      <p className={styles.eyebrow}>INCENSO · DEMONSTRAÇÃO</p>
      <h2 className={styles.cardTitle}>
        <Link href={`/produtos/${product.handle}`} prefetch={false}>{product.title}</Link>
      </h2>
      <dl className={styles.compactFacts}>
        <div><dt>Família aromática</dt><dd>[A VALIDAR]</dd></div>
        <div><dt>Notas percebidas</dt><dd>[A VALIDAR]</dd></div>
        <div><dt>Intensidade</dt><dd>[A VALIDAR]</dd></div>
        <div><dt>Nível de fumaça</dt><dd>[A VALIDAR]</dd></div>
      </dl>
      <p className={styles.price}>Valor demonstrativo — {variant ? formatMoney(variant.price.current) : 'indisponível'}</p>
      <p className={styles.availability}>{inventoryLabel(product)}</p>
      <Link className={styles.secondaryButton} href={`/produtos/${product.handle}`} prefetch={false}>
        Ver produto demonstrativo
      </Link>
    </article>
  );
}
