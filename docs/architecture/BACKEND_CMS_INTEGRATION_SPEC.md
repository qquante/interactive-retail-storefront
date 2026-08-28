# HEAL. CURA. — Especificação de integração backend, CMS e commerce

Data: 2026-08-28  
Owner: HEAL-14  
Estado: especificação implementável; nenhuma conta, credencial, API, webhook ou checkout foi conectado.  
Decisão vigente: Shopify Storefront API + checkout hospedado é **candidato**, não provider aprovado. CMS, storage, frete e meios de pagamento no Brasil permanecem `[A VALIDAR]`.

## 1. Objetivo e limites

Definir a arquitetura que permite substituir a fixture atual por catálogo e conteúdo autoritativos sem acoplar a UI a Shopify, CMS ou storage específicos. O primeiro incremento obrigatório é uma fixture servida pelo backend com paridade funcional; somente depois entram CMS e sandbox.

Fora deste escopo: escolher/contratar provider, criar conta, armazenar cartão, processar pagamento no site, configurar Pix/boleto/cartão/parcelas, emitir pedido próprio, publicar ou fazer deploy.

## 2. Evidência do estado atual

Arquivos auditados:

- `site/lib/commerce/types.ts`: tipos opacos, `Money` decimal em string, provenance, ports e taxonomia de erros.
- `site/lib/commerce/fixture-adapter.ts`: adapter em memória com revisão otimista e deduplicação por chave, não persistente.
- `site/lib/commerce/cart-store.ts`: fluxo realmente usado pela UI; lê e muta `sessionStorage` no navegador.
- `site/components/commerce/AddToCartForm.tsx`, `CartView.tsx` e `CheckoutHandoff.tsx`: mutations e handoff executados inteiramente no cliente.
- rotas de coleção/PDP: server components consultam diretamente o singleton `fixtureCommerce`.
- `docs/content/CONTENT_MODEL.md`: contrato de verdade editorial, evidência e claims.
- `site/.openai/hosting.json`: sem D1/R2 configurados; não existe storage server-side.

### Findings

| ID | Sev. | Finding | Consequência / decisão |
|---|---:|---|---|
| BE-01 | P0 produção | Existem duas implementações de cart: `FixtureCommerceAdapter` e `cart-store.ts`; a UI usa a segunda. | Não conectar Shopify no client store. Criar BFF server-side e fazer a fixture passar pelo mesmo contrato HTTP/server action do futuro adapter. |
| BE-02 | P0 produção | Preço, estoque, frete, revisão e handoff são recalculados no navegador a partir da fixture importada. | Válido apenas como demonstração. Em sandbox/produção, toda mutação e revalidação deve ocorrer no servidor. |
| BE-03 | P0 produção | Idempotência/revisão do adapter são mapas em memória; reinício ou múltiplas instâncias perdem estado. | Persistir sessão, idempotency records e locks/CAS em storage server-side `[A VALIDAR]`. |
| BE-04 | P0 produção | Não há API route/server action, schema runtime, autenticação de sessão, rate limit ou CSRF/origin gate. | Criar boundary BFF antes de qualquer token/provider. |
| BE-05 | P1 | Catálogo RSC importa singleton fixture diretamente. | Introduzir `getCommerceContext()` server-only e injeção de adapter por modo. |
| BE-06 | P1 | `CommerceProvider` inclui `mercado_pago`, mas não há `PaymentPort` e o ADR não o aprovou. | Preservar ausência de payment port. Mercado Pago/meios Brasil ficam `[A VALIDAR]` dentro do boundary oficial do checkout. |
| BE-07 | P1 | `DataProvenance` é agregado por entidade, insuficiente para claims editoriais por campo/lote/canal. | CMS precisa materializar `VerifiedField` + `EvidenceRef` e eligibility por consumidor. |
| BE-08 | P1 | Não há cache tags, revalidation, webhook inbox/outbox, reconciliação ou observabilidade estruturada. | Implementar por fases; webhook acelera invalidação, nunca vira fonte única. |
| BE-09 | P1 | `descriptionHtml` é string sem política de sanitização documentada. | Preferir rich-text AST allowlisted; se HTML for inevitável, sanitizar no servidor antes de cache/render. |
| BE-10 | P2 | IDs internos e IDs de provider ainda não têm registry/mapping persistente. | Criar tabela de mapping; nunca expor cart secret/token de provider no browser. |

## 3. Arquitetura alvo

```text
RSC / Client UI
  -> HEAL BFF (server actions ou /api/commerce/*)
      -> schemas runtime + session + origin/CSRF + rate limit
      -> CommerceService / ContentService
          -> CatalogPort / CartPort / ShippingPort / CheckoutPort
          -> ContentPort / EvidencePort / MediaPort
              -> Fixture adapters
              -> CMS adapter [A VALIDAR]
              -> Shopify Storefront adapter (candidato)
          -> SessionStore / IdempotencyStore / LockStore [A VALIDAR]
          -> Cache/tag index [A VALIDAR]
          -> Webhook inbox + workers + reconciliation
          -> logs, métricas e traces redigidos
```

### Módulos e ownership

| Módulo | Ambiente | Responsabilidade |
|---|---|---|
| `commerce/contracts` | compartilhado, sem segredo | DTOs, ports, erros e schemas serializáveis. |
| `commerce/server` | server-only | casos de uso, provider selection, revalidação e allowlists. |
| `commerce/adapters/fixture` | server-only no passo 1 | paridade determinística da demo. |
| `commerce/adapters/shopify` | server-only | GraphQL, mapping e user errors; só existe após gate sandbox. |
| `content/server` | server-only | conteúdo, evidência, eligibility e composição com catálogo. |
| `app/api/commerce/*` ou server actions | server-only | boundary autenticado da sessão e envelope HTTP. |
| `components/*` | client/RSC | renderiza snapshots; nunca importa SDK/token/provider adapter. |

Regra de import: qualquer arquivo que importe token, cart ID completo do provider, secret, SDK Admin ou webhook secret deve começar no boundary server-only e não pode ser reexportado pelo barrel compartilhado.

## 4. Contratos adicionais

Os ports existentes permanecem a base. Acrescentar contratos provider-neutral sem alterar a semântica da fixture:

```ts
interface ContentPort {
  getProductContent(productId: ProductId, locale: "pt-BR"): Promise<Result<ProductContent>>;
  getCollectionContent(collectionId: CollectionId, locale: "pt-BR"): Promise<Result<CollectionContent>>;
  getPolicy(kind: PolicyKind, locale: "pt-BR"): Promise<Result<PolicyContent>>;
}

interface EvidencePort {
  getEvidence(ids: readonly string[]): Promise<Result<readonly EvidenceRef[]>>;
  evaluatePublication(input: PublicationInput): Promise<Result<PublicationEligibility>>;
}

interface ProviderIdMap {
  internalId: string;
  provider: "shopify" | "cms";
  providerResourceType: "product" | "variant" | "collection" | "cart" | "content";
  providerIdEncryptedOrHashed: string;
  providerVersion: string | null;
  updatedAt: string;
}
```

### Envelope BFF

Toda resposta de mutação retorna:

```ts
type ApiResult<T> =
  | { ok: true; data: T; requestId: string; serverTime: string }
  | { ok: false; error: CommerceError; requestId: string; serverTime: string };
```

O cliente envia apenas IDs internos opacos, quantidade, CEP mínimo quando necessário, `expectedCartRevision` e `Idempotency-Key`. Nunca envia preço, subtotal, estoque, frete, desconto, total, provider cart ID ou checkout URL.

## 5. Autoridade e proveniência

| Campo | Fonte autoritativa | CMS pode editar? | Revalidação |
|---|---|---:|---|
| product/variant ativo, SKU, price, compare-at, currency, stock | commerce provider | não | add/update/prepare + webhook/reconciliação |
| frete, prazo e total | commerce/logística no contexto do cart | não | cart revision + CEP + prepare |
| título comercial/handle | commerce, com governança `[A VALIDAR]` | somente por workflow definido | publicação/sync |
| composição, origem, formato, quantidade, uso, segurança | CMS somente com evidência | sim, draft; publicação gated | revisão/validade por claim |
| narrativa, contexto, guia | CMS | sim | claims review |
| mídia, rights, alt/caption | DAM/CMS `[A VALIDAR]` | sim | validade/direitos |
| políticas | CMS/legal workflow | sim | effective date + reviewer |

Join obrigatório: `internal productId/variantId`, nunca handle como chave primária. Handle pode mudar; SKU identifica item operacional, mas também não substitui ID interno.

## 6. Schema CMS provider-neutral

Nenhum CMS foi escolhido. O schema abaixo deve caber em CMS externo, Shopify metaobjects/metafields ou solução híbrida.

### Entidades

1. `ProductEditorial`: `productId`, locale, displayName, summary, sensory fields, facts, instructions, safety, SEO, media refs, status, revision.
2. `CollectionEditorial`: `collectionId`, kind, descriptions, methodology ref, SEO, media refs, status.
3. `ClaimRecord`: afirmação atômica, campo-alvo, escopo (`product|variant|lot|policy|brand`), locale, canal, status, owner, reviewer, reviewedAt, validUntil, evidence IDs.
4. `EvidenceRecord`: tipo de fonte, documento/URI privado ou público, checksum, issuer, collectedAt, scope, notes; acesso restrito quando contiver dado pessoal/confidencial.
5. `SensoryMethod`: método, escala, amostra, ambiente, limitações e reviewer.
6. `MediaAsset`: URL/asset ID, dimensões, tipo, rights owner, licença/permissão, origem sintética, product scope, alt, caption e evidence IDs.
7. `Policy`: kind, locale, status, effectiveAt, owner, reviewer e blocos versionados.
8. `PublicationManifest`: revision do conteúdo + revision de catálogo + claims elegíveis + hashes emitidos para UI, metadata, schema e feed.

### Gate por claim

Um campo só pode compor produção se:

- `status === validated`;
- há ao menos um `EvidenceRecord` aplicável ao mesmo produto/variante/lote;
- `reviewedAt` e reviewer existem;
- `validUntil` é nulo ou futuro;
- o canal consumidor está autorizado;
- não conflita com dado de commerce;
- instruções/safety preservam escopo e severidade da fonte.

Fixture e draft jamais alimentam JSON-LD, feed, ads ou páginas indexáveis. `[A VALIDAR]` é estado de workflow, não texto de produção.

### Opção Shopify metafields/metaobjects

Se escolhida, apenas definitions explicitamente públicas podem ser lidas pela Storefront API; a documentação atual exige `access.storefront = PUBLIC_READ`. Criação/alteração é feita pela Admin API, não pela Storefront API. Evidência confidencial e workflow de revisão não devem ser expostos como metafield público. Fonte: [Shopify — Retrieve metafields with the Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/products-collections/metafields).

## 7. Adapter Shopify candidato

Em 2026-08-28, `2026-07` é a última versão estável publicada; a versão deve ser fixada e reavaliada no dia da implementação. Shopify publica versões trimestrais, recomenda especificar versão e informa a versão efetiva no header `X-Shopify-API-Version`. Fonte: [Shopify API versioning](https://shopify.dev/docs/api/usage/versioning).

| HEAL | Storefront API candidato |
|---|---|
| `Product` / `Collection` | products/collections + campos permitidos |
| `Variant` / `Sku` | `ProductVariant` / `sku` |
| `Price` | `MoneyV2` e compare-at aplicável |
| `Inventory` | availability/quantity conforme acesso real `[A VALIDAR]` |
| `CartSnapshot` | `Cart` |
| linhas | `cartLinesAdd`, `cartLinesUpdate`, `cartLinesRemove` |
| cupom | `cartDiscountCodesUpdate` |
| endereço/opção | cart delivery APIs disponíveis no schema fixado `[A VALIDAR em sandbox]` |
| handoff | `Cart.checkoutUrl` |

Shopify documenta `Cart` como estado de mercadorias e custos estimados e `checkoutUrl` como destino para web checkout hospedado. Fonte: [Storefront API — Cart](https://shopify.dev/docs/api/storefront/latest/objects/cart).

Regras:

- Storefront token e cart ID completo ficam no servidor/registro de sessão.
- Cada GraphQL response passa por schema runtime e trata `userErrors` como erro de domínio.
- Adapter nunca transforma ausência de estoque em `in_stock`.
- Custos de cart são `estimated`; confirmação final pertence ao checkout/provider.
- Não existe fallback automático para preço/estoque do CMS.
- Nenhum meio de pagamento Brasil é anunciado antes de teste sandbox e aprovação: `[A VALIDAR]`.

## 8. Validação server-side de compra

Em `addLine`, `updateLine`, `estimate` e `prepare`:

1. validar sessão, origin/CSRF, input e limite;
2. resolver ID interno -> provider variant server-side;
3. buscar estado fresco compatível com a operação;
4. validar variante ativa, currency, preço, disponibilidade e quantity;
5. executar mutação com a mesma idempotency key local;
6. mapear resposta e `userErrors`;
7. incrementar revision/CAS e persistir snapshot mínimo;
8. retornar snapshot server-authoritative.

Antes de `checkoutUrl`, repetir validação de todas as linhas, descontos, moeda, entrega e custos. Mudança gera `PRICE_CHANGED`, `INSUFFICIENT_STOCK`, `CART_CONFLICT` ou erro específico + `currentCart`; não redireciona silenciosamente.

## 9. URL e origin allowlist

### Requests ao BFF

- aceitar somente HTTPS em produção;
- `Origin` deve casar exatamente com allowlist configurada por ambiente;
- sem wildcard, prefix ou comparação por substring;
- mutations exigem cookie `Secure`, `HttpOnly`, `SameSite=Lax|Strict` `[A VALIDAR]` e token anti-CSRF quando necessário;
- CORS fechado ao storefront conhecido; endpoints de webhook são separados e autenticados por HMAC.

### Handoff externo

Parsear com `new URL` e exigir:

- `protocol === "https:"`;
- hostname em conjunto exato configurado a partir do shop/checkout aprovado;
- porta padrão, sem username/password;
- nenhum host derivado de input do cliente;
- `checkoutUrl` não entra em analytics, referrer customizado ou log.

Shopify recomenda match exato para redirect URLs e verificação rigorosa de autenticação/webhooks. Fonte: [Shopify security best practices](https://shopify.dev/docs/apps/build/security/following-security-best-practices).

## 10. Cache e revalidation

| Classe | Política inicial | Invalidação |
|---|---|---|
| conteúdo editorial publicado | cache público/tagged, TTL `[A VALIDAR]`, stale-while-revalidate permitido | publication event + manual purge |
| catálogo sem preço/estoque | cache público curto/tagged `[A VALIDAR]` | product/collection webhook + reconciliação |
| preço de listagem | TTL curto `[A VALIDAR]`; nunca é garantia | webhook + fetch no PDP/mutação |
| estoque | cache mínimo ou none conforme custo `[A VALIDAR]` | toda mutação + webhook |
| cart, buyer, shipping | `private, no-store` | toda revisão |
| checkout URL | `no-store`, nunca persistir no browser | gerar/consultar por tentativa |
| evidência privada | sem cache público | revisão/ACL |

Cache key inclui `environment + locale + market/country + currency + resource ID + provider version`. O webhook apenas marca tags stale; a próxima leitura busca fonte autoritativa. Evento antigo não sobrescreve revision/timestamp novo.

## 11. Webhooks, idempotência e reconciliação

Pipeline:

```text
POST raw body
 -> limite de tamanho
 -> verificar HMAC em raw bytes e headers esperados
 -> dedupe persistente por X-Shopify-Webhook-Id
 -> gravar inbox/evento
 -> responder 2xx rapidamente
 -> worker busca recurso autoritativo
 -> aplica somente se versão/timestamp for mais novo
 -> invalida tags
 -> registra resultado/DLQ
```

Shopify informa que webhooks podem duplicar, não têm ordem garantida e não devem ser a única fonte de sincronização; recomenda `X-Shopify-Webhook-Id`, timestamps e jobs de reconciliação. Fontes: [About webhooks](https://shopify.dev/docs/apps/build/webhooks) e [Verify webhook deliveries](https://shopify.dev/docs/apps/build/webhooks/verify-deliveries).

Idempotency record mínimo: `key`, session/cart, operation, canonical payload hash, status, response hash/snapshot ref, createdAt, expiresAt. Mesma chave + mesmo payload retorna resultado anterior; mesma chave + payload diferente retorna `CART_CONFLICT`. TTL `[A VALIDAR]`, mas maior que a janela máxima de retry.

Locks: CAS por `expectedCartRevision` é preferível; se storage não suportar transação/atomic compare, usar lock curto por cart com timeout e fencing token. Retry de provider usa a mesma chave local e backoff com jitter somente para erros transitórios.

Reconciliação periódica compara `updatedAt`/revision de produtos, variantes, publicações e pedidos aplicáveis; atraso, cursor e última execução são métricas. Pedido/pagamento futuro só muda de estado após consulta autoritativa ou webhook verificado e reconciliado.

## 12. Erros e retry

| Categoria | HTTP sugerido | Retry | UI |
|---|---:|---:|---|
| input/schema | 400 | não | preservar campo e explicar |
| origin/CSRF/auth | 401/403 | não | bloquear; sem detalhe sensível |
| not found/expired | 404/410 | não | recriar/recarregar com consentimento |
| cart conflict/price change | 409 | após refresh + nova ação | mostrar `currentCart` e diferença |
| stock/shipping business rule | 422 | conforme `retryable` | preservar cart |
| rate limit | 429 | `Retry-After` + jitter | retry explícito |
| provider timeout/unavailable | 502/503/504 | mesma idempotency key | preservar cart e requestId |
| internal | 500 | não automático em mutation incerta | suporte + requestId |

Se houver timeout após envio de mutation, estado é **indeterminado** até consulta/dedupe; não repetir com nova chave. Mensagens UI não incluem GraphQL, token, host interno, stack, PII ou payload bruto.

## 13. Observabilidade e privacidade

Logs estruturados:

- `requestId`, trace ID, environment, operation, adapter, result code, latency, retry count, cart ID pseudonimizado, revision e provider request ID permitido;
- nunca: token, secret, HMAC, checkout URL, provider cart secret, CEP completo, email, endereço, discount code em claro, raw webhook ou documento de evidência;
- sampling maior para erro, retenção e acesso `[A VALIDAR com LGPD]`;
- trilha de auditoria imutável para publicação de claim/policy e mudança de mapping.

Métricas mínimas: taxa/latência por operação, `userErrors`, conflicts, idempotency hits/mismatches, checkout prepare failures, invalid URL blocks, webhook invalid HMAC/duplicate/lag/DLQ, reconciliation lag/drift, cache hit/stale, publication blocked/expired.

Alertas: falha de checkout prepare, HMAC inválido em pico, webhook lag, DLQ crescente, API version diferente da fixada, drift de preço/estoque, reconciliation não executada e claim expirado ainda consumido.

## 14. Configuração e secrets

Config por ambiente, validada no boot:

- `COMMERCE_MODE=fixture|sandbox|production`;
- shop domain, API version fixa, token server-only;
- exact origin allowlist e checkout host allowlist;
- webhook secret(s) com rotação;
- storage bindings para sessão/idempotência/inbox/cache `[A VALIDAR]`;
- CMS endpoint/token `[A VALIDAR]`;
- timeouts, retry budget, TTLs e kill switch.

Falha fechada: production não inicia com fixture, token ausente, allowlist vazia/wildcard, versão `latest/unstable`, webhook verification desativada ou storage efêmero.

## 15. Gates de implementação

1. Fixture passa pelo BFF e mantém exatamente o fluxo atual sem client-side authority.
2. Contract tests rodam para fixture e qualquer adapter futuro.
3. Nenhum bundle client contém token, provider domain interno ou server adapter.
4. Runtime schemas rejeitam payloads incompletos e URLs fora da allowlist.
5. Idempotência e revision funcionam entre processos/instâncias.
6. CMS draft/expired/sem evidência não chega a UI, metadata, schema ou feed de produção.
7. Sandbox prova price/stock change, timeout indeterminado, duplicate webhook e evento fora de ordem.
8. Checkout hospedado só abre após revalidação e click explícito; nenhum pagamento é processado pelo site.
9. Payment methods Brasil permanecem ocultos até evidência real `[A VALIDAR]`.
10. Rollback preserva cart e reativa modo anterior sem misturar IDs/ambientes.

## Handoff

- HEAL-08: criar BFF e trocar `cart-store.ts` por client repository; não importar Shopify no componente.
- HEAL-13: validar mapping do contrato commerce e cenários sandbox.
- HEAL-19: aprovar cookies, CSRF/origin, secret rotation, PII, retenção e webhook HMAC.
- HEAL-21: implementar contract/integration/E2E tests descritos no runbook.
- HEAL-00: decidir CMS/storage/provider somente por ADR separado e depois dos gates de fixture server-side.

