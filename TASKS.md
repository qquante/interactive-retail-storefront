# HEAL — Tasks

Atualizado em: 2026-08-28

Estados permitidos: `proposed`, `researching`, `ready`, `in_progress`, `review`, `changes_requested`, `verified`, `integrated`, `done`, `blocked`, `cancelled`.

| Task | Goal | Owner | Dependências | Escopo | Estado | Evidência/aceite |
|---|---|---|---|---|---|---|
| HEAL-T000 | G-007 | HEAL-00 | — | Scaffold e governança | verified | Scaffold atualizado; audit 0; controle presente; baseline commit pendente |
| HEAL-T001 | G-001/G-002/G-005 | HEAL-01 | HEAL-T000 | Reconhecimento read-only e ADR preliminar | verified | Handoff concluído; ADR-001 aceita para vertical slice |
| HEAL-T002 | G-001 | HEAL-02 | HEAL-T001 | Benchmarks e mercado | verified | `docs/research/2026-08-28-market-benchmarks.md` |
| HEAL-T003 | G-001 | HEAL-03 | HEAL-T001 | Estratégia de marca/marketing | verified | `docs/brand/` com positioning, claims e funnel |
| HEAL-T004 | G-001/G-004 | HEAL-05 | HEAL-T001 | UX research e IA | verified | `docs/ux/` com sitemap, fluxos e wireframes |
| HEAL-T005 | G-001 | HEAL-04 | HEAL-T002/T003 | Conteúdo e copy | verified | `docs/content/` com modelo, voz/copy e lacunas |
| HEAL-T006 | G-004 | HEAL-06 | HEAL-T004 | Frontend UX | proposed | Estados e comportamento dos componentes |
| HEAL-T007 | G-001 | HEAL-07 | HEAL-T002/T003/T004 | Visual design | verified | Três direções; `Tempo de Brasa` escolhida para a slice |
| HEAL-T008 | G-001/G-002 | HEAL-08 | HEAL-T005/T006/T007 | Frontend core | in_progress | Rotas e shell integrados |
| HEAL-T009 | G-001/G-004 | HEAL-09 | HEAL-T006/T007 | Design system | proposed | Tokens e primitives acessíveis |
| HEAL-T010 | G-003 | HEAL-10 | HEAL-T007/T009 | Anime.js/motion | in_progress | Motion bible + implementação/fallback |
| HEAL-T011 | G-003/G-006 | HEAL-11 | HEAL-T007/T018 | Three.js | in_progress | Cena lazy + tiers + cleanup + fallback |
| HEAL-T012 | G-004 | HEAL-12 | HEAL-T006/T008/T009 | Mobile/responsive | proposed | Matriz de viewports validada |
| HEAL-T013 | G-002 | HEAL-13 | HEAL-T001/T004 | Commerce | ready | Contrato e pesquisa concluídos; implementação fixture em HEAL-T008 |
| HEAL-T014 | G-002 | HEAL-14 | HEAL-T001/T013 | Backend/CMS | proposed | Adapters/schemas/cache documentados |
| HEAL-T015 | G-005 | HEAL-15 | HEAL-T001 | SEO técnico 2026 | ready | Pesquisa/spec concluídas; implementação e validação pendentes |
| HEAL-T016 | G-005 | HEAL-16 | HEAL-T002/T003/T005 | SEO conteúdo/Shopping/AI | proposed | Intent map e plano Images/Lens/Merchant |
| HEAL-T017 | G-006 | HEAL-17 | HEAL-T008/T009/T010/T011 | Acessibilidade | proposed | Axe + revisão manual + findings |
| HEAL-T018 | G-006 | HEAL-18 | HEAL-T008/T010/T011 | Performance | proposed | Budgets e relatórios reproduzíveis |
| HEAL-T019 | G-006 | HEAL-19 | HEAL-T013/T014 | Segurança/LGPD | proposed | Threat/privacy review e findings |
| HEAL-T020 | G-002/G-005 | HEAL-20 | HEAL-T003/T013/T015 | Analytics/CRO | proposed | Measurement plan e eventos |
| HEAL-T021 | G-001..G-006 | HEAL-21 | Implementação | QA/E2E/visual | proposed | Gates, screenshots e exit codes |
| HEAL-T022 | G-001..G-007 | HEAL-22 | HEAL-T021 | Review independente | proposed | approved/changes_requested/blocked |
