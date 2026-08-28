# ADR-001 — Storefront e engine de commerce

Data: 2026-08-28  
Estado: `accepted-for-vertical-slice`  
Owner: HEAL-00, a partir do handoff research-only do HEAL-01

## Decisão

1. Manter `site/` como storefront Sites/Vinext durante a vertical slice.
2. Tratar Shopify como futura autoridade de catálogo, preço, estoque, carrinho e pedidos.
3. Isolar commerce atrás de portas TypeScript (`CatalogPort`, `CartPort`, `CheckoutPort`).
4. Implementar primeiro uma fixture local explicitamente identificada como demonstração.
5. Preparar a finalização por `checkoutUrl` hospedado pela Shopify, sem inventar conexão ou pagamento.
6. Não misturar Hydrogen no runtime Vinext. Hydrogen/Oxygen será a alternativa se os gates de compatibilidade do Vinext falharem.
7. Não adotar commerce self-hosted + Mercado Pago no MVP sem nova ADR e escopo operacional próprio.

## Contexto

O scaffold atual já utiliza Vinext/Vite/Sites/Cloudflare. A HEAL ainda não forneceu catálogo real, conta de commerce, credenciais, política de frete ou checkout. O projeto precisa avançar de modo demonstrável sem transformar dados fictícios em alegações comerciais.

## Justificativa

- preserva o scaffold e reduz retrabalho inicial;
- mantém a UI desacoplada de um provedor;
- reduz a superfície financeira própria;
- deixa claro onde fixture termina e produção começa;
- permite abandonar Vinext cedo caso SSR, cache, metadata, imagens ou checkout falhem.

## Consequências

- o checkout futuro terá o boundary visual e financeiro do provedor;
- integração real depende de conta, canal Headless, token, catálogo e regras fornecidas pelo usuário;
- a versão da Storefront API deverá ser revisada trimestralmente;
- Vinext beta permanece risco monitorado;
- conteúdo, CTA, preço demonstrativo e SEO essencial devem existir no HTML sem depender de WebGL.

## Gates antes de congelar para produção

- `vinext check`, lint, typecheck e build verdes;
- SSR/hydration e HTML sem JavaScript verificados;
- metadata, canonical, JSON-LD, robots e sitemap validados;
- cache público de catálogo separado do estado privado do carrinho;
- imagens e fontes compatíveis com Vinext;
- vertical slice fixture completa e rotulada;
- bundle, CWV lab, GPU, cleanup e fallback medidos;
- Chromium, Firefox e WebKit em desktop/mobile;
- aceite explícito do usuário para Shopify e checkout hospedado.

## Fontes oficiais consultadas

- [Hydrogen fundamentals](https://shopify.dev/docs/storefronts/headless/hydrogen/fundamentals)
- [Hydrogen cart](https://shopify.dev/docs/storefronts/headless/hydrogen/cart)
- [Shopify Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api)
- [Cart checkoutUrl](https://shopify.dev/docs/api/storefront/latest/queries/cart)
- [Mercado Pago Orders API](https://www.mercadopago.com.br/developers/pt/docs/checkout-api-orders/integration-model)
- [Vinext](https://github.com/cloudflare/vinext)

