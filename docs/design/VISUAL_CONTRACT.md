# HEAL. CURA. — Contrato visual da vertical slice

Data: 2026-08-28  
Owner: HEAL-07  
Direção recomendada: `Tempo de Brasa`  
Estado real: `contrato proposto — não implementado e não validado visualmente`  
Consumidores: HEAL-08, HEAL-09, HEAL-10, HEAL-11, HEAL-12, HEAL-17, HEAL-21.

## 1. Regra de composição

Toda tela separa três camadas, nesta prioridade:

1. **Comércio:** produto, preço, disponibilidade, quantidade, frete e ação.
2. **Prova:** composição, origem, método, uso, segurança e política.
3. **Atmosfera:** fumaça, brasa, textura, passagem e narrativa.

Atmosfera nunca altera a ordem DOM, esconde texto, captura foco, bloqueia rolagem ou atrasa CTA. Home, coleção, PDP, carrinho e handoff devem continuar utilizáveis sem CSS avançado, imagem, Anime.js ou Three.js.

## 2. Tokens de cor

Nomes são semânticos; componentes não usam hex diretamente.

```css
:root {
  --color-ink: #171411;
  --color-paper: #f4f0e8;
  --color-paper-strong: #fffdfc;
  --color-surface-dark: #211d18;
  --color-smoke: #c9c1b5;
  --color-line: #d4ccbf;
  --color-muted: #6b6258;
  --color-ember: #b73b1d;
  --color-moss: #4e5c4b;
  --color-focus: #145da0;
  --color-error: #a52920;
  --color-success: #2f6d4a;
  --color-scrim: rgb(23 20 17 / 58%);
}
```

### Pares aprovados para texto

| Primeiro plano / fundo | Contraste calculado | Uso |
|---|---:|---|
| `ink / paper` | 16.14:1 | texto principal |
| `muted / paper` | 5.26:1 | texto secundário normal |
| `ember / paper` | 5.05:1 | texto de estado/link pontual |
| `paper / surface-dark` | 14.74:1 | zonas sensoriais |
| `focus / paper` | 5.95:1 | ring/indicador |
| `error / paper` | 6.29:1 | erro textual |
| `success / paper` | 5.42:1 | sucesso textual |
| `paper-strong / ember` | 5.66:1 | botão brasa excepcional |

`smoke` e `line` não servem para texto normal. Estados não dependem só de cor. Implementação deve recalcular contraste se qualquer token mudar.

## 3. Tipografia

### Famílias

```css
--font-editorial: "Heal Editorial", Georgia, "Times New Roman", serif;
--font-ui: "Heal Sans", "Segoe UI", Arial, sans-serif;
```

- `Heal Editorial`: candidato `Newsreader Variable`, pesos 300–600.
- `Heal Sans`: candidato `IBM Plex Sans`, pesos 400, 500, 600 e 700; preferir variável se o arquivo final for menor.
- Baixar de fonte oficial, incluir arquivo de licença, converter/usar WOFF2 e self-host; nenhuma chamada a Google Fonts em runtime.
- Subset deve cobrir PT-BR, pontuação, moeda e símbolos necessários. Não remover caracteres de conteúdo real.
- `font-display: swap`; reservar métricas com fallback ajustado quando tecnicamente possível; medir CLS.
- Se os arquivos/licenças ainda não estiverem no projeto, usar somente fallbacks do sistema. Não fingir que a fonte está instalada.

### Escala fluida

```css
--text-xs: 0.75rem;                       /* 12 */
--text-sm: 0.875rem;                      /* 14 */
--text-md: 1rem;                          /* 16 */
--text-lg: 1.125rem;                      /* 18 */
--text-xl: clamp(1.25rem, 1.1rem + .5vw, 1.5rem);
--text-2xl: clamp(1.75rem, 1.4rem + 1.1vw, 2.5rem);
--text-hero: clamp(2.5rem, 1.8rem + 3.2vw, 5.75rem);
```

- Body: UI 16/1.6.
- Texto secundário nunca abaixo de 14px; fatos de produto preferem 16px.
- H1: editorial, line-height `0.98–1.08`, no máximo 12–14 palavras por linha visual.
- H2: editorial, line-height `1.1–1.2`.
- Labels/CTA: UI 14–16px, 600; tracking máximo `0.02em`.
- Preço: UI, 600, tabular nums; centavos e moeda continuam legíveis.

## 4. Espaçamento, grid e medidas

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.5rem;
--space-6: 2rem;
--space-7: 3rem;
--space-8: 4rem;
--space-9: 6rem;
--container: 90rem;
--measure-copy: 42rem;
--measure-narrow: 32rem;
--target-min: 2.75rem;
--radius-control: 0.25rem;
--radius-card: 0rem;
--border: 1px;
```

- Container: `min(100% - 2rem, 90rem)` em 320–767; margem lateral cresce para 32px, 48px e no máximo 80px.
- Grid desktop >=1024: 12 colunas, gap 24px.
- Tablet 768–1023: 6 colunas, gap 20px.
- Mobile <768: uma coluna; duas colunas só depois de QA de nome, preço e targets.
- Não usar `100vh` para hero; usar conteúdo + `min-block-size` limitado. Suportar `svh/dvh` sem prender rolagem.

## 5. Elevação, bordas, forma e textura

- Elevação padrão é zero. Dialog/drawer usa `0 24px 80px rgb(23 20 17 / 22%)`.
- Cards são definidos por imagem, alinhamento e linha; não por sombra e radius grandes.
- Controles podem usar radius de 4px; pills ficam restritas a chips/filtros.
- Textura nunca é ruído sobre texto. Se usada, fica em pseudo-elemento decorativo com opacidade <=4% e é removida em forced colors/reduced data.
- A linha de fumaça não cruza texto, preço ou botão.

## 6. Zonas de página

### Atmosphere zone

- Fundo `surface-dark`, texto `paper`, brasa pontual.
- Permitida no hero da Home e em uma seção editorial da PDP.
- Máximo de uma cena dominante por viewport.

### Proof zone

- Fundo `paper`/`paper-strong`, texto `ink`.
- Obrigatória para coleção, compra da PDP, carrinho, checkout, políticas e segurança.
- Densidade de informação é resolvida por hierarquia, não por esconder tudo em accordions.

### Transition seam

- Uma linha ou faixa de 1–2px marca a transição escuro→claro.
- Anime.js pode revelar o seam uma vez; sem animação ele já está completo.

## 7. Componentes obrigatórios

### Botões

- Altura mínima 44px; padding horizontal 20px.
- Primary light zone: `ink`/`paper-strong`; hover clareia para `surface-dark`, active desloca no máximo 1px.
- Primary dark zone: `paper`/`ink`.
- Secondary: transparente + borda `ink`; nunca cinza de baixo contraste.
- Focus-visible: outline 3px `focus` + offset 3px; não remover outline.
- Loading mantém largura, mostra verbo no gerúndio e bloqueia somente o acionador.
- Disabled: contraste visual + `disabled`; explicar indisponibilidade em texto próximo.

### Links

- Sublinhado com offset 0.2em em conteúdo; navegação pode usar indicador de linha/estado atual.
- Hover nunca é a única indicação.

### Inputs/selects

- Label persistente acima; altura mínima 48px; fundo `paper-strong`, texto `ink`, borda `muted`.
- Erro: borda + ícone opcional + mensagem textual e associação por `aria-describedby`.
- Placeholder não substitui label.

### Cards de produto

Ordem fixa:

1. mídia `4:5` com dimensões reservadas e fallback;
2. rótulo `DEMONSTRAÇÃO` quando aplicável;
3. família;
4. nome;
5. 2–3 descritores;
6. intensidade e fumaça em texto/segmentos;
7. preço e disponibilidade;
8. CTA/link.

Nada essencial aparece só no hover. Imagem ausente preserva proporção e nome.

### Passaporte sensorial

- Família, descritores, intensidade e fumaça ficam em lista semântica.
- Escalas subjetivas mostram palavra + no máximo três segmentos; não exibir precisão `4.2/5` sem método real.
- Incluir link “Como interpretamos” somente quando método estiver documentado.

### Badge de fixture

- Texto exato: `DEMONSTRAÇÃO — dados e imagens ilustrativos` na Home/coleção/PDP.
- No handoff: `DEMONSTRAÇÃO — nenhum pagamento será processado`.
- Fundo `paper`, texto `ink`, borda `ember`; nunca parecer promoção.

### Accordion

- Trigger é `button` dentro de heading; alvo 44px; ícone mais/menos.
- Conteúdo essencial de SEO existe no HTML. Uso e segurança não ficam visualmente relegados.

### Drawer/dialog

- Fundo claro, título visível, fechar textual/ícone, foco contido e retorno ao acionador.
- Mobile 320: ocupa tela inteira; respeita safe areas.
- Scrim não reduz legibilidade do próprio painel.

### Toast/status

- Brasa pode percorrer 12–24px em 180ms ao adicionar; texto confirma o item em região `status` educada.
- Não rouba foco, não some antes de ser percebido e não é única porta para o carrinho.

## 8. Iconografia

- SVG próprio ou biblioteca futura sob licença aprovada; stroke 1.5px, `currentColor`, viewBox consistente 24.
- Buscar, fechar, menu, sacola, mais/menos, seta e check podem ser universais.
- Fumaça, intensidade, família e segurança sempre levam rótulo.
- Não usar lua, estrela, cristal, chakra, olho, mandala, mãos místicas ou aura.
- Ícone não deve representar ingrediente inexistente.

## 9. Fotografia e placeholders

### Contrato para assets reais futuros

- Capturar embalagem fechada/aberta, produto em escala, macro da matéria, uso correto, brasa e resíduo.
- Uma imagem factual neutra + uma contextual por produto; sem fogo/fumaça incompatíveis com instrução real.
- Guardar autoria, licença, data, produto/SKU, edição e alt text.
- Não gerar embalagem, rótulo ou ingrediente para ser apresentado como real.

### Fixture atual

- Usar composição abstrata de papel/carvão/vareta sem logotipo de produto.
- Incluir `Imagem demonstrativa` visível e alt coerente: não descrever como fotografia de um produto real.
- Placeholder não entra em feed, Merchant Center, schema factual ou produção.

## 10. Motion e 3D: boundaries para HEAL-10/11

- CSS/WAAPI: hover, press, accordion e foco.
- Anime.js: somente timeline de passagem e feedback de brasa; imports modulares, scope React e cleanup.
- Three.js: somente hero Home na vertical slice; lazy client-only, `aria-hidden`, pointer-events none.
- Canvas não recebe texto, link, botão ou estado comercial.
- Fallback SVG está no HTML antes do módulo 3D.
- Pausar fora da viewport/aba; DPR e FPS por quality tier; liberar renderer, materiais, geometrias, listeners e RAF.
- `prefers-reduced-motion: reduce` mantém tudo estático; `forced-colors` remove efeitos decorativos; reduced data deve preferir fallback.

## 11. Contrato responsivo

### 320/360/390/430

- Uma coluna, margem 16px, sem scroll horizontal.
- Header mostra menu, marca, busca e sacola; todos com targets 44px.
- Hero: H1 + explicação + CTAs antes de visual; visual máximo 300px.
- CEP e calcular empilham em 320 quando necessários.
- Sticky buy bar aparece só após bloco original, respeita `safe-area-inset-bottom` e some com teclado/dialog.
- Filtros full-screen; cards em uma coluna até QA provar duas.

### 768

- Duas colunas editoriais quando conteúdo permitir; compra pode permanecer uma coluna larga.
- Drawer ainda é aceitável para filtros.

### 1024

- Hero e PDP podem usar duas colunas se ordem DOM permanecer lógica e a coluna de compra couber inteira.
- Com zoom/reflow, voltar a uma coluna antes de comprimir controles.

### 1440/1920

- Container permanece em 1440px; espaço extra é margem, não linha de texto mais longa.
- Coleção 3–4 cards; PDP galeria 7 colunas/compra 5.

## 12. Aplicação por rota da vertical slice

### Home

- Hero escuro 7/5 no desktop e linear no mobile.
- Categoria e CTAs no HTML antes da cena.
- Primeira proof zone traz caminhos por família/matéria e uma seleção fixture rotulada.

### Coleção

- Fundo papel; sem Three.js.
- Filtros, contagem e cards dominam. Uma linha brasa marca filtro selecionado.

### PDP

- Galeria + compra na proof zone.
- “Como perceber” pode ser dark zone editorial; composição, origem, uso, segurança e política retornam ao claro.
- CTA e frete nunca estão sobre imagem.

### Carrinho e handoff

- Apenas proof zones; brasa aparece em estado/CTA, não em fundo.
- Badge de demonstração é persistente.
- Nenhuma celebração de compra; fixture encerra demonstração sem simular pedido.

## 13. Critérios de aceite visual

- [ ] Sem imagem/WebGL, categoria, produto, preço fixture, disponibilidade, segurança e CTA continuam claros.
- [ ] Todos os pares de texto atendem 4.5:1; texto grande, 3:1; controles e foco, 3:1 no mínimo.
- [ ] 320px e zoom 200% sem scroll horizontal ou foco encoberto.
- [ ] Nenhum card depende de hover; nenhuma ação depende de drag.
- [ ] Foco é visível em superfícies claras e escuras.
- [ ] Fixture e `[A VALIDAR]` são impossíveis de confundir com dado real.
- [ ] Hero não ocupa a primeira dobra inteira no mobile.
- [ ] Carrinho/handoff não carregam Three.js.
- [ ] Reduced motion e fallback não perdem significado.
- [ ] Screenshots de 320, 390, 1024 e 1440 cobrem normal, erro, mídia ausente e reduced motion.

## 14. Handoff por owner

### HEAL-08 — Frontend Core

- Implemente ordem semântica e rotas antes dos efeitos.
- Use tokens semânticos e preserve os boundaries `commerce`, `proof` e `atmosphere`.
- Mantenha fixture visível e conteúdo essencial server-rendered.

### HEAL-09 — Design System

- Materialize tokens, Button, Link, Input, Select, Card, Badge, Accordion, Drawer/Dialog, Quantity e Toast.
- Documente estados hover, focus-visible, active, disabled, loading e error em claro/escuro.
- Não alterar os valores de cor sem revalidar contraste.

### HEAL-10 — Motion / Anime.js

- Especifique no Motion Bible o seam fumaça e o feedback brasa.
- Duração alvo: funcional 160–220ms; editorial 600–850ms.
- Implemente cleanup e atualização dinâmica de reduced motion.

### HEAL-11 — Three.js

- Use a metade sensorial do hero; canvas decorativo e não interativo.
- Faça primeiro o fallback SVG conforme a mesma composição.
- Não varie aroma sem catálogo/método aprovados; na fixture, use uma variante neutra rotulada.

### HEAL-12/17/21 — Responsivo, acessibilidade e QA

- Validar matriz completa 320–1920, zoom, forced colors, reduced motion, mídia ausente e WebGL indisponível.
- Testar foco sobre header/sticky UI e contraste calculado no CSS final.
- Tratar este documento como proposta até evidência visual e teste com usuários.

