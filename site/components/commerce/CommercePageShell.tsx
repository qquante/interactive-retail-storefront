import type { ReactNode } from "react";
import { StoreHeader } from "@/components/storefront/StoreHeader";
import { StoreFooter } from "@/components/storefront/StoreFooter";
import styles from "./commerce.module.css";
export function CommercePageShell({
  children,
}: {
  children: ReactNode;
  minimal?: boolean;
}) {
  return (
    <div className={styles.pageShell}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <StoreHeader />
      <main className={styles.main} id="conteudo">
        {children}
      </main>
      <StoreFooter />
    </div>
  );
}
