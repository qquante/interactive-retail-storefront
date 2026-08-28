# HEAL-17 — auditoria de acessibilidade WCAG 2.2 AA

Data: 2026-08-28  
Alvo: `http://localhost:3000`  
Escopo: Home, coleção, PDP, sacola preenchida e checkout preenchido  
Viewports: `320×568`, `390×844`, `768×1024`, `1440×900`  
Resultado: **sem finding P0/P1; RESP-001 e RESP-005 revalidados como fechados. Permanecem dois findings P2 e dois P3.**

## Método e limites de evidência

Esta foi uma auditoria read-only do produto. Nenhum arquivo de implementação, pacote, configuração, dado externo ou serviço foi alterado por HEAL-17.

Evidência produzida:

- inspeção estática do HTML/React/CSS nas rotas e componentes em escopo;
- matriz real de reflow/overflow em Chromium nos quatro viewports;
- fluxo automatizado real em Chrome headless: PDP em estoque → adicionar → sacola preenchida → checkout preenchido;
- axe-core `4.13.0` via `@axe-core/playwright`, em 20 combinações de rota/viewport;
- passagem de teclado com `Tab`, `Enter`, foco visível e ativação do `<summary>` nativo;
- estados dinâmicos: quantidade inválida/válida, atualização da sacola, CEP inválido, incremento, remoção e foco pós-remoção;
- `prefers-reduced-motion: reduce` em contexto real do navegador;
- reflow equivalente a 400% por viewport de 320 CSS px e ensaio complementar de texto a 200% por folha de estilo injetada apenas no contexto de teste.

Não testado e, portanto, não alegado como aprovado:

- NVDA, JAWS, VoiceOver ou TalkBack reais;
- Safari/iOS, dispositivos físicos, teclado virtual, notch e Dynamic Type;
- zoom nativo de todos os navegadores; o ensaio de texto a 200% é uma aproximação controlada;
- percepção de usuários com baixa visão, daltonismo ou deficiência motora;
- fala exata e timing de cada live region em leitor de tela real.

## Resultado automatizado

### axe-core 4.13.0

O axe foi executado com sacola e checkout preenchidos, em todas as 20 combinações abaixo:

| Rota | 320 | 390 | 768 | 1440 |
|---|---:|---:|---:|---:|
| `/` | 1 | 1 | 1 | 1 |
| `/colecoes/intervalos` | 1 | 1 | 1 | 1 |
| `/produtos/intervalo-01` | 1 | 1 | 1 | 1 |
| `/carrinho` | 1 | 1 | 1 | 1 |
| `/checkout` | 1 | 1 | 1 | 1 |

Cada célula mostra o número de violações. Em todos os casos foi a mesma regra `region`, impacto `moderate`, um nó: o banner de demonstração fora de um landmark. Não houve violação axe para contraste, nomes acessíveis, labels, IDs, heading order, ARIA, idioma ou foco.

Observação: `region` é uma regra axe de **best practice**; o resultado não deve ser apresentado como falha automática normativa de WCAG sem análise humana.

### Contraste

O axe não encontrou `color-contrast` nas 20 execuções. Os pares principais medidos por WCAG contrast ratio também passaram para texto normal:

| Par | Razão |
|---|---:|
| `#171411` sobre `#f4f0e8` | 16.14:1 |
| `#6b6258` sobre `#f4f0e8` | 5.26:1 |
| `#c9c1b5` sobre `#171411` | 10.29:1 |
| `#b73b1d` sobre `#f4f0e8` | 5.05:1 |
| `#a52920` sobre `#f4f0e8` | 6.29:1 |
| `#2f6d4a` sobre `#f4f0e8` | 5.42:1 |

Isso valida os estados atuais testados, não combinações futuras nem conteúdo/imagens reais.

## Revalidação dos bloqueadores anteriores

### RESP-001 — fechado

Medição independente da PDP, sacola preenchida e checkout preenchido:

| Viewport | PDP | Sacola | Checkout |
|---|---:|---:|---:|
| 320×568 | 0 px | 0 px | 0 px |
| 390×844 | 0 px | 0 px | 0 px |
| 768×1024 | 0 px | 0 px | 0 px |
| 1440×900 | 0 px | 0 px | 0 px |

Os valores são `documentElement.scrollWidth - documentElement.clientWidth`. A matriz completa das cinco rotas também retornou zero overflow nos quatro viewports. O critério de aceite de RESP-001 foi atendido.

### RESP-005 — fechado

Foram feitos reloads diretos da Home em `390×844` e `1440×900`, seguidos de espera pela hidratação e leitura de console. Resultado: zero `warn`, zero `error` e nenhuma mensagem de hydration mismatch. O SVG atual não depende de ID dinâmico; a cena decorativa permaneceu funcional.

## Teclado, foco e navegação

Resultados reproduzidos em Chrome headless, `390×844`:

- o primeiro `Tab` alcança “Pular para o conteúdo”, visível em `199×50 px`, com outline sólido de `3 px`;
- `Enter` no skip link atualiza `#conteudo`, posiciona o início do `<main>` no viewport e o próximo `Tab` vai para “Explorar incensos”, pulando a navegação repetida;
- a Home percorre skip link → wordmark → sacola → menu → CTAs; todos exibem outline de `3 px`;
- o `<summary>` “Menu” recebe foco e alterna `<details>` de fechado para aberto com `Enter`;
- PDP, sacola e checkout mantêm ordem de foco compatível com a ordem visual e sem trap observado;
- na sacola, incremento, remoção, CEP e CTAs são alcançáveis; após remover uma linha, o foco vai para o status com `tabindex="-1"` e anuncia a remoção;
- o botão de diminuir corretamente sai da ordem quando está disabled em quantidade 1; o botão de aumentar preserva nome específico do produto;
- o checkout alcança aviso/conteúdo sem inserir elementos decorativos na ordem de foco.

O foco global vem de `site/app/globals.css:49-52`; os dois skip links têm deslocamento fora da tela e retorno visível em foco. A cena Three é decorativa, usa `aria-hidden="true"` e canvas com `tabIndex={-1}` em `site/components/three/EmberSmokeScene.tsx:253-262`.

## Landmarks, headings e nomes

Inspeção estática e DOM real confirmaram:

- `lang="pt-BR"` em `site/app/layout.tsx:53`;
- exatamente um `<main>` e um `<h1>` por rota testada;
- hierarquia H1 → H2 sem salto estrutural nas rotas em escopo;
- navegações principal/móvel e breadcrumbs têm nomes distintos;
- produto, sacola, quantidade e ações de remoção têm nomes específicos;
- placeholder visual do produto tem `role="img"` e descrição explícita de que é demonstrativo;
- cena Three e efeitos Anime.js são decorativos e não carregam informação transacional exclusiva.

## Reduced motion

Com `reducedMotion: 'reduce'`:

- `matchMedia('(prefers-reduced-motion: reduce)')` retornou `true`;
- cena Three permaneceu em `data-state="fallback"`, sem quality tier e com canvas em `opacity: 0`;
- seam trace ficou `display: none`;
- `scroll-behavior` computado ficou `auto`;
- transições computadas foram reduzidas a `0.01 ms` pela regra global.

O resultado confirma fallback real e conteúdo/CTA independentes do movimento. Referências: `site/app/globals.css:595-603`, `site/components/motion/EditorialSeamReveal.tsx:25-60` e `site/components/three/EmberSmokeScene.tsx:116-191`.

## Zoom e reflow

- Em 320 CSS px, todas as cinco rotas refluíram sem rolagem horizontal, inclusive sacola e checkout preenchidos. Isso cobre o equivalente de reflow a 400% para conteúdo de 1280 CSS px.
- No ensaio complementar de texto a 200% em viewport de 1280 px, as cinco rotas mantiveram `scrollWidth === clientWidth` e nenhum texto ficou dentro de elemento com `overflow-x: hidden/clip` e largura insuficiente.
- Inputs/selects visíveis ficaram em `16 px` nos viewports móveis, reduzindo risco de zoom automático em iOS; Safari real continua pendente.

## Findings

### A11Y-001 — P2 — banner de demonstração fora de landmark

**Evidência automatizada:** regra axe `region`, impacto `moderate`, 1 nó, reproduzida nas 20 combinações. Seletores: `.demo-banner` na Home e classe CSS Module de `DemoBanner` nas rotas comerciais.

**Evidência de código:**

- Home: `site/app/page.tsx:19-22` posiciona o banner antes do `<header>` e do `<main>`;
- commerce: `site/components/commerce/CommercePageShell.tsx:15-20` posiciona `<DemoBanner />` antes do `<header>`;
- `site/components/commerce/DemoBanner.tsx:6-9` usa `role="note"`, que não cria landmark.

**Impacto:** usuários que navegam por landmarks podem não encontrar o aviso de demonstração por essa estratégia; a única violação axe fica repetida em toda a superfície.

**Correção sugerida:** incluir o aviso em um landmark existente apropriado ou transformá-lo em `role="region"` com nome acessível específico, evitando regiões genéricas em excesso. Reexecutar axe nas 20 combinações.

**Critério de aceite:** zero `region` nas cinco rotas e aviso ainda anunciado/visível sem duplicação.

### A11Y-002 — P2 — erro customizado de quantidade não está programaticamente associado ao input

**Reprodução:** na PDP, limpar o valor de “Quantidade” e acionar “Adicionar à sacola demonstrativa”.

**Resultado real:** o input recebe `aria-invalid="true"` e o live region anuncia “Escolha uma quantidade inteira entre 1 e 99...”, mas o input continua sem `aria-describedby` ou `aria-errormessage`. Ao voltar ao campo, o leitor pode anunciar apenas “inválido” sem repetir a instrução.

**Evidência de código:** input em `site/components/commerce/AddToCartForm.tsx:47-58`; mensagem em `site/components/commerce/AddToCartForm.tsx:69-75` sem `id` relacionado.

**Impacto:** risco de recuperação de erro para leitor de tela e de relação insuficientemente explícita entre campo e mensagem. A live region reduz o impacto imediato, mas não resolve a consulta posterior.

**Correção sugerida:** dar ID estável à mensagem e ligar o input por `aria-describedby` ou `aria-errormessage` enquanto inválido; manter o anúncio existente sem duplicar fala.

**Critério de aceite:** leitor de tela anuncia nome, valor, estado inválido e instrução ao retornar ao campo; axe continua limpo.

### A11Y-003 — P3 — CEP inválido não expõe `aria-invalid`

**Reprodução:** sacola preenchida → digitar `123` → “Simular entrega”.

**Resultado real:** a mensagem “Digite um CEP com 8 números...” aparece em `role="status"` e já está ligada por `aria-describedby="shipping-help shipping-status"`, mas o input não recebe `aria-invalid="true"`.

**Evidência de código:** `site/components/commerce/CartView.tsx:120-138`.

**Impacto:** a descrição é recuperável e anunciada, porém o estado de invalidade do controle fica incompleto para tecnologias assistivas.

**Correção sugerida:** aplicar `aria-invalid` somente no erro de validação do CEP e remover quando corrigido.

### A11Y-004 — P3 — áreas de toque editoriais abaixo do conforto de 44 px

Medições móveis:

- wordmark Home: aproximadamente `64×30 px`;
- wordmark commerce: `64×33 px`;
- “Voltar à sacola” no header do checkout: `102×26 px`;
- breadcrumbs e links inline do rodapé: linha de aproximadamente `19 px`.

Os itens medidos preservam pelo menos 24 px em ambas as dimensões quando não cobertos pela exceção de texto inline da WCAG 2.5.8; portanto, não foi classificado como falha AA automática. Ainda assim, 44 px é uma referência ergonômica melhor para mobile.

Há uma causa concreta no checkout: `site/components/commerce/CommercePageShell.tsx:25-28` aplica a classe diretamente no `<Link>`, enquanto `site/components/commerce/commerce.module.css:9` define altura apenas para `.headerLink a`.

**Correção sugerida:** fazer o seletor alcançar o próprio `.headerLink` e ampliar padding/área clicável de wordmark e ações prioritárias; preservar a exceção natural para breadcrumbs e texto corrido.

## Evidências dinâmicas positivas

- quantidade válida adiciona o item, anuncia a confirmação e atualiza o nome da sacola de `0 itens` para `1 item`;
- CEP inválido preserva o valor e anuncia a instrução; CEP está ligado ao help/status por `aria-describedby`;
- incremento anuncia “Quantidade atualizada. Total demonstrativo recalculado.”;
- remoção move foco para o status e oferece “Desfazer remoção”;
- checkout preenchido informa de forma assertiva que nenhum pagamento, pedido, Pix, boleto ou cartão será criado;
- nenhum controle transacional depende apenas de cor, movimento ou da cena 3D.

## Comandos e exit codes

### Preparação/diagnóstico do axe CLI

```powershell
npx --yes @axe-core/cli --version
# 4.13.0 — exit 0

npx --yes @axe-core/cli http://localhost:3000/ --exit
# não executou a auditoria: chromedriver.exe ENOENT
```

O segundo comando imprimiu erro de spawn do chromedriver. Ele não foi usado como evidência de aprovação. A automação válida foi executada com as dependências já existentes do projeto:

```powershell
# cwd: site/
# script efêmero via stdin: playwright + @axe-core/playwright + Chrome headless
# 5 rotas × 4 viewports, com carrinho/checkout preenchidos
# exit 0; uma violação `region` por combinação
```

Outros scripts efêmeros Playwright, todos em `site/`, encerraram com exit `0`:

- matriz de overflow de PDP/sacola/checkout preenchidos;
- sequência de foco e ativação de menu/skip link;
- validação de live regions, CEP, incremento e foco pós-remoção;
- reduced motion;
- texto a 200% e detecção de clipping.

## Veredito e handoff

HEAL-17 não encontrou bloqueador P0/P1. **RESP-001 e RESP-005 estão fechados por revalidação independente.** O produto ainda não deve ser chamado de “WCAG 2.2 AA comprovado”: há um finding axe repetido, duas lacunas de semântica de erro e faltam leitores de tela/Safari reais.

Ordem recomendada:

1. corrigir A11Y-001 e reexecutar a matriz axe;
2. corrigir A11Y-002/A11Y-003 e validar fala/foco com NVDA + Firefox ou Chrome;
3. tratar A11Y-004 junto do refinamento mobile;
4. executar Safari/iOS + VoiceOver e registrar resultado como evidência de release.

## Remediação posterior pelo coordenador

Após o handoff HEAL-17:

- `A11Y-001` foi corrigido nomeando as faixas de demonstração como regiões;
- `A11Y-002` foi corrigido ligando o erro customizado de quantidade ao input por `aria-describedby`;
- `A11Y-003` foi corrigido emitindo `aria-invalid` no CEP inválido;
- os wordmarks receberam alvo mínimo de 44 px; os demais links editoriais inline permanecem dentro das exceções documentadas de target size.

O gate reproduzível `npm run test:a11y` executou axe-core 4.13 em Home, coleção e PDP no viewport 390×844 e retornou `0 violations` nas três rotas, exit code `0`. O E2E cross-browser continua cobrindo ausência de violações serious/critical. Leitores reais e Safari/iOS físico permanecem dependência humana; a correção automática não equivale a conformidade WCAG completa.
