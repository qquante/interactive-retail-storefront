# HEAL — Tasks

Atualizado em: 2026-08-28

Estados permitidos: `proposed`, `researching`, `ready`, `in_progress`, `review`, `changes_requested`, `verified`, `integrated`, `done`, `blocked`, `cancelled`.

| Task | Goal | Owner | Dependências | Escopo | Estado | Evidência/aceite |
|---|---|---|---|---|---|---|
| HEAL-T000 | G-007 | HEAL-00 | — | Scaffold e governança | done | Scaffold atualizado; audit 0; controles e commits locais presentes |
| HEAL-T001 | G-001/G-002/G-005 | HEAL-01 | HEAL-T000 | Reconhecimento read-only e ADR preliminar | verified | Handoff concluído; ADR-001 aceita para vertical slice |
| HEAL-T002 | G-001 | HEAL-02 | HEAL-T001 | Benchmarks e mercado | verified | `docs/research/2026-08-28-market-benchmarks.md` |
| HEAL-T003 | G-001 | HEAL-03 | HEAL-T001 | Estratégia de marca/marketing | verified | `docs/brand/` com positioning, claims e funnel |
| HEAL-T004 | G-001/G-004 | HEAL-05 | HEAL-T001 | UX research e IA | verified | `docs/ux/` com sitemap, fluxos e wireframes |
| HEAL-T005 | G-001 | HEAL-04 | HEAL-T002/T003 | Conteúdo e copy | verified | `docs/content/` com modelo, voz/copy e lacunas |
| HEAL-T006 | G-004 | HEAL-06 | HEAL-T004 | Frontend UX | verified | Contrato completo + 14 findings; bloqueadores locais principais remediados |
| HEAL-T007 | G-001 | HEAL-07 | HEAL-T002/T003/T004 | Visual design | verified | Três direções; `Tempo de Brasa` escolhida para a slice |
| HEAL-T008 | G-001/G-002 | HEAL-08 | HEAL-T005/T006/T007 | Frontend core | integrated | Home + rotas institucionais + coleção/PDP/busca/filtro/sacola/handoff fixture |
| HEAL-T009 | G-001/G-004 | HEAL-09 | HEAL-T006/T007 | Design system | verified | Inventário obrigatório completo; 5 testes de interação; adoção nas rotas é gradual |
| HEAL-T010 | G-003 | HEAL-10 | HEAL-T007/T009 | Anime.js/motion | integrated | Motion bible + duas microinterações com cleanup/reduced motion |
| HEAL-T011 | G-003/G-006 | HEAL-11 | HEAL-T007/T018 | Three.js | integrated | Cena lazy + tiers + cleanup + fallback; custo GPU real ainda é gate externo |
| HEAL-T012 | G-004 | HEAL-12 | HEAL-T006/T008/T009 | Mobile/responsive | verified | 320–1920 e paisagem; overflow/hydration corrigidos e revalidados |
| HEAL-T013 | G-002 | HEAL-13 | HEAL-T001/T004 | Commerce | integrated | Contrato + adapter + fixture rotulada; nenhum commerce real conectado |
| HEAL-T014 | G-002 | HEAL-14 | HEAL-T001/T013 | Backend/CMS | verified | Spec e runbook BFF/CMS/Shopify; implementação real não autorizada |
| HEAL-T015 | G-005 | HEAL-15 | HEAL-T001 | SEO técnico 2026 | verified | Meta noindex crawlable + teste robots + OG condicional; preview exige auth; produção bloqueada |
| HEAL-T016 | G-005 | HEAL-16 | HEAL-T002/T003/T005 | SEO conteúdo/Shopping/AI | verified | Intent map + playbook oficial 2026; sem feed/schema factual no fixture |
| HEAL-T017 | G-006 | HEAL-17 | HEAL-T008/T009/T010/T011 | Acessibilidade | verified | Review independente; 0 violations no axe pós-fix; leitor físico pendente |
| HEAL-T018 | G-006 | HEAL-18 | HEAL-T008/T010/T011 | Performance | review | Budget/review/Lighthouse; mobile 79 e origem final/GPU ainda bloqueiam produção |
| HEAL-T019 | G-006 | HEAL-19 | HEAL-T013/T014 | Segurança/LGPD | review | GO local/NO-GO produção; CEP/session remediado, headers/backend pendentes |
| HEAL-T020 | G-002/G-005 | HEAL-20 | HEAL-T003/T013/T015 | Analytics/CRO | verified | Plano e guardrails prontos; nenhuma instrumentação/consentimento conectado |
| HEAL-T021 | G-001..G-006 | HEAL-21 | Implementação | QA/E2E/visual | verified | QA independente entregue; root fechou QA-001/002; E2E padrão 48/48 |
| HEAL-T022 | G-001..G-007 | HEAL-22 | HEAL-T021 | Review independente | verified | Re-review em `6b77c52`: approved para protótipo local fixture |
| HEAL-T023 | G-005/G-007 | HEAL-00 | HEAL-T022 | Remediação pós-review e novo release candidate | done | HEAL22-001…004 fechados; H22-005 documental corrigido |
| HEAL-T024 | G-001/G-008 | HEAL-23 | DEC-014/015 | Cinco direções de branding e copy | verified | 5 territórios, 50 dizeres, naming, microcopy, matriz e duas finalistas em `docs/concepts/BRANDING_COPY_DIRECTIONS.md` |
| HEAL-T025 | G-003/G-008 | HEAL-24 | HEAL-T024 | Experience & Motion Lab | verified | 30 momentos, 5 signatures, Anime.js/Three.js, budgets e rotas de ambição em `docs/concepts/EXPERIENCE_MOTION_LAB.md` |
| HEAL-T026 | G-001/G-008 | HEAL-25 | HEAL-T024 | Produto, bastão e embalagem | verified | Auditoria das referências, taxonomia do bastão, 5 caixas, shot list e gates em `docs/concepts/PRODUCT_PACKAGING_RESEARCH.md` |
| HEAL-T027 | G-004/G-008 | HEAL-26 | HEAL-T024/T025 | Auditoria frontend experience | verified | 32 propostas, 3 storyboards, gaps desktop/mobile e laboratório A/B/C em `docs/concepts/FRONTEND_EXPERIENCE_GAP_AUDIT.md` |
| HEAL-T028 | G-001/G-008 | HEAL-00 | HEAL-T024/T025/T026 | Cinco concept arts e prancha de escolha | verified concept-only | Imagens inspecionadas, provenance e `docs/concepts/CONCEPT_SELECTION_BOARD.md`; nenhuma integração visual na loja |
| HEAL-T029 | G-001/G-007 | HEAL-00 | DEC-014/015 | Corrigir nomenclatura user-facing da fixture | verified | HEAL/HEALS/incensos atualizados; lint, typecheck, 12/12 Vitest, 52/52 E2E, axe 0 e build passaram |
