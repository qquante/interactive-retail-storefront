# HEAL-34 — handoff Anime.js / Coreografia do Ar

Data: 2026-08-28  
Owner: HEAL-34  
Status: `CONCLUÍDO — AUDITORIA E ESPECIFICAÇÃO; SITE NÃO EDITADO`

## Entrega

- `docs/implementation/COREOGRAFIA_ANIME_IMPLEMENTATION_SPEC.md`

## Evidência auditada

- `site/package.json` e `site/package-lock.json`: Anime.js declarado em `^4.5.0` e resolvido em `4.5.0`.
- `site/components/motion/*`: `EditorialSeamReveal`, `EmberCartFeedback`, módulo CSS e exports.
- `site/app/page.tsx` e `site/app/globals.css`.
- `site/components/three/EmberSmokeScene.tsx` e estilos.
- `site/components/commerce/AddToCartForm.tsx`, `ProductCard.tsx`, `ProductPlaceholder.tsx` e estilos.
- páginas de coleção e PDP.
- testes unitários de UI e E2E da storefront.
- `docs/concepts/COREOGRAFIA_DO_AR_SYSTEM.md`.
- `docs/design/MOTION_BIBLE.md`.
- exports e tipos locais instalados do Anime.js 4.5.0 para `createScope`, `createTimeline`, `createDrawable`, `createLayout`, `onScroll` e `waapi.animate`.

## Constatações críticas

1. A Motion Bible está desatualizada: declara os dois componentes Anime como não integrados, mas Home e AddToCart já os usam.
2. O lifecycle atual é uma boa base: scope local, cleanup, SVG fallback, gates de motion/data e dispose Three já existem.
3. A camada visual ainda não representa os cinco HEALS: Hero, cards e PDP usam assinaturas abstratas/genéricas.
4. Não há teste unitário específico de motion; o E2E reduced-motion valida apenas o fallback da cena Three.
5. `createLayout()` não deve ser aplicado agora aos filtros da coleção: eles fazem navegação server por GET. A especificação limita a API a uma futura ordenação client com ordem DOM real.

## Recomendação de execução

Começar por F0/F1 da especificação: contrato único de variantes, cinco glyphs estáticos, `useMotionPolicy` e Hero SVG/Anime. Só depois integrar Mapa do Ar, continuidade por scroll e Three por variante. Isso permite avaliar a identidade sem misturar o resultado com custo 3D.

## Limites

- Nenhum arquivo em `site/` foi alterado.
- `.openai/hosting.json` não foi lido nem alterado.
- Nenhum resultado de browser, performance ou build novo é alegado por este handoff.
- Thresholds exatos do `onScroll()` devem ser confirmados no PoC contra Anime.js 4.5.0 antes do merge; a API e o método `link()` existem nos tipos locais, mas o comportamento da expressão de threshold precisa de teste de runtime.
