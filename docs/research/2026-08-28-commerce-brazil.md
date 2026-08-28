# HEAL — Pesquisa de commerce e checkout no Brasil

Data da pesquisa: 2026-08-28  
Owner: HEAL-13  
Estado: `research-only`; nenhuma conta, credencial, sandbox ou pagamento foi configurado.

## Resultado executivo

A recomendação para o MVP permanece **Shopify como autoridade de catálogo, variantes, preço, estoque, carrinho e pedidos, com checkout hospedado obtido por `checkoutUrl`**. O storefront Vinext continua desacoplado por ports TypeScript. A vertical slice usa somente fixture rotulada.

Mercado Pago pode ser avaliado depois como provedor de pagamento dentro da operação Shopify. A documentação oficial tem integração específica Mercado Pago para Shopify, inclusive Checkout Pro. Isso **não confirma** que Pix, boleto, cartão ou parcelamento estarão disponíveis para a HEAL: conta, elegibilidade, configuração, taxas e comportamento no checkout headless precisam ser testados em loja de desenvolvimento/sandbox.

Não se recomenda commerce próprio + Mercado Pago direto no MVP. Mercado Pago resolve pagamento; nessa opção a HEAL ainda teria de construir e operar catálogo, precificação, promoções, estoque/reserva, frete, pedido, admin, antifraude operacional, suporte e reconciliação.

## Constatações oficiais atuais

1. A Storefront API é agnóstica de framework, exige token ligado a uma loja e oferece tokens públicos/privados pelo canal Headless. Token privado deve permanecer no servidor. [Shopify — Getting started](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started) e [Storefront API 2026-04 — autenticação](https://shopify.dev/docs/api/storefront/2026-04).
2. O objeto `Cart` retorna custos estimados, descontos, entrega e `checkoutUrl`; a própria Shopify determina que essa URL leva ao checkout web hospedado e avisa que custos podem mudar no checkout. [Shopify — Cart](https://shopify.dev/docs/api/storefront/latest/objects/cart).
3. O ID de carrinho Shopify contém uma chave secreta. A documentação diz para tratá-la como senha e não expô-la em código client-side, páginas públicas ou links compartilháveis. [Shopify — Manage a cart](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage).
4. A Shopify publica versões trimestrais, recomenda versão estável explícita e atualização trimestral. Para esta pesquisa, `2026-07` é a candidata estável do período; confirmar novamente antes da integração. [Shopify — API versioning](https://shopify.dev/docs/api/usage/versioning).
5. Shopify Payments não está disponível para operação brasileira segundo conteúdo oficial da própria Shopify; portanto, uma loja brasileira depende de provedor terceiro e pode acumular assinatura Shopify, taxa de transação Shopify e taxa do provedor. Valores exatos variam por plano/contrato e não devem ser copiados para a UI. [Shopify — guia de custos 2026](https://www.shopify.com/br/blog/quanto-custa-abrir-um-e-commerce), [taxas de terceiros](https://help.shopify.com/pt-BR/manual/international/pricing/fees) e [preços](https://www.shopify.com/br/precos).
6. O Mercado Pago documenta uma integração própria para Shopify. No Checkout Pro, o comprador paga no ambiente Mercado Pago e retorna à loja; taxas, prazo e parcelas são configurados na conta. [Mercado Pago — Shopify/Checkout Pro](https://www.mercadopago.com.br/developers/pt/docs/shopify/integration-configuration/checkout-pro).
7. Checkout Pro também é documentado como experiência pré-construída com redirecionamento e opção de usuário convidado; Pix e boleto aparecem como capacidades do produto, não como garantia para qualquer conta. [Mercado Pago — Checkout Pro](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/overview).
8. Checkout Transparente/Orders mantém o pagamento no site, exige conta/aplicação, configuração dos meios, credenciais e integração mais avançada. Para Pix, a documentação exige chave Pix cadastrada. [Mercado Pago — Orders API](https://www.mercadopago.com.br/developers/pt/docs/checkout-api-orders/overview).
9. A Orders API exige `X-Idempotency-Key` em criação de order; cartão usa token gerado no frontend e Access Token no backend. [Mercado Pago — cartão/Orders](https://www.mercadopago.com.br/developers/pt/docs/checkout-api-orders/payment-integration/cards).
10. Webhooks Mercado Pago incluem `x-signature` e podem ser validados por HMAC; ambientes de teste e produção devem ter URLs/credenciais separadas. [Mercado Pago — Webhooks](https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks).
11. Webhooks Shopify exigem validação HMAC e deduplicação pelo `X-Shopify-Webhook-Id`; entrega pode duplicar, chegar fora de ordem ou falhar, então reconciliação periódica é necessária. [Shopify — Verify deliveries](https://shopify.dev/docs/apps/build/webhooks/verify-deliveries) e [About webhooks](https://shopify.dev/docs/apps/build/webhooks).

## Comparação para a HEAL

| Critério | Shopify + checkout hospedado | Commerce próprio + Mercado Pago |
|---|---|---|
| Autoridade de catálogo/variante/SKU | Shopify | HEAL precisa construir/operar |
| Preço, desconto e estoque | Shopify; storefront revalida no servidor | HEAL precisa criar regras, banco, admin e auditoria |
| Carrinho | Storefront Cart API | HEAL precisa persistir e resolver concorrência |
| Checkout | URL hospedada pela Shopify; pagamento configurado na loja | Checkout Pro hospedado ou Checkout Transparente dentro do site |
| Pagamento no Brasil | Provedor terceiro obrigatório; Mercado Pago é candidato [A VALIDAR] | Mercado Pago direto; meios/parcelas/elegibilidade [A VALIDAR] |
| Dados de cartão no backend HEAL | Não, no desenho hospedado | Não com Pro; Transparente aumenta superfície e exige SDK/tokenização correta |
| Pedido e pós-pagamento | Shopify como sistema de registro | HEAL precisa criar order ledger e ligar estados MP ao pedido |
| Webhooks/reconciliação | Ainda necessários, mas domínio comercial é gerenciado | HEAL é responsável por todo o state machine |
| Custo previsível | Assinatura + taxas Shopify/provedor [A VALIDAR NO CONTRATO] | Infra/operação próprias + taxas MP [A VALIDAR NO PAINEL] |
| Risco/tempo do MVP | Menor | Maior |
| Compatibilidade com ADR-001 | Direta | Exige nova ADR |

## Opções consideradas

### A — Recomendada: Shopify + Storefront API + checkout hospedado

- Storefront Vinext consulta somente o adapter server-side.
- Shopify é fonte de verdade de produto, preço, inventário e carrinho.
- `checkoutUrl` é buscada/validada no servidor imediatamente antes do handoff.
- Provedor de pagamento é configurado na loja Shopify; Mercado Pago é candidato, não promessa.
- Nenhum dado de cartão, Pix ou boleto passa pela aplicação HEAL.

### B — Alternativa de contingência: Hydrogen/Oxygen

Mantém Shopify como autoridade, mas substitui o runtime do storefront se Vinext falhar nos gates de SSR, cache, imagens, SEO ou checkout. Não há motivo para misturar Hydrogen no runtime atual antes desses gates.

### C — Não recomendada no MVP: commerce próprio + Mercado Pago

Somente reconsiderar se houver requisito comercial que Shopify não atenda e orçamento para:

- banco e painel administrativo;
- catálogo, variantes, estoque/reserva e order ledger;
- regras de promoção, tributação, frete e devolução;
- Checkout Pro ou Orders API;
- idempotência, assinatura de webhook, deduplicação, state machine e reconciliação;
- observabilidade, suporte, fraude, LGPD e operação 24/7.

## Pagamentos: política de verdade

Até existir conta de teste configurada e evidência por método:

- Pix: `[A VALIDAR]`;
- boleto: `[A VALIDAR]`;
- cartão de crédito/débito: `[A VALIDAR]`;
- quantidade e custo de parcelas: `[A VALIDAR]`;
- checkout convidado no fluxo Shopify + provedor: `[A VALIDAR]`;
- taxas e prazo de recebimento: `[A VALIDAR NO PAINEL/CONTRATO]`;
- domínio e texto do redirecionamento: `[A VALIDAR]`.

A UI não exibe ícone, selo ou copy desses meios antes da confirmação. Nem documentação genérica nem existência do app comprovam habilitação na conta HEAL.

## Gates antes de integração real

1. Usuário fornece/autoriza loja Shopify de desenvolvimento, canal Headless e catálogo de teste.
2. Seleção explícita de plano e análise das taxas reais para o Brasil.
3. Provedor de pagamento escolhido e habilitado em sandbox/teste; validar Mercado Pago no checkout headless.
4. Testar compra convidada, Pix, boleto, cartão e parcelas individualmente; somente os aprovados entram na UI.
5. Confirmar frete, CEP, prazo, tributação, políticas, CNPJ e suporte.
6. Fixar versão Storefront API estável e agenda de atualização trimestral.
7. Validar HMAC, duplicatas, eventos fora de ordem, retries e reconciliação.
8. Evidenciar preço/estoque alterados, carrinho expirado, pagamento pendente/rejeitado e retorno seguro.

## Blockers reais

- conta e plano Shopify `[A VALIDAR]`;
- acesso ao canal Headless e tokens `[A VALIDAR]`;
- catálogo, SKUs, preços, moeda, impostos e estoque reais `[A VALIDAR]`;
- conta Mercado Pago/provedor, elegibilidade e credenciais de teste `[A VALIDAR]`;
- matriz real de meios de pagamento, taxas, parcelas e prazo de recebimento `[A VALIDAR]`;
- frete, CEPs atendidos, transportadoras e SLA `[A VALIDAR]`;
- CNPJ, políticas, atendimento e revisão jurídica/LGPD `[A VALIDAR]`;
- domínio final e allowlist de redirecionamento `[A VALIDAR]`.

