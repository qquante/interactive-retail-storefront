import Link from 'next/link';
import type { ReactNode } from 'react';
import { CartLink } from './CartLink';
import { DemoBanner } from './DemoBanner';
import styles from './commerce.module.css';

export function CommercePageShell({
  children,
  minimal = false,
}: {
  children: ReactNode;
  minimal?: boolean;
}) {
  return (
    <div className={styles.pageShell}>
      <a className={styles.skipLink} href="#conteudo">
        Pular para o conteúdo
      </a>
      <DemoBanner />
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/" aria-label="HEAL. CURA. — início">
          <span>HEAL.</span>
          <span>CURA.</span>
        </Link>
        {minimal ? (
          <Link className={styles.headerLink} href="/carrinho">
            Voltar à sacola
          </Link>
        ) : (
          <>
            <nav className={styles.nav} aria-label="Navegação principal">
              <Link href="/colecoes/intervalos">Comprar</Link>
              <Link href="/como-escolher" prefetch={false}>Como escolher</Link>
              <Link href="/materia" prefetch={false}>Matéria</Link>
              <Link href="/busca" prefetch={false}>Buscar</Link>
            </nav>
            <div className={styles.headerLink}>
              <CartLink />
            </div>
          </>
        )}
      </header>
      <main className={styles.main} id="conteudo">
        {children}
      </main>
      <footer className={styles.footer}>
        <p>HEAL. CURA. · Heal Incensos</p>
        <p>Estrutura comercial em demonstração; operação, políticas e atendimento ainda não foram definidos.</p>
        <p><Link href="/sobre">Sobre</Link> · <Link href="/seguranca">Segurança</Link> · <Link href="/entrega-trocas">Entrega e trocas</Link> · <Link href="/privacidade">Privacidade</Link> · <Link href="/termos">Termos</Link> · <Link href="/contato">Contato</Link></p>
      </footer>
    </div>
  );
}
