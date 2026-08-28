# HEAL-20 — Measurement plan

**Data:** 2026-08-28  
**Owner do documento:** HEAL-20 / Product Analytics  
**Estado:** `especificação — não instrumentado`  
**Escopo observado:** storefront Vinext/Sites, catálogo e carrinho fixture, handoff demonstrativo, páginas editoriais.  
**Fora do escopo atual:** SDK/CMP, coletor, warehouse, dashboards, conta Shopify, checkout real, provedor de pagamento, pedido e suporte funcional.

## 1. Veredito e limites

Nenhum SDK, pixel, cookie analítico, beacon ou coletor foi conectado. Este arquivo é um contrato futuro de medição; não é evidência de que eventos estejam sendo emitidos.

O commerce atual é uma fixture client-side, rotulada como demonstração. Ela não cria pedido, pagamento, Pix, boleto ou transação de cartão. Por isso:

- `begin_checkout`, `add_shipping_info`, `add_payment_info` e `purchase` ficam bloqueados no ambiente `fixture`;
- `contact_support` fica bloqueado enquanto não houver um canal funcional e confirmação de ação;
- eventos comerciais em `sandbox` nunca podem alimentar receita, conversão ou ROAS de produção;
- `purchase` será aceito somente de fonte server-side autoritativa, após integração real;
- CEP, email, endereço, nome, telefone, consulta de busca, texto livre e qualquer cart/checkout token são proibidos em todo payload;
- não haverá banner de consentimento teatral antes de existir uma ferramenta real e um inventário aprovado.

O estado de segurança consultado registra que o CEP completo da simulação permanece em `sessionStorage` durante a aba. Mesmo sendo dado da aplicação, ele nunca entra em analytics.

## 2. Objetivos de medição

1. Entender se a arquitetura de descoberta leva a uma escolha compreensível.
2. Identificar obstáculos entre coleção, produto, frete, sacola e checkout real.
3. Medir confiança sem tratar cliques isolados como satisfação.
4. Separar rigorosamente fixture, sandbox e produção.
5. Validar comércio por fonte autoritativa, sem depender de evento client-side para receita.
6. Permitir experimentação ética somente depois de baseline e qualidade de dados comprovados.

## 3. Contrato global de eventos

### 3.1 Convenções

- Nome de evento: `snake_case`, verbo no presente + objeto, sem nomes de fornecedor.
- Versão: inteiro positivo em `event_version`; a primeira versão é `1`.
- Um significado por nome. Alteração semântica, mudança de gatilho ou remoção/renome de propriedade obrigatória exige nova versão.
- Propriedade opcional nova e retrocompatível pode manter a versão, desde que o catálogo e os testes sejam atualizados antes do deploy.
- Eventos `view_*` exigem conteúdo principal renderizado, documento visível e rota estabilizada; hidratação ou re-render não são novos eventos.
- Eventos de mutação são emitidos após sucesso confirmado, nunca no clique otimista.
- Nenhum evento é emitido a partir do texto de `aria-live`, console, erro bruto ou conteúdo CMS não controlado.

### 3.2 Envelope obrigatório allowlisted

Somente estas propriedades globais podem acompanhar qualquer evento:

| Propriedade | Tipo/valores | Regra |
|---|---|---|
| `event_id` | UUID aleatório por ocorrência | Não derivar de usuário, dispositivo, carrinho, pedido ou URL. Reenvio preserva o mesmo valor. |
| `event_version` | inteiro | Versão do contrato do evento. |
| `occurred_at` | UTC ISO-8601 | Gerado no boundary de sucesso; o coletor também registra `received_at`. |
| `environment` | `fixture\|sandbox\|production` | Obrigatório e validado no coletor. |
| `page_type` | enum registrada | Ex.: `home`, `collection`, `product`, `cart`, `checkout`, `guide`, `contact`. |
| `route_template` | enum registrada | Template como `/produtos/[handle]`; nunca URL completa, query string ou hash. |
| `locale` | `pt-BR` inicialmente | Lista fechada. |
| `commerce_mode` | `fixture\|sandbox\|production` | Deve concordar com o runtime; divergência bloqueia ingestão. |
| `source_surface` | enum registrada | Ex.: `header`, `hero`, `collection_grid`, `product_detail`, `cart_summary`, `editorial`. |
| `consent_state` | `not_required\|granted\|denied\|unknown` | Estado, não identificador. Regra jurídica permanece `[A VALIDAR]`. |
| `device_class` | `mobile\|tablet\|desktop\|unknown` | Derivação grosseira; não transmitir dimensões, memória, CPU ou sinais de fingerprint. |
| `campaign_id` | ID interno de campanha registrada ou ausente | Nunca enviar UTM bruta. O valor deve ser resolvido por allowlist. |
| `referrer_class` | `direct\|organic\|paid\|referral\|internal\|unknown` | Nunca enviar referrer/URL bruta. |

Não adicionar automaticamente ID persistente de usuário/dispositivo, IP, user agent completo, geolocalização, URL bruta, título livre ou identificador de sessão. Se uma futura análise de coorte realmente exigir identidade, ela precisa de uma nova revisão HEAL-19/jurídica e de um novo contrato.

### 3.3 Propriedades comerciais allowlisted

Quando aplicável, usar apenas valores vindos do catálogo/control plane, nunca texto digitado:

- `product_handle`, `variant_id`, `collection_handle`;
- `list_id` em enum registrada e `list_position` inteiro;
- `quantity` inteiro positivo;
- `currency` (`BRL` inicialmente) e valores monetários decimais normalizados;
- `inventory_status` em enum do contrato de commerce;
- `result_count_bucket`: `0`, `1_5`, `6_20`, `21_plus`;
- `item_count_bucket`: `0`, `1`, `2_3`, `4_plus`;
- `shipping_result`: `available`, `unavailable`, `temporary_error`, `invalid_input`;
- `error_code` somente em taxonomia fechada e não sensível. Nunca mensagem/stack/body bruto.

## 4. Matriz mínima de eventos

Todos os itens de consentimento/base abaixo estão **`[A VALIDAR com HEAL-19 e jurídico]`**. Até a decisão, o comportamento seguro para qualquer fornecedor opcional é não despachar. Registros operacionais necessários ao pedido são outra finalidade e não autorizam automaticamente sua cópia para analytics.

| Evento v1 | Gatilho semântico | Propriedades específicas allowlisted | Finalidade | Consentimento/base | Estado no fixture | Validação mínima | Owner de fonte |
|---|---|---|---|---|---|---|---|
| `view_home` | Home principal renderizada e visível uma vez por entrada de rota | nenhuma além do envelope | Medir entrada qualificada e passagem para descoberta | `[A VALIDAR HEAL-19/jurídico]` | Elegível apenas em debug local futuro; hoje não instrumentado | E2E: 1 evento por entrada, 0 por re-render/aba oculta | HEAL-08 Frontend |
| `view_collection` | Grade ou estado vazio da coleção renderizado e visível | `collection_handle`, `result_count_bucket`, `sort_id` controlado | Medir descoberta e cobertura do catálogo | `[A VALIDAR HEAL-19/jurídico]` | Elegível em debug; não é conversão real | Schema + rota válida + contagem coerente com UI | HEAL-08 + HEAL-14 Catalog |
| `search` | Busca explicitamente enviada e resultados/estado vazio renderizados | `query_length_bucket`, `result_count_bucket`, `search_outcome` | Medir encontrabilidade sem coletar consulta | `[A VALIDAR HEAL-19/jurídico]` | Elegível quando busca funcional; **texto da busca proibido** | Teste com consulta contendo PII confirma payload sem texto/URL | HEAL-08 Search |
| `apply_filter` | Filtro registrado aplicado e nova lista estabilizada | `filter_id`, `filter_value_id`, `result_count_bucket`, `collection_handle` | Avaliar taxonomia e filtros úteis | `[A VALIDAR HEAL-19/jurídico]` | Elegível em debug; não instrumentado | Valores fora do registry são rejeitados | HEAL-08 + HEAL-04 Content |
| `select_item` | Pessoa ativa um card/link de produto em lista | `product_handle`, `variant_id` opcional, `list_id`, `list_position`, `collection_handle` opcional | Medir passagem lista → produto | `[A VALIDAR HEAL-19/jurídico]` | Elegível em debug; não instrumentado | Não disparar por impressão, foco ou hover | HEAL-08 Frontend |
| `view_item` | Conteúdo principal de PDP válido renderizado e visível | `product_handle`, `variant_id`, `inventory_status`, `currency`, `unit_price` | Medir consideração de produto e disponibilidade | `[A VALIDAR HEAL-19/jurídico]` | Elegível em debug, sempre segregado | Produto/variante precisam existir no catálogo; 404 não emite | HEAL-08 + HEAL-14 Catalog |
| `view_shipping_estimate` | Resposta final da estimativa apresentada após ação explícita | `shipping_result`, `service_level_id` controlado, `currency`, `shipping_value`, `eta_bucket`, `error_code` controlado | Medir redução de incerteza logística | `[A VALIDAR HEAL-19/jurídico]` | Pode ser validado como fixture, mas não entra em SLA/conversão real | Testes garantem ausência de CEP/endereço; sucesso e falha cobertos | HEAL-14 Shipping + HEAL-08 |
| `add_to_cart` | Mutação confirmada com sacola atualizada | `product_handle`, `variant_id`, `quantity`, `currency`, `unit_price`, `inventory_status` | Medir intenção comercial confirmada | `[A VALIDAR HEAL-19/jurídico]` | Elegível somente com `environment=fixture`; excluído de KPIs reais | Não emitir em estoque desconhecido/falha; total coerente após mutação | HEAL-08 Cart |
| `remove_from_cart` | Remoção confirmada com sacola atualizada | `product_handle`, `variant_id`, `quantity`, `currency`, `line_value` | Identificar revisão/abandono da seleção | `[A VALIDAR HEAL-19/jurídico]` | Elegível segregado; não instrumentado | Undo posterior é novo `add_to_cart`, com novo `event_id` | HEAL-08 Cart |
| `view_cart` | Sacola ou estado vazio renderizado e visível | `item_count_bucket`, `currency`, `cart_subtotal`, `shipping_state` | Medir progressão e contexto da sacola | `[A VALIDAR HEAL-19/jurídico]` | Elegível segregado; não instrumentado | Uma vez por entrada/revisão explícita, não a cada alteração de quantidade | HEAL-08 Cart |
| `begin_checkout` | Em produção: pessoa solicita checkout e servidor conclui revalidação, criando handoff válido | `item_count_bucket`, `currency`, `order_value_estimate`, `shipping_state`, `checkout_provider_id` controlado | Medir início real do boundary financeiro | `[A VALIDAR HEAL-19/jurídico]` | **BLOQUEADO**; “revisar handoff demonstrativo” não é checkout | Teste rejeita origem client-only, URL inválida e fixture | HEAL-14 Checkout |
| `add_shipping_info` | Checkout real confirma etapa de entrega/opção de frete | `shipping_tier_id`, `currency`, `shipping_value`, `country_code=BR` | Medir conclusão da etapa logística | `[A VALIDAR HEAL-19/jurídico]` | **BLOQUEADO**; não há checkout/provedor | Evidência do provider/backend; nenhum CEP, cidade ou endereço | HEAL-14 Checkout |
| `add_payment_info` | Checkout real confirma seleção válida de categoria de pagamento | `payment_type` enum (`pix`, `boleto`, `card`, `other`), `currency` | Medir progressão da etapa de pagamento | `[A VALIDAR HEAL-19/jurídico]` | **BLOQUEADO**; nenhum método está integrado | Fonte do provider; nenhum PAN, BIN, parcelas livres, token ou erro bruto | HEAL-14 Checkout + HEAL-19 |
| `purchase` | Webhook/backend autoritativo confirma pedido pago/aceito conforme regra comercial aprovada | `purchase_dedupe_key`, `currency`, `order_value`, `tax_value`, `shipping_value`, `discount_value`, `item_count_bucket`, `payment_type` enum | Receita e conversão reais | `[A VALIDAR HEAL-19/jurídico]` | **BLOQUEADO**; fixture/sandbox nunca contam como compra | Somente server-side; reconciliação 100% com fonte do commerce; dedupe obrigatório | HEAL-14 Backend/Commerce |
| `view_ritual_guide` | Guia principal renderizado e visível | `guide_id` controlado, `guide_source` enum (`site`, `order_confirmation`, `email`, `qr`) | Medir acesso a orientação de uso | `[A VALIDAR HEAL-19/jurídico]` | Elegível para debug; não instrumentado | Não inferir leitura completa, uso ou “ritual concluído” | HEAL-04 Content + HEAL-08 |
| `contact_support` | Canal funcional aberto por ação explícita ou ticket confirmado, conforme definição pré-registrada | `support_channel` enum, `support_category` enum opcional, `source_surface` | Medir necessidade de ajuda e acesso ao suporte | `[A VALIDAR HEAL-19/jurídico]` | **BLOQUEADO**; página atual não envia contato | Sem mensagem, email, telefone, nome, ticket ID ou URL; distinguir `open` de `submitted` se ambos existirem | HEAL-14 Support + HEAL-19 |

### 4.1 Valores controlados adicionais

- `query_length_bucket`: `0`, `1_3`, `4_10`, `11_30`, `31_plus`; calculado localmente e descartando a consulta.
- `search_outcome`: `results`, `zero_results`, `invalid`, `unavailable`.
- `sort_id`, `filter_id`, `filter_value_id`, `list_id`, `service_level_id`, `shipping_tier_id`, `guide_id` e `checkout_provider_id` vêm de registries versionados; nenhum aceita string arbitrária do DOM, CMS, query ou provider.
- `eta_bucket`: `same_day`, `1_2_business_days`, `3_5_business_days`, `6_plus_business_days`, `unknown`.
- `purchase_dedupe_key`: HMAC server-side do identificador autoritativo do pedido com chave dedicada e rotacionável. Nunca enviar order ID bruto, cart ID/token, checkout token ou URL. Retenção e acesso permanecem `[A VALIDAR]`.

## 5. Dados proibidos

Bloquear no emitter e no coletor, não apenas orientar desenvolvedores:

- CEP completo, parcial, mascarado ou hash de CEP;
- nome, email, telefone, CPF, endereço, cidade precisa e geolocalização;
- consulta de busca, mensagem de contato, avaliação, nota livre ou qualquer texto digitado;
- cart ID, cart token, checkout token/URL, session token, cookie ID, access token e request body;
- PAN, BIN, últimos dígitos, CVV, validade, chave Pix, linha digitável e status bruto do provider;
- sintomas, saúde, crença, religião, inferência emocional ou segmentação vulnerável;
- IP persistido como propriedade, user agent completo, viewport exato, memória/CPU/GPU e sinais combináveis em fingerprint;
- URL/referrer bruto, query string, stack trace, mensagem de erro ou conteúdo CMS livre;
- identificador de destinatário de presente ou dado de suporte.

O coletor deve rejeitar chaves não cadastradas (`additionalProperties: false`) e aplicar um scanner de padrões como defesa adicional. Scanner não substitui allowlist.

## 6. Consentimento, finalidade e ambientes

### 6.1 Gate de ativação

Antes de qualquer SDK/fornecedor:

1. HEAL-19 e jurídico validam finalidade, base, necessidade, retenção, operadores, transferência e direitos;
2. produto escolhe o conjunto mínimo de eventos, sem ativar tudo por conveniência;
3. CMP, se aplicável, bloqueia analytics opcional antes da escolha e oferece aceitar/rejeitar com esforço equivalente;
4. retirada interrompe dispatch e invalida fila opcional, não apenas esconde interface;
5. a política de privacidade lista ferramenta, finalidade, dados, duração e canal do titular;
6. homologação prova rede silenciosa quando `denied` ou `unknown`, conforme regra aprovada.

### 6.2 Isolamento

- Projetos/datasets/credenciais distintos por `fixture`, `sandbox` e `production`.
- Dashboards de negócio consultam somente `production` e aplicam filtro defensivo no dataset.
- Fixture pode usar um sink local efêmero para teste de contrato, sem conexão externa e sem persistência após a sessão.
- Sandbox usa catálogo e pedidos de teste identificáveis; qualquer `purchase` de sandbox é rejeitado pelo pipeline de receita.
- O ambiente é definido pelo servidor/build confiável, nunca por query string ou valor enviado pelo cliente.

## 7. Deduplicação e ordem

### 7.1 Eventos client-side

- Gerar `event_id` no boundary semântico de sucesso.
- Se houver retry de transporte, preservar o mesmo `event_id`.
- O coletor mantém unicidade por `(environment, event_name, event_version, event_id)` na janela de retenção aprovada.
- Navegação client-side, React Strict Mode, hidratação, BFCache e restauração de aba entram nos testes de duplicidade.
- Cliques repetidos são ocorrências distintas somente se cada ação produzir um novo resultado válido; double-click absorvido pela mesma mutação não gera dois eventos.

### 7.2 Purchase

- O cliente não tem permissão de emitir `purchase`.
- O backend consome evento confirmado do commerce/provider, valida assinatura, status e ambiente, e grava a `purchase_dedupe_key` antes de publicar analytics.
- Reentrega de webhook preserva a chave e resulta em uma linha analítica.
- Cancelamento/reembolso exigirá eventos próprios em contrato futuro; nunca reescrever silenciosamente o purchase original.
- Receita do dashboard precisa reconciliar 100% com a fonte autoritativa para o período antes de ser usada em mídia ou experimento.

## 8. Data quality e observabilidade

Metas abaixo são gates propostos, não resultados medidos:

| Controle | Gate proposto |
|---|---|
| Payload fora do schema | 0 aceito; rejeitar e contar por código não sensível |
| Chave/propriedade proibida | 0; incidente se chegar ao coletor |
| Divergência `environment`/`commerce_mode` | 0; bloquear ingestão |
| Completude de propriedades obrigatórias | ≥ 99% por evento, `[A VALIDAR após baseline]` |
| Duplicidade client-side | < 0,5%, `[A VALIDAR após baseline]` |
| Reconciliação de `purchase` | 100% com fonte autoritativa no fechamento |
| Eventos fora de ordem | Monitorar por `occurred_at`/`received_at`; não fabricar sequência ausente |
| Evento antes de consentimento aplicável | 0 |
| Fixture/sandbox em KPI de produção | 0 |

Relatório diário deve mostrar volume por versão/ambiente, rejeições de schema, atraso, duplicidade e ruptura por release. Mudança abrupta de volume não é automaticamente mudança de comportamento: primeiro verificar deploy, consentimento, bot traffic e instrumentação.

## 9. Plano de validação antes da ativação

1. JSON Schema/TypeScript por evento com `additionalProperties: false`.
2. Unit tests dos builders, enums, arredondamento monetário e sanitização de campaign registry.
3. Integration tests com sink local verificando consent gate, isolamento e retry com mesmo `event_id`.
4. Playwright em desktop/mobile para gatilho único e ausência em falha, re-render, navegação de volta e aba oculta.
5. Teste adversarial preenchendo busca/CEP/contato com email, telefone e texto marcador; captura de rede deve provar ausência desses valores.
6. Teste de produção simulado recusando `purchase` client-side e aceitando somente fixture assinada do webhook de teste no dataset sandbox.
7. Reconciliação de pedidos sandbox, duplicação/replay de webhook e rotação da chave HMAC.
8. Verificação de retirada de consentimento, fila pendente e network silence.
9. Aprovação conjunta HEAL-20, HEAL-19 e owner da fonte antes de liberar cada evento.

## 10. Dashboards e métricas derivadas

Somente após baseline válido:

- Home → coleção/PDP: sessões elegíveis com `select_item` ou `view_collection` após `view_home` / sessões elegíveis com `view_home`.
- Coleção → PDP: `view_item` precedido por `select_item` / `view_collection` elegível.
- PDP → sacola: pessoas/sessões elegíveis com `add_to_cart` / `view_item`.
- Frete consultado: `view_shipping_estimate` / `view_cart` ou `view_item`, com denominador declarado.
- Sacola → checkout: `begin_checkout` / `view_cart`, produção apenas.
- Checkout → compra: `purchase` autoritativo / `begin_checkout`, produção apenas.
- Conversão: compras autoritativas / unidades de análise elegíveis; identidade/coorte depende de decisão futura.
- Receita/AOV: fonte server-side reconciliada; nunca somar preço da fixture nem evento client-side.
- Suporte e guia: taxa de acesso, sem interpretar abertura como resolução ou uso concluído.

Cada painel exibe ambiente, versão do evento, janela de consentimento, definição do denominador, cobertura e data do último teste de qualidade.

## 11. RACI e change control

| Responsabilidade | Accountable | Responsible/consultado |
|---|---|---|
| Semântica, catálogo e métricas | HEAL-20 | HEAL-03, HEAL-04, HEAL-08, HEAL-14 |
| Implementação client-side | HEAL-08 | HEAL-20, HEAL-17, HEAL-18 |
| Commerce, webhook e purchase | HEAL-14 | HEAL-20, HEAL-19 |
| Base, consentimento, retenção e fornecedores | HEAL-19 + jurídico `[A VALIDAR]` | HEAL-20 |
| QA de contrato/E2E | HEAL-21 | owner da fonte + HEAL-20 |
| Decisão de experimento | Product owner `[A VALIDAR]` | HEAL-20, Design, Marketing, Engenharia |

Nenhum time adiciona propriedades ad hoc em tag manager. Toda mudança passa por PR no catálogo, revisão de privacidade, testes e release note. Evento sem owner ou finalidade é removido, não “guardado para o futuro”.

## 12. Gates de saída

- [ ] fornecedor/coletor e contrato aprovados;
- [ ] base/consentimento/retention/operadores aprovados;
- [ ] schemas e registries versionados;
- [ ] sink local, unit, integration e E2E verdes;
- [ ] zero PII/CEP/texto livre/cart token em captura de rede;
- [ ] ambientes fisicamente segregados;
- [ ] `purchase` server-side, deduplicado e reconciliado;
- [ ] dashboards exibem cobertura/versão/ambiente;
- [ ] baseline coletado antes de A/B;
- [ ] runbook de incidente e desligamento exercitado.

## 13. Handoff

### Para HEAL-08 / Frontend

Criar futuramente um emitter tipado e consent-aware, sem dependência de fornecedor nos componentes. Emitir após estados confirmados e testar Strict Mode/hidratação. Não incluir query, CEP, URL, referrer ou texto do DOM.

### Para HEAL-14 / Backend e commerce

Possuir `begin_checkout`, etapas reais do checkout e `purchase`. Revalidar carrinho no servidor, aceitar somente webhook válido, gerar HMAC de dedupe e reconciliar receita. Não expor cart/order/checkout tokens.

### Para HEAL-19 / Segurança e LGPD

Validar finalidade/base, CMP, fornecedor, transferência, retenção, acesso e direitos antes de qualquer dispatch. Tratar detecção de propriedade proibida como incidente.

### Para HEAL-21 / QA

Automatizar schema, consent gate, network silence, ausência de PII, segregação de ambientes, duplicidade e reconciliação. Fixture verde não é prova de purchase real.

## Referências internas

- `docs/security/SECURITY_LGPD_REVIEW.md`
- `docs/brand/MARKETING_FUNNEL.md`
- `docs/commerce/COMMERCE_CONTRACT.md`
- `docs/architecture/ADR-001-storefront-commerce.md`
- `site/lib/commerce/types.ts`
- `site/components/commerce/AddToCartForm.tsx`
- `site/components/commerce/CartView.tsx`
- `site/components/commerce/CheckoutHandoff.tsx`
