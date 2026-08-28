import Link from 'next/link';

const navItems = [
  { href: '#escolher', label: 'Incensos' },
  { href: '#como-escolher', label: 'Como escolher' },
  { href: '#materia', label: 'Matéria' },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <div className="demo-banner" role="note">
        <span>Ambiente de demonstração</span>
        <span>Dados e imagens ilustrativos</span>
      </div>

      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="HEAL. CURA. — início">
          <span>HEAL.</span>
          <span>CURA.</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="bag-link" href="/carrinho" aria-label="Abrir sacola, vazia">
            Sacola <span aria-hidden="true">(0)</span>
          </Link>
        </div>

        <details className="mobile-menu">
          <summary>Menu</summary>
          <nav aria-label="Navegação móvel">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </details>
      </header>

      <main id="conteudo">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">Incensos · ritual contemporâneo</p>
              <h1 id="hero-title">Acenda o intervalo.</h1>
              <p className="hero-lead">
                Incensos para escolher pela atmosfera — e entender pela matéria.
                A beleza chama. A informação sustenta a escolha.
              </p>
              <div className="hero-actions">
                <a className="button button-light" href="#escolher">
                  Escolher uma atmosfera
                </a>
                <a className="editorial-link" href="#como-escolher">
                  Como escolher
                </a>
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
              <picture>
                <source srcSet="/images/heal-ritual-demo.avif" type="image/avif" />
                <source srcSet="/images/heal-ritual-demo.webp" type="image/webp" />
                <img
                  src="/images/heal-ritual-demo.png"
                  width="1536"
                  height="1024"
                  alt="Composição demonstrativa de uma vareta de incenso acesa em suporte cerâmico escuro"
                  fetchPriority="high"
                />
              </picture>
              <figcaption>Imagem demonstrativa — não representa um produto real.</figcaption>
            </figure>
          </div>
          <div className="transition-seam" aria-hidden="true" />
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
            <a className="choice-card choice-card-matter" href="#materia" id="materia">
              <span className="card-index">01</span>
              <span className="card-kicker">Por matéria</span>
              <strong>Madeiras, resinas e folhas</strong>
              <span className="card-copy">
                Famílias conceituais. Composição e origem aguardam catálogo real.
              </span>
              <span className="card-cta">Explorar famílias →</span>
            </a>

            <a className="choice-card choice-card-moment" href="#como-escolher">
              <span className="card-index">02</span>
              <span className="card-kicker">Por momento</span>
              <strong>Chegar, receber, recolher</strong>
              <span className="card-copy">
                Uma orientação editorial — nunca uma promessa de efeito terapêutico.
              </span>
              <span className="card-cta">Encontrar uma atmosfera →</span>
            </a>
          </div>
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
    </>
  );
}
