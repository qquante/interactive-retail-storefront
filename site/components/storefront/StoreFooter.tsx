import Link from "next/link";
import { HealBrand } from "@/components/brand";
import styles from "./storefront.module.css";
export function StoreFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <Link href="/" aria-label="HEAL — início">
            <HealBrand className="brand-lockup" />
          </Link>
          <p>Incensos para estar presente.</p>
          <span>HEALS são os incensos da HEAL.</span>
        </div>
        <nav aria-label="Explore">
          <h2>Explore</h2>
          <Link href="/colecoes/heals">Todos os incensos</Link>
          <Link href="/como-escolher">Como escolher</Link>
          <Link href="/sobre">A HEAL</Link>
          <Link href="/profissionais">Profissionais</Link>
        </nav>
        <nav aria-label="Atendimento">
          <h2>Podemos ajudar?</h2>
          <Link href="/contato">Atendimento</Link>
          <Link href="/entrega-trocas">Entrega e trocas</Link>
          <Link href="/seguranca">Cuidados de uso</Link>
          <Link href="/materia">Sobre os bastões</Link>
        </nav>
      </div>
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} HEAL</p>
        <nav aria-label="Informações legais">
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/termos">Termos de uso</Link>
        </nav>
        <p>Vendas online em preparação. Imagens ilustrativas dos produtos.</p>
      </div>
    </footer>
  );
}
