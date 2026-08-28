# Handoff HEAL-13 / HEAL-T013

## Resultado
Pesquisa commerce Brasil, contrato provider-independent e fixture.
## Estado real: fixture integrada; provider real ausente
## Fontes consultadas e datas
Docs oficiais de plataformas/checkout listadas no research de 2026-08-28.
## Decisões propostas
Money decimal, inventory unknown explícito, idempotência e handoff sem pagamento.
## Arquivos alterados
`docs/research/2026-08-28-commerce-brazil.md`, `docs/commerce/`, `site/lib/commerce/**`.
## Escopo não tocado
Conta, token, webhook, pagamento e pedido reais.
## Comandos executados
Testes unit/integration; root rerodou.
## Testes e exit codes
Commerce 6 casos originais/finais ampliados; suite total atual registrada no QA.
## Evidências geradas
Ports, adapter fixture, invariantes e UI de handoff.
## Erros encontrados e como foram resolvidos
UI store bypassa garantias do adapter; registrado como gate arquitetural.
## Riscos e pendências
BFF autoritativo antes de integrar provider.
## Próximo owner
HEAL-14/19.
