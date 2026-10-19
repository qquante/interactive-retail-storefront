# HEAL — Especificação Three.js do Organismo do Ar

Data: 2026-08-28  
Owner: HEAL-35 · Three.js/WebGL/performance  
Estado: `INTEGRADO NO PROTÓTIPO LOCAL; NÃO VALIDADO EM GPU REAL OU DEVICE LAB`  
Direção: **B — Coreografia do ar / rota Signature**

## 0. Decisão executiva

### Atualização de implementação — 2026-08-28

As fatias locais essenciais foram integradas em `site/components/three/`, `site/components/experience/` e `site/lib/brand/air-variants.ts`: os cinco paths SVG alimentam também a geometria Three.js; há reveal/settle finito, seleção AirMap → hero, frame final sem autoplay na reentrada, pausa, versão estática, gates de movimento/dados/WebGL2, generation token e fallback após duas perdas de contexto. A suíte automatiza reduced motion, `saveData`, WebGL2 ausente, context loss, seleção e axe.

Continuam fora do aceite de produção: trace GPU em Android/iPhone reais, teste moderado de compreensão, RUM/CrUX, adaptação por p95 de frames e alvo aspiracional de chunk `<=100 KiB gzip`. O chunk dinâmico permanece abaixo do hard gate de `130 KiB gzip`, mas o build ainda avisa que o arquivo Three minificado ultrapassa 500 KiB raw. As seções de “runtime atual” e “delta” abaixo registram o snapshot anterior à implementação e devem ser lidas como histórico de decisão.

O `EmberSmokeScene` atual deve evoluir de uma fumaça genérica em loop para um **Organismo do Ar determinístico por variante**. A cena continua sendo progressive enhancement: HTML, texto, controles e os cinco glyphs SVG existem antes do JavaScript; Three.js apenas acrescenta volume e transição espacial.

O primeiro rollout é restrito à Home. Coleção permanece SVG/Anime.js e a PDP começa em 2.5D. Three.js na PDP é um challenger posterior, condicionado a embalagem/modelo reais, A/B de compreensão e budgets aprovados.

Princípios vinculantes:

1. o usuário escolhe por controles HTML; o canvas nunca é a interface;
2. cada variante termina exatamente no glyph estático correspondente;
3. a geometria define a identidade; cor e movimento são redundantes;
4. a animação principal é finita, acionada por entrada/seleção, não uma fumaça eterna;
5. sem postprocess, scroll parallax, drag obrigatório, `Raycaster` ou partículas explosivas;
6. a cena não descreve ingrediente, aroma, intensidade, fumaça ou efeito real;
7. carrinho e checkout permanecem sem Three.js.

## 1. Evidência auditada

### Runtime atual

- `site/components/three/EmberSmokeScene.tsx` já entrega SVG no HTML, import dinâmico, gate de WebGL2, `IntersectionObserver`, Page Visibility, preferências de movimento/dados, tratamento de context loss e cleanup.
- `site/components/three/createEmberSmokeRuntime.js` cria duas ou três fitas verticais deformadas pelas mesmas ondas senoidais, uma brasa e um bastão em planos.
- Os tiers atuais são `30/45/60 FPS`, DPR `1.15/1.5/1.75`, `2/3/3` ribbons e `28/38/48` segmentos.
- O canvas é decorativo (`aria-hidden`) e não recebe pointer, o que é uma base acessível correta.
- A Home atual contém apenas uma assinatura visual, sem seleção ou estado por SKU.

### Performance já medida

- O chunk opcional atual mede `504,42 KiB` minificado e `125,18 KiB` gzip estimado; respeita o hard gate de `130 KiB`, mas excede o alvo de `100 KiB`.
- A única execução Lighthouse mobile marcou 79 e LCP 4,1 s; foi em servidor local sem compressão e sem cobrir GPU/WebGL. Portanto não é prova de campo nem aprovação mobile.
- O caminho normal já foi reproduzido em Playwright como `high` no desktop e `low` no mobile; reduced motion e `saveData` evitaram o download do runtime.
- Não há trace Android com GPU ativa, RUM, CrUX ou INP de campo.

Fontes internas: `docs/concepts/COREOGRAFIA_DO_AR_SYSTEM.md`, `docs/concepts/EXPERIENCE_MOTION_LAB.md`, `docs/performance/PERFORMANCE_BUDGET.md` e `docs/performance/PERFORMANCE_REVIEW.md`.

## 2. Delta exato contra o runtime atual

| Área | Hoje | Implementação requerida |
|---|---|---|
| Identidade | uma fumaça genérica | cinco curvas determinísticas + glyph neutro |
| Forma | fita reta deformada por seno | centro de curva próprio por SKU, ribbon derivado da tangente/normal |
| Estado | `fallback/loading/ready` | estado técnico separado de `rest/tracing/selected/paused/reduced` |
| Movimento | loop contínuo enquanto visível | trace finito; render-on-demand no repouso; resposta curta ao pointer elegível |
| Seleção | inexistente | buttons/radiogroup HTML com nome + mini-glyph |
| API | `setActive`, `dispose` | variante, modo, pointer limitado, resize, stats e lifecycle explícitos |
| Fallback | uma fumaça SVG | glyph neutro + cinco glyphs SVG idênticos às curvas 3D |
| Qualidade | heurística inicial fixa | heurística inicial + downgrade unilateral por frame time |
| Entrada | import ao interceptar hero acima da dobra | SVG imediato; import após proximidade **e** janela ociosa/pós-carga; interação prioriza |
| Pointer | nenhum | apenas mouse fino + tier high; máximo `±2°`; sem captura do canvas |
| Observação | `data-state` e tier | motivo de fallback, tier, `renderer.info`, frame-time agregado em dev/test |
| PDP | não existe | permanece 2.5D no rollout; contrato Three opcional separado |

O que deve ser preservado: SSR do conteúdo/CTA, WebGL2 explícito, import dinâmico, `ResizeObserver`, visibilidade, preferências dinâmicas, context loss, dimensões reservadas, `dispose()` e `forceContextLoss()` ao desmontar.

## 3. Arquitetura proposta

```text
Home (Server Component)
└── HeroAirExperience (ilha client pequena)
    ├── texto e CTAs recebidos/renderizados como HTML
    ├── AirVariantSelector (HTML, sem dependência de WebGL)
    ├── AirGlyph (SVG autoritativo)
    └── AirOrganismScene (canvas decorativo, lazy)
        ├── ExperienceGate
        └── createAirOrganismRuntime (chunk Three)
            ├── AirPreset -> curva/rítmica determinística
            ├── RibbonGeometry
            ├── AirShader
            └── Lifecycle/telemetria local
```

Arquivos candidatos de implementação:

```text
site/components/experience/
  HeroAirExperience.tsx
  AirVariantSelector.tsx
  AirGlyph.tsx
  air-presets.ts
  experience-gate.ts
  HeroAirExperience.module.css
site/components/three/
  AirOrganismScene.tsx
  AirOrganismScene.module.css
  createAirOrganismRuntime.ts
```

Após migração e testes, remover `EmberSmokeScene.tsx`, `EmberSmokeScene.module.css` e `createEmberSmokeRuntime.js`; não manter dois runtimes concorrentes.

### Separação de responsabilidade

- `air-presets.ts`: dados serializáveis, sem importar Three ou Anime.js. É a única fonte de curvas, cadências, terminais e paths SVG.
- `AirGlyph.tsx`: transforma o preset em SVG estático e usa `currentColor`.
- `HeroAirExperience.tsx`: possui seleção, pausa e preferência local; texto/status acessível fica aqui.
- `AirOrganismScene.tsx`: decide elegibilidade, lazy load e lifecycle; permanece `aria-hidden`.
- `createAirOrganismRuntime.ts`: GPU apenas. Não consulta DOM externo, storage, rota ou analytics.
- Anime.js desenha glyph/seam em DOM; não escreve uniforms que o runtime também escreve.

## 4. Contratos públicos

```ts
export type AirVariantId =
  | 'neutral'
  | 'canela'
  | 'lavanda-celestial'
  | 'mirra'
  | 'olibano'
  | 'alecrim';

export type AirQualityTier = 'fallback' | 'low' | 'medium' | 'high';
export type AirNarrativeMode =
  | 'rest'
  | 'trace'
  | 'selected'
  | 'paused'
  | 'reduced';

export type AirFallbackReason =
  | 'system-motion'
  | 'local-motion'
  | 'reduced-data'
  | 'save-data'
  | 'no-webgl2'
  | 'context-lost'
  | 'runtime-error'
  | 'quality-downgrade';

export interface AirOrganismRuntime {
  setActive(active: boolean): void;
  setPaused(paused: boolean): void;
  setVariant(
    variant: AirVariantId,
    options?: { animate?: boolean; source?: 'initial' | 'user' | 'route' },
  ): void;
  setPointer(normalizedX: number, normalizedY: number): void;
  resize(width: number, height: number, devicePixelRatio: number): void;
  getStats(): {
    tier: Exclude<AirQualityTier, 'fallback'>;
    fpsTarget: number;
    frameTimeEmaMs: number;
    calls: number;
    triangles: number;
    geometries: number;
    textures: number;
  };
  dispose(options?: { loseContext?: boolean }): void;
}

export interface AirOrganismSceneProps {
  activeVariant: AirVariantId;
  paused: boolean;
  localMotion: 'full' | 'reduced';
  className?: string;
  onTechnicalStateChange?: (state: {
    state: 'fallback' | 'queued' | 'loading' | 'ready' | 'paused';
    tier: AirQualityTier;
    reason?: AirFallbackReason;
  }) => void;
}
```

`onTechnicalStateChange` não deve alimentar uma live region. O status GPU não é relevante para leitor de tela. O nome selecionado e sua descrição são atualizados pelo seletor HTML.

### Estado semântico da Home

```text
neutral/rest
  └─ escolha explícita ─> sku/trace ─> sku/selected
                              │
                              ├─ nova escolha: cancela trace e inicia o próximo
                              ├─ pausar: congela no frame final estável
                              └─ reduzir: desmonta WebGL e mantém SVG final
```

A última escolha vence. Nenhum callback de uma transição cancelada pode reverter label, glyph ou variante.

## 5. Presets: cinco rastros, um sistema

As coordenadas abaixo são **sementes normalizadas de arte**, não física da fumaça. Direção de arte pode refiná-las mantendo as invariantes. Origem em `(0, -1.60, 0)`; topo máximo `1.60`; largura máxima absoluta `0.72`.

| Variante | Pontos-base `[x,y,z]` | Cadência desktop/mobile | Invariante visual |
|---|---|---:|---|
| neutral | `[0,-1.60,0] [-.08,-.85,0] [.10,-.10,.02] [-.06,.68,0] [0,1.45,0]` | 720/420 ms | eixo calmo sem código de SKU |
| CANELA | `[0,-1.60,0] [-.10,-1.12,0] [.34,-.65,.03] [-.28,-.05,0] [.27,.55,-.02] [-.08,1.35,0]` | 720/420 ms | dois contragiros compactos |
| LAVANDA CELESTIAL | `[0,-1.60,0] [-.05,-1.00,0] [-.58,-.35,.03] [.52,.45,-.03] [.18,1.10,0] [.02,1.60,0]` | 900/520 ms | maior altura e vazio central; sem cosmos |
| MIRRA | `[0,-1.60,0] [.03,-1.08,0] [.42,-.58,.02] [-.38,-.18,-.02] [.33,.22,.02] [-.18,.72,0] [0,1.25,0]` | 780/460 ms | dobra interna mais densa e baixa |
| OLÍBANO | `[0,-1.60,0] [0,-1.10,0] [.32,-.72,.02] [-.30,-.25,-.02] [.31,.25,.02] [-.28,.76,-.02] [0,1.45,0]` | 840/480 ms | três retornos laterais regulares |
| ALECRIM | `[0,-1.60,0] [.14,-1.16,.01] [-.15,-.72,-.01] [.16,-.28,.01] [-.14,.18,-.01] [.13,.64,.01] [0,1.30,0]` | 680/400 ms | quatro inflexões estreitas |

Implementação:

- interpolar com `CatmullRomCurve3` em modo centrípeto ou função spline própria testável;
- amostrar a mesma curva para SVG e Three a partir do preset comum;
- construir pares de vértices pela normal 2D de cada tangente; não deslocar uma fita reta inteira com seno;
- contrarrastro usa a mesma família de curva com offset determinístico e largura menor;
- terminal e fonte são meshes simples separados, alinhados ao SVG;
- nunca usar `Math.random()` na criação ou em troca de variante;
- preset tem `seed` fixo apenas se irregularidade visual for necessária.

## 6. Geometria e shader

### Malhas da Home

1. `source`: um plane/quadrado arredondado ou disco sem textura;
2. `mainRibbon`: ribbon da curva-base;
3. `counterRibbon`: segunda ribbon deslocada, obrigatória nos tiers medium/high;
4. `veilRibbon`: terceira camada opcional apenas no high, derivada da mesma curva;
5. `terminal`: pequeno segmento/plane conforme preset;
6. `grains`: opcional, um `InstancedMesh` de até 12/18 unidades nos tiers medium/high, restrito à fonte.

Alvo normal: 4 draw calls low, 5 medium, 6 high; menos de 1.000 triângulos. Os limites conceituais de 10 draw calls/30k triângulos continuam como hard ceilings, não metas de uso.

### Vertex shader

Uniforms mínimos:

```glsl
uniform float uTime;
uniform float uReveal;       // 0..1, construção finita
uniform float uSettle;       // 0..1, reduz microdeslocamento ao final
uniform float uWidth;
uniform float uSeed;         // constante por preset
uniform vec2  uPointer;      // já limitado e amortecido
```

- a posição-base já contém a identidade do SKU;
- `uReveal` controla máscara longitudinal e pequeno avanço, nunca redesenha outra forma;
- irregularidade usa função determinística de baixa frequência e amplitude máxima de `1,5%` da largura do campo;
- pointer afeta orientação do grupo/câmera, não a curva nem `variantId`;
- ao final, `uSettle=1` leva a um frame estável coerente com o SVG.

### Fragment shader

Uniforms mínimos: `uColor`, `uOpacity`, `uReveal`, `uEdgeSoftness`, `uSeed`.

- feather lateral, entrada na fonte e dissolução terminal;
- no máximo uma estriação determinística sutil;
- sem noise texture, vídeo, framebuffer, bloom ou multipass;
- `discard` apenas após medição: transparência com discard agressivo pode custar em GPUs tile-based;
- brasa usa shader/plane próprio; nenhuma animação de pulsação contínua depois de `selected`.

### Transição entre variantes

Usar duas cópias temporárias de ribbon apenas durante o crossfade:

1. runtime captura o preset atual como `outgoing`;
2. cria/atualiza `incoming` no preset escolhido;
3. em 120–180 ms reduz outgoing; em seguida executa o trace na cadência do SKU;
4. descarta geometria outgoing ao terminar;
5. troca rápida reaproveita o estado visual atual como outgoing e cancela o token anterior.

Hard limit durante transição: 8 draw calls. Não fazer morph contínuo entre as cinco identidades no primeiro rollout.

## 7. Movimento e interação

### Sequência autoral

- Primeiro frame: neutral estático em SVG; texto e CTAs completos.
- Runtime elegível: substituição óptica sem mover layout; renderiza neutral uma vez.
- Primeira entrada: fonte aparece e neutral traça em até 720 ms, apenas uma vez por montagem.
- Escolha: nome e glyph HTML mudam imediatamente; canvas faz crossfade + trace específico.
- Confirmação: terminal aparece por 180–240 ms e a cena entra em repouso sem loop.
- Reentrada na viewport: renderiza o último frame; não repete autoplay.

### Pointer/parallax extremamente limitado

- somente `(pointer: fine) and (hover: hover)`, tier high e movimento completo;
- listeners ficam no contêiner do hero; canvas continua `pointer-events: none`;
- normalizar para `[-1,1]`, low-pass e limitar câmera/grupo a yaw `±2°`, pitch `±1°`;
- contrarrastro pode variar no máximo `±3%` de largura;
- ao sair, retorno amortecido em até 320 ms; depois o loop encerra;
- máximo de um update por animation frame; não registrar coordenadas;
- mobile/touch, reduced motion/data e preferência local: desativado;
- nenhum parallax ligado ao scroll. A costura hero→coleção é SVG/Anime.js e não move câmera.

### Controles

- radiogroup ou buttons de seleção com nome completo e mini-glyph; alvo mínimo 44 px;
- `Ver todos os incensos` aparece antes/ao lado da experiência;
- `Pausar efeitos` congela imediatamente em um estado reconhecível;
- `Reduzir efeitos` salva `heal:motion=reduced` localmente e desmonta WebGL;
- a preferência do sistema `reduce` sempre vence e não oferece override automático;
- nenhuma ação comercial depende do visual.

## 8. Gate e carregamento

### Elegibilidade acumulativa

Three só pode ser importado quando todas forem verdadeiras:

1. componente montado e a até 120 px da viewport;
2. aba visível;
3. `prefers-reduced-motion` não é `reduce`;
4. `prefers-reduced-data` não é `reduce`;
5. `navigator.connection.saveData !== true`;
6. preferência local não é `reduced`;
7. `canvas.getContext('webgl2', attributes)` retorna contexto;
8. não houve duas perdas de contexto nesta montagem.

Como o hero está acima da dobra, proximidade isolada não basta. O import normal entra em `requestIdleCallback` após `load`, com timeout máximo candidato de 1.500 ms. Se o usuário selecionar um SKU antes disso, a seleção HTML acontece imediatamente e o carregamento pode ganhar prioridade sem bloquear o handler.

`requestIdleCallback` exige fallback por `setTimeout(0)` após `load`; ambos são cancelados no unmount. Não usar preload do chunk Three.

### Estado de corrida

- um `generationToken` invalida imports/compiles/transições antigos;
- após `await import()` e `await compileAsync()`, conferir mounted, preferência, visibilidade e token novamente;
- se o contexto foi criado e o gate mudou, perdê-lo e não instanciar renderer;
- mudança para reduced/data-save durante loading cancela e mantém SVG;
- promessa já baixada pode permanecer no cache, mas nenhuma GPU é criada.

## 9. Quality tiers e adaptação

| Tier | DPR cap | FPS | ribbons | amostras/curva | grãos | antialias | pointer |
|---|---:|---:|---:|---:|---:|---|---|
| fallback | — | 0 | SVG | SVG | 0 | — | não |
| low | 1.0 | 30 | 2 | 24 | 0 | não | não |
| medium | 1.35 | 45 | 2 | 36 | até 12 | não | não |
| high | 1.75 | 60 | 3 | 48 | até 18 | sim | sim |

Seleção inicial continua heurística e conservadora:

- touch/mobile viewport, `deviceMemory <=4`, `hardwareConcurrency <=4` ou 2G → low;
- largura `<1280` ou `deviceMemory <=8` → medium;
- demais → high;
- APIs ausentes não contam como hardware forte.

Adaptação em runtime:

- medir EMA e p95 de 24 frames renderizados, nunca cada callback ocioso;
- se p95 exceder `1,35 × frame budget` em duas janelas consecutivas, descer um tier;
- se low continuar acima do budget em duas janelas, finalizar no frame estático e voltar ao SVG com motivo `quality-downgrade`;
- não subir tier durante a sessão; evita oscilação;
- aplicar mudança de DPR somente em resize/intervalo seguro;
- log detalhado apenas em desenvolvimento. Produção recebe contadores agregados e amostrados, se analytics for autorizado.

Render-on-demand:

- `setAnimationLoop()` ativo somente em trace, crossfade ou settle/pointer curto;
- ao chegar em `selected`, renderizar o último frame e chamar `setAnimationLoop(null)`;
- aba oculta, fora da viewport, paused ou fallback sempre usam `null`;
- resize estático agenda exatamente um render.

## 10. Lifecycle, falha e memória

### Observers/listeners

- `IntersectionObserver`: cria/ativa próximo da cena; pausa ao sair;
- `visibilitychange`: pausa imediatamente; não repete trace ao voltar;
- `ResizeObserver`: entrega dimensões ao runtime; não pertence ao runtime GPU;
- media queries e `connection.change`: desmontam quando redução passa a valer;
- `webglcontextlost`: `preventDefault`, pausa, preserva variante HTML e mostra SVG;
- `webglcontextrestored`: no máximo uma tentativa silenciosa; segunda perda fixa fallback até remount.

### Dispose obrigatório

1. `setAnimationLoop(null)` e cancelar token/timeline interna;
2. remover listeners e observers no owner correto;
3. remover meshes;
4. `dispose()` de todas as geometrias, materiais, texturas e targets existentes;
5. `renderer.renderLists.dispose()`;
6. `renderer.dispose()`;
7. `forceContextLoss()` apenas em unmount/desativação permanente, não dentro do handler de loss;
8. zerar referências e impedir setters após dispose.

Gate de vazamento: 20 ciclos Home↔PDP e 50 trocas rápidas de variante, sem crescimento monotônico de contextos, listeners, `renderer.info.memory.geometries` ou heap após estabilização/GC de teste.

## 11. Fallbacks equivalentes

| Condição | Visual | Conteúdo/ação |
|---|---|---|
| JS desligado | neutral grande + cinco mini-glyphs SVG | nomes, explicação, CTAs e links completos |
| reduced motion | glyph selecionado troca instantaneamente | mesmo label/dados; nenhum Three baixado |
| reduced data/saveData | igual ao reduced | sem Three e sem raster adicional |
| sem WebGL2 | SVG final | seletor continua funcional |
| context lost/erro | canvas some sem transição; SVG assume | escolha e CTA preservados |
| forced colors | `currentColor`, outline e nomes | nenhum significado por cor |
| GPU lenta | downgrade; depois SVG | mensagem técnica não interrompe usuário |
| JS carregando | SVG permanece opaco | seleção responde imediatamente |

O CSS não deve apagar o fallback: em `ready`, reduzir a opacidade do SVG somente depois do primeiro frame WebGL confirmado. A troca deve ser instantânea em reduced motion.

## 12. Mobile

- texto, CTAs e `Ver todos os incensos` precedem o visual no DOM;
- altura do organismo `min(62svh, 360px)`; dimensões reservadas evitam CLS;
- seletor tem lista/setas acessíveis e não exige swipe;
- uma variante anima por vez; troca rápida cancela a anterior;
- tier low é o default de touch; sem pointer, grãos, antialias ou terceiro ribbon;
- 30 FPS é teto, não obrigação; repouso é 0 FPS;
- canvas não captura gesto, scroll, pinch ou zoom;
- teste real mínimo: Android intermediário Chrome e iPhone Safari. Emulador não aprova energia, temperatura ou GPU.

## 13. PDP futura: contrato condicionado

A PDP do primeiro rollout usa caixa 2.5D. Só implementar `PackageInspectionScene` se todas forem verdadeiras:

- dieline, dimensões, abertura, acabamento e imagens/texturas estão aprovados;
- comparação moderada mostra ganho de compreensão contra 2.5D;
- Home passa os gates de GPU e bundle;
- carregamento só ocorre após ação `Abrir e ver`;
- controles HTML `Frente`, `Lateral`, `Abrir`, `Fechar`, `Macro` são completos;
- uma malha reutilizada recebe artwork por SKU; não criar cinco bundles;
- um contexto, até 12 draw calls, 45k triângulos e três texturas compactas;
- zero postprocess e drag opcional;
- ao navegar, dispose total.

Não reutilizar o contexto da Home entre rotas no primeiro ciclo. A complexidade de canvas persistente pertence à rota Cinematic, que não está autorizada.

## 14. Instrumentação

Eventos candidatos, sem PII e somente após contrato de analytics:

```text
hero_scene_eligible        { tier }
hero_scene_ready           { tier, compile_ms_bucket }
hero_scene_fallback        { reason }
air_variant_selected       { variant_id, source }
air_trace_completed        { variant_id, duration_bucket }
motion_preference          { system_reduce | local_reduce | full }
experience_paused          { route: home }
```

Não coletar pointer, scroll stream, GPU string bruta, texto livre, CEP, email ou identificador persistente. Frame time e memory stats são agregados por bucket e amostrados.

Em desenvolvimento, expor sob flag de debug:

```text
tier · fps target · EMA/p95 · calls · triangles · geometries · textures
```

Nunca renderizar painel de debug em produção por padrão.

## 15. Plano de implementação por fatias

### Fatia 1 — fonte comum SVG/Three

- criar `air-presets.ts` e os seis paths (neutral + cinco SKUs);
- construir `AirGlyph` e testes de snapshot/invariantes;
- verificar 16×28, 24×40, uma cor e forced colors;
- nenhum Three ainda.

### Fatia 2 — seletor semântico e fallback

- criar ilha de seleção com controls HTML;
- atualizar headline auxiliar para `[VARIANTE] — incenso HEALS`;
- troca instantânea e completa em no-WebGL/reduced;
- teste teclado, touch, leitor de tela e mudança rápida.

### Fatia 3 — runtime geométrico

- criar ribbon a partir dos presets;
- shader de reveal/settle e terminal;
- contrato `setVariant/setActive/setPaused/dispose`;
- substituir cena atual atrás de feature flag local `base|air` durante QA.

### Fatia 4 — gate, tiers e falhas

- idle/pós-load, adaptation, pause, context loss e preference changes;
- automatizar não-download em reduced/saveData;
- medir bundle e remover runtime legado antes do merge final.

### Fatia 5 — pointer high-tier e hardening

- adicionar pointer limitado apenas depois dos gates anteriores;
- trace GPU Android/iPhone, 20 navegações e 50 trocas;
- comparar experiência `base|air|reduced` em compreensão e performance;
- remover pointer se não houver ganho perceptível sem custo/desconforto.

### Fatia 6 — costura editorial

- Anime.js conduz somente o glyph SVG até a seção de coleção;
- sem scroll pinning/parallax; um writer por propriedade;
- coleção mantém zero Three.

## 16. Testes obrigatórios

### Unitários

- todos os IDs têm preset, nome, cadência, terminal e path SVG;
- pontos ficam dentro do envelope e começam na mesma fonte;
- assinaturas finais são distintas por path/terminal, inclusive sem cor;
- gerador de ribbon produz índices válidos, bounds finitos e contagem por tier;
- quality selection é conservadora com APIs ausentes;
- downgrade tem histerese e nunca sobe na sessão;
- state reducer garante last-choice-wins e cancela tokens antigos;
- `dispose()` é idempotente.

### Integração React

- primeiro HTML contém H1, CTAs, cinco nomes e SVGs sem aguardar effect;
- selecionar cada SKU atualiza label textual e `aria-checked`/`aria-current`;
- `Reduzir efeitos` desmonta runtime e persiste preferência;
- mudança dinâmica de media query desmonta e restaura fallback;
- pausa mantém seleção e permite retomada;
- canvas permanece `aria-hidden` e não focável.

### Playwright

1. normal desktop: chunk lazy, high/medium conforme fixture, cinco escolhas corretas;
2. normal mobile: low, nenhum pointer, sem overflow;
3. `reducedMotion=reduce`: chunk runtime não solicitado;
4. `saveData=true`: chunk runtime não solicitado;
5. WebGL2 `null`: SVG e compra intactos;
6. `webglcontextlost`: fallback imediato, CTA e seleção intactos;
7. 50 trocas rápidas: última variante vence, sem erro de console;
8. aba/viewport inativos: loop suspenso;
9. teclado: radiogroup, pausa/redução e CTA completos;
10. axe em full/reduced/fallback;
11. screenshots em 320, 390, 768, 1024 e 1440 px sem CLS/overflow;
12. interceptação comprova que Three não entra em coleção, carrinho ou checkout.

### Performance/manual

- três Lighthouse runs por rota em preview comprimido;
- trace Android intermediário com GPU ativa, full versus reduced;
- Safari/iPhone físico: context loss, resize/orientation e temperatura;
- long animation frames, frame pacing, INP de menu/sacola durante cena;
- bundle report e headers Brotli/gzip/cache;
- memória após 20 navegações e 50 trocas.

## 17. Budgets e critérios de aceite

### Hard gates técnicos

- JS inicial sem Three `<=180 KiB gzip`; alvo `<=160 KiB`;
- chunk Three `<=130 KiB gzip`; alvo `<=100 KiB`;
- JS total com cena `<=300 KiB gzip`; alvo `<=260 KiB`;
- Home: um contexto, `<=10` draw calls, `<=30k` triângulos, sem postprocess/4K;
- implementação alvo deste spec: `<=6` calls e `<1k` triângulos em repouso/transição normal;
- mobile low: DPR `<=1.0`, `<=30 FPS`, 0 FPS em repouso;
- nenhum LoAF/long animation frame `>50 ms` atribuído ao hero no aparelho de referência; bloqueio absoluto `>100 ms`;
- nenhum download Three em reduced motion/data/saveData;
- loop suspenso fora da viewport/aba e encerrado no repouso;
- 0 erro JS que impeça escolha, navegação ou compra;
- LCP/INP/CLS conforme `PERFORMANCE_BUDGET.md`; sem campo, estado é `sem dados`.

### Aceite UX/acessibilidade

- `>=90%` identifica incenso em 5 s na rodada moderada;
- `>=80%` pareia SKU caixa/card sem depender de cor;
- `100%` completa exploração e compra por teclado e reduced motion;
- cada SKU é distinguível no glyph estático a 24×40;
- nenhum participante depende da animação para explicar o produto;
- zero foco movido/encoberto; alvos `>=44 px`;
- nenhum relato recorrente de desconforto sem saída imediata;
- `HEALS` sempre aparece perto de `incenso(s)` no primeiro contato.

### Critério de remoção

Remover ou reduzir a cena se ela falhar qualquer hard gate, reduzir conclusão de tarefa, não melhorar reconhecimento/compreensão contra o SVG ou elevar desconforto. “Mais memorável” precisa ser medido; não é exceção para performance ou acessibilidade.

## 18. Blockers reais

- os glyphs ainda precisam de aprovação de direção de arte em uma cor e miniatura;
- cores por SKU não estão aprovadas;
- catálogo, composição, aroma percebido e claims continuam sem verdade material;
- não há device lab GPU, preview final comprimido ou dados de campo;
- a PDP Three depende de embalagem e produto físicos aprovados;
- a Home ainda usa fixtures genéricas `Intervalo 01–03`, não os cinco SKUs.

Esses blockers não impedem as fatias 1–4 com dados conceituais claramente rotulados. Eles impedem declarar identidade final, fidelidade material ou release de produção.

## 19. Definição de pronto desta especificação

Esta especificação estará implementada apenas quando:

- o runtime legado tiver sido substituído sem dois canvases/runtimes;
- os cinco rastros e o neutral tiverem paridade SVG/Three;
- seleção, pausa, redução e fallbacks estiverem automatizados;
- todos os budgets de bundle/runtime passarem;
- traces físicos e testes de compreensão estiverem anexados;
- o status diferenciar `integrated`, `lab-validated` e `field-validated`.

Até lá, o estado correto é `spec` ou `prototype`, nunca “site finalizado”.
