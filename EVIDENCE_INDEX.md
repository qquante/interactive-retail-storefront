# HEAL — Índice de Evidências

Atualizado em: 2026-08-28

| Evidência | Estado | Local/fonte |
|---|---|---|
| Scaffold Sites/Vinext | real/local | `site/` |
| Auditoria de dependências | real, 2026-08-28 | `npm audit --omit=dev --json`: 0 vulnerabilidades |
| Handoff HEAL-01 | research-only | incorporado em `docs/architecture/ADR-001-storefront-commerce.md` |
| Commerce | fixture ainda não implementada | nenhuma conta, token ou pagamento conectado |
| Benchmarks de mercado | research, 2026-08-28 | `docs/research/2026-08-28-market-benchmarks.md` |
| Estratégia de marca e claims | docs/hipótese | `docs/brand/` |
| Sitemap, fluxos e wireframes | docs/UX | `docs/ux/` |
| Contrato de motion/3D | research | `docs/research/2026-08-28-technology-motion-3d.md` |
| Conteúdo e lacunas | docs/fixture | `docs/content/` |
| Três direções e contrato visual | docs/spec | `docs/design/VISUAL_DIRECTIONS.md`, `docs/design/VISUAL_CONTRACT.md` |
| Commerce Brasil e contrato | docs/research/spec | `docs/research/2026-08-28-commerce-brazil.md`, `docs/commerce/COMMERCE_CONTRACT.md` |
| SEO técnico 2026 | docs/research/spec | `docs/research/2026-08-28-seo-2026.md`, `docs/seo/TECHNICAL_SEO_SPEC.md` |
| Asset editorial demonstrativo | AI-generated, rotulado | `docs/assets/PROVENANCE.md`, `site/public/images/heal-ritual-demo.*` |
| Home desktop 1440 | browser screenshot | `docs/evidence/screenshots/home-desktop-1440.png` |
| Home mobile 390 | browser screenshot | `docs/evidence/screenshots/home-mobile-390-v2.png` |

| Evidence | Task | Tipo | Caminho/resultado | Estado |
|---|---|---|---|---|
| E-0001 | HEAL-T000 | scaffold | `site/` criado por `@openai/create-sites@0.2.0`; add-ons: none | verified |
| E-0002 | HEAL-T000 | manifest | `site/package.json` e `site/.openai/hosting.json` inspecionados | verified |
| E-0003 | HEAL-T000 | limitation | Scaffold no root falhou porque o prompt já existia; recuperado criando `site/` sem mover/apagar o arquivo | verified |
| E-0004 | HEAL-T001 | agent | `/root/heal_01_recon` concluiu handoff; ADR-001 registrada | verified |
| E-0005 | HEAL-T000 | security | `npm audit --omit=dev --json` | verified: 0 vulnerabilidades |
| E-0006 | HEAL-T000 | compatibility | `vinext check` | verified: 90%; `next/font/google` removido na Home |
| E-0007 | HEAL-T007 | browser | Home renderizada em 1440 e 390 px | verified visual; 390 px sem overflow |
| E-0008 | HEAL-T007 | asset | ImageGen + derivados AVIF/WebP com provenance | demonstration-only |

Não registrar como evidência:

- afirmação sem output;
- screenshot não inspecionado;
- teste que não terminou;
- relatório de subagente não verificado pelo coordenador;
- fixture como prova de produção.
