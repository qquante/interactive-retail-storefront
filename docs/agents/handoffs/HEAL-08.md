# Handoff HEAL-08 / HEAL-T008

## Resultado
Frontend core e vertical slice de commerce fixture integrados.
## Estado real: integrado localmente
## Fontes consultadas e datas
ADR, UX, conteúdo, visual e contrato de commerce em 2026-08-28.
## Decisões propostas
SSR de conteúdo, componentes client apenas onde há estado e nenhum falso checkout.
## Arquivos alterados
Rotas, shell e componentes de commerce em `site/`.
## Escopo não tocado
Provider real, pagamento, deploy e secrets.
## Comandos executados
Lint/typecheck informados no handoff; root rerodou toda a matriz.
## Testes e exit codes
Commit `97a5838`; gates finais em `docs/qa/QA_RELEASE_MATRIX.md`.
## Evidências geradas
Home, coleção, PDP, busca, sacola, checkout/handoff e 404.
## Erros encontrados e como foram resolvidos
Findings UX, overflow e hidratação corrigidos pelo root.
## Riscos e pendências
BFF e fonte autoritativa obrigatórios antes de venda.
## Próximo owner
HEAL-00/14/17/21.
