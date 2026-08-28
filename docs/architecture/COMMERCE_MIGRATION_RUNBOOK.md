# HEAL. CURA. — Runbook fixture → sandbox → produção

Data: 2026-08-28  
Owner: HEAL-14  
Estado: plano operacional; nenhuma migração externa executada.  
Dependência: `docs/architecture/BACKEND_CMS_INTEGRATION_SPEC.md`.

## 1. Princípios de migração

1. Nunca mudar UI, authority boundary e provider na mesma etapa.
2. Fixture, sandbox e production usam namespaces, storage, tokens, mappings e cookies separados.
3. Promoção é por gates com evidência; nenhuma porcentagem de rollout substitui validação.
4. Cart criado em um ambiente não migra automaticamente para outro.
5. Rollback não mistura IDs nem reusa checkout URL.
6. O storefront nunca recebe preço/estoque/frete/total do próprio browser.
7. Shopify/CMS são candidatos até ADR e sandbox aprovados; meios Brasil ficam `[A VALIDAR]`.

## 2. Pré-requisitos e artefatos

Antes de iniciar integração externa:

- ADR aprovando provider, CMS, storage e modelo de operação;
- catálogo real com product/variant/SKU e owner;
- conteúdo mínimo + evidence records por campo;
- política de segurança/claims/uso por SKU;
- ambientes e domínio/origins definidos;
- secrets manager e processo de rotação;
- storage persistente para session/idempotency/webhook inbox;
- observabilidade, alertas, kill switch e owner on-call;
- conta sandbox/dev store autorizada;
- políticas, identidade empresarial, suporte, frete e pagamentos `[A VALIDAR]`.

Artefatos versionados por fase:

- `contract-test-report`;
- `mapping-manifest` com hashes, sem secrets;
- `content-publication-manifest`;
- `sandbox-evidence` com timestamps/request IDs redigidos;
- `security-review`;
- `cutover-checklist` e `rollback-log`.

## 3. Fase 0 — Congelar baseline da fixture

Objetivo: registrar o comportamento que não pode regredir.

### Ações

1. Capturar rotas, estados e screenshots desktop/mobile.
2. Cobrir catalog list/PDP, add/update/remove, CEP inválido/válido, estoque unknown, cart vazio e fixture handoff.
3. Congelar contratos `types.ts` e erros com snapshot/contract tests.
4. Confirmar banner DEMONSTRAÇÃO, `noindex` e ausência de rede externa/payment.
5. Registrar limitações: cart no `sessionStorage`, authority no client e estado efêmero.

### Gate F0

- lint, typecheck, unit, contract, Playwright e axe verdes;
- nenhum request a provider externo;
- evidência reproduzível salva;
- baseline aprovado por HEAL-21/22.

### Rollback

Não aplicável; esta fase só registra. Qualquer regressão posterior volta ao commit/tag baseline.

## 4. Fase 1 — Fixture no servidor, UI inalterada

Objetivo: remover autoridade client-side antes de introduzir provider.

### Ações

1. Criar `CommerceService` e BFF server-only.
2. Mover fixture adapter para o servidor e eliminar duplicação lógica de `cart-store.ts`; o client store vira apenas repository HTTP/server action.
3. Introduzir cookie/session opaco, runtime schemas, exact-origin/CSRF gate e rate limit básico.
4. Persistir cart/revision/idempotency em storage de desenvolvimento `[A VALIDAR]`; proibir `Map` em modo não fixture.
5. Manter a mesma copy, IDs `fixture:` e handoff sem URL.

### Testes obrigatórios

- mesma key + mesmo payload não duplica linha;
- mesma key + payload diferente retorna conflict;
- duas updates com revision antiga geram `CART_CONFLICT`;
- browser adulterando preço/estoque/total não altera snapshot;
- restart/múltipla instância não perde dedupe no ambiente alvo;
- client bundle não contém adapter/token/config privada.

### Gate F1

- paridade visual/funcional com F0;
- todas as mutations observadas no server;
- nenhum cálculo comercial autoritativo no client;
- kill switch volta ao baseline fixture sem tocar dados externos.

### Rollback F1

1. Ativar `COMMERCE_MODE=fixture-client-baseline` somente em ambiente de demo local, nunca produção.
2. Invalidar cookie/session da nova fixture com mensagem explícita; não converter cart.
3. Restaurar build baseline e registrar motivo/request IDs.

## 5. Fase 2 — CMS draft e shadow read

Objetivo: validar mapping editorial sem publicar fatos não aprovados.

### Ações

1. Implementar `ContentPort` + adapter CMS candidato.
2. Importar conteúdo como `draft`; fixture continua visível e autoritativa na UI pública de demo.
3. Executar shadow read: comparar CMS normalizado com fixture/content manifest, sem renderizar.
4. Validar claim/evidence/expiry/media rights e sanitização.
5. Criar publicação atômica por manifest revision.

### Gate F2

- zero claim `a_validar`, expired ou sem evidence no publication manifest;
- HTML/rich text sanitizado e testado;
- UI/metadata/schema/feed consomem a mesma revision elegível;
- cache invalidation por publication event e rollback para revision anterior testados.

### Rollback F2

- apontar `ContentPort` para manifest anterior ou fixture;
- purgar somente tags da revision afetada;
- não apagar evidência; marcar revision revogada com auditoria.

## 6. Fase 3 — Shopify dev store/sandbox em shadow

Objetivo: provar adapter e mapping sem checkout acessível ao usuário.

### Ações

1. Fixar versão estável da Storefront API — em 2026-08-28, candidata `2026-07`; revalidar antes de implementar.
2. Configurar token/server secrets apenas no sandbox e exact shop allowlist.
3. Criar mapping interno ↔ Shopify para produtos/variantes/coleções sandbox.
4. Consultar catálogo e carts sintéticos em shadow; UI continua fixture.
5. Comparar types, currency, price, availability, errors e API version response.
6. Ativar webhook inbox verificado + reconciliação, sem efeito público.

### Cenários obrigatórios

- variant inexistente/inativa;
- estoque unknown/out-of-stock/insuficiente;
- price change entre PDP e add/prepare;
- userErrors GraphQL;
- rate limit/timeout;
- payload incompleto/schema drift;
- webhook HMAC inválido, duplicado, atrasado e fora de ordem;
- reconciliação corrige webhook perdido;
- API responde versão diferente da fixada e dispara alerta.

### Gate F3

- contract tests idênticos para fixture e Shopify adapter onde semântica coincide;
- zero divergência P0 em shadow por janela `[A VALIDAR]`;
- mapping 100% dos SKUs liberáveis;
- tokens/IDs/URLs ausentes de bundle, HTML, logs e analytics;
- webhook/reconciliation runbook reproduzido.

### Rollback F3

- desabilitar adapter/webhooks via kill switch;
- revogar/rotacionar token se houver incidente;
- manter fixture server-side; nenhum usuário perde cart real porque ainda não houve cutover.

## 7. Fase 4 — Sandbox visível, checkout bloqueado por default

Objetivo: testar fluxo real de catálogo/cart em ambiente explicitamente rotulado SANDBOX.

### Ações

1. Liberar somente para allowlist interna/QA.
2. Usar cookie/storage namespace sandbox e banner persistente.
3. Ativar create/add/update/remove/discount/shipping conforme capacidade real validada.
4. Manter `prepare` bloqueado até validação de todos os dados e host.
5. Depois, habilitar hosted checkout somente para QA interno e ação explícita.

### Gate do handoff

- cart fresco e revision correta;
- todas as linhas, price, currency, availability, discount, delivery e cost revalidados;
- `checkoutUrl` HTTPS e hostname exatamente allowlisted;
- URL nunca logada/persistida;
- volta/cancelamento não apaga cart;
- timeout indeterminado não cria nova tentativa com nova key;
- checkout convidado e meios Brasil testados e documentados individualmente `[A VALIDAR]`;
- nenhum pedido sandbox é descrito como produção.

### Rollback F4

1. Desativar `CHECKOUT_HANDOFF_ENABLED`.
2. Preservar cart sandbox e mostrar erro recuperável.
3. Se provider instável, voltar leitura/mutations para fixture server-side em rota de demo separada; não converter IDs.
4. Invalidar checkout URLs emitidas por expiração/recriação quando suportado `[A VALIDAR]`.

## 8. Fase 5 — Production dark launch

Objetivo: validar configuração de produção sem tráfego comprador.

### Ações

1. Provisionar production com secrets/allowlists/storage isolados.
2. Rodar health/read-only e synthetic carts autorizados, sem payment real.
3. Publicar conteúdo e catálogo somente `noindex`/acesso interno até legal, SEO e commerce gates.
4. Executar shadow comparison e reconciliação.
5. Revisar dashboards, alertas, backup/restore e on-call.

### Gate F5

- restore de storage e rollback de conteúdo testados;
- zero fixture IDs/copy em production manifest;
- policies/identity/support aprovados;
- security/LGPD/a11y/performance/SEO/QA sem P0/P1 bloqueante;
- owner de operação aprova frete, devolução, estoque e incident response;
- provider/checkout/payment evidence real anexada `[A VALIDAR]`;
- autorização explícita para publicação/deploy, fora deste runbook.

### Rollback F5

- kill switch fecha add/checkout e mantém catálogo read-only ou maintenance aprovado;
- reverter publication manifest e cache tags;
- preservar sessions para diagnóstico, sem expor PII;
- revogar secrets comprometidos e executar incident runbook.

## 9. Fase 6 — Cutover gradual

Esta fase só pode ocorrer após autorização explícita do owner e não está autorizada pelo escopo atual.

### Sequência proposta

1. leitura pública do catálogo real;
2. cart real para coorte interna;
3. checkout hosted para coorte interna;
4. coorte externa pequena `[percentual A VALIDAR]` com observação;
5. expansão somente se SLOs e business reconciliation estiverem verdes.

Nunca fazer split de um mesmo cart entre adapters. Assignment é estável por sessão antes da criação do cart; mudança de coorte exige novo cart e consentimento claro.

### Stop conditions

- preço/estoque divergente;
- checkout host inválido;
- spike de conflicts/5xx/timeouts;
- webhook/reconciliation lag acima do SLO;
- pedido/pagamento sem reconciliação;
- PII/secret em log;
- conteúdo/claim não elegível publicado;
- meios de pagamento/frete exibidos sem capacidade real.

## 10. Rollback operacional de produção

```text
detectar stop condition
 -> congelar checkout prepare
 -> preservar carts e request IDs
 -> parar expansão
 -> escolher: read-only real | maintenance | fixture em rota demo separada
 -> reverter manifest/config por versão
 -> purgar tags afetadas
 -> reconciliar mutations/pedidos indeterminados
 -> comunicar owner/suporte
 -> registrar incidente e critério de reabertura
```

Proibições:

- não transformar cart real em fixture nem vice-versa;
- não reenviar mutation incerta com nova idempotency key;
- não confirmar pedido/pagamento por URL de retorno do browser;
- não apagar inbox/idempotency/audit trail durante rollback;
- não ocultar indisponibilidade com preço/estoque cacheado como se fosse atual.

## 11. Matriz de gates finais

| Gate | Evidência | Owner |
|---|---|---|
| contratos/paridade | contract + E2E fixture/server | HEAL-08/21 |
| catálogo/mapping | manifest 100% SKU + diffs | HEAL-13/14 |
| conteúdo/claims | publication manifest + evidence refs | HEAL-04/19 |
| segurança | origin/CSRF/HMAC/secret/log tests | HEAL-19 |
| resiliência | timeout, retry, conflict, restart, multi-instance | HEAL-14/21 |
| webhook | HMAC, duplicate, reorder, missed-event reconciliation | HEAL-14/21 |
| checkout | fresh validation + exact allowlist + sandbox evidence | HEAL-13/19/21 |
| pagamentos Brasil | teste por método e conta/ambiente | `[A VALIDAR]` |
| LGPD/legal | data map, retenção, políticas e DSR | HEAL-19 + jurídico |
| release | SEO/a11y/perf/QA + autorização explícita | HEAL-00/22 |

## 12. Handoff executável

Próxima tarefa segura: implementar **somente Fase 1** em branch dedicada, com fixture server-side e contract tests. Não instalar SDK Shopify, não criar secrets e não habilitar checkout externo até F1 estar verde e uma ADR posterior aprovar F2/F3.

