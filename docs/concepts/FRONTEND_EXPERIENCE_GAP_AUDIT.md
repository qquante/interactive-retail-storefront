# HEAL — auditoria de gaps da experiência frontend

Data: 2026-08-28  
Owner: HEAL-26 — Frontend Experience / Frontend Design / UX  
Estado: `AUDITORIA READ-ONLY + PROPOSTAS CONCEITUAIS; NADA APROVADO OU IMPLEMENTADO`  
Escopo: storefront atual em `site/`, desktop e mobile. Este documento não altera marca, catálogo, código, configuração ou decisões de produção.

## 0. Veredito executivo

O storefront atual é uma **vertical slice tecnicamente responsável e comercialmente honesta**, mas ainda não é a experiência memorável pedida pelo usuário. Ele já deixa claro que HEAL vende incensos, protege a fixture, oferece rotas de compra demonstrativas e trata Anime.js/Three.js como progressive enhancement. Porém, a experiência visível se encerra cedo:

- há uma única cena atmosférica de fumaça no hero;
- há apenas uma passagem Anime.js no seam e um feedback de brasa após add-to-cart;
- produto, caixa, textura, cinza e matéria real ainda são placeholders;
- as seções não transformam o mesmo objeto nem constroem causalidade narrativa;
- os caminhos “por matéria” e “por momento” são links, não instrumentos de escolha;
- no desktop, o layout lê como editorial premium estático;
- no mobile, a página vira uma sequência muito longa de blocos e três cards quase idênticos;
- a combinação preto + creme + Georgia + linhas finas cai precisamente em um dos territórios genéricos alertados pelo guia de frontend fornecido pelo usuário.

O problema não é “falta de mais animações”. É falta de um **sistema contínuo de resposta** no qual caixa, bastão áspero, brasa, fumaça, cinza, atributos e ações de compra tenham papéis distintos e reconhecíveis.

Recomendação desta frente: preservar a base funcional; criar um laboratório isolado com três narrativas concorrentes; validar categoria, compreensão, desejo, acessibilidade e custo; só então levar uma assinatura vencedora para a Home/PDP.

## 1. Evidência examinada

### Código e documentação

- Stack em `site/package.json`: Next 16.3.3, React 19.2.8, Vinext beta.8, Anime.js 4.5.0 e Three.js 0.185.1.
- Home e conteúdo: `site/app/page.tsx` e `site/app/globals.css`.
- Three.js: `site/components/three/EmberSmokeScene.tsx`, `createEmberSmokeRuntime.js` e CSS Module da cena.
- Anime.js: `EditorialSeamReveal.tsx`, `EmberCartFeedback.tsx` e `motion.module.css`.
- Jornada: Home, busca, coleção, PDP, sacola, checkout demonstrativo e páginas editoriais em `site/app/`.
- Contratos atuais: `docs/design/*`, `docs/ux/*`, `docs/content/*`, `docs/brand/POSITIONING.md` e `docs/performance/PERFORMANCE_BUDGET.md`.
- Explorações paralelas: `BRANDING_COPY_DIRECTIONS.md`, `EXPERIENCE_MOTION_LAB.md` e `PRODUCT_PACKAGING_RESEARCH.md`.
- Guia anexado de frontend design lido integralmente: hero como tese, tipografia deliberada, estrutura que codifica significado, uma assinatura forte, motion com função e autocrítica contra defaults visuais.

### Inspeção renderizada

Foi feita inspeção visual read-only em `http://localhost:3000/` em 2026-08-28, com:

- desktop: viewport de 1440 × 900;
- mobile: viewport de 390 × 844;
- leitura da árvore semântica renderizada.

Não foram executados testes automatizados por HEAL-26. As observações abaixo não substituem os gates já registrados pelo projeto.

## 2. Inventário honesto do que existe

### 2.1 Frontend core existente

| Capacidade | Estado real | Valor | Limite atual |
|---|---|---|---|
| SSR e semântica | Conteúdo e CTAs principais em HTML | Categoria e compra não dependem de efeitos | Ainda não há estado narrativo compartilhado entre seções |
| Carregamento Three | Import dinâmico quando a cena se aproxima da viewport | Protege first load e permite fallback | Só existe uma ilha; ela não conversa com escolhas ou produto |
| Qualidade gráfica | Tiers low/medium/high por viewport, hardware e rede | Boa base adaptativa | Os tiers mudam custo, não composição ou função |
| Pausa e cleanup | IntersectionObserver, Page Visibility, dispose e context loss | Evita loop fora de vista | Não há orçamento central para várias futuras cenas |
| Acessibilidade sensorial | SVG fallback, reduced motion/data, forced colors | Conteúdo sobrevive sem WebGL | O fallback é equivalente apenas ao hero atual, não a uma jornada futura |
| Anime.js | Scope React, timeline curta e cleanup | Integração correta e localizada | Somente seam e confirmação de sacola; nenhum instrumento de exploração |
| Commerce | Fixture com busca, coleção, PDP, sacola e handoff | Permite testar fluxo honesto | A experiência da Home não prepara comparação nem decisão real |
| Naming atual | `HEAL` e “HEALS — os incensos da HEAL” já aparecem na Home | Corrige a ambiguidade inicial | Há docs legados e estados de rota ainda a reconciliar; HEALS não possui um componente/contrato único |

### 2.2 Frontend design existente

| Elemento | O que existe | Leitura visual |
|---|---|---|
| Paleta | carvão, papel creme, fumaça cinza e brasa vermelha | Coerente, mas muito próxima do default premium/editorial apontado no guia anexado |
| Tipografia | Georgia editorial + Segoe UI | Clara e disponível, porém sem voz tipográfica proprietária |
| Hero | H1 grande, texto, CTA, três provas e cena enquadrada | Funciona como abertura; a cena ainda parece um quadro decorativo ao lado do texto |
| Estrutura | dark hero → seam → blocos claros → footer escuro | Boa legibilidade; mudança de zona não carrega transformação material suficiente |
| Cards | placeholders repetidos, fatos, preço, estoque e CTA | Honestidade alta; desejo e diferenciação muito baixos sem packshot/textura reais |
| Componentes | bordas retas, hairlines, grandes vazios | Disciplina visual, mas alto risco de parecer template editorial |

### 2.3 Frontend UX existente

- Primeiro frame responde “marca”, “incensos”, promessa editorial e CTA.
- Navegação mantém a palavra reconhecível `Incensos`.
- A Home oferece dois caminhos conceituais: matéria e momento.
- Cards explicam família, notas, intensidade e fumaça, ainda como `[A VALIDAR]`.
- Busca, coleção, PDP, sacola e handoff possuem estados de demonstração explícitos.
- A experiência não depende de hover, WebGL ou animação para funcionar.
- Mobile e desktop preservam as mesmas rotas e conteúdo principal.

### 2.4 Por que ainda parece pouco

1. **A fumaça não é protagonista persistente.** Ela aparece no hero e desaparece da lógica da jornada.
2. **Não há verdade visual do produto.** A vareta atual é fina, lisa e abstrata; não comunica o bastão espesso, áspero, granulado e irregular solicitado.
3. **Não há transformação.** Caixa, bastão, brasa e cinza não formam uma sequência de estados ligados à ação do usuário.
4. **As duas portas não respondem.** Escolher “matéria” ou “momento” navega, mas não muda a página, a curadoria ou a explicação diante do usuário.
5. **O passaporte não é instrumento.** Hoje é uma lista; deveria ajudar a comparar e deixar uma escolha explicável.
6. **O layout usa um vocabulário conhecido demais.** Fundo creme, serifada de alto contraste, carvão, hairlines e números `01/02` são corretos, mas não específicos o bastante para HEAL.
7. **A cena está enquadrada como mídia.** O retângulo do hero faz o Three parecer um vídeo ou ilustração anexada, não parte da interface.
8. **Os placeholders triplicam a mesma leitura.** No mobile, três imagens e fichas quase idênticas criam fadiga antes de criar desejo.
9. **O mobile empilha, mas não recompõe.** A paridade funcional existe; a coreografia espacial não.
10. **A experiência não registra intenção.** O usuário não vê o sistema aprender com uma escolha explícita nem preservar contexto até a PDP/sacola.
11. **Não há um momento de inspeção controlada.** Falta poder abrir caixa, ver lateral, aproximar textura, comparar escala e retornar ao contexto.
12. **A confiança ainda é majoritariamente verbal.** A fixture é honesta, mas o futuro produto precisa provar matéria, formato, quantidade, duração, segurança e embalagem visualmente.

## 3. UX gap map por jornada

| Etapa | O que existe | Gap desktop | Gap mobile | Oportunidade de experiência |
|---|---|---|---|---|
| 0. Primeiro contato | HEAL, explicação HEALS/incensos, headline e CTA | Cena vive em moldura lateral e não altera a interface | H1, prova e cena ocupam muito scroll antes da escolha | Fazer o produto áspero ser a tese; manter `Incensos` visível antes do efeito |
| 1. Orientação | Portas “matéria” e “momento” | Cards são grandes links estáticos | Cada porta ocupa quase uma tela e a relação entre elas se perde | Seletor curto, comparável e reversível com preview consequente |
| 2. Descoberta | Três fixtures e coleção | Repetição sem diferenciação material | Lista muito longa, baixa densidade de decisão | Família/atributo persistente, comparação e crops específicos por SKU |
| 3. Comparação | Quatro campos no card | Não há seleção lado a lado nem realce cruzado | Usuário precisa memorizar dados separados por milhares de pixels | Bandeja de comparação com 2–3 HEALS e atributos normalizados |
| 4. Inspeção | PDP funcional e campos factuais | Falta galeria que prove caixa, escala, textura e abertura | Falta sequência touch-first sem carrossel opaco | `Ver textura`, `Abrir e ver`, frente/lateral, macro 1:1 e retorno estável |
| 5. Escolha de quantidade | Controle funcional na PDP | Sem materialidade ou antecipação de conteúdo | Não há ação de compra acessível durante leitura longa | Buy bar contextual apenas quando preço/estoque forem verdadeiros |
| 6. Confirmação | Brasa Anime.js após add confirmado | Feedback é local e não preserva identidade do produto | Brasa pode passar despercebida fora do foco | Continuidade por token de produto + status textual + badge atualizado |
| 7. Sacola | Itens, quantidade, CEP e handoff de fixture | Atmosfera desaparece completamente | Fluxo vira formulário utilitário longo | Assinatura discreta por item, comparação de frete e recuperação de erro |
| 8. Confiança | Fixture, segurança, conteúdo editorial | Prova real ainda ausente | Políticas ficam distantes da decisão | Prova contextual sob demanda, sem jogar o usuário em páginas genéricas |
| 9. Retorno | Navegação e rotas | Contexto da porta/filtro pode se perder | Voltar tende a retornar em ponto incerto | URL/state restaurável, foco e scroll devolvidos ao produto de origem |

## 4. Catálogo de propostas frontend

Legenda de custo: `P` = pequeno, `M` = médio, `G` = grande. Custo é relativo e não substitui estimativa após protótipo.

### 4.1 Frontend core

| ID | Proposta e função para o usuário | Gatilho → resposta | Tecnologia provável | Fallback / reduced motion | Custo e performance | Risco principal |
|---|---|---|---|---|---|---|
| FC-01 | **Modelo de estado narrativo local.** Mantém qual porta, atributo e HEAL o usuário escolheu. | Seleção explícita → `data-intent`, URL e resumo atualizam juntos | React state + URLSearchParams; máquina pequena tipada | HTML permanece na ordem inicial; seleção por links | M; zero loop; hidratar só a ilha | Virar “personalização” opaca ou criar estado impossível |
| FC-02 | **Orquestrador de motion islands.** Garante que só uma assinatura de alto custo esteja ativa. | Entrada/saída de zona e visibilidade → ativa/pausa runtime correto | Context leve + Anime `createScope`; IntersectionObserver; Page Visibility | Todas as ilhas têm estado final estático | M; reduz RAF concorrente | Context global acoplar componentes ou criar re-render amplo |
| FC-03 | **Contrato HEALS explicável.** Evita a palavra proprietária solta. | Primeira ocorrência por rota → nome + categoria; ocorrências seguintes → forma curta | Componente SSR `ProductFamilyTerm` com variantes | Texto completo sempre presente no HTML | P; custo nulo | Ocultar a categoria para “limpar” visual e perder compreensão |
| FC-04 | **Manifesto de assets por verdade.** Escolhe packshot, macro, escala, textura e fallback sem inventar mídia. | Render de SKU → carrega papéis de imagem definidos, não posições arbitrárias | Typed manifest + `picture`/Image; provenance e dimensions | Placeholder rotulado por papel ausente | M; evita overfetch; art direction mobile | Manifesto aceitar imagens geradas como fato sem rótulo |
| FC-05 | **Budget manager para WebGL.** Qualidade muda conteúdo e custo de forma previsível. | Hardware/rede/preferência/visibilidade → tier e cena permitida | Capability check, dynamic import, DPR/FPS caps, context limit | Still/SVG equivalente; sem download do runtime | M; gate de memória, frame time e chunk | Heurística classificar mal aparelho ou mudar durante interação |
| FC-06 | **Transição de contexto card → PDP.** Mantém reconhecimento do objeto aberto. | Ativação do card → packshot/nome reaparecem na PDP | View Transition API progressive enhancement + CSS | Navegação normal com foco no H1 | M; nenhum canvas obrigatório | Transição mascarar espera ou quebrar back/forward |
| FC-07 | **Bandeja de comparação restaurável.** Permite comparar 2–3 HEALS. | `Comparar` → tray/drawer mostra mesmos campos e persiste na URL/sessão | React island + sessionStorage/URL; dialog/drawer nativo | Página `/comparar` com tabela HTML | G; lazy; sem animar tabela inteira | Sobrecarga cognitiva e persistência sem consentimento claro |
| FC-08 | **Restauração de retorno.** Devolve scroll e foco ao card de origem. | Back da PDP → coleção reabre filtro, posição e foco | History state + IDs estáveis + focus management | Topo da coleção com aviso/atalho | M; sem custo contínuo | Restaurar scroll em layout que mudou e causar salto |
| FC-09 | **Instrumentação de experiência.** Mede compreensão e custo, não vaidade. | Seleção, inspeção, comparação e erro → evento sem PII; LoAF/frame/GPU quando disponível | PerformanceObserver + analytics adapter desligado por padrão | Nenhuma telemetria sem consentimento/adapter | M; amostragem; evitar observer excessivo | Coletar demais, confundir interação com sucesso |
| FC-10 | **Espelho semântico de toda cena.** Toda relação visual tem controle e texto equivalentes. | Hover/drag/scroll → estado também é acionável por teclado e descrito fora do canvas | HTML/SVG autoritativo + ARIA discreta; canvas `aria-hidden` | É a própria experiência base | M; DOM enxuto | Duplicar anúncio ou criar controles redundantes |

### 4.2 Frontend design

| ID | Proposta e função para o usuário | Gatilho → resposta | Tecnologia provável | Fallback / reduced motion | Custo e performance | Risco principal |
|---|---|---|---|---|---|---|
| FD-01 | **Hero como transformação material, não quadro de fumaça.** Explica o produto antes do clima. | Primeiro frame → caixa + bastão áspero legíveis; scroll → brasa e matéria se separam em informação | HTML/SVG + imagem/2.5D; Three só após aprovação | Composição estática com os mesmos três estados | G; LCP exige poster otimizado | Efeito dominar categoria/CTA ou parecer filme de perfume |
| FD-02 | **Macro rasante da superfície.** Prova que o bastão é espesso, seco, granulado e irregular. | Botão/foco `Ver textura` → crop macro abre e legenda diferencia aparência de composição | `<picture>` + clip reveal Anime; zoom acessível | Imagem macro direta em dialog/figure | M; imagens AVIF/WebP por DPR | Textura gerada ser confundida com produto real |
| FD-03 | **HEALS como legenda gráfica.** Ensina o termo sem depender de parágrafo. | Primeiro contato → `HEALS` é visualmente ligado a `INCENSOS DA HEAL` | Tipografia, baseline, chave/linha semântica, não ícone decorativo | Texto linear `HEALS — os incensos da HEAL` | P; CSS | Virar lockup ilegível em mobile ou SEO ambíguo |
| FD-04 | **Atlas da matéria responsivo.** Conecta materiais, percepção e produtos sem falsa ciência. | Escolha de matéria → ficha e HEALS relacionados compartilham marcador | CSS grid/subgrid + SVG paths; Anime draw opcional | Lista filtrada com headings e links | G; SVG leve; sem canvas | Parecer museu naturalista ou alegar ingrediente não confirmado |
| FD-05 | **Vocabulário de fumaça comparável.** Mostra nível como atributo, não névoa genérica. | Foco no nível → 1–3 ribbons padronizados + texto da escala | SVG procedural determinístico | Ícone estático + `baixo/médio/alto` conforme método real | M; baixo custo | Simulação sugerir emissão real sem medição |
| FD-06 | **Caixa 2.5D reversível.** Ensina frente, lateral, abertura e conteúdo. | `Abrir e ver` → sequência controlada; `Fechar` restaura estado | CSS 3D/Anime timeline; eventualmente Three com pivôs | Galeria ordenada de quatro stills | G; protótipo sem modelo pesado | Virar brinquedo, esconder informação ou quebrar no toque |
| FD-07 | **Passaporte vivo.** O dado destacado na ficha realça a prova visual correspondente. | Hover/foco/tap no atributo → linha e crop relacionados se conectam | CSS vars + SVG drawable + React state | Definition list completa; sem movimento | M; sem layout thrash | Decorar atributo subjetivo como precisão científica |
| FD-08 | **Sistema de cards por gesto real.** Cada card revela um papel diferente da imagem. | Foco/hover/tap → frente, macro ou escala, conforme controle nomeado | `picture`, tabs ou segmented control; WAAPI curta | Primeira imagem e links de galeria | M; preload apenas da próxima imagem | Hover invisível no touch ou cards inconsistentes |
| FD-09 | **Tipografia proprietária por função.** Diferencia marca, narrativa e prova. | Não há gatilho; hierarquia codifica conteúdo | Fonte display com licença + sans humanista + mono/utility para lote/dados | System stack cuidadosamente calibrada | M; subset WOFF2 e `font-display` | Trocar Georgia por outra serifada “de luxo” e continuar genérico |
| FD-10 | **Recomposição mobile, não simples empilhamento.** Resume prova, mantém escolha e alterna mídia sob demanda. | Breakpoint/capacidade → cards compactos, comparação em sheet, hero sem moldura | Container queries + CSS grid; progressive disclosure | Tudo em fluxo e headings corretos | G; reduz bytes visuais mobile | Esconder fatos essenciais atrás de accordions demais |

### 4.3 Frontend UX

| ID | Proposta e função para o usuário | Gatilho → resposta | Tecnologia provável | Fallback / reduced motion | Custo e performance | Risco principal |
|---|---|---|---|---|---|---|
| UX-01 | **Entrada guiada reversível.** Ajuda quem não conhece matéria nem vocabulário. | Escolha `matéria`, `momento` ou `ver todos` → preview e resultado mudam sem perder saída | Form/fieldset + URL; Anime só na ligação visual | Navegação server-rendered com query | M | Quiz parecer diagnóstico emocional ou ocultar catálogo |
| UX-02 | **Comparação em uma frase.** Explica por que dois HEALS diferem. | Selecionar dois cards → resumo factual gerado por regras | Template determinístico sobre dados validados | Tabela de atributos | M | Linguagem inferir benefícios ou inventar diferença |
| UX-03 | **Categoria no momento certo.** Ensina HEALS nos três primeiros contatos sem poluir. | Rota, card e PDP → forma verbal vai de completa a curta | Contrato FC-03 + content tokens | Texto completo | P | Persistir uma forma curta em entrada profunda via SEO |
| UX-04 | **Inspeção orientada do objeto.** Dá tarefas concretas: frente, textura, escala, conteúdo. | Ativar `Examinar` → quatro passos, todos puláveis e reversíveis | Tabs/stepper não modal; images/2.5D | Galeria e anchors | M/G | Transformar compra rápida em onboarding obrigatório |
| UX-05 | **Resumo de intenção persistente.** Mostra `Você começou por matéria: ...` e permite limpar. | Escolha explícita → chip/resumo aparece em coleção/PDP | URL state + dismiss/reset | Breadcrumb textual | M | Parecer rastreamento ou personalização invisível |
| UX-06 | **Compare sem memorizar no mobile.** Mantém atributos de 2–3 produtos na mesma tela. | Marcar comparar → bottom sheet não modal ou página dedicada | Dialog/bottom sheet + tabela horizontal controlada | Página `/comparar` linear | G | Sheet cobrir CTA, trap de foco ou tabela larga |
| UX-07 | **Buy bar contextual mobile.** Reduz retorno cansativo ao CTA sem esconder preço/estoque. | Após passar painel de compra e só com variante válida → barra aparece; some no rodapé | IntersectionObserver + CSS sticky | CTA original permanece | M; sem animação contínua | Promover compra antes de segurança ou cobrir conteúdo |
| UX-08 | **Prova contextual de confiança.** Coloca uso, segurança, origem e entrega ao lado da decisão. | Expandir questão → resposta da fonte do SKU; link para detalhe | Accordion nativo/React; provenance display | Seções abertas e links | M | Conteúdo genérico ou não verificado ganhar aparência oficial |
| UX-09 | **Continuidade da sacola.** Faz o usuário reconhecer o objeto sem espetáculo. | Add confirmado → nome, miniatura e token chegam à sacola; status anunciado | Estado de commerce + WAAPI opcional | Badge + `role=status` + item normal | M | Animação de “voo” competir com confirmação ou causar enjoo |
| UX-10 | **Pausa explícita da atmosfera.** Dá controle a pessoas sensíveis. | Botão `Pausar movimento` → todos os ambientes param e preferência fica na sessão | Context FC-02 + button; sessionStorage | Sem motion desde a carga quando reduced motion | M | Controle aparecer sem efeito em cenas já estáticas |
| UX-11 | **Retorno com contexto.** Reduz desorientação depois da PDP. | Voltar → card origem recebe foco visível e aviso curto `Você voltou para...` | FC-08 + live region pontual | Âncora/id do card | M | Anunciar demais ou reposicionar contra intenção do usuário |
| UX-12 | **Modo compra rápida sem perder a experiência.** Respeita quem já sabe o que quer. | `Ver todos os incensos` ou busca direta → pula narrativa e vai ao catálogo | Link explícito, rotas indexáveis, busca por sinônimos | É o caminho base | P | Esconder o atalho para forçar “imersão” |

## 5. Três storyboards concorrentes para a Home

Os três roteiros usam o mesmo conteúdo comercial e os mesmos gates. Eles diferem na narrativa e na assinatura. Nenhum é recomendação oficial de branding.

### Storyboard A — Da matéria à brasa

**Tese:** o usuário entende HEALS vendo um bastão áspero se transformar, etapa por etapa, em escolha compreensível.  
**Protagonista:** um único bastão real ou concept asset claramente rotulado.  
**Assinatura:** o mesmo relevo longitudinal vira linha de navegação e, depois, escala de atributos.

| Scroll/cena | Desktop | Mobile | Ação e resposta | Base sem motion/WebGL |
|---|---|---|---|---|
| 0. 0–10% — reconhecer | HEAL e `HEALS — os incensos da HEAL` dividem o campo com macro do bastão, sem moldura de vídeo | Nome, categoria e CTA antes de um crop curto do bastão | Nenhuma ação obrigatória | Foto/crop com H1 e CTA |
| 1. 10–24% — encontrar a superfície | Luz rasante revela grãos e irregularidade; legenda diz que aparência não prova composição | Botão `Ver textura` abre macro em sheet/figure | Pointer só altera luz discretamente; toque abre controle explícito | Macro estático com legenda |
| 2. 24–38% — acender o intervalo | A brasa surge uma vez; a fumaça deixa um traço que alcança as duas portas | Corte entre still não bloqueante; sem pin longo | Scroll sincroniza apenas camada decorativa | Três frames estáticos: bastão, brasa, fumaça |
| 3. 38–52% — escolher uma porta | Matéria/momento ocupam lados do mesmo traço; foco mostra preview | Fieldset em três opções: matéria, momento, todos | Seleção muda resumo e próximos cards; é reversível | Links server-rendered com query |
| 4. 52–70% — deixar um rastro | Passaporte vivo conecta atributo selecionado a 3 HEALS | Ficha compacta acima de lista; `Comparar` fixa 2 itens | Foco/tap cruza campo ↔ card | Definition list + filtros |
| 5. 70–88% — comparar matéria | Cards usam frontal, macro e escala diferentes; dois podem ir à bandeja | Um card por tela parcial, com compare bar | Abrir macro/compare não muda rota involuntariamente | Cards com galeria acessível |
| 6. 88–100% — decidir | CTA `Explorar incensos` e link `Como escolher`; cinza encerra o traço | Resumo da intenção + CTA full width | Limpar intenção ou continuar | Texto/CTA normal |

**Risco:** parecer uma simulação factual de queima.  
**Teste decisivo:** em cinco segundos, a pessoa responde “incensos”; após explorar, distingue textura observada de composição comprovada.

### Storyboard B — A caixa se explica

**Tese:** confiança nasce ao abrir a embalagem digitalmente e descobrir que cada camada responde uma pergunta real.  
**Protagonista:** a caixa HEALS, não a fumaça.  
**Assinatura:** uma abertura reversível transforma face, lateral e interior em arquitetura da página.

| Scroll/cena | Desktop | Mobile | Ação e resposta | Base sem motion/WebGL |
|---|---|---|---|---|
| 0. 0–12% — reconhecer | Caixa fechada em 3/4 com `HEAL`, `HEALS` e `INCENSO EM BASTÃO` legíveis | Face frontal 4:5; CTA vem antes da mídia secundária | `Examinar a caixa` é opcional | Packshot frontal + CTA |
| 1. 12–28% — girar com propósito | Três botões: frente, lateral, verso; yaw é limitado | Tabs `Frente/Lateral/Verso`, sem drag obrigatório | Cada vista realça um tipo de informação | Galeria de três stills |
| 2. 28–44% — abrir | Gaveta/tampa abre só após `Abrir e ver` | Sequência de duas imagens, sem scroll hijacking | Controle reverte com `Fechar` | Antes/depois lado a lado |
| 3. 44–58% — confirmar conteúdo | Bastões ásperos aparecem em escala, pouch e quantidade | Macro + vareta inteira alternáveis | Foco na textura abre legenda factual | Figuras com captions |
| 4. 58–72% — ler o passaporte | Painéis da caixa se desdobram em família, intensidade, fumaça, uso e origem | Accordion compacto mantém uma seção aberta | Campo selecionado realça mesma informação no pack | Seções HTML lineares |
| 5. 72–88% — ver coleção | Cinco caixas mostram sistema sem fingir SKUs reais | Scroller com snap opcional e botões anterior/próximo | Trocar SKU conserva ângulo/vista escolhida | Grid/lista normal |
| 6. 88–100% — escolher | Comparar / explorar / ver processo | CTA e link de comparação claros | Continua para catálogo; nenhum add direto no conceito | Links normais |

**Risco:** embalagem ainda não existe; concept art pode ganhar autoridade falsa.  
**Teste decisivo:** a pessoa identifica o que há dentro, como comparar e onde buscar segurança sem confundir render com produto final.

### Storyboard C — Cartografia do ar

**Tese:** a interface orienta uma atmosfera sem fingir que transmite cheiro ou diagnostica estado emocional.  
**Protagonista:** um mapa formado apenas por escolhas explícitas do usuário.  
**Assinatura:** o trajeto escolhido vira uma linha curta que conecta intenção, atributos e HEALS.

| Scroll/cena | Desktop | Mobile | Ação e resposta | Base sem motion/WebGL |
|---|---|---|---|---|
| 0. 0–10% — reconhecer | HEAL/HEALS/incensos e três rotas visíveis: matéria, momento, todos | Mesmo conteúdo em fieldset vertical | Nada reage sem escolha | Formulário/links completos |
| 1. 10–28% — declarar entrada | Mapa simples abre dois eixos, nunca uma nuvem abstrata | Passos curtos com voltar/limpar | Seleção explícita desenha só o trecho correspondente | Breadcrumb de escolhas |
| 2. 28–44% — traduzir | Termo leigo é ligado a atributo comparável | Resumo `Você escolheu...` sempre visível | Usuário confirma ou corrige | Texto e definição |
| 3. 44–60% — visualizar o ar | Três densidades padronizadas representam nível de fumaça, se validado | Três stills/ícones com texto | Foco compara; nada segue acelerômetro/pointer | SVG estático + labels |
| 4. 60–76% — encontrar HEALS | Produtos ocupam pontos do mapa por dados reais, não afinidade inventada | Lista ordenada com motivo explícito | `Por que apareceu?` abre regras | Lista com critérios |
| 5. 76–90% — comparar | Dois HEALS sobrepostos só nos mesmos atributos | Tabela de duas colunas ou linhas alternadas | Trocar produto atualiza sem perder foco | Tabela HTML |
| 6. 90–100% — sair do mapa | Linha termina no produto, não em “resultado sobre você” | CTA `Ver incenso` e `Ver todos` | Estado vai na URL e pode ser limpo | Links com query |

**Risco:** parecer quiz de wellness, mapa científico ou recomendação clínica.  
**Teste decisivo:** a pessoa entende que escolheu uma organização editorial, não recebeu diagnóstico ou promessa de efeito.

## 6. Arquitetura progressiva HEALS = incensos

### 6.1 Regra central

`HEALS` nunca substitui `incensos` no primeiro contato de uma rota, entrada por busca, card isolado, compartilhamento social, título de produto ou contexto de compra.

### 6.2 Escada de exposição

| Nível | Contexto | Forma recomendada para teste | Regra |
|---|---|---|---|
| L0 — descoberta externa | title, description, OG, busca, anúncio | `HEAL — incensos HEALS para...` | Categoria explícita; não assumir memória |
| L1 — primeiro frame da rota | nav + hero/heading | `HEALS — os incensos da HEAL` | Uma frase curta e inequívoca |
| L2 — objeto comercial | card, compare, PDP | `[NOME] — incenso HEALS` / `INCENSO EM BASTÃO · HEALS` | Produto singular e formato ficam claros |
| L3 — contexto já estabelecido | filtro local, coleção, editorial | `HEALS` | Permitido apenas se `incensos` estiver visível/recente no mesmo contexto |
| L4 — operação | sacola, checkout, email futuro | `Incenso [NOME] · HEALS` | Recibo e suporte priorizam identificação, não linguagem de campanha |

### 6.3 Contrato de interface

- Header e menu: `HEAL` como marca; `Incensos` como categoria.
- Hero: `HEALS — os incensos da HEAL`.
- Busca: placeholder `Buscar incensos, aromas e matérias`; sinônimos `heal`, `heals`, `incenso`, `incensos`.
- Card: eyebrow `INCENSO HEALS`; título com nome do produto, não apenas número interno.
- PDP: breadcrumb `Incensos / [coleção] / [produto]`; categoria e formato antes da descrição sensorial.
- Comparação: heading `Comparar incensos HEALS`.
- Sacola: item `Incenso [nome] · HEALS`; nunca `1 HEALS`.
- Conteúdo: `Como escolher um incenso HEALS`, quando a forma proprietária agregar valor.
- Acessibilidade: não usar `aria-label` diferente para esconder ambiguidade visual; o texto visível também deve explicar.
- SEO: toda página que possa ser porta de entrada reapresenta `incenso`; não depender de cookie/session para compreensão.

### 6.4 Testes de compreensão

1. Exibir primeiro viewport por cinco segundos; perguntar “o que esta marca vende?”. Meta proposta: pelo menos 90% responder `incensos` sem ajuda.
2. Mostrar card isolado; perguntar o que significa HEALS. Meta: pelo menos 80% associar a linha/produto de incenso.
3. Mostrar Home após remover o canvas; a resposta deve permanecer igual.
4. Mostrar resultado vindo por busca direto na PDP; categoria precisa estar clara sem ter visto a Home.
5. Testar pronúncia e singular espontâneo; não prescrever “um HEAL” antes de pesquisa.

## 7. Anti-padrões específicos para HEAL

1. Adicionar partículas, parallax, glow ou morph apenas para “parecer premium”.
2. Fazer fumaça seguir cursor como mouse trail sem função de comparação ou orientação.
3. Prender o scroll em uma longa sequência cinematográfica antes do catálogo.
4. Usar áudio, vibração, microfone, giroscópio ou câmera como condição da experiência.
5. Simular cheiro, bem-estar, energia, tratamento ou resposta corporal.
6. Mostrar uma vareta fina, lisa e perfeita quando o território desejado é áspero e artesanal.
7. Usar imagens geradas sem rótulo como prova de produto, processo ou embalagem existente.
8. Construir 360° antes de possuir fotografias/medidas verdadeiras de frente, lateral, escala e textura.
9. Colocar Three.js em Home, PLP, PDP e carrinho só para demonstrar tecnologia.
10. Animar texto por caractere, atrasar preço/CTA ou esconder conteúdo até entrar no viewport.
11. Fazer pinning longo e parallax amplo no mobile.
12. Traduzir desktop para mobile apenas empilhando blocos.
13. Fazer cards inteiros escalarem/boiarem em todo hover; a resposta deve indicar a ação específica.
14. Usar `01/02/03` quando o número não codificar ordem, lote, intensidade ou etapa real.
15. Trocar Georgia por outra serifada de luxo e chamar isso de identidade nova.
16. Usar a combinação creme + preto + terracota sem uma justificativa própria da matéria/embalagem escolhida.
17. Abrir caixa com drag obrigatório; sempre oferecer botões nomeados e reversíveis.
18. Confundir `prefers-reduced-motion` com “usuário quer experiência vazia”; preservar narrativa em stills e estados finais.
19. Exibir níveis de fumaça/duração antes de existir método ou fonte por SKU.
20. Ocultar `Incensos` para tornar HEALS mais misterioso.
21. Forçar onboarding sensorial a usuários que querem busca ou catálogo direto.
22. Instrumentar ponteiro, scroll detalhado ou dados pessoais sem finalidade e governança.

## 8. Matriz Now / Next / Later

### NOW — clareza, verdade e laboratório

| Entrega | Resultado esperado | Gate para encerrar |
|---|---|---|
| Contrato único HEAL/HEALS/incensos | Mesma regra em Home, busca, cards, PDP e sacola | Revisão de conteúdo + teste de entrada profunda |
| Inventário de produto verdadeiro | Medidas, quantidade, macro, superfície, frente/lateral e claims separados | Amostra/lote e fonte; sem inferência por concorrente |
| Baseline visual e técnica | Screenshots, DOM, bytes, LCP/INP/CLS lab, WebGL on/off, reduced motion/data | Evidência repetível desktop/mobile |
| Laboratório A/B/C isolado | Três storyboards navegáveis com o mesmo conteúdo | Não linkado da loja; fixture/concept sempre rotulados |
| Prototótipos de três momentos | Hero-tese, passaporte vivo e caixa→matéria em baixa fidelidade | Todos funcionam sem Anime/Three |

### NEXT — escolha por evidência

| Entrega | Resultado esperado | Gate para encerrar |
|---|---|---|
| Teste de compreensão | HEAL, HEALS e incensos entendidos | Metas da seção 6.4 |
| Teste de tarefa | Encontrar, comparar e explicar uma escolha | Sucesso ≥85%; erros e backtracks registrados |
| Teste de desejo/distintividade | Uma assinatura lembrada sem confundir categoria | Entrevista cega; não usar só “gostei” |
| Hardening de um vencedor | Teclado, foco, screen reader smoke, reduced motion/data, touch e error states | WCAG/gates do projeto e nenhum bloqueio da compra |
| Performance por tier | Assinatura cabe em budget e pausa corretamente | Budget atual respeitado, 0 loop oculto, sem regressão >10% |

### LATER — integração e escala

| Entrega | Resultado esperado | Gate para encerrar |
|---|---|---|
| Integração da assinatura vencedora | Home e PDP contam a mesma história | Aprovação explícita de direção e storyboard |
| Modelo/360, se ainda necessário | Só supera 2.5D/fotografia em tarefa real | Ganho mensurável em inspeção/compreensão |
| Sistema de coleção | 5–20 SKUs continuam legíveis em prateleira e mobile | Teste com catálogo real e miniaturas |
| RUM e melhoria contínua | Dados de campo mobile/desktop | Consentimento/governança + volume suficiente |
| Rollout de motion adicional | Só momentos com efeito comprovado | Um novo efeito entra apenas removendo/justificando outro |

## 9. Gates transversais

### G0 — decisão criativa

- Usuário escolheu uma direção ou autorizou híbrido específico.
- Premissa, protagonista, assinatura e storyboard foram aprovados separadamente.
- “Bonito” não basta; precisa ser reconhecível como HEAL sem logo em teste controlado.

### G1 — verdade de produto

- Caixa, bastão, quantidade, textura e dimensões têm fonte real ou estão rotulados `CONCEITO`.
- Imagem gerada nunca é tratada como packshot real.
- Fumaça, duração, composição, origem e segurança não são inferidas pela aparência.

### G2 — UX

- Categoria reconhecida em cinco segundos.
- Catálogo direto permanece disponível.
- Escolha é reversível; comparação não exige memória; retorno restaura contexto.
- Nenhuma cena impede preço, estoque, frete, segurança ou CTA.

### G3 — acessibilidade

- Teclado, foco visível, screen reader smoke, zoom 200%, reflow 320 px e target size.
- Controle de pausa quando houver ambiente contínuo.
- Reduced motion preserva narrativa; forced colors preserva estados; canvas é decorativo.

### G4 — performance e robustez

- Budgets de `docs/performance/PERFORMANCE_BUDGET.md` continuam vigentes.
- Nenhuma cena roda fora de viewport/aba visível.
- Context loss, WebGL indisponível, Save-Data, rede lenta e erro de asset têm fallback testado.
- Long animation frames, memória GPU, INP e bateria entram no aceite; FPS isolado não basta.

### G5 — commerce e confiança

- Add só anima após confirmação autoritativa.
- Preço, estoque, quantidade, CEP e handoff permanecem determinísticos.
- Erro, retry, undo e foco são mais importantes que continuidade visual.

## 10. Protótipo isolado recomendado

### Estrutura

Criar, somente após autorização, um laboratório não indexado e não linkado da loja, preferencialmente fora da árvore de produção ou sob uma rota explicitamente descartável:

```text
/lab/heal-experience?story=A&mode=full
/lab/heal-experience?story=B&mode=full
/lab/heal-experience?story=C&mode=full

mode=full | reduced | no-webgl | static
viewport=manual via harness de QA, não query pública
```

O laboratório deve usar:

- o mesmo conteúdo factual/fixture nas três variações;
- o mesmo header, CTA, número de produtos e tarefas;
- alternador visível de storyboard apenas no lab;
- badge persistente `CONCEITO — NÃO É PRODUTO FINAL`;
- assets com provenance e papéis definidos;
- nenhum endpoint novo, CMS, checkout, analytics real ou mudança de commerce;
- isolamento de CSS e runtime para evitar contaminar o storefront.

### Corte vertical de cada variação

1. Primeiro frame factual com HEAL/HEALS/incensos.
2. Uma única assinatura memorável.
3. Uma escolha explícita e reversível.
4. Um passaporte com dois HEALS comparáveis.
5. Um caminho direto para catálogo.
6. Quatro modos: full, reduced, no-WebGL e static.

Não prototipar inicialmente carrinho completo, 360 irrestrito, post-processing, áudio, partículas globais ou vinte microinterações. O objetivo é decidir **qual narrativa merece produção**, não provar que a stack consegue animar tudo.

### Roteiro de teste

- 8–12 pessoas do público candidato; separar novos usuários de quem já compra incenso.
- Tarefa 1: “O que esta marca vende?”
- Tarefa 2: “Encontre um incenso e diga por que ele parece adequado.”
- Tarefa 3: “Compare dois e explique uma diferença.”
- Tarefa 4: “Mostre onde confirmaria textura, conteúdo e uso.”
- Tarefa 5: “Vá direto ao catálogo sem participar da experiência.”
- Tarefa 6: repetir com reduced motion e em aparelho mobile intermediário.

### Critério de decisão entre A/B/C

| Critério | Peso |
|---|---:|
| Categoria HEALS/incensos compreendida | 25% |
| Escolha/comparação melhoradas | 20% |
| Distintividade lembrada depois de 10 minutos | 15% |
| Confiança e verdade material | 15% |
| Mobile/touch/reduced motion | 10% |
| Performance/robustez | 10% |
| Custo de produção e manutenção | 5% |

Reprovar qualquer variante que falhe categoria, acessibilidade ou verdade de produto, mesmo que obtenha maior preferência estética.

## 11. Recomendação final de HEAL-26

1. Tratar a Home atual como **baseline funcional**, não como direção visual final.
2. Preservar o contrato técnico já correto: HTML primeiro, Three lazy, Anime scoped, cleanup, reduced motion/data e commerce independente.
3. Não “encher” a baseline de efeitos. A próxima entrega deve ser o laboratório A/B/C.
4. Prototipar primeiro com imagem/2.5D; elevar a Three.js apenas o momento que provar ganho real.
5. Fazer o bastão áspero e a caixa — não a fumaça isolada — carregarem a verdade visual.
6. Escolher uma assinatura dominante e remover decoração concorrente.
7. Reescrever a composição mobile como experiência própria: escolha curta, inspeção sob demanda, comparação persistente e caminho rápido.
8. Integrar apenas após aprovação explícita de premissa, storyboard e evidência dos gates.

## 12. Limites desta entrega

- Auditoria read-only; nenhum arquivo de site, configuração, dependência ou governança foi alterado.
- Nenhuma das propostas foi implementada, testada com usuários ou aprovada.
- A inspeção visual foi local; não é validação cross-browser, release ou dado de campo.
- Custos são relativos; estimativas de engenharia dependem da direção, assets, catálogo e amostra física.
- As imagens e embalagens em paralelo continuam concept art até haver produto e especificação reais.
