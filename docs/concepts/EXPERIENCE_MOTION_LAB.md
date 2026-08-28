# HEAL — Experience & Motion Lab

Data da pesquisa: 2026-08-28  
Owner: HEAL-24 · Creative Technology / UX Motion  
Estado: `PESQUISA + PROPOSTA; NÃO APROVADO; NÃO IMPLEMENTADO`  
Escopo desta entrega: conceito e especificação. Nenhuma alteração em `site/`, pacotes ou assets.

## 0. Como ler este documento

Este laboratório não é uma licença para “animar tudo”. É um mapa de decisões para tornar a compra de um produto olfativo mais compreensível, tátil e memorável. Cada ideia precisa passar por quatro gates antes de entrar no produto:

1. o usuário entende que a HEAL vende incensos;
2. o movimento melhora orientação, comparação, confiança ou confirmação;
3. o mesmo conteúdo e a mesma ação funcionam sem WebGL e sem animação;
4. o custo é provado em aparelhos reais e não prejudica LCP, INP, CLS, bateria ou leitura.

Legenda:

- **[R] Pesquisa:** fato observado no código atual ou na documentação oficial consultada.
- **[P] Proposta:** hipótese de experiência a prototipar e validar.
- **[NA] Não aprovado:** direção ainda sem aprovação de marca, UX, catálogo, performance e acessibilidade.

## 1. Regra de nome e compreensão

### Decisão verbal proposta

- A marca é **HEAL**. Remover “CURA.” de toda interface futura.
- **HEALS** é o nome da linha/dos incensos.
- Na primeira ocorrência de cada jornada, nunca escrever apenas “HEALS”. Usar **“HEALS — os incensos da HEAL”** ou **“Conheça os HEALS, nossos incensos”**.
- Depois de a categoria estar estabelecida na mesma página, “HEALS” pode aparecer sozinho como substantivo de marca.
- Navegação e busca preservam a palavra reconhecível: **Incensos**, não apenas HEALS.
- Cards e PDP repetem a categoria de modo enxuto: `HEAL 01 · INCENSO` ou `HEAL 01 — um HEAL da coleção de incensos` até a nomenclatura real ser aprovada.
- Busca deve reconhecer `heal`, `heals`, `incenso`, `incensos`, materiais e famílias aromáticas.

### Exemplos de microcopy para teste, não finais

| Contexto | Copy proposta | Por que existe |
|---|---|---|
| Nav | `Incensos` | Palavra reconhecível vence linguagem interna. |
| Hero eyebrow | `HEALS — OS INCENSOS DA HEAL` | Ensina a marca de produto no primeiro contato. |
| Hero headline | `Acenda um intervalo.` | Ação concreta e território emocional, sem promessa terapêutica. |
| Hero apoio | `Incensos feitos para escolher pela matéria, pelo aroma e pelo momento.` | Explica produto e método. |
| CTA primário | `Conhecer os HEALS` | Marca + descoberta. |
| CTA secundário | `Como escolher um incenso` | Porta de entrada para quem não domina a categoria. |
| Coleção | `HEALS para diferentes atmosferas.` | Situa o plural de marca. |
| PDP eyebrow | `HEAL 01 · INCENSO` | Não deixa o tipo de produto implícito. |
| Sacola | `Seus HEALS` + apoio `Incensos selecionados` | Reforço discreto antes do checkout. |

Guardrail: **HEAL é marca, não alegação de eficácia.** A copy não promete cura, redução de ansiedade, melhora do sono ou qualquer efeito clínico sem fundamento e revisão apropriados.

## 2. Auditoria conceitual da experiência atual

### O que já funciona [R]

- A Home tem contraste de zonas: abertura escura sensorial e área clara de escolha/prova.
- A cena atual de Three.js possui uma brasa e três ribbons de fumaça em `ShaderMaterial`, qualidade adaptativa, lazy load, `IntersectionObserver`, `visibilitychange`, fallback SVG e cleanup.
- A transição editorial e o feedback de carrinho usam Anime.js em componentes isolados, escopo local e `scope.revert()`.
- Conteúdo comercial e CTAs continuam disponíveis sem WebGL.
- O protótipo já explicita “incenso” em hero, cards e PDP.
- Versões instaladas verificadas localmente: `animejs@4.5.0` e `three@0.185.1`.

### Onde a experiência termina cedo [R]

1. A assinatura de fumaça está concentrada no hero; não deixa uma memória visual funcional nas etapas seguintes.
2. Coleção e PDP retornam a uma composição essencialmente estática, sem transformar matéria, intensidade, fumaça ou ocasião em comparação perceptível.
3. A fotografia/placeholder do produto não ensina forma, textura áspera, escala, caixa, conteúdo nem modo de manipulação.
4. A passagem hero → prova é elegante, porém linear; o usuário não sente que uma escolha alterou a narrativa.
5. O feedback de carrinho confirma, mas não conecta produto escolhido, brasa e sacola como uma mesma história.
6. A página atual fala em “HEAL. CURA.” e ainda não ensina a relação `HEAL = marca` / `HEALS = incensos`.

### Diagnóstico

O problema não é falta de efeitos. É falta de **continuidade semântica**. A fumaça deve deixar de ser um quadro isolado e virar um idioma: revelar matéria, dar forma à escolha, manter contexto e confirmar ação. A experiência precisa de mais densidade, não de mais velocidade.

## 3. Tese sensorial

### “Da matéria ao intervalo” [P][NA]

O usuário nunca sente o aroma pela tela. A interface, portanto, não deve fingir sinestesia. Ela deve diminuir a distância entre o que se vê e o que se compra usando três evidências visuais:

1. **Matéria:** macro, irregularidade, fibras, resinas, pó e acabamento real do bastão.
2. **Transformação:** brasa, fumaça, cinza e tempo como processos, não como decoração.
3. **Escolha:** comparar intensidade, perfil e ocasião por relações estáveis, não por metáforas vagas.

A sensação-alvo não é “místico genérico”. É **presença lenta, precisão material e descoberta íntima**. O luxo vem do controle, dos vazios, da resposta tátil e da honestidade sobre o produto.

### Gramática de movimento [P][NA]

| Elemento | Significado | Comportamento permitido | Comportamento proibido |
|---|---|---|---|
| Brasa | decisão/estado confirmado | acende após ação concluída; pulsa pouco | chamar atenção em loop para CTA |
| Fumaça | continuidade/descoberta | deriva, revela, conecta seções | cobrir texto, perseguir cursor, parallax amplo |
| Cinza | passagem/registro | deposita marca discreta após confirmação | confete ou explosão de recompensa |
| Fibra/grão | matéria/prova | macro, luz rasante, mudança de ângulo | partículas genéricas sem relação com produto |
| Caixa | cuidado/objeto | abrir, deslizar, revelar camadas | rotação 360 automática e infinita |
| Linha | orientação | desenhar caminho, relacionar atributos | loading ornamental que bloqueia conteúdo |

## 4. Narrativa contínua da jornada

```text
HOME                      COLEÇÃO                    PDP
reconhecer o incenso  →   comparar HEALS        →   examinar um HEAL
brasa em repouso          trilhas de matéria         caixa + bastão áspero
       │                         │                           │
       └──── memória de brasa / escolha / intensidade ─────┘
                                  │
                             SACOLA / HANDOFF
                             confirmar sem espetáculo
                             marca de cinza + resumo factual
```

### 4.1 Home — reconhecer e escolher

- Primeiro frame: nome HEAL, explicação “HEALS — os incensos da HEAL”, imagem/fallback do bastão e CTA já legíveis.
- A brasa respira em amplitude baixa. O primeiro scroll transforma a fumaça em uma linha editorial que conduz às duas portas de descoberta.
- Uma seleção por matéria ou momento altera apenas a trilha visual e o texto comparativo; nunca salta ou esconde conteúdo.

### 4.2 Coleção — comparar sem perder atmosfera

- A linha de fumaça vira eixo de comparação: cada HEAL recebe um “passaporte” factual com família, intensidade e fumaça.
- Filtros reorganizam cards com animação de layout curta, preservando posição e foco.
- Hover/focus mostra macro da matéria; em touch, um botão explícito “Ver textura” cumpre a mesma função.

### 4.3 PDP — examinar o objeto

- A caixa é mostrada fechada antes de qualquer dramatização.
- Uma inspeção controlada revela frente, lateral, abertura e o bastão áspero, sempre acompanhada por medidas/conteúdo em HTML.
- O usuário escolhe quantidade e adiciona. Só depois da confirmação uma marca de brasa registra o item.

### 4.4 Sacola — reconhecer e prosseguir

- O item chega com a mesma cor de brasa/trilha usada na PDP, sem depender dela para identificação.
- Alterar quantidade reorganiza o resumo sem saltos.
- O handoff encerra o ritual visual, mas nunca simula pagamento ou pedido concluído.

## 5. Inventário de 30 momentos de interação [P][NA]

Escalas: custo `B` baixo, `M` médio, `A` alto. Mobile `=`, mesma forma; `Δ`, forma reduzida; `S`, substituição estática. Todas as métricas pressupõem instrumentação consentida e sem dados sensíveis.

| ID | Momento e propósito | Gatilho | Biblioteca/API e técnica | Custo | Mobile | Fallback | Reduced motion | Métrica primária |
|---|---|---|---|---:|:---:|---|---|---|
| M01 | **Primeiro frame factual:** reconhecer HEAL, HEALS e incenso antes da atmosfera | HTML inicial | SSR + CSS; imagem/fallback sob o canvas | B | = | experiência base | idêntico | 5s comprehension test ≥90% |
| M02 | **Brasa em repouso:** estabelecer o processo de queima | cena visível e documento ativo | Three `ShaderMaterial`; uniform de intensidade em ciclo lento | M | Δ | SVG/still | frame estático aceso | GPU frame, abandono no hero |
| M03 | **Fumaça material:** diferenciar ribbons por densidade, não “onda genérica” | cena ativa | Three `BufferGeometry` + `ShaderMaterial` procedural | M | Δ | imagem/WebP | still | frame time p75 e aprovação qualitativa |
| M04 | **Luz rasante no bastão áspero:** evidenciar fibras/grãos | entrada do hero; pointer apenas desktop | Three `InstancedMesh` para poucos grãos + luz/material; sem física | M | S | macro fotográfico | macro estático | acerto “qual é a textura?” |
| M05 | **Sopro mínimo:** a fumaça responde discretamente à aproximação, sem seguir cursor | pointer dentro do canvas | Three `Raycaster` em plano invisível; uniform limitado | M | S | fumaça autônoma | sem resposta | taxa de exploração; erro de clique 0 |
| M06 | **Linha de abertura:** fumaça converge para o seam e conduz à escolha | 20–45% do hero rolado | Anime `createTimeline()` + `onScroll()` sincronizado; SVG `createDrawable()` | M | Δ | linha completa | linha completa, sem interpolação espacial | scroll depth até portas |
| M07 | **Nome explicado:** `HEALS` ganha subtítulo `os incensos da HEAL` uma vez | primeiro foco/viewport do bloco | WAAPI `waapi.animate()` em opacidade; texto já no DOM | B | = | texto presente | aparece sem deslocamento | reconhecimento HEALS/incenso |
| M08 | **Duas portas respondem juntas:** matéria e momento ficam relacionáveis | hover, foco ou tap | Anime timeline curta; stroke + sublinhado, não scale do card | B | = | estados CSS | mudança instantânea | escolha de porta e backtrack |
| M09 | **Traço pela matéria:** materiais são ligados visualmente ao HEAL correspondente | seleção explícita | SVG `createDrawable()`; `createScope()` local | B | Δ | lista/links | traço completo | conclusão seleção → coleção |
| M10 | **Passaporte de atmosfera:** atributos entram na ordem de leitura | bloco entra 30% no viewport | Anime `stagger()` só em linhas decorativas; conteúdo nunca oculto | B | = | tudo visível | sem stagger | recall de atributos |
| M11 | **Mudança de zona:** escuro sensorial vira claro factual como “abrir os olhos” | seam em viewport | timeline Anime em clip/opacity de camada decorativa | B | Δ | contraste final | corte imediato | tempo até primeiro produto |
| M12 | **Cards respiram por foco:** dar sinal preciso de objeto selecionável | hover/focus-visible | WAAPI transform/outline 140–180 ms | B | = | CSS focus | outline, sem movimento | CTR e foco perdido 0 |
| M13 | **Macro sob demanda:** ensinar aspereza do bastão | botão `Ver textura`, hover como atalho | `<picture>`/imagem gerada + Anime clip reveal | B | = | abre imagem sem animação | dissolve | uso do controle e compreensão |
| M14 | **Filtro preserva contexto:** reorganizar sem “teleporte” | filtro/ordem confirmado | Anime `createLayout()` com root local; foco permanece no controle | M | Δ | troca instantânea | troca instantânea | filtro → PDP; CLS 0 |
| M15 | **Escala de intensidade legível:** comparação entre HEALS | foco/seleção do atributo | SVG draw de escala fixa + texto/valor | B | = | escala completa | completa | erro de comparação |
| M16 | **Nível de fumaça visível:** explicar um atributo sem simular o aroma | foco no dado factual | três pequenos ribbons SVG, não canvas | B | = | ícone + texto | estático | compreensão e decisão |
| M17 | **Transição card → PDP:** manter qual produto foi aberto | navegação intencional | View Transition API como progressive enhancement; CSS fallback | M | Δ | navegação normal | navegação normal | orientação pós-navegação |
| M18 | **Caixa em repouso:** apresentar packaging frontal e escala | primeiro frame da PDP | imagem/2.5D ou Three lazy; HTML factual ao lado | M | Δ | foto frontal | foto frontal | identificação conteúdo/quantidade |
| M19 | **Abrir a caixa:** revelar como se acessa o produto | botão explícito `Abrir e ver` | Anime `createTimeline()` ou Three pivô simples; reversível | M | Δ | galeria de 2 imagens | troca de imagem | conclusão de inspeção |
| M20 | **Corte de matéria:** sair da caixa para macro do bastão áspero | próxima etapa da inspeção | timeline coordenada + `createLayout()`; imagem macro real/gerada marcada | M | Δ | carrossel acessível | corte direto | confiança/percepção de textura |
| M21 | **Rotação limitada:** ver frente/lateral, não brinquedo 360 | drag alternável por botões | Three `Raycaster`; yaw limitado; botões equivalentes | A | S | galeria frontal/lateral | botões trocam stills | uso + erro de manipulação |
| M22 | **Notas por camadas:** revelar descritores concretos ligados à origem | expandir acorde | Anime timeline + SVG path; accordion HTML autoritativo | B | = | accordion | abre instantâneo | expansão e compreensão |
| M23 | **Tempo de brasa:** mostrar duração somente quando o dado for real | foco em duração validada | SVG drawable circular proporcional; texto em minutos | B | = | número/texto | círculo completo | leitura do dado; claim errors 0 |
| M24 | **Quantidade material:** pilha visual reflete unidades sem substituir número | alteração de quantidade válida | Anime stagger de 1–4 silhouettes; acima disso `+n` | B | Δ | número | mudança instantânea | erro de quantidade |
| M25 | **Confirmação de brasa:** marcar add confirmado, nunca tentativa | resposta autoritativa de sucesso | Anime timeline 180–320 ms + `role=status` textual | B | = | mensagem | mensagem + cor | duplicidade de add 0; anúncio correto |
| M26 | **Trilha até a sacola:** continuidade periférica do produto ao header | após M25, sem bloquear | SVG `createMotionPath()` para uma brasa decorativa | M | S | badge atualiza | badge atualiza | percepção de confirmação; INP |
| M27 | **Sacola herda a assinatura:** reconhecer o HEAL escolhido | item renderizado | token de cor/matéria persistido; WAAPI opacity curta | B | = | card normal | card normal | reconhecimento do item |
| M28 | **Reflow de quantidade:** total muda sem salto visual | quantidade confirmada | Anime `createLayout()` ou WAAPI numérico; live region | B | = | mudança direta | direta | erro, CLS, anúncio |
| M29 | **Undo como cinza reversível:** remoção tem recuperação clara | remoção confirmada | timeline curta de dissolve; toast persistente | B | = | remoção + undo | direta | undo success e foco |
| M30 | **Encerramento honesto:** fim do handoff sem simular compra | usuário encerra demonstração | brasa reduz a halo/marca; texto factual primeiro | B | Δ | tela final estática | estática | compreensão “não foi compra” =100% |

### Critério de uso do inventário

Não implementar os 30 momentos juntos. Eles formam um repertório. A rota **Signature** recomenda M01–M04, M06–M08, M10–M20, M22, M25 e M27–M30; M05, M21, M23, M24 e M26 dependem de teste ou dado real.

## 6. Cinco signature moments

### S1 — A primeira brasa: “incenso antes do efeito”

**Hipótese:** mostrar primeiro o objeto real e só então sua transformação cria mais confiança que abrir com fumaça abstrata.

Storyboard textual:

1. **0 ms:** HTML, marca HEAL, `HEALS — os incensos da HEAL`, CTA e still do bastão áspero já existem.
2. **Após hidratação e gate:** o canvas substitui somente a camada atmosférica; a caixa/stick continuam visíveis.
3. **600–1200 ms:** a brasa cresce de carvão escuro para vermelho baixo; sem flare.
4. **Estado ambiente:** três ribbons com velocidades e larguras diferentes sugerem fumaça real, nunca formam símbolos místicos.
5. **Primeiro scroll:** as ribbons afinam; uma linha segue até o começo da seção de escolha.
6. **Saída do viewport:** loop para e conserva o último frame/fallback.

Implementação modular proposta:

- `HeroMaterialStage` (server markup + still);
- `HeroEmberRuntime` (Three lazy, `ShaderMaterial`, `BufferGeometry`);
- `HeroNarrativeTimeline` (Anime `createTimeline` + `onScroll`);
- `MotionGate` (reduced motion/data, visibility, viewport, capability);
- nenhum evento comercial depende do canvas.

Budget: um contexto WebGL; ≤8 draw calls; zero textura 4K; JS Three fora do caminho crítico; canvas abaixo de heading/CTA em stacking e sem pointer por padrão. Meta: nenhuma long animation frame >50 ms atribuída à cena no aparelho de referência.

### S2 — O passaporte vivo: “escolher deixa um rastro”

**Hipótese:** escolhas visíveis de matéria/momento reduzem a sensação de catálogo arbitrário.

Storyboard textual:

1. O usuário escolhe `por matéria` ou `por momento` em botões HTML.
2. Uma linha desenhada conecta a porta ao primeiro atributo relevante.
3. A lista apresenta família, intensidade e fumaça em ordem estável.
4. Selecionar um atributo realça, com a mesma cor, os HEALS compatíveis; os demais permanecem acessíveis e nunca somem sem feedback.
5. Ao abrir um produto, a linha e o rótulo escolhido reaparecem como contexto no breadcrumb/PDP.

Implementação modular:

- `ChoiceState` serializável na URL, não em variável global opaca;
- `PassportPath` com `svg.createDrawable()`;
- `ProductCollectionLayout` com `createLayout()` apenas após a atualização semântica;
- `createScope({ root, mediaQueries })` e `scope.revert()` no unmount;
- no touch, nenhum comportamento depende de hover.

Métrica: tempo até primeiro produto relevante, retorno aos filtros, sucesso em “encontre um incenso de intensidade baixa” e CLS 0.

### S3 — Da caixa à matéria: “abrir para compreender”

**Hipótese:** uma revelação curta da embalagem ao bastão áspero aumenta compreensão de conteúdo e percepção de qualidade.

Storyboard textual:

1. PDP mostra frente da caixa e dados: quantidade, dimensão e formato.
2. Botão `Abrir e ver` inicia a inspeção; o próprio botão alterna para `Fechar`.
3. A manga/tampa desloca pouco; o interior aparece sem giro gratuito.
4. O enquadramento corta para macro do bastão: fibras, pó e irregularidade visíveis.
5. Hotspots opcionais levam a composição/origem, sempre com botão/lista equivalente.
6. A ação é reversível e não interfere em variante, preço ou `Adicionar`.

Implementação modular:

- versão A de baixo risco: duas imagens renderizadas + Anime timeline/clip;
- versão B: `BoxInspectionScene` Three com malha simples e no máximo duas texturas compactas;
- `Raycaster` só para hotspot/rotação limitada; controles HTML duplicam toda ação;
- `ResizeObserver` ajusta o drawing buffer; `renderer.compileAsync()` pode preparar shaders depois que a cena estiver ociosa e elegível;
- `dispose()` explícito de geometria, material, textura, render target e listeners.

Gate de verdade: modelo e imagens só passam a “produto real” depois de amostra, medidas, dieline, cor e acabamento aprovados. Até lá, rotular `visual conceitual`.

### S4 — A brasa conduz: “o mesmo gesto atravessa a compra”

**Hipótese:** uma assinatura curta de brasa após `add_to_cart` dá continuidade sem transformar compra em jogo.

Storyboard textual:

1. Usuário aciona `Adicionar`; botão entra em loading funcional, sem brasa.
2. Erro mantém o produto e mostra reparação; nenhuma assinatura de sucesso.
3. Sucesso autoritativo atualiza mensagem e badge imediatamente.
4. Uma brasa percorre um caminho SVG de no máximo 320 ms em desktop; em mobile o badge apenas acende.
5. A sacola abre ou continua disponível por link explícito; animação nunca muda foco.
6. Ao chegar à sacola, uma pequena marca de cinza na linha do item confirma continuidade.

Implementação modular:

- ampliar `EmberCartFeedback` sem acoplar ao adapter;
- `svg.createMotionPath()` para percurso decorativo; ponto `aria-hidden`;
- `waapi.animate()` para badge simples sob carga;
- evento só recebe `confirmedAddId` idempotente;
- reduced motion: mensagem + badge, zero viagem espacial.

Métrica: compreensão da confirmação, adds duplicados, tempo até sacola e INP do clique.

### S5 — A marca de cinza: “encerrar sem falsa celebração”

**Hipótese:** uma conclusão calma aumenta confiança em um commerce premium; confete e euforia seriam incoerentes.

Storyboard textual:

1. Sacola exibe os HEALS como objetos, com nome `incenso` ainda presente.
2. Atualizações de quantidade refluem o resumo sem jump e com live region.
3. Remover item dissolve a marca e oferece undo persistente.
4. No checkout demonstrativo, o texto “nenhum pagamento será processado” precede o controle final.
5. Encerrar reduz a brasa a um selo/círculo de cinza; a tela apresenta o estado factual.
6. Quando houver checkout real, essa cena só pode ocorrer após confirmação server-side do pedido — nunca no clique.

Implementação modular:

- `CartItemLayout` com `createLayout()` ou CSS/WAAPI;
- `AshMark` SVG estático como base;
- timeline Anime somente após estado autoritativo;
- nenhum Three.js no carrinho/checkout;
- sem autoplay contínuo.

Métrica: erro sobre estado do pedido deve ser zero; abandono, undo, falhas de anúncio e CLS.

## 7. Anime.js 4.5 — possibilidades concretas e limites [R/P]

### Capacidades verificadas na documentação oficial [R]

| Capacidade | API documentada | Uso HEAL proposto | Limite HEAL |
|---|---|---|---|
| Animação coordenada | `createTimeline()` e métodos `add`, `set`, `label`, `call`, `pause`, `seek`, `revert` | S1, S3, S4 | Timeline local; não uma sequência global entre todas as rotas. |
| Stagger | `stagger()` | linhas de passaporte, silhouettes de quantidade | Não escalonar textos por caractere nem atrasar leitura. |
| Desenho SVG | `svg.createDrawable()` | trilha de fumaça, escala de intensidade | O traço é redundante ao texto. |
| Motion path SVG | `svg.createMotionPath()` | percurso curto da brasa confirmada | Desktop apenas; nunca única confirmação. |
| Morph SVG | `svg.morphTo()` | brasa → selo/cinza em um ícone isolado | Protótipo primeiro; formas precisam ser compatíveis e o morph não pode comunicar estado sozinho. |
| Scroll | `onScroll()` | sincronizar seam e narrativa do hero | Sem scroll hijacking, pinning longo ou parallax amplo. |
| Auto layout | `createLayout()` + `record/animate/update/revert` | filtro, grid/lista, sacola | Preservar foco, ordem DOM e leitura; reduzir em mobile. |
| Escopo React | `createScope({ root, mediaQueries })`, `scope.revert()` | cada ilha motion | Nunca selecionar o documento inteiro nem deixar instâncias após unmount. |
| WAAPI enxuta | `waapi.animate()` | opacity/transform de badge, foco visual | Preferir para CSS simples; não usar quando timeline/SVG/JS value exigir engine JS. |
| Engine JS | `animate()` | SVG, objetos JS/uniforms, timelines complexas | Import granular e só na rota que usa. |

A própria documentação do Anime.js recomenda priorizar `waapi.animate()` quando carga inicial e aceleração durante pressão de CPU/rede importam; `animate()` continua indicado para SVG/atributos, objetos JS/canvas/WebGL e timelines complexas. A escolha deve ser por capacidade, não por preferência estética.

### Padrão React proposto [P][NA]

```text
Server HTML completo
  └── ilha client estrita
      ├── createScope({ root, mediaQueries })
      ├── constrói timeline/animation somente se elegível
      ├── recebe eventos semânticos, não cliques crus
      └── scope.revert() + observers.disconnect() no cleanup
```

Regras:

- imports por subpath (`animejs/timeline`, `animejs/scope`, `animejs/svg`, `animejs/events`, `animejs/waapi`) e comparação de bundle;
- valores finais sempre existem em CSS/HTML antes da animação;
- `prefers-reduced-motion` pode mudar durante a sessão; o scope precisa reagir e restaurar estado;
- `onScroll()` só em até duas narrativas por rota;
- textos não entram letra por letra: prejudica leitura, localização e leitor de tela;
- nunca usar bounce/spring em preço, estoque, segurança, erro ou checkout.

## 8. Three.js 0.185.1 — possibilidades concretas e limites [R/P]

### Capacidades verificadas na documentação oficial [R]

| Capacidade | API/classe | Aplicação HEAL proposta | Risco/controle |
|---|---|---|---|
| Fumaça procedural | `ShaderMaterial`, uniforms e `BufferGeometry` | ribbons com dissolução, striation e sway | Shader simples, desenvolvimento com shader errors ativos. |
| Poeira/cinza | `Points` ou `InstancedMesh` | poucos grãos no macro do bastão | `InstancedMesh` reduz draw calls; nada de milhares de partículas no mobile. |
| Textura material | `MeshStandardMaterial` ou shader dedicado | caixa e bastão sob luz rasante | Texturas comprimidas e resolução por tier; material físico só se agregar leitura. |
| Interação limitada | `Raycaster` | hotspot e yaw controlado | Controles HTML equivalentes; área não captura scroll. |
| Render loop | `WebGLRenderer.setAnimationLoop()` | ciclo da cena somente enquanto ativa | `null` ao pausar/desmontar. |
| Preparo | `WebGLRenderer.compileAsync()` | reduzir stutter de primeiro shader | Só depois do gate e sem competir com LCP/interação. |
| Observação de custo | `renderer.info` | draw calls, triângulos, texturas e geometrias | Métrica de desenvolvimento, não substitui trace GPU. |
| Instancing | `InstancedMesh` | fibras/grãos repetidos | Atualizar bounds quando transforms mudarem. |
| Postprocess | `EffectComposer`, passes e render targets | possível bloom sutil de brasa no tier alto | Não recomendado no primeiro protótipo; duplica render targets/custo. |
| Cleanup | `.dispose()` em recursos; dispose de passes/controls | navegação segura entre cenas | Remover objetos da cena não libera GPU por si só. |

`WebGLRenderer` atual requer WebGL 2; a experiência base não pode pressupor suporte. `EffectComposer` usa render targets alternados, portanto tem custo real de memória e fill-rate. Para a HEAL, o glow da brasa deve começar no próprio shader/additive plane. Bloom entra somente se um teste lado a lado provar ganho material e orçamento.

### Técnicas customizadas propostas [P][NA]

1. **Ribbons de fumaça com identidade:** spline/geometria vertical leve deformada no vertex shader; dissolve e irregularidade no fragment shader. As fases vêm de um conjunto determinístico por HEAL, não de random a cada render.
2. **Bastão áspero:** cilindro/plane base + pequeno conjunto instanciado de grãos/fibras; luz rasante ou normal map aprovado a partir de macro real.
3. **Memória da escolha:** uniforms de temperatura, largura e turbulência derivados de atributos factuais — nunca alegar que cor “é” o aroma.
4. **Scroll sync:** Anime.js anima um objeto/uniform ou timeline ligada a `onScroll`; o renderer consome o estado em seu próprio loop. Um único writer por propriedade.
5. **Pointer response:** `Raycaster` encontra um plano/objeto e altera uma força limitada, amortecida. Desliga em touch, reduced motion e baixa qualidade.
6. **Quality tiers:** DPR, FPS, segmentos, número de ribbons/grãos, antialias e postprocess definidos por medição; não por user-agent.

## 9. Arquitetura de cenas e ciclo de vida [P][NA]

### Princípio

No máximo **um contexto WebGL ativo por rota**. Home e PDP podem ter cenas diferentes, nunca dois canvases correndo simultaneamente. Coleção, carrinho e checkout usam imagem/SVG/Anime, não Three.

```text
ExperienceGate
├── capability: WebGL2
├── user: reduced motion / reduced data / saveData
├── lifecycle: intersection / visibility / route
├── quality: drawing-buffer cap / FPS tier
└── fallback: picture + SVG
        │
        ▼
SceneController
├── create(renderer, camera, scene)
├── compileAsync quando ocioso/elegível
├── setActive(boolean)
├── resize(ResizeObserver)
├── update(time, narrativeState)
└── dispose(all resources, observers, context)
```

### Estado narrativo, não acoplamento DOM

```ts
type ExperienceSignal =
  | { type: 'hero_progress'; progress: number }
  | { type: 'choice_changed'; choiceId: string }
  | { type: 'product_inspection'; step: 'closed' | 'open' | 'material' }
  | { type: 'add_confirmed'; confirmationId: string }
  | { type: 'cart_item_removed'; lineId: string };
```

Esse contrato é proposta. IDs não carregam CEP, email, nome ou qualquer dado pessoal.

### Cleanup obrigatório

- `renderer.setAnimationLoop(null)`;
- desconectar `IntersectionObserver`, `ResizeObserver`, `PerformanceObserver` e listeners;
- `dispose()` de `BufferGeometry`, materiais, texturas, render targets, passes e controls;
- remover meshes da cena;
- `renderer.renderLists.dispose()`, `renderer.dispose()` e, quando apropriado, `forceContextLoss()`;
- cancelar timelines e `scope.revert()`;
- teste de 20 navegações Home ↔ PDP com memória GPU/JS estável dentro de tolerância.

## 10. Budgets e gates

### Budget por rota [P][NA]

| Item | Lite | Signature recomendada | Cinematic experimental |
|---|---:|---:|---:|
| Contextos WebGL ativos | 1 Home | 1 por rota elegível | 1 global compartilhado, somente após PoC |
| Draw calls | ≤6 | ≤12 | ≤25 |
| Triângulos | ≤10k | ≤35k | ≤90k |
| Texturas | 0–1 | ≤3; sem 4K | ≤6, compressão obrigatória |
| DPR cap | 1.0 mobile / 1.5 desktop | 1.25 / 1.75 | adaptativo por buffer/time |
| FPS alvo | 24–30 | 30 mobile / 60 desktop | adaptativo 30–60 |
| Anime scroll narratives | 1 | ≤2 por rota | ≤3, com controle “reduzir efeitos” |
| Postprocess | nenhum | nenhum por padrão | no máximo um passe comprovado |

Budgets são hipóteses de engenharia, não garantias. O gate real é medição em aparelhos representativos.

### Gates de produto

- HTML/CTA/preço/estoque legíveis antes do JS.
- LCP mobile p75 de campo ≤2,5 s; INP p75 ≤200 ms; CLS ≤0,1 quando houver tráfego suficiente.
- Nenhuma long animation frame >50 ms atribuída à experiência no fluxo crítico do aparelho de referência.
- Nenhuma queda sustentada abaixo de 30 FPS em mobile elegível durante a cena.
- Nenhum download Three em reduced motion, reduced data/saveData ou antes da proximidade da cena.
- Zero foco movido ou encoberto por motion.
- Zero estado de compra comunicado apenas por cor, fumaça ou transformação.
- Teste de compreensão “o que a HEAL vende?” ≥90%; confusão “HEALS é outra marca?” ≤5% na amostra de validação.

## 11. Fallbacks e reduced motion

Reduced motion não é “animação igual, só mais rápida”. É outra composição:

| Experiência completa | Reduced motion | Sem WebGL/JS |
|---|---|---|
| fumaça contínua | still com brasa/fumaça | `<picture>` + SVG |
| scroll sync espacial | estados discretos por seção | ordem HTML normal |
| card → PDP compartilhado | navegação imediata | navegação imediata |
| caixa abre em timeline | galeria troca por clique | imagens/legendas |
| brasa percorre até sacola | badge e status atualizam | status textual |
| layout reflow animado | troca instantânea com foco preservado | render final |

Além de `prefers-reduced-motion`, a UI deve oferecer uma preferência local `Reduzir efeitos` se a rota Cinematic for considerada. O W3C indica que movimento não essencial disparado por interação deve poder ser desabilitado; parallax é um exemplo explícito de risco vestibular.

## 12. Anti-patterns — rejeitados para HEAL

1. Scroll hijacking, snapping forçado ou pinning de vários viewports.
2. Cursor customizado, magnetismo de CTA ou fumaça perseguindo o ponteiro.
3. Reveal de todo texto on-scroll; conteúdo essencial não começa invisível.
4. Parallax de grande amplitude, zoom de página ou câmera atravessando o produto.
5. Fumaça como loader que adia preço, imagem ou navegação.
6. Explosão de partículas, confete ou gamificação ao adicionar/comprar.
7. Bounce/spring em preço, estoque, erro, segurança ou checkout.
8. Autoplay de caixa girando 360°; comunica tecnologia, não material.
9. Vários canvases Three simultâneos ou um WebGL global sem prova de lifecycle.
10. Bloom, depth-of-field, film grain e chromatic aberration empilhados.
11. Textura 4K para packaging em mobile.
12. Drag como única forma de explorar a caixa.
13. Stagger de letras/palavras que atrasa leitura ou fragmenta acessibilidade.
14. Randomização não determinística que muda a identidade de um HEAL a cada visita.
15. Associar cor/fumaça a efeito médico ou prometer que a tela representa fielmente o aroma.
16. Usar “HEALS” sem uma referência próxima a incensos no primeiro contato.

## 13. Matriz impacto × custo × risco

Escala 1–5; impacto maior é melhor, custo/risco menor é melhor.

| Iniciativa | Impacto UX | Distinção | Custo | Risco | Decisão de laboratório |
|---|---:|---:|---:|---:|---|
| Sistema verbal HEAL/HEALS/incensos | 5 | 4 | 1 | 1 | **Primeiro** |
| Macro real do bastão áspero | 5 | 5 | 2 | 2 | **Primeiro; depende de amostra** |
| S1 Primeira brasa evoluída | 4 | 5 | 3 | 3 | **Protótipo A/B** |
| S2 Passaporte vivo | 5 | 4 | 3 | 2 | **Protótipo recomendado** |
| `createLayout` nos filtros | 4 | 3 | 2 | 2 | **Após comportamento estável** |
| S3 Caixa → matéria em imagens/2.5D | 5 | 5 | 3 | 2 | **Protótipo recomendado** |
| S3 Caixa Three interativa | 4 | 5 | 5 | 4 | **Somente se 2.5D perder no teste** |
| S4 Brasa até sacola | 3 | 4 | 3 | 3 | **Teste; desktop apenas** |
| S5 Marca de cinza | 4 | 4 | 2 | 1 | **Protótipo recomendado** |
| View Transition card → PDP | 3 | 4 | 3 | 3 | **Progressive enhancement** |
| Pointer soprando fumaça | 2 | 4 | 3 | 4 | **Experimental; fácil cortar** |
| Postprocess/bloom | 1 | 2 | 3 | 4 | **Rejeitar no primeiro ciclo** |
| Cena WebGL global contínua | 3 | 5 | 5 | 5 | **Não aprovada** |

## 14. Três rotas de ambição

### Rota A — Lite: “editorial tátil”

**Escopo:** melhora sem ampliar significativamente GPU.

- renomear toda a camada verbal para HEAL/HEALS/incensos;
- manter uma cena Three só no hero, refinar bastão/fumaça e primeiro frame;
- seis momentos Anime/WAAPI: seam, portas, passaporte, filtro layout, macro, confirmação;
- PDP com fotografia/macro e abertura 2.5D por imagens;
- zero postprocess e zero Three fora da Home.

Vantagem: menor risco e entrega rápida. Limite: continuidade visual menos profunda.

### Rota B — Signature: “da matéria ao intervalo” — recomendada para prototipar

**Escopo:** identidade própria sem tornar a loja uma demo técnica.

- S1 refinado na Home;
- S2 conecta escolha e coleção;
- S3 em 2.5D primeiro, Three PDP somente se superar o teste;
- S4 curto e S5 completo;
- preferência local `Reduzir efeitos` além do sistema;
- uma cena ativa por rota, budgets estritos, assets de embalagem/fibra próprios.

Vantagem: narrativa reconhecível e comercial. Risco: exige direção de arte, produto real e QA multidisciplinar.

### Rota C — Cinematic: “objeto vivo”

**Escopo:** canvas persistente ou transição 3D entre Home/coleção/PDP, caixa totalmente inspecionável, partículas e pós-processo adaptativo.

Só considerar depois de:

- catálogo e packaging aprovados;
- Signature comprovar ganho de compreensão/conversão;
- PoC de lifecycle e cache em iOS/Android reais;
- performance mobile dentro do gate;
- controle explícito de efeitos e fallback equivalentes.

Estado: **não recomendada agora**. O risco de virar showcase e piorar compra é maior que o benefício não provado.

## 15. Plano de protótipo e validação

### Sprint 0 — verdade material

1. Obter 3–5 bastões físicos de referência e amostra HEAL quando existir.
2. Fotografar macro, medir diâmetro/irregularidade e registrar como a cinza se forma.
3. Obter dieline/medidas/acabamento da caixa.
4. Aprovar vocabulário HEAL/HEALS e claims permitidos.

Saída: biblioteca de matéria com proveniência; não código.

### Sprint 1 — três prototypes isolados

- **P1:** S1 hero refinado, ainda sem alterar jornada.
- **P2:** S2 passaporte/filtro em dados fixture.
- **P3A/P3B:** caixa → matéria em 2.5D versus Three.

Cada protótipo deve ter toggle `base / proposta / reduced` e registrar frame time, long animation frames, downloads e ações.

### Sprint 2 — teste com usuários

Mínimo qualitativo: 5 participantes por rodada, incluindo pessoas que não conhecem incenso artesanal.

Tarefas:

1. “O que esta marca vende?”
2. “O que significa HEALS?”
3. “Encontre um incenso de baixa intensidade e explique por quê.”
4. “Diga como o bastão parece fisicamente.”
5. “Adicione dois itens e confirme se a compra terminou.”

Observar compreensão, hesitação, backtracking, erro, enjoo/desconforto e preferência. Não perguntar apenas “gostou?”.

### Sprint 3 — hardening

- Playwright em Chromium/Firefox/WebKit, 320–1440 px;
- Chrome/Android e Safari/iPhone físicos;
- teclado, NVDA e VoiceOver;
- reduced motion ativado antes da carga e alternado durante a sessão;
- WebGL indisponível/context lost;
- CPU 4×, rede lenta, saveData/reduced data quando suportado;
- 20 navegações repetidas para vazamento;
- Lighthouse/trace com experiência ligada/desligada; RUM somente com consentimento/base legal definidos.

### Decisão

Escolher a rota somente depois de um scorecard:

| Dimensão | Peso |
|---|---:|
| compreensão de HEAL/HEALS/incenso | 25% |
| compreensão de matéria/atributos | 20% |
| orientação e tarefa comercial | 20% |
| percepção de distinção/confiança | 15% |
| acessibilidade/conforto | 10% |
| performance/energia | 10% |

Uma experiência que aumenta “uau” mas reduz compreensão, acessibilidade ou performance não passa.

## 16. Instrumentação de experiência

Eventos propostos, sem PII:

- `experience_variant_seen` (`base`, `lite`, `signature`);
- `hero_scene_eligible`, `hero_scene_ready`, `hero_scene_fallback` com motivo técnico agregado;
- `choice_path_selected` (`materia`, `momento`);
- `material_macro_opened`;
- `package_inspection_step` (`closed`, `open`, `material`);
- `motion_preference` (`system_reduce`, `local_reduce`, `full`);
- `add_feedback_seen` após sucesso;
- `experience_discomfort_optout` quando o usuário aciona reduzir efeitos.

Não enviar pointer coordinates, scroll stream contínuo, endereço, CEP, texto de busca bruto ou identificador de sessão persistente. Métricas de frame/LoAF devem ser amostradas e agregadas. `PerformanceObserver` é o mecanismo preferido para entradas suportadas; Long Tasks/Long Animation Frames têm disponibilidade desigual e exigem feature detection.

## 17. Fontes oficiais consultadas

Todas acessadas em **2026-08-28**. A documentação técnica abaixo sustenta apenas capacidades de API; as decisões criativas são propostas da HEAL.

### Anime.js

- [Anime.js — Documentation](https://animejs.com/documentation/)
- [Module imports e subpaths](https://animejs.com/documentation/getting-started/module-imports/)
- [Animation e versão WAAPI](https://animejs.com/documentation/animation/)
- [When to use WAAPI](https://animejs.com/documentation/web-animation-api/when-to-use-waapi/)
- [Timeline methods](https://animejs.com/documentation/timeline/timeline-methods/)
- [Scope](https://animejs.com/documentation/scope/)
- [Scope mediaQueries](https://animejs.com/documentation/scope/scope-parameters/mediaqueries/)
- [onScroll](https://animejs.com/documentation/events/onscroll/)
- [SVG](https://animejs.com/documentation/svg/)
- [createDrawable](https://animejs.com/documentation/svg/createdrawable/)
- [createMotionPath](https://animejs.com/documentation/svg/createmotionpath/)
- [morphTo](https://animejs.com/documentation/svg/morphto/)
- [Layout](https://animejs.com/documentation/layout/)
- [Layout methods](https://animejs.com/documentation/layout/layout-methods/)

### Three.js

- [WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [WebGL 2 capability helper](https://threejs.org/docs/pages/WebGL.html)
- [ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html)
- [Points](https://threejs.org/docs/pages/Points.html)
- [InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [Raycaster](https://threejs.org/docs/pages/Raycaster.html)
- [Responsive design e drawing-buffer budget](https://threejs.org/manual/en/responsive.html)
- [Cleanup](https://threejs.org/manual/en/cleanup.html)
- [How to dispose of objects](https://threejs.org/manual/en/how-to-dispose-of-objects.html)
- [Post-processing e EffectComposer](https://threejs.org/manual/en/post-processing.html)
- [Render targets](https://threejs.org/manual/en/rendertargets.html)

### Plataforma web, performance e acessibilidade

- [MDN — Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [MDN — Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API)
- [MDN — Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)
- [MDN — View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
- [MDN — Performance APIs](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)
- [MDN — Long animation frame timing](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Long_animation_frame_timing)
- [W3C — Understanding SC 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)
- [W3C — Technique C39: prefers-reduced-motion](https://www.w3.org/WAI/WCAG21/Techniques/css/C39.html)

## 18. Recomendação executiva

1. Aprovar primeiro o sistema verbal **HEAL / HEALS — os incensos da HEAL**.
2. Escolher a **Rota B Signature** somente para protótipo, não para rollout total.
3. Produzir a verdade visual do bastão áspero e da caixa antes de modelar 3D.
4. Prototipar S1, S2, S3 em 2.5D e S5; deixar pointer, 360 e postprocess fora do primeiro ciclo.
5. Validar compreensão e performance. Só então decidir se o Three da PDP supera imagens bem dirigidas.

O diferencial defendível da HEAL não será “ter muitas animações”. Será fazer cada mudança de matéria — caixa, bastão, brasa, fumaça e cinza — carregar uma etapa real da decisão de compra.
