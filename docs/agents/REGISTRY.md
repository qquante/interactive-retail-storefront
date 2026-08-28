# HEAL — Agent Registry

Atualizado em: 2026-08-28

| Agent | Responsabilidade | Write scope | No-touch | Estado |
|---|---|---|---|---|
| HEAL-00 | Coordenação, governança e integração | Root docs + integração em `site/` | Mudanças alheias não verificadas | active |
| HEAL-01 | Reconhecimento/arquitetura | none (read-only) | Todo o workspace | done |
| HEAL-02 | Mercado/benchmarks | `docs/research/`, handoff próprio | `site/` | done |
| HEAL-03 | Marca/marketing | `docs/brand/`, handoff próprio | `site/` | done |
| HEAL-04 | Conteúdo/copy | `docs/content/`, handoff próprio | Commerce/infra | done |
| HEAL-05 | UX research/IA | `docs/ux/`, handoff próprio | `site/` | done |
| HEAL-06 | Frontend UX | `docs/ux/`, módulos UX designados | Three/commerce backend | done |
| HEAL-07 | Visual design | `docs/design/` | Commerce/backend | done |
| HEAL-08 | Frontend core | Rotas/componentes designados | Three/commerce secrets | done |
| HEAL-09 | Design system | Tokens/primitives designados | Rotas/commerce | done |
| HEAL-10 | Anime.js | Módulos motion designados | Commerce/backend | done |
| HEAL-11 | Three.js | Módulo 3D designado | Commerce/SEO content | done |
| HEAL-12 | Mobile/responsive | Review read-only | Backend | done |
| HEAL-13 | Commerce | Commerce contract/adapter designado | Visual/motion | done |
| HEAL-14 | Backend/CMS | `docs/architecture/` | Visual/motion | done |
| HEAL-15 | SEO técnico | `docs/research/`, `docs/seo/` | Three/commerce mutation | done |
| HEAL-16 | SEO conteúdo/Shopping/AI | `docs/seo/` | Infra/checkout | done |
| HEAL-17 | Acessibilidade | `docs/qa/ACCESSIBILITY_REVIEW.md` | Código/config | done |
| HEAL-18 | Performance | `docs/performance/`, evidências | Conteúdo factual | done |
| HEAL-19 | Segurança/LGPD | `docs/security/` | Código/config/visual | done |
| HEAL-20 | Analytics/CRO | `docs/analytics/` | Checkout financeiro | done |
| HEAL-21 | QA | `docs/qa/QA_RELEASE_MATRIX.md`, evidências próprias | Código/config/produção | done |
| HEAL-22 | Release review | read-only | Todo código | queued para re-review |
| HEAL-social | Social preview isolado | saída ImageGen fora do Site | Todo código/Sites/deploy | done |

## Regra de Sites

HEAL-00 é o único Site owner. Subagentes não podem inicializar Sites, editar `.openai/hosting.json`, chamar ferramentas de Sites, fazer deploy ou criar outro projeto.
