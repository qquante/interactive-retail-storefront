# HEAL — Contrato de commerce, catálogo e checkout

Data: 2026-08-28  
Owner: HEAL-13  
Estado: `proposed-for-vertical-slice`; contrato, não implementação.  
Dependências: ADR-001, HEAL-05, catálogo/conta/provedor `[A VALIDAR]`.

## 1. Decisão e limites

O storefront consome portas provider-agnostic. A vertical slice implementará `FixtureCommerceAdapter`, sempre rotulado como demonstração. A integração candidata de produção é `ShopifyCommerceAdapter`, com Shopify como autoridade e handoff para o `checkoutUrl` hospedado.

Fora deste contrato: coleta de cartão, geração de Pix/boleto, captura/reembolso, pedido autoritativo próprio, assinatura, marketplace e deploy. Nenhum meio de pagamento é prometido.

## 2. Invariantes

1. Preço, desconto, estoque, frete e total exibidos como operacionais vêm da resposta server-side, nunca de valores enviados pelo cliente.
2. Todo valor monetário usa string decimal + ISO 4217; nunca `number`/float para cálculo.
3. Produto comprável sempre resolve para uma variante e SKU únicos.
4. `inventory.status === "unknown"` bloqueia compra; não vira “em estoque”.
5. Total de carrinho é `estimated` até confirmação do checkout.
6. Mudança de preço/estoque gera resposta explícita e exige nova ação; nunca substituição silenciosa.
7. Carrinho é preservado em falha de frete/checkout.
8. Fixture, sandbox e produção são estados visíveis e serializados, não apenas copy decorativa.
9. IDs/tokens privados de provedor não entram em HTML, analytics, logs de frontend ou URLs próprias.
10. `checkoutUrl` só é entregue após revalidação e allowlist; nunca é construída pelo cliente.

## 3. Tipos canônicos TypeScript

```ts
type Opaque<Tag extends string> = string & { readonly __tag: Tag };

export type ProductId = Opaque<"ProductId">;
export type VariantId = Opaque<"VariantId">;
export type CollectionId = Opaque<"CollectionId">;
export type CartId = Opaque<"CartId">;
export type CartLineId = Opaque<"CartLineId">;
export type DiscountId = Opaque<"DiscountId">;
export type ShippingOptionId = Opaque<"ShippingOptionId">;
export type CheckoutAttemptId = Opaque<"CheckoutAttemptId">;
export type IdempotencyKey = Opaque<"IdempotencyKey">;
export type CurrencyCode = Opaque<"ISO4217CurrencyCode">;
export type DateTimeIso = Opaque<"DateTimeIso">;

export type CommerceMode = "fixture" | "sandbox" | "production";
export type CommerceProvider = "fixture" | "shopify" | "mercado_pago";

export interface DataProvenance {
  mode: CommerceMode;
  provider: CommerceProvider;
  fetchedAt: DateTimeIso;
  label: string; // ex.: "Demonstração — dados fictícios"
}

export interface Money {
  amount: string; // decimal canônico, ex.: "49.90"
  currencyCode: CurrencyCode; // BRL no mercado inicial [A VALIDAR]
}

export interface Price {
  current: Money;
  compareAt: Money | null;
  unitLabel: string | null;
  includesTax: boolean | null; // [A VALIDAR]
  checkedAt: DateTimeIso;
}

export interface CommerceImage {
  id: Opaque<"ImageId">;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductOptionValue {
  optionName: string;
  value: string;
}

export interface Sku {
  value: string; // obrigatório, único e não vazio em produção
}

export type InventoryStatus =
  | "in_stock"
  | "low_stock"
  | "out_of_stock"
  | "backorder"
  | "unknown";

export interface Inventory {
  status: InventoryStatus;
  availableQuantity: number | null; // null quando provedor não expõe
  purchasePolicy: "deny" | "continue";
  checkedAt: DateTimeIso;
}

export interface Variant {
  id: VariantId;
  sku: Sku;
  title: string;
  options: readonly ProductOptionValue[];
  price: Price;
  inventory: Inventory;
  image: CommerceImage | null;
  active: boolean;
}

export interface SensoryProfile {
  aromaticFamily: string | null; // [A VALIDAR]
  descriptors: readonly string[];
  perceivedIntensity: "soft" | "medium" | "marked" | null; // [A VALIDAR]
  smokeLevel: "low" | "medium" | "high" | null; // [A VALIDAR]
  methodologyRef: string | null; // obrigatório antes de publicar escalas
}

export interface ProductFacts {
  format: string | null;
  ingredients: readonly string[] | null;
  origin: string | null;
  quantityLabel: string | null;
  burnTimeLabel: string | null;
  usage: readonly string[] | null;
  safety: readonly string[] | null;
}

export interface Product {
  id: ProductId;
  handle: string;
  title: string;
  summary: string;
  descriptionHtml: string;
  status: "active" | "draft" | "archived";
  featuredImage: CommerceImage | null;
  images: readonly CommerceImage[];
  sensory: SensoryProfile;
  facts: ProductFacts;
  variants: readonly Variant[];
  collectionIds: readonly CollectionId[];
  provenance: DataProvenance;
}

export interface Collection {
  id: CollectionId;
  handle: string;
  title: string;
  description: string;
  image: CommerceImage | null;
  productCount: number;
  provenance: DataProvenance;
}

export type DiscountApplication =
  | {
      id: DiscountId;
      kind: "code";
      code: string;
      status: "applied" | "rejected" | "pending";
      allocation: Money | null;
      message: string | null;
    }
  | {
      id: DiscountId;
      kind: "automatic";
      title: string;
      status: "applied";
      allocation: Money;
      message: string | null;
    };

export interface CartLine {
  id: CartLineId;
  variantId: VariantId;
  sku: Sku;
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  image: CommerceImage | null;
  quantity: number;
  unitPrice: Price;
  lineSubtotal: Money;
  discountAllocations: readonly Money[];
  lineTotal: Money;
  inventory: Inventory;
}

export interface ShippingAddressDraft {
  countryCode: "BR";
  postalCode: string;
  regionCode?: string;
  city?: string;
  // nome, email e endereço completo não pertencem à estimativa por CEP
}

export interface ShippingOption {
  id: ShippingOptionId;
  title: string;
  price: Money;
  estimatedBusinessDays: { min: number; max: number } | null;
  providerLabel: string | null;
}

export type ShippingState =
  | { status: "not_requested" }
  | { status: "loading"; postalCode: string }
  | {
      status: "available";
      postalCodeMasked: string;
      options: readonly ShippingOption[];
      selectedOptionId: ShippingOptionId | null;
      checkedAt: DateTimeIso;
    }
  | {
      status: "unavailable" | "temporary_error";
      postalCodeMasked: string;
      message: string;
      retryable: boolean;
    };

export interface CartCost {
  subtotal: Money;
  discountTotal: Money;
  shipping: Money | null;
  taxes: Money | null;
  total: Money;
  finality: "estimated" | "final";
  checkedAt: DateTimeIso;
}

export interface CartSnapshot {
  id: CartId;
  revision: string;
  status: "active" | "expired" | "completed";
  currencyCode: CurrencyCode;
  lines: readonly CartLine[];
  discounts: readonly DiscountApplication[];
  shipping: ShippingState;
  cost: CartCost;
  totalQuantity: number;
  expiresAt: DateTimeIso | null;
  provenance: DataProvenance;
}

export type CheckoutHandoff =
  | {
      kind: "fixture";
      attemptId: CheckoutAttemptId;
      cart: CartSnapshot;
      message: "Demonstração — nenhum pagamento será processado";
    }
  | {
      kind: "external";
      attemptId: CheckoutAttemptId;
      provider: "shopify";
      checkoutUrl: string;
      destinationLabel: string;
      expiresAt: DateTimeIso | null;
      cartRevision: string;
    };
```

### Campos que não podem ser inventados

`ingredients`, `origin`, `burnTimeLabel`, intensidade, fumaça, preço, compare-at, estoque, disponibilidade, desconto, prazo, frete, imposto, reviews e meios de pagamento permanecem `null`, omitidos ou `[A VALIDAR]` até fonte autoritativa.

## 4. Ports

```ts
export interface PageInput {
  cursor?: string;
  limit: number;
}

export interface Page<T> {
  items: readonly T[];
  nextCursor: string | null;
}

export interface CatalogQuery {
  collectionHandle?: string;
  search?: string;
  filters?: Readonly<Record<string, readonly string[]>>;
  sort?: "featured" | "price_asc" | "price_desc" | "title_asc";
}

export interface CatalogPort {
  getProductByHandle(handle: string): Promise<Result<Product>>;
  getCollectionByHandle(handle: string): Promise<Result<Collection>>;
  listProducts(query: CatalogQuery, page: PageInput): Promise<Result<Page<Product>>>;
  listCollections(page: PageInput): Promise<Result<Page<Collection>>>;
}

export interface MutationContext {
  requestId: string;
  idempotencyKey: IdempotencyKey;
  expectedCartRevision?: string;
}

export interface CartPort {
  create(context: MutationContext): Promise<Result<CartSnapshot>>;
  get(cartId: CartId): Promise<Result<CartSnapshot>>;
  addLine(
    cartId: CartId,
    input: { variantId: VariantId; quantity: number },
    context: MutationContext,
  ): Promise<Result<CartSnapshot>>;
  updateLine(
    cartId: CartId,
    input: { lineId: CartLineId; quantity: number },
    context: MutationContext,
  ): Promise<Result<CartSnapshot>>;
  removeLine(
    cartId: CartId,
    input: { lineId: CartLineId },
    context: MutationContext,
  ): Promise<Result<CartSnapshot>>;
  applyDiscountCode(
    cartId: CartId,
    input: { code: string },
    context: MutationContext,
  ): Promise<Result<CartSnapshot>>;
}

export interface ShippingPort {
  estimate(
    cartId: CartId,
    address: ShippingAddressDraft,
    context: MutationContext,
  ): Promise<Result<CartSnapshot>>;
  select(
    cartId: CartId,
    optionId: ShippingOptionId,
    context: MutationContext,
  ): Promise<Result<CartSnapshot>>;
}

export interface CheckoutPort {
  prepare(
    cartId: CartId,
    context: MutationContext,
  ): Promise<Result<CheckoutHandoff>>;
}
```

Nenhum port de `Payment` é exposto ao storefront. Pagamento acontece no boundary oficial do provedor.

## 5. Resultado e taxonomia de erros

```ts
export type CommerceErrorCode =
  | "INVALID_INPUT"
  | "NOT_FOUND"
  | "CATALOG_UNAVAILABLE"
  | "VARIANT_UNAVAILABLE"
  | "INVENTORY_UNKNOWN"
  | "INSUFFICIENT_STOCK"
  | "PRICE_CHANGED"
  | "CART_NOT_FOUND"
  | "CART_EXPIRED"
  | "CART_CONFLICT"
  | "DISCOUNT_INVALID"
  | "DISCOUNT_UNSUPPORTED"
  | "SHIPPING_NOT_CONFIGURED"
  | "SHIPPING_UNAVAILABLE"
  | "PROVIDER_TIMEOUT"
  | "PROVIDER_RATE_LIMITED"
  | "CHECKOUT_NOT_CONFIGURED"
  | "CHECKOUT_URL_INVALID"
  | "UNAUTHORIZED"
  | "INTERNAL_ERROR";

export interface CommerceError {
  code: CommerceErrorCode;
  message: string; // segura para UI, sem segredo/PII
  field?: string;
  retryable: boolean;
  requestId: string;
  currentCart?: CartSnapshot; // estado válido preservado
}

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: CommerceError };
```

### Recuperação UX

| Erro | Comportamento |
|---|---|
| `PRICE_CHANGED` | Mostrar preço anterior/atual retornado, atualizar carrinho e pedir confirmação. |
| `INSUFFICIENT_STOCK` | Manter variante, informar máximo; ajuste só com consentimento. |
| `INVENTORY_UNKNOWN` | Bloquear CTA e oferecer retry. |
| `CART_CONFLICT` | Buscar snapshot atual, anunciar atualização e reaplicar ação somente com nova chave. |
| `SHIPPING_UNAVAILABLE` | Distinguir CEP não atendido de falha temporária; preservar CEP/itens. |
| `PROVIDER_TIMEOUT/RATE_LIMITED` | Backoff, retry explícito; nunca duplicar mutação. |
| `CHECKOUT_NOT_CONFIGURED` | Na fixture, handoff demonstrativo; em produção, bloquear e orientar suporte. |
| `CHECKOUT_URL_INVALID` | Não redirecionar; registrar evento sem URL/token e preservar carrinho. |

## 6. Boundary server/client

### Server-only

- tokens privados Shopify/Mercado Pago e secrets de webhook;
- IDs completos de carrinho do provedor e provider references;
- consulta/mutação Storefront API;
- revalidação de variante, preço, moeda, estoque, desconto, frete e total;
- idempotency store, locks por carrinho e reconciliação;
- geração, validação e allowlist de `checkoutUrl`;
- logs técnicos redigidos.

### Permitido ao cliente

- IDs internos opacos, handles, snapshots DTO e `requestId`;
- cart cookie opaco/sessão própria; nunca o ID secreto do carrinho Shopify;
- `checkoutUrl` somente na resposta final de handoff e apenas para navegação; não persistir em analytics/log;
- preferências de UI e, na fixture, linhas demonstrativas persistidas com rótulo.

### Validação runtime

Todos os inputs e respostas de provedor devem passar por schema runtime `[biblioteca A VALIDAR]`. Regras mínimas:

- quantity: inteiro `1..99` `[limite A VALIDAR]`;
- handle e IDs: comprimento/formato/allowlist;
- moeda única por carrinho;
- CEP: normalizar 8 dígitos sem afirmar entrega;
- código de desconto: trim, tamanho máximo, sem log em claro quando sensível;
- URL externa: `https:`, hostname em allowlist configurada, sem credenciais, sem host por substring;
- payload de provider: falha fechada se campo obrigatório faltar.

## 7. Fixture explícita

`FixtureCommerceAdapter` deve:

- usar IDs prefixados `fixture:` e `provenance.mode = "fixture"`;
- mostrar faixa persistente: **“Demonstração — produtos, valores, estoque e frete fictícios; nenhum pagamento será processado.”**;
- conter catálogo pequeno, versionado e totalmente estático;
- recalcular preço/estoque no boundary server da fixture, sem confiar no cliente;
- aceitar somente moeda `BRL` demonstrativa;
- simular frete somente com `providerLabel = "Simulação"`;
- não aceitar cupom, ou responder `DISCOUNT_UNSUPPORTED`;
- em `prepare`, retornar `CheckoutHandoff.kind = "fixture"`, nunca URL externa ou pedido concluído;
- nunca usar logos/meios de pagamento/reviews/urgência/estoque baixo falsos;
- persistir apenas IDs/quantidades necessários e permitir limpar a demonstração.

O banner não pode ser removido por CSS, breakpoint, animação ou query param.

## 8. Cache e consistência

| Dado | Política proposta | Invalidação |
|---|---|---|
| Conteúdo/coleção sem preço | Cache público curto + stale-while-revalidate `[TTL A VALIDAR]` | webhook + revalidação manual |
| Preço resumido na PLP/PDP | Cache curto `[TTL A VALIDAR]`; mostrar `checkedAt` internamente | webhook e refresh por demanda |
| Estoque | Cache mínimo; revalidar antes de add/update/checkout | cada mutação + webhook |
| Carrinho/buyer | `private, no-store`; nunca cache compartilhado | por mutação/expiração |
| Frete | por cart revision + CEP normalizado; TTL curto `[A VALIDAR]` | linha/endereço/opção muda |
| `checkoutUrl` | não cachear; solicitar após snapshot fresco | toda tentativa |

Webhooks aceleram invalidação, mas não são fonte única. Job de reconciliação periódico compara produtos/variantes/estoque atualizados. Eventos fora de ordem usam versão/timestamp autoritativo; estado antigo não sobrescreve novo.

## 9. Idempotência e concorrência

1. Toda mutação recebe chave UUID gerada uma vez por ação do usuário.
2. O servidor guarda `key + operação + hash do payload + status + resposta` por TTL `[A VALIDAR]`.
3. Mesma chave + mesmo payload retorna resposta original; mesma chave + payload diferente retorna conflito.
4. Operações por carrinho são serializadas ou usam `expectedCartRevision`/compare-and-swap.
5. Retry automático somente para erros transitórios e com a mesma chave; nunca depois de erro de validação.
6. Shopify: dedupe local obrigatório; não assumir idempotência de `cartLinesAdd`.
7. Mercado Pago futuro: propagar chave dedicada em `X-Idempotency-Key` quando a API exigir; não reutilizar chave entre operações distintas.
8. Webhook: verificar assinatura sobre raw body, deduplicar delivery/event ID, persistir antes do ack e responder rapidamente.
9. Não depender de ordem de webhook. Buscar o recurso autoritativo antes de transicionar pedido.
10. Reconciliação cobre evento perdido, timeout após sucesso e divergência de estoque/pagamento.

## 10. Mapping Shopify futuro

| Contrato HEAL | Shopify |
|---|---|
| `Product` | `Product` + metafields aprovados |
| `Variant`/`Sku` | `ProductVariant`/`sku` |
| `Collection` | `Collection` |
| `Price` | `MoneyV2` + compare-at |
| `Inventory` | availability/quantity conforme scope permitido |
| `CartSnapshot` | Storefront `Cart` |
| linhas | `cartLinesAdd/Update/Remove` |
| descontos | `cartDiscountCodesUpdate` e allocations |
| frete | delivery address/groups/options quando habilitados |
| handoff | `Cart.checkoutUrl` |

Regras:

- pin de API `[2026-07 A VALIDAR NO DIA DA IMPLEMENTAÇÃO]`;
- token privado e cart ID completo somente server-side;
- `buyerIdentity` só com necessidade/base adequada; estimativa por CEP não coleta email/nome;
- buscar `Cart` fresco antes do handoff;
- custos Shopify continuam estimados até checkout;
- a URL retornada deve pertencer à allowlist Shopify/domínio aprovado `[A VALIDAR]`;
- Mercado Pago dentro do checkout Shopify permanece configuração externa, não port de pagamento HEAL.

## 11. Handoff de checkout

Fluxo futuro:

```text
cliente POST /api/checkout/prepare { cartId, idempotencyKey, revision }
→ servidor recupera carrinho/provider ID secreto
→ revalida linhas, preço, moeda, estoque, descontos e frete
→ se mudou: retorna erro + currentCart, sem URL
→ consulta checkoutUrl atual no provider
→ valida https + hostname allowlisted
→ registra attempt sem URL/token/PII
→ retorna CheckoutHandoff.external
→ cliente mostra domínio de destino e redireciona por ação explícita
```

Falha nunca esvazia carrinho. O retorno do provedor não é confirmação autoritativa de pagamento; confirmação/pós-compra exige pedido consultado ou webhook reconciliado `[integração futura]`.

## 12. Blockers de integração real

- catálogo, handles, variantes e SKUs definitivos `[A VALIDAR]`;
- preços BRL, tributação, compare-at e política promocional `[A VALIDAR]`;
- estoque, backorder e reserva `[A VALIDAR]`;
- conta/plano Shopify, Headless channel e scopes `[A VALIDAR]`;
- provedor Brasil e meios de pagamento habilitados em teste `[A VALIDAR]`;
- checkout convidado, Pix, boleto, cartão e parcelas validados separadamente `[A VALIDAR]`;
- frete, CEPs, transportadora, prazos e política `[A VALIDAR]`;
- storage server-side para provider cart ID/idempotência `[A VALIDAR]`;
- domínio/allowlist/URLs de retorno `[A VALIDAR]`;
- webhooks, secret rotation, DLQ/retry e job de reconciliação `[A VALIDAR]`;
- CNPJ, políticas, LGPD, suporte e observabilidade `[A VALIDAR]`.

## 13. Critérios de aceite

1. UI depende apenas dos ports e compila com fixture sem import Shopify/MP.
2. Todos os dados fixture exibem rótulo persistente em 320–1920 px.
3. Preço, estoque, desconto, frete e total não são aceitos do cliente.
4. Money nunca é calculado com float.
5. SKU é obrigatório/único e produto comprável resolve variante ativa.
6. Estados unknown/esgotado/preço alterado/frete indisponível bloqueiam ou recuperam corretamente.
7. Retry duplicado não duplica linhas nem checkout attempts.
8. Carrinho permanece íntegro após timeout, conflito, erro de frete e falha de checkout.
9. Fixture não produz URL, pagamento ou pedido falso.
10. Adapter Shopify mantém token e cart secret fora do cliente/logs.
11. `checkoutUrl` é fresca, HTTPS e allowlisted antes de ser retornada.
12. Webhooks futuros validam HMAC, deduplicam e reconciliam fora de ordem.
13. Nenhum meio de pagamento aparece antes de teste real documentado.
14. Unit tests cobrem validação/money/mapping; integração cobre ports; E2E cobre happy path, price change, estoque, retry, expiração e fixture handoff.

## Handoff

- **HEAL-08/09:** implementar tipos e adapters em módulos server/client separados, sem SDK de pagamento.
- **HEAL-14:** escolher schemas runtime, storage de sessão/idempotência, cache tags e webhook/reconciliation design.
- **HEAL-19:** revisar cookies, secrets, allowlist, logs, HMAC, PII/LGPD e rate limit.
- **HEAL-21:** criar testes de contrato compartilhados para fixture e futuro Shopify adapter.
- **HEAL-00:** manter ADR-001; nova ADR é obrigatória antes de commerce próprio + Mercado Pago.

