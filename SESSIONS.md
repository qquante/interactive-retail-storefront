# HEAL — Sessions

Atualizado em: 2026-09-26

| Session | Agente | Objetivo | Escopo | Estado | Resultado/evidência |
|---|---|---|---|---|---|
| S-20260926-006 | HEAL-00 + railway_runtime_audit | Deploy Railway independente | Root controla deploy; agente audita runtime somente leitura | done | Projeto HEAL/serviço heal-web criado isoladamente; deploy deb8a30a SUCCESS; 30 assets 200; QA remoto 46 rotas/10 axe/3 ciclos de motion sem erros; Sites preservado |
| S-20260926-005 | HEAL-00 + retail_source_audit | Padrão C/Pulsos, sem opções, ponta iluminada na base | Ajuste pontual de motion/layout, testes e publicação | done | Índice 2 fixo; URLs antigas não trocam variante; dez cores/ritmo preservados; foto 1080×1920 preservada com iluminação CSS; 8 E2E passaram; publicação succeeded; `docs/evidence/qa/retail-v1/PULSE_TIP.md` |
| S-20260926-004 | HEAL-00 + premium_brand_research + retail_campaign_assets + retail_source_audit | Implementar branding e reforma retail integral | Root controla checkout/Sites; agentes somente pesquisa, auditoria e 2 assets | done | Home, shell, catálogo, PDP, busca e 11 páginas editoriais refeitos; shader intacto; 23 testes + 74 E2E; 46 rotas/10 axe; publicação privada succeeded; `docs/evidence/qa/retail-v1/RESULTS.md` |
| S-20260926-003 | HEAL-00 + catalogue_integration + photo_asset_audit | Diagnóstico retail-premium solicitado após a publicação | Read-only: UI e fontes reais | review | Home conceitual demais, shell duplicado, cards extensos e PDP sem jornada comercial; proposta entregue, sem reforma |
| S-20260926-002 | HEAL-00 + catalogue_integration + photo_asset_audit + live_readiness | Avançar as cinco fotos e publicar revisão | Geração, catálogo, QA e hospedagem privada | done | Imagens V2 integradas; 22/22 testes, E2E 2/2, probe 28/28; deploy privado succeeded; `docs/evidence/qa/catalogue-v2/PUBLICATION.md`; fumaça preservada |
| S-20260926-001 | HEAL-00 + photo_asset_audit | Primeira prova fotográfica para aprovação | Assets/documentação; sem código de aplicação | review | Canela com caixa fechada e vareta áspera; referências V3 preservadas, QA visual independente e navegador 160/320 px; próxima geração depende de aceite |
| S-20260828-001 | HEAL-00 | Ler prompt, criar scaffold e governança | Workspace root + `site/` | verified | Next/Vinext/Vite atualizados; `npm audit` total 0; servidor local iniciado |
| S-20260828-002 | HEAL-01 | Reconhecimento e arquitetura preliminar | Read-only | done | Handoff concluído; ADR-001 aceita para a vertical slice |
| S-20260828-003 | HEAL-02 | Mercado e benchmarks | Research read-only | done | Research pack com 8 benchmarks e 22 páginas oficiais |
| S-20260828-004 | HEAL-03 | Marca e marketing | Research read-only | done | Posicionamento, claims boundary e funil entregues |
| S-20260828-005 | HEAL-05 | UX research e arquitetura da informação | Research read-only | done | Sitemap, jornadas, fluxos e wireframes entregues |
| S-20260828-006 | HEAL-07 | Três direções visuais e contrato | Docs/design | done | `Tempo de Brasa` recomendada e aceita para a slice |
| S-20260828-007 | HEAL-13 | Contrato de commerce e fixture | Docs/commerce | done | Ports, invariantes e pesquisa Brasil entregues |
| S-20260828-008 | HEAL-15 | SEO técnico 2026 | Docs/research e docs/seo | done | Pesquisa oficial e spec implementável entregues |
| S-20260828-009 | HEAL-00 | Primeira fatia visual | Home, assets e browser QA | verified | 1440/390 px; HTTP 200; sem overflow horizontal em 390 px |
| S-20260828-010 | HEAL-08 | Frontend core e commerce fixture | Rotas/lib/components de commerce | done | Ports, adapter, catálogo/PDP/sacola/handoff fixture integrados |
| S-20260828-011 | HEAL-10 | Motion/Anime.js | `components/motion` + motion bible | done | Seam editorial e feedback de sacola com cleanup/reduced motion |
| S-20260828-012 | HEAL-11 | Three.js procedural | `components/three` | done | Cena lazy, tiers, pausa, cleanup e fallback SSR integrados |
| S-20260828-013 | HEAL-04 | Conteúdo e copy | `docs/content/` | done | Modelo, voz, copy e inventário de lacunas sem claims inventados |
| S-20260828-014 | HEAL-06 | Frontend UX | Auditoria read-only + `FRONTEND_UX_BEHAVIOR.md` | done | Contratos de estado e 14 findings; correções críticas integradas pelo root |
| S-20260828-015 | HEAL-09 | Design system | `site/components/ui/**` + docs | done | Primitives validadas por lint/typecheck; integração ampla não forçada |
| S-20260828-016 | HEAL-12 | Responsividade/mobile | Browser matrix + review read-only | done | Overflow e hydration encontrados; root corrigiu e revalidou 10 viewports |
| S-20260828-017 | HEAL-social | Social preview | ImageGen isolado, uma geração | done | `site/public/og.png` aprovado, provenance e otimização 1200×630 |
| S-20260828-018 | HEAL-19 | Segurança/LGPD | Threat/privacy review read-only | done | GO apenas local; storage remediado; headers/backend seguem gate de produção |
| S-20260828-019 | HEAL-16 | SEO conteúdo/Shopping/AI | Research/docs oficiais 2026 | done | Intent map e playbook de Images/Merchant/IA |
| S-20260828-020 | HEAL-17 | Acessibilidade | Axe/teclado/reflow/reduced motion | done | 0 P0/P1; P2/P3 locais remediados; `test:a11y` 0 violations |
| S-20260828-021 | HEAL-18 | Performance | Build, bundles, Lighthouse e runtime probes | done | Desktop 99; mobile 79; OG otimizado; produção continua bloqueada |
| S-20260828-022 | HEAL-14 | Backend/CMS | Spec e migration runbook | done | BFF fixture server-side definido como primeiro gate; Shopify continua candidato |
| S-20260828-023 | HEAL-20 | Analytics/CRO | Plano e guardrails | done | 16 eventos especificados; nenhuma coleta/instrumentação instalada |
| S-20260828-024 | HEAL-00 | Hardening e expansão | Rotas restantes, busca/filtro, testes e remediações | verified | Unit/integration/E2E/axe cross-browser implementados; OG/SEO/storage/a11y corrigidos |
| S-20260828-025 | HEAL-21 | QA final independente | Review read-only e gates completos | done | Relatório entregue; root remediou QA-001/002; E2E padrão final 48/48 |
| S-20260828-026 | HEAL-22 | Review final independente | Release candidate `b5ec182`, read-only | done | `changes_requested`: HEAL22-001…004; nenhum arquivo alterado pelo reviewer |
| S-20260828-027 | HEAL-00 | Remediação pós-review | Design system, SEO, governança e prova CSS | done | 12/12 Vitest, 52/52 E2E, Axe 0, build/smoke/audits verdes |
| S-20260828-028 | HEAL-22 | Re-review final independente | `70be2a6` + evidência `6b77c52`, read-only | done | `approved` para protótipo local; HOLD preview; NO-GO produção |
| S-20260828-029 | HEAL-23 | Branding e copy exploratórios | `docs/concepts/` + handoff próprio | done | Cinco direções, 50 dizeres e finalistas sem escolher vencedora |
| S-20260828-030 | HEAL-24 | Experience & Motion Lab | `docs/concepts/` + handoff próprio | done | 30 interações, cinco signatures e rota Signature recomendada para protótipo |
| S-20260828-031 | HEAL-25 | Produto, bastão e embalagem | `docs/concepts/` + handoff próprio | done | Auditoria Nirvana/Fênix, cinco caixas e requisitos materiais documentados |
| S-20260828-032 | HEAL-26 | Frontend experience/UX independente | `docs/concepts/` + handoff próprio | done | UI 1440/390 inspecionada; 32 propostas e três storyboards; nenhum código alterado |
| S-20260828-033 | HEAL-00 | Naming, concept arts e integração documental | `site/` user-facing + docs/evidence/governança | verified | HEAL/HEALS aplicado; cinco imagens concept-only; lint/typecheck/12 Vitest/52 E2E/axe/build verdes |
| S-20260828-034 | HEAL-30 | Arquitetura integral da caixa sem dois logos | `docs/concepts/` + handoff próprio | done | H1 aroma-first adotada; cinco SKUs, painéis, pouch, lacre, caixa-mãe e preflight regulatório |
| S-20260828-035 | HEAL-31 | Auditoria aprofundada Nirvana/Fênix | `docs/concepts/` + handoff próprio | done | Linhas, formatos, cinco aromas, bastões, fotografia, gaps e gates documentados |
| S-20260828-036 | HEAL-32 | Sistema físico/digital da direção escolhida | `docs/concepts/` + handoff próprio | done | Cinco gramáticas visuais, storyboards, Anime.js/Three.js, fallbacks, budgets e métricas |
| S-20260828-037 | HEAL-00 | Mockups e prancha de embalagem V2 | `docs/evidence/concepts/packaging/coreografia-v2/` + governança | verified concept-only | 6 imagens, SVG/PNG de sistema e provenance; nenhuma mudança na loja |
| S-20260828-038 | HEAL-33 | Spec frontend/UX da direção escolhida | `docs/implementation/` + handoff | done | Arquitetura de página, estados, acessibilidade, responsividade e sequência de implementação |
| S-20260828-039 | HEAL-34 | Spec Anime.js autoral | `docs/implementation/` + handoff | done | Mapa do ar, timelines, lifecycle, reduced motion e budgets definidos |
| S-20260828-040 | HEAL-35 | Spec Three.js da fumaça | `docs/implementation/` + handoff | done | Arquitetura procedural, tiers, fallbacks, cleanup e limites de GPU definidos |
| S-20260828-041 | HEAL-36 | Review SEO/commerce 2026 | `docs/implementation/` + handoff | done | Noindex pré-lançamento, limites de schema/feed e gaps factuais documentados |
| S-20260828-042 | HEAL-37 | Matriz de QA | `docs/implementation/` + handoff | done | Matriz 320–1920, a11y, motion, WebGL, commerce, SEO e catálogo ampliado |
| S-20260828-043 | HEAL-38 | Hero de produto | ImageGen isolado, uma geração | done | Vareta áspera, brasa e fumaça; PNG de evidência e WebP otimizado |
| S-20260828-044 | HEAL-39 | História de marca e semiótica consciente | `docs/brand/` + handoff | done | HEAL/HEALS, públicos, narrativa, símbolo, 5→50 e claims boundary consolidados |
| S-20260828-045 | HEAL-00 | Integração integral `Coreografia do ar` | `site/`, assets e docs | verified local-only | Símbolo, hero, mapa Anime.js, fumaça Three.js, caixas V3, catálogo/PDP e rotas completas integrados |
| S-20260828-046 | HEAL-34/HEAL-39/HEAL-00 | QA independente e hardening final | Review read-only + correções root | verified | Blockers de marca/catalogação/motion remediados; 15/15 Vitest, 65 E2E PASS + 3 skips intencionais, build e browser QA fechados |
| S-20260828-047 | HEAL-00 | Pesquisa de componentes e storytelling seção por seção | Research/docs only | verified | Anime/Three/Paper/Magic UI/Motion Primitives/React Bits/Aceternity/Lenis avaliados; HEAL-T039 pronto; nenhuma seção alterada |
| S-20260828-048 | HEAL-00 | Header + Hero — Coreografia do ar | `site/` + asset ImageGen + QA | review | Pluma vertical Paper/Anime, entrada cinza→cor, vareta HEALS recortada, fallbacks WebGL/reduced-data e capturas 1440×900/390×844; aguarda aceite |
| S-20260828-049 | HEAL-00 | Refinar vareta Full HD e pluma da Hero | Header + Hero somente | review | Uma vareta V4 1080×1920/alpha; ponta e shader realinhados; fumaça cruza header, começa cinza e ganha cor; lint, 15/15 Vitest e build aprovados; E2E completo aprovado antes do empacotamento FHD e rerun final de overflow 4/4 |
| S-20260828-050 | HEAL-00 | Corrigir progressão Paper `colorCount` | Shader da Hero somente | review | Interpretação anterior corrigida: slots ativos passam por 1,2,3,4,5,6,7,8,9,10; navegador mediu cada estágio até 14,5 s; estágio 2 amarelo e estágio 10 multicolor; lint, 15/15 Vitest, build e 8/8 E2E de fallback aprovados |
| S-20260828-051 | HEAL-00 | Prototipar movimento real da fumaça | Hero em `/`; `?variant=flow|helix|pulse` | review | Três movimentos radicalmente distintos com advecção vertical de forma, cor e partículas; seletor temporário/teclado validado em desktop/mobile; decisão pendente |
| S-20260828-052 | HEAL-00 | Densificar fumaça e emissão cromática | Shader da Hero A/B/C | review | Pluma larga em cinco camadas, textura turbulenta, pulsos orgânicos sem placas, dez cores mais vivas nascendo na brasa e subindo; lint, 15/15 Vitest, build e E2E focado 4/4 aprovados |
| S-20260828-053 | HEAL-00 | Criar frente cromática ascendente | Shader da Hero A/B/C | review | Entrada cinza, três filamentos coloridos emitidos na brasa, máscara de altura deformada por ruído e reveal fracionário entre as dez cores; estágios 1/4/10 inspecionados; lint, 15/15 Vitest, build e E2E 4/4 aprovados |
| S-20260828-054 | HEAL-00 | Corrigir cor geométrica e combustão estática | Shader + ponta da vareta na Hero | review | Funções de ribbon removidas; cromia confinada à densidade/FBM da fumaça; brasa, calor e três microfaíscas animados com pause/reduced-motion; estágio 4 e 10 inspecionados; lint, 15/15 Vitest, build e E2E 8/8 aprovados |
| S-20260828-055 | HEAL-00 | Refinar escala e definição da vareta | Asset + composição da Hero somente | review | Vareta V7 PNG RGBA 1080×1920, largura útil reduzida de 202 para 108 px, matte removido e ponta realinhada; progressão 1→10 medida no navegador; lint, 15/15 Vitest, build e E2E 8/8 aprovados |
| S-20260828-056 | HEAL-00 | Manter as dez cores em movimento após a introdução | Relógio do shader da Hero A/B/C | review | `u_time` da Paper corrigido de `×0.00042` para `×0.42`; Fluxo/Hélice/Pulsos continuam transportando cromia após `colorCount=10`; prova temporal visual nas três variantes, lint, 15/15 Vitest, build e E2E 8/8 aprovados |
| S-20260828-057 | HEAL-00 | Desacelerar a subida da fumaça em 50% | Relógio comum da Hero A/B/C | review | Escala artística do shader reduzida de `0.42` para `0.21`; geometria, progressão 1→10 e circulação contínua preservadas; Fluxo inspecionado temporalmente; lint, 15/15 Vitest, build e E2E 8/8 aprovados |
| S-20260828-058 | HEAL-00 | Desacelerar novamente a fumaça em 50% | Relógio comum da Hero A/B/C | review | Escala artística reduzida de `0.21` para `0.105`, equivalente a 25% da primeira versão móvel; Hélice inspecionada sem erros; lint, 15/15 Vitest e build aprovados |
| S-20260828-059 | HEAL-00 | Unificar origem da fumaça e combustão em todos os responsivos | Hero Paper + vareta + CSS da combustão | review | Âncora única passou a controlar shader, brasa, halo, calor e faíscas; offset anterior de 5,95 px removido; teste 320×700, 390×844, 768×1024, 1024×768, 1440×900 e 1920×1080; lint, 15/15 Vitest, build e E2E focado 9 PASS/3 skips intencionais |
| S-20260828-060 | HEAL-00 | Restaurar a presença precoce das cores sem perder o alinhamento | Curva cromática da Hero A/B/C | review | Front cromático migrou para curva ease-out controlada por uniform: estágio 1 continua cinza, estágio 2 já emite amarelo pela brasa e estágio 10 mantém as dez cores vivas; alinhamento preservado; lint, 17/17 Vitest, build e E2E focado 9 PASS/3 skips intencionais |
| S-20260828-061 | HEAL-00 | Limpar elementos estranhos e textos redundantes da Hero | Primeiro viewport somente | review | Glyph marrom removido inclusive dos fallbacks; removidos `COREOGRAFIA DO AR · 01`, frase/etapas e bloco HEALS/Estreia/Repertório; área visual ficou apenas com incenso, brasa e fumaça; lint, 17/17 Vitest, build e E2E responsivo 9 PASS/3 skips intencionais |

## Metadados operacionais das sessões

O runtime registrou a data, mas não preservou horários de spawn/finalização exportáveis. Por isso, `horário não capturado` é dado explícito, não horário estimado. Todos os subagentes trabalharam no workspace compartilhado disponibilizado pela plataforma; writers receberam write scope/no-touch e o coordenador fez a integração em `main`, mas não houve branch/worktree individual retroativa.

| Session | Início | Fim | Branch/worktree | Erros relevantes |
|---|---|---|---|---|
| S-20260828-001 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; root, `site/` | scaffold no root colidiu com arquivo existente; recuperado em `site/` |
| S-20260828-002 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; read-only | nenhum reportado |
| S-20260828-003 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhum reportado |
| S-20260828-004 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | claims terapêuticos delimitados |
| S-20260828-005 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhum reportado |
| S-20260828-006 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhum reportado |
| S-20260828-007 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhum reportado |
| S-20260828-008 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | header `X-Robots-Tag` não emitido pelo Vinext dev; falsa garantia revertida |
| S-20260828-009 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; root | nenhum reportado no checkpoint |
| S-20260828-010 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; código delimitado | findings UX integrados posteriormente pelo root |
| S-20260828-011 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; motion | nenhum final reportado |
| S-20260828-012 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; Three | mismatch de hidratação corrigido pelo root |
| S-20260828-013 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhum reportado |
| S-20260828-014 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; review | 14 findings entregues; remediação pelo root |
| S-20260828-015 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; UI primitives | inventário obrigatório incompleto, reaberto por HEAL22 e completado pelo root |
| S-20260828-016 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; read-only | overflow PDP e hydration encontrados; root corrigiu |
| S-20260828-017 | 2026-08-28, horário não capturado | 2026-08-28 | ImageGen isolado | asset fonte grande; movido para evidência e OG otimizado |
| S-20260828-018 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; read-only | headers/backend/LGPD abertos como gates |
| S-20260828-019 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhum reportado |
| S-20260828-020 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; review | findings P2/P3 remediados pelo root |
| S-20260828-021 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; performance | Lighthouse gerou JSON, mas CLI saiu 1 por EPERM ao limpar temporário |
| S-20260828-022 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | bypass UI/adapter identificado e documentado |
| S-20260828-023 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhum reportado |
| S-20260828-024 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; root | probes pré-hidratação e duas asserções E2E frágeis corrigidos |
| S-20260828-025 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; QA read-only | 26/28 em paralelo; root configurou 1 worker e obteve 48/48 |
| S-20260828-026 | 2026-08-28, horário não capturado | 2026-08-28 | commit `b5ec182`; read-only | review retornou `changes_requested` com quatro findings internos |
| S-20260828-027 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; root | limpeza recursiva dos outputs foi rejeitada pela política de segurança; prova usou builds repetidos. Audit inicial no root falhou sem lockfile e agregação smoke usou `$home` protegido; reruns corretos em `site/`/`$healHtml` passaram |
| S-20260828-028 | 2026-08-28, horário não capturado | 2026-08-28 | `6b77c52`; read-only | nenhum blocker local; H22-005 documental enviado ao root |
| S-20260828-029 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhuma vencedora escolhida |
| S-20260828-030 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhuma animação implementada nesta sessão |
| S-20260828-031 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | sem amostra, dieline ou teste físico; conceitos mantidos como `[A VALIDAR]` |
| S-20260828-032 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; review read-only | nenhum teste automatizado executado pelo agente |
| S-20260828-033 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; root | primeira E2E teve 48/52 porque o naming removeu `Intervalo` da busca; corrigido para `[nome] — Incenso HEALS`, teste focado 4/4 e rerun completo 52/52. Social card legado ainda requer substituição antes de origem pública |
| S-20260828-034 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | sem produto, fórmula, medidas ou enquadramento regulatório; todos os campos materiais permaneceram `[A VALIDAR]` |
| S-20260828-035 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; research/docs | concorrentes não exibem todas as faces; declarações próprias foram separadas de observação e inferência |
| S-20260828-036 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhuma animação ou mudança visual implementada na loja |
| S-20260828-037 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; root + ImageGen | imagens podem conter microtexto gerado; copy autoritativa ficou separada na arquitetura documental |
| S-20260828-038 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhum código alterado pelo agente |
| S-20260828-039 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhum código alterado pelo agente |
| S-20260828-040 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhum código alterado pelo agente |
| S-20260828-041 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; docs scope | nenhum schema/feed comercial liberado sem dados reais |
| S-20260828-042 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; QA docs | matriz virou critério da implementação e dos reruns do root |
| S-20260828-043 | 2026-08-28, horário não capturado | 2026-08-28 | ImageGen isolado | hero conceitual não prova fabricação artesanal; alt corrigido para não afirmar isso |
| S-20260828-044 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; brand docs | semiótica cultural separada da identidade comercial e das promessas de produto |
| S-20260828-045 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; root + ImageGen | primeiro E2E encontrou hidratação, contraste e região rolável; todos remediados |
| S-20260828-046 | 2026-08-28, horário não capturado | 2026-08-28 | shared workspace; review + root | revisor encontrou 4 blockers; segunda leitura confirmou 4/4 PASS após correções |
| S-20260828-047 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; root; research/docs only | nenhuma seção ou dependência alterada; bibliotecas concorrentes mantidas fora da stack |
| S-20260828-048 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; root + ImageGen + Paper Shaders | a primeira imagem veio com checkerboard rasterizado; alpha foi extraído, o recorte foi fechado e a integração E2E migrou do contrato Three para o novo fallback Paper |
| S-20260828-049 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; root + ImageGen + Paper Shaders | o gerador voltou a rasterizar checkerboard; alpha foi reconstruído, o asset final foi normalizado para 1080×1920 e o posicionamento foi corrigido por QA desktop/mobile |
| S-20260828-050 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; root + Paper Shaders + Anime.js | primeira tentativa referenciou `root` fora do efeito e abriu overlay de runtime; referência corrigida imediatamente e o rerun confirmou `data-state=ready` e `data-color-count=10` |
| S-20260828-051 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; protótipo descartável junto à Hero | variante de pulsos inicialmente criou bandas duras; transporte por `fract` foi trocado por onda contínua e o recorte móvel foi revalidado |
| S-20260828-052 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; shader Paper/Anime da Hero | primeiro aumento saturou a densidade e formou blocos horizontais no pulso; composição, envelope e textura foram corrigidos antes da validação final |
| S-20260828-053 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; shader Paper/Anime da Hero | aplicação global de cor foi substituída por frente ascendente com feather irregular; interpolação entre contagens evita a entrada abrupta de novos slots |
| S-20260828-054 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; shader Paper/Anime + CSS da combustão | o rabisco explicativo foi interpretado incorretamente como linhas visuais; não há seam automatizado honesto para aparência volumétrica, então o repro e o aceite foram feitos por inspeção temporal do navegador; gates funcionais e reduced-motion passaram |
| S-20260828-055 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; Hero + ImageGen embutido | duas extrações do ImageGen retornaram RGB sem alpha; o alpha real, desmatte e alinhamento vertical foram reconstruídos mecanicamente antes da integração; nenhuma seção posterior foi alterada |
| S-20260828-056 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; shader Paper/Anime da Hero | causa raiz: Paper já converte `currentFrame` para segundos antes de preencher `u_time`, mas o shader reaplicava conversão de milissegundos e ficava aproximadamente 1000× mais lento; nenhum log/debug temporário permaneceu |
| S-20260828-057 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; relógio do shader Paper da Hero | ajuste global deliberado de 50%, portanto as três variantes permanecem sincronizadas no mesmo ritmo contemplativo sem reabrir a implementação cromática |
| S-20260828-058 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; relógio do shader Paper da Hero | segundo ajuste global deliberado de 50%; nenhuma mudança em geometria, paleta, duração da revelação ou assets |
| S-20260828-059 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; Hero Paper/Anime + Playwright responsivo | causa raiz: shader media o topo da imagem enquanto núcleo, halo, calor e faíscas usavam quatro offsets próprios; regressão automatizada falhou antes da correção e passou após a âncora comum; rerun inicial pós-patch usou build antigo e foi repetido após rebuild |
| S-20260828-060 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; shader Paper/Anime da Hero | causa raiz: o front usava `smoothstep` diretamente sobre a introdução e permanecia quase todo junto à brasa nos primeiros níveis; a curva foi antecipada sem alterar paleta, duração 1→10, circulação contínua ou âncora; teste unitário cobre início, nível 3, fim e monotonicidade |
| S-20260828-061 | 2026-08-28, horário não capturado | 2026-08-28 | `main`; Header + Hero | o traço do print era o `AirGlyph` de fallback, visualmente desconectado da fumaça; componente e CSS mortos foram removidos, e o E2E de reduced-motion passou a exigir vareta visível e zero SVG dentro da cena |
