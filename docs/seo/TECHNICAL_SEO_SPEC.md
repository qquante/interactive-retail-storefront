# HEAL — Especificação de SEO técnico para o storefront Vinext

Data: **2026-08-28**  
Owner de implementação: **HEAL-08 / HEAL-14**  
Owner de validação: **HEAL-15**, independente do autor  
Estado: **especificação implementável; não integrada**

## 1. Objetivo e limites

Entregar um storefront PT-BR cujo conteúdo comercial essencial seja legível no HTML inicial, com URLs estáveis, controle explícito de indexação e dados consistentes entre UI, JSON-LD e futuro feed Shopify/Merchant Center.

Esta especificação não autoriza:

- indexar a fixture atual;
- inventar domínio, produto, preço, estoque, política, review, GTIN ou perfil social;
- conectar Search Console/Merchant Center;
- alegar rich result, indexação ou visibilidade em AI Search.

## 2. Compatibilidade do runtime

O workspace usa Next `16.3.3`, Vinext `1.0.0-beta.8` e App Router. O README instalado do Vinext declara suporte à Metadata API (`metadata`, `generateMetadata`, title templates) e a rotas de metadata (`robots.txt`, `sitemap.xml`, favicon e OG images). Essa declaração reduz risco, mas não substitui o gate de build e inspeção do HTML.

Implementar com APIs compatíveis do Next, sem `<head>` manual:

```text
site/app/layout.tsx                  metadata raiz
site/app/robots.ts                   robots.txt por ambiente
site/app/sitemap.ts                  sitemap de URLs canônicas
site/app/opengraph-image.*           imagem social padrão
site/app/produtos/[handle]/page.tsx  generateMetadata + Product/ProductGroup
site/app/colecoes/[handle]/page.tsx  generateMetadata + paginação
site/app/not-found.tsx               404 útil com status correto
site/lib/seo/*                       origin, metadata, JSON-LD e sanitização
```

## 3. Gate de ambiente e origem canônica

### Variáveis

```text
SITE_ORIGIN=https://dominio-real.example
SEO_INDEXABLE=false
GOOGLE_SITE_VERIFICATION=           # somente valor real, quando existir
```

Regras:

1. `SITE_ORIGIN` deve ser URL absoluta, sem path/query/hash e com HTTPS em produção.
2. Não assumir domínio de preview como canônico.
3. `SEO_INDEXABLE` é opt-in; ausência, valor inválido ou fixture implica `false`.
4. Build de release falha se `SEO_INDEXABLE=true` e `SITE_ORIGIN` estiver ausente, for localhost, preview ou não HTTPS.
5. `metadataBase = new URL(SITE_ORIGIN)` somente após validação.

### Não produção

Aplicar defesa em profundidade:

- `robots` metadata: `noindex, nofollow, noarchive`;
- header `X-Robots-Tag: noindex, nofollow, noarchive` em todas as respostas HTML;
- `robots.txt` com `Disallow: /`;
- autenticação de preview, se o host oferecer;
- sitemap vazio ou omitido.

`robots.txt` sozinho não impede que uma URL conhecida apareça no índice. O header/meta é o controle de indexação; autenticação é o controle mais forte.

### Produção

Só ativar `SEO_INDEXABLE=true` depois dos gates da seção 15. Ao ativar:

- remover `X-Robots-Tag` global de bloqueio;
- indexar somente rotas públicas aprovadas;
- publicar sitemap absoluto;
- manter rotas privadas/transacionais com `noindex` específico.

## 4. Matriz de rotas e indexação

| Rota | Status normal | Indexação | Canonical | Sitemap |
|---|---:|---|---|---|
| `/` | 200 | index,follow | self | sim |
| `/colecoes` | 200 | index,follow | self | sim |
| `/colecoes/{handle}` | 200 | index,follow | self | sim |
| `/colecoes/{handle}?page=n` | 200 | index,follow | self incluindo `page=n` | sim, se estável e útil |
| `/produtos/{handle}` | 200 | index,follow | self | sim |
| `/produtos/{handle}?variante=x` | 200 | index,follow | produto base | não |
| `/como-escolher`, `/guia-do-ritual`, `/sobre` | 200 | index,follow | self | sim |
| `/journal` e artigo publicado | 200 | index,follow | self | sim |
| políticas reais | 200 | index,follow | self | sim |
| `/busca?q=` | 200 | noindex,follow | self | não |
| coleção com filtros/sort | 200 | noindex,follow | ver seção 8 | não |
| `/carrinho` | 200 | noindex,follow | self | não |
| `/checkout` | 200/redirect | noindex,follow | self | não |
| confirmação/pedido/conta | 200 | noindex,nofollow,noarchive | self | não |
| handle inexistente, `page` impossível, filtro inválido | 404 | não indexável | nenhum | não |

Enquanto o conteúdo for fixture, a primeira coluna não muda, mas todas as páginas recebem o bloqueio global de não produção.

## 5. HTML inicial obrigatório

Cada rota indexável precisa funcionar sem WebGL e expor no response HTML:

- `lang="pt-BR"`;
- `<title>` único e factual;
- meta description específica;
- canonical absoluto;
- robots coerente;
- um H1 de interface claro (convenção HEAL, não requisito isolado de ranking);
- conteúdo textual principal;
- navegação e breadcrumbs com `<a href>`;
- imagens essenciais em `<img>`/componente que resulte em `<img>`, com `src`, dimensões e alt contextual;
- JSON-LD aplicável;
- na PDP: produto, preço, `BRL`, disponibilidade, variante selecionada/padrão, SKU quando real e CTA/estado de compra.

Anime.js/Three.js devem ser client islands posteriores. Nenhum conteúdo só pode existir em canvas, pseudo-elemento CSS ou após evento do usuário.

## 6. Metadata por rota

### Raiz

Configurar em `app/layout.tsx`:

```ts
{
  metadataBase: new URL(siteOrigin),
  applicationName: 'HEAL. CURA.',
  title: {
    default: 'HEAL. CURA. — Incensos para ritual contemporâneo',
    template: '%s | HEAL. CURA.'
  },
  description: '<descrição aprovada e factual>',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'HEAL. CURA.',
    url: '/',
    images: ['/opengraph-image.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image.jpg']
  },
  robots: releaseRobots
}
```

Não adicionar `keywords`, autor/fundador, CNPJ, endereço, telefone, `sameAs` ou verification sem dado real.

### Dinâmicas

`generateMetadata` recebe o mesmo DTO server-side usado no conteúdo. Nunca fazer uma segunda consulta que possa retornar preço/estoque diferente.

PDP:

- title: `{nome factual}`;
- description: resumo específico com atributos reais, sem claims de saúde;
- canonical: `/produtos/{handle-canônico}`;
- OG: nome, descrição, URL canônica e imagem real do produto;
- produto inexistente chama `notFound()` e não gera metadata genérica 200.

Coleção:

- title/description únicos e editoriais;
- página 1 canonical na rota base;
- `page>1` self-canonical;
- filtros/sort aplicam `robots.index=false`.

### Hreflang

Não implementar agora. O site é somente PT-BR. Adicionar `alternates.languages` apenas quando existirem URLs traduzidas equivalentes e testadas; incluir autorreferência e `x-default` conforme estratégia internacional futura.

## 7. URLs e normalização

- HTTPS e um hostname canônico, a definir;
- slugs minúsculos, sem acento, separados por hífen;
- plural estável: `/produtos/` e `/colecoes/`;
- sem IDs de sessão, CEP, e-mail, pedido ou PII em URL;
- remover/ignorar `utm_*`, `gclid`, `fbclid` do canonical;
- política de trailing slash única; configuração proposta: sem slash final;
- variante por `?variante={handle-estável}`, nunca fragmento se precisar de deep link comercial;
- parâmetros em ordem determinística e whitelist; rejeitar chave repetida ou valor desconhecido;
- links internos sempre apontam diretamente à forma final, sem redirects.

## 8. Canonical, filtros e paginação

### Canonical

- toda URL indexável é self-canonical;
- sinais devem concordar: canonical, sitemap, links internos, feed e redirect;
- produto com variante selecionada canoniza para a PDP base, mas cada variante tem URL própria dentro de `ProductGroup`/`Offer`;
- não usar canonical para corrigir página inexistente, conteúdo diferente ou rota que deveria ser `noindex`.

### Filtros

Modelo inicial:

```text
/colecoes/madeiras?familia=amadeirada&intensidade=suave&ordem=preco-asc
```

- estado compartilhável e recuperável pela URL;
- filtros acionados por controles de UI, não por uma malha infinita de `<a href>`;
- SSR aceita URL direta e entrega resultados, mas aplica `noindex,follow`;
- fora do sitemap;
- canonical para coleção limpa somente quando a página for variação substancialmente duplicada; caso contrário, self-canonical + `noindex`;
- combinações vazias/absurdas retornam 404 útil; busca interna sem resultado continua 200 + noindex;
- antes de permitir indexação de uma faceta, exigir ADR editorial, demanda, inventário estável, título/texto próprio e links internos.

Se crawl de parâmetros crescer, adicionar regras `robots.txt` para padrões de faceta após análise de logs. Não bloquear previamente a URL quando o Google ainda precisa ler `noindex`.

### Paginação

- URL `?page=2`, nunca infinite scroll como única descoberta;
- cada página tem `<a href>` para anterior/próxima e páginas próximas;
- cada página é self-canonical;
- `page=1` redireciona 308 para a coleção base;
- `page<1`, não numérico ou acima da última página retorna 404;
- “Carregar mais” pode ser enhancement, mas atualiza history e preserva anchors crawlable.

## 9. robots.txt e sitemap

### `app/robots.ts`

Produção:

```ts
{
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/api/']
  },
  sitemap: `${siteOrigin}/sitemap.xml`,
  host: siteOrigin
}
```

Não bloquear `/_next/`, CSS, JS, imagens ou fontes necessários à renderização. Busca, carrinho e checkout usam `noindex` de página; não dependem de `robots.txt`.

Não produção: `Disallow: /`, sem sitemap público.

### `app/sitemap.ts`

Gerar a partir de fonte autoritativa:

- somente URLs absolutas, canônicas, indexáveis e com resposta 200;
- somente produtos/coleções publicados e conteúdo editorial aprovado;
- excluir busca, filtros, sorts, variantes canonizadas, carrinho, checkout, conta, confirmação, preview e fixture;
- `lastModified` vem da atualização real do registro, nunca `new Date()` em todo build;
- não usar `priority`/`changeFrequency` sem política necessária;
- até 50.000 URLs/50 MB por sitemap; dividir por produtos, coleções e editorial quando atingir limite ou quando a separação melhorar monitoramento.

## 10. Redirects e status

- troca permanente de handle: `308`/`301` server-side direto para a URL final;
- campanha/teste temporário: `302`/`307`;
- sem chains; mapear origem → destino final;
- produto sem estoque, mas ainda vendido: 200 + `OutOfStock`;
- produto descontinuado com conteúdo útil: manter 200 + `Discontinued` e alternativas reais;
- removido com substituto equivalente: 308 para substituto;
- removido sem equivalente: 410 ou 404, nunca redirect em massa para home/coleção;
- página 404 customizada precisa retornar HTTP 404, não soft 404.

Manter `docs/seo/REDIRECT_MAP.csv` quando surgirem URLs históricas, com `source,target,status,reason,approved_at`.

## 11. JSON-LD

### Regras gerais

- renderizar `<script type="application/ld+json">` no Server Component;
- serializar com escape de `<` para evitar encerramento/injeção de script;
- gerar do mesmo objeto validado da UI;
- omitir campo desconhecido; não inserir `[A VALIDAR]`, `null`, placeholder ou fixture em produção;
- valores visíveis e markup precisam coincidir;
- usar URLs absolutas e `@id` estáveis.

### Home

Um `@graph` com:

1. `OnlineStore` (subtipo de `Organization`):
   - `@id: {SITE_ORIGIN}/#organization`;
   - `name: HEAL. CURA.`;
   - `alternateName: Heal Incensos`;
   - `url: {SITE_ORIGIN}/`;
   - `logo`, `sameAs`, contato, dados fiscais somente quando reais.
2. `WebSite`:
   - `@id: {SITE_ORIGIN}/#website`;
   - `url`, `name`, `alternateName`;
   - `publisher: {"@id":".../#organization"}`.

Omitir `SearchAction`: o sitelinks search box foi retirado e não há consumidor concreto aprovado.

### Breadcrumbs

Todas as rotas não-home exibem breadcrumb visual e `BreadcrumbList` equivalente. Mínimo dois `ListItem`, `position` sequencial, nome e URL absoluta. O último item pode omitir `item`, mas a implementação HEAL deve manter URL para consistência.

### Produto simples

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "{PRODUCT_URL}#product",
  "name": "{REAL_NAME}",
  "description": "{REAL_DESCRIPTION}",
  "image": ["{CRAWLABLE_PRODUCT_IMAGE}"],
  "sku": "{REAL_SKU}",
  "brand": { "@type": "Brand", "name": "HEAL. CURA." },
  "offers": {
    "@type": "Offer",
    "url": "{PRODUCT_URL}",
    "price": 0.00,
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": { "@id": "{SITE_ORIGIN}/#organization" }
  }
}
```

`0.00` é apenas indicação de tipo no exemplo e **não pode ser publicado**: merchant listings exigem preço ativo maior que zero. Substituir por valor real ou não publicar Product/Offer de comércio.

Adicionar GTIN/MPN, `priceValidUntil`, shipping ou returns somente quando existirem. `priceValidUntil` não é data de atualização e não deve ser inventado.

### Produto com variantes

Usar `ProductGroup` somente se:

- existe um produto pai real;
- cada variante tem SKU, preço/estoque e URL distinguíveis;
- os atributos de variação são factuais.

Contrato:

- `ProductGroup`: `@id`, `name`, `description`, `brand`, `productGroupID`, `variesBy`, `hasVariant`;
- cada `Product`: `isVariantOf`, `sku`, atributos que variam, imagens e `Offer` próprio;
- cada `Offer.url`: `{PRODUCT_URL}?variante={VARIANT_HANDLE}`;
- PDP base e query de variante têm canonical na PDP base;
- JSON-LD contém todas as variantes reais server-side; seleção visual não reescreve apenas client-side o markup.

### Shipping e devolução

- política padrão em `OnlineStore.hasMerchantReturnPolicy` no documento de política, referenciando o mesmo `@id` da organização;
- `Offer.hasMerchantReturnPolicy` somente para exceção real;
- `OfferShippingDetails` ou `OnlineStore.hasShippingService` somente após HEAL-13/19 aprovarem cobertura, custo, prazo, origem e condições;
- comparar automaticamente markup com resposta de commerce/feed.

### Reviews

Bloqueadas até existir sistema real. Quando liberadas:

- visíveis na PDP;
- específicas daquele produto;
- `author`, texto/data/rating reais;
- agregado calculado de todas as reviews elegíveis exibidas;
- não importar/agregar estrelas de terceiros;
- não publicar avaliação incentivada sem disclosure.

## 12. Open Graph e imagens

- imagem padrão original 1200×630, absoluta, sem claim não comprovado;
- produto usa fotografia real representativa; fallback explícito da marca somente se não alegar mostrar o item;
- `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale=pt_BR`, `og:image` e alt;
- `twitter:card=summary_large_image` e campos equivalentes;
- todas as imagens têm dimensões para evitar CLS, filename descritivo e alt funcional;
- produto Merchant Center: adotar ≥1500×1500 sempre que possível e nunca abaixo de 500×500;
- preservar IPTC `DigitalSourceType` em imagem generativa; não usar imagem gerada como fotografia documental de um produto inexistente.

## 13. Consistência commerce → UI → schema → feed

Criar um único DTO validado, por exemplo:

```ts
type SeoProduct = {
  canonicalUrl: string
  name: string
  description: string
  images: Array<{ url: string; alt: string; width: number; height: number }>
  brand: string
  variants: Array<{
    id: string
    handle: string
    sku: string
    price: { amount: string; currencyCode: 'BRL' }
    availableForSale: boolean
    updatedAt: string
  }>
}
```

Invariantes automáticas:

- UI e JSON-LD usam a mesma variante/valor;
- `BRL` em todas as superfícies;
- disponibilidade mapeada por enum, sem texto livre;
- sitemap/feed/canonical usam o mesmo handle;
- erro ou dado ausente bloqueia compra e schema comercial; nunca cai para preço `0`;
- fixture carrega badge “Demonstração” e mantém `SEO_INDEXABLE=false`.

## 14. Merchant Center e AI Search

Preparar, não conectar:

- campo de canonical do feed igual à PDP base;
- `item_group_id` coerente com `productGroupID`;
- `video_link` opcional e factual;
- shipping 2026 (`handling_cutoff_time`, `minimum_order_value`) só se real;
- AI title/description usam `structured_title`/`structured_description` e provenance apropriada;
- não criar `llms.txt`, schema de IA ou páginas de fan-out;
- conteúdo de primeira mão recomendado: materiais reais, comparação com método, teste de queima, fotografia e vídeo próprios, segurança revisada.

## 15. Validação e release gates

### Build/local

```text
npm run lint
npx tsc --noEmit
npm run build
```

Guardar exit codes. Depois, para cada rota representativa:

```text
GET /                    200 + metadata + WebSite/OnlineStore
GET /colecoes/{handle}   200 + self canonical
GET /produtos/{handle}   200 + produto/preço/estoque/JSON-LD no HTML
GET /busca?q=madeira      200 + noindex
GET /nao-existe           404 real
GET /robots.txt           regras do ambiente
GET /sitemap.xml          XML válido e URLs absolutas
```

Inspecionar o **response HTML**, não apenas DOM hidratado. Repetir com JavaScript desabilitado.

### Validação automática

- parsear HTML e afirmar title, description, H1, canonical, robots e links;
- parsear todos os JSON-LD como JSON;
- schema validator sem erros sintáticos;
- teste de invariantes UI/JSON-LD/DTO;
- crawl interno sem órfãs, redirect chains, 200 soft-404 ou canonical conflitante;
- sitemap: cada URL 200, indexável e canonical em si;
- nenhum filtro/busca/carrinho/checkout no sitemap;
- teste de robots em `SEO_INDEXABLE=false/true`.

### Ferramentas oficiais após domínio e deploy autorizados

1. Rich Results Test em home e PDPs representativas;
2. URL Inspection live e rendered HTML;
3. Search Console: Page indexing, Sitemaps, Crawl stats, CWV, Merchant listings e Product snippets;
4. Merchant Center “Needs attention” e comparação feed/site;
5. relatório generativo somente se aparecer na propriedade.

Não alegar validação oficial a partir de localhost.

### Métricas de aceite

- 100% das páginas públicas aprovadas têm title, description, canonical e H1 específicos;
- 100% dos produtos reais têm paridade de preço/moeda/estoque UI ↔ JSON-LD ↔ feed;
- 0 erros críticos de structured data;
- 0 URLs não indexáveis no sitemap;
- 0 produtos indexáveis dependentes de JavaScript/WebGL para conteúdo essencial;
- 0 reviews, políticas ou shipping inventados;
- CWV de campo p75, mobile e desktop: LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1;
- baseline de cliques, impressões, CTR e páginas/consultas só após dados reais;
- baseline generativo apenas de impressões/dimensões e somente se o relatório estiver disponível.

## 16. Critérios de aceite por task

### HEAL-08

- Metadata API integrada sem `<head>` manual;
- SSR entrega conteúdo e metadata;
- status/404/redirects corretos;
- rotas transacionais `noindex`.

### HEAL-13/14

- DTO único e schema validado;
- timestamps reais para sitemap;
- IDs/handles/variants estáveis;
- fixture separada de produção.

### HEAL-15

- revisar HTML inicial, canonical, robots, sitemap e JSON-LD;
- comparar UI/schema/feed;
- registrar ferramentas, URLs, datas e evidências;
- emitir `changes_requested` se domínio/dados reais faltarem para indexação.

### HEAL-16

- imagens/vídeos e conteúdo indexáveis, próprios e factuais;
- nenhum doorway/scaled content;
- provenance de IA preservada;
- sem promessa de “GEO”.

## 17. Blockers antes de implementação de produção

- valor definitivo de `SITE_ORIGIN`;
- catálogo/variants/SKUs/preços/estoques reais;
- imagens e logo finais com direitos/provenance;
- política aprovada de frete, troca e devolução;
- definição do hostname e trailing slash;
- conta Shopify/Storefront e fonte de timestamps;
- propriedades Search Console/Merchant Center;
- teste de compatibilidade Vinext no HTML/build final.

Até esses itens existirem, o resultado correto é: **estrutura SEO testável em fixture, globalmente `noindex`; não storefront indexável**.

