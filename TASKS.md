# HEAL — Tasks

Atualizado em: 2026-09-26

Estados permitidos: `proposed`, `researching`, `ready`, `in_progress`, `review`, `changes_requested`, `verified`, `integrated`, `done`, `blocked`, `cancelled`.

| Task | Goal | Owner | Dependências | Escopo | Estado | Evidência/aceite |
|---|---|---|---|---|---|---|
| HEAL-T051 | G-007 | HEAL-00 + railway_runtime_audit | Pedido de serviço Railway separado | Publicar apresentação atual em projeto/serviço próprio com domínio Railway; preservar Sites e outros serviços | done | HEAL/heal-web, HTTPS público, SUCCESS/healthcheck 1/1; 23 testes + 8 E2E + 46 checks remotos + 10 axe; `docs/operations/RAILWAY_DEPLOYMENT.md`; sem ativar vendas |
| HEAL-T050 | G-003/G-004/G-007 | HEAL-00 + retail_source_audit | Ajustes visuais aprovados após HEAL-T049 | Pulsos ascendentes como único padrão; remover seletor; clarear vareta e enquadrar apenas a ponta na base em desktop/mobile | done | 23 testes, 8 E2E focados, build/lint/typecheck passaram; captura mobile/desktop revisada; publicação privada succeeded. `docs/evidence/qa/retail-v1/PULSE_TIP.md` |
| HEAL-T049 | G-001/G-003/G-004/G-007 | HEAL-00 + premium_brand_research + retail_campaign_assets + retail_source_audit | Avanço integral autorizado em 2026-09-26 | Branding, loja completa, banners, navegação, QA e publicação privada | done | 23 testes, 74 E2E, 46 verificações de rota e 10 axe passaram; build/lint/typecheck OK; publicação privada succeeded. `docs/evidence/qa/retail-v1/RESULTS.md` |
| HEAL-T048 | G-001/G-003/G-004 | HEAL-00 | Pedido de 2026-09-26 após publicação | Diagnóstico e proposta retail-premium; preservar incenso/fumaça | done | Proposta aceita pelo pedido seguinte de execução integral; implementada em HEAL-T049 |
| HEAL-T047 | G-001/G-007/G-008 | HEAL-00 + catalogue_integration + photo_asset_audit + live_readiness | HEAL-T046 aprovado; pedido de avanço/live | Cinco fotos com referência material Nirvana, integração e publicação privada | done | 22/22 testes, build, E2E 2/2, probe 28/28; publicação privada succeeded. Evidência: `docs/evidence/qa/catalogue-v2/PUBLICATION.md`; sem abertura de vendas |
| HEAL-T046 | G-001/G-008 | HEAL-00 | Pedido de produção por partes de 2026-09-26 | Primeira foto de catálogo: Canela, preservando embalagem V3 | done | Direção aprovada pelo usuário; original preservado e refinado na coleção V2 em HEAL-T047 |
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
| HEAL-T030 | G-001/G-008 | HEAL-30 | DEC-018/019 | Arquitetura completa de marca e embalagem | verified concept-only | Seis hierarquias, cinco SKUs, todas as faces, pouch, lacre, caixa-mãe, copy e preflight em `docs/concepts/PACKAGING_BRAND_ARCHITECTURE.md` |
| HEAL-T031 | G-001/G-008 | HEAL-31 | DEC-018 | Auditoria V2 das linhas Nirvana e Fênix | verified research-only | Premium/Tradicional/Essencial e médio/grande/in natura, gaps e protocolo visual em `docs/concepts/COMPETITOR_LINE_AUDIT_V2.md` |
| HEAL-T032 | G-003/G-008 | HEAL-32 | DEC-018/019 | Sistema físico/digital Coreografia do ar | verified concept-only | Gramática por SKU, motion, Three.js, fallbacks, budgets e storyboards em `docs/concepts/COREOGRAFIA_DO_AR_SYSTEM.md` |
| HEAL-T033 | G-001/G-008 | HEAL-00 | HEAL-T030/T031/T032 | Mockups e prancha vetorial das cinco caixas | verified concept-only | 6 mockups ImageGen + SVG/PNG com cinco frentes e mapa integral de faces; inspeção visual e provenance concluídos |
| HEAL-T034 | G-001/G-003/G-004/G-005/G-006 | HEAL-33..37 | HEAL-T032/T033 | Especificações de frontend, Anime.js, Three.js, SEO/commerce e QA para a direção escolhida | verified | Cinco specs implementáveis e handoffs `HEAL-33` a `HEAL-37` em `docs/implementation/` e `docs/agents/handoffs/` |
| HEAL-T035 | G-001/G-008 | HEAL-38/HEAL-00 | HEAL-T030/T033 | Símbolo HEAL, hero de vareta/fumaça e cinco embalagens V3 | verified concept-only | Símbolo SVG/code-native, 1 hero e 5 mockups V3 com PNG de evidência, WebP integrado e provenance |
| HEAL-T036 | G-001..G-008 | HEAL-00 | HEAL-T034/T035 | Integrar `Coreografia do ar` na loja completa | verified local-only | Home, mapa interativo, marca, catálogo, PDP, busca paginada, profissionais, conteúdo e rotas pré-lançamento integrados; sem venda/deploy |
| HEAL-T037 | G-001..G-007 | HEAL-37/HEAL-39/HEAL-00 | HEAL-T036 | QA final, revisão independente e remediação | verified | Findings de contraste, hidratação, semiótica, paginação, nomenclatura, claims e lifecycle Three removidos; 15/15 Vitest e 65 E2E PASS + 3 skips intencionais |
| HEAL-T038 | G-001/G-003/G-004/G-008 | HEAL-00 | HEAL-T037 | Pesquisa de componentes transferíveis, fumaça, texto e storytelling | verified | Research-only em `docs/research/2026-08-28-section-by-section-component-research.md`; nenhuma seção alterada |
| HEAL-T039 | G-001/G-003/G-004 | HEAL-00 | HEAL-T038 | Primeiro viewport: Header + Hero | review | Protótipo temporário A fluxo/B hélice/C pulsos via `?variant=`; progressão 1→10 preservada e antecipada, com dez cores circulando depois; ritmo final em 25% da primeira versão móvel; fumaça, brasa, calor, faíscas e vareta compartilham uma única âncora validada em 320–1920 px; glyph marrom e blocos editoriais redundantes removidos para deixar a área visual somente com incenso, combustão e fumaça; aguarda aceite |
| HEAL-T040 | G-001/G-003/G-004 | HEAL-00 | HEAL-T039 aprovado | Mapa do Ar | proposed | Uma seção por mensagem; não iniciar sem aceite do Hero |
| HEAL-T041 | G-001/G-004/G-008 | HEAL-00 | HEAL-T040 aprovado | História da marca | proposed | Storytelling, símbolo, matéria e origem; uma seção por mensagem |
| HEAL-T042 | G-001/G-002/G-004 | HEAL-00 | HEAL-T041 aprovado | Coleção e cards de produto | proposed | Comparação rápida desktop/mobile; sem aparência de prancha técnica |
| HEAL-T043 | G-001/G-004 | HEAL-00 | HEAL-T042 aprovado | Como escolher | proposed | Decisão por aroma, intensidade, momento e ambiente |
| HEAL-T044 | G-001/G-002/G-004 | HEAL-00 | HEAL-T043 aprovado | Profissionais | proposed | Lojas, terapias, espaços e revenda com prova visual e CTA claro |
| HEAL-T045 | G-001/G-004/G-006 | HEAL-00 | HEAL-T044 aprovado | Rodapé e fechamento narrativo | proposed | Continuidade da marca, contato e confiança; revisão final após aceite |
