# Handoff HEAL-36 — SEO 2026, commerce e schema

Data: 2026-08-28  
Estado real: `audit/spec; site fixture e noindex; nenhuma propriedade externa conectada`

## Resultado

Foi auditada a migração dos três fixtures `Intervalo` para cinco produtos HEALS e a escala futura para cerca de 50 itens, cobrindo B2C, B2B, história de marca, símbolo HEAL, vareta real/áspera, fumaça narrativa e limites entre contexto cultural/espiritual e claims médicos.

Documento principal:

- `docs/implementation/COREOGRAFIA_SEO_COMMERCE_REVIEW.md`

## Decisões principais

- Brand schema/nome atual: `HEAL`; `HEALS` é linha verbal explicada como incensos.
- Cinco aromas são cinco produtos, não variantes de um único `ProductGroup`.
- Rotas candidatas: `/colecoes/incensos` e `/produtos/incenso-{aroma}`.
- Fixture continua `noindex`, sem Product/Offer/feed, mesmo após ganhar nomes e mockups.
- Conceitos ImageGen não são mídia documental nem elegíveis a Merchant.
- Contexto cultural só entra com fonte/atribuição/limite; não vira benefício do produto.
- Uma futura rota `/atacado` concentra B2B; não criar doorway por profissão/cidade.
- Atenção ética: zero urgência/estoque/review/recomendação psicológica fictícios.

## P0 destacados

1. implementar gate `SEO_INDEXABLE` + origin estrito;
2. criar cinco entidades/IDs/handles drafts no source of truth;
3. classificar claims e mídia por canal/proveniência;
4. corrigir peso/dimensões da imagem hero conceitual;
5. compartilhar snapshot entre UI/metadata/schema/feed;
6. manter canonical/sitemap/schema/feed bloqueados até dados e operação reais.

## Evidência atual

- `robots.txt` e `noindex` estão coerentes para fixture.
- Não há canonical, sitemap ou JSON-LD.
- Home usa `coreografia-family.png` 1672×941/2.466.846 bytes sem width/height, embora exista WebP 1600×900/182.086 bytes.
- Os cinco mockups individuais têm 1000×1000 e são conceitos, não produto real.
- Metadata social documentada diverge do runtime: `layout.tsx` atual não emite imagem/URL/siteName.
- `TECHNICAL_SEO_SPEC.md` ainda contém a marca histórica `HEAL. CURA.`; esta revisão usa a decisão atual `HEAL`.

## Arquivos alterados

- `docs/implementation/COREOGRAFIA_SEO_COMMERCE_REVIEW.md`
- `docs/agents/handoffs/HEAL-36.md`

Nenhum arquivo em `site/` ou `.openai/hosting.json` foi alterado.

## Validação

- auditoria read-only de metadata, robots, Home, coleção, PDP, busca, commerce DTO/fixture, testes SEO e assets atuais;
- dimensões verificadas por `ffprobe`; bytes por filesystem;
- fontes oficiais já verificadas em 2026-08-28 foram reutilizadas;
- `git diff --check -- docs/implementation/COREOGRAFIA_SEO_COMMERCE_REVIEW.md docs/agents/handoffs/HEAL-36.md`: exit 0.

Build/app tests não foram executados porque esta entrega é somente documentação e o site está sendo alterado por outros owners em paralelo.

## Próximos owners

- Commerce: source of truth, IDs/handles, field-level provenance, snapshots e drafts.
- Frontend/SEO: origin/index gate, metadata, canonical, breadcrumbs, JSON-LD e sitemap.
- Conteúdo/claims: descrições, cultura, marca, B2B, segurança e revisão regulatória.
- Mídia: produto real, rights/IPTC, alt e variantes responsivas.
- QA/Performance: crawl, HTML sem JS, schema, paridade feed/UI, LCP/CWV e ferramentas oficiais pós-deploy.

## Blockers

- domínio, empresa, catálogo, preço, estoque, checkout, políticas e mídia reais;
- claims/composição/método sensorial aprovados;
- Search Console, Merchant Center/Bing e dados de campo;
- decisão jurídica/regulatória final.
