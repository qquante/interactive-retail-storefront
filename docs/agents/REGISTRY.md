# HEAL — Agent Registry

Atualizado em: 2026-08-28

| Agent | Responsabilidade | Write scope | No-touch | Estado |
|---|---|---|---|---|
| HEAL-00 | Coordenação, governança e integração | Root docs + integração em `site/` | Mudanças alheias não verificadas | active |
| HEAL-01 | Reconhecimento/arquitetura | none (read-only) | Todo o workspace | active |
| HEAL-02 | Mercado/benchmarks | `docs/research/`, handoff próprio | `site/` | queued |
| HEAL-03 | Marca/marketing | `docs/brand/`, handoff próprio | `site/` | queued |
| HEAL-04 | Conteúdo/copy | `docs/content/`, handoff próprio | Commerce/infra | queued |
| HEAL-05 | UX research/IA | `docs/ux/`, handoff próprio | `site/` | queued |
| HEAL-06 | Frontend UX | `docs/ux/`, módulos UX designados | Three/commerce backend | queued |
| HEAL-07 | Visual design | `docs/ui/`, tokens/spec designados | Commerce/backend | queued |
| HEAL-08 | Frontend core | Rotas/componentes designados | Three/commerce secrets | queued |
| HEAL-09 | Design system | Tokens/primitives designados | Rotas/commerce | queued |
| HEAL-10 | Anime.js | Módulos motion designados | Commerce/backend | queued |
| HEAL-11 | Three.js | Módulo 3D designado | Commerce/SEO content | queued |
| HEAL-12 | Mobile/responsive | CSS/componentes designados | Backend | queued |
| HEAL-13 | Commerce | Commerce contract/adapter designado | Visual/motion | queued |
| HEAL-14 | Backend/CMS | Adapters/schemas designados | Visual/motion | queued |
| HEAL-15 | SEO técnico | SEO/metadata/schema designados | Three/commerce mutation | queued |
| HEAL-16 | SEO conteúdo/Shopping/AI | `docs/seo/`, briefs | Infra/checkout | queued |
| HEAL-17 | Acessibilidade | Review/tests; fixes após dispatch | Commerce backend | queued |
| HEAL-18 | Performance | Budgets/instrumentação/tests | Conteúdo factual | queued |
| HEAL-19 | Segurança/LGPD | Review/config/docs | Visual direction | queued |
| HEAL-20 | Analytics/CRO | Measurement/events designados | Checkout financeiro | queued |
| HEAL-21 | QA | Tests/evidence | Produção/autoria funcional | queued |
| HEAL-22 | Release review | read-only | Todo código | queued |

## Regra de Sites

HEAL-00 é o único Site owner. Subagentes não podem inicializar Sites, editar `.openai/hosting.json`, chamar ferramentas de Sites, fazer deploy ou criar outro projeto.

