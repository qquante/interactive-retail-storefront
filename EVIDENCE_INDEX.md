# HEAL — Índice de Evidências

Atualizado em: 2026-08-28

| Evidência | Estado | Local/fonte |
|---|---|---|
| Scaffold Sites/Vinext | real/local | `site/` |
| Auditoria de dependências | real, 2026-08-28 | `npm audit --omit=dev --json`: 0 vulnerabilidades |
| Handoff HEAL-01 | research-only | incorporado em `docs/architecture/ADR-001-storefront-commerce.md` |
| Commerce | fixture ainda não implementada | nenhuma conta, token ou pagamento conectado |

| Evidence | Task | Tipo | Caminho/resultado | Estado |
|---|---|---|---|---|
| E-0001 | HEAL-T000 | scaffold | `site/` criado por `@openai/create-sites@0.2.0`; add-ons: none | verified |
| E-0002 | HEAL-T000 | manifest | `site/package.json` e `site/.openai/hosting.json` inspecionados | verified |
| E-0003 | HEAL-T000 | limitation | Scaffold no root falhou porque o prompt já existia; recuperado criando `site/` sem mover/apagar o arquivo | verified |
| E-0004 | HEAL-T001 | agent | `/root/heal_01_recon` iniciado em modo read-only | in_progress |

Não registrar como evidência:

- afirmação sem output;
- screenshot não inspecionado;
- teste que não terminou;
- relatório de subagente não verificado pelo coordenador;
- fixture como prova de produção.
