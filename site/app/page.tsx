import Link from 'next/link';
import { CartLink } from '@/components/commerce/CartLink';
import { ProductCard } from '@/components/commerce/ProductCard';
import { EditorialSeamReveal } from '@/components/motion';
import { EmberSmokeScene } from '@/components/three';
import { fixtureCommerce } from '@/lib/commerce';

const navItems = [
  { href: '/colecoes/intervalos', label: 'Incensos' },
  { href: '/como-escolher', label: 'Como escolher' },
  { href: '/materia', label: 'Matéria' },
];

export default async function Home() {
  const productResult = await fixtureCommerce.listProducts(
    { collectionHandle: 'intervalos' },
    { limit: 3 },
  );
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <div className="demo-banner" role="region" aria-label="Aviso de demonstração">
        <span>Demonstração — produtos, valores, estoque e frete fictícios</span>
        <span>Nenhum pagamento será processado</span>
      </div>

      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="HEAL — início">
          <span>HEAL</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="search-link" href="/busca" prefetch={false}>Buscar</Link>
          <CartLink />
        </div>

        <details className="mobile-menu">
          <summary>Menu</summary>
          <nav aria-label="Navegação móvel">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <Link href="/busca" prefetch={false}>Buscar</Link>
          </nav>
        </details>
      </header>

      <main id="conteudo">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">HEALS — os incensos da HEAL · ritual contemporâneo</p>
              <h1 id="hero-title">Acenda o intervalo.</h1>
              <p className="hero-lead">
                Incensos para escolher pela atmosfera — e entender pela matéria.
                A beleza chama. A informação sustenta a escolha.
              </p>
              <div className="hero-actions">
                <Link className="button button-light" href="/colecoes/intervalos">
                  Explorar incensos
                </Link>
              <Link className="editorial-link" href="/como-escolher" prefetch={false}>
                  Como escolher
              </Link>
              </div>
              <dl className="hero-proof" aria-label="Princípios da experiência HEAL">
                <div>
                  <dt>Escolha</dt>
                  <dd>por matéria e momento</dd>
                </div>
                <div>
                  <dt>Prova</dt>
                  <dd>junto da poesia</dd>
                </div>
                <div>
                  <dt>Ritual</dt>
                  <dd>sem promessas de cura</dd>
                </div>
              </dl>
            </div>

            <figure className="hero-visual">
              <EmberSmokeScene className="hero-three" />
              <figcaption>Assinatura sensorial demonstrativa — a compra não depende da cena.</figcaption>
            </figure>
          </div>
          <EditorialSeamReveal className="transition-seam" />
        </section>

        <section className="choice-section" id="escolher" aria-labelledby="choice-title">
          <div className="section-heading">
            <p className="eyebrow eyebrow-dark">Comece pelo que faz sentido</p>
            <h2 id="choice-title">Duas portas para a mesma pausa.</h2>
            <p>
              Explore por matéria quando já conhece seu repertório. Comece pelo
              momento quando ainda procura palavras para a atmosfera.
            </p>
          </div>

          <div className="choice-grid">
            <Link className="choice-card choice-card-matter" href="/colecoes/intervalos" id="materia">
              <span className="card-index">01</span>
              <span className="card-kicker">Por matéria</span>
              <strong>Madeiras, resinas e folhas</strong>
              <span className="card-copy">
                Famílias conceituais. Composição e origem aguardam catálogo real.
              </span>
              <span className="card-cta">Explorar famílias →</span>
            </Link>

            <Link className="choice-card choice-card-moment" href="/colecoes/intervalos?entrada=momento">
              <span className="card-index">02</span>
              <span className="card-kicker">Por momento</span>
              <strong>Chegar, receber, recolher</strong>
              <span className="card-copy">
                Uma orientação editorial — nunca uma promessa de efeito terapêutico.
              </span>
              <span className="card-cta">Encontrar uma atmosfera →</span>
            </Link>
          </div>
        </section>

        <section className="home-products" aria-labelledby="home-products-title">
          <div className="home-products-heading">
            <div>
              <p className="eyebrow eyebrow-dark">HEALS — os incensos da HEAL</p>
              <h2 id="home-products-title">Intervalos.</h2>
            </div>
            <p>Três fixtures mostram como categoria, percepção, prova e compra ocuparão a mesma página — sem fingir que o catálogo já existe.</p>
          </div>
          {productResult.ok ? (
            <div className="home-product-grid">
              {productResult.data.items.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="home-product-error" role="alert">
              <p>Não foi possível carregar a coleção demonstrativa.</p>
              <Link href="/colecoes">Ver todas as coleções</Link>
            </div>
          )}
          <Link className="home-products-link" href="/colecoes/intervalos" prefetch={false}>Ver coleção demonstrativa →</Link>
        </section>

        <section className="method-strip" id="como-escolher" aria-labelledby="method-title">
          <div>
            <p className="eyebrow eyebrow-dark">Passaporte sensorial</p>
            <h2 id="method-title">Sentir também pode ser compreensível.</h2>
          </div>
          <ol>
            <li><span>01</span> Família aromática</li>
            <li><span>02</span> Intensidade percebida</li>
            <li><span>03</span> Nível de fumaça</li>
            <li><span>04</span> Uso e cuidados</li>
          </ol>
        </section>
      </main>

      <footer className="home-footer">
        <div>
          <p className="wordmark" aria-label="HEAL"><span>HEAL</span></p>
          <p>Incensos para escolher pela atmosfera e entender pela matéria.</p>
        </div>
        <nav aria-label="Marca e conteúdo">
          <Link href="/sobre" prefetch={false}>Sobre</Link>
          <Link href="/materia" prefetch={false}>Matéria</Link>
          <Link href="/como-escolher" prefetch={false}>Como escolher</Link>
          <Link href="/journal" prefetch={false}>Journal</Link>
        </nav>
        <nav aria-label="Ajuda e políticas">
          <Link href="/seguranca" prefetch={false}>Segurança</Link>
          <Link href="/entrega-trocas" prefetch={false}>Entrega e trocas</Link>
          <Link href="/privacidade" prefetch={false}>Privacidade</Link>
          <Link href="/termos" prefetch={false}>Termos</Link>
          <Link href="/contato" prefetch={false}>Contato</Link>
        </nav>
        <p className="footer-status">Demonstração local · operação e catálogo ainda não definidos</p>
      </footer>
    </>
  );
}
