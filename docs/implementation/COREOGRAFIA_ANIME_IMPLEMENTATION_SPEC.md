# HEAL — especificação de implementação Anime.js para Coreografia do Ar

Data: 2026-08-28  
Owner: HEAL-34 · Anime.js / interaction design / acessibilidade  
Estado: `ESPECIFICAÇÃO; AUDITORIA READ-ONLY DO SITE; NÃO IMPLEMENTADO`  
Base técnica auditada: Anime.js `4.5.0`, React `19.2.8`, Next `16.3.3`, Three.js `0.185.1`.

## 0. Resultado executivo

A implementação deve trocar a lógica atual de “fumaça genérica + entradas decorativas” por um único vocabulário funcional: **fonte, eixo, rastro, contrarrastro e terminal**. O movimento não tenta simular cheiro; ele torna reconhecível a variante selecionada e preserva essa identidade da Home até coleção, PDP e confirmação da sacola.

O primeiro ciclo não precisa aumentar o número de animações. Precisa aumentar a coerência entre elas:

1. Hero: um organismo ativo e cinco seletores HTML explícitos.
2. Mapa do Ar: cinco glyphs estáticos; só o item sob foco, tap ou seleção desenha o próprio rastro.
3. PDP: caixa 2.5D sob ação explícita; fatos e compra continuam em HTML.
4. Sacola: a confirmação acende a fonte/terminal do SKU uma vez; não usa loop.
5. Reduced motion/data, ausência de JS e falhas sempre mostram o mesmo estado final reconhecível.

Anime.js é a camada de progressão temporal. Three.js continua restrito ao campo atmosférico do Hero e não deve controlar texto, seleção, foco, navegação ou estado comercial.

## 1. Estado real auditado

### 1.1 Já existe e deve ser preservado

- `site/package.json` declara Anime.js `^4.5.0`; o lockfile resolve exatamente `4.5.0`.
- `EditorialSeamReveal` usa imports granulares (`animejs/scope` e `animejs/timeline`), `createScope()`, media query dinâmica e `scope.revert()`.
- `EmberCartFeedback` usa imports granulares (`animejs/animation` e `animejs/scope`), dispara apenas quando `eventKey` muda e mantém o texto de sucesso independente do efeito.
- `EmberSmokeScene` mantém SVG no HTML, carrega Three dinamicamente, aplica gates de reduced motion/data/saveData, observa viewport e visibilidade, trata perda de contexto e faz dispose.
- O Hero reserva dimensões antes da cena, portanto a evolução não deve introduzir CLS.
- A compra é funcional sem depender do canvas; o formulário e a live region permanecem HTML.
- A folha global remove transições/animações CSS em `prefers-reduced-motion: reduce`.

### 1.2 Divergências e lacunas encontradas

| Área | Estado observado | Correção necessária |
|---|---|---|
| Documento versus runtime | A Motion Bible diz que seam e feedback não estão integrados; `app/page.tsx` e `AddToCartForm.tsx` já os consomem | Atualizar a documentação de estado no mesmo PR da implementação |
| Hero | H1 `Acenda o intervalo.` e uma fumaça única sem relação com os cinco SKUs | Introduzir organismo neutro + seleção explícita e copy aprovada da Coreografia do Ar |
| Cena Three | Geometria genérica; não recebe `variantId` nem estado semântico | Fazer Three consumir a mesma definição de curvas dos glyphs, sem controlar seleção |
| Seam | Anima ao montar, mesmo fora de atenção; CSS global e módulo definem o mesmo fundo | Substituir por continuidade curta ligada ao limite Hero/coleção; uma única fonte de estilo |
| Coleção | Três fixtures genéricas, sem Mapa do Ar, glyph, seleção ou comparação | Criar mapa opcional acima do grid completo; manter filtros e links convencionais |
| Cards | Placeholder abstrato comum; hover é mudança genérica de fundo/cor | Acrescentar glyph e padrão do SKU; animar apenas sob foco/hover/tap explícito |
| PDP | Placeholder estático; sem inspeção 2.5D nem glyph persistente | Criar inspeção acionada por botão, mantendo primeiro frame factual e comprável |
| Sacola | A “brasa” é coerente com a versão anterior, mas não carrega a assinatura do SKU | Evoluir para confirmação por fonte + terminal do glyph selecionado |
| Controles | Não existem `Pausar efeitos`, `Reduzir efeitos`, `Ver lista sem mapa` | Adicionar controle persistente na sessão somente quando o recurso avançado estiver ativo |
| Testes | E2E cobre fallback Three em reduced motion, mas não há teste unitário dos componentes motion | Cobrir gatilho, cancelamento, cleanup, troca de preferência e semântica estática |

### 1.3 Decisão de migração

Não remover os componentes existentes de imediato. Criar os componentes novos, integrar uma rota por vez e só então:

- substituir `EditorialSeamReveal` por `AirContinuitySeam`;
- manter `EmberCartFeedback` como wrapper de compatibilidade ou migrar para `AirCartFeedback` no mesmo PR que passar `variantId`;
- preservar `EmberSmokeScene` como fallback de rollback até o hero por variante vencer seus gates.

## 2. Contrato semântico único

```ts
export type HealVariantId =
  | 'canela'
  | 'lavanda-celestial'
  | 'mirra'
  | 'olibano'
  | 'alecrim';

export type AirCadence = {
  readonly segmentsMs: readonly number[];
  readonly pausesMs: readonly number[];
  readonly totalDesktopMs: number;
  readonly totalMobileMs: number;
};

export type AirVariantDefinition = {
  readonly id: HealVariantId;
  readonly displayName: string;
  readonly productLabel: string; // sempre inclui "incenso HEALS"
  readonly pathD: string;
  readonly counterPathD: string;
  readonly terminalPathD: string;
  readonly patternId: string;
  readonly cadence: AirCadence;
};
```

Fonte proposta: `site/lib/brand/air-variants.ts`. É a autoridade compartilhada por SVG, Anime e Three. Não duplicar `pathD`, duração ou nome em componentes.

Regras:

- `displayName` e `productLabel` vêm do catálogo/contrato aprovado, não da animação.
- `pathD` é identidade gráfica, não representação de fumaça real.
- o glyph estático e o frame final animado usam o mesmo path;
- `variantId` viaja pelo card, URL/PDP e feedback de compra; nenhuma seleção depende de query global do DOM.

## 3. Arquitetura proposta

```text
app/page.tsx (Server Component)
 ├─ texto, CTAs e fallback SVG já no HTML
 └─ AirHeroController (ilha client)
     ├─ AirVariantSelector (buttons/radios HTML)
     ├─ AirGlyphMotion (Anime.js)
     └─ AirSpatialField (Three opcional; recebe variantId)

app/colecoes/[handle]/page.tsx (Server Component)
 ├─ AirMap (ilha client, opcional)
 └─ ProductCard[] (grid completo e autoritativo)
     └─ AirGlyph estático + AirGlyphMotion sob interação

app/produtos/[handle]/page.tsx (Server Component)
 ├─ primeiro frame, fatos, preço, estoque e CTA
 └─ ProductBoxInspector (ilha client 2.5D; Anime.js sob ação)

AddToCartForm (client)
 └─ AirCartFeedback(eventKey, variantId, message)
```

Arquivos/componentes propostos:

| Arquivo | Responsabilidade | Client? |
|---|---|:---:|
| `lib/brand/air-variants.ts` | dados estáveis dos cinco rastros | não |
| `components/brand/AirGlyph.tsx` | SVG estático, `currentColor`, sem Anime | não |
| `components/motion/useMotionPolicy.ts` | preferência do SO, saveData e pausa/redução explícitas | sim |
| `components/motion/AirGlyphMotion.tsx` | draw/cancel/replay local | sim |
| `components/motion/AirHeroController.tsx` | seleção e estado semântico do Hero | sim |
| `components/motion/AirMap.tsx` | comparação opcional; uma animação por vez | sim |
| `components/motion/AirContinuitySeam.tsx` | passagem curta Hero → coleção | sim |
| `components/motion/ProductBoxInspector.tsx` | vistas 2.5D acessíveis | sim |
| `components/motion/AirCartFeedback.tsx` | confirmação comercial factual + assinatura do SKU | sim |
| `components/motion/motion-tokens.ts` | durações, easings e budgets | não |

Cada ilha possui seu próprio `createScope({ root, mediaQueries })`. Não criar timeline global, singleton de engine ou contexto React para controlar animações entre rotas.

## 4. Política de movimento e dados

```ts
type MotionMode = 'static' | 'reduced' | 'full';

type MotionPolicy = {
  mode: MotionMode;
  allowThree: boolean;
  allowSpatialPointer: boolean;
  reason:
    | 'server'
    | 'system-reduced-motion'
    | 'system-reduced-data'
    | 'save-data'
    | 'user-paused'
    | 'user-reduced'
    | 'eligible';
};
```

Precedência:

1. O servidor sempre entrega `static`.
2. `prefers-reduced-motion`, `prefers-reduced-data` ou `saveData` impedem autoplay e Three.
3. `Pausar efeitos` congela/remete ao frame final, mas não muda conteúdo.
4. `Reduzir efeitos` dura pela sessão e força estados finais sem deslocamento.
5. Só `eligible` permite Three e resposta de perspectiva.

Não oferecer `Ativar movimento` a quem declarou redução no sistema. Os controles da própria página podem reduzir/pausar, nunca sobrepor a preferência do SO.

Persistência recomendada: `sessionStorage` somente para escolhas explícitas (`heal:motion-mode`), lida depois da hidratação. O HTML inicial continua estático; portanto não existe divergência de markup.

## 5. Hero — coreografia e implementação

### 5.1 Primeiro frame

O servidor entrega imediatamente:

- marca, eyebrow, H1, apoio e CTAs;
- um glyph neutro/comum já completo;
- cinco controles com nome textual;
- disclosure de que o movimento é identidade visual;
- link `Ver todos os incensos` antes do campo avançado em mobile.

Texto, preço, prova e CTA nunca começam em `opacity: 0` e não entram por caractere. A sensação vem do rastro, não de atrasar a interface.

### 5.2 Hero load elegível

| Fase | Janela | Alvo | Movimento | Função |
|---|---:|---|---|---|
| Fonte | 0–180 ms | ponto-base | escala `0.78 → 1`, opacidade `0.35 → 1` | estabelece origem |
| Eixo | 80–300 ms | eixo comum | draw `0 → 1` | estabiliza leitura |
| Rastro | 180–até 900 ms | path principal | draw conforme cadência do SKU/neutro | revela assinatura |
| Contrarrastro | início +160 ms | path secundário | draw e opacidade `0 → .42` | profundidade controlada |
| Terminal | últimos 180 ms | marca final | opacidade/escala curta | fecha a assinatura |

Easing padrão: `out(3)`. Nenhum spring, bounce, overshoot ou loop.

Pseudocódigo:

```tsx
import { createScope, type Scope } from 'animejs/scope';
import { createTimeline } from 'animejs/timeline';
import { createDrawable } from 'animejs/svg';

const scopeRef = useRef<Scope | null>(null);
const activeRef = useRef<{ revert(): unknown } | null>(null);

useEffect(() => {
  const scope = createScope({
    root: rootRef,
    mediaQueries: {
      reduce: '(prefers-reduced-motion: reduce)',
      reduceData: '(prefers-reduced-data: reduce)',
    },
  });

  scope.add('traceVariant', (variantId: HealVariantId) => {
    activeRef.current?.revert();
    if (scope.matches.reduce || scope.matches.reduceData || policy.mode !== 'full') {
      setVisualVariant(variantId); // frame final, sem transição
      return;
    }

    const definition = AIR_VARIANTS[variantId];
    const main = createDrawable('[data-air-main]');
    const counter = createDrawable('[data-air-counter]');

    activeRef.current = createTimeline({ defaults: { ease: 'out(3)' } })
      .add('[data-air-source]', { opacity: [0.35, 1], scale: [0.78, 1], duration: 180 }, 0)
      .add(createDrawable('[data-air-axis]'), { draw: ['0 0', '0 1'], duration: 220 }, 80)
      .add(main, {
        draw: ['0 0', '0 1'],
        duration: definition.cadence.totalDesktopMs,
      }, 180)
      .add(counter, { draw: ['0 0', '0 1'], opacity: [0, 0.42], duration: 420 }, 340)
      .add('[data-air-terminal]', { opacity: [0, 1], scale: [0.84, 1], duration: 180 }, '-=180');
  });

  scopeRef.current = scope;
  return () => {
    activeRef.current = null;
    scopeRef.current = null;
    scope.revert();
  };
}, [policy.mode]);
```

O pseudocódigo demonstra o contrato; a cadência segmentada deve ser implementada com subpaths ou máscaras por trecho. Não tentar simular pausas alterando velocidade de um único path sem marcos verificáveis.

### 5.3 Troca de variante

1. A ação HTML atualiza imediatamente nome, `aria-pressed`/radio e dados factuais.
2. A timeline anterior é revertida antes da próxima.
3. O rastro anterior volta para a base estática em 100–140 ms.
4. O novo rastro é desenhado na cadência específica.
5. Cliques rápidos não formam fila: composição é `replace`, e o último input vence.

Cadências aprovadas para protótipo:

| Variante | Desktop | Segmentos | Mobile |
|---|---:|---|---:|
| CANELA | 720 ms | `140 / 140 / pausa 100 / 340` | 420 ms contínuos |
| LAVANDA CELESTIAL | 900 ms | `360 / pausa 120 / 420` | 520 ms |
| MIRRA | 780 ms | `300 / pausa 80 / 400` | 460 ms |
| OLÍBANO | 840 ms | `260 / 260 / 320` | 480 ms |
| ALECRIM | 680 ms | `120 × 4 / pausa final 200` | 400 ms |

Mobile não reduz informação; reduz somente segmentação e tempo. Em reduced motion, duração efetiva é zero e o frame final é mostrado.

### 5.4 Integração com Three

Anime não deve animar objetos Three diretamente no primeiro ciclo. O controlador emite somente estado:

```ts
type AirSceneState = {
  variantId: HealVariantId | 'neutral';
  phase: 'rest' | 'trace' | 'selected';
  motionMode: MotionMode;
};
```

Three interpola seus próprios uniforms dentro do runtime já responsável por RAF, atividade e dispose. Isso evita dois relógios disputando o mesmo frame. O SVG permanece visível e autoritativo até `data-state="ready"`.

## 6. Continuidade Hero → Mapa do Ar

O seam atual anima ao montar. A versão final deve representar a transformação do volume atmosférico em linha de comparação.

Comportamento:

- um path curto nasce no rodapé do Hero e termina no título `Mapa do Ar`;
- não fixa viewport, não muda scroll, não cria parallax;
- progressão ocorre apenas dentro de uma faixa curta da própria seção;
- se a ligação por scroll não demonstrar ganho, usar `IntersectionObserver` e tocar uma vez.

`onScroll()` só é permitido nesta passagem e precisa ser local:

```ts
import { onScroll } from 'animejs/events';

const observer = onScroll({
  target: rootRef.current!,
  enter: 'top 88%',
  leave: 'bottom 58%',
  sync: true,
});

observer.link(timeline);
// scope.revert() deve reverter timeline e observer registrados no scope.
```

Antes de implementar, confirmar a sintaxe exata de thresholds no PoC com Anime `4.5.0`; não copiar exemplos de v3. Se a versão ligada ao projeto não aceitar esses valores, bloquear o merge e ajustar pelo contrato tipado/local.

Budget: faixa de até `0.7 viewport`, uma timeline, um SVG, zero pinning, zero listener manual de `scroll`.

## 7. Coleção — Mapa do Ar

### 7.1 Estrutura funcional

O Mapa é uma ferramenta opcional acima do grid, não a coleção inteira. Deve conter:

- heading `Mapa do Ar`;
- explicação textual curta;
- cinco `button` ou radios com nome + glyph;
- painel textual do item selecionado;
- ações `Ver este incenso`, `Ver lista sem mapa` e `Comparar os rastros`;
- o grid completo logo depois, mesmo sem JS.

Não usar canvas, drag obrigatório, carrossel sem botões ou hover como única descoberta.

### 7.2 Estados

| Evento | Visual | Semântica |
|---|---|---|
| Entrada | cinco glyphs finais, sem autoplay | todos disponíveis para comparar |
| Hover de mouse fino | trace curto apenas do alvo | nenhuma live region |
| Foco por teclado | outline + trace curto do alvo | nome já está no botão |
| Tap/click | selecionado ganha contrarrastro e label | `aria-pressed` ou radio checked |
| `Ver lista sem mapa` | oculta/recolhe ferramenta | foco vai para heading/grid, nunca some |
| Reduced motion | destaque instantâneo por contorno/padrão | mesma seleção e ação |

No máximo uma animação roda. `pointerenter` só habilita preview quando `(hover: hover) and (pointer: fine)`; touch usa click.

### 7.3 `createLayout()` sem quebrar React ou DOM

O filtro atual é um `<form method="get">` que navega e renderiza no servidor. **Não aplicar `createLayout()` a essa navegação no primeiro ciclo.** O novo documento não possui o snapshot anterior e fingir a transição cria complexidade/hidratação frágil.

Use `createLayout()` apenas quando a ordenação passar a ocorrer em uma ilha client e os mesmos cards permanecerem montados:

```tsx
import { createLayout, type AutoLayout } from 'animejs/layout';

const layoutRef = useRef<AutoLayout | null>(null);
const shouldAnimateNextCommit = useRef(false);

useEffect(() => {
  if (policy.mode !== 'full') return;
  layoutRef.current = createLayout(gridRef.current!, {
    children: '[data-product-card]',
    duration: 360,
    ease: 'out(3)',
  });
  return () => layoutRef.current?.revert();
}, [policy.mode]);

function requestSort(next: SortKey) {
  layoutRef.current?.record();
  shouldAnimateNextCommit.current = true;
  setSort(next); // muda a ordem DOM real, não CSS order
}

useLayoutEffect(() => {
  if (!shouldAnimateNextCommit.current) return;
  shouldAnimateNextCommit.current = false;
  layoutRef.current?.animate({ duration: 360, ease: 'out(3)' });
}, [sortedIds]);
```

Condições:

- a ordem DOM deve ser a ordem visual e de leitura;
- foco permanece no controle acionado, não é movido para card;
- filtro que remove elementos é instantâneo no primeiro ciclo;
- duração máxima `420 ms`; reduced motion é instantâneo;
- IDs dos cards são estáveis e vêm do produto.

## 8. Cards — interação não genérica

Cada `ProductCard` recebe `variantId` e mostra `AirGlyph` estático. A resposta sob foco/hover desenha o rastro daquela variante; o restante do card não “voa” nem sobe.

Permitido:

- traçar glyph uma vez;
- contrarrastro de `0 → .42`;
- sublinhado/terminal avançar até `12px` na ação `Ver produto`;
- borda/contraste por CSS para foco e seleção.

Proibido:

- scale do card inteiro;
- stagger automático de todos os cards ao scroll;
- tilt seguindo cursor;
- fumaça contínua em todas as miniaturas;
- esconder preço/estoque até o hover.

## 9. PDP — inspeção 2.5D

### 9.1 Primeiro frame

Antes de qualquer client component aparecem: breadcrumb, nome `[VARIANTE] — incenso HEALS`, embalagem/still, disclosure conceitual, preço, estoque, quantidade e CTA. `Abrir e ver` vem depois e nunca é necessário para comprar.

### 9.2 Controles e foco

Grupo de controles HTML:

- `Frente`;
- `Lateral`;
- `Abrir`;
- `Ver macro`;
- `Fechar caixa`.

Cada ação atualiza uma descrição visível. Ao fechar a inspeção, o foco volta ao botão `Abrir e ver`. `Escape` fecha se a inspeção for apresentada como dialog; se for inline, Escape é opcional e não pode capturar globalmente.

### 9.3 Timeline 2.5D

| Transição | Duração | Propriedades | Observação |
|---|---:|---|---|
| frente → lateral | 280–360 ms | `translateX`, `rotate`, opacity cruzada | perspectiva máxima contida |
| lateral → aberta | 420–560 ms | clip/máscara + `translateY ≤24px` | só após click |
| aberta → macro | 260–340 ms | opacity/scale `1 → 1.035` | não fingir textura real |
| qualquer → fechada | 240–320 ms | reversão direta | último input vence |

Para transform/opacity simples, preferir `waapi.animate()`:

```ts
import { waapi } from 'animejs/waapi';

activeRef.current?.revert();
activeRef.current = waapi.animate(layerRef.current!, {
  opacity: [0, 1],
  translateX: ['12px', '0px'],
  rotate: ['1.5deg', '0deg'],
  duration: 320,
  ease: 'out(3)',
  composition: 'replace',
});
```

Usar `createTimeline()` apenas quando duas ou mais camadas precisarem de marcos sincronizados. Não adicionar Three à PDP até o baseline 2.5D ser testado com as mesmas tarefas.

## 10. Confirmação da sacola

O contrato atual de `eventKey` está correto: muda somente depois de `addFixtureLine()` retornar sucesso. A evolução necessária é passar também `variantId`.

```tsx
<AirCartFeedback
  eventKey={lastConfirmedAddId}
  variantId={variantId}
  message={cartStatusMessage}
/>
```

Timeline:

- fonte do glyph: `0–100 ms`, opacidade/escala;
- terminal: `60–220 ms`, avanço máximo `12px`, volta ao frame final;
- duração total: `220 ms`;
- mensagem em `role="status"`, `aria-live="polite"`, independente e persistente;
- erro, loading, timeout ou estoque incerto não disparam;
- dois sucessos com keys distintas produzem dois eventos, sem fila acumulada;
- carrinho e checkout permanecem sem Three e sem animação contínua.

`EmberCartFeedback` pode permanecer como nome interno durante migração, mas o visual não deve sugerir que todas as variantes queimam/soltam fumaça daquela maneira.

## 11. Acessibilidade

### 11.1 Semântica

- Glyph decorativo dentro de um controle com nome: `aria-hidden="true"`.
- Glyph que comunica variante fora de texto: `role="img"` e `aria-label="Rastro gráfico de Canela — incenso HEALS"`.
- Seletor usa radio quando exatamente uma variante é ativa; buttons com `aria-pressed` quando seleção é opcional/neutra.
- Não anunciar hover, progresso da timeline ou frames.
- Live region somente para mudança de seleção relevante iniciada pelo usuário ou confirmação comercial.
- Alvos mínimos de `44 × 44px`, foco visível e contraste independente da cor do SKU.

### 11.2 Equivalências

| Condição | Resultado obrigatório |
|---|---|
| Sem JS | glyphs finais, conteúdo, filtros, links e compra completos |
| Reduced motion | troca instantânea; nenhum draw, deslocamento ou crossfade espacial |
| Reduced data/saveData | sem Three e imagens responsivas econômicas |
| Forced colors | paths em `currentColor`, contorno do SO e padrões reconhecíveis |
| Touch | botões; sem hover/drag obrigatório |
| Zoom 200% | controles refluem; mapa vira lista sem corte |
| Teclado | Tab entra/sai do grupo; setas só dentro de radio group bem implementado |

Pausar deve parar movimento ambiente. Não deve “pausar” animação funcional breve no meio e deixar estado ambíguo; nesses casos, completar instantaneamente para o frame final.

## 12. Hidratação, concorrência e cleanup

### 12.1 Primeiro markup conservador

- Server e primeiro client render produzem exatamente o mesmo SVG estático.
- Preferências de mídia/navegador só são lidas em effect.
- Não esconder fallback via classe `js` aplicada antes da hidratação.
- Reservar `aspect-ratio`/dimensões de glyph, mapa, caixa e canvas.

### 12.2 Riscos concretos

| Risco | Mitigação |
|---|---|
| Flash do glyph completo antes do draw | Manter base estática tênue e animar uma camada overlay inicialmente transparente |
| `createDrawable()` mede path em `display:none` | Nunca medir glyph oculto; usar opacity/visibility e dimensões estáveis |
| IDs SVG diferentes entre server/client | IDs determinísticos derivados de `variantId`, ou evitar `<defs>` compartilhado |
| Strict Mode cria effect duas vezes em desenvolvimento | `scope.revert()` integral e nenhum listener/timer fora do scope |
| Troca rápida acumula timelines | guardar handle, `revert()`/`cancel()` antes de criar a próxima; último input vence |
| Navegação desmonta durante import/timeline | flag `disposed`, dynamic import checa flag, cleanup remove observer/listener |
| `createLayout()` mede antes do commit React | `record()` antes do state update; `animate()` em `useLayoutEffect` depois do DOM novo |
| Preferência muda durante animação | completar frame final, reverter scope e reconstruir somente se permitido |
| CSS reduced-motion não cancela Anime JS | gate explícito no scope/policy; CSS é segunda camada, não a única |
| Three e Anime disputam RAF | Anime em SVG/DOM; Three interpola no runtime próprio a partir de estado semântico |

### 12.3 Checklist de cleanup por ilha

- `scope.revert()`;
- `WAAPIAnimation.revert()` ou `cancel()`;
- `AutoLayout.revert()`;
- `ScrollObserver.revert()`;
- `IntersectionObserver.disconnect()`;
- remover `matchMedia`, `visibilitychange`, connection e pointer listeners;
- zerar refs de animação;
- nenhum `setTimeout`, RAF ou Promise tardio altera estado depois de `disposed`;
- em Three, manter o dispose já implementado, incluindo `setAnimationLoop(null)` no runtime.

## 13. Budgets de produção

Budgets são gates; precisam ser medidos no build, não declarados como resultado.

| Rota | Budget Anime/motion | Concorrência | Regra |
|---|---|---:|---|
| Home | imports granulares; incremento JS gzip a medir, alvo ≤14 KB fora Three | 1 timeline Anime + 1 runtime Three | nenhuma timeline de texto |
| Coleção | alvo ≤10 KB gzip; zero Three | 1 glyph/layout por vez | nenhum autoplay de cards |
| PDP | alvo ≤12 KB gzip no baseline 2.5D | 1 inspeção | still e compra antes da ilha |
| Carrinho/checkout | somente feedback breve | 1 evento | zero canvas/loop |

Gates de runtime:

- `CLS = 0` atribuível a motion em cada transição testada;
- nenhuma long task `>50 ms` atribuível a Anime;
- resposta visual ao input começa no mesmo frame ou no próximo;
- transform/opacity/clip local; não animar `width`, `height`, `top` ou `left` de layout;
- coleção: layout transition `≤420 ms` desktop;
- até um elemento narrativo ativo por seção;
- nenhum loop Anime permanente;
- comparação com motion desligado para medir LCP, INP, CLS e energia;
- preservar metas do sistema: LCP mobile p75 `≤2,5 s`, INP p75 `≤200 ms`, CLS `≤0,1` quando houver campo real.

## 14. Plano de implementação por fatias

### F0 — fundação estática

- criar `air-variants.ts` e cinco glyphs finais em SVG;
- testar 16×28, 24×40, uma cor e forced colors;
- integrar glyph estático em Hero/card/PDP sem Anime;
- bloquear avanço se dois SKUs não forem distinguíveis sem nome/cor.

### F1 — Hero SVG/Anime

- criar `useMotionPolicy`, seletor e `AirGlyphMotion`;
- aplicar cadências, cancelamento e reduced motion;
- manter Three atual como challenger/fallback temporário;
- validar mobile 320/390 antes de ligar scroll.

### F2 — Mapa do Ar

- criar mapa opcional e lista completa;
- foco/hover/tap só no glyph ativo;
- sem `createLayout()` enquanto filtros forem navegação server;
- testar compreensão e tarefa “encontrar um aroma”.

### F3 — continuidade e Three por variante

- substituir seam de mount pela passagem local;
- passar estado semântico ao runtime Three;
- adicionar controles pausar/reduzir;
- medir o challenger contra SVG, não contra página vazia.

### F4 — PDP 2.5D e sacola

- implementar inspeção por ação explícita;
- passar `variantId` ao feedback comercial;
- manter carrinho/checkout estáticos;
- Three em PDP continua bloqueado até teste A/B.

### F5 — consolidação

- remover componentes antigos somente depois da cobertura equivalente;
- auditar bundles por rota;
- QA física/visual e acessível;
- atualizar Motion Bible e estado de decisões.

## 15. Plano de testes

### 15.1 Unitários

Criar `tests/unit/motion.test.tsx` com mocks explícitos de `matchMedia`, `IntersectionObserver`, WAAPI e comprimento SVG:

- HTML inicial contém glyph final e labels antes de effects;
- reduced motion não chama timeline e preserva seleção;
- mudança dinâmica para reduced encerra animação e mostra estado final;
- seleção rápida `A → B → C` deixa C como único estado final;
- cleanup em unmount reverte scope, observer e animação;
- `eventKey` inicial não dispara confirmação;
- nova key após sucesso dispara uma vez;
- `null`, erro ou key repetida não disparam;
- glyph decorativo não aparece na árvore acessível duplicando o nome.

Não testar Anime por detalhes internos frágeis. Testar contrato observável e, quando necessário, injetar um adapter de animação.

### 15.2 Integração

- card, URL, PDP e `variantId` mantêm a mesma variante;
- filtro server continua funcional sem JS;
- futura ordenação client muda a ordem DOM real e preserva foco;
- AddToCart só incrementa key em `result.ok`;
- dados `[A VALIDAR]` nunca são substituídos por copy da animação.

### 15.3 Playwright

- viewports `320×568`, `390×844`, `768×1024`, `1024×768`, `1440×900` e `1920×1080`;
- sem overflow horizontal em todas as rotas;
- teclado percorre seletor, mapa, grid, inspeção e compra;
- `reducedMotion: 'reduce'`: SVG final, zero canvas ready e zero deslocamento;
- emulação de `forcedColors: 'active'`: glyphs e foco continuam visíveis;
- contexto com `saveData`: Three não é importado/inicializado;
- JavaScript desabilitado: copy, glyph, catálogo, PDP e links permanecem;
- perda/restauração de WebGL não bloqueia CTA;
- 20 trocas rápidas não geram erro no console e terminam na última variante;
- scroll não é preso e PageDown/Space mantêm comportamento nativo;
- screenshots do frame estático e final por SKU, não de frames intermediários frágeis;
- axe WCAG 2.2 AA nas mesmas rotas já cobertas.

### 15.4 Performance e bundle

- comparar build baseline versus cada fatia;
- registrar bytes brutos/gzip por rota e imports Anime usados;
- trace de CPU em aparelho mobile de referência;
- `PerformanceObserver` para long tasks/long animation frames quando suportado;
- medir LCP/INP/CLS com motion full, reduced e sem Three;
- falhar o gate se a experiência avançada atrasar CTA, preço, foco ou interação.

## 16. Critérios de aceite

- [ ] Os cinco rastros são reconhecíveis parados, sem cor e sem nome.
- [ ] O Hero informa `incensos` antes da experiência avançada.
- [ ] Só uma animação Anime roda por vez.
- [ ] Texto, preço, estoque e CTA nunca esperam motion.
- [ ] O Mapa é opcional e o grid completo funciona sem JS.
- [ ] Hover nunca é o único gatilho ou portador de informação.
- [ ] PDP usa 2.5D como baseline; Three continua challenger.
- [ ] A confirmação comercial ocorre apenas após sucesso real do adapter.
- [ ] Reduced motion/data, forced colors, teclado, touch e context loss possuem equivalência.
- [ ] Todos os scopes, observers, WAAPI e timelines são revertidos no unmount.
- [ ] Build registra o custo por rota e passa os budgets.
- [ ] Motion Bible deixa de declarar incorretamente que seam/feedback não estão integrados.

## 17. Fora de escopo deliberado

- animação de texto por letra;
- smooth scroll, scroll hijacking, pinning ou parallax de página;
- partículas em todos os cards;
- cursor customizado;
- transição global entre rotas;
- Three.js em coleção, sacola ou checkout;
- Three.js na PDP antes do challenger medido;
- alegações de aroma, efeito, composição, fumaça ou duração derivadas do visual.

Essa restrição não diminui a experiência. Ela concentra esforço no que pode tornar HEAL própria: cada incenso deixa um rastro identificável, e esse rastro continua útil quando toda animação é desligada.
