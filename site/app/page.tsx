import Image from "next/image";
import Link from "next/link";
import { StoreHeader } from "@/components/storefront/StoreHeader";
import { StoreFooter } from "@/components/storefront/StoreFooter";
import { MotionControl } from "@/components/storefront/MotionControl";
import { HealSmokePlume } from "@/components/experience/HealSmokePlume";
import { ProductCard } from "@/components/commerce/ProductCard";
import { fixtureCommerce } from "@/lib/commerce";
import "./retail.css";

export default async function Home() {
  const result = await fixtureCommerce.listProducts({}, { limit: 5 });
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="retail-header-wrap">
        <StoreHeader dark />
      </div>
      <main id="conteudo">
        <div className="retail-masthead">
          <HealSmokePlume className="retail-plume" />
          <section className="retail-hero" aria-labelledby="hero-title">
            <div className="retail-hero-copy">
              <p className="eyebrow">HEAL · INCENSOS</p>
              <h1 id="hero-title">
                Incensos para
                <br />
                <em>estar presente.</em>
              </h1>
              <p className="retail-hero-lead">
                Encontre seu aroma.
                <br />
                Dê outro ritmo ao seu espaço.
              </p>
              <Link className="button button-light" href="/colecoes/heals">
                Explorar incensos <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="retail-hero-bottom">
              <Link href="#colecao">
                Conheça os HEALS <span aria-hidden="true">↓</span>
              </Link>
              <MotionControl />
            </div>
          </section>
        </div>
        <section
          className="retail-section"
          id="colecao"
          aria-labelledby="collection-heading"
        >
          <div className="retail-section-heading">
            <div>
              <p className="eyebrow">HEALS · A COLEÇÃO</p>
              <h2 id="collection-heading">Um aroma. Seu momento.</h2>
            </div>
            <Link href="/colecoes/heals" className="editorial-link">
              Todos os incensos <span aria-hidden="true">↗</span>
            </Link>
          </div>
          {result.ok ? (
            <div className="retail-product-grid">
              {result.data.items.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <p role="alert">
              Não foi possível carregar a coleção.{" "}
              <Link href="/colecoes/heals">Tentar novamente</Link>
            </p>
          )}
        </section>
        <section className="retail-campaign" aria-labelledby="campaign-heading">
          <div className="retail-campaign-image">
            <Image
              src="/images/heals/retail/collection-campaign.webp"
              alt="As cinco embalagens HEAL: Canela, Lavanda Celestial, Mirra, Olíbano e Alecrim"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="retail-campaign-copy">
            <p className="eyebrow">FEITOS PARA O SEU ESPAÇO</p>
            <h2 id="campaign-heading">
              Qual HEAL
              <br />é o seu?
            </h2>
            <p>
              Canela, Lavanda Celestial, Mirra, Olíbano ou Alecrim. Conheça cada
              incenso, no seu tempo.
            </p>
            <Link href="/colecoes/heals" className="button button-dark">
              Conhecer a coleção <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section className="retail-detail" aria-labelledby="detail-heading">
          <div className="retail-detail-copy">
            <p className="eyebrow">DE PERTO</p>
            <h2 id="detail-heading">
              A beleza está
              <br />
              na matéria.
            </h2>
            <p>
              Uma superfície irregular. Textura que se revela de perto. O bastão
              é parte da presença de um HEAL, antes mesmo de acender.
            </p>
            <Link href="/materia" className="editorial-link">
              Conheça os bastões <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="retail-detail-image">
            <Image
              src="/images/heals/retail/incense-detail.webp"
              alt="Detalhe ilustrativo de três bastões finos de incenso, com superfície rugosa e fibras visíveis"
              fill
              sizes="(max-width: 760px) 100vw, 55vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>
        <section className="retail-help" aria-labelledby="help-heading">
          <div>
            <p className="eyebrow">ESCOLHA COM CALMA</p>
            <h2 id="help-heading">Seu primeiro HEAL?</h2>
            <p>
              Um guia simples para explorar os aromas e preparar o seu espaço.
            </p>
          </div>
          <Link className="button" href="/como-escolher">
            Como escolher <span aria-hidden="true">↗</span>
          </Link>
        </section>
        <section
          className="retail-professional"
          aria-labelledby="professional-heading"
        >
          <p className="eyebrow">HEAL PARA PROFISSIONAIS</p>
          <h2 id="professional-heading">
            Para quem cuida
            <br />
            de cada ambiente.
          </h2>
          <p>
            Lojas, espaços de bem-estar e práticas integrativas.
            <br />
            Conheça a frente profissional da HEAL.
          </p>
          <Link href="/profissionais" className="editorial-link">
            Saiba mais <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <StoreFooter />
    </>
  );
}
