# HEAL — matriz de QA da Coreografia do Ar

Data: 2026-08-28  
Owner: HEAL-37 · QA/review independente  
Estado: `PLANO DE TESTE E FINDINGS ESTÁTICOS; IMPLEMENTAÇÃO AINDA NÃO VALIDADA`  
Escopo: Home, jornada seção a seção, Mapa do Ar, coleção de aproximadamente 50 aromas, cinco SKUs de estreia, PDP, sacola, SEO fixture e experiência Anime.js/Three.js.

## 0. Veredito executivo

A Coreografia do Ar não deve ser aprovada por “parecer bonita” em um desktop. O gate precisa provar quatro coisas simultaneamente:

1. **identidade escalável:** os cinco aromas de estreia e o catálogo futuro têm símbolos únicos, estáticos e reconhecíveis sem depender de cor ou movimento;
2. **jornada íntegra:** a narrativa progride seção a seção sem esconder catálogo, fatos, navegação ou compra;
3. **experiência equivalente:** teclado, leitor de tela, touch, reduced motion/data, forced colors, ausência de JS e falha WebGL preservam a mesma tarefa;
4. **atenção ética:** o site convida à exploração sem autoplay persistente, urgência falsa, persuasão subliminar, dark patterns ou alegações não comprovadas.

O estado atual ainda não fecha esses gates. As especificações Anime/Three são fortes, mas não foram implementadas. Além disso, a árvore compartilhada contém mudanças de Home ainda não validadas e dois riscos objetivos já visíveis por inspeção:

- o novo PNG principal tem `2.466.846 bytes`, é carregado com `fetchPriority="high"`, enquanto um WebP de `182.086 bytes` existe mas não é usado;
- o E2E reduced-motion ainda procura o CTA antigo `Explorar incensos`, enquanto a Home atual mostra `Conhecer os incensos`.

Esses itens são findings estáticos, não resultados de uma suíte executada nesta auditoria.

## 1. Fontes auditadas

- `docs/qa/QA_RELEASE_MATRIX.md`;
- `docs/qa/ACCESSIBILITY_REVIEW.md`;
- `docs/qa/RESPONSIVE_REVIEW.md`;
- `docs/qa/BUILD_DETERMINISM.md`;
- `docs/qa/RELEASE_REVIEW.md`;
- `docs/performance/PERFORMANCE_BUDGET.md`;
- `docs/performance/PERFORMANCE_REVIEW.md`;
- `docs/implementation/COREOGRAFIA_ANIME_IMPLEMENTATION_SPEC.md`;
- `docs/implementation/COREOGRAFIA_THREE_IMPLEMENTATION_SPEC.md`;
- configuração e suítes atuais de Vitest, Playwright e axe;
- implementação atual de Home, motion, Three, commerce, metadata e robots.

Evidência histórica preservada: a fixture anterior teve lint/typecheck/build, 12 testes Vitest, 52 casos Playwright e axe verdes no estado revisado. Isso não aprova a árvore atual nem a futura Coreografia do Ar.

## 2. Findings e precondições antes da implementação

### QA-AIR-001 — P1 — duas fontes de verdade propostas

A especificação Anime propõe `site/lib/brand/air-variants.ts`; a especificação Three propõe `site/components/experience/air-presets.ts`. Ambas se declaram autoridade única, mas usam tipos ligeiramente diferentes (`HealVariantId` sem neutral versus `AirVariantId` com neutral).

Gate antes do primeiro PR de runtime:

- consolidar uma única fonte serializável, recomendada em `site/lib/brand/air-presets.ts`;
- derivar o tipo de SKU ativo dos dados `as const`;
- modelar `neutral` como estado visual, não como produto vendável;
- Hero, SVG, Anime, Three, cards, PDP, carrinho e SEO importam ou recebem dados derivados dessa mesma fonte;
- teste falha para ID ausente, órfão, duplicado ou divergência de nome/path/cadência.

### QA-AIR-002 — P1 — raster principal atual excede o hard gate

Evidência estática da árvore atual:

| Asset | Dimensão conhecida | Bytes | Consumo atual |
|---|---:|---:|---|
| `coreografia-family.png` | `1672×941` | `2.466.846` | `<img src>` + `fetchPriority="high"` |
| `coreografia-family.webp` | não lida pelo decoder local | `182.086` | não referenciado |

O budget existente permite no máximo `250 KiB` para o visual principal. O PNG atual ultrapassa esse limite em aproximadamente dez vezes. O WebP cabe pelo tamanho, mas ainda precisa de dimensões, qualidade visual, fallback e variantes responsivas verificadas.

Critério de aceite:

- PNG de 2,46 MB não aparece na waterfall da Home;
- browser recebe formato/tamanho adequado ao viewport;
- dimensões ou `aspect-ratio` reservam espaço;
- visual principal `<=250 KiB`, alvo `<=150 KiB`;
- não carregar simultaneamente raster grande e runtime Three acima da dobra sem medição que justifique ambos.

### QA-AIR-003 — P1 — seletor ainda não existe

A lista dos cinco aromas na Home atual é `<ul>` estática. Ela não permite escolher SKU, não atualiza glyph/label e não prova a jornada especificada. O futuro gate exige controles HTML reais; estilizar `<li>` como se fosse controle é reprovação.

### QA-AIR-004 — P2 — teste E2E estático ficou stale

`storefront.spec.ts` busca `Explorar incensos` no caso reduced-motion, mas a Home atual usa `Conhecer os incensos`. Atualizar a asserção para o contrato da ação, por exemplo role/nome contendo `incensos` + `href="/colecoes/intervalos"`, e manter a copy exata em um teste editorial separado se ela for aprovada como contrato.

### QA-AIR-005 — P1 de release — remover “Demonstração” não autoriza fingir operação real

A solicitação é remover `DEMONSTRAÇÃO` da frente final. O gate ético exige dois modos coerentes:

| Estado | Pode remover o rótulo? | Condição |
|---|:---:|---|
| Conceito/fixture com valores, estoque ou frete fictícios | não pode parecer loja operacional | desabilitar compra ou manter aviso factual único e claro; `noindex`; nenhum pagamento |
| Loja real | sim | catálogo, preço, estoque, frete, segurança, políticas e checkout autoritativos |

É P0 de lançamento esconder que dados são fictícios enquanto CTAs imitam compra real. Se o front conceitual não deve exibir a palavra `Demonstração`, a alternativa segura é remover preço/estoque/checkout fictícios do caminho público e mostrar estado editorial sem transação. O QA não aceita apenas apagar o banner.

### QA-AIR-006 — P1 — implementação concorrente ainda não fecha o contrato

Durante esta auditoria surgiram `AirGlyph`, `AirMap` e `air-variants.ts` não rastreados. Eles confirmam a direção, mas não estão integrados nem testados. No snapshot lido:

- links do Mapa apontam para `/produtos/canela`, `/produtos/mirra` etc.; a fixture atual só gera `intervalo-01..03`, portanto a integração sem adapter/rotas correspondentes levaria a 404;
- o contrato não possui `terminalPath` nem `patternId`, embora ambos sejam requisitos de reconhecimento sem cor;
- a versão mobile do seletor é uma faixa horizontal `overflow-x:auto` sem setas ou ação alternativa visível, contrariando o requisito de não depender de swipe;
- o CSS usa `--font-display` e `--font-code`, tokens não definidos no `globals.css` observado;
- copy candidata usa `Prosperidade`, `Guarda`, `Elevação`, `matéria botânica` e usos históricos. O disclaimer reduz ambiguidade, mas não substitui fonte/proveniência nem teste de interpretação; manter em content HOLD até revisão.

Como os arquivos foram escritos em paralelo, isso é um snapshot estático, não review de uma entrega encerrada. Os pontos devem ser rechecados no diff final.

## 3. Pirâmide e classificação de testes

| Camada | Objetivo | Frequência | Bloqueia merge? |
|---|---|---|:---:|
| Unit | presets, reducer, policy, geometria, cleanup, commerce invariants | todo PR | sim |
| Integration React | SSR/hidratação, semântica, foco, last-choice-wins | todo PR | sim |
| E2E Chromium | jornada completa e matriz responsiva | todo PR | sim |
| E2E Firefox/WebKit | diferenças de eventos, SVG, foco e fallback | todo PR ou nightly estável | sim para fluxo crítico |
| Axe | regressões automatizáveis WCAG | todo PR | sim |
| Bundle/build | bytes, chunks, duplicação, determinismo | todo PR de release | sim |
| Lighthouse lab | Home/PLP/PDP/cart/checkout, três runs | preview/release | sim |
| Device/AT humano | GPU, energia, Safari/iOS, NVDA/VoiceOver/TalkBack | release candidate | sim para produção |
| Teste moderado | reconhecimento, compreensão, desconforto e ética | antes de direção final | sim para declarar experiência validada |
| RUM/CrUX | LCP/INP/CLS p75 real | pós-lançamento com tráfego suficiente | sim para declarar field-green |

Se uma camada não rodou, o estado é `não testado`; não converter em PASS por inferência de outra camada.

## 4. Datasets obrigatórios

### 4.1 Dataset mínimo de estreia

- CANELA;
- LAVANDA CELESTIAL;
- MIRRA;
- OLÍBANO;
- ALECRIM.

Cada registro precisa de ID, nome, categoria `incenso`, símbolo/path, terminal, padrão monocromático, cadência e vínculo ao produto/rota. Ingrediente, nota, intensidade, fumaça e efeito permanecem ausentes ou `[A VALIDAR]` até fonte real.

### 4.2 Dataset de escala

Criar fixture de teste com `50` SKUs para estressar arquitetura, sem afirmar que é o número final do catálogo. Deve conter:

- nomes curtos, longos, com acento e palavras compostas;
- disponibilidade `in_stock`, `out_of_stock` e `unknown`;
- pelo menos dois preços com mesma ordenação secundária;
- conteúdo faltante tratado explicitamente;
- símbolos distintos e padrões monocromáticos;
- os cinco SKUs de estreia marcados por `featuredLaunchIds`.

Gates:

- nenhum SKU ativo sem símbolo;
- nenhum símbolo apontando para SKU inexistente;
- nenhum ID/path/terminal duplicado;
- cinco destaques não escondem o link/lista dos demais;
- grid com 50 cards não inicializa 50 scopes, timelines ou canvases;
- filtro/paginação preservam URL, ordem DOM, foco e acesso sem JS.

## 5. Matriz responsiva 320–1920

### 5.1 Viewports automatizados Chromium

| Perfil | Viewport | Home/hero | Mapa/PLP | PDP | Cart/checkout |
|---|---:|---|---|---|---|
| mobile mínimo | `320×568` | obrigatório | obrigatório | obrigatório | obrigatório |
| mobile compacto | `360×800` | obrigatório | amostra | obrigatório | amostra |
| mobile referência | `390×844` | obrigatório | obrigatório | obrigatório | obrigatório |
| mobile amplo | `430×932` | obrigatório | amostra | obrigatório | amostra |
| tablet portrait | `768×1024` | obrigatório | obrigatório | obrigatório | obrigatório |
| tablet/desktop estreito | `1024×768` | obrigatório | obrigatório | obrigatório | obrigatório |
| desktop referência | `1440×900` | obrigatório | obrigatório | obrigatório | obrigatório |
| desktop amplo | `1920×1080` | obrigatório | obrigatório | obrigatório | amostra |
| mobile landscape | `844×390` | obrigatório | obrigatório | obrigatório | amostra |
| mobile landscape amplo | `932×430` | amostra | obrigatório | obrigatório | amostra |

### 5.2 Asserções por viewport

Em cada célula obrigatória:

- `scrollWidth === clientWidth`;
- primeiro frame contém H1, categoria `incenso`, CTA e fallback;
- visual Hero cabe sem encobrir texto/CTA;
- organismo mobile `<= min(62svh, 360px)` quando implementado;
- seletor não corta nomes nem depende apenas de swipe;
- controles `>=44×44 CSS px`;
- Mapa pode virar lista e não cria scroll horizontal da página;
- cards refluem `1/2/3` colunas segundo espaço real;
- nome, preço, estoque e CTA nunca truncam informação crítica;
- PDP fechada/aberta/macro reserva dimensões e não desloca a compra;
- teclado virtual, safe area e orientação permanecem validação física no iOS/Android.

Teste técnico base:

```ts
const overflow = await page.evaluate(() =>
  document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
expect(overflow).toBe(0);
```

Não usar screenshot como única prova de overflow ou conteúdo cortado.

### 5.3 Estratégia cross-browser

- matriz completa de widths em Chromium;
- fluxo crítico `390×844` e `1440×900` em Chromium, Firefox e WebKit;
- `320×568` obrigatório em WebKit para regressões de texto/controles;
- Safari/iPhone físico e Chrome/Android intermediário permanecem gates manuais de produção.

## 6. Storytelling seção a seção

Ordem mínima a provar na Home:

```text
marca/categoria
→ tese "O ar deixa um rastro"
→ escolha dos cinco destaques
→ Mapa do Ar ou explicação comparativa
→ matéria/prova
→ coleção completa
→ segurança/políticas
→ navegação de continuidade
```

Gates automatizados:

- um H1; H2s em ordem DOM coerente;
- cada seção tem `aria-labelledby` ou heading próprio;
- PageDown, Space e scroll wheel não são capturados;
- nenhum conteúdo crítico nasce em `opacity:0`;
- skip link continua levando ao `<main>`;
- `Ver todos os incensos` aparece antes ou junto da experiência avançada;
- o usuário pode ignorar Mapa/Three e chegar à coleção em até uma ação;
- retorno à viewport não reinicia autoplay;
- âncora/deep link chega a conteúdo legível mesmo com JS desligado;
- ordem visual e DOM não divergem por CSS `order`.

Validação humana:

- cinco participantes descrevem a sequência com palavras próprias;
- nenhum participante entende o rastro como prova de aroma, ingrediente, efeito ou fumaça real;
- a animação não retarda nem desvia a ação principal;
- participantes conseguem sair da experiência, pausar/reduzir e ver lista sem coerção.

## 7. Atenção ética e anti-dark-pattern

### 7.1 Hard gates

- sem countdown, urgência ou escassez não autoritativa;
- sem estoque fictício, preço riscado inventado ou “mais vendido” sem fonte;
- sem CTA primário visualmente disfarçado de consentimento;
- sem assinatura, newsletter, tracking ou add-on pré-selecionado;
- sem impedir voltar, fechar, reduzir, recusar ou ver lista;
- sem confirmshaming;
- sem mover CTA enquanto pointer se aproxima;
- sem som/autoplay de mídia;
- sem loop visual persistente competindo com leitura/compra;
- sem estímulo subliminar, frames ocultos, símbolos religiosos/médicos disfarçados ou mensagens abaixo do limiar consciente;
- sem variação de animação para pressionar usuários vulneráveis;
- confirmação de sacola somente depois de sucesso real do adapter;
- erro nunca usa o mesmo glyph/efeito de sucesso.

### 7.2 Attention budget

| Momento | Máximo |
|---|---|
| Entrada do Hero | uma sequência finita, até 900 ms |
| Seleção | somente o SKU acionado |
| Mapa | um glyph por vez |
| Reentrada no viewport | estado final, sem replay |
| PDP | animação somente após `Abrir e ver` |
| Sacola | confirmação única até 220 ms |
| Cart/checkout | zero ambiente/Three |

Teste de replay: sair e voltar ao Hero três vezes; o contador de trace automático permanece `1` por montagem. Seleção explícita pode tocar sua própria resposta.

### 7.3 Revisão simbólica

Automação detecta duplicidade técnica, não intenção subliminar. Antes de aprovar os símbolos:

- revisão independente de cada forma em preto/branco, espelhada e reduzida;
- registrar se lembra letra, número, símbolo religioso, médico, político ou marca alheia;
- pesquisa de colisão marcária pertence à frente jurídica/branding;
- teste cego pergunta “o que você vê?” sem sugerir fumaça, cura ou espiritualidade;
- qualquer interpretação recorrente conflitante volta para design.

## 8. Símbolo, vareta e fumaça vertical

### 8.1 Unit/invariantes do símbolo

- toda curva começa na mesma fonte inferior;
- pontos progridem verticalmente da base ao terminal;
- coordenadas são finitas e ficam no envelope aprovado;
- `pathD + terminalPathD + patternId` é único;
- frame final Anime e amostragem Three derivam do mesmo preset;
- o SVG funciona em `16×28`, `24×40`, `currentColor` e uma cor;
- `neutral` nunca aparece como SKU comprável.

Para o catálogo de escala, não exigir que 50 símbolos sejam reconhecidos sem nome em 16 px. Exigir ausência de duplicidade, agrupamento coerente e label textual sempre presente. A meta de pareamento visual forte aplica-se aos cinco destaques; o restante precisa de teste progressivo.

### 8.2 Vareta áspera/realista

Automação verifica arquivo, alt, dimensões, formato e disclosure; não consegue provar realismo ou fidelidade material. Gate humano:

- comparar com fotografia aprovada da vareta física;
- conferir superfície irregular/áspera, espessura, ponta e cabo reais;
- reprovar cilindro liso “indiano genérico” se não corresponder ao produto;
- render conceitual precisa de legenda explícita até existir foto real;
- não inferir composição pelo aspecto.

### 8.3 Fumaça vertical

- origem visual alinhada à ponta da vareta;
- trajetória sobe de base para topo; oscilações laterais não podem inverter a leitura principal;
- pointer não altera SKU, origem ou direção vertical;
- frame final coincide com glyph;
- sem fumaça colorida apresentada como comportamento real;
- reduced motion mostra o símbolo vertical estático;
- Three não usa `Math.random()` para identidade.

## 9. Teclado, foco e leitor de tela

### 9.1 Fluxo de teclado obrigatório

```text
skip link
→ marca/navegação
→ CTA primário/secundário
→ seletor de aromas
→ pausar/reduzir/ver lista
→ Mapa do Ar
→ grid/links de produto
→ PDP/inspeção
→ quantidade/adicionar
→ sacola/CEP/checkout
```

Gates:

- foco sempre visível e não encoberto;
- selector usa radios nativos ou padrão ARIA completo; setas mudam opção, Tab sai do grupo;
- troca rápida por teclado mantém último item e não rouba foco;
- `Ver lista sem mapa` move foco somente após ação explícita para heading/lista apropriado;
- inspeção PDP fecha e devolve foco ao acionador;
- canvas `aria-hidden="true"`, `tabIndex=-1`, `pointer-events:none`;
- nenhum elemento puramente visual entra na ordem de tabulação;
- remoção/undo da sacola preserva comportamento já validado;
- animação não produz `scrollIntoView()` inesperado.

### 9.2 Árvore acessível automatizada

- controle anuncia `Canela, incenso HEALS, selecionado/não selecionado`;
- mini-glyph dentro do controle é decorativo para evitar nome duplicado;
- painel selecionado possui nome e descrição factual;
- status técnico GPU nunca vira live region;
- hover não dispara anúncio;
- mudança explícita de SKU anuncia no máximo uma vez;
- cart anuncia sucesso uma vez por `eventKey` novo;
- `[A VALIDAR]` permanece texto legível e não é escondido por `aria-label` otimista.

### 9.3 Gate humano

| Stack | Tarefa mínima |
|---|---|
| NVDA + Firefox/Chrome | selecionar cinco aromas, abrir lista, PDP, adicionar e chegar à sacola |
| VoiceOver + Safari macOS/iOS | rotor/headings, radiogroup, inspeção, orientação |
| TalkBack + Chrome Android | touch exploration, controles, scroll e anúncio de sucesso |
| Zoom 200% / texto ampliado | fluxo completo sem clipping ou perda |

Registrar fala observada, versão, SO, navegador e limitações. Axe verde não substitui esta etapa.

## 10. Reduced motion, reduced data e forced colors

### 10.1 Reduced motion

Asserções:

- `data-air-mode="reduced"` ou estado equivalente;
- glyph selecionado aparece completo imediatamente;
- nenhuma timeline de draw/deslocamento é iniciada;
- Three não é solicitado nem inicializado;
- trocar variante atualiza nome, estado e link;
- PDP muda vistas sem transição espacial;
- comércio completo;
- não existe botão para sobrepor automaticamente a preferência do SO.

### 10.2 Reduced data/saveData

Playwright não possui opção nativa universal para reduced-data. Instalar o stub antes da navegação e registrar requests:

```ts
await context.addInitScript(() => {
  const original = window.matchMedia.bind(window);
  window.matchMedia = (query: string) => {
    if (query === '(prefers-reduced-data: reduce)') {
      return {
        matches: true,
        media: query,
        onchange: null,
        addEventListener() {},
        removeEventListener() {},
        addListener() {},
        removeListener() {},
        dispatchEvent() { return false; },
      } as MediaQueryList;
    }
    return original(query);
  };
});
```

Executar caso separado para `navigator.connection.saveData=true`. Em ambos:

- zero request do chunk `createAirOrganismRuntime`/Three;
- usar imagem responsiva econômica, não o PNG de 2,46 MB;
- conteúdo e seleção completos.

### 10.3 Forced colors

- contexto `forcedColors: 'active'`;
- paths usam `currentColor`/cores do sistema;
- seleção visível por outline/padrão, não apenas tom do SKU;
- canvas oculto ou incapaz de suprimir SVG;
- foco e CTAs visíveis;
- screenshot + axe em Home, Mapa e PDP.

## 11. WebGL e lifecycle

### 11.1 Cenários automatizados

| Cenário | Preparação | Gate |
|---|---|---|
| sem WebGL2 | stub de `getContext('webgl2') → null` | SVG, seleção e CTA intactos |
| runtime throw | intercept/import adapter de teste lança erro | fallback com reason; zero pageerror |
| context lost | `WEBGL_lose_context` ou evento cancelável | canvas sai; SVG assume imediatamente |
| context restored 1× | restaurar extensão/evento | no máximo uma tentativa silenciosa |
| segunda perda | perder novamente | fallback até remount |
| fora da viewport | scroll abaixo do Hero | loop parado |
| aba oculta | teste unit/integration de `visibilitychange`; CDP/manual no E2E | loop parado |
| pause | botão explícito | frame estável e 0 FPS |
| reduced dinâmico | mudar media query durante load/ready | import/token antigo não cria GPU |
| unmount | navegar Home↔PDP | observers/listeners/runtime disposed |

Para o teste de perda real em Chromium:

```ts
await page.locator('[data-air-scene] canvas').evaluate((canvas) => {
  const gl = canvas.getContext('webgl2');
  gl?.getExtension('WEBGL_lose_context')?.loseContext();
});
```

O teste precisa esperar `ready` antes, e deve pular com motivo explícito se a extensão não existir; evento sintético cobre o handler, não o driver/GPU.

### 11.2 Instrumentação testável

Expor somente em dev/test, via atributos ou adapter:

- `data-air-state` (`fallback|queued|loading|ready|paused`);
- `data-air-mode`;
- `data-air-variant`;
- `data-air-tier`;
- `data-air-fallback-reason`;
- `data-air-loop` (`running|stopped`).

Não expor GPU string, pointer ou identificadores de usuário. Testes não devem depender de shader pixel-perfect.

### 11.3 Leak gate

- unit: `dispose()` idempotente; cada geometria/material/texture recebe `dispose` uma vez;
- integration: Strict Mode mount/unmount não duplica listeners;
- E2E: 20 ciclos Home↔PDP e 50 seleções, zero pageerror, um canvas máximo;
- manual/trace: heap, contextos e `renderer.info.memory` estabilizam após GC/teste;
- não aprovar ausência de leak apenas por `canvas.count === 1`.

## 12. Hidratação e concorrência

### 12.1 Asserções

- HTML inicial contém H1, CTAs, cinco nomes e glyphs completos;
- primeiro client render é idêntico ao SSR;
- nenhum ID SVG aleatório/dinâmico diverge;
- media/storage/network só são lidos em effect;
- camada animada overlay começa sem esconder fallback;
- 50 trocas rápidas: última escolha vence;
- callback de animação cancelada não altera nome, `aria-checked`, URL ou Three;
- navegar durante `await import()` não gera setState após unmount;
- mudança de preference durante load invalida generation token;
- `createLayout()` mede antes e anima depois do commit; DOM real acompanha ordem visual.

### 12.2 E2E de console

Instalar listeners antes de `goto()`:

```ts
const problems: string[] = [];
page.on('console', (message) => {
  if (message.type() === 'warning' || message.type() === 'error') {
    problems.push(message.text());
  }
});
page.on('pageerror', (error) => problems.push(error.message));

await page.goto('/');
await page.reload();
expect(problems).toEqual([]);
```

Rodar em `320`, `390`, `1440`, full/reduced/no-WebGL. Não filtrar hydration warnings por texto para “deixar verde”.

## 13. Performance: CLS, LCP, INP e bundles

### 13.1 Gates já definidos

| Métrica | Alvo |
|---|---:|
| LCP p75 campo | `<=2,5 s` mobile/desktop |
| INP p75 campo | `<=200 ms` mobile/desktop |
| CLS p75 campo | `<=0,1` |
| Lighthouse mobile | `>=90`, LCP `<=2,5 s`, TBT `<=200 ms` |
| Lighthouse desktop | `>=95`, LCP `<=2,0 s`, TBT `<=150 ms` |
| JS inicial sem Three | hard `<=180 KiB gzip`, alvo `<=160 KiB` |
| chunk Three | hard `<=130 KiB gzip`, alvo `<=100 KiB` |
| JS total com cena | hard `<=300 KiB gzip`, alvo `<=260 KiB` |
| visual principal | hard `<=250 KiB`, alvo `<=150 KiB` |
| CSS | hard `<=20 KiB gzip`, alvo `<=15 KiB` |

### 13.2 CLS determinístico de interação

Em Chromium, instalar `PerformanceObserver` antes da carga e acumular `layout-shift` sem input recente. Medir separadamente:

- load do raster;
- SVG → canvas ready;
- cinco seleções;
- abrir/recolher Mapa;
- ordenar cards;
- abrir/fechar PDP 2.5D;
- feedback de cart.

Hard gate de implementação: cada ação motion planejada adiciona `0` ao CLS e a rota permanece `<=0,1`. Transform visual não autoriza sobrepor/encobrir conteúdo.

### 13.3 LCP

- três runs por rota no build de preview HTTPS comprimido;
- identificar o elemento LCP, URL e bytes;
- Home atual precisa provar que o raster de caixas não transforma o LCP em download de 2,46 MB;
- Three inicia pós-LCP/idle ou após interação, conforme gate;
- E2E pode verificar prioridade/waterfall, mas threshold de tempo fica no Lighthouse/trace, não em asserção Playwright flakey.

### 13.4 INP

Interações de laboratório:

- abrir menu mobile enquanto Hero está ativo;
- trocar SKU 20 vezes;
- pausar/reduzir;
- abrir Mapa/lista;
- ordenar 50 cards;
- abrir PDP 2.5D;
- adicionar, incrementar, remover/undo e simular CEP.

Usar trace/event timing como diagnóstico. Só dados de campo com volume suficiente aprovam INP p75; não chamar `performance.now()` ao redor de `click()` de INP real.

### 13.5 GPU

- mobile low: DPR `<=1`, FPS teto `30`, repouso `0 FPS`;
- Home um contexto, alvo `<=6` draw calls e `<1k` triângulos; hard `<=10/30k`;
- nenhuma long animation frame `>50 ms` atribuível ao Hero no aparelho de referência; `>100 ms` é bloqueio absoluto;
- trace Android intermediário e iPhone físico, incluindo temperatura/energia;
- coleção, cart e checkout não solicitam Three.

## 14. Commerce e continuidade do SKU

Gates unit/integration/E2E:

- `variantId` escolhido no card/Mapa corresponde à rota/PDP;
- glyph e nome da PDP correspondem ao produto, sem depender de storage global;
- seleção visual não muda preço, estoque ou disponibilidade;
- `unknown` e `out_of_stock` continuam bloqueando compra;
- quantidade inválida preserva valor e associação de erro;
- sucesso incrementa `eventKey` uma vez;
- erro, timeout e click bloqueado não disparam glyph de sucesso;
- double click não duplica linha fora do contrato do adapter;
- reload conserva o carrinho pelo mecanismo existente;
- remover/undo mantém quantidade exata e foco/status;
- carrinho/checkout não montam canvas nem baixam Three;
- narrativa/motion não cobre totals, política ou saída;
- nenhum SKU conceitual pode ser comprado como real sem dados autoritativos.

Caso de escala: adicionar SKUs na posição 1, 25 e 50 da fixture; conferir título, `variantId`, subtotal, persistência e remoção isolada.

## 15. SEO, noindex e catálogo amplo

### 15.1 Fixture/conceito — hard gate atual

- `/robots.txt` permite crawl para que o meta seja lido;
- todas as rotas HTML, inclusive os 50 PDPs da fixture, retornam `noindex`;
- cart, checkout, busca e políticas provisórias também são `noindex`;
- nenhum sitemap de produtos fictícios é publicado;
- nenhum canonical/schema afirma domínio, preço, estoque, review, composição ou organização não aprovados;
- preview público exige autenticação no edge; robots não é controle de acesso.

O teste atual cobre `robots()` e apenas o meta da Home. Ampliar para matriz de rotas e verificar também `nofollow` conforme contrato.

### 15.2 Loja real — gate separado e futuro

Remover a palavra `Demonstração` não muda indexação automaticamente. O switch para indexável só pode ocorrer após:

- domínio/canonical HTTPS aprovado;
- catálogo, disponibilidade, preço e políticas reais;
- sitemap real e paginação/canonicals testados;
- JSON-LD factual sem reviews/ratings inventados;
- 404/redirect de SKUs removidos;
- Search Console/robots/header `X-Robots-Tag` coerentes;
- aprovação explícita do release owner.

Teste de segurança: variável ausente ou inválida mantém `noindex` por padrão; nunca fail-open para indexação.

## 16. Testes exatos a adicionar

### 16.1 Unit — `tests/unit/air-presets.test.ts`

1. `cobre todo SKU ativo e não contém órfãos`;
2. `mantém cinco featuredLaunchIds únicos e válidos`;
3. `distingue neutral de SKU vendável`;
4. `rejeita path, terminal e pattern duplicados`;
5. `mantém pontos finitos dentro do envelope`;
6. `mantém fonte comum e progressão vertical`;
7. `gera SVG e amostragem Three do mesmo preset`;
8. `suporta fixture de 50 SKUs sem colisão de ID`.

### 16.2 Unit — `tests/unit/air-state.test.ts`

1. `last-choice-wins invalida token anterior`;
2. `pause conclui em frame reconhecível`;
3. `system reduce vence preferência local`;
4. `reduced-data e saveData bloqueiam Three`;
5. `APIs ausentes escolhem tier conservador`;
6. `downgrade tem histerese e nunca sobe na sessão`;
7. `segunda context loss fixa fallback até remount`.

### 16.3 Unit — `tests/unit/air-geometry.test.ts`

1. `ribbon produz índices válidos e bounds finitos por tier`;
2. `contagem respeita budget por tier`;
3. `identidade não usa Math.random`;
4. `dispose é idempotente`;
5. `resize estático agenda um render`;
6. `repouso chama setAnimationLoop(null)`.

### 16.4 Integration — `tests/integration/air-experience.test.tsx`

1. `SSR contém H1 CTAs cinco nomes e glyphs`;
2. `hidrata sem alterar o primeiro markup`;
3. `radiogroup atualiza label e aria-checked`;
4. `setas percorrem e Tab sai do grupo`;
5. `troca rápida termina no último SKU`;
6. `hover não anuncia live region`;
7. `reduzir desmonta runtime e preserva seleção`;
8. `mudança dinâmica de media query reconstrói somente quando permitido`;
9. `canvas é decorativo e não focável`;
10. `unmount reverte scopes observers listeners e import tardio`.

### 16.5 Integration — `tests/integration/air-commerce.test.tsx`

1. `PDP mantém variantId e glyph do produto`;
2. `feedback dispara uma vez após sucesso`;
3. `erro e inventory unknown não disparam sucesso`;
4. `reduced motion mantém mensagem sem animação`;
5. `PDP inspector devolve foco ao fechar`;
6. `produto 1 25 e 50 mantêm identidade e subtotal`.

### 16.6 E2E — `tests/e2e/coreografia.spec.ts`

1. `primeiro frame é completo antes de ready`;
2. `seleciona os cinco destaques por pointer teclado e touch`;
3. `última de 50 trocas rápidas vence`;
4. `reentrada não repete autoplay`;
5. `Mapa alterna para lista sem perder foco`;
6. `grid de 50 itens filtra ordena e preserva ordem DOM`;
7. `Home → card → PDP → cart preserva SKU`;
8. `PDP 2.5D abre lateral macro e fecha com retorno de foco`;
9. `cart e checkout não baixam Three`;
10. `jornada completa não depende do canvas`.

### 16.7 E2E — `tests/e2e/coreografia-fallbacks.spec.ts`

1. `reduced motion mantém SVG e zero Three request`;
2. `reduced data mantém conteúdo e usa mídia econômica`;
3. `saveData mantém SVG e zero Three request`;
4. `WebGL2 null preserva seleção e CTA`;
5. `context loss usa fallback sem pageerror`;
6. `forced colors preserva glyph seleção e foco`;
7. `JavaScript disabled preserva história catálogo e navegação`;
8. `reload full/reduced/no-WebGL não emite hydration warning`;
9. `offscreen e hidden param o loop`;
10. `20 navegações não acumulam canvas/runtime`.

### 16.8 E2E — atualizar `tests/e2e/storefront.spec.ts`

- corrigir locator stale do CTA;
- manter fluxo comercial existente;
- ampliar noindex para rotas críticas;
- mover casos específicos de Coreografia aos novos specs para evitar um arquivo monolítico;
- não remover histórico de checkout vazio, inventory unknown, 404, busca/filtro e axe.

### 16.9 Scripts/gates

- ampliar `scripts/a11y-smoke.mjs` para Home, Mapa/PLP, PDP, cart e checkout em estados full/reduced/fallback;
- adicionar `scripts/check-bundle-budget.mjs` para gzip e assets principais;
- adicionar Lighthouse CI/runner com três execuções por rota no preview;
- manter `workers:1` enquanto o servidor Vinext local não suportar concorrência estável;
- reexecutar determinismo CSS após novos CSS Modules.

## 17. Matriz de release

| Gate | Local concept | Preview autenticado | Produção |
|---|:---:|:---:|:---:|
| lint/typecheck/unit/integration | obrigatório | obrigatório | obrigatório |
| E2E Chromium/cross-browser | obrigatório | obrigatório | obrigatório |
| noindex de fixture | obrigatório | obrigatório | não aplicável após go-live autorizado |
| aviso ou transação desabilitada para dados fictícios | obrigatório | obrigatório | não aplicável com dados reais |
| zero dark patterns/claims falsos | obrigatório | obrigatório | obrigatório |
| bundle/assets hard gate | obrigatório | obrigatório | obrigatório |
| Lighthouse em origem comprimida | informativo local | obrigatório | obrigatório |
| trace GPU real | pendente permitido, rotulado | obrigatório para Three ativo | obrigatório |
| leitor de tela/dispositivo físico | pendente permitido, rotulado | necessário antes de público amplo | obrigatório |
| commerce/backend real | não | não | obrigatório |
| RUM/CrUX p75 | sem dados | sem dados | obrigatório para declarar field-green |

## 18. Definição de pronto

A implementação pode ser chamada `integrated` quando código e suítes automatizadas passarem. Só pode ser chamada `lab-validated` quando cross-browser, Lighthouse, GPU/device e leitores de tela tiverem evidência. Só pode ser chamada `field-validated` com p75 real e volume suficiente.

Checklist final:

- [ ] Uma fonte de verdade para símbolos, Anime e Three.
- [ ] Cinco destaques únicos e catálogo de escala funcional.
- [ ] Símbolo, vareta e fumaça vertical aprovados com referência real/conceitual explícita.
- [ ] Jornada seção a seção funciona sem JS e sem canvas.
- [ ] Zero dark pattern, persuasão subliminar ou claim não provado.
- [ ] Reduced motion/data, forced colors e fallbacks equivalentes.
- [ ] Hidratação sem warning/error e cleanup sem acúmulo.
- [ ] Visual principal dentro de 250 KiB e Three dentro do budget.
- [ ] Commerce não recebe confirmação visual falsa.
- [ ] Fixture inteira permanece noindex; produção só indexa por decisão explícita.
- [ ] Evidência distingue automatizado, manual, lab e campo.

Até esses itens serem demonstrados, o estado correto é `spec` ou `prototype em implementação`, nunca “site finalizado”.
