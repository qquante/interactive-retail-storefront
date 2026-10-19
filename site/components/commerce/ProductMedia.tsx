import Image from "next/image";
import type { Product } from "@/lib/commerce";
import styles from "./commerce.module.css";

export function ProductMedia({
  product,
  priority = false,
  caption = true,
}: {
  product: Product;
  priority?: boolean;
  caption?: boolean;
}) {
  const image = product.featuredImage;
  if (!image) return null;

  return (
    <figure className={styles.productMedia}>
      <div className={styles.productMediaFrame}>
        <Image
          alt={image.alt}
          fill
          priority={priority}
          sizes={
            priority
              ? "(max-width: 1023px) 100vw, 60vw"
              : "(max-width: 650px) 50vw, (max-width: 1023px) 33vw, 25vw"
          }
          src={image.url}
          style={{ objectFit: "contain" }}
        />
      </div>
      {caption ? (
        <figcaption>
          Incenso em bastão
          {product.provenance.mode === "fixture" ? " · imagem ilustrativa" : ""}
        </figcaption>
      ) : null}
    </figure>
  );
}
