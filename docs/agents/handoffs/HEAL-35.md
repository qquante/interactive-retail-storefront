# Handoff HEAL-35 — Three.js / Organismo do Ar

Data: 2026-08-28  
Estado real: `docs/spec; auditado contra runtime atual; não implementado; não validado em GPU real`

## Resultado

Foi definida a implementação da direção escolhida **Coreografia do ar** para substituir a fumaça genérica atual por um organismo determinístico com cinco rastros: CANELA, LAVANDA CELESTIAL, MIRRA, OLÍBANO e ALECRIM.

Documento principal:

- `docs/implementation/COREOGRAFIA_THREE_IMPLEMENTATION_SPEC.md`

## Decisão principal

- Three.js entra apenas na Home no primeiro rollout.
- Coleção continua em SVG/Anime.js.
- PDP começa em 2.5D; Three é challenger condicionado a produto/embalagem reais e A/B.
- Canvas é decorativo; escolha e todos os estados relevantes ficam em HTML.
- A coreografia é finita e render-on-demand. Não há fumaça aleatória em loop.
- Pointer só no tier high, mouse fino, `±2°`, sem scroll parallax.
- Reduced motion/data/saveData, WebGL loss e GPU lenta preservam glyphs SVG e todo o fluxo comercial.

## Evidência atual relevante

- O runtime existente já tem lazy import, WebGL2, tiers, observers, visibility, fallbacks e dispose adequados como base.
- Seu chunk atual mede `125,18 KiB gzip` estimado: passa o máximo de 130 KiB, mas falha o alvo de 100 KiB.
- O mobile Lighthouse local foi 79/LCP 4,1 s, sem compressão e sem GPU ativa; não aprova nem mede corretamente WebGL.
- Não existem trace GPU físico, RUM/CrUX ou validação do Organismo do Ar.

## Arquivos alterados

- `docs/implementation/COREOGRAFIA_THREE_IMPLEMENTATION_SPEC.md`
- `docs/agents/handoffs/HEAL-35.md`

Nenhum arquivo em `site/` ou `.openai/hosting.json` foi alterado.

## Validação executada

- Leitura completa do runtime Three atual e dos contratos de motion/performance.
- Verificação textual de escopo, APIs, budgets, testes e deltas incluídos.
- `git diff --check` deve ser executado pelo coordenador após integrar escritas paralelas.

Não foram executados build, testes de app ou browser porque esta entrega é somente documentação e não altera runtime.

## Próximo owner

Frontend Experience/Design System:

1. implementar primeiro `air-presets.ts` + `AirGlyph` e aprovar os seis glyphs em uma cor;
2. integrar seletor semântico e fallback antes de tocar no runtime GPU;
3. implementar o novo runtime atrás de flag local `base|air`;
4. Performance/QA executa bundle gate, context-loss, 20 navegações, 50 trocas e trace físico;
5. remover o runtime legado apenas após paridade e gates verdes.

## Blockers

- glyphs/cor ainda não aprovados;
- catálogo real e verdade material ausentes;
- device lab e preview comprimido ausentes;
- PDP Three bloqueada por dieline/modelo/textura reais e teste comparativo.
