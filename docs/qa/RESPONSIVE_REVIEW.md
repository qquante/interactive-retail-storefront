# HEAL-12 — revisão responsiva e Mobile UX

Data da execução: 2026-08-28  
Alvo: `http://localhost:3000`  
Estado avaliado: servidor local ativo e árvore de trabalho com mudanças paralelas ainda não consolidadas  
Resultado: **reprovado para release responsivo enquanto RESP-001 e RESP-005 estiverem abertos**.

## Escopo e método

Revisão read-only da implementação em `site/`, seguida de inspeção no navegador local. Nenhum arquivo de produto foi alterado por HEAL-12.

Rotas exercitadas:

- Home: `/`
- Coleção/PLP: `/colecoes/intervalos`
- PDP: `/produtos/intervalo-01`
- Sacola preenchida: `/carrinho`
- Handoff de checkout preenchido: `/checkout`

Viewports solicitados e alturas adotadas para tornar o teste reproduzível:

- `320 × 568`, `360 × 800`, `390 × 844`, `430 × 932`
- `768 × 1024`, `1024 × 768`, `1440 × 900`, `1920 × 1080`

Também foram verificados `844 × 390` e `932 × 430` como amostras de orientação paisagem móvel. As medições de overflow usam `documentElement.scrollWidth - documentElement.clientWidth`; neste Chromium, a barra vertical clássica reduz o `clientWidth` em 15 px.

O fluxo funcional usado na validação foi: PDP em estoque → adicionar item → sacola com quantidade 2 → CEP inválido `123` → CEP válido `20040030` → checkout demonstrativo. Nenhuma cobrança, pedido ou integração externa foi executada.

## Matriz de resultado

Legenda: `PASS` = sem overflow/reflow impeditivo; `ATENÇÃO` = funcional, mas com finding de UX; `FAIL` = falha reproduzida.

| Viewport | Home | Coleção | PDP | Sacola cheia | Checkout cheio |
|---|---|---|---|---|---|
| 320 × 568 | PASS | PASS | **FAIL — 84 px de overflow horizontal** | PASS | PASS |
| 360 × 800 | PASS | PASS | **FAIL — 44 px de overflow horizontal** | PASS | PASS |
| 390 × 844 | PASS | PASS | **FAIL — 14 px de overflow horizontal** | PASS | PASS |
| 430 × 932 | PASS | PASS | PASS | PASS | PASS |
| 768 × 1024 | PASS | ATENÇÃO — grade de 3 colunas muito densa | **FAIL — 19 px de overflow horizontal** | ATENÇÃO — sticky inefetivo | PASS |
| 1024 × 768 | PASS | PASS | **FAIL — 7 px de overflow; sticky inefetivo** | ATENÇÃO — sticky inefetivo | PASS |
| 1440 × 900 | PASS | PASS | **FAIL — 5 px de overflow; sticky inefetivo** | ATENÇÃO — sticky inefetivo | PASS |
| 1920 × 1080 | PASS | PASS | ATENÇÃO — sticky inefetivo | ATENÇÃO — sticky inefetivo | PASS |

Paisagem móvel:

| Viewport | Home | Coleção | PDP | Sacola | Checkout |
|---|---|---|---|---|---|
| 844 × 390 | PASS | ATENÇÃO — 3 colunas | **FAIL — 22 px de overflow** | PASS | PASS |
| 932 × 430 | PASS | ATENÇÃO — 3 colunas | **FAIL — 7 px de overflow** | PASS | PASS |

## Evidências funcionais positivas

- Home sem overflow nos oito viewports. Em `320 px`, o menu aberto ocupou exatamente a largura útil de `305 px`; seus três links mediram `56 px` de altura.
- Sacola e checkout preenchidos ficaram sem overflow nos oito viewports. Em `320 px`, o resumo da sacola mediu `273 px` dentro de um `clientWidth` de `305 px`; os totais do checkout também ficaram dentro de `273 px` e refluíram corretamente.
- PDP exibiu preço (`R$ 39,00`), disponibilidade e botão de compra. A adição atualizou a sacola para 2 itens e apresentou feedback textual.
- CEP inválido preservou o valor `123` e exibiu `Digite um CEP com 8 números`. CEP válido `20040030` retornou `20040-***`, prazo fictício e total atualizado.
- Inputs/selects mediram aproximadamente `48 px` de altura e `16 px` de fonte. Botões `−` e `+` mediram `44 × 44 px`. Os CTAs principais mediram pelo menos `44 px` de altura.
- O resumo e o painel de compra deixam de ser sticky abaixo de `768 px`, evitando painel preso em telas estreitas.
- Há foco visível de `3 px` no skip link e no `summary` do menu. O skip link torna-se visível ao receber foco.
- O documento expõe `meta viewport` com `width=device-width, initial-scale=1`.

## Findings

### RESP-001 — P1 — PDP cria rolagem horizontal e conteúdo cortado

**Owner sugerido:** HEAL-14 / root  
**Revalidação:** HEAL-17  
**Gate:** HEAL-21

Reprodução:

1. Abrir `/produtos/intervalo-01`.
2. Aplicar viewport `320 × 568`, `360 × 800`, `390 × 844`, `768 × 1024`, `1024 × 768` ou `1440 × 900`.
3. Comparar `documentElement.scrollWidth` com `clientWidth` e observar a barra horizontal.

Evidência:

- `320`: `scrollWidth 389`, `clientWidth 305`, diferença `84 px`.
- `360`: diferença `44 px`.
- `390`: diferença `14 px`.
- `768`: `scrollWidth 772`, `clientWidth 753`, diferença `19 px`; o título é cortado no limite direito.
- `1024`: diferença `7 px`; `1440`: diferença `5 px`.
- Paisagem `844 × 390`: diferença `22 px`; `932 × 430`: diferença `7 px`.

Causa provável confirmada por computed styles: `.productLayout` usa `grid-template-columns: 1fr` no mobile, mas a única track resolve para `373.219 px` dentro de um contêiner de `273 px`. Os filhos `.productPlaceholder` e `.buyPanel` herdam essa largura mínima. Em `768 px`, o breakpoint `max-width: 767px` não entra e a grade mantém duas colunas, uma delas com mínimo de `20rem`. Referências: `site/components/commerce/commerce.module.css`, regras `.productLayout`, `.buyPanel` e `@media (max-width: 767px)`.

Correção esperada:

- usar `minmax(0, 1fr)` na grade empilhada e `min-width: 0` nos filhos;
- permitir quebra segura de títulos/conteúdo longo (`overflow-wrap` onde necessário);
- incluir `768 px` no breakpoint de empilhamento ou definir o breakpoint pelo espaço real necessário;
- eliminar qualquer overflow residual de 5–7 px em desktop.

Critério de aceite: `scrollWidth === clientWidth` na PDP em todos os viewports desta matriz, com título, preço, estoque, quantidade e CTA completamente visíveis sem rolagem lateral.

### RESP-002 — P2 — coleção permanece em três colunas no tablet e em paisagem móvel

**Owner sugerido:** HEAL-14 com validação UX do root  
**Revalidação:** HEAL-17

Em `768 × 1024`, a PLP usa três colunas de aproximadamente `225 px`; cada card chegou a `865 px` de altura. Não houve overflow, mas o título demonstrativo ocupa muitas linhas e a comparação fica excessivamente densa. O mesmo padrão entra em `844 × 390` e `932 × 430`.

Reprodução: abrir `/colecoes/intervalos` em `768 × 1024`; observar `grid-template-columns: 224.969px 224.984px 224.984px`.

Correção esperada: adotar duas colunas para tablet/paisagem estreita e reservar três colunas para largura que preserve leitura e comparação. Critério de aceite: títulos, fatos, preço, disponibilidade e CTA permanecem escaneáveis sem cards desproporcionalmente altos.

### RESP-003 — P2 — `sticky` declarado, mas inefetivo no conteúdo atual

**Owner sugerido:** HEAL-14  
**Revalidação:** HEAL-17

O painel de compra e o resumo da sacola têm `position: sticky; top: 1rem`, mas não permanecem visíveis durante a rolagem nas fixtures atuais.

Evidência PDP em `1024 × 768`:

- painel com `1060.8 px` de altura;
- antes da rolagem: `top 237.6`;
- em `scrollY 488`: `top -250.4`;
- em `scrollY 956`: `top -718.4`.

Evidência sacola:

- `1024 × 768`: resumo com `878.2 px`; em `scrollY 700`, `top -218.8`;
- `1440 × 900`: resumo com `804 px`; em `scrollY 647`, `top -107.8`.

O elemento sticky é tão alto quanto a track/contêiner ou maior que o viewport, portanto não há curso útil para fixação. A declaração atual transmite uma intenção que a estrutura não cumpre.

Correção esperada: manter sticky somente em um bloco interno curto (totais + CTA), garantir contêiner com curso de rolagem real ou remover a promessa de sticky. Critério de aceite: CTA/totais realmente permanecem acessíveis no viewport definido, sem esconder conteúdo nem criar painel mais alto que a tela.

### RESP-004 — P3 — alvos textuais abaixo do conforto de 44 px

**Owner sugerido:** HEAL-14  
**Revalidação:** HEAL-17

Os controles transacionais passam na referência de `44 px`, mas alguns alvos editoriais são menores:

- wordmark: cerca de `64 × 33 px`;
- `Voltar à sacola` no cabeçalho do checkout: cerca de `102 × 26 px`;
- breadcrumbs e links do rodapé: cerca de `19 px` de altura de linha.

Não foi classificado como falha WCAG automática porque links textuais inline podem se enquadrar em exceções de tamanho/espaçamento. Ainda assim, em mobile, ampliar a área clicável com padding melhora conforto e tolerância a toque sem alterar a tipografia.

Critério de aceite: áreas interativas prioritárias de cabeçalho, retorno e navegação estrutural próximas de `44 × 44 px`, com espaçamento que evite toques acidentais.

### RESP-005 — P1 — erro de hidratação na Home

**Owner sugerido:** HEAL-15 (Three/efeito) + HEAL-14 (integração)  
**Revalidação:** HEAL-17  
**Gate:** HEAL-21

Durante a navegação responsiva, o console registrou erro React de hidratação em `/`. O atributo `id` do `radialGradient` do fallback SVG divergiu entre servidor e cliente:

- cliente: `ember-fallback-_R_15hi_`;
- servidor: `ember-fallback-_R_35hi_`.

A origem observada está em `site/components/three/EmberSmokeScene.tsx`, onde o fallback deriva o ID de `useId()`. A cena ainda apareceu visualmente, mas React informou que os atributos divergentes não seriam corrigidos.

Critério de aceite: reload direto da Home sem `hydration mismatch`, warning ou error no console nos viewports mobile e desktop; referências `id`/`url(#id)` idênticas entre SSR e cliente.

## Safe-area, orientação e teclado

- Não há uso de `env(safe-area-inset-*)`, mas também não há `viewport-fit=cover`; o viewport atual fica no comportamento seguro padrão do navegador. Não foi reproduzida falha em Chromium.
- iPhone/iPad físico e Safari não foram executados. Notch, barras dinâmicas, teclado virtual e rotação real permanecem validação pendente.
- A orientação paisagem foi simulada em `844 × 390` e `932 × 430`; o único bloqueio objetivo foi a PDP, já coberto por RESP-001. A PLP ficou densa, coberta por RESP-002.
- Foco visível foi confirmado no skip link e no menu. A automação disponível não avançou a sequência completa com `Tab` nem produziu evidência conclusiva de ativação do `<summary>` por `Enter`; isso deve ser repetido manualmente em HEAL-17. Não há alegação de teste completo de teclado.

## Handoff

Para root:

1. Tratar RESP-001 e RESP-005 como bloqueadores antes da consolidação.
2. Decidir a estratégia de breakpoint/tablet de RESP-002.
3. Definir se o sticky será funcional ou removido em RESP-003.

Para HEAL-17:

1. Reexecutar exatamente esta matriz após os fixes.
2. Repetir sacola preenchida, CEP inválido/válido e checkout em `320`, `390`, `768`, `1024` e `1440`.
3. Fazer passagem manual de teclado: skip link, wordmark, sacola, menu, navegação, quantidade, adicionar, CEP, totais e checkout.
4. Confirmar console zerado na Home e nas rotas comerciais.

Para HEAL-21:

- não promover readiness enquanto existir qualquer overflow horizontal na PDP ou erro de hidratação;
- registrar Safari/iOS físico como evidência necessária ou como risco explicitamente aceito;
- exigir evidência de reexecução para fechar RESP-001 a RESP-005.

## Revalidação do coordenador após correções

Data: 2026-08-28, após o handoff HEAL-12.

- `RESP-001`: corrigido com tracks `minmax(0, 1fr)`, `min-width: 0`, quebra segura de conteúdo e breakpoint de empilhamento até 1023 px. Medição no navegador em `320`, `360`, `390`, `430`, `768`, `1024`, `1440`, `1920`, `844×390` e `932×430`: `scrollWidth === clientWidth` em todos os casos, diferença `0 px`.
- `RESP-002`: corrigido adotando duas colunas entre 768 e 1023 px e uma coluna abaixo de 768 px.
- `RESP-003`: a declaração de sticky inefetiva foi removida. Uma futura buy bar fixa depende de novo design/teste; a implementação atual não promete esse comportamento.
- `RESP-005`: removido o ID dinâmico baseado em `useId()` do SVG. Reload direto da Home em 390 px, após a mudança, sem mensagens `warn` ou `error` no console.
- `RESP-004`: permanece melhoria P3 para links editoriais/estruturais; controles transacionais já têm alvos mínimos adequados.

Esses resultados fecham os dois bloqueadores reproduzidos por HEAL-12, mas não substituem a nova passagem independente de HEAL-17/HEAL-21 nem teste físico em Safari/iOS.
