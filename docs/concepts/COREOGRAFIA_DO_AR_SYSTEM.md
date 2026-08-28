# HEAL / HEALS — Sistema Coreografia do Ar

Data: 2026-08-28  
Owner conceitual: HEAL-32 · Experience / Motion Direction  
Escolha do usuário: **B — Coreografia do ar**  
Estado: `DIREÇÃO ESCOLHIDA PARA DESENVOLVIMENTO CONCEITUAL; NÃO É IDENTIDADE FINAL; NÃO IMPLEMENTADO`  
Escopo: sistema de marca-produto, embalagem e experiência digital para cinco variantes candidatas.

## 0. Contrato de verdade

Este documento transforma a direção escolhida em um sistema testável. Ele não afirma que os produtos, aromas, ingredientes, intensidades, níveis de fumaça, duração, origem, dimensões ou embalagens já existem.

As variantes fornecidas são:

- CANELA;
- LAVANDA CELESTIAL;
- MIRRA;
- OLÍBANO;
- ALECRIM.

Até a validação do catálogo, esses termos são **nomes candidatos de variantes**. Eles não provam que o ingrediente correspondente está na fórmula nem que o aroma percebido reproduz a matéria nomeada. Nenhum visual deste sistema pode apresentar folhas, flores, cascas, resinas, grãos ou efeitos como fatos sem evidência do produto.

Regra de lançamento:

```text
nome fornecido pelo usuário
≠ composição validada
≠ nota olfativa validada
≠ efeito sobre pessoa ou ambiente
```

Todo protótipo deve manter `CONCEITO` ou `DADOS A VALIDAR`. A publicação comercial fica bloqueada até cada campo ter fonte, owner e data.

## 1. Norte criativo

### Tese

> **O ar deixa um rastro.**

A HEAL não tenta transmitir cheiro pela tela. Ela dá forma à escolha: cada HEAL tem um rastro visual proprietário, reconhecível no movimento e quando imóvel. O sistema comum faz os cinco produtos parecerem uma família; geometria, ritmo e marca terminal fazem cada variante continuar distinta.

### Promessa da experiência

> Tornar a escolha de um incenso visível antes que o aroma possa ser sentido.

Essa frase fala sobre interface e decisão, não sobre desempenho do produto.

### Hierarquia verbal obrigatória

```text
HEAL                              marca
HEALS — os incensos da HEAL      definição do sistema
[VARIANTE] — incenso HEALS       produto individual
```

No primeiro contato de toda jornada, `HEALS` não aparece sozinho. Navegação, busca, card, PDP, sacola, recibo e SEO continuam usando `incenso(s)`.

## 2. O organismo visual comum

O **Organismo do Ar** é uma composição vertical criada em uma grade modular `24 × 40`. Não é ilustração literal de fumaça. É um código gráfico com cinco partes invariáveis:

1. **Fonte:** ponto sólido na base. Representa o início do rastro; não representa uma brasa real.
2. **Eixo:** linha vertical curta que ancora todas as variantes e estabiliza leitura em miniatura.
3. **Rastro principal:** caminho contínuo específico do SKU.
4. **Contrarrastro:** linha mais fina ou vazada, deslocada do caminho principal, que cria profundidade sem ruído.
5. **Marca terminal:** pequeno corte/traço no final, útil para reconhecimento monocromático.

```text
        marca terminal
             ─
         ╭── rastro principal
        ╱ ·  contrarrastro
       │
       │ eixo comum
       ● fonte comum
```

### Regras formais

- O glyph final precisa funcionar a `16 × 28 px`, `24 × 40 px`, em hot stamp de uma cor e em relevo seco.
- Traço mínimo de produção e tamanho de janela dependem de teste com gráfica/fabricante; nenhum valor industrial é aprovado aqui.
- A silhueta externa e a distribuição de massa precisam distinguir o SKU sem cor e sem movimento.
- Não usar lua, estrela, constelação, aura, mandala, olho, chakra, chama ritual ou símbolo religioso.
- Não formar letras ou números escondidos.
- A fumaça digital pode ser orgânica; o glyph de identidade continua geometricamente estável.
- A animação sempre termina exatamente no glyph estático usado na caixa.

## 3. Gramática por variante

As associações abaixo são **códigos de identidade atribuídos**, não descrição de aroma, ingrediente ou efeito.

| Variante | Código interno candidato | Rastro / geometria | Ritmo de construção | Marca terminal | Padrão monocromático | Distinção em miniatura |
|---|---|---|---|---|---|---|
| CANELA | `HLS-CNL` | dois contragiros curtos formando um `S` angular e compacto | `curto · curto · pausa · médio` | corte diagonal ascendente | hachura diagonal simples `/` | massa concentrada no terço médio e duas mudanças claras de direção |
| LAVANDA CELESTIAL | `HLS-LVC` | dois arcos verticais amplos, assimétricos, com grande vazio central | `longo · pausa · longo` | barra horizontal aberta | pontos espaçados `·` | variante mais alta e mais aberta; sem estrelas ou órbitas |
| MIRRA | `HLS-MRA` | dobra interna compacta, semelhante a dois colchetes que se aproximam sem fechar | `médio · pausa curta · médio` | bloco quadrado pequeno | campo sólido interrompido | centro visual mais denso e largura mais baixa |
| OLÍBANO | `HLS-OLB` | coluna central com três retornos laterais alternados | `médio · médio · médio`, cadência regular | terminal duplo paralelo | barras verticais `‖` | única assinatura modular em três patamares |
| ALECRIM | `HLS-ALC` | linha estreita com quatro inflexões alternadas e ascendentes | `curto × 4 · pausa final` | corte em `V` aberto | chevrons mínimos `›` | mais estreita e mais segmentada, sem folha desenhada |

### O que os códigos não querem dizer

- O rastro de CANELA não significa calor, energia ou estimulação.
- A abertura de LAVANDA CELESTIAL não significa calma, sono, transcendência ou “elevação”.
- A densidade de MIRRA não significa profundidade olfativa, tradição ou efeito espiritual.
- A cadência de OLÍBANO não significa permanência, purificação ou uso religioso.
- As inflexões de ALECRIM não significam frescor, foco, memória ou vitalidade.

Essas leituras podem surgir no público. Se forem recorrentes, o sistema deve ser ajustado — não promovê-las como benefício.

## 4. Sistema de reconhecimento redundante

Nenhum SKU depende de um único canal. Cada apresentação usa pelo menos quatro:

1. nome completo em texto;
2. código curto acessível e técnico;
3. glyph do rastro;
4. padrão/hachura monocromático;
5. cor de acento, quando disponível;
6. alt text ou nome acessível em interfaces digitais.

### Matriz de sobrevivência

| Contexto | Nome | Glyph | Padrão | Cor | Movimento | Regra |
|---|:---:|:---:|:---:|:---:|:---:|---|
| Caixa frontal | obrigatório | grande | discreto | opcional | — | `INCENSO HEALS` aparece próximo ao nome |
| Lombada | obrigatório | pequeno | obrigatório | opcional | — | leitura horizontal ou vertical testada fisicamente |
| Thumbnail 80 px | obrigatório | 24×40 | opcional | opcional | não | nunca usar caixa sem legenda |
| Card mobile 320 px | obrigatório | 24×40 | obrigatório | opcional | sob ação | um único card se move por vez |
| Seletor compacto | nome abreviado acessível | 16×28 | obrigatório | opcional | não | alvo ≥44 px |
| Reduced motion | obrigatório | final | obrigatório | opcional | não | nenhum significado perdido |
| Forced colors | obrigatório | `currentColor` | contorno | não | não | contraste pelo sistema operacional |
| Impressão 1 cor | obrigatório | positivo/negativo | obrigatório | não | — | reconhecer sem retícula delicada |
| Relevo seco | obrigatório ao lado | simplificado | não | não | — | apenas fonte/eixo/rastro/terminal |

### Cor

A cor é uma camada candidata de navegação, não identidade primária. A paleta dos cinco SKUs deve ser definida depois de:

- prova de impressão em papel/material escolhido;
- contraste WCAG nos pares digitais;
- teste de daltonismo e escala de cinza;
- confirmação de que a cor não cria promessa indevida sobre ingrediente/aroma.

Não há hex oficial neste estágio.

## 5. Como o sistema entra na caixa

### Estrutura comum recomendada para protótipo

Uma única estrutura/dieline para os cinco SKUs, com **janela curva comum** e variação gráfica impressa. Evitar cinco facas diferentes antes de custos, resistência e operação serem conhecidos.

A janela física só avança se testes confirmarem:

- que o produto não escapa nem perde partículas;
- que luz, umidade, toque e transporte não prejudicam conservação;
- que filme/material necessário é compatível com a intenção ambiental real;
- que o bastão visível corresponde ao produto vendido;
- que o formato passa por queda, vibração e empilhamento.

### Frente — ordem obrigatória

```text
HEAL

[glyph do SKU / janela curva]

[VARIANTE]
HEALS — INCENSO
[formato, quantidade e conteúdo somente após validação]
```

`HEALS — INCENSO` vence qualquer frase conceitual em hierarquia comercial.

### Lombada

- `HEAL`;
- nome da variante;
- `INCENSO HEALS`;
- glyph reduzido + padrão monocromático;
- quantidade somente quando real.

### Verso e laterais

Campos obrigatórios quando existirem dados aprovados:

- descrição olfativa separada de composição;
- lista de ingredientes/composição nos termos aplicáveis;
- formato, quantidade, dimensão e duração com método/fonte;
- origem/fabricante/importador e lote;
- modo de uso e segurança;
- armazenamento e descarte;
- código de barras, SAC e obrigações regulatórias/comerciais.

Campos conceituais podem aparecer como `[A VALIDAR]` em mockup interno. Não podem aparecer vazios ou inventados no produto comercial.

### O que pode aparecer graficamente

- glyph proprietário do SKU;
- padrão correspondente;
- janela que mostra o bastão real;
- fotografia/macro real com proveniência;
- frase `O ar deixa um rastro.` como assinatura secundária;
- instrução `Conheça os HEALS — incensos da HEAL.` na caixa de entrada/kit.

### O que não pode aparecer sem prova

- botânicos como declaração implícita de composição;
- fumaça com densidade/cor apresentada como comportamento real;
- selos `natural`, `artesanal`, `não tóxico`, `baixo teor de fumaça`, origem ou sustentabilidade;
- benefícios emocionais, espirituais, terapêuticos ou de qualidade do ar;
- duração, rendimento, número de bastões ou dimensões estimados;
- estrelas, planetas ou símbolos espirituais para “explicar” LAVANDA CELESTIAL.

## 6. Organismo digital

### Estados do organismo

| Estado | Visual | Função |
|---|---|---|
| `rest` | glyph estático + fonte | reconhecimento imediato |
| `trace` | rastro é construído na cadência do SKU | revelar identidade após ação/entrada controlada |
| `compare` | cinco glyphs estáticos alinhados | comparar sem espetáculo |
| `selected` | glyph escolhido ganha contrarrastro e label | confirmar seleção explícita |
| `inspect` | rastro se aproxima da caixa/macro | conectar identidade e objeto |
| `confirmed` | fonte acende uma vez e retorna | confirmar evento real |
| `reduced` | estado final estático | equivalência sem movimento |

### Regra de simultaneidade

- Hero: um organismo ativo.
- Coleção: no máximo um card animando após foco, hover ou tap explícito.
- Comparador: cinco glyphs estáticos; só o selecionado ganha transição.
- PDP: uma caixa/organismo ativo.
- Carrinho/checkout: nenhum Three.js e nenhuma animação contínua.

## 7. Anime.js — coreografia permitida

Uso proposto com Anime.js 4.5, sujeito a protótipo e QA:

| Momento | Técnica | Função | Limite |
|---|---|---|---|
| Construção do glyph | `svg.createDrawable()` + `createTimeline()` | desenhar o rastro no ritmo do SKU | o glyph completo já existe sem JS |
| Troca de variante no hero | crossfade + draw; `svg.morphTo()` somente no PoC | conectar estados sem apagar diferença | morph não pode virar identidade genérica |
| Sequência de rótulos | labels de timeline + opacity curta | manter nome/categoria sincronizados | texto nunca entra por caractere |
| Entrada do mapa | `onScroll()` em trecho curto | ligar hero ao comparador | sem pinning, hijacking ou parallax amplo |
| Filtro/ordenação | `createLayout()` | preservar contexto espacial | ordem DOM e foco continuam autoritativos |
| Cards | `waapi.animate()` para transform/opacity simples | resposta leve sob carga | sem autoplay em todos os cards |
| Caixa 2.5D | timeline de clip/translate/rotate limitada | revelar frente, lateral e bastão | botão explícito e reversível |
| Confirmação | timeline 180–320 ms | fonte/terminal acende após sucesso | erro/tentativa nunca acende |

### Cadências candidatas

Valores abaixo são identidade de interface, não propriedade do produto:

| SKU | Cadência total desktop | Segmentação | Mobile |
|---|---:|---|---:|
| CANELA | 720 ms | 140 / 140 / pausa 100 / 340 | 420 ms, um draw contínuo |
| LAVANDA CELESTIAL | 900 ms | 360 / pausa 120 / 420 | 520 ms |
| MIRRA | 780 ms | 300 / pausa 80 / 400 | 460 ms |
| OLÍBANO | 840 ms | 260 / 260 / 320 | 480 ms |
| ALECRIM | 680 ms | 120 × 4 / pausa final 200 | 400 ms |

Reduced motion: duração `0`; mostrar estado final. Não substituir por fade pulsante contínuo.

### Lifecycle

- `createScope({ root, mediaQueries })` por ilha;
- imports granulares por subpath;
- `scope.revert()` ao desmontar ou mudar preferência;
- nenhuma timeline global atravessa rotas;
- eventos recebem `variantId`/estado semântico, não selecionam o documento inteiro;
- `onScroll()` limitado a uma narrativa por rota na primeira implementação.

## 8. Three.js — o organismo espacial

### Cena proposta para o hero

Um único volume recebe o rastro do SKU selecionado:

- `BufferGeometry` para dois ou três ribbons;
- `ShaderMaterial` com uniforms de fase, largura, curvatura e dissolução;
- curva-base específica por SKU, com estados determinísticos;
- `InstancedMesh` opcional para poucos grãos abstratos próximos à fonte, sem representar ingrediente;
- câmera ortográfica ou perspectiva muito contida;
- sem postprocess no primeiro ciclo;
- `WebGLRenderer.setAnimationLoop()` somente quando visível/ativo;
- `renderer.info` e trace para medir draw calls, triângulos e recursos.

### Variação espacial por SKU

| SKU | Curva-base | Ritmo do uniform | Geometria em repouso | Proibição específica |
|---|---|---|---|---|
| CANELA | dois contragiros curtos | duas acelerações discretas | compacta | não usar faísca/explosão “quente” |
| LAVANDA CELESTIAL | arcos altos e vazios | longas interpolações | mais aberta | sem estrelas, brilho cósmico ou levitação |
| MIRRA | duas dobras internas | contração lenta limitada | centro compacto | sem resina/ritual religioso inventados |
| OLÍBANO | coluna em três retornos | cadência modular | vertical em patamares | sem templo, purificação ou fumaça “sagrada” |
| ALECRIM | inflexões estreitas | quatro impulsos pequenos | fina e segmentada | sem folhas/verde “fresco” como prova |

### Interação

- seleção acontece por buttons/radios HTML;
- pointer pode alterar a perspectiva em `±2°` ou a largura do contrarrastro em tier alto, mas nunca muda SKU;
- `Raycaster` só entra se houver hotspot/inspeção factual;
- touch não exige drag;
- usuário sempre tem `Ver todos os incensos`, `Pausar efeitos` e `Reduzir efeitos`.

### Cleanup e falhas

- gate WebGL2 + reduced motion/data + `saveData` quando disponível;
- `IntersectionObserver`, `Page Visibility` e `ResizeObserver`;
- pausar fora do viewport/aba;
- liberar geometrias, materiais, texturas, render targets, passes, observers e listeners;
- `renderer.setAnimationLoop(null)`, `renderer.dispose()` e contexto liberado quando apropriado;
- `webglcontextlost` troca imediatamente para SVG e não bloqueia CTA.

## 9. Storyboard — Home / hero

### Desktop, experiência completa

1. **Primeiro frame:** `HEAL`, eyebrow `HEALS — OS INCENSOS DA HEAL`, H1 `O ar deixa um rastro.`, subcopy factual, CTAs e glyph neutro já renderizados.
2. **Elegibilidade:** próximo ao viewport e depois do conteúdo crítico, Three.js substitui apenas o campo atmosférico.
3. **Apresentação:** a fonte acende visualmente e o organismo comum forma um rastro neutro em até 900 ms.
4. **Escolha explícita:** cinco controles mostram nome + glyph; `Explorar todos` é o primeiro/último escape claro.
5. **Seleção:** ao escolher CANELA, LAVANDA CELESTIAL, MIRRA, OLÍBANO ou ALECRIM, heading de apoio muda para `[VARIANTE] — incenso HEALS`; o rastro faz crossfade/draw para a assinatura correspondente.
6. **Prova:** ao lado do organismo aparecem somente campos factualizados. Enquanto não existirem, `Descrição, composição e intensidade a validar`.
7. **Continuidade:** primeiro scroll afina o volume em um traço SVG que termina no início da coleção; não prende a página.

Copy candidata:

- H1: `O ar deixa um rastro.`
- Apoio: `HEALS são os incensos da HEAL. Explore cinco variantes por um código visual — e confirme matéria, aroma e uso nos dados de cada produto.`
- CTA 1: `Explorar os incensos`
- CTA 2: `Ver os cinco HEALS`
- Disclosure: `A coreografia é uma identidade visual. Não simula aroma, ingrediente, fumaça ou efeito real.`

### Mobile

1. texto e CTAs vêm antes do visual;
2. organismo ocupa no máximo `min(62svh, 360px)`;
3. seletor horizontal não depende de swipe: setas e lista acessível existem;
4. somente o SKU ativo anima; ao trocar rapidamente, a timeline anterior cancela;
5. `Ver todos os incensos` aparece antes da experiência avançada.

### Reduced motion / dados reduzidos / falha

- SVG final do glyph selecionado;
- nenhum download Three;
- troca instantânea entre glyphs;
- label e campos factuais idênticos;
- opção `Ativar movimento` não aparece automaticamente para quem solicitou redução.

## 10. Storyboard — coleção e Mapa do Ar

### Visão inicial

- H1: `HEALS — os incensos da HEAL`.
- Cinco cards mostram caixa, nome, `incenso`, glyph e dados factuais.
- A área `Mapa do Ar` é opcional; o grid convencional é sempre completo.
- Nenhum card começa em loop.

### Comparação

1. usuário aciona `Comparar os rastros`;
2. cinco glyphs ficam alinhados na mesma escala;
3. foco/tap em um glyph destaca o card e atualiza descrição textual;
4. se o usuário seleciona filtros reais, `createLayout()` reorganiza cards sem mudar ordem semântica inesperadamente;
5. escolher `Ver produto` leva à PDP; a assinatura aparece estática no breadcrumb/hero da PDP.

### Conteúdo mínimo de cada card

```text
[glyph] [VARIANTE]
Incenso HEALS
[descrição olfativa validada ou A VALIDAR]
[formato/quantidade]
[preço e estoque reais]
Ver este incenso
```

### Mobile e acessibilidade

- uma coluna até QA autorizar duas;
- glyph de 24×40 mais nome, nunca glyph isolado;
- foco visível, alvo 44 px e sem drag obrigatório;
- `aria-current`/estado selecionado e live region somente para mudança relevante;
- opção `Lista sem mapa` mantém todas as tarefas.

## 11. Storyboard — PDP e caixa

### Primeiro frame factual

- breadcrumb;
- `CANELA — incenso HEALS` ou nome correspondente;
- frente real/conceitual da caixa;
- preço, estoque, variante, quantidade e CTA em HTML;
- disclosure de conceito quando aplicável;
- experiência de caixa começa depois, por ação `Abrir e ver`.

### Sequência de inspeção

1. **Fechada:** frente completa e glyph do SKU.
2. **Lateral:** nome, categoria e padrão de reconhecimento.
3. **Aberta:** conteúdo aparece somente conforme estrutura real/conceitual rotulada.
4. **Macro:** corte para bastão áspero; imagem precisa ser real ou `visual conceitual`.
5. **Ficha:** composição, aroma percebido, formato, duração e segurança permanecem em HTML.
6. **Retorno:** `Fechar caixa` restaura o primeiro frame e o foco.

### 2.5D versus caixa Three.js

| Critério | 2.5D com imagens + Anime.js | Three.js interativo |
|---|---|---|
| Fidelidade à embalagem | alta se renders/fotos forem aprovados | alta apenas com modelo, material e medidas corretos |
| Custo inicial | médio | alto |
| Peso/energia | baixo–médio | alto |
| Controle de luz/textura | pré-renderizado, previsível | dinâmico, sujeito a GPU/color pipeline |
| Acessibilidade | galeria natural | exige controles HTML equivalentes |
| Mobile | forte | precisa de tier/fallback |
| Atualização de arte | exportar novos frames | trocar textura/material/modelo e revalidar |
| Valor de compreensão | provável para abertura/macro | hipótese a provar para ângulo/estrutura |
| Recomendação | **baseline do primeiro protótipo** | challenger A/B, não default |

### Implementação 2.5D proposta

- 3–4 vistas com dimensões reservadas;
- Anime timeline limitada a translate/rotate/clip de camadas;
- botão `Abrir e ver`, passos e thumbnails acessíveis;
- sem perspectiva extrema;
- stills 1×/2× otimizados e fallback sem JS.

### Implementação Three challenger

- uma malha de caixa reutilizada para todos os SKUs;
- textura/SVG de rótulo por variante; sem cinco bundles geométricos;
- rotação limitada frontal/lateral, abertura em pivô validado;
- botões `Frente`, `Lateral`, `Abrir`, `Macro`; drag é opcional;
- `Raycaster` somente para hotspots duplicados em HTML;
- nenhum postprocess no primeiro PoC;
- dispose completo ao sair da PDP.

## 12. Budgets de implementação

Budgets são gates propostos, não resultados medidos.

### Home

- um contexto WebGL ativo;
- até 10 draw calls e 30k triângulos;
- até 3 ribbons + 1 conjunto instanciado opcional;
- sem textura 4K e sem postprocess;
- DPR cap candidato: `1.25` mobile / `1.75` desktop;
- 30 FPS mobile e 60 FPS desktop elegível, com adaptação por frame time;
- Three carregado somente próximo da cena, nunca em reduced/data-save;
- zero long animation frame >50 ms atribuída ao hero no aparelho de referência.

### Coleção

- zero Three.js;
- SVGs inline/sprite leves;
- uma animação de card por vez;
- layout transition ≤420 ms desktop e instantânea em reduced motion;
- CLS 0.

### PDP

- baseline 2.5D sem Three;
- se Three vencer: um contexto, até 12 draw calls, 45k triângulos, até 3 texturas compactas;
- interação com resposta visual inicial dentro do budget de INP;
- nenhum canvas no carrinho/checkout.

### Métricas web

- LCP mobile p75 ≤2,5 s quando houver campo;
- INP p75 ≤200 ms;
- CLS ≤0,1;
- nenhum movimento impede leitura ou ação enquanto carrega;
- comparação com experiência desligada para atribuir custo real.

## 13. Fallbacks e controles

| Falha/preferência | Resposta |
|---|---|
| Sem JS | HTML, imagens, labels, glyphs e comércio completos |
| Sem WebGL2 | SVG do organismo + caixa 2.5D |
| Context lost | troca para SVG/still, preserva seleção e CTA |
| Reduced motion | estados finais estáticos, sem deslocamento espacial |
| Reduced data/saveData | sem Three, imagens responsivas econômicas |
| Forced colors | `currentColor`, nome e outline do glyph |
| Touch | buttons/radios; sem hover ou drag obrigatório |
| Teclado | setas no grupo quando apropriado, Tab para ações, Esc fecha inspeção |
| Leitor de tela | nome + `incenso HEALS`; organismo decorativo `aria-hidden` |
| GPU lenta | tier reduz ribbons/DPR/FPS ou retorna ao SVG |

Controles visíveis quando motion avançado estiver ativo:

- `Pausar efeitos` / `Retomar efeitos`;
- `Reduzir efeitos`;
- `Ver lista sem mapa`;
- `Ver todos os incensos`;
- na caixa: `Frente`, `Lateral`, `Abrir`, `Fechar`, `Ver macro`.

## 14. LAVANDA CELESTIAL — colisão de guardrails

### Avaliação

`Lavanda Celestial` não é, por si só, uma alegação médica. Porém, `celestial` aumenta três riscos:

1. sugerir espiritualidade, transcendência, astrologia ou eficácia energética;
2. fazer o público esperar estrelas, cosmos, aura, “elevação” ou ritual místico, em conflito com a direção visual sem símbolos místicos genéricos;
3. tornar ainda mais ambíguo se `lavanda` é ingrediente, nota percebida ou apenas nome.

O risco é de **expectativa e interpretação**, não uma conclusão de que o nome está proibido. A escolha do usuário permanece intacta enquanto é testada.

### Tratamento conceitual recomendado

- manter `LAVANDA CELESTIAL` como nome candidato na rodada;
- usar a mesma tipografia, escala e hierarquia dos demais SKUs;
- não usar estrelas, planetas, gradiente “galáxia”, brilho etéreo, aura ou roxo como única identidade;
- glyph definido por dois arcos abertos, descrito como código gráfico;
- primeira menção: `LAVANDA CELESTIAL — incenso HEALS · nome da variante`;
- incluir `Composição e descrição olfativa a validar` no protótipo;
- bloquear copy como `eleva`, `transcende`, `limpa energia`, `acalma`, `para dormir`, `vibração`, `ritual celestial`.

### Teste sem substituir o nome

Mostrar a mesma caixa/produto com o nome escolhido, sem iconografia cósmica, e perguntar:

1. “O que você acredita que este produto é?”
2. “O que você espera que haja dentro?”
3. “O nome promete algum resultado? Qual?”
4. “O que significa ‘celestial’ aqui?”
5. “Você interpreta lavanda como ingrediente, cheiro ou nome?”

Depois testar três **clarificadores**, mantendo o nome:

- A: `LAVANDA CELESTIAL — incenso HEALS`;
- B: `LAVANDA CELESTIAL — nome da variante · incenso HEALS`;
- C: `LAVANDA CELESTIAL — incenso HEALS · composição no verso` somente quando o verso for factual.

Critério de revisão, não troca automática:

- qualquer interpretação recorrente como promessa de saúde/sono/efeito espiritual gera revisão jurídica e verbal;
- se mais de 15% da amostra moderada não identificar `incenso`, revisar hierarquia antes do nome;
- se mais de 20% assumir composição inexistente, aumentar o clarificador e testar novamente;
- se a correção exigir iconografia mística ou uma explicação longa, levar o conflito ao usuário com evidência; não renomear unilateralmente.

Os percentuais são gates internos candidatos e não representam pesquisa de mercado concluída.

## 15. Métricas de validação

### Marca e categoria

- identificação `HEAL` como marca em 5 s;
- identificação `HEALS` como incensos em 5 s;
- associação correta entre cinco caixas e cinco cards sem apoio de cor;
- reconhecimento do SKU em thumbnail e impressão monocromática;
- confusão espontânea entre nome e efeito/composição.

### Escolha

- tempo até abrir um produto;
- taxa `mapa → PDP` versus `grid → PDP`;
- tarefa “encontre CANELA e depois MIRRA” sem erro;
- confiança para explicar a escolha usando dois dados reais, não o movimento;
- uso de `Ver todos` e `Lista sem mapa`.

### Movimento e conforto

- taxa de `Pausar/Reduzir efeitos`;
- relato de tontura, náusea, distração ou fadiga;
- frame time/GPU, long animation frames, INP e downloads;
- nenhum add duplicado ou foco perdido por animação;
- compreensão idêntica em reduced motion.

### Embalagem

- reconhecimento em 1 m, mão e thumbnail;
- legibilidade de nome/categoria/lombada;
- acerto de pareamento glyph ↔ nome após intervalo;
- teste de janela, queda, vibração, partículas e empilhamento;
- prova de uma cor e relevo seco.

### Gates candidatos

- ≥90% identifica `incenso` em 5 s;
- ≥80% pareia SKU entre caixa/card sem cor após exposição curta;
- 100% conclui exploração e compra por teclado e reduced motion;
- nenhum participante interpreta uma animação como fato sobre aroma, fumaça ou efeito sem correção disponível;
- a experiência não reduz conclusão de tarefa nem viola budgets comparada ao baseline.

São metas de protótipo, não resultados.

## 16. Sequência de prototipação

### P0 — glyphs, uma cor

- desenhar cinco glyphs na mesma grade;
- testar a 16×28, 24×40, lombada e A4 distante;
- teste de pareamento sem nome/cor;
- iterar até as silhuetas não colidirem.

### P1 — caixas 2D/1:1

- frente, lombada, verso e janela comum;
- prova monocromática e cinco cores candidatas;
- mockup branco 1:1 da estrutura;
- validar clareza `HEALS — INCENSO`.

### P2 — hero SVG/Anime

- alternar cinco rastros por controle explícito;
- testar cadências e reduced motion;
- medir compreensão antes de introduzir Three.

### P3 — hero Three challenger

- um organismo, cinco curvas-base;
- budgets e fallback do capítulo 12;
- A/B contra SVG/Anime, não contra página vazia.

### P4 — PDP 2.5D versus Three

- mesma caixa, mesmos dados, mesmas tarefas;
- comparar compreensão da estrutura, textura, peso, performance e preferência;
- Three só vira default se demonstrar ganho relevante sem perder gates.

### P5 — sistema integrado

- hero → coleção → PDP → sacola;
- QA 320–1920, zoom 200%, keyboard, leitores de tela, reduced motion/data, forced colors, WebGL loss e dispositivos físicos;
- revisão legal/verbal específica de nomes e claims.

## 17. Decisões tomadas e decisões ainda abertas

### Fixado por esta direção conceitual

- HEAL é a marca; HEALS é o sistema de incensos.
- Coreografia do Ar é a direção a desenvolver.
- os cinco nomes fornecidos entram no sistema como variantes candidatas;
- um organismo comum e cinco rastros distinguem a linha;
- identidade sobrevive sem movimento e sem cor;
- categoria e dados comerciais precedem canvas;
- 2.5D é baseline da caixa; Three é challenger.

### Ainda precisa de escolha/aprovação

- desenho vetorial final dos cinco glyphs;
- paleta por SKU;
- estrutura física, janela, papel, acabamento e dimensões;
- se nomes designam aroma, ingrediente, coleção ou fantasia;
- dados reais de cada produto;
- copy final e clearance de marca/naming;
- hero SVG versus Three após PoC;
- caixa PDP 2.5D versus Three após teste;
- destino de `Lavanda Celestial` depois de evidência, sem mudança unilateral.

## 18. Checklist de aceite do conceito

- [ ] CANELA, LAVANDA CELESTIAL, MIRRA, OLÍBANO e ALECRIM têm glyphs diferentes sem depender de cor.
- [ ] Todos usam a mesma fonte/eixo/estrutura e parecem HEALS.
- [ ] `incenso` aparece no primeiro contato, card, PDP e embalagem.
- [ ] Nenhum visual afirma ingrediente, aroma, fumaça ou efeito não validado.
- [ ] A caixa funciona em miniatura, lombada, uma cor e relevo seco.
- [ ] O hero funciona com SVG estático e sem Three.
- [ ] A coleção permanece um ecommerce completo sem o Mapa do Ar.
- [ ] A PDP mostra preço, estoque, variante, quantidade e CTA antes da inspeção.
- [ ] 2.5D e Three são comparados com as mesmas tarefas.
- [ ] Motion possui pause, reduce, cleanup e métricas.
- [ ] `Lavanda Celestial` é testado sem iconografia mística e sem ser renomeado automaticamente.

## 19. Fontes técnicas de integração

Referências oficiais já verificadas no laboratório HEAL-24, acessadas em 2026-08-28:

- [Anime.js — Documentation](https://animejs.com/documentation/)
- [Anime.js — SVG](https://animejs.com/documentation/svg/)
- [Anime.js — onScroll](https://animejs.com/documentation/events/onscroll/)
- [Anime.js — Layout](https://animejs.com/documentation/layout/)
- [Anime.js — Scope](https://animejs.com/documentation/scope/)
- [Three.js — WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js — ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html)
- [Three.js — InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [Three.js — Raycaster](https://threejs.org/docs/pages/Raycaster.html)
- [Three.js — responsive design](https://threejs.org/manual/en/responsive.html)
- [Three.js — cleanup](https://threejs.org/manual/en/cleanup.html)
- [W3C — Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)

## 20. Recomendação executiva

Começar pelo sistema que não pode se esconder atrás de tecnologia:

1. cinco glyphs em uma cor;
2. uma estrutura comum de caixa;
3. categoria e nomenclatura legíveis;
4. hero SVG/Anime com controles;
5. somente depois, Three.js como challenger medido.

O especial da Coreografia do Ar deve ser a capacidade de reconhecer um HEAL pelo rastro, parar o movimento e ainda reconhecer o mesmo produto. Se a identidade desaparecer quando a fumaça para, ainda não existe um sistema — existe apenas um efeito.
