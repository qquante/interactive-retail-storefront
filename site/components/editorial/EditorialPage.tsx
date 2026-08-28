import Link from 'next/link';
import type { ReactNode } from 'react';
import { CommercePageShell } from '@/components/commerce/CommercePageShell';
import styles from './EditorialPage.module.css';

export type EditorialSection = {
  title: string;
  content: ReactNode;
};

export function EditorialPage({
  eyebrow,
  title,
  lede,
  notice,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  notice?: ReactNode;
  sections?: EditorialSection[];
  children?: ReactNode;
}) {
  return (
    <CommercePageShell>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.lede}>{lede}</p>
        {notice ? <div className={styles.notice}>{notice}</div> : null}
        {children}
      </header>
      {sections?.length ? (
        <div className={styles.sections}>
          {sections.map((section) => (
            <section className={styles.section} key={section.title}>
              <h2>{section.title}</h2>
              <div className={styles.body}>{section.content}</div>
            </section>
          ))}
        </div>
      ) : null}
      <div className={styles.actions}>
        <Link className={styles.primary} href="/colecoes/intervalos">Explorar incensos</Link>
        <Link className={styles.secondary} href="/">Voltar ao início</Link>
      </div>
    </CommercePageShell>
  );
}

