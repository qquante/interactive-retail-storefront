import Link from "next/link";
import { getHealVariant } from "@/lib/brand/air-variants";
import type { Product } from "@/lib/commerce";
import { ProductMedia } from "./ProductMedia";
import styles from "./commerce.module.css";
export function inventoryLabel(product: Product): string {
  if (product.provenance.mode === "fixture") return "Lançamento em preparação";
  const status = product.variants[0]?.inventory.status ?? "unknown";
  return status === "out_of_stock"
    ? "Indisponível"
    : status === "unknown"
      ? "Lançamento em preparação"
      : "Disponível";
}
export function ProductCard({ product }: { product: Product }) {
  const visual = getHealVariant(product.handle);
  return (
    <article className={styles.productCard}>
      <Link
        href={`/produtos/${product.handle}`}
        prefetch={false}
        className={styles.cardImageLink}
        aria-label={`Ver ${visual?.name ?? product.title}`}
      >
        <ProductMedia product={product} caption={false} />
        <span className={styles.cardImageAction} aria-hidden="true">
          Conhecer <span>↗</span>
        </span>
      </Link>
      <p className={styles.eyebrow}>INCENSO EM BASTÃO</p>
      <h2 className={styles.cardTitle}>
        <Link href={`/produtos/${product.handle}`} prefetch={false}>
          {visual?.name ?? product.title}
        </Link>
      </h2>
      <p className={styles.cardAvailability}>{inventoryLabel(product)}</p>
    </article>
  );
}
