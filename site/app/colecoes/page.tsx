import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CommercePageShell } from "@/components/commerce/CommercePageShell";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import styles from "@/components/commerce/commerce.module.css";
export const metadata: Metadata = {
  title: "Coleções de incensos",
  description: "Explore a coleção de incensos HEALS.",
  robots: { index: false, follow: true },
};
export default function CollectionsPage() {
  return (
    <CommercePageShell>
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Coleções" }]}
      />
      <section className={styles.collectionFeature}>
        <div>
          <p className={styles.eyebrow}>OS INCENSOS DA HEAL</p>
          <h1>A coleção HEALS.</h1>
          <p>
            Canela, Lavanda Celestial, Mirra, Olíbano e Alecrim. Cinco aromas
            para conhecer de perto.
          </p>
          <Link className={styles.primaryButton} href="/colecoes/heals">
            Explorar incensos ↗
          </Link>
        </div>
        <Image
          src="/images/heals/retail/collection-campaign.webp"
          alt="As cinco embalagens da coleção HEALS"
          width={1672}
          height={941}
          priority
          sizes="(max-width:700px) 100vw, 60vw"
        />
      </section>
    </CommercePageShell>
  );
}
