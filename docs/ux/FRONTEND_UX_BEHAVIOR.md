# HEAL — Contrato de comportamento Frontend UX

Data: 2026-08-28  
Owner: HEAL-06  
Estado real: `docs` + auditoria estática da vertical slice atual; nenhuma alteração de código foi feita.  
Escopo: navegação, coleção/ordenação/filtros futuros, PDP, quantidade, estoque, add-to-cart, feedback, sacola, CEP, conflitos e handoff de checkout em desktop e mobile.  
Fontes internas: `HEAL_PROMPT_MESTRE_MULTIAGENTE.md`, `docs/ux/SITEMAP_AND_FLOWS.md`, `docs/ux/LOW_FIDELITY_WIREFRAMES.md`, `docs/content/*`, `docs/commerce/COMMERCE_CONTRACT.md` e implementação em `site/` na data acima.

## 1. Resultado executivo

A vertical slice atual cobre o caminho básico `Home → coleção → PDP → adicionar → sacola → handoff fixture` e mantém a natureza demonstrativa visível nas rotas de commerce. Há bons fundamentos: HTML semântico, controles nativos, skip link, targets de 44 px, estoque `unknown` bloqueando compra, confirmação de add-to-cart em região de status e checkout sem pedido/pagamento falso.

Ela ainda não satisfaz o contrato completo de UX. Os principais bloqueios são:

1. busca e filtros ainda não existem;
2. falha de catálogo vira silenciosamente uma coleção vazia;
3. a PDP não calcula CEP/frete;
4. estoque desconhecido bloqueia, mas não oferece o retry prometido;
5. mutações de sacola não representam loading, conflito, mudança de preço, estoque insuficiente nem recuperação focada;
6. remoção de item pode deixar o foco sem destino e não possui desfazer;
7. CEP cobre apenas válido/inválido, sem loading, indisponível, erro temporário ou opções;
8. erro de handoff não oferece `Tentar novamente`;
9. a Home usa uma faixa de demonstração menos explícita que o contrato autoritativo;
10. navegação mobile, ajuda e políticas ainda estão incompletas.

Até esses pontos serem implementados e testados, o estado deve continuar sendo descrito como **fixture funcional parcial**, não checkout sandbox ou loja pronta.

## 2. Princípios invariantes

### UX-INV-01 — Verdade comercial

- `fixture`, `sandbox` e `production` são estados de dados, não temas visuais.
- Em fixture, a mensagem completa permanece perceptível em todas as rotas e larguras: `Demonstração — produtos, valores, estoque e frete fictícios; nenhum pagamento será processado.`
- Preço, estoque, frete, desconto e total nunca são inferidos pela UI.
- `inventory.status = unknown` bloqueia compra e oferece uma ação real de nova consulta.
- Nenhum estado de sucesso de checkout significa pedido criado ou pagamento confirmado sem fonte autoritativa.

### UX-INV-02 — Atualização localizada

- Uma ação ocupa somente a região afetada: linha do carrinho, calculadora de CEP, filtros ou CTA.
- A página não congela por uma mutação local.
- Conteúdo válido permanece visível durante retry.
- Resposta antiga não pode sobrescrever uma resposta mais recente. Cada operação deve ser correlacionada por `requestId`, revisão do carrinho e chave de idempotência quando houver mutação.

### UX-INV-03 — Preservação e recuperação

- Erro nunca apaga CEP, variante, quantidade, filtros, consulta ou itens válidos.
- Nenhum ajuste de quantidade, variante, preço ou estoque acontece silenciosamente.
- Se o servidor devolver um snapshot mais novo, a UI mostra o que mudou e pede nova confirmação antes de avançar.
- Voltar do PDP para coleção restaura URL, filtros, ordenação e posição aproximada.

### UX-INV-04 — Foco e anúncio

- Sucesso assíncrono usa região persistente `role="status"`, `aria-live="polite"` e `aria-atomic="true"`; não move foco.
- Erro de campo fica ligado ao campo por `aria-describedby`; `aria-invalid="true"` só enquanto inválido.
- Erro bloqueante de uma única ação é anunciado quando aparece, sem repetir em cada render.
- Dialog/drawer recebe foco inicial útil, contém foco, fecha por botão e `Esc` e devolve foco ao acionador.
- Quando um controle focado desaparece, a aplicação define o próximo foco; nunca deixa a pessoa no `body` sem contexto.

### UX-INV-05 — Progressividade

- Home, coleção e PDP mantêm título, produto, preço demonstrativo rotulado e links essenciais no HTML inicial.
- Ordenação, busca e filtros básicos devem continuar utilizáveis como formulários/URLs quando JavaScript falhar.
- WebGL, Anime.js, hover, swipe e drag não são requisitos para navegar, comparar ou comprar.

### UX-INV-06 — Paridade funcional

- Mobile e desktop oferecem as mesmas tarefas, dados e recuperações.
- O padrão visual pode mudar: sidebar no desktop e drawer no mobile; coluna sticky no desktop e buy bar no mobile.
- Nenhuma ação existe apenas por hover, gesto lateral, menu contextual ou orientação.

## 3. Máquina de estados transversal

Todo componente que depende de dado ou mutação deve representar explicitamente:

| Estado | UI | Interação | Anúncio |
|---|---|---|---|
| `idle` | Dado estável e controles disponíveis. | Ações normais. | Nenhum anúncio repetitivo. |
| `validating` | Erro local ainda não mostrado enquanto a pessoa digita, salvo regra inequívoca. | Campo permanece editável. | Nenhum anúncio por tecla. |
| `loading` / `submitting` | Conteúdo anterior preservado; região com `aria-busy="true"`; rótulo verbal de progresso. | Bloquear apenas reenvio da mesma ação; permitir cancelar/editar quando seguro. | Uma mensagem curta ao iniciar quando a demora for perceptível. |
| `success` | Snapshot autoritativo substitui o anterior. | Próximas ações disponíveis. | Resultado objetivo, uma vez. |
| `empty` | Explica ausência e oferece caminho de saída. | CTA para catálogo/busca/ajuda. | H1/H2 descreve o estado. |
| `unavailable` | Explica indisponibilidade conhecida. | Alternativa ou retorno; não prometer retry se não existe. | Texto associado à região. |
| `conflict` | Mostra versão mais recente e diferença relevante. | Revisar e reenviar com nova chave/revisão. | `A sacola mudou; revise antes de continuar.` |
| `temporary_error` | Mantém dados e identifica falha temporária. | `Tentar novamente`; alternativa segura. | Erro + preservação + ação. |
| `fatal_error` | Interrompe só o fluxo inviável. | Voltar a um local seguro e contato quando real. | Referência não sensível, sem stack/PII. |

Regras de implementação:

- `disabled` não pode ser a única explicação; razão textual deve estar próxima.
- Loading não pode ser indicado apenas por spinner.
- Skeleton reserva dimensão, mas não substitui conteúdo já conhecido.
- Toast nunca é a única localização da mensagem e nunca contém ação crítica com timeout curto.
- `role="alert"` fica reservado a erro que exige atenção imediata; mensagens comuns usam `role="status"`.

## 4. Navegação global

### 4.1 Desktop

Ordem recomendada:

```text
HEAL. CURA. → Comprar → Como escolher → Guia do ritual → Sobre → Buscar → Sacola (n)
```

Comportamento:

- Logo volta ao início e tem nome acessível `HEAL. CURA. — início`.
- `Comprar` abre submenu somente se o padrão completo de menu estiver implementado; até lá, navega para `/colecoes`.
- Busca é um link/formulário perceptível, não apenas um ícone sem rótulo.
- Contador da sacola atualiza visualmente e por status sem anunciar novamente toda a navegação.
- Rota atual usa indicação visual e `aria-current="page"` onde aplicável.
- Header sticky, se adotado, não cobre skip target ou foco; usar `scroll-padding-block-start` compatível com sua altura.

### 4.2 Mobile

Ordem visual mínima:

```text
Menu | HEAL. CURA. | Buscar | Sacola (n)
```

Contrato do menu:

1. `Abrir menu` expõe estado por nome e `aria-expanded`.
2. Ao abrir overlay/drawer, foco vai ao título ou primeiro link; fundo fica inerte.
3. `Esc`, `Fechar menu` e ação de voltar fecham o menu.
4. Fechar devolve foco a `Abrir menu`.
5. Selecionar link fecha e navega uma vez.
6. Rotação e resize não deixam foco preso em conteúdo oculto.
7. Se for usado `<details>` não modal, ele não deve se apresentar como drawer: precisa continuar no fluxo, fechar ao selecionar um link e não encobrir conteúdo/foco.

### 4.3 Busca global

Enquanto um combobox WAI completo não existir, usar o padrão de menor risco: campo nativo + botão `Buscar` + rota `/buscar?q=`.

- Mobile: rota dedicada, botão `Voltar`, label visível e submit alcançável com teclado aberto.
- Desktop: formulário no header ou painel não modal; `Esc` só fecha se houver painel.
- Consulta persiste na URL e no campo.
- Estado vazio oferece exemplos que existam no catálogo/conteúdo.
- Zero resultado preserva consulta e oferece corrigir, remover filtros, coleções, guia e contato.
- Falha preserva consulta e oferece submit/retry.
- Query de saúde recebe limite de claim e navegação segura, sem recomendação terapêutica.

### Critérios NAV

- **NAV-AC-01:** navegação completa por teclado em ordem igual à ordem visual.
- **NAV-AC-02:** todos os acionadores têm área interna mínima de 44 × 44 CSS px.
- **NAV-AC-03:** mobile expõe menu, busca e sacola sem depender de rolagem horizontal.
- **NAV-AC-04:** abrir/fechar overlay restaura foco em 100% dos caminhos.
- **NAV-AC-05:** ajuda e contato mantêm rótulo e posição consistentes no rodapé.
- **NAV-AC-06:** browser Back fecha primeiro o overlay quando ele criou estado de histórico; caso contrário, retorna à rota anterior sem perder contexto.

## 5. Coleção, ordenação e filtros

### 5.1 Estado inicial

A rota recebe de forma autoritativa:

- coleção/consulta;
- contagem;
- produtos;
- facetas realmente disponíveis;
- ordenação;
- cursor/página;
- provenance/mode.

O H1, resumo, contagem e produtos iniciais são renderizados no servidor. Se a coleção não existe, usar 404. Se a consulta de produtos falha, renderizar erro de catálogo; nunca converter falha em `0 produtos`.

### 5.2 Ordenação

- O `select` tem label visível `Ordenar produtos`.
- O valor fica em `?ordem=` e é restaurado por Back/Forward.
- Progressive enhancement: botão `Aplicar ordenação` funciona sem JS.
- Com JS, pode atualizar sem navegação completa, mas mantém foco no controle, marca o grid como ocupado e anuncia `{n} produtos ordenados por {critério}`.
- Valor desconhecido cai em `featured` sem refletir parâmetro inválido como opção válida.
- Ordenar não muda filtros nem posição para o topo de forma inesperada. Se houver navegação completa, restaurar foco no título da região de resultados, não no topo global.

### 5.3 Filtros futuros

Filtros só aparecem quando o adapter retornar valores reais. Não renderizar faceta decorativa vazia.

Desktop:

- sidebar ou barra com grupos em `fieldset/legend` ou disclosure nomeado;
- alteração pode aplicar imediatamente se o feedback for rápido e estável;
- cada filtro ativo aparece como chip removível acima do grid;
- `Limpar tudo` existe apenas com filtros ativos.

Mobile:

- botão `Filtrar produtos — n filtros aplicados` abre drawer; em 320 px, tela inteira;
- seleção dentro do drawer é **pendente** e não altera o grid por trás;
- `Ver n produtos` confirma tudo de uma vez;
- `Fechar`/`Esc` descarta mudanças pendentes e mantém filtros já aplicados;
- `Limpar` zera a seleção pendente; `Ver n produtos` confirma;
- ao aplicar, fechar drawer, devolver foco ao botão `Filtrar produtos` e anunciar contagem.

URL:

- filtros aplicados usam parâmetros estáveis, normalizados e sem duplicata;
- ordem dos parâmetros é determinística;
- Back/Forward restaura seleção, grid e posição aproximada;
- política de indexação/canonical pertence ao HEAL-15; UX não cria links crawlable para combinações sem contrato.

### 5.4 Loading, zero e erro

| Estado | Comportamento |
|---|---|
| Atualizando | Grid anterior permanece; controles que geraram a requisição ficam ocupados; resposta antiga é descartada. |
| Zero | Repetir termo/filtros, permitir remover chip individual ou limpar tudo, mostrar caminhos por regra explícita. |
| Erro | Manter filtros e resultados anteriores, se existirem; mostrar `Tentar novamente`. |
| Página seguinte | Inserir após resultados existentes e mover foco somente se a pessoa acionou `Carregar mais` e precisar de orientação; preferir heading/status, não primeiro card. |

Evitar scroll infinito como único meio. Paginação ou `Carregar mais` deve produzir URL/estado recuperável.

### Critérios COL

- **COL-AC-01:** erro de catálogo é distinguível de zero resultado.
- **COL-AC-02:** filtro/ordem aplicado atualiza URL, chips, contagem e grid de forma atômica.
- **COL-AC-03:** Back restaura filtros, ordem e contexto de navegação.
- **COL-AC-04:** drawer fecha por botão e `Esc`, contém e devolve foco.
- **COL-AC-05:** falha preserva a seleção e oferece retry.
- **COL-AC-06:** em 320 px o card mantém nome, preço, estoque e CTA legíveis em uma coluna.

## 6. PDP

### 6.1 Ordem de decisão

1. breadcrumb, categoria, H1 e resumo;
2. galeria com botões Anterior/Próxima e miniaturas acionáveis;
3. família, descritores, intensidade e fumaça quando validados;
4. variante, preço, disponibilidade, quantidade e CTA;
5. estimativa de entrega;
6. percepção separada de fatos;
7. ingredientes/origem/quantidade;
8. uso/segurança;
9. entrega/trocas;
10. relacionados por regra explícita.

Swipe na galeria é opcional; botões e miniaturas são obrigatórios. Mídia ausente preserva dimensão e mostra fallback com o nome do produto.

### 6.2 Variante

- Variante única pode aparecer como texto, sem select falso.
- Duas ou mais variantes usam grupo/select com label e estado selecionado no URL quando deep link for suportado.
- Mudança atualiza preço, imagem, SKU, estoque e limites de quantidade a partir de uma única resposta.
- Se invalidar frete, mostrar `A estimativa precisa ser recalculada para esta opção`.
- Se a quantidade atual exceder o novo máximo, não reduzir silenciosamente: explicar e pedir confirmação do novo valor.

### 6.3 Quantidade

Contrato do `QuantityInput`:

- label visível e nome acessível com produto/variante;
- botões `−` e `+` com 44 × 44 CSS px;
- digitação manual disponível;
- durante edição, vazio é um estado temporário válido; validar no blur/submit;
- não converter vazio, `0`, decimal, `NaN` ou acima do limite silenciosamente para `1`;
- mínimo `1`; máximo vindo da política/estoque, nunca apenas de constante de UI;
- botões desabilitados no limite com razão disponível;
- erro preserva o valor digitado e foca/associa o campo no submit;
- setas do input nativo funcionam; não capturar teclas globais.

### 6.4 Estoque

| Estado | Texto/ação |
|---|---|
| `in_stock` | CTA habilitado após preço/variante válidos. |
| `low_stock` | Habilitado; só dizer `Poucas unidades` com política e dado real. |
| `backorder` | Habilitado somente se `purchasePolicy = continue`, com prazo/condição factual. |
| `out_of_stock` | CTA desabilitado + `Indisponível`; reposição só com fluxo real. |
| `unknown` | CTA desabilitado + `Disponibilidade não confirmada` + `Tentar confirmar novamente`. |

Estoque não é urgência editorial. Mudança entre leitura e mutação retorna conflito explícito.

### 6.5 Add-to-cart

Estados:

```text
idle → validating → submitting → success
                         ├── insufficient_stock
                         ├── price_changed
                         ├── inventory_unknown
                         ├── conflict
                         └── temporary_error
```

Comportamento:

- Submit valida variante e quantidade; botão muda para `Adicionando à sacola...` e bloqueia reenvio da mesma ação.
- A chave de idempotência é criada uma vez por ação e reutilizada apenas no retry daquela ação.
- Sucesso anuncia produto + quantidade adicionada, atualiza contador e oferece `Ver sacola` e `Continuar explorando` sem redirecionar automaticamente.
- Animação de brasa ocorre somente após sucesso e é decorativa; reduced motion mantém a mensagem.
- `INSUFFICIENT_STOCK`: manter variante/quantidade, mostrar máximo e oferecer `Usar {n}`; ajuste só após consentimento.
- `PRICE_CHANGED`: mostrar antes/depois, não adicionar; `Confirmar novo valor` gera nova ação.
- `INVENTORY_UNKNOWN`: bloquear e oferecer retry.
- `CART_CONFLICT`: carregar snapshot atual, explicar mudança e exigir nova confirmação.
- Timeout/erro transitório: informar que a seleção foi preservada; retry não pode duplicar linha.

### Critérios PDP

- **PDP-AC-01:** preço, estoque, variante, quantidade e CTA permanecem legíveis em 320 px.
- **PDP-AC-02:** `unknown`/`out_of_stock` bloqueiam e explicam; `unknown` oferece retry real.
- **PDP-AC-03:** quantidade inválida nunca é corrigida silenciosamente.
- **PDP-AC-04:** submit duplicado não duplica linha.
- **PDP-AC-05:** sucesso é anunciado sem mover foco; contador da sacola atualiza.
- **PDP-AC-06:** CEP/frete na PDP cobre todos os estados da seção 8.
- **PDP-AC-07:** compra funciona sem galeria avançada, Anime.js e Three.js.

## 7. Sacola

### 7.1 Carregamento inicial

- SSR mostra H1, explicação do modo e região reservada.
- Ao ler sessão/local storage, região usa `aria-busy` e texto `Lendo a sacola demonstrativa...`.
- Sucesso vazio entra no estado vazio; sucesso preenchido entra na lista; corrupção/expiração vira erro recuperável, não carrinho vazio silencioso.
- Na produção, sessão server-side substitui o storage cliente como verdade; a UX não presume sincronização sem resposta.

### 7.2 Vazio

- H1 da página continua `Sua sacola demonstrativa`; estado interno usa H2 `Sua sacola demonstrativa está vazia.`
- Ações: `Explorar incensos` e `Como escolher`.
- Checkout não fica disponível.
- Acesso direto a `/checkout` retorna para esse estado de forma clara, sem simular preparação.

### 7.3 Preenchido

Cada linha mostra nome, variante, preço unitário, quantidade, total da linha e disponibilidade.

Alteração de quantidade:

- ocupa apenas a linha;
- mantém os demais controles operáveis;
- usa snapshot/revision atual;
- ao sucesso atualiza linha, subtotal, frete stale e total juntos;
- se o item altera peso/quantidade, estimativa anterior vira `Precisa recalcular`, não permanece como se válida;
- erro preserva a linha e o valor anterior.

Remoção:

- botão nomeia o produto;
- após sucesso, oferecer `Desfazer remoção` até a próxima mutação/navegação, sem timeout curto obrigatório;
- foco vai para `Desfazer remoção`; se undo não existir, vai para a próxima linha, linha anterior ou heading do estado vazio;
- desfazer usa nova mutação e pode falhar por estoque/preço, sem prometer restauração.

Limpar sacola:

- em fixture pode existir, mas precisa de confirmação proporcional quando houver mais de um item;
- sucesso move foco para o heading de vazio e anuncia uma vez.

### 7.4 Conflito e divergência

| Erro | Recuperação |
|---|---|
| `CART_CONFLICT` | Aplicar snapshot mais recente, marcar linhas alteradas e pedir revisão. Não reaplicar automaticamente. |
| `PRICE_CHANGED` | Mostrar antes/depois por linha; bloquear checkout até confirmação. |
| `INSUFFICIENT_STOCK` | Manter quantidade solicitada como contexto, mostrar máximo e botão de ajuste explícito. |
| `VARIANT_UNAVAILABLE` | Manter item marcado; oferecer remover ou voltar à PDP, nunca substituir variante. |
| `CART_EXPIRED` | Explicar expiração; tentar recriar somente com consentimento e revalidar tudo. |
| Timeout/rate limit | Itens permanecem; retry com a mesma idempotency key daquela tentativa. |

### Critérios CART

- **CART-AC-01:** vazio, loading, preenchido, erro e expirado são estados distintos.
- **CART-AC-02:** cada mutação tem loading e erro por linha, sem travar a página.
- **CART-AC-03:** remover não perde foco e pode ser desfeito ou oferece foco alternativo definido.
- **CART-AC-04:** conflito mostra snapshot mais recente e exige revisão.
- **CART-AC-05:** mudança de linha invalida frete dependente.
- **CART-AC-06:** totais sempre derivam do snapshot; UI não soma float.
- **CART-AC-07:** refresh e outra aba preservam/atualizam contador e itens sem duplicar anúncio.

## 8. CEP e entrega

O mesmo contrato deve ser usado na PDP e na sacola. A PDP pode estimar por variante/quantidade; a sacola estima pelo snapshot completo.

### 8.1 Campo

- label visível `CEP para simulação` em fixture;
- aceita com ou sem hífen e normaliza para 8 dígitos;
- `inputMode="numeric"` e `autoComplete="postal-code"`;
- ajuda e mensagem associadas por IDs estáveis;
- não enviar CEP bruto para analytics;
- valor permanece após erro.

### 8.2 Estados

| Estado | Copy e ação |
|---|---|
| `not_requested` | `Informe o CEP para simular a entrega.` |
| `invalid` | `Digite um CEP com 8 números. O valor informado foi preservado.`; `aria-invalid=true`; sem request. |
| `loading` | `Simulando entrega...`; impedir envios repetidos; edição cancela/torna resposta anterior obsoleta. |
| `available` | Mostrar opções como radio group, custo, prazo fictício e provider `Simulação`; selecionar recalcula total. |
| `unavailable` | `Não encontramos uma opção para este CEP nesta simulação.`; não dizer que a HEAL não entrega sem certeza. |
| `temporary_error` | `Não foi possível concluir a simulação. Seus itens e o CEP foram preservados.` + retry. |
| `stale` | `A sacola mudou. Recalcule a entrega.`; valor do CEP pode permanecer, custo sai do total. |

Se o teclado virtual cobrir o botão ou mensagem, campo e ações empilham. Sticky buy bar deve se ocultar/reposicionar enquanto o teclado estiver aberto.

### Critérios SHIP

- **SHIP-AC-01:** CEP inválido não dispara request e mantém foco/valor.
- **SHIP-AC-02:** resposta atrasada de CEP antigo é descartada.
- **SHIP-AC-03:** indisponível e erro temporário têm textos e ações diferentes.
- **SHIP-AC-04:** alteração de carrinho/variante invalida custo/prazo anterior.
- **SHIP-AC-05:** opção selecionada e total atualizam em um único snapshot.
- **SHIP-AC-06:** em 320 px, label, input, erro e botão não se sobrepõem.

## 9. Checkout/handoff

### 9.1 Fixture atual e desejada

Estados:

| Estado | Comportamento |
|---|---|
| Sacola vazia | `A sacola demonstrativa está vazia.` + `Explorar incensos` e `Voltar à sacola`; não mostrar resumo. |
| Preparando | Região `aria-busy`, texto `Preparando o handoff demonstrativo...`; não apagar carrinho. |
| Pronto | Alerta inequívoco de não pagamento, linhas, subtotal, entrega, total e explicação da integração ausente. |
| Erro | Carrinho preservado + `Tentar novamente` + `Voltar à sacola`; referência não sensível se útil. |
| Encerrado | `Nenhum pedido foi criado e nenhum pagamento foi iniciado.` + início e limpar sacola. |
| Sacola limpa | Atualizar texto para `A sacola demonstrativa foi limpa`, anunciar e retirar a ação de limpeza. |

`Encerrar demonstração` não usa verbos `Pagar`, `Comprar`, `Confirmar pedido` ou animação de compra concluída.

### 9.2 Integração externa futura

```text
idle → preparing → cart_changed | ready_external | error
```

- servidor revalida preço, estoque, descontos, frete, revisão e URL;
- qualquer mudança retorna ao estado de revisão, sem redirecionar;
- pronto mostra provedor/domínio de destino e CTA `Continuar para {destinationLabel}`;
- redirecionamento só ocorre por ação explícita;
- falha mantém carrinho e permite retry;
- retorno do provedor não é confirmação de pagamento;
- nenhum campo de cartão, Pix ou boleto é coletado no storefront.

### Critérios CHECKOUT

- **CHECKOUT-AC-01:** fixture nunca gera URL, pedido ou pagamento.
- **CHECKOUT-AC-02:** erro preserva carrinho e possui retry.
- **CHECKOUT-AC-03:** checkout vazio não entra em estado pronto.
- **CHECKOUT-AC-04:** redirecionamento externo só ocorre para URL HTTPS allowlisted e após ação explícita.
- **CHECKOUT-AC-05:** mudança de preço/estoque/frete interrompe o handoff e volta à revisão.
- **CHECKOUT-AC-06:** sucesso pós-compra só aparece após confirmação autoritativa, fora da fixture.

## 10. Responsividade, toque e teclado

### 10.1 Matriz mínima

| Largura | Navegação | Coleção | PDP | Sacola | Handoff |
|---|---|---|---|---|---|
| 320 | menu/busca/sacola sem overflow | 1 coluna, drawer full-screen | 1 coluna, CEP empilhado | linhas e resumo empilhados | 1 coluna |
| 360/390/430 | mesmas funções, maior respiro | 1 coluna; 2 só após prova visual | 1 coluna + buy bar segura | 1 coluna | 1 coluna |
| 768 | nav adaptada | drawer/bar | 1 coluna larga | 1 coluna larga | container médio |
| 1024 | nav desktop se couber | sidebar opcional | 2 colunas apenas se painel couber | 2 colunas apenas se resumo couber | container médio |
| 1440/1920 | container limitado | sidebar + grid | galeria + compra | itens + resumo | container médio |

### 10.2 Regras mobile

- Gutter mínimo de 16 px em 320.
- Alvos primários internos ≥ 44 × 44 CSS px.
- Preço, estoque, quantidade, CEP, erro e CTA nunca truncam.
- Buy bar só entra depois que o bloco original sai da viewport; inclui `env(safe-area-inset-bottom)`.
- Buy bar não aparece com teclado, dialog ou drawer e não cobre foco.
- Chips quebram linha; não criar carrossel obrigatório.
- Touch não dispara ação no `pointerdown`; confirmar no click/tap concluído.
- Orientação landscape mantém ações e mensagens acessíveis sem altura fixa.

### 10.3 Regras desktop/zoom

- Painel sticky só permanece sticky quando cabe integralmente na viewport.
- Em zoom/reflow, cair para uma coluna antes de criar sobreposição.
- Largura de texto editorial é limitada; grids crescem por espaço útil.
- Hover apenas complementa focus/active; não revela conteúdo exclusivo.

### 10.4 Teclado

- `Enter` submete busca/CEP/form; `Space` ativa botões.
- Setas só são capturadas por widgets que implementam seu padrão.
- Ordem DOM não é rearranjada visualmente de forma contraditória.
- Foco visível tem contraste e não é coberto por banner/header/buy bar.
- Zoom 200% e reflow em 320 CSS px não criam rolagem horizontal da página.

## 11. Auditoria estática da implementação atual

Severidade:

- `P0`: risco de transação/verdade ou fluxo essencial impossível; bloqueia release.
- `P1`: falha importante de recuperação, acessibilidade ou paridade; bloqueia validação da vertical slice.
- `P2`: inconsistência relevante, mas existe caminho seguro alternativo.

### Pontos já corretos ou promissores

- `CommercePageShell` possui skip link e banner completo de demonstração (`site/components/commerce/CommercePageShell.tsx:16-20`).
- Os controles principais usam elementos nativos, labels e targets mínimos de 2,75 rem (`commerce.module.css:32-39`, `57-58`).
- `unknown` e `out_of_stock` desabilitam add-to-cart (`AddToCartForm.tsx:24`, `53-60`).
- Sucesso de add-to-cart usa mensagem independente da animação e região live educada (`EmberCartFeedback.tsx:72-87`).
- O feedback de brasa respeita reduced motion e faz cleanup do scope Anime.js (`EmberCartFeedback.tsx:35-60`).
- No estado auditado, o carrinho persistia em `localStorage` e atualizava o contador na mesma aba e entre abas (`cart-store.ts:53-66`, `CartLink.tsx:10-21`). Após a revisão de segurança, o root migrou a fixture para `sessionStorage`; a continuidade agora é deliberadamente restrita à sessão da aba.
- Handoff fixture recusa sacola vazia e item indisponível antes de gerar resumo (`fixture-adapter.ts:215-254`).
- Nenhum campo/meio de pagamento é simulado no handoff; a copy explicita o limite (`CheckoutHandoff.tsx:55-69`).

### Findings

#### HEAL06-F01 — P1 — Faixa da Home não declara o limite completo da fixture

**Evidência:** `site/app/page.tsx:19-22` mostra `Ambiente de demonstração` e `Dados e imagens ilustrativos`, mas omite que produtos, valores, estoque e frete são fictícios e que nenhum pagamento será processado. As rotas de commerce usam a mensagem completa.

**Impacto:** uma pessoa pode entrar na coleção entendendo que apenas as imagens são ilustrativas; o boundary de verdade não é consistente desde a aquisição.

**Aceite:** usar o mesmo contrato textual/data-mode em todas as rotas e garantir visibilidade em 320–1920 px.

#### HEAL06-F02 — P1 — Busca global, rota de busca e filtros não existem

**Evidência:** `site/app/page.tsx:6-10`, `CommercePageShell.tsx:31-39` e a árvore de `site/app/` não incluem busca; `site/app/colecoes/[handle]/page.tsx:51-63` cobre somente ordenação.

**Impacto:** recompra, procura por SKU/atributo e recuperação de zero não têm caminho; mobile/desktop ficam abaixo do sitemap aprovado.

**Aceite:** implementar primeiro formulário + rota; filtros só depois de facetas reais, conforme seções 4 e 5.

#### HEAL06-F03 — P1 — Falha ao listar produtos é apresentada como coleção vazia

**Evidência:** `site/app/colecoes/[handle]/page.tsx:36-40` converte qualquer `Result` de erro em `[]`; a página então exibe `0 produtos demonstrativos` sem erro nem retry.

**Impacto:** esconde indisponibilidade técnica como fato comercial e impede recuperação.

**Aceite:** distinguir `success-empty` de `error`; preservar coleção/ordem, mostrar erro e `Tentar novamente`.

#### HEAL06-F04 — P1 — PDP não oferece CEP/frete

**Evidência:** `site/app/produtos/[handle]/page.tsx:39-79` termina o bloco de compra após add-to-cart e só traz texto de política; a calculadora existe apenas em `CartView.tsx:93-118`.

**Impacto:** custo/prazo aparece tarde e a jornada aprovada `PDP → CEP → add-to-cart` não pode ser validada.

**Aceite:** implementar contrato compartilhado da seção 8 na PDP sem inventar cobertura/prazo.

#### HEAL06-F05 — P1 — Estoque desconhecido é um beco sem saída

**Evidência:** a fixture inclui o produto 03 como `unknown` (`fixture-data.ts:102-106`). `AddToCartForm.tsx:56-58` diz `Tente novamente`, porém não existe controle de retry nem consulta nova.

**Impacto:** copy promete uma recuperação inexistente; produto fica permanentemente bloqueado.

**Aceite:** oferecer ação `Tentar confirmar novamente`, estados loading/success/error e manter seleção/quantidade.

#### HEAL06-F06 — P1 — Quantidade na PDP é corrigida silenciosamente para 1

**Evidência:** `AddToCartForm.tsx:43-51` usa `valueAsNumber || 1`; apagar o campo, digitar zero ou passar por um valor inválido volta a `1` sem erro. No carrinho, `CartView.tsx:65-79` só oferece stepper, sem digitação manual.

**Impacto:** perda de controle e divergência entre intenção e quantidade adicionada; pouca eficiência para quantidades maiores.

**Aceite:** adotar o contrato da seção 6.3 e testar vazio, 0, decimal, 1, 99, 100 e limite de estoque.

#### HEAL06-F07 — P1 — Mutações da sacola ignoram o adapter assíncrono e seus conflitos

**Evidência:** `CartView.tsx:66-83` chama diretamente funções síncronas de `cart-store.ts`; não existem `aria-busy`, bloqueio por linha, idempotency key ou `expectedCartRevision`. O contrato define `CART_CONFLICT`, `PRICE_CHANGED` e `INSUFFICIENT_STOCK`, mas nenhum é representado na UI.

**Impacto:** a fixture visual não prepara a integração real; cliques rápidos, abas concorrentes ou resposta tardia podem produzir estado confuso.

**Aceite:** criar camada de ação assíncrona provider-agnostic, estados por linha e cenários da seção 7.4.

#### HEAL06-F08 — P1 — Remoção pode perder foco e não possui desfazer

**Evidência:** `CartView.tsx:80-84` remove imediatamente a linha focada. Após o re-render, não há gestão de foco nem ação de undo.

**Impacto:** usuário de teclado/screen reader perde contexto; remoção acidental exige reconstruir a seleção.

**Aceite:** implementar desfazer ou destino de foco determinístico conforme seção 7.3; testar primeira, intermediária, última linha e transição para vazio.

#### HEAL06-F09 — P1 — CEP cobre somente sucesso e formato inválido

**Evidência:** `CartView.tsx:93-118` não apresenta loading; `cart-store.ts:197-218` retorna apenas inválido ou available. Não há unavailable, temporary error, escolha de opção nem estado stale após mutação.

**Impacto:** estados exigidos não podem ser avaliados e total pode permanecer conceitualmente associado a uma sacola alterada.

**Aceite:** implementar todos os estados SHIP e invalidar/recalcular após mudança de linha/variante.

#### HEAL06-F10 — P1 — Erro de checkout não oferece retry

**Evidência:** `CheckoutHandoff.tsx:40-47` oferece `Explorar incensos` e `Voltar à sacola`, mas não `Tentar novamente`, embora a copy e o wireframe exijam retry preservando o carrinho.

**Impacto:** falha transitória interrompe o caminho sem recuperação no local.

**Aceite:** expor nova tentativa com estado busy, impedir duplicação de attempt e manter snapshot.

#### HEAL06-F11 — P2 — Limpar após encerrar não confirma a limpeza

**Evidência:** em `CheckoutHandoff.tsx:27-35`, `Limpar sacola demonstrativa` chama o store e zera `handoff`, mas `ended` continua `true`; a tela mantém o texto de que os itens `podem permanecer` e não anuncia o resultado.

**Impacto:** feedback ambíguo e contador pode mudar sem confirmação textual local.

**Aceite:** transicionar para estado `cleared`, retirar/desabilitar a ação e anunciar a limpeza.

#### HEAL06-F12 — P2 — Header de commerce no mobile é navegação horizontal, não experiência mobile completa

**Evidência:** `CommercePageShell.tsx:31-39` sempre renderiza a mesma nav; em `commerce.module.css:72-80`, ela apenas passa para uma segunda linha com `overflow-x:auto`. Busca, guia, ajuda e menu acessível não aparecem.

**Impacto:** paridade é incompleta e links podem ficar pouco descobríveis em 320 px.

**Aceite:** escolher deliberadamente menu não modal ou drawer acessível e satisfazer NAV-AC-03/04.

#### HEAL06-F13 — P2 — Rodapé não oferece ajuda, políticas ou retorno operacional

**Evidência:** `CommercePageShell.tsx:45-48` contém apenas identidade e aviso; não há links para entrega, segurança, contato, privacidade ou termos. A Home não possui rodapé.

**Impacto:** objeções comerciais e recuperação por ajuda ficam sem saída consistente.

**Aceite:** incluir apenas rotas/conteúdo reais ou placeholders claramente não indexáveis, mantendo `Ajuda` e `Contato` consistentes.

#### HEAL06-F14 — P2 — Ordenação por navegação completa não define restauração de foco/contexto

**Evidência:** `site/app/colecoes/[handle]/page.tsx:51-63` envia GET corretamente, mas não há foco programático/âncora ou restauração da região de resultados após reload.

**Impacto:** teclado e leitor de tela retornam ao topo e precisam percorrer novamente header/breadcrumb.

**Aceite:** progressive enhancement preserva submit nativo e, quando JS estiver ativo, anuncia/atualiza in-place; em reload, fornecer skip/âncora e restauração coerente.

## 12. Matriz mínima de testes para HEAL-21

### Navegação

1. Tab/Shift+Tab por header, menu, busca, sacola e skip link.
2. Abrir/fechar menu por click, Enter, Space, Esc e Back.
3. Rotacionar/resizar com menu aberto e verificar retorno de foco.
4. Testar links de ajuda e rota atual.

### Coleção

1. Ordenar com e sem JavaScript.
2. Aplicar/remover um e múltiplos filtros; Back/Forward.
3. Resposta fora de ordem: segunda consulta vence a primeira.
4. Zero real versus erro de provider.
5. `Carregar mais` e retorno da PDP preservando contexto.

### PDP/add-to-cart

1. Quantidade: vazio, 0, decimal, 1, máximo, máximo + 1 e digitação rápida.
2. Estoque: in, low, backorder, out e unknown + retry.
3. Duplo submit e timeout após sucesso no servidor.
4. Estoque insuficiente, preço alterado e conflito.
5. Confirmação com reduced motion e sem Anime.js.

### Sacola

1. Loading, vazio, uma linha, várias linhas e storage corrompido/expirado.
2. Aumentar/diminuir em duas linhas ao mesmo tempo.
3. Remover primeira/meio/última; desfazer; chegar ao vazio.
4. Outra aba altera o carrinho; snapshot/revision conflita.
5. Frete calculado fica stale depois de qualquer mudança relevante.

### CEP

1. `12345678`, `12345-678`, letras, sete/nove dígitos e colagem.
2. Loading lento; usuário edita antes da resposta.
3. Available com várias opções; unavailable; temporary error; retry.
4. Teclado virtual em 320/390 px sem cobrir ação/erro.

### Handoff

1. Acesso direto com sacola vazia.
2. Preparing lento, fixture pronto, erro + retry e encerramento.
3. Item unknown/out ou preço alterado antes do handoff.
4. Limpar depois de encerrar e verificar contador/anúncio.
5. Confirmar ausência de pedido, URL externa e meios de pagamento na fixture.

### Viewports/ambiente

- 320, 360, 390, 430, 768, 1024, 1440 e 1920 CSS px.
- Zoom 200%, portrait/landscape, teclado virtual e safe area.
- Chromium, Firefox e WebKit/Safari equivalente.
- Teclado, axe e pelo menos um screen reader smoke quando disponível.
- Rede lenta/offline, reduced motion, mídia ausente e WebGL indisponível.

## 13. Definition of done deste contrato

O comportamento de Frontend UX só pode ser considerado verificado quando:

- todos os ACs NAV/COL/PDP/CART/SHIP/CHECKOUT tiverem teste e evidência;
- P0/P1 acima estiverem corrigidos ou explicitamente bloqueados por dependência externa;
- nenhum erro apaga dado válido ou deixa ação prometida sem controle correspondente;
- estados de commerce forem reproduzíveis por fixture/test double, não apenas comentados;
- mobile e desktop tiverem paridade funcional comprovada;
- foco e anúncios forem testados manualmente, além do axe;
- fixture continuar impossível de confundir com operação real.

## Handoff HEAL-06

### Para root / HEAL-00

- Priorizar HEAL06-F01–F10 antes de chamar a vertical slice de validada.
- Preservar a definição `fixture funcional parcial` até existir checkout sandbox reproduzido.
- Coordenar HEAL-08/13 para que a UI consuma operações assíncronas do port, sem duplicar regras de commerce no cliente.

### Para HEAL-09 — Design System

- Implementar contratos acessíveis de `QuantityInput`, `FieldMessage`, `StatusRegion`, `Toast`, `Disclosure`, `Dialog/Drawer`, `FilterChip`, `RadioGroup` de frete e botões busy/disabled.
- Todos os primitives precisam de hover, focus-visible, active, disabled, loading e error sem depender de cor.
- Expor slots estáveis para ajuda, erro, status e razão de bloqueio.

### Para HEAL-12 — Responsividade e Mobile UX

- Validar a matriz 320–1920, com atenção a header, drawer de filtro, buy bar, CEP, teclado virtual, safe areas, landscape e zoom 200%.
- Decidir e documentar o padrão do menu mobile do commerce; não manter overflow horizontal por acidente.
- Provar paridade funcional, não somente ausência de overflow.

### Para HEAL-17 — Acessibilidade

- Revisar gestão de foco em menu/drawer, remoção, empty state e erro de handoff.
- Testar `aria-busy`, status/alert, `aria-invalid`, associação de mensagens, nome/estado/valor do quantity input e anúncios sem repetição.
- Validar WCAG 2.2 AA manualmente para teclado, foco não encoberto, reflow, target size e reduced motion.

### Para HEAL-21 — QA funcional/E2E

- Converter a seção 12 em fixtures determinísticas e cenários Playwright.
- Cobrir resposta fora de ordem, clique duplicado, conflito de revisão, mudança de preço, estoque insuficiente, storage corrompido, CEP stale e retry de handoff.
- Guardar screenshots dos estados, além de logs/exit codes; sucesso visual sozinho não prova recuperação.
