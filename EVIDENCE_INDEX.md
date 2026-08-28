# HEAL — Índice de Evidências

Atualizado em: 2026-08-28

| Evidência | Estado | Local/fonte |
|---|---|---|
| Scaffold Sites/Vinext | real/local | `site/` |
| Auditoria de dependências | real, 2026-08-28 | `npm audit --omit=dev --json`: 0 vulnerabilidades |
| Handoff HEAL-01 | research-only | incorporado em `docs/architecture/ADR-001-storefront-commerce.md` |
| Commerce | fixture local implementada | catálogo/PDP/sacola/frete/handoff; nenhuma conta, token, pedido ou pagamento conectado |
| Benchmarks de mercado | research, 2026-08-28 | `docs/research/2026-08-28-market-benchmarks.md` |
| Estratégia de marca e claims | docs/hipótese | `docs/brand/` |
| Sitemap, fluxos e wireframes | docs/UX | `docs/ux/` |
| Contrato de motion/3D | research | `docs/research/2026-08-28-technology-motion-3d.md` |
| Conteúdo e lacunas | docs/fixture | `docs/content/` |
| Três direções e contrato visual | docs/spec | `docs/design/VISUAL_DIRECTIONS.md`, `docs/design/VISUAL_CONTRACT.md` |
| Commerce Brasil e contrato | docs/research/spec | `docs/research/2026-08-28-commerce-brazil.md`, `docs/commerce/COMMERCE_CONTRACT.md` |
| SEO técnico 2026 | docs/research/spec | `docs/research/2026-08-28-seo-2026.md`, `docs/seo/TECHNICAL_SEO_SPEC.md` |
| Asset editorial demonstrativo | AI-generated, rotulado e fora do deploy | `docs/assets/PROVENANCE.md`, `docs/evidence/assets/heal-ritual-demo.*` |
| Home desktop 1440 | browser screenshot | `docs/evidence/screenshots/home-desktop-1440.png` |
| Home mobile 390 | browser screenshot | `docs/evidence/screenshots/home-mobile-390-v2.png` |
| Home final desktop 1440 | browser screenshot | `docs/evidence/screenshots/home-final-desktop-1440.png` |
| Home final mobile 390 | browser screenshot | `docs/evidence/screenshots/home-final-mobile-390.png` |
| Checkout fixture | browser screenshot | `docs/evidence/screenshots/checkout-fixture-handoff.png` |
| Lighthouse mobile/desktop | lab local | `docs/evidence/performance/`; mobile 79, desktop 99; sem field data |
| Axe pós-correção | real/local | `npm run test:a11y`: 3 rotas, 0 violations |
| Testes unitários/integração | real/local | `npm run test`: 12 testes passados, incluindo 5 interações de design system e robots |
| Playwright cross-browser | real/local | `npm run test:e2e`: 52/52 em Chromium mobile/desktop, Firefox e WebKit; 1 worker determinístico |
| Design system obrigatório | real/local | Dialog, drawer, accordion, tabs e toast em `site/components/ui/`; testes em `ui-interactions.test.tsx` |
| Warning CSS Vinext | real/local | `docs/qa/BUILD_DETERMINISM.md`; dois builds, hashes CSS estáveis e cópias idênticas |
| Handoffs e sessões | governança real | `docs/agents/handoffs/`, `docs/agents/sessions/` e `SESSIONS.md`; horários ausentes explicitamente não inventados |
| Release candidate remediado | Git/local | `70be2a6c92754339a9c90e1e987965a62243d0d2`; 12/12 Vitest, 52/52 E2E, build/smoke/audits verdes |
| Release review independente | read-only | HEAL-22 revisou `6b77c52`; `approved` para fixture local, HOLD preview, NO-GO produção |

| Evidence | Task | Tipo | Caminho/resultado | Estado |
|---|---|---|---|---|
| E-0001 | HEAL-T000 | scaffold | `site/` criado por `@openai/create-sites@0.2.0`; add-ons: none | verified |
| E-0002 | HEAL-T000 | manifest | `site/package.json` e `site/.openai/hosting.json` inspecionados | verified |
| E-0003 | HEAL-T000 | limitation | Scaffold no root falhou porque o prompt já existia; recuperado criando `site/` sem mover/apagar o arquivo | verified |
| E-0004 | HEAL-T001 | agent | `/root/heal_01_recon` concluiu handoff; ADR-001 registrada | verified |
| E-0005 | HEAL-T000 | security | `npm audit --omit=dev --json` | verified: 0 vulnerabilidades |
| E-0006 | HEAL-T000 | compatibility | `npx vinext check` | verified: 100%; 17 páginas, 0 partial/issues |
| E-0007 | HEAL-T007 | browser | Home renderizada em 1440 e 390 px | verified visual; 390 px sem overflow |
| E-0008 | HEAL-T007 | asset | ImageGen + derivados AVIF/WebP com provenance | demonstration-only |
| E-0009 | HEAL-T008 | commerce | Home → coleção/PDP → sacola → frete → handoff sem pagamento | verified fixture |
| E-0010 | HEAL-T010/T011 | runtime | Anime.js semântico + Three lazy/tiers/fallback/cleanup | verified local |
| E-0011 | HEAL-T012 | responsive | PDP com overflow 0 em 10 viewports após correção | verified browser |
| E-0012 | HEAL-T017 | a11y | `npm run test:a11y` | verified: 0 violations em 3 rotas |
| E-0013 | HEAL-T018 | performance | Lighthouse lab | mobile 79; desktop 99; production gate open |
| E-0014 | HEAL-T019 | security | audit + threat/LGPD review | 0 vulnerabilidades npm; NO-GO produção |
| E-0015 | HEAL-T021/T023 | tests | Vitest + Playwright/axe | verified: 12/12 Vitest, 52/52 E2E, axe 0 violações |
| E-0016 | HEAL-T015/T016 | SEO | noindex/robots/metadata + research oficial 2026 | verified fixture; domain/schema/feed blocked |
| E-0017 | HEAL-T009 | design system | 5 testes jsdom de overlays/disclosure/tabs/toast | verified local; adoção nas rotas é incremental |
| E-0018 | HEAL-T021/T023 | build | dois manifests CSS SHA-256 idênticos | warning Vinext comprovadamente estável no estado testado |
| E-0019 | G-007 | governance | handoffs HEAL-00…22/social e session metadata | consolidated; horários exatos não capturados |

Não registrar como evidência:

- afirmação sem output;
- screenshot não inspecionado;
- teste que não terminou;
- relatório de subagente não verificado pelo coordenador;
- fixture como prova de produção.
