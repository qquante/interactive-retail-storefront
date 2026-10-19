# HEAL-37 — handoff de QA da Coreografia do Ar

Data: 2026-08-28  
Owner: HEAL-37  
Status: `CONCLUÍDO — MATRIZ E REVIEW READ-ONLY; NENHUM GATE NOVO EXECUTADO`

## Entrega

- `docs/implementation/COREOGRAFIA_QA_TEST_MATRIX.md`

## Escopo coberto

- matriz responsiva `320–1920`, incluindo landscape;
- teclado, foco, leitores de tela e zoom;
- reduced motion/data, saveData e forced colors;
- sem JS, sem WebGL2, context loss/restored e cleanup;
- hidratação, troca rápida e concorrência;
- CLS, LCP, INP, bundles, GPU e assets;
- continuidade Home → Mapa → PLP → PDP → cart;
- commerce, noindex/robots e futuro switch de produção;
- escala de aproximadamente 50 aromas com cinco destaques;
- símbolo próprio, vareta áspera/realista e fumaça vertical;
- storytelling seção a seção e atenção ética sem dark patterns/subliminar;
- testes unitários, integration e E2E exatos a criar/atualizar.

## Findings estáticos prioritários

1. P1: specs Anime e Three propõem duas fontes de verdade e tipos diferentes; consolidar antes do runtime.
2. P1: `coreografia-family.png` tem `2.466.846 bytes`, está no `src` da imagem principal com prioridade alta; WebP de `182.086 bytes` existe mas não é usado. O hard gate do visual é `250 KiB`.
3. P1: Home atual lista cinco aromas, mas ainda não oferece o seletor semântico previsto.
4. P2: teste reduced-motion procura CTA `Explorar incensos`; árvore atual usa `Conhecer os incensos`.
5. P1/P0 de release: remover `Demonstração` do front não pode fazer dados fictícios parecerem operação real. Com fixture, desabilitar transação ou manter aviso factual/noindex; com loja real, exigir dados e checkout autoritativos.
6. Snapshot concorrente: `AirMap` ainda apontava para handles sem rota fixture, dependia de swipe no mobile, usava tokens tipográficos não definidos e não modelava terminal/pattern; copy cultural requer provenance/revisão de interpretação.

## Evidência e limites

- Auditoria baseada em código, configs, testes e relatórios existentes.
- Nenhum arquivo em `site/` ou `.openai/hosting.json` foi alterado.
- Nenhuma suíte foi executada porque a árvore compartilhada estava sendo modificada por outros owners.
- Os 12 Vitest/52 Playwright/axe verdes citados na matriz são evidência histórica do release anterior, não desta árvore.
- Realismo de vareta, ausência de leitura subliminar, reconhecimento dos símbolos, leitores de tela físicos e performance GPU exigem validação humana/device; não foram marcados como PASS.

## Próximo gate recomendado

Resolver a fonte de verdade e o raster principal antes de implementar animações. Em seguida, executar F0 estático com presets/glyphs e seus unit tests; só depois ligar Anime/Three e a matriz de fallbacks.
