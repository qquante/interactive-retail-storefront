"use client";
import Link from "next/link";
import { useState } from "react";
import { HealBrand } from "@/components/brand";
import { Drawer, Dialog } from "@/components/ui/Overlay";
import styles from "./storefront.module.css";

const links = [
  ["Incensos", "/colecoes/heals"],
  ["Como escolher", "/como-escolher"],
  ["A HEAL", "/sobre"],
  ["Profissionais", "/profissionais"],
];
export function StoreHeader({ dark = false }: { dark?: boolean }) {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  return (
    <>
      <header className={`${styles.header} ${dark ? styles.headerDark : ""}`}>
        <Link href="/" aria-label="HEAL — início" className={styles.logo}>
          <HealBrand className="brand-lockup" />
        </Link>
        <nav className={styles.desktopNav} aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <Link key={href} href={href} prefetch={false}>
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <button
            type="button"
            onClick={() => setSearch(true)}
            aria-label="Buscar incensos"
            aria-haspopup="dialog"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
            <span className={styles.searchLabel}>Buscar</span>
          </button>
          <Link href="/contato" className={styles.contactLink}>
            Atendimento
          </Link>
          <button
            className={styles.menuButton}
            type="button"
            aria-label="Abrir menu"
            aria-haspopup="dialog"
            onClick={() => setMenu(true)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 8h18M3 16h18" />
            </svg>
          </button>
        </div>
      </header>
      <Drawer
        open={menu}
        onOpenChange={setMenu}
        title="HEAL"
        closeLabel="Fechar menu"
      >
        <nav className={styles.drawerNav} aria-label="Menu mobile">
          {[...links, ["Atendimento", "/contato"]].map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenu(false)}>
              {label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <p className={styles.drawerNote}>HEALS. Os incensos da HEAL.</p>
      </Drawer>
      <Dialog
        open={search}
        onOpenChange={setSearch}
        title="Encontre seu incenso"
        closeLabel="Fechar busca"
      >
        <form action="/busca" method="get" className={styles.searchForm}>
          <label htmlFor="header-search">Nome do aroma</label>
          <div>
            <input
              id="header-search"
              name="q"
              type="search"
              placeholder="Ex.: Canela, Mirra, Olíbano"
              maxLength={100}
            />
            <button className="button button-dark" type="submit">
              Buscar
            </button>
          </div>
        </form>
        <p className={styles.drawerNote}>Explore a coleção</p>
        <div className={styles.searchSuggestions}>
          {[
            ["Canela", "canela"],
            ["Lavanda Celestial", "lavanda-celestial"],
            ["Mirra", "mirra"],
            ["Olíbano", "olibano"],
            ["Alecrim", "alecrim"],
          ].map(([name, id]) => (
            <Link
              href={`/produtos/${id}`}
              key={id}
              onClick={() => setSearch(false)}
            >
              {name} ↗
            </Link>
          ))}
        </div>
      </Dialog>
    </>
  );
}
