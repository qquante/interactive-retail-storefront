# HEAL — Revisão SEO 2026, commerce e schema da Coreografia do Ar

Data: 2026-08-28  
Owner: HEAL-36 · SEO técnico, conteúdo comercial e structured data  
Estado: `AUDITORIA + ESPECIFICAÇÃO; SITE AINDA FIXTURE/NOINDEX; NÃO PUBLICADO`  
Escala considerada: coleção inicial de 5 produtos; catálogo futuro estimado em cerca de 50 itens; B2C e B2B.

## 0. Veredito

O site atual possui uma base segura para protótipo: conteúdo essencial em HTML, rotas legíveis, `pt-BR`, fixture declarada e `noindex`. Ele **não está pronto para indexação ou Shopping**. Canonical, sitemap, schema comercial, feed, mídia documental, domínio, políticas e catálogo autoritativo continuam ausentes — corretamente, porque os dados atuais são fictícios.

A migração não deve apenas renomear `Intervalo 01–03`. Ela precisa criar cinco entidades comerciais estáveis e deixar a arquitetura preparada para cerca de 50 produtos sem gerar páginas finas, canibalização ou facetas infinitas.

Decisões principais:

1. marca organizacional: `HEAL`;
2. `HEALS` é a linha/família verbal e deve aparecer perto de `incenso(s)` no primeiro contato;
3. CANELA, LAVANDA CELESTIAL, MIRRA, OLÍBANO e ALECRIM são cinco produtos candidatos distintos, **não variantes schema de um único ProductGroup**;
4. coleção canônica candidata: `/colecoes/incensos`;
5. PDPs candidatas: `/produtos/incenso-{aroma}`;
6. fixture permanece `noindex` mesmo depois de trocar nomes/imagens conceituais;
7. Product/Offer só entra quando UI, checkout e fonte autoritativa concordarem sobre produto, SKU, preço, moeda e estoque;
8. imagem gerada de caixa/vareta é conceito, não foto documental, `image_link`, prova de composição ou schema de produto;
9. contexto cultural/espiritual pode ser editorial e atribuído; não vira benefício médico, promessa de resultado ou segmentação vulnerável;
10. atenção deve vir de clareza, narrativa e objeto visual — nunca urgência falsa, recomendação subliminar ou dark pattern.

## 1. Escopo e contrato de verdade

Este documento revisa:

- metadata e controle de indexação;
- URLs, handles e migração dos três fixtures para cinco produtos;
- canonical, sitemap, breadcrumbs e links internos;
- imagens, alt, dimensões e elegibilidade Merchant;
- `Product`, `Offer`, `ItemList`, `BreadcrumbList`, `WebSite` e `OnlineStore`;
- intenção B2C/B2B, conteúdo de marca, cultura/espiritualidade e claims;
- prontidão para Google Images, Shopping, AI Overviews/AI Mode e agentes de navegador;
- gates de lançamento testáveis.

Não autoriza domínio, indexação, feed, conta, CNPJ, política, preço, estoque, composição, review, GTIN/MPN, origem, resultado terapêutico ou publicação dos cinco produtos como reais.

Fontes internas auditadas:

- `docs/research/2026-08-28-seo-2026.md`;
- `docs/seo/TECHNICAL_SEO_SPEC.md`;
- `docs/seo/CONTENT_INTENT_MAP.md`;
- `docs/seo/IMAGES_SHOPPING_AI_PLAYBOOK.md`;
- `docs/seo/IMPLEMENTATION_STATUS.md`;
- runtime atual em `site/app`, `site/components/commerce` e `site/lib/commerce`.

## 2. Snapshot técnico do site

### O que está correto

- `site/app/layout.tsx` define `lang="pt-BR"`, title template, descriptions social e bloqueio global de indexação.
- `site/app/robots.ts` usa `Allow: /`, permitindo que crawlers leiam o `meta noindex`; não usa `robots.txt` como controle de acesso.
- Home, coleção, PDP e busca entregam H1, conteúdo, links e estados em HTML; Three.js não é necessário para entender ou comprar.
- rotas inexistentes usam `notFound()` no conteúdo;
- busca, carrinho e checkout têm `noindex` explícito;
- a fixture diferencia preço/estoque demonstrativos e bloqueia compra quando disponibilidade é desconhecida;
- `CommerceImage` já exige `alt`, `width` e `height` no domínio;
- React escapa a query de busca refletida no HTML e o input é limitado a 100 caracteres.

### Lacunas de release

- não existe `SITE_ORIGIN` validado como origem pura nem `SEO_INDEXABLE` opt-in;
- não existe canonical em nenhuma rota;
- não existe `app/sitemap.ts`;
- não existe JSON-LD;
- metadata social não publica `siteName`, URL, imagem ou alt no código atual;
- `docs/seo/IMPLEMENTATION_STATUS.md` diz que imagem social condicionada ao origin está pronta, mas `layout.tsx` não a emite; existe drift entre documentação e runtime;
- `docs/seo/TECHNICAL_SEO_SPEC.md` ainda usa a marca histórica `HEAL. CURA.`; a decisão atual é somente `HEAL`;
- as três PDPs e a coleção continuam em handles/títulos fictícios `intervalo-*`;
- `generateMetadata()` e a página fazem consultas independentes; isso é determinístico na fixture, mas pode divergir em preço/estoque no provider real;
- metadata da coleção dinâmica é hardcoded como `Intervalos`, mesmo após verificar outro handle;
- filtros e ordenação alteram a URL, mas não geram canonical/robots por combinação;
- a Home mostra nomes dos cinco aromas em `<li>`, sem links diretos para as futuras PDPs;
- a Home limita cards a três fixtures;
- PDP não possui relacionados nem links contextuais para método, matéria e segurança;
- imagens reais de produto não existem.

## 3. Prioridades

### P0 — bloqueia migração/publicação

| ID | Finding | Ação verificável |
|---|---|---|
| P0-01 | Ambiente não tem gate indexável seguro | implementar `SEO_INDEXABLE` opt-in e validar `SITE_ORIGIN` como HTTPS sem path/query/hash; fixture nunca pode ativar indexação |
| P0-02 | Cinco entidades reais não existem no commerce | cadastrar cinco produtos com IDs/handles estáveis e estado `draft` até completar facts, mídia, SKU, preço e estoque |
| P0-03 | Handles `intervalo-*` e links internos conflitariam com a direção | migrar para a matriz da seção 4 e eliminar links internos para `intervalos`; redirect só se uma URL antiga tiver sido publicada/compartilhada |
| P0-04 | Conceitos visuais podem parecer fotografia/prova | manter disclosure visível, `noindex` e `merchantEligible=false`; não usar em Product/Offer/feed |
| P0-05 | Home faz afirmações ainda não comprovadas | trocar “cinco aromas” por “cinco variantes em desenvolvimento” até validação olfativa; não afirmar matéria real dentro da caixa |
| P0-06 | Sem canonical/sitemap/schema de produção | implementar apenas depois de origin e dados autoritativos; nenhum placeholder entra em JSON-LD |
| P0-07 | Sem paridade UI/schema/feed | derivar tudo do mesmo snapshot/DTO validado; dado ausente bloqueia schema e compra, nunca vira valor default |
| P0-08 | Políticas/empresa/checkout reais ausentes | manter site inteiro `noindex`; Search Console/Merchant ficam bloqueados |
| P0-09 | Claims por nome/aroma não têm classificação | implementar gate por campo/canal; saúde, purificação, ansiedade, sono, foco, energia e cura não entram como benefício |
| P0-10 | Imagem hero atual é pesada e sem dimensões intrínsecas | substituir PNG de 2,47 MB pela variante responsiva adequada, declarar dimensões e medir LCP; manter rótulo de estudo conceitual |

### P1 — lançamento orgânico e escala

| ID | Finding | Ação verificável |
|---|---|---|
| P1-01 | Grafo interno não cobre os cinco produtos | Home → coleção + cinco PDPs; coleção → todos os produtos; PDP → coleção, guia, matéria, segurança e relacionados explicáveis |
| P1-02 | Hub `/colecoes` pode ser thin com uma única coleção | manter `noindex` ou consolidar enquanto não houver agrupamentos reais distintos; não criar coleção por keyword |
| P1-03 | Catálogo futuro precisa paginação | preparar `?page=n`, self-canonical, anchors anterior/próxima, 404 para página impossível e page=1 normalizada |
| P1-04 | Mídia não tem registro por SKU/rights | asset registry com role, SKU, rights, source type, dimensões, crops, alt contextual e elegibilidade Merchant |
| P1-05 | Busca consulta só título + resumo | criar search document a partir de campos factuais aprovados; cultura/saúde não vira recomendação implícita |
| P1-06 | B2B não tem owner de intenção | criar uma única rota `/atacado` quando oferta, mínimo, cobertura, contato e política forem reais; não criar doorway por profissão/cidade |
| P1-07 | História de marca ainda não tem prova | `/sobre` só indexa com origem da marca, responsáveis, símbolo, processo e compromissos verificáveis |
| P1-08 | Falta validação oficial pós-deploy | HTML sem JS, Rich Results Test, URL Inspection, Search Console e Merchant somente em domínio autorizado |

### P2 — evolução depois de dados

- criar coleções editoriais apenas quando cada uma resolver tarefa distinta e tiver inventário suficiente;
- publicar poucas peças de Journal com método, autoria, fontes primárias e mídia própria;
- documentar a vareta áspera real com macro, escala, lote/amostra e limites do que a textura prova;
- publicar vídeo real de embalagem/uso seguro e só então avaliar `video_link`;
- medir consultas, zero-results, páginas e conversão antes de ampliar arquitetura;
- usar relatórios generativos apenas conforme campos realmente oferecidos pela propriedade;
- testar novos formatos pela conclusão da tarefa e confiança, não por volume de páginas ou “tempo preso” no site.

## 4. Arquitetura de entidade e URLs

### Hierarquia nominal

```text
HEAL                              Brand/Organization
HEALS — os incensos da HEAL      linha verbal, não uma segunda marca
[NOME] — incenso HEALS           produto
```

No schema, `brand.name` é `HEAL`. Não usar `HEALS` como outra `Brand`, nem `HEAL. CURA.` como nome atual. O símbolo próprio da HEAL pode ser logo da organização somente quando o asset final, direitos e URL pública estiverem aprovados.

### Rotas candidatas estáveis

| Entidade | Handle/URL candidata | Nome de interface | Estado inicial |
|---|---|---|---|
| coleção principal | `/colecoes/incensos` | `Incensos HEALS` | fixture/noindex até catálogo real |
| produto | `/produtos/incenso-canela` | `Canela — incenso HEALS` | draft/conceito |
| produto | `/produtos/incenso-lavanda-celestial` | `Lavanda Celestial — incenso HEALS` | draft/conceito |
| produto | `/produtos/incenso-mirra` | `Mirra — incenso HEALS` | draft/conceito |
| produto | `/produtos/incenso-olibano` | `Olíbano — incenso HEALS` | draft/conceito |
| produto | `/produtos/incenso-alecrim` | `Alecrim — incenso HEALS` | draft/conceito |
| B2B futuro | `/atacado` | `HEAL para lojas e profissionais` | ausente/noindex até operação real |

Por que incluir `incenso-` no handle: os nomes isolados são ambíguos e a HEAL pode futuramente vender outros formatos. O handle permanece correto mesmo que a apresentação de embalagem mude. Slugs ficam sem acento; texto e metadata preservam `Olíbano`.

Não criar `/colecoes/canela`, `/incenso-canela`, `/aromas/canela` e artigo “incenso de canela” para a mesma entidade. A PDP é owner do produto; guia e Journal apontam para ela.

### Migração dos fixtures

1. cadastrar novos IDs/handles; não reaproveitar IDs `fixture:product:intervalo-*` como IDs comerciais;
2. manter `mode='fixture'` e disclosure mesmo com nomes dos cinco aromas;
3. atualizar `generateStaticParams()` a partir da fonte de catálogo, não array manual;
4. atualizar navegação, Home, breadcrumbs, busca, carrinho e testes para os novos handles;
5. só criar redirects `intervalo-* → incenso-*` se os antigos tiverem circulação real; como estão `noindex`, não há obrigação SEO de perpetuá-los;
6. antes do go-live, crawl deve encontrar zero link interno para `intervalo`.

### Regra para variantes futuras

Os cinco aromas não formam `ProductGroup` apenas porque compartilham embalagem/linha. Usar `ProductGroup` somente se um produto pai real tiver variantes compráveis do mesmo item — por exemplo, quantidade ou formato — com `productGroupID`, `variesBy`, SKU, preço, estoque e URL distinguível por variante.

Se “Canela” ganhar embalagem com 5 e 10 varetas:

- uma PDP base `/produtos/incenso-canela`;
- URLs distinguíveis `?variante=5-varetas` e `?variante=10-varetas`;
- canonical de ambas para a PDP base;
- `ProductGroup` server-side com as variantes reais;
- checkout, UI, JSON-LD e feed compartilham o mesmo variant ID.

## 5. Escala para aproximadamente 50 produtos

### Estrutura inicial

```text
/
├── /colecoes/incensos
│   ├── /produtos/incenso-canela
│   ├── /produtos/incenso-lavanda-celestial
│   ├── /produtos/incenso-mirra
│   ├── /produtos/incenso-olibano
│   └── /produtos/incenso-alecrim
├── /como-escolher
├── /materia
├── /guia
├── /seguranca
├── /sobre
└── /atacado                       somente quando real
```

Ao crescer:

- coleções são taxonomias editoriais aprovadas, não todo valor de filtro;
- uma faceta só vira landing indexável se houver intenção própria, inventário estável, introdução específica, links e owner;
- ordenação e filtros continuam `noindex,follow`, fora do sitemap;
- paginação usa links reais e self-canonical;
- catálogo não deve depender de infinite scroll;
- sitemap vem do provider e usa `updatedAt` real;
- links internos e feed sempre usam o canonical handle atual.

O hub `/colecoes` só deve indexar quando explicar agrupamentos reais. Com apenas `/colecoes/incensos`, ele pode ser consolidado ou permanecer `noindex`; duplicar o mesmo grid em duas URLs não cria valor.

## 6. Metadata e indexação

### Ambiente

Contrato recomendado:

```text
SITE_ORIGIN=https://dominio-aprovado.example
SEO_INDEXABLE=false
```

Validações de `SITE_ORIGIN`:

- HTTPS em produção;
- `origin.pathname === '/'`;
- sem query, hash, credenciais ou porta não aprovada;
- hostname não pode ser localhost, preview conhecido ou valor placeholder;
- normalizar sem barra final no helper, não em cada página.

Quando `SEO_INDEXABLE !== 'true'` ou provider/mode não é production:

- `noindex,nofollow,noarchive` global;
- `X-Robots-Tag` equivalente no edge/host e testado;
- `robots.txt` permite crawl;
- sitemap omitido/vazio;
- nenhuma conta/feed recebe os produtos.

### Matriz de metadata candidata

Os textos comerciais finais dependem de fatos. Enquanto isso, manter “em desenvolvimento/demonstração” e `noindex`.

| Rota | Title candidato de produção | Description candidata condicionada |
|---|---|---|
| `/` | `HEAL — incensos HEALS` | `Conheça os incensos HEALS e compare variantes por informações de produto, matéria e uso verificadas.` |
| `/colecoes/incensos` | `Incensos HEALS — coleção da HEAL` | `Compare os incensos HEALS disponíveis, com preço, formato, composição e cuidados confirmados em cada produto.` |
| PDP | `{Nome} — incenso HEALS` | `{Resumo factual aprovado}. Consulte formato, composição, uso, preço e disponibilidade.` |
| `/como-escolher` | `Como escolher incenso — guia HEAL` | `Entenda como comparar composição, notas percebidas, intensidade e fumaça com o método e os limites da HEAL.` |
| `/materia` | `Matéria e composição dos incensos HEAL` | `Veja como a HEAL documenta composição, procedência e percepção, com fontes, datas e lacunas.` |
| `/atacado` | `Incensos HEAL no atacado` | somente quando pedido mínimo, cobertura, condições e contato forem reais |

O title template adiciona `| HEAL` ou `— HEAL` uma única vez. Se a PDP já contém HEAL no nome renderizado, evitar duplicação automática.

### Regras por rota

- Home, coleção e PDP de produção: self-canonical absoluto.
- busca: sempre `noindex,follow`, fora do sitemap; canonical candidato `/busca`, sem `q`.
- coleção com `ordem`, `disponibilidade` ou faceta não aprovada: `noindex,follow`; canonical conforme duplicidade real, não automaticamente.
- carrinho/checkout: `noindex`; checkout/conta/confirmação também `nofollow,noarchive` quando apropriado.
- produto draft, concept ou fixture: `noindex`; nunca entra em sitemap/feed.
- página inexistente: 404 real, sem canonical e sem schema de entidade inexistente.
- produto descontinuado: política 200/404/410/redirect depende de substituto e valor histórico, não redireciona em massa para Home.

### Consistência de consulta

`generateMetadata`, HTML, JSON-LD e CTA precisam compartilhar o mesmo snapshot request-scoped. No provider real, envolver a consulta server-side em cache/deduplicação por request ou carregar o DTO uma vez no boundary suportado. Não buscar preço/estoque separadamente para metadata/schema.

## 7. Structured data

### Regra de emissão

Nenhum JSON-LD é melhor do que JSON-LD falso. O builder deve:

- executar no servidor;
- receber um DTO validado;
- omitir desconhecido; nunca emitir `null`, `[A VALIDAR]`, fixture ou preço `0`;
- escapar `<` ao serializar;
- usar URLs absolutas e `@id` estável;
- refletir conteúdo visível;
- falhar fechado para schema comercial sem derrubar a página informativa.

### Home

Quando domínio e organização forem reais:

- `WebSite`: `name='HEAL'`, URL e publisher;
- `OnlineStore`: nome legal/público aprovado, URL e logo final;
- `logo` referencia o símbolo/assinatura final rastreável, não concept art;
- omitir `SearchAction`, `sameAs`, contato, endereço e política enquanto inexistentes;
- `HEALS` pode aparecer na descrição de linha, não como organização paralela.

### BreadcrumbList

É elegível quando o breadcrumb visual e as URLs são reais. Implementar em toda rota pública não-home:

```text
Início > Incensos HEALS > Canela — incenso HEALS
```

- positions sequenciais;
- nomes iguais ao visual;
- URLs absolutas/canônicas;
- nenhum breadcrumb apenas em schema.

### ItemList na coleção

Opcional. Emitir somente quando os produtos são reais, publicados e aparecem no HTML na mesma ordem:

- `@type: ItemList`;
- `numberOfItems` igual ao número da página atual, não ao catálogo inteiro se paginado;
- cada `ListItem` contém `position`, `url` e nome factual;
- filtros noindex podem omitir ItemList;
- não alegar rich result garantido.

`ItemList` não substitui `Product`/`Offer` na PDP.

### Product/Offer

Cada aroma usa `Product` simples no lançamento inicial se tiver uma única opção real. Campos mínimos/gates:

| Campo | Fonte | Gate |
|---|---|---|
| `name` | catálogo | sem `[A VALIDAR]`, consistente com H1 |
| `description` | copy aprovada | factual, visível, sem claim bloqueado |
| `image` | asset registry | produto real, crawlable, rights e SKU vinculados |
| `sku` | provider | estável e real |
| `brand.name` | identidade | `HEAL` |
| `offers.url` | canonical builder | HTTPS pública |
| `price` | snapshot commerce | número positivo e igual à UI/feed |
| `priceCurrency` | snapshot commerce | `BRL` |
| `availability` | enum inventory | mapeamento determinístico e atual |
| `itemCondition` | catálogo | somente se real; normalmente `NewCondition` |
| `seller` | organização | `@id` do OnlineStore real |

Mapeamento candidato de estoque:

```text
in_stock    -> InStock
low_stock   -> InStock
out_of_stock-> OutOfStock
backorder   -> BackOrder
unknown     -> não emitir Offer comercial e bloquear compra
```

Não emitir `aggregateRating`, `review`, GTIN, MPN, shipping, returns, `priceValidUntil`, composição, origem ou duração sem dado e governança próprios.

### ProductGroup

Não agrupar Canela, Lavanda Celestial, Mirra, Olíbano e Alecrim como variantes. Eles têm identidade, nome e intenção de PDP próprios. ProductGroup só entra pela regra da seção 4.

## 8. Modelo commerce e SEO DTO

### O que o domínio atual já cobre

- produto/variante/coleção e IDs opacos;
- preço BRL, estoque e timestamps;
- mídia com URL, alt e dimensões;
- perfil sensorial com referência de método;
- formato, ingredientes, origem, quantidade, queima, uso e segurança;
- provenance geral `fixture|sandbox|production`.

### Lacunas para produção

O modelo precisa obter, diretamente ou por DTO derivado:

```ts
type PublicationState = 'draft' | 'preview' | 'published' | 'archived';
type ClaimClass =
  | 'identity'
  | 'composition_fact'
  | 'sensory_observation'
  | 'cultural_context'
  | 'usage_safety'
  | 'commercial'
  | 'medical_prohibited';

type SeoProductSnapshot = {
  productId: string;
  canonicalHandle: string;
  canonicalUrl: string;
  publicationState: PublicationState;
  name: string;
  lineName: 'HEALS';
  brandName: 'HEAL';
  categoryLabel: 'Incenso';
  description: string;
  updatedAt: string;
  images: SeoImage[];
  facts: ProductFactsWithFieldProvenance;
  claims: ApprovedClaim[];
  variants: SeoVariantSnapshot[];
};
```

Campos complementares necessários:

- `updatedAt` real para sitemap/cache;
- brand/linha/categoria explícitos;
- status editorial separado de disponibilidade;
- GTIN/MPN opcionais com estado `not_applicable|unknown|verified`, não string vazia;
- origem de fabricação separada de origem de ingrediente;
- dimensões físicas e peso/conteúdo quando reais;
- facts e claims com `sourceRef`, owner, aprovado em, validade e canais permitidos;
- imagem com `sourceType`, `role`, `rightsOwner`, `productId`, `variantId`, `merchantEligible` e motivo de bloqueio;
- canonical builder central, não URL armazenada arbitrariamente em cada provider.

### Invariantes

- produto não publicado nunca entra em sitemap, feed ou schema comercial;
- `mode !== production` implica `SEO_INDEXABLE=false` e `merchantEligible=false`;
- preço/moeda/estoque vêm do mesmo snapshot usado pela UI;
- `unknown` não vira `InStock`;
- produto sem imagem documental pode continuar em preview, mas não em Merchant;
- title/description não são gerados de claims bloqueados;
- mudança permanente de handle exige redirect map aprovado;
- busca, JSON-LD e feed consomem apenas campos autorizados por canal.

## 9. Imagens, símbolo e fumaça narrativa

### Snapshot dos assets atuais

| Asset atual | Dimensão | Bytes | Estado |
|---|---:|---:|---|
| `coreografia-family.png` | 1672×941 | 2.466.846 | conceito ImageGen; usado na Home; não Merchant |
| `coreografia-family.webp` | 1600×900 | 182.086 | conceito ImageGen; alternativa muito mais leve |
| `canela.webp` | 1000×1000 | 115.814 | conceito de caixa/produto |
| `lavanda-celestial.webp` | 1000×1000 | 67.320 | conceito de caixa/produto |
| `mirra.webp` | 1000×1000 | 105.726 | conceito de caixa/produto |
| `olibano.webp` | 1000×1000 | 67.806 | conceito de caixa/produto |
| `alecrim.webp` | 1000×1000 | 98.272 | conceito de caixa/produto |

A Home usa o PNG grande com `fetchPriority='high'`, sem atributos HTML `width`/`height`. O contêiner reserva aspect ratio, mas isso não substitui contrato de imagem responsiva. Antes de qualquer release de preview:

- usar `<img>/<picture>` ou componente compatível com `width`, `height`, `srcset` e `sizes`;
- servir WebP/AVIF adequado ao slot e fallback necessário;
- não carregar PNG 2,47 MB como LCP quando a alternativa de 182 KB existe sem avaliação visual;
- manter figcaption `estudo visual` e registro de proveniência;
- não colocar esses cinco mockups em Product JSON-LD ou feed.

### Fotografia real futura

Por SKU, mínimo editorial recomendado:

1. frente real da caixa;
2. lateral/verso legíveis;
3. caixa + conteúdo completo;
4. macro da vareta áspera;
5. escala/dimensão honesta;
6. contexto de uso seguro;
7. vídeo real opcional.

A textura áspera pode ser descrita como aparência observável da amostra/lote. Ela não prova ingredientes, produção artesanal, naturalidade ou desempenho. Registrar amostra, lote/data, fotógrafo e limites.

Alt contextual candidato, somente com foto real:

```text
Canela — incenso HEALS, caixa vista de frente.
Varetas do incenso HEALS Canela, mostrando superfície granulada e base de bambu visível.
Verso da caixa de Olíbano — incenso HEALS, com instruções e composição legíveis.
```

Não repetir “premium”, “natural”, “artesanal”, efeito ou keyword se a imagem não comprovar e o catálogo não autorizar.

### Símbolo HEAL

- header com símbolo sozinho precisa de nome acessível do link: `HEAL — início`;
- SVG decorativo dentro de wordmark recebe `aria-hidden=true`;
- logo em `OnlineStore` só usa asset final, crawlable e com direitos;
- favicon, símbolo, wordmark e OG devem pertencer à marca `HEAL`, sem `HEAL. CURA.` histórico;
- mudanças de logo não mudam URLs de produto.

### Fumaça narrativa

- canvas/WebGL permanece `aria-hidden` e sem conteúdo comercial exclusivo;
- disclosure deve dizer que a coreografia é identidade visual, não simulação fiel de aroma/fumaça/efeito;
- imagem/vídeo de fumaça real exige produto/lote, método e contexto seguro;
- intensidade ou nível de fumaça só entra em alt, metadata, search document ou PDP com metodologia válida;
- fumaça narrativa nunca personaliza promessa para ansiedade, sono, foco, cura ou purificação.

## 10. Links internos e descoberta

### Grafo mínimo de lançamento

```text
Home
├── coleção /colecoes/incensos
├── cinco PDPs por links <a href>
├── /como-escolher
├── /materia
├── /sobre
└── confiança: segurança, entrega, contato

Coleção
├── cinco ou mais PDPs
├── /como-escolher
└── /materia

PDP
├── coleção principal
├── 2–4 relacionados por regra explícita
├── método/percepção -> /como-escolher
├── composição/procedência -> /materia
└── uso/cuidado -> /guia e /seguranca
```

Regras:

- nomes dos cinco aromas na Home tornam-se links quando as PDPs existirem; não depender de canvas/card inteiro com handler;
- related products não usa similaridade psicológica oculta; regra visível pode ser coleção, formato ou atributo factual;
- breadcrumb usa os mesmos nomes/URLs do canonical;
- nenhum link interno aponta para redirect, query rastreável desnecessária ou produto draft;
- com 50 produtos, links de paginação e filtros preservam navegação por teclado e crawl controlado;
- crawl automático deve reportar órfãs, 404, chains e canonical conflitante.

## 11. Busca interna

A rota `/busca` continua sempre `noindex,follow` e fora do sitemap.

O índice interno futuro pode usar:

- nome e linha;
- descrição factual;
- formato e composição verificada;
- descriptors sensoriais somente com método;
- conteúdo editorial publicado.

Não usar como sinal de recomendação:

- condição de saúde;
- vulnerabilidade emocional;
- religião presumida;
- histórico sensível;
- claims culturais como eficácia do produto.

Consultas como “ansiedade”, “insônia”, “cura”, “depressão” ou tratamento mostram limite factual e não retornam “melhor incenso para”. O evento de busca, se medido, precisa de minimização, consentimento/base e retenção definidos; não enviar texto bruto a analytics por padrão.

## 12. Conteúdo B2C, B2B e cultura/espiritualidade

### B2C

Owners de intenção:

- escolher/comparar → coleção e `/como-escolher`;
- entender produto → PDP;
- composição/procedência → `/materia`;
- uso/segurança → `/guia` e `/seguranca`;
- marca → `/sobre`.

Não criar páginas `incenso para dormir`, `incenso para ansiedade`, `incenso para foco` ou equivalentes.

### B2B

Uma rota `/atacado` pode atender terapeutas, lojas esotéricas, revendedores e outros profissionais somente quando houver operação verificável. Conteúdo mínimo:

- para quem a oferta realmente atende;
- catálogo/formatos elegíveis;
- pedido mínimo, preço/condição ou processo de cotação;
- cobertura, prazo e faturamento;
- suporte, contato e política de dados;
- distinção entre revenda e recomendação terapêutica.

Não criar landings duplicadas por cidade/profissão apenas para aquisição. Uma seção pode adaptar exemplos de uso comercial sem alterar fatos ou prometer resultado ao consumidor final. Não usar schema inventado de atacado.

### História da marca

`/sobre` deve responder com prova:

- por que o nome HEAL existe sem prometer cura;
- o que significa HEALS e por que são incensos;
- autoria/decisão do símbolo próprio;
- processo real de produto e design quando existir;
- responsáveis, localização/empresa e canais reais;
- limites entre poesia, tradição e fato.

Evitar biografia genérica, fundador inventado, “ancestralidade” sem vínculo e sustentabilidade sem documentação.

### Claims culturais versus médicos

| Classe | Pode aparecer | Não pode virar |
|---|---|---|
| fato de composição | PDP/metadata/feed após prova | inferência de benefício |
| observação sensorial | PDP/guia com método e data | verdade universal ou efeito pessoal |
| contexto cultural/histórico | Journal/matéria com atribuição e fonte | claim do produto, Offer, alt promocional ou recomendação médica |
| linguagem simbólica da marca | campanha identificada | garantia de purificação, proteção, sono, foco, energia ou cura |
| segurança | PDP/guia após revisão | tranquilização absoluta como “não tóxico/seguro para todos” |
| saúde/terapia | não usar como aquisição/benefício | Product, metadata, schema, feed ou segmentação |

Forma editorial aceitável, após fonte/revisão:

```text
Em [tradição/documento/contexto], o olíbano é associado a [...].
Esta referência descreve um uso cultural documentado; não demonstra efeito médico,
ambiental ou espiritual do produto HEAL.
```

Forma bloqueada:

```text
Olíbano purifica o ambiente, cura ansiedade ou eleva a energia.
```

O contexto cultural não deve ser ocultado em microcopy para induzir expectativa de eficácia.

## 13. Atenção ética e ausência de dark patterns

A experiência pode ser marcante sem manipulação. Gates:

- nenhum estoque, contador, número de pessoas vendo ou urgência fictícios;
- sem CTA magnetizado, cursor perseguido, botão de recusa disfarçado ou checkout obstruído;
- animação não esconde preço, composição, segurança, saída ou comparação;
- escolha de aroma não infere estado emocional/saúde nem personaliza promessa;
- “mais vendido”, “premium”, “recomendado” e ordenação destaque exigem regra e dado reais;
- confirmação visual ocorre somente após sucesso autoritativo;
- reviews/testemunhos precisam ser reais, específicos, visíveis e governados;
- B2B/lead capture declara finalidade e não pré-marca marketing;
- experimento mede compreensão, conforto e conclusão, não maximiza tempo preso;
- reduced motion/data e lista convencional preservam o mesmo significado.

Esses requisitos são UX, confiança e qualidade de commerce; não “truques de SEO”.

## 14. AI Search, Images e Shopping

### Pronto para construir

- HTML/RSC é a fonte de conteúdo;
- links são crawlable;
- facts podem ser modelados com provenance;
- a arquitetura reserva conteúdo original de matéria/método;
- a Coreografia do Ar pode ser enhancement sem esconder entidade.

### Ainda bloqueado

- domínio/indexação;
- fotos/vídeos documentais;
- Product/Offer;
- sitemap/feed;
- organização, políticas, preço e estoque reais;
- Search Console, Merchant Center e Bing;
- métricas de campo.

Não criar `llms.txt`, schema “para IA”, páginas por fan-out ou texto reescrito para robôs. A prontidão correta é:

1. entidade inequívoca;
2. fatos próprios no HTML;
3. mídia documental;
4. schema/feed coerentes;
5. conteúdo com método e autoria;
6. crawl/indexação saudável;
7. monitoramento sem overclaim.

Merchant Center só recebe item quando `mode=production`, landing comprável, imagem real, preço/estoque/paridade, rights e políticas passam. Mockups atuais permanecem bloqueados mesmo tendo 1000×1000.

## 15. Checklist de lançamento

### Catálogo e identidade

- [ ] `HEAL` aprovado como nome em todas as superfícies;
- [ ] símbolo/wordmark final com rights e versões acessíveis;
- [ ] cinco product IDs, handles, SKUs e status estáveis;
- [ ] `HEALS` sempre explicado como incensos no primeiro contato;
- [ ] composição, formato, quantidade, origem e segurança por SKU têm fonte/owner/data;
- [ ] “Lavanda Celestial” revisada para não sugerir claim místico/médico;
- [ ] nenhuma alegação depende apenas do nome do aroma.

### Commerce

- [ ] preço BRL positivo e atual;
- [ ] estoque autoritativo; `unknown` bloqueia compra/schema;
- [ ] checkout real testado sem fixture;
- [ ] frete, devolução, termos, privacidade e contato vigentes;
- [ ] snapshot único alimenta UI, JSON-LD e feed;
- [ ] produto draft/preview não aparece em catálogo público.

### SEO técnico

- [ ] `SITE_ORIGIN` e `SEO_INDEXABLE` validados;
- [ ] canonical absoluto/self em todas as páginas indexáveis;
- [ ] busca, filtros, carrinho e checkout permanecem `noindex`;
- [ ] sitemap tem somente 200/indexable/self-canonical;
- [ ] robots do ambiente e `X-Robots-Tag` verificados por response;
- [ ] redirect map sem chains;
- [ ] 404/410 reais;
- [ ] title/description/H1 específicos;
- [ ] HTML sem JS contém produto, preço, estoque, links e schema aplicável.

### Schema

- [ ] `WebSite/OnlineStore` só com organização real;
- [ ] Breadcrumb visual = BreadcrumbList;
- [ ] ItemList reflete a ordem visível;
- [ ] cada Product/Offer passa os gates da seção 7;
- [ ] aromas não foram modelados incorretamente como ProductGroup;
- [ ] zero placeholder, fixture, review, shipping ou return inventado;
- [ ] Rich Results Test e Schema validator sem erro crítico.

### Imagens

- [ ] imagem principal real por SKU, vinculada à variante;
- [ ] rights/provenance/IPTC preservados;
- [ ] width/height/srcset/sizes e CLS verificados;
- [ ] alt contextual, sem keyword stuffing/claim;
- [ ] conceito ImageGen excluído de feed/schema documental;
- [ ] LCP/bytes mobile aprovados;
- [ ] imagem Merchant >=500×500; padrão interno preferido >=1500×1500 quando captura permitir.

### Conteúdo e ética

- [ ] claims classificados e aprovados por canal;
- [ ] contexto cultural tem fonte, atribuição e limite explícito;
- [ ] nenhuma landing médica/doorway;
- [ ] nenhuma urgência, review, popularidade ou escassez falsas;
- [ ] B2B só publica condições reais;
- [ ] experiência full/reduced preserva tarefa e compreensão.

### Contas e validação externa

- [ ] domínio público autorizado;
- [ ] Search Console conectado pelo owner;
- [ ] sitemap enviado e URLs inspecionadas;
- [ ] Merchant Center configurado e “Needs attention” revisado;
- [ ] Bing conectado se aprovado;
- [ ] CWV de campo separado por mobile/desktop quando houver amostra;
- [ ] relatório generativo tratado apenas conforme disponibilidade/campos reais.

## 16. Testes automatizados e critérios de aceite

### Unitários

- origin rejeita path/query/hash/http/preview quando indexável;
- fixture ou sandbox nunca retorna robots `index`;
- canonical builder remove tracking e preserva paginação aprovada;
- os cinco handles são únicos, minúsculos e sem acento;
- Product schema falha fechado sem imagem real, SKU, preço positivo, BRL ou estoque conhecido;
- disponibilidade mapeia apenas pelos enums aprovados;
- serializador JSON-LD escapa `<`;
- nenhum campo schema contém `[A VALIDAR]`, `DEMONSTRAÇÃO`, `fixture:` ou `null` indevido;
- claim médico/cultural não autorizado não entra em SEO DTO/feed;
- `mode !== production` implica `merchantEligible=false`.

### Integração/HTML

- cada PDP compartilha o mesmo snapshot entre metadata, H1, preço, estoque e JSON-LD;
- Home tem links diretos para a coleção e cinco PDPs publicadas;
- coleção dinâmica deriva metadata do objeto correto;
- busca é `noindex` com e sem query;
- filtro/sort é `noindex` e não entra em sitemap;
- breadcrumb visual e JSON-LD têm sequência/URLs idênticas;
- imagens de produto têm `src`, `width`, `height`, alt e URL crawlable;
- conteúdo comercial permanece no response HTML com JavaScript desabilitado.

### Crawl/build

- `npm run lint`, `npx tsc --noEmit`, unit/integration/e2e e build passam;
- crawler interno encontra 0 órfãs públicas, 0 links para redirect/404 e 0 canonical conflitante;
- 100% das URLs do sitemap retornam 200, indexable e self-canonical;
- sitemap contém 0 busca/filtro/cart/checkout/fixture/draft;
- response de preview prova `noindex` em meta e header;
- response de produção prova ausência do bloqueio somente após gate explícito;
- bundle/HTML não dependem de Three.js para conteúdo.

### Imagem/performance

- nenhum asset conceitual é exportado ao Merchant;
- Home não baixa o PNG de 2,47 MB quando uma variante otimizada atende ao slot;
- dimensões reservadas produzem CLS <=0,1;
- LCP/INP/CWV seguem `docs/performance/PERFORMANCE_BUDGET.md`;
- fotografia de produto mantém detalhe suficiente sem enviar original desnecessário.

### Critérios finais

- 100% das cinco PDPs reais têm title, description, H1, canonical e breadcrumb específicos;
- 100% têm paridade de preço/moeda/estoque UI ↔ JSON-LD ↔ feed;
- 0 schema crítico inválido;
- 0 claim médico/espiritual apresentado como fato/benefício do produto;
- 0 imagem conceitual tratada como produto real;
- 0 rota transacional no sitemap;
- `>=90%` dos participantes identifica que HEAL vende incensos em 5 s;
- confusão `HEALS` como outra marca <=5% na amostra definida;
- 100% conclui exploração e compra por teclado/reduced motion;
- status de indexação, Merchant, rich result e AI Search só é declarado com evidência externa correspondente.

## 17. Sequência de execução recomendada

1. **Preview seguro:** integrar os cinco nomes/handles como concept fixtures, otimizar imagens e manter bloqueio total.
2. **Source of truth:** ampliar DTO/facts/claims/assets e cadastrar produtos drafts.
3. **Conteúdo básico:** PDPs, coleção, Home, guia/matéria/sobre e B2B somente no escopo factual disponível.
4. **Metadata/canonical:** implementar helper de origin e metadata em ambos os ambientes; ainda `noindex`.
5. **Schema/feed sandbox:** gerar e validar fechado, sem enviar a contas.
6. **QA interno:** crawl, HTML sem JS, schema, imagens, claims, acessibilidade, performance e commerce.
7. **Operação:** políticas, empresa, checkout, shipping, support e mídia real.
8. **Deploy autorizado:** provar headers/origin, executar ferramentas oficiais.
9. **Go-live:** ativar `SEO_INDEXABLE=true` somente em release aprovado; publicar sitemap/feed.
10. **Monitorar:** indexação, issues, CWV, busca convencional e commerce; generative report apenas se existir.

Rollback: uma divergência de preço/estoque, claim grave, imagem errada ou falha de checkout deve retirar o item do feed/schema comercial e, quando necessário, voltar a PDP a `noindex`/indisponível sem apagar evidência do incidente.

## 18. Fontes oficiais já verificadas

Pesquisa-base consultada em 2026-08-28, sem nova pesquisa necessária nesta auditoria:

- [Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical)
- [Google Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google — AI features and your website](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google Ecommerce SEO](https://developers.google.com/search/docs/specialty/ecommerce)
- [Google Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Google Product variants](https://developers.google.com/search/docs/appearance/structured-data/product-variants)
- [Google Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google Image SEO](https://developers.google.com/search/docs/appearance/google-images)
- [Merchant Center product data specification](https://support.google.com/merchants/answer/7052112)
- [Merchant Center 2026 updates](https://support.google.com/merchants/answer/16989427)
- [Merchant Center AI-generated content](https://support.google.com/merchants/answer/14743464)
- [W3C WAI alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)

## 19. Estado honesto

Esta entrega produz uma arquitetura e gates executáveis. Ela não prova:

- domínio, indexação ou canonical de produção;
- Search Console/Merchant Center/Bing conectados;
- Product rich result;
- catálogo, preço, estoque, composição, política ou mídia reais;
- demanda por keyword;
- visibilidade em AI Overview/AI Mode;
- conformidade regulatória final de claims.

O status permanece `fixture/noindex + specification`. Remover `noindex` é uma ação de release posterior, explícita e auditada.
